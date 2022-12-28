import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Select from "react-select";

const TrelloForm = ({ items, setItems, tasks }: any) => {
    //const tasks = JSON.parse(localStorage.getItem("tasks")!);
    const [selectedOption, setSelectedOption] = useState("none");
    const options = [
        { value: "Sivadharshini", label: "Sivadharshini" },
        { value: "Vellaiyan", label: "Vellaiyan" },
        { value: "Sanjay", label: "Sanjay" },
        { value: "Gowtham", label: "Gowtham" },
        { value: "Jubair", label: "Jubair" },
        { value: "Yosva", label: "Yosva" },
        { value: "Deepak", label: "Deepak" }
    ];
    const formOnSumbit = (e: any) => {
        e.preventDefault();
        console.log(e);
    };
    const handleTypeSelect = (e: any) => {
        setSelectedOption(e.value);
    };
    const handleSubmit = (event: any) => {
        const nextId = JSON.parse(localStorage.getItem("nextId")!);
        event.preventDefault();
        const trelloForm = document.forms[0];
        const formData = new FormData(trelloForm);
        console.log(formData);
        const object = Object.fromEntries(formData);

        const newTask = {
            id: nextId.id + 1,
            task: object.task,
            description: object.description,
            date: object.date,
            employeeId: object.employeeId,
            userName: object.employee,
        };
        tasks.upComing.push(newTask);
        console.log(tasks);
        setItems(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        const value = {
            id: nextId.id + 1,
        };
        localStorage.setItem("nextId", JSON.stringify(value));
    };

    return (
        <>
            <form onSubmit={handleSubmit} name="trelloForm">
                <Row>
                    <Col lg={12}>
                        <div>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="task">Task</label>
                                <input
                                    type="text"
                                    name="task"
                                    className="form-control w-75"
                                    placeholder="Enter task"
                                    required
                                />
                            </div>

                            <br></br>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="description">Description</label>
                                <textarea

                                    className="form-control w-75"
                                    placeholder="Enter description"
                                    name="description"
                                    required
                                />
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="date" className="py-1">Target Date</label>
                                <input
                                    type="date"
                                    className="form-control w-25"
                                    name="date"
                                    placeholder="Enter target date"
                                    required
                                />

                                <br></br>

                                <label htmlFor="employeeId" className="py-1" >Employees</label>
                                <br></br>
                                <Select
                                    name="employee"
                                    className="w-50"
                                    options={options}
                                    onChange={handleTypeSelect}
                                />
                            </div>
                            <br></br>
                            <Button
                                type="submit"
                                className="btn btn-success position-absolute submit"
                                onSubmit={formOnSumbit}
                            >
                                Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default TrelloForm;
