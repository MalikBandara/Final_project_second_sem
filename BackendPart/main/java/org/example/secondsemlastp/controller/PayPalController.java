package org.example.secondsemlastp.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import lombok.RequiredArgsConstructor;
import org.example.secondsemlastp.config.paypal.PaypalService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PayPalController {

    private final PaypalService paypalService;

    @PostMapping("api/v1/payment/create")
    @ResponseBody
    public ResponseEntity<String> createPayment() {
        try {
            String cancelUrl = "http://localhost:8081/api/v1/payment/cancel";
            String successUrl = "http://localhost:8081/api/v1/payment/success";

            Payment payment = paypalService.createPayment(10.0, "USD", "paypal", "sale", "Payment Description", cancelUrl, successUrl);

            for (Links links : payment.getLinks()) {
                if ("approval_url".equals(links.getRel())) {
                    return ResponseEntity.ok(links.getHref());  // ✅ Return JSON response
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error generating PayPal payment link.");
    }




    @GetMapping("api/v1/payment/success")
    public String paymentSuccess(@RequestParam("paymentId") String paymentId ,@RequestParam("payerId") String payerId ){
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")){
                return "paymentSuccess";
            }

        }catch (Exception e ){
            e.printStackTrace();
        }
        return "paymentSuccess";
    }


    @GetMapping("api/v1/payment/cancel")
    public  String paymentCancel(){
        return "PaymentCancel";
    }

    @GetMapping("api/v1/payment/error")
    public  String paymentError(){
        return "paymentError";
    }


}
