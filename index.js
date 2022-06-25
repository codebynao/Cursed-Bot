require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Intents } = require('discord.js')

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
})

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command)
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args))
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args))
  }
}

// When the client is ready, run this code (only once)
// client.once('ready', () => {
//   console.log('Ready!', client.user.tag)
// })

// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isCommand()) return

//   const command = client.commands.get(interaction.commandName)

//   if (!command) return

//   try {
//     await command.execute(interaction)
//   } catch (error) {
//     console.error(error)
//     await interaction.reply({
//       content: 'There was an error while executing this command!',
//       ephemeral: true
//     })
//   }
// })

// client.on('voiceStateUpdate', (oldMember, newMember) => {
//   console.log('USERS', oldMember, newMember)
//   let newUserChannel = newMember.voiceChannel
//   let oldUserChannel = oldMember.voiceChannel

//   if (oldUserChannel === undefined && newUserChannel !== undefined) {
//     // User Joins a voice channel
//   } else if (newUserChannel === undefined) {
//     // User leaves a voice channel
//   }
// })
// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN)
