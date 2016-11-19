const Bot = require('slackbots');

const slackBotToken = process.env.SLACK_BOT_TOKEN || '';
const slackBotName = process.env.SLACK_BOT_NAME || '';

const bot = new Bot({
  token: slackBotToken,
  name: slackBotName,
});
bot.knownUsers = {};

bot.on('start', () => {
  console.log('[BOT] Started');
});

bot.on('message', (data) => {
  try {
    if (data.type === 'user_typing') {
      if (!bot.knownUsers[data.user]) {
        bot._api('users.info', { user: data.user }).then((userData) => {
          userData.user.last = '';
          bot.knownUsers[userData.user.id] = userData.user;
        });
      }
    } else if (data.type === 'message') {
      const user = bot.knownUsers[data.user];
      if (user && user.is_bot === false) {
                // console.log('[BOT] User Object', user);
                // console.log('[BOT] Data Object', data);
        bot.postMessageToUser(user.name, data.text);
      }
    }
  } catch (e) {
    console.log('❌ error in slack.js', e);
  }
});
