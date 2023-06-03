import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Movie} from "../../homepage-admin/movies/movies.service";
import {Observable} from "rxjs";

export interface Review{
  id: number;
  name: string;
  note: number;
  opinion: string;
  createdDate: Date;
  user: any;
  movie: Movie;
}

export interface ReviewFilters{
  movieName: string;
  recommendedAge: string;
  genre: string[];
  reviewName: string;
  reviewOpinion: string;
  searchString: string;
}

export interface MovieReview{
  movie: Movie;
  reviews: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  url = environment.apiUrl
  reviews = environment.apiEndpoints.reviews
  filteredReviews = environment.apiEndpoints.filteredReviews
  reviewMovie = environment.apiEndpoints.reviewMovie
  filteredReviewsByUser = environment.apiEndpoints.filteredReviewsByUser

  constructor(private http: HttpClient) { }

  createReview(review: any): Observable<Review> {
    return this.http.put<Review>(this.url + this.reviews, review)
  }

  deleteReview(id: number | undefined): Observable<null> {
    return this.http.delete<null>(this.url + this.reviews + id)
  }

  getAllFilteredReviews(reviewFilters: any): Observable<MovieReview[]>{
    return this.http.post<MovieReview[]>(this.url + this.filteredReviews, reviewFilters);
  }

  getAllFilteredReviewsByUser(reviewFiltersByUser: any): Observable<MovieReview[]>{
    return this.http.post<MovieReview[]>(this.url + this.filteredReviewsByUser, reviewFiltersByUser);
  }

  getAllExistingReviewsByMovieId(id?: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + this.reviewMovie + id);
  }
}
