dotenv = require("dotenv")
dotenv.config()

token = process.env.TOKEN
mongodb_srv = process.env.MONGODB_SRV
prefix = process.env.PREFIX
client_id = process.env.CLIENT_ID
devguild_id = process.env.DEVGUILD_ID

// console.log(token + mongodb_srv + prefix + client_id + devguild_id)