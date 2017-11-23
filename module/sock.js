'use strict'
const app = require('./store')
const net = require('net')

module.exports = function (opt) {
    let option = Object.assign({port: 0, onConnected: null, onData: null, onClose: null}, opt)
    if (isNaN(option.port) || option.port < 1024 || option.port > 60000) return false
    let _sck = net.createServer(sock => {

        // app.clients[option.port] = {server: sock, clients: null}
        console.log('CONNECTED: ', [sock.remoteAddress, sock.remotePort].join(':'));
        !!onConnected && onConnected(sock)
        !!onData && sock.on('data', (data) => {
            onData(data, sock)
        })
        !!onClose && sock.on('close', (data) => {
            onClose(data, sock)
        })

    }).on('error', (err) => {
        console.log(err)
    }).listen(option.port, () => {
        console.log(333333, option.port)
    })
}
