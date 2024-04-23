package ving.spring.ving.Greeting;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("Greeting")
public class GreetingController {
    @GetMapping("/")
    ResponseEntity<?> Greeting()
    {
        return ResponseEntity.ok().body( "Greeting");
    }
}
