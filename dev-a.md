### 1. Modular angular code
My advice here is to touch entire project infrastructure to [Angular workspace](https://angular.io/guide/workspace-config). But, for now I'll put this note as suggestion.
The workspace is a collection of Angular projects (that is, applications and libraries) powered by the Angular CLI that are typically co-located in a single source-control repository
`ng new todo-list`

### 2. API
1. Create interceptor
2. Create request.service with generic observable request method which is return this.httpClient.(get)(post)...
3. Then create whatever.service with real request. Like, getUserProfile(): Observable<...> { return this.requestService.request<InterfaceHere>(conf);
4. In a component.subscribe..
5. Done )

### 3. What is implemented:
1. TodoList.module
2. Inside a todo-list.component (as main module component)
3. Module Design -> Angular Material
4. There is a hard coded data instead API
5. Implemented this actions: edit, remove and filtering
6. Edit: while you do edit one item, you can hit edit for another item. The previous edition would be closed. But as a feature, actually, there can be other direction. As for test project for interview - looks ok ))
7. Cancel: discard changes in input. The previous value would be restored 
8. Save: save new value 
9. Filters: search and hide_done_items are criss crossed. When you change one field, another filter reacting on changes. 
10. Search: filter list by value 
11. Hide done: filter list by isDone field
12. There is no limit to perfection ^^
