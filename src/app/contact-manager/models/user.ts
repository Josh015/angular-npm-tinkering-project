import { Avatar } from './avatar';
import { Gender } from './gender';
import { Note } from './note';

export interface User {
  id: number | null;
  birthDate: Date;
  name: string;
  avatar: Avatar;
  bio: string;
  gender: Gender;

  notes: Note[];
}
