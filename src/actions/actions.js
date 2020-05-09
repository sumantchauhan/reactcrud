import { FETCH_POSTS, NEW_POST, FETCH_TODOS, NEW_TODO, FETCH_USERS, NEW_USER } from "./types";

export const fetchPosts = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts").then(res => {
    res.json().then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
  });
};

export const createTodo = (todoData) => dispatch => {
    let todos = JSON.parse(localStorage.getItem('todos'));
        if(todos && todos.length>0){
          let todo = {
              id:todos.length+1,
              action:todoData.action,
              date:todoData.date
            }
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            dispatch({
                type:NEW_TODO,
                payload:todos
            })
        }else{
          let todo = [{
              id:1,
              action:todoData.action,
              date:todoData.date
            }]
          localStorage.setItem('todos', JSON.stringify(todo));
          dispatch({
            type:NEW_TODO,
            payload:todo
        })
        }

}

export const createUsers = (userData) => dispatch => {
    let users = JSON.parse(localStorage.getItem('users'));
        if(users && users.length>0){
          let user = {
              id:users.length+1,
              name:userData.name,
              email:userData.email
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            dispatch({
                type:NEW_USER,
                payload:users
            })
        }else{
          let user = [{
              id:1,
              name:userData.name,
              email:userData.email
            }]
          localStorage.setItem('users', JSON.stringify(user));
          dispatch({
            type:NEW_USER,
            payload:user
        })
        }
}

export const fetchUsers  = () => dispatch => {
    let users = JSON.parse(localStorage.getItem('users'));
    if(users && users.length>0){
        dispatch({
            type: FETCH_USERS,
            payload: users
          })
    }else{
        dispatch({
            type: FETCH_USERS,
            payload: []
          })
    }
}

export const fetchTodos = () => dispatch => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    if(todos && todos.length>0){
        dispatch({
            type: FETCH_TODOS,
            payload: todos
          })
    }else{
        dispatch({
            type: FETCH_TODOS,
            payload: []
          })
    }
}



export const createPost = postData => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};