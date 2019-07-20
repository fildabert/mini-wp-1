<template>
  <div>
    <v-layout justify-center v-show="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>

    <ArticleCard v-for="article in articles" v-bind:key="article._id" :articleData="article"></ArticleCard>
    <router-view></router-view>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard";
import axios from "axios";

export default {
  name: "Home",
  components: {
    ArticleCard
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
      baseUrl: "http://localhost:3000/api",
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
