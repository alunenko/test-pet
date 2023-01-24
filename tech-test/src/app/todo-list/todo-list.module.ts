import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import {TodoListService} from './todo-list/todo-list.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TodoListComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TodoListComponent
  ],
  providers: [
    TodoListService
  ]
})
export class TodoListModule { }
