<template>
  <q-form class="row">
    <div class="col q-gutter-md">
      <q-input
        color="green-5"
        label="Name"
        type="text"
        dense
        outlined
        v-model="name"
        :rules="[(val) => val.length > 0 || 'Enter a value']"
      />
      <q-input
        color="green-5"
        label="Cost"
        input-class="text-right"
        mask="#.##"
        dense
        outlined
        reverse-fill-mask
        v-model="cost"
        :rules="[val => val > 0 || 'Enter a value']"
      />
      <div class="column">
        <q-btn
          color="green-10"
          label="Confirm"
          type="submit"
          @click="AddHaircut"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
import { ref} from 'vue';
import api from '../httpclient';
import { Notify } from 'quasar';

export default {
  name: 'AddHaircut',
  setup () {
    const cost = ref(null);
    const name = ref('');

    const AddHaircut = (e) => {
      e.preventDefault();
      api.post('haircut', {
        name: name.value,
        cost: cost.value
      }).then(resp => {
        if(resp.status === 200) {
          Notify.create({
            message: 'Haircut Send Successful',
            color: 'positive'
          });
        }
      });
    }

    return {
      AddHaircut,
      cost,
      name
    }
  }
}
</script>
