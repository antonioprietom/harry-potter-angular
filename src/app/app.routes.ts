import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Libros } from './pages/libros/libros';
import { Personajes } from './pages/personajes/personajes';
import { Peliculas } from './pages/peliculas/peliculas';
import { Pociones } from './pages/pociones/pociones';
import { Hechizos } from './pages/hechizos/hechizos';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: Main,
  },
  {
    path: 'libros',
    component: Libros,
  },
  {
    path: 'personajes',
    component: Personajes,
  },
  {
    path: 'peliculas',
    component: Peliculas,
  },
  {
    path: 'pociones',
    component: Pociones,
  },
  {
    path: 'hechizos',
    component: Hechizos,
  },
];
