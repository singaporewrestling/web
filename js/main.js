var $ = jQuery.noConflict();
$(document).foundation();
var FTEMP = FTEMP || {};
// Portfolio
(function($) {
	'use strict';
	FTEMP.initialize = {
		init: function() {
			FTEMP.initialize.responsiveClasses();
			FTEMP.initialize.scrollToTop();
			FTEMP.initialize.showTopScroll();
			FTEMP.initialize.absoluteCentered();
			FTEMP.initialize.fullScreen();
			FTEMP.initialize.lightbox();
			FTEMP.initialize.dataResponsiveHeights();
			FTEMP.initialize.pageTransition();
			FTEMP.initialize.resizeVideos();
		},
		responsiveClasses: function() {
			var jRes = jRespond([
				{
					label: 'small',
					enter: 0,
					exit: 479,
				},
				{
					label: 'handheld',
					enter: 480,
					exit: 767,
				},
				{
					label: 'tablet',
					enter: 768,
					exit: 991,
				},
				{
					label: 'laptop',
					enter: 992,
					exit: 1199,
				},
				{
					label: 'desktop',
					enter: 1200,
					exit: 10000,
				},
			]);
			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() {
						$body.addClass('screen-lg');
					},
					exit: function() {
						$body.removeClass('screen-lg');
					},
				},
				{
					breakpoint: 'laptop',
					enter: function() {
						$body.addClass('screen-md');
					},
					exit: function() {
						$body.removeClass('screen-md');
					},
				},
				{
					breakpoint: 'tablet',
					enter: function() {
						$body.addClass('screen-sm');
					},
					exit: function() {
						$body.removeClass('screen-sm');
					},
				},
				{
					breakpoint: 'handheld',
					enter: function() {
						$body.addClass('screen-xs');
					},
					exit: function() {
						$body.removeClass('screen-xs');
					},
				},
				{
					breakpoint: 'small',
					enter: function() {
						$body.addClass('screen-xxs');
					},
					exit: function() {
						$body.removeClass('screen-xxs');
					},
				},
			]);
		},
		scrollToTop: function() {
			$scrollToTopEl.click(function() {
				$('body,html')
					.stop(true)
					.animate(
						{
							scrollTop: 0,
						},
						400
					);
				return false;
			});
		},
		showTopScroll: function() {
			if (
				$body.hasClass('screen-lg') ||
				$body.hasClass('screen-md') ||
				$body.hasClass('screen-sm')
			) {
				if ($window.scrollTop() > 450) {
					$scrollToTopEl.fadeIn();
				} else {
					$scrollToTopEl.fadeOut();
				}
			}
		},
		absoluteCentered: function() {
			if ($absoluteCenteredEl.length > 0) {
				$absoluteCenteredEl.each(function() {
					var element = $(this),
						absoluteCenteredH = element.outerHeight(),
						headerHeight = $header.outerHeight();
					if (element.parents('#slider').length > 0 && !element.hasClass('ignore-header')) {
						if (
							$header.hasClass('transparent-header') &&
							($body.hasClass('screen-lg') || $body.hasClass('screen-md'))
						) {
							absoluteCenteredH = absoluteCenteredH - 70;
							if ($slider.next('#header').length > 0) {
								absoluteCenteredH = absoluteCenteredH + headerHeight;
							}
						}
					}
					if ($body.hasClass('screen-xs') || $body.hasClass('screen-xxs')) {
						if (
							element.parents('.full-screen').length &&
							!element.parents('.force-full-screen').length
						) {
							if (element.children('.column-padding').length > 0) {
								element
									.css({
										position: 'relative',
										top: '0',
										width: 'auto',
										marginTop: '0',
									})
									.addClass('clearfix');
							} else {
								element
									.css({
										position: 'relative',
										top: '0',
										width: 'auto',
										marginTop: '0',
										paddingTop: '60px',
										paddingBottom: '60px',
									})
									.addClass('clearfix');
							}
						} else {
							element.css({
								position: 'absolute',
								top: '50%',
								width: '100%',
								paddingTop: '0',
								paddingBottom: '0',
								marginTop: -(absoluteCenteredH / 2) + 'px',
							});
						}
					} else {
						element.css({
							position: 'absolute',
							top: '50%',
							width: '100%',
							paddingTop: '0',
							paddingBottom: '0',
							marginTop: -(absoluteCenteredH / 2) + 'px',
						});
					}
				});
			}
		},
		fullScreen: function() {
			if ($fullScreenEl.length > 0) {
				$fullScreenEl.each(function() {
					var element = $(this),
						scrHeight = window.innerHeight ? window.innerHeight : $window.height(),
						negativeHeight = element.attr('data-negative-height');
					if (element.attr('id') == 'slider') {
						var sliderHeightOff = $slider.offset().top;
						scrHeight = scrHeight - sliderHeightOff;
						if (element.hasClass('slider-parallax')) {
							var transformVal = element.css('transform'),
								transformX = transformVal.match(/-?[\d\.]+/g);
							if (!transformX) {
								var transformXvalue = 0;
							} else {
								var transformXvalue = transformX[5];
							}
							scrHeight =
								(window.innerHeight ? window.innerHeight : $window.height()) +
								Number(transformXvalue) -
								sliderHeightOff;
						}
						if (
							$('#slider.with-header').next('#header:not(.transparent-header)').length > 0 &&
							($body.hasClass('screen-lg') || $body.hasClass('screen-md'))
						) {
							var headerHeightOff = $header.outerHeight();
							scrHeight = scrHeight - headerHeightOff;
						}
					}
					if (element.parents('.full-screen').length > 0) {
						scrHeight = element.parents('.full-screen').height();
					}
					if ($body.hasClass('screen-xs') || $body.hasClass('screen-xxs')) {
						if (!element.hasClass('force-full-screen')) {
							scrHeight = 'auto';
						}
					}
					if (negativeHeight) {
						scrHeight = scrHeight - Number(negativeHeight);
					}
					element.css('height', scrHeight);
					if (element.attr('id') == 'slider' && !element.hasClass('canvas-slider-grid')) {
						if (element.has('.swiper-slide')) {
							element.find('.swiper-slide').css('height', scrHeight);
						}
					}
				});
			}
		},
		defineColumns: function(element) {
			var column = 4;
			if (element.hasClass('portfolio-full')) {
				if (element.hasClass('portfolio-3')) column = 3;
				else column = 4;
				if ($body.hasClass('screen-sm') && column == 4) {
					column = 3;
				} else if ($body.hasClass('screen-xs') && (column == 3 || column == 4)) {
					column = 2;
				} else if ($body.hasClass('screen-xxs')) {
					column = 1;
				}
			}
			return column;
		},
		setFullColumnWidth: function(element) {
			if (element.hasClass('portfolio-full')) {
				var columns = FTEMP.initialize.defineColumns(element);
				var containerWidth = element.width();
				if (containerWidth == Math.floor(containerWidth / columns) * columns) {
					containerWidth = containerWidth - 1;
				}
				var postWidth = Math.floor(containerWidth / columns);
				if ($body.hasClass('screen-xxs')) {
					var deviceSmallest = 1;
				} else {
					var deviceSmallest = 0;
				}
				element.find('.portfolio-item').each(function(index) {
					if (deviceSmallest == 0 && $(this).hasClass('wide')) {
						var elementSize = postWidth * 2;
					} else {
						var elementSize = postWidth;
					}
					$(this).css({
						width: elementSize + 'px',
					});
				});
			}
		},
		lightbox: function() {
			var $lightboxImageEl = $('[data-lightbox="image"]'),
				$lightboxGalleryEl = $('[data-lightbox="gallery"]'),
				$lightboxIframeEl = $('[data-lightbox="iframe"]'),
				$lightboxInlineEl = $('[data-lightbox="inline"]'),
				$lightboxAjaxEl = $('[data-lightbox="ajax"]'),
				$lightboxAjaxGalleryEl = $('[data-lightbox="ajax-gallery"]');
			if ($lightboxImageEl.length > 0) {
				$lightboxImageEl.magnificPopup({
					type: 'image',
					closeOnContentClick: true,
					closeBtnInside: false,
					fixedContentPos: true,
					mainClass: 'mfp-no-margins mfp-fade',
					image: {
						verticalFit: true,
					},
				});
			}
			if ($lightboxGalleryEl.length > 0) {
				$lightboxGalleryEl.each(function() {
					var element = $(this);
					if (
						element
							.find('a[data-lightbox="gallery-item"]')
							.parent('.clone')
							.hasClass('clone')
					) {
						element
							.find('a[data-lightbox="gallery-item"]')
							.parent('.clone')
							.find('a[data-lightbox="gallery-item"]')
							.attr('data-lightbox', '');
					}
					element.magnificPopup({
						delegate: 'a[data-lightbox="gallery-item"]',
						type: 'image',
						closeOnContentClick: true,
						closeBtnInside: false,
						fixedContentPos: true,
						mainClass: 'mfp-no-margins mfp-fade',
						image: {
							verticalFit: true,
						},
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0, 1],
						},
					});
				});
			}
			if ($lightboxIframeEl.length > 0) {
				$lightboxIframeEl.magnificPopup({
					disableOn: 600,
					type: 'iframe',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false,
				});
			}
			if ($lightboxInlineEl.length > 0) {
				$lightboxInlineEl.magnificPopup({
					type: 'inline',
					mainClass: 'mfp-no-margins mfp-fade',
					closeBtnInside: false,
					fixedContentPos: true,
				});
			}
			if ($lightboxAjaxEl.length > 0) {
				$lightboxAjaxEl.magnificPopup({
					type: 'ajax',
					closeBtnInside: false,
					callbacks: {
						ajaxContentAdded: function(mfpResponse) {
							FTEMP.initialize.resizeVideos();
						},
						open: function() {
							$body.addClass('ohidden');
						},
						close: function() {
							$body.removeClass('ohidden');
						},
					},
				});
			}
			if ($lightboxAjaxGalleryEl.length > 0) {
				$lightboxAjaxGalleryEl.magnificPopup({
					delegate: 'a[data-lightbox="ajax-gallery-item"]',
					type: 'ajax',
					closeBtnInside: false,
					gallery: {
						enabled: true,
						preload: 0,
						navigateByImgClick: false,
					},
					callbacks: {
						ajaxContentAdded: function(mfpResponse) {
							FTEMP.initialize.resizeVideos();
						},
						open: function() {
							$body.addClass('ohidden');
						},
						close: function() {
							$body.removeClass('ohidden');
						},
					},
				});
			}
		},
		resizeVideos: function() {
			if (!$().fitVids) {
				console.log('resizeVideos: FitVids not Defined.');
				return true;
			}
			$('#main-content,.portfolio-page-expanded .portfolio-expander-media').fitVids({
				customSelector:
					"iframe[src^='http://www.dailymotion.com/embed'], iframe[src*='maps.google.com'], iframe[src*='google.com/maps']",
				ignore: '.no-fv',
			});
		},
		maxHeight: function() {
			if ($commonHeightEl.length > 0) {
				$commonHeightEl.each(function() {
					var element = $(this);
					if (element.has('.common-height')) {
						FTEMP.initialize.commonHeight(element.find('.common-height'));
					}
					FTEMP.initialize.commonHeight(element);
				});
			}
		},
		commonHeight: function(element) {
			var maxHeight = 0;
			element.children('.columns').each(function() {
				var element = $(this).children('div');
				if (element.hasClass('max-height')) {
					maxHeight = element.outerHeight();
				} else {
					if (element.outerHeight() > maxHeight) maxHeight = element.outerHeight();
				}
			});
			element.children('.columns').each(function() {
				$(this).height(maxHeight);
			});
		},
		dataResponsiveHeights: function() {
			var $dataHeightXxs = $('[data-height-xxs]'),
				$dataHeightXs = $('[data-height-xs]'),
				$dataHeightSm = $('[data-height-sm]'),
				$dataHeightMd = $('[data-height-md]'),
				$dataHeightLg = $('[data-height-lg]');
			if ($dataHeightXxs.length > 0) {
				$dataHeightXxs.each(function() {
					var element = $(this),
						elementHeight = element.attr('data-height-xxs');
					if ($body.hasClass('screen-xxs')) {
						if (elementHeight != '') {
							element.css('height', elementHeight);
						}
					}
				});
			}
			if ($dataHeightXs.length > 0) {
				$dataHeightXs.each(function() {
					var element = $(this),
						elementHeight = element.attr('data-height-xs');
					if ($body.hasClass('screen-xs')) {
						if (elementHeight != '') {
							element.css('height', elementHeight);
						}
					}
				});
			}
			if ($dataHeightSm.length > 0) {
				$dataHeightSm.each(function() {
					var element = $(this),
						elementHeight = element.attr('data-height-sm');
					if ($body.hasClass('screen-sm')) {
						if (elementHeight != '') {
							element.css('height', elementHeight);
						}
					}
				});
			}
			if ($dataHeightMd.length > 0) {
				$dataHeightMd.each(function() {
					var element = $(this),
						elementHeight = element.attr('data-height-md');
					if ($body.hasClass('screen-md')) {
						if (elementHeight != '') {
							element.css('height', elementHeight);
						}
					}
				});
			}
			if ($dataHeightLg.length > 0) {
				$dataHeightLg.each(function() {
					var element = $(this),
						elementHeight = element.attr('data-height-lg');
					if ($body.hasClass('screen-lg')) {
						if (elementHeight != '') {
							element.css('height', elementHeight);
						}
					}
				});
			}
		},
		pageTransition: function() {
			if (!$body.hasClass('no-transition')) {
				var animationIn = $body.attr('data-animation-in'),
					animationOut = $body.attr('data-animation-out'),
					durationIn = $body.attr('data-speed-in'),
					durationOut = $body.attr('data-speed-out'),
					loaderTimeOut = $body.attr('data-loader-timeout'),
					loaderStyle = $body.attr('data-loader'),
					loaderColor = $body.attr('data-loader-color'),
					loaderStyleHtml = $body.attr('data-loader-html'),
					loaderBgStyle = '',
					loaderBorderStyle = '',
					loaderBgClass = '',
					loaderBorderClass = '',
					loaderBgClass2 = '',
					loaderBorderClass2 = '';
				if (!animationIn) {
					animationIn = 'fadeIn';
				}
				if (!animationOut) {
					animationOut = 'fadeOut';
				}
				if (!durationIn) {
					durationIn = 1500;
				}
				if (!durationOut) {
					durationOut = 800;
				}
				if (!loaderStyleHtml) {
					loaderStyleHtml =
						'<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>';
				}
				if (!loaderTimeOut) {
					loaderTimeOut = false;
				} else {
					loaderTimeOut = Number(loaderTimeOut);
				}
				if (loaderColor) {
					if (loaderColor == 'theme') {
						loaderBgClass = ' bgcolor';
						loaderBorderClass = ' border-color';
						loaderBgClass2 = ' class="bgcolor"';
						loaderBorderClass2 = ' class="border-color"';
					} else {
						loaderBgStyle = ' style="background-color:' + loaderColor + ';"';
						loaderBorderStyle = ' style="border-color:' + loaderColor + ';"';
					}
					loaderStyleHtml =
						'<div class="css3-spinner-bounce1' +
						loaderBgClass +
						'"' +
						loaderBgStyle +
						'></div><div class="css3-spinner-bounce2' +
						loaderBgClass +
						'"' +
						loaderBgStyle +
						'></div><div class="css3-spinner-bounce3' +
						loaderBgClass +
						'"' +
						loaderBgStyle +
						'></div>';
				}
				if (loaderStyle == '2') {
					loaderStyleHtml =
						'<div class="css3-spinner-clip-rotate"><div' +
						loaderBorderClass2 +
						loaderBorderStyle +
						'></div></div>';
				} else if (loaderStyle == '3') {
					loaderStyleHtml =
						'<div class="css3-spinner-ball-scale-multiple"><div' +
						loaderBgClass2 +
						loaderBgStyle +
						'></div><div' +
						loaderBgClass2 +
						loaderBgStyle +
						'></div><div' +
						loaderBgClass2 +
						loaderBgStyle +
						'></div></div>';
				}
				$wrapper.animsition({
					inClass: animationIn,
					outClass: animationOut,
					inDuration: Number(durationIn),
					outDuration: Number(durationOut),
					linkElement:
						'#primary-menu ul li a:not([target="_blank"]):not([href*=#]):not([data-lightbox])',
					loading: true,
					loadingParentElement: 'body',
					loadingClass: 'css3-spinner',
					loadingHtml: loaderStyleHtml,
					unSupportCss: [
						'animation-duration',
						'-webkit-animation-duration',
						'-o-animation-duration',
					],
					overlay: false,
					overlayClass: 'animsition-overlay-slide',
					overlayParentElement: 'body',
					timeOut: loaderTimeOut,
				});
			}
		},
	};
	FTEMP.head = {
		init: function() {
			FTEMP.head.showHeaderNav();
			FTEMP.head.navScroll();
			FTEMP.head.navScroller();
		},
		showHeaderNav: function() {
			if ($(window).scrollTop() > 1) {
				$header.addClass('show-header-nav');
			} else {
				$header.removeClass('show-header-nav');
			}
		},
		navScroll: function() {
			if ($singlePageNav.length > 0) {
				var singlePageNavSpeed = $singlePageNav.attr('data-speed'),
					singlePageNavOffset = $singlePageNav.attr('data-offset'),
					singlePageNavEasing = $singlePageNav.attr('data-easing');
				if (!singlePageNavSpeed) {
					singlePageNavSpeed = 1000;
				}
				if (!singlePageNavEasing) {
					singlePageNavEasing = 'easeOutQuad';
				}
				$singlePageNav.find('a[data-href]').click(function() {
					var element = $(this),
						divScrollToAnchor = element.attr('data-href'),
						divScrollSpeed = element.attr('data-speed'),
						divScrollOffset = element.attr('data-offset'),
						divScrollEasing = element.attr('data-easing');
					if ($(divScrollToAnchor).length > 0) {
						if (!singlePageNavOffset) {
						} else {
							var singlePageNavOffsetG = singlePageNavOffset;
						}
						if (!divScrollSpeed) {
							divScrollSpeed = singlePageNavSpeed;
						}
						if (!divScrollOffset) {
							divScrollOffset = singlePageNavOffsetG;
						}
						if (!divScrollEasing) {
							divScrollEasing = singlePageNavEasing;
						}
						if ($singlePageNav.hasClass('no-offset')) {
							divScrollOffset = 0;
						}
						singlePageNavGlobalOffset = Number(divScrollOffset);
						$singlePageNav.find('li').removeClass('current');
						$singlePageNav
							.find('a[data-href="' + divScrollToAnchor + '"]')
							.parent('li')
							.addClass('current');
						$('#primary-menu > ul').toggleClass(
							'show',
							function() {
								$('html,body')
									.stop(true)
									.animate(
										{
											scrollTop: $(divScrollToAnchor).offset().top - Number(divScrollOffset),
										},
										Number(divScrollSpeed),
										divScrollEasing
									);
							},
							false
						);
						singlePageNavGlobalOffset = Number(divScrollOffset);
					}
					return false;
				});
			}
		},
		navScroller: function() {
			$singlePageNav.find('li').removeClass('current');
			$singlePageNav
				.find('a[data-href="#' + FTEMP.head.singlePageNavCurrentSection() + '"]')
				.parent('li')
				.addClass('current');
		},
		singlePageNavCurrentSection: function() {
			var currentsinglePageNavSection = 'home',
				headerHeight = $headerWrap.outerHeight();
			if ($body.hasClass('side-header')) {
				headerHeight = 0;
			}
			$pageSectionEl.each(function(index) {
				var h = $(this).offset().top;
				var y = $window.scrollTop();
				var offsetScroll = headerHeight + singlePageNavGlobalOffset;
				if (
					y + offsetScroll >= h &&
					y < h + $(this).height() &&
					$(this).attr('id') != currentsinglePageNavSection
				) {
					currentsinglePageNavSection = $(this).attr('id');
				}
			});
			return currentsinglePageNavSection;
		},
	};
	FTEMP.portfolio = {
		init: function() {
			FTEMP.portfolio.portfolioExpander();
		},
		portfolioDescMargin: function() {
			var $portfolioOverlayEl = $('.portfolio-overlay');
			if ($portfolioOverlayEl.length > 0) {
				$portfolioOverlayEl.each(function() {
					var element = $(this);
					if (element.find('.portfolio-desc').length > 0) {
						var portfolioOverlayHeight = element.outerHeight();
						var portfolioOverlayDescHeight = element.find('.portfolio-desc').outerHeight();
						if (
							element.find('a.left-icon').length > 0 ||
							element.find('a.right-icon').length > 0 ||
							element.find('a.center-icon').length > 0
						) {
							var portfolioOverlayIconHeight = 40 + 20;
						} else {
							var portfolioOverlayIconHeight = 0;
						}
						var portfolioOverlayMiddleAlign =
							(portfolioOverlayHeight - portfolioOverlayDescHeight - portfolioOverlayIconHeight) /
							2;
						element.find('.portfolio-desc').css({
							'margin-top': portfolioOverlayMiddleAlign,
						});
					}
				});
			}
		},
		arrange: function() {
			FTEMP.initialize.setFullColumnWidth($portfolio);
			$('#portfolio.portfolio-full').isotope('layout');
		},
		portfolioExpander: function() {
			var $portfolioExpanderEl = ($('#portfolio-page-holder'),
			$('#portfolio .portfolio-expand-wrap'));
			var index = $portfolioExpanderEl.length;
			$portfolioExpanderEl.each(function() {
				$('#portfolio .portfolio-expand-wrap').click(function() {
					if ($(this).hasClass('active'));
					else {
						var lastindex = index;
						var index = $(this).index();
						$portfolioExpanderEl.removeClass('active'), $(this).addClass('active');
						var b =
							$(this)
								.find('.portfolio-expand-link')
								.attr('href') + ' .portfolio-item-data';
						$('#portfolio-page-data').animate(
							{
								opacity: 0,
							},
							400,
							function() {
								$('#portfolio-page-data').load(b, function() {
									FTEMP.initialize.resizeVideos();
								}),
									$('#portfolio-page-data')
										.delay(400)
										.animate(
											{
												opacity: 1,
											},
											400
										);
							}
						),
							$('html, body').animate(
								{
									scrollTop: $('.portfolio-bottom-margin').offset().top - 65,
								},
								900
							),
							$('#portfolio-page-holder')
								.slideUp(600, function() {
									$('#project-page-data').css('visibility', 'visible');
								})
								.delay(1100)
								.slideDown(1e3, function() {
									$('#project-page-data').fadeIn('slow', function() {}),
										$('.fade-in').each(function() {
											$(this).appear(function() {
												$(this)
													.delay(100)
													.animate(
														{
															opacity: 1,
															right: '0px',
														},
														1e3
													);
											});
										});
								});
					}
					return !1;
				}),
					$(document).on('click', '#close-portfolio', function() {
						return (
							$('#portfolio-page-data').animate(
								{
									opacity: 0,
								},
								400,
								function() {
									$('#portfolio-page-holder')
										.delay(400)
										.slideUp(400);
								}
							),
							$('html, body')
								.delay(1e3)
								.animate(
									{
										scrollTop: $('.portfolio-top-margin').offset().top - 70,
									},
									800
								),
							$portfolioExpanderEl.removeClass('active'),
							!1
						);
					});
			});
		},
	};
	FTEMP.widget = {
		init: function() {
			FTEMP.widget.animate();
			FTEMP.widget.textRotator();
			FTEMP.widget.anchorScroll();
			FTEMP.widget.counter();
			FTEMP.widget.misc();
		},
		animate: function() {
			var $dataAnimateEl = $('[data-animate]');
			if ($dataAnimateEl.length > 0) {
				if (
					$body.hasClass('screen-lg') ||
					$body.hasClass('screen-md') ||
					$body.hasClass('screen-sm')
				) {
					$dataAnimateEl.each(function() {
						var element = $(this),
							animationDelay = element.attr('data-delay'),
							animationDelayTime = 0;
						if (animationDelay) {
							animationDelayTime = Number(animationDelay) + 500;
						} else {
							animationDelayTime = 500;
						}
						if (!element.hasClass('animated')) {
							element.addClass('not-animated');
							var elementAnimation = element.attr('data-animate');
							element.appear(
								function() {
									setTimeout(function() {
										element.removeClass('not-animated').addClass(elementAnimation + ' animated');
									}, animationDelayTime);
								},
								{
									accX: 0,
									accY: -120,
								},
								'easeInCubic'
							);
						}
					});
				}
			}
		},
		textRotator: function() {
			if ($textRotatorEl.length > 0) {
				$textRotatorEl.each(function() {
					var element = $(this),
						trRotateAnimation = $(this).attr('data-rotate-animation'),
						trSpeed = $(this).attr('data-speed'),
						trSeparator = $(this).attr('data-separator');
					if (!trRotateAnimation) {
						trRotateAnimation = 'fade';
					}
					if (!trSpeed) {
						trSpeed = 1200;
					}
					if (!trSeparator) {
						trSeparator = ',';
					}
					var tRotator = $(this).find('.t-rotate');
					tRotator.Morphext({
						animation: trRotateAnimation,
						separator: trSeparator,
						speed: Number(trSpeed),
					});
				});
			}
		},
		anchorScroll: function() {
			$('a[data-scrollto]').click(function() {
				var element = $(this),
					divScrollToAnchor = element.attr('data-scrollto'),
					divScrollSpeed = element.attr('data-speed'),
					divScrollOffset = element.attr('data-offset'),
					divScrollEasing = element.attr('data-easing'),
					divScrollHighlight = element.attr('data-highlight');
				if (!divScrollSpeed) {
					divScrollSpeed = 750;
				}
				if (!divScrollEasing) {
					divScrollEasing = 'easeOutQuad';
				}
				$('html,body')
					.stop(true)
					.animate(
						{
							scrollTop: $(divScrollToAnchor).offset().top - Number(divScrollOffset),
						},
						Number(divScrollSpeed),
						divScrollEasing,
						function() {
							if (divScrollHighlight != '') {
								if ($(divScrollToAnchor).find('.highlight-me').length > 0) {
									$(divScrollToAnchor)
										.find('.highlight-me')
										.animate(
											{
												backgroundColor: divScrollHighlight,
											},
											300
										);
									var t = setTimeout(function() {
										$(divScrollToAnchor)
											.find('.highlight-me')
											.animate(
												{
													backgroundColor: 'transparent',
												},
												300
											);
									}, 500);
								} else {
									$(divScrollToAnchor).animate(
										{
											backgroundColor: divScrollHighlight,
										},
										300
									);
									var t = setTimeout(function() {
										$(divScrollToAnchor).animate(
											{
												backgroundColor: 'transparent',
											},
											300
										);
									}, 500);
								}
							}
						}
					);
				return false;
			});
		},
		notifications: function(element) {
			toastr.clear();
			var notifyElement = $(element),
				notifyPosition = notifyElement.attr('data-notify-position'),
				notifyType = notifyElement.attr('data-notify-type'),
				notifyMsg = notifyElement.attr('data-notify-msg'),
				notifyCloseButton = notifyElement.attr('data-notify-close');
			if (!notifyPosition) {
				notifyPosition = 'toast-top-right';
			} else {
				notifyPosition = 'toast-' + notifyElement.attr('data-notify-position');
			}
			if (!notifyMsg) {
				notifyMsg = 'Please set a message!';
			}
			if (notifyCloseButton == 'true') {
				notifyCloseButton = true;
			} else {
				notifyCloseButton = false;
			}
			toastr.options.positionClass = notifyPosition;
			toastr.options.closeButton = notifyCloseButton;
			toastr.options.closeHtml = '<button><i class="fa fa-remove"></i></button>';
			if (notifyType == 'warning') {
				toastr.warning(notifyMsg);
			} else if (notifyType == 'error') {
				toastr.error(notifyMsg);
			} else if (notifyType == 'success') {
				toastr.success(notifyMsg);
			} else {
				toastr.info(notifyMsg);
			}
			return false;
		},
		counter: function() {
			var $counterEl = $('.counter:not(.counter-instant)');
			if ($counterEl.length > 0) {
				$counterEl.each(function() {
					var element = $(this);
					var counterElementComma = $(this)
						.find('span')
						.attr('data-comma');
					if (!counterElementComma) {
						counterElementComma = false;
					} else {
						counterElementComma = true;
					}
					if ($body.hasClass('screen-lg') || $body.hasClass('screen-md')) {
						element.appear(
							function() {
								FTEMP.widget.runCounter(element, counterElementComma);
								if (element.parents('.common-height')) {
									FTEMP.initialize.maxHeight();
								}
							},
							{
								accX: 0,
								accY: -120,
							},
							'easeInCubic'
						);
					} else {
						FTEMP.widget.runCounter(element, counterElementComma);
					}
				});
			}
		},
		runCounter: function(counterElement, counterElementComma) {
			if (counterElementComma == true) {
				counterElement.find('span').countTo({
					formatter: function(value, options) {
						value = value.toFixed(options.decimals);
						value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						return value;
					},
				});
			} else {
				counterElement.find('span').countTo();
			}
		},
		parallax: function() {
			if ($parallaxEl.length > 0) {
				if (!FTEMP.isMobile.any()) {
					$.stellar({
						horizontalScrolling: false,
						verticalOffset: 150,
					});
				} else {
					$parallaxEl.addClass('mobile-parallax');
				}
			}
		},
		html5Video: function() {
			var videoEl = $('.video-wrap:has(video)');
			if (videoEl.length > 0) {
				videoEl.each(function() {
					var element = $(this),
						elementVideo = element.find('video'),
						outerContainerWidth = element.outerWidth(),
						outerContainerHeight = element.outerHeight(),
						innerVideoWidth = elementVideo.outerWidth(),
						innerVideoHeight = elementVideo.outerHeight();
					if (innerVideoHeight < outerContainerHeight) {
						var videoAspectRatio = innerVideoWidth / innerVideoHeight,
							newVideoWidth = outerContainerHeight * videoAspectRatio,
							innerVideoPosition = (newVideoWidth - outerContainerWidth) / 2;
						elementVideo.css({
							width: newVideoWidth + 'px',
							height: outerContainerHeight + 'px',
							left: -innerVideoPosition + 'px',
						});
					} else {
						var innerVideoPosition = (innerVideoHeight - outerContainerHeight) / 2;
						elementVideo.css({
							width: innerVideoWidth + 'px',
							height: innerVideoHeight + 'px',
							top: -innerVideoPosition + 'px',
						});
					}
					if (FTEMP.isMobile.any()) {
						var placeholderImg = elementVideo.attr('poster');
						if (placeholderImg != '') {
							element.append(
								'<div class="video-placeholder" style="background-image: url(' +
									placeholderImg +
									');"></div>'
							);
						}
					}
				});
			}
		},
		misc: function() {
			$('#primary-menu-trigger').click(function() {
				$('#primary-menu > ul').toggleClass('show');
				return false;
			});
			if (FTEMP.isMobile.any()) {
				$body.addClass('touch-device');
			}
		},
	};
	FTEMP.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (
				FTEMP.isMobile.Android() ||
				FTEMP.isMobile.BlackBerry() ||
				FTEMP.isMobile.iOS() ||
				FTEMP.isMobile.Opera() ||
				FTEMP.isMobile.Windows()
			);
		},
	};
	FTEMP.documentOnResize = {
		init: function() {
			var t = setTimeout(function() {
				FTEMP.initialize.absoluteCentered();
				FTEMP.initialize.fullScreen();
				FTEMP.initialize.maxHeight();
				FTEMP.portfolio.arrange();
				FTEMP.portfolio.portfolioDescMargin();
				FTEMP.widget.html5Video();
				FTEMP.initialize.dataResponsiveHeights();
			}, 500);
		},
	};
	FTEMP.documentOnReady = {
		init: function() {
			FTEMP.initialize.init();
			FTEMP.head.init();
			if ($portfolio.length > 0) {
				FTEMP.portfolio.init();
			}
			FTEMP.widget.init();
			FTEMP.documentOnReady.windowscroll();
		},
		windowscroll: function() {
			$window.on('scroll', function() {
				FTEMP.initialize.showTopScroll();
				FTEMP.head.showHeaderNav();
			});
			if ($singlePageNav.length > 0) {
				$window.scrolled(function() {
					FTEMP.head.navScroller();
				});
			}
		},
	};
	FTEMP.documentOnLoad = {
		init: function() {
			FTEMP.initialize.absoluteCentered();
			FTEMP.portfolio.portfolioDescMargin();
			FTEMP.portfolio.arrange();
			FTEMP.initialize.maxHeight();
			FTEMP.widget.parallax();
			FTEMP.widget.html5Video();
		},
	};
	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$headerWrap = $('#header-wrap'),
		singlePageNavGlobalOffset = 0,
		$fullScreenEl = $('.full-screen'),
		$commonHeightEl = $('.common-height'),
		$slider = $('#slider'),
		$portfolio = $('#portfolio'),
		$singlePageNav = $('.single-page-nav'),
		$scrollToTopEl = $('#scrollToTop'),
		$textRotatorEl = $('.text-rotator'),
		$absoluteCenteredEl = $('.absolute-centered'),
		$parallaxEl = $('.parallax'),
		$pageSectionEl = $('.section-page');
	$(document).ready(FTEMP.documentOnReady.init);
	$window.load(FTEMP.documentOnLoad.init);
	$window.on('resize', FTEMP.documentOnResize.init);
})(jQuery);
// Portfolio
// Recent News
jQuery(function($) {
	$('#recent-news').rss(
		'http://news.singaporewrestling.com/rss/',
		{
      limit: 4,
			entryTemplate:
				"<div class='medium-6 large-3 columns'><article class='article-card'><a href='{url}'>{teaserImage}</a><div class='card-content'><h5>{title}</h5><p>{shortBodyPlain}...</p><p><a href='{url}' class='button button-news'>Read Post</a></p></div></article></div>",
		},
		function callback() {
			var elementHeights = $('.article-card')
				.map(function() {
					return $(this).height();
				})
				.get();
			var maxHeight = Math.max.apply(null, elementHeights);
			var buttonHeight = $('.button-news').height();
			var totalHeight = maxHeight + buttonHeight;
			$('.article-card').height(totalHeight);
		}
	);
});
// Recent News
var config = {
	mobile: false,
	reset: false,
};
new WOW().init();
new scrollReveal(config);
