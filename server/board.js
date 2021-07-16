import { v4 as uuid } from 'uuid';

const cards = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
];

const fC = uuid()
const sC = uuid()
const tC = uuid()


const columns = {
    [fC]: {
        _id: fC,
        name: "To do",
        items: cards
    },
    [sC]: {
        _id: sC,
        name: "In Progress",
        items: []
    },
    [tC]: {
        _id: tC,
        name: "Done",
        items: []
    }
};

export default columns;