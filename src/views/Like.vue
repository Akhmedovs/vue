<template>
    <div class="container">
        <div class="just">
    <div v-for="p in store.like" :key="p.id" class="container" >
      <div class="wrapper" >
        <img :src="p.images" alt="" width="200" />
        <div class="text-wrapper">
          <h1>{{ p.title }}</h1>
          <p>{{ p.category.name }}</p>
          <p>${{ p.price * p.quantity }}</p>
          <button class="btnn" @click="addCart()">{{ $t('add-to-cart') }}</button>
        </div>
        <button @click="del(p)" class="btn">x</button>
      </div>
    </div>
  </div>
    </div>
</template>

<script setup>
import { useStore } from "@/stores/store.js";
const store = useStore();
store.getProducts();
store.getCart();
store.getLike()

async function del(p) {
  const res = await fetch("http://localhost:3000/cart/" + p.id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  store.getCart();
}
async function addCart(p) {
    store.getCart();
    let item = store.cart.find(el => el.id === p.id);
    if (item === undefined) {
        const res = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ...product.value,
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
            ...item,
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
.btnn{
    background-color:mistyrose;
    padding: 12px 24px;
    border-radius: 10px;
}
.wrapper {
  margin: 0;
  position: relative;
  max-width: 900px;
  background-color: darkgrey;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  margin-bottom: 80px;
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