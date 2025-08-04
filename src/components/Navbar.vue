<template>
  <nav class="navbar">
    <div class="navbar-logo"><img src="https://i.ibb.co/pjxNNkC5/Click-NCart-logo-transparent.png"></div>

   

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
  padding: 0.6rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.navbar-logo img {
  height: 36px;
  max-width: 120px;
}

.search-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 1rem;
  min-width: 180px;
}

.searchBar {
  width: 100%;
  border-radius: 20px;
  height: 34px;
  padding: 0 2rem;
  box-sizing: border-box;
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
}

.search-icon {
  left: 12px;
}

.clear-icon {
  right: 12px;
}

.navbar-links {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
}

.navbar-links a {
  text-decoration: none;
  font-weight: 600;
  color: white;
  transition: color 0.3s;
}

.profile-container {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 0.5rem;
  white-space: nowrap;
}

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
}

.dropdown-menu {
  position: absolute;
  background: #111;
  border: 1px solid #ccc;
  padding: 10px;
  right: 0;
  z-index: 999;
  color: white;
  border-radius: 5px;
}

.dropdown-menu a,
.dropdown-menu button {
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

.navbar-toggle {
  display: none;
  font-size: 1.6rem;
  cursor: pointer;
  margin-left: 0.5rem;
  position: relative;
  color: white;
}

.toggle-dropdown {
  position: absolute;
  background: #0a3d62;
  top: 40px;
  right: 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

.toggle-dropdown .dropdown-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
  }

  .navbar-logo {
    align-self: flex-start;
  }

  .search-wrapper {
    width: 100%;
    margin: 0.5rem 0;
    order: 2;
  }

  .navbar-links {
    display: none;
  }

  .navbar-links.active {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .navbar-toggle {
    display: block;
    align-self: flex-end;
    order: 4;
    margin-top: 0.5rem;
  }

  .profile-container {
    order: 3;
    margin-top: 0.5rem;
    justify-content: flex-end;
  }

  .login-link {
    white-space: nowrap;
  }
}
</style>

