// Константы для позиционирования
const ARROW_HEIGHT = 8; // высота стрелки поповера
const OFFSET = 5; // отступ между элементом и поповером

export default class Popover {
  constructor(element) {
    if (!element) throw new Error('Element is required');
    this.element = element;
    this.title = element.dataset.popoverTitle || 'Заголовок';
    this.content = element.dataset.popoverContent || 'Текст';
    this.popoverElement = null;
    this.isVisible = false;

    // Привязываем методы
    this._onToggle = this._onToggle.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  init() {
    this.element.addEventListener('click', this._onToggle);
  }

  _onToggle(event) {
    event.stopPropagation();
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.isVisible) return;

    // Создаём поповер, если ещё не создан
    if (!this.popoverElement) {
      this.popoverElement = this._createPopoverElement();
    }

    // Вставляем в body (или рядом с элементом)
    document.body.appendChild(this.popoverElement);
    this._positionPopover();
    this.isVisible = true;

    // Добавляем слушатель на документ для закрытия по клику вне
    document.addEventListener('click', this._onDocumentClick);
  }

  hide() {
    if (!this.isVisible) return;

    if (this.popoverElement && this.popoverElement.parentNode) {
      this.popoverElement.parentNode.removeChild(this.popoverElement);
    }
    this.isVisible = false;

    document.removeEventListener('click', this._onDocumentClick);
  }

  _createPopoverElement() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('popover');

    const arrow = document.createElement('div');
    arrow.classList.add('popover-arrow');
    wrapper.appendChild(arrow);

    const header = document.createElement('h3');
    header.classList.add('popover-header');
    header.textContent = this.title;
    wrapper.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('popover-body');
    body.textContent = this.content;
    wrapper.appendChild(body);

    return wrapper;
  }

  _positionPopover() {
    if (!this.popoverElement) return;

    const triggerRect = this.element.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();

    // Показываем сверху, центрируем по горизонтали
    const top = triggerRect.top - popoverRect.height - ARROW_HEIGHT - OFFSET;
    let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;

    // Простейшая корректировка, чтобы не уходило за экран
    const { innerWidth } = window;
    if (left < 0) left = 0;
    if (left + popoverRect.width > innerWidth) left = innerWidth - popoverRect.width;

    this.popoverElement.style.position = 'absolute';
    this.popoverElement.style.top = `${top + window.scrollY}px`;
    this.popoverElement.style.left = `${left + window.scrollX}px`;
  }

  _onDocumentClick(event) {
    // Если клик был вне поповера и вне триггера – закрываем
    if (
      this.popoverElement
      && !this.popoverElement.contains(event.target)
      && event.target !== this.element
    ) {
      this.hide();
    }
  }
}
