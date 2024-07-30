var nodemailer = require('nodemailer');

const sendMail = async (regestermail) => {


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'taiamin465@gmail.com',
      pass: 'oyimdxvdbxjmezec'
    }
  });

  var mailOptions = {
    from: 'taiamin465@gmail.com',
    to: regestermail, //'dhavalvadher0001@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Your Registration Is Done Successfullyy!',
    attachments: [
      {
        filename: 'image1.webp',
        path: './src/utils/Image/960x0.webp' 
      },
      {
        filename: 'image2.webp',
        path: './src/utils/Image/image2.webp' 
      },
      {
        filename: 'image3.jpg',
        path: './src/utils/Image/image3.jpg' 
      },
      {
        filename: 'image4.jpg',
        path: './src/utils/Image/harley-davidson.jpg' 
      },


    ]

  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}


module.exports = sendMail

