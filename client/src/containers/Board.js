import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import '../App.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// api srvices
import boardService from '../services/boardService'

// components
import Column from '../components/Column';


const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
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
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function Board() {
    const [columns, setColumns] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let board = await boardService.getBoardDetails()
                setColumns(board);
            } catch (e) {
                console.log('catch', e)
                alert(boardService.errorMessage(e))
            }
        })()
    }, [])

    return (
        <React.Fragment>

            {columns ? (

                <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result, columns, setColumns)}
                    >
                        {Object.entries(columns).map(([columnId, column], index) => {
                            return <Column
                                columnId={columnId}
                                column={column}
                                index={index}
                            />
                        })}
                    </DragDropContext>
                </div>

            ) : <img src={logo} className="App-logo" alt="logo" />}

        </React.Fragment>
    );
}

export default Board;
