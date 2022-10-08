const IconLink = {
  props: {
    hoverColor: { type: String, required: true },
    fwIcon: { type: String, required: true },
    linkUrl: { type: String, required: true },
    linkTarget: { type: String, default: '_blank' },
    linkTitle: { type: String, default: 'Ir' },
    md: { type: Boolean, default: false },
    lg: { type: Boolean, default: false },
  },
  data() {
    return {}
  },
  template: `
    <a
      :class="{ 'icon_link--md': md, 'icon_link--lg': lg, }"
      class="icon_link"
      :style="'--hover_color:' + hoverColor + ';'"
      :href="linkUrl"
      :target="linkTarget"
      rel="noopener noreferrer"
      :title="linkTitle"
    >
      <em :class="fwIcon + ' icon_link__icon'"></em>
    </a>
  `,
}
