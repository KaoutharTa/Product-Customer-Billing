import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '../service/Billing.service';
import { ProductItem } from '../model/ProductItem.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  userId!: number;
  customerName: string = '';
  customerEmail: string = '';
  orderStatus: string = '';
  displayedColumns: string[] = ['productName', 'priceBeforeDiscount', 'quantity', 'discount', 'totalPriceAfterDiscount'];
  dataSource: any[] = [];

  constructor(private billsService: BillingService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Extract customer ID from route parameter
    this.route.paramMap.subscribe(params => {
      const userIdString = params.get('id');
      if (userIdString) {
        this.userId = +userIdString; // Convert to number
      }
      this.loadBillsByCustomerId(this.userId);
    });
  }

  loadBillsByCustomerId(id: number) {
    this.billsService.loadBillsByCustomerId(id).subscribe({
      next: (data: any[]) => {
        console.log(data);
        if (data.length > 0) {
          const customer = data[0]["customer"];
          this.customerEmail = customer.email;
          this.customerName = customer.name;
          this.orderStatus = data[0]["orderStatus"];

          this.dataSource = [];
          const productItems: ProductItem[] = data[0]["productItems"];
          productItems.forEach((item: ProductItem) => {
            const priceBeforeDiscount = item.product.price;
            const discount = item.discount;
            const quantity = item.quantity;
            const totalPriceAfterDiscount = priceBeforeDiscount * (1 - discount / 100);
            this.dataSource.push({
              productName: item.product.name,
              priceBeforeDiscount: priceBeforeDiscount,
              quantity: quantity,
              discount: discount,
              totalPriceAfterDiscount: totalPriceAfterDiscount,
            });
          });
        } else {
          console.log('No bills found for this customer.');
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
