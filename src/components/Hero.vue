<template>
  <section class="hero">
    <div class="container">
      <h1 class="title">Welcome to Our Website</h1>
      <h2 class="subtitle">Your journey starts here</h2>
      <p class="description">Discover amazing features and explore our content.</p>
      <div class="buttons">
        <button class="cta-button primary">Get Started</button>
        <button class="cta-button secondary">Learn More</button>
      </div>
      <div class="floating-boxes">
        <div class="box" v-for="n in 5" :key="n" :style="{ animationDelay: `${n * 0.5}s` }">
          <span>Floating Box {{ n }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
};
</script>

<style scoped>
.hero {
  position: relative;
  text-align: center;
  padding: 50px 20px;
  background: #f9f9f9;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
.title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.subtitle {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
.description {
  font-size: 1rem;
  margin-bottom: 30px;
}
.cta-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  color: white;
  cursor: pointer;
}
.primary {
  background-color: #007bff;
}
.secondary {
  background-color: #6c757d;
}
.floating-boxes {
  position: relative;
}
.box {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 123, 255, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
