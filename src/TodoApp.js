import React, { useState, useEffect } from "react";
import { Button, Form, Table, Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_Host;

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({ _id: null, text: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  console.log(tasks);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/task/getTasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post(`${API_URL}/task/createTask`, {
          text: newTask,
        });
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(`${API_URL}/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await axios.post(`${API_URL}/task/complete/${taskId}`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, completed: response.data.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleEditTask = (taskId, taskText) => {
    setEditTask({ _id: taskId, text: taskText });
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_URL}/task/${editTask._id}`, {
        text: editTask.text,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editTask._id
            ? { ...task, text: response.data.text }
            : task
        )
      );
      setModalOpen(false);
      setEditTask({ _id: null, text: "" });
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      <Form className="mb-4">
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddTask} className="ms-2">
            Add
          </Button>
        </Form.Group>
      </Form>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </td>
              <td>{task.completed ? "Completed" : "Pending"}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                  className="me-2"
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditTask(task._id, task.text)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={isModalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                value={editTask.text}
                onChange={(e) =>
                  setEditTask({ ...editTask, text: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoApp;
