![discord-actions-bot](https://socialify.git.ci/wei/discord-actions-bot/image?description=1&font=Bitter&logo=https%3A%2F%2Fdiscord.com%2Fassets%2F145dc557845548a36a82337912ca3ac5.svg&name=1&pattern=Plus&theme=Dark)


## Installation

Install the [**Actions Bot**](https://discord.com/oauth2/authorize?client_id=922524247274950666&scope=bot%20applications.commands&permissions=446677109824).


## Usage

### `/action-react`

Create an action that requires users of a particular role to react with a ✅.

Follow the slash command prompt:
```
/action-react [role] [message]
```

Example:
```
/action-react @Pod 4.0.3 Due Friday: Complete Week 12 Survey
```

### `/action-thread`

Create an action that requires users of a particular role to reply in a thread.

Follow the slach command prompt:
```
/action-thread [role] [message]
```

Example:
```
/action-thread @Pod 4.0.3 Friday December 17th: Post Standup Notes
```


## Self-hosting

### Step 1: Create and Install Discord App

1. Create a new [Discord app](https://discord.com/developers/applications).
1. Go to the app's dashboard and create a bot user with _SERVER MEMBERS INTENT_ turned on.
1. Install the **Discord Bot** by going to `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot%20applications.commands&permissions=446677109824`

### Step 2: Deployment

First, `cp .env.example .env` and fill in the required fields.

#### Method 1: Node Deployment
```bash
# Register Discord slash commands, only need to run this once
npm run deploy-commands

# Run the bot
npm start
```

#### Method 2: Docker Deployment

```bash
docker build -t discord-actions-bot .

# Register Discord slash commands, only need to run this once
docker run --rm --env-file .env \
  -v discord-actions-bot-db:/app/db \
  discord-actions-bot npm run deploy-commands

# Run the bot
docker run --name discord-actions-bot --env-file .env \
  -v discord-actions-bot-db:/app/db \
  discord-actions-bot
```


## Journey

### Idea

As a team that consists of a pod-leader and a fellow alumni, we decided to build an app that would make our lives easier.

Shifting from one platform to another to do simple everyday things like completing action items in Google Sheets and writing standup notes in GitHub Discussions was very tedious. So we decided to try and move those things to a platform of choice, Discord.

### Implementation

We used [Discord.js](https://discord.js.org/#/), [Docker](https://www.docker.com/), and [Tenor API](https://tenor.com/gifapi/documentation).

With Discord.js, we were able to build the commands needed to serve the logic that the Action Bot follows. Such as deleting messages, updating lists, creating threads, and everything else has been done with Discord.js.

We also used Docker to create an image and serve the bot on a server. It should provide a seamless integration for anybody who would like to use the bot in their own Discord channels.

And finally, to make completing the actions fun, we added a random GIF that will show up when an action is completed by all pod members.

### Results

In the few hours we put toward this hackathon project, we built a stable product that will let fellows complete their tasks without leaving Discord. It will let us keep everything within one platform to allow for better navigation and performance.

## Future Plans

### `/action-remind` (remind asap) || `/action-set-reminder 3` (hours in advance)

Send friendly reminders to fellows to complete their standup notes (no need for messages).

### `/action-vote`

Let fellows vote to play their favorite games on gamedays (no more annoying zoom polls).

### `/action-survey`

Ask fellows for their feedback in a private thread to learn about their experiences in one platform (no third-party providers).

### `/action-meet-fellows`

Match fellows for quick 1-1s where they can setup meetings in private threads.


## Authors

- [@dtemir](https://github.com/dtemir)
- [@wei](https://github.com/wei)

_Part of MLH Internal Hackathon 2021_