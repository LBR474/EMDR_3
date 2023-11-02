import { createApp } from 'vue'
import './style.css'
import { createPinia } from "pinia";
import Tres from "@tresjs/core";

import App from './App.vue'

const app = createApp(App);
app.use(createPinia());
app.use(Tres);

app.mount("#app");
