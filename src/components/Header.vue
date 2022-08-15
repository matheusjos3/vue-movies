<template>
  <header class="header">
    <div class="header-menu">
      <router-link :to="{ name: 'home' }" class="link-home">
        <ph-film-slate :size="32" color="#42b883" /> <span>Vuemovies</span>
      </router-link>
      <button @click="openMenu"><ph-list :size="24" /></button>
    </div>
    <nav :class="isMenuOpen ? 'menu open' : 'menu'">
      <div class="menu-link">Trends</div>
      <div class="menu-link">Latest</div>
      <div class="menu-link">Popular</div>
      <div class="menu-link">Top Rated</div>
      <button type="button" @click="$emit('toggle-theme')">Dark/Light</button>
    </nav>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
.header {
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  background-color: var(--color-bg-header);
  border-bottom: 1px solid var(--color-border);
}

.header-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-menu button {
  border: none;
  color: var(--color-text);
  background-color: transparent;
  cursor: pointer;
}

.header-menu button:hover {
  transition: all 0.25s;
  color: var(--color-rating);
}

.menu {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  height: 0px;
}

.menu.open {
  height: auto;
}

.header .link-home {
  display: flex;
  align-items: center;
  color: var(--color-text);
}

.header .link-home span {
  font: 700 24px Montserrat;
  margin-left: 8px;
}

.menu-link {
  color: var(--color-text);
  text-decoration: none;
  margin-bottom: 12px;
  text-align: right;
  transition: color 0.25s;
  border-bottom: 1px solid var(--color-border);
  padding: 8px;
  cursor: pointer;
}

.menu-link:hover {
  color: var(--color-primary);
}

.menu button {
  border: 1px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  padding: 8px;
  border-radius: 8px;
  transition: all 0.25s;
  cursor: pointer;
  font-weight: 700;
}

.menu button:hover {
  border: 1px solid var(--color-text);
  color: var(--color-text);
}

@media (min-width: 800px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .header .link-home span {
    font: 700 32px Montserrat;
  }

  .header-menu button {
    display: none;
  }

  .menu {
    flex-direction: row;
    align-items: center;
    height: auto;
  }

  .menu-link {
    margin-bottom: 0px;
    text-align: center;
    transition: color 0.25s;
    border-bottom: none;
    padding: 0px;
    margin-right: 16px;
  }
}
</style>