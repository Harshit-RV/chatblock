import { BrowserRouter,Routes,Route } from "react-router-dom"
import Profile from "./components/Profile"
import Login from "./components/Login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
