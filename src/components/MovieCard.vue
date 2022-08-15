<template>
  <div class="movie-card-container">
    <router-link
      :to="{ name: 'movie', params: { id: movie.id } }"
      class="movie-card-item"
    >
      <div v-if="movie.poster_path" class="movie-card-poster">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
        <div class="movie-card-play">
          <ph-play :size="24" color="#3FB259" weight="fill" />
        </div>
      </div>

      <div v-else class="empty-poster">
        <div class="empty-poster-icon">
          <ph-image-square :size="52" color="#aeb4b7" />
        </div>
        <div class="movie-card-play">
          <ph-play :size="24" color="#3FB259" weight="fill" />
        </div>
      </div>
      <div class="movie-card-info">
        <div class="movie-card-rating">
          <ph-star :size="24" color="#E2AC20" weight="fill" />
          <span>{{ movie.vote_average }}</span>
        </div>
        <div class="movie-card-title">
          <span>{{ movie.title }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["movie"],
};
</script>

<style>
.movie-card-container {
  background-color: var(--color-card);
  overflow: hidden;
  border-radius: 8px;
}

.movie-card-item {
  display: flex;
  flex-direction: column;
  color: var(--color-text);
}

.movie-card-rating {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.movie-card-rating span {
  margin-left: 4px;
  font: 400 16px Roboto;
  color: var(--color-rating);
}

.movie-card-poster {
  overflow: hidden;
  height: 300px;
  position: relative;
}

.movie-card-item .movie-card-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease;
}

.movie-card-item:hover .movie-card-poster img {
  transform: scale(1.1);
  opacity: 50%;
}

.empty-poster {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e4e6e7;
  position: relative;
}

.empty-poster-icon {
  transition: 0.3s ease;
}

.empty-poster:hover .empty-poster-icon {
  transform: scale(1.1);
  opacity: 50%;
}

.movie-card-play {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0%;
  border: 2px solid #3fb259;
}

.empty-poster:hover .movie-card-play,
.movie-card-item:hover .movie-card-play {
  opacity: 100%;
}

.movie-card-info {
  padding: 12px;
}

.movie-card-title span {
  font: 700 16px Raleway;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
}
</style>