<template>
    <div>
    <v-chip color="#607D8B" class="white--text" @click="viewTag">
        <v-icon color="white" class="pr-1" style="font-size: 20px;" id="chipzzz">label</v-icon>
        {{tagname}}
    </v-chip>
    </div>
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

<style>
#chipzzz:hover{
    cursor: pointer;
}

</style>
