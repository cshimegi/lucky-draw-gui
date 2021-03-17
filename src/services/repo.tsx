
const BASE_API = "http://localhost:8080/api/v1";

export default {
    getById : (repo: string, id: number) => {
        const API = `${BASE_API}/${repo}/${JSON.stringify(id)}`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response);
    },

    getBy : (repo: string, body: any) => {
        const API = `${BASE_API}/${repo}/`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            body: JSON.stringify(body)
        })
        .then(response => response);
    },

    getAll : (repo: string) => {
        const API = `${BASE_API}/${repo}/`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response);
    },

    post : (repo: string, body: any) => {
        const API = `${BASE_API}/${repo}/}`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response);
    },

    updateById : (repo: string, id: number, body: any) => {
        const API = `${BASE_API}/${repo}/${JSON.stringify(id)}}`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(response => response);
    },

    partialUpdateById : (repo: string, id: number, body: any) => {
        const API = `${BASE_API}/${repo}/${JSON.stringify(id)}}`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(body)
        })
        .then(response => response);
    },

    deleteById : (repo: string, id: number) => {
        const API = `${BASE_API}/${repo}/${JSON.stringify(id)}}`;

        return fetch(API, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'DELETE'
        })
        .then(response => response);
    }

}