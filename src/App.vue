<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
html,body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: rgba(0,0,0,.9);
}
body {
  // min-width: 1920px;
  // max-width: 3840px;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  input {
    padding: 0;
    margin: 0;
  }
  #app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: top left;
    width: 0;
  }
  .container,
  .container > div {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
}
#app {
  &.ratio-larger {
    padding-top: calc(100% / 3.3);
  }
  &.ratio-large {
    padding-top: calc(100% / 3.2);
  }
  &.ratio-small {
    padding-top: calc(100% / 2.7);
  }
}
.toasted {
  font-weight: bold !important;
}
</style>
