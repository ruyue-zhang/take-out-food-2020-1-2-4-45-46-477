function bestCharge(inputs) {
  let allItems = loadAllItems();
  let selectedObject = getDishshesByInput(inputs,allItems);
}

function getDishshesByInput(selectedItems,allItems) {
  var selectedObjArr = [];
  selectedItems.forEach(valueSelected=>{
    allItems.forEach(valueItem=>{
      if(valueSelected.substring(0,8) === valueItem.id) {
        valueItem.count = Number(valueSelected.substring(11));
        valueItem.singleTotal = Number(valueItem.count * valueItem.price);
        selectedObjArr.push(valueItem);
      }
    });
  });
  return selectedObj;
}


