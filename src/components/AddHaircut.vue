<template>
  <q-form class="row">
    <div class="col-md-1 q-gutter-md">
      <h5 style="margin-bottom: 0px;">
        Haircut
      </h5>
      <q-input
        color="green-5"
        label="Name"
        type="text"
        dense
        v-model="name"
        :rules="[(val) => val.length > 0 || 'Enter a value']"
      />
      <q-input
        color="green-5"
        label="Cost"
        input-class="text-right"
        mask="#.##"
        reverse-fill-mask
        unmasked-value
        v-model="cost"
        :rules="[val => val > 0 || 'Enter a value']"
      />
      <div class="column">
        <q-btn
          color="green-5"
          label="Confirm"
          type="submit"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
import {ref} from 'vue';

export default {
  name: 'AddHaircut',
  setup () {
    return {
      cost: ref(null),
      name: ref('')
    }
  }
}
</script>
