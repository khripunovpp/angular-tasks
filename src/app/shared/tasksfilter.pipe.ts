import {Pipe, PipeTransform} from '@angular/core';
import {ITask} from './tasks.service';
import {TFilters} from '../filter/filter.component';

@Pipe({
  name: 'tasksratefilter'
})
export class TasksfilterPipe implements PipeTransform {

  transform(tasks: ITask[], filter: TFilters): ITask[] {
    if (filter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.rate === filter);
  }
}
