import {Component, OnInit} from '@angular/core';
import {Movie, MoviesService} from "../movies.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{

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
    this.router.navigate(['admin', 'movies']);
  }

  getImageUrl(poster: any): any{
    return 'data:image/*;base64,' + poster;
  }

  showNumberWithFirstDecimal(num: any): any{
    return (num + '').substring(0, 3);
  }

}
