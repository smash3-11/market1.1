const body = document.body
const container = document.querySelector(".container")
const divBox = document.createElement('div');
divBox.classList.add('box');
container.append(divBox);

let show_all = document.querySelector(".buttons .show-all")
let show_five = document.querySelector(".buttons .show-five")
let cart_amount = document.querySelector('#cart-amount')
let cart_btn = document.querySelector('.cart-btn')
let cart_side = document.querySelector('.cart-side')
let close_cart = document.querySelector('.close-cart')
let selectAll = document.querySelector('.select-all input')
const cart_box = document.querySelector(".scroll")
const total_price = document.querySelector('.total-price')

let cart = []
selectAll.checked = true

show_five.onclick = () => {
	reload(arr.slice(0, 5))
}
show_all.onclick = () => {
	reload(arr)
}

reload(arr)

function reload(data) {
	divBox.innerHTML = ""

	for (const product of data) {
		const divBoxItem = document.createElement('div');
		divBoxItem.classList.add('box-item');

		const divItemTop = document.createElement('div');
		divItemTop.classList.add('item-top');

		const imgBag = document.createElement('img');
		imgBag.src = product.image

		const divItemBottom = document.createElement('div');
		divItemBottom.classList.add('item-bottom');

		const h2SupTitle = document.createElement('h2');
		h2SupTitle.classList.add('sup-title');
		h2SupTitle.textContent = product.title.length > 20 ? product.title.slice(0, 20).trim() + "..." : product.title

		const description = document.createElement('p');
		description.classList.add('description');
		description.innerHTML = product.description.length > 100 ? product.description.slice(0, 100) + " <b class='more' >more...</b>" : product.description

		const divSubTitle = document.createElement('div');
		divSubTitle.classList.add('sub-title');

		const divTitlePrice = document.createElement('div');
		divTitlePrice.classList.add('title-price', 'title-item');

		const imgPrice = document.createElement('img');
		imgPrice.src = 'img/price.svg';

		const spanPrice = document.createElement('span');
		spanPrice.textContent = product.price;

		const divTitleRating = document.createElement('div');
		divTitleRating.classList.add('title-rating', 'title-item');

		const imgRating = document.createElement('img');
		imgRating.src = 'img/rating.svg';

		const spanRating = document.createElement('span');
		spanRating.textContent = product.rating.rate;

		const divTitleCount = document.createElement('div');
		divTitleCount.classList.add('title-count', 'title-item');

		const imgCount = document.createElement('img');
		imgCount.src = 'img/count.svg';

		const spanCount = document.createElement('span');
		spanCount.textContent = product.rating.count;

		const buttonFavorite = document.createElement('button');
		buttonFavorite.textContent = 'В избранное';

		divBox.append(divBoxItem);
		divBoxItem.append(divItemTop);
		divItemTop.append(imgBag);
		divBoxItem.append(divItemBottom);
		divItemBottom.append(h2SupTitle);
		divItemBottom.append(description);
		divItemBottom.append(divSubTitle);
		divSubTitle.append(divTitlePrice);
		divTitlePrice.append(imgPrice);
		divTitlePrice.append(spanPrice);
		divSubTitle.append(divTitleRating);
		divTitleRating.append(imgRating);
		divTitleRating.append(spanRating);
		divSubTitle.append(divTitleCount);
		divTitleCount.append(imgCount);
		divTitleCount.append(spanCount);
		divItemBottom.append(buttonFavorite);

		if (cart.includes(product.id)) {
			buttonFavorite.classList.add('active-btn')
			buttonFavorite.innerText = "Добавлено"
		} else {
			buttonFavorite.innerText = "В избранное"
			buttonFavorite.classList.remove('active-btn')
		}
		const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    if (cart.includes(product.id)) {
      checkbox.checked = true;
      total += product.price;
    }

    checkbox.onchange = () => {
      if (checkbox.checked) {
        cart.push(product.id);
        total += product.price * parseInt(inputField.value);
      } else {
        cart = cart.filter((id) => id !== product.id);
        total -= product.price * parseInt(inputField.value);
      }
      cart_arr(cart);
      total_price.innerHTML = total.toLocaleString("us-US");
    };


		buttonFavorite.onclick = () => {
			if (cart.includes(product.id)) {
				cart = cart.filter(id => id !== product.id)
				buttonFavorite.classList.remove('active-btn')
				buttonFavorite.innerText = "В избранное"

				cart_arr(cart);
			} else {
				buttonFavorite.classList.add('active-btn')
				cart.push(product.id)
				buttonFavorite.innerText = "Добавлено"
			}
			cart_amount.innerHTML = cart.length
			cart_arr(cart)
		}
	}
}


cart_btn.onclick = () => {
	cart_side.style.width = 560
	cart_side.classList.remove("hide");
	cart_side.classList.add("show");
}

