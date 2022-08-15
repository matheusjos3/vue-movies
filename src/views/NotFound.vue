<template>
  <div class="page-not-found">
    <h1>404 :(</h1>
    <p>page not found</p>
    <router-link to="/">Back to home</router-link>
  </div>
</template>

<style>
.page-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 44px;
  flex: 1;
}

.page-not-found h1 {
  font-size: 84px;
}

.page-not-found a {
  border: 1px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  padding: 8px 24px;
  border-radius: 8px;
  transition: all 0.25s;
  cursor: pointer;
  font: 700 16px Raleway;
  margin-top: 24px;
  display: flex;
  align-items: center;
}

.page-not-found a:hover {
  border: 1px solid var(--color-text);
  color: var(--color-text);
}
</style>