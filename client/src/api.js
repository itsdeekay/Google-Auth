import axios from 'axios';

const url = "https://applycoupon.herokuapp.com"

export const authorize = (email) => axios.get(url + `?email=${email}`)


export const send = ({email,number,coupon}) => axios.post(url,
{email:email,number:number,coupon:coupon})