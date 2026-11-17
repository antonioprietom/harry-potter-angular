export interface ICharacterAttributes {
  name: string;
  image: string | null;
  nationality: string | null;
  blood_status: string | null;
  house: string | null;
  wiki: string | null;
}

export interface ICharacterResource {
  id: string;
  type: string;
  attributes: ICharacterAttributes;
}

export interface ICharacterResponse {
  data: ICharacterResource[];
  meta?: { pagination?: { records?: number } };
}

export interface ICharacterFilter {
  name_cont: string;
  nationality_eq: string;
  blood_status_cont: string;
  house_eq: string;
}

export interface ICharacterView {
  id: string;
  name: string;
  image: string;
  nationality: string;
  blood: string;
  house: string;
  wiki: string;
  hasWiki: boolean;
  hasImage: boolean;
}
