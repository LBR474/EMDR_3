import { defineStore } from "pinia";

interface State {
  count: 0;
}

export const useStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    let count = 0;
    let opacity = 1;
    function increment(this: any) {
      opacity = 0;
      count++;
      console.log("State Store count: ", count);
      if (!count) {
        throw new Error("Count not found");
      }
    }

    return {
      // all these properties will have their type inferred automatically
      count,
      increment,
      name: "Eduardo",
      isAdmin: true,
      items: [],
      hasChanged: false,
    };
  },
});
