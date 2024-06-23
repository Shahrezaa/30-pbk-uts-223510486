<template>
  <div>
    <div class="task-manager">
      <h2 class="title">Manajemen Tugas</h2>
      <br />
      <form @submit.prevent="addTask" class="task-form">
        <div class="input-container">
          <input
            v-model="newTask.name"
            placeholder="Tambahkan tugas baru"
            required
            class="task-input"
          />
          <input
            type="date"
            v-model="newTask.date"
            required
            class="task-input"
          />
          <button type="submit" class="add-button">Tambah</button>
        </div>
      </form>
      <div v-if="filteredTasks.length > 0" class="task-list">
        <ul>
          <h3 class="list-title">Daftar Tugas:</h3>
          <li
            v-for="(task, index) in filteredTasks"
            :key="task.id"
            class="task-item"
          >
            <label class="task-label">
              <input
                type="checkbox"
                @change="toggleComplete(task)"
                :checked="task.completed"
              />
              <span class="task-name" :class="{ completed: task.completed }">{{
                task.name
              }}</span>
              <span class="task-date">{{ task.date }}</span>
              <span class="task-status">{{
                task.completed ? "Selesai" : "Belum Selesai"
              }}</span>
            </label>
            <button @click="removeTask(index)" class="remove-button">
              Hapus
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-tasks">Tidak ada tugas.</p>
      </div>
      <div class="filters">
        <h3 class="list-title">Filter:</h3>
        <button @click="showAll" :class="{ active: filter === 'all' }">
          Semua
        </button>
        <button
          @click="showIncomplete"
          :class="{ active: filter === 'active' }"
        >
          Belum Selesai
        </button>
        <button
          @click="showCompleted"
          :class="{ active: filter === 'completed' }"
        >
          Selesai
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTasksStore } from "../stores/tasks.store";

export default {
  setup() {
    const store = useTasksStore();

    const newTask = ref({ name: "", date: "" });
    const filter = ref("all");

    const tasks = store.activities;
    const filteredTasks = computed(() => {
      switch (filter.value) {
        case "active":
          return tasks.filter((task) => !task.completed);
        case "completed":
          return tasks.filter((task) => task.completed);
        default:
          return tasks;
      }
    });

    const addTask = () => {
      if (newTask.value.name.trim() !== "" && newTask.value.date !== "") {
        store.addActivity({
          name: newTask.value.name,
          date: newTask.value.date,
        });
        newTask.value = { name: "", date: "" };
      }
    };

    const removeTask = (index) => {
      store.deleteActivity(index);
    };

    const toggleComplete = (task) => {
      task.completed = !task.completed;
    };

    const showAll = () => {
      filter.value = "all";
    };

    const showIncomplete = () => {
      filter.value = "active";
    };

    const showCompleted = () => {
      filter.value = "completed";
    };

    return {
      tasks,
      filteredTasks,
      newTask,
      filter,
      addTask,
      removeTask,
      toggleComplete,
      showAll,
      showIncomplete,
      showCompleted,
    };
  },
};
</script>

<style scoped>
.task-manager {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 2em auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(249, 249, 249, 0.404);
  backdrop-filter: blur(4px);
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
  background-color: #e53935;
}
</style>
