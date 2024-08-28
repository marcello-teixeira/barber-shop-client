<template>
  <div class="row justify-center">
    <div class="col-md-8">
      <q-form
      class="q-gutter-sm bg-grey-5 q-pa-md q-ma-md rounded-borders"
      @submit="SubmitRegisterForm"
      >
        <div >
          <h5 class="title-form">
            Enter your information
          </h5>
          <q-toggle
            label="Are you a company?"
            v-model="OnCompany"
            color="green"
            unchecked-icon="clear"
            checked-icon="check"
            @click="IsCompany"
          />
        </div>

        <q-input
          v-for="(input, index) in visibleInput"
          dense
          :key="index"
          :type="input.type"
          :label="input.label"
          :rules="[input.rule]"
          :mask="input.mask"
          fill-mask
          v-model="input.model"
          :hint="input.hint"
          unmasked-value
          filled
          color="green-10"
          class="q-my-md"
        >
          <template v-slot:append>
            <q-icon
               v-if="input.label == 'Password'"
              :name="input.icon"
              class="cursor-pointer"
              @click="ToggleViewPassword"
            />

            <template v-if="input.label == 'Location'">
              <q-icon
                name="location_on"
                class="cursor-pointer"
              />

              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
                class="location bg-grey-4"
              >
                <Location @send-location="onSendLocation" />
              </q-popup-proxy>
            </template>

          </template>
        </q-input>
        <q-file
          outlined
          color="green-10"
          v-model="dataInputs.profilePicture.model"
          label="Profile picture"
          dense
        >
          <template v-slot:prepend>
            <q-icon
              name="person"
            />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              class="cursor-pointer"
              @click="dataInputs.profilePicture.model = null"
            />
          </template>
        </q-file>
        <q-toggle
          label="I agree terms and conditions"
          v-model="termsAgrees"
          color="light-green"
        />
        <div class="row items-center q-my-md">
          <div class="col-6 text-left">
            <q-btn
              outline
              label="Already has account?"
              @click="slideForm"
            />
          </div>
          <div class="col-6 text-right">
            <q-btn
              label="Register"
              push
              padding="md"
              type="submit"
              class="btn-register"
            />
          </div>
        </div>
        <div class="terms-accept q-my-xl" >
          <a href="/#/support">Terms and conditions</a>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { Notify } from 'quasar';
import { ClientRegister } from '../httpclient';
import api from '../httpclient';
import Location from './Location.vue'
import components from 'src/dataregister';

export default {
  name: "ClientRegister",
  setup(_,{emit}) {
    const ViewPassword = ref(true);
    const OnCompany = ref(false);
    const termsAgrees = ref(false);
    const dataInputs = ref(components);

    const slideForm = () => {
      emit('slide-form');
    }

    // Check undefined places in company location
    const onSendLocation = (data) => {

      for (const key in data) {
        if(data[key] === undefined) {
          data[key] = '';
        }
      }

      dataInputs.value.location.model = `${data.road}, ${data.postcode} ${data.city}, ${data.country}`;

    };

    const ToggleViewPassword = () => {
      ViewPassword.value = !ViewPassword.value
      dataInputs.value.password.type = ViewPassword.value ? 'password' : 'text';
      dataInputs.value.password.icon = ViewPassword.value ? 'visibility_off' : 'visibility';
    };

    const verifyDocumentCPF = async() => {
      const response = await api.post('customer/verify-doc', {document: dataInputs.value.cpf.model});

      return response.data;
    }

    const verifyDocumentCNPJ = async() => {
      const response = await api.post('company/verify-doc', {document: dataInputs.value.cnpj.model});

      return response.data;
    }

    const SubmitRegisterForm = () => {
      const formData = new FormData();
      let route;

      formData.append('Name', dataInputs.value.name.model);
      formData.append('Email', dataInputs.value.email.model);
      formData.append('Password', dataInputs.value.password.model);
      formData.append('Phone', dataInputs.value.phone.model);
      formData.append('Photo', dataInputs.value.profilePicture.model);

      if (!OnCompany.value) {
        formData.append('CPF', dataInputs.value.cpf.model);

        route = 'customer';

      } else {
        formData.append('CNPJ', dataInputs.value.cnpj.model);
        formData.append('Location', dataInputs.value.location.model);
        formData.append('Login', 'admin');

        route = 'company';
      }

      ClientRegister(formData, route);

      Notify.create({
        message: 'Successfully registered!',
        color: 'positive',
        position: 'top'
      })

      window.location.hash = 'login';
    };

    const IsCompany = () => {
      dataInputs.value.cnpj.visible = OnCompany.value;
      dataInputs.value.location.visible = OnCompany.value;
      dataInputs.value.cpf.visible = !OnCompany.value;
    }

    // Filter visible properties for company or customer
    const visibleInput = computed(() => {
      return Object.values(dataInputs.value).filter(input => input.visible);
    })

    onMounted(() => {
      dataInputs.value.passwordTwofactor.rule = (val) =>
      val === dataInputs.value.password.model || "Password is not the same";

      dataInputs.value.cpf.rule = (_) => verifyDocumentCPF();
      dataInputs.value.cnpj.rule = (_) => verifyDocumentCNPJ();
    });_

    return {
      visibleInput,
      IsCompany,
      SubmitRegisterForm,
      onSendLocation,
      ToggleViewPassword,
      slideForm,
      termsAgrees,
      ViewPassword,
      OnCompany,
      dataInputs
    }
  },
  components: {
    Location
  }
};
</script>

<style scoped>

.terms-accept {
  margin: 0px;
}

.terms-accept  a {
  color: blue;
}

.title-form {
  margin: 0px 0px 15px 0px;
}

.btn-register {
  background-color: rgb(138, 132, 132);
  color: white;

  transition: .4s;
}

.btn-register:hover {
  background-color: rgb(54, 129, 54);
}

</style>
