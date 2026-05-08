/**
 * @jest-environment jsdom
 *
 * Тесты для класса Popover (задание 1)
 */
import Popover from '../src/js/Popover';

function createTestDOM() {
  document.body.innerHTML = `
    <button
      class="btn"
      data-popover="toggle"
      data-popover-title="Тестовый заголовок"
      data-popover-content="Тестовый контент"
    >
      Click me
    </button>
  `;
  return document.querySelector('.btn');
}

describe('Popover', () => {
  let trigger;
  let popoverInstance;

  beforeEach(() => {
    trigger = createTestDOM();
    popoverInstance = new Popover(trigger);
    popoverInstance.init();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('должен создавать экземпляр класса Popover', () => {
    expect(popoverInstance).toBeInstanceOf(Popover);
  });

  test('должен показывать поповер при клике на триггер', () => {
    trigger.click();
    const popoverEl = document.querySelector('.popover');
    expect(popoverEl).not.toBeNull();
    expect(popoverEl.querySelector('.popover-header').textContent).toBe('Тестовый заголовок');
    expect(popoverEl.querySelector('.popover-body').textContent).toBe('Тестовый контент');
  });

  test('должен скрывать поповер при повторном клике на триггер', () => {
    trigger.click();
    trigger.click();
    expect(document.querySelector('.popover')).toBeNull();
  });

  test('должен скрывать поповер при клике вне элемента', () => {
    trigger.click();
    expect(document.querySelector('.popover')).not.toBeNull();
    document.body.click();
    expect(document.querySelector('.popover')).toBeNull();
  });

  test('должен скрывать поповер при клике на другой произвольный элемент', () => {
    trigger.click();
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.click();
    expect(document.querySelector('.popover')).toBeNull();
    outside.remove();
  });

  test('не должен создавать дубликатов при повторном вызове show()', () => {
    popoverInstance.show();
    popoverInstance.show(); // второй раз не должен добавить новый
    const popovers = document.querySelectorAll('.popover');
    expect(popovers.length).toBe(1);
  });

  test('должен правильно позиционировать поповер (строго сверху)', () => {
    // Мокируем размеры триггера
    const mockTriggerRect = {
      top: 200,
      left: 300,
      width: 100,
      height: 40,
      bottom: 240,
      right: 400,
    };
    trigger.getBoundingClientRect = jest.fn(() => mockTriggerRect);

    // Первый показ – элемент создастся, но с реальными размерами
    trigger.click();
    const popoverEl = popoverInstance.popoverElement;
    popoverInstance.hide(); // удаляем из DOM, чтобы замокать размеры

    const mockPopoverRect = {
      width: 200, height: 80, top: 0, left: 0,
    };
    popoverEl.getBoundingClientRect = jest.fn(() => mockPopoverRect);

    // Повторный показ с замоканными размерами
    trigger.click();

    const expectedTop = 200 - 80 - 8 - 5; // 107
    const expectedLeft = 300 + 50 - 100; // 250
    expect(parseInt(popoverEl.style.top, 10)).toBe(expectedTop);
    expect(parseInt(popoverEl.style.left, 10)).toBe(expectedLeft);
  });
});
