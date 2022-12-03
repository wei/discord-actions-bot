![discord-actions-bot](https://socialify.git.ci/wei/discord-actions-bot/image?description=1&font=Bitter&logo=https%3A%2F%2Fuser-images.githubusercontent.com%2F5880908%2F205446002-9245a89e-9927-49cd-91dc-bea8bd079336.svg&name=1&pattern=Plus&theme=Dark)


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

![](https://user-images.githubusercontent.com/5880908/146950481-f6fa4469-c4cf-4f4c-910f-a566bbb233ff.png)
![](https://user-images.githubusercontent.com/5880908/146950525-846cfc2d-6029-4fed-9365-d91c05bb45e8.png)
![](https://user-images.githubusercontent.com/5880908/146950581-b3c55d8a-0939-4a44-88c3-098337b56fde.png)

### `/action-thread`

Create an action that requires users of a particular role to reply in a thread.

Follow the slash command prompt:
```
/action-thread [role] [message]
```

Example:
```
/action-thread @Pod 4.0.3 Friday December 17th: Post Standup Notes

/action-thread @Pod 4.0.3 Week 12 Retrospective
```

![](https://user-images.githubusercontent.com/5880908/146950775-a636f346-2d8b-424f-9e35-78bb2600244d.png)
![](https://user-images.githubusercontent.com/5880908/146950866-e93a23fc-d5f9-4bec-8fc2-de2ad4aefdd3.png)

### `/action-poll`

Create a poll that requires users of a particular role to vote by reacting.

Follow the slash command prompt:
```
/action-poll [role] [title] [options]
```

Example:
```
/action-poll @Pod 4.0.3 [What do you want to play at our game day?] [Skribbl, Gartic Phone, Among Us, Jack Box]
```

![](https://user-images.githubusercontent.com/5880908/150705373-3eaf06c8-964c-4322-8d58-209395f05c5a.png)
![](https://user-images.githubusercontent.com/5880908/150705282-b4492523-77b5-4afb-8487-5f52f9f63dc6.png)
![](https://user-images.githubusercontent.com/5880908/150705327-1bb1fee6-40a2-4477-9e08-e871ee2d1ab5.png)


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

### `/action-survey`

Ask fellows for their feedback in a private thread to learn about their experiences in one platform (no third-party providers).

### `/action-meet-fellows`

Match fellows for quick 1-1s where they can setup meetings in private threads.


## Authors

- [@dtemir](https://github.com/dtemir)
- [@wei](https://github.com/wei)

_Part of MLH Internal Hackathon 2021_
