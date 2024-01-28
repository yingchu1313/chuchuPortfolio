<script setup>
import helloWorld from "@/components/HelloWorld.vue";
  import { ref, onMounted } from "vue";

  const count = ref(0);

  // 使用語法糖導入prop
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    }
  })

  const increment = () => {
    count.value += 1;
  };

  onMounted(() => {
    console.log(count.value)
  });
    
</script>

<template>
  <div>
    <h1>Vue:{{ count }}</h1>
    <button @click="increment">Count is: {{ count }}</button>
    <helloWorld></helloWorld>
  </div>
</template>

<style scoped>
</style>
