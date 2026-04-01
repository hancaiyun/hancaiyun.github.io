<template>
  <header>
    <div class="logo">
      <img src="/path/to/logo.png" alt="Logo" />
    </div>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #f8f9fa;
}
.logo img {
  height: 50px;
}
navi ul {
  list-style: none;
  display: flex;
}
navi li {
  margin: 0 15px;
}
navi a {
  text-decoration: none;
  color: #333;
}
</style>