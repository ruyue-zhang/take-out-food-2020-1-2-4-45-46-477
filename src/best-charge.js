function bestCharge(inputs) {
  let allItems = loadAllItems();
  let allDiscount = loadPromotions();
  let selectedObject = getDishshesByInput(inputs,allItems);
  addIsSpecificFlag(selectedObject,allDiscount);
  let noneDiscountTotal = getNoneDiscountTotal(selectedObject);
  let overDecDiscountObj = overDecDiscount(noneDiscountTotal);
  let halfPriceDiscountObj = halfPriceDiscount(selectedObject,noneDiscountTotal);
  let goodsList = getGoodsList(selectedObject);
  let finnalDiscount = compareTwoSelectedBetter(overDecDiscountObj,halfPriceDiscountObj,noneDiscountTotal);
  return outputInformation(goodsList,finnalDiscount);;
}

function getDishshesByInput(selectedItems,allItems) {
  var selectedObject = [];
  selectedItems.forEach(valueSelected=>{
    allItems.forEach(valueItem=>{
      if(valueSelected.substring(0,8) === valueItem.id) {
        valueItem.count = Number(valueSelected.substring(11));
        valueItem.singleTotal = Number(valueItem.count * valueItem.price);
        selectedObject.push(valueItem);
      }
    });
  });
  return selectedObject;
}

function addIsSpecificFlag(selectedObjArr,allDiscount) {
  selectedObjArr.forEach(value=>value.isSpecific = (-1 !== allDiscount[1].items.indexOf(value.id)));
}

function getNoneDiscountTotal(selectedObjArr) {
  return selectedObjArr.reduce((total,value)=>{
    return total + value.singleTotal;
  },0);
}

function overDecDiscount(noneDiscountTotal) {
  let overDecDiscountObj = {};
  overDecDiscountObj.totalPrice = noneDiscountTotal >= 30 ? noneDiscountTotal - 6 : noneDiscountTotal;
  overDecDiscountObj.description = `使用优惠:\n满30减6元，省6元\n`;
  return overDecDiscountObj
}

function halfPriceDiscount(selectedObject,noneDiscountTotal) {
  let halfPriceDiscountObj = {};
  let specificGoods = [];
  halfPriceDiscountObj.totalPrice = selectedObject.reduce((total,currentValue)=>{
    if(currentValue.isSpecific) {
      specificGoods.push(currentValue.name);
      return total + currentValue.singleTotal / 2;
    }
    else {
      return total + currentValue.singleTotal;
    }
  },0);
  halfPriceDiscountObj.description = `使用优惠:\n指定菜品半价(${specificGoods.join('，')})，省${noneDiscountTotal - halfPriceDiscountObj.totalPrice}元\n`;
  return halfPriceDiscountObj;
}

function getGoodsList(selectedObject) {
  let goodsList = '';
  selectedObject.forEach(value=>{
    goodsList += `${value.name} x ${value.count} = ${value.singleTotal}元\n`
  })
  goodsList += `-----------------------------------\n`;
  return goodsList;
}

function compareTwoSelectedBetter(overDecDiscountObj,halfPriceDiscountObj,noneDiscountTotal) {
  let finnalDiscount = {};
  if(overDecDiscountObj.totalPrice <= halfPriceDiscountObj.totalPrice) {
    if(overDecDiscountObj.totalPrice === noneDiscountTotal) {
      finnalDiscount.totalPrice = noneDiscountTotal;
      finnalDiscount.description = '';
    }
    else {
      finnalDiscount.totalPrice = overDecDiscountObj.totalPrice;
      finnalDiscount.description = overDecDiscountObj.description + `-----------------------------------\n`;
    }
  }
  else {
    finnalDiscount.totalPrice = halfPriceDiscountObj.totalPrice;
    finnalDiscount.description = halfPriceDiscountObj.description + `-----------------------------------\n`;
  }
  return finnalDiscount;
}

function outputInformation(goodsList,finnalDiscount) {
  let output = `============= 订餐明细 =============\n${goodsList}${finnalDiscount.description}总计：${finnalDiscount.totalPrice}元\n===================================`;
  return output;
}

