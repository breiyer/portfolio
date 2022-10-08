const ProjectPreview = {
  props: {
    projectImg: { type: String, required: true },
    projectName: { type: String, required: true },
    projectCategory: { type: String, required: true },
    projectDescription: { type: String, required: true },
  },
  data() {
    return {}
  },
  template: `
    <div class="project_preview">
      <div class="project_preview__container">
        <div class="project_preview__info">
          <h2 class="project_preview__info__name">
            {{ projectName }}
            <small class="project_preview__info__category fancy_color">
              {{ projectCategory }}
            </small>
          </h2>

          <p class="project_preview__info__description">
            {{ projectDescription }}
            
            <slot name="more">
            </slot>
          </p>
        </div>

        <div class="project_preview__preview">
          <div class="project_preview__preview__img_container">
            <img
              :src="projectImg"
              class="project_preview__preview__img"
              :alt="'Preview of the project' + projectName"
            >
          </div>
        </div>
      </div>
    </div>
  `,
}
