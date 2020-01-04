function bestCharge(inputs) {
  let allItems = loadAllItems();
  let allDiscount = loadPromotions();
  let selectedObject = getDishshesByInput(inputs,allItems);
  addIsSpecificFlag(selectedObject,allDiscount);
  return selectedObject;
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


