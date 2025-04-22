import { AnimationController } from './AnimationController';
import { Simulation } from './Simulation';

const calcRealSpeed = (speed: string): number => {
  switch (speed) {
    case '0':
      return 0;
    case '1':
      return 1;
    case '2':
      return 3;
    case '3':
      return 5;
    default:
      return 1;
  }
};

const setUpActions = (animationController: AnimationController, simulation: Simulation): void => {
  document.getElementById('random')?.addEventListener('click', () => {
    simulation.randomize();
  });
  document.getElementById('reset')?.addEventListener('click', () => {
    simulation.clear();
  });

  const speedControls = [
    document.getElementById('pause'),
    document.getElementById('play'),
    document.getElementById('fast-forward'),
    document.getElementById('fast-forward-x3'),
  ];

  const clearActiveSpeedContorl = (): void => {
    speedControls.forEach(btn => {
      btn?.classList.remove('active');
    });
  };

  speedControls.forEach(btn => {
    btn?.addEventListener('click', () => {
      const speed = btn.getAttribute('simulation-speed');
      if (speed) animationController.setSpeed(calcRealSpeed(speed));
      clearActiveSpeedContorl();
      btn.classList.add('active');
    });
  });

  document.getElementById('settings')?.addEventListener('click', () => {
    document.getElementById('settings-modal')?.classList.remove('hidden');
  });
  document.getElementById('close')?.addEventListener('click', () => {
    document.getElementById('settings-modal')?.classList.add('hidden');
  });
  document.getElementById('save')?.addEventListener('click', () => {
    const randomChance = parseFloat(
      (<HTMLInputElement>document.getElementById('random-chance')).value
    );
    const cellWidth = parseInt((<HTMLInputElement>document.getElementById('cell-width')).value);
    const cellHeight = parseInt((<HTMLInputElement>document.getElementById('cell-height')).value);
    const gridWidth = parseInt((<HTMLInputElement>document.getElementById('grid-width')).value);
    const gridHeight = parseInt((<HTMLInputElement>document.getElementById('grid-height')).value);
    const fullWidth = (<HTMLInputElement>document.getElementById('full-width')).checked;
    const fullHeight = (<HTMLInputElement>document.getElementById('full-height')).checked;
    const monochromatic = (<HTMLInputElement>document.getElementById('monochromatic')).checked;

    simulation.setOptions({
      randomChance,
      cellWidth,
      cellHeight,
      gridWidth,
      gridHeight,
      fullWidth,
      fullHeight,
      monochromatic,
    });
  });

  const widthInput = document.getElementById('grid-width');
  const heightInput = document.getElementById('grid-height');

  document.getElementById('full-width')?.addEventListener('change', (event: Event) => {
    if ((<HTMLInputElement>event.target).checked) {
      widthInput?.setAttribute('disabled', 'true');
    } else {
      widthInput?.removeAttribute('disabled');
    }
  });

  document.getElementById('full-height')?.addEventListener('change', (event: Event) => {
    if ((<HTMLInputElement>event.target).checked) {
      heightInput?.setAttribute('disabled', 'true');
    } else {
      heightInput?.removeAttribute('disabled');
    }
  });
};

export { setUpActions };
