<template>
  <div class="todoapp">

    <header class="header">
      <input
        class="new-todo"
      >
    </header>

    <section v-show="todos.length" class="main">
      <todo />
    </section>

    <footer>
      footer
    </footer>
  
  </div>
</template>

<script>
import Todo from './Todo'

export default {
  data() {
    return {
      visibility: 'all',
      todos: []
    }
  },
  components: {
    Todo
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>