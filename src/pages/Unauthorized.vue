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
export default {
  name: 'signin',
  data() {
    let checkAccount = (rule, value, callback) => {
      if (value === 'Sherry') {
        callback()
      } else {
        callback(new Error('error:用户名不存在'))
      }
    }
    let checkPassword = (rule, value, callback) => {
      if (value === '1234567890' && this.signin.account === 'Sherry') {
        callback()
      } else {
        callback(new Error('error密码不正确'))
      }
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
            trigger: 'change'
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
      // login
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('login!')
          // window.location.href='/'
          this.$router.push('/')
        } else {
          console.log('error login')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css">
section.signin-page {
  background: #252935;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  -ms-flex-pack: center;
  justify-content: center;
}

.middle-box {
  -ms-flex-direction: column;
  flex-direction: column;
  width: 500px;
  height: 400px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
}

.middle-box .logo {
  position: absolute;
  top: -80px;
}

.middle-box .signin {
  width: 400px
}

.middle-box .signin .title>p {
  color: #38c7ff;
  text-align: center;
  font-size: 26px;
  margin-bottom: 30px;
}

.middle-box .signin .el-form-item__label {
  padding: 0;
}

.middle-box .signin .el-input__inner {
  background-color: #eff2f7;
  border-color: #eff2f7;
  height: 44px;
}

.middle-box .signin button {
  width: 100%;
  height: 45px;
  background-color: #38c7ff;
  border-color: #38c7ff;
}

.middle-box .signin button>span {
  font-size: 16px;
}

.middle-box .signin .el-checkbox__inner:hover {
  border-color: #38c7ff;
}

.middle-box .signin .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #38c7ff;
  border-color: #38c7ff;
}
</style>
