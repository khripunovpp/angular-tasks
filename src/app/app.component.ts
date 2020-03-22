import {Component, OnInit} from '@angular/core';
import {TasksService} from './shared/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-tasks';

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.fetchData();
  }
}
