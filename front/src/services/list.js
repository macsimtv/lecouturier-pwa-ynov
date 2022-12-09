import { api } from 'boot/axios'

export const getAllLists = async () => {
  const res = await api.get('/list')

  if (res.status === 200) {
    return res.data
  } else {
    return []
  }
}

export const getList = async (listId) => {
  const res = await api.get(`/list/${listId}`)
  if (res.status === 200) {
    return res.data
  } else {
    return {}
  }
}

export const createList = async (list) => {
  const res = await api.post('/list', {
    title: list.title
  })

  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}

export const deleteList = async (id) => {
  const res = await api.delete(`/list/${id}`)

  if (res.status === 204) {
    return true
  } else {
    return false
  }
}

export const updateList = async (id, list) => {
  const res = await api.put(`/list/${id}`, list)

  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}
