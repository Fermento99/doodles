import { setupDisplay, AnimationController } from './displayUtils';
import { Connections } from './Connections';
import { setupActions } from './actions';

const display = setupDisplay();

const connections = new Connections(display);
const ac = new AnimationController();

ac.setDrawing(connections);
ac.start();

setupActions(connections, ac);
