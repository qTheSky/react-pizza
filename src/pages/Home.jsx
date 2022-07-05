import React from 'react';
import qs from 'qs';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';


import {selectFilter} from '../redux/selectors';
import {setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice';
import {SearchContext} from '../App';
import {Sort, sortList} from '../components/Sort';
import {PizzaBlock} from '../components/Pizzablock/PizzaBlock';
import {Categories} from '../components/Categories';
import {Pagination} from '../components/Pagination/Pagination';
import {Skeleton} from '../components/Pizzablock/Skeleton';
import {fetchPizzas} from '../redux/slices/pizzaSlice';

export const Home = () => {
		const navigate = useNavigate();
		const dispatch = useDispatch();
		const isMounted = React.useRef(false);
		const {categoryId, sort, currentPage} = useSelector(selectFilter);
		const {items, status} = useSelector(state => state.pizza);

		const {searchValue} = React.useContext(SearchContext);

		const onChangeCategory = React.useCallback((idx) => {
				dispatch(setCategoryId(idx));
		}, []);


		const onChangePage = (page) => {
				dispatch(setCurrentPage(page));
		};

		const getPizzas = async () => {

				const sortBy = sort.sortProperty.replace('-', '');
				const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
				const category = categoryId > 0 ? `category=${categoryId}` : '';
				const search = searchValue ? `search=${searchValue}` : '';


				dispatch(
						fetchPizzas({
								sortBy,
								order,
								category,
								search,
								currentPage,
						}))

				window.scrollTo(0, 0)
		};

		// Если изменили параметры и был первый рендер
		React.useEffect(() => {
				if (isMounted.current) {
						const queryString = qs.stringify({
								sortProperty: sort.sortProperty,
								categoryId,
								currentPage,
						});

						navigate(`?${queryString}`);
				}
				isMounted.current = true;

		}, [categoryId, sort.sortProperty, currentPage, searchValue]);

		// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
		React.useEffect(() => {
				if (window.location.search) {
						const params = qs.parse(window.location.search.substring(1));

						const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

						dispatch(
								setFilters({
										...params,
										sort,
								}),
						);
				}
		}, []);

		// Если был первый рендер, то запрашиваем пиццы
		React.useEffect(() => {
				getPizzas();
		}, [categoryId, sort.sortProperty, searchValue, currentPage]);

		const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

		const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

		return (
				<div className="container">
						<div className="content__top">
								<Categories value={categoryId} onChangeCategory={onChangeCategory}/>
								<Sort value={sort}/>
						</div>
						<h2 className="content__title">Все пиццы</h2>
						{
								status === 'error'
										? <div className='content__error-info'>
												<h2>Произошла ошибка :(</h2>
												<p>К сожалению не удалось удалить питсы. Попробуйте повторить попытку позже.</p>
										</div>
										: <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
						}


						<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
				</div>
		);
};