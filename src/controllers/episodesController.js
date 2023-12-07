// episodesController.js
const episodesService = require('../services/episodesService');

exports.getFilteredEpisodes = async (req, res) => {
  const { color, subject, month, matchType } = req.query;
  try {
    const episodes = await episodesService.getFilteredEpisodes(color, subject, month, matchType);
    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
