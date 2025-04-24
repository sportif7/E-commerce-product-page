let quantity = 0;
let item = 'undefined';
const shoppingCart = [];

function arrowButtonsEvent(){
          const arrowButtons = document.querySelectorAll('[data-carousel-button]');
          arrowButtons.forEach((btn)=>{
          btn.addEventListener('click', ()=>{
          const direction = btn.dataset.carouselButton === 'next' ?  1 : -1;
          const slider = btn.closest('[data-carousel]').querySelector('[data-slider]');
          const slides = document.querySelectorAll('.slide');
          const numberOfSlides = slides.length;
          const activeSlide = slider.querySelector('[data-active]');
					
          const index = ([...slides].indexOf(activeSlide) + direction + numberOfSlides) % numberOfSlides;
				        slides[index].dataset.active = true;
                delete activeSlide.dataset.active;
							})
          })
}

function desktopImageEvent(){
	        const slides = document.querySelectorAll('.slide');
					const slideBig = document.querySelector('.slide-big');
					      slides.forEach((slide)=>{
									  slide.addEventListener('click', ()=>{
										  slides.forEach(sl=>{
												sl.classList.remove('slide-on');
											})
											  slide.classList.add('slide-on');
											  slideBig.innerHTML = '';
												let clonedImg = slide.children[0].cloneNode(true);
												slideBig.appendChild(clonedImg);
										})
								})
}

function lightboxMode() {
	const overlay = document.querySelector('.overlay');
	const slideBig = document.querySelector('.slide-big');
	const slides = document.querySelectorAll('.slide');
	const width = 470;

	let index = [...slides].findIndex(el => el.classList.contains('slide-on'));

	const lightbox = createLightboxContainer();
	const lightboxCarousel = createLightboxCarousel();
	const lightboxSlideBig = prepareSlideBig(lightboxCarousel);
	const lightboxSlider = prepareLightboxSlider(lightboxCarousel);
	const lightboxSlides = lightboxSlider.querySelectorAll('.slide');

	const infinitySlider = createInfinitySlider();
	const infinitySlides = infinitySlider.querySelectorAll('.infinity-slide');

	slideBig.addEventListener('click', () => {
		openLightbox();
	});

	lightboxSlides.forEach((slide) => {
		slide.addEventListener('click', () => updateActiveSlide(slide, lightboxSlides, infinitySlider));
	});

	setupArrowButtons(lightboxCarousel, lightboxSlides, infinitySlider);
	addCloseButton(lightboxCarousel, lightbox, overlay);

	// === Helper Functions ===

	function createLightboxContainer() {
		const box = document.createElement('div');
		box.classList.add('lightbox');
		return box;
	}

	function createLightboxCarousel() {
		const clone = document.querySelector('.carousel').cloneNode(true);
		clone.classList.add('lightboxCarousel');
		return clone;
	}

	function prepareSlideBig(carousel) {
		const slide = carousel.children[0];
		slide.classList.remove('slide-big');
		slide.classList.add('lightboxSlideBig');
		slide.innerHTML = '';
		return slide;
	}

	function prepareLightboxSlider(carousel) {
		const slider = carousel.children[1];
		slider.style.justifyContent = "space-around";
		return slider;
	}

	function createInfinitySlider() {
		const clone = document.querySelector('.slider').cloneNode(true);
		clone.classList.remove('slider');
		clone.classList.add('infinity-slider');

		clone.querySelectorAll('.slide').forEach(slide => {
			slide.classList.remove('slide', 'slide-on');
			slide.classList.add('infinity-slide');
		});

		return clone;
	}

	function openLightbox() {
		index = [...slides].findIndex(el => el.classList.contains('slide-on'));

		lightboxSlides.forEach(sl => sl.classList.remove('slide-on'));
		lightboxSlides[index].classList.add('slide-on');

		if (lightboxSlideBig.children[0]) {
			lightboxSlideBig.children[0].remove();
		}

		lightboxSlideBig.appendChild(infinitySlider);
		infinitySlider.style.transform = `translateX(${-width * index}px)`;

		lightbox.appendChild(lightboxCarousel);
		overlay.appendChild(lightbox);
		overlay.classList.add('active');
		overlay.style.display = 'flex';
	}

	function updateActiveSlide(slide, slides, slider) {
		slides.forEach(s => s.classList.remove('slide-on'));
		slide.classList.add('slide-on');
		index = [...slides].findIndex(el => el.classList.contains('slide-on'));
		slider.style.transition = 'none';
		slider.style.transform = `translateX(${-width * index}px)`;
	}

	function setupArrowButtons(carousel, slides, slider) {
		const previousBtn = carousel.children[2];
		const nextBtn = carousel.children[3];

		[previousBtn, nextBtn].forEach(button => {
			button.addEventListener('click', () => {
				const direction = button.dataset.carouselButton === 'previous' ? -1 : 1;
				const total = slider.querySelectorAll('.infinity-slide').length;
				index = (index + direction + total) % total;

				slides.forEach(sl => sl.classList.remove('slide-on'));
				slides[index].classList.add('slide-on');
				slider.style.transform = `translateX(${-width * index}px)`;
			});
		});
	}

	function addCloseButton(carousel, box, overlay) {
		const close = document.createElement('div');
		close.classList.add('lightboxCloseIcon');
		carousel.appendChild(close);
		close.addEventListener('click', () => {
			overlay.style.display = 'none';
			box.remove();
		});
	}
}

