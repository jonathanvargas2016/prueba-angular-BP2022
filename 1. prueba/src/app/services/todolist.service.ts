import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Itodo } from '../interfaces/itodo';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private readonly http: HttpClient) { }


  getTodoList() {
    return this.http.get('https://bp-todolist.herokuapp.com/?id_author=4')
  }

  createTodo(todo: Itodo) {
    //https://bp-todolist.herokuapp.com/?id_author=1
    let params = new HttpParams();
    params = params.append('id_author', todo.id_author);
    return this.http.post('https://bp-todolist.herokuapp.com', todo, { params: params })


  }

  updateTodo(todo: Itodo) {
    return this.http.put(` https://bp-todolist.herokuapp.com/${todo.id}`, todo)
  }

  deleteTodo(id: number) {
    return this.http.delete(`https://bp-todolist.herokuapp.com/${id}`)
  }
}
