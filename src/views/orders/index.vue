<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="orderQuery.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="queryOrder"></el-button>
                </el-input>
            </el-col>
             <el-table
      :data="orderList.goods"
      style="width: 100%"
      border>
      <el-table-column
        label="#"
        type="index"
        >
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        >
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格">
      </el-table-column>
      <el-table-column
        label="是否付款">
        <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="warning" v-if="scope.row.pay_status === '0'">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货">
      </el-table-column>
      <el-table-column
        label="下单时间">
         <template slot-scope="scope">
          <span>{{scope.row.update_time | capitalize}}</span>
      </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrder(scope.row.order_id)"></el-button>
            <el-button type="success" icon="el-icon-star-off" size="mini" @click="searchOrder(scope.row.order_id)"></el-button>
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
      :total="orderList.total">
    </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      orderQuery: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      orderList: []
    }
  },
  created () {
    this.getOrder()
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
    getOrder () {
      this.$http({
        method: 'get',
        url: 'orders',
        params: this.orderQuery
      }).then(res => {
        this.orderList = res.data.data
      })
    },
    handleSizeChange (val) {
      this.orderQuery.pagesize = val
      this.getOrder()
    },
    handleCurrentChange (val) {
      this.orderQuery.pagenum = val
      this.getOrder()
    },
    editOrder (id) {
      console.log(id)
    },
    searchOrder (id) {
      console.log(id)
    },
    queryOrder () {
      this.getOrder()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
