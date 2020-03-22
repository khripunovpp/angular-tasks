import {Component} from '@angular/core';
import {icons} from '../shared/icons';
import {EnumTasksRates, TasksService, TId} from '../shared/tasks.service';
import {Filter, TFilters} from '../filter/filter.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent {

  iconEdit = icons.iconEdit;
  iconRemove = icons.iconRemove;

  dateNow = Date.now();

  selectedTasks: TId[] = [];

  filters = Array.prototype.concat(['all'], Object.keys(EnumTasksRates));

  constructor(public tasksService: TasksService) {
  }

  onChange(id: TId) {
    this.tasksService.toggle(id);
  }

  onRemove(id: TId) {
    this.tasksService.remove(id);
  }

  onEdit(id: TId) {
    window.location.href = `/edit/${id}`;
  }

  onFilter(filter: Filter<TFilters>) {
    this.tasksService.onFilter(filter);
  }

  onSelect(id: TId) {
    const has = Boolean(this.selectedTasks.filter(el => el === id).length);
    if (has) {
      this.selectedTasks = this.selectedTasks.filter(el => el !== id);
    } else {
      this.selectedTasks.push(id);
    }
  }

  multiRemove() {
    this.tasksService.onMultiSelect(this.selectedTasks);
    this.selectedTasks = [];
  }
}
