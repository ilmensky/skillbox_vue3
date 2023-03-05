<template>
  <main
    v-if="productStatus.isLoading"
    class="content container"
  >
    Загрузка товара...
  </main>
  <main
    v-else-if="productStatus.isFailed"
    class="content container"
  >
    Не удальсь получить товар.
  </main>
  <main
    v-else
    class="content container"
  >
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image"
            :alt="product.title"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart(productAmount)"
          >
            <b class="item__price">
              {{ product.pricePretty }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">
                Цвет:
              </legend>
              <ul class="colors">
                <li class="colors__item">
                  <label
                    class="colors__label"
                    for="cp1"
                  >
                    <input
                      id="cp1"
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="blue"
                      checked=""
                    >
                    <span
                      class="colors__value"
                      style="background-color: #73B6EA;"
                    />
                  </label>
                </li>
                <li class="colors__item">
                  <label
                    class="colors__label"
                    for="cp2"
                  >
                    <input
                      id="cp2"
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="yellow"
                    >
                    <span
                      class="colors__value"
                      style="background-color: #FFBE15;"
                    />
                  </label>
                </li>
                <li class="colors__item">
                  <label
                    class="colors__label"
                    for="cp3"
                  >
                    <input
                      id="cp3"
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="gray"
                    >
                    <span
                      class="colors__value"
                      style="background-color: #939393;"
                    /></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">
                Объемб в ГБ:
              </legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label
                    class="sizes__label"
                    for="s1"
                  >
                    <input
                      id="s1"
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="32"
                    >
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label
                    class="sizes__label"
                    for="s2"
                  >
                    <input
                      id="s2"
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="64"
                    >
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label
                    class="sizes__label"
                    for="s3"
                  >
                    <input
                      id="s3"
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="128"
                      checked=""
                    >
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <product-counter v-model.number="productAmount" />
              <button
                class="button button--primery"
                type="submit"
                :disabled="addToCartStatus.productAddSending"
              >
                В корзину
              </button>
              <base-modal v-model:open="addToCartStatus.isShowAddMessage">
                Товар добавлен в корзину
              </base-modal>
            </div>
            <div v-show="addToCartStatus.productAdded">
              Товар добавлен в корзину
            </div>
            <div v-show="addToCartStatus.productAddSending">
              Добавление товара...
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает
            местоположение, принимая сигнал с целого комплекса спутников. Эта информация
            позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют
            всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета
            выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей
            диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная
            со смартфона и синхронизированных датчиков информация: интенсивность, скорость
            вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус
            велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не
            боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на
            глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ProductCounter from '@/components/ProductCounter.vue';
import BaseModal from '@/components/BaseModal.vue';
import { defineComponent, ref } from 'vue';
import useProduct from '@/hooks/useProduct';

export default defineComponent({
  components: {
    BaseModal,
    ProductCounter,
  },
  props: {
    productId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const {
      product,
      category,
      fetchProduct,
      status: productStatus,
      addToCart,
      addToCartStatus,
    } = useProduct();

    const productAmount = ref(1);

    fetchProduct(props.productId);

    return {
      productAmount,
      productData: product,
      productStatus,
      addToCartStatus,
      product,
      category,
      addToCart,
    };
  },
});



// import axios from 'axios';
// import { API_BASE_URL } from '@/config';
// import gotoPage from '@/helpers/gotoPage';
// import numberFormat from '@/helpers/numberFormat';
// import ProductCounter from '@/components/ProductCounter.vue';
// import { mapActions } from 'vuex';
// import BaseModal from '@/components/BaseModal.vue';
//
// export default {
//   name: 'ProductQuickView',
//   components: { BaseModal, ProductCounter },
//   beforeRouteUpdate() {
//     this.loadProduct();
//   },
//   props: {
//     productId: {
//       type: [Number, String],
//       required: true,
//     },
//   },
//   data() {
//     return {
//       productAmount: 1,
//       productData: null,
//       productLoading: false,
//       productLoadingFailed: false,
//       productAdded: false,
//       productAddSending: false,
//       isShowAddMessage: false,
//     };
//   },
//   computed: {
//     product() {
//       return { ...this.productData, image: this.productData.image.file.url };
//     },
//     category() {
//       return this.product.category;
//     },
//     productPrice() {
//       return numberFormat(this.product.price);
//     },
//   },
//   created() {
//     this.loadProduct();
//   },
//   methods: {
//     ...mapActions(['addProductToCart']),
//     gotoPage,
//     addToCart() {
//       this.productAddSending = true;
//       this.productAdded = false;
//       this.addProductToCart({
//         productId: this.product.id,
//         quantity: this.productAmount,
//       })
//         .then(() => {
//           this.isShowAddMessage = true;
//           this.productAddSending = false;
//           this.productAdded = true;
//         });
//     },
//     loadProduct() {
//       this.productLoading = true;
//       this.productLoadingFailed = false;
//       axios.get(`${API_BASE_URL}/api/products/${this.productId}`)
//         .then((response) => { this.productData = response.data; })
//         .catch(() => { this.productLoadingFailed = true; })
//         .finally(() => { this.productLoading = false; });
//     },
//   },
// };
</script>

<style scoped>

</style>
