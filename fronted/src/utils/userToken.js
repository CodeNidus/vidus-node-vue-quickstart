/**
 * Override videoconference axios request
 * User Token Generate
 * @param axios
 * @returns {Promise<unknown>}
 */

import configs from '../configs'

const axiosRequest = (axios) => {
    return new Promise((resolve, reject) => {
        const username = document.getElementById('usernameField').value
        const url = `${configs.base_url}${configs.token.endpoint}`

        axios.post(url, {
           username: username
        }).then(async response => {
            resolve(response.data)
        }, error => {
            reject('Error happened! ' + error.response.data.message)
        })
    })
}

export default axiosRequest