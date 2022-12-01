import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itodo } from 'src/app/interfaces/itodo';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem: Itodo = {
    id_author: 0,
    status: 0,
    description: '',
    finish_at: ''
  }

  @Output() optionSucess = new EventEmitter<boolean>()

  constructor(private readonly todoListService: TodolistService) {

  }

  ngOnInit(): void {
  }

  deleteTodo() {
    console.log(this.todoItem.id)
    if (this.todoItem.id) {
      this.todoListService.deleteTodo(this.todoItem.id).subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          this.optionSucess.emit(true)
        } else {
          this.optionSucess.emit(false)

        }
      }, error => {
        console.log(error.message)
        this.optionSucess.emit(false)
      })
    }

  }

  changeStatusTodo() {
    const todoAux: Itodo = {
      id_author: this.todoItem.id_author,
      status: this.todoItem.status ? 1 : 0,
      description: this.todoItem.description,
      finish_at: new Date().toISOString(),
      id: this.todoItem.id
    }
    this.todoListService.updateTodo(todoAux).subscribe((res: any) => {
      console.log(res)
      if(res.success){
        this.optionSucess.emit(true)
      }else {
        this.optionSucess.emit(false)
      }
    }, error => {
      console.log(error.message)
      this.optionSucess.emit(false)
    })
  }

}
