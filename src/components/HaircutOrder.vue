<template>
   <div class="row" >
        <q-select
        class="col"
          label="Haircut"
          :options="Haircuts"
          outlined
          filled
          option-label="name"
          option-value="id"
          v-model="selecthaircut"
          :rules="[val => val.name !== undefined ]"
        >
          <template v-slot:option="scope">
            <q-item clickable @click="getHaircuts(scope.opt)">
              <q-item-section  >
                <q-item-label >
                  {{ scope.opt.name }}
                </q-item-label>
                <q-item-section caption >
                  {{ "$"+scope.opt.cost}}
                </q-item-section>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-item  class="select-haircut">
          <q-item-section>
            <q-item-label>
              {{ "$ "+ (selecthaircut.cost || '')}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

</template>

<script>
import {ref} from 'vue';

export default {
  name: 'HaircutOrder',
  setup (_,{emit}) {
    const selecthaircut = ref('');

    const getHaircuts = (haircut) => {
      selecthaircut.value = haircut;
      emit('get-haircuts-company', haircut);
    }

    return {
      selecthaircut,
      getHaircuts
    }
  },
  props: {
    Haircuts: {
      type: Array,
      required: true
    }
  },
  emits: [
    'get-haircuts-company'
  ]
}
</script>
