let db = require('../utils/database')

function addUser(data) {

}

function getUser() {
    return db.execute('SELECT * FROM score ORDER BY id DESC limit 5')
}

module.exports = {
    add: addUser,
    get: getUser
}