/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  const stats = {};
  const totals = {};

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!totals[genre]) {
        totals[genre] = {
          count: 0,
          sum: 0,
          ratedCount: 0,
        };
      }
      totals[genre].count += 1;

      if (show.rating !== null) {
        totals[genre].sum += show.rating;
        totals[genre].ratedCount += 1;
      }
    }
  }

  for (const genre in totals) {
    if (totals[genre].ratedCount === 0) {
      stats[genre] = {
        count: totals[genre].count,
        averageRating: null,
      };
    } else {
      stats[genre] = {
        count: totals[genre].count,
        averageRating: Math.round((totals[genre].sum / totals[genre].ratedCount) * 10) / 10,
      };
    }
  }
  return stats;
}
