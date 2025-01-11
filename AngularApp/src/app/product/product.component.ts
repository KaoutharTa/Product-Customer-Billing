import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products : any;
  constructor(private httpClient : HttpClient) {
  }
  ngOnInit(): void {
    this.httpClient.get("http://localhost:8888/INVENTORY-SERVICE/products").subscribe({
      next : (data)=>{
        this.products = data;
      },
      error : err => {
        console.log("erreur au niveau du products")
      }
    })
  }
}
