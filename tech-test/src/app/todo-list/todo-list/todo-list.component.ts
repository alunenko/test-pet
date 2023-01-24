import { Component, OnInit } from '@angular/core';
import {TodoListService} from './todo-list.service';
import {ITodoItem} from './todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoItems: ITodoItem[];
  beforeSearchTodoItems: ITodoItem[];
  todoItemPrev: string;
  editMode: number = 0;
  editedElement: any;
  editedItem?: ITodoItem;
  searchValue: string;

  constructor(
    private todoListService: TodoListService
  ) { }

  ngOnInit(): void {
    this.todoItems = this.todoListService.getItems();
    this.beforeSearchTodoItems = this.todoItems;
    this.todoListService.someEvent.subscribe((itemResults: ITodoItem[]) => this.todoItems = itemResults);
  }

  findItem(itemToFind: ITodoItem): number {
    return this.todoItems.findIndex((item) => item.id === itemToFind.id);
  }

  removeItem(removeItem: ITodoItem): void {
    const removeItemIndex = this.findItem(removeItem);
    this.todoItems.splice(removeItemIndex, 1);
  }

  editItem(event: any, item: ITodoItem): void {
    if (this.editedItem && this.editMode !== -1) {
      this.cancelEdit(this.editedItem);
    }
    this.editedElement = event.target.parentNode;
    this.editedElement.classList.add('edit');
    this.editMode = item.id;
    this.todoItemPrev = item.value;
    this.editedItem = item;
  }

  addItem(): void {
    this.todoItems.push({
      id: +new Date() + 1,
      value: `task#new`,
      isDone: false
    });
  }

  saveItem(): void {
    this.editedElement.classList.remove('edit');
    this.editMode = -1;
    this.filterList();
  }

  cancelEdit(item: ITodoItem): void {
    this.editedElement.classList.remove('edit');
    const a = this.findItem(item);
    this.todoItems[a].value = this.todoItemPrev;
    this.editMode = -1;
  }

  toggleDone(event: any, item: ITodoItem): void {
    event.target.parentNode.classList.toggle('done');
    item.isDone = !item.isDone;
  }

  filterList(): void {
    console.log('this.searchValue ', typeof this.searchValue);
    console.log('this.searchValue ', JSON.stringify(this.searchValue));
    this.todoListService.someEvent.next(this.todoListService.filterItems(this.searchValue, this.todoItems));
  }

  cancelSearch(): void {
    this.searchValue = '';
    this.todoItems = this.beforeSearchTodoItems;
    this.filterList();
  }
}
