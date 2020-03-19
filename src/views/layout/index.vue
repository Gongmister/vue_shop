<template>
   <el-container>
  <el-header>
      <AppHeader />
  </el-header>
  <el-container>
    <el-aside width="200px">
        <AppAside />
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
export default {
  data () {
    return {}
  },
  components: {
    AppAside,
    AppHeader
  }
}
</script>
<style lang="less" scoped>
.el-container{
    height: 100%;
}
</style>
