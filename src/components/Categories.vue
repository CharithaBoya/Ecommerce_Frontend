<template>
  <section class="categories">
    <h2>Shop by Category</h2>
    <div class="category-list">
      <div
        class="category-card"
        v-for="(category, index) in categories"
        :key="index"
        @click="goToCategory(category)"
      >
        <img :src="category.imageUrl" :alt="category.name" />
        <p>{{ category.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { getAllCategories } from "@/services/apiService";

export default {
  name: "Categories",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const data = await getAllCategories();
        this.categories = data; // expecting array of { name, imageUrl }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    goToCategory(category) {
      this.$router.push({
        name: "CategoryProducts",
        params: { categoryName: category.name },
      });
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped lang="scss">
.categories {
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  .category-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 180px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    p {
      margin: 0.8rem;
      font-weight: 500;
      color: #333;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
