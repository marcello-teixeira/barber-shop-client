<template>
  <div class="fullscreen bg-green text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 8vw">
        You are logoff
      </div>

      <div class="text-h2" style="opacity:.4; font-size: 3vw;">
        Click below to return login
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="green"
        unelevated
        to="/login"
        label="Back to Login"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorFailLogin'
});
</script>


