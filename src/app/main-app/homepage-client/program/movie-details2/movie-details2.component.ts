import {Component, OnInit} from '@angular/core';
import {Movie, MoviesService} from "../../../homepage-admin/movies/movies.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-details2',
  templateUrl: './movie-details2.component.html',
  styleUrls: ['./movie-details2.component.css']
})
export class MovieDetails2Component implements OnInit{

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
    this.router.navigate(['client', 'program']);
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

  getMovieCategoryMeaning(category: any): string{
    let description = '';
    switch (category){
      case "AG":
        description = 'General admission';
        break;
      case "AP12":
        description = 'Parental guidance for children under the age of 12';
        break;
      case "N15":
        description = 'Not recommended under the age of 15';
        break;
      case "IM18":
        description = 'Prohibited for minors under the age of 18';
        break;
      default:
        description = '';
    }
    return description;
  }
}
