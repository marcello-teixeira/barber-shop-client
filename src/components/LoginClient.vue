<template>
  <div class="row justify-center">
    <div class="col-md-6 q-py-lg">
      <q-form
      class="q-gutter-md bg-light-green-4 q-pa-md rounded-borders shadow-3"
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

        <div class="text-right">
          <q-btn
            push
            label="Sign In"
            color="green"
            type="submit"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {LoginClient, GetClients} from '../httpclient.js'

export default defineComponent({
  name: 'LoginClient',
  data() {
    return {
      ClientToken: ''
    }
  },
  setup () {
    return {
      MailClient: ref('marcello'),
      PasswordClient: ref('123'),
    }
  },
  methods: {
    async SubmitFormLogin(e) {
      this.ClientToken = await LoginClient(this.MailClient, this.PasswordClient);
    }
  },
  mounted() {
  }
})
</script>
