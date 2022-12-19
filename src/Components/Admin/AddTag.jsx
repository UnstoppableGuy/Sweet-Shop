import { useState } from "react"
import { selectProfile } from '../../redux/slices/authSlice'
import { createTag } from "../../redux/requests";
import { useDispatch, useSelector } from "react-redux";



export const AddTag = () => {
    // const user = useSelector(selectProfile)
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const validateData = (e) => {
        e.preventDefault();
        dispatch(createTag({ text: text}))
    }

    return (
        <div className="add-form-group">
            <input type="text" className="form-control" placeholder="Tag name" value={text} onChange={e => setText(e.target.value)} />
            <button className="btn btn-success" onClick={(e) => validateData(e)}>
                <div className="main-btn">
                    Add tag
                </div>
            </button>
        </div>
    )
}