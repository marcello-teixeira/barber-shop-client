<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>

body {
  background-color: #fff;
}

body::-webkit-scrollbar {
  width: 8px; /* Largura da barra de rolagem */
  height: 0;
}

body::-webkit-scrollbar-track {
  background: #999999; /* Cor do track (fundo da scrollbar) */
}

body::-webkit-scrollbar-thumb {
  background-color: #444444; /* Cor do thumb (indicador de rolagem) */
  border-radius: 6px; /* Bordas arredondadas */
  border: 3px solid #444444; /* Espaçamento ao redor do thumb */
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Cor do thumb ao passar o mouse */
}


</style>
