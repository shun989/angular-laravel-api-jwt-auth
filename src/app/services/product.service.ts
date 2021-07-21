import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'http://localhost:8000/api/products';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllProduct(){
    let token =localStorage.getItem('token');
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    let httpOption = {headers: headers_object};
    return this.http.get<any>(`${this.productUrl}`, httpOption)
      .pipe(map((res)=>{
        return res;
      }))
  };

  createNewProduct(data: any){
    let token =localStorage.getItem('token');
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    let httpOption = {headers: headers_object};
    return this.http.post(`${this.productUrl}`,data, httpOption)
      .subscribe(res=>{
        return res;
      })
  };

  updateProduct(data: any, id:number): Observable<any>{
    const url = `${this.productUrl}/${id}`;
    return this.http.put(url, data, this.httpOptions).pipe();
  };

  deleteProduct(id: number): Observable<any>{
    const url =`${this.productUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions).pipe();
  };

  showDetailProduct(id: number): Observable<any>{
    const url = `${this.productUrl}/${id}`;
    return this.http.get(url, this.httpOptions).pipe();
  }

  getProduct(id: number){
    let token =localStorage.getItem('token');
    let headers_object = new HttpHeaders().set('Authorization', 'Bearer' + token);
    let httpOption = {headers: headers_object};
    return this.http.get<any>(`${this.productUrl}/${id}`,httpOption)
      .pipe(map((res)=>{
        return res;
      }))
  };
}
