export const convertKeyCart = (cartObj) => {
  return Object.keys(cartObj).map(function (k) {
    const num = k.split("-");

    return `Hoá Đơn ${num[num.length - 1]}`;
  });
};

export const getKeyCart = (cartObj) => {
  return Object.keys(cartObj).map(function (k) {
    return k;
  })[0];
};
