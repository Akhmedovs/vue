<template>
  <div class="container">
    <ul>
      <li v-for="(image, i) in product.images" :key="i" @click="updateImg(i)">
        <img :src="image" alt="" width="120" />
      </li>
    </ul>
    <div class="img-wrapper">
      <img
        :src="image"
        alt=""
        width="600"
        height="560"
        style="margin: 0 auto; display: inline-block"
      />
      <button @click="addLike">
        <img class="like" src="../assets/img/svg/like.svg" alt="" />
      </button>
    </div>
    <div class="text-wrapper">
      <h1>{{ product.title }}</h1>
      <p>{{ product.category.name }}</p>
      <p>${{ product.price }}</p>
      <div class="size">
        <h4>{{ $t("size") }}</h4>
        <ul>
          <li class="point">XS</li>
          <li class="point">S</li>
          <li class="point">M</li>
          <li class="point">L</li>
          <li class="active point">XL</li>
          <li class="active point">XP</li>
        </ul>
        <h4>{{ $t("tsize") }}</h4>
      </div>
      <div class="color">
        <h4>{{ $t("color") }}</h4>
        <ul>
          <li class="white point"></li>
          <li class="red point"></li>
          <li class="blue point"></li>
          <li class="black point"></li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <button @click="addCart(product)" class="btnn">
          {{ $t("add-to-cart") }}
        </button>
        <button class="btn">{{ $t("buy") }}</button>
        <span
          ><p>{{ $t("change") }}</p>
          <p>{{ $t("pay") }}</p></span
        >
      </div>
      <h3>ИНФОРМАЦИЯ О ТОВАРЕ</h3>
      <p>{{ product.description }}</p>
    </div>
    <!-- <pre>{{ product }}</pre> -->
  </div>

  <div class="dress">
    <div class="container">
      <h1>Популярное</h1>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        loop="true"
        navigation
        :modules="modules"
        :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="p in cat" :key="p.id">
          <img :src="p.images[0]" alt="" width="400" height="500" />
          <router-link :to="{ name: 'product', params: { id: p.id } }"
            ><h2>{{ p.title }}</h2></router-link
          >
          <p>{{ p.category.name }}</p>
          <p>${{ p.price }}</p>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>


<script setup>
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { defineProps, ref, computed } from "vue";
import { useStore } from "../stores/store.js";
const store = useStore();
const { id } = defineProps(["id"]);
const product = ref({});
async function getProduct() {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  const data = await res.json();
  product.value = data;
  image.value = data.images[0];
}

const image = ref("");
getProduct();
function updateImg(i) {
  image.value = product.value.images[i];
}

const cat = computed(() => {
  return products.value.filter((p) => p.category.id === 1);
});
const products = ref([]);

async function getProductss() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await res.json();
  products.value = data;
}
getProductss();
store.getLike();

async function addLike() {
  store.getLike();

  let item = store.like.find((el) => el.id === product.value.id);
  if (item === undefined) {
    const res = await fetch("http://localhost:3000/like", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product.value),
    });
    const data = await res.json();
    console.log(data);
  } else {
    const res = await fetch("http://localhost:3000/like/" + item.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}

async function addCart(p) {
  let item = store.cart.find((el) => el.id === p.id);
  if (item === undefined) {
    const res = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...product.value,
        quantity: 1,
      }),
    });
    const data = await res.json();
    console.log(data);
  } else {
    if (item.stock > item.quantity) {
      const res = await fetch("http://localhost:3000/cart/" + item.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          quantity: (item.quantity += 1),
        }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      alert("Qomadiyu");
    }
  }
}
</script>

<style lang="scss" scoped>
.img-wrapper {
  position: relative;
  .like {
    padding: 15px 14px 13px 13px;
    position: absolute;
    bottom: 30px;
    right: 10px;
    background-color: #fff;
    border-radius: 50%;
  }
}

.point {
  cursor: pointer;
}
.container {
  display: flex;
  padding-top: 100px;
  ul {
    li {
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
  .text-wrapper {
    max-width: 600px;
    margin-left: 20px;
    h1 {
      margin-bottom: 17px;
      text-transform: uppercase;
    }
    p {
      margin-bottom: 10px;
    }
    button {
      text-align: center;
      padding: 14px 37px;
      border: 1px solid #0f303f;
      background-color: #fff;
      color: #0f303f;
      font-size: 20px;
      display: block;
    }
    .btn {
      max-width: 400px !important;
      background-color: #0f303f;
      padding: 14px 40px;
      color: #fff;
      transition: all 0.3s;
      &:hover {
        background-color: #fff;
        color: #0f303f;
      }
      &:active {
        color: #fff;
        background-color: #0f303f;
      }
    }
    .btnn {
      max-width: 400px !important;
      transition: all 0.3s;
      &:hover {
        background-color: #0f303f;
        color: #fff;
      }
      &:active {
        color: #0f303f;
        background-color: #fff;
      }
    }
    .btn-wrapper {
      margin-bottom: 20px;
      span {
        margin-top: 20px;
        display: flex;
        p {
          font-size: 14px;
          line-height: 24px;
          color: #0f303f;
          opacity: 0.3;
        }
        p:not(:last-child) {
          margin-right: 23px;
        }
      }
    }
    h3 {
      margin-bottom: 20px;
    }
    .size {
      ul {
        display: flex;
        li {
          padding: 8px 12px;
          border: 1px solid #eae9e8;
          font-size: 12px;
          line-height: 20px;
          transition: all 0.3s;
          &:hover {
            background-color: #eae9e8;
          }
        }
        .active {
          background-color: #eae9e8;
          color: #cec6c4;
          transition: all 0.3s;
          &:hover {
            background-color: #fff;
          }
        }
      }
      h4 {
        margin-bottom: 10px;
      }
    }
    .color {
      h4 {
        margin-bottom: 10px;
      }
      ul {
        display: flex;
        li {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          transition: all 0.3s;
          &:hover {
            transform: scale(1.2);
          }
        }
        .white {
          border: 1px solid #eae9e8;
        }
        .red {
          background-color: #ff0000;
        }
        .blue {
          background-color: #1931aa;
        }
        .black {
          background-color: #000000;
        }
      }
    }
  }
}
.dress {
  .container {
    display: block;
    h1 {
      display: block;
    }
    h2 {
      text-align: center;
      text-transform: uppercase;
      font-size: 18px;
      line-height: 24px;
      margin-top: 30px;
      margin-bottom: 5px;
    }
  }
}
</style>