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

  constructor(private moviesService: MoviesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.moviesService.getMovie(id).subscribe((movie) => {
      this.movie = movie;
    })
  }

  navigateBackToMoviesPage(): void{
    this.router.navigate(['client', 'program']);
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }
}
