document.addEventListener('DOMContentLoaded', function () {

    const isSafari = () => {
        return (
            ~navigator.userAgent.indexOf('Safari') &&
            navigator.userAgent.indexOf('Chrome') < 0
        );
    };

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    if (isMobile.any()) {
        document.querySelector('body').classList.add('v-mobile');
        document.querySelector('html').classList.add('v-mobile');
    } else {
        document.querySelector('body').classList.add('v-desk');
        document.querySelector('html').classList.add('v-desk');
    }



    const gotoTargets = document.querySelectorAll('[data-goto]');
    if (gotoTargets) {
        gotoTargets.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                const target = document.querySelector(item.dataset.goto);
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            })

        })
    }


    const swiperReserves = new Swiper('.reserves-slider .swiper', {
        loop: true,
        autoplay: {
            'delay': 0,
            'speed': 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 4000,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 10,
        breakpoints: {
            899: {
                spaceBetween: 12,
                autoplay: false,
                speed: 300,
            },
            1199: {
                spaceBetween: 12,
                autoplay: false,
                speed: 300,
            },
            1440: {
                spaceBetween: 12,
                autoplay: false,
                speed: 300,
            },
            1770: {
                spaceBetween: 12,
                autoplay: false,
                speed: 300,
            }
        },

        // Navigation arrows
        navigation: {
            nextEl: '.reserves-slider-next',
            prevEl: '.reserves-slider-prev',
        },

        // If we need pagination
        // pagination: {
        //     el: '.logos-swiper-pagination',
        // },
    });
    const swiperReviews = new Swiper('.reviews-slider .swiper', {
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 100,
        breakpoints: {
            899: {
                slidesPerView: 1,
            },
            1199: {
                slidesPerView: 1,
            },
            1599: {
                slidesPerView: 2,
            },

        },
        navigation: {
            nextEl: '.reviews-slider-next',
            prevEl: '.reviews-slider-prev',
        },
    });
    const swiperPartners = new Swiper('.partners .swiper', {
        loop: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 0,
        breakpoints: {

        },
        navigation: {
            nextEl: '.partners-slider-next',
            prevEl: '.partners-slider-prev',
        },
    });

    // menu
    const header = document.querySelector('.header');
    const footer = document.getElementById('footer');
    const menu = document.querySelector('.menu');
    const menuWrapper = document.querySelector('.menu__wrapper');
    const menuToggle = document.querySelector('.menu__toggle');

    document.body.style.setProperty('--header', header.offsetHeight + 'px');
    document.body.style.setProperty('--footer', footer.offsetHeight + 'px');

    addEventListener("resize", (event) => {
        document.body.style.setProperty('--header', header.offsetHeight + 'px');
        document.body.style.setProperty('--footer', footer.offsetHeight + 'px');
    });


    if (menu) {
        menuToggle.addEventListener('click', function () {
            if (window.innerWidth > 899) {

                if (!menuToggle.classList.contains('_disabled')) {

                    menuToggle.classList.toggle('_active');
                    menu.classList.toggle('_active');
                    document.body.classList.toggle('_lock');

                    if (menu.classList.contains('_active')) {
                        menu.style.height = getComputedStyle(menu).getPropertyValue('--height');
                        console.log(header.offsetHeight);
                        menu.style.visibility = 'visible';
                        menuToggle.classList.toggle('_disabled');

                        setTimeout(() => {
                            menu.style.width = '100%';
                            menu.style.right = 0;
                        }, 400);

                        setTimeout(() => {
                            menuWrapper.style.opacity = 1;
                            menuToggle.classList.toggle('_disabled');
                        }, 800);
                    } else {
                        menuWrapper.style.opacity = 0;

                        menuToggle.classList.toggle('_disabled');

                        setTimeout(() => {
                            menu.style.width = '214px';
                            menu.style.right = getComputedStyle(menu).getPropertyValue('--right');
                        }, 200);

                        setTimeout(() => {
                            menu.style.height = '0';
                        }, 600);

                        setTimeout(() => {
                            menu.style.visibility = 'hidden';
                            menuToggle.classList.toggle('_disabled');
                        }, 1000);
                    }
                }
            } else {
                menuToggle.classList.toggle('_active');
                menu.classList.toggle('_active');
                document.body.classList.toggle('_lock');
            }
            fullpage_api.destroy();
        });
    }

    const subMenu = document.querySelectorAll('.has_submenu');
    subMenu.forEach(menu => {
        const trigger = menu.querySelector('.has_submenu svg')
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            if (isMobile.any()) {
                const submenu = menu.querySelectorAll('.menu__submenu');
                const tl = gsap.timeline({
                    defaults: { duration: 0.2, ease: 'power4.inOut' },
                });

                if (menu.classList.contains('_active')) {
                    tl.to(submenu[0], { opacity: 0 }).to(submenu[0], { height: 0, paddingBottom: 0, overflow: 'hidden' })
                    menu.classList.remove('_active');
                } else {
                    tl.to(submenu[0], { height: 'auto', paddingBottom: '30px', overflow: 'vissible' }).to(submenu[0], { opacity: 1 })
                    menu.classList.add('_active');
                }
            }
        })
    })

    // Mobile Menu Accordion
    const mobileMenuItems = document.querySelectorAll('.menu-top__col');
    const mobileMenuLists = document.querySelectorAll('.menu-top__list');

    if (mobileMenuItems) {
        mobileMenuItems.forEach((mmItem) => {
            const toggle = mmItem.querySelector('.menu-top__title');

            toggle.addEventListener('click', () => {
                mobileMenuItems.forEach(item => {
                    if (item !== mmItem) {
                        item.classList.remove('_active');

                        const itemList = item.querySelector('.menu-top__list');
                        itemList.style.height = '0px';
                    }
                })

                const mmList = mmItem.querySelector('.menu-top__list');
                mmItem.classList.toggle('_active');

                if (mmItem.classList.contains('_active')) {
                    mmList.style.height = mmList.scrollHeight + 'px';
                } else {
                    mmList.style.height = '0px';
                }

            })



        })
    }
    // END | FAQ

    // FAQ
    const faqItems = document.querySelectorAll('.faq-block-item');
    if (faqItems) {
        faqItems.forEach((faqItem) => {
            const toggle = faqItem.querySelector('.faq-block-item__title');

            toggle.addEventListener('click', () => {
                faqItems.forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('_active');
                    }
                })

                faqItem.classList.toggle('_active');
            })

        })
    }
    // END | FAQ

    // Poster click
    const imgtextPoster = document.querySelectorAll('.imgtext__poster');
    if (imgtextPoster.length > 0) {
        imgtextPoster.forEach(poster => {
            poster.addEventListener('click', () => {
                const parent = poster.closest('.imgtext__video');
                const video = parent.querySelector('video');
                poster.style.display = 'none';
                video.play();
            })
        })
    }
    // END | Poster click

});

