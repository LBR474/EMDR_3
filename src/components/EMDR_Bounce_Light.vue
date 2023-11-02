<script setup lang="ts">
// cientos imports
//import { OrbitControls, Stars } from "@tresjs/cientos";

// tres imports
import { TresCanvas, useLoader, useSeek } from "@tresjs/core";

// three imports
import * as THREE from "three";
//import { Color } from "three";

// three addons imports
//@ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

// vue imports

import { useEMDRStore } from "../stores/EMDRStore";

// gsap imports
import { gsap } from "gsap";

let Bloom_material = new THREE.MeshStandardMaterial({
  color: "#00F",
  emissive: "green",
  emissiveIntensity: 17,
});

let Black_material = new THREE.MeshStandardMaterial({
  color: "#000",
});

const EMDRStore = useEMDRStore();

const { scene } = await useLoader(GLTFLoader, "/EMDR_light_bar.glb");

const { seek } = useSeek();

// Plane001 area

const Plane001 = seek(scene, "name", "Plane");

if (Plane001 instanceof THREE.Mesh) {
  Plane001.material = Black_material;
  EMDRStore.object_array.push(Plane001);
}

// Plane002 testing area

const Plane002 = seek(scene, "name", "Plane001");

if (Plane002) {
  Plane002.position.x = 0;
}

if (Plane002 instanceof THREE.Mesh) {
  Plane002.material = Bloom_material;
  EMDRStore.object_array.push(Plane002);
}
</script>

<template>
  <div
    class="canvasDiv"
    @click="
      EMDRStore.bounce_start_function();
      gsap.to('.startButtonDiv', {
        opacity: 0,
        duration: 1,
      });
      
    "
  >
    <TresCanvas clear-color="#000">
      <TresPerspectiveCamera
        :position="[0, 3, 7]"
        :fov="45"
        :look-at="[0, 0, 2]"
      />

      <Suspense>
        <primitive :object="scene" :position="[0, 0, -5]" />
      </Suspense>

      
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
  <div
    class="startButtonDiv"
    id="startButtonDivID"
    @click="
      EMDRStore.bounce_start_function();
      gsap.to('.startButtonDiv', {
        opacity: 0,
        duration: 0.5,
      });
    "
  >
    <h3>
      Suggestion: place browser in full screen mode to avoid distraction.
      <br>
      Click screen to start EMDR light moving.
      <br />
      Click screen again to stop EMDR light moving.
      <br>
      
    </h3>
  </div>
</template>
<style>
.canvasDiv {
  position: relative;
  height: 100%;
  z-index: 2;
  margin: 0;
  padding: 0;
}

.startButtonDiv {
  position: fixed;
  bottom: 5%;
  left: 25%;
  width: 50%;
  z-index: 5;
  margin: 0 auto;
  opacity: 1;
}
</style>
