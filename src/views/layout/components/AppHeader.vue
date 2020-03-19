<template>
    <el-row>
  <el-col :span="4">
      <img src="../../../assets/head.png" alt="">
      <span>电商后台管理系统</span>
    </el-col>
  <el-col :span="1" :offset="19">
    <div class="grid-content bg-purple">
      <el-button @click="signOut">退出</el-button>
      </div>
      </el-col>
</el-row>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    signOut () {
      this.$confirm('是否要退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.sessionStorage.clear()
        this.$router.push('login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .el-row{
    .el-col{
      line-height: 60px;
      img{
        width: 50px;
        height: 50px;
      }
      span{
        display: inline-block;
        font-size: 22px;
        color: #fff;
      }
    }
  }
</style>
