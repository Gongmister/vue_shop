<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" v-for="items in userList" :key="items.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{items.authName}}</span>
        </template>
        <el-menu-item-group v-for="item in items.children" :key="item.id">
          <el-menu-item index="1-1">{{item.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
  data () {
    return {
      userList: {}
    }
  },
  created () {
    this.getUserName()
  },
  methods: {
    async getUserName () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      this.userList = res.data
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
 .el-menu{
     height: 100%;
 }
</style>
