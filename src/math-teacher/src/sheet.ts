import { Exercise } from "./excercise";

export class Sheet {
  exercises: Exercise[] = [];

  regenerateSheet(data: FormData): void {
    console.log(Object.fromEntries(data.entries()))
  };
}