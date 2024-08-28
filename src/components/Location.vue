<template>
  <div class="q-gutter-md q-pa-sm">
    <q-btn
    color="green"
    push
    label="Find me"
    @click="sendLocation"
    />

    <q-icon
    color="light-green-8"
    name="map"
    class="cursor-pointer"
    size="md"
    >
      <q-popup-proxy
        cover
        transition-show="scale"
        transition-hide="scale"
        class="bg-grey-5"
        >
        <MapLocalition
          @send-coords="onSendCoords"
          :coordsCurrent="coords"/>
      </q-popup-proxy>
    </q-icon>

  </div>
</template>

<script>
import api from 'src/httpclient';
import {onMounted, ref} from 'vue';
import MapLocalition from './Map.vue'

export default {
  name: 'LocationComponent',
  setup (_, {emit}) {
    const coords = ref('');
    const clientLocation = ref({
      city: '',
      country: '',
      postcode: '',
      road: ''
    })

    const getPosition = (position) => {
      coords.value = position.coords;

      geolocationReverse(coords.value.latitude, coords.value.longitude);
    }

    const errorPosition = () => {
      console.log('Error in get geolocation position');
    }

    // Try sending latitude and longitude to API to return the location
    const geolocationReverse = async(latArg, lonArg) => {
      try {
        if(latArg && lonArg) {
          const resp = await api.post('geolocation', {
            latitude: `${latArg}`,
            longitude: `${lonArg}`
          });

          clientLocation.value = {
            city: resp.data.results[0].components.city,
            country: resp.data.results[0].components.country,
            postcode: resp.data.results[0].components.postcode,
            road: resp.data.results[0].components.road
          }

        }
      } catch (er) {
        console.error(er);
      }
    }

    // Send location to AddOrder
    const sendLocation = () => {
        setTimeout(() => {
          emit('send-location', clientLocation.value);
        }, 500);
      }

    onMounted(() => {
        if(!navigator.geolocation) {
            alert('Your geolocation is not avaliable');
            return;
          }

        navigator.geolocation.getCurrentPosition(getPosition, errorPosition);
      });

      return {
        clientLocation,
        coords,
        sendLocation,
        geolocationReverse

      }
    },
    methods: {
      onSendCoords(data) {
        if(data !== undefined) {
          this.geolocationReverse(data.lat, data.lon);
          this.sendLocation();
        }
      }
  },
  created() {
    this.onSendCoords();
  },
  components: {
    MapLocalition
  }
}
</script>
