<template>
  <div class="total-value">
    <span :class="classObj">Balance: {{ total }}</span>
  </div>
</template>
<script>
export default {
  name: 'TotalBalance',
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    classObj() {
      return {
        'positive-class': this.total > 0,
        'negative-class': this.total < 0,
        'zero-class': this.total === 0,
      };
    },
  },
};
</script>
<style scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
}

.positive-class {
  color: #67c23a;
}
.negative-class {
  color: #f56c6c;
}
.zero-class {
  color: #000;
}
</style>
