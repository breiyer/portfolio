const SkillCard = {
  props: {
    path: { type: String, required: true },
    label: { type: String, required: true },
    alt: { type: String, default: 'Skill Icon' },
  },
  data() {
    return {}
  },
  template: `
    <div class="skill_card">
      <img :src="path" class="skill_card__img" :alt="alt">
      <label class="skill_card__label">{{ label }}</label>
    </div>
  `,
}