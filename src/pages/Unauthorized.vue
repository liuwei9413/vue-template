<template>
  <section class="signin-page">
    <div class="middle-box">
      <div class="logo">
        <img src="../assets/vechain.png"
             alt=""
             height="25">
      </div>
      <div class="signin">
        <el-form :rules="rules"
                 ref="form"
                 :model="signin"
                 label-width="0">
          <div class="title">
            <p>账号登录</p>
          </div>
          <el-form-item label=""
                        prop="account">
            <el-input v-model="signin.account"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label=" "
                        prop="password">
            <el-input type="password"
                      v-model="signin.password"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label=" "
                        style="text-align:rightmargin-bottom:35px">
            <el-checkbox v-model="signin.remember">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import './Unauthorized.css'

export default {
  name: 'signin',
  data() {
    let _this = this
    let checkAccount = (rule, value, callback) => {
      _this.$store.dispatch('CHECK_USERNAME', { name: value }).then(function (isOk) {
        isOk ? callback() : callback(new Error('error:用户名不存在'))
      })
    }

    let checkPassword = (rule, value, callback) => {
      _this.$store.dispatch('CHECK_PASSWORD', { password: value, name: this.signin.account }).then(function (isOk) {
        isOk ? callback() : callback(new Error('error:密码不正确'))
      })
    }
    return {
      signin: {
        account: 'Sherry',
        password: '1234567890',
        remember: true
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: checkAccount,
            message: '用户名不存在'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: checkPassword,
            message: '密码不正确'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('login!')
          this.$router.push({ name: 'dashboard' })
        } else {
          return false
        }
      })
    }
  }
}
</script>
