const Carousel = {
  props: {
    showCarousel: { type: Boolean, default: false },
    imgArray: { type: Array, required: true },
  },
  data() {
    return {}
  },
  template: `
    <section
      :class="{ 'carousel__section--active': showCarousel }"
      class="carousel__section"
    > 
      <div class="carousel__container">
        <div class="carousel__carousel">
          <i
            class="fa-regular fa-circle-xmark fa-fw carousel__carousel__close_btn"
            @click="closeCarousel()"
          >
          </i>

          <img
            v-for="item in collage"
            :key="item.img"
            :src="item.img"
            :class="{ 'carousel__img--active': item.active }"
            class="carousel__img"
          >
        </div>

        <nav
          class="carousel__collage_preview_container"
        >
          <img
            v-for="item in collage"
            :key="'1' + item.img"
            :src="item.img"
            :class="{ 'carousel__collage_preview--active': item.active }"
            class="carousel__collage_preview"
          >
        </nav>
      </div>
    </section>
  `,
  computed: {
    collage() {
      const collage = this.imgArray.map(
        (img) => ({ img, active: false })
      )
      if (collage.lenght > 0) {
        collage[0].active = true
        console.log(collage, 'col', collage[0].active)
      }
      return collage
    },
  },
  methods: {
    closeCarousel() {
      this.$emit('closeCarousel')
    },
  },
}
