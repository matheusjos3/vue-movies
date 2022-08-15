<template>
  <div class="loading">
    <div>
      <ph-circle-notch :size="32" class="loader" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  animation: spin 1s linear infinite;
  color: var(--color-text);
}
</style>