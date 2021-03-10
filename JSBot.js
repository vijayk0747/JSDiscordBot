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

    //Added weather functionality using openweathermap API
    if (message.content.includes("!weather") && message.author.bot === false) {
        let zipCode = message.content.split(" ")[1];
        if (zipCode === undefined || zipCode.length != 5 || parseInt(zipCode) === NaN) {
            message.channel.send("`Invalid Zip Code!`")
            .catch(console.error)
            return;
        } else {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=`) //APIKEY is hidden.
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.cod === '404') {
                        message.channel.send("`This zip code does not exist.`")
                    } else {
                            const embed = new Discord.MessageEmbed()
                            .setColor('#F5C9B9')
                            .setTitle('Weather Report')
                            .addField('Location: ', `${data.name}, ${data.sys.country} `)
                            .addField('Forecast: ', `${data.weather[0].main}`)
                            .addField('Current Temperature: ', `${(Math.round(((data.main.temp - 273.15) * 9/5 +32)))} F`)
                            
                            return message.channel.send(embed);
                    }
                })
        }
    }

    //Added F1 Data Functionality using ergast API
    if (message.content.includes("!F1") && message.author.bot === false)
    {
        let fSeason = message.content.split(" ")[1];
        if (fSeason === undefined || fSeason.length != 4 || parseInt(fSeason) === NaN) {
            message.channel.send("`Invalid Season`")
            .catch(console.error)
            return;
        } else {
            fetch(`http://ergast.com/api/f1/${fSeason}/driverStandings.json`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const embed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setTitle('F1')
                .addField('Standings: ', `${data.MRData.StandingsTable.StandingsList.DriverStanding.Driver.GivenName}`)

                return message.channel.send(embed);
            })
        }
    }
})

//API Token Hidden
JSBotClient.login('')

