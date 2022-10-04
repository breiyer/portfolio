const DropDown = {
  props: {
    showList: { type: Boolean, default: false },
    listOpts: { type: Object, required: true },
    fwIcon: { type: String, required: true },
  },
  data() {
    return {}
  },
  template: `
    <div class="dropdown__container" @click="toggleList()">
      <em :class="fwIcon + ' dropdown_icon'"></em>
      <em
        :class="{ 'dropdown_icon--arrow_down': showList }"
        class="
          fa-solid fa-caret-up
          dropdown_icon
          dropdown_icon--arrow
        "
      >
      </em>

      <ul
        :class="{ 'dropdown_list--active': showList }"
        class="dropdown_list"
      >
        <li
          v-for="opt in listOpts"
          :key="opt.code"
          class="dropdown_opt"
          @click="optClicked(opt)"
        >
          <slot name="label" :opt="opt">
            {{ opt.label }}
          </slot>
        </li>
      </ul>
    </div>
  `,
  methods: {
    toggleList() {
      this.$emit('toggle_list', !this.showList)
    },
    optClicked(opt) {
      this.$emit('opt_clicked', opt)
    },
  },
}
