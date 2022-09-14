import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface apiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor( private http: HttpClient) { }

  getTopRatedMovies(page = 1): Observable<apiResult> {
    return this.http.get<apiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);

  }

  getMovieDetails(id: string) {
    return this.http.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);

  }

  getSimilarMovies(id: string, page = 1) {
    return this.http.get(`${environment.baseUrl}/movie/${id}/similar?api_key=${environment.apiKey}&page=${page}`);
  }

}
