<template>
  <div>
    <button
      :disabled="disabled"
      :style="{
        '--width': width,
        '--height': height,
        '--bg': bg,
        '--color': color,
        '--font-w': fw,
        '--text-size': textSize,
        '--border': border,
      }"
      :class="{
        'btn-primary': type === 'primary',
        'btn-secondary': type === 'secondary',
        'btn-custom': type === 'custom',
        'btn-cancel': type === 'cancel',
        'btn-small': size === 's',
        'btn-middle': size === 'm',
        'btn-large': size === 'l',
        'btn-extra': size === 'xl',
        'btn-font-w': size === 'fw',
        'btn-text-size': size === 'textSize'
      }"
      @click="$emit('click')"
    >
      <i v-if="iconType === 'fa' && iconLeft && iconLeft.length > 0">
        <fa :icon="iconLeft" />
      </i>
      <i v-else-if="iconType === 'url' && iconLeft && iconLeft.length > 0">
        <img :src="iconLeft" alt="" />
      </i>
      {{ text }}
      <i v-if="iconType === 'fa' && iconRight && iconRight.length > 0">
        <fa :icon="iconRight" />
      </i>
      <i v-else-if="iconType === 'url' && iconRight && iconRight.length > 0">
        <img :src="iconRight" alt="" />
      </i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: { type: String, default: 'Button' },
    iconLeft: String,
    iconRight: String,
    iconType: { type: String, enum: ['url', 'fa'], default: 'fa' },
    border: { type: String, default: '1px' },
    type: {
      type: String,
      enum: ['primary', 'secondary','custom', 'cancel'],
      default: 'primary'
    },
    size: {
      type: String,
      enum: ['s', 'm', 'l', 'xl'],
      default: 's'
    },
    fw: {
      type: String,
      enum: ['bold', 'regular', 'normal'],
      default: 'normal'
    },
    textSize: {
      type: String,
      enum: ['uppercase', 'capitalise', 'lowercase'],
      default: 'lowercase'
    },
    disabled: { type: Boolean, default: false },
    width: { type: String },
    height: { type: String },
    bg: { type: String },
    color: { type: String },
    click: { type: Function }
  }
}
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";
$primary: #00520a;
button {
  --width: 120px;
  --height: 32px;
  --bg: var(--primary-green);
  --color: white;
  --font-w: 200;
  --text-size: lowercase;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  outline: none;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  text-transform: var(--text-size);
  cursor: pointer;
  font-weight: var(--font-w);
  -webkit-user-select: none;
  -moz-user-select: none;
  min-width: var(--width);
  -ms-user-select: none;
  user-select: none;
  min-height: var(--height);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 5px;

  i {
    margin-right: 5px;
  }

  &:hover {
    cursor: pointer;
  }

  &.btn {
    &-primary {
      background: var(--primary-green);
      color: white;

      &:hover {
        background: var(--primary-green-dark);
      }

      &:active {
        background: lighten($primary, 5%);
      }
    }

    &-secondary {
      background: none;
      border: 1px solid var(--primary-green);
      color: var(--primary-green);
    }
    &-custom {
      background: var(--bg);
      border: var(--border) solid var(--primary-green);
      color: var(--color);
    }



    &-small {
      height: 32px;
    }

    &-middle {
      height: 40px;
    }

    &-large {
      height: 48px;
      @media #{$media-movil, $media-iphone} {
        width: 100%;
        font-size: .7rem;
      }
    }

    &-extra {
      height: 56px;
    }
  }
}
</style>
