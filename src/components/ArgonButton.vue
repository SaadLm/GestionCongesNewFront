<template>
    <button class="btn mb-0" :class="getClasses(variant, color, size, fullWidth, active)">
        <slot />
    </button>
</template>

<script>
export default {
    name: "argon-button",
    props: {
        color: {
            type: String,
            default: "info",
        },
        size: {
            type: String,
            default: "md",
        },
        variant: {
            type: String,
            default: "fill",
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        getClasses: function (variant, color, size, fullWidth, active) {
            let colorValue, sizeValue, fullWidthValue, activeValue;

            // Setting the button variant and color

                colorValue = `${color}`;


            sizeValue = size ? `btn-${size}` : null;

            fullWidthValue = fullWidth ? `w-100` : null;

            activeValue = active ? `active` : null;

            return `${colorValue} ${sizeValue} ${fullWidthValue} ${activeValue}`;
        },
    },
};
</script>

<!--/* eslint-disable prettier/prettier */-->
<!--<template>-->
<!--  <button class="btn mb-0" :class="getClasses(variant, color, size, fullWidth, active)">-->
<!--    <slot />-->
<!--  </button>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "argon-button",-->
<!--  props: {-->
<!--    color: {-->
<!--      type: String,-->
<!--      default: "info",-->
<!--    },-->
<!--    size: {-->
<!--      type: String,-->
<!--      default: "md",-->
<!--    },-->
<!--    variant: {-->
<!--      type: String,-->
<!--      default: "fill",-->
<!--    },-->
<!--    fullWidth: {-->
<!--      type: Boolean,-->
<!--      default: false,-->
<!--    },-->
<!--    active: {-->
<!--      type: Boolean,-->
<!--      default: false,-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    getClasses: (variant, color, size, fullWidth, active) => {-->
<!--      let colorValue, sizeValue, fullWidthValue, activeValue;-->

<!--      // Setting the button variant and color-->
<!--      if (variant === "gradient") {-->
<!--        colorValue = `bg-gradient-${color}`;-->
<!--      } else if (variant === "outline") {-->
<!--        colorValue = `btn-outline-${color}`;-->
<!--      } else {-->
<!--        colorValue = `btn-${color}`;-->
<!--      }-->

<!--      sizeValue = size ? `btn-${size}` : null;-->

<!--      fullWidthValue = fullWidth ? `w-100` : null;-->

<!--      activeValue = active ? `active` : null;-->

<!--      return `${colorValue} ${sizeValue} ${fullWidthValue} ${activeValue}`;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
