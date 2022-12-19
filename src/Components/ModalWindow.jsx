import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';


export const ModalWindow = ({ setActive ,children }) => {
    const modalRef = useRef();

    useEffect(() => {

        const handleClick = (event) => {
            if(event.path.includes(modalRef.current)){
                setActive(false);
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
