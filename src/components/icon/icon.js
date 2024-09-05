import { createVNode as _createVNode } from "vue";

import AccountBookFilledSvg from "orange-ui-icon/src/icon-js/es/Jia.js";


const objectSpread = (target) => {
  return target.attributes
}

const createSvgVNode = (icon) => {
  const content = []
  if (icon.children && icon.children.length && icon.children.length>0) {
    for (const child of icon.children) {
      content.push(createSvgVNode(child)) 
    }
  }
  return _createVNode(icon.name, objectSpread(icon), content);
}

var AccountBookFilled = function AccountBookFilled(props, context) {

  return createSvgVNode(AccountBookFilledSvg);
};

export default AccountBookFilled;