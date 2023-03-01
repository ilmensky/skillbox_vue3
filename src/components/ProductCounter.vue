<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click="countMinus"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-minus" />
      </svg>
    </button>
    <label for="id_count">
      <input
        id="id_count"
        v-model="count"
        type="text"
        name="count"
      >
    </label>
    <button
      type="button"
      aria-label="Добавить один товар"
      @click="countPlus"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-plus" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCounter',
  props: ['modelValue'],
  data() {
    return {
      count: 1,
    };
  },
  watch: {
    count() {
      this.$emit('update:modelValue', this.count);
    },

  },
  created() {
    this.count = this.modelValue;
  },
  methods: {
    countPlus() {
      this.count += 1;
    },
    countMinus() {
      if (this.count > 1) {
        this.count -= 1;
      }
    },
  },
};
</script>

<style scoped>

</style>
