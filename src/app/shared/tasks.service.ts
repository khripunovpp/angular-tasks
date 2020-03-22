import {Injectable} from '@angular/core';
import {Filter, TFilter, TFilters} from '../filter/filter.component';
import {v4 as uuidv4} from 'uuid';

export class Task {
  public id: TId;
  public name: string;
  public description: string;
  public rate: EnumTasksRates;
  public completed: boolean;
  public createdDate: number;
  public deadlineDate?: number | null;
  public completedDate?: number | null;

  constructor(data: Task) {
    this.id = uuidv4();
    this.name = data.name;
    this.description = data.description;
    this.rate = data.rate;
    this.completed = false;
    this.createdDate = Date.now();
    this.deadlineDate = data.deadlineDate || null;
    this.completedDate = null;
  }

}

export type TId = string;

export enum EnumTasksRates {
  normal = 'normal',
  high = 'high',
  highest = 'highest'
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  rates = EnumTasksRates;
  filter: TFilter = new Filter<TFilters>('all');

  public tasks: Task[] = [];

  add(task: Task) {
    this.tasks.push(task);
    this.updateDb();
  }

  toggle(id: TId) {
    const idx = this.tasks.findIndex(task => task.id === id);
    const currentTask = this.tasks[idx];
    currentTask.completed = !this.tasks[idx].completed;
    currentTask.completedDate = Date.now();
    this.updateDb();
  }

  remove(id: TId) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.updateDb();
  }

  fetchData() {
    const tasks = localStorage.getItem('tasks') || '[]';
    this.tasks = JSON.parse(tasks);
  }

  updateDb() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  onFilter(filter: TFilter) {
    this.filter = filter;
  }

  onMultiSelect(tasks: TId[]) {
    this.tasks = this.tasks.filter(task => !tasks.includes(task.id));
    this.updateDb();
  }

  getTaskInfo(id: TId) {
    return this.tasks.filter(task => task.id === id)[0];
  }

  updateTask(id: TId, data: Task) {
    const idx = this.tasks.findIndex(task => task.id === id);
    this.tasks[idx] = new Task({
      ...data
    });
    this.updateDb();
  }
}
