require('dotenv').config({ path: '../.env' });

const botToken = process.env.BOT_TOKEN;
const serverId = process.env.SERVER_ID;
console.log(botToken)


const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const path = require("path");

const app = express();
const PORT = 3000;


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Adiciona a intent de membros
  ],
});

client.once("ready", () => {
  console.log(`Bot logado como ${client.user.tag}`);
});

const guildId = serverId;
app.get("/server-info", async (req, res) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    res.json({
      name: guild.name,
      icon: guild.iconURL({ dynamic: true, size: 1024 }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter o nome do servidor." });
  }
});

app.get("/members", async (req, res) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    const members = await guild.members.fetch({ force: true });

    // Função para converter RGB para Hexadecimal
    const rgbToHex = (rgb) => {
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;
      return `${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
    };

    const membersData = members.map((member) => {
      const roles = member.roles.cache
        .filter((role) => role.name !== "@everyone")
        .map((role) => ({
          name: role.name,
          color: role.color ? rgbToHex(role.color) : "#000000", // Converte a cor para hexadecimal
        }));

      return {
        name: member.user.username,
        userTag: member.user.tag,
        avatar: member.user.displayAvatarURL({ format: "png", size: 64 }),
        roles: roles,
      };
    });


    res.json(membersData);
  } catch (error) {
    console.error("Erro ao buscar membros:", error);
    res.status(500).json({ error: "Erro ao buscar membros." });
  }
});

app.get("/roles", async (req, res) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    const roles = await guild.roles.fetch();

    const filteredRoles = roles.filter(role => role.name !== '@everyone');

    const rolesData = filteredRoles.map(role => ({
      name: role.name,
    }));

    res.status(200).json(rolesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Não foi possível buscar os cargos." });
  }
});

// Login do bot
client.login(
  botToken
);


app.use(express.static(path.join(__dirname, "../")));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/home.html`);
});
