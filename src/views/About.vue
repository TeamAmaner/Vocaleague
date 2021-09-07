<template>
  <el-container>
    <el-main>

      <div class="todo-list">
        <h1>Vue 3 Todo App</h1>
        <el-form @submit.prevent="addNewTodo">
          <el-input v-model="newTodo" name="newTodo" placeholder="タスクを入力"></el-input>
        <el-button @click="addNewTodo">追加</el-button>
        </el-form>

        <el-button @click="removeAllTodos">全て削除</el-button>
        <el-button @click="markAllDone">全て完了</el-button>

        <ul>
          <li v-for="(todo, index) in todos" :key="todo.id" class="todo">
            <h3 :class="{ done: todo.done }" @click="toggleDone(todo)">{{todo.content}}</h3>
            <div>
              <el-button @click="removeTodo(index)">削除</el-button>
              <el-button @click="toggleDone(todo)">完了</el-button>
            </div>
          </li>
        </ul>
        <el-button @click="saveFile">保存</el-button>

      </div>

    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue';
export default {
  methods: {
    saveFile: function () {
      console.info('jsonを上書きする')
      const masterJ = { a: ['aaa', 'bbb'], b: ['bbb', 'ccc'] }
      const data = JSON.stringify(masterJ)
      const fs = require('fs')
      fs.writeFileSync('./myfile.json', JSON.stringify(data, null, 2))
    }
  },
  setup() {
    // newTodoをセット
    const newTodo = ref('');
    // todosをセット
    const todos = ref([]);
    // todoを作成
    const addNewTodo = () => {
      todos.value.push({
        id: Date.now(),
        done: false,
        content: newTodo.value,
      });
      // newTodoの値を空にする
      newTodo.value = '';
    }
    // todoのdoneのTrueとFalseを入れ替えることで、:classを動的に変化させる
    const toggleDone = (todo) => {
      todo.done = !todo.done;
    }
    // 削除
    const removeTodo = (index) => {
      todos.value.splice(index, 1);
    }
    // 全てTrue
    const markAllDone = () => {
      todos.value.forEach((todo) => todo.done = true);
    }
    // 全て削除
    const removeAllTodos = () => {
      todos.value = [];
    }

    return {
      todos,
      newTodo,
      addNewTodo,
      toggleDone,
      removeTodo,
      markAllDone,
      removeAllTodos,
    };
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  width: 30vw !important;
}
h3 {
  margin-right: 20px;
}
li {
  width: 30vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  list-style: none;
}
.todo {
  cursor: pointer;
}
.done {
  text-decoration: line-through;
}
</style>