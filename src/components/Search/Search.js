import React from 'react';
import debounce from 'lodash.debounce'
import s from './Search.module.scss'
import {useDispatch} from 'react-redux';
import {setSearchValue} from '../../redux/slices/filterSlice';

export const Search = () => {
				const dispatch = useDispatch();
				const [value, setValue] = React.useState('');
				const inputRef = React.useRef(null);

				const onClickClear = () => {
						dispatch(setSearchValue(''));
						setValue('');
						inputRef.current.focus();
				};

				const updateSearchValue = React.useCallback(
						debounce((str) => {
								dispatch(setSearchValue(str));
						}, 150), [],);

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
								{value &&
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
