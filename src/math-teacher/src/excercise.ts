type ExerciseType = 'translation' | 'addition' | 'subtraction' | 'multiplication' | 'division';
type Difficulty = 'easy' | 'medium' | 'hard';
type NumberSystem = 'decimal' | 'binary' | 'hexadecimal';
interface GeneratedTask {
  equation: string;
  solution: string;
}

export class Exercise {
  type: ExerciseType;
  equation: string;
  solution: string;
  difficulty: Difficulty;
  numberSystems: NumberSystem[];

  constructor(type: ExerciseType, difficulty: Difficulty, numberSystems: NumberSystem[]) {
    this.type = type;
    this.difficulty = difficulty;
    this.numberSystems = numberSystems;

    const { equation, solution } = this.generateExercise();
    this.equation = equation;
    this.solution = solution;
  }

  generateExercise(): GeneratedTask {
    switch (this.type) {
      case "translation": return this.generateTranslation();
      case "addition":
      case "subtraction":
      case "multiplication":
      case "division":
    }
    return { equation: '', solution: '' };
  }

  generateTranslation(): GeneratedTask {
    const numberSystems = this.getTwoNumberSystems();
    const num = this.getRandomNumber();

    const equation = `(${Exercise.getShorthand(numberSystems[0])}) ${num.toString(Exercise.getRadix(numberSystems[0]))} = (${Exercise.getShorthand(numberSystems[1])})`
    const solution = num.toString(Exercise.getRadix(numberSystems[1]))

    return { equation, solution }
  }

  getRandomNumber(): number {
    let base: number, range: number;

    switch (this.difficulty) {
      case 'easy':
        base = 1;
        range = 15;
        break;
      case 'medium':
        base = 16;
        range = 239;
        break;
      case 'hard':
        base = 256;
        range = 3840;
        break;
    }

    return Math.floor(Math.random() * range) + base;
  }

  getNumberSystem(): NumberSystem {
    if (this.numberSystems.length === 0) {
      throw Error('too little number systems selected');
    }

    if (this.numberSystems.length === 1) {
      return this.numberSystems[0];
    }

    return this.numberSystems[Math.floor(Math.random() * this.numberSystems.length)];
  }

  getTwoNumberSystems(): NumberSystem[] {
    if (this.numberSystems.length < 2) {
      throw Error('too little number systems selected');
    }

    if (this.numberSystems.length === 2) {
      return this.numberSystems;
    }

    throw Error('too many number systems selected');
  }

  static getRadix(numberSystem: NumberSystem): number {
    switch (numberSystem) {
      case "decimal": return 10;
      case "binary": return 2;
      case "hexadecimal": return 16;
    }
  }

  static getShorthand(numberSystem: NumberSystem): string {
    switch (numberSystem) {
      case "decimal": return 'dec';
      case "binary": return 'bin';
      case "hexadecimal": return 'hex';
    }
  }
}
