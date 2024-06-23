<template>
  <div class="post-container">
    <h2>Postingan</h2>
    <br />
    <div class="select-container">
      <select :value="selectedUser?.id" @change="handleUserChange">
        <option disabled value="">Masukkan nama user</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <h3 v-if="selectedUser">Postingan oleh: {{ selectedUserName }}</h3>
    <div v-if="filteredPosts.length > 0">
      <ul>
        <li v-for="post in filteredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p style="text-align: center">Tidak ada postingan untuk pengguna ini.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    selectedUser: {
      type: Object,
      required: false,
      default: null,
    },
  },
  emits: ["update:selectedUser"],
  setup(props, { emit }) {
    const selectedUser = ref(null);
    const filteredPosts = ref([]);

    const fetchFilteredPosts = async (userId) => {
      if (userId !== null && userId !== "") {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        if (response.ok) {
          filteredPosts.value = await response.json();
        } else {
          filteredPosts.value = [];
          console.error("Failed to fetch posts");
        }
      } else {
        filteredPosts.value = [];
      }
    };

    const handleUserChange = (event) => {
      const userId = event.target.value;
      const user = props.users.find((user) => user.id === parseInt(userId));
      selectedUser.value = user;
      emit("update:selectedUser", user);
      fetchFilteredPosts(userId);
    };

    watch(
      () => props.selectedUser,
      (newVal) => {
        if (newVal === null || typeof newVal === "undefined") {
          selectedUser.value = null;
        } else {
          selectedUser.value = newVal;
        }
      }
    );

    watch(selectedUser, (newVal) => {
      if (newVal !== null && newVal.id !== "") {
        fetchFilteredPosts(newVal.id);
      } else {
        selectedUser.value = null;
        filteredPosts.value = [];
        emit("update:selectedUser", null);
      }
    });

    onMounted(() => {
      if (props.users.length > 0) {
        selectedUser.value = null;
      }
    });

    const selectedUserName = computed(() => {
      return selectedUser.value ? selectedUser.value.name : "";
    });

    return {
      selectedUser,
      filteredPosts,
      handleUserChange,
      selectedUserName,
    };
  },
};
</script>

<style scoped>
.post-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 2em auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(249, 249, 249, 0.404);
  backdrop-filter: blur(4px);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.select-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

select {
  padding: 8px;
  width: 50%;
  max-width: 300px;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  font-size: 1.2em;
}

p {
  margin: 0.5em 0;
  text-align: left;
}
</style>
