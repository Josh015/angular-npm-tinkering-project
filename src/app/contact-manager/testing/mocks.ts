import { User } from '../models';

export const USERS_MOCK: User[] = [
  {
    id: 1,
    name: 'test 1',
    birthDate: new Date(),
    avatar: 'svg-1',
    bio: 'A little about myself.',
    gender: 'male',
    notes: [
      { id: 1, date: new Date(), title: 'test note 1' },
      { id: 2, date: new Date(), title: 'test note 2' }
    ]
  },
  {
    id: 2,
    name: 'test 2',
    birthDate: new Date(),
    avatar: 'svg-2',
    bio: 'Me!',
    gender: 'female',
    notes: [
      { id: 3, date: new Date(), title: 'test note 3' },
      { id: 4, date: new Date(), title: 'test note 4' },
      { id: 5, date: new Date(), title: 'test note 5' }
    ]
  },
  {
    id: 3,
    name: 'test 3',
    birthDate: new Date(),
    avatar: 'svg-3',
    bio: 'YOU!',
    gender: 'enby',
    notes: [
      { id: 6, date: new Date(), title: 'test note 6' },
      { id: 7, date: new Date(), title: 'test note 7' },
      { id: 8, date: new Date(), title: 'test note 8' }
    ]
  }
] as const;
