<template>
  <div id="app">
    <customer-query></customer-query>
  </div>
</template>

<script>
  import customerQuery from './components/customer-query.vue'
  export default {
    methods: {},
    components: {
      'customer-query': customerQuery
    },
  }
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
    overflow: hidden;
  }
</style>
