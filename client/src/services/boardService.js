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

    async updateBoard(result, columns, setColumns) {
        if (!result.destination) return;
        const { source, destination } = result;

        const sourceColumn = columns[source.droppableId];
        const sourceItems = [...sourceColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId !== destination.droppableId) {
            const destColumn = columns[destination.droppableId];
            const destItems = [...destColumn.items];
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                }
            });
        }
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