import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import HomePage from './Component/HomePage/HomePage';
import { NavBarComp } from './Component/NavBar/NavBar';
import AddProduct from './Component/AddProduct/AddProduct';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBarComp />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/addproduct" element={<AddProduct />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
