
const generateTable = (rounds, exercises) => {
  const table = document.getElementById('exercise-table');
  table.childNodes = [];
  for (let r = 0; r < rounds; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let e = 0; e < exercises; e++) {
      const ex = document.createElement('div');
      ex.className = 'exercise todo';
      ex.innerText = e + 1;
      row.appendChild(ex);
    }
    table.appendChild(row);
  }
};

const done = (round, exercise) => {
  document.getElementById('exercise-table').childNodes[round].childNodes[exercise].className = 'exercise done';
};