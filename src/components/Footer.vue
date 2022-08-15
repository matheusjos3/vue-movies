<template>
  <footer class="footer">
    <div class="footer-links">
      <div class="footer-link">Trends</div>
      <div class="footer-link">Latest</div>
      <div class="footer-link">Popular</div>
      <div class="footer-link">Top Rated</div>
    </div>
    <span>&copy; 2022 VueMovies</span>
  </footer>
</template>

<style>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg-footer);
  padding: 50px 0;
  margin-top: 84px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.25s;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;
}

.footer-link:hover {
  color: var(--color-primary);
}

@media (min-width: 800px) {
  .footer-link {
    font-size: 16px;
  }
}
</style>