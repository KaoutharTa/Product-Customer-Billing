package ma.enset.tamouchekaoutar;

import ma.enset.tamouchekaoutar.entities.Customer;
import ma.enset.tamouchekaoutar.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(CustomerRepository customerRepository,
                            RepositoryRestConfiguration repositoryRestConfiguration){
        repositoryRestConfiguration.exposeIdsFor(Customer.class);
        return args -> {

            Customer customer = Customer.builder()
                    .email("Kaoutar@enset.ma")
                    .name("Kaoutar")
                    .build();
            Customer customer1 = Customer.builder()
                    .email("Tamouche@enset.ma")
                    .name("Tamouche")
                    .build();
            Customer customer2 = Customer.builder()
                    .email("Yasmine@enset.ma")
                    .name("Yasmine")
                    .build();
            customerRepository.save(customer);
            customerRepository.save(customer1);
            customerRepository.save(customer2);

            customerRepository.findAll().forEach(c->{
                System.out.println(c.toString());
            });

        };
    }
}
