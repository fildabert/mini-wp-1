<template>
    <span>
    <v-dialog v-model="dialog" persistent max-width="490">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Login 
            <v-spacer></v-spacer>
        <v-icon @click="dialog = false" id="test" >close</v-icon>
        </v-card-title>

        <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                 v-model="username"
                 label="Username"
                 prepend-icon="person"
                 required
                ></v-text-field>

                <v-text-field
                 v-model="password"
                 type="password"
                 label="Password"
                 prepend-icon="vpn_key"
                 required
                ></v-text-field>

            </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn icon @click="googleLogin"><v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/32px-Google_%22G%22_Logo.svg.png"></v-img></v-btn> -->
          <v-btn color="green darken-1" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </span>
</template>

<script>
import axios from "axios"

export default {
    name: "LoginButton",
    data () {
        return {
            dialog: false,
            valid: true,
            username: "",
            password: "",
            baseUrl: "https://miniwp-server.fildabert.com/api"
        }
    },
    methods: {
     login: function() {
       axios.request({
         method: "POST",
         url: `${this.baseUrl}/users/login`,
         data: {
           username: this.username,
           password: this.password
         }
       })
       .then(response =>{
         localStorage.setItem("token", response.data.access_token)
         this.dialog = false
         this.$emit("userLogged", response.data.username)
       })
       .catch(err =>{
         console.log(err.response)
       })
     }
    }
}
</script>

<style>
#test:hover {
    color: #1E88E5
}

</style>
