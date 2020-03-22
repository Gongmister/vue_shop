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
                    <el-input placeholder="请输入内容" v-model="userName.query" class="input-with-select">
                         <el-button slot="append" icon="el-icon-search" @click="querySearch"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" @click="addUser">添加用户</el-button>
            </div>
             <el-table
                :data="userList"
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
                            @change="userState(scope.row.id)"
                            >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                       <el-button size="mini" type="primary" icon="el-icon-edit" @click="modifyUser(scope.row.id)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.id)"></el-button>
                        <el-button size="mini" type="warning" icon="el-icon-s-tools" @click="distrUser(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- 编辑弹出框 -->
                <el-dialog
                    title="修改用户信息"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-form ref="form" :model="editUserList" label-width="80px">
                      <el-form-item label="用户名">
                        <el-input v-model="editUserList.username" disabled></el-input>
                      </el-form-item>
                       <el-form-item label="邮箱">
                        <el-input v-model="editUserList.email"></el-input>
                      </el-form-item>
                       <el-form-item label="电话号">
                        <el-input v-model="editUserList.mobile"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editSub">确 定</el-button>
                    </span>
                    </el-dialog>
                    <!-- 添加用户 -->
                     <el-dialog
                    title="修改用户信息"
                    :visible.sync="addVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-form ref="form" :model="addUserList" label-width="80px">
                      <el-form-item label="用户名">
                        <el-input v-model="addUserList.username"></el-input>
                      </el-form-item>
                       <el-form-item label="密码">
                        <el-input v-model="addUserList.password"></el-input>
                      </el-form-item>
                       <el-form-item label="邮箱">
                        <el-input v-model="addUserList.email"></el-input>
                      </el-form-item>
                      <el-form-item label="电话号">
                        <el-input v-model="addUserList.mobile"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="addVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUsername">确 定</el-button>
                    </span>
                    </el-dialog>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[2, 5, 10, 15]"
                    :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="userListA.total">
                </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userList: [],
      userListA: [],
      userName: {
        query: '',
        pagenum: '1',
        pagesize: 2
      },
      dialogVisible: false,
      addVisible: false,
      editUserList: {},
      addUserList: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data: res } = await this.$http.get('users', { params: this.userName })
      this.userList = res.data.users
      this.userListA = res.data
    },
    handleSizeChange (val) {
      this.userName.pagesize = val
      this.getUser()
    },
    handleCurrentChange (val) {
      this.userName.pagenum = val
      this.getUser()
    },
    async modifyUser (id) {
      this.dialogVisible = true
      const { data: res } = await this.$http.get('users/' + id)
      console.log(res.data)
      this.editUserList = res.data
    },
    deleteUser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        const { data: res } = this.$http.delete('users/' + id)
        console.log(res)
        this.getUser()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    distrUser (id) {
      console.log(id)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    editSub () {
      this.$http({
        method: 'put',
        url: 'users/' + this.editUserList.id,
        data: this.editUserList
      }).then(res => {
        this.dialogVisible = false
        this.getUser()
      })
    },
    addUser () {
      this.addVisible = true
    },
    addUsername () {
      this.$http({
        method: 'post',
        url: 'users',
        data: this.addUserList
      }).then(res => {
        this.addVisible = false
        this.getUser()
      })
    },
    userState (id) {
      console.log(id)
      this.$http({
        method: 'put',
        url: 'users/' + id + '/state/' + this.userList.mg_state
      }).then(res => {
        console.log(res)
      })
    },
    querySearch () {
      this.getUser()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
