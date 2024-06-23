import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const activities = ref([]);
  const filter = ref("all");

  const filteredActivities = computed(() => {
    switch (filter.value) {
      case "active":
        return activities.value.filter((activity) => !activity.completed);
      case "completed":
        return activities.value.filter((activity) => activity.completed);
      default:
        return activities.value;
    }
  });

  const addActivity = (newActivity) => {
    if (newActivity.name.trim() !== "" && newActivity.date !== "") {
      activities.value.push({
        id: Date.now(),
        name: newActivity.name,
        date: newActivity.date,
        completed: false,
      });
    }
  };

  const deleteActivity = (index) => {
    activities.value.splice(index, 1);
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
    activities,
    filter,
    filteredActivities,
    addActivity,
    deleteActivity,
    showAll,
    showIncomplete,
    showCompleted,
  };
});
