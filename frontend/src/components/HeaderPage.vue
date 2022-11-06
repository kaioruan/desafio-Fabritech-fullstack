<template>
  <header>
    <nav>
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
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
a {
  color: white;
  font-size: 1.5rem;
}
</style>
