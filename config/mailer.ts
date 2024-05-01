const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "Fernandorar65@gmail.com",
    pass: "xjva bnyc ayrl cxze",
  },
});


transporter.verify().then(()=>{
    console.log('ready for send messaages');
});