import React from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import TrelloCard from "./TrelloCard";

const ItemIteration = ({ item, index, status }: any) => {
  return (
    <>
      <Draggable key={item.id} draggableId={item.id + ""} index={index}>
        {(provided: DraggableProvided | any, snapshot: DraggableStateSnapshot) => (
          <div className="my-3">
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <TrelloCard data={item} status={status} />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default ItemIteration;