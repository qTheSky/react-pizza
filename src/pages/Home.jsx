import React from 'react';
import ReactPaginate from 'react-paginate';

import {Categories} from '../components/Categories';
import {Sort} from '../components/Sort';
import {Skeleton} from '../components/Pizzablock/Skeleton';
import {PizzaBlock} from '../components/Pizzablock/PizzaBlock';
import {Pagination} from '../components/Pagination/Pagination';
import {SearchContext} from '../App';

export const Home = () => {
		const { searchValue } = React.useContext(SearchContext)
		const [items, setItems] = React.useState([])
		const [isLoading, setIsloading] = React.useState(true)
		const [categoryId, setCategoryId] = React.useState(0)
		const [currentPage, setCurrentPage] = React.useState(1)
		const [sortType, setSortType] = React.useState({name: 'популярности', sortProperty: 'rating',})


		React.useEffect(() => {
				setIsloading(true)

				const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
				const sortBy = sortType.sortProperty.replace('-', '')
				const category = categoryId > 0 ? `category=${categoryId}` : ''
				const search = searchValue ? `&search=${searchValue}` : ''

				fetch(`https://62a745dc97b6156bff8b966e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
						.then((res) => res.json())
						.then((arr) => {
								setItems(arr)
								setIsloading(false)
						})
				window.scrollTo(0, 0)
		}, [categoryId, sortType, searchValue,currentPage])


		const pizzas = items
				.map(obj =>
						<PizzaBlock key={obj.id} {...obj}/>)
		const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)


		return (<div className="container">
				<div className="content__top">
						<Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
						<Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
						{isLoading
								? skeletons
								: pizzas}
				</div>
				<Pagination onChangePage={(number)=>setCurrentPage(number)}/>
		</div>);
};
