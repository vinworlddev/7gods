(function() {
    "use strict";

    var $window = $(window);

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let headerNav = select('#nav-container')
        let offsetNav = headerNav.offsetHeight


        if (!header.classList.contains('header-scrolled')) {
            offset -= 20
        }

        if (!headerNav.classList.contains('nav-container-scrolled')) {
            offsetNav -= 20
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }


    let selectMobileHeader = select('#nav-container')
    if (selectMobileHeader) {
        const headerMobileScrolled = () => {
            if (window.scrollY > 100) {
                selectMobileHeader.classList.add('nav-container-scrolled')
            } else {
                selectMobileHeader.classList.remove('nav-container-scrolled')
            }
        }
        window.addEventListener('load', headerMobileScrolled)
        onscroll(document, headerMobileScrolled)
    }


    /**
   * Animation on scroll function and init
   */
    function aosInit() {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: false
        });
    }
    window.addEventListener('load', aosInit);

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /*------------------
         Preloader
     --------------------*/
      $(window).on('load', function () {
        // $(".loader").fadeOut();
        $("#preloader-active").delay(200).fadeOut("slow");
      });
     // Page loading
    //  $(window).on("load", function () {
    //     $("#preloader-active").delay(450).fadeOut("slow");
        
    // });

})()