import React, { useState, useEffect } from 'react';
import { APIpath } from '../helpers/Apipath';


const Allproducts = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const firmid = localStorage.getItem('firmid');
        const response = await fetch(`${APIpath}/product/${firmid}/products`);
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
    }


    const handledelete = async (productid) => {
        
        try {
             const response = await fetch(`${APIpath}/product/${productid}`,{
                method:'DELETE'
             });
             const data = await response.json();

             if(response.ok){
                
                
                if(confirm("Are you sure you want to delete this product?")){
                    setProducts(products.filter((product) => product._id !== productid));
                    alert("Product deleted successfully");
                }else{
                    alert("Product not deleted");
                }
                
                
             }
        } catch (error) {
            console.error("product not deleted");
        }
    }
    useEffect(() => {
        console.log("hbd");
        getProducts();
    }, []);

    return (
        <div>
            {!products ? (
                <h1>No products added</h1>
            ) : (
                <div>
                    <table className='aptable'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>image</th>
                                <th>Bestseller</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return(
                                    <>
                                     <tr key={product._id}>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.image && (<img src={`${APIpath}/uploads/${product.image}`} alt={product.productName} />)} </td>
                                    <td>{product.bestseller ? 'Yes' : 'No'}</td>
                                    <td><button onClick={()=>handledelete(product._id)}>Delete</button></td>
                                </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Allproducts;