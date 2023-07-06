/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  host: 'http://localhost:3000/api'\n});\n\n//# sourceURL=webpack://myproject/./config/config.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\nclass App {\n  constructor() {\n    this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\n    window.addEventListener('DOMContentLoaded', this.handelRouteChanging.bind(this));\n    window.addEventListener('popstate', this.handelRouteChanging.bind(this));\n  }\n  handelRouteChanging() {\n    this.router.openRoute();\n  }\n}\nnew App();\n\n//# sourceURL=webpack://myproject/./src/app.js?");

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\n/* harmony import */ var _services_custom_http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/custom-http.js */ \"./src/services/custom-http.js\");\n/* harmony import */ var _services_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.js */ \"./src/services/auth.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/config.js */ \"./config/config.js\");\n\n\n\nclass Form {\n  constructor(page) {\n    this.processElement = null;\n    this.passwordOne = null;\n    this.passwordTwo = null;\n    this.page = page;\n    this.rememberMe = null;\n    this.fields = [{\n      name: 'email',\n      id: 'email',\n      element: null,\n      regex: /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,\n      valid: false\n    }, {\n      name: 'password',\n      id: 'password',\n      element: null,\n      regex: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,\n      valid: false\n    }];\n    let that = this;\n    this.rememberMe = document.getElementById('flexCheckDefault');\n    this.processElement = document.getElementById('process');\n    this.processElement.onclick = () => {\n      that.processForm();\n    };\n\n    //если signup\n    if (this.page === 'signup') {\n      this.fields.push({\n        name: 'fio',\n        id: 'fio',\n        element: null,\n        regex: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/,\n        valid: false\n      }, {\n        name: 'passwordRepeat',\n        id: 'passwordRepeat',\n        element: null,\n        regex: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,\n        valid: false\n      });\n      this.processElement.onclick = () => {\n        if (!that.passwordsChecked()) {\n          alert('Пароли не совпадают');\n        } else {\n          alert('Регистрация завершена');\n          that.processForm();\n        }\n      };\n    }\n    this.fields.forEach(item => {\n      item.element = document.getElementById(item.id);\n      item.element.onchange = function () {\n        that.validateField.call(that, item, this);\n      };\n    });\n    if (document.cookie !== '' && this.page === 'login') {\n      this.autoFillForm();\n    }\n  }\n  passwordsChecked() {\n    this.passwordOne = document.getElementById('password');\n    this.passwordTwo = document.getElementById('passwordRepeat');\n    return this.passwordOne.value === this.passwordTwo.value;\n  }\n  validateField(field, element) {\n    if (!element.value || !element.value.match(field.regex)) {\n      element.style.borderColor = 'red';\n      field.valid = false;\n    } else {\n      element.removeAttribute('style');\n      field.valid = true;\n    }\n    this.validateForm();\n  }\n  validateForm() {\n    const validForm = this.fields.every(item => item.valid);\n    if (validForm) {\n      this.processElement.removeAttribute('disabled');\n    } else {\n      this.processElement.setAttribute('disabled', 'disabled');\n    }\n    return validForm;\n  }\n  async processForm() {\n    if (this.validateForm()) {\n      if (this.page === 'signup') {\n        try {\n          const result = await _services_custom_http_js__WEBPACK_IMPORTED_MODULE_0__.CustomHttp.request(_config_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].host + '/signup', 'POST', {\n            name: this.fields.find(item => item.name === 'fio').element.value.split(' ')[1],\n            lastName: this.fields.find(item => item.name === 'fio').element.value.split(' ')[0],\n            email: this.fields.find(item => item.name === 'email').element.value,\n            password: this.fields.find(item => item.name === 'password').element.value,\n            passwordRepeat: this.fields.find(item => item.name === 'passwordRepeat').element.value\n          });\n          if (result) {\n            if (result.error || !result.user) {\n              throw new Error(result.message);\n            }\n            location.href = '#/home';\n          }\n        } catch (error) {\n          console.log(error);\n        }\n      } else {\n        try {\n          const result = await _services_custom_http_js__WEBPACK_IMPORTED_MODULE_0__.CustomHttp.request(_config_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].host + '/login', 'POST', {\n            email: this.fields.find(item => item.name === 'email').element.value,\n            password: this.fields.find(item => item.name === 'password').element.value,\n            rememberMe: this.rememberMe.checked\n          });\n          if (this.rememberMe.checked) {\n            document.cookie = \"email\" + \"=\" + this.fields.find(item => item.name === 'email').element.value + \"; path=\" + _config_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].host + \"/login\";\n            document.cookie = \"password\" + \"=\" + this.fields.find(item => item.name === 'password').element.value + \"; path=\" + _config_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].host + \"/login\";\n          } else {\n            this.cookiesDelete();\n          }\n          if (result) {\n            if (result.error || !result.user || !result.tokens.refreshToken || !result.tokens.accessToken) {\n              throw new Error(result.message);\n            }\n            _services_auth_js__WEBPACK_IMPORTED_MODULE_1__.Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);\n            location.href = '#/home';\n          }\n        } catch (error) {\n          console.log(error);\n        }\n      }\n    }\n  }\n  async refreshToken() {\n    try {\n      const response = await _services_custom_http_js__WEBPACK_IMPORTED_MODULE_0__.CustomHttp.request(_config_config_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].host + '/refresh', 'POST', {\n        refreshToken: localStorage.getItem('refreshToken')\n      });\n      if (response.status < 200 || response.status >= 300) {\n        throw new Error(response.message);\n      }\n      const result = await response.json();\n      if (result) {\n        if (result.error || !result.user) {\n          throw new Error(result.message);\n        }\n        localStorage.setItem(\"accessToken\", result.tokens.accessToken);\n        localStorage.setItem(\"refreshToken\", result.tokens.refreshToken);\n        location.href = '#/home';\n      }\n    } catch (error) {\n      console.log(error);\n    }\n  }\n  cookiesDelete() {\n    let cookies = document.cookie.split(\";\");\n    for (let i = 0; i < cookies.length; i++) {\n      let cookie = cookies[i];\n      let eqPos = cookie.indexOf(\"=\");\n      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;\n      document.cookie = name + \"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;\";\n      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';\n    }\n  }\n  getCookie(name) {\n    let matches = document.cookie.match(new RegExp(\"(?:^|; )\" + name.replace(/([\\.$?*|{}\\(\\)\\[\\]\\\\\\/\\+^])/g, '\\\\$1') + \"=([^;]*)\"));\n    return matches ? decodeURIComponent(matches[1]) : undefined;\n  }\n  autoFillForm() {\n    this.fields.find(item => item.name === 'email').element.value = this.getCookie('email');\n    this.fields.find(item => item.name === 'password').element.value = this.getCookie('password');\n    this.rememberMe.setAttribute('checked', 'checked');\n    this.processElement.removeAttribute('disabled');\n    this.fields.forEach(item => item.valid = true);\n  }\n}\n\n//# sourceURL=webpack://myproject/./src/components/form.js?");

