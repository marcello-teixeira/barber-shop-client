<template>
  <div>
    <div id="map" @click="sendCoords"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default {
  name: 'MapComponent',
  setup (props,{ emit }) {
    const marker = ref(null);
    const coords = ref({
      lon: '',
      lat: ''
    });

    const initMap = () => {
      if (!props.coordsCurrent) {
        console.error('coordsCurrent prop is required');
        return;
      }

      // Map style from OpenStreetMap
      const map = new maplibregl.Map({
        container: 'map',
        style: {
        "version": 8,
        "sources": {
          "osm-tiles": {
            "type": "raster",
            "tiles": [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            "tileSize": 256
          }
        },
          "layers": [
            {
              "id": "osm-tiles",
              "type": "raster",
              "source": "osm-tiles",
              "minzoom": 0,
              "maxzoom": 19
            }
          ]
        },
        center: [props.coordsCurrent.longitude, props.coordsCurrent.latitude],
        zoom: 5
      })

      map.on('click', (e) => {
        if(marker.value) {
          marker.value.remove();
        }
        marker.value = new maplibregl.Marker().setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map);

        coords.value = {
          lon: e.lngLat.lng,
          lat: e.lngLat.lat
        }
      });
    }

    const sendCoords = () => {
      emit('send-coords', coords.value);
    }

    onMounted(()=> {
      initMap();
    })

    return {
      sendCoords
    }
  },
  props: {
    coordsCurrent: {
      type: Object,
      required: true
    }
  }


}

</script>


<style>
#map {
  width: 300px;
  height: 300px;

  min-width: 70px;
  min-height: 70px;
}
</style>
