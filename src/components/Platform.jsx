import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Chatbot from "./Chatbot"
import { Analytics } from "@vercel/analytics/react"

const Platform = () => {
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
          navigate('/login');
        }
      }, []);

    return (
    <div className="flex justify-center bg-gray-50 w-full">
        <Analytics/>
            <Chatbot/>
    </div>
    
    )
}

export default Platform