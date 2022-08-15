<template>
  <Header @toggle-theme="toggle" />
  <router-view />
  <Footer />
</template>

<script>
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      mode: null,
    };
  },
  methods: {
    toggle() {
      document.querySelector("html").classList.toggle("dark-mode");

      if (this.mode === "dark") {
        this.mode = "light";
        localStorage.removeItem("theme");
      } else {
        this.mode = "dark";
        localStorage.setItem("theme", "dark");
      }
    },
    loadTheme() {
      const theme = localStorage.getItem("theme");

      if (theme) {
        document.querySelector("html").classList.add("dark-mode");
        this.mode = "dark";
      } else {
        this.mode = "light";
      }
    },
  },
  mounted() {
    this.loadTheme();
  },
};
</script>

<style>
:root {
  --color-primary: #42b883;
  --body-bg: #f8f8f8;
  --color-text: #1a1a1a;
  --color-bg-header: #ffffff;
  --color-bg-footer: #ffffff;
  --color-border: #d6d6d6;
  --color-component: #ecececec;
  --color-text-gray: #6d6d6d;
  --color-card: #ebebeb;
  --color-rating: #707070;
  --color-border-list: #cbcbcb;
  --color-button-search: #a4a4a4;
}

.dark-mode:root {
  --color-primary: #42b883;
  --body-bg: #1a1a1a;
  --color-text: #ffffff;
  --color-bg-header: #1d1d1d;
  --color-bg-footer: #1d1d1d;
  --color-border: #454545;
  --color-component: #252525;
  --color-text-gray: #8d8d8d;
  --color-card: #2b2b2b;
  --color-rating: #c9c9c9;
  --color-border-list: #454545;
  --color-button-search: #3c3c3c;
}

html {
  background-color: var(--body-bg);
}

#app {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  height: 100vh;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Raleway, Helvetica, Arial, sans-serif;
}

input {
  outline: 0;
}

a {
  text-decoration: none;
}
</style>
