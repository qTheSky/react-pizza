import React from 'react';
import {Categories} from '../components/Categories';
import {Sort} from '../components/Sort';
import {Skeleton} from '../components/Pizzablock/Skeleton';
import {PizzaBlock} from '../components/Pizzablock/PizzaBlock';

export const Home = () => {
		const [items, setItems] = React.useState([])
		const [isLoading, setIsloading] = React.useState(true)

		React.useEffect(() => {
				fetch('https://62a745dc97b6156bff8b966e.mockapi.io/items').then((res) => res.json())
						.then((arr) => {
								setItems(arr)
								setIsloading(false)
						})
		}, [])

		return (
				<>
						<div className="content__top">
								<Categories/>
								<Sort/>
						</div>
						<h2 className="content__title">Все пиццы</h2>
						<div className="content__items">
								{
										isLoading
												? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
												: items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
								}
						</div>
				</>
		);
};
