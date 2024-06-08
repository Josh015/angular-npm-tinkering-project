import { random, sampleSize, shuffle } from 'lodash';

/**
 * Takes an array and generates a randomized randomly-sized subset of it.
 *
 * @param {T[]} [source] Source array to be randomized.
 * @param {number} [minimumSize=1] Minimum acceptable size for the randomized
 *   array. Default is `1`
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

/**
 * Generates a random valid date.
 *
 * @param {boolean} [withTime=false] Request that time fields be randomized as
 *   well. Default is `false`
 * @returns {Date} Random date between the year 1900 and the end of time.
 */
export function randomDate(withTime = false): Date {
  const year = random(1900, 271_822);
  const month = random(0, 11);
  const day = random(1, 31);

  if (!withTime) {
    return new Date(year, month, day);
  } else {
    const minutes = random(0, 59);
    const seconds = random(0, 59);
    const milliseconds = random(0, 999);

    return new Date(year, month, day, minutes, seconds, milliseconds);
  }
}
