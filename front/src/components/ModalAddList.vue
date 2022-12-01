<script setup>
import { ref } from 'vue'

import { createList } from '../services/list'

const emits = defineEmits(['close'])

const listName = ref('')

const closeModal = () => {
  emits('close')
}

const addList = () => {
  console.log(listName.value)
  createList({
    title: listName.value
  })
  emits('close')
  window.location.reload()
}
</script>

<template>
    <div class="modal-add-list">
        <div class="modal-add-list__container">
            <div class="modal-add-list__header">
                <h2>Ajouter une liste</h2>
                <q-icon name="close" @click="closeModal" :class="'modal-add-list__close'"/>
            </div>
            <div class="modal-add-list__body">
                <div class="modal-add-list__body__input">
                    <q-input v-model="listName" label="Nom de la liste" />
                </div>
                <div class="modal-add-list__body__button">
                    <q-btn label="Ajouter" @click="addList" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-add-list {
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
        .modal-add-list__container {
            width: 90%;
            max-width: 500px;
            background-color: #fff;
            border-radius: 10px;
            padding: 25px;
            .modal-add-list__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                }
            }
            .modal-add-list__close {
                font-size: 1.5rem;
                cursor: pointer;
            }
            .modal-add-list__body {
                margin-top: 25px;
                .modal-add-list__body__input {
                    margin-bottom: 25px;
                }
                .modal-add-list__body__button {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }
            }
        }
    }
</style>
