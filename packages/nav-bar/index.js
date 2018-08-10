Component({
  externalClasses: [
    'custom-class',
    'title-class'
  ],

  options: {
    multipleSlots: true
  },

  properties: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onTapLeft() {
      this.triggerEvent('tap-left');
    },

    onTapRight() {
      this.triggerEvent('tap-right');
    }
  }
});
