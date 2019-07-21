<template>
    <v-toolbar dense scroll-off-screen fixed>
        <v-toolbar-title :style="{'padding-left': padding}">Mini-Wordpress</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="googleLogin" v-show="!isLogin" ref="googleLogin"><v-icon>fab fa-google</v-icon> <span class="pl-1">Login with google</span></v-btn>
        <LoginButton v-show="!isLogin" @userLogged="loginBiasa"></LoginButton>
        <RegisterButton v-show="!isLogin" @userLogged="loginBiasa"></RegisterButton>
        <v-btn v-show="isLogin" @click="logout">Logout</v-btn>
    </v-toolbar>
</template>

<script>
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import checkToken from "../helpers/checkToken"
import axios from "axios"

export default {
    name: "NavBar",
    props: ["sidebar", "isitLogin"],
    created() {
        var jwtToken = localStorage.getItem("token")
        if(jwtToken) {
        var valid = checkToken(jwtToken)
        if(valid) {
          this.isLogin = true
        }
      }
    },
    components: {
        LoginButton,
        RegisterButton
    },
    data () {
        return {
            padding: "290px",
            isLogin: false,
            baseUrl: "https://miniwp-server.fildabert.com/api",
            path: this.$route.path
        }
    },
    methods: {
        googleLogin: function() {
        this.$gAuth.signIn()
        .then(GoogleUser => {
          var idToken = GoogleUser.getAuthResponse().id_token
          return axios.request({
            method: "POST",
            url: `${this.baseUrl}/users/login/google`,
            data: {
              code: idToken
            }
          })
        })
        .then(response =>{
          localStorage.setItem("token", response.data.access_token)
          // localStorage.setItem("username", response.data.username)
          this.isLogin = true
          this.$emit("logged", {username: response.data.username, picture: response.data.picture})
        })
        .catch(err =>{
          console.log(err)
        })
      },
      logout: function() {
        this.$gAuth.signOut()
        .then(() =>{
          localStorage.removeItem("token")
          localStorage.removeItem("username")
          this.isLogin = false
          this.$emit("logged", {username: "", picture: ""})
        })
        .catch(err =>{
          console.log(err)
        })
      },
      loginBiasa: function(val) {
        this.$emit("logged", {username: val})
      }
    },
    watch: {
        sidebar: function(val) {
            if(val) {
                this.padding = "70px"
            } else {
                this.padding = "290px"
            }
        },
        isitLogin: function(val) {
            if(val.username) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        }
    }
}
</script>

<style>
#logo{
    padding-left: 290px;
}


</style>
