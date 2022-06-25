module.exports = {
  name: 'voiceStateUpdate',
  execute(client, oldMember, newMember) {
    if (!process.env.VOICE_CHANNELS) {
      return
    }

    const voiceChannels = process.env.VOICE_CHANNELS.split(',')

    if (!voiceChannels.length) {
      return
    }

    // Use joined a VC we don't want to monitor
    if (newMember.channelId && !voiceChannels.includes(newMember.channelId)) {
      return
    }

    // User left VC, nothing to do
    if (newMember.channelId === null) {
      return
    }

    if (newMember.streaming && !oldMember.streaming) {
      const channel = client.channels.cache.get('982547441385635911')
      if (!channel) {
        return
      }
      let message = `Looks like someone is streaming in <#${newMember.channelId}>`

      const peepo = client.emojis.cache.find(
        (emoji) => emoji.name === 'excitedCat'
      )

      console.log(' client.emojis.cache', client.emojis.cache, peepo)

      if (peepo) {
        message += ` ${peepo}`
      }
      channel.send(message)
    }

    // console.log('oldUser', oldMember.channelId, oldMember.streaming)
    // console.log('newUser', newMember.channelId, newMember.streaming)
    // if (oldUserChannel === undefined && newUserChannel !== undefined) {
    //   // User Joins a voice channel
    // } else if (newUserChannel === undefined) {
    //   // User leaves a voice channel
    // }
  }
}
