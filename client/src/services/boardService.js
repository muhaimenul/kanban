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
        let item = res.data

        let firstListIndex = 0;
        let list = lists[Object.keys(lists)[firstListIndex]];
        let items = [...list.items];

        items.push(item)

        lists[list._id] = {
            ...list,
            items: items
        }

        setLists({...lists});

    },


    async updateBoard(result, lists, setLists) {
        if (!result.destination) return;
        let { source, destination } = result;

        let sourceList = lists[source.droppableId];
        let sourceItems = [...sourceList.items];
        let [removed] = sourceItems.splice(source.index, 1);

        let board;

        if (source.droppableId !== destination.droppableId) {
            let destList = lists[destination.droppableId];
            let destItems = [...destList.items];
            destItems.splice(destination.index, 0, removed);

            board = {
                ...lists,
                [source.droppableId]: {
                    ...sourceList,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destList,
                    items: destItems
                }
            }

            setLists(board);
        } else {
            sourceItems.splice(destination.index, 0, removed);
            board = {
                ...lists,
                [source.droppableId]: {
                    ...sourceList,
                    items: sourceItems
                }
            }

            setLists(board);
        }

        let url = config.app.api_url + '/board'

        let params = { board: board }
        await client.post(url, [], params)
    },


    errorMessage(e) {

        return e.message || e.data.message || e.response.data.message || 'Something went wrong!';

    }
}

export default boardService;