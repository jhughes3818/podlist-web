"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/og";
exports.ids = ["pages/api/og"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "fetch-opengraph":
/*!**********************************!*\
  !*** external "fetch-opengraph" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("fetch-opengraph");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./src/pages/api/og.js":
/*!*****************************!*\
  !*** ./src/pages/api/og.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var fetch_opengraph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fetch-opengraph */ \"fetch-opengraph\");\n/* harmony import */ var fetch_opengraph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fetch_opengraph__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var utils_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/supabase */ \"(api)/./utils/supabase.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);\naxios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nasync function handler(req, res) {\n    const id = req.query.episode_id;\n    console.log(id);\n    console.log(\"Getting Episode\");\n    const { data: episodeData , error  } = await utils_supabase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].from(\"episodes\").select(\"*\").eq(\"id\", id).single();\n    if (error) {\n        console.log(error);\n    }\n    console.log(episodeData);\n    const data = await (0,fetch_opengraph__WEBPACK_IMPORTED_MODULE_0__.fetch)(episodeData.url);\n    const episodeTitleNoSpaces = data[\"og:title\"].replace(/ /g, \"+\");\n    // Get apple podcast data\n    const appleResponse = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(`https://itunes.apple.com/search?term=${episodeTitleNoSpaces}&entity=podcastEpisode`);\n    console.log(appleResponse.data.results[0]);\n    const episodeObject = {\n        title: data[\"og:title\"],\n        description: appleResponse.data.results[0].description,\n        image: data[\"og:image\"],\n        show: appleResponse.data.results[0].collectionName,\n        appleURL: appleResponse.data.results[0].trackViewUrl,\n        spotifyURL: data[\"og:url\"]\n    };\n    res.status(200).json(episodeObject);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL29nLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ0Y7QUFDWjtBQUVYLGVBQWVHLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzlDLE1BQU1DLEtBQUtGLElBQUlHLEtBQUssQ0FBQ0MsVUFBVTtJQUMvQkMsUUFBUUMsR0FBRyxDQUFDSjtJQUVaRyxRQUFRQyxHQUFHLENBQUM7SUFDWixNQUFNLEVBQUVDLE1BQU1DLFlBQVcsRUFBRUMsTUFBSyxFQUFFLEdBQUcsTUFBTVosMkRBQ3BDLENBQUMsWUFDTGMsTUFBTSxDQUFDLEtBQ1BDLEVBQUUsQ0FBQyxNQUFNVixJQUNUVyxNQUFNO0lBQ1QsSUFBSUosT0FBTztRQUNUSixRQUFRQyxHQUFHLENBQUNHO0lBQ2QsQ0FBQztJQUNESixRQUFRQyxHQUFHLENBQUNFO0lBRVosTUFBTUQsT0FBTyxNQUFNWCxzREFBS0EsQ0FBQ1ksWUFBWU0sR0FBRztJQUV4QyxNQUFNQyx1QkFBdUJSLElBQUksQ0FBQyxXQUFXLENBQUNTLE9BQU8sQ0FBQyxNQUFNO0lBRTVELHlCQUF5QjtJQUN6QixNQUFNQyxnQkFBZ0IsTUFBTW5CLGlEQUFTLENBQ25DLENBQUMscUNBQXFDLEVBQUVpQixxQkFBcUIsc0JBQXNCLENBQUM7SUFHdEZWLFFBQVFDLEdBQUcsQ0FBQ1csY0FBY1YsSUFBSSxDQUFDWSxPQUFPLENBQUMsRUFBRTtJQUV6QyxNQUFNQyxnQkFBZ0I7UUFDcEJDLE9BQU9kLElBQUksQ0FBQyxXQUFXO1FBQ3ZCZSxhQUFhTCxjQUFjVixJQUFJLENBQUNZLE9BQU8sQ0FBQyxFQUFFLENBQUNHLFdBQVc7UUFDdERDLE9BQU9oQixJQUFJLENBQUMsV0FBVztRQUN2QmlCLE1BQU1QLGNBQWNWLElBQUksQ0FBQ1ksT0FBTyxDQUFDLEVBQUUsQ0FBQ00sY0FBYztRQUNsREMsVUFBVVQsY0FBY1YsSUFBSSxDQUFDWSxPQUFPLENBQUMsRUFBRSxDQUFDUSxZQUFZO1FBQ3BEQyxZQUFZckIsSUFBSSxDQUFDLFNBQVM7SUFDNUI7SUFFQU4sSUFBSTRCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNWO0FBQ3ZCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2RsaXN0LXdlYi1uZXh0Ly4vc3JjL3BhZ2VzL2FwaS9vZy5qcz8wYWUzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZldGNoIH0gZnJvbSBcImZldGNoLW9wZW5ncmFwaFwiO1xuaW1wb3J0IHN1cGFiYXNlIGZyb20gXCJ1dGlscy9zdXBhYmFzZVwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGNvbnN0IGlkID0gcmVxLnF1ZXJ5LmVwaXNvZGVfaWQ7XG4gIGNvbnNvbGUubG9nKGlkKTtcblxuICBjb25zb2xlLmxvZyhcIkdldHRpbmcgRXBpc29kZVwiKTtcbiAgY29uc3QgeyBkYXRhOiBlcGlzb2RlRGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oXCJlcGlzb2Rlc1wiKVxuICAgIC5zZWxlY3QoXCIqXCIpXG4gICAgLmVxKFwiaWRcIiwgaWQpXG4gICAgLnNpbmdsZSgpO1xuICBpZiAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbiAgY29uc29sZS5sb2coZXBpc29kZURhdGEpO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChlcGlzb2RlRGF0YS51cmwpO1xuXG4gIGNvbnN0IGVwaXNvZGVUaXRsZU5vU3BhY2VzID0gZGF0YVtcIm9nOnRpdGxlXCJdLnJlcGxhY2UoLyAvZywgXCIrXCIpO1xuXG4gIC8vIEdldCBhcHBsZSBwb2RjYXN0IGRhdGFcbiAgY29uc3QgYXBwbGVSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcbiAgICBgaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL3NlYXJjaD90ZXJtPSR7ZXBpc29kZVRpdGxlTm9TcGFjZXN9JmVudGl0eT1wb2RjYXN0RXBpc29kZWBcbiAgKTtcblxuICBjb25zb2xlLmxvZyhhcHBsZVJlc3BvbnNlLmRhdGEucmVzdWx0c1swXSk7XG5cbiAgY29uc3QgZXBpc29kZU9iamVjdCA9IHtcbiAgICB0aXRsZTogZGF0YVtcIm9nOnRpdGxlXCJdLFxuICAgIGRlc2NyaXB0aW9uOiBhcHBsZVJlc3BvbnNlLmRhdGEucmVzdWx0c1swXS5kZXNjcmlwdGlvbixcbiAgICBpbWFnZTogZGF0YVtcIm9nOmltYWdlXCJdLFxuICAgIHNob3c6IGFwcGxlUmVzcG9uc2UuZGF0YS5yZXN1bHRzWzBdLmNvbGxlY3Rpb25OYW1lLFxuICAgIGFwcGxlVVJMOiBhcHBsZVJlc3BvbnNlLmRhdGEucmVzdWx0c1swXS50cmFja1ZpZXdVcmwsXG4gICAgc3BvdGlmeVVSTDogZGF0YVtcIm9nOnVybFwiXSxcbiAgfTtcblxuICByZXMuc3RhdHVzKDIwMCkuanNvbihlcGlzb2RlT2JqZWN0KTtcbn1cbiJdLCJuYW1lcyI6WyJmZXRjaCIsInN1cGFiYXNlIiwiYXhpb3MiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiaWQiLCJxdWVyeSIsImVwaXNvZGVfaWQiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImVwaXNvZGVEYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJzaW5nbGUiLCJ1cmwiLCJlcGlzb2RlVGl0bGVOb1NwYWNlcyIsInJlcGxhY2UiLCJhcHBsZVJlc3BvbnNlIiwiZ2V0IiwicmVzdWx0cyIsImVwaXNvZGVPYmplY3QiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2UiLCJzaG93IiwiY29sbGVjdGlvbk5hbWUiLCJhcHBsZVVSTCIsInRyYWNrVmlld1VybCIsInNwb3RpZnlVUkwiLCJzdGF0dXMiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/og.js\n");

