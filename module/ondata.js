'use strict'
const store = require('./store')

module.exports = {
  fromTerminal (sock, data) {
    let sPort = store.s_start + sock.localPort - store.t_start
    let server = store.server[sPort]
    if (!server || !server.connections) return
    let sc = server.connections
    // let s = null
    // for (s in sc) break
    // if (!s || !sc[s]) return

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
    // let t = null
    // for (t in tc) break;
    // if (!t || !tc[t]) return

    for (let t in tc) {
      tc[t] && tc[t].write(data)
    }
  }
}
