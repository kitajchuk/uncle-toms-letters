"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var cld_1 = require("cld");
var textract_1 = require("@nosferatu500/textract");
var utils_1 = require("../src/lib/utils");
var textExtraction = function (folder, file) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                textract_1.default.fromFileWithPath(path_1.default.join(utils_1.dataDir, (0, utils_1.unslug)(folder), file), {
                    preserveLineBreaks: true,
                }, function (error, text) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(text);
                    }
                });
            })];
    });
}); };
var langDetection = function (text) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, cld_1.default.detect(text)];
}); }); };
var parseEntities = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var regex, entities, execArray;
    return __generator(this, function (_a) {
        regex = /Letter\s\d{0,3}/g;
        entities = [];
        while ((execArray = regex.exec(text)) !== null) {
            entities.push({
                title: execArray[0],
                offset: execArray.index,
                length: 0,
                chunk: "", // Will be calculated later
            });
        }
        entities.forEach(function (entity, i) {
            var nextEntity = entities[i + 1];
            var nextOffset = nextEntity !== undefined ? nextEntity.offset : text.length;
            // Exlude the title from the chunk
            var chunkOffset = entity.offset + entity.title.length;
            entity.length = nextOffset - chunkOffset;
            entity.chunk = text.substring(chunkOffset, chunkOffset + entity.length);
        });
        return [2 /*return*/, entities];
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var mappedData, appPosts, sourcePosts, diffPosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mappedData = {};
                appPosts = (0, utils_1.readDirectory)(utils_1.postsDir);
                sourcePosts = (0, utils_1.readDirectory)(utils_1.dataDir).map(function (file) { return (0, utils_1.slug)(file); });
                diffPosts = sourcePosts.filter(function (file) { return !appPosts.includes(file); });
                return [4 /*yield*/, Promise.all(diffPosts.map(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                        var directory, dataMapper;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    directory = (0, utils_1.readFolder)(path_1.default.join(utils_1.dataDir, (0, utils_1.unslug)(id)));
                                    dataMapper = {
                                        id: id,
                                        id_: (0, utils_1.unslug)(id),
                                        pages: [],
                                        letters: [],
                                        documents: [],
                                        attachments: [],
                                    };
                                    directory.forEach(function (file) {
                                        if (/^Letter.*?\.(doc|docx|txt)$/.test(file)) {
                                            dataMapper.letters.push(file);
                                        }
                                        else if (/^Letter.*?\.(jpg|jpeg)$/.test(file)) {
                                            dataMapper.documents.push(file);
                                        }
                                        else if (/\.(jpg|jpeg)$/.test(file)) {
                                            dataMapper.attachments.push(file);
                                        }
                                        else {
                                            console.log("Could not map file", id, file);
                                        }
                                    });
                                    return [4 /*yield*/, Promise.all(dataMapper.letters.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                                            var text_1, entities, error_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 4, , 5]);
                                                        return [4 /*yield*/, textExtraction(id, file)];
                                                    case 1:
                                                        text_1 = _a.sent();
                                                        return [4 /*yield*/, parseEntities(text_1)];
                                                    case 2:
                                                        entities = _a.sent();
                                                        return [4 /*yield*/, Promise.all(entities.map(function (entity) { return __awaiter(void 0, void 0, void 0, function () {
                                                                var textChunk, langResult, error_2;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            textChunk = text_1.substring(entity.offset, entity.offset + entity.length);
                                                                            _a.label = 1;
                                                                        case 1:
                                                                            _a.trys.push([1, 3, , 4]);
                                                                            return [4 /*yield*/, langDetection(textChunk)];
                                                                        case 2:
                                                                            langResult = _a.sent();
                                                                            console.log(entity.title, entity.chunk, langResult);
                                                                            // TODO: Why is this not working?
                                                                            if (entity.title === "Letter 154") {
                                                                                console.log(textChunk);
                                                                            }
                                                                            dataMapper.pages.push({
                                                                                title: entity.title,
                                                                                german: [],
                                                                                english: [],
                                                                                // Matches the page text to it's corresponding scanned
                                                                                // document via file naming convention. This produces
                                                                                // something like the following:
                                                                                // Given "Letter 142" as the title we can match it to
                                                                                // the image with fileName "Letter_142_19381012_L_P5.jpeg"
                                                                                document: dataMapper.documents.find(function (doc) {
                                                                                    return doc.startsWith(entity.title.replace(/\s/, "_"));
                                                                                }),
                                                                            });
                                                                            return [3 /*break*/, 4];
                                                                        case 3:
                                                                            error_2 = _a.sent();
                                                                            console.error(error_2);
                                                                            return [3 /*break*/, 4];
                                                                        case 4: return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); }))];
                                                    case 3:
                                                        _a.sent();
                                                        return [3 /*break*/, 5];
                                                    case 4:
                                                        error_1 = _a.sent();
                                                        console.error(error_1);
                                                        return [3 /*break*/, 5];
                                                    case 5: return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                case 1:
                                    _a.sent();
                                    mappedData[id] = dataMapper;
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
