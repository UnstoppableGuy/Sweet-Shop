import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "../redux/slices/authSlice";
import { updateProduct } from "../redux/requests";
import { useEffect } from "react";
import { selectProduct } from "../redux/slices/transitSlice";
import { useNavigate } from "react-router-dom";
import { selectShopInfo } from "../redux/slices/profileSlice";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"
import Select from 'react-select';
import { useMemo } from "react";
import { selectTags } from "../redux/slices/tagSlice";
import { getTags } from "../redux/requests";
import { selectCategiries } from "../redux/slices/categorySlice";
import { getCategories } from "../redux/requests";

export const UpdateProduct = () => {
    const [price, setPrice] = useState(0);
    const [url, setUrl] = useState('');
    const [categoryId, setCategoryId] = useState('')
    const [tagsid, setTagsid] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(selectProfile)
    const shop = useSelector(selectShopInfo);
    const [image, setImage] = useState(null)
    const navigate = useNavigate();
    const editProduct = useSelector(selectProduct)
    var product

    useEffect(() => {
        if(shop.ipNumber === ''){
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setPrice(editProduct.price);
    }, [editProduct])

    const validateData = (e) =>{
        e.preventDefault();
        dispatch(updateProduct({ userId: user.id, productId: product.id, price:price, url: url, categoryId: categoryId, tagsid: tagsid }))
    }
    
    const [selectedCategory, setSelectedCategory] = useState(null)
    const categories = useSelector(selectCategiries);

    const [selectedTags, setSelectedTags] = useState(null)
    const tags = useSelector(selectTags);

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        dispatch(getTags())
    }, [])

    const categoryOptions = useMemo(() => {
        return categories.map((category) =>
        ({
            value: category.id,
            label: category.title
        })
        )
    }, [categories])

    const tagsOptions = useMemo(() => {
        return tags.map((tag) =>
        ({
            value: tag.id,
            label: tag.text
        })
        )
    }, [tags])

    const uploadImage = () => {
        if (image == null) return;
        const imageRef = ref(storage, `images/${v4()}`)
        const uploadTask = uploadBytesResumable(imageRef,image)
        uploadTask.on('state_changed',(snapshot) => {
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                console.log("User doesn't have permission to access the object")
                break;
              case 'storage/canceled':
                console.log("User canceled the upload")
                break;
              case 'storage/unknown':
                console.log("Unknown error occurred, inspect error.serverResponse")
                break;
            }
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setUrl(downloadURL)
            });
          }
          );
        // uploadBytes(imageRef, image).then(()=>{
        //worked     alert("uploaded")
    
    };

    const handleChange = (value) => {
        console.info(value)
        setSelectedCategory(value)
    }
    const handleTagChange = (value) => {
        console.info(value)
        setSelectedTags(value)
    }

    return (
        <div className="add-form-group">
            <input type="number" className="form-control" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)}/>
            <input type="file" onChange={(event) => { setImage(event.target.files[0]) }} />
            <button onClick={uploadImage}> uploading </button>
            <Select
                value={selectedCategory}
                onChange={handleChange}
                options={categoryOptions}
            />

            <Select
                value={selectedTags}
                onChange={handleTagChange}
                options={tagsOptions}
                isMulti
            />
            
            <button className="btn btn-success" onClick={(e) => validateData(e)}>
                <div className="main-btn">
                    Update product
                </div>
            </button>
        </div>
    )
}