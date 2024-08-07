<template>
   <q-input
        filled
        v-model="date"
        label="Date"
        :rules="verifyDate()"
        @input="console.log('ok')"

      >
        <template v-slot:prepend>
          <q-icon
          name="event"
          class="cursor-pointer"
          @click="showPopupDate = true"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
                mask="YYYY-MM-DD"
              >
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-select
      filled
      v-model="time"
      :options="hours"
      label="Hour"
      :rules="[val => val.length > 0]"
      v-show="date"
      >
        <template v-slot:option="scope"
        >
            <q-item clickable v-show="isTimeAvaliable(scope.opt)">
              <q-item-section @click="getfullDateTime(scope.opt)">
                <q-item-label>
                  {{ scope.opt }}
                </q-item-label>
              </q-item-section>
            </q-item>
        </template>
      </q-select>
</template>

<script>
import {ref, watch} from 'vue';

const hours = [
  '8:00', '8:30',
  '9:00', '9:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00'
];

export default {
  name: 'DateOrder',
  setup (props, {emit}) {
    const date = ref('');
    const time = ref('');
    const showPopupDate = ref(false);

    const verifyDate = () => {
      const ObjectDate = new Date();

      const year = ObjectDate.getFullYear().toString();
      const monthCrude = ObjectDate.getMonth()+1;
      const month = monthCrude.toString().padStart(2, '0');
      const day = ObjectDate.getDate().toString().padStart(2, '0');

      const fullDate = `${year}-${month}-${day}`

      return [val => new Date(val) >= new Date(fullDate)];
    }


    const isTimeAvaliable = (datetime) => {
      const formattedTime = datetime.padStart(5, '0');

      return !props.DateOrders.some(orderDate => {
        const objectDate = new Date(orderDate);
        const hours = objectDate.getHours().toString().padStart(2, '0');
        const minutes = objectDate.getMinutes().toString().padStart(2, '0');

        const year = objectDate.getFullYear().toString();
        const monthCrude = objectDate.getMonth()+1;
        const month = monthCrude.toString().padStart(2, '0');
        const day = objectDate.getDate().toString().padStart(2, '0');

        if (`${year}-${month}-${day}` === date.value){
          return `${hours}:${minutes}` === formattedTime;
        }
      });
    }

    const getfullDateTime = (datetime) => {
      time.value = datetime.padStart(5,'0');
      emit('get-fulldatetime', date.value, time.value);
    }

    watch(() => props.Date,
      (newVal)=>{
        date.value = newVal
      },
      {
        immediate:true
      }
    );

    watch(() => props.Time,
      (newVal)=>{
        time.value = newVal
      },
      {
        immediate:true
      }
    );

    return {
      verifyDate,
      getfullDateTime,
      isTimeAvaliable,
      hours,
      date,
      time,
      showPopupDate
    }
  },
  emits: [
    'get-fulldatetime'
  ],
  props: {
    DateOrders: {
      type: Array,
      required: true
    },
    Date: {
      type: String,
      required: true
    },
    Time: {
      type: String,
      required: true
    }
  }
}
</script>
