import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {v4 as uuidv4} from 'uuid';

import {EnumTasksRates, Task, TasksService} from '../shared/tasks.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent {

  rates = Object.keys(EnumTasksRates);
  submitted = false;

  tasksForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    rate: new FormControl(EnumTasksRates.normal),
    deadlineDate: new FormControl(''),
  });

  get name() {
    return this.tasksForm.get('name');
  }

  get description() {
    return this.tasksForm.get('description');
  }

  constructor(
    private tasksService: TasksService) {
  }

  onSubmit() {
    this.submitted = true;
    if (this.tasksForm.invalid) {
      return;
    }
    this.onAdd(this.tasksForm.value);
  }

  onAdd(data: Task) {
    const deadlineTimestamp = new Date(data.deadlineDate);
    const task = new Task({
      id: uuidv4(),
      name: data.name,
      description: data.description,
      createdDate: Date.now(),
      rate: data.rate,
      completed: false,
      deadlineDate: deadlineTimestamp.getTime()
    });

    this.tasksService.add(task);
    window.location.href = '';
  }

}
