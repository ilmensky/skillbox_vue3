<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{name: 'product', params: {id: product.id}}"
    >
      <img
        :alt="product.title"
        :src="product.image"
      >
    </router-link>

    <h3 class="catalog__title">
      <a
        href="#"
        @click.prevent="openQuickView(product.id)"
      >
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ productPrice }} ₽
    </span>

    <ul class="colors colors--black">
      <li
        v-for="(c, key) in product.color_ids"
        :key="key+'_item_c_'+ index"
        class="colors__item"
      >
        <label
          :for="c + '_color_' + index"
          class="colors__label"
        >
          <input
            :id="c + '_color_' + index"
            v-model="color"
            class="colors__radio sr-only"
            :checked="colors[c - 1].checked"
            type="radio"
            :value="colors[c - 1].value"
          >
          <span
            class="colors__value"
            :style="{backgroundColor: colors[c - 1].value}"
          />
        </label>
      </li>
    </ul>
  </li>

  <base-modal v-model:open="isQuickViewOpen">
    <product-quick-view :product-id="currentProductId" />
  </base-modal>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import colors from '@/data/colors';
import numberFormat from '@/helpers/numberFormat';
import baseModal from '@/components/BaseModal.vue';
// import ProductQuickView from '@/components/ProductQuickView.vue';
import { defineAsyncComponent, h } from 'vue';

export default {
  name: 'ProductItem',
  components: {
    baseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Loading...'),
    }),
  },
  props: ['product', 'index', 'fColor'],
  data() {
    return {
      color: '',
      fColor2: null,
      currentProductId: null,
    };
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
    productPrice() {
      return numberFormat(this.product.price);
    },
    colors() {
      return colors;
    },
  },
  watch: {
    fColor: {
      handler(value) {
        this.fColor2 = value;
        if (value > 0) {
          this.color = colors[value - 1].value;
        } else {
          this.color = '';
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    gotoPage,
    openQuickView(productId) {
      this.currentProductId = productId;
      this.isQuickViewOpen = true;
    },
    closeQuickView() {
      this.currentProductId = null;
      this.isQuickViewOpen = false;
    },
  },
};
</script>

<style scoped>

</style>
