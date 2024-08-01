<template>
  <q-page-container>

    <!-- Form Register -->
    <transition name="fade">
      <q-page class="row" v-show="showRegister">
        <transition name="slide-left">
          <div class="col-md-5 column justify-center slide-back-right" v-if="showRegister">
            <Register @slide-form="onSlideFormRegister"/>
          </div>
        </transition>
        <transition name="slide-right">
          <div v-if="showRegister" class="col-md-7 bg-register slide-back-left "></div>
        </transition>
      </q-page>
    </transition>

    <LoadindForm v-bind:triggerLoading="showLoading"/>

    <!-- Form Login -->
    <transition name="fade">
      <q-page class="row" v-show="showLogin" >
        <transition name="slide-left">
          <div v-if="showLogin" class="col-md-7 bg-login slide-back-right"></div>
        </transition>
        <transition name="slide-right">
          <div class="col-md-5 slide-back-left column justify-center " v-if="showLogin">
              <h3 class="column items-center ">
                Welcome again
              </h3>
              <Login @slide-form="onSlideFormLogin"/>
              <h6 class="column items-center">
                &copy; BarbShop, 2024
              </h6>
          </div>
        </transition>

      </q-page>

    </transition>

  </q-page-container>
</template>

<script>
import Login from 'src/components/ClientLogin.vue';
import Register from 'src/components/ClientRegister.vue';
import LoadindForm from 'src/components/LoadingForm.vue';
import {ref} from 'vue';


export default {
  name: 'LoginPage',
  setup() {
    return {
      showRegister: ref(false),
      showLogin: ref(true),
      showLoading: ref(null)
    }
  },
  components: {
    Register,
    Login,
    LoadindForm
  },
  methods: {
    onSlideFormRegister() {
      this.showRegister = !this.showRegister;
      this.showLoading = false;
      setTimeout(()=> {
        this.showLogin = !this.showLogin;
      }, 2100);
    },

    onSlideFormLogin() {
      this.showLoading = true;
      this.showLogin = !this.showLogin;
      setTimeout(()=> {
          this.showRegister = !this.showRegister;
      }, 2100)
    }
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
  background-image: url('/img/barb-bg-login.jpg');
  background-size: cover;
  background-position: center right;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.288) ;
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
