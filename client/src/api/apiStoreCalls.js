import axios from "axios";

export const getAllStoresRequest = (token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        }
    }
    return axios.get("http://localhost:5000/store", config).then(response => {
        return response
    }).catch((error) => error)
}

export const getStoreByIDRequest = (id, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        }
    }
    return axios.get(`http://localhost:5000/store/${id}`, config).then(response => {
        return response
    }).catch((error) => error)
}

export const deleteStoreRequest = (id, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: id

    };
    return axios.delete("http://localhost:5000/store", { headers: config.headers, data: config.data }).then(response => {
        return response
    }).catch((error) => error)
}

export const postNewStoreRequest = (body, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: body
    }
    return axios.post("http://localhost:5000/store", config.data, { headers: config.headers }).then(response => {
        return response
    }).catch((error) => error)
}


export const updateStoreRequest = (body, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: body

    };
    return axios.put("http://localhost:5000/store", config.data, { headers: config.headers }).then(response => {
        return response
    }).catch((error) => error)
}
