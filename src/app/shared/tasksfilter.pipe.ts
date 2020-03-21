import {Pipe, PipeTransform} from '@angular/core';
import {ITask, TRateFilter} from './tasks.service';

@Pipe({
  name: 'tasksfilter'
})
export class TasksfilterPipe implements PipeTransform {

  transform(tasks: ITask[], filter: TRateFilter): ITask[] {
    if (filter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.rate === filter);
  }
}
