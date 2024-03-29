
# Магазин мебели Loft Furniture

##О проекте

В проекте реализована регистрация, логин, логаут. При логине в cookies сохраняется сессия пользователя которая позволяет
при перезагрузке оставаться залогиненным на сайте.
Есть поиск товаров по названию с переходом на страницу товара.
Реализовано добавление, удаление товара, а так же увеличение и уменьшение количества товаров в корзине.
Удаление всех товаров с корзины. Поиск товаров по фильтрам: цена, цвет, бренд.
Сортировка товаров по "Сначала дешевые", "Сначала дорогие" и "По популярности".
Определение геолокации пользователя. Фейковая оплата с помощью ЮKassa.

## Что использовано

#### Frontend:

- ReactJs + хуки
- TypeScript
- NextJs
- Redux Toolkit
- React Hook Form 
- Framer-motion
- Css-Modules/Scss
- Next progressbar
- React paginate 
- React select
- React slick
- React range
- React toastify
- Slick carousel 
- Axios

#### Backend:

- NestJs
- Sequelize
- Swagger
- Faker
- bcrypt
- Express-session
- Passport
- Passport local
- MySql


## Развертывание проекта

`npm i` - установка зависмостей; <br/>
`npm run start` - запуск фронтенда; <br/>
Создать .env и установить зависимость для: <br/>
NEXT_PUBLIC_SERVER_URL= "Ваш локальный сервер" <br/>
Перейти на сайт [https://apidocs.geoapify.com/#docs](https://apidocs.geoapify.com/#docs) зарегестрироваться и создать API key. <br/>
NEXT_PUBLIC_GEOAPI_KEY="Ваш API key"



Ссылка на Frontend: [https://loft-furniture-frontend.onrender.com](https://loft-furniture-frontend.onrender.com)<br/>
Ссылка на репозиторий с Backend: [https://github.com/Zhurvlad/loft-furniture-backend](https://github.com/Zhurvlad/loft-furniture-backend) <br/>
Ссылка на Api documentation: [https://loft-furniture-server.onrender.com/swagger](https://loft-furniture-server.onrender.com/swagger)

