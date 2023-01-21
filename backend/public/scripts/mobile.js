var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// 这里是全局作用域，所以使用立即执行函数避免污染全局
// 需要后需要执行 npx / yarn tsc .\public\scripts\mobile.ts 来生成 js 文件
;
(function () {
    var nodeMobileList = document.querySelector('#mobile-list');
    var nodeBrand = document.querySelector('#brand');
    var nodeModel = document.querySelector('#model');
    var nodePrice = document.querySelector('#price');
    var nodeSpec = document.querySelector('#spec');
    var nodeAddButton = document.querySelector('#add-button');
    var init = function () {
        bindEvent();
    };
    function bindEvent() {
        nodeMobileList.addEventListener('click', handleRemoveButtonClick, false);
        nodeAddButton.addEventListener('click', handleAddButtonClick);
    }
    // 删除 mobile
    function handleRemoveButtonClick(event) {
        return __awaiter(this, void 0, void 0, function () {
            var target, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = event.target;
                        id = target.dataset.id;
                        if (!(target.className === 'remove-button' && id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, removeMobile(target, Number(id))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function removeMobile(target, id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:9090/list/remove_mobile', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: id })
                        })];
                    case 1:
                        response = _b.sent();
                        if (response.ok) {
                            (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    // 追加 mobile
    function handleAddButtonClick(event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!nodeBrand.value.length ||
                            !nodeModel.value.length ||
                            !nodePrice.value.length ||
                            !nodeSpec.value.length) {
                            alert('Please input.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, addMobile({
                                id: -1,
                                brand: nodeBrand.value,
                                model: nodeModel.value,
                                price: nodePrice.value,
                                spec: nodeSpec.value
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function addMobile(mobileInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var response, newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:9090/list/add_mobile', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(mobileInfo)
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        newItem = _a.sent();
                        createMobileListITem(newItem);
                        resetForm();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function createMobileListITem(mobileInfo) {
        var item = document.createElement('li');
        item.innerHTML = "\n      <a href=\"http://localhost:9090/detail/".concat(mobileInfo.id, "\">\n        ").concat(mobileInfo.brand + ' ' + mobileInfo.model, "\n      </a>\n\n      <button class=\"remove-button\" data-id=\"").concat(mobileInfo.id, "\">REMOVE</button>\n    ");
        nodeMobileList.appendChild(item);
    }
    function resetForm() {
        nodeBrand.value = '';
        nodeModel.value = '';
        nodePrice.value = '';
        nodeSpec.value = '';
    }
    init();
})();
