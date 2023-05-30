import axios from "axios";

export const postSigninRequest = (data) => {
    return axios.post("http://localhost:5000/auth", data).then(response => {
        return response
    }).catch((error) => error)
}