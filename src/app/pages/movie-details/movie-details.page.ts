import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie = null;
  imageBaseUrl = environment.images;
  similarMovies: any = [];

  similarOpts = {
    slidesOffsetBefore: 3,
    slidesPerView: 3.5,
    freeMode: true
  }


  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.showMovie(id);

  }

  showMovie(id) {
    this.movieService.getMovieDetails(id).subscribe((res)=> {
      console.log(res);
      this.movie = res;
  
    });
    this.movieService.getSimilarMovies(id).subscribe((res)=> {
      console.log("similar", res);
      this.similarMovies = res;
      console.log("myArr", this.similarMovies.results)
    })
  }

  openHomepage() {
    console.log("open hp");
    //this only work for web
    window.open(this.movie.homepage);

  }

  genreSearch(genre, id) {
    console.log(genre);
    this.router.navigate([`genre/${id}/${genre}`]);
  }

}
