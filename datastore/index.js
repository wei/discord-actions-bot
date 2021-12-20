const path = require('path');
const fs = require('fs');

/** @type {{actionMessages: import('../helpers/types').ActionMessage} | null} */
let data = null;

// Use JSON file for storage
const file = path.join(__dirname, '../db/db.json');

try {
	const diskData = fs.readFileSync(file, 'utf8');
	data = diskData ? JSON.parse(diskData) : null;
}
catch (error) {
	// Ignore
}

data ||= { actionMessages: [] };

/**
 * Receive the contents of the message given an actionMessageId
 *
 * @param {string} actionMessageId
 * @returns {import('../helpers/types').ActionMessage | undefined}
 */
function getActionMessageById(actionMessageId) {
	return data.actionMessages.find(m => m.actionMessageId === actionMessageId);
}

/**
 * Receive allaction messages from the database
 *
 * @returns {import('../helpers/types').ActionMessage[]}
 */
function getAllActionMessages() {
	return data.actionMessages;
}

/**
 * Update or insert an actionMessage
 *
 * @param {import('../helpers/types').ActionMessage} actionMessage
 */
async function upsertActionMessage(actionMessage) {
	data.actionMessages = [
		actionMessage,
		...data.actionMessages.filter(m => m.actionMessageId !== actionMessage.actionMessageId),
	];
	try {
		fs.writeFileSync(file, JSON.stringify(data, null, 2));
	}
	catch (error) {
		// Ignore
	}
}

module.exports = {
	getActionMessageById,
	getAllActionMessages,
	upsertActionMessage,
};
