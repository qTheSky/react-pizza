import React from 'react';
import {Categories} from '../components/Categories';
import {Sort} from '../components/Sort';
import {Skeleton} from '../components/Pizzablock/Skeleton';
import {PizzaBlock} from '../components/Pizzablock/PizzaBlock';
import {Pagination} from '../components/Pagination/Pagination';
import {SearchContext} from '../App';
import {useSelector, useDispatch} from 'react-redux';
import {setCategoryId} from '../redux/slices/filterSlice';

export const Home = () => {
		const dispatch = useDispatch()
		const {categoryId, sort} = useSelector(state => state.filter)


		const {searchValue} = React.useContext(SearchContext)
		const [items, setItems] = React.useState([])
		const [isLoading, setIsloading] = React.useState(true)
		const [currentPage, setCurrentPage] = React.useState(1)


		const onChangeCategory = (id) => {
				dispatch(setCategoryId(id))
		}


		React.useEffect(() => {
				setIsloading(true)

				const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
				const sortBy = sort.sortProperty.replace('-', '')
				const category = categoryId > 0 ? `category=${categoryId}` : ''
				const search = searchValue ? `&search=${searchValue}` : ''

				fetch(`https://62a745dc97b6156bff8b966e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
						.then((res) => res.json())
						.then((arr) => {
								setItems(arr)
								setIsloading(false)
						})
				window.scrollTo(0, 0)
		}, [categoryId, sort.sortProperty, searchValue, currentPage])


		const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
		const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)


		return (<div className="container">
				<div className="content__top">
						<Categories value={categoryId} onChangeCategory={onChangeCategory}/>
						<Sort/>
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
						{isLoading
								? skeletons
								: pizzas}
				</div>
				<Pagination onChangePage={(number) => setCurrentPage(number)}/>
		</div>);
};
