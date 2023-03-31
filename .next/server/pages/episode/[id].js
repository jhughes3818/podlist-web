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
exports.id = "pages/episode/[id]";
exports.ids = ["pages/episode/[id]"];
exports.modules = {

/***/ "./src/pages/episode/[id]/index.js":
/*!*****************************************!*\
  !*** ./src/pages/episode/[id]/index.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Episode)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/supabase */ \"./utils/supabase.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fetch_opengraph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fetch-opengraph */ \"fetch-opengraph\");\n/* harmony import */ var fetch_opengraph__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fetch_opengraph__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_5__]);\naxios__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\nfunction Episode() {\n    const [episode, setEpisode] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    // Get id from URL\n    const { id  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)().query;\n    // Get episode from supabase\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        console.log(\"Hello\");\n        if (id) {\n            getEpisode().catch((err)=>console.log(err)).then(()=>console.log(\"done\")).catch((err)=>console.log(err));\n        }\n    }, [\n        id\n    ]);\n    const getEpisode = async ()=>{\n        // Get og data\n        const og = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"/api/og\", {\n            params: {\n                episode_id: id\n            }\n        });\n        setEpisode(og.data);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: episode ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"grid h-screen place-items-center\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-96 items-center justify-center rounded-lg border-b-4 border-l-2 border-r-4 border-t-2 border-black p-5\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: episode.image,\n                        className: \"h-50 w-50 mx-auto rounded-lg\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                        lineNumber: 42,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"mt-2 text-2xl font-bold\",\n                        children: episode.title\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                        lineNumber: 43,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-gray-600\",\n                        children: episode.show\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                        lineNumber: 44,\n                        columnNumber: 13\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-2 flex flex-row items-center justify-center gap-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-max rounded-lg border-2 border-black px-2 py-1\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                    href: episode.spotifyURL,\n                                    children: \"Spotify\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                                    lineNumber: 47,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                                lineNumber: 46,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-max rounded-lg border-2 border-black px-2 py-1\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                    href: episode.appleURL,\n                                    children: \"Apple\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                                    lineNumber: 50,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                                lineNumber: 49,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                        lineNumber: 45,\n                        columnNumber: 13\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n                lineNumber: 41,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n            lineNumber: 40,\n            columnNumber: 9\n        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"/Users/jasonhughes/Documents/apps/podlist-web-next/src/pages/episode/[id]/index.js\",\n            lineNumber: 56,\n            columnNumber: 9\n        }, this)\n    }, void 0, false);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvZXBpc29kZS9baWRdL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNGO0FBQ007QUFDSjtBQUNkO0FBRVgsU0FBU00sVUFBVTtJQUNoQyxNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR0wsK0NBQVFBLENBQUMsSUFBSTtJQUUzQyxrQkFBa0I7SUFDbEIsTUFBTSxFQUFFTSxHQUFFLEVBQUUsR0FBR1Qsc0RBQVNBLEdBQUdVLEtBQUs7SUFFaEMsNEJBQTRCO0lBQzVCUixnREFBU0EsQ0FBQyxJQUFNO1FBQ2RTLFFBQVFDLEdBQUcsQ0FBQztRQUVaLElBQUlILElBQUk7WUFDTkksYUFDR0MsS0FBSyxDQUFDLENBQUNDLE1BQVFKLFFBQVFDLEdBQUcsQ0FBQ0csTUFDM0JDLElBQUksQ0FBQyxJQUFNTCxRQUFRQyxHQUFHLENBQUMsU0FDdkJFLEtBQUssQ0FBQyxDQUFDQyxNQUFRSixRQUFRQyxHQUFHLENBQUNHO1FBQ2hDLENBQUM7SUFDSCxHQUFHO1FBQUNOO0tBQUc7SUFFUCxNQUFNSSxhQUFhLFVBQVk7UUFDN0IsY0FBYztRQUVkLE1BQU1JLEtBQUssTUFBTVosaURBQVMsQ0FBQyxXQUFXO1lBQ3BDYyxRQUFRO2dCQUNOQyxZQUFZWDtZQUNkO1FBQ0Y7UUFFQUQsV0FBV1MsR0FBR0ksSUFBSTtJQUNwQjtJQUVBLHFCQUNFO2tCQUNHZCx3QkFDQyw4REFBQ2U7WUFBSUMsV0FBVTtzQkFDYiw0RUFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDQzt3QkFBSUMsS0FBS2xCLFFBQVFtQixLQUFLO3dCQUFFSCxXQUFVOzs7Ozs7a0NBQ25DLDhEQUFDSTt3QkFBR0osV0FBVTtrQ0FBMkJoQixRQUFRcUIsS0FBSzs7Ozs7O2tDQUN0RCw4REFBQ0M7d0JBQUVOLFdBQVU7a0NBQWlCaEIsUUFBUXVCLElBQUk7Ozs7OztrQ0FDMUMsOERBQUNSO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ0Q7Z0NBQUlDLFdBQVU7MENBQ2IsNEVBQUNRO29DQUFFQyxNQUFNekIsUUFBUTBCLFVBQVU7OENBQUU7Ozs7Ozs7Ozs7OzBDQUUvQiw4REFBQ1g7Z0NBQUlDLFdBQVU7MENBQ2IsNEVBQUNRO29DQUFFQyxNQUFNekIsUUFBUTJCLFFBQVE7OENBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FNbkMsOERBQUNaO3NCQUFJOzs7OztnQkFDTjs7QUFHUCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9kbGlzdC13ZWItbmV4dC8uL3NyYy9wYWdlcy9lcGlzb2RlL1tpZF0vaW5kZXguanM/MzY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBzdXBhYmFzZSBmcm9tIFwidXRpbHMvc3VwYWJhc2VcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZldGNoIH0gZnJvbSBcImZldGNoLW9wZW5ncmFwaFwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFcGlzb2RlKCkge1xuICBjb25zdCBbZXBpc29kZSwgc2V0RXBpc29kZV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICAvLyBHZXQgaWQgZnJvbSBVUkxcbiAgY29uc3QgeyBpZCB9ID0gdXNlUm91dGVyKCkucXVlcnk7XG5cbiAgLy8gR2V0IGVwaXNvZGUgZnJvbSBzdXBhYmFzZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIik7XG5cbiAgICBpZiAoaWQpIHtcbiAgICAgIGdldEVwaXNvZGUoKVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJkb25lXCIpKVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgfVxuICB9LCBbaWRdKTtcblxuICBjb25zdCBnZXRFcGlzb2RlID0gYXN5bmMgKCkgPT4ge1xuICAgIC8vIEdldCBvZyBkYXRhXG5cbiAgICBjb25zdCBvZyA9IGF3YWl0IGF4aW9zLmdldChcIi9hcGkvb2dcIiwge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIGVwaXNvZGVfaWQ6IGlkLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHNldEVwaXNvZGUob2cuZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2VwaXNvZGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBoLXNjcmVlbiBwbGFjZS1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtbGcgYm9yZGVyLWItNCBib3JkZXItbC0yIGJvcmRlci1yLTQgYm9yZGVyLXQtMiBib3JkZXItYmxhY2sgcC01XCI+XG4gICAgICAgICAgICA8aW1nIHNyYz17ZXBpc29kZS5pbWFnZX0gY2xhc3NOYW1lPVwiaC01MCB3LTUwIG14LWF1dG8gcm91bmRlZC1sZ1wiIC8+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LTJ4bCBmb250LWJvbGRcIj57ZXBpc29kZS50aXRsZX08L2gxPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPntlcGlzb2RlLnNob3d9PC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIGZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1tYXggcm91bmRlZC1sZyBib3JkZXItMiBib3JkZXItYmxhY2sgcHgtMiBweS0xXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17ZXBpc29kZS5zcG90aWZ5VVJMfT5TcG90aWZ5PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LW1heCByb3VuZGVkLWxnIGJvcmRlci0yIGJvcmRlci1ibGFjayBweC0yIHB5LTFcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPXtlcGlzb2RlLmFwcGxlVVJMfT5BcHBsZTwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2PkxvYWRpbmcuLi48L2Rpdj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlUm91dGVyIiwic3VwYWJhc2UiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImZldGNoIiwiYXhpb3MiLCJFcGlzb2RlIiwiZXBpc29kZSIsInNldEVwaXNvZGUiLCJpZCIsInF1ZXJ5IiwiY29uc29sZSIsImxvZyIsImdldEVwaXNvZGUiLCJjYXRjaCIsImVyciIsInRoZW4iLCJvZyIsImdldCIsInBhcmFtcyIsImVwaXNvZGVfaWQiLCJkYXRhIiwiZGl2IiwiY2xhc3NOYW1lIiwiaW1nIiwic3JjIiwiaW1hZ2UiLCJoMSIsInRpdGxlIiwicCIsInNob3ciLCJhIiwiaHJlZiIsInNwb3RpZnlVUkwiLCJhcHBsZVVSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/episode/[id]/index.js\n");

