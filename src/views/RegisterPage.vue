<template>
  <div class="register">
    <h2 class="title">Create Account</h2>
    <form @submit.prevent="handleRegister" class="form">
      <input v-model="name" placeholder="Full Name" class="input" required />
      <input v-model="phone" placeholder="Phone Number" class="input" required pattern="\d{10}" />
      
      <input v-model="email" placeholder="Email ID" class="input" required />
      <div v-if="email && !isEmailValid" class="error">Enter a valid email address</div>

      <input v-model="password" type="password" placeholder="Password" class="input" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="input" required />
      <div v-if="password && password !== confirmPassword" class="error">Passwords do not match</div>
    <textarea v-model="address" placeholder="Address" class="input textarea" required></textarea>

      <button class="btn">Register</button>
    </form>

    <router-link to="/login" class="link">Already have an account? Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    },
    formIsValid() {
      return (
        this.name &&
         this.phone &&
        /^\d{10}$/.test(this.phone) &&
        this.isEmailValid &&
        this.password &&
        this.confirmPassword === this.password
      )
    }
  },
  methods: {
    handleRegister() {
      alert('Registered Successfully!')
      // Add real registration logic here
    }
  }
}
</script>


<style scoped>
.register {
  max-width: 400px;
  margin: 80px auto;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 10px;
  background:#bfa5a5;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.error {
  font-size: 12px;
  color: #e53935;
}

.btn {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
}

.link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #38753a;
  text-decoration: none;
  font-weight: 500;
}
</style>
