const easyvk = require('easyvk')
const Discord = require('discord.js')
const config = require('./config.json')
const vkToken = config.vk.token
const peer_id = config.vk.peer_id
const webhookClient = new Discord.WebhookClient(config.discord.webhook.id, config.discord.webhook.token)
const client = new Discord.Client()
client.on('ready', () => {
    console.log(`Discord - Ready!`)
})
client.on('message', msg => {
    if (!msg.author.bot) {
        let text = `(${msg.author.username}#${msg.author.discriminator}): ${msg.content}`
        easyvk.static.call('messages.send', {
            access_token: vkToken,
            random_id: easyvk.randomId(),
            v: '5.126',
            lang: 'ru',
            message: text,
            peer_id: peer_id
        })
    }
})
client.login(config.discord.bot.token)
easyvk({
    token: vkToken,
    utils: {
        longpoll: true
    }
}).then(async vk => {
    console.log('VK ready!')

    async function getMessage(msgArray = []) {
        const MESSAGE_ID__INDEX = 1
        return vk.call('messages.getById', {
            message_ids: msgArray[MESSAGE_ID__INDEX]
        })
    }

    async function getUser(id) {
        return vk.call('users.get', {
            user_ids: [id]
        })
    }

    vk.longpoll.connect().then((connection) => {
        connection.on('message', async (msg) => {
            let fullMessage = await getMessage(msg)
            fullMessage = fullMessage.items[0]
            if (!fullMessage.out) {
                let user = await getUser(fullMessage.from_id)
                user = user[0]
                if (fullMessage.text || fullMessage.attachments) {
                    let text = `(${user.first_name} ${user.last_name}): ${fullMessage.text}`
                    await webhookClient.send(text)
                }
            }
        })
    })
})