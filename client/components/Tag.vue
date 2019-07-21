<template>
    
    <v-chip color="#BCAAA4" class="white--text" id="temp" @click="viewTag">
        <v-icon color="white" class="pr-1" style="font-size: 20px;" id="chipzzz">label</v-icon>
        {{tagname}}
    </v-chip>
    
</template>

<script>
export default {
    props: ["tagname"],
    name: "Tag",
    methods: {
        viewTag: function() {
            console.log(this.tagname)
            this.$router.push({name: "TagPage", params:{tag: this.tagname}})

        }
    }
}
</script>

<style scoped>
#chipzzz:hover{
    cursor: pointer;
}

#temp:hover{
    font-size: 14px;
    cursor: pointer !important;
}

</style>
