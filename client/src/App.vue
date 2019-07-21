<template>
<v-app>
    <SideBar @toggleSidebar="sidebarToggled" :userData="loggedUser"></SideBar>
      <v-content style="min-height: 1400px;">
    <Parralax v-show="$route.path === '/'" @logged="userLogged" :isLogin="loggedUser"></Parralax>
    <NavBar v-show="$route.path !== '/'" :sidebar="mini" @logged="userLogged" :isitLogin="loggedUser"></NavBar>

        <v-container fluid style="width: 90%;">
          <router-view></router-view>
        </v-container>
      </v-content>
</v-app>

     
</template>

<script>
// import CKeditor from "@ckeditor/ckeditor5-build-classic"
import SideBar from "../components/SideBar"
import Parralax from "../components/Parralax"
import NavBar from "../components/NavBar"

export default {
    name: "app",
    components: {
        SideBar,
        Parralax,
        NavBar
        // CKeditor
    },
    data () {
        return {
            // editor: ClassicEditor,
            message: "OOOOOOOO",
            mini: false,
            loggedUser: {}
        }
    },
    methods: {
        sidebarToggled: function(val) {
            this.mini = val
        },
        userLogged: function(val) {
            this.loggedUser = val
        }
    }
}
</script>

<style>

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
