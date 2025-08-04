<template>
  <nav class="navbar">
    <div class="navbar-logo">MyShop</div>

   

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
        <router-link to="/cart" class="nav-item">Cart 🛒</router-link>
      </li>
    </ul>

    <div class="profile-container">

      <template v-if="!isLoggedIn">
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

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      showDropdown: false,
      isLoggedIn: true,
      searchQuery: ''
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      this.isLoggedIn = false;
      this.showDropdown = false;
      this.$router.push('/');
    },
    searchProduct() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } });
      }
    },
    clearSearch() {
      this.searchQuery = '';
    }
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #0a3d62;
  color: white;
  padding: 0.8rem 1.2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
}

.search-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 1rem;
}

.searchBar {
  width: 100%;
  border-radius: 20px;
  height: 40px;
  padding: 0 2.2rem;
  box-sizing: border-box;
  border: none;
  outline: none;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.search-icon {
  left: 12px;
}

.clear-icon {
  right: 12px;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin-left: auto;
}

.navbar-links a {
  text-decoration: none;
  font-weight: 600;
  color: white;
  transition: color 0.3s;
}

.profile-container {
  margin-left: 1rem;
  position: relative;
}

.login-link {
  text-decoration: none;
  font-weight: 500;
  color: #ffffff;
}

.profile-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.profile-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  background: black;
  border: 1px solid #ccc;
  padding: 10px;
  right: 0;
  z-index: 999;
  color: white;
}

.dropdown-menu a,
.dropdown-menu button {
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.navbar-toggle {
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
  margin-left: 1rem;
}

/* Mobile styles */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
  }

  .search-wrapper {
    order: 2;
    width: 100%;
    margin-top: 1rem;
  }

  .profile-container {
    order: 3;
    margin-top: 0.5rem;
    margin-left: 0;
  }

  .navbar-toggle {
    display: block;
    order: 4;
    margin-top: 0.5rem;
  }

  .navbar-links {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  .navbar-links.active {
    display: flex;
  }

  .navbar-links li {
    padding: 0.5rem 0;
    text-align: center;
  }
}


</style>
