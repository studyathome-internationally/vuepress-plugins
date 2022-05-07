<template>
  <div class="comparator">
    <div ref="initial" class="original">
      <slot name="original"></slot>
    </div>
    <div class="slider-container" :style="{ left: `${percentage}%` }">
      <div
        class="slider"
        :style="{ cursor: clicked ? 'grabbing' : 'grab' }"
        @dblclick="slideReset"
        @mousedown.prevent="slideReady"
        @tochstart.prevent="slideReady"
      >
        <i class="fa-solid fa-chevron-left"></i>
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div class="comparison" :style="{ width: `${100 - percentage}%` }">
      <slot name="comparison"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";

const initial = ref<HTMLElement | null>(null);
const clicked = ref(false);
const percentage = ref(50);

const slideMove = (e) => {
  if (!clicked.value || !initial.value) return false;
  const { x, width } = initial.value.getBoundingClientRect?.();
  percentage.value = ((e.x - x) / width) * 100;
  if (percentage.value < 0) {
    percentage.value = 0;
  } else if (percentage.value > 100) {
    percentage.value = 100;
  }
  percentage.value = Math.floor(percentage.value);
};
const slideFinish = () => {
  clicked.value = false;
};
const slideReady = () => {
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

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", slideMove);
  window.removeEventListener("touchmove", slideMove);
  window.removeEventListener("mouseup", slideFinish);
  window.removeEventListener("touchend", slideFinish);
});
</script>

<style lang="stylus">
img
  display block

.comparator
  width fit-content
  position relative
  margin 0 auto
  padding-bottom 1rem
  height 100%

  .original, .comparison
    img
      margin unset
      padding unset
      height 100% !important

  .comparison, .slider-container
    position absolute
    top 0

  .slider-container
    z-index 5
    width 0.15rem
    height 100%
    background var(--c-brand)
    display flex
    align-items center
    justify-content center

    .slider
      width .75rem
      height .75rem
      border-radius 50%
      position absolute
      background var(--c-brand)
      transition transform 0.1s ease-out
      display flex
      flex-flow row nowrap

      &:hover, &:focus, &:active
        transform scale(2)

      & > *
        opacity 0
        color white
        width 40%
        height 80%
        padding 10% 0% 10% 10%
        margin 0

        &:last-child
          padding 10% 10% 10% 0%

      &:hover, &:focus, &:active
        & > *
          opacity 1


  .comparison
    right 0

    img
      object-fit cover
      object-position 100% 50%
      left 0
      right 0
      top 0
      bottom 0

    &, & img
      width 100%
      height 100%
</style>
