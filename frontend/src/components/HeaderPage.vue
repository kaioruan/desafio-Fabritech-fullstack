<template>
  <header>
    <nav>
      <p>Gerenciamento de Clientes</p>
      <button v-on:click="Logout" class="button" role="button">Sair</button>
    </nav>
  </header>
</template>

<script>
import "./HeaderPage.css";
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
