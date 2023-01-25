import {Injectable} from '@angular/core';
import {ITodoItem} from './todo-list';
import {Subject} from 'rxjs';

@Injectable()
export class TodoListService {
  someEvent: Subject<ITodoItem[]> = new Subject();

  constructor() {
  }

  getItems(): ITodoItem[] {
    return [
      { id: +new Date() + 1, value: 'task#1', isDone: false },
      { id: +new Date() + 2, value: 'task#2', isDone: true  },
      { id: +new Date() + 3, value: 'task#3', isDone: false },
      { id: +new Date() + 4, value: 'task#4', isDone: false },
      { id: +new Date() + 5, value: 'task#5', isDone: false },
      { id: +new Date() + 6, value: 'task#6', isDone: false },
      { id: +new Date() + 7, value: 'task#7', isDone: false },
    ];
  }

  filterItems(search: string, itemsList: ITodoItem[]): ITodoItem[] {
    let a: ITodoItem[];

    if (search === undefined || search === '') {
      a = itemsList;
    } else {
      a = itemsList.filter((item) => item.value.includes(search));
    }

    console.log('filterItems a ', a);
    return a;
  }

  filterDone(isDone: boolean, itemsList: ITodoItem[]): ITodoItem[] {
    return itemsList.filter((item) => item.isDone !== isDone);
  }
}
