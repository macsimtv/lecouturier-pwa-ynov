import { api } from 'boot/axios'

export function updateTodo (todo) {
  return api.put(`/todo/${todo._id}`, todo)
}

export const getTodos = async (listId) => {
  const res = await api.get(`/todo/${listId}`)

  if (res.status === 200) {
    return res.data
  }

  return []
}

export const createTodo = async (todo) => {
  const res = await api.post('/todo', todo)

  if (res.status === 201) {
    return res.data
  }

  return null
}

export const deleteTodo = async (todoId) => {
  const res = await api.delete(`/todo/${todoId}`)
  console.log(res)

  if (res.status === 204) {
    return true
  }

  return null
}
