![discord-actions-bot](https://socialify.git.ci/wei/discord-actions-bot/image?description=1&font=Bitter&logo=https%3A%2F%2Fdiscord.com%2Fassets%2F145dc557845548a36a82337912ca3ac5.svg&name=1&pattern=Plus&theme=Dark)


## Installation

Install the [**Discord Bot**](https://discord.com/oauth2/authorize?client_id=922524247274950666&scope=bot%20applications.commands&permissions=446677109824)


## Usage

### `/action-react`

Create an action that requires users of a particular role to react with a ✅.

Follow the slach command prompt:
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
1. Go to the app's dashboard and create a bot user.
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

## Authors

- [@dtemir](https://github.com/dtemir)
- [@wei](https://github.com/wei)

_Part of MLH Internal Hackathon 2021_