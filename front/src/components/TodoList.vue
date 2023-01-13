<script setup>
import { ref } from 'vue'

import { getTodos } from '../services/todo'
import { deleteList, updateList } from '../services/list'

import TodoItem from '../components/TodoItem.vue'

const props = defineProps({
  list: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Loading...'
    })
  },
  showButtons: {
    type: Boolean,
    default: true
  }
})

const listCopy = ref(props.list)
const todos = ref([])
const isModalOpen = ref(false)
const newTodoName = ref('');

(async () => {
  const resTodos = await getTodos(props.list._id)
  todos.value = resTodos
})()

const closeModal = () => {
  isModalOpen.value = false
}

const openModal = () => {
  newTodoName.value = props.list.title
  isModalOpen.value = true
}

const onDelete = async () => {
  const deletedList = await deleteList(props.list._id)
  if (deletedList) {
    window.location.reload()
  }
}

const onEdit = async () => {
  const updatedList = await updateList(props.list._id, {
    title: newTodoName.value
  })
  if (updatedList) {
    listCopy.value.title = newTodoName.value
    closeModal()
  }
}

</script>

<template>
    <div class="list">
        <div class="list__container">
            <div class="list__header">
                <h3 :title="list._id">{{ listCopy.title }}</h3>
                <div class="list__icons">
                    <q-icon @click="openModal" class="list__icon" name="edit" />
                    <q-icon @click="onDelete" class="list__icon" name="delete" />
                </div>
            </div>
            <div v-if="todos.length" class="list__body">
                <TodoItem v-for="todo of todos.slice(0, 3)" :key="todo._id" :todo="todo" :showButtons="props.showButtons" />
            </div>
            <p class="list__empty" v-else>
                Cette liste ne contient aucune tâche.<br>
                Ajoutez-en une depuis la liste.
            </p>
            <div class="list__footer">
                <div class="list__footer-container">
                    <router-link :to="`/list/${list._id}`">
                        Voir la liste complète ({{ todos.length }})
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="isModalOpen" class="modal-list-edit">
            <div class="modal-list-edit__container">
                <div class="modal-list-edit__header">
                    <div class="modal-list-edit__icon-container">
                        <q-icon @click="closeModal" class="modal-list-edit__icon" name="close" />
                    </div>
                    <h1 class="modal-list-edit__title">
                        Edit todo
                    </h1>
                </div>
                <div class="modal-list-edit__body">
                    <div class="modal-list-edit__input-container">
                        <q-input class="modal-list-edit__input" placeholder="Todo name" v-model="newTodoName" />
                    </div>
                </div>
                <div class="modal-list-edit__footer">
                    <q-btn @click="onEdit" class="modal-list-edit__btn" label="Add" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .list {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);
        overflow: hidden;
        .list__container {
            .list__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 25px;
                background-color: #F2F2F2;
                h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                }
            }
            .list__body {
                padding: 15px 25px;
            }
            .list__empty {
                padding: 15px 25px;
                color: #BDBDBD;
                text-align: center;
            }
            .list__footer {
                padding-bottom: 0;
                .list__footer-container {
                    width: 90%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    padding: 15px 0;
                    border-top: 1px solid #E5E5E5;

                    a {
                        color: #000;
                        text-decoration: none;
                    }
                }
            }
        }
        .list__icons {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .list__icon {
            padding: 5px;
            color: rgb(255, 255, 255);
            background: rgb(133, 133, 133);
            font-size: 24px;
            border-radius: 4px;
        }
    }

    .modal-list-edit {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        .modal-list-edit__container {
            width: 90%;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);
            overflow: hidden;
            .modal-list-edit__header {
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
                padding: 15px 25px;
                background-color: #F2F2F2;
                .modal-list-edit__icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                    background: #BDBDBD;
                    cursor: pointer;
                    .modal-list-edit__icon {
                        color: #fff;
                        font-size: 24px;
                    }
                }
                .modal-list-edit__title {
                    font-size: 1.25rem;
                    font-weight: 700;
                }
            }
            .modal-list-edit__body {
                padding: 15px 25px;
                .modal-list-edit__input-container {
                    .modal-list-edit__input {
                        width: 100%;
                    }
                }
            }
            .modal-list-edit__footer {
                padding: 15px 25px;
                .modal-list-edit__btn {
                    width: 100%;
                    margin: 0 auto;
                    padding: 10px 0;
                    border-radius: 10px;
                    background: #BDBDBD;
                    color: #fff;
                    font-weight: 700;
                    font-size: 1.25rem;
                }
            }
        }
    }
</style>
