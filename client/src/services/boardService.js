import { client } from '../helpers/client'
import config from '../config'
import data from '../data'

const boardService = {

    async getBoardDetails() {

        return data;

        let url = config.app.api_url + '/board-details'


        let res = await client.get(url)
        return res.data
    },

    async updateBoard(data) {

        // let uWalletUrl = config.app.api_url + '/details'

        // let headers = AUTH_HEADER

        // let params = { ...DEFAULT_PARAMS, ...data }
        // let res = await client.get(uWalletUrl, headers, params)
        // return res.data

    },

    async addCard(data) {

        // let formData = {
        //     service_types: data
        // }

        // let url = config.app.api_url + '/update-service'

        // let headers = AUTH_HEADER

        // let params = { ...DEFAULT_PARAMS, ...formData }
        // let res = await client.post(url, headers, params)
        // return res.data

    },


    errorMessage(e) {

        return e.message || e.data.message || e.response.data.message || 'Something went wrong!';

    }
}

export default boardService;