<script setup>
import { ref } from 'vue'

import { getTodos } from '../services/todo'

import TodoItem from '../components/TodoItem.vue'

const props = defineProps({
  list: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Loading...'
    })
  }
})

const todos = ref([]);

(async () => {
  const resTodos = await getTodos(props.list._id)
  todos.value = resTodos
})()
</script>

<template>
    <div class="list">
        <div class="list__container">
            <div class="list__header">
                <h3 :title="list._id">{{ list.title }}</h3>
                <q-icon class="list__icon" name="more_horiz" />
            </div>
            <div v-if="todos.length" class="list__body">
                <TodoItem v-for="todo of todos" :key="todo._id" :todo="todo" />
            </div>
            <p class="list__empty" v-else>
                Cette liste ne contient aucune tâche.<br>
                Ajoutez-en une depuis la liste.
            </p>
            <div class="list__footer">
                <div class="list__footer-container">
                    <router-link :to="`/list/${list._id}`">
                        Voir la liste complète
                    </router-link>
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
        .list__icon {
            color: rgba(0, 0, 0, 0.54);
            font-size: 30px;
        }
    }
</style>
