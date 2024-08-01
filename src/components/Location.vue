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
        <MapLocalition @send-coords="onSendCoords" v-bind:coordsCurrent="coords"/>
      </q-popup-proxy>
    </q-icon>

  </div>
</template>

<script>
import axios from 'axios';
import {onMounted, ref} from 'vue';
import MapLocalition from './Map.vue'

export default {
  name: 'LocationComponent',
  setup (_, {emit}) {
    const apiKey = 'f4f2114a92d941739d83d8dbdd6e53c1';
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

    const errorPosition = () =>{
      console.log('Error in get geolocation position');
    }

    const geolocationReverse = async(latArg, lonArg) => {
      try {

        if(latArg && lonArg) {
          const resp = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latArg}+${lonArg}&key=${apiKey}`);

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

    const sendLocation = () => {
        emit('send-location', clientLocation.value);
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
  mounted() {
    this.onSendCoords();
  },
  components: {
    MapLocalition
  }
}
</script>
