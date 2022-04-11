import { defineComponent, h, ref} from "vue";
export const Comparator = defineComponent({
  name: "Comparator",
  mounted() {
    this.original = this.$el.firstChild;
    console.log("DUMMY", "Comparator")
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.slideMove);
    window.removeEventListener("touchmove", this.slideMove);
    window.removeEventListener("mouseup", this.slideFinish);
    window.removeEventListener("touchend", this.slideFinish);
  },
  // methods: {
  //   slideMove(e) {
  //     const clicked = this.clicked;
  //     const original = this.original
  //     console.log("DUMMY", "slideMove", { clicked, original })
  //     if (!clicked || !original) return false;
  //     const { x, width } = original.getBoundingClientRect?.();
  //     this.percentage = ((e.x - x) / width) * 100;
  //     if (this.percentage < 0) {
  //       this.percentage = 0;
  //     } else if (this.percentage > 100) {
  //       this.percentage = 100;
  //     }
  //     this.percentage = Math.floor(this.percentage);
  //   },
  //   slideFinish() {
  //     this.clicked = false
  //   },
  //   slideReady() {
  //     console.log("DUMMY", "slideReady")
  //     this.clicked = true;
  //     if (window) {
  //       window.addEventListener("mousemove", this.slideMove);
  //       window.addEventListener("touchmove", this.slideMove);
  //       window.addEventListener("mouseup", this.slideFinish);
  //       window.addEventListener("touchend", this.slideFinish);
  //     }
  //   },
  //   slideReset() {
  //     this.percentage = 50;
  //   }
  // },
  // setup(props, ctx) {
  //   const original = ref(); // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
  //   const clicked = ref(false);
  //   const percentage = ref(50);
  //   // const slideMove = (e) => {
  //   //   console.log("DUMMY", "slideMove", { clicked, original })
  //   //   if (!clicked.value || !original.value) return false;
  //   //   const { x, width } = original.value.getBoundingClientRect?.();
  //   //   percentage.value = ((e.x - x) / width) * 100;
  //   //   if (percentage.value < 0) {
  //   //     percentage.value = 0;
  //   //   } else if (percentage.value > 100) {
  //   //     percentage.value = 100;
  //   //   }
  //   //   percentage.value = Math.floor(percentage.value);
  //   // };
  //   // const slideFinish = () => {
  //   //   clicked.value = false
  //   // }
  //   // const slideReady = () => {
  //   //   console.log("DUMMY", "slideReady")
  //   //   clicked.value = true;
  //   //   if (window) {
  //   //     window.addEventListener("mousemove", slideMove);
  //   //     window.addEventListener("touchmove", slideMove);
  //   //     window.addEventListener("mouseup", slideFinish);
  //   //     window.addEventListener("touchend", slideFinish);
  //   //   }
  //   // };
  //   // const slideReset = () => {
  //   //   percentage.value = 50;
  //   // };
  //   // return { clicked, original, percentage, slideReady, slideReset, slideMove, slideFinish };
  //   return { clicked, original, percentage};
  // },
  setup(props, { slots }) {
    const original = ref(); // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    const clicked = ref(false);
    const percentage = ref(50);

    const slideMove = (e) => {
      console.log("DUMMY");
      if (!clicked.value || !original.value) return false;
      const { x, width } = original.value.getBoundingClientRect?.();
      percentage.value = ((e.x - x) / width) * 100;
      if (percentage.value < 0) {
        percentage.value = 0;
      } else if (percentage.value > 100) {
        percentage.value = 100;
      }
      percentage.value = Math.floor(percentage.value);

      // FIXME: use refs with setup and render
      original.value.nextSibling.style.left = `${percentage.value}%`;
      original.value.nextSibling.nextSibling.style.width = `${100 - percentage.value}%`;
    };
    const slideFinish = () => {
      clicked.value = false;
      original.value.nextSibling.firstChild.style.cursor = "grab";
    }
    const slideReady = () => {
      console.log("DUMMY", "slideReady");
      clicked.value = true;
      original.value.nextSibling.firstChild.style.cursor = "grabbing";
      if (window) {
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
        window.addEventListener("mouseup", slideFinish);
        window.addEventListener("touchend", slideFinish);
      }
    };
    const slideReset = () => {
      percentage.value = 50;
    };

    // onMounted(() => {})
    // onBeforeUnmount(() => {
    //   window.removeEventListener("mousemove", slideMove);
    //   window.removeEventListener("touchmove", slideMove);
    //   window.removeEventListener("mouseup", slideFinish);
    //   window.removeEventListener("touchend", slideFinish);
    // })

    return { clicked, original, percentage, slideReady, slideReset, slideMove, slideFinish };
    // return () => h("div", { class: "comparator" },
    //   [
    //     h("div", { ref: original, class: "original" }, slots.original?.()),
    //     h("div", { class: "slider-container", style: { left: `${percentage.value}%` } },
    //       [
    //         h("div", { class: "slider", style: { cursor: clicked ? "grabbing" : "grab" }, ondblclick: slideReset, onmousedown: slideReady, ontouchstart: slideReady },
    //           [
    //             h("i", { class: "fa-solid fa-chevron-left" }),
    //             h("i", { class: "fa-solid fa-chevron-right" })
    //           ])
    //       ]),
    //     h("div", { class: "comparison", style: { width: `${100 - percentage.value}%` } }, slots.comparison?.())
    //   ]);
  },
  render() {
    // this.original = h("div", { class: "original" }, this.$slots.original?.());
    // const original = ref();
    // let f = (el) => {
    //   console.log("DUMMYTO", el);
    //   return {};
    // }
    return h("div", { class: "comparator" },
      [
        h("div", { class: "original" }, this.$slots.original?.()),
        // this.original,
        h("div", { class: "slider-container", style: { left: `${this.percentage}%` } },
          [
            h("div", { class: "slider", style: { cursor: this.clicked ? "grabbing" : "grab" }, ondblclick: this.slideReset, onmousedown: this.slideReady, ontouchstart: this.slideReady },
              [
                h("i", { class: "fa-solid fa-chevron-left" }),
                h("i", { class: "fa-solid fa-chevron-right" })
            ])
          ]),
        h("div", { class: "comparison", style: { width: `${100 - this.percentage}%` } }, this.$slots.comparison?.())
      ])
  }
});

export default Comparator;
