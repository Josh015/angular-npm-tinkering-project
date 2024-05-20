import { Note } from './note';

export type User = {
  id: number | null;
  birthDate: Date;
  name: string;
  avatar: string;
  bio: string;
  gender: string;

  notes: Note[];
};
