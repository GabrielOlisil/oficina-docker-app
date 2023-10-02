<template>
  <div v-if="files">
    <v-list>
      <a
        v-for="file in files"
        :href="url + '/files/' + file"
        style="color: inherit; text-decoration: none"
      >
        <v-list-item :key="file" link :title="file"></v-list-item>
      </a>
    </v-list>
  </div>
  <div v-else>Carregando</div>
</template>

<script setup>
import { ref } from "vue";
const files = ref(null);

const url = import.meta.env.VITE_URL;
fetch(`${url}/files`)
  .then((res) => res.json())
  .then((filesF) => (files.value = filesF));
</script>
