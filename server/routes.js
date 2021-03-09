import express from 'express'
import fs from 'fs'
import nodemailer from 'nodemailer'

const router = express.Router();

//https://accounts.google.com/b/0/DisplayUnlockCaptcha
//https://www.google.com/settings/security/lesssecureapps
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'd.k.jindal65@gmail.com',
      pass: 'Dkjindal65!'
    }
  });

router.get('/',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err) throw err;
        const users = JSON.parse(data)
        if(!(req.query.email in users)){
            res.json({'status':'failed','error':'User not found'})
        } else {
            res.json({'status':'success','email':req.query.email,'number':users[req.query.email]})
        }
        //res.send(users)
    })
    //fetch('./data.json').then(response => response.json).then(data=>res.send(data))
    //res.send('This works')
});

router.post('/',(req,res)=>{

    var mailOptions = {
        from: 'd.k.jindal65@gmail.com',
        to: 'erik@jumpinlabs.com',
        subject: 'Testing email from Coupon Service',
        html: `<p>Hi</p><p>A user has applied for coupon with following 
        detais</p><div>Email : ${req.body.email}</div>
        <div>Number : ${req.body.number}</div>
        <div>Coupon : ${req.body.coupon}</div>`
      };

      
transporter.sendMail(mailOptions, function(error, info){
    console.log(error)
    console.log(info)
    if (error) {
      res.status(404).json({message:"Error in sending email"})
    } else {
      res.status(200).json({message:"Email Sent"})
    }
  });
})

export default router;