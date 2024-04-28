import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail';

dotenv.config()

const sendEmail = async (req, res, next) => {
  try {
    // Your email message
    const { sectionName, term, availableSeats, status } = req.body;
    const user = req.user

    let msg

    if (availableSeats > 0) {
         msg = {
          to: user.email,
          from: {
            name: process.env.FROM_EMAIL,
            email: process.env.FROM_TEST_EMAIL // DO NOT CHANGE
          },
          subject: `Congratulations! You have sniped ${sectionName}!`,
          text: `Dear ${user.firstName}, \n

          The course ${sectionName} has seat available now. Please register ASAP.\n\n
          
          Thank you,\n
          Course Sniper\n\n
          
          Note: This is automated email. Please do not reply.`
          ,
          html: `Dear ${user.firstName},<br> 

          The course <b>${sectionName}</b> has seat available now. Please register ASAP.<br><br>
          
          Thank you,<br>
          Course Sniper<br><br>
          
          Note: This is automated email. Please do not reply.`,
        };
    }
    
    else {
        msg = {
            to: user.email,
            from: {
              name: process.env.FROM_EMAIL,
              email: process.env.FROM_TEST_EMAIL // DO NOT CHANGE
            },
            subject: `Congratulations! You have sniped ${sectionName}!`,
            text: `Hi ${user.firstName}, We're excited to inform you that you've successfully sniped a spot in the course ${sectionName} for the upcoming term! 🎉📚Here are the details:\n\n
            Term: ${term}\n
            Available Seats: ${availableSeats}\n
            Status: ${status}\n\n
            We'll alert you when the seat is available\n\n
            Thank you,\n
            Course Sniper\n\n
            Note: This is an automated email, please do not reply.`
            ,
            html: `Hi ${user.firstName},<br><br>
            We're excited to inform you that you've successfully sniped a spot in the course <b>${sectionName}</b> for the upcoming term! 🎉📚<br><br>
            Here are the details:<br>
            <ul>
              <li><strong>Term:</strong> ${term}</li>
              <li><strong>Available Seats:</strong> ${availableSeats}</li>
              <li><strong>Status:</strong> ${status}</li>
            </ul><br><br>
            We'll alert you when the seat is available.<br><br>
            Thank you,<br>Course Sniper<br><br>
            Note:This is an automated email, please do not reply.`,
          };
    }

    // Set API key
    sgMail.setApiKey(process.env.TWILIO_API_KEY);

    // Send email
    await sgMail.send(msg);

    console.log("Email has been sent!");

  } catch (error) {
    console.error(error);
    
    if (error.response) {
      console.error(error.response.body);
    }

  }
};

export default sendEmail;