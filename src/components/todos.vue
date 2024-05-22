<template>
  <div>
    <div class="task-manager">
      <h1 class="title">Manajemen Tugas</h1>
      <form @submit.prevent="addTask" class="task-form">
        <div class="input-container">
          <input
            v-model="newTask"
            placeholder="Tambahkan tugas baru"
            required
            class="task-input"
          />
          <input type="date" v-model="newTaskDate" class="task-input" />
          <button type="submit" class="add-button">Tambah</button>
        </div>
      </form>
      <div
        v-if="tasks.length > 0 || filteredTasks.length > 0"
        class="task-list"
      >
        <h2 class="list-title">Daftar Tugas:</h2>
        <ul>
          <li v-for="task in filteredTasks" :key="task.id" class="task-item">
            <label class="task-label">
              <input
                type="checkbox"
                @change="toggleComplete(task)"
                :checked="task.completed"
              />
              <span class="checkmark"></span>
              <span class="task-name" :class="{ completed: task.completed }">{{
                task.name
              }}</span>
              <span class="task-date">{{ task.date }}</span>
              <span class="task-status">{{
                task.completed ? "Selesai" : "Belum Selesai"
              }}</span>
            </label>
            <button @click="removeTask(task)" class="remove-button">
              Hapus
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-tasks">Tidak ada tugas.</p>
      </div>
      <div class="filters">
        <h2 class="list-title">Filter:</h2>
        <button @click="setFilter('all')" :class="{ active: filter === 'all' }">
          Semua
        </button>
        <button
          @click="setFilter('active')"
          :class="{ active: filter === 'active' }"
        >
          Belum Selesai
        </button>
        <button
          @click="setFilter('completed')"
          :class="{ active: filter === 'completed' }"
        >
          Selesai
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      newTaskDate: "",
      filter: "all",
    };
  },
  props: {
    tasks: Array,
  },
  computed: {
    filteredTasks() {
      if (this.filter === "all") {
        return this.tasks;
      } else if (this.filter === "active") {
        return this.tasks.filter((task) => !task.completed);
      } else if (this.filter === "completed") {
        return this.tasks.filter((task) => task.completed);
      }
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push({
          id: Date.now(),
          name: this.newTask,
          date: this.newTaskDate,
          completed: false,
        });
        this.newTask = "";
        this.newTaskDate = "";
      }
    },
    removeTask(task) {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
    toggleComplete(task) {
      task.completed = !task.completed;
    },
    setFilter(filter) {
      this.filter = filter;
    },
  },
};
</script>

<style scoped>
/* Gaya untuk todos.vue */
.task-manager {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 2em auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(249, 249, 249, 0.404);
  backdrop-filter: blur(px);
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.task-form {
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.add-button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.add-button:hover {
  background-color: #45a049;
}

.filters {
  text-align: center;
  margin-top: 20px;
}

.filters button {
  margin: 0 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: #333;
  cursor: pointer;
}

.filters button:hover {
  background-color: #ddd;
}

.filters button.active {
  background-color: #4caf50;
  color: white;
}

.task-list {
  margin-bottom: 20px;
}

.list-title {
  margin-bottom: 10px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 5px;
}

.task-label {
  display: flex;
  align-items: center;
}

.task-name {
  flex: 1;
  margin-left: 10px;
}

.task-name.completed {
  text-decoration: line-through;
}

.task-date {
  margin-left: 10px;
}

.task-status {
  margin-left: 10px;
}

.remove-button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  background-color: #f44336;
  color: white;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.no-tasks {
  text-align: center;
}
</style>
