import {Pipe, PipeTransform} from '@angular/core';
import {Task} from './tasks.service';
import {TFilters} from '../filter/filter.component';

@Pipe({
  name: 'tasksratefilter'
})
export class TasksfilterPipe implements PipeTransform {

  transform(tasks: Task[], filter: TFilters): Task[] {
    if (filter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.rate === filter);
  }
}
