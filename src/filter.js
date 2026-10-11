/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 * Специфікація — ТЗ, C2.
 *
 * @param {Show[]} shows
 * @param {FilterOptions} [options]
 * @returns {Show[]}
 */
export function filterShows(shows, options) {
  return shows.filter((show) => {
    if (!options) return true;

    const { query, genre, minRating } = options;

    if (query && !show.name.toLowerCase().includes(query.trim().toLowerCase())) {
      return false;
    }

    if (genre && !show.genres.includes(genre)) {
      return false;
    }

    if (minRating !== null && minRating !== undefined && minRating !== 0) {
      if (show.rating === null || show.rating < minRating) {
        return false;
      }
    }

    return true;
  });
}