/***/ }),

/***/ "./src/components/home.js":
/*!********************************!*\
  !*** ./src/components/home.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Home: () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var _services_custom_http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/custom-http.js */ \"./src/services/custom-http.js\");\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config.js */ \"./config/config.js\");\n\n\nclass Home {\n  constructor() {\n    this.balance = null;\n    const ctx = document.getElementById('pieChart');\n    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'));\n    tooltipTriggerList.forEach(tooltipTriggerEl => {\n      new bootstrap.Tooltip(tooltipTriggerEl);\n    });\n    this.linksClick();\n    //this.balance = this.getBalance();\n    console.log(this.balance);\n    document.getElementById('balance').innerText = this.balance;\n  }\n  linksClick() {\n    const links = Array.from(document.getElementsByClassName('nav-link'));\n    links.forEach(item => {\n      item.onclick = () => {\n        links.forEach(item => item.classList.remove('active-item'));\n        item.classList.add('active-item');\n      };\n    });\n  }\n  async getBalance() {\n    try {\n      const response = await _services_custom_http_js__WEBPACK_IMPORTED_MODULE_0__.CustomHttp.request(_config_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].host + '/balance', 'GET');\n      document.getElementById('balance').innerText = response.balance;\n      console.log(response.balance);\n      return await response.balance;\n    } catch (error) {\n      console.log(error);\n    }\n  }\n}\n\n//# sourceURL=webpack://myproject/./src/components/home.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/form.js */ \"./src/components/form.js\");\n/* harmony import */ var _components_home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home.js */ \"./src/components/home.js\");\n\n\nclass Router {\n  constructor() {\n    this.routs = [{\n      route: '#/signup',\n      title: 'Регистрация',\n      template: 'templates/signup.html',\n      styles: 'styles/form.css',\n      load: () => {\n        new _components_form_js__WEBPACK_IMPORTED_MODULE_0__.Form('signup');\n      }\n    }, {\n      route: '#/login',\n      title: 'Вход',\n      template: '/templates/login.html',\n      styles: 'styles/form.css',\n      load: () => {\n        new _components_form_js__WEBPACK_IMPORTED_MODULE_0__.Form('login');\n      }\n    }, {\n      route: '#/home',\n      title: 'Главная',\n      template: '/templates/home.html',\n      styles: 'styles/home.css',\n      load: () => {\n        new _components_home_js__WEBPACK_IMPORTED_MODULE_1__.Home();\n      }\n    }];\n  }\n  async openRoute() {\n    const newRoute = this.routs.find(item => {\n      return item.route === window.location.hash;\n    });\n    if (!newRoute) {\n      window.location.href = '#/login';\n      return;\n    }\n    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());\n    document.getElementById('styles').setAttribute('href', newRoute.styles);\n    document.getElementById('title').innerText = newRoute.title;\n    newRoute.load();\n  }\n}\n\n//# sourceURL=webpack://myproject/./src/router.js?");

