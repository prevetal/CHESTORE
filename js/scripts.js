WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


// В самом начале вашего JS файла, перед DOMContentLoaded
// Функция для работы с куки
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.swiper-slide')),
				resize: swiper => {
					let slides = swiper.el.querySelectorAll('.swiper-slide')

					slides.forEach(el => el.style.height = 'auto')

					setHeight(slides)
				}
			}
		})
	}


	// About info
	let aboutInfoSlider = document.querySelector('.about_info .swiper')

	if (aboutInfoSlider) {
		new Swiper('.about_info .swiper', {
			loop: true,
			loopAdditionalSlides: 2,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			lazy: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 20
				},
				768: {
					spaceBetween: 24
				}
			},
		})
	}


	// Reviews slider
	const reviewsSliders = [],
		reviews = document.querySelectorAll('.reviews .swiper')

	reviews.forEach((el, i) => {
		el.classList.add('reviews_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.review')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.review')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		reviewsSliders.push(new Swiper('.reviews_s' + i, options))
	})


	// Sub categories slider
	const subCategoriesSliders = [],
		subCategories = document.querySelectorAll('.sub_categories .swiper')

	subCategories.forEach((el, i) => {
		el.classList.add('sub_categories_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			scrollbar: {
				el: '.swiper-scrollbar',
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 5
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 7
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 8
				}
			},
			on: {
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.category')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		subCategoriesSliders.push(new Swiper('.sub_categories_s' + i, options))
	})


	// Products slider
	const productsSliders = [],
		products = document.querySelectorAll('.products .swiper')

	products.forEach((el, i) => {
		el.classList.add('products_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					setHeight(swiper.el.querySelectorAll('.product'))

					$(swiper.el).find('.swiper-button-next, .swiper-button-prev').css(
						'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
					)
				},
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.product')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)

					$(swiper.el).find('.swiper-button-next, .swiper-button-prev').css(
						'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
					)
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Product info
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 10,
			slidesPerView: 4,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					direction: 'horizontal',
				},
				768: {
					direction: 'vertical',
				}
			},
		})

		new Swiper('.product_info .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			lazy: true,
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	// Tabs slider
	const tabsSliders = [],
		tabs = document.querySelectorAll('.tabs.swiper')

	tabs.forEach((el, i) => {
		el.classList.add('tabs_s' + i)

		let options = {
			loop: false,
			speed: 500,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 1
				},
				768: {
					spaceBetween: 40,
					slidesPerView: 'auto'
				},
				1024: {
					spaceBetween: 48,
					slidesPerView: 'auto'
				},
				1280: {
					spaceBetween: 50,
					slidesPerView: 'auto'
				},
			},
			on: {
				slideChangeTransitionEnd: swiper => $(swiper.el).find('.swiper-slide-active .btn').click()
			}
		}

		tabsSliders.push(new Swiper('.tabs_s' + i, options))
	})


	// Changing the quantity of goods
	/*$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})*/


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	$('.mob_menu .menu_item > a.sub_link').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Filter
	$('.mob_filter_btn, .filter .mob_head .close_btn').click(function(e) {
		e.preventDefault()

		$('.mob_filter_btn').toggleClass('active')
		$('.filter').toggleClass('show')
	})


	$('.filter .name').click(function(e) {
		e.preventDefault()

		const item = $(this).closest('.item')

		$(this).toggleClass('active')

		item.find('.data').slideToggle(300)
	})


	$('.filter .spoler_btn').click(function(e) {
		e.preventDefault()

		const data = $(this).closest('.data')

		$(this).toggleClass('active')

		data.find('.field').toggleClass('show')
	})

     if($('.price_range').length) {
        // Удаляем priceRangePostfix, так как он не будет использоваться ни для отображения, ни для URL
        // const priceRangePostfix = 'р.'; // Эту строку удаляем или комментируем

        // Получаем текущие значения min и max из полей ввода
        // Нам нужно очистить значения от любых нечисловых символов, чтобы получить чистое число
        let initialMinPrice = parseInt($('.price_range input.from').val().replace(/[^\d]/g, ""), 10);
        let initialMaxPrice = parseInt($('.price_range input.to').val().replace(/[^\d]/g, ""), 10);

        // Убедимся, что значения корректны, если нет, используем значения по умолчанию
        if (isNaN(initialMinPrice)) {
            initialMinPrice = 0; // Значение по умолчанию, если ничего не задано или ошибка
        }
        if (isNaN(initialMaxPrice)) {
            initialMaxPrice = 1000000; // Значение по умолчанию
        }

        const priceRange = $('#price_range').ionRangeSlider({
            type: 'double',
            min: 0,
            max: 1000000, // Можно сделать это динамическим или достаточно большим
            from: initialMinPrice, // Используем полученное значение min
            to: initialMaxPrice,   // Используем полученное значение max
            step: 100,
            // postfix: priceRangePostfix, // УДАЛИТЬ эту строку, чтобы не добавлять 'р.'
            // decorate_both: false, // Эту строку можно удалить, так как нет постфикса
            onStart: function (data) {
                // Отображаем только числа, форматируя их для читаемости (например, с пробелами-разделителями)
                $('.price_range input.from').val(data.from.toLocaleString('ru-RU'));
                $('.price_range input.to').val(data.to.toLocaleString('ru-RU'));
            },
            onChange: data => {
                // При изменении слайдера, обновляем поля ввода только числами
                $('.price_range input.from').val(data.from.toLocaleString('ru-RU'));
                $('.price_range input.to').val(data.to.toLocaleString('ru-RU'));
            },
            onUpdate: data => {
                // Также обновляем поля ввода при программном обновлении слайдера только числами
                $('.price_range input.from').val(data.from.toLocaleString('ru-RU'));
                $('.price_range input.to').val(data.to.toLocaleString('ru-RU'));
            },
            onFinish: function (data) {
                // ionRangeSlider сам обновит свои внутренние значения `from` и `to`
                // которые используются для формирования скрытого input.
                // При клике на "Применить фильтры" форма отправится, и в URL будут чистые числа.

                // Здесь может быть вызов отправки формы, если хотите автоматическую отправку
                // $('.form_filter').submit();
            }
        }).data('ionRangeSlider');

        // Обработчик для ручного ввода в поля
        $('.price_range .input').on('change', function () {
            // Очищаем значение от любых нечисловых символов перед передачей в update
            const newMin = parseInt($('.price_range input.from').val().replace(/[^\d]/g, ""), 10);
            const newMax = parseInt($('.price_range input.to').val().replace(/[^\d]/g, ""), 10);

            priceRange.update({
                from: isNaN(newMin) ? priceRange.result.min : newMin, // Если не число, берем минимум слайдера
                to: isNaN(newMax) ? priceRange.result.max : newMax // Если не число, берем максимум слайдера
            });
            // НЕ отправляйте форму здесь автоматически
        });

        // Добавим форматирование для полей ввода при потере фокуса,
        // чтобы пользователь видел числа с разделителями тысяч
        $('.price_range .input').on('blur', function() {
            let val = $(this).val();
            // Очищаем от нечисловых символов перед форматированием
            val = parseInt(val.replace(/[^\d]/g, ""), 10);
            if (!isNaN(val)) {
                $(this).val(val.toLocaleString('ru-RU'));
            } else {
                // Если пользователь ввел что-то некорректное, возвращаем последнее валидное значение слайдера
                if ($(this).hasClass('from')) {
                    $(this).val(priceRange.result.from.toLocaleString('ru-RU'));
                } else {
                    $(this).val(priceRange.result.to.toLocaleString('ru-RU'));
                }
            }
        });
    }


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Mini pop-up windows
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when you click outside of it
	/*$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})*/


	// Sort
   /* $('.sort .mini_modal .btn').click(function(e) {
		e.preventDefault()

		const value = $(this).data('value'),
			parent = $(this).closest('.modal_cont')

		parent.find('.mini_modal_btn').removeClass('up down').addClass(value)

		parent.find('.mini_modal .btn').removeClass('active')
		$(this).addClass('active')

		$('.mini_modal, .mini_modal_btn').removeClass('active')

		if (is_touch_device()) $('body').css('cursor', 'default')

		// if (value === 'up') {
		// 	// sort up
		// } else {
		// 	// sort down
		// }
	})*/

    const sortCookieName = 'product_sort'; // Имя куки для сортировки

    // Инициализация сортировки при загрузке страницы
    function initSort() {
        let currentSortBy = new URL(window.location.href).searchParams.get('sort_by');
        let currentSortOrder = new URL(window.location.href).searchParams.get('sort_order');

        let savedSort = getCookie(sortCookieName);

        // Если в URL нет параметров, но они есть в куках, используем куки для ВИЗУАЛА
        // Логику применения сортировки на сервере обрабатывает PHP
        if (!currentSortBy && savedSort) {
            const [cookieSortBy, cookieSortOrder] = savedSort.split(':');
            currentSortBy = cookieSortBy;
            currentSortOrder = cookieSortOrder;
        } else if (currentSortBy && !savedSort) {
            // Если параметры в URL есть, а в куках нет, сохраняем в куки
            // это нужно при первом посещении по прямой ссылке с параметрами
            setCookie(sortCookieName, `${currentSortBy}:${currentSortOrder}`, 7);
        } else if (!currentSortBy && !savedSort) {
            // Если нигде нет, устанавливаем дефолтное значение для визуала (или из вашего PHP)
            currentSortBy = 'date';
            currentSortOrder = 'desc';
        }


        // Применяем визуальное состояние кнопок
        if (currentSortBy && currentSortOrder) {
            $('.sort .modal_cont').each(function() {
                const modalId = $(this).find('.mini_modal_btn').data('modal-id');
                const sortType = modalId.replace('#', '').replace('_sort_modal', ''); // price, popularity, name

                if (sortType === currentSortBy) {
                    const btn = $(this).find('.mini_modal_btn');
                    //btn.removeClass('up down').addClass(currentSortOrder).addClass('active');
                    $(this).find(`.mini_modal .btn[data-value="${currentSortOrder}"]`).addClass('active');
                } else {
                    // Убираем активное состояние с других кнопок-родителей и их модалок
                    $(this).find('.mini_modal_btn').removeClass('active up down');
                    $(this).find('.mini_modal .btn').removeClass('active');
                }
            });
        }
    }

    // Обработчик сохранения и применения сортировки
    $('.sort .mini_modal .btn').click(function(e) {
        e.preventDefault();

        const sortOrder = $(this).data('value'); // 'up' или 'down'
        const parentModalCont = $(this).closest('.modal_cont');
        const modalId = parentModalCont.find('.mini_modal_btn').data('modal-id');
        const sortBy = modalId.replace('#', '').replace('_sort_modal', ''); // Извлекаем 'price', 'popularity', 'name'

        // Сохраняем сортировку в куки
        setCookie(sortCookieName, `${sortBy}:${sortOrder}`, 7); // Хранить 7 дней

        // Формируем новый URL с учетом сортировки и перезагружаем страницу
        let newUrl = new URL(window.location.href);
        newUrl.searchParams.set('sort_by', sortBy);
        newUrl.searchParams.set('sort_order', sortOrder);
        newUrl.searchParams.delete('paged'); // Сбрасываем пагинацию на 1 при новой сортировке

        window.location.href = newUrl.toString(); // Перезагружаем страницу
    });

    // Обработчик для пагинации (стандартный, просто обновляем куки, если на странице не было sort_by)
    $(document).on('click', '.wp-pagenavi a, .pagination a', function(e) {
        // Если в URL УЖЕ есть параметры sort_by и sort_order, то ничего дополнительно сохранять не нужно
        // PHP автоматически применит сортировку из URL к новой странице пагинации
        let currentSortByInUrl = new URL(window.location.href).searchParams.get('sort_by');

        if (!currentSortByInUrl) {
           // Если пользователь перешел на страницу пагинации, а в URL нет сортировки
           // (например, пришел на /category/page/2 и пагинация автоматически подхватила дефолтную или из куки)
           let savedSort = getCookie(sortCookieName);
           if (savedSort) {
                const [cookieSortBy, cookieSortOrder] = savedSort.split(':');
                // Добавляем параметры в ссылку пагинации перед переходом
                let targetUrl = new URL($(this).attr('href'));
                targetUrl.searchParams.set('sort_by', cookieSortBy);
                targetUrl.searchParams.set('sort_order', cookieSortOrder);
                window.location.href = targetUrl.toString();
                e.preventDefault(); // Предотвращаем стандартный переход, чтобы перейти по модифицированной ссылке
           }
        }
        // Если sort_by был в URL, или нет куки, просто даем браузеру перейти по ссылке
    });

    // Изменение для закрытия модалки
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.modal_cont').length && !$(e.target).closest('.mini_modal').length) {
            $('.mini_modal, .mini_modal_btn').removeClass('active');
            if (typeof is_touch_device !== 'undefined' && is_touch_device()) {
                 $('body').css('cursor', 'default');
            }
        }
    });

    // Вызываем инициализацию сортировки после загрузки DOM
    initSort();


})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Map
const initMap = () => {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.768693, 47.167166],
			zoom: 8,
		})


		// Placemark
		let myPlacemark = new ymaps.Placemark([56.126599, 47.255121], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'http://localhost/2026/iphone/wp-content/themes/raten/images/map_marker.svg',
			iconImageSize : [50, 61],
			iconImageOffset : [-25, -61],
		})

		myMap.geoObjects.add(myPlacemark)


		// Placemark 2
		let myPlacemark2 = new ymaps.Placemark([56.109728, 47.476089], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'http://localhost/2026/iphone/wp-content/themes/raten/images/map_marker.svg',
			iconImageSize : [50, 61],
			iconImageOffset : [-25, -61],
		})

		myMap.geoObjects.add(myPlacemark2)

        let myPlacemark3 = new ymaps.Placemark([55.498933, 46.413912], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'http://localhost/2026/iphone/wp-content/themes/raten/images/map_marker.svg',
			iconImageSize : [50, 61],
			iconImageOffset : [-25, -61],
		})

		myMap.geoObjects.add(myPlacemark3)


		myMap.behaviors.disable('scrollZoom')
	})
}