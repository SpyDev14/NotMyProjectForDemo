import { initCatalog } from './catalog.js';
import { initCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Запуск приложения...');

        initCatalog();
        initCart();

        const grid = document.querySelector('.catalog__grid');
        const cartBadge = document.querySelector('.header__cart-badge');
        const mobileFilterBtn = document.querySelector('.mobile-filters-btn');
        const sidebar = document.querySelector('.sidebar');

        const injectUIStyles = () => {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulseBadge {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.4); box-shadow: 0 0 15px #ff0055; background-color: #ffffff; color: #ff0055; }
                    100% { transform: scale(1); }
                }
                .pulse-animation {
                    animation: pulseBadge 0.2s ease-in-out;
                }
                
                /* Стили для имитации загрузки (Скелетоны/Fade) */
                .catalog__grid--loading {
                    opacity: 0.3;
                    pointer-events: none;
                    filter: blur(2px);
                    transition: all 0.3s ease;
                }
                .catalog__grid {
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        };
        injectUIStyles();

        if (sidebar && mobileFilterBtn) {
            const sidebarOverlay = document.createElement('div');
            sidebarOverlay.className = 'sidebar__overlay';
            sidebarOverlay.style.cssText = `
                position: fixed; inset: 0; background: rgba(13, 14, 18, 0.8);
                z-index: 140; display: none; backdrop-filter: blur(4px);
                opacity: 0; transition: opacity 0.3s ease;
            `;
            document.body.appendChild(sidebarOverlay);

            const toggleSidebar = (isOpen) => {
                if (isOpen) {
                    sidebar.classList.add('sidebar--open');
                    sidebarOverlay.style.display = 'block';
                    requestAnimationFrame(() => sidebarOverlay.style.opacity = '1');
                    document.body.style.overflow = 'hidden'; 
                } else {
                    sidebar.classList.remove('sidebar--open');
                    sidebarOverlay.style.opacity = '0';
                    setTimeout(() => {
                        sidebarOverlay.style.display = 'none';
                    }, 300);
                    document.body.style.overflow = '';
                }
            };

            mobileFilterBtn.addEventListener('click', () => toggleSidebar(true));
            sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
        }

        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('product-card__btn') || target.classList.contains('modal-add-btn')) {
                if (cartBadge) {
                    cartBadge.classList.remove('pulse-animation');
                    void cartBadge.offsetWidth; 
                    cartBadge.classList.add('pulse-animation');
                }
            }
        });

        const filterControls = document.querySelectorAll('.header__tab, .sidebar input');
        
        filterControls.forEach(control => {
            control.addEventListener('click', () => {
                if (grid) {
                    grid.classList.add('catalog__grid--loading');
                    
                    setTimeout(() => {
                        grid.classList.remove('catalog__grid--loading');
                    }, 300);
                }
            });
        });

        console.log('Интерактивная платформа успешно загружена и готова к работе.');

    } catch (error) {
        console.error('Критическая ошибка при инициализации платформы:', error);
        
        const errorBanner = document.createElement('div');
        errorBanner.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%;
            background-color: #ff0055; color: #fff; text-align: center;
            padding: 15px; z-index: 9999; font-weight: bold;
        `;
        errorBanner.textContent = 'Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу.';
        document.body.prepend(errorBanner);
    }
});
