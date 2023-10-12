<template>
  <div class="hero">
    <swiper :slides-per-view="1" :space-between="0" :loop="true" navigation :modules="modules"
      :pagination="{ clickable: true }">
      <swiper-slide class="hero-slide" v-for="(s, i) in hero" :key="i">
        <img :src="s.img" alt="">
      </swiper-slide>
    </swiper>
  </div>

  <div class="arrival">
        <div class="container">
            <div class="arriv">
                <h1>new <br> arrival</h1>
                <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ipLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ip</p>
                <a href="#">Смотреть коллекцию</a>
            </div>
            <div class="new">
                <div class="white">
                    <div class="bg-img">
                        <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ip</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  <div class="dress">
    <div class="container">
      <h1>{{ $t('popular') }}</h1>
      <swiper :slides-per-view="4"
    :space-between="50">
        <swiper-slide v-for="p in cat" :key="p.id">
          <img :src="p.images[0]" alt="" width="300" height="400">
          <router-link :to="{name: 'product', params:{id: p.id}}">{{p.title}}</router-link>
          <p> {{ p.category.name }}</p>
          <p>${{ p.price }}</p>
        </swiper-slide>
      </swiper>
    </div>
    <div class="allegria-wrapper">
      <span></span>
      <!-- <img src="./img/png/allegria.png" alt=""> -->
      <span></span>
    </div>
  </div>

  <div class="about">
        <div class="container">
            <div class="text-wrapper">
                <h1><span>О</span> <br> нас</h1>
                <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLoreLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipLorem ipsumLoremLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ipsumLorem ipsumLorem </p>
            </div>
            <div class="img-wrapper">
                <img class="round" src="@/assets/img/png/round.png" alt="">
                <img class="hr" src="@/assets/img/png/hr.png" alt="">
                <img class="style" src="@/assets/img/png/style.png" alt="">
            </div>
        </div>
    </div>

</template>

<script setup>
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ref, computed } from 'vue';
const modules = [Navigation, Pagination]
const hero = ref([
  {
    img: 'https://source.unsplash.com/random/1'
  },
  {
    img: 'https://source.unsplash.com/random/2'
  },
  {
    img: 'https://source.unsplash.com/random/3'
  }
]);
const cat = computed(() => {
  return products.value.filter(p => p.category.id === 4);
})
const products = ref([]);

async function getProducts() {
  const res = await fetch('http://localhost:3000/products');
  const data = await res.json();
  products.value = data;
}

async function addCart(p) {
  let item = store.cart.find(el => el.id === p.id);
  if (item === undefined) {
    const res = await fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...p,
        quantity: 1
      })
    });
    const data = await res.json();
    console.log(data);
  } else {
    if (item.stock > item.quantity) {
      const res = await fetch('http://localhost:3000/cart/' + item.id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          ...p,
          quantity: item.quantity += 1
        })
      });
      const data = await res.json();
      console.log(data);
    } else {
      alert('Qomadiyu')
    }
  }
}

getProducts();
</script>
