
const colorToTable = (color) => [
  parseInt(color.slice(1,3), 16),
  parseInt(color.slice(3,5), 16),
  parseInt(color.slice(5,7), 16),
];

const tableToColor = table => '#' + table.map(part => parseInt(part).toString(16).padStart(2, '0')).join('');

const ensureRange = (value) => Math.min(255, Math.max(0, value));

const brightnessMethods = [
  {
    label: 'original color',
    method: (color) => color,
  },
  {
    label: 'by missing to target',
    method: (color, percentage) => {
      let tab = colorToTable(color);
      
      if (percentage > 0) {
        tab = tab.map(part => ((255-part) * percentage / 100)+ part);
      } else {
        tab = tab.map(part => (part * percentage / 100) + part);
      }

      return tableToColor(tab.map(ensureRange));
    },
  },
  {
    label: 'by absolute color value',
    method: (color, percentage) => {
        let tab = colorToTable(color);
        const flatAdd = parseFloat(255 * percentage / 100);

        tab = tab.map(part => part + flatAdd);

        return tableToColor(tab.map(ensureRange));
    },
  },
  {
    label: 'by missing to 100%',
    method: (color, percentage) => {
      let tab = colorToTable(color);
      
      tab = tab.map(part => ((255-part) * percentage / 100)+ part);

      return tableToColor(tab.map(ensureRange));
    },
  },
  {
    label: 'by already present',
    method: (color, percentage) => {
      let tab = colorToTable(color);
      
      tab = tab.map(part => (part * percentage / 100) + part);

      return tableToColor(tab.map(ensureRange));
    },
  },
];
