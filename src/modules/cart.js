import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
	const cartBtn = document.getElementById('cart');
	const cartModal = document.querySelector('.cart');
	const cartCloseBtn = cartModal.querySelector('.cart-close');
	const cartTotal = cartModal.querySelector('.cart-total > span')
	const cartSendBtn = cartModal.querySelector('.cart-confirm')
	const cartWrapper = cartModal.querySelector('.cart-wrapper')
	const goodsWrapper = document.querySelector('.goods')

	const openCart = () => {
		const cart = localStorage.getItem('cart') ?
				JSON.parse(localStorage.getItem('cart')) : []

		cartModal.style.display = 'flex';

		renderCart(cart);
		cartTotal.textContent = cart.reduce((sum, goodItem)=>{
			return sum + goodItem.price
		}, 0)
	}

	const closeCart = () => {
	cartModal.style.display = '';
	}

	cartBtn.addEventListener('click', openCart);
	cartCloseBtn.addEventListener('click', closeCart);

	goodsWrapper.addEventListener('click', (event)=>{
		if (event.target.classList.contains('btn-primary')){
			const card = event.target.closest('.card')
			const key = card.dataset.key
			const goods = JSON.parse(localStorage.getItem('goods'))
			const cart = localStorage.getItem('cart') ?
				JSON.parse(localStorage.getItem('cart')) : []
			const goodItem =goods.find((item)=>{
				return item.id === +key
			})

			cart.push(goodItem)

			localStorage.setItem('cart', JSON.stringify(cart))
		}
	})

	cartWrapper.addEventListener('click', (event)=>{
		if (event.target.classList.contains('btn-primary')){
			const cart = localStorage.getItem('cart') ?
				JSON.parse(localStorage.getItem('cart')) : []

			const card = event.target.closest('.card')
			const key = card.dataset.key
			const index = cart.findIndex((item)=>{
				return item.id === +key
			})

			cart.splice(index, 1)

			localStorage.setItem('cart', JSON.stringify(cart))

			renderCart(cart);

			cartTotal.textContent = cart.reduce((sum, goodItem)=>{
				return sum + goodItem.price
			}, 0)
		}
	})

	cartSendBtn.addEventListener('click', () => {
		const cart = localStorage.getItem('cart') ?
		JSON.parse(localStorage.getItem('cart')) : []

		postData(cart).then(()=>{
			localStorage.removeItem('cart')
			renderCart([])
			cartTotal.textContent = 0
	})
})
}

export default cart
