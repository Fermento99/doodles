import { Connections } from './Connections';
import { AnimationController } from './displayUtils';

const setupActions = (
  connections: Connections,
  animationController: AnimationController
) => {
  document.getElementById('reset')?.addEventListener('click', () => {
    connections.setup();
    connections.drawFrame(0);
    connections.pause();
  });
  document
    .getElementById('play')
    ?.addEventListener('click', () => animationController.start());
  document
    .getElementById('pause')
    ?.addEventListener('click', () => animationController.stop());
  document
    .getElementById('options')
    ?.addEventListener('click', () =>
      document.getElementById('settings-modal')?.classList.remove('hidden')
    );

  document
    .getElementById('close')
    ?.addEventListener('click', () =>
      document.getElementById('settings-modal')?.classList.add('hidden')
    );
  document.getElementById('save')?.addEventListener('click', () => {
    const pointCount = parseInt(
      (document.getElementById('point-count') as HTMLInputElement).value
    );
    const radius = parseInt(
      (document.getElementById('radius') as HTMLInputElement).value
    );
    const minSpeed = parseInt(
      (document.getElementById('min-speed') as HTMLInputElement).value
    );
    const maxSpeed = parseInt(
      (document.getElementById('max-speed') as HTMLInputElement).value
    );

    connections.setOptions({ pointCount, radius, minSpeed, maxSpeed });
    connections.setup();
  });
};

export { setupActions };
