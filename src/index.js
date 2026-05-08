import './css/style.css';
import Popover from './js/Popover';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация всех кнопок с атрибутом data-popover="toggle"
  const triggers = document.querySelectorAll('[data-popover="toggle"]');
  triggers.forEach((trigger) => {
    const popover = new Popover(trigger);
    popover.init();
  });
});
