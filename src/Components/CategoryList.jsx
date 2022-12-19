import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { selectCategiries } from '../redux/slices/categorySlice'
import { getCategories } from '../redux/requests'
import { useEffect } from 'react'

export const CategoryList = () => {

    const dispatch = useDispatch();
    const categories = useSelector(selectCategiries);
    const options = []

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        categories.map((category) => {
            options.push({
                value: category.id,
                label: category.title
            })
        })
    }, [categories])


    

    return (
        <Select className="form-control" placeholder="Category" options={options} />
    )
}