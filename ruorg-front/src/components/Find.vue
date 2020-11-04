<template>
  <div id="app">
    <Autocomplete :search="search"
                  @submit="handleSubmit"
                  placeholder="Найти альтернативу..."></Autocomplete>
  </div>
</template>

<script>

import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
  name: 'Find',
  components: {
    Autocomplete
  },
  computed: {
    noResults() {
      return this.value && this.results.length === 0
    }
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return []
      }
      return ['http://ya.ru/', 'US'].filter(country => {
        return country.toLowerCase()
            .startsWith(input.toLowerCase())
      })
    },
    handleSubmit(result) {
      window.open(result)
    }
  }
}


</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  max-width: 800px;
  margin: 0 auto;
}

@media screen and (max-width: 600px) {
  #app {
    float: none;
  }

  #app {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }

  #app input[type=text] {
    border: 1px solid #ccc;
  }
}

</style>