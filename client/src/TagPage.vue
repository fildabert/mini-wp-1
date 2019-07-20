<template>
    <div class="mt-5">
        <v-layout row wrap>
            <v-layout justify-center v-show="loading">
      <v-progress-circular indeterminate color="primary" style="margin-right: 10%;"></v-progress-circular>
    </v-layout>
            <v-flex xs12>
                <h1 class="font-weight-light">{{tag}}</h1>
                <v-divider></v-divider>
            </v-flex>

            <v-flex class="mt-4">
            <ArticleCard v-for="article in articles" v-bind:key="article._id" :articleData="article"></ArticleCard>

            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from "axios"
import ArticleCard from "../components/ArticleCard"

export default {
    name: "TagPage",
    props: ['tag'],
    components: {
        ArticleCard
    },
    created() {
        this.searchTag()
    },
    data() {
        return {
            baseUrl: "http://localhost:3000/api",
            loading: false,
            articles: []
        }
    },
    methods: {
        searchTag: function() {
            this.loading = true
            axios.request({
            method: "GET",
            url: `${this.baseUrl}/articles/tag?tag=${this.tag}`
          })
          .then(response =>{
            console.log(response.data)
            this.articles = response.data
            this.loading = false
          })
          .catch(err =>{
            console.log(err.response)
            this.loading = false
          })
        }
    },
    watch: {
        tag: function() {
            this.searchTag()
        }
    }
}
</script>

<style>

</style>
