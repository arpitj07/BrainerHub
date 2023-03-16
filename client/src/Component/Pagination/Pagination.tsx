import React from 'react';
import './Pagination.styles.css';
import { ProductData } from '../ProductList/ProductTypes';

interface PaginationProps {
	products: ProductData[];
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	totalPages: number;
}

const Pagination = ({ products, setPage, page, totalPages }: PaginationProps): JSX.Element => {
	const handlePage = (selectedPage: number) => {
		// if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
		// }
		setPage(selectedPage);
	};

	return (
		<div className="paginationContainer">
			{products.length > 0 && (
				<div className="pagination">
					<span className={page > 1 ? '' : 'disabled'} onClick={() => handlePage(page - 1)}>
						Prev
					</span>
					{products.length % 10 !== 0 ? (
						[ ...Array(totalPages), products.length % 10 !== 0 ].map((_, i) => {
							return (
								<span
									className={page === i + 1 ? 'pageselected' : ''}
									key={i}
									onClick={() => handlePage(i + 1)}
								>
									{i + 1}
								</span>
							);
						})
					) : (
						[ ...Array(totalPages) ].map((_, i) => {
							return (
								<span
									className={page === i + 1 ? 'pageselected' : ''}
									key={i}
									onClick={() => handlePage(i + 1)}
								>
									{i + 1}
								</span>
							);
						})
					)}
					<span className={page < products.length / 6 ? '' : 'disabled'} onClick={() => handlePage(page + 1)}>
						Next
					</span>
				</div>
			)}
		</div>
	);
};

export default Pagination;
