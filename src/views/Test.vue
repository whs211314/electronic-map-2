<template>
  <div class="test">
    <BDMap class="map" :lng="lng" :lat="lat" />
    <button @click="handleClick">CHANGE</button>
  </div>
</template>

<script>
import BDMap from '../components/BDMap'
export default {
  data () {
    return {
      lng: 112.15625,
      lat: 27.306640625
    }
  },
  methods: {
    handleClick () {
      this.lng = 112.0498046875
      this.lat = 27.1484375
    }
  },
  components: {
    BDMap
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 400px;
  height: 300px;
}
</style>
