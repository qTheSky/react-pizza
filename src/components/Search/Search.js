import React from 'react';
import debounce from 'lodash.debounce'
import s from './Search.module.scss'
import {SearchContext} from '../../App';

export const Search = () => {
				const [value, setValue] = React.useState('')
				const {searchValue, setSearchValue} = React.useContext(SearchContext)
				const inputRef = React.useRef()


				const onClickClear = () => {
						setSearchValue('')
						setValue('')
						inputRef.current.focus()
				}


				const updateSearchValue = React.useCallback(
						debounce((str) => {
								setSearchValue(str)
						}, 250), [],)

				const onChangeInput = (event) => {
						setValue(event.currentTarget.value)
						updateSearchValue(event.currentTarget.value)
				}

				return (
						<div className={s.root}>
								<img className={s.icon} src="./img/icons8-search.svg" alt="search"/>
								<input
										ref={inputRef}
										value={value}
										onChange={onChangeInput}
										className={s.input}
										placeholder="Поиск пиццы..."
								/>
								{searchValue &&
										<img
												onClick={onClickClear}
												className={s.clearIcon}
												src="./img/close-icon.svg"
												alt="close"
										/>
								}
						</div>
				);
		}
;
