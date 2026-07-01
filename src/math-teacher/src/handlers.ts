import { Sheet } from "./sheet";

export const setupHandlers = (sheet: Sheet): void => {
  const form = <HTMLFormElement>document.getElementById('options');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    sheet.regenerateSheet(data);
  });
};
