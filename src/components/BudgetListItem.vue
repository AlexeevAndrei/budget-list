<template>
  <div class="list-item">
    <i :class="classIconObj" class="icon"></i>
    <span class="budget-comment"> {{ item.comment }} </span>
    <span class="budget-value" :class="classValueObj"> {{ item.value }} </span>
    <ElButton type="danger" size="mini" @click="dialogVisible = true"
      >Delete</ElButton
    >
    <ElDialog
      title="Are you sure?"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
      :show-close="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteItem(item.id)"
          >Delete</el-button
        >
      </span>
    </ElDialog>
  </div>
</template>

<script>
export default {
  name: 'BudgetListItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    dialogVisible: false,
  }),

  methods: {
    deleteItem(id) {
      this.$emit('deleteItem', id);
    },

    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },

  computed: {
    classIconObj() {
      return {
        'el-icon-top': this.item.value > 0,
        'el-icon-bottom': this.item.value < 0,
      };
    },

    classValueObj() {
      return {
        'positive-value': this.item.value > 0,
        'negative-value': this.item.value < 0,
      };
    },
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}

.positive-value {
  color: #67c23a;
}

.negative-value {
  color: #f56c6c;
}

.icon {
  margin-right: 10px;
}
</style>
