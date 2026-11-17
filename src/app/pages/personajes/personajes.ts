import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PersonajesService } from './personajes-service';
import { ICharacterFilter, ICharacterResource, ICharacterView } from './personaje.model';

const NO_INFO = 'No Information';
const FALLBACK_IMG = 'assets/images/Questions.png';

const BLOOD_OPTIONS = [
  { label: 'Sangre pura', value: 'Pure-blood' },
  { label: 'Sangre mestiza', value: 'Half-blood' },
  { label: 'Sangre sucia', value: 'Muggle-born' },
];

const HOUSE_OPTIONS = [
  { label: 'Gryffindor', value: 'Gryffindor' },
  { label: 'Hufflepuff', value: 'Hufflepuff' },
  { label: 'Ravenclaw', value: 'Ravenclaw' },
  { label: 'Slytherin', value: 'Slytherin' },
];

@Component({
  selector: 'app-personajes',
  imports: [ReactiveFormsModule, TableModule, InputTextModule, SelectModule, ButtonModule],
  templateUrl: './personajes.html',
  styleUrl: './personajes.scss',
})
export class Personajes implements OnInit {
  @ViewChild('dt') dt?: Table;

  private personajesService = inject(PersonajesService);
  private formBuilder = inject(FormBuilder);

  filterForm: FormGroup = this.formBuilder.group({
    name: [''],
    nationality: [''],
    blood: [null],
    house: [null],
  });

  bloodOptions = BLOOD_OPTIONS;
  houseOptions = HOUSE_OPTIONS;

  characters: ICharacterView[] = [];
  isLoading = false;
  error = false;
  page = 1;
  totalRecords = 0;

  ngOnInit(): void {
    // Vacío de forma intencional: la tabla p-table con [lazy]="true"
    // dispara automáticamente (onLazyLoad) al renderizarse.
  }

  fetchCharacters(): void {
    this.isLoading = true;
    this.error = false;
    const filters = this.buildFilter();
    this.personajesService.getCharacters(this.page, filters).subscribe({
      next: (res) => {
        this.characters = res.data.map((r) => this.toView(r));
        this.totalRecords = res.meta?.pagination?.records ?? 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: any): void {
    this.page = Math.floor((event.first ?? 0) / 90) + 1;
    this.fetchCharacters();
  }

  onSearch(): void {
    this.page = 1;
    if (this.dt) {
      this.dt.reset();
    } else {
      this.fetchCharacters();
    }
  }

  onClear(): void {
    this.filterForm.reset({ name: '', nationality: '', blood: null, house: null });
    this.page = 1;
    if (this.dt) {
      this.dt.reset();
    } else {
      this.fetchCharacters();
    }
  }

  private buildFilter(): ICharacterFilter {
    const v = this.filterForm.value;
    return {
      name_cont: (v.name ?? '').trim(),
      nationality_eq: (v.nationality ?? '').trim(),
      blood_status_cont: v.blood ?? '',
      house_eq: v.house ?? '',
    };
  }

  private toView(r: ICharacterResource): ICharacterView {
    const a = r.attributes;
    return {
      id: r.id,
      name: a.name || NO_INFO,
      image: a.image || FALLBACK_IMG,
      hasImage: !!a.image,
      nationality: a.nationality || NO_INFO,
      blood: a.blood_status || NO_INFO,
      house: a.house || NO_INFO,
      wiki: a.wiki || '',
      hasWiki: !!a.wiki,
    };
  }
}