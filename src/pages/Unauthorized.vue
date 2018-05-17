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
                        prop="username">
            <el-input v-model="signin.username"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label=" "
                        prop="password">
            <el-input type="password"
                      v-model="signin.password"
                      placeholder="请输入密码"></el-input>
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
import { setStorage } from '@/utils'

export default {
  name: 'signin',
  data() {
    return {
      signin: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.login(this.signin)
            .then((res) => {
              setStorage('username', res.data.username)
              this.$router.push({ name: 'TransactionRecords' })
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
