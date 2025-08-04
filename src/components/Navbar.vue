<template>
  <nav class="navbar">
    <div class="navbar-logo">MyShop</div>

    <div class="navbar-toggle" @click="toggleMenu">
      ☰
    </div>

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
        <router-link to="/login" class="login-link">Login / Sign Up</router-link>
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
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      showDropdown: false,
      isLoggedIn: false,
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0a3d62;
  color: white;
  padding: 1rem 2rem;
  position: sticky;
  box-sizing: border-box;
  flex-wrap: wrap;

  .navbar-logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 60%;
  }

  .searchBar {
    width: 100%;
    border-radius: 20px;
    height: 40px;
    padding: 0 2.5rem 0 0.8rem;
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
  left: 8px;
  padding-right: 5px;
}


  .clear-icon {
    right: 8px;
  }

  .nav-item {
    text-decoration: none;
    font-weight: 600;
    color: #333;
    transition: color 0.3s;
  }

  .profile-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .profile-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
  }

  .login-link {
    text-decoration: none;
    font-weight: 500;
    color: #ffffff;
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
    color: #ffffff;
  }

  .dropdown-menu a,
  .dropdown-menu button {
    padding: 8px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    color: #ffffff;
  }

  .navbar-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;

    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: #f39c12;
      }
    }
  }

  .navbar-toggle {
    display: none;
    font-size: 1.8rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .navbar-links {
      flex-direction: column;
      position: absolute;
      top: 60px;
      right: 0;
      background-color: #0a3d62;
      width: 100%;
      display: none;
      padding: 1rem 0;

      &.active {
        display: flex;
      }
    }

    .navbar-toggle {
      display: block;
    }

    .search-wrapper {
      width: 100%;
      margin-top: 1rem;
    }
  }
}
</style>
