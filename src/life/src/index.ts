import { AnimationController } from './AnimationController';
import { DisplayHandler } from './DisplayHandler';
import { setUpActions } from './OptionsHandler';
import { Simulation } from './Simulation';

console.log('Hello Life!');

const displayHendler = new DisplayHandler(<HTMLCanvasElement>document.getElementById('display')!);
const simulation = new Simulation(displayHendler);
const animationController = new AnimationController(simulation);

setUpActions(animationController, simulation);

simulation.randomize();
