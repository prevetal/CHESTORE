document.addEventListener('DOMContentLoaded', function() {

    // Вспомогательный объект для работы с куками
    const cookieHelper = {
        /**
         * Устанавливает куку.
         * @param {string} name - Имя куки.
         * @param {any} value - Значение куки (будет преобразовано в JSON).
         * @param {number} days - Количество дней, в течение которых кука будет храниться.
         */
        set: function(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            // JSON.stringify необходим для сохранения объектов/массивов в куках
            document.cookie = name + "=" + (JSON.stringify(value)) + expires + "; path=/";
        },

        /**
         * Получает значение куки по имени.
         * @param {string} name - Имя куки.
         * @returns {any|null} Распарсенное значение куки или null, если куки нет.
         */
        get: function(name) {
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    try {
                        // Пытаемся распарсить как JSON, так как мы так сохраняем
                        return JSON.parse(c.substring(nameEQ.length, c.length));
                    } catch (e) {
                        // Если не удалось распарсить JSON, возвращаем как есть.
                        // В нашем случае это не должно произойти при правильной работе cookieHelper.set
                        console.warn(`Ошибка при парсинге JSON из куки "${name}":`, e);
                        return c.substring(nameEQ.length, c.length);
                    }
                }
            }
            return null;
        },

        /**
         * Удаляет куку по имени.
         * @param {string} name - Имя куки.
         */
        delete: function(name) {
            document.cookie = name + '=; Max-Age=-99999999; path=/';
        }
    };

    // Название куки для корзины
    const CART_COOKIE_NAME = 'cartItems';
    // Элемент, где отображается количество уникальных товаров в корзине (в шапке/футере)
    const cartTotalUniqueItemsSpan = document.getElementById('cart-total-unique-items');
    // Контейнер для всплывающих сообщений
    const toastContainer = document.getElementById('toast-container');
    // Контейнер, где отображаются товары в корзине на странице корзины
    const cartProductsContainer = document.getElementById('cart-products-container');
    // Элементы для отображения общей стоимости и количества на странице корзины
    const cartTotalQuantitySpan = document.getElementById('cart-total-quantity');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');

    // Элементы для модального окна заказа
    const orderModal = document.getElementById('order_modal');
    const orderModalDesc = orderModal ? orderModal.querySelector('.modal_desc b') : null;
    const orderModalButton = document.querySelector('.order_btn'); // Предположим, у вас есть кнопка для открытия этой модалки, например, с классом 'order_btn'


    /**
     * Обновляет отображение общего количества уникальных товаров в корзине в UI (для шапки).
     * @param {Array} currentCartItems - Массив объектов корзины из куки.
     */
    function updateCartDisplay(currentCartItems) {
        if (cartTotalUniqueItemsSpan) {
            // Количество уникальных товаров - это просто длина массива `currentCartItems`
            cartTotalUniqueItemsSpan.textContent = currentCartItems.length.toString();
        }
    }

    /**
     * Отображает всплывающее сообщение (toast notification).
     * @param {string} message - Текст сообщения для отображения.
     */
    function showToastMessage(message) {
        if (!toastContainer) {
            console.warn("Элемент #toast-container не найден. Всплывающее сообщение не будет показано.");
            return;
        }

        const toast = document.createElement('div');
        toast.classList.add('toast-message');
        toast.textContent = message;

        // Добавляем сообщение в контейнер
        toastContainer.appendChild(toast);

        // Используем CSS-анимацию для анимированного появления и исчезновения.
        // Длительность нашей CSS-анимации (fadeInOut) составляет 4 секунды.
        // Устанавливаем таймаут, чтобы удалить элемент из DOM после завершения анимации.
        setTimeout(() => {
            // Проверяем, существует ли родительский элемент, прежде чем пытаться удалить
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000); // 4000 мс = 4 секунды, синхронизировано с длительностью CSS-анимации
    }


    // --- Инициализация при загрузке страницы ---
    const initialCartItems = cookieHelper.get(CART_COOKIE_NAME) || [];
    console.log("Корзина при загрузке страницы:", initialCartItems);
    updateCartDisplay(initialCartItems); // Обновляем UI в шапке/футере с текущим количеством товаров


    // --- Функции для работы с картой корзины на странице корзины ---

    /**
     * Форматирует число как валюту (с пробелами для тысяч и знаком рубля).
     * @param {number} value - Число для форматирования.
     * @returns {string} Отформатированная строка.
     */
    function formatCurrency(value) {
        return value.toLocaleString('ru-RU') + ' ₽';
    }

    /**
     * Обновляет общую сумму и количество товаров на странице корзины,
     * а также информацию в модальном окне заказа.
     */
    function updateCartTotalDisplay() {
        if (!cartProductsContainer || !cartTotalQuantitySpan || !cartTotalPriceSpan) {
            // Если элементы страницы корзины не найдены, но модалка может быть,
            // продолжаем обновлять только модалку.
            if (orderModalDesc) {
                const globalCartItems = cookieHelper.get(CART_COOKIE_NAME) || [];
                let totalQuantityGlobal = 0;
                let totalPriceGlobal = 0;
                
                globalCartItems.forEach(item => {
                    // Здесь price берется из productElement.dataset.productPrice
                    // Если корзина на другой странице, где нет productElements,
                    // вам нужно будет получать цену иначе (например, из cookie,
                    // если вы сохраняете там полную информацию о товаре,
                    // или делать AJAX-запрос на сервер).
                    // Для примера, возьмем заглушку или предположим, что price есть в item:
                    const productElement = document.querySelector(`.product[data-product-id="${item.id}"]`);
                    const price = productElement ? parseFloat(productElement.dataset.productPrice) : 0; // Или item.price, если он есть в куках
                    
                    totalQuantityGlobal += item.quantity;
                    totalPriceGlobal += (item.quantity * price);
                });
                orderModalDesc.textContent = `${totalQuantityGlobal} товара на сумму ${formatCurrency(totalPriceGlobal)}`;
            }
            return;
        }

        let totalQuantity = 0;
        let totalPrice = 0;
        const productElements = cartProductsContainer.querySelectorAll('.product');

        if (productElements.length === 0) {
            // Если нет товаров, показываем сообщение "корзина пуста"
            if (!document.querySelector('.empty-cart-message')) {
                const emptyMessage = document.createElement('p');
                emptyMessage.classList.add('empty-cart-message');
                emptyMessage.textContent = 'Ваша корзина пуста.';
                cartProductsContainer.appendChild(emptyMessage);
            }
            cartTotalQuantitySpan.textContent = '0';
            cartTotalPriceSpan.textContent = '0';
            const cartTotalBlock = document.querySelector('.cart_total');
            if (cartTotalBlock) cartTotalBlock.style.display = 'none'; // Скрываем блок "Общая сумма"
        } else {
            const emptyMessage = document.querySelector('.empty-cart-message');
            if (emptyMessage) {
                emptyMessage.remove(); // Удаляем сообщение "корзина пуста", если есть товары
            }
            const cartTotalBlock = document.querySelector('.cart_total');
            if (cartTotalBlock) cartTotalBlock.style.display = ''; // Показываем блок "Общая сумма"

            productElements.forEach(productEl => {
                const quantity = parseInt(productEl.querySelector('.product-quantity').value) || 0;
                const price = parseFloat(productEl.dataset.productPrice) || 0;
                
                totalQuantity += quantity;
                totalPrice += (quantity * price);

                // Обновляем подытог для конкретного товара
                const subtotalEl = productEl.querySelector('.product-subtotal');
                if (subtotalEl) {
                    subtotalEl.textContent = formatCurrency(quantity * price);
                }
            });

            cartTotalQuantitySpan.textContent = totalQuantity.toString();
            cartTotalPriceSpan.textContent = formatCurrency(totalPrice);
        }

        // Обновляем информацию в модальном окне заказа
        if (orderModalDesc) {
            orderModalDesc.textContent = `${totalQuantity} товара на сумму ${formatCurrency(totalPrice)}`;
        }
    }


    /**
     * Увеличивает количество товара в корзине.
     * @param {string} productId - ID товара.
     * @param {HTMLElement} inputElement - Элемент input для количества.
     */
    function increaseProductQuantity(productId, inputElement) {
        let cartItems = cookieHelper.get(CART_COOKIE_NAME) || [];
        // ВАЖНО: Преобразуем item.id в строку для сравнения, если оно могло быть числом ранее
        let itemIndex = cartItems.findIndex(item => String(item.id) === productId);

        if (itemIndex > -1) {
            const oldValue = parseInt(inputElement.value);
            const maximum = parseInt(inputElement.dataset.maximum);
            const step = parseInt(inputElement.dataset.step) || 1;

            if (oldValue < maximum) {
                cartItems[itemIndex].quantity += step;
                if (cartItems[itemIndex].quantity > maximum) {
                    cartItems[itemIndex].quantity = maximum;
                }
                inputElement.value = cartItems[itemIndex].quantity;
                cookieHelper.set(CART_COOKIE_NAME, cartItems, 7);
                updateCartTotalDisplay(); // Обновление общей суммы
                updateCartDisplay(cartItems); // Обновление для шапки
                showToastMessage(`Количество товара "${inputElement.closest('.product').dataset.productName}" увеличено до ${inputElement.value}.`);
            } else {
                showToastMessage(`Достигнуто максимальное количество для товара "${inputElement.closest('.product').dataset.productName}".`);
            }
        }
    }

    /**
     * Уменьшает количество товара в корзине.
     * @param {string} productId - ID товара.
     * @param {HTMLElement} inputElement - Элемент input для количества.
     */
    function decreaseProductQuantity(productId, inputElement) {
        let cartItems = cookieHelper.get(CART_COOKIE_NAME) || [];
        // ВАЖНО: Преобразуем item.id в строку для сравнения
        let itemIndex = cartItems.findIndex(item => String(item.id) === productId);

        console.log("cartItems:", cartItems);
        console.log("productId (из HTML):", productId, "тип:", typeof productId);
        
        if (itemIndex > -1) {
            const oldValue = parseInt(inputElement.value);
            const minimum = parseInt(inputElement.dataset.minimum);
            const step = parseInt(inputElement.dataset.step) || 1;

            if (oldValue > minimum) {
                cartItems[itemIndex].quantity -= step;
                if (cartItems[itemIndex].quantity < minimum) {
                    cartItems[itemIndex].quantity = minimum;
                }
                inputElement.value = cartItems[itemIndex].quantity;
                cookieHelper.set(CART_COOKIE_NAME, cartItems, 7);
                updateCartTotalDisplay(); // Обновление общей суммы
                updateCartDisplay(cartItems); // Обновление для шапки
                showToastMessage(`Количество товара "${inputElement.closest('.product').dataset.productName}" уменьшено до ${inputElement.value}.`);
            } else {
                // Если количество достигло минимума (обычно 1) и мы хотим уменьшить,
                // то это действие должно привести к удалению товара.
                // Вызываем удаление товара.
                removeProductFromCart(productId, inputElement.closest('.product'));
            }
        }
    }

    /**
     * Удаляет товар из корзины.
     * @param {string} productId - ID товара для удаления.
     * @param {HTMLElement} productElement - Элемент DOM, представляющий товар.
     */
    function removeProductFromCart(productId, productElement) {
        let cartItems = cookieHelper.get(CART_COOKIE_NAME) || [];
        const productName = productElement.dataset.productName || `Товар с ID ${productId}`;

        // ВАЖНО: Преобразуем item.id в строку для сравнения
        let updatedCartItems = cartItems.filter(item => String(item.id) !== productId);

        if (updatedCartItems.length < cartItems.length) {
            cookieHelper.set(CART_COOKIE_NAME, updatedCartItems, 7);
            productElement.remove(); // Удаляем элемент из DOM
            updateCartTotalDisplay(); // Обновляем общую сумму
            updateCartDisplay(updatedCartItems); // Обновляем UI в шапке
            showToastMessage(`"${productName}" удален из корзины.`);
        } else {
            showToastMessage(`"${productName}" не найден в корзине.`);
        }
    }

    // --- Обработчики событий для страницы корзины ---

    // Делегирование событий для кнопок +/- и удаления
    if (cartProductsContainer) {
        cartProductsContainer.addEventListener('click', function(e) {
            const target = e.target.closest('button'); // Ищем ближайшую кнопку
           
            if (!target) return;

            // ВАЖНО: dataset.id всегда возвращает строку, но для ясности и консистентности String() не повредит
            const productId = String(target.dataset.id);
            const productElement = target.closest('.product');

            if (!productId || !productElement) return;

            if (target.classList.contains('plus')) {
                const inputElement = productElement.querySelector('.product-quantity');
                increaseProductQuantity(productId, inputElement);
            } else if (target.classList.contains('minus')) {
                const inputElement = productElement.querySelector('.product-quantity');
                decreaseProductQuantity(productId, inputElement);
            } else if (target.classList.contains('delete_btn')) {
                removeProductFromCart(productId, productElement);
            }
        });

        // Обработка ручного ввода в поле количества
        $('body').on('change', '.product-quantity', function() {
            const $input = $(this);
            // ВАЖНО: dataset.id всегда возвращает строку, но для ясности и консистентности String() не повредит
            const productId = String($input.data('id')); 
            let newValue = parseInt($input.val());
            const minimum = parseInt($input.data('minimum'));
            const maximum = parseInt($input.data('maximum'));

            if (isNaN(newValue) || newValue < minimum) {
                newValue = minimum;
            }
            if (newValue > maximum) {
                newValue = maximum;
            }

            $input.val(newValue); // Обновляем значение в инпуте

            let cartItems = cookieHelper.get(CART_COOKIE_NAME) || [];
            // ВАЖНО: Преобразуем item.id в строку для сравнения
            let itemIndex = cartItems.findIndex(item => String(item.id) === productId);

            if (itemIndex > -1) {
                if (cartItems[itemIndex].quantity !== newValue) {
                    cartItems[itemIndex].quantity = newValue;
                    cookieHelper.set(CART_COOKIE_NAME, cartItems, 7);
                    updateCartTotalDisplay(); // Обновление общей суммы
                    updateCartDisplay(cartItems); // Обновление для шапки
                    showToastMessage(`Количество товара "${$input.closest('.product').dataset.productName}" изменено на ${newValue}.`);
                }
            } else if (newValue > 0) {
                // Если товар введен вручную, а в куке его нет (редкий случай на странице корзины),
                // можно добавить его, но в нашем случае это не должно происходить.
                showToastMessage(`Товар "${$input.closest('.product').dataset.productName}" не найден в корзине!`);
            }
        });

        // Первый вызов для корректного отображения итогов при загрузке страницы
        updateCartTotalDisplay();
    }


    // --- Обработчик нажатия кнопки "Купить" (для страниц продуктов, не корзины) ---
    // Этот обработчик должен быть доступен на всех страницах, где есть кнопки "Купить"
    $('body').on('click', '.buy_btn', function (e) {
        e.preventDefault();

        // Уже сделано: Приводим к строке для консистентности
        let productId = $(this).data("id").toString(); 
        let productName = $(this).data("name") || "Товар";

        if (!productId) {
            console.warn("Кнопка 'Купить' не имеет атрибута data-id. Невозможно добавить товар в корзину.");
            showToastMessage("Ошибка: не удалось добавить товар.");
            return;
        }

        let cartItems = cookieHelper.get(CART_COOKIE_NAME) || [];

        let found = false;
        let message = "";

        for (let i = 0; i < cartItems.length; i++) {
            // ВАЖНО: Преобразуем item.id в строку для сравнения
            if (String(cartItems[i].id) === productId) { 
                cartItems[i].quantity++;
                found = true;
                message = `${productName} (x${cartItems[i].quantity}) обновлен в корзине!`;
                break;
            }
        }

        if (!found) {
            cartItems.push({ id: productId, quantity: 1 });
            message = `${productName} добавлен в корзину!`;
        }

        cookieHelper.set(CART_COOKIE_NAME, cartItems, 7);

        console.log("Товар добавлен/обновлен в корзине:", cartItems);
        updateCartDisplay(cartItems); // Обновляем UI в шапке/футере
        showToastMessage(message);
        // Если при добавлении находимся на странице корзины, нужно обновить и ее
        if (cartProductsContainer) updateCartTotalDisplay();
    });

    /**
     * Очищает всю корзину.
     */
    function clearCart() {
        cookieHelper.delete(CART_COOKIE_NAME);
        console.log("Корзина очищена.");
        updateCartDisplay([]);
        showToastMessage("Корзина очищена.");
        // Также очищаем отображение на странице корзины
        if (cartProductsContainer) {
             cartProductsContainer.innerHTML = '<p class="empty-cart-message">Ваша корзина пуста.</p>';
             updateCartTotalDisplay(); // Обновит итоговые суммы до 0 и модалку
        }
    }

    // --- Привязка очистки корзины к кнопке (если есть) ---
    $('body').on('click', '.clear_cart_btn', function() {
        clearCart();
    });

    // --- Обработчик для открытия модального окна заказа ---
    if (orderModalButton) {
        orderModalButton.addEventListener('click', function() {
            // Обновляем данные в модальном окне перед его открытием
            updateCartTotalDisplay(); 
            // Здесь может быть вызов вашей функции открытия модального окна, например:
            // openModal(orderModal.id); 
            // Или если это простая CSS-модалка, просто добавляем класс 'is-active'
            orderModal.classList.add('is-active'); 
        });
    }

    // При загрузке страницы, в дополнение к обновлению шапки,
    // также обновляем данные для модального окна, если оно присутствует на странице.
    // Это важно, если пользователь сразу открывает модалку без взаимодействия с корзиной.
    updateCartTotalDisplay();


    // ====== Обработчики событий Contact Form 7 ======
    // Очищаем корзину в localStorage после успешной отправки формы CF7
    document.addEventListener('wpcf7mailsent', function(event) {
        // Убедитесь, что это нужная форма CF7, если у вас их несколько
        // (Обычно проверяют event.detail.contactFormId, если нужно)
        if ( '85' == event.detail.contactFormId ) {        
            /*localStorage.removeItem(CART_STORAGE_KEY);
            updateCartCounter();
            fetchAndRenderCartItems(); // Обновим корзину, чтобы показать, что она пуста*/
            //clearCart();
            $(event.target)[0].reset(); // Очистить поля формы CF7
            Fancybox.close()
            Fancybox.show([{
                src: '#thanks',
                type: 'inline'
            }])     
        }

        else{
            Fancybox.close()
            Fancybox.show([{
                src: '#thanks',
                type: 'inline'
            }])   
        }
    }, false);



}); // Конец DOMContentLoaded