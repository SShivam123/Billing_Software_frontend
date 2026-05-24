import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom"
import AppContextProvider from './Pages/AppContextProvider.jsx';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(

  // <BrowserRouter>
  <HashRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </HashRouter>
  // </BrowserRouter>

)
