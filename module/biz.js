'use strict'
const net = require('net')
const store = require('./store')
const onData = require('./ondata')
console.log(typeof onData)
module.exports = {
    init: () => {
      console.log('Biz init listening')
      for(let i = 0; i < store.count; i++) {
        let t_port = store.t_start + i
        let _t = net.createServer((sock) => {
          store.terminal[t_port].connections[store.counter()] = sock
          console.log('Terminal connection: ', sock.remoteAddress, ':', sock.remotePort)
          sock.on('data', (data) => {
            typeof onData.fromTerminal === 'function' && onData.fromTerminal(sock, data)
          })

          sock.on('close', (data) => {
            console.log('Terminal disconnect: ', sock.remoteAddress, ':', sock.remotePort)
            let _tc = store.terminal[t_port].connections
            let match = null
            for(match in _tc) {
              if (_tc[match] === sock) {
                break;
              }
            }
            if (!isNaN(match) || !!match) {
              delete _tc[match]
            }
          })
        })
        .on('error', (err) => {
          console.log(err)
          // if (!!_sck) { _sck.close() }
        })
        .listen(t_port, () => {
          store.terminal[t_port] = {listener: _t, connections: {}}
          console.log('Terminal listening on ', t_port)
        })

        let s_port = store.s_start + i
        let _s = net.createServer((sock) => {
          store.server[s_port].connections[store.counter()] = sock
          console.log('Server connection: ', sock.remoteAddress, ':', sock.remotePort)
          sock.on('data', (data) => {
            typeof onData.fromServer === 'function' && onData.fromServer(sock, data)
          })

          sock.on('close', (data) => {
            console.log('Server disconnect: ', sock.remoteAddress, ':', sock.remotePort)
            let _tc = store.server[s_port].connections
            let match = null
            for(match in _tc) {
              if (_tc[match] === sock) {
                break;
              }
            }
            if (!isNaN(match) || !!match) {
              delete _tc[match]
            }
          })
        })
        .on('error', (err) => {
          console.log(err)
          // if (!!_sck) { _sck.close() }
        })
        .listen(s_port, () => {
          store.server[s_port] = {listener: _s, connections: {}}
          console.log('Server listening on ', s_port)
        })
      }
      function showSock() {
        setTimeout(() => {
          let tc = 0
          let sc = 0
          for(let i in store.terminal){
            for(let j in store.terminal[i].connections){
              !!store.terminal[i].connections[j] && tc++
            }
          }
          for(let i in store.server){
            for(let j in store.server[i].connections){
              !!store.server[i].connections[j] && sc++
            }
          }
          console.log('Connections: terminal = ', tc, ', server = ', sc)
          showSock()
        }, 10000)
      }
      showSock()
    }
};
