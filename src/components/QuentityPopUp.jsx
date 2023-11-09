import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function QuentityPopUp({ visible, onClose }) {

    const {id} = useParams();

    const [data, setData] = useState({
        productID: id,
        quntity: ""
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            // productID, // Add productId
            quntity: data.quntity,
        };
        axios.post("https://localhost:7184/api/Order", userData).then((response) => {
            console.log(response.status, response.data.token);
        });
    };

    // console.log(data);

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    if (!visible) return null;

    return (
        <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-2 border-2 border-green-500 rounded'>
                <h1 className="font-semibold text-center text-xl text-gray-700 p-4">
                    Pleace Add Quentity
                </h1>
                {/* <p className="text-center text-gray-700 mb-5">Sign in</p> */}
                <form onSubmit={handleSubmit} className='p-4'>
                    <div className="flex flex-col">
                        <input
                            onChange={handleChange}
                            value={data.quentity}
                            type="text"
                            name='quentity'
                            className="border border-gray-700 p-2 rounded mb-4"
                            placeholder="Add Quentity"
                        />
                    </div>
                    <div className="text-center">
                        <button type="addtocart" className="px-5 py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray focus:ring-2 focus:ring-green-500">
                            ADD TO CART
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
