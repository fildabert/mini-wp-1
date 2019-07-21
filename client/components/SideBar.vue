<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    app
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-if="!userData.username" src="https://www.bigissue.com/wp-content/themes/bigissue/images/avatar-placeholder.png">
            <img v-else-if="userData.username && !userData.picture" src="https://i.pravatar.cc/300">
            <img v-else :src="userData.picture">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="!userData.username">Mini-WP</v-list-tile-title>
            <v-list-tile-title v-else>{{userData.username}}</v-list-tile-title>            
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="toggleSidebar"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-autocomplete
       prepend-icon="search"
       placeholder=" Search by tag"
       class="mx-2 mb-4"
       :loading="loading"
       :items="tags"
       :search-input.sync="search"
       cache-items
       hide-details
       v-model="searched"
       @change="searchTag"
      >

      </v-autocomplete>


      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="{path: item.link}"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import checkToken from "../helpers/checkToken"
import axios from "axios"

  export default {
    props: ["userData"],
    created() {
      this.getAllTags()
      var jwtToken = localStorage.getItem("token")
      if(jwtToken) {
        var valid = checkToken(jwtToken)
        if(valid) {
          this.userData.username = valid.username
          this.userData.picture = valid.picture
        }
      }
    },
    data () {
      return {
        drawer: true,
        baseUrl: "https://miniwp-server.fildabert.com/api",
        items: [
          { title: 'Home', icon: 'fas fa-home', link: "/" },
          { title: 'Create Article', icon: 'edit', link: "/createarticle"},
          { title: 'My Articles', icon: 'fas fa-newspaper', link: "/myarticles"}
        ],
        mini: false,
        right: null,
        loading: false,
        search: "",
        searched: "",
        tags: []
      }
    },
    methods: {
      toggleSidebar: function () {
        this.mini = !this.mini
        // this.$emit("toggeSidebar", this.mini)
      },
      getAllTags: function() {
        axios.request({
          method: "GET",
          url: `${this.baseUrl}/articles/tags`
        })
        .then(response =>{
          this.tags = response.data
        })
        .catch(err =>{
          console.log(err.response)
        })
      },
      searchTag: function() {
        this.loading = true
        setTimeout(() =>{
          this.$router.push({name: "TagPage", params:{tag: this.search}})   
          this.loading = false       
        }, 500)
      }
    },
    watch: {
      mini: function(val) {
        console.log(val)
        this.$emit("toggleSidebar", this.mini)
      }
    }
  }
</script>