/***/ }),

/***/ "./utils/supabase.js":
/*!***************************!*\
  !*** ./utils/supabase.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://vahjckfdxuhncinxaahs.supabase.co\";\nconst supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaGpja2ZkeHVobmNpbnhhYWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxMDA0MjMsImV4cCI6MTk5NDY3NjQyM30.IdEmleJpB3NGnrnAmqkAxhhAZ77Fywc7gIeM3A7jTnk\";\n//const supabaseKey = process.env.SUPABASE_KEY\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supabase);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9zdXBhYmFzZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBYztBQUNwQixNQUFNQyxjQUNKO0FBQ0YsOENBQThDO0FBQzlDLE1BQU1DLFdBQVdILG1FQUFZQSxDQUFDQyxhQUFhQztBQUUzQyxpRUFBZUMsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BvZGxpc3Qtd2ViLW5leHQvLi91dGlscy9zdXBhYmFzZS5qcz80MDZkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBcImh0dHBzOi8vdmFoamNrZmR4dWhuY2lueGFhaHMuc3VwYWJhc2UuY29cIjtcbmNvbnN0IHN1cGFiYXNlS2V5ID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJblpoYUdwamEyWmtlSFZvYm1OcGJuaGhZV2h6SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTJOemt4TURBME1qTXNJbVY0Y0NJNk1UazVORFkzTmpReU0zMC5JZEVtbGVKcEIzTkducm5BbXFrQXhoaEFaNzdGeXdjN2dJZU0zQTdqVG5rXCI7XG4vL2NvbnN0IHN1cGFiYXNlS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfS0VZXG5jb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXkpO1xuXG5leHBvcnQgZGVmYXVsdCBzdXBhYmFzZTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInN1cGFiYXNlS2V5Iiwic3VwYWJhc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/supabase.js\n");

/***/ }),

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

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/episode/[id]/index.js"));
module.exports = __webpack_exports__;

})();