<script setup>
import { ref, onMounted } from 'vue';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import database from './firebase.js';

const db = database;
const data = ref([]);

const FormData = ref({
  task: null,
  status: null,
  created_at: null,
});

// Get the Task Data from the Firestore Database
const renderDataTask = async () => {
  const queryData = query(collection(db, "todos"), orderBy('created_at', 'desc'));

  onSnapshot(queryData, (querySnapshot) => {
    const task = [];
    querySnapshot.forEach((item) => {
      const todo = {
        id: item.id,
        task: item.data().task,
        status: item.data().status
      }
      task.push(todo);
    });
    data.value = task;
  });
};

// Add New Task
const createTask = async (e) => {
  e.preventDefault();
  FormData.value.status = false;

  const response = await addDoc(collection(db, "todos"), {
    task: FormData.value.task,
    status: FormData.value.status,
    created_at: serverTimestamp()
  });

  if (response.id) {
    FormData.value.task = null;
    FormData.value.status = null;
    FormData.value.created_at = null;

    alert('Added new task!');
  }
};

// Update Task
const updateTask = async (id) => {
  const dataQuery = doc(db, 'todos', id);

  const snapshot = await getDoc(dataQuery);

  if (snapshot.exists()) {
    // If the document exists, check the current status
    const currentStatus = snapshot.data().status;

    // Toggle the status
    const newStatus = !currentStatus;

    // Update the status in Firestore
    const newData = {
      status: newStatus
    };

    await updateDoc(dataQuery, newData);
    console.log("Task status updated successfully.");

  } else {
    console.log("Task not found.");
  }
};


// Delete Task
const deleteTask = async (id) => {
  const querryData = doc(db, 'todos', id);
  deleteDoc(querryData)
    .then(() => {
      alert('Task successfully deleted.');
    })
    .catch((error) => {
      alert('Error deleting document:', error);
    });
};

onMounted(() => {
  renderDataTask();
});
</script>

<template>
  <div class="wrapper">
    <h1 class="wrapper-title">
      Todo App
    </h1>

    <div class="form">
      <form @submit="createTask">
        <input type="text" class="input" v-model="FormData.task" placeholder="Add Task" required>
        <button type="submit">Add</button>
      </form>
    </div>

    <!-- List the Data -->
    <div v-if="data.length > 0" class="task-wrapper">
      <div v-for="item in data" :key="item.id" class="task-items">
        <div :class="item.status ? 'completed' : ''">• {{ item.task }}</div>
        <div class="task-action">
          <button @click="updateTask(item.id)">{{ item.status ? 'Clear' : 'Complete' }}</button>
          <button @click="deleteTask(item.id)">Delete</button>
        </div>
      </div>
    </div>

    <!-- If Not Found -->
    <div v-else class="task-wrapper">
      No Data Found
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