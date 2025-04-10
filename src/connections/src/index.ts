import { setupDisplay, AnimationController } from './displayUtils';
import { Connections } from './Connections';
import { setupActions } from './actions';

const display = setupDisplay();
const ac = new AnimationController();
const connections = new Connections(display);

ac.setDrawing(connections);
ac.start();

setupActions(connections, ac);
