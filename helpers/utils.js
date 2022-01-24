const fetch = require('isomorphic-fetch');

async function getRandomGif() {
  try {
    const response = await fetch(`https://g.tenor.com/v1/random?q=celebrate&limit=1&key=${process.env.TENOR_API_KEY}`);
    const json = await response.json();
    return json.results[0].url;
  }
  catch (error) {
    return 'https://c.tenor.com/IErQHBRt6GIAAAAd/leonardo-dicaprio.gif';
  }
}

/*
 * @param {Date} date
 * @returns {string}
 */
const getISODateString = (date) => {
  return (date || new Date()).toISOString().split('T')[0];
};

/*
 * @param {Date} date
 * @returns {string}
 */
const getDayOfWeek = (date) => {
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayOfWeek[(date || new Date()).getDay()];
};

const regionalIndicatorAlphabet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
/**
 *
 * @param {number} index
 * @returns string
 */
const getLetterEmoji = (index) => {
  return regionalIndicatorAlphabet[index];
};

module.exports = {
  getRandomGif,
  getISODateString,
  getDayOfWeek,
  getLetterEmoji,
};
