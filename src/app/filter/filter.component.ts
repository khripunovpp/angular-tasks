import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnumTasksRates} from '../shared/tasks.service';

export class Filter<T> {
  public name: T;

  constructor(name: T) {
    this.name = name;
  }
}

export type TFilters = 'all' | EnumTasksRates;

export type TFilter = Filter<TFilters>;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() filtersArr: TFilters[];
  @Input() currentFilter: TFilter;
  @Output() filterEmitter: EventEmitter<TFilter> = new EventEmitter<TFilter>();

  public filters: TFilter[];
  public current: TFilter;

  constructor() {
  }

  ngOnInit() {
    this.filters = this.filtersArr.map(filter => new Filter<TFilters>(filter));
    this.current = this.currentFilter;
  }

  onFilter(name: TFilters) {
    const payload = new Filter<TFilters>(name);
    this.current = payload;
    this.filterEmitter.emit(payload);
  }
}
