import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import Card from './Card';

const List = props => {
    let { columnId, column, index, ...rest } = props;

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            key={columnId}
        >
            <div
                style={{
                    background: "#f4a44d",
                    height: 50,
                    width: 250,
                    border: "5px solid black"
                }}>
                <h3 style={{
                    color: "black",
                    marginTop: "10px"
                }}>{column.name}</h3>
            </div>

            <div style={{ margin: 8 }}>

                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? "lightblue"
                                        : "rgb(241 252 255)",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 400
                                }}
                            >
                                {column.items.map((item, index) => {
                                    return <Card
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>

            </div>
        </div>
    );
};

export default List;