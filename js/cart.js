import { COMPONENTS, READY_BUILDS } from './database.js';

const allProducts = [...COMPONENTS, ...READY_BUILDS];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartDrawer = document.querySelector('.cart-drawer');
const cartList = document.querySelector('.cart-drawer__list');
const cartTotalValue = document.querySelector('.cart-drawer__total-value');
const cartBadge = document.querySelector('.header__cart-badge');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
const modalTitle = document.querySelector('.modal__title');

const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

export const renderCart = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (!cartList) return;
    
    const btnCheckout = document.querySelector('#btn-checkout');

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div style="text-align: center; color: #8a8f9d; padding: 40px 20px;">
                <p>Ваша корзина пуста</p>
                <p style="font-size: 14px; margin-top: 10px;">Добавьте комплектующие или готовую сборку, чтобы продолжить.</p>
            </div>
        `;
        if (cartTotalValue) cartTotalValue.textContent = formatPrice(0);
        if (btnCheckout) btnCheckout.disabled = true;
        return;
    }

    if (btnCheckout) btnCheckout.disabled = false;
    let totalPrice = 0;

    const cartHtml = cart.map(cartItem => {
        const product = allProducts.find(p => String(p.id) === String(cartItem.id));
        if (!product) return '';

        totalPrice += product.price * cartItem.quantity;

        return `
            <div class="cart-item" style="display: flex; gap: 15px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #2a2d36;">
                <div class="cart-item__img-wrap">
                    <img src="${product.image}" alt="${product.name}" class="cart-item__img" style="width: 60px; height: 60px; object-fit: contain;">
                </div>
                <div class="cart-item__details" style="flex-grow: 1;">
                    <h4 class="cart-item__title" title="${product.name}" style="font-size: 14px; margin: 0 0 5px; color: #f5f6f8;">${product.name}</h4>
                    <span class="cart-item__price" style="color: #00f0ff; font-weight: bold; display: block; margin-bottom: 10px;">${formatPrice(product.price)}</span>
                    <div class="cart-item__controls" style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="cart-item__quantity" style="display: flex; border: 1px solid #2a2d36; border-radius: 4px; overflow: hidden;">
                            <button class="cart-item__qty-btn" data-action="minus" data-id="${product.id}" style="background: transparent; color: #f5f6f8; border: none; padding: 5px 10px; cursor: pointer;">-</button>
                            <input type="text" class="cart-item__qty-input" value="${cartItem.quantity}" readonly style="width: 30px; text-align: center; background: transparent; color: #f5f6f8; border: none; outline: none; font-size: 14px;">
                            <button class="cart-item__qty-btn" data-action="plus" data-id="${product.id}" style="background: transparent; color: #f5f6f8; border: none; padding: 5px 10px; cursor: pointer;">+</button>
                        </div>
                        <button class="cart-item__remove" data-action="remove" data-id="${product.id}" style="background: transparent; color: #ff0055; border: none; cursor: pointer; font-size: 12px; text-decoration: underline;">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartList.innerHTML = cartHtml;
    if (cartTotalValue) cartTotalValue.textContent = formatPrice(totalPrice);
};

const addToCart = (id) => {
    const productId = String(id);
    const existingItem = cart.find(item => String(item.id) === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        if (allProducts.some(p => String(p.id) === productId)) {
            cart.push({ id: productId, quantity: 1 });
        }
    }
    saveCart();
    renderCart();
    toggleCart(true);
};

const removeFromCart = (id) => {
    cart = cart.filter(item => String(item.id) !== String(id));
    saveCart();
    renderCart();
};

const changeQuantity = (id, delta) => {
    const item = cart.find(item => String(item.id) === String(id));
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCart();
        }
    }
};

const toggleCart = (forceOpen) => {
    if (!cartDrawer) return;
    if (typeof forceOpen === 'boolean') {
        forceOpen ? cartDrawer.classList.add('cart-drawer--open') : cartDrawer.classList.remove('cart-drawer--open');
    } else {
        cartDrawer.classList.toggle('cart-drawer--open');
    }
};

