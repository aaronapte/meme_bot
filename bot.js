//var Genius = require("genius-api")
//var genius = new Genius('D-OaT6Ar1UeDzDsVaKDRZdNBaQM7VUHi4aODjMT_wLoFRRRoYIV-eTEZWn9nA4i6')
var Discord = require ("discord.js");
var bot = new Discord.Client();
var dotenv = require('dotenv');

dotenv.load()

//Get the list of roles from .env
let allowedRoles = process.env.ALLOWED_ROLES.split(',')

//The prefix for the bot
var prefix = '!';

//Respond on a message
bot.on("message", msg => {
  //Ignore all messages from bots and anything that contains a hyperlink
  if (msg.author.bot || msg.content.includes("http")) {
    return;
  }

  //Parse the strings to get a list of all allowed roles
  let allowedJoin = ''
  allowedRoles.forEach((role) => {
    if(msg.member.guild.roles.find("name", role) && !msg.member.roles.find("name", role))
    {
      allowedJoin = allowedJoin.concat('- ' + role + '\n')
    }
  })

  let allowedLeave = ''
  allowedRoles.forEach((role) => {
    if(msg.member.roles.find("name", role))
    {
      allowedLeave = allowedLeave.concat('- ' + role + '\n')
    }
  })

  //Sends the help message
  if(msg.content.toLowerCase().startsWith(prefix + 'role'))
  {
    let args = msg.content.split(" ");

    if(args.length < 2)
    {
      msg.channel.send('Please enter a flag to specify which list of roles you want to see. Enter `!role --add` to see roles you may add, and `!role --remove` to see roles you may remove.')
      return
    }
    if(args[1] === '--add')
    {
      if(allowedJoin === '')
      {
        msg.channel.send('Unfortunately, there are no roles you may add right now.')
      }
      else
      {
        msg.channel.send('These are the roles you\'re allowed to add: \n' + allowedJoin + '\nuse `!addRole <role_name>` to add a role.')
      }
      return
    }
    if(args[1] === '--remove')
    {
      if(allowedLeave === '')
      {
        msg.channel.send('Unfortunately, there are no roles you may remove right now.')
      }
      else
      {
        msg.channel.send('These are the roles you\'re allowed to remove: \n' + allowedLeave + '\nuse `!removeRole <role_name>` to remove a role.')
      }
      return
    }
    msg.channel.send('I don\'t recognize that flag - make sure that you\'ve entered either `!role --add` or `!role --remove`')
    return
  }

  //Adds a role
  if (msg.content.toLowerCase().startsWith(prefix + 'addrole'))
  {
    //Get the role name
    let args = msg.content.split(" ");

    //Check if the user needs to specify a role
    if (args.length < 2)
    {
      if(allowedJoin === '')
      {
        msg.channel.send('It seems you haven\'t specified a role yet. However, you don\'t seem to have any valid roles that you can add.')
      }
      else
      {
        msg.channel.send('It seems you haven\'t specified a role yet. These are the roles you\'re allowed to add: \n'
        +  allowedJoin + '\nuse "!addRole `<role_name>` to add a role.')
      }
      return
    }

    //Get the role name in case it's multiple words
    var roleName = "";
    for(var i = 1; i < args.length; i++)
    {
      roleName = roleName += args[i] + " ";
    }
    roleName = roleName.substring(0, roleName.length - 1);

    // Get the role
    let role = msg.guild.roles.find("name", roleName);

    if (!role || role === null) {
      msg.channel.send('If an item does not appear in our records, then it does not exist. The role you specified is invalid.')
      return
    }

    if(msg.member.roles.has(role.id))
    {
      msg.channel.send('It seems you already have this role.')
      return
    }

    if (allowedRoles.indexOf(role.name) === -1) {
      msg.channel.send('I\'m sorry, but my master has forbidden me from assigning this role to you, as Supreme Leader <@98966540694622208> would like to fuel his delusion that he is the one in control of this server, resulting in the creation of several unique roles that he has seen fit to bestow upon his ~~marked for death~~ favored subjects.\nFor a list of communal, plebian roles that you may add, type `!role --add`')
      return
    }

    msg.member.addRole(role).catch(console.error);
    msg.channel.send('You\'ve been added to: ' + role.name)

    return
  }
if (msg.content.startsWith(prefix + 'removeRole'))
{
  //Get the role name
  let args = msg.content.split(" ");

  //Check if the user needs to specify a role
  if (args.length < 2)
  {
    if(allowedLeave === '')
    {
      msg.channel.send('It seems you haven\'t specified a role yet. However, you don\'t seem to have any valid roles that you can remove.')
    }
    else
    {
      msg.channel.send('It seems you haven\'t specified a role yet. These are the roles you\'re allowed to remove: \n'
      +  allowedLeave + '\nuse !removeRole `<role_name>` to remove a role.')
    }
    return
  }

  var roleName = "";
  for(var i = 1; i < args.length; i++)
  {
    roleName = roleName += args[i] + " ";
  }

    roleName = roleName.substring(0, roleName.length - 1);

    // Get the role
    let role = msg.guild.roles.find("name", roleName);

    if (!role || role === null) {
      msg.channel.send('If an item does not appear in our records, then it does not exist. The role you specified is invalid.')
      return
    }

    if (allowedRoles.indexOf(role.name) === -1) {
      msg.channel.send('I\'m sorry, but this role appears to be a ~~curse~~ gift from Supreme Leader <@98966540694622208> and thus, you are marked with it for the rest of your finite existence.\nFor a list of communal, plebian roles that you may remove, type `!role --remove`')
      return
    }

    msg.member.removeRole(role).catch(console.error);
    msg.channel.send('You\'ve been removed from: ' + role.name)

    return
  }

  if(msg.content.toLowerCase().includes("men"))
	{
		var str = (msg.content.toLowerCase()).split(' ');
		for(var i = 0; i < str.length; i++)
		{
			if(str[i].includes("men"))
			{
				var women = str[i].replace("men", "women");
				var children = str[i].replace("men", "children");
				msg.channel.send("And not just the " + str[i] + ", but the " + women
				+ " and the " + children + " too!");
			}
		}
	}

	if(msg.content.toLowerCase().includes("pot of greed"))
	{
		msg.channel.send("Pot of Greed allows me to draw two cards!");
	}

	if(msg.content.toLowerCase().includes("hello there"))
	{
		msg.channel.send("General Kenobi!");
	}

	if(msg.content.toLowerCase().includes("sand"))
	{
		var str = (msg.content.toLowerCase()).split(' ');
		for(i = 0; i < str.length; i++)
		{
			if(str[i].toLowerCase().valueOf() == "sand")
			{
				msg.channel.send("I don't like sand. It's coarse and rough and irritating and it gets everywhere.");
				break;
			}
		}
	}

	if(msg.content.toLowerCase().includes("water"))
	{
		var str = (msg.content.toLowerCase()).split(' ');
		for(i = 0; i < str.length; i++)
		{
			if(str[i].toLowerCase().valueOf() == "water")
			{
				msg.channel.send("Jason used to drink water! T_T");
				break;
			}
		}
	}

	if(msg.content.toLowerCase().includes("breath") ||
	msg.content.toLowerCase().includes("breathing")
	||msg.content.toLowerCase().includes("breathe")
	||msg.content.toLowerCase().includes("breathes"))
	{
		var str = (msg.content.toLowerCase()).split(' ');
		for(i = 0; i < str.length; i++)
		{
			if(str[i].toLowerCase().valueOf() == "breath"
			||str[i].toLowerCase().valueOf() == "breathing"
			||str[i].toLowerCase().valueOf() == "breathe"
			||str[i].toLowerCase().valueOf() == "breathes")
			{
				msg.channel.send("Jason used to breathe! T_T");
				break;
			}
		}
	}

	if(msg.content.toLowerCase().includes("cheryl"))
	{
		var str = (msg.content.toLowerCase()).split(' ');
		for(i = 0; i < str.length; i++)
		{
			if(str[i].toLowerCase().valueOf() == "cheryl")
			{
				msg.channel.send(" if you breathe, it is because Cheryl Blossom gives you air. If you drink, it is because Cheryl Blossom poured your cup herself. And if you move, it is quietly, and with Cheryl Blossom's blessing.");
				break;
			}
		}
	}
});

bot.login(process.env.BOT_TOKEN);
