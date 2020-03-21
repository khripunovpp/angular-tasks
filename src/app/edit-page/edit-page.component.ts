import {Component} from '@angular/core';
import {EnumRates, ITask, TasksService} from '../shared/tasks.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {

  rates = Object.keys(EnumRates);
  submitted = false;

  editableTask: ITask;

  tasksForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    rate: new FormControl(''),
    deadlineDate: new FormControl(''),
  });

  get name() {
    return this.tasksForm.get('name');
  }

  get description() {
    return this.tasksForm.get('description');
  }

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute) {
      this.editableTask = this.tasksService.getTaskInfo(this.route.snapshot.paramMap.get('id'));
      this.fillForm();
  }

  fillForm() {
    this.tasksForm.patchValue({
      name: this.editableTask.name,
      description: this.editableTask.description,
      rate: this.editableTask.rate,
      deadlineDate: this.editableTask.deadlineDate
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.tasksForm.invalid) {
      return;
    }
    this.onUpdate(this.tasksForm.value);
  }

  onUpdate(data: ITask) {
    const deadlineTimestamp = new Date(data.deadlineDate);
    const task: ITask = {
      id: this.editableTask.id,
      name: data.name,
      description: data.description,
      createdDate: this.editableTask.createdDate,
      rate: data.rate,
      completed: this.editableTask.completed,
      deadlineDate: deadlineTimestamp.getTime()
    };

    this.tasksService.updateTask(this.editableTask.id, task);
    window.location.href = '';
  }


}
