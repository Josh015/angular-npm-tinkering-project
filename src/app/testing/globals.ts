import { random, sampleSize, shuffle } from 'lodash';

/**
 * Takes an array and generates a randomized randomly-sized subset of it.
 *
 * @param {T[]} source Source array to be randomized.
 * @param {number} minimumSize Minimum acceptable size for the randomized array.
 *   Defaults to `1`.
 * @returns {T[]} A randomized sub-array of `source`.
 */
export function randomizedSubArray<T>(source: T[], minimumSize = 1): T[] {
  minimumSize = Math.max(0, minimumSize);

  if (source.length <= 1) {
    return [...source];
  }

  const shuffled = shuffle(source);

  if (shuffled.length <= minimumSize) {
    return shuffled;
  }

  return sampleSize(shuffled, random(minimumSize, shuffled.length));
}
