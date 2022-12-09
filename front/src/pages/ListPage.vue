<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { getList } from '../services/list'
import { getTodos, createTodo as apiCreateTodo } from '../services/todo'

import TodoItem from '../components/TodoItem.vue'

const route = useRoute()

const listId = ref(route.params.id)
const listName = ref('Loading...')
const listTodos = ref([])
const isModalOpen = ref(false)
const newTodoName = ref('');

(async () => {
  const resList = await getList(listId.value)
  listName.value = resList.title
  const resTodos = await getTodos(listId.value)
  listTodos.value = resTodos
})()

const notCompletedTodo = computed(() => {
  return listTodos.value.filter(todo => todo.completed === false)
})

const completedTodo = computed(() => {
  return listTodos.value.filter(todo => todo.completed === true)
})

const closeModal = () => {
  isModalOpen.value = false
}

const openModal = () => {
  isModalOpen.value = true
}

const createTodo = async () => {
  const resCreatedTodo = await apiCreateTodo({
    title: newTodoName.value,
    list_id: listId.value
  })

  if (resCreatedTodo) {
    listTodos.value.push(resCreatedTodo)
    newTodoName.value = ''
    closeModal()
  }
}
</script>

<template>
    <div class="screen">
        <div class="container frame">
            <div class="header">
                <div class="header__left">
                    <div class="header__icon-container">
                        <router-link to="/">
                            <q-icon class="header__icon" name="chevron_left" />
                        </router-link>
                    </div>
                    <h1 class="header__title">
                        {{ listName }}
                    </h1>
                </div>
                <div class="header__right">
                    <q-icon :class="'header__icon'" name="more_horiz" />
                </div>
            </div>
            <div class="todos">
                <h2 class="title">
                    🔴 Todos - {{ notCompletedTodo.length }}
                </h2>
                <template v-if="notCompletedTodo.length">
                    <TodoItem class="todo" v-for="todo of notCompletedTodo" :key="todo._id" :todo="todo" />
                </template>
                <p v-else class="todos__info">
                    No todos yet
                </p>
            </div>
            <div class="todos">
                <h2 class="title">
                    🟢 Todos - {{ completedTodo.length }}
                </h2>
                <template v-if="completedTodo.length">
                    <TodoItem class="todo" v-for="todo of completedTodo" :key="todo._id" :todo="todo" />
                </template>
                <p v-else class="todos__info">
                    No completed todos
                </p>
            </div>
            <div class="add-todo">
                <div class="add-todo__container">
                    <q-icon class="add-todo__icon" name="add" @click="openModal" />
                </div>
            </div>
        </div>
        <div v-show="isModalOpen" class="modal-add-todo">
            <div class="modal-add-todo__container">
                <div class="modal-add-todo__header">
                    <div class="modal-add-todo__icon-container">
                        <q-icon @click="closeModal" class="modal-add-todo__icon" name="close" />
                    </div>
                    <h1 class="modal-add-todo__title">
                        Add todo
                    </h1>
                </div>
                <div class="modal-add-todo__body">
                    <div class="modal-add-todo__input-container">
                        <q-input class="modal-add-todo__input" placeholder="Todo name" v-model="newTodoName" />
                    </div>
                </div>
                <div class="modal-add-todo__footer">
                    <q-btn @click="createTodo" class="modal-add-todo__btn" label="Add" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header__left {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
            .header__title {
                font-size: 1.5rem;
                font-weight: 700;
            }
            .header__icon-container {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #F2F2F2;
                border-radius: 4px;
                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666666;
                    font-size: 30px;
                    text-decoration: none;
                }
            }
        }
        .header__right {
            .header__icon {
                color: #757575;
                font-size: 30px;
            }
        }
    }

    .todos {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 30px;
    }

    .todos__info {
        font-size: 1.2rem;
        color: #757575;
        text-align: center;
    }

    .todo {
        flex: 1;
        padding: 15px;
        background-color: #F2F2F2;
        border-radius: 10px;
    }

    .add-todo {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 20px;
        left: 0;
       .add-todo__container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background-color: #F2F2F2;
            border-radius: 50%;
            background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
       }
        .add-todo__icon {
            color: #fff;
            font-size: 30px;
        }
    }

    .title {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .frame {
        padding-bottom: 100px;
    }

    .modal-add-todo {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        .modal-add-todo__container {
            width: 90%;
            max-width: 500px;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            .modal-add-todo__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .modal-add-todo__title {
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .modal-add-todo__icon-container {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #F2F2F2;
                    border-radius: 4px;
                    .modal-add-todo__icon {
                        color: #757575;
                        font-size: 30px;
                    }
                }
            }
            .modal-add-todo__body {
                margin-top: 20px;
                .modal-add-todo__input-container {
                    .modal-add-todo__input {
                        border: 1px solid #F2F2F2;
                        border-radius: 4px;
                        padding: 10px;
                        font-size: 1rem;
                        width: 100%;
                    }
                }
            }
            .modal-add-todo__footer {
                margin-top: 20px;
                .modal-add-todo__btn {
                    width: 100%;
                    background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 700;
                    border-radius: 4px;
                }
            }
        }
    }
</style>
