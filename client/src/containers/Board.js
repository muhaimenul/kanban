import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import '../App.css';
import { DragDropContext } from "react-beautiful-dnd";

// api srvices
import boardService from '../services/boardService'

// components
import Column from '../components/Column';
import AddCard from '../components/AddCard';

import { useInput } from '../helpers/customHooks'

function Board() {
    const [columns, setColumns] = useState(null);
    const [cardTitle, handleCardTitleChange, setCardTitle] = useInput('');



    useEffect(() => {
        (async () => {
            try {
                let board = await boardService.getBoardDetails()
                setColumns(board);
            } catch (e) {
                alert(boardService.errorMessage(e))
            }
        })()
    }, [])


    const addTask = async () => {
        try {
            await boardService.addCard(columns, cardTitle, setColumns)
            setCardTitle('')
        } catch (e) {
            alert(boardService.errorMessage(e))
        }
    }


    const changeCardStatus = async (result, columns) => {
        try {
            await boardService.updateBoard(result, columns, setColumns)
        } catch (e) {
            alert(boardService.errorMessage(e))
        }
    };


    return (
        <React.Fragment>

            <AddCard
                onChange={handleCardTitleChange}
                onSubmit={addTask}
            />

            {columns ? (

                <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                    <DragDropContext
                        onDragEnd={result => changeCardStatus(result, columns)}
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
