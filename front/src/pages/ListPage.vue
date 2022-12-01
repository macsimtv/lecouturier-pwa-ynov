<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { getList } from '../services/list'
import { getTodos } from '../services/todo'

import TodoItem from '../components/TodoItem.vue'

const route = useRoute()

const listId = ref(route.params.id)
const listName = ref('Loading...')
const listTodos = ref([]);

(async () => {
  const resList = await getList(listId.value)
  listName.value = resList.title
  const resTodos = await getTodos(listId.value)
  listTodos.value = resTodos
})()
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
                <TodoItem class="todo" v-for="todo of listTodos" :key="todo._id" :todo="todo" />
            </div>
            <div class="add-todo">
                <div class="add-todo__container">
                    <q-icon class="add-todo__icon" name="add" />
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

    .frame {
        padding-bottom: 100px;
    }
</style>
