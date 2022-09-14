import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genre-movies',
  templateUrl: './genre-movies.page.html',
  styleUrls: ['./genre-movies.page.scss'],
})
export class GenreMoviesPage implements OnInit {
  genre = null;
  currentPage = 1;
  imageBaseUrl = environment.images;
  genreMovies = [];
  genreId = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.genre = this.route.snapshot.paramMap.get('genre');
    this.genreId = this.route.snapshot.paramMap.get('id');
    
    this.loadMovies();
  }



  async loadMovies(ev?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();



    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      const genreM = res.results.filter((movie) => { 
        if (movie.genre_ids.some((id) => id == this.genreId)) {
          return movie
        }
       });
      this.genreMovies.push(...genreM);
      console.log(genreM);



      ev?.target.complete();

      if (ev) {
        ev.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(ev: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(ev);
    console.log(this.currentPage);
  }
}
