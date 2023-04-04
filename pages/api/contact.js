/* export default function (req, res) {
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {//ikke se her sander
        },
        secure: false,
    });
    const mailData = {
        from: 'epostfysi@gmail.com',
        to: 'marius.sjoberg@gmail.com',
        subject: `Message From ${req.body.subject}`,
        text: req.body.message,
        html: <div>{req.body.message}</div>
       }
       transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info)
      })
      res.status(200)
  } */