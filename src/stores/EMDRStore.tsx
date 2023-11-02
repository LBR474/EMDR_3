import { defineStore } from "pinia";
//import { computed, ref } from "vue";

import { useRenderLoop } from "@tresjs/core";

import { gsap } from "gsap";

export const useEMDRStore = defineStore("EMDRStore", () => {
  const { onLoop } = useRenderLoop();

  let EMDR_bounce_start = false;

  let bounceDirection = 1; // 1 for moving to the right, -1 for moving to the left
  let bounceSpeed = 0.5; // Adjust this value to control the speed of the bounce

  let object_array = new Array<THREE.Mesh>();

  function bounce_start_function() {
    EMDR_bounce_start = !EMDR_bounce_start;
    if (!EMDR_bounce_start) {
      gsap.to(object_array[0].position, {
        x: 0,
        duration: 1
      })
    }
  }

  onLoop(({ delta, elapsed }) => {
    if (EMDR_bounce_start) {
      console.log(object_array)
      EMDRStoreBounce();
    }
  });

  function EMDRStoreBounce() {
    if (object_array[1]) {
      object_array[1].position.x += bounceDirection * bounceSpeed;

      // Check if Plane002 hits the right edge of the screen
      if (object_array[1].position.x > 10) {
        bounceDirection = -1; // Reverse direction
      }

      // Check if Plane002 hits the left edge of the screen
      if (object_array[1].position.x < -10) {
        bounceDirection = 1; // Reverse direction
      }

      
    } 
  }

  return {
    bounce_start_function,
    EMDR_bounce_start,
    EMDRStoreBounce,
    object_array,
  };
});
