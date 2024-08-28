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
          @update:model-value="getHaircuts()"
        >
          <q-popup-proxy>
            <template v-slot:option="scope">
              <q-item clickable >
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
          </q-popup-proxy>
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
import {ref, watch} from 'vue';

export default {
  name: 'HaircutOrder',
  setup (props,{emit}) {
    const selecthaircut = ref('');

    // Select haircut and send to component AddOrder
    const getHaircuts = () => {
      emit('get-haircuts-company', selecthaircut.value);
    }

    watch(() => props.ChooseHaircut,
          (newVal) => {
            selecthaircut.value = newVal;
          },
          {
            immediate: true
          }
      );

    return {
      selecthaircut,
      getHaircuts
    }
  },
  props: {
    Haircuts: {
      type: Array,
      required: true
    },
    ChooseHaircut: {
      Type: Object,
      require: true
    }
  },
  emits: [
    'get-haircuts-company'
  ]
}
</script>
