<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div style="margin-top: 15px;">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                         <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary">添加用户</el-button>
            </div>
             <el-table
                :data="userList.users"
                style="width: 100%"
                border
                >
                <el-table-column
                    label="#"
                    type="index"
                    >
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话">
                </el-table-column>
                <el-table-column
                    prop="role_name"
                    label="角色">
                </el-table-column>
                 <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                       {{scope.row.id}}
                       <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
                        <el-button size="mini" type="warning" icon="el-icon-s-tools"></el-button>
                    </template>
                </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[2, 5, 10, 15]"
                    :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="userList.total">
                </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userList: [],
      userName: {
        query: '',
        pagenum: '1',
        pagesize: 2
      },
      input: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data: res } = await this.$http.get('users', { params: this.userName })
      console.log(res.data)
      this.userList = res.data
    },
    handleSizeChange (val) {
      this.userName.pagesize = val
      this.getUser()
    },
    handleCurrentChange (val) {
      this.userName.pagenum = val
      this.getUser()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
