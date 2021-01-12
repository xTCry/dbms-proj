import { getToken } from '../modules/UserModule';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class Backend {
    static serverURL = ''; // `${process.env.REACT_APP_SERVER_URL}`;

    static __call(method, params, httpMethod: HTTPMethod = 'GET') {
        let url = `${Backend.serverURL}/api/${method}`;

        let headers = {
            Accept: 'application/json',
        };
        let body = undefined;

        const xoken = getToken();
        if (xoken) headers['Authorization'] = `x-oken ${xoken}`;

        if (httpMethod.toString().toUpperCase() !== 'GET') {
            if (!(params instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }
            body = params instanceof FormData ? params : JSON.stringify(params);
        } else {
            url += '?' + Backend.stringify(params);
        }

        const request = new Request(url, {
            method: httpMethod ? httpMethod : 'GET',
            cache: 'no-cache',
            redirect: 'error',
            headers: new Headers({ ...headers }),
            body,
        });

        return new Promise<Response>((resolve, reject) => {
            try {
                // fetch(url, requestParams)
                fetch(request)
                    .then(resolve)
                    .catch(e => {
                        if (e instanceof TypeError) {
                            e['network'] = true;
                            e['message'] = e.message + ' ' + url;
                        }
                        reject(e);
                    });
            } catch (e) {
                reject(e);
            }
        });
    }

    static request(method, params, httpMethod: HTTPMethod = 'POST', retFull = false, retry = 0): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                Backend.__call(method, params, httpMethod)
                    .then(r => {
                        let contentType = r.headers.get('Content-Type');
                        if (contentType && contentType.includes('application/json')) {
                            r.json().then(data => {
                                if (data.response !== undefined) {
                                    if (retFull) {
                                        resolve({ data: data.response, headers: r.headers });
                                    } else {
                                        resolve(data.response);
                                    }
                                } else if (data.error !== undefined && data.error && data.error.message !== undefined) {
                                    reject(data.error);
                                } else {
                                    reject(data);
                                }
                            });
                        } else {
                            if (retry > 0) {
                                setTimeout(() => {
                                    Backend.request(method, params, httpMethod, retFull, retry - 1)
                                        .then(resolve)
                                        .catch(reject);
                                }, Math.random() * 1e3);
                            } else {
                                throw new Error(httpMethod + ' ' + method + ' response ' + r.status);
                            }
                        }
                    })
                    .catch(e => {
                        if (e && e.network && retry > 0) {
                            setTimeout(() => {
                                Backend.request(method, params, httpMethod, retFull, retry - 1)
                                    .then(resolve)
                                    .catch(reject);
                            }, Math.random() * 1e3);
                        } else {
                            reject(e);
                        }
                    });
            } catch (e) {
                if (retry > 0) {
                    setTimeout(() => {
                        Backend.request(method, params, httpMethod, retFull, retry - 1)
                            .then(resolve)
                            .catch(reject);
                    }, Math.random() * 1e3);
                } else {
                    reject(e);
                }
            }
        });
    }

    static stringify(object, asRaw = false, prefix: string = null) {
        type KV = { k: string; v: any };
        let arr: KV[] = [];
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                let value = object[key];
                if (value === undefined) {
                    continue;
                }
                if (typeof value.forEach === 'function') {
                    value.forEach(i => arr.push({ k: (prefix ? prefix + '[' + key + ']' : key) + '[]', v: i }));
                } else if (typeof value === 'object') {
                    let resolve = Backend.stringify(value, true, prefix ? prefix + '[' + key + ']' : key);
                    Array.isArray(resolve) && resolve.forEach(i => arr.push(i));
                } else {
                    arr.push({ k: prefix ? prefix + '[' + key + ']' : key, v: value });
                }
            }
        }

        if (asRaw) {
            return arr;
        } else {
            return arr.map(e => e.k + '=' + encodeURIComponent(e.v)).join('&');
        }
    }
}
