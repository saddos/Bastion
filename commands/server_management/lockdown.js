/**
 * @file lockdown command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.remove) {
    await message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null,
      ADD_REACTIONS: null
    });

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        title: 'Channel Lockdown Removed',
        description: 'The lockdown on this channel has now been removed, you can now send messages in this channel.',
        footer: {
          text: `Removed by ${message.author.tag}`
        }
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  else {
    await message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });

    await message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        title: 'Channel Lockdown Initiated',
        description: 'This text channel is in lockdown. You do not have permissions to send message in this channel unless you are explicitly allowed.\nAdministrators can remove the lockdown using the `lockdown --remove` command.',
        footer: {
          text: `Initiated by ${message.author.tag}`
        }
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'remove', type: Boolean, alias: 'r' }
  ]
};

exports.help = {
  name: 'lockdown',
  description: 'Locks down a channel, preventing everyone to send messages who does not explicitly has permission for it.',
  botPermission: 'MANAGE_ROLES',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'lockdown [--remove]',
  example: [ 'lockdown', 'lockdown --remove' ]
};
