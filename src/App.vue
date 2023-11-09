<script setup>
// 

</script>

<template>
  <div class="wrapper">
    <h1 class="wrapper-title">
      Todo App
    </h1>

    <div class="form">
      <form @submit="createTask">
        <input type="text" class="input" placeholder="Add Task" required>
        <button type="submit">Add</button>
      </form>
    </div>

    <!-- List the Data -->
    <div class="task-wrapper">
      <div class="task-items">
        <div>• Sample Item 1</div>
        <div class="task-action">
          <button>Complete</button>
          <button>Delete</button>
        </div>
      </div>

      <div class="task-items">
        <div>• Sample Item 1</div>
        <div class="task-action">
          <button>Complete</button>
          <button>Delete</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  font-family: sans-serif;
  width: 350px;
  margin: 0 auto;
}

.task-wrapper {
  margin-top: 20px;
}

.task-wrapper .task-items {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 14px;
}

.completed {
  text-decoration: line-through;
}

.task-wrapper .task-action {
  display: flex;
  gap: 8px;
}
</style>