import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login/> }/>
      </Routes>
    </Router>
  );
}
export default App;
