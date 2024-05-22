<template>
  <div>
    <h1>Fitur Postingan</h1>
    <select v-model="selectedUser">
      <option value="">Pilih pengguna</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="selectedUser !== ''">
      <h3>Postingan oleh {{ selectedUserName }}</h3>
      <ul>
        <li v-for="post in filteredPosts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Tidak ada postingan untuk pengguna ini.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    filteredPosts: Array,
    selectedUserName: String,
  },
  data() {
    return {
      selectedUser: null,
    };
  },
  watch: {
    selectedUser(newVal) {
      this.fetchFilteredPosts();
    },
  },
  methods: {
    fetchFilteredPosts() {
      this.$emit("update:selectedUser", this.selectedUser);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

select {
  padding: 8px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
