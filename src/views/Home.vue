<template>
  <main class="main">
    <h1>{{ isSearching ? "Search result" : "Popular movies" }}</h1>
    <form @submit="searchMovie">
      <div class="input">
        <input type="text" v-model="textSearch" />
        <button type="submit">
          <ph-magnifying-glass :size="20" weight="bold" />
        </button>
      </div>
    </form>

    <div v-show="isError" class="error-message">
      <ph-warning-circle :size="32" /> <span>something went wrong</span>
    </div>

    <Loading v-if="loading" />

    <div v-else class="grid-movies">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-show="loadMore && !loading" class="load-more">
      <button @click="getMoreMovies">
        <ph-caret-double-down :size="24" class="caret-icon" /> Load More
      </button>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
import Loading from "../components/Loading.vue";

export default {
  components: {
    MovieCard,
    Loading,
  },
  data: function () {
    return {
      movies: [],
      textSearch: "",
      isSearching: false,
      currentPage: 1,
      loading: true,
      loadMore: false,
      isError: false,
    };
  },
  watch: {
    textSearch(newValue) {
      if (newValue === "") {
        this.getPopularMovies();
      }
    },
  },
  methods: {
    async getPopularMovies() {
      this.currentPage = 1;
      this.isSearching = false;

      const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${this.currentPage}`;

      this.loading = true;

      try {
        const response = await axios.get(URL);
        this.movies = response.data.results;
        this.loading = false;
        this.loadMore = true;
      } catch (error) {
        console.clear();
        this.isError = true;
      }
    },
    async searchMovie(e) {
      e.preventDefault();
      this.currentPage = 1;

      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${this.textSearch}&page=${this.currentPage}`;

      if (this.textSearch === "") {
        return;
      }

      this.loading = true;

      try {
        const response = await axios.get(URL);
        this.movies = response.data.results;
        this.isSearching = true;
        this.loading = false;

        if (
          response.data.results.length !== 0 &&
          response.data.results.length > 1
        ) {
          this.loadMore = true;
        } else {
          this.loadMore = false;
        }
      } catch (error) {
        console.clear();
        this.isError = true;
      }
    },
    async getMoreMovies() {
      const BASE_URL = "https://api.themoviedb.org/3";
      const API_KEY = `?api_key=${import.meta.env.VITE_API_KEY}`;
      const QUERY = `&query=${this.textSearch}`;
      const PAGE = `&page=${this.currentPage + 1}`;

      const url = this.isSearching
        ? BASE_URL.concat("/search/movie")
            .concat(API_KEY)
            .concat(QUERY)
            .concat(PAGE)
        : BASE_URL.concat("/movie/popular").concat(API_KEY).concat(PAGE);

      try {
        const response = await axios.get(url);

        if (response.data.results.length !== 0) {
          this.movies = this.movies.concat(response.data.results);
          this.currentPage = this.currentPage + 1;
        } else {
          this.loadMore = false;
        }
        this.loading = false;
      } catch (error) {
        console.clear();
        this.isError = true;
      }
    },
  },
  mounted() {
    this.getPopularMovies();
    document.title = "VueMovies";
  },
};
</script>

<style>
.main {
  flex: 1;
}

.main h1 {
  margin-top: 54px;
  text-align: center;
}

.main form {
  margin: 32px 24px 0px 24px;
}

.input {
  background-color: var(--color-component);
  color: var(--color-text);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  border: 2px solid transparent;
}

.input input {
  background-color: transparent;
  border: none;
  color: var(--color-text);
  font-size: 20px;
  margin-right: 16px;
  width: 100%;
}

.input button {
  background-color: var(--color-button-search);
  color: #ffffff;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
}

.input:focus-within {
  border: 2px solid #42b883;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  color: crimson;
}

.error-message span {
  margin-left: 8px;
}

.grid-movies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 32px 24px;
  column-gap: 24px;
  row-gap: 24px;
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
}

.load-more button {
  border: 1px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  padding: 8px 24px;
  border-radius: 8px;
  transition: all 0.25s;
  cursor: pointer;
  font: 700 16px Raleway;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.load-more .caret-icon {
  margin-right: 16px;
}

.load-more button:hover {
  border: 1px solid var(--color-text);
  color: var(--color-text);
}

@media (min-width: 800px) {
  .main form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .input {
    margin: 24px 32px 0px 32px;
    width: 450px;
  }

  .grid-movies {
    margin: 54px auto 32px auto;
    max-width: 900px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 24px;
    row-gap: 24px;
  }
}
</style>
