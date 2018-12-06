import { VantComponent } from '../common/component';

VantComponent({
  classes: ['content-class'],

  relation: {
    name: 'collapse',
    type: 'ancestor',
    linked(parent: Weapp.Component) {
      this.parent = parent;
    }
  },

  props: {
    name: [String, Number],
    icon: String,
    label: String,
    title: [String, Number],
    value: [String, Number],
    disabled: Boolean,
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
    contentHeight: 0,
    expanded: false
  },

  computed: {
    titleClass() {
      const { disabled, expanded } = this.data;
      return this.classNames('van-collapse-item__title', {
        'van-collapse-item__title--disabled': disabled,
        'van-collapse-item__title--expanded': expanded
      });
    }
  },

  methods: {
    updateExpanded() {
      if (!this.parent) {
        return null;
      }

      const { value, accordion, items } = this.parent.data;
      const { name } = this.data;

      const index = items.indexOf(this);
      const currentName = name == null ? index : name;

      const expanded = accordion
        ? value === currentName
        : value.some(name => name === currentName);

      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }

      this.set({ expanded });
    },

    updateStyle(expanded) {
      if (expanded) {
        this.getRect('.van-collapse-item__content').then(res => {
          this.set({
            contentHeight: res.height ? res.height + 'px' : null
          });
        });
      } else {
        this.set({
          contentHeight: 0
        });
      }
    },

    onClick() {
      if (this.data.disabled) {
        return;
      }

      const { name, expanded } = this.data;

      const index = this.parent.data.items.indexOf(this);
      const currentName = name == null ? index : name;

      this.parent.switch(currentName, !expanded);
    }
  }
});
