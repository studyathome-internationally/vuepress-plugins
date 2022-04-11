import { defineComponent, h, ref, onMounted, onBeforeUnmount } from "vue";
export const Comparator = defineComponent({
  name: "Comparator",
  // setup(props, ctx) {
  //   const count = ref(0);
  //   const percentage = 50;
  //   const clicked = true;
  //   const slideReset = () => { };
  //   const slideReady = () => { };

  //   return () => h("div", { class: "comparator" },
  //     [
  //       h("div", { ref: "original", class: "original" }, ctx.slots.original?.()),
  //       h("div", { class: "slider-container", style: { left: `${percentage}%` } },
  //         [
  //           h("div", { class: "slider", style: { cursor: clicked ? "grabbing" : "grab" }, dblclicked: slideReset, mousedown: slideReady, touchstart: slideReady },
  //             [
  //               h("i", { class: "fa-solid fa-chevron-left" }),
  //               h("i", { class: "fa-solid fa-chevron-right" })
  //           ])
  //         ]),
  //       h("div", { class: "comparsion", style: { width: `${100 - percentage}%` } }, ctx.slots.comparison?.())
  //     ])
  // }
  // mounted() {
  //   this.original = this.$refs.original;
  // },
  // beforeUnmount() {
  //   window.removeEventListener("mousemove", slideMove);
  //   window.removeEventListener("touchmove", slideMove);
  //   window.removeEventListener("mouseup", slideFinish);
  //   window.removeEventListener("touchend", slideFinish);
  // },
  setup(props, ctx) {
    const original = ref(); // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    const clicked = ref(false);
    const percentage = ref(50);
    const slideMove = (e) => {
      if (!clicked.value || !original.value) return false;
      const { x, width } = original.value.getBoundingClientRect?.();
      percentage.value = ((e.x - x) / width) * 100;
      if (percentage.value < 0) {
        percentage.value = 0;
      } else if (percentage.value > 100) {
        percentage.value = 100;
      }
      percentage.value = Math.floor(percentage.value);
    };
    const slideFinish = () => {
      clicked.value = false
    }
    const slideReady = () => {
      console.log("DUMMY", "slideReady");
      clicked.value = true;
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
    onMounted(() => {
      console.log("DUMMY", "mounted", "ComparatorVite");
    })
    onBeforeUnmount(() => {
      console.log("DUMMY", "beforeunmounted");
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
      window.removeEventListener("mouseup", slideFinish);
      window.removeEventListener("touchend", slideFinish);
    })
    return { clicked, original, percentage, slideReady, slideReset };
  },
  render() {
    return h("div", { class: "comparator" },
      [
        h("div", { ref: "original", class: "original" }, this.$slots.original?.()),
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