/***/ }),

/***/ "(api)/./utils/supabase.js":
/*!***************************!*\
  !*** ./utils/supabase.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://vahjckfdxuhncinxaahs.supabase.co\";\nconst supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaGpja2ZkeHVobmNpbnhhYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxMDA0MjMsImV4cCI6MTk5NDY3NjQyM30.IdEmleJpB3NGnrnAmqkAxhhAZ77Fywc7gIeM3A7jTnk\";\n//const supabaseKey = process.env.SUPABASE_KEY\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supabase);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9zdXBhYmFzZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBYztBQUNwQixNQUFNQyxjQUNKO0FBQ0YsOENBQThDO0FBQzlDLE1BQU1DLFdBQVdILG1FQUFZQSxDQUFDQyxhQUFhQztBQUUzQyxpRUFBZUMsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BvZGxpc3Qtd2ViLW5leHQvLi91dGlscy9zdXBhYmFzZS5qcz80MDZkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBcImh0dHBzOi8vdmFoamNrZmR4dWhuY2lueGFhaHMuc3VwYWJhc2UuY29cIjtcbmNvbnN0IHN1cGFiYXNlS2V5ID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJblpoYUdwamEyWmtlSFZvYm1OcGJuaGhZV2h6SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTJOemt4TURBME1qTXNJbVY0Y0NJNk1UazVORFkzTmpReU0zMC5JZEVtbGVKcEIzTkducm5BbXFrQXhoaEFaNzdGeXdjN2dJZU0zQTdqVG5rXCI7XG4vL2NvbnN0IHN1cGFiYXNlS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfS0VZXG5jb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXkpO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBhYmFzZTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInN1cGFiYXNlS2V5Iiwic3VwYWJhc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/supabase.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/og.js"));
module.exports = __webpack_exports__;

})();