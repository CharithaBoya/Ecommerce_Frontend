<!-- <script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; 


 
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    }
  },
  methods: {
    handleLogin() {
      axios.post("http://10.20.6.241:8080/auth/login", {
        customerEmail: this.email,
        customerPassword: this.password
      },
    {
      headers: {
        'x-Skip-Auth': 'false' 
      }
    })
      .then(response => {
        console.log("Full response data:", response.data.data.token);  
        const token = response.data.data.token;
     
        if (token) {
          // localStorage.setItem("jwt", token);
          const auth = useAuthStore();
        //   auth.login(token);
         auth.login(token, response.data.data);
         

          alert(`Logged in as ${this.email}`);
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath);
        } else {
          alert("Login failed: No token received");
        }
      })
      .catch(error => {
        alert("Login failed: " + (error.response?.data?.message || error.message));
      });
    }
  }
};
</script>
 
<template>
<div class="login-container">
<h2 class="login-title">Login</h2>
<form @submit.prevent="handleLogin" class="login-form">
<input v-model="email" placeholder="Email" required class="login-input" />
<div v-if="email && !isEmailValid" class="error">Enter a valid email address</div>
<input v-model="password" type="password" placeholder="Password" required class="login-input" />
<button type="submit" class="login-button">Login</button>
<router-link to="/register" class="link">New here? Register</router-link>
</form>
</div>
</template>
 
<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  background: #bfe5e4;
  border-radius: 12px;
}
 
.login-title {
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
}
 
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
 
.login-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
 
.error {
  font-size: 12px;
  color: #e53935;
}
 
.login-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 4px #3498db66;
}
 
.login-button {
  padding: 12px;
  background-color: #6cc0a8;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
 
.login-button:hover {
  background-color: #2cafad;
}
 
.link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #38753a;
  text-decoration: none;
  font-weight: 500;
}
</style> -->

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toastification';

export default {
  name: 'LoginForm',

  data() {
    return {
      email: '',
      password: ''
    };
  },

  computed: {
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    }
  },

  methods: {
    ...mapActions(useAuthStore, ['login']),

    handleLogin() {
      const toast =useToast();
      axios.post(
        "http://10.20.6.241:8080/auth/login",
        {
          customerEmail: this.email,
          customerPassword: this.password
        },
        {
          headers: {
            'x-Skip-Auth': 'false'
          }
        }
      )
      .then(response => {
        const token = response.data?.data?.token;
        console.log("Full response data:", token);

        if (token) {
          this.login(token, response.data.data);

          toast.success(`Logged in as ${this.email}`, {
            timeout: 3000,
            position: "top-right"
          });
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(redirectPath);
        } else {
          toast.error("Login failed: No token received",{timeout: 3000,
            position: "top-right"});
        }
      })
      .catch(error => {
        toast.error(error.response?.data?.message || error.message,{
          timeout: 3000,
            position: "top-right"
        });
      });
    }
  }
};
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>

    <form @submit.prevent="handleLogin" class="login-form">
      <input v-model="email" placeholder="Email" required class="login-input" />
      <div v-if="email && !isEmailValid" class="error">Enter a valid email address</div>

      <input v-model="password" type="password" placeholder="Password" required class="login-input" />

      <button type="submit" class="login-button">Login</button>
      <router-link to="/register" class="link">New here? Register</router-link>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  background: #bfe5e4;
  border-radius: 12px;
}

.login-title {
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.error {
  font-size: 12px;
  color: #e53935;
}

.login-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 4px #3498db66;
}

.login-button {
  padding: 12px;
  background-color: #6cc0a8;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.login-button:hover {
  background-color: #2cafad;
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
