const ToggleBtn = {
  props: {
    btnActive: { type: Boolean, default: false },
  },
  data() {
    return {}
  },
  template: `
    <button
      :class="{ 'toggle_btn--active': btnActive }"
      class="toggle_btn"
      @click="toggleBtn()"
    >
      <em class="toggle_btn__bar toggle_btn__bar--bar1"></em>
      <em class="toggle_btn__bar toggle_btn__bar--bar2"></em>
      <em class="toggle_btn__bar toggle_btn__bar--bar3"></em>
    </button>
  `,
  methods: {
    toggleBtn() {
      this.$emit('toggleBtn')
    },
  },
}
