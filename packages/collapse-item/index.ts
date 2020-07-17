import { VantComponent } from '../common/component';

VantComponent({
  classes: ['title-class', 'content-class'],

  relation: {
    name: 'collapse',
    type: 'ancestor',
    current: 'collapse-item'
  },

  props: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    clickable: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    isLink: {
      type: Boolean,
      value: true
    }
  },

  data: {
    expanded: false
  },

  created() {
    this.animate = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease-in-out'
    });
  },

  mounted() {
    this.updateExpanded();

    this.inited = true;
  },

  methods: {
    updateExpanded() {
      if (!this.parent) {
        return Promise.resolve();
      }

      const { value, accordion } = this.parent.data;
      const { children = [] } = this.parent;
      const { name } = this.data;

      const index = children.indexOf(this);
      const currentName = name == null ? index : name;

      const expanded = accordion
        ? value === currentName
        : (value || []).some((name: string | number) => name === currentName);

      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }

      this.setData({ index, expanded });
    },

    updateStyle(expanded: boolean) {
      const { inited } = this;
      this.getRect('.van-collapse-item__content')
        .then(
          (rect: WechatMiniprogram.BoundingClientRectCallbackResult) =>
            rect.height
        )
        .then((height: number) => {
          const { animate } = this;

          if (expanded) {
            animate
              .height(height)
              .top(1)
              .step({
                duration: inited ? 300 : 1
              })
              .height('auto')
              .step();

            this.setData({
              animate: this.animate.export()
            });
            return;
          }

          animate
            .height(height)
            .top(0)
            .step({ duration: 1 })
            .height(0)
            .step({
              duration: 300
            });

          this.setData({
            animate: this.animate.export()
          });
        });
    },

    onClick() {
      if (this.data.disabled) {
        return;
      }

      const { name, expanded } = this.data;
      const index = this.parent.children.indexOf(this);
      const currentName = name == null ? index : name;

      this.parent.switch(currentName, !expanded);
    }
  }
});
