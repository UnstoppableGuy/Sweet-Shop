import { useState } from "react";
import Category from "../models/Category";
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveCategory, setCategoryId } from "../redux/slices/filterSlice";
import { selectCategiries } from "../redux/slices/categorySlice";

function Categories(){

  const activeCategory = useSelector(selectActiveCategory);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategiries);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  }

    return (
      <div className="categories">
      <ul>
        {
          categories.map((category, index) => {
            
            return (
              <li
                key={index}
                onClick={() => {onClickCategory(category.id);}}
                className={activeCategory === category.id ? 'active' : ''}
              >
                {category.title}
              </li>
            )
          })
        }
      </ul>
    </div>
    )
  }

  export default Categories;

  