var nodemailer=require('nodemailer')

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ajithkumargurram@gmail.com',
        pass:'cwcaiuhlzslctswh'
    },
    tls : { rejectUnauthorized: false }
})

var message={
    from:'ajithkumargurram@gmail.com',
    to:'azzuzie.g@gmail.com',
    subject:'Node mailer',
    text:`This mail is from node mailer`
}

transporter.sendMail(message,(err,info)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log("email sent : "+info.response)
    }
})