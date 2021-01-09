import {
  request
} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cFans = shopInfo.cFans;
    this.cGoods = shopInfo.cGoods;
    this.shopLogo = shopInfo.shopLogo;
    this.score = shopInfo.score;
  }
}