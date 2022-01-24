
class Signals {
  constructor() {
    this._low = new Audio('./sounds/c4.wav');
    this._high = new Audio('./sounds/c5.wav');
    this._pc25 = new Audio('./sounds/g41.wav');
    this._pc50 = new Audio('./sounds/g42.wav');
    this._pc75 = new Audio('./sounds/g43.wav');
    this._fin = new Audio('./sounds/fin.wav');
  }

  async low() {
    this._low.play();
  }

  async high() {
    this._high.play();
  }

  async pc25() {
    this._pc25.play();
  }

  async pc50() {
    this._pc50.play();
  }

  async pc75() {
    this._pc75.play();
  }

  async fin() {
    this._fin.play();
  }
}
