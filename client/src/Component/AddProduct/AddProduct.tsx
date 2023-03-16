import React, { useState, useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './AddProduct.styles.css';
import jwt from 'jwt-decode';

const AddProduct = () => {
	const [ Productname, setProductname ] = useState('');
	const [ Productdescription, setProductdescription ] = useState('');
	const [ ProductImage, setProductImage ] = useState('');

	const [ ProductQuantity, setProductQuantity ] = useState('');
	const [ ProductPrice, setProductPrice ] = useState('');

	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = jwt(token);
			if (!user) {
				localStorage.removeItem('token');
				window.location.href = '/';
			}
		} else {
			window.location.href = '/';
		}
	}, []);

	const handleAddProduct = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (
			ProductImage.length > 0 &&
			ProductPrice.length > 0 &&
			ProductQuantity.length > 0 &&
			Productdescription.length > 0 &&
			Productname.length > 0
		) {
			setLoading(true);

			const resp = await fetch(`${process.env.REACT_APP_API}/api/addproduct`, {
				method: 'POST',
				body: JSON.stringify({
					Productname,
					ProductImage,
					Productdescription,
					ProductQuantity,
					ProductPrice
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await resp.json();

			if (data.status == 'ok') {
				setLoading(false);
				setAlertStatus(1);
				setMessage(data.message);

				setTimeout(() => {
					navigate('/home');
				}, 500);
			} else if (data.status === 'error') {
				setLoading(false);
				setAlertStatus(2);
				setMessage(data.message);
			}
		} else {
			setAlertStatus(2);
			setMessage('Some fields are empty');
		}
	};

	return (
		<div className="addproductwrapper">
			{loading ? (
				<CircularProgress />
			) : alertStatus !== 0 ? (
				<Alert
					onClose={() => {
						window.location.reload();
					}}
					variant="filled"
					severity={alertStatus === 1 ? 'success' : 'error'}
				>
					{message}
				</Alert>
			) : null}
			<div className="addproductcontainer">
				<div className="addproductdetails">
					<h3>Add Product Details</h3>
					<label>Name:</label>
					<input
						type="text"
						value={Productname}
						onChange={(e) => setProductname(e.target.value)}
						placeholder="add name"
					/>
					<label>Image Url:</label>
					<input
						type="text"
						value={ProductImage}
						onChange={(e) => setProductImage(e.target.value)}
						placeholder="add Image"
					/>
					<label>Description:</label>
					<input
						type="text"
						value={Productdescription}
						onChange={(e) => setProductdescription(e.target.value)}
						placeholder="add description"
					/>

					<label>Price:</label>
					<input
						type="text"
						value={ProductPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						placeholder="add Price"
					/>

					<label>Quantity:</label>
					<input
						type="text"
						value={ProductQuantity}
						onChange={(e) => setProductQuantity(e.target.value)}
						placeholder="add Quantity"
					/>

					<button onClick={(e) => handleAddProduct(e)}>Add Product</button>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
