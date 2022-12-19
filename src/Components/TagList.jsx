import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../redux/requests';
import { useEffect } from 'react';
import { selectTags } from '../redux/slices/tagSlice';

export const TagList = () => {

    const dispatch = useDispatch();
    const tags = useSelector(selectTags)
         
    const options = [];
    useEffect(() => {
        dispatch(getTags())
    }, [])

    useEffect(() => {
        tags.map((tag) => {
            options.push({
                value: tag.id,
                label: tag.text
            });
        })
    }, [tags])

    const animatedComponents = makeAnimated(); {
        return (
            <Select
                className="form-control"
                closeMenuOnSelect={false}
                placeholder="Tags"
                components={animatedComponents}
                isMulti
                options={options}
            />
        );
    }
}