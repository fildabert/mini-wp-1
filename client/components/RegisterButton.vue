<template>
    <span>
    <v-dialog v-model="dialog" persistent max-width="490">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Register</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Register
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
                 v-model="email"
                 
                 label="Email"
                 prepend-icon="email"
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
          <v-btn color="green darken-1" flat @click="dialog = false">Register</v-btn>
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
            email: "",
            baseUrl: "http://localhost:3000/api"
        }
    },
    methods: {
      register: function() {
        axios.request({
          method: "POST",
          url: `${this.baseUrl}/users/register`,
          data: {
            username: this.username,
            emaik: this.email,
            password: this.password
          }
        })
        .then(response =>{
          localStorage.setItem("token", response.data.access_token)
          localStorage.setItem("username", response.data.username)
        })
        .catch(err =>{
          console.log(err)
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
