module.exports = [
"[project]/app/blog/[slug]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/blogs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/LanguageContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function BlogDetailPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const slug = params?.slug;
    const { lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const post = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BLOG_POSTS"].find((p)=>p.slug === slug);
    if (!post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-black text-white flex flex-col justify-center items-center px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold mb-4",
                    children: "Article Not Found"
                }, void 0, false, {
                    fileName: "[project]/app/blog/[slug]/page.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "px-4 py-2 bg-white text-black rounded-md text-sm font-semibold",
                    children: "Return Home"
                }, void 0, false, {
                    fileName: "[project]/app/blog/[slug]/page.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/blog/[slug]/page.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    const otherPosts = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$blogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BLOG_POSTS"].filter((p)=>p.slug !== slug);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-900/20 blur-[120px] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/app/blog/[slug]/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-4xl mx-auto relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-full mb-8 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: lang === "ur" ? "→ اہم صفحہ پر واپس جائیں" : "← Back to Home"
                        }, void 0, false, {
                            fileName: "[project]/app/blog/[slug]/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-xs text-purple-400 font-semibold uppercase tracking-wider mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-purple-950 border border-purple-500/30 px-3 py-1 rounded-full",
                                children: post.category[lang]
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: post.date
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: post.readTime[lang]
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6",
                        children: post.title[lang]
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-8 border-l-4 border-purple-500 pl-4 py-1 italic bg-neutral-950/50 rounded-r-lg",
                        children: post.excerpt[lang]
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: post.image,
                            alt: post.title[lang],
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/blog/[slug]/page.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "prose prose-invert max-w-none text-gray-300 text-base md:text-lg leading-relaxed space-y-6",
                        children: post.content[lang].map((paragraph, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "bg-neutral-950/40 p-6 rounded-xl border border-white/5 shadow-inner",
                                children: paragraph
                            }, index, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-20 pt-12 border-t border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold mb-8 text-white",
                                children: lang === "ur" ? "دیگر متعلقہ مضامین" : "Related Articles"
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: otherPosts.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/blog/${item.slug}`,
                                        className: "group bg-neutral-950 border border-white/10 rounded-xl p-4 hover:border-purple-500/40 transition-all flex flex-col justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-purple-400 font-medium",
                                                        children: item.category[lang]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-bold text-white group-hover:text-purple-300 transition-colors mt-1 line-clamp-2",
                                                        children: item.title[lang]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500 mt-4 group-hover:text-white transition-colors",
                                                children: lang === "ur" ? "پڑھیں ←" : "Read →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/app/blog/[slug]/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/blog/[slug]/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/blog/[slug]/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/blog/[slug]/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/blog/[slug]/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/data/blogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_POSTS",
    ()=>BLOG_POSTS
]);
const BLOG_POSTS = [
    {
        id: "1",
        slug: "how-it-works",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
        date: "Aug 22, 2026",
        readTime: {
            en: "4 min read",
            ur: "۴ منٹ مطالعہ"
        },
        category: {
            en: "Architecture & Tech",
            ur: "ٹیکنالوجی اور ڈیزائن"
        },
        title: {
            en: "How MediReport AI Works",
            ur: "میڈی رپورٹ AI کیسے کام کرتا ہے"
        },
        excerpt: {
            en: "Discover how our advanced neural networks break down complex lab tests into simple, understandable insights in seconds.",
            ur: "جانئے کہ ہمارا جدید نیورل نیٹ ورک کس طرح پیچیدہ لیب ٹیسٹوں کو سیکنڈوں میں سادہ اور فہم بصیرت میں تبدیل کرتا ہے۔"
        },
        content: {
            en: [
                "Medical reports are traditionally written in dense clinical terminology that can feel overwhelming to non-medical readers. MediReport AI bridge this gap using optical character recognition (OCR) and specialized medical language models.",
                "When a user uploads a PDF or photo of a medical report, our optical engine securely extracts raw numerical data, lab ranges, and diagnostic notes.",
                "Next, our fine-tuned AI analyzes reference ranges based on age, gender, and standard medical benchmarks. It highlights key metrics such as hemoglobin, blood sugar, lipid profiles, and liver enzymes.",
                "Finally, the platform converts these findings into plain language summaries, risk indicators, and tailored questions you can ask your primary healthcare physician during your next visit."
            ],
            ur: [
                "طبی رپورٹس رواں دواں ڈاکٹری اصطلاحات میں لکھی جاتی ہیں جو عام مریض کے لیے سمجھنا کافی مشکل ہوتی ہیں۔ میڈی رپورٹ AI اس خلا کو جدید ٹیکنالوجی کے ذریعے پر کرتا ہے۔",
                "جب صارف طبی رپورٹ کی تصویر یا فائل اپ لوڈ کرتا ہے، تو ہمارا اینجن ڈیٹا اور لیبارٹری ویلیوز کو محفوظ طریقے سے سکین کرتا ہے۔",
                "اس کے بعد ہمارا ذی ہوش ای آئی ماڈل حوالہ جات کے مطابق عمر اور جنس کے تناسب سے ان کا موازنہ کرتا ہے۔",
                "آخر میں، پلیٹ فارم تمام نتائج کو سادہ اور واضح الفاظ میں پیش کرتا ہے تاکہ آپ اپنے ڈاکٹر کے ساتھ بہتر مشاورت کر سکیں۔"
            ]
        }
    },
    {
        id: "2",
        slug: "ai-in-medicine",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
        date: "Aug 20, 2026",
        readTime: {
            en: "5 min read",
            ur: "۵ منٹ مطالعہ"
        },
        category: {
            en: "Medical AI Innovation",
            ur: "طبی ای آئی جدت"
        },
        title: {
            en: "The Importance of AI in Modern Medicine",
            ur: "جدید طبی سائنس میں AI کی اہمیت"
        },
        excerpt: {
            en: "Exploring how artificial intelligence reduces diagnostic errors, speeds up triage, and empowers patients globally.",
            ur: "جانئے کہ مصنوعی ذہانت کس طرح تشخیصی غلطیوں کو کم کرتی ہے اور مریضوں کو بااختیار بناتی ہے۔"
        },
        content: {
            en: [
                "Artificial Intelligence is revolutionizing modern healthcare by serving as an intelligent copilot for medical professionals and patients alike.",
                "By processing millions of anonymized data points in seconds, AI algorithms can detect subtle anomalies in bloodwork, radiology scans, and genetic markers long before visible symptoms appear.",
                "Beyond diagnostic accuracy, AI drastically improves accessibility. Patients living in remote or underserved regions gain immediate clarity on their diagnostic reports without waiting days for initial interpretation.",
                "As AI technology continues to evolve, the combination of clinical expertise and predictive algorithms will usher in an era of preventive, highly personalized medicine."
            ],
            ur: [
                "مصنوعی ذہانت جدید صحت کی دیکھ بھال میں ایک بہترین معاون کے طور پر انقلاب برپا کر رہی ہے۔",
                "لاکھوں ڈیٹا پوائنٹس کا تیزی سے تجزیہ کر کے ای آئی الگورتھم خون کی رپورٹس اور اٹیچمنٹس میں باریک تر نسیجی تبدیلیاں پکڑ سکتے ہیں۔",
                "تشخیصی درستگی کے علاوہ، ای آئی ریموٹ علاقوں میں رہنے والے مریضوں کو فوری بصیرت فراہم کرتی ہے۔",
                "جیسے جیسے یہ ٹیکنالوجی مزید ترقی کرے گی، طبی تجربے اور ای آئی کا امتزاج انسدادی علاج کے ایک نئے دور کو جنم دے گا۔"
            ]
        }
    },
    {
        id: "3",
        slug: "understanding-lab-tests",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
        date: "Aug 18, 2026",
        readTime: {
            en: "6 min read",
            ur: "۶ منٹ مطالعہ"
        },
        category: {
            en: "Patient Empowerment",
            ur: "صحت آگاہی"
        },
        title: {
            en: "Understanding Lab Test Results with AI",
            ur: "ای آئی کی مدد سے لیب ٹیسٹ کے نتائج کو سمجھنا"
        },
        excerpt: {
            en: "Learn what blood markers, CBC, and metabolic panels mean for your health with instant AI breakdown.",
            ur: "بلڈ مارکرز اور میٹابولک پینل کے نتائج کا آسان الفاظ میں تجزیہ حاصل کریں۔"
        },
        content: {
            en: [
                "Complete Blood Count (CBC), Comprehensive Metabolic Panels (CMP), and Thyroid profiles contain vital indicators of your internal organ health.",
                "Understanding these values allows individuals to proactively adjust their diet, lifestyle, and exercise routine long before minor deviations turn into chronic conditions.",
                "MediReport AI translates cryptic abbreviations like WBC, HbA1c, ALT, and TSH into clear progress bars and digestible explanations.",
                "Equipped with this knowledge, patients can engage in more meaningful discussions with doctors and take active ownership of their long-term wellness."
            ],
            ur: [
                "سی بی سی، میٹابولک پینل اور تھائرائیڈ پروفائل آپ کے اندرونی اعضاء کی صحت کے اہم اشاریے فراہم کرتے ہیں۔",
                "ان اقدار کو سمجھنے سے فرد کو اپنی خوراک اور لائف سٹائل میں وقت پر بہتری لانے کا موقع ملتا ہے۔",
                "میڈی رپورٹ AI مشکل اصطلاحات کو سادہ چارٹس اور واضح وضاحتوں میں بدل دیتا ہے۔",
                "اس علم کے ساتھ مریض اپنے ڈاکٹر سے زیادہ نتیجہ خیز بات چیت کر سکتے ہیں۔"
            ]
        }
    },
    {
        id: "4",
        slug: "future-of-healthcare",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        date: "Aug 15, 2026",
        readTime: {
            en: "4 min read",
            ur: "۴ منٹ مطالعہ"
        },
        category: {
            en: "Future Vision",
            ur: "مستقبل کی وژن"
        },
        title: {
            en: "The Future of Personalized Healthcare",
            ur: "شخصی نوعیت کی صحت کی دیکھ بھال کا مستقبل"
        },
        excerpt: {
            en: "How predictive analytics and AI insights enable proactive wellness and early disease detection.",
            ur: "پیش گوئی کے تجزیات اور ای آئی بصیرتیں کس طرح بیماریاں پہلے سے معلوم کرنے میں مددگار ہوتی ہیں۔"
        },
        content: {
            en: [
                "Healthcare is rapidly shifting from reactive disease treatment to proactive, personalized longevity optimization.",
                "With continuous health data from wearables combined with periodic lab reports, AI models construct dynamic digital twins of patient health.",
                "This holistic view allows algorithms to alert patients to early biomarker shifts long before symptom onset.",
                "MediReport AI is proud to pioneer this user-centric transformation, placing medical intelligence directly into the hands of every individual."
            ],
            ur: [
                "صحت کی دیکھ بھال اب بیماری کے بعد کے علاج سے آگے بڑھ کر بروقت تندرستی کی طرف منتقل ہو رہی ہے۔",
                "ذی ہوش ای آئی ماڈلز آپ کی صحت کی تاریخ کا جائزہ لے کر مستقبل کی پیشن گوئی کرتے ہیں۔",
                "یہ طریقہ کار مریض کوعلامات ظاہر ہونے سے بہت پہلے خبردار کر دیتا ہے۔",
                "میڈی رپورٹ AI اس جدید مستقبل کی باگ ڈور ہر فرد کے ہاتھ میں دینے کے لیے کوشاں ہے۔"
            ]
        }
    }
];
}),
];

//# sourceMappingURL=app_0ojt6-c._.js.map