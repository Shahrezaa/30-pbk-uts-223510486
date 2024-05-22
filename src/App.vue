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
      <post
        v-if="activeMenu === 'posts'"
        :users="users"
        :selectedUser="selectedUser"
        :filteredPosts="filteredPosts"
        :selectedUserName="selectedUserName"
        @update:selectedUser="updateSelectedUser"
      ></post>
      <todos
        v-else-if="activeMenu === 'todos'"
        :tasks="tasks"
        :filteredTasks="filteredTasks"
      ></todos>
      <SlotContent v-else></SlotContent>
    </main>
  </div>
</template>

<script>
import Post from "./components/post.vue";
import Todos from "./components/todos.vue";
import SlotContent from "./components/slot.vue";

export default {
  components: {
    Post,
    Todos,
    SlotContent,
  },
  data() {
    return {
      users: [],
      posts: [],
      activeMenu: "",
      selectedUser: null,
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
      if (!this.selectedUser) return [];
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
    updateSelectedUser(newUser) {
      this.selectedUser = newUser;
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
</style>
