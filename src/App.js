import { Navbar } from "react-bootstrap";
import "./App.css";
import TodoApp from "./TodoApp";
import Navcustom from "./Navcustom";
import { Route, Routes } from "react-router";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";
function App() {
  return (
    <div className="App">
      <Navcustom />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<TodoApp />} />
        <Route path="register" element={<Register />} />
        <Route path="api/verify-email" element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
