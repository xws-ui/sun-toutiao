<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 登录表单 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑   把value拿出来进行手机号的格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入六位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     // 提交登录请求
      //     this.$http
      //       .post(
      //         'authorizations',
      //         this.loginForm
      //       )
      //       .then(res => {
      //         // TODO 2. 保存用户的信息  用来判断登录的状态
      //         // sessionStorage BOM对象  全局对象 作用是保存数据
      //         // 是有有效期，当你关闭浏览后就失效
      //         // sessionStorage.setItem(key,value) 存储数据 value字符串
      //         // sessionStorage.getItem(key) 获取数据
      //         // sessionStorage.removeItem(key) 删除数据
      //         // sessionStorage.clear() 清空所有的数据
      //         window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(res.data.data))
      //         // 跳转到首页
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         this.$message.error('手机号或验证码错误')
      //       })
      //   }
      // })
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem(
              'hm74-toutiao',
              JSON.stringify(res.data.data)
            )
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
