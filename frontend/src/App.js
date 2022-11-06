import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import AdminProvider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <AdminProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/admin" element={ <AdminPage /> } />
      </Routes>
    </AdminProvider>
  );
}

export default App;
