<template>
  <header>
    <nav>
      <p>Logo</p>
      <a href="/" alt="logout"> Sair </a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderPage",
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
}
p {
  color: white;
  font-size: 1.5rem;
}
a {
  color: white;
  font-size: 1.5rem;
}
</style>
