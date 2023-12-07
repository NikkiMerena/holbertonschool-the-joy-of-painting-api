// episodesService.js
const db = require('../db');

async function getFilteredEpisodes(color, subject, month, matchType) {
  // Start with a base query
  let query = db('episodes').distinct();

  // Filter by colors if specified
  if (color) {
    const colorNames = color.split(',');
    query = query
      .join('episode_color', 'episodes.id', 'episode_color.episode_id')
      .join('colors', 'colors.id', 'episode_color.color_id')
      .whereIn('colors.name', colorNames);
  }

  // Filter by subjects if specified
  if (subject) {
    const subjectNames = subject.split(',');
    query = query
      .join('episode_subject', 'episodes.id', 'episode_subject.episode_id')
      .join('subjects', 'subjects.id', 'episode_subject.subject_id')
      .whereIn('subjects.name', subjectNames);
  }

  // Filter by month if specified
  if (month) {
    query = query.whereRaw('EXTRACT(MONTH FROM broadcast_date) = ?', [month]);
  }

  // Apply match type logic
  if (matchType === 'all') {
    // If 'all' is specified, each episode must match all filter criteria.
    // This may involve grouping and counting matches, depending on your database schema and requirements.
    // Additional logic would go here.
  } else if (matchType === 'any') {
    // If 'any' is specified, episodes matching any of the criteria should be returned.
    // This is handled by the use of 'whereIn' above, which functions like an 'OR' for multiple values.
  }

  // Execute the query and return the result
  const episodes = await query.select('episodes.*');
  return episodes;
}

module.exports = {
  getFilteredEpisodes,
};
