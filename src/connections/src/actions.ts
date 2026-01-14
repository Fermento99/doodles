import { ConnectionOptions, Connections } from './Connections';
import { DEFAULT_VALUES } from './defaultValues';
import { AnimationController } from './displayUtils';

const setupActions = (connections: Connections, animationController: AnimationController): void => {
  const inputs: Record<keyof ConnectionOptions, HTMLInputElement> = {
    pointCount: <HTMLInputElement>document.getElementById('point-count'),
    radius: <HTMLInputElement>document.getElementById('radius'),
    minSpeed: <HTMLInputElement>document.getElementById('min-speed'),
    maxSpeed: <HTMLInputElement>document.getElementById('max-speed'),
    pointColor: <HTMLInputElement>document.getElementById('point-color'),
    segmentColor: <HTMLInputElement>document.getElementById('segment-color'),
    backgroundColor: <HTMLInputElement>document.getElementById('background-color'),
  };

  Object.entries(inputs).forEach(([key, input]) => {
    input.value = DEFAULT_VALUES[<keyof ConnectionOptions>key].toString();
  })

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
    const pointCount = parseInt(inputs.pointCount.value);
    const radius = parseInt(inputs.radius.value);
    const minSpeed = parseInt(inputs.minSpeed.value);
    const maxSpeed = parseInt(inputs.maxSpeed.value);
    const pointColor = inputs.pointColor.value;
    const segmentColor = inputs.segmentColor.value;
    const backgroundColor = inputs.backgroundColor.value;

    connections.setOptions({
      pointCount,
      radius,
      minSpeed,
      maxSpeed,
      pointColor,
      segmentColor,
      backgroundColor,
    });
    connections.setup();
  });
};

export { setupActions };
