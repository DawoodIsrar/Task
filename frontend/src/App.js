import './App.css'
import { useEffect, useState } from 'react';
import Login from '.././src/components/pages/Login';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Registration from '.././src/components/pages/Registration';
import Home from '.././src/components/pages/Home' 
function App() {
    
   return(
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Login/>}>
      </Route>
      <Route path='/register' element={<Registration/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </Router>
   
     </>
   )
    
    
  }



export default App

