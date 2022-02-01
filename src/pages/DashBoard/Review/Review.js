import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './Review.css';
import useAuth from '../../../hooks/useAuth';

const Review = () => {
    const{user}=useAuth();
    const { register, handleSubmit,reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/reviews',data)
        .then(res=>{
            // console.log(res)
            if(res.data. insertedId){
                alert('Review Added Successfully');
                reset();
            }
        })    
    }
    return (
        <div className='addReview'>
            <h3 style={{color:'tomato'}}>Please Add Your Valuable Review</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={user.displayName} {...register("name")} />
                    <input defaultValue={user.email}{...register("email", { required: true })}/>
                    <textarea placeholder="Write Your Review" defaultValue="" {...register("review")} />
                    <input type="number" placeholder="Plase Add Your Rating(1/2/3/4/5)" defaultValue="" {...register("rate")} />
                    <input defaultValue={user.photoURL} {...register("img")} placeholder='Enter Your image URL'/>
                    <input type="submit" style={{color:'navy'}}/>
            </form>
        </div>
    );
};

export default Review;