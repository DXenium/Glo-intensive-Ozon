const getData = () => {
	return fetch('https://project-ozon-for-intensive-default-rtdb.firebaseio.com/goods.json')
	.then(response => response.json());
}

export default getData
