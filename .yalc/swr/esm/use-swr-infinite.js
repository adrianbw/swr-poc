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
        while (_) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useContext, useRef, useState, useEffect, useCallback } from 'react';
import defaultConfig, { cache } from './config';
import SWRConfigContext from './swr-config-context';
import useSWR from './use-swr';
function useSWRInfinite() {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var getKey, fn, config = {};
    if (args.length >= 1) {
        getKey = args[0];
    }
    if (args.length > 2) {
        fn = args[1];
        config = args[2];
    }
    else {
        if (typeof args[1] === 'function') {
            fn = args[1];
        }
        else if (typeof args[1] === 'object') {
            config = args[1];
        }
    }
    config = Object.assign({}, defaultConfig, useContext(SWRConfigContext), config);
    var _a = config.initialSize, initialSize = _a === void 0 ? 1 : _a, _b = config.revalidateAll, revalidateAll = _b === void 0 ? false : _b, _c = config.persistSize, persistSize = _c === void 0 ? false : _c, defaultFetcher = config.fetcher, extraConfig = __rest(config, ["initialSize", "revalidateAll", "persistSize", "fetcher"]);
    if (typeof fn === 'undefined') {
        // use the global fetcher
        // we have to convert the type here
        fn = defaultFetcher;
    }
    // get the serialized key of the first page
    var firstPageKey = null;
    try {
        ;
        firstPageKey = cache.serializeKey(getKey(0, null))[0];
    }
    catch (err) {
        // not ready
    }
    var rerender = useState(false)[1];
    // we use cache to pass extra info (context) to fetcher so it can be globally shared
    // here we get the key of the fetcher context cache
    var contextCacheKey = null;
    if (firstPageKey) {
        contextCacheKey = 'context@' + firstPageKey;
    }
    // page count is cached as well, so when navigating the list can be restored
    var pageCountCacheKey = null;
    var cachedPageSize;
    if (firstPageKey) {
        pageCountCacheKey = 'size@' + firstPageKey;
        cachedPageSize = cache.get(pageCountCacheKey);
    }
    var pageCountRef = useRef(cachedPageSize || initialSize);
    var didMountRef = useRef(false);
    // every time the key changes, we reset the page size if it's not persisted
    useEffect(function () {
        if (didMountRef.current) {
            if (!persistSize) {
                pageCountRef.current = initialSize;
            }
        }
        else {
            didMountRef.current = true;
        }
    }, [firstPageKey]);
    // actual swr of all pages
    var swr = useSWR(firstPageKey ? ['many', firstPageKey] : null, function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, originalData, force, data, previousPageData, i, _b, pageKey, pageArgs, pageData, shouldRevalidatePage;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = cache.get(contextCacheKey) || {}, originalData = _a.originalData, force = _a.force;
                    data = [];
                    previousPageData = null;
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < pageCountRef.current)) return [3 /*break*/, 8];
                    _b = cache.serializeKey(getKey(i, previousPageData)), pageKey = _b[0], pageArgs = _b[1];
                    if (!pageKey) {
                        // pageKey is falsy, stop fetching next pages
                        return [3 /*break*/, 8];
                    }
                    pageData = cache.get(pageKey);
                    shouldRevalidatePage = revalidateAll ||
                        force ||
                        (typeof force === 'undefined' && i === 0) ||
                        (originalData && !config.compare(originalData[i], pageData)) ||
                        typeof pageData === 'undefined';
                    if (!shouldRevalidatePage) return [3 /*break*/, 6];
                    if (!(pageArgs !== null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fn.apply(void 0, pageArgs)];
                case 2:
                    pageData = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, fn(pageKey)];
                case 4:
                    pageData = _c.sent();
                    _c.label = 5;
                case 5:
                    cache.set(pageKey, pageData);
                    _c.label = 6;
                case 6:
                    data.push(pageData);
                    previousPageData = pageData;
                    _c.label = 7;
                case 7:
                    ++i;
                    return [3 /*break*/, 1];
                case 8:
                    // once we executed the data fetching based on the context, clear the context
                    cache.delete(contextCacheKey);
                    // return the data
                    return [2 /*return*/, data];
            }
        });
    }); }, extraConfig);
    // extend the SWR API
    var mutate = swr.mutate;
    swr.size = pageCountRef.current;
    swr.mutate = useCallback(function (data, shouldRevalidate) {
        if (shouldRevalidate === void 0) { shouldRevalidate = true; }
        if (shouldRevalidate && typeof data !== 'undefined') {
            // we only revalidate the pages that are changed
            var originalData = swr.data;
            cache.set(contextCacheKey, { originalData: originalData, force: false });
        }
        else if (shouldRevalidate) {
            // calling `mutate()`, we revalidate all pages
            cache.set(contextCacheKey, { force: true });
        }
        return mutate(data, shouldRevalidate);
    }, [mutate, swr.data, contextCacheKey]);
    swr.setSize = useCallback(function (arg) {
        if (typeof arg === 'function') {
            pageCountRef.current = arg(pageCountRef.current);
        }
        else if (typeof arg === 'number') {
            pageCountRef.current = arg;
        }
        cache.set(pageCountCacheKey, pageCountRef.current);
        rerender(function (v) { return !v; });
        return swr.mutate(function (v) { return v; });
    }, [swr.mutate, pageCountCacheKey]);
    return swr;
}
export { useSWRInfinite };
