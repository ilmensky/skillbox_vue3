<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item
              v-for="(item, key) in products"
              :key="key+'item'"
              :item="item"
            />
          </ul>
        </div>
        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPriceFormat }} ₽</span>
          </p>
          <router-link
            v-slot="{navigate}"
            :to="{name: 'cartOrder'}"
            custom
          >
            <button
              class="cart__button button button--primery"
              type="button"
              @click="navigate"
            >
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/CartItem.vue';

export default defineComponent({
  name: 'CartPage',
  components: { CartItem },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
    totalPriceFormat() {
      return numberFormat(this.totalPrice);
    },
  },
});
</script>

<style scoped>

</style>
