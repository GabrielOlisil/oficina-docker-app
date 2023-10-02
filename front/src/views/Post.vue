<template>
  <div class="d-flex flex-column w-50 mx-auto">
    <h2 class="text-center py-3">Selecione o Arquivo</h2>

    <div>
      <form
        :action="url + '/files'"
        method="post"
        enctype="multipart/form-data"
      >
        <v-file-input
          accept="*"
          label="Selecione o Arquivo"
          name="file"
          id="file"
        ></v-file-input>
        <div class="d-flex justify-center">
          <v-btn class="me-4" type="submit" id="enviar"> Enviar </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
const url = import.meta.env.VITE_URL;
</script>
