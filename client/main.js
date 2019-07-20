import Vue from "vue"
import App from "./src/App.vue"
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css'
import VueRouter from "vue-router"
import routes from "./routes"
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '58857443225-5c2ubp38j7cpjhhukju5qebolnqg2nm5.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}




Vue.config.productionTip = false;

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(GAuth, gauthOption)

const router = new VueRouter({routes})
// Vue.use(CKEditor)
// Vue.use(summernote)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app');