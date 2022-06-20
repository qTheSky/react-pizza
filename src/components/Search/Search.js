import React from 'react';
import s from './Search.module.scss'

export const Search = ({searchValue, setSearchValue}) => {
		return (
				<div className={s.root}>
						<img className={s.icon} src="./img/icons8-search.svg" alt="search"/>
						<input value={searchValue}
						       onChange={e => setSearchValue(e.currentTarget.value)}
						       className={s.input}
						       placeholder="Поиск пиццы..."/>
						{searchValue &&
								<img onClick={() => setSearchValue('')} className={s.clearIcon} src="./img/close-icon.svg" alt="close"/>
						}
				</div>
		);
};
