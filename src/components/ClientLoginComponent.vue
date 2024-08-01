<template>
  <div class="row justify-center">
    <div class="col-md-6 q-py-lg">
      <q-form
      class="q-gutter-md bg-light-green-3 q-pa-md rounded-borders shadow-3"
      @submit="SubmitFormLogin"
      autocomplete="off"
      >
        <q-input
          color="green-10"
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
          color="green-10"
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
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {ClientLogin} from '../httpclient.js'

export default defineComponent({
  name: 'ClientLogin',
  setup (_, {emit}) {

    const slideForm = () => {
      emit('slide-form');
    }

    return {
      MailClient: ref(''),
      PasswordClient: ref(''),
      ClientToken: ref(''),
      slideForm
    }
  },
  methods: {
    async SubmitFormLogin() {
      this.ClientToken = await ClientLogin(this.MailClient, this.PasswordClient);
    }
  }
})
</script>
