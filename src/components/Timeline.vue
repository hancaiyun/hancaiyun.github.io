<template>
  <div class="timeline">
    <h2>Work Experience Timeline</h2>
    <div v-for="job in jobs" :key="job.position" class="timeline-item">
      <h3>{{ job.position }}</h3>
      <span>{{ job.company }} ({{ job.startYear }} - {{ job.endYear }})</span>
      <ul>
        <li v-for="achievement in job.achievements" :key="achievement">{{ achievement }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        {
          position: 'Software Engineer',
          company: 'Company A',
          startYear: 2020,
          endYear: 2022,
          achievements: [
            'Developed feature X',
            'Improved performance by 20%',
            'Mentored interns'
          ]
        },
        {
          position: 'Senior Software Engineer',
          company: 'Company B',
          startYear: 2022,
          endYear: 2026,
          achievements: [
            'Led project Y',
            'Increased team efficiency by 30%',
            'Implemented CI/CD pipeline'
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.timeline {
  padding: 20px;
}
.timeline-item {
  margin-bottom: 20px;
  border-left: 2px solid #007BFF;
  padding-left: 20px;
}
</style>
