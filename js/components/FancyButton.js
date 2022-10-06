const FancyButton = {
  props: {
    btnSecondary: { type: Boolean, required: false },
    btnDisabled: { type: Boolean, required: false },
    btnText: { type: String, required: true },
    btnUrl: { type: String, default: null },
    linkTarget: { type: String, default: '_blank' },
  },
  data() {
    return {}
  },
  template: `
    <a
      v-if="btnUrl"
      :href="btnUrl"
      :target="linkTarget"
      :class="
        {
          'project_preview__info__btn--secondary': btnSecondary,
          'project_preview__info__btn--disabled': btnDisabled,
        }
      "
      class="project_preview__info__btn"
    >
      {{ btnText }}
    </a>

    <button
      v-else
      :class="
        {
          'project_preview__info__btn--secondary': btnSecondary,
          'project_preview__info__btn--disabled': btnDisabled,
        }
      "
      class="project_preview__info__btn"
      type="button"
      @click="btnClick()"
    >
      {{ btnText }}
    </button>
  `,
  methods: {
    btnClick() {
      this.$emit('btnClick')
    },
  },
}
