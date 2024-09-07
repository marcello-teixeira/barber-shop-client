<template>
  <q-page-container >
    <q-page class="row" v-show="show">
      <div class="col-12">
        <div class="title-page" v-show="titlePageShow">
          <h1>BARBSHOP</h1>
          <p id="first-phase">
            The best page to manage your barbershop,
          </p>
          <p id="second-phase">
            or find your new style.
          </p>
        </div>
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          class="carousel"
        >
          <q-carousel-slide :name="1" img-src="/img/carousel-one.jpg" />
          <q-carousel-slide :name="2" img-src="/img/carousel-two.jpg" />
          <q-carousel-slide :name="3" img-src="/img/carousel-three.jpg" />
          <q-carousel-slide :name="4" img-src="/img/carousel-four.jpg" />
        </q-carousel>
      </div>

      <div class="col-12" >
        <h2 class="items-center column title-plan">
          Only For Companies
        </h2>
      </div>

      <div class="col-12 plan-container">
        <div>
          <q-list class="flex flex-center list-plan">
            <q-item
            :style="{outline: `3px solid ${plan.features.bg_color}`}"
              v-for="(plan, index) in plans"
              :key="index"
              class="container-prices column"
            >
              <q-item-section :style="{backgroundColor: plan.features.bg_color}" class="plan-name">
                <q-item-label>{{ plan.name }}</q-item-label>
              </q-item-section>
              <q-item-section class="plan-price">
                <q-item-label
                :style="{color: plan.features.bg_color}">
                  {{ "$" + plan.price[0] + plan.price[1] }}
                  <q-item-label caption class="price-caption">
                    {{ plan.price[2] + plan.price[3] + plan.price[4] }}
                  </q-item-label>
                </q-item-label>
              </q-item-section>
              <q-item-section
                v-for="(feature, key) in plan.features"
                :key="key"
              >
                <q-item-label v-if="key !== 'bg_color'" class="plan-feature">
                    <div>
                        {{ feature.type }}
                        <q-icon
                        :name="feature.access ? 'check_circle' : 'cancel'"
                        :color="feature.access ? 'green' : 'red'"
                        size="lg"
                        />
                    </div>
                    <q-separator style="background-color:#000 ;"/>
                  </q-item-label>
              </q-item-section>
              <q-item-section class="row items-center">
                <q-btn
                  label="BUY NOW"
                  color="green"
                  size="lg"
                  class="btn-plan"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="col-12 banner-text" >
        <div class="row">
          <q-img
          class="col banner-img"
          src="/img/banner-home.jpg"
          alt="Banner Barber Info"/>
          <div class="col text-banner-home">
              <h2>
                About us
              </h2>
              <p>
                We work to provide best user experience in a barbershop  businness. You'll have a complete system for managing and centralizing customers.
              </p>
              <p>
                You a customer? Can now get find new barbers close you. Don't waste time, create an account <a href="#/register">now</a>.
              </p>
              <a href="#/register"><iconBarb :Path="'/view/register'" /></a>
          </div>
        </div>
      </div>
    </q-page>

  </q-page-container>
</template>

<script>
import { onMounted, ref } from 'vue'
import IconBarb from 'src/components/IconBarb.vue'


const plans = [
  {
    name: 'START',
    price: '15,99',
    features: {
      companyAccount: {
        access: true,
        type: 'Company Account'
      },
      preferenceSupport: {
        access: false,
        type: 'Preference Support'
      },
      largeStorage: {
        access: false,
        type: 'Large Storage'
      },
      bg_color: '#65267e',
    },
  },
  {
    name: 'MEDIUM',
    price: '17,99',
    features: {
      companyAccount: {
        access: true,
        type: 'Company Account'
      },
      preferenceSupport:{
      access:   true,
      type: 'Preference Support'
      },
      largeStorage: {
        access: false,
        type: 'Large Storage'
      },
      bg_color: 'grey',
    },
  },
  {
    name: 'PRO',
    price: '18,99',
    features: {
      companyAccount: {
        access: true,
        type: 'Company Account'
      },
      preferenceSupport:{
      access:   true,
      type: 'Preference Support'
      },
      largeStorage: {
        access: true,
        type: 'Large Storage'
      },
      bg_color: 'orange',
    },
  },
]

export default {
  components: { IconBarb },
  name: 'HomePage',
  setup() {
    const slide = ref(3)
    const titlePageShow = ref(false)
    const show = ref(false);

      const loopCarousel = async () => {
      slide.value++;
      if(slide.value > 4) {
          slide.value = 1;
        }
    }

    onMounted(() => {
      titlePageShow.value = true
      show.value = true;
      setInterval(loopCarousel, 5000);
    })

    return {
      slide,
      titlePageShow,
      plans,
      show
    }
  }

}
</script>

<style scoped>
.text-banner-home {
  background: #2f3030;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
}

.text-banner-home p{
  font-size: 2rem;
  padding: 2%;
  color: #ffffff8a;
  margin: auto;
}

.text-banner-home a{
  text-decoration: none;
  color: #10a596;
}

