import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ShowTimings} from "../../homepage-admin/show-timings/show-timings.service";
import {Review} from "../../homepage-client/reviews/reviews.service";

export interface PeoplePromotion{
  id: number;
  adult: number;
  student: number;
  child: number;
  showTiming: ShowTimings;
}

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  url = environment.apiUrl
  peoplePromotions = environment.apiEndpoints.peoplePromotions

  constructor(private http: HttpClient) { }

  createPeoplePromotion(peoplePromotion: any): Observable<PeoplePromotion> {
    return this.http.put<PeoplePromotion>(this.url + this.peoplePromotions, peoplePromotion);
  }

  getPeoplePromotionByShowTimingId(id?: number): Observable<PeoplePromotion> {
    return this.http.get<PeoplePromotion>(this.url + this.peoplePromotions + id);
  }
}
