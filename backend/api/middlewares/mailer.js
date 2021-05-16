const nodemailer = require("nodemailer")

let sendMail = async(req, res) => {
  let mailTransporter = nodemailer.createTransport({
    port : 587,
    service : 'gmail',
    auth : {
      user : process.env.USERNAME,
      pass : process.env.PASSWORD
    }
  })

  let mailDetails = {
    from : process.env.USERNAME,
    to : req.mailBody.emailId,
    subject : req.mailBody.subject,
    text : req.mailBody.message
  }

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if(err){
      console.log(err)
    }else{
      console.log("Email sent successfuly to" + data.response) 
    }
  })
}

module.exports = {sendMail}