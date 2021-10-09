import Vue from 'vue';

const budget = {
  namespaced: true,
  state: {
    list: {},
    sortType: {
      value: 'ALL',
    },
  },
  getters: {
    balance: ({ list }) => {
      return Object.values(list).reduce((acc, item) => acc + item.value, 0);
    },

    getList: ({ list }) => list,

    filteredList: ({ list, sortType }) => {
      if (sortType.value !== 'ALL') {
        return Object.values(list)
          .filter((item) => item.type === sortType.value)
          .reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
      }
      return list;
    },
  },
  mutations: {
    DELETE_ITEM(state, id) {
      Vue.delete(state.list, id);
    },

    ADD_ITEM(state, item) {
      Vue.set(state.list, item.id, item);
    },

    CHANGE_SORT_TYPE(state, value) {
      state.sortType.value = value;
    },
  },
  actions: {
    addNewItem({ commit }, item) {
      const newItem = { ...item, id: String(Math.random()) };
      commit('ADD_ITEM', newItem);
    },
    deleteItem({ commit }, id) {
      commit('DELETE_ITEM', id);
    },
    changeSortType({ commit }, value) {
      commit('CHANGE_SORT_TYPE', value);
    },
  },
};

export default budget;
