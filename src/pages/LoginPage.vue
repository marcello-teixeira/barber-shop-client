<template>
  <q-page-container>
    <transition name="fade">
      <q-page class="row justify-center" v-show="showLogin" >
        <transition name="slide-left">
          <div v-if="showLogin" class="col-md-7 bg-login slide-back-right"></div>
        </transition>
        <transition name="slide-right">
          <div class="col-md-5 slide-back-left column justify-center " v-if="showLogin">
              <h3 class="column items-center ">
                Welcome again
              </h3>
              <Login @slide-form="onSlideFormLogin"/>
              <h6 class="column items-center q-pt-xl">
                &copy; BarbShop, 2024
              </h6>
          </div>
        </transition>
      </q-page>
    </transition>

    <LoadindForm v-bind:triggerLoading="showLoading"/>

  </q-page-container>
</template>

<script>
import Login from 'src/components/Login.vue';
import LoadindForm from 'src/components/Loading.vue';
import {ref} from 'vue';


export default {
  name: 'LoginPage',
  setup() {
      const showLogin = ref(true);
      const showLoading = ref(null);

      // Fade out and slide components to load register page
      const onSlideFormLogin = () => {
        showLogin.value = false;
        showLoading.value = true;
        setTimeout(()=> {
          window.location.hash = 'register'
        }, 500)
    }

    return {
      showLoading,
      showLogin,
      onSlideFormLogin
    }
  },
  components: {
    Login,
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

.bg-login {
  height: 90dvh;
  background-image: url('/img/barb-bg-login.jpg');
  background-size: cover;
  background-position: center right;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.288) ;
}


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
