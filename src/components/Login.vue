<template>
  <div class="row justify-center">
    <div class="col-md-6">
      <q-form
      class="q-gutter-md  bg-light-green-3 q-pa-md rounded-borders shadow-3"
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
          <div class="col-6 text-left">
            <q-btn
              class=""
              label="Sign up"
              outline
              @click="slideForm"
            />
          </div>

          <div class="col-6 text-right">
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
      <p class="column items-center example-title q-mt-sm">
        Click below to see the accounts example: 
      </p>
      <div class="row q-gutter-xs justify-center">
        <q-btn
          label="Example customer"
          color="blue-6"
          class="col-5"
          @click="CustomerExampleLogin($event,'exampleCustomer@gmail.com', '123123123')"
        >
        </q-btn>
        <q-btn
          label="Example Company"
          color="blue-6"
          class="col-5"
          @click="CompanyExampleLogin($event,'exampleCompany@gmail.com', '123123123')"
        >
        </q-btn>
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

    // Send a emit to the Login Page
    const slideForm = () => {
      emit('slide-form');
    }

    const submitFormLogin = async(e) => {
      e.preventDefault();
      try {
        successfulLogin.value = await ClientLogin(MailClient.value, PasswordClient.value);
        await enterPage();
      } catch (error) {
        console.error('A error has been detected in login', error);
      }
    }

    // Check if login is successful
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

    // customer example login to recruiters
    const CustomerExampleLogin = (event, mail, password) => {
      MailClient.value = mail;
      PasswordClient.value = password;
      submitFormLogin(event);
    }

    // company example login to recruiters
    const CompanyExampleLogin = (event, mail, password) => {
      MailClient.value = mail;
      PasswordClient.value = password;
      submitFormLogin(event);
    }

    return {
      PasswordClient,
      MailClient,
      successfulLogin,
      submitFormLogin,
      slideForm,
      CompanyExampleLogin,
      CustomerExampleLogin
    }
  },
  created() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
})
</script>

<style>
.info-login {
  position: relative;
  padding: 15px;
  text-align: center;
  width: 100%;
}

.info-login span {
  font-size: 22px;
  color: red;
  font-weight: bold;
}

.example-title {
  font-size: 1rem;
}


</style>
