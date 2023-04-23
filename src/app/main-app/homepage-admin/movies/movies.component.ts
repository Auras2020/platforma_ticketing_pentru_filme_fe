import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  ageRestricts = ['<12', '>=12', '>=15', '>=18'];
  durationIntervals = ['<1h30m', '1h30m-2h0m', '2h0m-2h30m', '>2h30m']
}
