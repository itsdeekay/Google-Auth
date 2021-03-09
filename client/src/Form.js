import React,{ useState} from 'react';
import './App.css';
import * as api from './api'

function Form({email,number}) {
  const [coupon, setCoupon] = useState("")
  const [success,setSucces] = useState(false)

  const handleSubmit = async (e) =>{
      e.preventDefault()
      e.target.disabled = true
      const response = await api.send({email:email,number:number,coupon:coupon})
      if(response.status===200){
      setSucces(true)}
  }

  const handleChange = (e) =>{
    setCoupon(e.target.value)
  }
  return (
   
    <div id="couponForm">
       {success ? <p>Thanks your discount code will be applied and we will in touch soon </p>:
      <form onSubmit={handleSubmit}>
      <label>Email</label>
        <input type="text" name="email" disabled value={email} />
      <label>Number</label>
      <input type="text" name="number" disabled value={number} />
        <label>Coupon</label>
         <input type="text" name="coupon" value={coupon}
        onChange={handleChange} required
        />
        <input type="submit" value="Send" />
      </form>}
    </div>
  );
}

export default Form;
