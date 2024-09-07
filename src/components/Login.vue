<template>
  <div class="row justify-center">
    <div class="col-md-6">
      <q-form
      class="q-gutter-md  bg-light-green-3 q-pa-md rounded-borders shadow-3"
      autocomplete="off"
      >
        <q-toggle
          class="toggle-account"
          label="Account Company"
          hint="Toggle to see account company example"
          v-model="isAccountCompany"
          @click="CheckRole"
        >
        </q-toggle>
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
        Switch between example accounts by clicking the toggle above:
      </p>
      <div class="row q-gutter-xs justify-center">
        <q-btn
          :label=accountRole
          color="blue-6"
          class="col"
          @click="exampleLogin($event)"
        >
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ClientLogin } from '../httpclient.js'

export default defineComponent({
  name: 'ClientLogin',
  setup (_, {emit}) {
    const MailClient = ref('');
    const PasswordClient = ref('');
    const RoleClient = ref('customer');
    const successfulLogin = ref(true);
    const isAccountCompany = ref(false);
    const accountRole = computed(() => {
      return CheckRole();
    });


    // Send a emit to the Login Page
    const slideForm = () => {
      emit('slide-form');
    }

    // Check which type role
    const CheckRole = () => {
      let exampleRole;
      if(isAccountCompany.value){
        exampleRole = 'Example Company';
        RoleClient.value = 'company';
      } else {
        exampleRole = 'Example Customer'
        RoleClient.value = 'customer';
      }
      return exampleRole;
    }

    const submitFormLogin = async(e) => {
      e.preventDefault();
      try {
        successfulLogin.value = await ClientLogin(MailClient.value, PasswordClient.value, RoleClient.value);
        await enterPage();
      } catch (error) {
        console.error('A error has been detected in login', error.message);
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

    //  example login to recruiters
    const exampleLogin = (event) => {
      if(isAccountCompany.value) {
        // company mail
        MailClient.value = 'exampleCompany@gmail.com';
      } else {
        // customer mail
        MailClient.value = 'exampleCustomer@gmail.com';
      }

      PasswordClient.value = '123123123';

      submitFormLogin(event);
    }

    return {
      PasswordClient,
      MailClient,
      successfulLogin,
      isAccountCompany,
      accountRole,
      submitFormLogin,
      slideForm,
      exampleLogin,
      CheckRole
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

.toggle-account {
  font-size: 1rem;
  font-weight: bold;
}

</style>
