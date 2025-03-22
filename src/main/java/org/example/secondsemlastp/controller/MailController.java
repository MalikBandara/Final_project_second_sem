package org.example.secondsemlastp.controller;


import org.example.secondsemlastp.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/email")
@CrossOrigin(origins = "*")
public class MailController {


    @Autowired
    private JavaMailSender javaMailSender;


    // create application.properties part username password all set
    //after that create this class and set message and from to message

    @PostMapping("send/{Email}")
    public ResponseUtil sendEmail(@PathVariable String Email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setSubject("Donor Registration Confirmation");
            simpleMailMessage.setTo(Email);
//            simpleMailMessage.setFrom("mmalith520@gmail.com");
            simpleMailMessage.setText(
                    "Dear Donor,\n\n" +
                            "Thank you for registering as a blood donor! Your willingness to donate can save lives and make a meaningful impact.\n\n" +
                            "We appreciate your generosity and will contact you when a matching recipient needs your help.\n\n" +
                            "If you have any questions, feel free to reach out to us.\n\n" +
                            "Best Regards,\n" +
                            "Blood Management System - Blood Link Team"
            );

            javaMailSender.send(simpleMailMessage);

            return new ResponseUtil(201, "Email sent successfully!", null);
        } catch (Exception e) {
            return new ResponseUtil(500, "Failed to send email. Please try again later.", null);
        }
    }


    @PostMapping("update/{Email}")
    public ResponseUtil UpdateStatus(@PathVariable String Email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setSubject("Your Blood Donation Request Has Been Approved!");
            simpleMailMessage.setTo(Email);
//            simpleMailMessage.setFrom("mmalith520@gmail.com");
            simpleMailMessage.setText(
                    "Dear Donor,\n\n" +
                            "We are pleased to inform you that your blood donation request has been approved! 🎉\n\n" +
                            "Your generosity and willingness to help those in need are truly appreciated.\n\n" +
                            "Our team will contact you shortly with further details regarding the donation process.\n\n" +
                            "If you have any questions, feel free to reach out to us.\n\n" +
                            "Best Regards,\n" +
                            "Blood Management System - Blood Link Team"
            );

            javaMailSender.send(simpleMailMessage);

            return new ResponseUtil(201, "Approval email sent successfully!", null);
        } catch (Exception e) {
            return new ResponseUtil(500, "Failed to send approval email. Please try again later.", null);
        }
    }


    @PostMapping("reject/{email}")
    public ResponseUtil rejectDonnerMail(@PathVariable String email){
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setSubject("Your Blood Donation Request Has Been Rejected");
            simpleMailMessage.setTo(email);
//        simpleMailMessage.setFrom("mmalith520@gmail.com");
            simpleMailMessage.setText(
                    "Dear Donor,\n\n" +
                            "We regret to inform you that your blood donation request has been rejected.\n\n" +
                            "While we appreciate your willingness to donate, your request does not meet the current needs of our recipients.\n\n" +
                            "We encourage you to check back with us periodically, as donation needs can change. Your generosity is highly valued, and we hope to have the opportunity to work with you in the future.\n\n" +
                            "If you have any questions or concerns, please feel free to reach out to us.\n\n" +
                            "Best Regards,\n" +
                            "Blood Management System - Blood Link Team"
            );

            javaMailSender.send(simpleMailMessage);

            return new ResponseUtil(201, "Rejection email sent successfully!", null);
        } catch (Exception e) {
            return new ResponseUtil(500, "Failed to send rejection email. Please try again later.", null);
        }
    }



}
