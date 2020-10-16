const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dbName = 'ux'
//const url = 'mongodb://ooze:ooze@localhost:27017'
const url = 'mongodb://localhost:27017'
export const db = async function() {
    mongoose
        .connect(`${url}/${dbName}`, { useNewUrlParser: true })
        .then(db => {})
    return mongoose.connection.once('open', () =>
        console.log(`Connected to mongo at ${url}/${dbName}`)
    )
}
