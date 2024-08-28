<template>
  <q-page-container>
    <transition name="fade">
      <q-page class="row justify-center" v-show="showRegister">
        <transition name="slide-left">
          <div class="col-md-6 column justify-center slide-back-right" v-if="showRegister">
            <Register @slide-form="onSlideFormRegister"/>
          </div>
        </transition>
        <transition name="slide-right">
          <div v-if="showRegister" class="col-md-6 bg-register slide-back-left "></div>
        </transition>
      </q-page>
    </transition>

    <LoadindForm v-bind:triggerLoading="showLoading"/>
  </q-page-container>
</template>

<script>
import Register from 'src/components/Register.vue';
import LoadindForm from 'src/components/Loading.vue';
import {ref} from 'vue';


export default {
  name: 'RegisterPage',
  setup() {
      const showRegister = ref(true);
      const showLoading = ref(null);

      // Fade out and slide components to load login page
      const onSlideFormRegister = () => {
        showRegister.value = false;
        showLoading.value = true;
        setTimeout(()=> {
          window.location.hash = 'login'
        }, 500);
      }

    return {
      showRegister,
      showLoading,
      onSlideFormRegister
    }
  },
  components: {
    Register,
    LoadindForm
  }

};
</script>

<style scoped>

.fade-leave-to {
  transition: opacity 2s;
  opacity: 0;
}

.slide-right-leave-to  {
  transition: transform 1.5s ease;
  transform: translateX(200%);
}

.slide-left-leave-to  {
  transition: transform 1.5s ease;
  transform: translateX(-200%);
}

.slide-back-right {
  animation: slideBackRight .5s;
}

.slide-back-left {
  animation: slideBackLeft .5s;

}

.bg-register {
  background-image: url('/img/barb-bg-register.jpg');
  background-size: cover;
  background-position: center right;
  box-shadow: -5px 0px 5px rgba(0, 0, 0, 0.288) ;
}


/* animation */


@keyframes slideBackRight {
  from {
    transform: translateX(-200%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideBackLeft {
  from {
    transform: translateX(200%);
  }
  to {
    transform: translateX(0);
  }
}

</style>
