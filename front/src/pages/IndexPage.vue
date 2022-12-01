<script setup>
import { ref } from 'vue'

import NavigationBar from '../components/NavigationBar.vue'
import TodoList from '../components/TodoList.vue'
import ModalAddList from '../components/ModalAddList.vue'

import { getAllLists } from '../services/list'

const lists = ref([])
const isModalOpen = ref(false);

(async () => {
  const resLists = await getAllLists()
  lists.value = resLists
})()

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

</script>

<template>
  <div class="screen">
    <div class="container frame">
      <div class="header">
        <div class="header__title">
          <h1>Dashboard</h1>
        </div>
        <div class="header__profile">
          <q-icon name="person" />
        </div>
      </div>
      <div class="subheader">
        <h2>
          Bonjour,
          <br>
          John Doe ! 👋
        </h2>
      </div>
      <div class="lists">
        <TodoList :list="list" v-for="list of lists" :key="list._id" />
      </div>
    </div>
    <NavigationBar @open:modal:list:add="openModal" />
    <ModalAddList @close="closeModal" v-if="isModalOpen" />
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header__title {
      h1 {
        font-size: 24px;
        font-weight: 400;
      }
    }
    .header__profile {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #D9D9D9;
      color: #828282;
      font-size: 30px;
    }
  }
  .subheader {
    margin-top: 50px;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.2;
    }
  }
  .lists {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 35px;
  }
  .frame {
    padding-bottom: 100px;
  }
</style>
