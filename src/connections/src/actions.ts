import { Connections } from './Connections';
import { AnimationController } from './displayUtils';

const setupActions = (connections: Connections, animationController: AnimationController): void => {
  document.getElementById('reset')?.addEventListener('click', () => {
    connections.setup();
    connections.drawFrame(0);
    connections.pause();
  });
  document.getElementById('play')?.addEventListener('click', () => {
    animationController.start();
  });
  document.getElementById('pause')?.addEventListener('click', () => {
    animationController.stop();
  });
  document.getElementById('options')?.addEventListener('click', () => {
    document.getElementById('settings-modal')?.classList.remove('hidden');
  });
  document.getElementById('close')?.addEventListener('click', () => {
    document.getElementById('settings-modal')?.classList.add('hidden');
  });
  document.getElementById('save')?.addEventListener('click', () => {
    const pointCount = parseInt((<HTMLInputElement>document.getElementById('point-count')).value);
    const radius = parseInt((<HTMLInputElement>document.getElementById('radius')).value);
    const minSpeed = parseInt((<HTMLInputElement>document.getElementById('min-speed')).value);
    const maxSpeed = parseInt((<HTMLInputElement>document.getElementById('max-speed')).value);

    connections.setOptions({ pointCount, radius, minSpeed, maxSpeed });
    connections.setup();
  });
};

export { setupActions };
