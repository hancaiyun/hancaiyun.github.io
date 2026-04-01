<template>
  <div class="project-portfolio">
    <h1>Project Portfolio</h1>
    <div class="project-cards">
      <div class="project-card">
        <h2>E-Commerce Platform</h2>
        <p>A feature-rich e-commerce platform for online shopping.</p>
      </div>
      <div class="project-card">
        <h2>CMS System</h2>
        <p>A content management system for managing web content.</p>
      </div>
      <div class="project-card">
        <h2>Data Visualization Platform</h2>
        <p>A platform for visualizing complex data in interactive charts.</p>
      </div>
      <div class="project-card">
        <h2>Mobile App</h2>
        <p>A mobile application for on-the-go access to services.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
};
</script>

<style scoped>
.project-portfolio {
  padding: 20px;
}
.project-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.project-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
}
</style>