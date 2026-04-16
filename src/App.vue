<template>
  <div class="page">
    <Header />
    <main class="content">
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
    </main>
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} hancaiyun.github.io</p>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Projects from './components/Projects.vue';
import Skills from './components/Skills.vue';
import Timeline from './components/Timeline.vue';

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    Projects,
    Skills,
    Timeline
  }
};
</script>
