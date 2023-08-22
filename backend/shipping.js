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
var easypost = require('@easypost/api');
var api = new easypost('EZTKdd560139e1264902906e7b19952baf98fwm3XF3DXFrAtxrFaa6Hkg');
function createShippingLabel() {
    return __awaiter(this, void 0, void 0, function () {
        var fromAddress, toAddress, parcel, shipment, labelUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, easypost.Address.create({
                            street1: '123 Main St',
                            city: 'San Francisco',
                            state: 'CA',
                            zip: '94111',
                            country: 'US',
                        })];
                case 1:
                    fromAddress = _a.sent();
                    return [4 /*yield*/, easypost.Address.create({
                            street1: '456 Elm St',
                            city: 'New York',
                            state: 'NY',
                            zip: '10001',
                            country: 'US',
                        })];
                case 2:
                    toAddress = _a.sent();
                    return [4 /*yield*/, easypost.Parcel.create({
                            length: 8,
                            width: 6,
                            height: 2,
                            weight: 10,
                        })];
                case 3:
                    parcel = _a.sent();
                    return [4 /*yield*/, easypost.Shipment.create({
                            to_address: toAddress,
                            from_address: fromAddress,
                            parcels: [parcel],
                        })];
                case 4:
                    shipment = _a.sent();
                    // Buy shipping label
                    return [4 /*yield*/, shipment.buy(shipment.lowestRate())];
                case 5:
                    // Buy shipping label
                    _a.sent();
                    labelUrl = shipment.postage_label.label_url;
                    console.log('Shipping label created. Label URL:', labelUrl);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error creating shipping label:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
createShippingLabel();
