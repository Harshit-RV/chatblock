import LeftProfile from "./LeftProfile"
import Transanctions from "./Transanctions"

const Platform = () => {
    return (
    <div className="grid md:grid-cols-6 gap-4">
        <div className="md:col-span-1 bg-gray-300">
            <LeftProfile />
        </div>
        <div className="md:col-span-4 bg-red-500">
            Chat Section
        </div>
        <div className="md:col-span-1 bg-gray-300">
            <Transanctions/>
        </div>
    </div>
    
    )
}

export default Platform