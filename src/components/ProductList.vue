<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="(product, index) in products"
      :key="product.id + '_product'"
      :product="product"
      :index="index"
      :f-color="filteredColor"
    />
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: {
    products: {
      type: Array,
      default: null,
    },
    filteredColor: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>

</style>
