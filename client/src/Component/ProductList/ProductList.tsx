import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './ProductList.styles.css';
import { ProductData } from './ProductTypes';
import SearchIcon from '@mui/icons-material/Search';

const ProductList = () => {
	const [ getProducts, setgetProducts ] = useState<ProductData[]>([]);
	const [ page, setpage ] = useState(1);
	const [ totalPages, settotalPages ] = useState(0);
	const [ Searched, setSearched ] = useState('');

	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const fetchproductList = async () => {
		const resp = await fetch(`${process.env.REACT_APP_API}/api/products`);
		const data = await resp.json();

		if (data && data.data) {
			setgetProducts([ ...data.data ]);
			settotalPages(Math.floor(data.data.length / 6));
		}
	};

	useEffect(
		() => {
			fetchproductList();
		},
		[ page ]
	);

	const requestSearch = (data: ProductData[]) => {
		return data.filter(
			(user: ProductData) =>
				// details.some((detail) => user[detail].toLowerCase().includes(searched.toLowerCase()))
				user['ProductName'].toLowerCase().includes(Searched.toLowerCase()) ||
				user['ProductDesctription'].toLowerCase().includes(Searched.toLowerCase())
		);
	};

	return (
		<div className="GridWrapper">
			<div className="SearchBarContainer">
				<div className="SearchContent">
					<input type="text" placeholder="Search Item" onChange={(e) => setSearched(e.target.value)} />
					<SearchIcon
						sx={{
							position: 'relative',
							left: '-735px',
							top: '12px',
							width: '30px',
							height: '30px'
						}}
					/>
				</div>
				{token && <button onClick={() => navigate('/addproduct')}>Add Product</button>}
			</div>
			<div className="GridContainer">
				{getProducts.length > 0 && Searched.length > 0 ? (
					requestSearch(getProducts).map((prod: ProductData) => {
						return (
							<div className="Product__single" key={prod.ProductName}>
								<div className="ProductImageContainer">
									<img src={prod.ProductImage} alt={prod.ProductName} width="200" />
								</div>
								<div className="productdetails">
									<h3>{prod.ProductName}</h3>
									<p className="truncate">{prod.ProductDesctription}</p>
									<h3>Price: $ {prod.ProductPrice}</h3>
									<h4>Quantity: {prod.ProductQuantity}</h4>
								</div>
							</div>
						);
					})
				) : (
					getProducts.slice(page * 6 - 6, page * 6).map((prod: ProductData) => {
						return (
							<div className="Product__single" key={prod.ProductName}>
								<div className="ProductImageContainer">
									<img src={prod.ProductImage} alt={prod.ProductName} width="200" />
								</div>
								<div className="productdetails">
									<h3>{prod.ProductName}</h3>
									<p className="truncate">{prod.ProductDesctription}</p>
									<h3>Price: $ {prod.ProductPrice}</h3>
									<h4>Quantity: {prod.ProductQuantity}</h4>
								</div>
							</div>
						);
					})
				)}
			</div>
			{<Pagination products={getProducts} page={page} setPage={setpage} totalPages={totalPages} />}
		</div>
	);
};

export default ProductList;
