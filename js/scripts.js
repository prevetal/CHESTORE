WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight


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
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	// Changing the quantity of goods
	$('body').on('click', '.amount .minus', function (e) {
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
	})


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
	$('.mob_filter_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.filter').slideToggle(300)
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


	const priceRangePostfix = 'р.'

	const priceRange = $('#price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 1000000,
		from: 5000,
		to: 250000,
		step: 100,
		postfix: priceRangePostfix,
		onChange: data => {
			$('.price_range input.from').val(data.from + priceRangePostfix)
			$('.price_range input.to').val(data.to + priceRangePostfix)
		},
		onUpdate: data => {
			$('.price_range input.from').val(data.from + priceRangePostfix)
			$('.price_range input.to').val(data.to + priceRangePostfix)
		}
	}).data('ionRangeSlider')

	$('.price_range .input').keyup(function () {
		priceRange.update({
			from: parseInt($('.price_range input.from').val().replace(/[^\d]/g, ""), 10),
			to: parseInt($('.price_range input.to').val().replace(/[^\d]/g, ""), 10)
		})
	})


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
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Sort
	$('.sort .mini_modal .btn').click(function(e) {
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
	})
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
			center: [55.755864, 37.617698],
			zoom: 16,
			controls: []
		})


		// Placemark
		let myPlacemark = new ymaps.Placemark([55.755864, 37.617698], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/map_marker.svg',
			iconImageSize : [50, 61],
			iconImageOffset : [-25, -61],
		})

		myMap.geoObjects.add(myPlacemark)


		// Placemark 2
		let myPlacemark2 = new ymaps.Placemark([55.757766, 37.614864], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/map_marker.svg',
			iconImageSize : [50, 61],
			iconImageOffset : [-25, -61],
		})

		myMap.geoObjects.add(myPlacemark2)


		myMap.behaviors.disable('scrollZoom')
	})
}