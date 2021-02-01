<template>
  <div class="suyan__content__wrapper" :class="{ 'site': this.$route.meta.parentName }">
      <div>
          <div class="suyan__content">
              <keep-alive>
                  <router-view />
              </keep-alive>
          </div>
      </div>
      
  </div>
  
</template>


<style>
</style>

<script>
export default {
    computed: {
    },
    created() {
    },
    methods: {
    }
}
</script>
