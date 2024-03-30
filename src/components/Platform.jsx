import LeftProfile from "./LeftProfile"
import Transanctions from "./Transanctions"
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Platform = () => {
    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
          navigate('/login');
        }
      }, []);

    return (
    <div className="grid md:grid-cols-6 gap-4">
        <div className="md:col-span-1 bg-gray-50">
            <LeftProfile />
        </div>
        <div className="md:col-span-4 bg-red-500">
            Chat Section
        </div>
        <div className="md:col-span-1 bg-gray-50">
            <Transanctions/>
        </div>
    </div>
    
    )
}

export default Platform