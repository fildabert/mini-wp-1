<template>
  <div class="mt-5">
    <v-layout justify-center v-show="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>
    <v-layout v-if="article" wrap>
        <v-flex xs11 offset-xs1>
           <div class="display-2">Title</div> 
        </v-flex>
 
        <v-flex xs11 offset-xs1 class="mt-1">
            <v-layout row style="max-width: 650px">
                <v-flex xs1 class="mt-0">
                    <v-avatar color="indigo">
                        <v-icon dark>account_circle</v-icon>
                    </v-avatar>
                </v-flex>
                <v-flex xs11>
                    <div class="subheading">{{article.author.username}}</div>
                    <div class="subheading grey--text text--darken-1">{{formatDate}}</div>
                </v-flex>

            </v-layout>
        </v-flex>

        <v-flex xs11 offset-xs1 class="mt-1">
            <Tag v-for="(tag, i) in article.tags" :key="i" :tagname="tag"></Tag>
        </v-flex>


        <v-flex xs12 class="mt-2">
            <v-img :src="article.image"></v-img>
        </v-flex>

        <v-flex xs8 offset-xs2 class="mt-5">
            <div class="font-weight-light" style="font-size: 20px;" v-html="article.content">
           
            </div>


        </v-flex>
        

    </v-layout>
  </div>
</template>

<script>
import Tag from "../components/Tag"
import axios from "axios"
import moment from "moment"

export default {
  name: "ViewArticle",
  components: {
      Tag
  },
  props: ['id'],
  created() {
    this.loading = true;
    console.log(this.id)
    if(!this.id) {
      this.$router.push("/")
    }
    axios.request({
      method: "GET",
      url: `${this.baseUrl}/articles/viewArticle?id=${this.id}`
    })
    .then(response =>{
      this.loading = false
      this.article = response.data
    })
    .catch(err =>{
      this.loading = false
      console.log(err.response)
    })
  },
  mounted() {
 
  },
  data() {
    return {
      loading: false,
      baseUrl: "http://localhost:3000/api",
      article: ""
    };
  },
  computed: {
        formatDate: function() {
            return moment(this.article.createdAt).fromNow()
        }
    }
};
</script>

<style>
</style>
