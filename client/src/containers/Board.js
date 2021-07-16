import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import '../App.css';
import { DragDropContext } from "react-beautiful-dnd";

// api srvices
import boardService from '../services/boardService'

// components
import List from '../components/List';
import AddCard from '../components/AddCard';

// custom hooks
import { useInput } from '../helpers/customHooks'

function Board() {
    const [lists, setLists] = useState(null);
    const [cardTitle, handleCardTitleChange, setCardTitle] = useInput('');

    useEffect(() => {
        (async () => {
            try {
                let board = await boardService.getBoardDetails()
                setLists(board);
            } catch (e) {
                alert(boardService.errorMessage(e))
            }
        })()
    }, [])


    const addTask = async () => {
        try {
            await boardService.addCard(lists, cardTitle, setLists)
            setCardTitle('')
        } catch (e) {
            alert(boardService.errorMessage(e))
        }
    }


    const changeCardStatus = async (result, lists) => {
        try {
            await boardService.updateBoard(result, lists, setLists)
        } catch (e) {
            alert(boardService.errorMessage(e))
        }
    };


    return (
        <React.Fragment>

            <AddCard
                cardTitle={cardTitle}
                onChange={handleCardTitleChange}
                onSubmit={addTask}
            />

            {lists ? (

                <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                    <DragDropContext
                        onDragEnd={result => changeCardStatus(result, lists)}
                    >
                        {Object.entries(lists).map(([listId, list], index) => {
                            return <List
                                key={listId}
                                columnId={listId}
                                column={list}
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
