<!-- <template>
  <nav class="navbar">
    <div class="navbar-logo"><img src="https://i.ibb.co/VWDv0zwn/image-removebg-preview.png"></div>

   

    <div class="search-wrapper">
        <img
      src="https://i.ibb.co/xqdS8CLH/search.png"
      alt="Search"
      class="icon search-icon"
      @click="searchProduct"
    />
      <input
        v-model="searchQuery"
        @keyup.enter="searchProduct"
        type="text"
        class="searchBar"
        placeholder="     Search..."
      />

          <img
      src="https://i.ibb.co/VYQyLqdV/close.png"
      alt="Search"
      class="icon clear-icon"
      @click="clearSearch"
    />
      
    </div>

    <ul :class="['navbar-links', { active: isMenuOpen }]">
      <li>
        <router-link to="/" class="nav-item">Home</router-link>
      </li>
      <li>
        <router-link to="/cart" class="nav-item">Cart </router-link>
      </li>
    </ul>

    <div class="profile-container">

      <template v-if="!auth.isLoggedIn">
        <router-link to="/login" class="login-link">Login /<br/> Sign Up</router-link>
      </template>

      <template v-else>
        <div class="profile-dropdown" @click="toggleDropdown">
          <img
            src="https://i.ibb.co/jvSTL1NB/happy.png"
            alt="Profile"
            class="profile-icon"
          />
          <div v-if="showDropdown" class="dropdown-menu">
            <router-link to="/user-details">User Details</router-link>
            <router-link to="/order-history">Order History</router-link>
            <button @click="logout">Logout</button>
          </div>
        </div>
      </template>

  <div class="navbar-toggle" @click="toggleMenu">
  ☰
  <div v-if="isMenuOpen" class="toggle-dropdown">
    <router-link to="/" class="dropdown-link" @click="toggleMenu">Home</router-link>
    <router-link to="/cart" class="dropdown-link" @click="toggleMenu">Cart 🛒</router-link>
  </div>
</div>

    </div>
  </nav>
</template>

<script setup>
// const auth = useAuthStore();

import { useAuthStore } from '@/stores/authStore';
import { onMounted, ref } from 'vue';

const auth = useAuthStore();
const isMenuOpen = ref(false);
const showDropdown = ref(false);
const searchQuery = ref("");

// Rehydrate auth state from localStorage (only if store state was lost)
onMounted(() => {
  const token = localStorage.getItem("jwt");
  const customerData = localStorage.getItem("customer");

  if (token && customerData && !auth.isLoggedIn) {
    const customer = JSON.parse(customerData);
    auth.login(token, customer);
  }

});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  auth.logout();
  showDropdown.value = false;
  location.reload(); // Or use router to redirect
};

