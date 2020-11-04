<template>
  <div id="app">
    <Find msg="Find Alternative"/>
  </div>
</template>

<script>

import Find from './components/Find'

export default {
  name: 'App',
  components: {
    Find
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
