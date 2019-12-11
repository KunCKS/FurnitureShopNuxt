<template>
  <div class="message-alert">
    <div
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
      class="alert alert-dismissible"
    >
      {{ item.message }}
      <button
        @click="removeMessage(i)"
        type="button"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    messages () {
      return this.$store.state.messages
    }
  },
  methods: {
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    }
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
