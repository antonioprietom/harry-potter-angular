export interface IBookAttributes {
  title: string;
  summary: string;
  dedication: string | null;
  pages: number | null;
  cover: string | null;
}

export interface IBookRelationshipChapterRef {
  id: string;
  type: string;
}

export interface IBookResource {
  id: string;
  type: string;
  attributes: IBookAttributes;
  relationships?: {
    chapters?: { data?: IBookRelationshipChapterRef[] };
  };
}

export interface IBookResponse {
  data: IBookResource[];
}

export interface IBookView {
  id: string;
  title: string;
  summary: string;
  dedication: string;
  pages: string;
  chapters: string;
  cover: string;
}
