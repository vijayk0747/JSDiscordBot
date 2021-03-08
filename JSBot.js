const Discord = require("discord.js");

const JSBotClient = new Discord.Client();
const fetch = require('node-fetch')

JSBotClient.on("ready", () => {
    console.log("Logged in as JSBot!");
})

JSBotClient.on("message", (message) => {
    if (message.content === 'Who created this bot?') {
        message.channel.send('Vijay')
    }

    if (message.content.includes("!weather") && message.author.bot === false) {
        let zipCode = message.content.split(" ")[1];
        if (zipCode === undefined || zipCode.length != 5 || parseInt(zipCode) === NaN) {
            message.channel.send("`Invalid Zip Code!`")
            .catch(console.error)
            return;
        } else {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=2783022f774b889fe43211fe74b13dc4`)
                .then(response => {
                    return response.json()
                })
                .then(parsedWeather => {
                    if (parsedWeather.cod === '404') {
                        message.channel.send("`This zip code does not exist.`")
                    } else {
                            const embed = new Discord.MessageEmbed()
                            .setColor('#E6E6FA')
                            .setTitle('Weather Report')
                            .addField('Location: ', `${parsedWeather.name}, ${parsedWeather.sys.country} `)
                            .addField('Forecast: ', `${parsedWeather.weather[0].main}`)
                            .addField('Current Temperature: ', `${(Math.round(((parsedWeather.main.temp - 273.15) * 9/5 +32)))} F`)
                            
                            return message.channel.send(embed);
                    }
                })
        }
    }
})

JSBotClient.login('ODE4NTE4MzU5OTIyNDQyMjYx.YEZOoA.abBtAk34xVnXnFo6b8g_CsRAWjk')

