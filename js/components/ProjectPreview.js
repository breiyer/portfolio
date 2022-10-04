const ProjectPreview = {
  props: {
    img: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    codeBtn: { type: String, default: null },
    viewMoreBtn: { type: String, default: null },
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
      <em :class="fwIcon + ' fa-fw fa-lg'"></em>
    </a>
  `,
}
