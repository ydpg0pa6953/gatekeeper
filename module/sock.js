'use strict'
const app = require('./application')
const net = require('net')

// function clientListen (port) {
//     let _sck = net.createServer(function(sock) {        
//         console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

//         sock.on('data', function(data) {
//             console.log('DATA ' + sock.remoteAddress + ': ' + data);
//             sock.write('You said "' + data + '"');
//         });

//         sock.on('close', function(data) {
//             console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
//         });
//     }).listen(port)
    
//     _sck.on('listening',function(){
//         app.clients[port] = _sck
//     });
    
//     _sck.on("error",function(exception){
//         console.log("server error:" + exception);
//     });
// }

// function serverListen (port) {
//     app.servers[port] = net.createServer(function(sock) {        
//         console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

//         sock.on('data', function(data) {
//             console.log('DATA ' + sock.remoteAddress + ': ' + data);
//             sock.write('You said "' + data + '"');
//         });

//         sock.on('close', function(data) {
//             console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
//         });
//     }).listen(port)
// }

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