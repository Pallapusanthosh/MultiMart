import React, { useState } from 'react'
import { APIpath } from '../../helpers/Apipath';


function AddProduct() {

    const [productName,setproductName] = useState('');
    const [price,setprice] = useState('');
    const [category,setcategory] = useState([]);
    const [image,setimage]=  useState(null);
    const [bestseller,setbestseller] = useState(false);
    const [description,setdescription] = useState('');

    const handleimageupload = (e)=>{
      
        alert(selecetdimage);
        setimage(  e.target.files[0]);
    }
    const handlecategorychange = (e)=>{
        const value = e.target.value;
        if(category.includes(value)){
            setcategory(category.filter((item)=>item!==value)); 
        }
        else{
            setcategory([...category,value])
        }
   }
   const handlebestseller = (event)=>{
      const value = event.target.value === "true"
      setbestseller(value)
   }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('productName',productName);
        formdata.append('price',price);
        category.forEach(ele => formdata.append('category',ele));
        formdata.append('image',image); 
        formdata.append('bestseller',bestseller);
        formdata.append('description',description);
        const firm_id = localStorage.getItem("firmid");
        const logintoken = localStorage.getItem("logintoken");
        console.log(firm_id,logintoken);
        if (!logintoken || !firm_id){
            console.error("user not authenticated");
        }
        console.log(formdata);
        try {
            const response =  await fetch(`${APIpath}/product/add-product/${firm_id}`,{
                method : 'POST',
               
                body:formdata
            })
            const data =  await response.json();
            if (response.ok){
                
                console.log(data);
                alert('product added successfully');
            }
        } catch (error) {
            // console.log(data.message);
            alert('failed to add product');
            console.log(error);
        
        }
       

    }

  return (
    <div className='addproductSection'>
         <form className='tableform' onSubmit={handlesubmit}>
          <h3>Add Product</h3>
           <label >Product Name</label>
           <input type='text' placeholder='Enter the product Name' value={productName} onChange={(e)=>setproductName(e.target.value)}></input>
           <label >Price</label>
           <input type='text' placeholder='Enter the Price' value={price} onChange={(e)=>setprice(e.target.value)}></input>
            <div className="check-inp">
           <label className='header' >category</label>
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                            <label>veg</label>
                            <input type='checkbox' value="veg" checked={category.includes('veg')} onChange={handlecategorychange} ></input>
                        </div>
                    <div className="checkboxcontainer">
                        <label>Non-veg</label>
                        <input type='checkbox' value="non-veg" checked={category.includes('non-veg')} onChange={handlecategorychange}></input>
                    </div>
                </div>
            </div>
            <div className="radio-inp">
                <label className='header' >bestsellar</label>
                <div className="radiocontainer">
                    <div className="radiobtn">
                            <label>yes</label>
                            <input type='radio' value="true" checked={bestseller === true} onChange={handlebestseller} ></input>
                        </div>
                    <div className="radiobtn">
                        <label>no</label>
                        <input type='radio' value="false" checked={bestseller === false}  onChange={handlebestseller}></input>
                    </div>
                </div>
            </div>
           <label >Description</label>
           <input type='text' placeholder='Enter the Description' value={description} onChange={(e)=>setdescription(e.target.value)}></input>
           <label >Product Image</label>
           <input type='file' placeholder='image path'   onChange={handleimageupload}></input>
       
       <div className="btnSubmit">
            <button type='submit'>
                Submit
            </button>
        </div>
       </form>
    </div>
  )
}

export default AddProduct;
