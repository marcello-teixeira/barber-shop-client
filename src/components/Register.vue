<template>
  <div class="row justify-center">
    <div class="col-md-8">
      <q-form
      class="q-gutter-sm bg-grey-5 q-pa-md q-ma-md rounded-borders"
      @submit="SubmitRegisterForm"
      >
        <div >
          <h5 style="margin: 0px 0px 15px 0px;">
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
          v-for="(input, index) in FilterInputs"
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
                class="bg-grey-4"
              >
                <Location @send-location="onSendLocation" />
              </q-popup-proxy>
            </template>

          </template>
        </q-input>
        <q-file
          outlined
          color="green-10"
          v-model="Inputs.ProfilePicture.model"
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
              @click="this.Inputs.ProfilePicture.model = null"
            />
          </template>
        </q-file>
          <q-toggle
            label="I agree terms and conditions"
            v-model="termAgree"
            color="light-green"
          />
        <div class="row items-center q-my-md">
          <div class="col-sm-6 text-left">
            <q-btn
              outline
              label="Already has account?"
              @click="slideForm"
            />
          </div>
          <div class="col-sm-6 text-right">
            <q-btn
              label="Register"
              push
              padding="md"
              type="submit"
              class="btn-register"
            />
          </div>
        </div>
        <p class="q-my-xl" style=" margin: 0px;">
          <a href="#" style="color: blue;">Terms and conditions</a>
        </p>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Notify } from 'quasar';
import { ClientRegister } from '../httpclient';
import Location from './Location.vue'

export default {
  name: "ClientRegister",
  setup(_,{emit}) {
    const ViewPassword = ref(true);
    const OnCompany = ref(false);
    const termAgree = ref(false);

    const slideForm = () => {
      emit('slide-form');
    }

    return {
      termAgree,
      ViewPassword,
      OnCompany,
      slideForm
    }
  },
  data() {
    return {
      Inputs: {
        Name: {
          label: "Name",
          type: "text",
          rule: (val) => val.length > 0 || "Enter your name",
          model: "",
          visible: true
        },
        Email: {
          label: "Email",
          type: "email",
          rule: (val) => /\S+@\S+\.\S/.test(val) || "Email incorrect",
          model: "",
          visible: true
        },
        CPF: {
          label: "CPF",
          type: "text",
          rule: (val) => val.length >= 11 || "Enter your CPF",
          mask: "###.###.###-##",
          model: "",
          visible: !this.OnCompany
        },
        CNPJ: {
          label: "CNPJ",
          type: "text",
          rule: (val) => val.length >= 14 || "Enter your CNPJ",
          mask: "##.###.###/####-##",
          model: "",
          visible: this.OnCompany
        },
        Password: {
          label: "Password",
          type: 'password',
          rule: (val) =>
            val.length > 8 || "Password incorrect",
          model: "",
          icon: 'visibility_off',
          hint: 'Password must be longer than 8 characters',
          visible: true
        },
        PasswordTwoFactor: {
          label: "Confirm password",
          type: "password",
          rule: (val) =>
            val === this.Inputs.Password.model || "Password is not the same",
          model: "",
          visible: true
        },
        Phone: {
          label: "Phone",
          type: "tel",
          rule: (val) => val.length >= 11 || "Enter your phone",
          mask: "(##)#####-####",
          model: "",
          visible: true
        },
        Location: {
          label: "Location",
          type: "text",
          rule: (val) => val.length > 0 || "Enter your location",
          model: "",
          hint: 'Mask: road number, postcode city, country',
          visible: this.OnCompany
        },
        ProfilePicture: {
          model: null
        }
      },
    };
  },
  components: {
    Location
  },
  computed: {
    FilterInputs() {
      return Object.values(this.Inputs).filter(input => input.visible);
    }
   },
  methods: {
    onSendLocation(data) {

      for (const key in data) {
        if(data[key] === undefined) {
          data[key] = '';
        }
      }

      this.Inputs.Location.model = `${data.road}, ${data.postcode} ${data.city}, ${data.country}`;

    },

    ToggleViewPassword() {
      this.ViewPassword = !this.ViewPassword
      this.Inputs.Password.type = this.ViewPassword ? 'password' : 'text';
      this.Inputs.Password.icon = this.ViewPassword ? 'visibility_off' : 'visibility';
    },

    SubmitRegisterForm() {
      const formData = new FormData();
      let route;

      formData.append('Name', this.Inputs.Name.model);
      formData.append('Email', this.Inputs.Email.model);
      formData.append('Password', this.Inputs.Password.model);
      formData.append('Phone', this.Inputs.Phone.model);
      formData.append('Photo', this.Inputs.ProfilePicture.model);

      if (!this.OnCompany) {
        formData.append('CPF', this.Inputs.CPF.model);

        route = 'customer';

      } else {
        formData.append('CNPJ', this.Inputs.CNPJ.model);
        formData.append('Location', this.Inputs.Location.model);
        formData.append('Login', 'admin');

        route = 'company';
      }

      ClientRegister(formData, route);

      Notify.create({
        message: 'Successfully registered!',
        color: 'positive',
        position: 'top'
      })
    },
    IsCompany() {
      this.Inputs.CNPJ.visible = this.OnCompany;
      this.Inputs.Location.visible = this.OnCompany;
      this.Inputs.CPF.visible = !this.OnCompany;
    }

  },

};
</script>

<style scoped>

.btn-register {
  background-color: rgb(138, 132, 132);
  color: white;

  transition: .4s;
}

.btn-register:hover {
  background-color: rgb(54, 129, 54);
}

</style>
