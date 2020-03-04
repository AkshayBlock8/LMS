var AWS = require("aws-sdk");
var nodemailer = require("nodemailer");

AWS.config.update({
  region: "ap-south-1",
  
})

var ses = new AWS.SES({
  apiVersion: "2010-12-01",
  region: "ap-south-1"
});

var s3 = new AWS.S3();

function emailservice(mailOptions) {
  var mailOPtions = {
    from: mailOptions.from,
    to: mailOptions.to,
    subject:mailOptions.subject,
    html: mailOptions.html,
    
    // bcc: Any BCC address you want here in an array,
    };
    
    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: ses
    });

    
    transporter.sendMail(mailOPtions, function (err, info) {
        if (err) {
            console.log("Error sending email",err);
            
        } else {
            console.log("Email sent successfully");
            
        }
    });

};
exports.email=emailservice;


