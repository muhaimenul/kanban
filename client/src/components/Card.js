import React from 'react'
import { Draggable } from "react-beautiful-dnd";

const Card = props => {
    let { item, index } = props;

    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "10px",
                            backgroundColor: snapshot.isDragging
                                ? "rgb(148 151 169)"
                                : "rgb(190 189 189)",
                            color: "white",
                            ...provided.draggableProps.style
                        }}
                    >
                        {item.content}
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Card;