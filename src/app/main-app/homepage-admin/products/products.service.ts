import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Product{
  id: number;
  name: string;
  image: string;
  imageName: string;
  category: string;
  price: number;
  quantity: number;
  number: number;
}

export interface ProductFilter{
  searchString: string;
}

export interface SearchedProduct{
  category: string;
  productFilter: ProductFilter;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.apiUrl
  products =  environment.apiEndpoints.products
  productsCategory = environment.apiEndpoints.productsCategory

  constructor(private http: HttpClient) { }

  deleteProduct(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.products + id)
  }

  getAllProducts(productFilter: ProductFilter): Observable<Product[]>{
    return this.http.post<Product[]>(this.url + this.products, productFilter);
  }

  getAllProductsByCategory(searchedProduct: SearchedProduct): Observable<Product[]>{
    return this.http.post<Product[]>(this.url + this.productsCategory, searchedProduct);
  }

  createProduct(image: any, product: any): Observable<Product> {
    const formData = new FormData();
    if (image === null) {
      formData.append('image', new Blob(), '');
    } else {
      formData.append('image', image, image.name);
    }
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {
        type: 'application/json',
      })
    );
    return this.http.put<Product>(this.url + this.products, formData)
  }
}
