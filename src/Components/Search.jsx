import { NavLink, useNavigate} from "react-router-dom";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useCallback } from "react";
import { setSearchValue } from "../redux/slices/filterSlice";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

export const Search = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setValue] = useState('');
    const inputRef = useRef();

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((value) =>{
            dispatch(setSearchValue(value)); 
            dispatch(setCategoryId("00000000-0000-0000-0000-000000000000"));
            dispatch(setCurrentPage(1));
            
            navigate('/');
        }, 800), []
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

  return (
    <div className='container__center__search'>
        <input ref= {inputRef} value={searchValue} onChange = {onChangeInput} type="text" placeholder="Search..." className="container__center__search-input"/>
        {
        searchValue &&
        <svg
            onClick={onClickClear}
            className='icon'
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
        }
    </div>
  )
}
