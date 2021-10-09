<template>
  <ElCard class="form-card">
    <ElForm :model="formData" ref="addItemForm" :rules="rules">
      <ElFormItem label="Type" prop="type">
        <ElSelect
          class="type-select"
          v-model="formData.type"
          placeholder="Choose type..."
        >
          <ElOption label="Income" value="INCOME" />
          <ElOption label="Outcome" value="OUTCOME" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem label="Value" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton type="primary" @click="onSubmit">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Form',
  data: () => ({
    formData: {
      type: '',
      comment: '',
      value: null,
    },

    rules: {
      type: [
        { required: true, message: 'Please select type', trigger: 'blur' },
      ],
      comment: [
        { required: true, message: 'Please input comment', trigger: 'change' },
      ],
      value: [
        { required: true, message: 'Please input value', trigger: 'change' },
        {
          type: 'number',
          message: 'Value must be a number',
          trigger: 'change',
        },
        {
          validator: (rule, value, callback) => {
            if (value !== 0) {
              callback();
            } else {
              callback(new Error('Zero is not acceptable'));
            }
          },
          trigger: 'change',
        },
      ],
    },
  }),

  methods: {
    ...mapActions('budget', ['addNewItem']),

    onSubmit() {
      this.$refs.addItemForm.validate((valid) => {
        if (valid) {
          this.checkTypeListItem(this.formData);
          this.addNewItem(this.formData);
          this.$refs.addItemForm.resetFields();
        }
      });
    },

    checkTypeListItem(formData) {
      if (formData.type === 'INCOME') {
        formData.value = +formData.value;
      }
      if (formData.type === 'OUTCOME') {
        formData.value = -formData.value;
      }
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}

.type-select {
  width: 100%;
}
</style>
