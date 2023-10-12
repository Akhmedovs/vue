import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
const cart = ref([]);
async function getCart(){
    const res = await fetch('http://localhost:3000/cart');
    const data = await res.json();
    cart.value = data
}
const like = ref([]);
async function getLike(){
    const res = await fetch('http://localhost:3000/like');
    const data = await res.json();
    like.value = data
}
const products = ref([])
async function getProducts(){
    const res = await fetch('http://localhost:3000/products')
    const data = await res.json()
    products.value = data
}
const cartItems = computed(()=> {
    let count = 0;
    cart.value.forEach(el => {
        count += el.quantity;
    });
    return count;
})
return { cart, getCart, cartItems, getProducts, products, getLike, like }
})

