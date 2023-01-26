import {Injectable} from '@angular/core';
import {ITodoItem} from './todo-list';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class TodoListService {
  todoItems$: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  constructor() {
    this.getItems();
  }

  getItems(): void {
    this.todoItems$.next([
      { id: +new Date() + 1, value: 'task#1', isDone: false },
      { id: +new Date() + 2, value: 'task#2', isDone: true  },
      { id: +new Date() + 3, value: 'task#3', isDone: false },
      { id: +new Date() + 4, value: 'task#4', isDone: false },
      { id: +new Date() + 5, value: 'task#5', isDone: false },
      { id: +new Date() + 6, value: 'task#6', isDone: false },
      { id: +new Date() + 7, value: 'task#7', isDone: false },
    ]);
  }

  search(params: {search: string, prevList: ITodoItem[]}): void {
    this.todoItems$.next(
      params.prevList.filter((item: ITodoItem) => item.value.includes(params.search))
    );
  }

  findItem(itemToFind: ITodoItem): number {
    return this.todoItems$.value.findIndex((item: ITodoItem) => item.id === itemToFind.id);
  }

  removeItem(removeItem: ITodoItem): void {
    this.todoItems$.value.splice(
      this.findItem(removeItem),
      1
    );
  }

  toggleListDone(params: {isDone: boolean, prevList: ITodoItem[]}): void {
    this.todoItems$.next(
      params.isDone ? this.todoItems$.value.filter((item: ITodoItem) => item.isDone !== params.isDone) : params.prevList
    );
  }
}
