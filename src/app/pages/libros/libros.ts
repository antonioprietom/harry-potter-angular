import { Component, inject, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { LibrosService } from './libros-service';
import { IBookView } from './libro.model';

@Component({
  selector: 'app-libros',
  imports: [AccordionModule],
  templateUrl: './libros.html',
  styleUrl: './libros.scss',
})
export class Libros implements OnInit {
  private librosService = inject(LibrosService);

  books: IBookView[] = [];
  isLoading = true;
  error = false;

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.isLoading = true;
    this.error = false;
    this.librosService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.isLoading = false;
      },
    });
  }
}
