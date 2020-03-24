<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-button>添加分类</el-button>
            <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="categoriesList"
      :columns="columns"
      :stripe="true"
      :border="true"
      :show-header="true"
      :show-summary="false"
      :show-row-hover="false"
      :show-index="true"
      :tree-type="true"
      :is-fold="true"
      :expand-type="false"
      :selection-type="false">
      <template slot="a" scope="scope">
        <i class="el-icon-success" style="color:red" v-if="scope.row.cat_deleted === true"></i>
        <i class="el-icon-success" style="color:green" v-if="scope.row.cat_deleted === false"></i>
      </template>
      <template slot="level" scope="scope">
        <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
        <el-tag type="success" v-if="scope.row.cat_level === 1">二级</el-tag>
        <el-tag type="warning" v-if="scope.row.cat_level === 2">三级</el-tag>
      </template>
      <template slot="likes" scope="scope">
         <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTable(scope.row.cat_id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"  @click="deleteTable(scope.row.cat_id)">删除</el-button>
      </template>
    </zk-table>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      categoriesList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          width: '400px'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          minWidth: '50px',
          type: 'template',
          template: 'a'
        },
        {
          label: '排序',
          prop: 'cat_deleted',
          type: 'template',
          template: 'level'
        },
        {
          label: '操作',
          prop: 'cat_deleted',
          minWidth: '200px',
          type: 'template',
          template: 'likes'
        }
      ]
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$http({
        method: 'get',
        url: 'categories'
      }).then(res => {
        console.log(res.data.data)
        this.categoriesList = res.data.data
      })
    },
    editTable (id) {
      console.log(id)
    },
    deleteTable (id) {
      console.log(id)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
