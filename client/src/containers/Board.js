import React, { Fragment, useState, useEffect } from "react";
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                let board = await boardService.getBoardDetails()
                setLists(board);
            } catch (e) {
                alert(boardService.errorMessage(e))
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])


    const addTask = async () => {

        if(!cardTitle) return alert('Title can not be empty!')

        setIsLoading(true)
        try {
            await boardService.addCard(lists, cardTitle, setLists)
            setCardTitle('')
        } catch (e) {
            console.log(e.response.data.message, e.response)
            alert(boardService.errorMessage(e))
        } finally {
            setIsLoading(false)
        }
    }


    const changeCardStatus = async (result, lists) => {
        setIsLoading(true)
        try {
            await boardService.updateBoard(result, lists, setLists)
        } catch (e) {
            alert(boardService.errorMessage(e))
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <Fragment>

            {isLoading ?
                <img src={logo} className="App-logo" alt="logo" />
                :
                <>
                    <AddCard
                        cardTitle={cardTitle}
                        onChange={handleCardTitleChange}
                        onSubmit={addTask}
                    />

                    {lists && (
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
                    )}
                </>
            }

        </Fragment>
    );
}

export default Board;
