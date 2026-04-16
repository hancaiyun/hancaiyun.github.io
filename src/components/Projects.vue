<template>
  <section id="projects" class="section">
    <h2>精选项目</h2>
    <div class="grid">
      <div v-for="project in projects" :key="project.name" class="card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        { name: '个人主页重构', description: '使用 Vue + Vite 重新组织首页结构并优化展示体验。' },
        { name: '博客系统', description: '支持文章管理、标签归档和静态部署的内容站点。' },
        { name: '可视化看板', description: '构建业务数据大屏，提升关键指标可视化效率。' }
      ]
    };
  }
};
</script>
