<template>
  <aside class="filter">
    <h2 class="filter__title">
      Фильтры
    </h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>
        <label
          class="form__label form__label--price"
          for="price-from"
        >
          <input
            id="price-from"
            v-model.number="currentPriceFrom"
            class="form__input"
            type="text"
            name="min-price"
          >
          <span class="form__value">От</span>
        </label>
        <label
          class="form__label form__label--price"
          for="price-to"
        >
          <input
            id="price-to"
            v-model.number="currentPriceTo"
            class="form__input"
            type="text"
            name="max-price"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категория
        </legend>
        <label
          class="form__label form__label--select"
          for="category"
        >
          <select
            id="category"
            v-model.number="currentCategoryId"
            class="form__select"
            name="category"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="'id_cat'+category.id"
              :value="category.id"
            >{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Цвет
        </legend>
        <ul class="colors">
          <li
            v-for="(color, key) in colors"
            :key="key + 'color_filter'"
            class="colors__item"
          >
            <label
              class="colors__label"
              :for="key+'color_id'"
            >
              <input
                :id="key+'color_id'"
                v-model="currentColorId"
                class="colors__radio sr-only"
                type="radio"
                :value="color.id"
                :checked="color.checked"
              >
              <span
                class="colors__value"
                :style="{backgroundColor: color.value}"
              />
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Объемб в ГБ
        </legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label
              class="check-list__label"
              for="r8"
            >
              <input
                id="r8"
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              >
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label
              class="check-list__label"
              for="r16"
            >
              <input
                id="r16"
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="16"
              >
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label
              class="check-list__label"
              for="r32"
            >
              <input
                id="r32"
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="32"
              >
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label
              class="check-list__label"
              for="r64"
            >
              <input
                id="r64"
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="64"
              >
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label
              class="check-list__label"
              for="r128"
            >
              <input
                id="r128"
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="128"
              >
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label
              class="check-list__label"
              for="r264"
            >
              <input
                id="r264"
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="264"
              >
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import colors from '../data/colors';

export default {
  name: 'ProductFilter',
  props: [
    'priceFrom',
    'priceTo',
    'categoryId',
    'colorId',
  ],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      categoriesData: null,
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return colors;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  created() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => { this.categoriesData = response.data; });
    },
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:colorId', 0);
    },
  },
};
</script>

<style scoped>

</style>
