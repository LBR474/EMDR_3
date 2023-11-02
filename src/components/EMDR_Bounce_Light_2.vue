<script setup lang="ts">
import { onMounted, ShallowRef, shallowRef } from "vue";

//@ts-ignore
import { useRenderLoop, TresInstance } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

import { useEMDRStore } from "../stores/EMDRStore";

import { useStore } from "../stores/StateStore";

import * as THREE from "three";

import gsap from "gsap";

let bounceDirection = 1; // 1 for moving to the right, -1 for moving to the left
let bounceSpeed = 0.7; // Adjust this value to control the speed of the bounce

let Bloom_material = new THREE.MeshStandardMaterial({
  color: "#00F",
  emissive: "#00FFFF",
  emissiveIntensity: 17,
});

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

const green = new THREE.Color("#0F0");

const red = new THREE.Color("#FF0000");

const materialColor = new THREE.Color("#00FF00"); // Set your desired material color here
const emissiveColor = new THREE.Color("#00FF00"); // Set your desired emissive color here
const emissiveIntensity = 17;

const { onLoop } = useRenderLoop();

const StateStore = useStore();

const EMDRStore = useEMDRStore();

let rotate_start = false;

function return_to_start () {
  if (!StateStore.hasChanged) {
    gsap.to(boxRef.value.position, {
      x: 0,
      duration: 0.5,
    })
  }

}

 



onLoop(({ delta, elapsed }) => {
  // if (boxRef.value && StateStore.hasChanged) {
  //   boxRef.value.rotation.y += delta;
  //   boxRef.value.rotation.z = elapsed * 0.2;
  // }
  if (StateStore.hasChanged) {
    boxRef.value.position.x += bounceDirection * bounceSpeed;

    // Check if Plane002 hits the right edge of the screen
    if (boxRef.value.position.x > 9) {
      bounceDirection = -1; // Reverse direction
    }

    // Check if Plane002 hits the left edge of the screen
    if (boxRef.value.position.x < -9) {
      bounceDirection = 1; // Reverse direction
    }
  } 
  if (!StateStore.hasChanged && boxRef.value.position.x > 1 || boxRef.value.position.x < -1) {
    return_to_start()
  }
 
});
</script>

<template>
  <div class="canvasDiv" @click="
      StateStore.hasChanged = !StateStore.hasChanged
      gsap.to('.startButtonDiv', {
        opacity: 0,
        duration: 0.0,
      });
      
    " >
    <TresCanvas
      clear-color="#000"
      shadows
      alpha
      
    >
      

      <TresPerspectiveCamera
        :position="[0, 0, 5]"
        :fov="75"
        :aspect="1"
        :near="0.1"
        :far="1000"
      />
      <TresMesh ref="boxRef" :scale="1" cast-shadow :material="Bloom_material">
        <TresPlaneGeometry :args="[0.3, 0.3]" />
      </TresMesh>
    </TresCanvas>
  </div>
  <div
    class="startButtonDiv"
    id="startButtonDivID"
    
  >
    <h3>
      Suggestion: place browser in full screen mode to avoid distraction.
      <br />
      Click screen to start EMDR light moving.
      <br />
      Click screen again to stop EMDR light moving.
      <br />
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
