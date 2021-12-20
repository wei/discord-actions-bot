// Using lowdb
const path = require('path');
const lowdb = require('lowdb-node');

// Use JSON file for storage
const file = path.join(__dirname, 'db.json');
const adapter = new lowdb.JSONFile(file);
const db = new lowdb.Low(adapter);

// Set up db.data
db.read();

// If no db.data, create one
db.data ||= { actionMessages: [] };

/**
 * Receive the contents of the message given an actionMessageId
 *
 * @param {string} actionMessageId
 * @returns {import('../helpers/types').ActionMessage | undefined}
 */
function getActionMessageById(actionMessageId) {
	return db.data.actionMessages.find(m => m.actionMessageId === actionMessageId);
}

/**
 * Receive allaction messages from the database
 *
 * @returns {import('../helpers/types').ActionMessage[]}
 */
function getAllActionMessages() {
	return db.data.actionMessages;
}

/**
 * Update or insert an actionMessage
 *
 * @param {import('../helpers/types').ActionMessage} actionMessage
 */
async function upsertActionMessage(actionMessage) {
	db.data.actionMessages = [
		...db.data.actionMessages.filter(m => m.actionMessageId !== actionMessage.actionMessageId),
		actionMessage,
	];
	await db.write();
}

module.exports = {
	getActionMessageById,
	getAllActionMessages,
	upsertActionMessage,
};