/***/ }),

/***/ "./src/services/auth.js":
/*!******************************!*\
  !*** ./src/services/auth.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Auth: () => (/* binding */ Auth)\n/* harmony export */ });\n/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/config.js */ \"./config/config.js\");\n\nclass Auth {\n  static accessTokenKey = 'accessToken';\n  static refreshTokenKey = 'refreshToken';\n  static async processUnauthorizedResponse() {\n    const refreshToken = localStorage.getItem(this.refreshTokenKey);\n    if (refreshToken) {\n      const response = await fetch(_config_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].host + '/refresh', {\n        method: 'POST',\n        headers: {\n          'Content-type': 'application/json',\n          'Accept': 'application/json'\n        },\n        body: JSON.stringify({\n          refreshToken: refreshToken\n        })\n      });\n      if (response && response.status === 200) {\n        const result = await response.json();\n        if (result && !result.error) {\n          this.setTokens(result.accessTokenKey, result.refreshToken);\n          return true;\n        }\n      }\n    }\n    this.removeTokens();\n    location.href = '#/login';\n    return false;\n  }\n  static setTokens(accessToken, refreshToken) {\n    localStorage.setItem(this.accessTokenKey, accessToken);\n    localStorage.setItem(this.refreshTokenKey, refreshToken);\n  }\n  static removeTokens() {\n    localStorage.removeItem(this.accessTokenKey);\n    localStorage.removeItem(this.refreshTokenKey);\n  }\n}\n\n//# sourceURL=webpack://myproject/./src/services/auth.js?");

/***/ }),

/***/ "./src/services/custom-http.js":
/*!*************************************!*\
  !*** ./src/services/custom-http.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomHttp: () => (/* binding */ CustomHttp)\n/* harmony export */ });\n/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ \"./src/services/auth.js\");\n\nclass CustomHttp {\n  static async request(url) {\n    let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"GET\";\n    let body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n    const params = {\n      method: method,\n      headers: {\n        'Content-type': 'application/json',\n        'Accept': 'application/json'\n      }\n    };\n    let token = localStorage.getItem(_auth_js__WEBPACK_IMPORTED_MODULE_0__.Auth.accessTokenKey);\n    if (token) {\n      params.headers['x-auth-token'] = token;\n    }\n    if (body) {\n      params.body = JSON.stringify(body);\n    }\n    const response = await fetch(url, params);\n    if (response.status < 200 || response.status >= 300) {\n      if (response.status === 401) {\n        const result = await _auth_js__WEBPACK_IMPORTED_MODULE_0__.Auth.processUnauthorizedResponse();\n        if (result) {\n          return await this.request(url, method, body);\n        } else {\n          return null;\n        }\n      }\n      throw new Error(response.message);\n    }\n    return await response.json();\n  }\n}\n\n//# sourceURL=webpack://myproject/./src/services/custom-http.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;