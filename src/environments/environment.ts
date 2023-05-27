// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/",
  apiEndpoints: {
    users: "users/",
    login: "login",
    logout: "logout-user",
    forgotPassword: "forgot-password",
    resetPassword: "reset-password",
    findAccount: "find-account",
    findEmail: "find-email/",
    userPage:"users/page",
    userPageFilter:"users/page/filter",
    theatres: "theatres/",
    theatrePage:"theatres/page",
    theatrePageFilter:"theatres/page/filter",
    movies: "movies/",
    moviePage:"movies/page",
    moviePageFilter:"movies/page/filter",
    movieTheatreDay: "movies/movies-and-times",
    showTimings: "show-timings/",
    showTimingsPage:"show-timings/page",
    showTimingsPageFilter:"show-timings/page/filter",
    dashboard: "users/dashboard",
    currentRunning: "movies/current-running",
    soonRunning: "movies/soon-running",
    theatreLocations: "theatres/locations",
    theatresFilterd: "theatres/filtered/",
    venues: "venues/",
    venuesPage:"venues/page",
    venuesPageFilter:"venues/page/filter",
    moviesTheatre: "movies/theatre/",
    movieShowTimings: "movies/show-timings",
    theatreDay: "movies/theatre-and-day",
    venuesTheatre: "venues/theatre/",
    showTimingVenue: "show-timings/show-timing-details",
    movieAge: "movies/age",
    products: "products/",
    productsTheatre: "products/theatre",
    productsCategoryTheatre: "products/category-and-theatre",
    productsTheatreAvailable: "products/theatre/available",
    productsCategoryTheatreAvailable: "products/category-and-theatre/available",
    orders: "orders/",
    ordersPage: "orders/page",
    ordersPageFilter: "orders/page/filter",
    ordersStatus: "orders/status",
    ordersTicketsDetails: "orders/tickets-details",
    ordersProductsDetails: "orders/products-details",
    ordersDate: "orders/last-created-date",
    reviews: "reviews/",
    filteredReviews: "reviews/filtered",
    reviewMovie: "reviews/movie/",
    filteredReviewsByUser: "reviews/filtered-by-user"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
