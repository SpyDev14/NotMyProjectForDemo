import { COMPONENTS, READY_BUILDS } from './database.js';

const catalogGrid = document.getElementById('catalog-grid');
const searchInput = document.getElementById('search-input');
const categoryInputs = document.querySelectorAll('input[name="category"]');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const socketInputs = document.querySelectorAll('.sidebar__input[type="checkbox"]');
const sortSelect = document.getElementById('sort-select');
const tabs = document.querySelectorAll('.header__tab');
const resetFiltersBtn = document.getElementById('reset-filters');

let currentTab = 'components'; 

const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};

const buildSpecsString = (specs) => {
    if (!specs) return '';
    const labels = {
        socket: 'Сокет',
        cores: 'Ядра',
        threads: 'Потоки',
        vram: 'Память (ГБ)',
        powerConsumption: 'TDP (Вт)',
        chipset: 'Чипсет',
        formFactor: 'Форм-фактор',
        capacity: 'Объем'
    };
    
    return Object.entries(specs)
        .map(([key, value]) => `${labels[key] || key}: ${value}`)
        .join(' | ');
};

export const renderCatalog = (items) => {
    catalogGrid.innerHTML = '';

    if (items.length === 0) {
        catalogGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: #8a8f9d; padding: 40px 0;">
                По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации.
            </div>
        `;
        return;
    }

    const html = items.map(item => {
        const { id, name, price, image, category, performanceTier, specs, description } = item;
        
        const badgeText = category ? category.toUpperCase() : `TIER ${performanceTier}`;
        const infoText = specs ? buildSpecsString(specs) : description;

        return `
            <article class="product-card">
                <span class="product-card__badge">${badgeText}</span>
                <div class="product-card__img-wrap">
                    <img src="${image}" alt="${name}" class="product-card__img">
                </div>
                <h3 class="product-card__title" title="${name}">${name}</h3>
                <div class="product-card__specs">
                    ${infoText}
                </div>
                <div class="product-card__price-row">
                    <span class="product-card__price">${formatPrice(price)}</span>
                    <button class="product-card__btn" data-id="${id}">В корзину</button>
                </div>
            </article>
        `;
    }).join('');

    catalogGrid.innerHTML = html;
};

export const filterCatalog = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('input[name="category"]:checked').value;
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
    
    const selectedSockets = Array.from(socketInputs)
        .filter(input => input.checked)
        .map(input => input.value);

    let filteredItems = currentTab === 'components' ? [...COMPONENTS] : [...READY_BUILDS];

    filteredItems = filteredItems.filter(item => {
        const { name, price, category, specs } = item;

        const matchSearch = name.toLowerCase().includes(searchTerm);
        const matchPrice = price >= minPrice && price <= maxPrice;

        if (currentTab === 'builds') {
            return matchSearch && matchPrice;
        }

        const matchCategory = activeCategory === 'all' || category === activeCategory;
        
        let matchSocket = true;
        if (selectedSockets.length > 0) {
            if (specs && specs.socket) {
                matchSocket = selectedSockets.includes(specs.socket);
            } else {
                matchSocket = false;
            }
        }

        return matchSearch && matchPrice && matchCategory && matchSocket;
    });

    const sortValue = sortSelect.value;
    if (sortValue === 'price-asc') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filteredItems.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'performance') {
        filteredItems.sort((a, b) => b.performanceTier - a.performanceTier);
    }

    renderCatalog(filteredItems);
};

const handleTabSwitch = (e) => {
    const targetBtn = e.target;
    if (!targetBtn.classList.contains('header__tab')) return;

    tabs.forEach(tab => tab.classList.remove('header__tab--active'));
    targetBtn.classList.add('header__tab--active');

    currentTab = targetBtn.dataset.target;

    const categoryGroup = document.querySelector('.sidebar__group:nth-child(2)');
    const socketGroup = document.querySelector('.sidebar__group:nth-child(4)');
    
    if (currentTab === 'builds') {
        categoryGroup.style.display = 'none';
        socketGroup.style.display = 'none';
    } else {
        categoryGroup.style.display = 'block';
        socketGroup.style.display = 'block';
    }

    filterCatalog();
};

const resetFilters = () => {
    searchInput.value = '';
    priceMinInput.value = '';
    priceMaxInput.value = '';
    document.querySelector('input[name="category"][value="all"]').checked = true;
    socketInputs.forEach(input => input.checked = false);
    sortSelect.value = 'popular';
    
    filterCatalog();
};

export const initCatalog = () => {
    searchInput.addEventListener('input', filterCatalog);
    priceMinInput.addEventListener('input', filterCatalog);
    priceMaxInput.addEventListener('input', filterCatalog);
    sortSelect.addEventListener('change', filterCatalog);
    
    categoryInputs.forEach(input => input.addEventListener('change', filterCatalog));
    socketInputs.forEach(input => input.addEventListener('change', filterCatalog));

    resetFiltersBtn.addEventListener('click', resetFilters);

    const tabsContainer = document.querySelector('.header__tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', handleTabSwitch);
    }

    filterCatalog();
};
