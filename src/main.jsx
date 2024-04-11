import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Analytics/>
        <App />
    </BrowserRouter>
)
