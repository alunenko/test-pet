import {Injectable} from '@angular/core';
import {ITodoItem} from './todo-list';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class TodoListService {
  someEvent = new BehaviorSubject(0);
  constructor() {
  }

  getItems(): ITodoItem[] {
    return [
      { id: +new Date() + 1, value: 'task#1', isDone: false },
      { id: +new Date() + 2, value: 'task#2', isDone: false },
      { id: +new Date() + 3, value: 'task#3', isDone: false },
      { id: +new Date() + 4, value: 'task#4', isDone: false },
      { id: +new Date() + 5, value: 'task#5', isDone: false },
      { id: +new Date() + 6, value: 'task#6', isDone: false },
      { id: +new Date() + 7, value: 'task#7', isDone: false },
    ];
  }
}
