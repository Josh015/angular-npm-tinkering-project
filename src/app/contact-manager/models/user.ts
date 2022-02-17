import { Note } from './note';

export interface User {
  id: number | null;
  birthDate: Date;
  name: string;
  avatar: string;
  bio: string;
  gender: string;

  notes: Note[];
}
