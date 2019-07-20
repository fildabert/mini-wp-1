<template>
  <div class="mt-5">
    <v-layout justify-center v-show="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>
    <v-layout wrap>
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
                    <div class="subheading">FuccBoi</div>
                    <div class="subheading grey--text text--darken-1">Jun 17 2810</div>
                </v-flex>

            </v-layout>
        </v-flex>

        <v-flex xs11 offset-xs1 class="mt-1">
            <Tag :tagname="'fuck'"></Tag>
        </v-flex>

        <v-flex xs12 class="mt-2">
            <v-img src="http://lorempixel.com/800/400/animals/"></v-img>
        </v-flex>

        <v-flex xs8 offset-xs2 class="mt-5">
            <div class="font-weight-light" style="font-size: 20px;">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, ullam cum. Laboriosam eligendi dolores adipisci quis asperiores consequatur. Itaque earum veniam perspiciatis eaque cum fuga provident minus in ipsa nobis?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis cumque fugiat vero, eligendi, maxime laudantium aspernatur iure nesciunt recusandae a est nisi corporis molestiae adipisci eius inventore soluta eaque Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis numquam, fugiat quas omnis possimus minus excepturi ex, vero reiciendis dolore harum. Iure nihil sequi facilis inventore ex itaque tempora nesciunt! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis id reiciendis atque temporibus exercitationem voluptate saepe explicabo eligendi molestias, impedit veniam ad, suscipit ipsum nostrum non incidunt. Nulla, voluptate ex.lorem</p>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quis quos sequi deleniti, blanditiis aspernatur ullam rerum animi praesentium asperiores, cum reiciendis totam sint iure inventore dolores perferendis porro quidem.</p>
            </div>


        </v-flex>
        

    </v-layout>
  </div>
</template>

<script>
import Tag from "../components/Tag"

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
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>

<style>
</style>
