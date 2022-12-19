import React from 'react'
import { useRef, useEffect} from 'react'
import {useNavigate} from "react-router-dom";


export const AuthModalWindow = ({ setActive ,children }) => {

    const modalRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {

        const handleClick = (event) => {
            if(event.path.includes(modalRef.current)){
                navigate('/');
            }
        }
        
        document.body.addEventListener('click', handleClick);

        return () => document.body.removeEventListener('click', handleClick);
    })

    return (
        <div className="modal active" ref={modalRef} >
            <div className="modal__content active_content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
  )
}
