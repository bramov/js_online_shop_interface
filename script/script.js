document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');
    const category = document.querySelector('.category');
    const spinner = document.querySelector('.loader-wrapper')



    const createCardGoods = (id, title, price, img) =>{
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                            <img class="card-img-top" src="${img}" alt="">
                            <button class="card-add-wishlist"
                               data-goods-id="${id}"></button>
                            </div>
                            <div class="card-body justify-content-between">
                            <a href="#" class="card-title">${title}</a>
                            <div class="card-price">${price} ₽</div>
                            <div>
                            <button class="card-add-cart"
                               data-goods-id="${id}">Добавить в корзину</button>
                            </div>
                            </div>
                            </div>`;
        return card;
    };

    /*
    goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg'));
    goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 5000, 'img/temp/Flamingo.jpg'));
    goodsWrapper.appendChild(createCardGoods(3, 'Носки', 500, 'img/temp/Socks.jpg'));
    */
    const closeCart = (event) => {
        const target = event.target;
        if (target === cart ||
            target.classList.contains('cart-close') ||
            event.keyCode === 27){
            cart.style.display = '';
            document.removeEventListener('keyup', closeCart);
        }

    };


    const openCart = (e) => {
        e.preventDefault();
        cart.style.display = 'flex';
        document.addEventListener('keyup', closeCart);
    };

    const renderCard = (items) => {
        goodsWrapper.textContent = '';
        //выше - удаляем карточки, которые с 32 по 34 стр, ниже - деструктуризация
        items.forEach((item, index, array) => {
            const { id, title, price, imgMin } = item;
            goodsWrapper.appendChild(createCardGoods(id, title, price, imgMin));
        })
    };

    const getGoods = (handler, filter, spinner) => {
        loadSpinner();
        fetch('db/db.json')
            .then(response => response.json())
            .then(filter)
            .then(handler);


    };

    const loadSpinner = () => {
        goodsWrapper.innerHTML = `<div class="loadingio-spinner-dual-ball-ei6bauy3e8o"><p style="text-align: center; margin-top: 20px;">Загрузка</p><div class="ldio-ppb4b2d0odf">
                                    <div></div><div></div><div></div>
                                    </div></div>
                                    <style type="text/css">
                                    @keyframes ldio-ppb4b2d0odf-o {
                                        0%    { opacity: 1; transform: translate(0 0) }
                                       49.99% { opacity: 1; transform: translate(80px,0) }
                                       50%    { opacity: 0; transform: translate(80px,0) }
                                      100%    { opacity: 0; transform: translate(0,0) }
                                    }
                                    @keyframes ldio-ppb4b2d0odf {
                                        0% { transform: translate(0,0) }
                                       50% { transform: translate(80px,0) }
                                      100% { transform: translate(0,0) }
                                    }
                                    .ldio-ppb4b2d0odf div {
                                      position: absolute;
                                      width: 80px;
                                      height: 80px;
                                      border-radius: 50%;
                                      top: 60px;
                                      left: 20px;
                                    }
                                    .ldio-ppb4b2d0odf div:nth-child(1) {
                                      background: #e90c59;
                                      animation: ldio-ppb4b2d0odf 1s linear infinite;
                                      animation-delay: -0.5s;
                                    }
                                    .ldio-ppb4b2d0odf div:nth-child(2) {
                                      background: #46dff0;
                                      animation: ldio-ppb4b2d0odf 1s linear infinite;
                                      animation-delay: 0s;
                                    }
                                    .ldio-ppb4b2d0odf div:nth-child(3) {
                                      background: #e90c59;
                                      animation: ldio-ppb4b2d0odf-o 1s linear infinite;
                                      animation-delay: -0.5s;
                                    }
                                    .loadingio-spinner-dual-ball-ei6bauy3e8o {
                                      width: 200px;
                                      height: 200px;
                                      display: inline-block;
                                      overflow: hidden;
                                    }
                                    .ldio-ppb4b2d0odf {
                                      width: 100%;
                                      height: 100%;
                                      position: relative;
                                      transform: translateZ(0) scale(1);
                                      backface-visibility: hidden;
                                      transform-origin: 0 0; /* see note above */
                                    }
                                    .ldio-ppb4b2d0odf div { box-sizing: content-box; }
                                    </style>`;
    }

    const randomSort = (item) => item.sort(() => Math.random() - 0.5);

    const chooseCategory = (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item')) {
            const category = target.dataset.category;
            getGoods(renderCard, goods => {
                const newGoods = goods.filter(item => {
                    return item.category.includes(category);
                });
                return newGoods;
            })
        }

    }

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', chooseCategory)


    getGoods(renderCard, randomSort, loadSpinner);

});