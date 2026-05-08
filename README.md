# Popovers (Домашнее задание к занятию "Работа с HTML-формами")

[![Build Status](https://github.com/ksandr/ahj5-1/actions/workflows/deploy.yml/badge.svg)](https://github.com/ksandr/ahj5-1/actions)

## Ссылка на GitHub Pages
[Посмотреть демо](https://ksandr.github.io/ahj5-1/)

## Описание
Реализация виджета Popover на чистом JavaScript (без jQuery).  
При клике на кнопку появляется всплывающая подсказка сверху, центрированная по горизонтали.  
Есть авто-тесты на JSDOM с покрытием > 80%.

## Установка и запуск
```bash
yarn install    # установка зависимостей
yarn start      # разработка с HMR на localhost:9000
yarn build      # сборка в production
yarn test       # запуск тестов
yarn coverage   # запуск тестов с coverage
yarn lint       # проверка кода
