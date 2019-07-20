<template>
    <v-parallax
    dark
    src="https://3dfs.com/wp-content/uploads/2017/05/Parallax-background.jpg"
  >
    <v-layout
    justify-space-between
    >
      <h1 class="font-weight-light">Mini-Wordpress</h1>
      <v-btn @click="logout" v-show="username">Logout</v-btn>
      
        
    </v-layout>
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-light mb-3">Mini-Wordpress</h1>
      <h2 class="headline" v-show="username">Hello, {{username}}</h2>
      <h4 class="subheading">Let's get started</h4>
      <v-flex>
      <LoginButton v-show="!username"></LoginButton>
      <RegisterButton v-show="!username"></RegisterButton>
      </v-flex>
      <v-flex style="padding-bottom: 10%;">
      <v-btn @click="googleLogin" v-show="!username" ref="googleLogin"><v-icon>fab fa-google</v-icon> <span class="pl-1">Login with google</span></v-btn>
      </v-flex>
    </v-layout>
  </v-parallax>
</template>

<script>
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import axios from "axios"
import checkToken from "../helpers/checkToken"


export default {
    name: "Parralax",
    props: ['isLogin'],
    components: {
        LoginButton,
        RegisterButton
    },
    created() {
      var jwtToken = localStorage.getItem("token")
      if(jwtToken) {
        var valid = checkToken(jwtToken)
        console.log(valid)
        if(valid) {
          this.username = valid.username
        }
      }
    },
    data () {
      return {
        baseUrl: "http://localhost:3000/api",
        username: ""
      }
    },
    methods: {
      googleLogin: function() {
        this.$gAuth.signIn()
        .then(GoogleUser => {
          var idToken = GoogleUser.getAuthResponse().id_token
            // GoogleUser.getBasicProfile() : Get the user's basic profile information.
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
          this.username = response.data.username
          this.$emit("logged", {username: this.username, picture: response.data.picture})
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
          this.username = ""
          this.$emit("logged", {username: "", picture: ""})
        })
        .catch(err =>{
          console.log(err)
        })
      }
    },
    watch: {
      isLogin: function(val) {
        if(val) {
          this.username = val.username
        } else {
          this.username = ""
        }
      }
    }
}
</script>

<style>

</style>
