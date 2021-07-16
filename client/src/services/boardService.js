import { client } from '../helpers/client'
import config from '../config'

const boardService = {

    async getBoardDetails() {
        let url = config.app.api_url + '/board'
        let res = await client.get(url)
        return res.data
    },


    async addCard(lists, content, setLists) {


        let url = config.app.api_url + '/task'


        let params = { content: content }
        let res = await client.post(url, [], params)
        // return res.data
        console.log(res)

        const item = res.data


        let firstColumnIndex = 0;

        const column = lists[Object.keys(lists)[firstColumnIndex]];

        console.log(column);
        const items = [...column.items];
        // TODO:: generate id from server 
        items.push(item)

        lists[column._id] = {
            ...column,
            items: items
        }

    

        setLists({...lists});


    },


    async updateBoard(result, lists, setLists) {
        if (!result.destination) return;
        const { source, destination } = result;

        const sourceColumn = lists[source.droppableId];
        const sourceItems = [...sourceColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId !== destination.droppableId) {
            const destColumn = lists[destination.droppableId];
            const destItems = [...destColumn.items];
            destItems.splice(destination.index, 0, removed);
            setLists({
                ...lists,
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
            setLists({
                ...lists,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                }
            });
        }
    },


    errorMessage(e) {

        return e.message || e.data.message || e.response.data.message || 'Something went wrong!';

    }
}

export default boardService;