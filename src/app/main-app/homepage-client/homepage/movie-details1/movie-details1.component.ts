import {Component, OnInit} from '@angular/core';
import {Movie, MoviesService} from "../../../homepage-admin/movies/movies.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-details1',
  templateUrl: './movie-details1.component.html',
  styleUrls: ['./movie-details1.component.css']
})
export class MovieDetails1Component implements OnInit{

  movie?: Movie;
  genres: string = '';

  constructor(private moviesService: MoviesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.moviesService.getMovie(id).subscribe((movie) => {
      this.movie = movie;
    })
    this.getMovieGenres(id);
  }

  navigateBackToMoviesPage(): void{
    this.router.navigate(['client', 'home']);
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  showNumberWithFirstDecimal(num: any): any{
    return (num + '').substring(0, 3);
  }

  getMovieGenres(id: any): void{
    this.moviesService.getMovieGenres(id).subscribe((genres) => {
      this.genres = genres.map((genre: any) => genre.name);
    })
  }
}
