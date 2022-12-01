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
