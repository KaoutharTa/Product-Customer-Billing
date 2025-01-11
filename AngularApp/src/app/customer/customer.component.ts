import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: false,

  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  customers : any;
  constructor(private httpClient : HttpClient) {


  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:8888/CUSTOMER-SERVICE/customers").subscribe({
      next : (data) => {
        this.customers = data;

      },
      error : err => {
        console.log("erreur au niveau du customers")
      }
    })
  }



  getBills(b: any) {

  }
}
