
const prepopulate = () => {
  const form = document.getElementById('setup').elements;
  const query = new URLSearchParams(window.location.search);
  query.forEach((val, index) => form[index].value = val);
  return form;
};

class Training {
  constructor(rounds, cycles, workTime, restTime, pauseTime) {
    workTime *= 1000;
    restTime *= 1000;
    pauseTime *= 1000;

    this.signals = new Signals();

    this.exerciseIndex = 0;
    this.currentCode = 'p';

    let now = Date.now();
    this._paused = now;
    this.exerciseCodeArray = ['p'];
    this.exerciseTimeArray = [now, now + 10000];

    this.exerciseTimer = new Timer(mainClock, COLORS_PAUSE, false, (e) => this.clockEvent(e));
    this.exerciseTimer.setTimerPeriod(now, now + 10000);
    this.exerciseTimer.pause();
    now += 10000;

    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < cycles; j++) {
        this.exerciseCodeArray.push([i, j]);
        this.exerciseCodeArray.push('r');

        now += workTime;
        this.exerciseTimeArray.push(now);
        now += restTime;
        this.exerciseTimeArray.push(now);
      }
      this.exerciseCodeArray.pop();
      this.exerciseCodeArray.push('p');

      now -= restTime;
      this.exerciseTimeArray.pop();
      now += pauseTime;
      this.exerciseTimeArray.push(now);
    }
    this.exerciseCodeArray.pop();
    this.exerciseTimeArray.pop();
    now -= pauseTime;

    this.generalTimer = new Timer(secondaryClock, COLORS_GENERAL, true);
    this.generalTimer.setTimerPeriod(this.exerciseTimeArray[0], now);
    this.generalTimer.pause();
  }

  start() {
    if (this._paused !== 0) {
      const diff = Date.now() - this._paused;
      this.exerciseTimeArray = this.exerciseTimeArray.map(time => time + diff);
      this._paused = 0;
    }
    this.exerciseTimer.start();
    this.generalTimer.start();
  }

  pause() {
    this.exerciseTimer.pause();
    this.generalTimer.pause();
    this._paused = Date.now();
  }

  nextTimer() {
    this.exerciseIndex++;
    if (this.currentCode !== 'p' && this.currentCode !== 'r') done(...this.currentCode);


    if (this.exerciseIndex < this.exerciseCodeArray.length) {
      this.currentCode = this.exerciseCodeArray[this.exerciseIndex];
      this.exerciseTimer.reset();
      this.exerciseTimer.setTimerPeriod(this.exerciseTimeArray[this.exerciseIndex], this.exerciseTimeArray[this.exerciseIndex + 1]);
      this.exerciseTimer.setColors(this.colorDecoder(this.exerciseCodeArray[this.exerciseIndex]));
      this.exerciseTimer.start();
    }
  }

  clockEvent(e) {
    this.makeSound(e);
    if (e === 'finish') this.nextTimer();
  }

  makeSound(e) {
    switch (e) {
      case 'finish':
        if (this.currentCode !== 'p' && this.currentCode !== 'r') this.signals.fin();
        else this.signals.high();
        break;
      case '25pc':
        if (this.currentCode !== 'p' && this.currentCode !== 'r') this.signals.pc25();
        break;
      case '50pc':
        if (this.currentCode !== 'r') this.signals.pc50();
        break;
      case '75pc':
        if (this.currentCode !== 'p' && this.currentCode !== 'r') this.signals.pc75();
        break;
      default:
        if (this.currentCode === 'p' || this.currentCode === 'r') this.signals.low();
    }
  }

  colorDecoder(ent) {
    switch (ent) {
      case 'r': return COLORS_OFF;
      case 'p': return COLORS_PAUSE;
      default: return COLORS_ON;
    }
  }
}


const form = prepopulate();
generateTable(form['rounds'].value, form['cycles'].value);
const training = new Training(form['rounds'].value * 1, form['cycles'].value * 1, form['work'].value * 1, form['rest'].value * 1, form['pause'].value * 1);
const startBtn = () => {
  training.start();
};

const pauseBtn = () => {
  training.pause();
};
