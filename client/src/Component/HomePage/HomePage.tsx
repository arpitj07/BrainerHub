import React, { useEffect } from 'react';
import jwt from 'jwt-decode';
import ProductList from '../ProductList/ProductList';

const HomePage = () => {
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			const user = jwt(token);
			if (!user) {
				localStorage.removeItem('token');
				window.location.href = '/';
			}
		}
	}, []);

	return (
		<div>
			<ProductList />
		</div>
	);
};

export default HomePage;
