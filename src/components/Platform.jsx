import { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Chatbot from "./Chatbot"

const Platform = () => {
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
          navigate('/login');
        }
      }, []);

    return (

        <>
            <Chatbot/>
        </>
    )
}

export default Platform