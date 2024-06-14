import ICharacter from './characters';

export interface ApiResponse {
  info: Info;
  results: ICharacter[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}
