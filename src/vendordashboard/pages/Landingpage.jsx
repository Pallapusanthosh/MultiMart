import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Addfirm from '../components/forms/Addfirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/welcome'
import Allproducts from '../components/Allproducts'

function Landingpage() {

  const[showlogin,setshowlogin] = useState(false);
  const[showregister,setshowregister] = useState(false);
  const[showAddFirm,setshowAddFirm] = useState(false);
  const[showAddProducts,setshowAddProducts] = useState(false);
  const[showwelcome,setshowwelcome] = useState(false);
  const[showallproducts,setshowallproducts] = useState(false);

  const showLoginHandler = ()=>{
    setshowlogin(true);
    setshowregister(false);
    setshowAddFirm(false);
    setshowAddProducts(false);
     setshowwelcome(false);
     setshowallproducts(false);
  }
  const showRegisterHandler = ()=>{
    setshowregister(true);
    setshowlogin(false);
    setshowAddFirm(false);
    setshowAddProducts(false);
     setshowwelcome(false);
     setshowallproducts(false);
  }
  const showFirmHandler = ()=>{
    setshowAddFirm(true);
    setshowlogin(false);
    setshowregister(false);
    setshowAddProducts(false);
     setshowwelcome(false);
     setshowallproducts(false);
  }
  const showProductsHandler = ()=>{
    setshowAddProducts(true);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setshowallproducts(false);
     setshowwelcome(false);
  }
  const showWelcomeHandler = ()=>{
    setshowwelcome(true);
    setshowAddProducts(false);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setshowallproducts(false);
  }
  const showallproductsHandler = ()=>{
    setshowallproducts(true);
    setshowwelcome(false);
    setshowAddProducts(false);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
  }
  const welcomename = ()=>{
    return 
  }
  return (
    <>
      <section className='landing_page'>
      <Navbar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} />
      <section className='collections'>
      <Sidebar showFirmHandler ={showFirmHandler} showProductsHandler = {showProductsHandler} showallproductsHandler = {showallproductsHandler} showLoginHandler = {showLoginHandler}/>
      {showlogin && <Login showWelcomeHandler = {showWelcomeHandler}/> }
      {showregister && <Register showLoginHandler = {showLoginHandler}/>}
      { showAddFirm && <Addfirm  showProductsHandler = {showProductsHandler}/> }
      { showAddProducts && <AddProduct/>}
      {showwelcome && <Welcome/> }
      {showallproducts && <Allproducts/>}
      
      </section>
      </section>
      
    </>
  )
}

export default Landingpage
