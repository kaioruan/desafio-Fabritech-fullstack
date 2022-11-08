<template>
  <header>
    <nav>
      <p>Gerenciamento de Clientes</p>
      <button v-on:click="Logout" class="button" role="button">Sair</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderPage",
  data: function () {
    return {};
  },
  methods: {
    Logout: function () {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--color-background-nav);
  height: 60px;
  width: 100%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-left: 4rem;
  margin-right: 4rem;
}
p {
  color: white;
  font-size: 1.5rem;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  font-size: 1.5rem;
  border-radius: 6px;
  border: none;
  background: var(--color-background-nav);
  color: #dfdedf;
}
</style>