const toggleModal = (state) => {
    if (!modal) return;
    state ? modal.classList.add('modal--open') : modal.classList.remove('modal--open');
};

const openCheckoutModal = () => {
    if (cart.length === 0) return;

    modalTitle.textContent = 'Оформление заказа';
    modalBody.innerHTML = `
        <form id="checkout-form" style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
            <input type="text" id="checkout-name" placeholder="Ваше имя" required 
                   style="width: 100%; padding: 12px; background: #0d0e12; border: 1px solid #2a2d36; border-radius: 4px; color: #f5f6f8; font-family: inherit; outline: none;">
            <input type="tel" id="checkout-phone" placeholder="Ваш телефон" required 
                   style="width: 100%; padding: 12px; background: #0d0e12; border: 1px solid #2a2d36; border-radius: 4px; color: #f5f6f8; font-family: inherit; outline: none;">
            <button type="submit" class="btn" style="margin-top: 8px; padding: 12px; background: #00f0ff; color: #0d0e12; font-weight: bold; border: none; border-radius: 4px; cursor: pointer;">Подтвердить заказ</button>
        </form>
    `;

    toggleCart(false);
    toggleModal(true);
};

const getCartProducts = () => {
    return cart.map(cartItem => allProducts.find(p => String(p.id) === String(cartItem.id))).filter(Boolean);
};

const initSmartComponentsSelector = () => {
    const cartProducts = getCartProducts();
    
    if (cartProducts.length === 0) {
        modalTitle.textContent = 'С чего начнем сборку?';
        modalBody.innerHTML = '<p style="color: #8a8f9d;">Добавь процессор или материнскую плату, чтобы я подобрал совместимые детали.</p>';
        toggleCart(false);
        toggleModal(true);
        return;
    }

    const categoriesInCart = cartProducts.map(p => p.category);
    const essentialCategories = ['cpu', 'motherboard', 'gpu', 'ram'];
    const missingCategories = essentialCategories.filter(cat => !categoriesInCart.includes(cat));

    if (missingCategories.length === 0) {
        modalTitle.textContent = 'Сборка укомплектована!';
        modalBody.innerHTML = '<p style="color: #00f0ff;">У тебя в корзине уже есть все основные компоненты.</p>';
        toggleCart(false);
        toggleModal(true);
        return;
    }

    let targetSocket = null;
    const cpu = cartProducts.find(p => p.category === 'cpu');
    const mobo = cartProducts.find(p => p.category === 'motherboard');
    if (cpu && cpu.specs?.socket) targetSocket = cpu.specs.socket;
    else if (mobo && mobo.specs?.socket) targetSocket = mobo.specs.socket;

    const tiers = cartProducts.map(p => p.performanceTier).filter(Boolean);
    const avgTier = tiers.length > 0 ? Math.round(tiers.reduce((a, b) => a + b, 0) / tiers.length) : 3;

    let recommendationsHtml = '';

    missingCategories.forEach(category => {
        const matchingParts = COMPONENTS.filter(item => {
            if (item.category !== category) return false;
            
            if ((category === 'cpu' || category === 'motherboard') && targetSocket) {
                if (item.specs?.socket !== targetSocket) return false;
            }
            
            return Math.abs(item.performanceTier - avgTier) <= 1;
        });

        if (matchingParts.length > 0) {
            const catNames = { cpu: 'Процессор', motherboard: 'Материнская плата', gpu: 'Видеокарта', ram: 'Оперативная память' };
            
            recommendationsHtml += `<h4 style="color: #f5f6f8; margin: 20px 0 10px; border-bottom: 1px solid #2a2d36; padding-bottom: 5px;">Подобрали ${catNames[category] || category}:</h4>`;
            recommendationsHtml += `<div style="display: flex; flex-direction: column; gap: 12px;">`;
            
            matchingParts.forEach(part => {
                let badgeText = 'Идеально';
                let badgeColor = '#00f0ff';
                if (part.performanceTier < avgTier) {
                    badgeText = 'Бюджетный вариант';
                    badgeColor = '#8a8f9d';
                } else if (part.performanceTier > avgTier) {
                    badgeText = 'С запасом';
                    badgeColor = '#ff0055';
                }

                recommendationsHtml += `
                    <div style="display: flex; gap: 15px; align-items: center; background: #161920; padding: 10px; border-radius: 8px; border: 1px solid #2a2d36;">
                        <img src="${part.image}" alt="${part.name}" style="width: 50px; height: 50px; object-fit: contain;">
                        <div style="flex-grow: 1;">
                            <div style="font-size: 14px; font-weight: bold; color: #f5f6f8;">${part.name}</div>
                            <div style="font-size: 12px; color: ${badgeColor}; border: 1px solid ${badgeColor}; display: inline-block; padding: 2px 6px; border-radius: 4px; margin-top: 4px;">${badgeText}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: #00f0ff; font-weight: bold; margin-bottom: 5px;">${formatPrice(part.price)}</div>
                            <button class="btn modal-add-btn" data-id="${part.id}" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid #00f0ff; color: #00f0ff; border-radius: 4px; cursor: pointer;">Добавить</button>
                        </div>
                    </div>
                `;
            });
            recommendationsHtml += `</div>`;
        }
    });

    modalTitle.textContent = 'Умный подбор деталей';
    modalBody.innerHTML = recommendationsHtml || '<p style="color: #8a8f9d;">Подходящих комплектующих не найдено.</p>';
    
    toggleCart(false);
    toggleModal(true);
};

