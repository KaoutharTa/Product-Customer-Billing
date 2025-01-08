package ma.enset.tamouchekaoutar.web;

import lombok.AllArgsConstructor;
import ma.enset.tamouchekaoutar.entities.Bill;
import ma.enset.tamouchekaoutar.feign.CustomerRestClient;
import ma.enset.tamouchekaoutar.feign.ProductItemRestClient;
import ma.enset.tamouchekaoutar.model.Customer;
import ma.enset.tamouchekaoutar.model.Product;
import ma.enset.tamouchekaoutar.repository.BillRepository;
import ma.enset.tamouchekaoutar.repository.ProductItemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
public class BillingRestController {
    private BillRepository billRepository;
    private ProductItemRepository productItemRepository;
    private CustomerRestClient customerRestClient;
    private ProductItemRestClient productItemRestClient;



    @GetMapping("/fullBill/{id}")
    public Bill getBill(@PathVariable(name = "id")  Long id){
        Bill bill = billRepository.findById(id).get();
        Customer customer = customerRestClient.getCustomerById(bill.getCustomerId());
        bill.setCustomer(customer);
        bill.getProductItems().forEach(productItem -> {
            Product product = productItemRestClient.getProductById(productItem.getId());
//            productItem.setProduct(product);
            productItem.setProductName(product.getName());
        });
        return bill;
    }
}