<template>
  <div id="app">
    <Question/>
    <Chat/>
  </div>
</template>

<script>
import Question from '@/components/Question'
import Chat from '@/components/Chat'

export default {
  name: 'Game',

  components: {
    Question,
    Chat
  }
}
</script>
