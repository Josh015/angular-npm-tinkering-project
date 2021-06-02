import { Note } from './notes.model';

export interface User {
  id: number | null;
  birthDate: Date;
  name: string;
  avatar: string;
  bio: string;

  notes: Note[];
}
