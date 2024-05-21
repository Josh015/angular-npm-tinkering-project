export const GENDERS = ['male', 'female', 'enby'] as const;

export type GenderTuple = typeof GENDERS;
export type Gender = GenderTuple[number];
