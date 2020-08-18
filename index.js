const Discord = require('discord.js');

const bot = new Discord.Client();

const token = 'NzM2NjQxNDI1NDc4Nzc5MDYx.XxxwyQ.EZa6rB42_P0PvpJr7uNOeDvDwqE';

const config = require('./config.json');
const prefix = '/';


bot.on('message', message => {
    if (message.content.includes("https://discord.gg/")) {
      // if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            message.reply("❌ **Você não pode divulgar aqui!**");
      // }

    }
})
    
bot.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase()

    if(comando === "sugerir") {
        let sugestao = args.join(" ");
        if (!sugestao) return message.reply("insira sua sugestão. <a> Use !sugerir [sua sugestão]")
            let embed = new Discord.RichEmbed()
            .setColor("#0051FF")
            .addField("**Sugestão**", `${sugestao}`)
            .setFooter(`Sugestão enviada por: ${message.author.tag}`, `${message.author.avatarURL}`)
            .setTimestamp(new Date())
    
        let canal = message.guild.channels.find(canal => canal.name === "📖│sugestões");
        if (!canal) return message.reply("não existe nenhum canal para enviar a sua sugestão.");
    
        message.delete();
        canal.send(embed).then(msg => msg.react("👍").then(r => msg.react("👎")));
        message.reply(`sua sugestão foi enviada com sucesso!`);
    }

    if(comando === "anuncio") {
        const anunciar = args.join(" ")

        let anuncio = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`${anunciar}`)
        .setFooter(`Anunciado por ${message.author.username}`)
        .setTimestamp(new Date())

        message.author.send('Anúncio enviado com sucesso!')
        message.channel.send('@everyone')
        message.channel.send(anuncio)


    }
    if(comando === "limparchat") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Você não possuí permissão para isto.');
        let mensagemDeletar = args.slice(0).join(" ");
        if(mensagemDeletar < 2 || mensagemDeletar > 100) message.reply('Você só pode limpar de 2 a 100 mensagens.');
        if(args.lengt === 0) return message.reply('Use !limparchat (Número de mensages) para o comando funcionar corretamente!');
        if(isNaN(args[0])) return message.reply('Você deve colocar um número.');
    
        try {
            message.channel.bulkDelete(mensagemDeletar)
            message.channel.send(`O chat foi limpo por ${message.author.tag}, foram excluidas ${mensagemDeletar} mensagens!`);
        } catch (e) {
            console.log(e);
        }
    }
    if (comando === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          ` **${message.author.username}** Você não possui permissão para isto!`
        );
      if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          ` ${message.author.username} Eu não possuo permissão para isto!`
        );
  
      if (!args[0])
        return message.channel.send(
          ` **${message.author.username}** Você está utilizando isto incorretamente!\n⚙️ Use: **/ban** \`<user>\``);
  
      let target = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!target)
        return message.reply(
          ` **${message.author.username}** Este usuário não existe!`
        );
      if (!target.bannable)
        return message.channel.send(
          ` **${message.author.username}** O cargo do usuário é maior que o meu!`
        );
  
      let razao = args.slice(1).join(" ");
      if (!razao) razao = " ";
  
      if (razao < 1)
        return message.channel.send(
          `  **${message.author.username}** Insira uma razão!`
        );
  
      let embban = new Discord.RichEmbed()
        .setAuthor(`Punição aplicada!`, `${target.user.avatarURL}`)
        .setDescription(
          `\n\nNome: ${target.user.username}\nAutor: **${message.author.username}** \nRazão: **${razao}**`
        );
      await target.ban(razao);
      message.channel.send(embban);
    }
    if (comando === "pre") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send();
      if (!args[0]) return message.channel.send("Mencione o membro!");
      var user = message.mentions.members.first();
      var razao = args.slice(1).join(" ");
      if (!razao) razao = "sem motivo";
      var muteRole = message.guild.roles.find("name", "🌐| Morador");
      if (!muteRole) return message.channel.send("Não encontrei o cargo 🌐| Morador.");
      try {
        user.addRole(muteRole);
        message.channel.send("**O jogador passou na whitelist**");
      } catch (err) {
        message.channel.send(
          "Eu não tenho as permissões necessárias para dar whitelist em um membro!"
        );
      }
    }
  });


bot.on('guildMemberAdd', member => {
    member.guild.channels.get('735675443994296462')
    let avatar = member.user.avatarURL
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(avatar)
    .setTitle("**SEJA BEM VINDO**")
    .addField("Bem vindo(a)!", `Bem vindo(a) ${member} Ao servidor`)
    .setFooter(`Membro que entrou no server: ${member}`)
    .setFooter("Para fazer sua whitelist vai no #🎫𝙼𝙰𝙽𝙳𝙴-𝚂𝙴𝚄-𝙸𝙳")
    .addField("Você é o membro de numero:", member.guild.memberCount)
    .addField("____**IP do Servidor para Conectar:**____", )
    .addField("```Connect:```")
    .setDescription(":heart:  :tada:  Opa, tudo-bem novato? Bom.. Espero que sim, seja muito bem-vindo ao vosso servidor!! :tada: ")
    .setTimestamp()
        .setTimestamp()
        bot.channels.get('735675443994296462').send(embed)
   }); 
    
  bot.on("guildMemberAdd", member => {
  member.guild.channels.get("723054204784214018");
  member.send("Bem vindo ao [CDD] Cidade De Deus, você é muito importante para nós :heart: ");
  });
  

bot.login(token)
bot.on('ready', () => {
    console.log('estou pronto para ser usado')
})

bot.login(config.token);

bot.on("ready", () => {
    bot.user.setActivity("Servidor em desenvolvimento!" , {type: 'PLAYING'});
})
