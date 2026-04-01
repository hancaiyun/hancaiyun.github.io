<template>
  <div class="skills-container">
    <div class="card" v-for="skill in skills" :key="skill.name">
      <h3>{{ skill.name }}</h3>
      <p>{{ skill.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { name: 'Frontend', description: 'Building responsive and interactive web interfaces.' },
        { name: 'Backend', description: 'Server-side logic and database management.' },
        { name: 'Mobile', description: 'Developing mobile applications for iOS and Android.' },
        { name: 'DevOps', description: 'Continuous integration and delivery processes.' },
        { name: 'Performance', description: 'Optimizing application speed and efficiency.' },
        { name: 'Security', description: 'Ensuring application security and data protection.' }
      ]
    };
  }
};
</script>

<style scoped>
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 200px;
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}
h3 {
  margin: 0 0 10px;
}
</style>
