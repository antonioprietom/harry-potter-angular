import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PeliculasService } from './peliculas-service';
import { IMovieView } from './pelicula.model';
import { PeliculaDetail } from './modal/pelicula-detail';

@Component({
  selector: 'app-peliculas',
  imports: [],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.scss',
})
export class Peliculas implements OnInit {
  private peliculasService = inject(PeliculasService);
  private dialogService = inject(DialogService);

  movies: IMovieView[] = [];
  isLoading = true;
  error = false;

  ngOnInit(): void {
    this.peliculasService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.isLoading = false;
      },
    });
  }

  open(movie: IMovieView): void {
    this.dialogService.open(PeliculaDetail, {
      header: movie.title,
      data: { movie },
      width: '50vw',
      breakpoints: { '1200px': '45vw',
        '960px': '70vw',
        '640px': '90vw'
      },
      modal: true,
      closable: true,
    });
  }
}