const fullpage = document.querySelector('#fullpage');
if (fullpage) {
    $('#fullpage').fullpage({
        menu: '#navigation',
        scrollOverflow: true
    });
}



// products
const filterItems = document.querySelectorAll('.filterBlock__form-item');

if (filterItems) {
    filterItems.forEach(item => {
        const header = item.querySelector('.filterBlock__form-name');
        const block = item.querySelector('.filterBlock__form-block');
        
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active') && block.classList.contains('active');
            filterItems.forEach(i => {
                i.querySelector('.filterBlock__form-name').classList.remove('active');
                i.querySelector('.filterBlock__form-block').classList.remove('active');
            });
            if (!isActive) {
                header.classList.add('active');
                block.classList.add('active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isClickInside = Array.from(filterItems).some(item => 
            item.contains(event.target)
        );
        if (!isClickInside) {
            filterItems.forEach(item => {
                item.querySelector('.filterBlock__form-name').classList.remove('active');
                item.querySelector('.filterBlock__form-block').classList.remove('active');
            });
        }
    });
}




// timeline
if(document.querySelector('.timeline__button')){
    const button = document.querySelector('.timeline__button');
    const hiddenItems = document.querySelector('.timeline-hiden');
    button.addEventListener('click', () => {
        hiddenItems.classList.remove('timeline-hiden');
        button.style.display = 'none';
    });
}

// up
const upElement = document.querySelector('.up');
if (upElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            upElement.classList.add('show');
        } else {
            upElement.classList.remove('show');
        }
    })
    upElement.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}