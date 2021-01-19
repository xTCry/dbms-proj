import Backend from '../Providers/Backend';

export const objFilter = (obj: object, validParams: string[]) => {
    if (!validParams) {
        return obj;
    }
    let result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && validParams.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};

const validParams = {
    user: [
        'password',
        'login',
        'photo_path',
        'last_name',
        'second_name',
        'personal_address',
        'personal_telephone',
        'personal_birthday',
        // 'registeration_date',
        'role_id',
    ],
    student: ['group_id', 'user_id', 'student_id'],
    group: ['name'],
    // orders: ['title', 'description', 'images', 'status', 'executor', 'cost'],
};

const uploadImages = async (
    files: { rawFile: string }[]
): Promise<[{ filename: string; path: string; originalname: string }]> => {
    let data = new FormData();
    for (const file of files) {
        data.append('images', file.rawFile);
    }
    return await Backend.request(`images`, data, 'POST').then(({ images }) => images);
};

export const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        return Backend.request(
            `${resource}`,
            {
                sort: [field, order],
                range: [(page - 1) * perPage, page * perPage - 1],
                filter: params.filter,
            },
            'GET',
            true
        ).then(({ headers, data }) => ({
            data: data,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },
    getOne: (resource, params) => Backend.request(`${resource}/${params.id}`, {}, 'GET').then((data) => ({ data })),
    getMany: (resource, params) =>
        Backend.request(`${resource}`, { filter: { id: params.ids } }, 'GET').then((data) => ({ data })),

    create: async (resource, params) => {
        const { data } = params;
        if (resource === 'users' && data.new_photo?.rawFile) {
            const { new_photo } = data;
            data.new_photo = undefined;
            try {
                const isNewPhoto = new_photo.rawFile instanceof File;
                if (isNewPhoto) {
                    const [img] = await uploadImages([new_photo]);
                    data.photo_employee = `${Backend.serverURL}/${img.path}`;
                }
            } catch (e) {
                // TODO: Show notify with error
            }
        } else if (resource === 'orders' && data.images) {
            try {
                const images = await uploadImages(data.images);
                data.images = [];
                for (const img of images) {
                    data.images.push({
                        url: `${Backend.serverURL}/api/images/temp${img.path}`,
                        name: img.originalname,
                    });
                }
            } catch (e) {
                // TODO: Show notify with error
            }
        }

        return Backend.request(`${resource}`, data, 'POST').then((data) => ({
            data,
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        return Backend.request(
            `${resource}`,
            {
                sort: [field, order],
                offSet: (page - 1) * perPage,
                limit: perPage,
                filter: {
                    ...params.filter,
                    [params.target]: params.id,
                },
            },
            'GET',
            true
        ).then(({ headers, data }) => ({
            data,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: async (resource, params) => {
        const { data } = params;
        console.log(resource, data);
        
        if (resource === 'users' && data.new_photo?.rawFile) {
            const { new_photo } = data;
            data.new_photo = undefined;
            try {
                const isNewPhoto = new_photo.rawFile instanceof File;
                if (isNewPhoto) {
                    const [img] = await uploadImages([new_photo]);
                    data.photo_employee = `${Backend.serverURL}/${img.path}`;
                }
            } catch (e) {
                // TODO: Show notify with error
            }
        } else if (resource === 'orders' && data.images) {
            try {
                const updatedImages = data.images.filter((e) => !e.created_at);
                data.images = data.images.filter((e) => !!e.created_at);
                if (updatedImages.length) {
                    const newImages = await uploadImages(updatedImages);
                    for (const img of newImages) {
                        data.images.push({ url: `${Backend.serverURL}/${img.path}`, name: img.originalname });
                    }
                }
            } catch (e) {
                // TODO: Show notify with error
            }
        }

        return Backend.request(
            `${resource}/${params.id}`,
            {
                ...objFilter(data, validParams[resource]),
            },
            'PUT'
        ).then((data2) => ({ data: { ...data, id: data2.id } }));
    },

    updateMany: (resource, params) =>
        Backend.request(
            `${resource}`,
            {
                ...objFilter(params.data, validParams[resource]),
                filter: { id: params.ids },
            },
            'PUT'
        ).then((data) => ({ data })),

    delete: (resource, params) =>
        Backend.request(`${resource}/${params.id}`, {}, 'DELETE').then((data) => ({
            data,
        })),

    deleteMany: (resource, params) =>
        Backend.request(
            `${resource}`,
            {
                ...params.data,
                filter: { id: params.ids },
            },
            'DELETE'
        ).then((data) => ({ data })),
};