const searchProduct = () => {
  if (searchQuery.value.trim()) {
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};
</script>


<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.navbar {
  width: 100%;
  max-width: 100vw;
  background-color: #0A1128;
  color: white;
  padding: 0.6rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: visible;

  &-logo img {
    height: 45px;
    max-width: 100px;
    width: 50px;
    border-radius: 50%;
  }

  .search-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 1rem;
    min-width: 180px;

    .searchBar {
      width: 100%;
      border-radius: 20px;
      height: 34px;
      padding: 0 2rem;
      border: none;
      outline: none;
      font-size: 0.9rem;
    }

    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      cursor: pointer;

      &.search-icon {
        left: 12px;
      }

      &.clear-icon {
        right: 12px;
      }
    }
  }

  &-links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    z-index: 1;

    a {
      text-decoration: none;
      font-weight: 600;
      color: white;
      transition: color 0.3s;
    }

    &.active {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }

  .profile-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 0.5rem;
    white-space: nowrap;
    z-index: 1001;
    position: relative;

    .login-link {
      text-decoration: none;
      font-weight: 500;
      color: #ffffff;
      font-size: 0.9rem;
      padding: 0 0.4rem;
    }

    .profile-icon {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
    }

    .profile-dropdown {
      position: relative;

      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: #111;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 3000;
        color: white;
        border-radius: 5px;
        min-width: 160px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

        a,
        button {
          display: block;
          padding: 8px 12px;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          color: white;
          width: 100%;
          text-align: left;
        }
      }
    }
  }

  &-toggle {
    display: none;
    font-size: 1.6rem;
    cursor: pointer;
    margin-left: 0.5rem;
    color: white;
    position: relative;

    .toggle-dropdown {
      position: absolute;
      background: #0a3d62;
      top: 40px;
      right: 0;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      z-index: 2000;
      display: flex;
      flex-direction: column;

      .dropdown-link {
        color: white;
        text-decoration: none;
        padding: 0.5rem 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;

    &-logo {
      align-self: flex-start;
    }

    .search-wrapper {
      width: 100%;
      margin: 0.5rem 0;
      order: 2;
    }

    &-links {
      display: none;
    }

    &-toggle {
      display: block;
      align-self: flex-end;
      order: 4;
      margin-top: 0.5rem;
    }

    .profile-container {
      order: 3;
      margin-top: 0.5rem;
      justify-content: flex-end;

      .login-link {
        white-space: nowrap;
      }
    }
  }
}
</style> -->

<template>
  <nav class="navbar">

    <router-link to="/" class="navbar-logo">
        <img src="https://i.ibb.co/VWDv0zwn/image-removebg-preview.png">
    </router-link>

    <div class="search-wrapper">
    <img
      src="https://i.ibb.co/xqdS8CLH/search.png"
      alt="Search"
      class="icon search-icon"
      @click="searchProduct"
    />
      <input
        v-model="searchQuery"
        @keyup.enter="searchProduct"
        type="text"
        class="searchBar"
        placeholder="     Search..."
      />

    <img
      src="https://i.ibb.co/VYQyLqdV/close.png"
      alt="Search"
      class="icon clear-icon"
      
    />
      
    </div>

    <ul :class="['navbar-links', { active: isMenuOpen }]">
      <li>
        <router-link to="/order-history" class="nav-item"> 
            My Orders 
        </router-link>
      </li>
      <li>
        <router-link to="/cart" class="nav-item">Cart </router-link>
      </li>
    </ul>

    <div class="profile-container">

      <template v-if="!auth.isLoggedIn">
        <router-link to="/login" class="login-link">Login /<br/> Sign Up</router-link>
      </template>

      <template v-else>
        <div class="profile-dropdown" @click="toggleDropdown">
          <img
            src="https://i.ibb.co/jvSTL1NB/happy.png"
            alt="Profile"
            class="profile-icon"
          />
          <div v-if="showDropdown" class="dropdown-menu">
            <router-link to="/user-details">User Details</router-link>

            <button @click="logout">Logout</button>
          </div>
        </div>
      </template>


    </div>
  </nav>
</template>

<script setup>


import { useAuthStore } from '@/stores/authStore';
import { onMounted, ref } from 'vue';

const auth = useAuthStore();
const isMenuOpen = ref(false);
const showDropdown = ref(false);
const searchQuery = ref("");

onMounted(() => {
  const token = localStorage.getItem("jwt");
  const customerData = localStorage.getItem("customer");

  if (token && customerData && !auth.isLoggedIn) {
    const customer = JSON.parse(customerData);
    auth.login(token, customer);
  }

});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  auth.logout();
  showDropdown.value = false;
  location.reload(); 
};

const searchProduct = () => {
  if (searchQuery.value.trim()) {
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`;
    
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};
</script>


<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.navbar {
  width: 100%;
  max-width: 100vw;
  background-color: #0A1128;
  color: white;
  padding: 0.6rem 1rem;
  position: sticky;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;


  &-logo img {
    height: 45px;
    width: 50px;
  }

  .search-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 1rem;
    min-width: 180px;
    position: relative;

    .searchBar {
      width: 100%;
      border-radius: 20px;
      height: 34px;
      padding: 0 2rem;
      border: none;
      outline: none;
      font-size: 0.9rem;
    
    }

    .icon {
      position: absolute;
      width: 16px;
      height: 16px;
      cursor: pointer;

      &.search-icon {
        left: 12px;
      }

      &.clear-icon {
        right: 12px;
      }
    }
  }

  &-links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    z-index: 1;

    a {
      text-decoration: none;
      font-weight: 600;
      color: white;
      transition: color 0.3s;
    }

    &.active {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }

  .profile-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 0.5rem;
    white-space: nowrap;
    z-index: 1001;
    position: relative;

    .login-link {
      text-decoration: none;
      font-weight: 500;
      color: #ffffff;
      font-size: 0.9rem;
      padding: 0 0.4rem;
    }

    .profile-icon {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
    }

    .profile-dropdown {
      position: relative;

      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: #111;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 3000;
        color: white;
        border-radius: 5px;
        min-width: 160px;
       // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

        a,
        button {
          display: block;
          padding: 8px 12px;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          color: white;
          width: 100%;
          text-align: left;
        }
      }
    }
  }

  &-toggle {
    display: none;
    font-size: 1.6rem;
    cursor: pointer;
    margin-left: 0.5rem;
    color: white;
    position: relative;

    .toggle-dropdown {
      position: absolute;
      background: #0a3d62;
      top: 40px;
      right: 0;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      z-index: 2000;
      display: flex;
      flex-direction: column;

      .dropdown-link {
        color: white;
        padding: 0.5rem 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;

    &-logo {
      align-self: flex-start;
    }

    .search-wrapper {
      width: 100%;
      margin: 0.5rem 0;
      order: 2;
    }

    &-links {
      display: none;
    }

    &-toggle {
      display: block;
      align-self: flex-end;
      order: 4;
      margin-top: 0.5rem;
    }

    .profile-container {
      order: 3;
      margin-top: 0.5rem;
      justify-content: flex-end;

      .login-link {
        white-space: nowrap;
      }
    }
  }
}
</style>