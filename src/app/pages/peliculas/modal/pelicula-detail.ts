import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IMovieView } from '../pelicula.model';

@Component({
  selector: 'app-pelicula-detail',
  imports: [],
  templateUrl: './pelicula-detail.html',
  styleUrl: './pelicula-detail.scss',
})
export class PeliculaDetail implements OnInit {
  private config = inject(DynamicDialogConfig);
  movie?: IMovieView;

  ngOnInit(): void {
    this.movie = this.config.data?.movie;
  }
}
