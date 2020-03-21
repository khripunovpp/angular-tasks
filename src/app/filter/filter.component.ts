import {Component} from '@angular/core';
import {EnumRates, TasksService} from '../shared/tasks.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  filter: string;
  rates = Array.prototype.concat(['all'], Object.keys(EnumRates));

  constructor(private tasksService: TasksService) {
  }

  onFilter(filter: EnumRates) {
    this.tasksService.onFilter(filter);
  }
}
