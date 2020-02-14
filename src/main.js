import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
import 'firebase'
import VueRouter from 'vue-router'


import Login from './components/Login.vue'
import Principal from './components/Principal.vue'
import Registro from './components/Registro.vue'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

Vue.use(VueRouter)



   const rutas = [
  {path: '/login', component: Login},
  {path: '/contenido', component: Principal},
  {path: '/registro', component: Registro},

  {path: '*', component: Login},

]

const router = new VueRouter({
  'routes':rutas
}) 


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
