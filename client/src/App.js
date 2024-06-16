import logo from './logo.svg';
import { Routes, Route, Navigate } from 'react-router-dom';
import Heading from './Components/Header/Heading';
import Main from './Components/Main/Main';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Heading />

      <Routes>
        <Route path="/:id" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;
