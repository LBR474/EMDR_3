<script setup lang="ts">
import EMDR_Bounce_Light from "./components/EMDR_Bounce_Light.vue";
import EMDR_Bounce_Light_2 from "./components/EMDR_Bounce_Light_2.vue";
</script>

<template>
  <Suspense>
    <EMDR_Bounce_Light_2 />
  </Suspense>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  
}
.scroll {
inline-size: 15px;}
#app {
  height: 100%;
  width: 100%;
  background-color: #000000;
  margin: 0;
  padding: 0;
  
}
</style>