// ***************** image arrows control *************

// ************** overlay + mobile menu ****************
function mobileMenuEvent(){
          const overlay = document.querySelector('.overlay');
                overlay.style.display = 'none';
          const menu = document.querySelector('.menu');
                menu.style.display = 'none';
          const iconMenu = document.querySelector('.icon-menu');
          const iconClose = document.querySelector('.icon-close');

          const mobileMenuOpenClose = [];
          mobileMenuOpenClose.push(iconMenu, iconClose);
          mobileMenuOpenClose.forEach((el)=>{
                el.addEventListener('click', ()=>{
                overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none'; 
              })
        });
}
// ************** overlay + mobile menu ****************
const container = document.querySelector('.container');
const cart = document.querySelector('.cart');

function renderCartToHTML(){
	       // empty cart 
	        if (shoppingCart.length < 1){
						   cart.innerHTML = '';
					     cart.innerHTML = 
							 `<h4>Cart</h4>
								<div class="cart-empty-content">
									<p>Your cart is empty.</p>
								</div>
							`;
					}
					// item cart
          if(shoppingCart.length > 0){
						 cart.innerHTML = '';
						 cart.innerHTML =
						 `
 						<h4>Cart</h4>
 						<div class="cart-item-container">
 							<div class="cart-item-content">
								<img class="img-thumbnail" src="images/image-product-1-thumbnail.jpg" alt="image-product-1-thumbnail.jpg">
 									<div class="cart-item-details">
 										<h6 class="cart-item-edition">Fall Limited Edition Sneakers</h6>
 										<div class="quantity-price">
 											<span class="price">${item.price}</span>
 											<span class="quantity">x ${item.quantity}</span>
 											<span class="total-price">$${getTotalPrice()}</span>
 										</div>
 									</div>
 									<img class="icon-delete" src="images/icon-delete.svg" alt="icon-delete.svg">
 							</div>
 							<button class="checkout-button">Checkout</button>
						 `
						 const deleteIcon = document.querySelector('.icon-delete');
						       deleteIcon.addEventListener('click', ()=>{
										  quantity = 0;
											const index = shoppingCart.findIndex((obj) => obj.edition === 'Fall Limited Edition Sneakers');
											shoppingCart.splice(index, 1);
											renderCounterToHTML();
											renderCartToHTML();
		                  removeCartBubble();
									 })
					}
}

function showHideCart(){
	       if(cart.style.display === 'block'){
					  cart.style.display = 'none';
				 }
				 else{
					   renderCartToHTML();
					   cart.style.display = 'block';
				 }
}

function cartIconEvent(){
					const iconCart = document.querySelector('.icon-cart');
					iconCart.addEventListener('click', (showHideCart));
}

function getTotalPrice(){
         let totalPrice = (item.price*item.quantity).toFixed(2);
				 console.log(totalPrice);
				 return totalPrice;
}

function Item(edition, originalPrice, discount, quantity){
					this.edition = edition;
					this.originalPrice = originalPrice;
          this.discount = discount;
					this.quantity = quantity;
					this.price = (Number(this.discount.slice(0, -1)/100) * originalPrice).toFixed(2);
}

function renderCounterToHTML(){
	        const counter = document.querySelector('.counter');
					counter.innerHTML = quantity;
}
function counterEvent(){
  				const counterButtons = document.querySelectorAll('.counter-button');
					counterButtons.forEach((btn)=>{
						btn.addEventListener('click', ()=>{
						btn.dataset.counter === 'minus'? (quantity - 1 < 0 ? 0 : quantity-=1) : quantity+=1;
						renderCounterToHTML();
						})
					})
}

function addCartBubble(){
					const iconCartContainer = document.querySelector('.icon-cart-container');
					iconCartContainer.style.setProperty('--before-display', 'block');
					iconCartContainer.style.setProperty('--after-display', 'block');
					iconCartContainer.setAttribute('data-before', `${item.quantity}`);  
}

function removeCartBubble(){
					const iconCartContainer = document.querySelector('.icon-cart-container');
					iconCartContainer.style.setProperty('--before-display', 'none');
					iconCartContainer.style.setProperty('--after-display', 'none'); 
}

function addToCartEvent(){
					const addToCartButton = document.querySelector('.addToCart-button');
								addToCartButton.addEventListener('click', ()=>{
									if(shoppingCart.length === 0){
										item = new Item('Fall Limited Edition Sneakers', 250, '50%', quantity);
										shoppingCart.push(item);
										console.log(shoppingCart);
									}
									if(shoppingCart.length > 0){
											shoppingCart.forEach((item)=>{
												if(item.edition === 'Fall Limited Edition Sneakers'){
														item.quantity = quantity;
												}
											})
										  addCartBubble();
									}
									if(quantity === 0){
										shoppingCart.forEach((item)=>{
											if(item.edition === 'Fall Limited Edition Sneakers'){
											const index = shoppingCart.findIndex((obj) => obj.edition === 'Fall Limited Edition Sneakers');
													shoppingCart.splice(index, 1);
											}
										})
							        removeCartBubble();
									}
									renderCartToHTML();
					})
}

function initApp(){
					cartIconEvent();
					mobileMenuEvent();
					arrowButtonsEvent();
					counterEvent();
					addToCartEvent();
					desktopImageEvent();
					lightboxMode(); 
        }
					initApp();