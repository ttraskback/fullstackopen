import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const CREDENTIALS = process.env.MONGODB_CREDENTIALS

//console.log(process.env.PORT)
const PORT = process.env.PORT || 3003

export {
    MONGODB_URI,
    CREDENTIALS,
    PORT
  }