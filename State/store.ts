import { observable } from "@legendapp/state";

// Types
interface Task {
  id?: number;
  name: string;
  duration?: number;
  // startTime: Date;
  // endTime: Date;
  startTime: String;
  endTime: String;
}

interface Store {
  tasks: Task[];
  dateToday: String;
  dayToday: String;
  // addTask: (name: string, startTime: Date, endTime: Date) => void;
  addTask: ({ name, startTime, endTime }: Task) => void;
}

// Create a global observable
let nextId = 0;
const today = new Date();

const month = today.toLocaleString("default", { month: "long" });
const day = today.toLocaleString("default", { weekday: "long" });
const date = today.getDate();

export const store$ = observable<Store>({
  tasks: [],
  dateToday: `${date} ${month}`,
  dayToday: day,
  // addTask: (name: string, startTime: Date, endTime: Date) => {
  addTask: ({ name, startTime, endTime }) => {
    // const duration = endTime.getTime() - startTime.getTime();
    console.log({ name, startTime, endTime });
    const duration = 9;
    const task: Task = {
      id: nextId++,
      name,
      startTime,
      endTime,
      duration,
    };
    store$.tasks.push(task);
    console.log("Updated tasks array:", store$.tasks.get());
  },
  // edit, plAY, PAUSE, STOP, DELETE
});
