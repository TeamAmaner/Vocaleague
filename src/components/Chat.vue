<template>
  <div v-if="Answers != null">
    <dl v-for="data in Answers" :key="data.id">
      <p style="color:#008000" v-if="data.answer == answer">{{ data.id }}. {{ data.name }}: {{ data.answer }}</p>
      <p style="color:#ff2323" v-if="data.answer != answer">{{ data.id }}. {{ data.name }}: {{ data.answer }}</p>
    </dl>
  </div>
</template>

<script>
import { provide } from '@vue/runtime-core';

import store from '@/store';
provide('store', store);

export default {
  name: 'Chat',
  setup() {
    const { Answers, answer } = store()
    
    return {
      Answers,
      answer
    }

  },
  data: () => ({
    //
  }),
  methods: {
    //
  }
}
</script>
