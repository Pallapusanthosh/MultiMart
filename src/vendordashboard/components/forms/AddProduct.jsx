import React, { useState } from 'react';
import { APIpath } from '../../helpers/Apipath';

function AddProduct() {
    const [productName, setproductName] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState([]);
    const [image, setimage] = useState(null);
    const [bestSeller, setbestSeller] = useState(false);
    const [description, setdescription] = useState('');
    const [loading, setLoading] = useState(false);
    const handleimageupload = (e) => {
        setimage(e.target.files[0]);
    };

    const handlecategorychange = (e) => {
        const value = e.target.value;
        if (category.includes(value)) {
            setcategory(category.filter((item) => item !== value));
        } else {
            setcategory([...category, value]);
        }
    };

    const handlebestSeller = (event) => {
        const value = event.target.value === 'true';
        setbestSeller(value);
    };

    const handlesubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('productName', productName);
        formdata.append('price', price);
        category.forEach((ele) => formdata.append('category', ele));
        formdata.append('image', image);
        formdata.append('bestSeller', bestSeller);
        formdata.append('description', description);

        const firm_id = localStorage.getItem('firmid');
        const logintoken = localStorage.getItem('logintoken');

        if (!logintoken || !firm_id) {
            console.error('User not authenticated');
            return;
        }

        try {
            const response = await fetch(`${APIpath}/product/add-product/${firm_id}`, {
                method: 'POST',
                body: formdata,
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert('Product added successfully');
                setproductName('');
                setprice('');
                setcategory([]);
                setimage(null);
                setbestSeller(false);
                setdescription('');
            }
        } catch (error) {
            alert('Failed to add product');
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="addproductSection w-full flex justify-center">
            <form
                className="tableform w-full max-w-md bg-white/90 border border-indigo-100 rounded-2xl shadow-md p-8"
                onSubmit={handlesubmit}
            >
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
                    Add Product
                </h3>

                {/* Product Name */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                </label>
                <input
                    type="text"
                    placeholder="Enter the product name" 
                    value={productName}
                    onChange={(e) => setproductName(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                />

                {/* Price */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input
                    type="text"
                    placeholder="Enter the price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                />

                {/* Category */}
                <div className="mb-4">
                    <p className="block text-sm font-medium text-gray-700 mb-2">Category</p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value="veg"
                                checked={category.includes('veg')}
                                onChange={handlecategorychange}
                                className="accent-indigo-600"
                            />
                            Veg
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value="non-veg"
                                checked={category.includes('non-veg')}
                                onChange={handlecategorychange}
                                className="accent-indigo-600"
                            />
                            Non-Veg
                        </label>
                    </div>
                </div>

                {/* bestSeller */}
                <div className="mb-4">
                    <p className="block text-sm font-medium text-gray-700 mb-2">bestSeller</p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="true"
                                checked={bestSeller === true}
                                onChange={handlebestSeller}
                                className="accent-purple-600"
                            />
                            Yes
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="false"
                                checked={bestSeller === false}
                                onChange={handlebestSeller}
                                className="accent-purple-600"
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Description */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    placeholder="Enter the description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                />

                {/* Product Image */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Image
                </label>
                <input
                    type="file"
                    onChange={handleimageupload}
                    className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Submit Button */}
                <div className="btnSubmit">
                    <button
                       disabled={loading}
                        type="submit"
                        className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                         {loading ?  "Submitting":"Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
