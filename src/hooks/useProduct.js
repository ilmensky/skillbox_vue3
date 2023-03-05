import axios from 'axios';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default function useProduct() {
  const $store = useStore();
  const productData = ref(null);
  const category = computed(() => (
    productData.value.category
  ));
  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });
  const fetchProduct = (productId) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    axios.get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        const product = response.data;
        productData.value = Object.assign(product, {
          pricePretty: numberFormat(product.price),
          image: product.image.file.url,
        });
      })
      .catch(() => { fetchStatus.isFailed = true; })
      .finally(() => { fetchStatus.isLoading = false; });
  };

  const productAdded = ref(false);
  const productAddSending = ref(false);
  const isShowAddMessage = ref(false);

  const addToCartStatus = reactive({
    productAdded: false,
    productAddSending: false,
    isShowAddMessage: false,
  });
  const addToCart = (productAmount) => {
    addToCartStatus.productAddSending = true;
    addToCartStatus.productAdded = false;
    $store.dispatch('addProductToCart', {
      productId: productData.value.id,
      quantity: productAmount,
    })
      .then(() => {
        addToCartStatus.isShowAddMessage = true;
        addToCartStatus.productAddSending = false;
        addToCartStatus.productAdded = true;
      });
  };

  return {
    product: productData,
    category,
    status: fetchStatus,
    fetchProduct,
    addToCart,
    addToCartStatus,
  };
}
