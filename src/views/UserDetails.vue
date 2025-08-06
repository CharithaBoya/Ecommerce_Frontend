<template>
  <div class="profile">
    <h2 class="title">My Profile</h2>

    <div v-if="isLoggedIn && fetchedCustomerData">
      <div class="field"><strong>Full Name:</strong> {{ fetchedCustomerData.customerName }}</div>
      <div class="field"><strong>Phone:</strong> {{ fetchedCustomerData.phoneNo }}</div>
      <div class="field"><strong>Email:</strong> {{ fetchedCustomerData.customerEmail }}</div>
      <div class="field"><strong>Address:</strong> {{ fetchedCustomerData.address }}</div>
    </div>

    <div v-else>
      <p>You are not logged in. Please <router-link to="/login">Login</router-link>.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';

const auth = useAuthStore();
const isLoggedIn = computed(() => auth.isLoggedIn);
const customer = computed(() => auth.customer || {});
const fetchedCustomerData = ref(null); 

onMounted(() => {
  const token = localStorage.getItem("jwt");
  const email = customer.value?.customerEmail;

  console.log("Customer email before fetch:", email);

  if (email && token) {
    axios.get(`http://10.20.3.40:8080/auth/customer/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Customer-Email': email,
      }
    })
      .then(response => {
        console.log("Full response data:", response.data);

        if (response.data?.data) {
          fetchedCustomerData.value = response.data.data; 
        } else {
          alert("No customer data received.");
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data: " + (error.response?.data?.message || error.message));
      });
  } else {
    console.warn("Token or email missing. Cannot fetch user data.");
  }
});
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 80px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

  .title {
    text-align: center;
    font-size: 2rem;
    color: #0a3d62;
    margin-bottom: 2rem;
  }

  .field {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0.8rem;
    background-color: #f2f6fa;
    border-left: 4px solid #0a3d62;
    border-radius: 6px;

    strong {
      color: #333;
      margin-right: 6px;
    }
  }

  p {
    text-align: center;
    font-size: 1rem;

    a {
      color: #0a3d62;
      font-weight: 500;
      text-decoration: underline;

      &:hover {
        color: #1e6fa8;
      }
    }
  }
}
</style>