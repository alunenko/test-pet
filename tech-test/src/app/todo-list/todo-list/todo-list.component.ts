import { Component, OnInit } from '@angular/core';
import {TodoListService} from './todo-list.service';
import {ITodoItem} from './todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  constructor(
    private todoListService: TodoListService
  ) { }

  beforeSearchTodoItems: ITodoItem[];
  todoItems: ITodoItem[];
  valueBeforeEdit: string;
  editMode = -1; // As array index. 0, 1, 2, etc: ON; -1: OFF
  editedItem?: ITodoItem;
  searchValue: string;
  searchValuePrev: string;
  isDone = false;

  ngOnInit(): void {
    this.todoListService.todoItems$.subscribe((todoItems: ITodoItem[]) => {
      this.todoItems = todoItems;
      console.log('this.todoItems ', this.todoItems);
    });

    this.searchValuePrev = this.searchValue;
  }

  toggleListDone(): void { // TODO: done!
    if(this.isDone && this.searchValue === '') {
      this.beforeSearchTodoItems = this.todoListService.todoItems$.value
    }

    this.todoListService.toggleListDone({isDone: this.isDone, prevList: this.beforeSearchTodoItems});
  }

  search(): void { // TODO: done!
    // case: from '' to 1
    if (
      (this.searchValuePrev === '' || this.searchValuePrev === undefined) &&
      (this.searchValue !== '' || this.searchValue !== undefined)
    ) {
      this.beforeSearchTodoItems = this.todoListService.todoItems$.value;
      this.todoListService.search({search: this.searchValue, prevList: this.beforeSearchTodoItems});
      this.searchValuePrev = this.searchValue;
    }

    // case: from 1 to 12; from 12 to 123; from 123 to 12; from ayn to '';
    if(
      (this.searchValuePrev !== '' || this.searchValuePrev !== undefined) &&
      (this.searchValue !== '' || this.searchValue !== undefined)
    ) {
      this.todoListService.search({search: this.searchValue, prevList: this.beforeSearchTodoItems});
      this.searchValuePrev = this.searchValue;
    }

    // case: from ayn to '';
    if(
      (this.searchValuePrev !== '' || this.searchValuePrev !== undefined) &&
      (this.searchValue === '' || this.searchValue === undefined)
    ) {
      this.todoListService.todoItems$.next(this.beforeSearchTodoItems);
      this.searchValuePrev = this.searchValue;
    }
  }

  cancelSearch(): void { // TODO: done!
    this.searchValue = '';
    this.todoListService.todoItems$.next(this.beforeSearchTodoItems);
  }

  toggleItemDone(item: ITodoItem): void { // TODO: done!
    const itemIndex = this.todoListService.findItem(item);
    this.todoListService.todoItems$.value[itemIndex].isDone = !this.todoListService.todoItems$.value[itemIndex].isDone;
  }

  editItem(item: ITodoItem): void { // TODO: done!
    // Close previous edit if it was active
    if (this.editedItem && this.editMode !== -1) {
      this.cancelEdit(this.editedItem);
    }

    // Current edit state
    this.editMode = item.id;
    this.valueBeforeEdit = item.value;
    this.editedItem = item;
  }

  cancelEdit(item: ITodoItem): void { // TODO: done!
    const itemIndex = this.todoListService.findItem(item);
    this.todoListService.todoItems$.value[itemIndex].value = this.valueBeforeEdit;

    this.editMode = -1;
  }

  saveItem(): void { // TODO: done!
    this.editMode = -1;
  }

  removeItem(item: ITodoItem): void {
    this.todoListService.removeItem(item);
  }

  // addItem(): void {
  //   this.todoItems.push({
  //     id: +new Date() + 1,
  //     value: `task#new`,
  //     isDone: false
  //   });
  // }
}
