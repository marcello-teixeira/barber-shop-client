<template>
   <q-input
        filled
        v-model="date"
        label="Date"
        :rules="verifyDate()"
        @focus="time = ''"
      >
        <template v-slot:prepend>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              @before-hide="getFullDateTime"
            >
              <q-date
                v-model="date"
                mask="YYYY-MM-DD"
              >
              <div class="column">
                  <q-btn
                    label="close"
                    color="primary"
                    v-close-popup
                  />
              </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-select
      filled
      v-model="time"
      :options="filteredHours"
      label="Hour"
      :rules="[val => val.length === 5]"
      v-show="date"
      @update:model-value="getTime(time)"
      >
          <q-popup-proxy>
            <template v-slot:option="scope">
                <q-item clickable>
                  <q-item-section>
                    <q-item-label>
                      {{ scope.opt }}
                    </q-item-label>
                    <q-separator />
                  </q-item-section>
                </q-item>
            </template>
          </q-popup-proxy>
      </q-select>
</template>

<script>
import {computed, ref, watch} from 'vue';

const companyHours = [
  '08:00', '08:30',
  '09:00', '09:30',
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

    const verifyDate = () => {
      const orderDate = new Date();

      const year = orderDate.getFullYear().toString();
      const monthCrude = orderDate.getMonth()+1;
      const month = monthCrude.toString().padStart(2, '0');
      const day = orderDate.getDate().toString().padStart(2, '0');

      const fullDate = `${year}-${month}-${day}`

      return [val => new Date(val) >= new Date(fullDate)];
    }

    const resetTime = () => {
      time.value = null;
    }

    const filteredHours = computed(() => {
      return companyHours.filter(hour => {

          const isOccupied = props.DateOrders.some(element => {
              const orderDate = new Date(element);

              const hours = orderDate.getHours().toString().padStart(2, '0');
              const minutes = orderDate.getMinutes().toString().padStart(2, '0');
              const fullHour = `${hours}:${minutes}`;

              const year = orderDate.getFullYear().toString();
              const month = String(orderDate.getMonth()+1).padStart(2, '0');
              const day = orderDate.getDate().toString().padStart(2, '0');

              const fullDate = `${year}-${month}-${day}`;

              return fullDate === date.value && fullHour === hour;
            });

          return !isOccupied;
      });
    });

    const getFullDateTime = () => {
      emit('get-fulldatetime', date.value, time.value);
    }

    watch(() => props.Date,
      (newVal)=>{
        date.value = newVal
        console.log(date.value);
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
      getFullDateTime,
      resetTime,
      filteredHours,
      date,
      time
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
