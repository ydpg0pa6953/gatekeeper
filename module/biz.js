// const app = require('./application')
const sock = require('./sock')

module.exports = {
    init: () => {
        new sock({port: 10000})
    }
};