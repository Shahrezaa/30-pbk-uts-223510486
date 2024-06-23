<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-dark text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            UAS
          </q-toolbar-title>
        </q-toolbar>

        <q-tabs ref="myTabs" align="left">
          <q-route-tab to="/todos" label="Todos" />
          <q-route-tab to="/posts" label="Posts" />
          <q-route-tab to="/albums" label="Albums" />
        </q-tabs>
      </q-header>

      <q-page-container>
        <router-view :users="users" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import {
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QAvatar,
  QTabs,
  QRouteTab,
  QPageContainer,
} from "quasar";
import { useTasksStore } from "./stores/tasks.store";

export default defineComponent({
  components: {
    QLayout,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QAvatar,
    QTabs,
    QRouteTab,
    QPageContainer,
  },
  setup() {
    const users = ref([]);
    const tasksStore = useTasksStore();

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        users.value = await response.json();
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
    };
  },
});
</script>

<style scoped>
.bg-dark {
  background-color: #493b3b;
}

.text-white {
  color: white;
}

.navbar {
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
