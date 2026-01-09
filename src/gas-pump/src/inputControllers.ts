import { CalcState, InputKeys } from './CalcState';

type InputList = Record<InputKeys, HTMLInputElement>;

type OutputKeys = 'totalCost' | 'distanceCost' | 'personDistanceCost' | 'personCost';

export class HtmlElementController {
  resultElements: Record<OutputKeys, HTMLSpanElement>;
  state = new CalcState();

  constructor() {
    this.resultElements = {
      totalCost: <HTMLSpanElement>document.getElementById('total-cost'),
      distanceCost: <HTMLSpanElement>document.getElementById('distance-cost'),
      personDistanceCost: <HTMLSpanElement>document.getElementById('person-distance-cost'),
      personCost: <HTMLSpanElement>document.getElementById('person-total-cost'),
    };
  }

  setupChangeHandlers(): void {
    const inputs: InputList = {
      personCount: <HTMLInputElement>document.getElementById('personCount'),
      price: <HTMLInputElement>document.getElementById('price'),
      avgConsumption: <HTMLInputElement>document.getElementById('avgConsumption'),
      distance: <HTMLInputElement>document.getElementById('distance'),
    };

    Object.values(inputs).forEach(input => {
      this.updateState(input);
      input.addEventListener('change', event => {
        this.updateState(<HTMLInputElement>event.target);
      });
    });

    this.updateResults();
  }

  updateState({ id, value }: HTMLInputElement): void {
    this.state.updateValue(<InputKeys>id, parseFloat(value));
    this.updateResults();
  }

  updateResults(): void {
    Object.entries(this.resultElements).forEach(([resultKey, resultElement]) => {
      resultElement.innerText = this.state[<OutputKeys>resultKey]?.toFixed(2) ?? '--';
    });
  }
}
