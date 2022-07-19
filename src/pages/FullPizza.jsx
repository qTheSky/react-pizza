import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

export const FullPizza = () => {
		const [pizza, setPizza] = React.useState()
		const {id} = useParams()
		const navigate = useNavigate()

		React.useEffect(() => {
				async function fetchPizza() {
						try {
								const {data} = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id)
								setPizza(data)
						} catch (e) {
								alert('Ошибка при получении пиццы!')
								navigate('/')
						}
				}

				fetchPizza()
		}, [])

		if (!pizza) {
				return 'Загрузка...'
		}

		return (<div>
				<img src={pizza.imageUrl} alt=""/>
				<h2>{pizza.title}</h2>
				<h4>{pizza.price} Р</h4>
		</div>)
}

