<template>
  <div id="app">
    <Form @submitForm="onFormSubmit" />
    <TotalBalance :total="totalBalance" />
    <BudgetList
      :list="filterList"
      @onDeleteItem="onDeleteItem"
      @onListShow="onListShow"
    />
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList';
import TotalBalance from '@/components/TotalBalance';
import Form from '@/components/Form';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    Form,
  },

  data: () => ({
    list: {
      // 1: {
      //   type: 'INCOME',
      //   value: 100,
      //   comment: 'Some comment',
      //   id: 1,
      // },
      // 2: {
      //   type: 'OUTCOME',
      //   value: -50,
      //   comment: 'Some outcome comment',
      //   id: 2,
      // },
    },
    fList: null,
  }),

  computed: {
    totalBalance() {
      return Object.values(this.list).reduce(
        (acc, item) => acc + item.value,
        0
      );
    },

    filterList(param) {
      if (!this.fList) {
        return this.filteredList(this.list, param);
      }
      return this.fList;
    },
  },

  methods: {
    onDeleteItem(id) {
      this.$delete(this.list, id);
      this.onListShow();
    },

    onFormSubmit(data) {
      const newObj = {
        ...data,
        id: String(Math.random()),
      };

      this.$set(this.list, newObj.id, newObj);
      this.onListShow();
    },

    onListShow(param) {
      this.fList = this.filteredList(this.list, param);
    },

    filteredList({ ...list }, param) {
      if (param === 1) {
        return Object.values(list)
          .filter((item) => item.type === 'INCOME')
          .reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
      } else if (param === -1) {
        return Object.values(list)
          .filter((item) => item.type === 'OUTCOME')
          .reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
      } else {
        return Object.values(list).reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
