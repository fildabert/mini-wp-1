<template>
    <v-layout mt-5 wrap>
        <v-flex xs12>
        <h1>My Articles</h1>
        <v-divider></v-divider>
        </v-flex>

        <v-flex class="mt-3">
            <ArticleCard v-for="article in articles" v-bind:key="article._id" :articleData="article" @changed="getMyArticles" @err="snackbarError"></ArticleCard>
        </v-flex>


        <v-snackbar
         v-model="snackbar"
         top
         color="red lighten-1"
        >
        {{errorMessage}}
        </v-snackbar>
    </v-layout>
</template>

<script>
import ArticleCard from "../components/ArticleCard"
import axios from "axios"

export default {
    name: "MyArticles",
    components: {
        ArticleCard
    },
    created() {
        var token = localStorage.getItem("token")
        if(token) {
            this.getMyArticles()
        } else {
            this.snackbarError("Please Login First")
        }
    },
    data() {
        return{
            articles: [],
            baseUrl: "https://miniwp-server.fildabert.com/api",
            snackbar: false,
            errorMessage: ""
        }
    },
    methods: {
        getMyArticles: function() {
            axios.request({
                method: "GET",
                url: `${this.baseUrl}/articles/myarticles`,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(response =>{
                this.articles = response.data
            })
            .catch(err =>{
                console.log(err.response)
            })
        },
        snackbarError: function(errMessage) {
            this.snackbar = true
            this.errorMessage = errMessage
            setTimeout(() =>{
                this.snackbar = false
                this.errorMessage = ""
            }, 3000)
        }
    }
}
</script>

<style>

</style>
