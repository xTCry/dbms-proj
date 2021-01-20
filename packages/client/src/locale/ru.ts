import russianMessages from 'ra-language-russian';

const customMessages = {
    ...russianMessages,
    report: {
        client: 'Отчет о клиентах',
        date: {
            from: 'Отчет с',
            to: 'Отчет по',
        }
    },
    bo: {
        configuration: 'Конфигурация',
        language: 'Язык',
        theme: {
            name: 'Тема',
            light: 'Светлая',
            dark: 'Тёмная',
        },
        wrong_login_password: 'Неверный логин или пароль',
        invalid_access_token: 'Неверный токен доступа',
        token_expired: 'Токен просрочился, повторите авторизацию',
        role_forbidden: 'Ваша роль не разрешена',
    },
    resources: {
        users: {
            name: 'Пользователь |||| Пользователи',
            fields: {
                login: 'Логин',
                name: 'Имя',
                surname: 'Фамилия',
                mid_name: 'Отчество',
                password: 'Пароль',
                graphic_id: 'График работы',
                position_id: 'Роль',
                photo_employee: 'Фото профиля',
            },
        },
        telefone: {
            name: 'Телефон |||| Телефоны',
            fields: {
                model_id: 'Модель',
                date_issues: 'Дата производства',
            },
        },
        status: {
            name: 'Статус |||| Статусы',
            fields: {
                status_done: 'Статус',
            },
        },
        first_inspect: {
            name: 'Первичный осмотр |||| Первичные осмотры',
            fields: {
                visible_defects: 'Видимые диффекты ',
                comment_client: 'Комментарий клиента',
                date_inspect: 'Дата осмотра',
            },
        },
        second_inspect: {
            name: 'Вторичный осмотр |||| Вторичные осмотры',
            fields: {
                fault: 'Неисправность',
                price_diagnose: 'Цена дигностики',
                date_inspect: 'Дата осмотра',
            },
        },
        pruduct_track: {
            name: 'Учет комплектующих |||| Учеты комплектующих',
            fields: {
                order_id: 'Заказ ',
                component_id: 'Компонент',
                quantity: 'Кол-во',
                date_taken: 'Дата получения',
            },
        },
        provider: {
            name: 'Поставщик |||| Поставщики',
            fields: {
                vendor: 'Поставщик',
                city: 'Город',
                street_home: 'Адрес',
                telefone: 'Телефон',
            },
        },
        order: {
            name: 'Заказ |||| Заказы',
            fields: {
                telefone_id: 'Телефон',
                status_id: 'Статус',
                operator_id: 'Оператор',
                engineer_id: 'Инженер',
                first_inspect_id: 'Первичный осмотр',
                second_inspect_id: 'Вторичный осмотр',
                client_id: 'Клиент',
                date_accept: 'Дата принятия в работу',
                date_issues: 'Дата выдачи',
                price_repair: 'Цена услуги',
            },
        },
        model: {
            name: 'Модель |||| Модели',
            fields: {
                model: 'Модель',
                brand_id: 'Марка',
            },
        },
        maker: {
            name: 'Производитель |||| Производители',
            fields: {
                maker: 'Производитель',
                country_make: 'Страна производителя',
            },
        },
        graphic: {
            name: 'График |||| Графики',
            fields: {
                graphic_work: 'График работы',
                graphic_hours: 'Кол-во часов',
            },
        },
        dolzhnost: {
            name: 'Должность |||| Должности',
            fields: {
                position: 'Должность',
            },
        },
        component: {
            name: 'Компонент |||| Компоненты',
            fields: {
                telefone_id: 'Телефон',
                maker_id: 'Производитель',
                name_component: 'Компонентр',
                price_install: 'Цена установки',
                price_client: 'Цена для клиента',
            },
        },
        client: {
            name: 'Клиент |||| Клиенты',
            fields: {
                name: 'Имя',
                surname: 'Фамилия',
                mid_name: 'Отчество',
                mob_telefone: 'Телефон',
            },
        },
        buy: {
            name: 'Закупка |||| Закупки',
            fields: {
                component_id: 'Компонент',
                maker_id: 'Поставщик',
                buy_price: 'Цена покупки',
                quantity: 'Кол-во',
                date_buy: 'Дата',
            },
        },
        brand: {
            name: 'Марка |||| Марки',
            fields: {
                brand: 'Марка',
            },
        },
        'report-remains': {
            name: 'Отчет остат. расх. мат.',
            fields: {
                name_component: 'Компонент',
                quantity_start: 'Начальное кол-во',
                quantity_after_uses: 'Кол-во после использования',
            },
        },
        'report-workload_engineers': {
            name: 'Отчет загруженности инж.',
            fields: {
                name: 'Имя',
                surname: 'Фамилия',
                mid_name: 'Отчество',
                position: 'Роль',
                work_tasks: 'Задач в работе',
            },
        },
        /* role: {
            name: 'Роли',
            data: {
                NONE: 'Никто',
                USER: 'Пользователь',
                STUDENT: 'Студент',
                TEACHER: 'Преподаватель',
                DEKAN: 'Деканат',
                ADMIN: 'Администратор',
            },
        }, */
    },
};

export default customMessages;
