export const AVATARS = ['svg-1', 'svg-2', 'svg-3', 'svg-4'] as const;

export type AvatarTuple = typeof AVATARS;
export type Avatar = AvatarTuple[number];
