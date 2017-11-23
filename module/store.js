module.exports = {
    t_start: 10000,
    s_start: 20000,
    count: 1,
    _counter: 0,
    terminal: {},
    server: {},
    counter () {
      return this._counter++
    }
};
