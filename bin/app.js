const fastify = require('fastify')()
const biz = require('../module/biz')

biz.init()

fastify.get('/keepalive', function (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.listen(5432, function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
