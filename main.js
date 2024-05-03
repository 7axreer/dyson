const product = {
  hd07: {
    name: 'HD07',
    price: 59990,
    amount: 0,
    img: './img/section_card-1.png',
    get totalSum() {
      return this.price * this.amount;
    }
  },
  hd06: {
    name: 'HD06',
    price: 47990,
    amount: 0,
    img: './img/section_card-2.png',
    get totalSum() {
      return this.price * this.amount;
    }
  },
  hd03: {
    name: 'HD03',
    price: 46990,
    amount: 0,
    img: './img/section_card-3.png',
    get totalSum() {
      return this.price * this.amount;
    }
  },
}


const 
  productBtn = document.querySelectorAll('.offers__content-buyBtns'),
  basketBtn = document.querySelector('.nav__content-btn'),
  basketIndicator = document.querySelector('.nav__content-indicator'),
  basketModal = document.querySelector('.basket'),
  closeBasketModal = document.querySelector('.basket__content-btnClose'), 
  basketChecklist = document.querySelector('.basket__content-middle'),
  basktetTotalPrice = document.querySelector('.basket__content-totalPrice'),
  basketPrint = document.querySelector('.basket__content-bottom'),
  printChecklist = document.querySelector('.print__body'),
  printTotalSum = document.querySelector('.print__footer');




productBtn.forEach((btn) => {
  btn.addEventListener('click', function () {
    plusOrMinus(this)
  })
});

function plusOrMinus(button) {
  var parent = button.closest('.offers__content-card');
  var parentId = parent.getAttribute('id')
  product[parentId].amount++;
  basket();
}

function basket() {
  
  const productArray = [];
  var totalCount = 0;


  for (const key in product){
    const po = product[key];
    const productCard = document.querySelector(`#${po.name.toLowerCase()}`);
    const productCardInd = productCard.querySelector('.offers__content-count');

    if (po.amount) {
      productArray.push(po);
      basketIndicator.classList.add('active');
      totalCount += po.amount
      productCardInd.classList.add('active');
      productCardInd.innerHTML = po.amount;

    }else {
      productCardInd.classList.remove('active');
      productCardInd.innerHTML = 0;
    }


    basketIndicator.innerHTML = totalCount;
  }
  basketChecklist.innerHTML = ' ';

  for (let i = 0; i < productArray.length; i++) {
    
    basketChecklist.innerHTML += cardItemDyson(productArray[i]);
  }

  basktetTotalPrice.innerHTML = totalSumProduct();
}

function cardItemDyson(dataDyson) {
  
  const {name, totalSum: price, amount, img} = dataDyson;
  return  `
          <div class="basket__content-product">

            <div class="basket__content-info">
              <img src="${img}" alt="">

                <div class="basket__content-subtitle">
                  <p class="basket__content-name">${name}</p>
                  <p class="basket__content-price"><span>${price.toLocaleString()}</span> Р</p>
                </div>
            </div>

            <div class="basket__content-counter" id="${name.toLowerCase()}__card">
              <button class="basket__content-symbol" data-symbol="-">-</button>
              <output class="basket__content-output">${amount}</output>
              <button class="basket__content-symbol" data-symbol="+">+</button>
            </div>

          </div>
          `
}

window.addEventListener('click', function (event) {
  const btn = event.target;

  if (btn.classList.contains('basket__content-symbol')) {
    const attr = btn.getAttribute('data-symbol');


    const parent = btn.closest('.basket__content-counter')

    if(parent){
      const idProduct = parent.getAttribute('id').split('__')[0];

      if (attr == '+') {
        product[idProduct].amount++

      } else if (attr == '-'){
        product[idProduct].amount--

      }

      basket();
    }
  }
})

function totalSumProduct() {
  let total = 0;

  for (const key in product){
    total += product[key].totalSum;

  }

  return total.toLocaleString() + ' P';

}



basketBtn.addEventListener('click', () => basketModal.classList.toggle('active'));
closeBasketModal.addEventListener('click', () => basketModal.classList.remove('active'));


basketPrint.addEventListener('click', function () {
  printChecklist.innerHTML = ' '


  for(const key in product){

    const {name, totalSum, amount} = product[key]

    if (amount) {
      printChecklist.innerHTML += `
                                            <div class="print__item">
                                                <p class="print__body-item_name">
                                                    <span class="name">${name}</span>
                                                    <span class="count">${amount}</span>
                                                    <p class="print__body-item_sum">${totalSum.toLocaleString()} so'm</p>
                                                </p>
                                            </div>
                
                                            `
    }
  }
  printTotalSum.innerHTML = totalSumProduct()
  window.print()
})