const initSmartBuildsSelector = () => {
    const cartIds = cart.map(item => String(item.id));
    const cartProducts = getCartProducts();
    
    const tiers = cartProducts.map(p => p.performanceTier).filter(Boolean);
    const avgTier = tiers.length > 0 ? Math.round(tiers.reduce((a, b) => a + b, 0) / tiers.length) : null;

    const analyzedBuilds = READY_BUILDS.map(build => {
        const components = build.componentsInBuild || [];
        const matchCount = components.filter(id => cartIds.includes(String(id))).length;
        return { ...build, matchCount };
    });

    const matchedBuilds = analyzedBuilds
        .filter(b => b.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount);
        
    const alternativeBuilds = analyzedBuilds
        .filter(b => b.matchCount === 0 && b.performanceTier === avgTier)
        .slice(0, 2);

    modalTitle.textContent = 'Готовые ПК под твои детали';
    let buildsHtml = '';

    if (matchedBuilds.length === 0 && alternativeBuilds.length === 0) {
        buildsHtml = '<p style="color: #8a8f9d;">Добавь комплектующие в корзину, чтобы мы подобрали сборку, включающую эти детали.</p>';
    } else {
        if (matchedBuilds.length > 0) {
            buildsHtml += `<h4 style="color: #00f0ff; margin-bottom: 10px;">Содержат выбранные детали:</h4>`;
            matchedBuilds.forEach(build => {
                buildsHtml += `
                    <div style="background: #161920; padding: 15px; border-radius: 8px; border: 1px solid #00f0ff; margin-bottom: 15px;">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <img src="${build.image}" style="width: 80px; height: 80px; object-fit: contain;">
                            <div style="flex-grow: 1;">
                                <div style="font-size: 16px; font-weight: bold; color: #f5f6f8;">${build.name}</div>
                                <div style="font-size: 12px; color: #00f0ff; margin-top: 4px;">Совпадений деталей: ${build.matchCount}</div>
                                <div style="font-size: 12px; color: #8a8f9d; margin-top: 4px;">Tier ${build.performanceTier}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: #00f0ff; font-weight: bold; font-size: 16px; margin-bottom: 8px;">${formatPrice(build.price)}</div>
                                <button class="btn modal-add-btn" data-id="${build.id}" style="padding: 8px 16px; font-size: 12px; background: #00f0ff; color: #0d0e12; font-weight: bold; border: none; border-radius: 4px; cursor: pointer;">Выбрать ПК</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        if (alternativeBuilds.length > 0) {
            buildsHtml += `<h4 style="color: #8a8f9d; margin: 20px 0 10px;">Альтернативы той же мощности:</h4>`;
            alternativeBuilds.forEach(build => {
                buildsHtml += `
                    <div style="background: #161920; padding: 15px; border-radius: 8px; border: 1px solid #2a2d36; margin-bottom: 15px;">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <img src="${build.image}" style="width: 60px; height: 60px; object-fit: contain;">
                            <div style="flex-grow: 1;">
                                <div style="font-size: 14px; font-weight: bold; color: #f5f6f8;">${build.name}</div>
                                <div style="font-size: 12px; color: #8a8f9d; margin-top: 4px;">Аналогичная производительность</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: #8a8f9d; font-weight: bold; margin-bottom: 8px;">${formatPrice(build.price)}</div>
                                <button class="btn modal-add-btn" data-id="${build.id}" style="padding: 6px 12px; font-size: 12px; background: transparent; border: 1px solid #8a8f9d; color: #8a8f9d; border-radius: 4px; cursor: pointer;">Выбрать ПК</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }

    modalBody.innerHTML = buildsHtml;
    toggleCart(false);
    toggleModal(true);
};

export const initCart = () => {
    renderCart();

    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#open-cart')) {
            e.preventDefault();
            toggleCart(true);
        }

        const productAddBtn = e.target.closest('.product-card__btn');
        if (productAddBtn) {
            addToCart(productAddBtn.dataset.id);
        }

        if (e.target.closest('#close-cart') || e.target.closest('#cart-overlay')) {
            toggleCart(false);
        }

        const qtyMinus = e.target.closest('.cart-item__qty-btn[data-action="minus"]');
        if (qtyMinus) changeQuantity(qtyMinus.dataset.id, -1);

        const qtyPlus = e.target.closest('.cart-item__qty-btn[data-action="plus"]');
        if (qtyPlus) changeQuantity(qtyPlus.dataset.id, 1);

        const removeBtn = e.target.closest('.cart-item__remove');
        if (removeBtn) removeFromCart(removeBtn.dataset.id);

        if (e.target.closest('#btn-checkout') && !e.target.closest('#btn-checkout').disabled) {
            openCheckoutModal();
        }

        if (e.target.closest('#btn-auto-pick') || e.target.closest('.btn--assistant-parts:not(.modal-add-btn)')) {
            initSmartComponentsSelector();
        }

        if (e.target.closest('#btn-suggest-build') || e.target.closest('.btn--assistant-builds:not(.modal-add-btn)')) {
            initSmartBuildsSelector();
        }

        if (e.target.closest('#close-modal') || e.target.closest('#modal-overlay')) {
            toggleModal(false);
        }

        const modalAddBtn = e.target.closest('.modal-add-btn');
        if (modalAddBtn) {
            addToCart(modalAddBtn.dataset.id);
            toggleModal(false);
        }
    });

    document.body.addEventListener('submit', (e) => {
        if (e.target.id === 'checkout-form') {
            e.preventDefault();
            const nameInput = document.getElementById('checkout-name');
            const phoneInput = document.getElementById('checkout-phone');
            
            if (nameInput.value.trim() && phoneInput.value.trim()) {
                cart = [];
                saveCart();
                renderCart();
                
                modalTitle.textContent = 'Заказ успешно оформлен';
                modalBody.innerHTML = `
                    <div style="text-align: center; padding: 30px 0;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="color: #f5f6f8; margin-bottom: 10px;">Спасибо, ${nameInput.value}!</h3>
                        <p style="color: #8a8f9d; line-height: 1.5;">Ваш заказ принят в обработку.<br>Мы свяжемся с вами по номеру <b>${phoneInput.value}</b> в ближайшее время.</p>
                    </div>
                `;
            }
        }
    });
};


