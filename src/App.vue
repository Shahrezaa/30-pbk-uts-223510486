<template>
  <div>
    <header>
      <nav class="navbar">
        <ul class="nav-list">
          <li class="nav-item">
            <button
              @click="showTodos"
              :class="{ active: activeMenu === 'todos' }"
            >
              Todos
            </button>
          </li>
          <li class="nav-item">
            <button
              @click="showPosts"
              :class="{ active: activeMenu === 'posts' }"
            >
              Post
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <div v-if="activeMenu === 'todos'">
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
          <div v-if="tasks.length > 0" class="task-list">
            <h2 class="list-title">Daftar Tugas:</h2>
            <ul>
              <li
                v-for="task in filteredTasks"
                :key="task.id"
                class="task-item"
              >
                <label class="task-label">
                  <input
                    type="checkbox"
                    @change="toggleComplete(task)"
                    :checked="task.completed"
                  />
                  <span class="checkmark"></span>
                  <span
                    class="task-name"
                    :class="{ completed: task.completed }"
                  >
                    {{ task.name }}
                  </span>
                  <span class="task-date">{{ task.date }}</span>
                  <span class="task-status">
                    {{ task.completed ? "Selesai" : "Belum Selesai" }}
                  </span>
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
            <button
              @click="filter = 'all'"
              :class="{ active: filter === 'all' }"
            >
              Semua
            </button>
            <button
              @click="filter = 'active'"
              :class="{ active: filter === 'active' }"
            >
              Belum Selesai
            </button>
            <button
              @click="filter = 'completed'"
              :class="{ active: filter === 'completed' }"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <h1>Fitur Postingan</h1>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <div v-if="filteredPosts.length > 0">
          <h3>Postingan oleh {{ selectedUserName }}</h3>
          <ul>
            <li v-for="post in filteredPosts" :key="post.id">
              {{ post.title }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Tidak ada postingan untuk pengguna ini.</p>
        </div>
      </div>
      <div v-else>
        <p>Pilih menu untuk melihat fitur.</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      activeMenu: "",
      selectedUser: null,
      newTask: "",
      newTaskDate: "",
      tasks: [],
      filter: "all",
    };
  },
  computed: {
    selectedUserName() {
      const user = this.users.find((u) => u.id === this.selectedUser);
      return user ? user.name : "";
    },
    filteredPosts() {
      return this.posts.filter((post) => post.userId === this.selectedUser);
    },
    filteredTasks() {
      if (this.filter === "active") {
        return this.tasks.filter((task) => !task.completed);
      } else if (this.filter === "completed") {
        return this.tasks.filter((task) => task.completed);
      } else {
        return this.tasks;
      }
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.users = json;
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        this.posts = json;
      } catch (error) {
        console.error("Error fetching posts data:", error);
      }
    },
    showTodos() {
      this.activeMenu = "todos";
    },
    showPosts() {
      this.activeMenu = "posts";
      this.fetchPosts();
    },
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
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1em;
  text-align: center;
  margin-top: -60px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.nav-item {
  margin: 0 1em;
}

.nav-item button {
  background: none;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 1em;
}

.nav-item button:hover,
.nav-item button.active {
  background-color: #575757;
  border-radius: 5px;
}

main {
  padding: 1em;
}

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
