const Carousel = {
  props: {
    showCarousel: { type: Boolean, default: false },
    imgArray: { type: Array, required: true },
  },
  data() {
    return {
      imgActive: 0,
    }
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
            title="Close"
            @click="closeCarousel()"
          >
          </i>

          <img
            v-for="(item, index) in imgArray"
            :key="item"
            :src="item"
            :class="{ 'carousel__img--active': index === imgActive }"
            class="carousel__img"
          >
        </div>

        <div class="carousel__carousel_nav_container">
          <nav
            class="carousel__carousel_nav"
          >
            <img
              v-for="(item, index) in imgArray"
              :key="'1' + item"
              :src="item"
              :class="{ 'carousel__collage_preview--active': index === imgActive }"
              class="carousel__collage_preview"
              title="View in full screen"
              @click="setImgPreview(index)"
            >
          </nav>
        </div>
      </div>
    </section>
  `,
  methods: {
    closeCarousel() {
      this.$emit('closeCarousel')
    },
    setImgPreview(index) {
      this.imgActive = index
    },
  },
}
