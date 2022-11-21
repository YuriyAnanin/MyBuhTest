/**
 * Minified by jsDelivr using UglifyJS v3.4.4.
 * Original file: /npm/jquery.maskedinput@1.4.1/src/jquery.maskedinput.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
}(function (R) {
    var a, e = navigator.userAgent,
        S = /iphone/i.test(e),
        i = /chrome/i.test(e),
        T = /android/i.test(e);
    R.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, R.fn.extend({
        caret: function (e, t) {
            var n;
            if (0 !== this.length && !this.is(":hidden") && this.get(0) === document.activeElement) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function () {
            return this.trigger("unmask")
        },
        mask: function (t, v) {
            var n, b, k, y, x, j, A;
            if (!t && 0 < this.length) {
                var e = R(this[0]).data(R.mask.dataName);
                return e ? e() : void 0
            }
            return v = R.extend({
                autoclear: R.mask.autoclear,
                placeholder: R.mask.placeholder,
                completed: null
            }, v), n = R.mask.definitions, b = [], k = j = t.length, y = null, t = String(t), R.each(t.split(""), function (e, t) {
                "?" == t ? (j--, k = e) : n[t] ? (b.push(new RegExp(n[t])), null === y && (y = b.length - 1), e < k && (x = b.length - 1)) : b.push(null)
            }), this.trigger("unmask").each(function () {
                var o = R(this),
                    c = R.map(t.split(""), function (e, t) {
                        if ("?" != e) return n[e] ? f(t) : e
                    }),
                    l = c.join(""),
                    r = o.val();

                function u() {
                    if (v.completed) {
                        for (var e = y; e <= x; e++)
                            if (b[e] && c[e] === f(e)) return;
                        v.completed.call(o)
                    }
                }

                function f(e) {
                    return e < v.placeholder.length ? v.placeholder.charAt(e) : v.placeholder.charAt(0)
                }

                function s(e) {
                    for (; ++e < j && !b[e];);
                    return e
                }

                function h(e, t) {
                    var n, a;
                    if (!(e < 0)) {
                        for (n = e, a = s(t); n < j; n++)
                            if (b[n]) {
                                if (!(a < j && b[n].test(c[a]))) break;
                                c[n] = c[a], c[a] = f(a), a = s(a)
                            } d(), o.caret(Math.max(y, e))
                    }
                }

                function g(e) {
                    p(), o.val() != r && o.change()
                }

                function m(e, t) {
                    var n;
                    for (n = e; n < t && n < j; n++) b[n] && (c[n] = f(n))
                }

                function d() {
                    o.val(c.join(""))
                }

                function p(e) {
                    var t, n, a, i = o.val(),
                        r = -1;
                    for (a = t = 0; t < j; t++)
                        if (b[t]) {
                            for (c[t] = f(t); a++ < i.length;)
                                if (n = i.charAt(a - 1), b[t].test(n)) {
                                    c[t] = n, r = t;
                                    break
                                } if (a > i.length) {
                                m(t + 1, j);
                                break
                            }
                        } else c[t] === i.charAt(a) && a++, t < k && (r = t);
                    return e ? d() : r + 1 < k ? v.autoclear || c.join("") === l ? (o.val() && o.val(""), m(0, j)) : d() : (d(), o.val(o.val().substring(0, r + 1))), k ? t : y
                }
                o.data(R.mask.dataName, function () {
                    return R.map(c, function (e, t) {
                        return b[t] && e != f(t) ? e : null
                    }).join("")
                }), o.one("unmask", function () {
                    o.off(".mask").removeData(R.mask.dataName)
                }).on("focus.mask", function () {
                    var e;
                    o.prop("readonly") || (clearTimeout(a), r = o.val(), e = p(), a = setTimeout(function () {
                        o.get(0) === document.activeElement && (d(), e == t.replace("?", "").length ? o.caret(0, e) : o.caret(e))
                    }, 10))
                }).on("blur.mask", g).on("keydown.mask", function (e) {
                    if (!o.prop("readonly")) {
                        var t, n, a, i = e.which || e.keyCode;
                        A = o.val(), 8 === i || 46 === i || S && 127 === i ? (n = (t = o.caret()).begin, (a = t.end) - n == 0 && (n = 46 !== i ? function (e) {
                            for (; 0 <= --e && !b[e];);
                            return e
                        }(n) : a = s(n - 1), a = 46 === i ? s(a) : a), m(n, a), h(n, a - 1), e.preventDefault()) : 13 === i ? g.call(this, e) : 27 === i && (o.val(r), o.caret(0, p()), e.preventDefault())
                    }
                }).on("keypress.mask", function (e) {
                    if (!o.prop("readonly")) {
                        var t, n, a, i = e.which || e.keyCode,
                            r = o.caret();
                        e.ctrlKey || e.altKey || e.metaKey || i < 32 || !i || 13 === i || (r.end - r.begin != 0 && (m(r.begin, r.end), h(r.begin, r.end - 1)), (t = s(r.begin - 1)) < j && (n = String.fromCharCode(i), b[t].test(n)) && (function (e) {
                            var t, n, a, i;
                            for (n = f(t = e); t < j; t++)
                                if (b[t]) {
                                    if (a = s(t), i = c[t], c[t] = n, !(a < j && b[a].test(i))) break;
                                    n = i
                                }
                        }(t), c[t] = n, d(), a = s(t), T ? setTimeout(function () {
                            R.proxy(R.fn.caret, o, a)()
                        }, 0) : o.caret(a), r.begin <= x && u()), e.preventDefault())
                    }
                }).on("input.mask paste.mask", function () {
                    o.prop("readonly") || setTimeout(function () {
                        var e = p(!0);
                        o.caret(e), u()
                    }, 0)
                }), i && T && o.off("input.mask").on("input.mask", function (e) {
                    var t = o.val(),
                        n = o.caret();
                    if (A && A.length && A.length > t.length) {
                        for (p(!0); 0 < n.begin && !b[n.begin - 1];) n.begin--;
                        if (0 === n.begin)
                            for (; n.begin < y && !b[n.begin];) n.begin++;
                        o.caret(n.begin, n.begin)
                    } else {
                        p(!0);
                        var a = t.charAt(n.begin);
                        n.begin < j && (b[n.begin] || n.begin++, b[n.begin].test(a) && n.begin++), o.caret(n.begin, n.begin)
                    }
                    u()
                }), p()
            })
        }
    })
});
//# sourceMappingURL=/sm/0db8177a53b6eab1363e81af339c3641bb98c7faaf29a367c2094d37f014e37e.map