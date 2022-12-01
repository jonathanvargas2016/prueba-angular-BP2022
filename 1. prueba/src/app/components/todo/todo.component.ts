import { Component, OnInit } from '@angular/core';
import { Itodo } from 'src/app/interfaces/itodo';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  todoItem: Itodo = {
    id_author: 4,
    status: 0,
    description: '',
    finish_at: ''
  };

  todoList: Itodo[] = [];

  tasksCompleted: number = 0;

  constructor(private readonly todoListService: TodolistService) {

    console.log()

  }

  ngOnInit(): void {

    this.getTodoList(true)

  }

  createTodo() {
    this.todoItem.finish_at = new Date().toISOString();
    this.todoListService.createTodo(this.todoItem).subscribe((res: any) => {
      if (res) {
        this.getTodoList(true)
      }
    }, error => {
      console.log(error.message)
    })
  }

  getTodoList(bandera: boolean) {
    if (bandera) {
      this.tasksCompleted = 0;
      this.todoList = []
      this.todoListService.getTodoList().subscribe((res: any) => {
        this.todoList = [...res.data]
        console.log(this.todoList)
        this.todoList.forEach((todo) => {
          if (todo.status || todo.status === 1) {
            this.tasksCompleted++;
          }
        })
      }, error => {
        console.log(error.message);
      })
    }
  }

}
