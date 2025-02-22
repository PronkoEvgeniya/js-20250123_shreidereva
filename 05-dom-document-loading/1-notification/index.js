export default class NotificationMessage {
  static lastShownComponent;
  constructor (message, {
    duration = 2000,
    type = 'success',   
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement(this.createTemplate());
  }

  show(target = document.body) {
    if (NotificationMessage.lastShownComponent) {
      NotificationMessage.lastShownComponent.remove();
    }
    NotificationMessage.lastShownComponent = this;

    target.append(this.element);
    
    this.timerId = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  createElement(template) {
    const element = document.createElement('div');
  
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return `
    <div class="notification ${this.type}" style="--value:${this.duration}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
            ${this.message}
        </div>
        </div>  
    </div>      
    `;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    clearTimeout(this.timerId);
    this.remove();
  }
}
