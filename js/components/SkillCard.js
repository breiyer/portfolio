const SkillCard = {
  props: {
    path: { type: String, required: true },
    label: { type: String, default: null },
    alt: { type: String, default: 'Skill Icon' },
  },
  data() {
    return {}
  },
  template: `
    <div class="skill_card">
      <img loading="lazy" decoding="async" :src="path" class="skill_card__img" :alt="alt">
      <label v-if="label" class="skill_card__label">{{ label }}</label>
    </div>
  `,
}
