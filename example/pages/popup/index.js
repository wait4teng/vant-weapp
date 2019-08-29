import Page from '../../common/page';

Page({
  data: {
    show: {
      basic: false,
      top: false,
      bottom: false,
      left: false,
      right: false
    }
  },

  toggle(type, show) {
    this.setData({
      [`show.${type}`]: show
    });
  },

  showBasic() {
    this.toggle('basic', true);
  },

  hideBasic() {
    this.toggle('basic', false);
  },

  showTop() {
    this.toggle('top', true);
  },

  hideTop() {
    this.toggle('top', false);
  },

  showLeft() {
    this.toggle('left', true);
  },

  hideLeft() {
    this.toggle('left', false);
  },

  showRight() {
    this.toggle('right', true);
  },

  hideRight() {
    this.toggle('right', false);
  },

  showBottom() {
    this.toggle('bottom', true);
  },

  hideBottom() {
    this.toggle('bottom', false);
  },

  onClickLeft() {
    wx.navigateBack();
  }
});
