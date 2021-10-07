<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <div slot="header" class="clearfix">
        <span class="header">{{ header }}</span>
        <span class="button-pane">
          <ElButton class="button" type="success" @click="onListShow(1)"
            >income</ElButton
          >
          <ElButton class="button" type="danger" @click="onListShow(-1)"
            >outcome</ElButton
          >
          <ElButton class="button" type="primary" @click="onListShow()"
            >all</ElButton
          >
        </span>
      </div>
      <template v-if="!isEmpty">
        <div v-for="(item, prop) in list" :key="prop">
          <BudgetListItem :item="item" @deleteItem="onDeleteItem" />
        </div>
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from '@/components/BudgetListItem';

export default {
  name: 'BudgetList',

  components: {
    BudgetListItem,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    header: 'Budget List',
    emptyTitle: 'Empty List',
  }),

  computed: {
    isEmpty() {
      return !Object.keys(this.list).length;
    },
  },

  methods: {
    onDeleteItem(id) {
      this.$emit('onDeleteItem', id);
    },

    onListShow(param) {
      this.$emit('onListShow', param);
    },
  },
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

.button {
  width: 80px;
  padding: 10px;
  border-radius: 20px;
}

.button-pane {
  margin-left: auto;
}

.clearfix {
  height: 35px;
  text-align: left;
  display: flex;
  align-items: center;
}

.header {
  font-size: 26px;
  font-weight: bold;
}
</style>
