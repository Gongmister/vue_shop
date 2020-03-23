<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-col :span="8">
                    <el-input placeholder="请输入内容" class="input-with-select">
                         <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary">添加用户</el-button>
                <el-table
      :data="goodsList.goods"
      style="width: 100%"
      border>
      <el-table-column
        label="#"
        type="index">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格（元）">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品重量">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
            <span>{{scope.row.upd_time | capitalize}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row.goods_id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsList.total">
    </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      goodsQuery: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: []
    }
  },
  created () {
    this.getGoods()
  },
  filters: {
    capitalize: function (value) {
      const date = new Date(value)
      const y = date.getFullYear(value)
      const m = date.getMonth(value) + 1
      const d = date.getDate(value)
      const h = date.getHours(value)
      const mi = date.getMinutes(value)
      const s = date.getSeconds(value)
      return `${y}-${m}-${d} ${h}:${mi}:${s}`
    }
  },
  methods: {
    getGoods () {
      this.$http({
        method: 'get',
        url: 'goods',
        params: this.goodsQuery
      }).then(res => {
        console.log(res.data.data)
        this.goodsList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      this.goodsQuery.pagesize = val
      this.getGoods()
    },
    handleCurrentChange (val) {
      this.goodsQuery.pagenum = val
      this.getGoods()
    },
    deleteGoods (id) {
      this.$confirm('是否删除?', '提示', {
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
          url: 'goods/' + id
        }).then(res => {
          this.getGoods()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
