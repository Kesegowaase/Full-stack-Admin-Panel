import axios from "axios";

export const getAllConsumablesRequest = (token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        }
    }
    return axios.get("http://localhost:5000/consumable", config).then(response => {
        return response
    }).catch((error) => error)
}

export const getConsumableByIDRequest = (id, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        }
    }
    return axios.get(`http://localhost:5000/consumable/${id}`, config).then(response => {
        return response
    }).catch((error) => error)
}

export const deleteConsumableRequest = (id, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: id

    };
    return axios.delete("http://localhost:5000/consumable", { headers: config.headers, data: config.data }).then(response => {
        return response
    }).catch((error) => error)
}

export const postNewConsumableRequest = (body, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: body
    }
    return axios.post("http://localhost:5000/consumable", config.data, { headers: config.headers }).then(response => {
        return response
    }).catch((error) => error)
}


export const updateConsumableRequest = (body, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: body

    };
    return axios.put("http://localhost:5000/consumable", config.data, { headers: config.headers }).then(response => {
        return response
    }).catch((error) => error)
}
