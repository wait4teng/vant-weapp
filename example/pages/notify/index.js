const Notify = require('../../dist/notify/index');

Page({
  showNotify() {
    Notify('通知内容');
  },

  showNotify2() {
    Notify({
      duration: 1000,
      text: '通知内容',
      selector: '#custom-selector',
      backgroundColor: '#38f'
    });
  }
});
