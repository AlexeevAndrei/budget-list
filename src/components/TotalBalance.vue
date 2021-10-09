<template>
  <div class="total-value">
    <span :class="balanceColor">Balance: {{ balance }}</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TotalBalance',

  computed: {
    ...mapGetters('budget', ['balance']),

    balanceColor() {
      return {
        'positive-class': this.balance > 0,
        'negative-class': this.balance < 0,
        'zero-class': this.balance === 0,
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
