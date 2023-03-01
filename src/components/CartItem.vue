<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <product-counter v-model.number="amount" />
    <b class="product__price">
      {{ price }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct(item.productId)"
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
      >
        <use xlink:href="#icon-close" />
      </svg>
    </button>
  </li>
</template>

<script>
import productCounter from '@/components/ProductCounter.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  components: { productCounter },
  props: ['item'],
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
  },
  computed: {
    price() {
      return numberFormat(this.item.product.price * this.item.amount);
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.item.productId,
          quantity: value,
        });
      },
    },
  },
};
</script>

<style scoped>

</style>
