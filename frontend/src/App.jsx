import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Services from './pages/Services'
import Appointment from './components/Appointment'
import Login from './components/Login'
import Logout from './components/Logout'
import Reg from './components/Reg'
import Profilecard from './components/Profilecard'
import Blogs from './pages/Blogs'
import Packages from './components/Packages'
import Error from './components/Error'
import Admin from './pages/Admin'
import ProductPage from './components/ProductPage'
import AboutUs from "./components/AboutUs"; 
import Cart from './components/Cart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Article from './pages/Article'


function App() {
  

  return (
    <>

        <BrowserRouter>

            <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/services' element={<Services/>}/>
              <Route path='/appointment' element={<Appointment/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/registration' element={<Reg/>}/>
              <Route path='/profile' element={<Profilecard/>}/>
              <Route path='/blogs' element={<Blogs/>}/>
              <Route path='/packages' element={<Packages/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/*' element={<Error/>}/>
              <Route path="/products" element={<ProductPage />} />
              <Route path="/about" element={<AboutUs />} /> 
              <Route path="/cart" element={<Cart />} />
              <Route path="/articles" element={<Article/>} />
            </Routes>        

        </BrowserRouter>
    
    </>
  )
}

export default App
