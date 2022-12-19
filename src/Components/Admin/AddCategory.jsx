import { useState } from "react"
import { selectProfile } from '../../redux/slices/authSlice'
import { createCategory } from "../../redux/requests";
import { useDispatch, useSelector } from "react-redux";



export const AddCategory = () => {
    // const user = useSelector(selectProfile)
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const validateData = (e) => {
        //if (user)
        e.preventDefault();
        dispatch(createCategory({ text: text, description: description }))
    }


    return (
        <div className="add-form-group">
            <input type="text" className="form-control" placeholder="Category name" value={text} onChange={e => setText(e.target.value)} />
            <input type="text" className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <button className="btn btn-success" onClick={(e) => validateData(e)}>
                <div className="main-btn">
                    Add category
                </div>
            </button>
        </div>
    )
}