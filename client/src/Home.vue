<template>
  <div>
    <v-layout justify-center v-show="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs9>
        <ArticleCard v-for="article in articles" v-bind:key="article._id" :articleData="article"></ArticleCard>
      </v-flex>
  
      <v-flex xs3>
        <TrendingTags></TrendingTags>
      </v-flex>
    </v-layout>
    <router-view></router-view>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard";
import axios from "axios";
import TrendingTags from "../components/TrendingTags"

export default {
  name: "Home",
  components: {
    ArticleCard,
    TrendingTags
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.getAllArticles();
  },
  data() {
    return {
      loading: false,
      baseUrl: "https://miniwp-server.fildabert.com/api",
      articles: []
    };
  },
  methods: {
    getAllArticles: function() {
      axios
        .request({
          method: "GET",
          url: `${this.baseUrl}/articles/all`
        })
        .then(response => {
          this.articles = response.data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
.article-content {
  font-size: 2em;
  line-height: 1em;
  max-height: 2em;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
