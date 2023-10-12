<template>
  <div class="just">
    <div v-show="store.cart.length" v-for="p in store.cart" :key="p.id" class="container" >
      <div class="wrapper" >
        <img :src="p.images" alt="" width="200" />
        <div class="text-wrapper">
          <h1>{{ p.title }}</h1>
          <p>{{ p.category.name }}</p>
          <p>${{ p.price * p.quantity }}</p>
          <div class="quant">
            <button @click="inc(p)">+</button>
            <p>{{ p.quantity }}</p>
            <button @click="dec(p)">-</button>
          </div>
        </div>
        <button @click="del(p)" class="btn">x</button>
      </div>
    </div>
  </div>
  <div v-show="!store.cart.length" class="nothing">
    <div class="container">
      <div class="del-wrap">
        <h1>{{ $t('cart') }}</h1>
        <img src="../assets/img/png/noCart.png" alt="" class="deleted" />
        <img src="../assets/img/png/no-cart-bg.png" alt="" class="del-bg" />
        <p>{{ $t('add') }}</p>
        <button>
          <router-link :to="{name: 'home'}">
            {{ $t('to') }}
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/stores/store.js";
const store = useStore();
store.getProducts();
store.getCart();

async function inc(p) {
  const res = await fetch("http://localhost:3000/cart/" + p.id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...p,
      quantity: (p.quantity += 1),
    }),
  });
}
async function dec(p) {
  const res = await fetch("http://localhost:3000/cart/" + p.id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...p,
      quantity: (p.quantity -= 1)
    }),
  });
}
async function del(p) {
  const res = await fetch("http://localhost:3000/cart/" + p.id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  store.getCart();
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.just{
  padding-top: 100px;
  margin-bottom: 100px;

}
.wrapper {
  margin: 0;
  position: relative;
  max-width: 900px;
  background-color: darkgrey;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  img {
    margin-right: 20px;
  }
  .btn {
    right: 30px;
    font-size: 25px;
    position: absolute;
    border: none;
    display: inline-block;
    height: 0;
  }
  .text-wrapper {
    h1 {
      margin-bottom: 10px;
    }
    p {
      font-size: 20px;
      margin-bottom: 8px;
    }
  }
  .quant {
    p {
      font-size: 20px;
    }
    gap: 10px;
    display: flex;
    button {
      border: 1px solid;
      padding: 4px 10px;
      border-radius: 3px;
      outline: none;
      font-size: 18px;
      background-color: grey;
      color: white;
    }
  }
}
.nothing {
  padding: 160px 0;
  border: 0 !important;

.del-wrap {
    p{
        margin-top: 45px;
        text-align: center;
        margin-bottom: 19px;
    }
    width: 100%;
    .del-bg{
        margin-bottom: -10px;

    }
    h1 {
        margin-bottom: 75px;
        font-size: 25px;
        font-weight: 500;
        line-height: 25px;
        letter-spacing: 0.03em;
        text-align: center;
        text-transform: uppercase;
    }
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    }
    button {
        background: #f5f5f5;
        font-size: 40px;
        font-weight: 200;
        font-size: 16px;
        font-weight: 800;
        text-transform: uppercase;
        cursor: pointer;
        padding: 15px 25px;
        router-link{
          color: #fff;  
        }
        letter-spacing: 1px;
        transition: all .3s;
            &:hover{
              opacity: 0.6;
            }
            &:active{
              opacity: 0.8;
            }
    }
}
</style>