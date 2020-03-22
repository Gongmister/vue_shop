<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table
                :data="jurList"
                style="width: 100%"
                border>
                <el-table-column
                    label="#"
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="authName"
                    label="权限名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="path"
                    label="路径">
                </el-table-column>
                 <el-table-column
                    label="权限等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag v-if="scope.row.level === '1'" type="success">二级</el-tag>
                        <el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
                    </template>
                </el-table-column>
                </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      jurList: []
    }
  },
  created () {
    this.getJurisdiction()
  },
  methods: {
    getJurisdiction () {
      this.$http({
        method: 'get',
        url: 'rights/list'
      }).then(res => {
        console.log(res.data.data)
        this.jurList = res.data.data
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
