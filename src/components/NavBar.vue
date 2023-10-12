<template>
  <div class="header">
    <div class="container">
      <router-link :to="{name: 'home'}" class="site-logo">
        <img src="@/assets/img/svg/logo.svg" alt="">
      </router-link>

      <ul class="nav">
        <li><a href="#">{{ $t("man") }}</a></li>
        <li><a href="#" class="activ">{{ $t('woman') }}</a></li>
        <li>
          <label for="search">{{ $t('search') }}</label>
          <input type="text">
        </li>
      </ul>

      <div class="change">
        <div class="lenguage">
          <ul>
            <li><p class="active">Ru</p></li>
            <li><p>Ua</p></li>
            <li><p>En</p></li>
            <select v-model="$i18n.locale" class="mb-4 mt-4">
              <option value="en">EN</option>
              <option value="ua">UE</option>
              <option value="ru">RU</option>
            </select>
          </ul>
        </div>
        <div class="cart">
          <ul>
            <li><img src="@/assets/img/png/human.png" alt=""></li>
            <li>
              <router-link :to="{name:'like'}">
              <img class="white" src="@/assets/img/png/like.png" alt="">
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'cart'}">
                <img src="@/assets/img/png/cart.png" alt="">
              </router-link>
            </li>
            <li><img class="bars" src="@/assets/img/svg/bars.svg" alt=""></li>
            <li><img class="exit" src="@/assets/img/svg/exit.svg" alt=""></li>
          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>

</script>