<template>
  <div class="row justify-center">
    <div class="col-md-6 q-py-lg" style="position: relative;">
      <q-form
      class="q-gutter-md bg-light-green-3 q-pa-md rounded-borders shadow-3"
      autocomplete="off"
      >
        <q-input
          color="secondary"
          type="text"
          label="Your email *"
          v-model="MailClient"
          :rules="[val => val.length > 0 || 'Please enter your email']"
        >
          <template v-slot:prepend>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input
          color="secondary"
          type="password"
          label="Your password *"
          v-model="PasswordClient"
          :rules="[val => val.length > 0 || 'Please enter your password']"
        >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        </q-input>

        <div class="row">
          <div class="col-sm-6 text-left">
            <q-btn
              class=""
              label="Sign up"
              outline
              @click="slideForm"
            />
          </div>

          <div class="col-sm-6 text-right">
            <q-btn
             push
             label="Sign In"
             color="green"
             type="submit"
             @click="submitFormLogin"
            />
          </div>
        </div>
      </q-form>
      <div class="info-login" v-show="!successfulLogin">
        <span>Email or password is incorrect</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {ClientLogin} from '../httpclient.js'

export default defineComponent({
  name: 'ClientLogin',
  setup (_, {emit}) {
    const MailClient = ref('');
    const PasswordClient = ref('');
    const successfulLogin = ref(true);

    const slideForm = () => {
      emit('slide-form');
    }

    const submitFormLogin = async() => {
      try {
        successfulLogin.value = await ClientLogin(MailClient.value, PasswordClient.value);
        await enterPage();
      } catch (error) {
        console.error('A error has been detected in login', error);
      }
    }

    const enterPage = () => {
      return new Promise((resolve, reject) => {
        const role = localStorage.getItem('role');

        if(role && successfulLogin.value) {
          window.location.hash = `/view/${role}`
          resolve();
        } else {

          reject("The role wasn't defined");
        }
      })
    }


    return {
      PasswordClient,
      MailClient,
      successfulLogin,
      submitFormLogin,
      slideForm
    }
  },
  created() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }
})
</script>

<style>
.info-login {
  position: absolute;
  padding: 15px;
  text-align: center;
  width: 100%;
}

.info-login span {
  font-size: 22px;
  color: red;
  font-weight: bold;
}


</style>
