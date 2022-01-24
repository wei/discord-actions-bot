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
	getISODateString,
	getDayOfWeek,
	getLetterEmoji,
};
