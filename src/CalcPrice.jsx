export function calcSubPrice(car) {
  return car.count * car.item.price;
}
export function calcTotalPrice(cars) {
  let totalPrice = 0;
  cars.forEach((elem) => {
    totalPrice += elem.subPrice;
  });
  return totalPrice;
}

export function getCountProductInCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return cart ? cart.car.length : 0;
}

