<template>
  <nav-bar/>
  <router-view/>
  <footer-el/>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import footerEl from './components/footerEl.vue';
// const store = useProductStore();
// store.getProducts()

</script>