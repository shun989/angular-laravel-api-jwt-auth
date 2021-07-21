import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsData : any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(){
    this.productService.getAllProduct().subscribe(res=>{
      this.productsData = res;
    })
  };

  delete(product: any) {
    if (confirm("Are you Sure?")){
      this.productsData = this.productsData.filter((i: any) => i !== product);
      this.productService.deleteProduct(product.id).subscribe( res => {
        this.getProductsData();
      })
    }
  }
}
