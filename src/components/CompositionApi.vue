<template />

<script>
import { defineComponent, getCurrentInstance, onMounted } from 'vue';

const componet = defineComponent({
  props: {
    title: { type: String, default: '' },
  },
  setup(props, context) {
    const { emit, attrs, slots } = context;
    const id = getCurrentInstance().uid;

    console.log('props', props);
    console.log('attrs', attrs);
    console.log('slots', slots);

    onMounted(() => {
      console.log(getCurrentInstance());
    });

    return {
      id,
      onButtonClick: () => {
        alert('Miy');
      },
    };
  },
});

export default componet;
</script>

<style scoped>

</style>
