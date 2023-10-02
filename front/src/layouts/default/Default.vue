<template>
  <v-app>
    <v-navigation-drawer :width="235">
      <v-list-item title="API" subtitle="Frontend"></v-list-item>
      <v-divider></v-divider>

      <v-list-item link :to="{ name: 'Home' }" title="Home"></v-list-item>

      <v-list-item link :to="{ name: 'Post' }" title="Upload"></v-list-item>
    </v-navigation-drawer>
    <default-view />
  </v-app>
</template>

<script setup>
import DefaultView from "./View.vue";
</script>
