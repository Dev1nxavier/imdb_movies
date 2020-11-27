const { db } = require('./database');

module.exports = {
    db,
    ...require('./ratings')
}
