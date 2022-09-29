"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegularDate = void 0;
const getRegularDate = (str) => {
    var m = str.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/g);
    return m ? m.join(", ") : "";
};
exports.getRegularDate = getRegularDate;
