<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-button>添加角色</el-button>
             <el-table
    :data="rolesList"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-col
        v-for="item in scope.row.children"
        :key="item.id"
        >
          <el-col :span="4">
            <el-tag
            closable
            type=''>
            {{item.authName}}
            </el-tag>
        </el-col>
         <el-col :span="8"
         v-for="items in item.children"
            :key="items.id">
             <el-tag
            closable
            type='success'>
            {{items.authName}}
            </el-tag>
        </el-col>
         <el-col :span="12"
         v-for="itemss in item.children.children"
            :key="itemss.id">
              <el-tag
            closable
            type='warning'>
            {{itemss.authName}}
            </el-tag>
        </el-col>
        </el-col>
      </template>
    </el-table-column>
    <el-table-column
      label="#"
      type="index">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作"
      >
    </el-table-column>
  </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },
      {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },
      {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },
      {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      rolesList: []
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    getRoles () {
      this.$http({
        method: 'get',
        url: 'roles'
      }).then(res => {
        console.log(res.data.data)
        this.rolesList = res.data.data
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
