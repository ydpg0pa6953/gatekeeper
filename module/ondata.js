'use strict'
const store = require('./store')

module.exports = {
  fromTerminal (sock, data) {
    let sPort = store.s_start + sock.localPort - store.t_start
    let server = store.server[sPort]
    if (!server || !server.connections) return
    let sc = server.connections
    for (let s in sc) {
      sc[s] && sc[s].write(data)
    }
  },
  fromServer (sock, data) {
    let tPort = store.t_start + sock.localPort - store.s_start
    let terminal = store.terminal[tPort]
    if (!terminal) return
    if (!terminal || !terminal.connections) return
    let tc = terminal.connections
    for (let t in tc) {
      tc[t] && tc[t].write(data)
    }
  }
}
