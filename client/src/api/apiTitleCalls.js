import axios from "axios";

export const getAllTitlesRequest = (token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        }
    }
    return axios.get("http://localhost:5000/titles", config).then(response => {
        return response
    }).catch((error) => error)
}

export const deleteTitleRequest = (id, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: id

    };
    return axios.delete("http://localhost:5000/titles", { headers: config.headers, data: config.data }).then(response => {
        return response
    }).catch((error) => error)
}

export const postNewTitleRequest = (body, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: body
    }
    return axios.post("http://localhost:5000/titles", config.data, { headers: config.headers }).then(response => {
        return response
    }).catch((error) => error)
}


export const updateTitleRequest = (body, token) => {
    let config = {
        headers: {
            "authorization": "Bearer " + token
        },
        data: body
    };
    return axios.put("http://localhost:5000/titles", config.data, { headers: config.headers }).then(response => {
        return response
    }).catch((error) => error)
}
