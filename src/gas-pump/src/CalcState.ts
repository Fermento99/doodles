export type InputKeys = 'personCount' | 'price' | 'avgConsumption' | 'distance';

export class CalcState {
  personCount?: number;
  distance?: number;
  avgConsumption?: number;
  price?: number;


  get distanceCost(): number | null {
    const { price, avgConsumption } = this;

    if (price === undefined || avgConsumption === undefined) return null;

    return (price * avgConsumption) / 100;
  }

  get totalCost(): number | null {
    const { distanceCost, distance } = this;

    if (distanceCost === null || distance === undefined) return null;
    
    return distanceCost * distance;
  }

  get personDistanceCost(): number | null {
    const { distanceCost, personCount } = this;

    if (distanceCost === null || personCount === undefined) return null;

    return distanceCost / personCount;
  }

  get personCost(): number | null {
    const { totalCost, personCount } = this;

    if (totalCost === null || personCount === undefined) return null;

    return totalCost / personCount;
  }

  updateValue(id: InputKeys, value: number): void {
    this[id] = value;
  }
}
