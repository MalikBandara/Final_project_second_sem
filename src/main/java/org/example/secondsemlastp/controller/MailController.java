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


    @PostMapping("send/{Email}")
    public ResponseUtil sendEmail(@PathVariable String Email) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setSubject("Donor Registration Confirmation");
            simpleMailMessage.setTo(Email);
            simpleMailMessage.setFrom("mmalith520@gmail.com");
            simpleMailMessage.setText(
                    "Dear Donor,\n\n" +
                            "Thank you for registering as a blood donor! Your willingness to donate can save lives and make a meaningful impact.\n\n" +
                            "We appreciate your generosity and will contact you when a matching recipient needs your help.\n\n" +
                            "If you have any questions, feel free to reach out to us.\n\n" +
                            "Best Regards,\n" +
                            "Blood Management System Team"
            );

            javaMailSender.send(simpleMailMessage);

            return new ResponseUtil(201, "Email sent successfully!", null);
        } catch (Exception e) {
            return new ResponseUtil(500, "Failed to send email. Please try again later.", null);
        }
    }

}
