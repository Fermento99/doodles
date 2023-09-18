
const SCREEN_EPRCENTAGE = .7;

window.onload = () => {
  canv.width = screen.width * SCREEN_EPRCENTAGE;
  canv.height = screen.height * SCREEN_EPRCENTAGE;

  const ctx = canv.getContext('2d');

  const colorInput = document.getElementById('color-selector');
  const percentageInput = document.getElementById('percentage-selector');
  const autoBtn = document.getElementById('auto-btn');

  let interval = undefined;
  let iterator = 1;

  autoBtn.onclick = () => {
    autoBtn.classList.toggle('active');
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    } else {
      interval = setInterval(() => {
        const newPercentage = parseInt(percentageInput.value) + iterator;
        percentageInput.value = newPercentage;
        if (newPercentage >= 100 || newPercentage <= -100) iterator *= -1;
        run({ ctx, color: colorInput.value, percentage: newPercentage });
      }, 20);
    }
  }

  colorInput.onchange = () => run({ ctx, color: colorInput.value, percentage: percentageInput.value });
  percentageInput.onchange = () => run({ ctx, color: colorInput.value, percentage: percentageInput.value });

  run({ ctx, color: colorInput.value, percentage: percentageInput.value });
}

const run = ({ ctx, color, percentage}) => {
  ctx.clearRect(0, 0, canv.width, canv.height);

  entries = brightnessMethods.map(({method, label}, index) => new Entry({label, offset: index, color: method(color, percentage)}));

  entries.forEach(entry => entry.draw(ctx))
} 