<template>
  <div style="display: none;">
    {{ triggerLoading }}
  </div>
</template>

<script>
import { Loading } from 'quasar';
import Spinner from 'src/components/Spinner.vue'
import { onUpdated } from 'vue';

export default {
  name: 'LoadindForm',
  setup () {
    const showLoading = () =>{
    Loading.show({
      spinner: Spinner,
      backgroundColor: 'transparent',
    });

    setTimeout(()=> {
      Loading.hide();
    }, 600)
    }

    onUpdated(()=> {
      showLoading();
    })

  },
  props: {
    triggerLoading: Boolean
  }

}
</script>
