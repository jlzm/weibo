<template>
  <div id="app">
    <router-view class="view"></router-view>
    <Chat/>
  </div>
</template>

<script>
import Chat from "./components/Chat";

export default {
  name: 'app',
  components: {
    Chat
  }
}
</script>

<style scoped>
</style>
