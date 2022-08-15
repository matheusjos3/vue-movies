<template>
  <main class="movie-main">
    <Loading v-if="isloadingMovies" />

    <div v-else>
      <section
        class="movie-top-container"
        :style="
          movie.backdrop_path
            ? `background-image: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}');`
            : 'background: rgba(0, 0, 0, 0)'
        "
      >
        <div class="bg-fade">
          <div class="movie-container">
            <div v-if="movie.poster_path" class="movie-poster">
              <img
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                :alt="`Poster ${movie.title}`"
              />
            </div>
            <div v-else class="movie-empty-poster">
              <ph-image-square :size="52" color="#aeb4b7" />
            </div>

            <div class="movie-info">
              <h1>{{ movie.title }} ({{ getYear(movie.release_date) }})</h1>

              <div class="movie-meta">
                <div class="movie-categories">
                  <span v-for="category in movie.genres" :key="category.id">{{
                    category.name
                  }}</span>
                  <span>{{ movie.status }}</span>
                </div>

                <div class="movie-rating-container">
                  <div class="movie-rating">
                    <div class="movie-rating-average">
                      <h2>Rating</h2>
                      <div class="rating">
                        <ph-star :size="24" weight="fill" class="star-rating" />
                        <span class="vote-average">{{
                          movie.vote_average.toFixed(1)
                        }}</span>
                      </div>
                    </div>
                    <span class="rating-count"
                      >{{ movie.vote_count }} votes</span
                    >
                  </div>
                </div>
              </div>

              <div class="movie-overview">
                <p class="tagline">{{ movie.tagline }}</p>
                <p>{{ movie.overview }}</p>
              </div>

              <div v-show="directors.length !== 0" class="movie-directors">
                <h3>{{ directors.length > 1 ? "Directors" : "Director" }}</h3>
                <span v-for="director in directors" :key="director.id">{{
                  director.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="movie-cast"
        v-show="cast.length !== 0 && !isloadingCredits"
      >
        <h1>Cast</h1>
        <Loading v-if="isloadingCredits" />
        <div v-else v-show="cast.length !== 0" class="cast-grid">
          <div v-for="item in cast" :key="item.id" class="cast-item">
            <div class="cast-item-image">
              <img
                :src="`https://image.tmdb.org/t/p/w500${item.profile_path}`"
                :alt="`${item.name}`"
                v-if="item.profile_path !== null"
              />
              <div v-else class="empty-image">
                <ph-image-square :size="40" color="#aeb4b7" />
              </div>
            </div>

            <span class="cast-item-name">{{ item.name }}</span>
            <span class="cast-item-character">{{ item.character }}</span>
          </div>
        </div>
      </section>

      <section class="more-info-container" v-if="isloadingMovies === false">
        <h1>More details</h1>
        <ul class="info-list">
          <li>
            <div class="info-list-item">
              <ph-money :size="32" color="#42b883" />
              <span class="info-list-legend">Budget:</span>
              {{
                movie.budget !== 0 ? formatMoney(movie.budget) : "unavailable"
              }}
            </div>
          </li>

          <li>
            <div class="info-list-item">
              <ph-ticket :size="32" color="#42b883" />
              <span class="info-list-legend">Revenue:</span>
              {{
                movie.revenue !== 0 ? formatMoney(movie.revenue) : "unavailable"
              }}
            </div>
          </li>

          <li>
            <div class="info-list-item">
              <ph-info :size="32" color="#42b883" />
              <span class="info-list-legend">Status:</span>
              {{ movie.status }}
            </div>
          </li>

          <li>
            <div class="info-list-item">
              <ph-calendar-check :size="32" color="#42b883" />
              <span class="info-list-legend">Release Date:</span>
              {{ movie.release_date }}
            </div>
          </li>

          <li>
            <div class="info-list-item">
              <ph-timer :size="32" color="#42b883" />
              <span class="info-list-legend">Running Time:</span>
              {{ formatTime(movie.runtime) }}
            </div>
          </li>

          <li>
            <div class="info-list-item">
              <ph-link :size="32" color="#42b883" />
              <span class="info-list-legend">Home Page:</span>
              <a
                :href="movie.homepage"
                target="_blank"
                rel="noopener noreferrer"
                class="home-page-movie"
                v-if="movie.homepage"
              >
                {{ movie.homepage }}<ph-arrow-square-out :size="16" />
              </a>
              <span v-else>unavailable</span>
            </div>
          </li>
        </ul>
      </section>

      <section
        class="companies-container"
        v-show="movie.production_companies.length !== 0 && !isloadingMovies"
      >
        <h1>Production companies</h1>
        <div
          class="companies-grid"
          v-show="movie.production_companies.length !== 0"
        >
          <div
            v-for="companie in movie.production_companies"
            :key="companie.id"
            class="companie-item"
          >
            <div class="companie-logo">
              <img
                :src="`https://image.tmdb.org/t/p/w500${companie.logo_path}`"
                :alt="`Logo ${companie.name}`"
                v-if="companie.logo_path !== null"
              />
              <div v-else class="empty-image-companie">
                <ph-image-square :size="40" color="#aeb4b7" />
              </div>
            </div>

            <span class="companie-name">{{ companie.name }}</span>
          </div>
        </div>

        <div
          class="empty-list"
          v-show="movie.production_companies.length === 0 && !isloadingMovies"
        >
          <ph-smiley-sad :size="32" />
          nothing to show
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading.vue";

export default {
  props: ["id"],
  components: {
    Loading,
  },
  data: function () {
    return {
      movie: [],
      cast: [],
      directors: [],
      isloadingCredits: true,
      isloadingMovies: true,
    };
  },
  methods: {
    async loadMovieDetail() {
      this.isloadingMovies = true;
      const url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`;

      await axios
        .get(url)
        .then((res) => {
          this.movie = res.data;
          this.isloadingMovies = false;
          document.title = `${res.data.title} - VueMovies`;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadMovieCast() {
      const url = `https://api.themoviedb.org/3/movie/${
        this.id
      }/credits?api_key=${import.meta.env.VITE_API_KEY}`;

      await axios
        .get(url)
        .then((res) => {
          this.cast = res.data.cast.slice(0, 10);
          this.directors = res.data.crew.filter((d) => d.job === "Director");
          this.isloadingCredits = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getYear(date) {
      const year = date.split("-");
      return year[0];
    },
    formatMoney(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 3,
      });
    },
    formatTime(time) {
      const hour = Math.floor(time / 60);
      const minutes = Math.floor(time % 60);

      return hour === 0 ? `${minutes}m` : `${hour}h ${minutes}m`;
    },
  },
  mounted() {
    this.loadMovieDetail();
    this.loadMovieCast();
    window.scrollTo(0, 0);
  },
};
</script>

<style>
.movie-main {
  flex: 1;
}

.movie-top-container {
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-fade {
  flex: 1;
  background-color: rgba(7, 7, 7, 0.788);
}

.movie-container {
  display: flex;
  margin: 24px;
}

.movie-info {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

.movie-poster {
  display: none;
  width: 300px;
  max-height: 450px;
  border-radius: 8px;
  overflow: hidden;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-empty-poster {
  width: 300px;
  min-height: 450px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e4e6e7;
  display: none;
}

.movie-info {
  flex: 1;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 16px;
}

.movie-meta-detail {
  display: flex;
  flex-direction: column;
}

.movie-meta-detail h3,
.movie-meta-detail span {
  font: 700 16px Roboto;
}

.original-title {
  color: var(--color-text-gray);
}

.movie-categories {
  display: grid;
  grid-template-columns: repeat(5, auto);
  column-gap: 8px;
  row-gap: 8px;
}

.movie-categories span {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;
  font: 700 12px Raleway;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.movie-detail-pill {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  margin-bottom: 8px;
  height: 60px;
}

.movie-detail-pill span {
  border: 1px solid var(--color-primary);
  padding: 4px 16px;
  font: 700 12px Raleway;
  border-radius: 8px;
  margin-right: 8px;
  color: var(--color-primary);
}

.movie-rating-container {
  display: flex;
  margin-top: 8px;
}

.movie-rating {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 16px;
}

.movie-rating-average {
  display: flex;
  color: #e2ac20;
}

.rating {
  padding: 4px;
  display: flex;
  align-items: center;
  color: #d39a0c;
}

.vote-average {
  font: 400 16px Roboto;
  margin-left: 4px;
}

.rating-count {
  color: #c9c9c9;
  font: 400 12px Roboto;
}

.tagline {
  color: #c9c9c9;
  margin-top: 8px;
  margin-bottom: 8px;
}

.movie-overview {
  margin-top: 24px;
  border-top: 1px solid #4b4b4bc2;
  flex: 1;
}

.movie-overview p {
  text-align: justify;
  line-height: 150%;
}

.movie-directors h3 {
  margin-top: 36px;
  line-height: 12px;
}

.movie-directors span {
  color: #c9c9c9;
  font: 400 12px Roboto;
}

.movie-directors span + span::before {
  content: ",";
  margin-right: 6px;
}

/* Cast Section */
.movie-cast {
  border-radius: 16px;
  background-color: var(--color-component);
  padding: 16px;
  margin: 44px 16px 0px 16px;
}

.movie-cast h1 {
  margin-bottom: 16px;
}

.cast-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 32px;
  row-gap: 32px;
}

.cast-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cast-item-image {
  overflow: hidden;
  text-align: center;
  width: 100px;
  height: 100px;
}

.cast-item-image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.empty-image {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e4e6e7;
  border-radius: 50%;
}

.empty-image-companie {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cast-grid span {
  text-align: center;
}

.cast-item-name {
  font: 700 16px Raleway;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  margin-top: 8px;
}

.cast-item-character {
  height: 40px;
  font: 400 12px Raleway;
  color: var(--color-text-gray);
  margin-top: 4px;
}

.more-info-container {
  border-radius: 16px;
  background-color: var(--color-component);
  padding: 16px;
  margin: 44px 16px 0px 16px;
}

.info-list {
  list-style: none;
  margin-top: 16px;
}

.info-list li {
  padding: 8px 0px;
}

.info-list li + li {
  border-top: 1px solid var(--color-border-list);
}

.info-list-item {
  display: flex;
  align-items: center;
  color: var(--color-rating);
  font-family: "Roboto", sans-serif;
}

.info-list-legend {
  font-weight: 700;
  margin-left: 8px;
  margin-right: 6px;
  color: var(--color-text);
}

.home-page-movie {
  color: #297dff;
  font-size: 14px;
  transition: all 0.2s;
}

.home-page-movie:hover {
  color: #458dfa;
  text-decoration: underline;
}

.companies-container {
  border-radius: 16px;
  background-color: var(--color-component);
  padding: 16px;
  margin: 44px 16px 0px 16px;
}

.companies-container h1 {
  margin-bottom: 16px;
}

.companies-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 32px;
  row-gap: 32px;
}

.companie-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.companie-item span {
  text-align: center;
  margin-top: 4px;
  font: 700 12px Raleway;
}

.companie-logo {
  width: 100px;
  height: 100px;
}

.companie-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.empty-list {
  display: flex;
  align-items: center;
  color: var(--color-text-gray);
  gap: 8px;
}

@media (min-width: 800px) {
  .movie-poster,
  .movie-empty-poster {
    display: block;
    visibility: visible;
  }

  .movie-container {
    max-width: 1100px;
    margin: 44px auto;
    display: flex;
  }

  .movie-info {
    margin-left: 32px;
  }

  .movie-meta {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .movie-detail-pill {
    height: auto;
  }

  .movie-categories {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .movie-rating-container {
    display: flex;
    margin-top: 0px;
  }

  .movie-rating {
    margin-top: 0px;
    align-items: flex-end;
  }

  /* CAST */
  .movie-cast {
    max-width: 900px;
    width: 900px;
    margin: 44px auto 0px auto;
  }

  .cast-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .more-info-container {
    width: 900px;
    max-width: 900px;
    margin: 44px auto 0px auto;
  }

  .cast-item-image {
    width: 150px;
    height: 150px;
  }

  .companies-container {
    width: 900px;
    max-width: 900px;
    margin: 44px auto 0px auto;
  }

  .companies-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>