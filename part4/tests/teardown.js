import mongoose from 'mongoose'

export default () => {
    mongoose.connection.close()
    process.exit(0)
  }