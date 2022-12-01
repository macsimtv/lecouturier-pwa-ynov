<script setup>
import { ref, watch } from 'vue'

import { updateTodo } from '../services/todo'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const checked = ref(props.todo.completed)

const toggle = () => {
  checked.value = !checked.value
}

watch(checked, (val) => {
  const todo = props.todo
  todo.completed = val
  updateTodo(todo)
})
</script>

<template>
    <div class="todo" :class="{ 'checked': checked }">
        <div class="todo__container">
            <div class="todo__check">
                <input v-model="checked" type="checkbox" />
            </div>
            <div class="todo__content">
                <label @click="toggle">{{ todo.title }}</label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .todo {
        width: 100%;
        .todo__container {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px 0;
        }
        .todo__check {
            display: flex;
            align-items: center;
            input[type="checkbox"] {
                width: 20px;
                height: 20px;
                border: 1px solid rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                outline: none;
                cursor: pointer;
                &:checked {
                    background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
                    border: none;
                }
            }
        }
        .todo__content {
            flex: 1;
            label {
                font-size: 1rem;
                font-weight: 400;
                cursor: pointer;
            }
        }
        &.checked {
            .todo__content {
                label {
                    text-decoration: line-through;
                    color: #BDBDBD;
                }
            }
        }
    }
</style>