close_cart.onclick = () => {
	cart_side.classList.remove("show")
	cart_side.classList.add("hide")
}

selectAll.onchange = () => {
	cart_arr(cart)
}

cart_arr(cart)

function cart_arr(ids) {
	cart_box.innerHTML = ""
	let total = 0

	for (let product of arr) {
		for (let cart_id of ids) {
			if (cart_id === product.id) {
				const divider = document.createElement("div")
				divider.classList.add("divider")
				const cart_item = document.createElement("div")
				cart_item.classList.add("cart-item")

				const checkbox = document.createElement("input")
				checkbox.type = "checkbox"
				checkbox.classList.add("checkbox")

				checkbox.checked = selectAll.checked

				const imgBox = document.createElement('div')
				imgBox.classList.add("img-box")

				const image = document.createElement("img")
				image.src = product.image

				const item_title = document.createElement("div")
				item_title.classList.add("item-title")

				const sup_title = document.createElement("h3")
				sup_title.innerHTML = product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title

				const sub_title = document.createElement("span")
				const sub_price = document.createElement("span")
				sub_price.innerHTML = product.price
				sub_title.innerHTML = "Цена: " + sub_price.innerHTML

				const inputBox = document.createElement("div")
				inputBox.classList.add("input-box")


				const inputField = document.createElement('input');
				inputField.type = 'text';
				inputField.value = '1';
				inputField.minLength = "1"
				inputField.maxLength = product.rating.count
				inputField.onblur = () => {
					if (inputField.value == 0) {
						inputField.value = 1
					} else if (inputField.value > product.rating.count) {
						inputField.value = product.rating.count
					}
				}
				inputField.addEventListener('input', function () {
					const inputValue = inputField.value;
					const filteredValue = inputValue.replace(/\D/g, '');
					inputField.value = filteredValue;
				});

				const decrementButton = document.createElement('button');
				decrementButton.classList.add("decrement")
				decrementButton.textContent = '-';

				const incrementButton = document.createElement('button');
				incrementButton.classList.add("increment")
				incrementButton.textContent = '+';

				const price = document.createElement("span")
				price.classList.add("delete-box")

				// const deleteBtn = document.createElement("img")
				// deleteBtn.src = "img/images.png"
				// deleteBtn.classList.add("delete")
				// price.append(deleteBtn)

				cart_box.append(divider)
				cart_box.append(cart_item)
				cart_item.append(checkbox)
				cart_item.append(imgBox)
				imgBox.append(image)
				cart_item.append(item_title)
				item_title.append(sup_title)
				item_title.append(sub_title)

				item_title.append(inputBox)
				inputBox.append(decrementButton);
				inputBox.append(inputField);
				inputBox.append(incrementButton);
				cart_item.append(price)


				decrementButton.addEventListener('click', function () {
					if (inputField.value <= 1) {
						return
					} else {
						let value = parseInt(inputField.value);
						value--;
						inputField.value = value;
						total_price.innerHTML = (total -= product.price).toLocaleString('us-US')
					}
				});
				incrementButton.addEventListener('click', function () {
					if (inputField.value >= product.rating.count) {
						return
					} else {
						let value = parseInt(inputField.value);
						value++;
						inputField.value = value;
						total_price.innerHTML = (total += product.price).toLocaleString('us-US')
					}
				});

				checkbox.onchange = () => {
					let prodPrice = product.price * inputField.value
					if(checkbox.checked) {
						total_price.innerHTML = (total += prodPrice).toLocaleString('us-US')
					} else {
						total_price.innerHTML = (total -= prodPrice).toLocaleString('us-US')
					}


				}

				checkbox.onchange = () => {
					let prodPrice = product.price * parseInt(inputField.value);
					if (checkbox.checked) {
					  total_price.innerHTML = (total += prodPrice).toLocaleString("us-US");
					} else {
					  total_price.innerHTML = (total -= prodPrice).toLocaleString("us-US");
					}
				  };
		  
				  if (checkbox.checked) {
					total_price.innerHTML = (total += product.price * parseInt(inputField.value)).toLocaleString("us-US");
				  }
		  
				  const deleteBtn = document.createElement("img");
				  deleteBtn.src = "img/images.png";
				  deleteBtn.classList.add("delete");
				  price.append(deleteBtn);
		  
				  deleteBtn.onclick = () => {
					total -= product.price * parseInt(inputField.value);
					total_price.innerHTML = total.toLocaleString("us-US");
					cart = cart.filter((id) => id !== product.id);
					cart_arr(cart);
				  };
		  
		

				if(checkbox.checked) {
					total_price.innerHTML = (total += product.price).toLocaleString('us-US')
				}
			}
		}
	}
	
	total_price.innerHTML = total.toLocaleString('us-US');
}