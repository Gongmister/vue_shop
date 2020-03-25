<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-button type="primary" @click="addClass">添加分类</el-button>
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
    <el-dialog
        title="修改分类"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="cateList" label-width="80px">
  <el-form-item label="分类名称">
    <el-input v-model="cateList.cat_name"></el-input>
  </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="determineCate">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
        title="添加分类"
        :visible.sync="btVisible"
        width="30%"
        :before-close="handleClose">
        <el-form label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="cateList.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="分类名称">
             <el-cascader
                    expand-trigger="hover"
                    v-model="selectedCate"
                    :options="categoriesList"
                    :props="cateProps"
                    @change="handleChange"></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="btVisible = false">取 消</el-button>
            <el-button type="primary" @click="addHandClass">确 定</el-button>
  </span>
</el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
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
      ],
      categoriesList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCate: [],
      dialogVisible: false,
      cateList: {},
      btVisible: false
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
        this.categoriesList = res.data.data
        console.log(this.categoriesList)
      })
    },
    editTable (id) {
      this.dialogVisible = true
      this.className(id)
    },
    className () {
      this.$http({
        method: 'get',
        url: 'categories/' + this.categoriesList.cat_id
      }).then(res => {
        this.cateList = res.data.data
      })
    },
    deleteTable (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$http({
          method: 'delete',
          url: 'categories/' + id
        }).then(res => {
          console.log(res)
          this.getCategories()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    determineCate () {
      this.$http({
        method: 'put',
        url: 'categories/' + this.cateList.cat_id,
        params: this.cateList.cat_name
      }).then(res => {
        console.log(res)
      })
      this.dialogVisible = false
      this.getCategories()
    },
    addClass () {
      this.btVisible = true
    },
    handleChange (value) {
      console.log(value)
    },
    addHandClass () {
      console.log(this.categoriesList)
      this.$http({
        method: 'post',
        url: 'categories',
        data: this.selectedCate
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
