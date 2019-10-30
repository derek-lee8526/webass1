let db = require('../utils/database')

function addUser(data) {
    let sql = "INSERT INTO score (name, score) values ('" + data.name+ "','" + data.score +"')";
    db.execute(sql);
}

function getUser() {
    return db.execute('SELECT * FROM score ORDER BY id DESC limit 5')
}

module.exports = {
    add: addUser,
    get: getUser
}