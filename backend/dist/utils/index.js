"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCurrency = void 0;
function parseCurrency(amount) {
    return parseFloat(amount.replace(/,/g, "").replace(/\./g, ""));
}
exports.parseCurrency = parseCurrency;
//# sourceMappingURL=index.js.map