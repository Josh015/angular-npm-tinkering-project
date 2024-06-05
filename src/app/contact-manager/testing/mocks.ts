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
    bio: 'YOU!',
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
    bio: 'Me!',
    gender: 'enby',
    notes: [
      { id: 6, date: new Date(), title: 'test note 6' },
      { id: 7, date: new Date(), title: 'test note 7' },
      { id: 8, date: new Date(), title: 'test note 8' },
      { id: 9, date: new Date(), title: 'test note 9' }
    ]
  },
  {
    id: 4,
    name: 'test 4',
    birthDate: new Date(),
    avatar: 'svg-4',
    bio: 'The other guy?',
    gender: 'enby',
    notes: [
      { id: 10, date: new Date(), title: 'test note 10' },
      { id: 11, date: new Date(), title: 'test note 11' },
      { id: 12, date: new Date(), title: 'test note 12' },
      { id: 13, date: new Date(), title: 'test note 13' },
      { id: 14, date: new Date(), title: 'test note 14' }
    ]
  }
] as const;
