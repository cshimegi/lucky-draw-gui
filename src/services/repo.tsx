
const BASE_API = "http://192.168.12.2:8080/api/v1";

export default {
    getById : (repo: string, id: number) => {
        const API = BASE_API + '/' + repo + '/' + JSON.stringify(id);

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response.json());
    },

    getBy : (repo: string, body: any) => {
        const API = BASE_API + '/' + repo + '/';

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            body: JSON.stringify(body)
        })
        .then(response => response.json());
    },

    getAll : (repo: string) => {
        const API = BASE_API + '/' + repo + '/';

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response.json());
    },

    post : (repo: string, body: any) => {
        const API = BASE_API + '/' + repo + '/';

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response.json());
    },

    updateById : (repo: string, id: number, body: any) => {
        const API = BASE_API + '/' + repo + '/' + JSON.stringify(id);

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(response => response.json());
    },

    partialUpdateById : (repo: string, id: number, body: any) => {
        const API = BASE_API + '/' + repo + '/' + JSON.stringify(id);

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(body)
        })
        .then(response => response.json());
    },

    deleteById : (repo: string, id: number) => {
        const API = BASE_API + '/' + repo + '/' + JSON.stringify(id);

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'DELETE'
        })
        .then(response => response.json());
    }

}