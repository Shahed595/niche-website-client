import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './AddAProduct.css';


const AddAProducts = () => {
    const { register, handleSubmit,reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/products',data)
        .then(res=>{
            // console.log(res)
            if(res.data. insertedId){
                alert('Product Added Successfully');
                reset();
            }
        })    
    }
    return (
        <div className="addProduct">
            <h1>Please Add A Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder='Product Name' />
                <textarea {...register("description")} placeholder='Product Description'/>
                <input type="number" {...register("price")} placeholder='Product Price'/>
                <input {...register("img")} placeholder='Product Image URL'/>
                <input type="submit"  style={{color:'blue'}}/>
            </form>
        </div>
    );
};

export default AddAProducts;