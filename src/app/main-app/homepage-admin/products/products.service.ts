import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theatre} from "../theatres/theatres.service";

export interface Product{
  id: number;
  name: string;
  image: string;
  imageName: string;
  category: string;
  price: number;
  quantity: number;
  number: number;
  theatre: Theatre;
}

export interface ProductFilter{
  searchString: string;
}

export interface SearchedTheatreProduct{
  category: string;
  theatreId: number;
  productFilter: ProductFilter;
}

export interface SearchedTheatre{
  theatreId: number;
  productFilter: ProductFilter;
}

export interface ProductDetails{
  id: number;
  name: string;
  price: number;
  quantity: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.apiUrl
  products =  environment.apiEndpoints.products
  productsTheatre = environment.apiEndpoints.productsTheatre
  productsCategoryAndTheatre = environment.apiEndpoints.productsCategoryTheatre

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.url + this.products + id);
  }

  deleteProduct(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.products + id)
  }

  getAllProductsByTheatreId(searchedTheatre: SearchedTheatre): Observable<Product[]>{
    return this.http.post<Product[]>(this.url + this.productsTheatre, searchedTheatre);
  }

  getAllProductsByCategoryAndTheatreId(searchedTheatreProduct: SearchedTheatreProduct): Observable<Product[]>{
    return this.http.post<Product[]>(this.url + this.productsCategoryAndTheatre, searchedTheatreProduct);
  }

  createProduct(image: any, product: any): Observable<Product> {
    console.log(product);
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
