<template>
    <div class="login-box">
       <div class="login-head">
           <div class="login-image">
               <img src="../../assets/logo.png" alt="">
           </div>
           <div class="login-text">
                <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password"  placeholder="请输入用户密码" prefix-icon="el-icon-s-goods"></el-input>
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
                <el-button type="info" @click="resetFrom('form')">重置</el-button>
            </el-form-item>
       </el-form>
           </div>
       </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetFrom (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.form)
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败了')
        }
        this.$message.success('登录成功了')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
   .login-box{
       height: 100%;
       background: #2b4b6b;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-head{
            background: #fff;
            width: 450px;
            height: 304px;
            border-radius: 10px;
            .login-image{
                width: 148px;
                height: 148px;
                margin-left: 50%;
                transform: translateX(-50%);
                margin-top:-50px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px #eee;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    background: #eee;
                }
            }
            .login-text{
               box-sizing: border-box;
            }
            .el-form-item{
                margin: 20px 10px;
            }
            .button{
               margin-left: 64%;
            }
        }
   }
</style>