.text-banner-home a:visited{
  color: #10a596;
}

.carousel {
  height: 94vh;
  position: relative;
  margin-bottom: 3%;
}

.plan-features {
  position: relative;
  align-self: flex-end;
  top: 36%;
  left: 23%;
}

.feature-item {
  padding: 5%;
  margin-bottom: 15.5%;
  background-color: #2A645E;
  color: #fff;
  width: 200px;
  font-size: 18px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.container-prices {
  display: block;
  border-radius: 15px;
  margin: 15px;
  width: auto;
  transition: 0.5s;
  font-size: 25px;
  background-color: #fff;
  padding: 0;
  overflow: hidden;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.plan-container {
  position: relative;
  margin-bottom: 5%;
}

.plan-name,
.plan-price {
  font-size: 2.5rem;
  position: relative;
  text-align: center;
  padding: 15% 0;
  margin: 0;
}

.plan-name {
  padding: 10%;
}

.plan-price {
  font-size: 3.5rem;
}

.price-caption {
  position: absolute;
  top: 35%;
}

.plan-feature {
  text-align: center;
  padding-bottom: 19%;
  margin: 0 15px;
}

.btn-plan {
  width: 130px;
  margin-bottom: 5%;
}

.title-page {
  position: absolute;
  color: #fff;
  z-index: 1;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background: #000000b9;
  left: 6%;
  padding: 15px;
  overflow: hidden;
}

.title-page h1 {
  position: relative;
  margin-top: 0;
  color: transparent;
  animation: fadeIn 0.5s 0.8s forwards;
}

.title-page h1::before {
  content: '';
  position: absolute;
  height: 6px;
  background-color: transparent;
  top: 90%;
  left: 0;
  animation: fadeDecoration .5s 1.3s ease forwards;
}

.title-page h1::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 100px;
  top: 5%;
  left: 0;
  background-color: transparent;
  animation: showText 1.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
}

.title-page p {
  width: 20vw;
  font-size: 23px;
  left: 15%;
}

#first-phase {
  color: transparent;
  animation: fadeIn 0.5s 1.3s forwards;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all .3s ease;
}

#first-phase::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 35px;
  top: 60%;
  left: 0;
  background-color: transparent;
  animation: showText 1.5s 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
}

#second-phase {
  color: transparent;
  animation: fadeIn 0.5s 1.7s forwards;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all .3s ease;
}

#second-phase::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 35px;
  top: 77%;
  left: 0;
  background-color: transparent;
  animation: showText 1.5s 0.9s cubic-bezier(0.85, 0, 0.15, 1) forwards;
}

.banner-text {
  box-shadow: 0px -5px 5px #00000068;
}

@keyframes fadeDecoration {
  to {
    background-color: rgb(206, 102, 17);
  }
}

@keyframes showText {
  from {
    transform: translateX(-100%);
    background-color: #d1d1d1;
  }
  to {
    transform: translateX(150%);
    background-color: #000;
  }
}

@keyframes fadeIn {
  to {
    color: #fff;
  }
}

@media (max-width: 640px){
  .title-page h1 {
    font-size: 3rem;
    width: 250px;
  }
  .title-page h1::before {
    content: '';
    position: absolute;
    width: 230px;
    height: 6px;
    background-color: transparent;
    top: 90%;
    left: 0;
    animation: fadeDecoration .5s 1.3s ease forwards;
  }

  .price-caption {
    left: 66%;
  }

  #first-phase,  #second-phase{
    font-size: 1.5rem;
    width: 330px;
  }

  .title-plan{
    font-size: 2rem;
  }

  .banner-img {
    display: none;
  }

  .text-banner-home {
    width: auto;
  }

  .text-banner-home p {
    width: 400px;
  }

  .list-plan {
    display: block;
  }

  .plan-container {
    display: flex;
    place-content: center;
  }

  .title-page {
    top: 5%;
  }

  .title-page:hover #first-phase, .title-page:hover #second-phase {
    text-decoration-color: transparent;
  }

}

@media (max-width: 400px) {
  .text-banner-home p {
    width: 300px;
  }

  #first-phase,  #second-phase{
    font-size: 1.5rem;
    width: 250px;
  }
}


@media (max-height:	450px) {
  .title-page {
    top: 0%;
  }
}

@media (min-width:	640px) {
  .title-page h1 {
    font-size: 4rem;
    width: 250px;
  }

  .title-page h1::before {
    content: '';
    position: absolute;
    width: 330px;
    height: 6px;
    background-color: transparent;
    top: 90%;
    left: 0;
    animation: fadeDecoration .5s 1.3s ease forwards;
  }

  #first-phase,  #second-phase{
    font-size: 1.5rem;
    width: 450px;
  }

  .price-caption {
    left: 66%;
  }

  .title-page:hover #first-phase, .title-page:hover #second-phase {
    text-decoration-color: rgb(206, 102, 17);
  }
}

@media (min-width: 1000px) or (min-height: 1000px) {
  .title-page {
    top: 5%;
  }
}

</style>
