import { FC, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, Col, Row } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ItemIteration from "./ItemIteration";
import List from "./List";
import TrelloForm from "./TrelloForm";

const Content: FC = () => {
  const itemsNormal = {
    upComing: [],
    inProgress: [],
    done: [],
  };

  if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", JSON.stringify(itemsNormal));
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")!);

  const OnDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const removeFromList = (list: any, index: any) => {
      const result = Array.from(list);
      const [removed] = result.splice(index, 1);
      return [removed, result];
    };

    const addToList = (list: any, index: any, element: any) => {
      const result = Array.from(list);
      result.splice(index, 0, element);
      return result;
    };

    const listCopy: any = { ...items };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index);
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    localStorage.setItem("tasks", JSON.stringify(listCopy));
    console.log(listCopy);
    setItems(listCopy);
  };

  const [items, setItems] = useState(tasks);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Trello Form</ModalHeader>
        <ModalBody>
          <TrelloForm items={items} setItems={setItems} tasks={tasks} />
        </ModalBody>
      </Modal>
      <div className="content-container position-absolute top-0"></div>
      <div
        onClick={() => setModal(true)}
        className="position-absolute bottom-0 end-0 p-3  mx-4 my-3 cursor-pointer bg-info rounded mb-0"
      >
        Add New
      </div>
      <DragDropContext onDragEnd={OnDragEnd}>
        <Row className="w-97 m-auto mt-10">
          <Scrollbars style={{ width: 400, height: 300 }}>
            <Col>
              <Card className="bg-light">
                <div className="d-flex py-2 bg-info">
                  <p className="mx-3 my-0 fw-bold">Upcoming</p>
                </div>
                <List title="" onDragEnd={OnDragEnd} name="upComing">
                  {items?.upComing.map((item: any, index: any) => (
                    <ItemIteration
                      draggableId={item.id}
                      item={item}
                      index={index}
                      key={item.id}
                      status={"upComing"}
                    />
                  ))}
                </List>
              </Card>
            </Col>
          </Scrollbars>
          <Scrollbars style={{ width: 400, height: 300 }}>
            <Col>
              <Card className="bg-light">
                <div className="d-flex py-2 bg-danger" >
                  <p className="mx-3 my-0 fw-bold">In Progress</p>
                </div>
                <List title="" onDragEnd={OnDragEnd} name="inProgress">
                  {items?.inProgress.map((item: any, index: any) => (
                    <ItemIteration
                      draggableId={item.id}
                      item={item}
                      index={index}
                      key={item.id}
                      status={"inProgress"}
                    />
                  ))}
                </List>
              </Card>
            </Col>
          </Scrollbars>

          <Scrollbars style={{ width: 400, height: 300 }}>
            <Col>
              <Card className="bg-light ">
                <div className="d-flex py-2 bg-success">
                  <p className="mx-3 my-0 fw-bold ">Done</p>
                </div>
                <List title="" onDragEnd={OnDragEnd} name="done">
                  {items?.done.map((item: any, index: any) => (
                    <ItemIteration
                      draggableId={item.id}
                      item={item}
                      index={index}
                      key={item.id}
                      status={"done"}
                    />
                  ))}
                </List>
              </Card>
            </Col>
          </Scrollbars>
        </Row>
      </DragDropContext>
    </>
  );
};

export default Content;