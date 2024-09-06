<template>
  <q-page-container>
    <q-page padding>
      <div class="align">
        <div
          class="col-2 image-container"
          @click="isVisibleEdit = !isVisibleEdit"
        >
          <img class="image-profile" :src="photoURL" alt="Profile Photo">
        </div>
        <div class="col-3 container-info">
          <div v-for="(info, key) in infoClient" :key="key" v-show="key !== 'id' && key !== 'photo' && key != 'avaliableAgenda' && key != 'password'">
             <p class="title-info">
              {{ `${key}`.toUpperCase() }}
             </p>
             <p class="info">
               {{ info }}
             </p>
          </div>
          <div v-show="isVisibleEdit">
            <q-file
              outlined
              label="Photo"
              v-model="profilePicture"
              class="q-pa-sm change-photo"
              @update:model-value="changePhoto"
            >
              <template v-slot:prepend>
                  <q-icon
                    name="person"
                  />
              </template>
              <template v-slot:append>
                <q-icon
                  name="clear"
                  class="cursor-pointer"
                  @click="isErasePhoto"
                />
              </template>
            </q-file>
          </div>
          <div class="column items-start q-mt-lg">
            <q-btn
                  color="primary"
                  label="SAVE"
                  size="md"
                  @click="confirmEdit"
                  :disable="!isFillEdit"
                />
          </div>
        </div>

      </div>

    </q-page>
  </q-page-container>
</template>

<script>
import {onMounted, ref} from 'vue';
import {getProfilePicture} from '../httpclient';
import api from '../httpclient';
import components from '../dataregister';

export default {
  name: 'SettingsPage',
  setup() {
    const photoURL = ref('');
    const profilePicture = ref([]);
    const isVisibleEdit = ref(false);
    const isFillEdit =ref(false);
    const infoClient = ref({});
    const clientRole = ref('');

    // Get URL profile image
    const getPhoto = async () => {
      photoURL.value = await getProfilePicture();
    }

    // Confirm the profile photo choosen, and send it to API.
    const confirmEdit = () => {
      const photo = new FormData();
      photo.append('Photo', profilePicture.value);

      try {
        api.patch(`${clientRole.value}/patch-photo`,
        photo,
        {
          headers: {
            'Contente-type': 'multipart/form-data',
            'accept': '*/*'
          }
        }).then(
          _ =>
        {

          getPhoto();
          location.reload();
        });

      } catch (e) {
        console.log(e);
      }
    }

    // Change the profile photo, but not send it to API.
    const changePhoto = () => {
      if (profilePicture.value != null) {
        photoURL.value = URL.createObjectURL(profilePicture.value);
      }
      isFillEdit.value = true;
    }

    const isErasePhoto = () => {
      profilePicture.value = null;
      isFillEdit.value = false;
    }

    const getInfoClient = () => {
      api.get(`${clientRole.value}/own`).then(resp => infoClient.value = resp.data);
    }

    onMounted(() => {
      clientRole.value = localStorage.getItem('role');
      getPhoto();
      getInfoClient();
    })

    return {
      photoURL,
      profilePicture,
      isVisibleEdit,
      isFillEdit,
      infoClient,
      components,
      confirmEdit,
      changePhoto,
      isErasePhoto
    }
  },
}
</script>

<style scoped>

.image-profile{
  width: 350px;
  height: 350px;
}

.image-container {
  position: relative;
  width: 350px;
  height: 350px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
}

.image-container::after {
  content: 'CHOOSE PHOTO';
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 350px;
  height: 100px;
  top: 72%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.753);
  color: #ffffffc2;
}

.title-info {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0;
}

.info {
  font-size: 1rem;
}

.align{
  display: flex;
  place-content: center;
}

@media (orientation: portrait) and (max-width: 640px) {
  .image-profile, .image-container{
    width: 150px;
    height: 150px;
  }

  .image-container::after {
    width: 150px;
    height: 30px;
    font-size: 10px;
  }

  .title-info {
    font-weight: bold;
    margin-bottom: 0;
    width: 270px;
  }

  .align {
    align-items: center;
    flex-direction: column;
  }

  .change-photo {
    width: 70%;
  }

  .container-info {
    align-self: start;
    padding-left: 50px;
  }

}

</style>
