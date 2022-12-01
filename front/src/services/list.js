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
