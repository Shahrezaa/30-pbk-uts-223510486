import { createRouter, createWebHistory } from "vue-router";
import SlotContent from "../components/slot.vue";
import Todos from "../components/todos.vue";
import Post from "../components/post.vue";
import Album from "../components/album.vue";

const routes = [
  { path: "/", component: SlotContent },
  { path: "/todos", component: Todos },
  { path: "/posts", component: Post },
  { path: "/albums", component: Album },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
