import {Injectable} from '@angular/core';

export interface ITask {
  id: TId;
  name: string;
  description: string;
  rate: EnumRates;
  completed: boolean;
  createdDate: number;
  deadlineDate?: number | null;
  completedDate?: number | null;
}

export type TId = string;

export enum EnumRates {
  normal = 'normal',
  high = 'high',
  highest = 'highest'
}

export type TRateFilter = 'all' | EnumRates;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  rates = EnumRates;
  filter: TRateFilter = 'all';

  public tasks: ITask[] = [];

  add(task: ITask) {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  toggle(id: TId) {
    const idx = this.tasks.findIndex(task => task.id === id);
    const currentTask = this.tasks[idx];
    currentTask.completed = !this.tasks[idx].completed;
    currentTask.completedDate = Date.now();
    this.updateLocalStorage();
  }

  remove(id: TId) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateLocalStorage();
  }

  exportFromLocalStorage() {
    const tasks = localStorage.getItem('tasks') || '[]';
    this.tasks = JSON.parse(tasks);
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  onFilter(filter: TRateFilter) {
    this.filter = filter;
  }

  onMultiSelect(tasks: TId[]) {
    this.tasks = this.tasks.filter(task => !tasks.includes(task.id));
    this.updateLocalStorage();
  }

  getTaskInfo(id: TId) {
    return this.tasks.filter(task => task.id === id)[0];
  }

  updateTask(id: TId, updateTask: ITask) {
    const idx = this.tasks.findIndex(task => task.id === id);
    this.tasks[idx] = {
      ...updateTask
    };
    this.updateLocalStorage();
  }
}
