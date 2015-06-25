// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.1.0

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ol = factory();
    }
}(this, function () {
    var OPENLAYERS = {};
    var l, aa = aa || {}, ba = this;

    function m(b) {
        return void 0 !== b
    }

    function t(b, c, d) {
        b = b.split(".");
        d = d || ba;
        b[0]in d || !d.execScript || d.execScript("var " + b[0]);
        for (var e; b.length && (e = b.shift());)!b.length && m(c) ? d[e] = c : d[e] ? d = d[e] : d = d[e] = {}
    }

    function ca() {
    }

    function da(b) {
        b.Ja = function () {
            return b.lf ? b.lf : b.lf = new b
        }
    }

    function ea(b) {
        var c = typeof b;
        if ("object" == c)if (b) {
            if (b instanceof Array)return "array";
            if (b instanceof Object)return c;
            var d = Object.prototype.toString.call(b);
            if ("[object Window]" == d)return "object";
            if ("[object Array]" == d || "number" == typeof b.length && "undefined" != typeof b.splice && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == d || "undefined" != typeof b.call && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("call"))return "function"
        } else return "null";
        else if ("function" == c && "undefined" == typeof b.call)return "object";
        return c
    }

    function fa(b) {
        return null === b
    }

    function ga(b) {
        return "array" == ea(b)
    }

    function ha(b) {
        var c = ea(b);
        return "array" == c || "object" == c && "number" == typeof b.length
    }

    function ia(b) {
        return "string" == typeof b
    }

    function ja(b) {
        return "number" == typeof b
    }

    function ka(b) {
        return "function" == ea(b)
    }

    function la(b) {
        var c = typeof b;
        return "object" == c && null != b || "function" == c
    }

    function ma(b) {
        return b[na] || (b[na] = ++oa)
    }

    var na = "closure_uid_" + (1E9 * Math.random() >>> 0), oa = 0;

    function pa(b, c, d) {
        return b.call.apply(b.bind, arguments)
    }

    function ra(b, c, d) {
        if (!b)throw Error();
        if (2 < arguments.length) {
            var e = Array.prototype.slice.call(arguments, 2);
            return function () {
                var d = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(d, e);
                return b.apply(c, d)
            }
        }
        return function () {
            return b.apply(c, arguments)
        }
    }

    function sa(b, c, d) {
        sa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? pa : ra;
        return sa.apply(null, arguments)
    }

    function ta(b, c) {
        var d = Array.prototype.slice.call(arguments, 1);
        return function () {
            var c = d.slice();
            c.push.apply(c, arguments);
            return b.apply(this, c)
        }
    }

    var ua = Date.now || function () {
            return +new Date
        };

    function u(b, c) {
        function d() {
        }

        d.prototype = c.prototype;
        b.S = c.prototype;
        b.prototype = new d;
        b.prototype.constructor = b;
        b.Vl = function (b, d, g) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++)h[k - 2] = arguments[k];
            return c.prototype[d].apply(b, h)
        }
    };
    var va, wa;

    function xa(b) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, xa); else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        b && (this.message = String(b))
    }

    u(xa, Error);
    xa.prototype.name = "CustomError";
    var ya;

    function za(b, c) {
        for (var d = b.split("%s"), e = "", f = Array.prototype.slice.call(arguments, 1); f.length && 1 < d.length;)e += d.shift() + f.shift();
        return e + d.join("%s")
    }

    var Aa = String.prototype.trim ? function (b) {
        return b.trim()
    } : function (b) {
        return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };

    function Ba(b) {
        if (!Ca.test(b))return b;
        -1 != b.indexOf("&") && (b = b.replace(Da, "&amp;"));
        -1 != b.indexOf("<") && (b = b.replace(Ea, "&lt;"));
        -1 != b.indexOf(">") && (b = b.replace(Fa, "&gt;"));
        -1 != b.indexOf('"') && (b = b.replace(Ga, "&quot;"));
        -1 != b.indexOf("'") && (b = b.replace(Ha, "&#39;"));
        -1 != b.indexOf("\x00") && (b = b.replace(Ia, "&#0;"));
        return b
    }

    var Da = /&/g, Ea = /</g, Fa = />/g, Ga = /"/g, Ha = /'/g, Ia = /\x00/g, Ca = /[\x00&<>"']/;

    function Ja(b) {
        return String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }

    function Ma(b) {
        b = m(void 0) ? b.toFixed(void 0) : String(b);
        var c = b.indexOf(".");
        -1 == c && (c = b.length);
        c = Math.max(0, 2 - c);
        return Array(c + 1).join("0") + b
    }

    function Na(b, c) {
        for (var d = 0, e = Aa(String(b)).split("."), f = Aa(String(c)).split("."), g = Math.max(e.length, f.length), h = 0; 0 == d && h < g; h++) {
            var k = e[h] || "", n = f[h] || "", p = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
            do {
                var r = p.exec(k) || ["", "", ""], s = q.exec(n) || ["", "", ""];
                if (0 == r[0].length && 0 == s[0].length)break;
                d = Oa(0 == r[1].length ? 0 : parseInt(r[1], 10), 0 == s[1].length ? 0 : parseInt(s[1], 10)) || Oa(0 == r[2].length, 0 == s[2].length) || Oa(r[2], s[2])
            } while (0 == d)
        }
        return d
    }

    function Oa(b, c) {
        return b < c ? -1 : b > c ? 1 : 0
    }

    function Qa() {
        return "transform".replace(/\-([a-z])/g, function (b, c) {
            return c.toUpperCase()
        })
    }

    function Ra(b) {
        var c = ia(void 0) ? Ja(void 0) : "\\s";
        return b.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function (b, c, f) {
            return c + f.toUpperCase()
        })
    };
    var Sa = Array.prototype;

    function Ta(b, c, d) {
        Sa.forEach.call(b, c, d)
    }

    function Ua(b, c) {
        return Sa.filter.call(b, c, void 0)
    }

    function Va(b, c, d) {
        return Sa.map.call(b, c, d)
    }

    function Wa(b, c) {
        return Sa.some.call(b, c, void 0)
    }

    function Xa(b) {
        var c;
        a:{
            c = Ya;
            for (var d = b.length, e = ia(b) ? b.split("") : b, f = 0; f < d; f++)if (f in e && c.call(void 0, e[f], f, b)) {
                c = f;
                break a
            }
            c = -1
        }
        return 0 > c ? null : ia(b) ? b.charAt(c) : b[c]
    }

    function Za(b, c) {
        return 0 <= Sa.indexOf.call(b, c, void 0)
    }

    function $a(b) {
        if (!ga(b))for (var c = b.length - 1; 0 <= c; c--)delete b[c];
        b.length = 0
    }

    function ab(b, c) {
        var d = Sa.indexOf.call(b, c, void 0), e;
        (e = 0 <= d) && Sa.splice.call(b, d, 1);
        return e
    }

    function bb(b) {
        return Sa.concat.apply(Sa, arguments)
    }

    function cb(b) {
        var c = b.length;
        if (0 < c) {
            for (var d = Array(c), e = 0; e < c; e++)d[e] = b[e];
            return d
        }
        return []
    }

    function db(b, c) {
        for (var d = 1; d < arguments.length; d++) {
            var e = arguments[d];
            if (ha(e)) {
                var f = b.length || 0, g = e.length || 0;
                b.length = f + g;
                for (var h = 0; h < g; h++)b[f + h] = e[h]
            } else b.push(e)
        }
    }

    function eb(b, c, d, e) {
        Sa.splice.apply(b, fb(arguments, 1))
    }

    function fb(b, c, d) {
        return 2 >= arguments.length ? Sa.slice.call(b, c) : Sa.slice.call(b, c, d)
    }

    function gb(b, c) {
        b.sort(c || hb)
    }

    function ib(b, c) {
        if (!ha(b) || !ha(c) || b.length != c.length)return !1;
        for (var d = b.length, e = jb, f = 0; f < d; f++)if (!e(b[f], c[f]))return !1;
        return !0
    }

    function hb(b, c) {
        return b > c ? 1 : b < c ? -1 : 0
    }

    function jb(b, c) {
        return b === c
    };
    var kb;
    a:{
        var lb = ba.navigator;
        if (lb) {
            var mb = lb.userAgent;
            if (mb) {
                kb = mb;
                break a
            }
        }
        kb = ""
    }
    function nb(b) {
        return -1 != kb.indexOf(b)
    };
    function ob(b, c, d) {
        for (var e in b)c.call(d, b[e], e, b)
    }

    function pb(b, c) {
        for (var d in b)if (c.call(void 0, b[d], d, b))return !0;
        return !1
    }

    function qb(b) {
        var c = 0, d;
        for (d in b)c++;
        return c
    }

    function rb(b) {
        var c = [], d = 0, e;
        for (e in b)c[d++] = b[e];
        return c
    }

    function sb(b) {
        var c = [], d = 0, e;
        for (e in b)c[d++] = e;
        return c
    }

    function tb(b, c) {
        return c in b
    }

    function ub(b) {
        var c = wb, d;
        for (d in c)if (b.call(void 0, c[d], d, c))return d
    }

    function xb(b) {
        for (var c in b)return !1;
        return !0
    }

    function yb(b) {
        for (var c in b)delete b[c]
    }

    function zb(b, c) {
        c in b && delete b[c]
    }

    function Ab(b, c, d) {
        if (c in b)throw Error('The object already contains the key "' + c + '"');
        b[c] = d
    }

    function x(b, c, d) {
        return c in b ? b[c] : d
    }

    function Bb(b, c) {
        var d = [];
        return c in b ? b[c] : b[c] = d
    }

    function Cb(b) {
        var c = {}, d;
        for (d in b)c[d] = b[d];
        return c
    }

    var Db = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Eb(b, c) {
        for (var d, e, f = 1; f < arguments.length; f++) {
            e = arguments[f];
            for (d in e)b[d] = e[d];
            for (var g = 0; g < Db.length; g++)d = Db[g], Object.prototype.hasOwnProperty.call(e, d) && (b[d] = e[d])
        }
    }

    function Fb(b) {
        var c = arguments.length;
        if (1 == c && ga(arguments[0]))return Fb.apply(null, arguments[0]);
        for (var d = {}, e = 0; e < c; e++)d[arguments[e]] = !0;
        return d
    };
    var Gb = nb("Opera") || nb("OPR"), Hb = nb("Trident") || nb("MSIE"), Ib = nb("Gecko") && -1 == kb.toLowerCase().indexOf("webkit") && !(nb("Trident") || nb("MSIE")), Jb = -1 != kb.toLowerCase().indexOf("webkit"), Kb = nb("Macintosh"), Lb = nb("Windows"), Mb = nb("Linux") || nb("CrOS"), Nb, Ob = ba.navigator || null;
    Nb = !!Ob && -1 != (Ob.appVersion || "").indexOf("X11");
    function Pb() {
        var b = ba.document;
        return b ? b.documentMode : void 0
    }

    var Qb = function () {
        var b = "", c;
        if (Gb && ba.opera)return b = ba.opera.version, ka(b) ? b() : b;
        Ib ? c = /rv\:([^\);]+)(\)|;)/ : Hb ? c = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Jb && (c = /WebKit\/(\S+)/);
        c && (b = (b = c.exec(kb)) ? b[1] : "");
        return Hb && (c = Pb(), c > parseFloat(b)) ? String(c) : b
    }(), Rb = {};

    function Tb(b) {
        return Rb[b] || (Rb[b] = 0 <= Na(Qb, b))
    }

    var Ub = ba.document, Vb = Ub && Hb ? Pb() || ("CSS1Compat" == Ub.compatMode ? parseInt(Qb, 10) : 5) : void 0;
    var Wb = "https:" === ba.location.protocol, Xb = Hb && !Tb("9.0") && "" !== Qb;

    function Yb(b, c, d) {
        return Math.min(Math.max(b, c), d)
    }

    function Zb(b, c) {
        var d = b % c;
        return 0 > d * c ? d + c : d
    }

    function $b(b, c, d) {
        return b + d * (c - b)
    }

    function bc(b) {
        return b * Math.PI / 180
    };
    function cc(b) {
        return function (c) {
            if (m(c))return [Yb(c[0], b[0], b[2]), Yb(c[1], b[1], b[3])]
        }
    }

    function dc(b) {
        return b
    };
    function ec(b, c, d) {
        var e = b.length;
        if (b[0] <= c)return 0;
        if (!(c <= b[e - 1]))if (0 < d)for (d = 1; d < e; ++d) {
            if (b[d] < c)return d - 1
        } else if (0 > d)for (d = 1; d < e; ++d) {
            if (b[d] <= c)return d
        } else for (d = 1; d < e; ++d) {
            if (b[d] == c)return d;
            if (b[d] < c)return b[d - 1] - c < c - b[d] ? d - 1 : d
        }
        return e - 1
    };
    function fc(b) {
        return function (c, d, e) {
            if (m(c))return c = ec(b, c, e), c = Yb(c + d, 0, b.length - 1), b[c]
        }
    }

    function gc(b, c, d) {
        return function (e, f, g) {
            if (m(e))return g = 0 < g ? 0 : 0 > g ? 1 : .5, e = Math.floor(Math.log(c / e) / Math.log(b) + g), f = Math.max(e + f, 0), m(d) && (f = Math.min(f, d)), c / Math.pow(b, f)
        }
    };
    function hc(b) {
        if (m(b))return 0
    }

    function ic(b, c) {
        if (m(b))return b + c
    }

    function jc(b) {
        var c = 2 * Math.PI / b;
        return function (b, e) {
            if (m(b))return b = Math.floor((b + e) / c + .5) * c
        }
    }

    function kc() {
        var b = bc(5);
        return function (c, d) {
            if (m(c))return Math.abs(c + d) <= b ? 0 : c + d
        }
    };
    function lc(b, c, d) {
        this.center = b;
        this.resolution = c;
        this.rotation = d
    };
    var mc = !Hb || Hb && 9 <= Vb, nc = !Hb || Hb && 9 <= Vb, oc = Hb && !Tb("9");
    !Jb || Tb("528");
    Ib && Tb("1.9b") || Hb && Tb("8") || Gb && Tb("9.5") || Jb && Tb("528");
    Ib && !Tb("8") || Hb && Tb("9");
    function pc() {
        0 != qc && (rc[ma(this)] = this);
        this.Sa = this.Sa;
        this.la = this.la
    }

    var qc = 0, rc = {};
    pc.prototype.Sa = !1;
    pc.prototype.hc = function () {
        if (!this.Sa && (this.Sa = !0, this.M(), 0 != qc)) {
            var b = ma(this);
            delete rc[b]
        }
    };
    function sc(b, c) {
        var d = ta(tc, c);
        b.la || (b.la = []);
        b.la.push(m(void 0) ? sa(d, void 0) : d)
    }

    pc.prototype.M = function () {
        if (this.la)for (; this.la.length;)this.la.shift()()
    };
    function tc(b) {
        b && "function" == typeof b.hc && b.hc()
    };
    function uc(b, c) {
        this.type = b;
        this.b = this.target = c;
        this.f = !1;
        this.Zf = !0
    }

    uc.prototype.hc = function () {
    };
    uc.prototype.lb = function () {
        this.f = !0
    };
    uc.prototype.preventDefault = function () {
        this.Zf = !1
    };
    function vc(b) {
        b.lb()
    }

    function wc(b) {
        b.preventDefault()
    };
    var xc = Hb ? "focusout" : "DOMFocusOut";

    function yc(b) {
        yc[" "](b);
        return b
    }

    yc[" "] = ca;
    function zc(b, c) {
        uc.call(this, b ? b.type : "");
        this.relatedTarget = this.b = this.target = null;
        this.i = this.e = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.n = this.d = this.c = this.o = !1;
        this.state = null;
        this.g = !1;
        this.a = null;
        b && Ac(this, b, c)
    }

    u(zc, uc);
    var Bc = [1, 4, 2];

    function Ac(b, c, d) {
        b.a = c;
        var e = b.type = c.type;
        b.target = c.target || c.srcElement;
        b.b = d;
        if (d = c.relatedTarget) {
            if (Ib) {
                var f;
                a:{
                    try {
                        yc(d.nodeName);
                        f = !0;
                        break a
                    } catch (g) {
                    }
                    f = !1
                }
                f || (d = null)
            }
        } else"mouseover" == e ? d = c.fromElement : "mouseout" == e && (d = c.toElement);
        b.relatedTarget = d;
        Object.defineProperties ? Object.defineProperties(b, {
            offsetX: {
                configurable: !0,
                enumerable: !0,
                get: b.bf,
                set: b.hl
            }, offsetY: {configurable: !0, enumerable: !0, get: b.cf, set: b.il}
        }) : (b.offsetX = b.bf(), b.offsetY = b.cf());
        b.clientX = void 0 !== c.clientX ? c.clientX :
            c.pageX;
        b.clientY = void 0 !== c.clientY ? c.clientY : c.pageY;
        b.screenX = c.screenX || 0;
        b.screenY = c.screenY || 0;
        b.button = c.button;
        b.e = c.keyCode || 0;
        b.i = c.charCode || ("keypress" == e ? c.keyCode : 0);
        b.o = c.ctrlKey;
        b.c = c.altKey;
        b.d = c.shiftKey;
        b.n = c.metaKey;
        b.g = Kb ? c.metaKey : c.ctrlKey;
        b.state = c.state;
        c.defaultPrevented && b.preventDefault()
    }

    function Cc(b) {
        return (mc ? 0 == b.a.button : "click" == b.type ? !0 : !!(b.a.button & Bc[0])) && !(Jb && Kb && b.o)
    }

    l = zc.prototype;
    l.lb = function () {
        zc.S.lb.call(this);
        this.a.stopPropagation ? this.a.stopPropagation() : this.a.cancelBubble = !0
    };
    l.preventDefault = function () {
        zc.S.preventDefault.call(this);
        var b = this.a;
        if (b.preventDefault)b.preventDefault(); else if (b.returnValue = !1, oc)try {
            if (b.ctrlKey || 112 <= b.keyCode && 123 >= b.keyCode)b.keyCode = -1
        } catch (c) {
        }
    };
    l.fh = function () {
        return this.a
    };
    l.bf = function () {
        return Jb || void 0 !== this.a.offsetX ? this.a.offsetX : this.a.layerX
    };
    l.hl = function (b) {
        Object.defineProperties(this, {offsetX: {writable: !0, enumerable: !0, configurable: !0, value: b}})
    };
    l.cf = function () {
        return Jb || void 0 !== this.a.offsetY ? this.a.offsetY : this.a.layerY
    };
    l.il = function (b) {
        Object.defineProperties(this, {offsetY: {writable: !0, enumerable: !0, configurable: !0, value: b}})
    };
    var Dc = "closure_listenable_" + (1E6 * Math.random() | 0);

    function Ec(b) {
        return !(!b || !b[Dc])
    }

    var Fc = 0;

    function Gc(b, c, d, e, f) {
        this.Xb = b;
        this.a = null;
        this.src = c;
        this.type = d;
        this.vc = !!e;
        this.qd = f;
        this.key = ++Fc;
        this.uc = this.Xc = !1
    }

    function Hc(b) {
        b.uc = !0;
        b.Xb = null;
        b.a = null;
        b.src = null;
        b.qd = null
    };
    function Ic(b) {
        this.src = b;
        this.a = {};
        this.c = 0
    }

    Ic.prototype.add = function (b, c, d, e, f) {
        var g = b.toString();
        b = this.a[g];
        b || (b = this.a[g] = [], this.c++);
        var h = Jc(b, c, e, f);
        -1 < h ? (c = b[h], d || (c.Xc = !1)) : (c = new Gc(c, this.src, g, !!e, f), c.Xc = d, b.push(c));
        return c
    };
    Ic.prototype.remove = function (b, c, d, e) {
        b = b.toString();
        if (!(b in this.a))return !1;
        var f = this.a[b];
        c = Jc(f, c, d, e);
        return -1 < c ? (Hc(f[c]), Sa.splice.call(f, c, 1), 0 == f.length && (delete this.a[b], this.c--), !0) : !1
    };
    function Kc(b, c) {
        var d = c.type;
        if (!(d in b.a))return !1;
        var e = ab(b.a[d], c);
        e && (Hc(c), 0 == b.a[d].length && (delete b.a[d], b.c--));
        return e
    }

    function Lc(b, c, d, e, f) {
        b = b.a[c.toString()];
        c = -1;
        b && (c = Jc(b, d, e, f));
        return -1 < c ? b[c] : null
    }

    function Mc(b, c, d) {
        var e = m(c), f = e ? c.toString() : "", g = m(d);
        return pb(b.a, function (b) {
            for (var c = 0; c < b.length; ++c)if (!(e && b[c].type != f || g && b[c].vc != d))return !0;
            return !1
        })
    }

    function Jc(b, c, d, e) {
        for (var f = 0; f < b.length; ++f) {
            var g = b[f];
            if (!g.uc && g.Xb == c && g.vc == !!d && g.qd == e)return f
        }
        return -1
    };
    var Nc = "closure_lm_" + (1E6 * Math.random() | 0), Oc = {}, Pc = 0;

    function z(b, c, d, e, f) {
        if (ga(c)) {
            for (var g = 0; g < c.length; g++)z(b, c[g], d, e, f);
            return null
        }
        d = Qc(d);
        return Ec(b) ? b.La(c, d, e, f) : Rc(b, c, d, !1, e, f)
    }

    function Rc(b, c, d, e, f, g) {
        if (!c)throw Error("Invalid event type");
        var h = !!f, k = Sc(b);
        k || (b[Nc] = k = new Ic(b));
        d = k.add(c, d, e, f, g);
        if (d.a)return d;
        e = Tc();
        d.a = e;
        e.src = b;
        e.Xb = d;
        b.addEventListener ? b.addEventListener(c.toString(), e, h) : b.attachEvent(Uc(c.toString()), e);
        Pc++;
        return d
    }

    function Tc() {
        var b = Vc, c = nc ? function (d) {
            return b.call(c.src, c.Xb, d)
        } : function (d) {
            d = b.call(c.src, c.Xb, d);
            if (!d)return d
        };
        return c
    }

    function Wc(b, c, d, e, f) {
        if (ga(c)) {
            for (var g = 0; g < c.length; g++)Wc(b, c[g], d, e, f);
            return null
        }
        d = Qc(d);
        return Ec(b) ? b.gb.add(String(c), d, !0, e, f) : Rc(b, c, d, !0, e, f)
    }

    function Xc(b, c, d, e, f) {
        if (ga(c))for (var g = 0; g < c.length; g++)Xc(b, c[g], d, e, f); else d = Qc(d), Ec(b) ? b.Fe(c, d, e, f) : b && (b = Sc(b)) && (c = Lc(b, c, d, !!e, f)) && Yc(c)
    }

    function Yc(b) {
        if (ja(b) || !b || b.uc)return !1;
        var c = b.src;
        if (Ec(c))return Kc(c.gb, b);
        var d = b.type, e = b.a;
        c.removeEventListener ? c.removeEventListener(d, e, b.vc) : c.detachEvent && c.detachEvent(Uc(d), e);
        Pc--;
        (d = Sc(c)) ? (Kc(d, b), 0 == d.c && (d.src = null, c[Nc] = null)) : Hc(b);
        return !0
    }

    function Uc(b) {
        return b in Oc ? Oc[b] : Oc[b] = "on" + b
    }

    function Zc(b, c, d, e) {
        var f = !0;
        if (b = Sc(b))if (c = b.a[c.toString()])for (c = c.concat(), b = 0; b < c.length; b++) {
            var g = c[b];
            g && g.vc == d && !g.uc && (g = $c(g, e), f = f && !1 !== g)
        }
        return f
    }

    function $c(b, c) {
        var d = b.Xb, e = b.qd || b.src;
        b.Xc && Yc(b);
        return d.call(e, c)
    }

    function Vc(b, c) {
        if (b.uc)return !0;
        if (!nc) {
            var d;
            if (!(d = c))a:{
                d = ["window", "event"];
                for (var e = ba, f; f = d.shift();)if (null != e[f])e = e[f]; else {
                    d = null;
                    break a
                }
                d = e
            }
            f = d;
            d = new zc(f, this);
            e = !0;
            if (!(0 > f.keyCode || void 0 != f.returnValue)) {
                a:{
                    var g = !1;
                    if (0 == f.keyCode)try {
                        f.keyCode = -1;
                        break a
                    } catch (h) {
                        g = !0
                    }
                    if (g || void 0 == f.returnValue)f.returnValue = !0
                }
                f = [];
                for (g = d.b; g; g = g.parentNode)f.push(g);
                for (var g = b.type, k = f.length - 1; !d.f && 0 <= k; k--) {
                    d.b = f[k];
                    var n = Zc(f[k], g, !0, d), e = e && n
                }
                for (k = 0; !d.f && k < f.length; k++)d.b = f[k], n =
                    Zc(f[k], g, !1, d), e = e && n
            }
            return e
        }
        return $c(b, new zc(c, this))
    }

    function Sc(b) {
        b = b[Nc];
        return b instanceof Ic ? b : null
    }

    var ad = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function Qc(b) {
        if (ka(b))return b;
        b[ad] || (b[ad] = function (c) {
            return b.handleEvent(c)
        });
        return b[ad]
    };
    function bd(b) {
        return function () {
            return b
        }
    }

    var cd = bd(!1), dd = bd(!0);

    function ed(b) {
        return b
    }

    function gd(b) {
        var c;
        c = c || 0;
        return function () {
            return b.apply(this, Array.prototype.slice.call(arguments, 0, c))
        }
    }

    function hd(b) {
        var c = arguments, d = c.length;
        return function () {
            for (var b, f = 0; f < d; f++)b = c[f].apply(this, arguments);
            return b
        }
    }

    function id(b) {
        var c = arguments, d = c.length;
        return function () {
            for (var b = 0; b < d; b++)if (!c[b].apply(this, arguments))return !1;
            return !0
        }
    };
    function jd() {
        pc.call(this);
        this.gb = new Ic(this);
        this.Ig = this;
        this.Vd = null
    }

    u(jd, pc);
    jd.prototype[Dc] = !0;
    l = jd.prototype;
    l.addEventListener = function (b, c, d, e) {
        z(this, b, c, d, e)
    };
    l.removeEventListener = function (b, c, d, e) {
        Xc(this, b, c, d, e)
    };
    l.dispatchEvent = function (b) {
        var c, d = this.Vd;
        if (d)for (c = []; d; d = d.Vd)c.push(d);
        var d = this.Ig, e = b.type || b;
        if (ia(b))b = new uc(b, d); else if (b instanceof uc)b.target = b.target || d; else {
            var f = b;
            b = new uc(e, d);
            Eb(b, f)
        }
        var f = !0, g;
        if (c)for (var h = c.length - 1; !b.f && 0 <= h; h--)g = b.b = c[h], f = kd(g, e, !0, b) && f;
        b.f || (g = b.b = d, f = kd(g, e, !0, b) && f, b.f || (f = kd(g, e, !1, b) && f));
        if (c)for (h = 0; !b.f && h < c.length; h++)g = b.b = c[h], f = kd(g, e, !1, b) && f;
        return f
    };
    l.M = function () {
        jd.S.M.call(this);
        if (this.gb) {
            var b = this.gb, c = 0, d;
            for (d in b.a) {
                for (var e = b.a[d], f = 0; f < e.length; f++)++c, Hc(e[f]);
                delete b.a[d];
                b.c--
            }
        }
        this.Vd = null
    };
    l.La = function (b, c, d, e) {
        return this.gb.add(String(b), c, !1, d, e)
    };
    l.Fe = function (b, c, d, e) {
        return this.gb.remove(String(b), c, d, e)
    };
    function kd(b, c, d, e) {
        c = b.gb.a[String(c)];
        if (!c)return !0;
        c = c.concat();
        for (var f = !0, g = 0; g < c.length; ++g) {
            var h = c[g];
            if (h && !h.uc && h.vc == d) {
                var k = h.Xb, n = h.qd || h.src;
                h.Xc && Kc(b.gb, h);
                f = !1 !== k.call(n, e) && f
            }
        }
        return f && 0 != e.Zf
    }

    function ld(b, c, d) {
        return Mc(b.gb, m(c) ? String(c) : void 0, d)
    };
    function md() {
        jd.call(this);
        this.c = 0
    }

    u(md, jd);
    function nd(b) {
        Yc(b)
    }

    l = md.prototype;
    l.l = function () {
        ++this.c;
        this.dispatchEvent("change")
    };
    l.A = function () {
        return this.c
    };
    l.u = function (b, c, d) {
        return z(this, b, c, !1, d)
    };
    l.B = function (b, c, d) {
        return Wc(this, b, c, !1, d)
    };
    l.v = function (b, c, d) {
        Xc(this, b, c, !1, d)
    };
    l.C = nd;
    function od(b, c, d) {
        uc.call(this, b);
        this.key = c;
        this.oldValue = d
    }

    u(od, uc);
    function pd(b, c, d, e) {
        this.source = b;
        this.target = c;
        this.b = d;
        this.c = e;
        this.d = this.a = ed
    }

    pd.prototype.e = function (b, c) {
        var d = rd(this.source, this.b);
        this.a = b;
        this.d = c;
        sd(this.source, this.b, d)
    };
    function td(b) {
        md.call(this);
        ma(this);
        this.o = {};
        this.Ra = {};
        this.ec = {};
        m(b) && this.G(b)
    }

    u(td, md);
    var ud = {}, vd = {}, wd = {};

    function xd(b) {
        return ud.hasOwnProperty(b) ? ud[b] : ud[b] = "change:" + b
    }

    function rd(b, c) {
        var d = vd.hasOwnProperty(c) ? vd[c] : vd[c] = "get" + (String(c.charAt(0)).toUpperCase() + String(c.substr(1)).toLowerCase()), d = x(b, d);
        return m(d) ? d.call(b) : b.get(c)
    }

    l = td.prototype;
    l.O = function (b, c, d) {
        d = d || b;
        this.P(b);
        var e = xd(d);
        this.ec[b] = z(c, e, function (c) {
            sd(this, b, c.oldValue)
        }, void 0, this);
        c = new pd(this, c, b, d);
        this.Ra[b] = c;
        sd(this, b, this.o[b]);
        return c
    };
    l.get = function (b) {
        var c, d = this.Ra;
        d.hasOwnProperty(b) ? (b = d[b], c = rd(b.target, b.c), c = b.d(c)) : this.o.hasOwnProperty(b) && (c = this.o[b]);
        return c
    };
    l.I = function () {
        var b = this.Ra, c;
        if (xb(this.o)) {
            if (xb(b))return [];
            c = b
        } else if (xb(b))c = this.o; else {
            c = {};
            for (var d in this.o)c[d] = !0;
            for (d in b)c[d] = !0
        }
        return sb(c)
    };
    l.L = function () {
        var b = {}, c;
        for (c in this.o)b[c] = this.o[c];
        for (c in this.Ra)b[c] = this.get(c);
        return b
    };
    function sd(b, c, d) {
        var e;
        e = xd(c);
        b.dispatchEvent(new od(e, c, d));
        b.dispatchEvent(new od("propertychange", c, d))
    }

    l.set = function (b, c) {
        var d = this.Ra;
        if (d.hasOwnProperty(b)) {
            var e = d[b];
            c = e.a(c);
            var d = e.target, e = e.c, f = c, g = wd.hasOwnProperty(e) ? wd[e] : wd[e] = "set" + (String(e.charAt(0)).toUpperCase() + String(e.substr(1)).toLowerCase()), g = x(d, g);
            m(g) ? g.call(d, f) : d.set(e, f)
        } else d = this.o[b], this.o[b] = c, sd(this, b, d)
    };
    l.G = function (b) {
        for (var c in b)this.set(c, b[c])
    };
    l.P = function (b) {
        var c = this.ec, d = c[b];
        d && (delete c[b], Yc(d), c = this.get(b), delete this.Ra[b], this.o[b] = c)
    };
    l.R = function () {
        for (var b in this.ec)this.P(b)
    };
    function yd(b, c) {
        b[0] += c[0];
        b[1] += c[1];
        return b
    }

    function zd(b, c) {
        var d = b[0], e = b[1], f = c[0], g = c[1], h = f[0], f = f[1], k = g[0], g = g[1], n = k - h, p = g - f, d = 0 === n && 0 === p ? 0 : (n * (d - h) + p * (e - f)) / (n * n + p * p || 0);
        0 >= d || (1 <= d ? (h = k, f = g) : (h += d * n, f += d * p));
        return [h, f]
    }

    function Ad(b, c) {
        var d = Zb(b + 180, 360) - 180, e = Math.abs(Math.round(3600 * d));
        return Math.floor(e / 3600) + "\u00b0 " + Math.floor(e / 60 % 60) + "\u2032 " + Math.floor(e % 60) + "\u2033 " + c.charAt(0 > d ? 1 : 0)
    }

    function Bd(b, c, d) {
        return m(b) ? c.replace("{x}", b[0].toFixed(d)).replace("{y}", b[1].toFixed(d)) : ""
    }

    function Cd(b, c) {
        for (var d = !0, e = b.length - 1; 0 <= e; --e)if (b[e] != c[e]) {
            d = !1;
            break
        }
        return d
    }

    function Dd(b, c) {
        var d = Math.cos(c), e = Math.sin(c), f = b[1] * d + b[0] * e;
        b[0] = b[0] * d - b[1] * e;
        b[1] = f;
        return b
    }

    function Ed(b, c) {
        var d = b[0] - c[0], e = b[1] - c[1];
        return d * d + e * e
    }

    function Fd(b, c) {
        return Bd(b, "{x}, {y}", c)
    };
    function Gd(b) {
        this.length = b.length || b;
        for (var c = 0; c < this.length; c++)this[c] = b[c] || 0
    }

    Gd.prototype.a = 4;
    Gd.prototype.set = function (b, c) {
        c = c || 0;
        for (var d = 0; d < b.length && c + d < this.length; d++)this[c + d] = b[d]
    };
    Gd.prototype.toString = Array.prototype.join;
    "undefined" == typeof Float32Array && (Gd.BYTES_PER_ELEMENT = 4, Gd.prototype.BYTES_PER_ELEMENT = Gd.prototype.a, Gd.prototype.set = Gd.prototype.set, Gd.prototype.toString = Gd.prototype.toString, t("Float32Array", Gd, void 0));
    function Hd(b) {
        this.length = b.length || b;
        for (var c = 0; c < this.length; c++)this[c] = b[c] || 0
    }

    Hd.prototype.a = 8;
    Hd.prototype.set = function (b, c) {
        c = c || 0;
        for (var d = 0; d < b.length && c + d < this.length; d++)this[c + d] = b[d]
    };
    Hd.prototype.toString = Array.prototype.join;
    if ("undefined" == typeof Float64Array) {
        try {
            Hd.BYTES_PER_ELEMENT = 8
        } catch (Id) {
        }
        Hd.prototype.BYTES_PER_ELEMENT = Hd.prototype.a;
        Hd.prototype.set = Hd.prototype.set;
        Hd.prototype.toString = Hd.prototype.toString;
        t("Float64Array", Hd, void 0)
    }
    ;
    function Jd(b, c, d, e, f) {
        b[0] = c;
        b[1] = d;
        b[2] = e;
        b[3] = f
    };
    function Kd() {
        var b = Array(16);
        Ld(b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return b
    }

    function Md() {
        var b = Array(16);
        Ld(b, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return b
    }

    function Ld(b, c, d, e, f, g, h, k, n, p, q, r, s, v, y, C, F) {
        b[0] = c;
        b[1] = d;
        b[2] = e;
        b[3] = f;
        b[4] = g;
        b[5] = h;
        b[6] = k;
        b[7] = n;
        b[8] = p;
        b[9] = q;
        b[10] = r;
        b[11] = s;
        b[12] = v;
        b[13] = y;
        b[14] = C;
        b[15] = F
    }

    function Nd(b, c) {
        b[0] = c[0];
        b[1] = c[1];
        b[2] = c[2];
        b[3] = c[3];
        b[4] = c[4];
        b[5] = c[5];
        b[6] = c[6];
        b[7] = c[7];
        b[8] = c[8];
        b[9] = c[9];
        b[10] = c[10];
        b[11] = c[11];
        b[12] = c[12];
        b[13] = c[13];
        b[14] = c[14];
        b[15] = c[15]
    }

    function Od(b) {
        b[0] = 1;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        b[4] = 0;
        b[5] = 1;
        b[6] = 0;
        b[7] = 0;
        b[8] = 0;
        b[9] = 0;
        b[10] = 1;
        b[11] = 0;
        b[12] = 0;
        b[13] = 0;
        b[14] = 0;
        b[15] = 1
    }

    function Pd(b, c, d) {
        var e = b[0], f = b[1], g = b[2], h = b[3], k = b[4], n = b[5], p = b[6], q = b[7], r = b[8], s = b[9], v = b[10], y = b[11], C = b[12], F = b[13], G = b[14];
        b = b[15];
        var w = c[0], U = c[1], N = c[2], Y = c[3], T = c[4], qa = c[5], vb = c[6], Ka = c[7], ac = c[8], Sb = c[9], La = c[10], Pa = c[11], Ud = c[12], qd = c[13], fd = c[14];
        c = c[15];
        d[0] = e * w + k * U + r * N + C * Y;
        d[1] = f * w + n * U + s * N + F * Y;
        d[2] = g * w + p * U + v * N + G * Y;
        d[3] = h * w + q * U + y * N + b * Y;
        d[4] = e * T + k * qa + r * vb + C * Ka;
        d[5] = f * T + n * qa + s * vb + F * Ka;
        d[6] = g * T + p * qa + v * vb + G * Ka;
        d[7] = h * T + q * qa + y * vb + b * Ka;
        d[8] = e * ac + k * Sb + r * La + C * Pa;
        d[9] = f * ac + n * Sb + s * La + F * Pa;
        d[10] = g * ac + p * Sb + v * La + G * Pa;
        d[11] = h * ac + q * Sb + y * La + b * Pa;
        d[12] = e * Ud + k * qd + r * fd + C * c;
        d[13] = f * Ud + n * qd + s * fd + F * c;
        d[14] = g * Ud + p * qd + v * fd + G * c;
        d[15] = h * Ud + q * qd + y * fd + b * c
    }

    function Qd(b, c, d) {
        var e = b[1] * c + b[5] * d + 0 * b[9] + b[13], f = b[2] * c + b[6] * d + 0 * b[10] + b[14], g = b[3] * c + b[7] * d + 0 * b[11] + b[15];
        b[12] = b[0] * c + b[4] * d + 0 * b[8] + b[12];
        b[13] = e;
        b[14] = f;
        b[15] = g
    }

    function Rd(b, c, d) {
        Ld(b, b[0] * c, b[1] * c, b[2] * c, b[3] * c, b[4] * d, b[5] * d, b[6] * d, b[7] * d, 1 * b[8], 1 * b[9], 1 * b[10], 1 * b[11], b[12], b[13], b[14], b[15])
    }

    function Sd(b, c) {
        var d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], k = b[5], n = b[6], p = b[7], q = Math.cos(c), r = Math.sin(c);
        b[0] = d * q + h * r;
        b[1] = e * q + k * r;
        b[2] = f * q + n * r;
        b[3] = g * q + p * r;
        b[4] = d * -r + h * q;
        b[5] = e * -r + k * q;
        b[6] = f * -r + n * q;
        b[7] = g * -r + p * q
    }

    new Float64Array(3);
    new Float64Array(3);
    new Float64Array(4);
    new Float64Array(4);
    new Float64Array(4);
    new Float64Array(16);
    function Td(b) {
        for (var c = Vd(), d = 0, e = b.length; d < e; ++d) {
            var f = c, g = b[d];
            g[0] < f[0] && (f[0] = g[0]);
            g[0] > f[2] && (f[2] = g[0]);
            g[1] < f[1] && (f[1] = g[1]);
            g[1] > f[3] && (f[3] = g[1])
        }
        return c
    }

    function Wd(b, c, d) {
        var e = Math.min.apply(null, b), f = Math.min.apply(null, c);
        b = Math.max.apply(null, b);
        c = Math.max.apply(null, c);
        return Xd(e, f, b, c, d)
    }

    function Yd(b, c, d) {
        return m(d) ? (d[0] = b[0] - c, d[1] = b[1] - c, d[2] = b[2] + c, d[3] = b[3] + c, d) : [b[0] - c, b[1] - c, b[2] + c, b[3] + c]
    }

    function Zd(b, c, d) {
        c = c < b[0] ? b[0] - c : b[2] < c ? c - b[2] : 0;
        b = d < b[1] ? b[1] - d : b[3] < d ? d - b[3] : 0;
        return c * c + b * b
    }

    function $d(b, c) {
        return b[0] <= c[0] && c[2] <= b[2] && b[1] <= c[1] && c[3] <= b[3]
    }

    function ae(b, c, d) {
        return b[0] <= c && c <= b[2] && b[1] <= d && d <= b[3]
    }

    function be(b, c) {
        var d = b[1], e = b[2], f = b[3], g = c[0], h = c[1], k = 0;
        g < b[0] ? k = k | 16 : g > e && (k = k | 4);
        h < d ? k |= 8 : h > f && (k |= 2);
        0 === k && (k = 1);
        return k
    }

    function Vd() {
        return [Infinity, Infinity, -Infinity, -Infinity]
    }

    function Xd(b, c, d, e, f) {
        return m(f) ? (f[0] = b, f[1] = c, f[2] = d, f[3] = e, f) : [b, c, d, e]
    }

    function ce(b, c) {
        var d = b[0], e = b[1];
        return Xd(d, e, d, e, c)
    }

    function de(b, c) {
        return b[0] == c[0] && b[2] == c[2] && b[1] == c[1] && b[3] == c[3]
    }

    function ee(b, c) {
        c[0] < b[0] && (b[0] = c[0]);
        c[2] > b[2] && (b[2] = c[2]);
        c[1] < b[1] && (b[1] = c[1]);
        c[3] > b[3] && (b[3] = c[3]);
        return b
    }

    function fe(b, c, d, e, f) {
        for (; d < e; d += f) {
            var g = b, h = c[d], k = c[d + 1];
            g[0] = Math.min(g[0], h);
            g[1] = Math.min(g[1], k);
            g[2] = Math.max(g[2], h);
            g[3] = Math.max(g[3], k)
        }
        return b
    }

    function ge(b, c) {
        var d;
        return (d = c.call(void 0, he(b))) || (d = c.call(void 0, ie(b))) || (d = c.call(void 0, je(b))) ? d : (d = c.call(void 0, ie(b))) ? d : !1
    }

    function he(b) {
        return [b[0], b[1]]
    }

    function ie(b) {
        return [b[2], b[1]]
    }

    function ke(b) {
        return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]
    }

    function le(b, c) {
        var d;
        "bottom-left" === c ? d = he(b) : "bottom-right" === c ? d = ie(b) : "top-left" === c ? d = me(b) : "top-right" === c && (d = je(b));
        return d
    }

    function ne(b, c, d, e) {
        var f = c * e[0] / 2;
        e = c * e[1] / 2;
        c = Math.cos(d);
        d = Math.sin(d);
        f = [-f, -f, f, f];
        e = [-e, e, -e, e];
        var g, h, k;
        for (g = 0; 4 > g; ++g)h = f[g], k = e[g], f[g] = b[0] + h * c - k * d, e[g] = b[1] + h * d + k * c;
        return Wd(f, e, void 0)
    }

    function oe(b) {
        return b[3] - b[1]
    }

    function pe(b, c, d) {
        d = m(d) ? d : Vd();
        qe(b, c) && (d[0] = b[0] > c[0] ? b[0] : c[0], d[1] = b[1] > c[1] ? b[1] : c[1], d[2] = b[2] < c[2] ? b[2] : c[2], d[3] = b[3] < c[3] ? b[3] : c[3]);
        return d
    }

    function me(b) {
        return [b[0], b[3]]
    }

    function je(b) {
        return [b[2], b[3]]
    }

    function re(b) {
        return b[2] - b[0]
    }

    function qe(b, c) {
        return b[0] <= c[2] && b[2] >= c[0] && b[1] <= c[3] && b[3] >= c[1]
    }

    function se(b) {
        return b[2] < b[0] || b[3] < b[1]
    }

    function te(b, c) {
        return m(c) ? (c[0] = b[0], c[1] = b[1], c[2] = b[2], c[3] = b[3], c) : b
    }

    function ue(b, c) {
        var d = (b[2] - b[0]) / 2 * (c - 1), e = (b[3] - b[1]) / 2 * (c - 1);
        b[0] -= d;
        b[2] += d;
        b[1] -= e;
        b[3] += e
    }

    function we(b, c, d) {
        b = [b[0], b[1], b[0], b[3], b[2], b[1], b[2], b[3]];
        c(b, b, 2);
        return Wd([b[0], b[2], b[4], b[6]], [b[1], b[3], b[5], b[7]], d)
    };
    /*

     Latitude/longitude spherical geodesy formulae taken from
     http://www.movable-type.co.uk/scripts/latlong.html
     Licenced under CC-BY-3.0.
     */
    function xe(b) {
        this.radius = b
    }

    function ye(b, c) {
        var d = bc(b[1]), e = bc(c[1]), f = (e - d) / 2, g = bc(c[0] - b[0]) / 2, d = Math.sin(f) * Math.sin(f) + Math.sin(g) * Math.sin(g) * Math.cos(d) * Math.cos(e);
        return 2 * ze.radius * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d))
    }

    xe.prototype.offset = function (b, c, d) {
        var e = bc(b[1]);
        c /= this.radius;
        var f = Math.asin(Math.sin(e) * Math.cos(c) + Math.cos(e) * Math.sin(c) * Math.cos(d));
        return [180 * (bc(b[0]) + Math.atan2(Math.sin(d) * Math.sin(c) * Math.cos(e), Math.cos(c) - Math.sin(e) * Math.sin(f))) / Math.PI, 180 * f / Math.PI]
    };
    var ze = new xe(6370997);
    var Ae = {};
    Ae.degrees = 2 * Math.PI * ze.radius / 360;
    Ae.ft = .3048;
    Ae.m = 1;
    function Be(b) {
        this.a = b.code;
        this.c = b.units;
        this.g = m(b.extent) ? b.extent : null;
        this.d = m(b.worldExtent) ? b.worldExtent : null;
        this.b = m(b.axisOrientation) ? b.axisOrientation : "enu";
        this.f = m(b.global) ? b.global : !1;
        this.e = null
    }

    l = Be.prototype;
    l.gh = function () {
        return this.a
    };
    l.D = function () {
        return this.g
    };
    l.rj = function () {
        return this.c
    };
    l.ie = function () {
        return Ae[this.c]
    };
    l.Mh = function () {
        return this.d
    };
    function Ce(b) {
        return b.b
    }

    l.wi = function () {
        return this.f
    };
    l.sj = function (b) {
        this.g = b
    };
    l.pl = function (b) {
        this.d = b
    };
    l.je = function (b, c) {
        if ("degrees" == this.c)return b;
        var d = De(this, Ee("EPSG:4326")), e = [c[0] - b / 2, c[1], c[0] + b / 2, c[1], c[0], c[1] - b / 2, c[0], c[1] + b / 2], e = d(e, e, 2), d = (ye(e.slice(0, 2), e.slice(2, 4)) + ye(e.slice(4, 6), e.slice(6, 8))) / 2, e = this.ie();
        m(e) && (d /= e);
        return d
    };
    var Fe = {}, Ge = {};

    function He(b) {
        Ie(b);
        Ta(b, function (c) {
            Ta(b, function (b) {
                c !== b && Je(c, b, Ke)
            })
        })
    }

    function Le() {
        var b = Me, c = Ne, d = Oe;
        Ta(Pe, function (e) {
            Ta(b, function (b) {
                Je(e, b, c);
                Je(b, e, d)
            })
        })
    }

    function Qe(b) {
        Fe[b.a] = b;
        Je(b, b, Ke)
    }

    function Ie(b) {
        var c = [];
        Ta(b, function (b) {
            c.push(Qe(b))
        })
    }

    function Re(b) {
        return null != b ? ia(b) ? Ee(b) : b : Ee("EPSG:3857")
    }

    function Je(b, c, d) {
        b = b.a;
        c = c.a;
        b in Ge || (Ge[b] = {});
        Ge[b][c] = d
    }

    function Se(b, c, d, e) {
        b = Ee(b);
        c = Ee(c);
        Je(b, c, Te(d));
        Je(c, b, Te(e))
    }

    function Te(b) {
        return function (c, d, e) {
            var f = c.length;
            e = m(e) ? e : 2;
            d = m(d) ? d : Array(f);
            var g, h;
            for (h = 0; h < f; h += e)for (g = b([c[h], c[h + 1]]), d[h] = g[0], d[h + 1] = g[1], g = e - 1; 2 <= g; --g)d[h + g] = c[h + g];
            return d
        }
    }

    function Ee(b) {
        var c;
        if (b instanceof Be)c = b; else if (ia(b)) {
            if (c = Fe[b], !m(c) && "function" == typeof proj4) {
                var d = proj4.defs(b);
                if (m(d)) {
                    c = d.units;
                    !m(c) && m(d.to_meter) && (c = d.to_meter.toString(), Ae[c] = d.to_meter);
                    c = new Be({code: b, units: c, axisOrientation: d.axis});
                    Qe(c);
                    var e, f, g;
                    for (e in Fe)f = proj4.defs(e), m(f) && (g = Ee(e), f === d ? He([g, c]) : (f = proj4(e, b), Se(g, c, f.forward, f.inverse)))
                } else c = null
            }
        } else c = null;
        return c
    }

    function Ue(b, c) {
        return b === c ? !0 : b.c != c.c ? !1 : De(b, c) === Ke
    }

    function Ve(b, c) {
        var d = Ee(b), e = Ee(c);
        return De(d, e)
    }

    function De(b, c) {
        var d = b.a, e = c.a, f;
        d in Ge && e in Ge[d] && (f = Ge[d][e]);
        m(f) || (f = We);
        return f
    }

    function We(b, c) {
        if (m(c) && b !== c) {
            for (var d = 0, e = b.length; d < e; ++d)c[d] = b[d];
            b = c
        }
        return b
    }

    function Ke(b, c) {
        var d;
        if (m(c)) {
            d = 0;
            for (var e = b.length; d < e; ++d)c[d] = b[d];
            d = c
        } else d = b.slice();
        return d
    }

    function Xe(b, c, d) {
        c = Ve(c, d);
        return we(b, c)
    };
    function A(b) {
        td.call(this);
        b = m(b) ? b : {};
        this.j = [0, 0];
        var c = {};
        c.center = m(b.center) ? b.center : null;
        this.q = Re(b.projection);
        var d, e, f, g = m(b.minZoom) ? b.minZoom : 0;
        d = m(b.maxZoom) ? b.maxZoom : 28;
        var h = m(b.zoomFactor) ? b.zoomFactor : 2;
        if (m(b.resolutions))d = b.resolutions, e = d[0], f = d[d.length - 1], d = fc(d); else {
            e = Re(b.projection);
            f = e.D();
            var k = (null === f ? 360 * Ae.degrees / Ae[e.c] : Math.max(re(f), oe(f))) / 256 / Math.pow(2, 0), n = k / Math.pow(2, 28);
            e = b.maxResolution;
            m(e) ? g = 0 : e = k / Math.pow(h, g);
            f = b.minResolution;
            m(f) || (f = m(b.maxZoom) ?
                m(b.maxResolution) ? e / Math.pow(h, d) : k / Math.pow(h, d) : n);
            d = g + Math.floor(Math.log(e / f) / Math.log(h));
            f = e / Math.pow(h, d - g);
            d = gc(h, e, d - g)
        }
        this.f = e;
        this.F = f;
        this.p = g;
        g = m(b.extent) ? cc(b.extent) : dc;
        (m(b.enableRotation) ? b.enableRotation : 1) ? (e = b.constrainRotation, e = m(e) && !0 !== e ? !1 === e ? ic : ja(e) ? jc(e) : ic : kc()) : e = hc;
        this.t = new lc(g, d, e);
        m(b.resolution) ? c.resolution = b.resolution : m(b.zoom) && (c.resolution = this.constrainResolution(this.f, b.zoom - this.p));
        c.rotation = m(b.rotation) ? b.rotation : 0;
        this.G(c)
    }

    u(A, td);
    A.prototype.i = function (b) {
        return this.t.center(b)
    };
    A.prototype.constrainResolution = function (b, c, d) {
        return this.t.resolution(b, c || 0, d || 0)
    };
    A.prototype.constrainRotation = function (b, c) {
        return this.t.rotation(b, c || 0)
    };
    A.prototype.a = function () {
        return this.get("center")
    };
    A.prototype.getCenter = A.prototype.a;
    A.prototype.g = function (b) {
        var c = this.a(), d = this.b();
        return [c[0] - d * b[0] / 2, c[1] - d * b[1] / 2, c[0] + d * b[0] / 2, c[1] + d * b[1] / 2]
    };
    A.prototype.J = function () {
        return this.q
    };
    A.prototype.b = function () {
        return this.get("resolution")
    };
    A.prototype.getResolution = A.prototype.b;
    A.prototype.n = function (b, c) {
        return Math.max(re(b) / c[0], oe(b) / c[1])
    };
    function Ye(b) {
        var c = b.f, d = Math.log(c / b.F) / Math.log(2);
        return function (b) {
            return c / Math.pow(2, b * d)
        }
    }

    A.prototype.e = function () {
        return this.get("rotation")
    };
    A.prototype.getRotation = A.prototype.e;
    function Ze(b) {
        var c = b.f, d = Math.log(c / b.F) / Math.log(2);
        return function (b) {
            return Math.log(c / b) / Math.log(2) / d
        }
    }

    function $e(b) {
        var c = b.a(), d = b.q, e = b.b();
        b = b.e();
        return {center: c.slice(), projection: m(d) ? d : null, resolution: e, rotation: m(b) ? b : 0}
    }

    l = A.prototype;
    l.Oh = function () {
        var b, c = this.b();
        if (m(c)) {
            var d, e = 0;
            do {
                d = this.constrainResolution(this.f, e);
                if (d == c) {
                    b = e;
                    break
                }
                ++e
            } while (d > this.F)
        }
        return m(b) ? this.p + b : b
    };
    l.ge = function (b, c) {
        if (!se(b)) {
            this.Oa(ke(b));
            var d = this.n(b, c), e = this.constrainResolution(d, 0, 0);
            e < d && (e = this.constrainResolution(e, -1, 0));
            this.d(e)
        }
    };
    l.dh = function (b, c, d) {
        var e = m(d) ? d : {};
        d = m(e.padding) ? e.padding : [0, 0, 0, 0];
        var f = m(e.constrainResolution) ? e.constrainResolution : !0, g = m(e.nearest) ? e.nearest : !1, h;
        m(e.minResolution) ? h = e.minResolution : m(e.maxZoom) ? h = this.constrainResolution(this.f, e.maxZoom - this.p, 0) : h = 0;
        var k = b.k, n = this.e(), e = Math.cos(-n), n = Math.sin(-n), p = Infinity, q = Infinity, r = -Infinity, s = -Infinity;
        b = b.s;
        for (var v = 0, y = k.length; v < y; v += b)var C = k[v] * e - k[v + 1] * n, F = k[v] * n + k[v + 1] * e, p = Math.min(p, C), q = Math.min(q, F), r = Math.max(r, C), s = Math.max(s,
            F);
        c = this.n([p, q, r, s], [c[0] - d[1] - d[3], c[1] - d[0] - d[2]]);
        c = isNaN(c) ? h : Math.max(c, h);
        f && (h = this.constrainResolution(c, 0, 0), !g && h < c && (h = this.constrainResolution(h, -1, 0)), c = h);
        this.d(c);
        n = -n;
        g = (p + r) / 2 + (d[1] - d[3]) / 2 * c;
        d = (q + s) / 2 + (d[0] - d[2]) / 2 * c;
        this.Oa([g * e - d * n, d * e + g * n])
    };
    l.Yg = function (b, c, d) {
        var e = this.e(), f = Math.cos(-e), e = Math.sin(-e), g = b[0] * f - b[1] * e;
        b = b[1] * f + b[0] * e;
        var h = this.b(), g = g + (c[0] / 2 - d[0]) * h;
        b += (d[1] - c[1] / 2) * h;
        e = -e;
        this.Oa([g * f - b * e, b * f + g * e])
    };
    function af(b) {
        return null != b.a() && m(b.b())
    }

    l.rotate = function (b, c) {
        if (m(c)) {
            var d, e = this.a();
            m(e) && (d = [e[0] - c[0], e[1] - c[1]], Dd(d, b - this.e()), yd(d, c));
            this.Oa(d)
        }
        this.r(b)
    };
    l.Oa = function (b) {
        this.set("center", b)
    };
    A.prototype.setCenter = A.prototype.Oa;
    function bf(b, c) {
        b.j[1] += c
    }

    A.prototype.d = function (b) {
        this.set("resolution", b)
    };
    A.prototype.setResolution = A.prototype.d;
    A.prototype.r = function (b) {
        this.set("rotation", b)
    };
    A.prototype.setRotation = A.prototype.r;
    A.prototype.Q = function (b) {
        b = this.constrainResolution(this.f, b - this.p, 0);
        this.d(b)
    };
    function cf(b) {
        return 1 - Math.pow(1 - b, 3)
    };
    function df(b) {
        return 3 * b * b - 2 * b * b * b
    }

    function ef(b) {
        return b
    }

    function ff(b) {
        return .5 > b ? df(2 * b) : 1 - df(2 * (b - .5))
    };
    function gf(b) {
        var c = b.source, d = m(b.start) ? b.start : ua(), e = c[0], f = c[1], g = m(b.duration) ? b.duration : 1E3, h = m(b.easing) ? b.easing : df;
        return function (b, c) {
            if (c.time < d)return c.animate = !0, c.viewHints[0] += 1, !0;
            if (c.time < d + g) {
                var p = 1 - h((c.time - d) / g), q = e - c.viewState.center[0], r = f - c.viewState.center[1];
                c.animate = !0;
                c.viewState.center[0] += p * q;
                c.viewState.center[1] += p * r;
                c.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }

    function hf(b) {
        var c = m(b.rotation) ? b.rotation : 0, d = m(b.start) ? b.start : ua(), e = m(b.duration) ? b.duration : 1E3, f = m(b.easing) ? b.easing : df, g = m(b.anchor) ? b.anchor : null;
        return function (b, k) {
            if (k.time < d)return k.animate = !0, k.viewHints[0] += 1, !0;
            if (k.time < d + e) {
                var n = 1 - f((k.time - d) / e), n = (c - k.viewState.rotation) * n;
                k.animate = !0;
                k.viewState.rotation += n;
                if (null !== g) {
                    var p = k.viewState.center;
                    p[0] -= g[0];
                    p[1] -= g[1];
                    Dd(p, n);
                    yd(p, g)
                }
                k.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }

    function jf(b) {
        var c = b.resolution, d = m(b.start) ? b.start : ua(), e = m(b.duration) ? b.duration : 1E3, f = m(b.easing) ? b.easing : df;
        return function (b, h) {
            if (h.time < d)return h.animate = !0, h.viewHints[0] += 1, !0;
            if (h.time < d + e) {
                var k = 1 - f((h.time - d) / e), n = c - h.viewState.resolution;
                h.animate = !0;
                h.viewState.resolution += k * n;
                h.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    };
    function kf(b, c, d, e) {
        return m(e) ? (e[0] = b, e[1] = c, e[2] = d, e) : [b, c, d]
    }

    function lf(b, c, d) {
        return b + "/" + c + "/" + d
    }

    function mf(b) {
        var c = b[0], d = Array(c), e = 1 << c - 1, f, g;
        for (f = 0; f < c; ++f)g = 48, b[1] & e && (g += 1), b[2] & e && (g += 2), d[f] = String.fromCharCode(g), e >>= 1;
        return d.join("")
    }

    function nf(b) {
        return lf(b[0], b[1], b[2])
    };
    function of(b, c, d, e) {
        this.a = b;
        this.d = c;
        this.b = d;
        this.c = e
    }

    function pf(b, c, d, e, f) {
        return m(f) ? (f.a = b, f.d = c, f.b = d, f.c = e, f) : new of(b, c, d, e)
    }

    of.prototype.contains = function (b) {
        return qf(this, b[1], b[2])
    };
    function rf(b, c) {
        return b.a <= c.a && c.d <= b.d && b.b <= c.b && c.c <= b.c
    }

    function qf(b, c, d) {
        return b.a <= c && c <= b.d && b.b <= d && d <= b.c
    }

    function sf(b, c) {
        return b.a == c.a && b.b == c.b && b.d == c.d && b.c == c.c
    };
    function tf(b) {
        this.c = b.html;
        this.a = m(b.tileRanges) ? b.tileRanges : null
    }

    tf.prototype.b = function () {
        return this.c
    };
    var uf = !Hb || Hb && 9 <= Vb;
    !Ib && !Hb || Hb && Hb && 9 <= Vb || Ib && Tb("1.9.1");
    Hb && Tb("9");
    Fb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    Fb("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    Fb("embed", "iframe", "link", "object", "script", "style", "template");
    function vf(b, c) {
        this.x = m(b) ? b : 0;
        this.y = m(c) ? c : 0
    }

    l = vf.prototype;
    l.clone = function () {
        return new vf(this.x, this.y)
    };
    l.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    l.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    l.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.x *= b;
        this.y *= d;
        return this
    };
    function wf(b, c) {
        this.width = b;
        this.height = c
    }

    l = wf.prototype;
    l.clone = function () {
        return new wf(this.width, this.height)
    };
    l.ia = function () {
        return !(this.width * this.height)
    };
    l.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.width *= b;
        this.height *= d;
        return this
    };
    function xf(b) {
        return b ? new yf(zf(b)) : ya || (ya = new yf)
    }

    function Af(b) {
        var c = document;
        return ia(b) ? c.getElementById(b) : b
    }

    function Cf(b, c) {
        ob(c, function (c, e) {
            "style" == e ? b.style.cssText = c : "class" == e ? b.className = c : "for" == e ? b.htmlFor = c : e in Df ? b.setAttribute(Df[e], c) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? b.setAttribute(e, c) : b[e] = c
        })
    }

    var Df = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };

    function Ef(b) {
        b = b.document.documentElement;
        return new wf(b.clientWidth, b.clientHeight)
    }

    function Ff(b, c, d) {
        var e = arguments, f = document, g = e[0], h = e[1];
        if (!uf && h && (h.name || h.type)) {
            g = ["<", g];
            h.name && g.push(' name="', Ba(h.name), '"');
            if (h.type) {
                g.push(' type="', Ba(h.type), '"');
                var k = {};
                Eb(k, h);
                delete k.type;
                h = k
            }
            g.push(">");
            g = g.join("")
        }
        g = f.createElement(g);
        h && (ia(h) ? g.className = h : ga(h) ? g.className = h.join(" ") : Cf(g, h));
        2 < e.length && Gf(f, g, e, 2);
        return g
    }

    function Gf(b, c, d, e) {
        function f(d) {
            d && c.appendChild(ia(d) ? b.createTextNode(d) : d)
        }

        for (; e < d.length; e++) {
            var g = d[e];
            !ha(g) || la(g) && 0 < g.nodeType ? f(g) : Ta(Hf(g) ? cb(g) : g, f)
        }
    }

    function If(b) {
        return document.createElement(b)
    }

    function Jf(b, c) {
        Gf(zf(b), b, arguments, 1)
    }

    function Kf(b) {
        for (var c; c = b.firstChild;)b.removeChild(c)
    }

    function Lf(b, c) {
        c.parentNode && c.parentNode.insertBefore(b, c.nextSibling)
    }

    function Mf(b, c, d) {
        b.insertBefore(c, b.childNodes[d] || null)
    }

    function Nf(b) {
        b && b.parentNode && b.parentNode.removeChild(b)
    }

    function Of(b) {
        if (void 0 != b.firstElementChild)b = b.firstElementChild; else for (b = b.firstChild; b && 1 != b.nodeType;)b = b.nextSibling;
        return b
    }

    function Pf(b, c) {
        if (b.contains && 1 == c.nodeType)return b == c || b.contains(c);
        if ("undefined" != typeof b.compareDocumentPosition)return b == c || Boolean(b.compareDocumentPosition(c) & 16);
        for (; c && b != c;)c = c.parentNode;
        return c == b
    }

    function zf(b) {
        return 9 == b.nodeType ? b : b.ownerDocument || b.document
    }

    function Qf(b, c) {
        if ("textContent"in b)b.textContent = c; else if (3 == b.nodeType)b.data = c; else if (b.firstChild && 3 == b.firstChild.nodeType) {
            for (; b.lastChild != b.firstChild;)b.removeChild(b.lastChild);
            b.firstChild.data = c
        } else Kf(b), b.appendChild(zf(b).createTextNode(String(c)))
    }

    function Hf(b) {
        if (b && "number" == typeof b.length) {
            if (la(b))return "function" == typeof b.item || "string" == typeof b.item;
            if (ka(b))return "function" == typeof b.item
        }
        return !1
    }

    function yf(b) {
        this.a = b || ba.document || document
    }

    function Rf() {
        return !0
    }

    function Sf(b) {
        var c = b.a;
        b = Jb ? c.body || c.documentElement : c.documentElement;
        c = c.parentWindow || c.defaultView;
        return Hb && Tb("10") && c.pageYOffset != b.scrollTop ? new vf(b.scrollLeft, b.scrollTop) : new vf(c.pageXOffset || b.scrollLeft, c.pageYOffset || b.scrollTop)
    }

    yf.prototype.appendChild = function (b, c) {
        b.appendChild(c)
    };
    yf.prototype.contains = Pf;
    function Tf(b, c) {
        var d = If("CANVAS");
        m(b) && (d.width = b);
        m(c) && (d.height = c);
        return d.getContext("2d")
    }

    var Uf = function () {
        var b;
        return function () {
            if (!m(b))if (ba.getComputedStyle) {
                var c = If("P"), d, e = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
                document.body.appendChild(c);
                for (var f in e)f in c.style && (c.style[f] = "translate(1px,1px)", d = ba.getComputedStyle(c).getPropertyValue(e[f]));
                Nf(c);
                b = d && "none" !== d
            } else b = !1;
            return b
        }
    }(), Vf = function () {
        var b;
        return function () {
            if (!m(b))if (ba.getComputedStyle) {
                var c = If("P"),
                    d, e = {
                        webkitTransform: "-webkit-transform",
                        OTransform: "-o-transform",
                        msTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                document.body.appendChild(c);
                for (var f in e)f in c.style && (c.style[f] = "translate3d(1px,1px,1px)", d = ba.getComputedStyle(c).getPropertyValue(e[f]));
                Nf(c);
                b = d && "none" !== d
            } else b = !1;
            return b
        }
    }();

    function Wf(b, c) {
        var d = b.style;
        d.WebkitTransform = c;
        d.MozTransform = c;
        d.a = c;
        d.msTransform = c;
        d.transform = c;
        Hb && !Xb && (b.style.transformOrigin = "0 0")
    }

    function Xf(b, c) {
        var d;
        if (Vf()) {
            if (m(6)) {
                var e = Array(16);
                for (d = 0; 16 > d; ++d)e[d] = c[d].toFixed(6);
                d = e.join(",")
            } else d = c.join(",");
            Wf(b, "matrix3d(" + d + ")")
        } else if (Uf()) {
            e = [c[0], c[1], c[4], c[5], c[12], c[13]];
            if (m(6)) {
                var f = Array(6);
                for (d = 0; 6 > d; ++d)f[d] = e[d].toFixed(6);
                d = f.join(",")
            } else d = e.join(",");
            Wf(b, "matrix(" + d + ")")
        } else b.style.left = Math.round(c[12]) + "px", b.style.top = Math.round(c[13]) + "px"
    };
    var Yf = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];

    function Zf(b, c) {
        var d, e, f = Yf.length;
        for (e = 0; e < f; ++e)try {
            if (d = b.getContext(Yf[e], c), null !== d)return d
        } catch (g) {
        }
        return null
    };
    var $f, ag = ba.devicePixelRatio || 1, bg = "ArrayBuffer"in ba, cg = !1, dg = function () {
        if (!("HTMLCanvasElement"in ba))return !1;
        try {
            var b = Tf();
            if (null === b)return !1;
            m(b.setLineDash) && (cg = !0);
            return !0
        } catch (c) {
            return !1
        }
    }(), eg = "DeviceOrientationEvent"in ba, fg = "geolocation"in ba.navigator, gg = "ontouchstart"in ba, hg = "PointerEvent"in ba, ig = !!ba.navigator.msPointerEnabled, jg = !1, kg, lg = [];
    if ("WebGLRenderingContext"in ba)try {
        var mg = If("CANVAS"), ng = Zf(mg, {bh: !0});
        null !== ng && (jg = !0, kg = ng.getParameter(ng.MAX_TEXTURE_SIZE), lg = ng.getSupportedExtensions())
    } catch (og) {
    }
    $f = jg;
    wa = lg;
    va = kg;
    function pg(b, c, d) {
        uc.call(this, b, d);
        this.element = c
    }

    u(pg, uc);
    function B(b) {
        td.call(this);
        this.a = b || [];
        qg(this)
    }

    u(B, td);
    l = B.prototype;
    l.clear = function () {
        for (; 0 < this.Ib();)this.pop()
    };
    l.qf = function (b) {
        var c, d;
        c = 0;
        for (d = b.length; c < d; ++c)this.push(b[c]);
        return this
    };
    l.forEach = function (b, c) {
        Ta(this.a, b, c)
    };
    l.Mi = function () {
        return this.a
    };
    l.item = function (b) {
        return this.a[b]
    };
    l.Ib = function () {
        return this.get("length")
    };
    l.rd = function (b, c) {
        eb(this.a, b, 0, c);
        qg(this);
        this.dispatchEvent(new pg("add", c, this))
    };
    l.pop = function () {
        return this.De(this.Ib() - 1)
    };
    l.push = function (b) {
        var c = this.a.length;
        this.rd(c, b);
        return c
    };
    l.remove = function (b) {
        var c = this.a, d, e;
        d = 0;
        for (e = c.length; d < e; ++d)if (c[d] === b)return this.De(d)
    };
    l.De = function (b) {
        var c = this.a[b];
        Sa.splice.call(this.a, b, 1);
        qg(this);
        this.dispatchEvent(new pg("remove", c, this));
        return c
    };
    l.bl = function (b, c) {
        var d = this.Ib();
        if (b < d)d = this.a[b], this.a[b] = c, this.dispatchEvent(new pg("remove", d, this)), this.dispatchEvent(new pg("add", c, this)); else {
            for (; d < b; ++d)this.rd(d, void 0);
            this.rd(b, c)
        }
    };
    function qg(b) {
        b.set("length", b.a.length)
    };
    var rg = /^#(?:[0-9a-f]{3}){1,2}$/i, sg = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i, tg = /^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;

    function ug(b) {
        return ga(b) ? b : vg(b)
    }

    function wg(b) {
        if (!ia(b)) {
            var c = b[0];
            c != (c | 0) && (c = c + .5 | 0);
            var d = b[1];
            d != (d | 0) && (d = d + .5 | 0);
            var e = b[2];
            e != (e | 0) && (e = e + .5 | 0);
            b = "rgba(" + c + "," + d + "," + e + "," + b[3] + ")"
        }
        return b
    }

    var vg = function () {
        var b = {}, c = 0;
        return function (d) {
            var e;
            if (b.hasOwnProperty(d))e = b[d]; else {
                if (1024 <= c) {
                    e = 0;
                    for (var f in b)0 === (e++ & 3) && (delete b[f], --c)
                }
                var g, h;
                rg.exec(d) ? (h = 3 == d.length - 1 ? 1 : 2, e = parseInt(d.substr(1 + 0 * h, h), 16), f = parseInt(d.substr(1 + 1 * h, h), 16), g = parseInt(d.substr(1 + 2 * h, h), 16), 1 == h && (e = (e << 4) + e, f = (f << 4) + f, g = (g << 4) + g), e = [e, f, g, 1]) : (h = tg.exec(d)) ? (e = Number(h[1]), f = Number(h[2]), g = Number(h[3]), h = Number(h[4]), e = [e, f, g, h], e = xg(e, e)) : (h = sg.exec(d)) ? (e = Number(h[1]), f = Number(h[2]), g = Number(h[3]),
                    e = [e, f, g, 1], e = xg(e, e)) : e = void 0;
                b[d] = e;
                ++c
            }
            return e
        }
    }();

    function xg(b, c) {
        var d = m(c) ? c : [];
        d[0] = Yb(b[0] + .5 | 0, 0, 255);
        d[1] = Yb(b[1] + .5 | 0, 0, 255);
        d[2] = Yb(b[2] + .5 | 0, 0, 255);
        d[3] = Yb(b[3], 0, 1);
        return d
    };
    function yg() {
        this.g = Kd();
        this.c = void 0;
        this.a = Kd();
        this.d = void 0;
        this.b = Kd();
        this.f = void 0;
        this.e = Kd();
        this.i = void 0;
        this.o = Kd()
    }

    function zg(b, c, d, e, f) {
        var g = !1;
        m(c) && c !== b.c && (g = b.a, Od(g), g[12] = c, g[13] = c, g[14] = c, g[15] = 1, b.c = c, g = !0);
        if (m(d) && d !== b.d) {
            g = b.b;
            Od(g);
            g[0] = d;
            g[5] = d;
            g[10] = d;
            g[15] = 1;
            var h = -.5 * d + .5;
            g[12] = h;
            g[13] = h;
            g[14] = h;
            g[15] = 1;
            b.d = d;
            g = !0
        }
        m(e) && e !== b.f && (g = Math.cos(e), h = Math.sin(e), Ld(b.e, .213 + .787 * g - .213 * h, .213 - .213 * g + .143 * h, .213 - .213 * g - .787 * h, 0, .715 - .715 * g - .715 * h, .715 + .285 * g + .14 * h, .715 - .715 * g + .715 * h, 0, .072 - .072 * g + .928 * h, .072 - .072 * g - .283 * h, .072 + .928 * g + .072 * h, 0, 0, 0, 0, 1), b.f = e, g = !0);
        m(f) && f !== b.i && (Ld(b.o, .213 + .787 *
        f, .213 - .213 * f, .213 - .213 * f, 0, .715 - .715 * f, .715 + .285 * f, .715 - .715 * f, 0, .072 - .072 * f, .072 - .072 * f, .072 + .928 * f, 0, 0, 0, 0, 1), b.i = f, g = !0);
        g && (g = b.g, Od(g), m(d) && Pd(g, b.b, g), m(c) && Pd(g, b.a, g), m(f) && Pd(g, b.o, g), m(e) && Pd(g, b.e, g));
        return b.g
    };
    function Ag(b) {
        if (b.classList)return b.classList;
        b = b.className;
        return ia(b) && b.match(/\S+/g) || []
    }

    function Bg(b, c) {
        return b.classList ? b.classList.contains(c) : Za(Ag(b), c)
    }

    function Cg(b, c) {
        b.classList ? b.classList.add(c) : Bg(b, c) || (b.className += 0 < b.className.length ? " " + c : c)
    }

    function Dg(b, c) {
        b.classList ? b.classList.remove(c) : Bg(b, c) && (b.className = Ua(Ag(b), function (b) {
            return b != c
        }).join(" "))
    }

    function Eg(b, c) {
        Bg(b, c) ? Dg(b, c) : Cg(b, c)
    };
    function Fg(b, c, d, e) {
        this.top = b;
        this.right = c;
        this.bottom = d;
        this.left = e
    }

    l = Fg.prototype;
    l.clone = function () {
        return new Fg(this.top, this.right, this.bottom, this.left)
    };
    l.contains = function (b) {
        return this && b ? b instanceof Fg ? b.left >= this.left && b.right <= this.right && b.top >= this.top && b.bottom <= this.bottom : b.x >= this.left && b.x <= this.right && b.y >= this.top && b.y <= this.bottom : !1
    };
    l.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    l.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    l.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.left *= b;
        this.right *= b;
        this.top *= d;
        this.bottom *= d;
        return this
    };
    function Gg(b, c, d, e) {
        this.left = b;
        this.top = c;
        this.width = d;
        this.height = e
    }

    l = Gg.prototype;
    l.clone = function () {
        return new Gg(this.left, this.top, this.width, this.height)
    };
    l.contains = function (b) {
        return b instanceof Gg ? this.left <= b.left && this.left + this.width >= b.left + b.width && this.top <= b.top && this.top + this.height >= b.top + b.height : b.x >= this.left && b.x <= this.left + this.width && b.y >= this.top && b.y <= this.top + this.height
    };
    function Hg(b, c) {
        var d = c.x < b.left ? b.left - c.x : Math.max(c.x - (b.left + b.width), 0), e = c.y < b.top ? b.top - c.y : Math.max(c.y - (b.top + b.height), 0);
        return d * d + e * e
    }

    l.distance = function (b) {
        return Math.sqrt(Hg(this, b))
    };
    l.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.left *= b;
        this.width *= b;
        this.top *= d;
        this.height *= d;
        return this
    };
    function Ig(b, c) {
        var d = zf(b);
        return d.defaultView && d.defaultView.getComputedStyle && (d = d.defaultView.getComputedStyle(b, null)) ? d[c] || d.getPropertyValue(c) || "" : ""
    }

    function Jg(b, c) {
        return Ig(b, c) || (b.currentStyle ? b.currentStyle[c] : null) || b.style && b.style[c]
    }

    function Kg(b, c, d) {
        var e, f = Ib && (Kb || Nb) && Tb("1.9");
        c instanceof vf ? (e = c.x, c = c.y) : (e = c, c = d);
        b.style.left = Lg(e, f);
        b.style.top = Lg(c, f)
    }

    function Mg(b) {
        var c;
        try {
            c = b.getBoundingClientRect()
        } catch (d) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        Hb && b.ownerDocument.body && (b = b.ownerDocument, c.left -= b.documentElement.clientLeft + b.body.clientLeft, c.top -= b.documentElement.clientTop + b.body.clientTop);
        return c
    }

    function Ng(b) {
        if (Hb && !(Hb && 8 <= Vb))return b.offsetParent;
        var c = zf(b), d = Jg(b, "position"), e = "fixed" == d || "absolute" == d;
        for (b = b.parentNode; b && b != c; b = b.parentNode)if (d = Jg(b, "position"), e = e && "static" == d && b != c.documentElement && b != c.body, !e && (b.scrollWidth > b.clientWidth || b.scrollHeight > b.clientHeight || "fixed" == d || "absolute" == d || "relative" == d))return b;
        return null
    }

    function Og(b) {
        if (1 == b.nodeType) {
            var c;
            if (b.getBoundingClientRect)c = Mg(b), c = new vf(c.left, c.top); else {
                c = Sf(xf(b));
                var d, e = zf(b), f = Jg(b, "position"), g = Ib && e.getBoxObjectFor && !b.getBoundingClientRect && "absolute" == f && (d = e.getBoxObjectFor(b)) && (0 > d.screenX || 0 > d.screenY), h = new vf(0, 0), k;
                d = e ? zf(e) : document;
                k = !Hb || Hb && 9 <= Vb || Rf(xf(d)) ? d.documentElement : d.body;
                if (b != k)if (b.getBoundingClientRect)d = Mg(b), e = Sf(xf(e)), h.x = d.left + e.x, h.y = d.top + e.y; else if (e.getBoxObjectFor && !g)d = e.getBoxObjectFor(b), e = e.getBoxObjectFor(k),
                    h.x = d.screenX - e.screenX, h.y = d.screenY - e.screenY; else {
                    d = b;
                    do {
                        h.x += d.offsetLeft;
                        h.y += d.offsetTop;
                        d != b && (h.x += d.clientLeft || 0, h.y += d.clientTop || 0);
                        if (Jb && "fixed" == Jg(d, "position")) {
                            h.x += e.body.scrollLeft;
                            h.y += e.body.scrollTop;
                            break
                        }
                        d = d.offsetParent
                    } while (d && d != b);
                    if (Gb || Jb && "absolute" == f)h.y -= e.body.offsetTop;
                    for (d = b; (d = Ng(d)) && d != e.body && d != k;)h.x -= d.scrollLeft, Gb && "TR" == d.tagName || (h.y -= d.scrollTop)
                }
                c = new vf(h.x - c.x, h.y - c.y)
            }
            if (Ib && !Tb(12)) {
                b:{
                    h = Qa();
                    if (void 0 === b.style[h] && (h = (Jb ? "Webkit" : Ib ? "Moz" :
                            Hb ? "ms" : Gb ? "O" : null) + Ra(h), void 0 !== b.style[h])) {
                        h = (Jb ? "-webkit" : Ib ? "-moz" : Hb ? "-ms" : Gb ? "-o" : null) + "-transform";
                        break b
                    }
                    h = "transform"
                }
                b = (b = Jg(b, h) || Jg(b, "transform")) ? (b = b.match(Pg)) ? new vf(parseFloat(b[1]), parseFloat(b[2])) : new vf(0, 0) : new vf(0, 0);
                b = new vf(c.x + b.x, c.y + b.y)
            } else b = c;
            return b
        }
        c = ka(b.fh);
        h = b;
        b.targetTouches && b.targetTouches.length ? h = b.targetTouches[0] : c && b.a.targetTouches && b.a.targetTouches.length && (h = b.a.targetTouches[0]);
        return new vf(h.clientX, h.clientY)
    }

    function Lg(b, c) {
        "number" == typeof b && (b = (c ? Math.round(b) : b) + "px");
        return b
    }

    function Qg(b) {
        var c = Rg;
        if ("none" != Jg(b, "display"))return c(b);
        var d = b.style, e = d.display, f = d.visibility, g = d.position;
        d.visibility = "hidden";
        d.position = "absolute";
        d.display = "inline";
        b = c(b);
        d.display = e;
        d.position = g;
        d.visibility = f;
        return b
    }

    function Rg(b) {
        var c = b.offsetWidth, d = b.offsetHeight, e = Jb && !c && !d;
        return m(c) && !e || !b.getBoundingClientRect ? new wf(c, d) : (b = Mg(b), new wf(b.right - b.left, b.bottom - b.top))
    }

    function Sg(b, c) {
        b.style.display = c ? "" : "none"
    }

    function Tg(b, c, d, e) {
        if (/^\d+px?$/.test(c))return parseInt(c, 10);
        var f = b.style[d], g = b.runtimeStyle[d];
        b.runtimeStyle[d] = b.currentStyle[d];
        b.style[d] = c;
        c = b.style[e];
        b.style[d] = f;
        b.runtimeStyle[d] = g;
        return c
    }

    function Ug(b, c) {
        var d = b.currentStyle ? b.currentStyle[c] : null;
        return d ? Tg(b, d, "left", "pixelLeft") : 0
    }

    function Vg(b, c) {
        if (Hb) {
            var d = Ug(b, c + "Left"), e = Ug(b, c + "Right"), f = Ug(b, c + "Top"), g = Ug(b, c + "Bottom");
            return new Fg(f, e, g, d)
        }
        d = Ig(b, c + "Left");
        e = Ig(b, c + "Right");
        f = Ig(b, c + "Top");
        g = Ig(b, c + "Bottom");
        return new Fg(parseFloat(f), parseFloat(e), parseFloat(g), parseFloat(d))
    }

    var Wg = {thin: 2, medium: 4, thick: 6};

    function Xg(b, c) {
        if ("none" == (b.currentStyle ? b.currentStyle[c + "Style"] : null))return 0;
        var d = b.currentStyle ? b.currentStyle[c + "Width"] : null;
        return d in Wg ? Wg[d] : Tg(b, d, "left", "pixelLeft")
    }

    function Yg(b) {
        if (Hb && !(Hb && 9 <= Vb)) {
            var c = Xg(b, "borderLeft"), d = Xg(b, "borderRight"), e = Xg(b, "borderTop");
            b = Xg(b, "borderBottom");
            return new Fg(e, d, b, c)
        }
        c = Ig(b, "borderLeftWidth");
        d = Ig(b, "borderRightWidth");
        e = Ig(b, "borderTopWidth");
        b = Ig(b, "borderBottomWidth");
        return new Fg(parseFloat(e), parseFloat(d), parseFloat(b), parseFloat(c))
    }

    var Pg = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;

    function Zg(b, c, d) {
        uc.call(this, b);
        this.map = c;
        this.frameState = m(d) ? d : null
    }

    u(Zg, uc);
    function $g(b) {
        td.call(this);
        this.element = m(b.element) ? b.element : null;
        this.i = m(b.target) ? Af(b.target) : null;
        this.a = null;
        this.n = [];
        this.render = m(b.render) ? b.render : ca
    }

    u($g, td);
    $g.prototype.M = function () {
        Nf(this.element);
        $g.S.M.call(this)
    };
    $g.prototype.d = function () {
        return this.a
    };
    $g.prototype.setMap = function (b) {
        null === this.a || Nf(this.element);
        0 != this.n.length && (Ta(this.n, Yc), this.n.length = 0);
        this.a = b;
        null !== this.a && ((null === this.i ? b.t : this.i).appendChild(this.element), this.render !== ca && this.n.push(z(b, "postrender", this.render, !1, this)), b.render())
    };
    function ah(b) {
        b = m(b) ? b : {};
        this.q = If("UL");
        this.j = If("LI");
        this.q.appendChild(this.j);
        Sg(this.j, !1);
        this.b = m(b.collapsed) ? b.collapsed : !0;
        this.f = m(b.collapsible) ? b.collapsible : !0;
        this.f || (this.b = !1);
        var c = m(b.className) ? b.className : "ol-attribution", d = m(b.tipLabel) ? b.tipLabel : "Attributions";
        this.r = m(b.collapseLabel) ? b.collapseLabel : "\u00bb";
        this.F = m(b.label) ? b.label : "i";
        this.t = Ff("SPAN", {}, this.f && !this.b ? this.r : this.F);
        d = Ff("BUTTON", {type: "button", title: d}, this.t);
        z(d, "click", this.cj, !1, this);
        z(d,
            ["mouseout", xc], function () {
                this.blur()
            }, !1);
        c = Ff("DIV", c + " ol-unselectable ol-control" + (this.b && this.f ? " ol-collapsed" : "") + (this.f ? "" : " ol-uncollapsible"), this.q, d);
        $g.call(this, {element: c, render: m(b.render) ? b.render : bh, target: b.target});
        this.p = !0;
        this.g = {};
        this.e = {};
        this.J = {}
    }

    u(ah, $g);
    function bh(b) {
        b = b.frameState;
        if (null === b)this.p && (Sg(this.element, !1), this.p = !1); else {
            var c, d, e, f, g, h, k, n, p, q = b.layerStatesArray, r = Cb(b.attributions), s = {};
            d = 0;
            for (c = q.length; d < c; d++)if (e = q[d].layer.a(), null !== e && (p = ma(e).toString(), n = e.e, null !== n))for (e = 0, f = n.length; e < f; e++)if (h = n[e], k = ma(h).toString(), !(k in r)) {
                g = b.usedTiles[p];
                var v;
                if (v = m(g))a:if (null === h.a)v = !0; else {
                    var y = v = void 0, C = void 0, F = void 0;
                    for (F in g)if (F in h.a)for (C = g[F], v = 0, y = h.a[F].length; v < y; ++v) {
                        var G = h.a[F][v];
                        if (G.a <= C.d && G.d >=
                            C.a && G.b <= C.c && G.c >= C.b) {
                            v = !0;
                            break a
                        }
                    }
                    v = !1
                }
                v ? (k in s && delete s[k], r[k] = h) : s[k] = h
            }
            c = [r, s];
            d = c[0];
            c = c[1];
            for (var w in this.g)w in d ? (this.e[w] || (Sg(this.g[w], !0), this.e[w] = !0), delete d[w]) : w in c ? (this.e[w] && (Sg(this.g[w], !1), delete this.e[w]), delete c[w]) : (Nf(this.g[w]), delete this.g[w], delete this.e[w]);
            for (w in d)p = If("LI"), p.innerHTML = d[w].c, this.q.appendChild(p), this.g[w] = p, this.e[w] = !0;
            for (w in c)p = If("LI"), p.innerHTML = c[w].c, Sg(p, !1), this.q.appendChild(p), this.g[w] = p;
            w = !xb(this.e) || !xb(b.logos);
            this.p != w && (Sg(this.element, w), this.p = w);
            w && xb(this.e) ? Cg(this.element, "ol-logo-only") : Dg(this.element, "ol-logo-only");
            var U;
            b = b.logos;
            w = this.J;
            for (U in w)U in b || (Nf(w[U]), delete w[U]);
            for (var N in b)N in w || (U = new Image, U.src = N, d = b[N], "" === d ? d = U : (d = Ff("A", {href: d}), d.appendChild(U)), this.j.appendChild(d), w[N] = d);
            Sg(this.j, !xb(b))
        }
    }

    l = ah.prototype;
    l.cj = function (b) {
        b.preventDefault();
        ch(this)
    };
    function ch(b) {
        Eg(b.element, "ol-collapsed");
        Qf(b.t, b.b ? b.r : b.F);
        b.b = !b.b
    }

    l.bj = function () {
        return this.f
    };
    l.ej = function (b) {
        this.f !== b && (this.f = b, Eg(this.element, "ol-uncollapsible"), !b && this.b && ch(this))
    };
    l.dj = function (b) {
        this.f && this.b !== b && ch(this)
    };
    l.aj = function () {
        return this.b
    };
    function dh(b) {
        b = m(b) ? b : {};
        var c = m(b.className) ? b.className : "ol-rotate";
        this.b = Ff("SPAN", "ol-compass", m(b.label) ? b.label : "\u21e7");
        var d = Ff("BUTTON", {
            "class": c + "-reset",
            type: "button",
            title: m(b.tipLabel) ? b.tipLabel : "Reset rotation"
        }, this.b);
        z(d, "click", dh.prototype.j, !1, this);
        z(d, ["mouseout", xc], function () {
            this.blur()
        }, !1);
        c = Ff("DIV", c + " ol-unselectable ol-control", d);
        $g.call(this, {element: c, render: m(b.render) ? b.render : eh, target: b.target});
        this.f = m(b.duration) ? b.duration : 250;
        this.e = m(b.autoHide) ? b.autoHide :
            !0;
        this.g = void 0;
        this.e && Cg(this.element, "ol-hidden")
    }

    u(dh, $g);
    dh.prototype.j = function (b) {
        b.preventDefault();
        b = this.a;
        var c = b.a();
        if (null !== c) {
            for (var d = c.e(); d < -Math.PI;)d += 2 * Math.PI;
            for (; d > Math.PI;)d -= 2 * Math.PI;
            m(d) && (0 < this.f && b.Ua(hf({rotation: d, duration: this.f, easing: cf})), c.r(0))
        }
    };
    function eh(b) {
        b = b.frameState;
        if (null !== b) {
            b = b.viewState.rotation;
            if (b != this.g) {
                var c = "rotate(" + 180 * b / Math.PI + "deg)";
                if (this.e) {
                    var d = this.element;
                    0 === b ? Cg(d, "ol-hidden") : Dg(d, "ol-hidden")
                }
                this.b.style.msTransform = c;
                this.b.style.webkitTransform = c;
                this.b.style.transform = c
            }
            this.g = b
        }
    };
    function fh(b) {
        b = m(b) ? b : {};
        var c = m(b.className) ? b.className : "ol-zoom", d = m(b.delta) ? b.delta : 1, e = m(b.zoomOutLabel) ? b.zoomOutLabel : "\u2212", f = m(b.zoomOutTipLabel) ? b.zoomOutTipLabel : "Zoom out", g = Ff("BUTTON", {
            "class": c + "-in",
            type: "button",
            title: m(b.zoomInTipLabel) ? b.zoomInTipLabel : "Zoom in"
        }, m(b.zoomInLabel) ? b.zoomInLabel : "+");
        z(g, "click", ta(fh.prototype.e, d), !1, this);
        z(g, ["mouseout", xc], function () {
            this.blur()
        }, !1);
        e = Ff("BUTTON", {"class": c + "-out", type: "button", title: f}, e);
        z(e, "click", ta(fh.prototype.e,
            -d), !1, this);
        z(e, ["mouseout", xc], function () {
            this.blur()
        }, !1);
        c = Ff("DIV", c + " ol-unselectable ol-control", g, e);
        $g.call(this, {element: c, target: b.target});
        this.b = m(b.duration) ? b.duration : 250
    }

    u(fh, $g);
    fh.prototype.e = function (b, c) {
        c.preventDefault();
        var d = this.a, e = d.a();
        if (null !== e) {
            var f = e.b();
            m(f) && (0 < this.b && d.Ua(jf({
                resolution: f,
                duration: this.b,
                easing: cf
            })), d = e.constrainResolution(f, b), e.d(d))
        }
    };
    function gh(b) {
        b = m(b) ? b : {};
        var c = new B;
        (m(b.zoom) ? b.zoom : 1) && c.push(new fh(b.zoomOptions));
        (m(b.rotate) ? b.rotate : 1) && c.push(new dh(b.rotateOptions));
        (m(b.attribution) ? b.attribution : 1) && c.push(new ah(b.attributionOptions));
        return c
    };
    var hh = Jb ? "webkitfullscreenchange" : Ib ? "mozfullscreenchange" : Hb ? "MSFullscreenChange" : "fullscreenchange";

    function ih() {
        var b = xf().a, c = b.body;
        return !!(c.webkitRequestFullscreen || c.mozRequestFullScreen && b.mozFullScreenEnabled || c.msRequestFullscreen && b.msFullscreenEnabled || c.requestFullscreen && b.fullscreenEnabled)
    }

    function jh(b) {
        b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.msRequestFullscreen ? b.msRequestFullscreen() : b.requestFullscreen && b.requestFullscreen()
    }

    function kh() {
        var b = xf().a;
        return !!(b.webkitIsFullScreen || b.mozFullScreen || b.msFullscreenElement || b.fullscreenElement)
    };
    function lh(b) {
        b = m(b) ? b : {};
        this.b = m(b.className) ? b.className : "ol-full-screen";
        var c = m(b.tipLabel) ? b.tipLabel : "Toggle full-screen", c = Ff("BUTTON", {
            "class": this.b + "-" + kh(),
            type: "button",
            title: c
        });
        z(c, "click", this.g, !1, this);
        z(c, ["mouseout", xc], function () {
            this.blur()
        }, !1);
        z(ba.document, hh, this.e, !1, this);
        var d = this.b + " ol-unselectable ol-control " + (ih() ? "" : "ol-unsupported"), c = Ff("DIV", d, c);
        $g.call(this, {element: c, target: b.target});
        this.f = m(b.keys) ? b.keys : !1
    }

    u(lh, $g);
    lh.prototype.g = function (b) {
        b.preventDefault();
        ih() && (b = this.a, null !== b && (kh() ? (b = xf().a, b.webkitCancelFullScreen ? b.webkitCancelFullScreen() : b.mozCancelFullScreen ? b.mozCancelFullScreen() : b.msExitFullscreen ? b.msExitFullscreen() : b.exitFullscreen && b.exitFullscreen()) : (b = b.qc(), b = Af(b), this.f ? b.mozRequestFullScreenWithKeys ? b.mozRequestFullScreenWithKeys() : b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : jh(b) : jh(b))))
    };
    lh.prototype.e = function () {
        var b = this.b + "-true", c = this.b + "-false", d = Of(this.element), e = this.a;
        kh() ? Bg(d, c) && (Dg(d, c), Cg(d, b)) : Bg(d, b) && (Dg(d, b), Cg(d, c));
        null === e || e.j()
    };
    function mh(b) {
        b = m(b) ? b : {};
        var c = Ff("DIV", m(b.className) ? b.className : "ol-mouse-position");
        $g.call(this, {element: c, render: m(b.render) ? b.render : nh, target: b.target});
        z(this, xd("projection"), this.J, !1, this);
        m(b.coordinateFormat) && this.r(b.coordinateFormat);
        m(b.projection) && this.q(Ee(b.projection));
        this.Q = m(b.undefinedHTML) ? b.undefinedHTML : "";
        this.j = c.innerHTML;
        this.f = this.e = this.b = null
    }

    u(mh, $g);
    function nh(b) {
        b = b.frameState;
        null === b ? this.b = null : this.b != b.viewState.projection && (this.b = b.viewState.projection, this.e = null);
        oh(this, this.f)
    }

    mh.prototype.J = function () {
        this.e = null
    };
    mh.prototype.g = function () {
        return this.get("coordinateFormat")
    };
    mh.prototype.getCoordinateFormat = mh.prototype.g;
    mh.prototype.p = function () {
        return this.get("projection")
    };
    mh.prototype.getProjection = mh.prototype.p;
    mh.prototype.t = function (b) {
        this.f = this.a.ad(b.a);
        oh(this, this.f)
    };
    mh.prototype.F = function () {
        oh(this, null);
        this.f = null
    };
    mh.prototype.setMap = function (b) {
        mh.S.setMap.call(this, b);
        null !== b && (b = b.b, this.n.push(z(b, "mousemove", this.t, !1, this), z(b, "mouseout", this.F, !1, this)))
    };
    mh.prototype.r = function (b) {
        this.set("coordinateFormat", b)
    };
    mh.prototype.setCoordinateFormat = mh.prototype.r;
    mh.prototype.q = function (b) {
        this.set("projection", b)
    };
    mh.prototype.setProjection = mh.prototype.q;
    function oh(b, c) {
        var d = b.Q;
        if (null !== c && null !== b.b) {
            if (null === b.e) {
                var e = b.p();
                b.e = m(e) ? De(b.b, e) : We
            }
            e = b.a.Ga(c);
            null !== e && (b.e(e, e), d = b.g(), d = m(d) ? d(e) : e.toString())
        }
        m(b.j) && d == b.j || (b.element.innerHTML = d, b.j = d)
    };
    function ph(b) {
        if ("function" == typeof b.kb)return b.kb();
        if (ia(b))return b.split("");
        if (ha(b)) {
            for (var c = [], d = b.length, e = 0; e < d; e++)c.push(b[e]);
            return c
        }
        return rb(b)
    }

    function qh(b, c) {
        if ("function" == typeof b.forEach)b.forEach(c, void 0); else if (ha(b) || ia(b))Ta(b, c, void 0); else {
            var d;
            if ("function" == typeof b.I)d = b.I(); else if ("function" != typeof b.kb)if (ha(b) || ia(b)) {
                d = [];
                for (var e = b.length, f = 0; f < e; f++)d.push(f)
            } else d = sb(b); else d = void 0;
            for (var e = ph(b), f = e.length, g = 0; g < f; g++)c.call(void 0, e[g], d && d[g], b)
        }
    };
    function rh(b, c) {
        this.c = {};
        this.a = [];
        this.b = 0;
        var d = arguments.length;
        if (1 < d) {
            if (d % 2)throw Error("Uneven number of arguments");
            for (var e = 0; e < d; e += 2)this.set(arguments[e], arguments[e + 1])
        } else if (b) {
            b instanceof rh ? (d = b.I(), e = b.kb()) : (d = sb(b), e = rb(b));
            for (var f = 0; f < d.length; f++)this.set(d[f], e[f])
        }
    }

    l = rh.prototype;
    l.Ub = function () {
        return this.b
    };
    l.kb = function () {
        sh(this);
        for (var b = [], c = 0; c < this.a.length; c++)b.push(this.c[this.a[c]]);
        return b
    };
    l.I = function () {
        sh(this);
        return this.a.concat()
    };
    l.ia = function () {
        return 0 == this.b
    };
    l.clear = function () {
        this.c = {};
        this.b = this.a.length = 0
    };
    l.remove = function (b) {
        return th(this.c, b) ? (delete this.c[b], this.b--, this.a.length > 2 * this.b && sh(this), !0) : !1
    };
    function sh(b) {
        if (b.b != b.a.length) {
            for (var c = 0, d = 0; c < b.a.length;) {
                var e = b.a[c];
                th(b.c, e) && (b.a[d++] = e);
                c++
            }
            b.a.length = d
        }
        if (b.b != b.a.length) {
            for (var f = {}, d = c = 0; c < b.a.length;)e = b.a[c], th(f, e) || (b.a[d++] = e, f[e] = 1), c++;
            b.a.length = d
        }
    }

    l.get = function (b, c) {
        return th(this.c, b) ? this.c[b] : c
    };
    l.set = function (b, c) {
        th(this.c, b) || (this.b++, this.a.push(b));
        this.c[b] = c
    };
    l.forEach = function (b, c) {
        for (var d = this.I(), e = 0; e < d.length; e++) {
            var f = d[e], g = this.get(f);
            b.call(c, g, f, this)
        }
    };
    l.clone = function () {
        return new rh(this)
    };
    function th(b, c) {
        return Object.prototype.hasOwnProperty.call(b, c)
    };
    var uh = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function vh(b) {
        if (wh) {
            wh = !1;
            var c = ba.location;
            if (c) {
                var d = c.href;
                if (d && (d = (d = vh(d)[3] || null) ? decodeURI(d) : d) && d != c.hostname)throw wh = !0, Error();
            }
        }
        return b.match(uh)
    }

    var wh = Jb;

    function xh(b) {
        if (b[1]) {
            var c = b[0], d = c.indexOf("#");
            0 <= d && (b.push(c.substr(d)), b[0] = c = c.substr(0, d));
            d = c.indexOf("?");
            0 > d ? b[1] = "?" : d == c.length - 1 && (b[1] = void 0)
        }
        return b.join("")
    }

    function yh(b, c, d) {
        if (ga(c))for (var e = 0; e < c.length; e++)yh(b, String(c[e]), d); else null != c && d.push("&", b, "" === c ? "" : "=", encodeURIComponent(String(c)))
    }

    function zh(b, c) {
        for (var d in c)yh(d, c[d], b);
        return b
    };
    function Ah(b, c) {
        var d;
        b instanceof Ah ? (this.Wb = m(c) ? c : b.Wb, Bh(this, b.Pb), this.cc = b.cc, this.pb = b.pb, Ch(this, b.sc), this.nb = b.nb, Dh(this, b.a.clone()), this.Tb = b.Tb) : b && (d = vh(String(b))) ? (this.Wb = !!c, Bh(this, d[1] || "", !0), this.cc = Fh(d[2] || ""), this.pb = Fh(d[3] || "", !0), Ch(this, d[4]), this.nb = Fh(d[5] || "", !0), Dh(this, d[6] || "", !0), this.Tb = Fh(d[7] || "")) : (this.Wb = !!c, this.a = new Gh(null, 0, this.Wb))
    }

    l = Ah.prototype;
    l.Pb = "";
    l.cc = "";
    l.pb = "";
    l.sc = null;
    l.nb = "";
    l.Tb = "";
    l.Wb = !1;
    l.toString = function () {
        var b = [], c = this.Pb;
        c && b.push(Hh(c, Ih, !0), ":");
        if (c = this.pb) {
            b.push("//");
            var d = this.cc;
            d && b.push(Hh(d, Ih, !0), "@");
            b.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            c = this.sc;
            null != c && b.push(":", String(c))
        }
        if (c = this.nb)this.pb && "/" != c.charAt(0) && b.push("/"), b.push(Hh(c, "/" == c.charAt(0) ? Jh : Kh, !0));
        (c = this.a.toString()) && b.push("?", c);
        (c = this.Tb) && b.push("#", Hh(c, Lh));
        return b.join("")
    };
    l.clone = function () {
        return new Ah(this)
    };
    function Bh(b, c, d) {
        b.Pb = d ? Fh(c, !0) : c;
        b.Pb && (b.Pb = b.Pb.replace(/:$/, ""))
    }

    function Ch(b, c) {
        if (c) {
            c = Number(c);
            if (isNaN(c) || 0 > c)throw Error("Bad port number " + c);
            b.sc = c
        } else b.sc = null
    }

    function Dh(b, c, d) {
        c instanceof Gh ? (b.a = c, Mh(b.a, b.Wb)) : (d || (c = Hh(c, Nh)), b.a = new Gh(c, 0, b.Wb))
    }

    function Oh(b) {
        return b instanceof Ah ? b.clone() : new Ah(b, void 0)
    }

    function Ph(b, c) {
        b instanceof Ah || (b = Oh(b));
        c instanceof Ah || (c = Oh(c));
        var d = b, e = c, f = d.clone(), g = !!e.Pb;
        g ? Bh(f, e.Pb) : g = !!e.cc;
        g ? f.cc = e.cc : g = !!e.pb;
        g ? f.pb = e.pb : g = null != e.sc;
        var h = e.nb;
        if (g)Ch(f, e.sc); else if (g = !!e.nb)if ("/" != h.charAt(0) && (d.pb && !d.nb ? h = "/" + h : (d = f.nb.lastIndexOf("/"), -1 != d && (h = f.nb.substr(0, d + 1) + h))), d = h, ".." == d || "." == d)h = ""; else if (-1 != d.indexOf("./") || -1 != d.indexOf("/.")) {
            for (var h = 0 == d.lastIndexOf("/", 0), d = d.split("/"), k = [], n = 0; n < d.length;) {
                var p = d[n++];
                "." == p ? h && n == d.length && k.push("") :
                    ".." == p ? ((1 < k.length || 1 == k.length && "" != k[0]) && k.pop(), h && n == d.length && k.push("")) : (k.push(p), h = !0)
            }
            h = k.join("/")
        } else h = d;
        g ? f.nb = h : g = "" !== e.a.toString();
        g ? Dh(f, Fh(e.a.toString())) : g = !!e.Tb;
        g && (f.Tb = e.Tb);
        return f
    }

    function Fh(b, c) {
        return b ? c ? decodeURI(b) : decodeURIComponent(b) : ""
    }

    function Hh(b, c, d) {
        return ia(b) ? (b = encodeURI(b).replace(c, Qh), d && (b = b.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), b) : null
    }

    function Qh(b) {
        b = b.charCodeAt(0);
        return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16)
    }

    var Ih = /[#\/\?@]/g, Kh = /[\#\?:]/g, Jh = /[\#\?]/g, Nh = /[\#\?@]/g, Lh = /#/g;

    function Gh(b, c, d) {
        this.a = b || null;
        this.c = !!d
    }

    function Rh(b) {
        if (!b.da && (b.da = new rh, b.ta = 0, b.a))for (var c = b.a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("="), f = null, g = null;
            0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
            f = decodeURIComponent(f.replace(/\+/g, " "));
            f = Sh(b, f);
            b.add(f, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
        }
    }

    l = Gh.prototype;
    l.da = null;
    l.ta = null;
    l.Ub = function () {
        Rh(this);
        return this.ta
    };
    l.add = function (b, c) {
        Rh(this);
        this.a = null;
        b = Sh(this, b);
        var d = this.da.get(b);
        d || this.da.set(b, d = []);
        d.push(c);
        this.ta++;
        return this
    };
    l.remove = function (b) {
        Rh(this);
        b = Sh(this, b);
        return th(this.da.c, b) ? (this.a = null, this.ta -= this.da.get(b).length, this.da.remove(b)) : !1
    };
    l.clear = function () {
        this.da = this.a = null;
        this.ta = 0
    };
    l.ia = function () {
        Rh(this);
        return 0 == this.ta
    };
    function Th(b, c) {
        Rh(b);
        c = Sh(b, c);
        return th(b.da.c, c)
    }

    l.I = function () {
        Rh(this);
        for (var b = this.da.kb(), c = this.da.I(), d = [], e = 0; e < c.length; e++)for (var f = b[e], g = 0; g < f.length; g++)d.push(c[e]);
        return d
    };
    l.kb = function (b) {
        Rh(this);
        var c = [];
        if (ia(b))Th(this, b) && (c = bb(c, this.da.get(Sh(this, b)))); else {
            b = this.da.kb();
            for (var d = 0; d < b.length; d++)c = bb(c, b[d])
        }
        return c
    };
    l.set = function (b, c) {
        Rh(this);
        this.a = null;
        b = Sh(this, b);
        Th(this, b) && (this.ta -= this.da.get(b).length);
        this.da.set(b, [c]);
        this.ta++;
        return this
    };
    l.get = function (b, c) {
        var d = b ? this.kb(b) : [];
        return 0 < d.length ? String(d[0]) : c
    };
    function Uh(b, c, d) {
        b.remove(c);
        0 < d.length && (b.a = null, b.da.set(Sh(b, c), cb(d)), b.ta += d.length)
    }

    l.toString = function () {
        if (this.a)return this.a;
        if (!this.da)return "";
        for (var b = [], c = this.da.I(), d = 0; d < c.length; d++)for (var e = c[d], f = encodeURIComponent(String(e)), e = this.kb(e), g = 0; g < e.length; g++) {
            var h = f;
            "" !== e[g] && (h += "=" + encodeURIComponent(String(e[g])));
            b.push(h)
        }
        return this.a = b.join("&")
    };
    l.clone = function () {
        var b = new Gh;
        b.a = this.a;
        this.da && (b.da = this.da.clone(), b.ta = this.ta);
        return b
    };
    function Sh(b, c) {
        var d = String(c);
        b.c && (d = d.toLowerCase());
        return d
    }

    function Mh(b, c) {
        c && !b.c && (Rh(b), b.a = null, b.da.forEach(function (b, c) {
            var f = c.toLowerCase();
            c != f && (this.remove(c), Uh(this, f, b))
        }, b));
        b.c = c
    };
    function Vh(b, c, d) {
        pc.call(this);
        this.d = b;
        this.b = d;
        this.a = c || window;
        this.c = sa(this.Ye, this)
    }

    u(Vh, pc);
    l = Vh.prototype;
    l.X = null;
    l.Ie = !1;
    l.start = function () {
        Wh(this);
        this.Ie = !1;
        var b = Xh(this), c = Yh(this);
        b && !c && this.a.mozRequestAnimationFrame ? (this.X = z(this.a, "MozBeforePaint", this.c), this.a.mozRequestAnimationFrame(null), this.Ie = !0) : this.X = b && c ? b.call(this.a, this.c) : this.a.setTimeout(gd(this.c), 20)
    };
    function Wh(b) {
        if (null != b.X) {
            var c = Xh(b), d = Yh(b);
            c && !d && b.a.mozRequestAnimationFrame ? Yc(b.X) : c && d ? d.call(b.a, b.X) : b.a.clearTimeout(b.X)
        }
        b.X = null
    }

    l.Ye = function () {
        this.Ie && this.X && Yc(this.X);
        this.X = null;
        this.d.call(this.b, ua())
    };
    l.M = function () {
        Wh(this);
        Vh.S.M.call(this)
    };
    function Xh(b) {
        b = b.a;
        return b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || null
    }

    function Yh(b) {
        b = b.a;
        return b.cancelRequestAnimationFrame || b.webkitCancelRequestAnimationFrame || b.mozCancelRequestAnimationFrame || b.oCancelRequestAnimationFrame || b.msCancelRequestAnimationFrame || null
    };
    function Zh(b) {
        ba.setTimeout(function () {
            throw b;
        }, 0)
    }

    function $h(b, c) {
        var d = b;
        c && (d = sa(b, c));
        d = ai(d);
        !ka(ba.setImmediate) || ba.Window && ba.Window.prototype.setImmediate == ba.setImmediate ? (bi || (bi = ci()), bi(d)) : ba.setImmediate(d)
    }

    var bi;

    function ci() {
        var b = ba.MessageChannel;
        "undefined" === typeof b && "undefined" !== typeof window && window.postMessage && window.addEventListener && (b = function () {
            var b = document.createElement("iframe");
            b.style.display = "none";
            b.src = "";
            document.documentElement.appendChild(b);
            var c = b.contentWindow, b = c.document;
            b.open();
            b.write("");
            b.close();
            var d = "callImmediate" + Math.random(), e = "file:" == c.location.protocol ? "*" : c.location.protocol + "//" + c.location.host, b = sa(function (b) {
                    if (("*" == e || b.origin == e) && b.data == d)this.port1.onmessage()
                },
                this);
            c.addEventListener("message", b, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    c.postMessage(d, e)
                }
            }
        });
        if ("undefined" !== typeof b && !nb("Trident") && !nb("MSIE")) {
            var c = new b, d = {}, e = d;
            c.port1.onmessage = function () {
                if (m(d.next)) {
                    d = d.next;
                    var b = d.Ue;
                    d.Ue = null;
                    b()
                }
            };
            return function (b) {
                e.next = {Ue: b};
                e = e.next;
                c.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in document.createElement("script") ? function (b) {
            var c = document.createElement("script");
            c.onreadystatechange = function () {
                c.onreadystatechange =
                    null;
                c.parentNode.removeChild(c);
                c = null;
                b();
                b = null
            };
            document.documentElement.appendChild(c)
        } : function (b) {
            ba.setTimeout(b, 0)
        }
    }

    var ai = ed;

    function di() {
        this.a = ua()
    }

    new di;
    di.prototype.set = function (b) {
        this.a = b
    };
    di.prototype.get = function () {
        return this.a
    };
    function ei(b) {
        jd.call(this);
        this.Pc = b || window;
        this.ld = z(this.Pc, "resize", this.oi, !1, this);
        this.md = Ef(this.Pc || window)
    }

    u(ei, jd);
    l = ei.prototype;
    l.ld = null;
    l.Pc = null;
    l.md = null;
    l.M = function () {
        ei.S.M.call(this);
        this.ld && (Yc(this.ld), this.ld = null);
        this.md = this.Pc = null
    };
    l.oi = function () {
        var b = Ef(this.Pc || window), c = this.md;
        b == c || b && c && b.width == c.width && b.height == c.height || (this.md = b, this.dispatchEvent("resize"))
    };
    function fi(b, c, d, e, f) {
        if (!(Hb || Jb && Tb("525")))return !0;
        if (Kb && f)return gi(b);
        if (f && !e)return !1;
        ja(c) && (c = hi(c));
        if (!d && (17 == c || 18 == c || Kb && 91 == c))return !1;
        if (Jb && e && d)switch (b) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
        }
        if (Hb && e && c == b)return !1;
        switch (b) {
            case 13:
                return !0;
            case 27:
                return !Jb
        }
        return gi(b)
    }

    function gi(b) {
        if (48 <= b && 57 >= b || 96 <= b && 106 >= b || 65 <= b && 90 >= b || Jb && 0 == b)return !0;
        switch (b) {
            case 32:
            case 63:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                return !0;
            default:
                return !1
        }
    }

    function hi(b) {
        if (Ib)b = ii(b); else if (Kb && Jb)a:switch (b) {
            case 93:
                b = 91;
                break a
        }
        return b
    }

    function ii(b) {
        switch (b) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return b
        }
    };
    function ji(b, c) {
        jd.call(this);
        b && ki(this, b, c)
    }

    u(ji, jd);
    l = ji.prototype;
    l.aa = null;
    l.sd = null;
    l.le = null;
    l.td = null;
    l.Ka = -1;
    l.Gb = -1;
    l.ae = !1;
    var li = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }, mi = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }, ni = Hb || Jb && Tb("525"), oi = Kb && Ib;
    ji.prototype.a = function (b) {
        Jb && (17 == this.Ka && !b.o || 18 == this.Ka && !b.c || Kb && 91 == this.Ka && !b.n) && (this.Gb = this.Ka = -1);
        -1 == this.Ka && (b.o && 17 != b.e ? this.Ka = 17 : b.c && 18 != b.e ? this.Ka = 18 : b.n && 91 != b.e && (this.Ka = 91));
        ni && !fi(b.e, this.Ka, b.d, b.o, b.c) ? this.handleEvent(b) : (this.Gb = hi(b.e), oi && (this.ae = b.c))
    };
    ji.prototype.c = function (b) {
        this.Gb = this.Ka = -1;
        this.ae = b.c
    };
    ji.prototype.handleEvent = function (b) {
        var c = b.a, d, e, f = c.altKey;
        Hb && "keypress" == b.type ? (d = this.Gb, e = 13 != d && 27 != d ? c.keyCode : 0) : Jb && "keypress" == b.type ? (d = this.Gb, e = 0 <= c.charCode && 63232 > c.charCode && gi(d) ? c.charCode : 0) : Gb ? (d = this.Gb, e = gi(d) ? c.keyCode : 0) : (d = c.keyCode || this.Gb, e = c.charCode || 0, oi && (f = this.ae), Kb && 63 == e && 224 == d && (d = 191));
        var g = d = hi(d), h = c.keyIdentifier;
        d ? 63232 <= d && d in li ? g = li[d] : 25 == d && b.d && (g = 9) : h && h in mi && (g = mi[h]);
        this.Ka = g;
        b = new pi(g, e, 0, c);
        b.c = f;
        this.dispatchEvent(b)
    };
    function ki(b, c, d) {
        b.td && qi(b);
        b.aa = c;
        b.sd = z(b.aa, "keypress", b, d);
        b.le = z(b.aa, "keydown", b.a, d, b);
        b.td = z(b.aa, "keyup", b.c, d, b)
    }

    function qi(b) {
        b.sd && (Yc(b.sd), Yc(b.le), Yc(b.td), b.sd = null, b.le = null, b.td = null);
        b.aa = null;
        b.Ka = -1;
        b.Gb = -1
    }

    ji.prototype.M = function () {
        ji.S.M.call(this);
        qi(this)
    };
    function pi(b, c, d, e) {
        zc.call(this, e);
        this.type = "key";
        this.e = b;
        this.i = c
    }

    u(pi, zc);
    function ri(b, c) {
        jd.call(this);
        var d = this.aa = b;
        (d = la(d) && 1 == d.nodeType ? this.aa : this.aa ? this.aa.body : null) && Jg(d, "direction");
        this.a = z(this.aa, Ib ? "DOMMouseScroll" : "mousewheel", this, c)
    }

    u(ri, jd);
    ri.prototype.handleEvent = function (b) {
        var c = 0, d = 0, e = 0;
        b = b.a;
        if ("mousewheel" == b.type) {
            d = 1;
            if (Hb || Jb && (Lb || Tb("532.0")))d = 40;
            e = si(-b.wheelDelta, d);
            m(b.wheelDeltaX) ? (c = si(-b.wheelDeltaX, d), d = si(-b.wheelDeltaY, d)) : d = e
        } else e = b.detail, 100 < e ? e = 3 : -100 > e && (e = -3), m(b.axis) && b.axis === b.HORIZONTAL_AXIS ? c = e : d = e;
        ja(this.c) && Yb(c, -this.c, this.c);
        ja(this.b) && (d = Yb(d, -this.b, this.b));
        c = new ti(e, b, 0, d);
        this.dispatchEvent(c)
    };
    function si(b, c) {
        return Jb && (Kb || Mb) && 0 != b % c ? b : b / c
    }

    ri.prototype.M = function () {
        ri.S.M.call(this);
        Yc(this.a);
        this.a = null
    };
    function ti(b, c, d, e) {
        zc.call(this, c);
        this.type = "mousewheel";
        this.detail = b;
        this.j = e
    }

    u(ti, zc);
    function ui(b, c, d) {
        uc.call(this, b);
        this.a = c;
        b = m(d) ? d : {};
        this.buttons = vi(b);
        this.pressure = wi(b, this.buttons);
        this.bubbles = x(b, "bubbles", !1);
        this.cancelable = x(b, "cancelable", !1);
        this.view = x(b, "view", null);
        this.detail = x(b, "detail", null);
        this.screenX = x(b, "screenX", 0);
        this.screenY = x(b, "screenY", 0);
        this.clientX = x(b, "clientX", 0);
        this.clientY = x(b, "clientY", 0);
        this.button = x(b, "button", 0);
        this.relatedTarget = x(b, "relatedTarget", null);
        this.pointerId = x(b, "pointerId", 0);
        this.width = x(b, "width", 0);
        this.height = x(b,
            "height", 0);
        this.pointerType = x(b, "pointerType", "");
        this.isPrimary = x(b, "isPrimary", !1);
        c.preventDefault && (this.preventDefault = function () {
            c.preventDefault()
        })
    }

    u(ui, uc);
    function vi(b) {
        if (b.buttons || xi)b = b.buttons; else switch (b.which) {
            case 1:
                b = 1;
                break;
            case 2:
                b = 4;
                break;
            case 3:
                b = 2;
                break;
            default:
                b = 0
        }
        return b
    }

    function wi(b, c) {
        var d = 0;
        b.pressure ? d = b.pressure : d = c ? .5 : 0;
        return d
    }

    var xi = !1;
    try {
        xi = 1 === (new MouseEvent("click", {buttons: 1})).buttons
    } catch (yi) {
    }
    ;
    function zi(b, c) {
        this.a = b;
        this.e = c
    };
    function Ai(b) {
        zi.call(this, b, {
            mousedown: this.yi,
            mousemove: this.zi,
            mouseup: this.Ci,
            mouseover: this.Bi,
            mouseout: this.Ai
        });
        this.c = b.c;
        this.b = []
    }

    u(Ai, zi);
    function Bi(b, c) {
        for (var d = b.b, e = c.clientX, f = c.clientY, g = 0, h = d.length, k; g < h && (k = d[g]); g++) {
            var n = Math.abs(f - k[1]);
            if (25 >= Math.abs(e - k[0]) && 25 >= n)return !0
        }
        return !1
    }

    function Ci(b) {
        var c = Di(b, b.a), d = c.preventDefault;
        c.preventDefault = function () {
            b.preventDefault();
            d()
        };
        c.pointerId = 1;
        c.isPrimary = !0;
        c.pointerType = "mouse";
        return c
    }

    l = Ai.prototype;
    l.yi = function (b) {
        if (!Bi(this, b)) {
            (1).toString()in this.c && this.cancel(b);
            var c = Ci(b);
            this.c[(1).toString()] = b;
            Ei(this.a, Fi, c, b)
        }
    };
    l.zi = function (b) {
        if (!Bi(this, b)) {
            var c = Ci(b);
            Ei(this.a, Gi, c, b)
        }
    };
    l.Ci = function (b) {
        if (!Bi(this, b)) {
            var c = x(this.c, (1).toString());
            c && c.button === b.button && (c = Ci(b), Ei(this.a, Hi, c, b), zb(this.c, (1).toString()))
        }
    };
    l.Bi = function (b) {
        if (!Bi(this, b)) {
            var c = Ci(b);
            Ii(this.a, c, b)
        }
    };
    l.Ai = function (b) {
        if (!Bi(this, b)) {
            var c = Ci(b);
            Ji(this.a, c, b)
        }
    };
    l.cancel = function (b) {
        var c = Ci(b);
        this.a.cancel(c, b);
        zb(this.c, (1).toString())
    };
    function Ki(b) {
        zi.call(this, b, {
            MSPointerDown: this.Hi,
            MSPointerMove: this.Ii,
            MSPointerUp: this.Li,
            MSPointerOut: this.Ji,
            MSPointerOver: this.Ki,
            MSPointerCancel: this.Gi,
            MSGotPointerCapture: this.Ei,
            MSLostPointerCapture: this.Fi
        });
        this.c = b.c;
        this.b = ["", "unavailable", "touch", "pen", "mouse"]
    }

    u(Ki, zi);
    function Li(b, c) {
        var d = c;
        ja(c.a.pointerType) && (d = Di(c, c.a), d.pointerType = b.b[c.a.pointerType]);
        return d
    }

    l = Ki.prototype;
    l.Hi = function (b) {
        this.c[b.a.pointerId] = b;
        var c = Li(this, b);
        Ei(this.a, Fi, c, b)
    };
    l.Ii = function (b) {
        var c = Li(this, b);
        Ei(this.a, Gi, c, b)
    };
    l.Li = function (b) {
        var c = Li(this, b);
        Ei(this.a, Hi, c, b);
        zb(this.c, b.a.pointerId)
    };
    l.Ji = function (b) {
        var c = Li(this, b);
        Ji(this.a, c, b)
    };
    l.Ki = function (b) {
        var c = Li(this, b);
        Ii(this.a, c, b)
    };
    l.Gi = function (b) {
        var c = Li(this, b);
        this.a.cancel(c, b);
        zb(this.c, b.a.pointerId)
    };
    l.Fi = function (b) {
        this.a.dispatchEvent(new ui("lostpointercapture", b, b.a))
    };
    l.Ei = function (b) {
        this.a.dispatchEvent(new ui("gotpointercapture", b, b.a))
    };
    function Mi(b) {
        zi.call(this, b, {
            pointerdown: this.zk,
            pointermove: this.Ak,
            pointerup: this.Dk,
            pointerout: this.Bk,
            pointerover: this.Ck,
            pointercancel: this.yk,
            gotpointercapture: this.Ph,
            lostpointercapture: this.xi
        })
    }

    u(Mi, zi);
    l = Mi.prototype;
    l.zk = function (b) {
        Ni(this.a, b)
    };
    l.Ak = function (b) {
        Ni(this.a, b)
    };
    l.Dk = function (b) {
        Ni(this.a, b)
    };
    l.Bk = function (b) {
        Ni(this.a, b)
    };
    l.Ck = function (b) {
        Ni(this.a, b)
    };
    l.yk = function (b) {
        Ni(this.a, b)
    };
    l.xi = function (b) {
        Ni(this.a, b)
    };
    l.Ph = function (b) {
        Ni(this.a, b)
    };
    function Oi(b, c) {
        zi.call(this, b, {touchstart: this.vl, touchmove: this.ul, touchend: this.tl, touchcancel: this.sl});
        this.c = b.c;
        this.g = c;
        this.b = void 0;
        this.f = 0;
        this.d = void 0
    }

    u(Oi, zi);
    l = Oi.prototype;
    l.Yf = function () {
        this.f = 0;
        this.d = void 0
    };
    function Pi(b, c, d) {
        c = Di(c, d);
        c.pointerId = d.identifier + 2;
        c.bubbles = !0;
        c.cancelable = !0;
        c.detail = b.f;
        c.button = 0;
        c.buttons = 1;
        c.width = d.webkitRadiusX || d.radiusX || 0;
        c.height = d.webkitRadiusY || d.radiusY || 0;
        c.pressure = d.webkitForce || d.force || .5;
        c.isPrimary = b.b === d.identifier;
        c.pointerType = "touch";
        c.clientX = d.clientX;
        c.clientY = d.clientY;
        c.screenX = d.screenX;
        c.screenY = d.screenY;
        return c
    }

    function Qi(b, c, d) {
        function e() {
            c.preventDefault()
        }

        var f = Array.prototype.slice.call(c.a.changedTouches), g = f.length, h, k;
        for (h = 0; h < g; ++h)k = Pi(b, c, f[h]), k.preventDefault = e, d.call(b, c, k)
    }

    l.vl = function (b) {
        var c = b.a.touches, d = sb(this.c), e = d.length;
        if (e >= c.length) {
            var f = [], g, h, k;
            for (g = 0; g < e; ++g) {
                h = d[g];
                k = this.c[h];
                var n;
                if (!(n = 1 == h))a:{
                    n = c.length;
                    for (var p = void 0, q = 0; q < n; q++)if (p = c[q], p.identifier === h - 2) {
                        n = !0;
                        break a
                    }
                    n = !1
                }
                n || f.push(k.$b)
            }
            for (g = 0; g < f.length; ++g)this.be(b, f[g])
        }
        c = qb(this.c);
        if (0 === c || 1 === c && (1).toString()in this.c)this.b = b.a.changedTouches[0].identifier, m(this.d) && ba.clearTimeout(this.d);
        Ri(this, b);
        this.f++;
        Qi(this, b, this.uk)
    };
    l.uk = function (b, c) {
        this.c[c.pointerId] = {target: c.target, $b: c, Jf: c.target};
        var d = this.a;
        c.bubbles = !0;
        Ei(d, Si, c, b);
        d = this.a;
        c.bubbles = !1;
        Ei(d, Ti, c, b);
        Ei(this.a, Fi, c, b)
    };
    l.ul = function (b) {
        b.preventDefault();
        Qi(this, b, this.Di)
    };
    l.Di = function (b, c) {
        var d = x(this.c, c.pointerId);
        if (d) {
            var e = d.$b, f = d.Jf;
            Ei(this.a, Gi, c, b);
            e && f !== c.target && (e.relatedTarget = c.target, c.relatedTarget = f, e.target = f, c.target ? (Ji(this.a, e, b), Ii(this.a, c, b)) : (c.target = f, c.relatedTarget = null, this.be(b, c)));
            d.$b = c;
            d.Jf = c.target
        }
    };
    l.tl = function (b) {
        Ri(this, b);
        Qi(this, b, this.wl)
    };
    l.wl = function (b, c) {
        Ei(this.a, Hi, c, b);
        this.a.$b(c, b);
        var d = this.a;
        c.bubbles = !1;
        Ei(d, Ui, c, b);
        zb(this.c, c.pointerId);
        c.isPrimary && (this.b = void 0, this.d = ba.setTimeout(sa(this.Yf, this), 200))
    };
    l.sl = function (b) {
        Qi(this, b, this.be)
    };
    l.be = function (b, c) {
        this.a.cancel(c, b);
        this.a.$b(c, b);
        var d = this.a;
        c.bubbles = !1;
        Ei(d, Ui, c, b);
        zb(this.c, c.pointerId);
        c.isPrimary && (this.b = void 0, this.d = ba.setTimeout(sa(this.Yf, this), 200))
    };
    function Ri(b, c) {
        var d = b.g.b, e = c.a.changedTouches[0];
        if (b.b === e.identifier) {
            var f = [e.clientX, e.clientY];
            d.push(f);
            ba.setTimeout(function () {
                ab(d, f)
            }, 2500)
        }
    };
    function Vi(b) {
        jd.call(this);
        this.aa = b;
        this.c = {};
        this.b = {};
        this.a = [];
        hg ? Xi(this, new Mi(this)) : ig ? Xi(this, new Ki(this)) : (b = new Ai(this), Xi(this, b), gg && Xi(this, new Oi(this, b)));
        b = this.a.length;
        for (var c, d = 0; d < b; d++)c = this.a[d], Yi(this, sb(c.e))
    }

    u(Vi, jd);
    function Xi(b, c) {
        var d = sb(c.e);
        d && (Ta(d, function (b) {
            var d = c.e[b];
            d && (this.b[b] = sa(d, c))
        }, b), b.a.push(c))
    }

    Vi.prototype.d = function (b) {
        var c = this.b[b.type];
        c && c(b)
    };
    function Yi(b, c) {
        Ta(c, function (b) {
            z(this.aa, b, this.d, !1, this)
        }, b)
    }

    function Zi(b, c) {
        Ta(c, function (b) {
            Xc(this.aa, b, this.d, !1, this)
        }, b)
    }

    function Di(b, c) {
        for (var d = {}, e, f = 0, g = $i.length; f < g; f++)e = $i[f][0], d[e] = b[e] || c[e] || $i[f][1];
        return d
    }

    Vi.prototype.$b = function (b, c) {
        b.bubbles = !0;
        Ei(this, aj, b, c)
    };
    Vi.prototype.cancel = function (b, c) {
        Ei(this, bj, b, c)
    };
    function Ji(b, c, d) {
        b.$b(c, d);
        c.target.contains(c.relatedTarget) || (c.bubbles = !1, Ei(b, Ui, c, d))
    }

    function Ii(b, c, d) {
        c.bubbles = !0;
        Ei(b, Si, c, d);
        c.target.contains(c.relatedTarget) || (c.bubbles = !1, Ei(b, Ti, c, d))
    }

    function Ei(b, c, d, e) {
        b.dispatchEvent(new ui(c, e, d))
    }

    function Ni(b, c) {
        b.dispatchEvent(new ui(c.type, c, c.a))
    }

    Vi.prototype.M = function () {
        for (var b = this.a.length, c, d = 0; d < b; d++)c = this.a[d], Zi(this, sb(c.e));
        Vi.S.M.call(this)
    };
    var Gi = "pointermove", Fi = "pointerdown", Hi = "pointerup", Si = "pointerover", aj = "pointerout", Ti = "pointerenter", Ui = "pointerleave", bj = "pointercancel", $i = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary",
        !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]];

    function cj(b, c, d, e) {
        Zg.call(this, b, c, e);
        this.a = d;
        this.originalEvent = d.a;
        this.pixel = c.ad(this.originalEvent);
        this.coordinate = c.Ga(this.pixel)
    }

    u(cj, Zg);
    cj.prototype.preventDefault = function () {
        cj.S.preventDefault.call(this);
        this.a.preventDefault()
    };
    cj.prototype.lb = function () {
        cj.S.lb.call(this);
        this.a.lb()
    };
    function dj(b, c, d, e) {
        cj.call(this, b, c, d.a, e);
        this.c = d
    }

    u(dj, cj);
    function ej(b) {
        jd.call(this);
        this.c = b;
        this.e = 0;
        this.o = !1;
        this.f = this.g = this.b = null;
        b = this.c.b;
        this.j = 0;
        this.n = {};
        this.d = new Vi(b);
        this.a = null;
        this.g = z(this.d, Fi, this.ki, !1, this);
        this.i = z(this.d, Gi, this.Tk, !1, this)
    }

    u(ej, jd);
    function fj(b, c) {
        var d;
        d = new dj(gj, b.c, c);
        b.dispatchEvent(d);
        0 !== b.e ? (ba.clearTimeout(b.e), b.e = 0, d = new dj(hj, b.c, c), b.dispatchEvent(d)) : b.e = ba.setTimeout(sa(function () {
            this.e = 0;
            var b = new dj(ij, this.c, c);
            this.dispatchEvent(b)
        }, b), 250)
    }

    function jj(b, c) {
        c.type == kj || c.type == lj ? delete b.n[c.pointerId] : c.type == mj && (b.n[c.pointerId] = !0);
        b.j = qb(b.n)
    }

    l = ej.prototype;
    l.hf = function (b) {
        jj(this, b);
        var c = new dj(kj, this.c, b);
        this.dispatchEvent(c);
        0 === this.j && (Ta(this.b, Yc), this.b = null, tc(this.a), this.a = null);
        !this.o && 0 === b.button && fj(this, this.f)
    };
    l.ki = function (b) {
        jj(this, b);
        var c = new dj(mj, this.c, b);
        this.dispatchEvent(c);
        this.f = b;
        this.o = !1;
        null === this.b && (this.a = new Vi(document), this.b = [z(this.a, nj, this.Zi, !1, this), z(this.a, kj, this.hf, !1, this), z(this.d, lj, this.hf, !1, this)])
    };
    l.Zi = function (b) {
        if (b.clientX != this.f.clientX || b.clientY != this.f.clientY) {
            this.o = !0;
            var c = new dj(oj, this.c, b);
            this.dispatchEvent(c)
        }
        b.preventDefault()
    };
    l.Tk = function (b) {
        this.dispatchEvent(new dj(b.type, this.c, b))
    };
    l.M = function () {
        null !== this.i && (Yc(this.i), this.i = null);
        null !== this.g && (Yc(this.g), this.g = null);
        null !== this.b && (Ta(this.b, Yc), this.b = null);
        null !== this.a && (tc(this.a), this.a = null);
        null !== this.d && (tc(this.d), this.d = null);
        ej.S.M.call(this)
    };
    var ij = "singleclick", gj = "click", hj = "dblclick", oj = "pointerdrag", nj = "pointermove", mj = "pointerdown", kj = "pointerup", lj = "pointercancel", pj = {
        Tl: ij,
        Il: gj,
        Jl: hj,
        Ml: oj,
        Pl: nj,
        Ll: mj,
        Sl: kj,
        Rl: "pointerover",
        Ql: "pointerout",
        Nl: "pointerenter",
        Ol: "pointerleave",
        Kl: lj
    };

    function qj(b) {
        md.call(this);
        this.g = Ee(b.projection);
        this.e = m(b.attributions) ? b.attributions : null;
        this.r = b.logo;
        this.n = m(b.state) ? b.state : "ready"
    }

    u(qj, md);
    l = qj.prototype;
    l.yd = ca;
    l.Y = function () {
        return this.e
    };
    l.W = function () {
        return this.r
    };
    l.Z = function () {
        return this.g
    };
    l.$ = function () {
        return this.n
    };
    function rj(b, c) {
        b.n = c;
        b.l()
    };
    function D(b) {
        td.call(this);
        var c = Cb(b);
        c.brightness = m(b.brightness) ? b.brightness : 0;
        c.contrast = m(b.contrast) ? b.contrast : 1;
        c.hue = m(b.hue) ? b.hue : 0;
        c.opacity = m(b.opacity) ? b.opacity : 1;
        c.saturation = m(b.saturation) ? b.saturation : 1;
        c.visible = m(b.visible) ? b.visible : !0;
        c.maxResolution = m(b.maxResolution) ? b.maxResolution : Infinity;
        c.minResolution = m(b.minResolution) ? b.minResolution : 0;
        this.G(c)
    }

    u(D, td);
    D.prototype.d = function () {
        return this.get("brightness")
    };
    D.prototype.getBrightness = D.prototype.d;
    D.prototype.e = function () {
        return this.get("contrast")
    };
    D.prototype.getContrast = D.prototype.e;
    D.prototype.f = function () {
        return this.get("hue")
    };
    D.prototype.getHue = D.prototype.f;
    function sj(b) {
        var c = b.d(), d = b.e(), e = b.f(), f = b.j(), g = b.n(), h = b.Ta(), k = b.b(), n = b.D(), p = b.g(), q = b.i();
        return {
            layer: b,
            brightness: m(c) ? Yb(c, -1, 1) : 0,
            contrast: m(d) ? Math.max(d, 0) : 1,
            hue: m(e) ? e : 0,
            opacity: m(f) ? Yb(f, 0, 1) : 1,
            saturation: m(g) ? Math.max(g, 0) : 1,
            gc: h,
            visible: m(k) ? !!k : !0,
            extent: n,
            maxResolution: m(p) ? p : Infinity,
            minResolution: m(q) ? Math.max(q, 0) : 0
        }
    }

    D.prototype.D = function () {
        return this.get("extent")
    };
    D.prototype.getExtent = D.prototype.D;
    D.prototype.g = function () {
        return this.get("maxResolution")
    };
    D.prototype.getMaxResolution = D.prototype.g;
    D.prototype.i = function () {
        return this.get("minResolution")
    };
    D.prototype.getMinResolution = D.prototype.i;
    D.prototype.j = function () {
        return this.get("opacity")
    };
    D.prototype.getOpacity = D.prototype.j;
    D.prototype.n = function () {
        return this.get("saturation")
    };
    D.prototype.getSaturation = D.prototype.n;
    D.prototype.b = function () {
        return this.get("visible")
    };
    D.prototype.getVisible = D.prototype.b;
    D.prototype.t = function (b) {
        this.set("brightness", b)
    };
    D.prototype.setBrightness = D.prototype.t;
    D.prototype.F = function (b) {
        this.set("contrast", b)
    };
    D.prototype.setContrast = D.prototype.F;
    D.prototype.J = function (b) {
        this.set("hue", b)
    };
    D.prototype.setHue = D.prototype.J;
    D.prototype.p = function (b) {
        this.set("extent", b)
    };
    D.prototype.setExtent = D.prototype.p;
    D.prototype.Q = function (b) {
        this.set("maxResolution", b)
    };
    D.prototype.setMaxResolution = D.prototype.Q;
    D.prototype.V = function (b) {
        this.set("minResolution", b)
    };
    D.prototype.setMinResolution = D.prototype.V;
    D.prototype.q = function (b) {
        this.set("opacity", b)
    };
    D.prototype.setOpacity = D.prototype.q;
    D.prototype.ba = function (b) {
        this.set("saturation", b)
    };
    D.prototype.setSaturation = D.prototype.ba;
    D.prototype.ca = function (b) {
        this.set("visible", b)
    };
    D.prototype.setVisible = D.prototype.ca;
    function E(b) {
        var c = Cb(b);
        delete c.source;
        D.call(this, c);
        this.Ea = null;
        z(this, xd("source"), this.Yd, !1, this);
        this.ga(m(b.source) ? b.source : null)
    }

    u(E, D);
    E.prototype.Da = function (b) {
        b = m(b) ? b : [];
        b.push(sj(this));
        return b
    };
    E.prototype.a = function () {
        var b = this.get("source");
        return m(b) ? b : null
    };
    E.prototype.getSource = E.prototype.a;
    E.prototype.Ta = function () {
        var b = this.a();
        return null === b ? "undefined" : b.n
    };
    E.prototype.Zd = function () {
        this.l()
    };
    E.prototype.Yd = function () {
        null !== this.Ea && (Yc(this.Ea), this.Ea = null);
        var b = this.a();
        null !== b && (this.Ea = z(b, "change", this.Zd, !1, this));
        this.l()
    };
    E.prototype.ga = function (b) {
        this.set("source", b)
    };
    E.prototype.setSource = E.prototype.ga;
    function tj(b, c, d, e, f) {
        jd.call(this);
        this.f = f;
        this.extent = b;
        this.e = d;
        this.resolution = c;
        this.state = e
    }

    u(tj, jd);
    tj.prototype.D = function () {
        return this.extent
    };
    function uj(b, c) {
        jd.call(this);
        this.a = b;
        this.state = c
    }

    u(uj, jd);
    function vj(b) {
        b.dispatchEvent("change")
    }

    uj.prototype.mb = function () {
        return ma(this).toString()
    };
    uj.prototype.f = function () {
        return this.a
    };
    function wj(b) {
        this.minZoom = m(b.minZoom) ? b.minZoom : 0;
        this.a = b.resolutions;
        this.maxZoom = this.a.length - 1;
        this.d = m(b.origin) ? b.origin : null;
        this.f = null;
        m(b.origins) && (this.f = b.origins);
        this.c = null;
        m(b.tileSizes) && (this.c = b.tileSizes);
        this.e = m(b.tileSize) ? b.tileSize : null === this.c ? 256 : void 0
    }

    var xj = [0, 0, 0];
    l = wj.prototype;
    l.Bb = function () {
        return ed
    };
    l.$c = function (b, c, d, e, f) {
        f = yj(this, b, f);
        for (b = b[0] - 1; b >= this.minZoom;) {
            if (c.call(d, b, zj(this, f, b, e)))return !0;
            --b
        }
        return !1
    };
    l.ed = function () {
        return this.maxZoom
    };
    l.fd = function () {
        return this.minZoom
    };
    l.Lb = function (b) {
        return null === this.d ? this.f[b] : this.d
    };
    l.ka = function (b) {
        return this.a[b]
    };
    l.Fd = function () {
        return this.a
    };
    l.kd = function (b, c, d) {
        return b[0] < this.maxZoom ? (d = yj(this, b, d), zj(this, d, b[0] + 1, c)) : null
    };
    function Aj(b, c, d, e) {
        Bj(b, c[0], c[1], d, !1, xj);
        var f = xj[1], g = xj[2];
        Bj(b, c[2], c[3], d, !0, xj);
        return pf(f, xj[1], g, xj[2], e)
    }

    function zj(b, c, d, e) {
        return Aj(b, c, b.ka(d), e)
    }

    function Cj(b, c) {
        var d = b.Lb(c[0]), e = b.ka(c[0]), f = b.sa(c[0]);
        return [d[0] + (c[1] + .5) * f * e, d[1] + (c[2] + .5) * f * e]
    }

    function yj(b, c, d) {
        var e = b.Lb(c[0]), f = b.ka(c[0]);
        b = b.sa(c[0]);
        var g = e[0] + c[1] * b * f;
        c = e[1] + c[2] * b * f;
        return Xd(g, c, g + b * f, c + b * f, d)
    }

    l.Vb = function (b, c, d) {
        return Bj(this, b[0], b[1], c, !1, d)
    };
    function Bj(b, c, d, e, f, g) {
        var h = ec(b.a, e, 0), k = e / b.ka(h), n = b.Lb(h);
        b = b.sa(h);
        c = k * (c - n[0]) / (e * b);
        d = k * (d - n[1]) / (e * b);
        f ? (c = Math.ceil(c) - 1, d = Math.ceil(d) - 1) : (c = Math.floor(c), d = Math.floor(d));
        return kf(h, c, d, g)
    }

    l.Fc = function (b, c, d) {
        return Bj(this, b[0], b[1], this.ka(c), !1, d)
    };
    l.sa = function (b) {
        return m(this.e) ? this.e : this.c[b]
    };
    function Dj(b, c, d) {
        c = m(c) ? c : 42;
        d = m(d) ? d : 256;
        b = Math.max(re(b) / d, oe(b) / d);
        c += 1;
        d = Array(c);
        for (var e = 0; e < c; ++e)d[e] = b / Math.pow(2, e);
        return d
    }

    function Ej(b) {
        b = Ee(b);
        var c = b.D();
        null === c && (b = 180 * Ae.degrees / b.ie(), c = Xd(-b, -b, b, b));
        return c
    };
    function Fj(b) {
        qj.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            logo: b.logo,
            projection: b.projection,
            state: b.state
        });
        this.t = m(b.opaque) ? b.opaque : !1;
        this.F = m(b.tilePixelRatio) ? b.tilePixelRatio : 1;
        this.tileGrid = m(b.tileGrid) ? b.tileGrid : null
    }

    u(Fj, qj);
    l = Fj.prototype;
    l.zd = cd;
    l.fe = function (b, c, d, e) {
        var f = !0, g, h, k, n;
        for (k = e.a; k <= e.d; ++k)for (n = e.b; n <= e.c; ++n)h = this.hb(d, k, n), b[d] && b[d][h] || (g = c(d, k, n), null === g ? f = !1 : (b[d] || (b[d] = {}), b[d][h] = g));
        return f
    };
    l.bd = function () {
        return 0
    };
    l.hb = lf;
    l.za = function () {
        return this.tileGrid
    };
    function Gj(b, c) {
        var d;
        if (null === b.tileGrid) {
            if (d = c.e, null === d) {
                d = Ej(c);
                var e = m(void 0) ? void 0 : 256, f = m(void 0) ? void 0 : "bottom-left", g = Dj(d, void 0, e);
                d = new wj({origin: le(d, f), resolutions: g, tileSize: e});
                c.e = d
            }
        } else d = b.tileGrid;
        return d
    }

    l.Gc = function (b, c, d) {
        return Gj(this, d).sa(b) * this.F
    };
    l.He = ca;
    function Hj(b, c) {
        pc.call(this);
        this.b = b;
        this.a = c
    }

    u(Hj, pc);
    Hj.prototype.Zb = ca;
    Hj.prototype.o = function (b) {
        2 === b.target.state && Ij(this)
    };
    function Ij(b) {
        var c = b.a;
        c.b() && "ready" == c.Ta() && b.b.e.render()
    }

    function Jj(b, c) {
        c.zd() && b.postRenderFunctions.push(ta(function (b, c, f) {
            c = ma(b).toString();
            b.se(f.usedTiles[c])
        }, c))
    }

    function Kj(b, c) {
        if (null != c) {
            var d, e, f;
            e = 0;
            for (f = c.length; e < f; ++e)d = c[e], b[ma(d).toString()] = d
        }
    }

    function Lj(b, c) {
        var d = c.r;
        m(d) && (ia(d) ? b.logos[d] = "" : la(d) && (b.logos[d.src] = d.href))
    }

    function Mj(b, c, d, e) {
        c = ma(c).toString();
        d = d.toString();
        c in b ? d in b[c] ? (b = b[c][d], e.a < b.a && (b.a = e.a), e.d > b.d && (b.d = e.d), e.b < b.b && (b.b = e.b), e.c > b.c && (b.c = e.c)) : b[c][d] = e : (b[c] = {}, b[c][d] = e)
    }

    function Nj(b, c, d, e) {
        return function (f, g, h) {
            f = c.Fb(f, g, h, d, e);
            return b(f) ? f : null
        }
    }

    function Oj(b, c, d) {
        return [c * (Math.round(b[0] / c) + d[0] % 2 / 2), c * (Math.round(b[1] / c) + d[1] % 2 / 2)]
    }

    function Pj(b, c, d, e, f, g, h, k, n, p) {
        var q = ma(c).toString();
        q in b.wantedTiles || (b.wantedTiles[q] = {});
        var r = b.wantedTiles[q];
        b = b.tileQueue;
        var s = d.minZoom, v, y, C, F, G, w;
        m(k) || (k = 0);
        for (w = h; w >= s; --w)for (y = zj(d, g, w, y), C = d.ka(w), F = y.a; F <= y.d; ++F)for (G = y.b; G <= y.c; ++G)h - w <= k ? (v = c.Fb(w, F, G, e, f), 0 == v.state && (r[nf(v.a)] = !0, v.mb()in b.b || Qj(b, [v, q, Cj(d, v.a), C])), m(n) && n.call(p, v)) : c.He(w, F, G)
    };
    function Rj(b) {
        this.p = b.opacity;
        this.q = b.rotateWithView;
        this.i = b.rotation;
        this.n = b.scale;
        this.r = b.snapToPixel
    }

    l = Rj.prototype;
    l.Ad = function () {
        return this.p
    };
    l.hd = function () {
        return this.q
    };
    l.Bd = function () {
        return this.i
    };
    l.Cd = function () {
        return this.n
    };
    l.jd = function () {
        return this.r
    };
    l.Dd = function (b) {
        this.i = b
    };
    l.Ed = function (b) {
        this.n = b
    };
    function Sj(b) {
        b = m(b) ? b : {};
        this.e = m(b.anchor) ? b.anchor : [.5, .5];
        this.d = null;
        this.c = m(b.anchorOrigin) ? b.anchorOrigin : "top-left";
        this.g = m(b.anchorXUnits) ? b.anchorXUnits : "fraction";
        this.o = m(b.anchorYUnits) ? b.anchorYUnits : "fraction";
        var c = m(b.crossOrigin) ? b.crossOrigin : null, d = m(b.img) ? b.img : null, e = b.src;
        m(e) && 0 !== e.length || null === d || (e = d.src);
        var f = m(b.src) ? 0 : 2, g = Tj.Ja(), h = g.get(e, c);
        null === h && (h = new Uj(d, e, c, f), g.set(e, c, h));
        this.a = h;
        this.t = m(b.offset) ? b.offset : [0, 0];
        this.b = m(b.offsetOrigin) ? b.offsetOrigin :
            "top-left";
        this.f = null;
        this.j = m(b.size) ? b.size : null;
        Rj.call(this, {
            opacity: m(b.opacity) ? b.opacity : 1,
            rotation: m(b.rotation) ? b.rotation : 0,
            scale: m(b.scale) ? b.scale : 1,
            snapToPixel: m(b.snapToPixel) ? b.snapToPixel : !0,
            rotateWithView: m(b.rotateWithView) ? b.rotateWithView : !1
        })
    }

    u(Sj, Rj);
    l = Sj.prototype;
    l.tb = function () {
        if (null !== this.d)return this.d;
        var b = this.e, c = this.ab();
        if ("fraction" == this.g || "fraction" == this.o) {
            if (null === c)return null;
            b = this.e.slice();
            "fraction" == this.g && (b[0] *= c[0]);
            "fraction" == this.o && (b[1] *= c[1])
        }
        if ("top-left" != this.c) {
            if (null === c)return null;
            b === this.e && (b = this.e.slice());
            if ("top-right" == this.c || "bottom-right" == this.c)b[0] = -b[0] + c[0];
            if ("bottom-left" == this.c || "bottom-right" == this.c)b[1] = -b[1] + c[1]
        }
        return this.d = b
    };
    l.yb = function () {
        return this.a.a
    };
    l.cd = function () {
        return this.a.c
    };
    l.ue = function () {
        return this.a.b
    };
    l.te = function () {
        var b = this.a;
        if (null === b.e)if (b.o) {
            var c = b.c[0], d = b.c[1], e = Tf(c, d);
            e.fillRect(0, 0, c, d);
            b.e = e.canvas
        } else b.e = b.a;
        return b.e
    };
    l.zb = function () {
        if (null !== this.f)return this.f;
        var b = this.t;
        if ("top-left" != this.b) {
            var c = this.ab(), d = this.a.c;
            if (null === c || null === d)return null;
            b = b.slice();
            if ("top-right" == this.b || "bottom-right" == this.b)b[0] = d[0] - c[0] - b[0];
            if ("bottom-left" == this.b || "bottom-right" == this.b)b[1] = d[1] - c[1] - b[1]
        }
        return this.f = b
    };
    l.Pj = function () {
        return this.a.f
    };
    l.ab = function () {
        return null === this.j ? this.a.c : this.j
    };
    l.ne = function (b, c) {
        return z(this.a, "change", b, !1, c)
    };
    l.load = function () {
        this.a.load()
    };
    l.Ge = function (b, c) {
        Xc(this.a, "change", b, !1, c)
    };
    function Uj(b, c, d, e) {
        jd.call(this);
        this.e = null;
        this.a = null === b ? new Image : b;
        null !== d && (this.a.crossOrigin = d);
        this.d = null;
        this.b = e;
        this.c = null;
        this.f = c;
        this.o = !1
    }

    u(Uj, jd);
    Uj.prototype.g = function () {
        this.b = 3;
        Ta(this.d, Yc);
        this.d = null;
        this.dispatchEvent("change")
    };
    Uj.prototype.i = function () {
        this.b = 2;
        this.c = [this.a.width, this.a.height];
        Ta(this.d, Yc);
        this.d = null;
        var b = Tf(1, 1);
        b.drawImage(this.a, 0, 0);
        try {
            b.getImageData(0, 0, 1, 1)
        } catch (c) {
            this.o = !0
        }
        this.dispatchEvent("change")
    };
    Uj.prototype.load = function () {
        if (0 == this.b) {
            this.b = 1;
            this.d = [Wc(this.a, "error", this.g, !1, this), Wc(this.a, "load", this.i, !1, this)];
            try {
                this.a.src = this.f
            } catch (b) {
                this.g()
            }
        }
    };
    function Tj() {
        this.a = {};
        this.c = 0
    }

    da(Tj);
    Tj.prototype.clear = function () {
        this.a = {};
        this.c = 0
    };
    Tj.prototype.get = function (b, c) {
        var d = c + ":" + b;
        return d in this.a ? this.a[d] : null
    };
    Tj.prototype.set = function (b, c, d) {
        this.a[c + ":" + b] = d;
        ++this.c
    };
    function Vj(b, c, d, e, f, g, h, k) {
        Od(b);
        0 === c && 0 === d || Qd(b, c, d);
        1 == e && 1 == f || Rd(b, e, f);
        0 !== g && Sd(b, g);
        0 === h && 0 === k || Qd(b, h, k);
        return b
    }

    function Wj(b, c) {
        return b[0] == c[0] && b[1] == c[1] && b[4] == c[4] && b[5] == c[5] && b[12] == c[12] && b[13] == c[13]
    }

    function Xj(b, c, d) {
        var e = b[1], f = b[5], g = b[13], h = c[0];
        c = c[1];
        d[0] = b[0] * h + b[4] * c + b[12];
        d[1] = e * h + f * c + g;
        return d
    };
    function Yj(b, c) {
        pc.call(this);
        this.e = c;
        this.g = null;
        this.b = {}
    }

    u(Yj, pc);
    function Zj(b) {
        var c = b.viewState, d = b.coordinateToPixelMatrix;
        Vj(d, b.size[0] / 2, b.size[1] / 2, 1 / c.resolution, -1 / c.resolution, -c.rotation, -c.center[0], -c.center[1]);
        b = b.pixelToCoordinateMatrix;
        var c = d[0], e = d[1], f = d[2], g = d[3], h = d[4], k = d[5], n = d[6], p = d[7], q = d[8], r = d[9], s = d[10], v = d[11], y = d[12], C = d[13], F = d[14], d = d[15], G = c * k - e * h, w = c * n - f * h, U = c * p - g * h, N = e * n - f * k, Y = e * p - g * k, T = f * p - g * n, qa = q * C - r * y, vb = q * F - s * y, Ka = q * d - v * y, ac = r * F - s * C, Sb = r * d - v * C, La = s * d - v * F, Pa = G * La - w * Sb + U * ac + N * Ka - Y * vb + T * qa;
        0 != Pa && (Pa = 1 / Pa, b[0] = (k * La - n * Sb +
        p * ac) * Pa, b[1] = (-e * La + f * Sb - g * ac) * Pa, b[2] = (C * T - F * Y + d * N) * Pa, b[3] = (-r * T + s * Y - v * N) * Pa, b[4] = (-h * La + n * Ka - p * vb) * Pa, b[5] = (c * La - f * Ka + g * vb) * Pa, b[6] = (-y * T + F * U - d * w) * Pa, b[7] = (q * T - s * U + v * w) * Pa, b[8] = (h * Sb - k * Ka + p * qa) * Pa, b[9] = (-c * Sb + e * Ka - g * qa) * Pa, b[10] = (y * Y - C * U + d * G) * Pa, b[11] = (-q * Y + r * U - v * G) * Pa, b[12] = (-h * ac + k * vb - n * qa) * Pa, b[13] = (c * ac - e * vb + f * qa) * Pa, b[14] = (-y * N + C * w - F * G) * Pa, b[15] = (q * N - r * w + s * G) * Pa)
    }

    Yj.prototype.Yc = function (b) {
        return new Hj(this, b)
    };
    Yj.prototype.M = function () {
        ob(this.b, tc);
        Yj.S.M.call(this)
    };
    function ak() {
        var b = Tj.Ja();
        if (32 < b.c) {
            var c = 0, d, e;
            for (d in b.a) {
                e = b.a[d];
                var f;
                if (f = 0 === (c++ & 3))Ec(e) ? e = ld(e, void 0, void 0) : (e = Sc(e), e = !!e && Mc(e, void 0, void 0)), f = !e;
                f && (delete b.a[d], --b.c)
            }
        }
    }

    function bk(b, c) {
        var d = ma(c).toString();
        if (d in b.b)return b.b[d];
        var e = b.Yc(c);
        return b.b[d] = e
    }

    Yj.prototype.Ld = ca;
    Yj.prototype.t = function (b, c) {
        for (var d in this.b)if (!(null !== c && d in c.layerStates)) {
            var e = this.b[d];
            delete this.b[d];
            tc(e)
        }
    };
    function ck(b, c) {
        for (var d in b.b)if (!(d in c.layerStates)) {
            c.postRenderFunctions.push(sa(b.t, b));
            break
        }
    };
    function dk(b, c) {
        this.f = b;
        this.e = c;
        this.a = [];
        this.c = [];
        this.b = {}
    }

    dk.prototype.clear = function () {
        this.a.length = 0;
        this.c.length = 0;
        yb(this.b)
    };
    function ek(b) {
        var c = b.a, d = b.c, e = c[0];
        1 == c.length ? (c.length = 0, d.length = 0) : (c[0] = c.pop(), d[0] = d.pop(), fk(b, 0));
        c = b.e(e);
        delete b.b[c];
        return e
    }

    function Qj(b, c) {
        var d = b.f(c);
        Infinity != d && (b.a.push(c), b.c.push(d), b.b[b.e(c)] = !0, gk(b, 0, b.a.length - 1))
    }

    dk.prototype.Ub = function () {
        return this.a.length
    };
    dk.prototype.ia = function () {
        return 0 === this.a.length
    };
    function fk(b, c) {
        for (var d = b.a, e = b.c, f = d.length, g = d[c], h = e[c], k = c; c < f >> 1;) {
            var n = 2 * c + 1, p = 2 * c + 2, n = p < f && e[p] < e[n] ? p : n;
            d[c] = d[n];
            e[c] = e[n];
            c = n
        }
        d[c] = g;
        e[c] = h;
        gk(b, k, c)
    }

    function gk(b, c, d) {
        var e = b.a;
        b = b.c;
        for (var f = e[d], g = b[d]; d > c;) {
            var h = d - 1 >> 1;
            if (b[h] > g)e[d] = e[h], b[d] = b[h], d = h; else break
        }
        e[d] = f;
        b[d] = g
    }

    function hk(b) {
        var c = b.f, d = b.a, e = b.c, f = 0, g = d.length, h, k, n;
        for (k = 0; k < g; ++k)h = d[k], n = c(h), Infinity == n ? delete b.b[b.e(h)] : (e[f] = n, d[f++] = h);
        d.length = f;
        e.length = f;
        for (c = (b.a.length >> 1) - 1; 0 <= c; c--)fk(b, c)
    };
    function ik(b, c) {
        dk.call(this, function (c) {
            return b.apply(null, c)
        }, function (b) {
            return b[0].mb()
        });
        this.o = c;
        this.d = 0
    }

    u(ik, dk);
    ik.prototype.g = function () {
        --this.d;
        this.o()
    };
    function jk(b, c, d) {
        this.d = b;
        this.b = c;
        this.f = d;
        this.a = [];
        this.c = this.e = 0
    }

    jk.prototype.update = function (b, c) {
        this.a.push(b, c, ua())
    };
    function kk(b, c) {
        var d = b.d, e = b.c, f = b.b - e, g = lk(b);
        return gf({
            source: c, duration: g, easing: function (b) {
                return e * (Math.exp(d * b * g) - 1) / f
            }
        })
    }

    function lk(b) {
        return Math.log(b.b / b.c) / b.d
    };
    function mk(b) {
        td.call(this);
        this.n = null;
        this.b(!0);
        this.handleEvent = b.handleEvent
    }

    u(mk, td);
    mk.prototype.a = function () {
        return this.get("active")
    };
    mk.prototype.getActive = mk.prototype.a;
    mk.prototype.b = function (b) {
        this.set("active", b)
    };
    mk.prototype.setActive = mk.prototype.b;
    mk.prototype.setMap = function (b) {
        this.n = b
    };
    function nk(b, c, d, e, f) {
        if (null != d) {
            var g = c.e(), h = c.a();
            m(g) && m(h) && m(f) && 0 < f && (b.Ua(hf({
                rotation: g,
                duration: f,
                easing: cf
            })), m(e) && b.Ua(gf({source: h, duration: f, easing: cf})));
            c.rotate(d, e)
        }
    }

    function ok(b, c, d, e, f) {
        var g = c.b();
        d = c.constrainResolution(g, d, 0);
        pk(b, c, d, e, f)
    }

    function pk(b, c, d, e, f) {
        if (null != d) {
            var g = c.b(), h = c.a();
            m(g) && m(h) && m(f) && 0 < f && (b.Ua(jf({
                resolution: g,
                duration: f,
                easing: cf
            })), m(e) && b.Ua(gf({source: h, duration: f, easing: cf})));
            if (null != e) {
                var k;
                b = c.a();
                f = c.b();
                m(b) && m(f) && (k = [e[0] - d * (e[0] - b[0]) / f, e[1] - d * (e[1] - b[1]) / f]);
                c.Oa(k)
            }
            c.d(d)
        }
    };
    function qk(b) {
        b = m(b) ? b : {};
        this.d = m(b.delta) ? b.delta : 1;
        mk.call(this, {handleEvent: rk});
        this.e = m(b.duration) ? b.duration : 250
    }

    u(qk, mk);
    function rk(b) {
        var c = !1, d = b.a;
        if (b.type == hj) {
            var c = b.map, e = b.coordinate, d = d.d ? -this.d : this.d, f = c.a();
            ok(c, f, d, e, this.e);
            b.preventDefault();
            c = !0
        }
        return !c
    };
    function sk(b) {
        b = b.a;
        return b.c && !b.g && b.d
    }

    function tk(b) {
        return "mousemove" == b.originalEvent.type
    }

    function uk(b) {
        return b.type == ij
    }

    function vk(b) {
        b = b.a;
        return !b.c && !b.g && !b.d
    }

    function wk(b) {
        b = b.a;
        return !b.c && !b.g && b.d
    }

    function xk(b) {
        b = b.a.target.tagName;
        return "INPUT" !== b && "SELECT" !== b && "TEXTAREA" !== b
    }

    function yk(b) {
        return 1 == b.c.pointerId
    };
    function zk(b) {
        b = m(b) ? b : {};
        mk.call(this, {handleEvent: m(b.handleEvent) ? b.handleEvent : Ak});
        this.Da = m(b.handleDownEvent) ? b.handleDownEvent : cd;
        this.oa = m(b.handleDragEvent) ? b.handleDragEvent : ca;
        this.Ea = m(b.handleMoveEvent) ? b.handleMoveEvent : ca;
        this.qa = m(b.handleUpEvent) ? b.handleUpEvent : cd;
        this.p = !1;
        this.t = {};
        this.e = []
    }

    u(zk, mk);
    function Bk(b) {
        for (var c = b.length, d = 0, e = 0, f = 0; f < c; f++)d += b[f].clientX, e += b[f].clientY;
        return [d / c, e / c]
    }

    function Ak(b) {
        if (!(b instanceof dj))return !0;
        var c = !1, d = b.type;
        if (d === mj || d === oj || d === kj)d = b.c, b.type == kj ? delete this.t[d.pointerId] : b.type == mj ? this.t[d.pointerId] = d : d.pointerId in this.t && (this.t[d.pointerId] = d), this.e = rb(this.t);
        this.p && (b.type == oj ? this.oa(b) : b.type == kj && (this.p = this.qa(b)));
        b.type == mj ? (this.p = b = this.Da(b), c = this.q(b)) : b.type == nj && this.Ea(b);
        return !c
    }

    zk.prototype.q = ed;
    function Ck(b) {
        zk.call(this, {handleDownEvent: Dk, handleDragEvent: Ek, handleUpEvent: Fk});
        b = m(b) ? b : {};
        this.d = b.kinetic;
        this.f = this.g = null;
        this.j = m(b.condition) ? b.condition : vk;
        this.i = !1
    }

    u(Ck, zk);
    function Ek(b) {
        var c = Bk(this.e);
        this.d && this.d.update(c[0], c[1]);
        if (null !== this.f) {
            var d = this.f[0] - c[0], e = c[1] - this.f[1];
            b = b.map;
            var f = b.a(), g = $e(f), e = d = [d, e], h = g.resolution;
            e[0] *= h;
            e[1] *= h;
            Dd(d, g.rotation);
            yd(d, g.center);
            d = f.i(d);
            b.render();
            f.Oa(d)
        }
        this.f = c
    }

    function Fk(b) {
        b = b.map;
        var c = b.a();
        if (0 === this.e.length) {
            var d;
            if (d = !this.i && this.d)if (d = this.d, 6 > d.a.length)d = !1; else {
                var e = ua() - d.f, f = d.a.length - 3;
                if (d.a[f + 2] < e)d = !1; else {
                    for (var g = f - 3; 0 < g && d.a[g + 2] > e;)g -= 3;
                    var e = d.a[f + 2] - d.a[g + 2], h = d.a[f] - d.a[g], f = d.a[f + 1] - d.a[g + 1];
                    d.e = Math.atan2(f, h);
                    d.c = Math.sqrt(h * h + f * f) / e;
                    d = d.c > d.b
                }
            }
            d && (d = this.d, d = (d.b - d.c) / d.d, f = this.d.e, g = c.a(), this.g = kk(this.d, g), b.Ua(this.g), g = b.f(g), d = b.Ga([g[0] - d * Math.cos(f), g[1] - d * Math.sin(f)]), d = c.i(d), c.Oa(d));
            bf(c, -1);
            b.render();
            return !1
        }
        this.f = null;
        return !0
    }

    function Dk(b) {
        if (0 < this.e.length && this.j(b)) {
            var c = b.map, d = c.a();
            this.f = null;
            this.p || bf(d, 1);
            c.render();
            null !== this.g && ab(c.F, this.g) && (d.Oa(b.frameState.viewState.center), this.g = null);
            this.d && (b = this.d, b.a.length = 0, b.e = 0, b.c = 0);
            this.i = 1 < this.e.length;
            return !0
        }
        return !1
    }

    Ck.prototype.q = cd;
    function Gk(b) {
        b = m(b) ? b : {};
        zk.call(this, {handleDownEvent: Hk, handleDragEvent: Ik, handleUpEvent: Jk});
        this.f = m(b.condition) ? b.condition : sk;
        this.d = void 0
    }

    u(Gk, zk);
    function Ik(b) {
        if (yk(b)) {
            var c = b.map, d = c.e();
            b = b.pixel;
            d = Math.atan2(d[1] / 2 - b[1], b[0] - d[0] / 2);
            if (m(this.d)) {
                b = d - this.d;
                var e = c.a(), f = $e(e);
                c.render();
                nk(c, e, f.rotation - b)
            }
            this.d = d
        }
    }

    function Jk(b) {
        if (!yk(b))return !0;
        b = b.map;
        var c = b.a();
        bf(c, -1);
        var d = $e(c).rotation, d = c.constrainRotation(d, 0);
        nk(b, c, d, void 0, 250);
        return !1
    }

    function Hk(b) {
        return yk(b) && Cc(b.a) && this.f(b) ? (b = b.map, bf(b.a(), 1), b.render(), this.d = void 0, !0) : !1
    }

    Gk.prototype.q = cd;
    function Kk() {
        md.call(this);
        this.extent = void 0;
        this.g = -1;
        this.o = {};
        this.j = this.i = 0
    }

    u(Kk, md);
    Kk.prototype.f = function (b, c) {
        var d = m(c) ? c : [NaN, NaN];
        this.Va(b[0], b[1], d, Infinity);
        return d
    };
    Kk.prototype.Jb = cd;
    Kk.prototype.e = function (b, c) {
        this.ma(Ve(b, c));
        return this
    };
    function Lk(b, c, d, e, f, g) {
        var h = f[0], k = f[1], n = f[4], p = f[5], q = f[12];
        f = f[13];
        for (var r = m(g) ? g : [], s = 0; c < d; c += e) {
            var v = b[c], y = b[c + 1];
            r[s++] = h * v + n * y + q;
            r[s++] = k * v + p * y + f
        }
        m(g) && r.length != s && (r.length = s);
        return r
    };
    function Mk() {
        Kk.call(this);
        this.a = "XY";
        this.s = 2;
        this.k = null
    }

    u(Mk, Kk);
    function Nk(b) {
        if ("XY" == b)return 2;
        if ("XYZ" == b || "XYM" == b)return 3;
        if ("XYZM" == b)return 4
    }

    l = Mk.prototype;
    l.Jb = cd;
    l.D = function (b) {
        if (this.g != this.c) {
            var c = this.k, d = this.k.length, e = this.s, f = Xd(Infinity, Infinity, -Infinity, -Infinity, this.extent);
            this.extent = fe(f, c, 0, d, e);
            this.g = this.c
        }
        return te(this.extent, b)
    };
    l.vb = function () {
        return this.k.slice(0, this.s)
    };
    l.wb = function () {
        return this.k.slice(this.k.length - this.s)
    };
    l.xb = function () {
        return this.a
    };
    l.ke = function (b) {
        this.j != this.c && (yb(this.o), this.i = 0, this.j = this.c);
        if (0 > b || 0 !== this.i && b <= this.i)return this;
        var c = b.toString();
        if (this.o.hasOwnProperty(c))return this.o[c];
        var d = this.mc(b);
        if (d.k.length < this.k.length)return this.o[c] = d;
        this.i = b;
        return this
    };
    l.mc = function () {
        return this
    };
    function Ok(b, c, d) {
        b.s = Nk(c);
        b.a = c;
        b.k = d
    }

    function Pk(b, c, d, e) {
        if (m(c))d = Nk(c); else {
            for (c = 0; c < e; ++c) {
                if (0 === d.length) {
                    b.a = "XY";
                    b.s = 2;
                    return
                }
                d = d[0]
            }
            d = d.length;
            c = 2 == d ? "XY" : 3 == d ? "XYZ" : 4 == d ? "XYZM" : void 0
        }
        b.a = c;
        b.s = d
    }

    l.ma = function (b) {
        null !== this.k && (b(this.k, this.k, this.s), this.l())
    };
    l.Aa = function (b, c) {
        var d = this.k;
        if (null !== d) {
            var e = d.length, f = this.s, g = m(d) ? d : [], h = 0, k, n;
            for (k = 0; k < e; k += f)for (g[h++] = d[k] + b, g[h++] = d[k + 1] + c, n = k + 2; n < k + f; ++n)g[h++] = d[n];
            m(d) && g.length != h && (g.length = h);
            this.l()
        }
    };
    function Qk(b, c, d, e) {
        for (var f = 0, g = b[d - e], h = b[d - e + 1]; c < d; c += e)var k = b[c], n = b[c + 1], f = f + (h * k - g * n), g = k, h = n;
        return f / 2
    }

    function Rk(b, c, d, e) {
        var f = 0, g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g], f = f + Qk(b, c, k, e);
            c = k
        }
        return f
    };
    function Sk(b, c, d, e, f, g) {
        var h = f - d, k = g - e;
        if (0 !== h || 0 !== k) {
            var n = ((b - d) * h + (c - e) * k) / (h * h + k * k);
            1 < n ? (d = f, e = g) : 0 < n && (d += h * n, e += k * n)
        }
        return Tk(b, c, d, e)
    }

    function Tk(b, c, d, e) {
        b = d - b;
        c = e - c;
        return b * b + c * c
    };
    function Uk(b, c, d, e, f, g, h) {
        var k = b[c], n = b[c + 1], p = b[d] - k, q = b[d + 1] - n;
        if (0 !== p || 0 !== q)if (g = ((f - k) * p + (g - n) * q) / (p * p + q * q), 1 < g)c = d; else if (0 < g) {
            for (f = 0; f < e; ++f)h[f] = $b(b[c + f], b[d + f], g);
            h.length = e;
            return
        }
        for (f = 0; f < e; ++f)h[f] = b[c + f];
        h.length = e
    }

    function Vk(b, c, d, e, f) {
        var g = b[c], h = b[c + 1];
        for (c += e; c < d; c += e) {
            var k = b[c], n = b[c + 1], g = Tk(g, h, k, n);
            g > f && (f = g);
            g = k;
            h = n
        }
        return f
    }

    function Wk(b, c, d, e, f) {
        var g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g];
            f = Vk(b, c, k, e, f);
            c = k
        }
        return f
    }

    function Xk(b, c, d, e, f, g, h, k, n, p, q) {
        if (c == d)return p;
        var r;
        if (0 === f) {
            r = Tk(h, k, b[c], b[c + 1]);
            if (r < p) {
                for (q = 0; q < e; ++q)n[q] = b[c + q];
                n.length = e;
                return r
            }
            return p
        }
        for (var s = m(q) ? q : [NaN, NaN], v = c + e; v < d;)if (Uk(b, v - e, v, e, h, k, s), r = Tk(h, k, s[0], s[1]), r < p) {
            p = r;
            for (q = 0; q < e; ++q)n[q] = s[q];
            n.length = e;
            v += e
        } else v += e * Math.max((Math.sqrt(r) - Math.sqrt(p)) / f | 0, 1);
        if (g && (Uk(b, d - e, c, e, h, k, s), r = Tk(h, k, s[0], s[1]), r < p)) {
            p = r;
            for (q = 0; q < e; ++q)n[q] = s[q];
            n.length = e
        }
        return p
    }

    function Yk(b, c, d, e, f, g, h, k, n, p, q) {
        q = m(q) ? q : [NaN, NaN];
        var r, s;
        r = 0;
        for (s = d.length; r < s; ++r) {
            var v = d[r];
            p = Xk(b, c, v, e, f, g, h, k, n, p, q);
            c = v
        }
        return p
    };
    function Zk(b, c) {
        var d = 0, e, f;
        e = 0;
        for (f = c.length; e < f; ++e)b[d++] = c[e];
        return d
    }

    function $k(b, c, d, e) {
        var f, g;
        f = 0;
        for (g = d.length; f < g; ++f) {
            var h = d[f], k;
            for (k = 0; k < e; ++k)b[c++] = h[k]
        }
        return c
    }

    function al(b, c, d, e, f) {
        f = m(f) ? f : [];
        var g = 0, h, k;
        h = 0;
        for (k = d.length; h < k; ++h)c = $k(b, c, d[h], e), f[g++] = c;
        f.length = g;
        return f
    };
    function bl(b, c, d, e, f) {
        f = m(f) ? f : [];
        for (var g = 0; c < d; c += e)f[g++] = b.slice(c, c + e);
        f.length = g;
        return f
    }

    function cl(b, c, d, e, f) {
        f = m(f) ? f : [];
        var g = 0, h, k;
        h = 0;
        for (k = d.length; h < k; ++h) {
            var n = d[h];
            f[g++] = bl(b, c, n, e, f[g]);
            c = n
        }
        f.length = g;
        return f
    };
    function dl(b, c, d, e, f, g, h) {
        var k = (d - c) / e;
        if (3 > k) {
            for (; c < d; c += e)g[h++] = b[c], g[h++] = b[c + 1];
            return h
        }
        var n = Array(k);
        n[0] = 1;
        n[k - 1] = 1;
        d = [c, d - e];
        for (var p = 0, q; 0 < d.length;) {
            var r = d.pop(), s = d.pop(), v = 0, y = b[s], C = b[s + 1], F = b[r], G = b[r + 1];
            for (q = s + e; q < r; q += e) {
                var w = Sk(b[q], b[q + 1], y, C, F, G);
                w > v && (p = q, v = w)
            }
            v > f && (n[(p - c) / e] = 1, s + e < p && d.push(s, p), p + e < r && d.push(p, r))
        }
        for (q = 0; q < k; ++q)n[q] && (g[h++] = b[c + q * e], g[h++] = b[c + q * e + 1]);
        return h
    }

    function el(b, c, d, e, f, g, h, k) {
        var n, p;
        n = 0;
        for (p = d.length; n < p; ++n) {
            var q = d[n];
            a:{
                var r = b, s = q, v = e, y = f, C = g;
                if (c != s) {
                    var F = y * Math.round(r[c] / y), G = y * Math.round(r[c + 1] / y);
                    c += v;
                    C[h++] = F;
                    C[h++] = G;
                    var w = void 0, U = void 0;
                    do if (w = y * Math.round(r[c] / y), U = y * Math.round(r[c + 1] / y), c += v, c == s) {
                        C[h++] = w;
                        C[h++] = U;
                        break a
                    } while (w == F && U == G);
                    for (; c < s;) {
                        var N, Y;
                        N = y * Math.round(r[c] / y);
                        Y = y * Math.round(r[c + 1] / y);
                        c += v;
                        if (N != w || Y != U) {
                            var T = w - F, qa = U - G, vb = N - F, Ka = Y - G;
                            T * Ka == qa * vb && (0 > T && vb < T || T == vb || 0 < T && vb > T) && (0 > qa && Ka < qa || qa == Ka ||
                            0 < qa && Ka > qa) || (C[h++] = w, C[h++] = U, F = w, G = U);
                            w = N;
                            U = Y
                        }
                    }
                    C[h++] = w;
                    C[h++] = U
                }
            }
            k.push(h);
            c = q
        }
        return h
    };
    function fl(b, c) {
        Mk.call(this);
        this.b = this.n = -1;
        this.U(b, c)
    }

    u(fl, Mk);
    l = fl.prototype;
    l.clone = function () {
        var b = new fl(null);
        gl(b, this.a, this.k.slice());
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        this.b != this.c && (this.n = Math.sqrt(Vk(this.k, 0, this.k.length, this.s, 0)), this.b = this.c);
        return Xk(this.k, 0, this.k.length, this.s, this.n, !0, b, c, d, e)
    };
    l.nj = function () {
        return Qk(this.k, 0, this.k.length, this.s)
    };
    l.K = function () {
        return bl(this.k, 0, this.k.length, this.s)
    };
    l.mc = function (b) {
        var c = [];
        c.length = dl(this.k, 0, this.k.length, this.s, b, c, 0);
        b = new fl(null);
        gl(b, "XY", c);
        return b
    };
    l.H = function () {
        return "LinearRing"
    };
    l.U = function (b, c) {
        null === b ? gl(this, "XY", null) : (Pk(this, c, b, 1), null === this.k && (this.k = []), this.k.length = $k(this.k, 0, b, this.s), this.l())
    };
    function gl(b, c, d) {
        Ok(b, c, d);
        b.l()
    };
    function hl(b, c) {
        Mk.call(this);
        this.U(b, c)
    }

    u(hl, Mk);
    l = hl.prototype;
    l.clone = function () {
        var b = new hl(null);
        il(b, this.a, this.k.slice());
        return b
    };
    l.Va = function (b, c, d, e) {
        var f = this.k;
        b = Tk(b, c, f[0], f[1]);
        if (b < e) {
            e = this.s;
            for (c = 0; c < e; ++c)d[c] = f[c];
            d.length = e;
            return b
        }
        return e
    };
    l.K = function () {
        return null === this.k ? [] : this.k.slice()
    };
    l.D = function (b) {
        this.g != this.c && (this.extent = ce(this.k, this.extent), this.g = this.c);
        return te(this.extent, b)
    };
    l.H = function () {
        return "Point"
    };
    l.ha = function (b) {
        return ae(b, this.k[0], this.k[1])
    };
    l.U = function (b, c) {
        null === b ? il(this, "XY", null) : (Pk(this, c, b, 0), null === this.k && (this.k = []), this.k.length = Zk(this.k, b), this.l())
    };
    function il(b, c, d) {
        Ok(b, c, d);
        b.l()
    };
    function jl(b, c, d, e, f) {
        return !ge(f, function (f) {
            return !kl(b, c, d, e, f[0], f[1])
        })
    }

    function kl(b, c, d, e, f, g) {
        for (var h = !1, k = b[d - e], n = b[d - e + 1]; c < d; c += e) {
            var p = b[c], q = b[c + 1];
            n > g != q > g && f < (p - k) * (g - n) / (q - n) + k && (h = !h);
            k = p;
            n = q
        }
        return h
    }

    function ll(b, c, d, e, f, g) {
        if (0 === d.length || !kl(b, c, d[0], e, f, g))return !1;
        var h;
        c = 1;
        for (h = d.length; c < h; ++c)if (kl(b, d[c - 1], d[c], e, f, g))return !1;
        return !0
    };
    function ml(b, c, d, e, f, g, h) {
        var k, n, p, q, r, s = f[g + 1], v = [], y = d[0];
        p = b[y - e];
        r = b[y - e + 1];
        for (k = c; k < y; k += e) {
            q = b[k];
            n = b[k + 1];
            if (s <= r && n <= s || r <= s && s <= n)p = (s - r) / (n - r) * (q - p) + p, v.push(p);
            p = q;
            r = n
        }
        y = NaN;
        r = -Infinity;
        v.sort();
        p = v[0];
        k = 1;
        for (n = v.length; k < n; ++k) {
            q = v[k];
            var C = Math.abs(q - p);
            C > r && (p = (p + q) / 2, ll(b, c, d, e, p, s) && (y = p, r = C));
            p = q
        }
        isNaN(y) && (y = f[g]);
        return m(h) ? (h.push(y, s), h) : [y, s]
    };
    function nl(b, c, d, e, f) {
        for (var g = [b[c], b[c + 1]], h = [], k; c + e < d; c += e) {
            h[0] = b[c + e];
            h[1] = b[c + e + 1];
            if (k = f(g, h))return k;
            g[0] = h[0];
            g[1] = h[1]
        }
        return !1
    };
    function pl(b, c, d, e, f) {
        var g = fe(Vd(), b, c, d, e);
        return qe(f, g) ? $d(f, g) || g[0] >= f[0] && g[2] <= f[2] || g[1] >= f[1] && g[3] <= f[3] ? !0 : nl(b, c, d, e, function (b, c) {
            var d = !1, e = be(f, b), g = be(f, c);
            if (1 === e || 1 === g)d = !0; else {
                var r = f[0], s = f[1], v = f[2], y = f[3], C = c[0], F = c[1], G = (F - b[1]) / (C - b[0]);
                g & 2 && !(e & 2) ? (s = C - (F - y) / G, d = s >= r && s <= v) : g & 4 && !(e & 4) ? (r = F - (C - v) * G, d = r >= s && r <= y) : g & 8 && !(e & 8) ? (s = C - (F - s) / G, d = s >= r && s <= v) : g & 16 && !(e & 16) && (r = F - (C - r) * G, d = r >= s && r <= y)
            }
            return d
        }) : !1
    }

    function ql(b, c, d, e, f) {
        var g = d[0];
        if (!(pl(b, c, g, e, f) || kl(b, c, g, e, f[0], f[1]) || kl(b, c, g, e, f[0], f[3]) || kl(b, c, g, e, f[2], f[1]) || kl(b, c, g, e, f[2], f[3])))return !1;
        if (1 === d.length)return !0;
        c = 1;
        for (g = d.length; c < g; ++c)if (jl(b, d[c - 1], d[c], e, f))return !1;
        return !0
    };
    function rl(b, c, d, e) {
        for (var f = 0, g = b[d - e], h = b[d - e + 1]; c < d; c += e)var k = b[c], n = b[c + 1], f = f + (k - g) * (n + h), g = k, h = n;
        return 0 < f
    }

    function sl(b, c, d) {
        var e = 0, f, g;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var h = c[f], e = rl(b, e, h, d);
            if (0 === f ? !e : e)return !1;
            e = h
        }
        return !0
    }

    function tl(b, c, d, e) {
        var f, g;
        f = 0;
        for (g = d.length; f < g; ++f) {
            var h = d[f], k = rl(b, c, h, e);
            if (0 === f ? !k : k)for (var k = b, n = h, p = e; c < n - p;) {
                var q;
                for (q = 0; q < p; ++q) {
                    var r = k[c + q];
                    k[c + q] = k[n - p + q];
                    k[n - p + q] = r
                }
                c += p;
                n -= p
            }
            c = h
        }
        return c
    };
    function H(b, c) {
        Mk.call(this);
        this.b = [];
        this.p = -1;
        this.q = null;
        this.F = this.r = this.t = -1;
        this.n = null;
        this.U(b, c)
    }

    u(H, Mk);
    l = H.prototype;
    l.Ug = function (b) {
        null === this.k ? this.k = b.k.slice() : db(this.k, b.k);
        this.b.push(this.k.length);
        this.l()
    };
    l.clone = function () {
        var b = new H(null);
        ul(b, this.a, this.k.slice(), this.b.slice());
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        this.r != this.c && (this.t = Math.sqrt(Wk(this.k, 0, this.b, this.s, 0)), this.r = this.c);
        return Yk(this.k, 0, this.b, this.s, this.t, !0, b, c, d, e)
    };
    l.Jb = function (b, c) {
        return ll(vl(this), 0, this.b, this.s, b, c)
    };
    l.qj = function () {
        return Rk(vl(this), 0, this.b, this.s)
    };
    l.K = function () {
        return cl(this.k, 0, this.b, this.s)
    };
    function wl(b) {
        if (b.p != b.c) {
            var c = ke(b.D());
            b.q = ml(vl(b), 0, b.b, b.s, c, 0);
            b.p = b.c
        }
        return b.q
    }

    l.ph = function () {
        return new hl(wl(this))
    };
    l.vh = function () {
        return this.b.length
    };
    l.uh = function (b) {
        if (0 > b || this.b.length <= b)return null;
        var c = new fl(null);
        gl(c, this.a, this.k.slice(0 === b ? 0 : this.b[b - 1], this.b[b]));
        return c
    };
    l.dd = function () {
        var b = this.a, c = this.k, d = this.b, e = [], f = 0, g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g], n = new fl(null);
            gl(n, b, c.slice(f, k));
            e.push(n);
            f = k
        }
        return e
    };
    function vl(b) {
        if (b.F != b.c) {
            var c = b.k;
            sl(c, b.b, b.s) ? b.n = c : (b.n = c.slice(), b.n.length = tl(b.n, 0, b.b, b.s));
            b.F = b.c
        }
        return b.n
    }

    l.mc = function (b) {
        var c = [], d = [];
        c.length = el(this.k, 0, this.b, this.s, Math.sqrt(b), c, 0, d);
        b = new H(null);
        ul(b, "XY", c, d);
        return b
    };
    l.H = function () {
        return "Polygon"
    };
    l.ha = function (b) {
        return ql(vl(this), 0, this.b, this.s, b)
    };
    l.U = function (b, c) {
        if (null === b)ul(this, "XY", null, this.b); else {
            Pk(this, c, b, 2);
            null === this.k && (this.k = []);
            var d = al(this.k, 0, b, this.s, this.b);
            this.k.length = 0 === d.length ? 0 : d[d.length - 1];
            this.l()
        }
    };
    function ul(b, c, d, e) {
        Ok(b, c, d);
        b.b = e;
        b.l()
    }

    function xl(b, c, d, e) {
        var f = m(e) ? e : 32;
        e = [];
        var g;
        for (g = 0; g < f; ++g)db(e, b.offset(c, d, 2 * Math.PI * g / f));
        e.push(e[0], e[1]);
        b = new H(null);
        ul(b, "XY", e, [e.length]);
        return b
    };
    function yl(b, c, d, e, f, g, h) {
        uc.call(this, b, c);
        this.vectorContext = d;
        this.a = e;
        this.frameState = f;
        this.context = g;
        this.glContext = h
    }

    u(yl, uc);
    function zl(b) {
        this.b = this.c = this.e = this.d = this.a = null;
        this.f = b
    }

    u(zl, pc);
    function Al(b) {
        var c = b.e, d = b.c;
        b = Va([c, [c[0], d[1]], d, [d[0], c[1]]], b.a.Ga, b.a);
        b[4] = b[0].slice();
        return new H([b])
    }

    zl.prototype.M = function () {
        this.setMap(null)
    };
    zl.prototype.g = function (b) {
        var c = this.b, d = this.f;
        b.vectorContext.ic(Infinity, function (b) {
            b.wa(d.e, d.b);
            b.xa(d.c);
            b.Sb(c, null)
        })
    };
    zl.prototype.N = function () {
        return this.b
    };
    function Bl(b) {
        null === b.a || null === b.e || null === b.c || b.a.render()
    }

    zl.prototype.setMap = function (b) {
        null !== this.d && (Yc(this.d), this.d = null, this.a.render(), this.a = null);
        this.a = b;
        null !== this.a && (this.d = z(b, "postcompose", this.g, !1, this), Bl(this))
    };
    function Cl(b, c) {
        uc.call(this, b);
        this.coordinate = c
    }

    u(Cl, uc);
    function Dl(b) {
        zk.call(this, {handleDownEvent: El, handleDragEvent: Fl, handleUpEvent: Hl});
        b = m(b) ? b : {};
        this.f = new zl(m(b.style) ? b.style : null);
        this.d = null;
        this.i = m(b.condition) ? b.condition : dd
    }

    u(Dl, zk);
    function Fl(b) {
        if (yk(b)) {
            var c = this.f;
            b = b.pixel;
            c.e = this.d;
            c.c = b;
            c.b = Al(c);
            Bl(c)
        }
    }

    Dl.prototype.N = function () {
        return this.f.N()
    };
    Dl.prototype.g = ca;
    function Hl(b) {
        if (!yk(b))return !0;
        this.f.setMap(null);
        var c = b.pixel[0] - this.d[0], d = b.pixel[1] - this.d[1];
        64 <= c * c + d * d && (this.g(b), this.dispatchEvent(new Cl("boxend", b.coordinate)));
        return !1
    }

    function El(b) {
        if (yk(b) && Cc(b.a) && this.i(b)) {
            this.d = b.pixel;
            this.f.setMap(b.map);
            var c = this.f, d = this.d;
            c.e = this.d;
            c.c = d;
            c.b = Al(c);
            Bl(c);
            this.dispatchEvent(new Cl("boxstart", b.coordinate));
            return !0
        }
        return !1
    };
    function Il() {
        this.c = -1
    };
    function Jl() {
        this.c = -1;
        this.c = 64;
        this.a = Array(4);
        this.e = Array(this.c);
        this.d = this.b = 0;
        this.a[0] = 1732584193;
        this.a[1] = 4023233417;
        this.a[2] = 2562383102;
        this.a[3] = 271733878;
        this.d = this.b = 0
    }

    u(Jl, Il);
    function Kl(b, c, d) {
        d || (d = 0);
        var e = Array(16);
        if (ia(c))for (var f = 0; 16 > f; ++f)e[f] = c.charCodeAt(d++) | c.charCodeAt(d++) << 8 | c.charCodeAt(d++) << 16 | c.charCodeAt(d++) << 24; else for (f = 0; 16 > f; ++f)e[f] = c[d++] | c[d++] << 8 | c[d++] << 16 | c[d++] << 24;
        c = b.a[0];
        d = b.a[1];
        var f = b.a[2], g = b.a[3], h = 0, h = c + (g ^ d & (f ^ g)) + e[0] + 3614090360 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[1] + 3905402710 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[2] + 606105819 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^
        c)) + e[3] + 3250441966 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[4] + 4118548399 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[5] + 1200080426 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[6] + 2821735955 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[7] + 4249261313 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[8] + 1770035416 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[9] + 2336552879 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f +
        (d ^ g & (c ^ d)) + e[10] + 4294925233 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[11] + 2304563134 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[12] + 1804603682 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[13] + 4254626195 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[14] + 2792965006 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[15] + 1236535329 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (f ^ g & (d ^ f)) + e[1] + 4129170786 & 4294967295;
        c = d + (h << 5 & 4294967295 |
        h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[6] + 3225465664 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[11] + 643717713 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[0] + 3921069994 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[5] + 3593408605 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[10] + 38016083 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[15] + 3634488961 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[4] + 3889429448 & 4294967295;
        d = f + (h << 20 & 4294967295 |
        h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[9] + 568446438 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[14] + 3275163606 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[3] + 4107603335 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[8] + 1163531501 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[13] + 2850285829 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[2] + 4243563512 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[7] + 1735328473 & 4294967295;
        f = g + (h << 14 & 4294967295 |
        h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[12] + 2368359562 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (d ^ f ^ g) + e[5] + 4294588738 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[8] + 2272392833 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[11] + 1839030562 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[14] + 4259657740 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[1] + 2763975236 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[4] + 1272893353 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^
        c ^ d) + e[7] + 4139469664 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[10] + 3200236656 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[13] + 681279174 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[0] + 3936430074 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[3] + 3572445317 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[6] + 76029189 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[9] + 3654602809 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[12] + 3873151461 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[15] + 530742520 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[2] + 3299628645 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (f ^ (d | ~g)) + e[0] + 4096336452 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[7] + 1126891415 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[14] + 2878612391 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[5] + 4237533241 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[12] + 1700485571 & 4294967295;
        c = d +
        (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[3] + 2399980690 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[10] + 4293915773 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[1] + 2240044497 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[8] + 1873313359 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[15] + 4264355552 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[6] + 2734768916 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[13] + 1309151649 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[4] + 4149444226 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[11] + 3174756917 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[2] + 718787259 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[9] + 3951481745 & 4294967295;
        b.a[0] = b.a[0] + c & 4294967295;
        b.a[1] = b.a[1] + (f + (h << 21 & 4294967295 | h >>> 11)) & 4294967295;
        b.a[2] = b.a[2] + f & 4294967295;
        b.a[3] = b.a[3] + g & 4294967295
    }

    Jl.prototype.update = function (b, c) {
        m(c) || (c = b.length);
        for (var d = c - this.c, e = this.e, f = this.b, g = 0; g < c;) {
            if (0 == f)for (; g <= d;)Kl(this, b, g), g += this.c;
            if (ia(b))for (; g < c;) {
                if (e[f++] = b.charCodeAt(g++), f == this.c) {
                    Kl(this, e);
                    f = 0;
                    break
                }
            } else for (; g < c;)if (e[f++] = b[g++], f == this.c) {
                Kl(this, e);
                f = 0;
                break
            }
        }
        this.b = f;
        this.d += c
    };
    function Ll(b) {
        b = m(b) ? b : {};
        this.a = m(b.color) ? b.color : null;
        this.d = b.lineCap;
        this.b = m(b.lineDash) ? b.lineDash : null;
        this.e = b.lineJoin;
        this.f = b.miterLimit;
        this.c = b.width;
        this.g = void 0
    }

    l = Ll.prototype;
    l.Vj = function () {
        return this.a
    };
    l.rh = function () {
        return this.d
    };
    l.Wj = function () {
        return this.b
    };
    l.sh = function () {
        return this.e
    };
    l.xh = function () {
        return this.f
    };
    l.Xj = function () {
        return this.c
    };
    l.Yj = function (b) {
        this.a = b;
        this.g = void 0
    };
    l.el = function (b) {
        this.d = b;
        this.g = void 0
    };
    l.Zj = function (b) {
        this.b = b;
        this.g = void 0
    };
    l.fl = function (b) {
        this.e = b;
        this.g = void 0
    };
    l.gl = function (b) {
        this.f = b;
        this.g = void 0
    };
    l.ol = function (b) {
        this.c = b;
        this.g = void 0
    };
    l.ub = function () {
        if (!m(this.g)) {
            var b = "s" + (null === this.a ? "-" : wg(this.a)) + "," + (m(this.d) ? this.d.toString() : "-") + "," + (null === this.b ? "-" : this.b.toString()) + "," + (m(this.e) ? this.e : "-") + "," + (m(this.f) ? this.f.toString() : "-") + "," + (m(this.c) ? this.c.toString() : "-"), c = new Jl;
            c.update(b);
            var d = Array((56 > c.b ? c.c : 2 * c.c) - c.b);
            d[0] = 128;
            for (b = 1; b < d.length - 8; ++b)d[b] = 0;
            for (var e = 8 * c.d, b = d.length - 8; b < d.length; ++b)d[b] = e & 255, e /= 256;
            c.update(d);
            d = Array(16);
            for (b = e = 0; 4 > b; ++b)for (var f = 0; 32 > f; f += 8)d[e++] = c.a[b] >>> f & 255;
            if (8192 > d.length)c = String.fromCharCode.apply(null, d); else for (c = "", b = 0; b < d.length; b += 8192)c += String.fromCharCode.apply(null, fb(d, b, b + 8192));
            this.g = c
        }
        return this.g
    };
    var Ml = [0, 0, 0, 1], Nl = [], Ol = [0, 0, 0, 1];

    function Pl(b) {
        b = m(b) ? b : {};
        this.a = m(b.color) ? b.color : null;
        this.c = void 0
    }

    Pl.prototype.b = function () {
        return this.a
    };
    Pl.prototype.d = function (b) {
        this.a = b;
        this.c = void 0
    };
    Pl.prototype.ub = function () {
        m(this.c) || (this.c = "f" + (null === this.a ? "-" : wg(this.a)));
        return this.c
    };
    function Ql(b) {
        b = m(b) ? b : {};
        this.f = this.a = this.e = null;
        this.d = m(b.fill) ? b.fill : null;
        this.c = m(b.stroke) ? b.stroke : null;
        this.b = b.radius;
        this.j = [0, 0];
        this.o = this.t = this.g = null;
        var c = b.atlasManager, d, e = null, f, g = 0;
        null !== this.c && (f = wg(this.c.a), g = this.c.c, m(g) || (g = 1), e = this.c.b, cg || (e = null));
        var h = 2 * (this.b + g) + 1;
        f = {strokeStyle: f, Nc: g, size: h, lineDash: e};
        m(c) ? (h = Math.round(h), (e = null === this.d) && (d = sa(this.Bf, this, f)), g = this.ub(), f = c.add(g, h, h, sa(this.Cf, this, f), d), this.a = f.image, this.j = [f.offsetX, f.offsetY],
            d = f.image.width, this.f = e ? f.kf : this.a) : (this.a = If("CANVAS"), this.a.height = h, this.a.width = h, d = h = this.a.width, c = this.a.getContext("2d"), this.Cf(f, c, 0, 0), null === this.d ? (c = this.f = If("CANVAS"), c.height = f.size, c.width = f.size, c = c.getContext("2d"), this.Bf(f, c, 0, 0)) : this.f = this.a);
        this.g = [h / 2, h / 2];
        this.t = [h, h];
        this.o = [d, d];
        Rj.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: 0,
            scale: 1,
            snapToPixel: m(b.snapToPixel) ? b.snapToPixel : !0
        })
    }

    u(Ql, Rj);
    l = Ql.prototype;
    l.tb = function () {
        return this.g
    };
    l.Mj = function () {
        return this.d
    };
    l.te = function () {
        return this.f
    };
    l.yb = function () {
        return this.a
    };
    l.ue = function () {
        return 2
    };
    l.cd = function () {
        return this.o
    };
    l.zb = function () {
        return this.j
    };
    l.Nj = function () {
        return this.b
    };
    l.ab = function () {
        return this.t
    };
    l.Oj = function () {
        return this.c
    };
    l.ne = ca;
    l.load = ca;
    l.Ge = ca;
    l.Cf = function (b, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        c.arc(b.size / 2, b.size / 2, this.b, 0, 2 * Math.PI, !0);
        null !== this.d && (c.fillStyle = wg(this.d.a), c.fill());
        null !== this.c && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Nc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.Bf = function (b, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        c.arc(b.size / 2, b.size / 2, this.b, 0, 2 * Math.PI, !0);
        c.fillStyle = Ml;
        c.fill();
        null !== this.c && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Nc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.ub = function () {
        var b = null === this.c ? "-" : this.c.ub(), c = null === this.d ? "-" : this.d.ub();
        if (null === this.e || b != this.e[1] || c != this.e[2] || this.b != this.e[3])this.e = ["c" + b + c + (m(this.b) ? this.b.toString() : "-"), b, c, this.b];
        return this.e[0]
    };
    function Rl(b) {
        b = m(b) ? b : {};
        this.g = null;
        this.d = Sl;
        m(b.geometry) && this.Ff(b.geometry);
        this.e = m(b.fill) ? b.fill : null;
        this.f = m(b.image) ? b.image : null;
        this.b = m(b.stroke) ? b.stroke : null;
        this.c = m(b.text) ? b.text : null;
        this.a = b.zIndex
    }

    l = Rl.prototype;
    l.N = function () {
        return this.g
    };
    l.lh = function () {
        return this.d
    };
    l.$j = function () {
        return this.e
    };
    l.ak = function () {
        return this.f
    };
    l.bk = function () {
        return this.b
    };
    l.ck = function () {
        return this.c
    };
    l.Nh = function () {
        return this.a
    };
    l.Ff = function (b) {
        ka(b) ? this.d = b : ia(b) ? this.d = function (c) {
            return c.get(b)
        } : null === b ? this.d = Sl : m(b) && (this.d = function () {
            return b
        });
        this.g = b
    };
    l.ql = function (b) {
        this.a = b
    };
    function Tl(b) {
        ka(b) || (b = ga(b) ? b : [b], b = bd(b));
        return b
    }

    function Ul() {
        var b = new Pl({color: "rgba(255,255,255,0.4)"}), c = new Ll({
            color: "#3399CC",
            width: 1.25
        }), d = [new Rl({image: new Ql({fill: b, stroke: c, radius: 5}), fill: b, stroke: c})];
        Ul = function () {
            return d
        };
        return d
    }

    function Vl() {
        var b = {}, c = [255, 255, 255, 1], d = [0, 153, 255, 1];
        b.Polygon = [new Rl({fill: new Pl({color: [255, 255, 255, .5]})})];
        b.MultiPolygon = b.Polygon;
        b.LineString = [new Rl({stroke: new Ll({color: c, width: 5})}), new Rl({stroke: new Ll({color: d, width: 3})})];
        b.MultiLineString = b.LineString;
        b.Point = [new Rl({
            image: new Ql({radius: 6, fill: new Pl({color: d}), stroke: new Ll({color: c, width: 1.5})}),
            zIndex: Infinity
        })];
        b.MultiPoint = b.Point;
        b.GeometryCollection = b.Polygon.concat(b.Point);
        return b
    }

    function Sl(b) {
        return b.N()
    };
    function Wl(b) {
        var c = m(b) ? b : {};
        b = m(c.condition) ? c.condition : wk;
        c = m(c.style) ? c.style : new Rl({stroke: new Ll({color: [0, 0, 255, 1]})});
        Dl.call(this, {condition: b, style: c})
    }

    u(Wl, Dl);
    Wl.prototype.g = function () {
        var b = this.n, c = b.a(), d = this.N().D(), e = ke(d), f = b.e(), d = c.n(d, f), d = c.constrainResolution(d, 0, void 0);
        pk(b, c, d, e, 200)
    };
    function Xl(b) {
        mk.call(this, {handleEvent: Yl});
        b = m(b) ? b : {};
        this.d = m(b.condition) ? b.condition : id(vk, xk);
        this.e = m(b.pixelDelta) ? b.pixelDelta : 128
    }

    u(Xl, mk);
    function Yl(b) {
        var c = !1;
        if ("key" == b.type) {
            var d = b.a.e;
            if (this.d(b) && (40 == d || 37 == d || 39 == d || 38 == d)) {
                var e = b.map, c = e.a(), f = $e(c), g = f.resolution * this.e, h = 0, k = 0;
                40 == d ? k = -g : 37 == d ? h = -g : 39 == d ? h = g : k = g;
                d = [h, k];
                Dd(d, f.rotation);
                f = c.a();
                m(f) && (m(100) && e.Ua(gf({
                    source: f,
                    duration: 100,
                    easing: ef
                })), e = c.i([f[0] + d[0], f[1] + d[1]]), c.Oa(e));
                b.preventDefault();
                c = !0
            }
        }
        return !c
    };
    function Zl(b) {
        mk.call(this, {handleEvent: $l});
        b = m(b) ? b : {};
        this.e = m(b.condition) ? b.condition : xk;
        this.d = m(b.delta) ? b.delta : 1;
        this.f = m(b.duration) ? b.duration : 100
    }

    u(Zl, mk);
    function $l(b) {
        var c = !1;
        if ("key" == b.type) {
            var d = b.a.i;
            if (this.e(b) && (43 == d || 45 == d)) {
                c = b.map;
                d = 43 == d ? this.d : -this.d;
                c.render();
                var e = c.a();
                ok(c, e, d, void 0, this.f);
                b.preventDefault();
                c = !0
            }
        }
        return !c
    };
    function am(b) {
        mk.call(this, {handleEvent: bm});
        b = m(b) ? b : {};
        this.d = 0;
        this.j = m(b.duration) ? b.duration : 250;
        this.f = null;
        this.g = this.e = void 0
    }

    u(am, mk);
    function bm(b) {
        var c = !1;
        if ("mousewheel" == b.type) {
            var c = b.map, d = b.a;
            this.f = b.coordinate;
            this.d += d.j;
            m(this.e) || (this.e = ua());
            d = Math.max(80 - (ua() - this.e), 0);
            ba.clearTimeout(this.g);
            this.g = ba.setTimeout(sa(this.i, this, c), d);
            b.preventDefault();
            c = !0
        }
        return !c
    }

    am.prototype.i = function (b) {
        var c = Yb(this.d, -1, 1), d = b.a();
        b.render();
        ok(b, d, -c, this.f, this.j);
        this.d = 0;
        this.f = null;
        this.g = this.e = void 0
    };
    function cm(b) {
        zk.call(this, {handleDownEvent: dm, handleDragEvent: em, handleUpEvent: fm});
        b = m(b) ? b : {};
        this.f = null;
        this.g = void 0;
        this.d = !1;
        this.i = 0;
        this.j = m(b.threshold) ? b.threshold : .3
    }

    u(cm, zk);
    function em(b) {
        var c = 0, d = this.e[0], e = this.e[1], d = Math.atan2(e.clientY - d.clientY, e.clientX - d.clientX);
        m(this.g) && (c = d - this.g, this.i += c, !this.d && Math.abs(this.i) > this.j && (this.d = !0));
        this.g = d;
        b = b.map;
        d = Og(b.b);
        e = Bk(this.e);
        e[0] -= d.x;
        e[1] -= d.y;
        this.f = b.Ga(e);
        this.d && (d = b.a(), e = $e(d), b.render(), nk(b, d, e.rotation + c, this.f))
    }

    function fm(b) {
        if (2 > this.e.length) {
            b = b.map;
            var c = b.a();
            bf(c, -1);
            if (this.d) {
                var d = $e(c).rotation, e = this.f, d = c.constrainRotation(d, 0);
                nk(b, c, d, e, 250)
            }
            return !1
        }
        return !0
    }

    function dm(b) {
        return 2 <= this.e.length ? (b = b.map, this.f = null, this.g = void 0, this.d = !1, this.i = 0, this.p || bf(b.a(), 1), b.render(), !0) : !1
    }

    cm.prototype.q = cd;
    function gm(b) {
        zk.call(this, {handleDownEvent: hm, handleDragEvent: im, handleUpEvent: jm});
        b = m(b) ? b : {};
        this.f = null;
        this.i = m(b.duration) ? b.duration : 400;
        this.d = void 0;
        this.g = 1
    }

    u(gm, zk);
    function im(b) {
        var c = 1, d = this.e[0], e = this.e[1], f = d.clientX - e.clientX, d = d.clientY - e.clientY, f = Math.sqrt(f * f + d * d);
        m(this.d) && (c = this.d / f);
        this.d = f;
        1 != c && (this.g = c);
        b = b.map;
        var f = b.a(), d = $e(f), e = Og(b.b), g = Bk(this.e);
        g[0] -= e.x;
        g[1] -= e.y;
        this.f = b.Ga(g);
        b.render();
        pk(b, f, d.resolution * c, this.f)
    }

    function jm(b) {
        if (2 > this.e.length) {
            b = b.map;
            var c = b.a();
            bf(c, -1);
            var d = $e(c).resolution, e = this.f, f = this.i, d = c.constrainResolution(d, 0, this.g - 1);
            pk(b, c, d, e, f);
            return !1
        }
        return !0
    }

    function hm(b) {
        return 2 <= this.e.length ? (b = b.map, this.f = null, this.d = void 0, this.g = 1, this.p || bf(b.a(), 1), b.render(), !0) : !1
    }

    gm.prototype.q = cd;
    function km(b) {
        b = m(b) ? b : {};
        var c = new B, d = new jk(-.005, .05, 100);
        (m(b.altShiftDragRotate) ? b.altShiftDragRotate : 1) && c.push(new Gk);
        (m(b.doubleClickZoom) ? b.doubleClickZoom : 1) && c.push(new qk({
            delta: b.zoomDelta,
            duration: b.zoomDuration
        }));
        (m(b.dragPan) ? b.dragPan : 1) && c.push(new Ck({kinetic: d}));
        (m(b.pinchRotate) ? b.pinchRotate : 1) && c.push(new cm);
        (m(b.pinchZoom) ? b.pinchZoom : 1) && c.push(new gm({duration: b.zoomDuration}));
        if (m(b.keyboard) ? b.keyboard : 1)c.push(new Xl), c.push(new Zl({
            delta: b.zoomDelta,
            duration: b.zoomDuration
        }));
        (m(b.mouseWheelZoom) ? b.mouseWheelZoom : 1) && c.push(new am({duration: b.zoomDuration}));
        (m(b.shiftDragZoom) ? b.shiftDragZoom : 1) && c.push(new Wl);
        return c
    };
    function I(b) {
        var c = m(b) ? b : {};
        b = Cb(c);
        delete b.layers;
        c = c.layers;
        D.call(this, b);
        this.a = null;
        z(this, xd("layersNames"), this.ei, !1, this);
        null != c ? ga(c) && (c = new B(cb(c))) : c = new B;
        this.r(c)
    }

    u(I, D);
    l = I.prototype;
    l.ff = function () {
        this.b() && this.l()
    };
    l.ei = function () {
        null !== this.a && (Ta(rb(this.a), Yc), this.a = null);
        var b = this.Yb();
        if (null != b) {
            this.a = {add: z(b, "add", this.di, !1, this), remove: z(b, "remove", this.fi, !1, this)};
            var b = b.a, c, d, e;
            c = 0;
            for (d = b.length; c < d; c++)e = b[c], this.a[ma(e).toString()] = z(e, ["propertychange", "change"], this.ff, !1, this)
        }
        this.l()
    };
    l.di = function (b) {
        b = b.element;
        this.a[ma(b).toString()] = z(b, ["propertychange", "change"], this.ff, !1, this);
        this.l()
    };
    l.fi = function (b) {
        b = ma(b.element).toString();
        Yc(this.a[b]);
        delete this.a[b];
        this.l()
    };
    l.Yb = function () {
        return this.get("layersNames")
    };
    I.prototype.getLayers = I.prototype.Yb;
    I.prototype.r = function (b) {
        this.set("layersNames", b)
    };
    I.prototype.setLayers = I.prototype.r;
    I.prototype.Da = function (b) {
        var c = m(b) ? b : [], d = c.length;
        this.Yb().forEach(function (b) {
            b.Da(c)
        });
        b = sj(this);
        var e, f;
        for (e = c.length; d < e; d++)f = c[d], f.brightness = Yb(f.brightness + b.brightness, -1, 1), f.contrast *= b.contrast, f.hue += b.hue, f.opacity *= b.opacity, f.saturation *= b.saturation, f.visible = f.visible && b.visible, f.maxResolution = Math.min(f.maxResolution, b.maxResolution), f.minResolution = Math.max(f.minResolution, b.minResolution), m(b.extent) && (f.extent = m(f.extent) ? pe(f.extent, b.extent) : b.extent);
        return c
    };
    I.prototype.Ta = function () {
        return "ready"
    };
    function lm(b) {
        Be.call(this, {code: b, units: "m", extent: mm, global: !0, worldExtent: nm})
    }

    u(lm, Be);
    lm.prototype.je = function (b, c) {
        var d = c[1] / 6378137;
        return b / ((Math.exp(d) + Math.exp(-d)) / 2)
    };
    var om = 6378137 * Math.PI, mm = [-om, -om, om, om], nm = [-180, -85, 180, 85], Me = Va("EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" "), function (b) {
        return new lm(b)
    });

    function Ne(b, c, d) {
        var e = b.length;
        d = 1 < d ? d : 2;
        m(c) || (2 < d ? c = b.slice() : c = Array(e));
        for (var f = 0; f < e; f += d)c[f] = 6378137 * Math.PI * b[f] / 180, c[f + 1] = 6378137 * Math.log(Math.tan(Math.PI * (b[f + 1] + 90) / 360));
        return c
    }

    function Oe(b, c, d) {
        var e = b.length;
        d = 1 < d ? d : 2;
        m(c) || (2 < d ? c = b.slice() : c = Array(e));
        for (var f = 0; f < e; f += d)c[f] = 180 * b[f] / (6378137 * Math.PI), c[f + 1] = 360 * Math.atan(Math.exp(b[f + 1] / 6378137)) / Math.PI - 90;
        return c
    };
    function pm(b, c) {
        Be.call(this, {code: b, units: "degrees", extent: qm, axisOrientation: c, global: !0, worldExtent: qm})
    }

    u(pm, Be);
    pm.prototype.je = function (b) {
        return b
    };
    var qm = [-180, -90, 180, 90], Pe = [new pm("CRS:84"), new pm("EPSG:4326", "neu"), new pm("urn:ogc:def:crs:EPSG::4326", "neu"), new pm("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new pm("urn:ogc:def:crs:OGC:1.3:CRS84"), new pm("urn:ogc:def:crs:OGC:2:84"), new pm("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new pm("urn:x-ogc:def:crs:EPSG:4326", "neu")];

    function rm() {
        He(Me);
        He(Pe);
        Le()
    };
    function J(b) {
        E.call(this, m(b) ? b : {})
    }

    u(J, E);
    function K(b) {
        E.call(this, m(b) ? b : {})
    }

    u(K, E);
    K.prototype.r = function () {
        return this.get("preload")
    };
    K.prototype.getPreload = K.prototype.r;
    K.prototype.oa = function (b) {
        this.set("preload", b)
    };
    K.prototype.setPreload = K.prototype.oa;
    K.prototype.ea = function () {
        return this.get("useInterimTilesOnError")
    };
    K.prototype.getUseInterimTilesOnError = K.prototype.ea;
    K.prototype.qa = function (b) {
        this.set("useInterimTilesOnError", b)
    };
    K.prototype.setUseInterimTilesOnError = K.prototype.qa;
    function L(b) {
        b = m(b) ? b : {};
        var c = Cb(b);
        delete c.style;
        E.call(this, c);
        this.Ab = m(b.renderBuffer) ? b.renderBuffer : 100;
        this.eb = null;
        this.r = void 0;
        this.oa(b.style)
    }

    u(L, E);
    L.prototype.Uc = function () {
        return this.eb
    };
    L.prototype.Vc = function () {
        return this.r
    };
    L.prototype.oa = function (b) {
        this.eb = m(b) ? b : Ul;
        this.r = null === b ? void 0 : Tl(this.eb);
        this.l()
    };
    function sm(b, c, d, e, f) {
        this.p = {};
        this.b = b;
        this.r = c;
        this.e = d;
        this.F = e;
        this.eb = f;
        this.f = this.a = this.c = this.Ra = this.ga = this.la = null;
        this.ea = this.Sa = this.j = this.V = this.Q = this.J = 0;
        this.Da = !1;
        this.g = this.oa = 0;
        this.Ea = !1;
        this.ba = 0;
        this.d = "";
        this.i = this.t = this.Ta = this.qa = 0;
        this.ca = this.n = this.o = null;
        this.q = [];
        this.ec = Kd()
    }

    function tm(b, c, d) {
        if (null !== b.f) {
            c = Lk(c, 0, d, 2, b.F, b.q);
            d = b.b;
            var e = b.ec, f = d.globalAlpha;
            1 != b.j && (d.globalAlpha = f * b.j);
            var g = b.oa;
            b.Da && (g += b.eb);
            var h, k;
            h = 0;
            for (k = c.length; h < k; h += 2) {
                var n = c[h] - b.J, p = c[h + 1] - b.Q;
                b.Ea && (n = n + .5 | 0, p = p + .5 | 0);
                if (0 !== g || 1 != b.g) {
                    var q = n + b.J, r = p + b.Q;
                    Vj(e, q, r, b.g, b.g, g, -q, -r);
                    d.setTransform(e[0], e[1], e[4], e[5], e[12], e[13])
                }
                d.drawImage(b.f, b.Sa, b.ea, b.ba, b.V, n, p, b.ba, b.V)
            }
            0 === g && 1 == b.g || d.setTransform(1, 0, 0, 1, 0, 0);
            1 != b.j && (d.globalAlpha = f)
        }
    }

    function um(b, c, d, e) {
        var f = 0;
        if (null !== b.ca && "" !== b.d) {
            null === b.o || vm(b, b.o);
            null === b.n || wm(b, b.n);
            var g = b.ca, h = b.b, k = b.Ra;
            null === k ? (h.font = g.font, h.textAlign = g.textAlign, h.textBaseline = g.textBaseline, b.Ra = {
                font: g.font,
                textAlign: g.textAlign,
                textBaseline: g.textBaseline
            }) : (k.font != g.font && (k.font = h.font = g.font), k.textAlign != g.textAlign && (k.textAlign = h.textAlign = g.textAlign), k.textBaseline != g.textBaseline && (k.textBaseline = h.textBaseline = g.textBaseline));
            c = Lk(c, f, d, e, b.F, b.q);
            for (g = b.b; f < d; f += e) {
                h = c[f] +
                b.qa;
                k = c[f + 1] + b.Ta;
                if (0 !== b.t || 1 != b.i) {
                    var n = Vj(b.ec, h, k, b.i, b.i, b.t, -h, -k);
                    g.setTransform(n[0], n[1], n[4], n[5], n[12], n[13])
                }
                null === b.n || g.strokeText(b.d, h, k);
                null === b.o || g.fillText(b.d, h, k)
            }
            0 === b.t && 1 == b.i || g.setTransform(1, 0, 0, 1, 0, 0)
        }
    }

    function xm(b, c, d, e, f, g) {
        var h = b.b;
        b = Lk(c, d, e, f, b.F, b.q);
        h.moveTo(b[0], b[1]);
        for (c = 2; c < b.length; c += 2)h.lineTo(b[c], b[c + 1]);
        g && h.lineTo(b[0], b[1]);
        return e
    }

    function ym(b, c, d, e, f) {
        var g = b.b, h, k;
        h = 0;
        for (k = e.length; h < k; ++h)d = xm(b, c, d, e[h], f, !0), g.closePath();
        return d
    }

    l = sm.prototype;
    l.ic = function (b, c) {
        var d = b.toString(), e = this.p[d];
        m(e) ? e.push(c) : this.p[d] = [c]
    };
    l.jc = function (b) {
        if (qe(this.e, b.D())) {
            if (null !== this.c || null !== this.a) {
                null === this.c || vm(this, this.c);
                null === this.a || wm(this, this.a);
                var c;
                c = b.k;
                c = null === c ? null : Lk(c, 0, c.length, b.s, this.F, this.q);
                var d = c[2] - c[0], e = c[3] - c[1], d = Math.sqrt(d * d + e * e), e = this.b;
                e.beginPath();
                e.arc(c[0], c[1], d, 0, 2 * Math.PI);
                null === this.c || e.fill();
                null === this.a || e.stroke()
            }
            "" !== this.d && um(this, b.qe(), 2, 2)
        }
    };
    l.ee = function (b, c) {
        var d = (0, c.d)(b);
        if (null != d && qe(this.e, d.D())) {
            var e = c.a;
            m(e) || (e = 0);
            this.ic(e, function (b) {
                b.wa(c.e, c.b);
                b.cb(c.f);
                b.xa(c.c);
                zm[d.H()].call(b, d, null)
            })
        }
    };
    l.Zc = function (b, c) {
        var d = b.d, e, f;
        e = 0;
        for (f = d.length; e < f; ++e) {
            var g = d[e];
            zm[g.H()].call(this, g, c)
        }
    };
    l.rb = function (b) {
        var c = b.k;
        b = b.s;
        null === this.f || tm(this, c, c.length);
        "" !== this.d && um(this, c, c.length, b)
    };
    l.qb = function (b) {
        var c = b.k;
        b = b.s;
        null === this.f || tm(this, c, c.length);
        "" !== this.d && um(this, c, c.length, b)
    };
    l.Cb = function (b) {
        if (qe(this.e, b.D())) {
            if (null !== this.a) {
                wm(this, this.a);
                var c = this.b, d = b.k;
                c.beginPath();
                xm(this, d, 0, d.length, b.s, !1);
                c.stroke()
            }
            "" !== this.d && (b = Am(b), um(this, b, 2, 2))
        }
    };
    l.kc = function (b) {
        var c = b.D();
        if (qe(this.e, c)) {
            if (null !== this.a) {
                wm(this, this.a);
                var c = this.b, d = b.k, e = 0, f = b.b, g = b.s;
                c.beginPath();
                var h, k;
                h = 0;
                for (k = f.length; h < k; ++h)e = xm(this, d, e, f[h], g, !1);
                c.stroke()
            }
            "" !== this.d && (b = Bm(b), um(this, b, b.length, 2))
        }
    };
    l.Sb = function (b) {
        if (qe(this.e, b.D())) {
            if (null !== this.a || null !== this.c) {
                null === this.c || vm(this, this.c);
                null === this.a || wm(this, this.a);
                var c = this.b;
                c.beginPath();
                ym(this, vl(b), 0, b.b, b.s);
                null === this.c || c.fill();
                null === this.a || c.stroke()
            }
            "" !== this.d && (b = wl(b), um(this, b, 2, 2))
        }
    };
    l.lc = function (b) {
        if (qe(this.e, b.D())) {
            if (null !== this.a || null !== this.c) {
                null === this.c || vm(this, this.c);
                null === this.a || wm(this, this.a);
                var c = this.b, d = Cm(b), e = 0, f = b.b, g = b.s, h, k;
                h = 0;
                for (k = f.length; h < k; ++h) {
                    var n = f[h];
                    c.beginPath();
                    e = ym(this, d, e, n, g);
                    null === this.c || c.fill();
                    null === this.a || c.stroke()
                }
            }
            "" !== this.d && (b = Dm(b), um(this, b, b.length, 2))
        }
    };
    function Em(b) {
        var c = Va(sb(b.p), Number);
        gb(c);
        var d, e, f, g, h;
        d = 0;
        for (e = c.length; d < e; ++d)for (f = b.p[c[d].toString()], g = 0, h = f.length; g < h; ++g)f[g](b)
    }

    function vm(b, c) {
        var d = b.b, e = b.la;
        null === e ? (d.fillStyle = c.fillStyle, b.la = {fillStyle: c.fillStyle}) : e.fillStyle != c.fillStyle && (e.fillStyle = d.fillStyle = c.fillStyle)
    }

    function wm(b, c) {
        var d = b.b, e = b.ga;
        null === e ? (d.lineCap = c.lineCap, cg && d.setLineDash(c.lineDash), d.lineJoin = c.lineJoin, d.lineWidth = c.lineWidth, d.miterLimit = c.miterLimit, d.strokeStyle = c.strokeStyle, b.ga = {
            lineCap: c.lineCap,
            lineDash: c.lineDash,
            lineJoin: c.lineJoin,
            lineWidth: c.lineWidth,
            miterLimit: c.miterLimit,
            strokeStyle: c.strokeStyle
        }) : (e.lineCap != c.lineCap && (e.lineCap = d.lineCap = c.lineCap), cg && !ib(e.lineDash, c.lineDash) && d.setLineDash(e.lineDash = c.lineDash), e.lineJoin != c.lineJoin && (e.lineJoin = d.lineJoin =
            c.lineJoin), e.lineWidth != c.lineWidth && (e.lineWidth = d.lineWidth = c.lineWidth), e.miterLimit != c.miterLimit && (e.miterLimit = d.miterLimit = c.miterLimit), e.strokeStyle != c.strokeStyle && (e.strokeStyle = d.strokeStyle = c.strokeStyle))
    }

    l.wa = function (b, c) {
        if (null === b)this.c = null; else {
            var d = b.a;
            this.c = {fillStyle: wg(null === d ? Ml : d)}
        }
        if (null === c)this.a = null; else {
            var d = c.a, e = c.d, f = c.b, g = c.e, h = c.c, k = c.f;
            this.a = {
                lineCap: m(e) ? e : "round",
                lineDash: null != f ? f : Nl,
                lineJoin: m(g) ? g : "round",
                lineWidth: this.r * (m(h) ? h : 1),
                miterLimit: m(k) ? k : 10,
                strokeStyle: wg(null === d ? Ol : d)
            }
        }
    };
    l.cb = function (b) {
        if (null === b)this.f = null; else {
            var c = b.tb(), d = b.yb(1), e = b.zb(), f = b.ab();
            this.J = c[0];
            this.Q = c[1];
            this.V = f[1];
            this.f = d;
            this.j = b.p;
            this.Sa = e[0];
            this.ea = e[1];
            this.Da = b.q;
            this.oa = b.i;
            this.g = b.n;
            this.Ea = b.r;
            this.ba = f[0]
        }
    };
    l.xa = function (b) {
        if (null === b)this.d = ""; else {
            var c = b.a;
            null === c ? this.o = null : (c = c.a, this.o = {fillStyle: wg(null === c ? Ml : c)});
            var d = b.f;
            if (null === d)this.n = null; else {
                var c = d.a, e = d.d, f = d.b, g = d.e, h = d.c, d = d.f;
                this.n = {
                    lineCap: m(e) ? e : "round",
                    lineDash: null != f ? f : Nl,
                    lineJoin: m(g) ? g : "round",
                    lineWidth: m(h) ? h : 1,
                    miterLimit: m(d) ? d : 10,
                    strokeStyle: wg(null === c ? Ol : c)
                }
            }
            var c = b.d, e = b.i, f = b.n, g = b.e, h = b.c, d = b.b, k = b.g;
            b = b.o;
            this.ca = {
                font: m(c) ? c : "10px sans-serif",
                textAlign: m(k) ? k : "center",
                textBaseline: m(b) ? b : "middle"
            };
            this.d =
                m(d) ? d : "";
            this.qa = m(e) ? this.r * e : 0;
            this.Ta = m(f) ? this.r * f : 0;
            this.t = m(g) ? g : 0;
            this.i = this.r * (m(h) ? h : 1)
        }
    };
    var zm = {
        Point: sm.prototype.rb,
        LineString: sm.prototype.Cb,
        Polygon: sm.prototype.Sb,
        MultiPoint: sm.prototype.qb,
        MultiLineString: sm.prototype.kc,
        MultiPolygon: sm.prototype.lc,
        GeometryCollection: sm.prototype.Zc,
        Circle: sm.prototype.jc
    };
    var Fm = ["Polygon", "LineString", "Image", "Text"];

    function Gm(b, c, d) {
        this.ga = b;
        this.V = c;
        this.d = 0;
        this.resolution = d;
        this.J = this.F = null;
        this.c = [];
        this.coordinates = [];
        this.ca = Kd();
        this.a = [];
        this.ba = [];
        this.la = Kd()
    }

    function Hm(b, c, d, e, f, g) {
        var h = b.coordinates.length, k = b.he(), n = [c[d], c[d + 1]], p = [NaN, NaN], q = !0, r, s, v;
        for (r = d + f; r < e; r += f)p[0] = c[r], p[1] = c[r + 1], v = be(k, p), v !== s ? (q && (b.coordinates[h++] = n[0], b.coordinates[h++] = n[1]), b.coordinates[h++] = p[0], b.coordinates[h++] = p[1], q = !1) : 1 === v ? (b.coordinates[h++] = p[0], b.coordinates[h++] = p[1], q = !1) : q = !0, n[0] = p[0], n[1] = p[1], s = v;
        r === d + f && (b.coordinates[h++] = n[0], b.coordinates[h++] = n[1]);
        g && (b.coordinates[h++] = c[d], b.coordinates[h++] = c[d + 1]);
        return h
    }

    function Im(b, c) {
        b.F = [0, c, 0];
        b.c.push(b.F);
        b.J = [0, c, 0];
        b.a.push(b.J)
    }

    function Jm(b, c, d, e, f, g, h, k) {
        var n;
        Wj(e, b.ca) ? n = b.ba : (n = Lk(b.coordinates, 0, b.coordinates.length, 2, e, b.ba), Nd(b.ca, e));
        e = 0;
        var p = h.length, q = 0, r;
        for (b = b.la; e < p;) {
            var s = h[e], v, y, C, F;
            switch (s[0]) {
                case 0:
                    q = s[1];
                    q = ma(q).toString();
                    m(x(g, q)) ? e = s[2] : ++e;
                    break;
                case 1:
                    c.beginPath();
                    ++e;
                    break;
                case 2:
                    q = s[1];
                    r = n[q];
                    var G = n[q + 1], w = n[q + 2] - r, q = n[q + 3] - G;
                    c.arc(r, G, Math.sqrt(w * w + q * q), 0, 2 * Math.PI, !0);
                    ++e;
                    break;
                case 3:
                    c.closePath();
                    ++e;
                    break;
                case 4:
                    q = s[1];
                    r = s[2];
                    v = s[3];
                    C = s[4] * d;
                    var U = s[5] * d, N = s[6];
                    y = s[7];
                    var Y = s[8], T =
                        s[9], G = s[11], w = s[12], qa = s[13], vb = s[14];
                    for (s[10] && (G += f); q < r; q += 2) {
                        s = n[q] - C;
                        F = n[q + 1] - U;
                        qa && (s = s + .5 | 0, F = F + .5 | 0);
                        if (1 != w || 0 !== G) {
                            var Ka = s + C, ac = F + U;
                            Vj(b, Ka, ac, w, w, G, -Ka, -ac);
                            c.setTransform(b[0], b[1], b[4], b[5], b[12], b[13])
                        }
                        Ka = c.globalAlpha;
                        1 != y && (c.globalAlpha = Ka * y);
                        c.drawImage(v, Y, T, vb, N, s, F, vb * d, N * d);
                        1 != y && (c.globalAlpha = Ka);
                        1 == w && 0 === G || c.setTransform(1, 0, 0, 1, 0, 0)
                    }
                    ++e;
                    break;
                case 5:
                    q = s[1];
                    r = s[2];
                    C = s[3];
                    U = s[4] * d;
                    N = s[5] * d;
                    G = s[6];
                    w = s[7] * d;
                    v = s[8];
                    for (y = s[9]; q < r; q += 2) {
                        s = n[q] + U;
                        F = n[q + 1] + N;
                        if (1 != w || 0 !== G)Vj(b,
                            s, F, w, w, G, -s, -F), c.setTransform(b[0], b[1], b[4], b[5], b[12], b[13]);
                        y && c.strokeText(C, s, F);
                        v && c.fillText(C, s, F);
                        1 == w && 0 === G || c.setTransform(1, 0, 0, 1, 0, 0)
                    }
                    ++e;
                    break;
                case 6:
                    if (m(k) && (q = s[1], q = k(q)))return q;
                    ++e;
                    break;
                case 7:
                    c.fill();
                    ++e;
                    break;
                case 8:
                    q = s[1];
                    r = s[2];
                    c.moveTo(n[q], n[q + 1]);
                    for (q += 2; q < r; q += 2)c.lineTo(n[q], n[q + 1]);
                    ++e;
                    break;
                case 9:
                    c.fillStyle = s[1];
                    ++e;
                    break;
                case 10:
                    q = m(s[7]) ? s[7] : !0;
                    r = s[2];
                    c.strokeStyle = s[1];
                    c.lineWidth = q ? r * d : r;
                    c.lineCap = s[3];
                    c.lineJoin = s[4];
                    c.miterLimit = s[5];
                    cg && c.setLineDash(s[6]);
                    ++e;
                    break;
                case 11:
                    c.font = s[1];
                    c.textAlign = s[2];
                    c.textBaseline = s[3];
                    ++e;
                    break;
                case 12:
                    c.stroke();
                    ++e;
                    break;
                default:
                    ++e
            }
        }
    }

    Gm.prototype.Hc = function (b, c, d, e, f) {
        Jm(this, b, c, d, e, f, this.c, void 0)
    };
    function Km(b) {
        var c = b.a;
        c.reverse();
        var d, e = c.length, f, g, h = -1;
        for (d = 0; d < e; ++d)if (f = c[d], g = f[0], 6 == g)h = d; else if (0 == g) {
            f[2] = d;
            f = b.a;
            for (g = d; h < g;) {
                var k = f[h];
                f[h] = f[g];
                f[g] = k;
                ++h;
                --g
            }
            h = -1
        }
    }

    function Lm(b, c) {
        b.F[2] = b.c.length;
        b.F = null;
        b.J[2] = b.a.length;
        b.J = null;
        var d = [6, c];
        b.c.push(d);
        b.a.push(d)
    }

    Gm.prototype.Kb = ca;
    Gm.prototype.he = function () {
        return this.V
    };
    function Mm(b, c, d) {
        Gm.call(this, b, c, d);
        this.g = this.Q = null;
        this.t = this.r = this.q = this.p = this.j = this.n = this.i = this.o = this.f = this.e = this.b = void 0
    }

    u(Mm, Gm);
    Mm.prototype.rb = function (b, c) {
        if (null !== this.g) {
            Im(this, c);
            var d = b.k, e = this.coordinates.length, d = Hm(this, d, 0, d.length, b.s, !1);
            this.c.push([4, e, d, this.g, this.b, this.e, this.f, this.o, this.i, this.n, this.j, this.p, this.q, this.r, this.t]);
            this.a.push([4, e, d, this.Q, this.b, this.e, this.f, this.o, this.i, this.n, this.j, this.p, this.q, this.r, this.t]);
            Lm(this, c)
        }
    };
    Mm.prototype.qb = function (b, c) {
        if (null !== this.g) {
            Im(this, c);
            var d = b.k, e = this.coordinates.length, d = Hm(this, d, 0, d.length, b.s, !1);
            this.c.push([4, e, d, this.g, this.b, this.e, this.f, this.o, this.i, this.n, this.j, this.p, this.q, this.r, this.t]);
            this.a.push([4, e, d, this.Q, this.b, this.e, this.f, this.o, this.i, this.n, this.j, this.p, this.q, this.r, this.t]);
            Lm(this, c)
        }
    };
    Mm.prototype.Kb = function () {
        Km(this);
        this.e = this.b = void 0;
        this.g = this.Q = null;
        this.t = this.r = this.p = this.j = this.n = this.i = this.o = this.q = this.f = void 0
    };
    Mm.prototype.cb = function (b) {
        var c = b.tb(), d = b.ab(), e = b.te(1), f = b.yb(1), g = b.zb();
        this.b = c[0];
        this.e = c[1];
        this.Q = e;
        this.g = f;
        this.f = d[1];
        this.o = b.p;
        this.i = g[0];
        this.n = g[1];
        this.j = b.q;
        this.p = b.i;
        this.q = b.n;
        this.r = b.r;
        this.t = d[0]
    };
    function Nm(b, c, d) {
        Gm.call(this, b, c, d);
        this.b = {
            Cc: void 0,
            xc: void 0,
            yc: null,
            zc: void 0,
            Ac: void 0,
            Bc: void 0,
            me: 0,
            strokeStyle: void 0,
            lineCap: void 0,
            lineDash: null,
            lineJoin: void 0,
            lineWidth: void 0,
            miterLimit: void 0
        }
    }

    u(Nm, Gm);
    function Om(b, c, d, e, f) {
        var g = b.coordinates.length;
        c = Hm(b, c, d, e, f, !1);
        g = [8, g, c];
        b.c.push(g);
        b.a.push(g);
        return e
    }

    l = Nm.prototype;
    l.he = function () {
        var b = this.V;
        this.d && (b = Yd(b, this.resolution * (this.d + 1) / 2));
        return b
    };
    function Pm(b) {
        var c = b.b, d = c.strokeStyle, e = c.lineCap, f = c.lineDash, g = c.lineJoin, h = c.lineWidth, k = c.miterLimit;
        c.Cc == d && c.xc == e && ib(c.yc, f) && c.zc == g && c.Ac == h && c.Bc == k || (c.me != b.coordinates.length && (b.c.push([12]), c.me = b.coordinates.length), b.c.push([10, d, h, e, g, k, f], [1]), c.Cc = d, c.xc = e, c.yc = f, c.zc = g, c.Ac = h, c.Bc = k)
    }

    l.Cb = function (b, c) {
        var d = this.b, e = d.lineWidth;
        m(d.strokeStyle) && m(e) && (Pm(this), Im(this, c), this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]), d = b.k, Om(this, d, 0, d.length, b.s), this.a.push([12]), Lm(this, c))
    };
    l.kc = function (b, c) {
        var d = this.b, e = d.lineWidth;
        if (m(d.strokeStyle) && m(e)) {
            Pm(this);
            Im(this, c);
            this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]);
            var d = b.b, e = b.k, f = b.s, g = 0, h, k;
            h = 0;
            for (k = d.length; h < k; ++h)g = Om(this, e, g, d[h], f);
            this.a.push([12]);
            Lm(this, c)
        }
    };
    l.Kb = function () {
        this.b.me != this.coordinates.length && this.c.push([12]);
        Km(this);
        this.b = null
    };
    l.wa = function (b, c) {
        var d = c.a;
        this.b.strokeStyle = wg(null === d ? Ol : d);
        d = c.d;
        this.b.lineCap = m(d) ? d : "round";
        d = c.b;
        this.b.lineDash = null === d ? Nl : d;
        d = c.e;
        this.b.lineJoin = m(d) ? d : "round";
        d = c.c;
        this.b.lineWidth = m(d) ? d : 1;
        d = c.f;
        this.b.miterLimit = m(d) ? d : 10;
        this.d = Math.max(this.d, this.b.lineWidth)
    };
    function Qm(b, c, d) {
        Gm.call(this, b, c, d);
        this.b = {
            Ve: void 0,
            Cc: void 0,
            xc: void 0,
            yc: null,
            zc: void 0,
            Ac: void 0,
            Bc: void 0,
            fillStyle: void 0,
            strokeStyle: void 0,
            lineCap: void 0,
            lineDash: null,
            lineJoin: void 0,
            lineWidth: void 0,
            miterLimit: void 0
        }
    }

    u(Qm, Gm);
    function Rm(b, c, d, e, f) {
        var g = b.b, h = [1];
        b.c.push(h);
        b.a.push(h);
        var k, h = 0;
        for (k = e.length; h < k; ++h) {
            var n = e[h], p = b.coordinates.length;
            d = Hm(b, c, d, n, f, !0);
            d = [8, p, d];
            p = [3];
            b.c.push(d, p);
            b.a.push(d, p);
            d = n
        }
        c = [7];
        b.a.push(c);
        m(g.fillStyle) && b.c.push(c);
        m(g.strokeStyle) && (g = [12], b.c.push(g), b.a.push(g));
        return d
    }

    l = Qm.prototype;
    l.jc = function (b, c) {
        var d = this.b, e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) {
            Sm(this);
            Im(this, c);
            this.a.push([9, wg(Ml)]);
            m(d.strokeStyle) && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
            var f = b.k, e = this.coordinates.length;
            Hm(this, f, 0, f.length, b.s, !1);
            f = [1];
            e = [2, e];
            this.c.push(f, e);
            this.a.push(f, e);
            e = [7];
            this.a.push(e);
            m(d.fillStyle) && this.c.push(e);
            m(d.strokeStyle) && (d = [12], this.c.push(d), this.a.push(d));
            Lm(this, c)
        }
    };
    l.Sb = function (b, c) {
        var d = this.b, e = d.strokeStyle;
        if (m(d.fillStyle) || m(e))Sm(this), Im(this, c), this.a.push([9, wg(Ml)]), m(d.strokeStyle) && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]), d = b.b, e = vl(b), Rm(this, e, 0, d, b.s), Lm(this, c)
    };
    l.lc = function (b, c) {
        var d = this.b, e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) {
            Sm(this);
            Im(this, c);
            this.a.push([9, wg(Ml)]);
            m(d.strokeStyle) && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
            var d = b.b, e = Cm(b), f = b.s, g = 0, h, k;
            h = 0;
            for (k = d.length; h < k; ++h)g = Rm(this, e, g, d[h], f);
            Lm(this, c)
        }
    };
    l.Kb = function () {
        Km(this);
        this.b = null;
        var b = this.ga;
        if (0 !== b) {
            var c = this.coordinates, d, e;
            d = 0;
            for (e = c.length; d < e; ++d)c[d] = b * Math.round(c[d] / b)
        }
    };
    l.he = function () {
        var b = this.V;
        this.d && (b = Yd(b, this.resolution * (this.d + 1) / 2));
        return b
    };
    l.wa = function (b, c) {
        var d = this.b;
        if (null === b)d.fillStyle = void 0; else {
            var e = b.a;
            d.fillStyle = wg(null === e ? Ml : e)
        }
        null === c ? (d.strokeStyle = void 0, d.lineCap = void 0, d.lineDash = null, d.lineJoin = void 0, d.lineWidth = void 0, d.miterLimit = void 0) : (e = c.a, d.strokeStyle = wg(null === e ? Ol : e), e = c.d, d.lineCap = m(e) ? e : "round", e = c.b, d.lineDash = null === e ? Nl : e.slice(), e = c.e, d.lineJoin = m(e) ? e : "round", e = c.c, d.lineWidth = m(e) ? e : 1, e = c.f, d.miterLimit = m(e) ? e : 10, this.d = Math.max(this.d, d.lineWidth))
    };
    function Sm(b) {
        var c = b.b, d = c.fillStyle, e = c.strokeStyle, f = c.lineCap, g = c.lineDash, h = c.lineJoin, k = c.lineWidth, n = c.miterLimit;
        m(d) && c.Ve != d && (b.c.push([9, d]), c.Ve = c.fillStyle);
        !m(e) || c.Cc == e && c.xc == f && c.yc == g && c.zc == h && c.Ac == k && c.Bc == n || (b.c.push([10, e, k, f, h, n, g]), c.Cc = e, c.xc = f, c.yc = g, c.zc = h, c.Ac = k, c.Bc = n)
    }

    function Tm(b, c, d) {
        Gm.call(this, b, c, d);
        this.r = this.q = this.p = null;
        this.g = "";
        this.j = this.n = this.i = this.o = 0;
        this.f = this.e = this.b = null
    }

    u(Tm, Gm);
    Tm.prototype.sb = function (b, c, d, e, f, g) {
        if ("" !== this.g && null !== this.f && (null !== this.b || null !== this.e)) {
            if (null !== this.b) {
                f = this.b;
                var h = this.p;
                if (null === h || h.fillStyle != f.fillStyle) {
                    var k = [9, f.fillStyle];
                    this.c.push(k);
                    this.a.push(k);
                    null === h ? this.p = {fillStyle: f.fillStyle} : h.fillStyle = f.fillStyle
                }
            }
            null !== this.e && (f = this.e, h = this.q, null === h || h.lineCap != f.lineCap || h.lineDash != f.lineDash || h.lineJoin != f.lineJoin || h.lineWidth != f.lineWidth || h.miterLimit != f.miterLimit || h.strokeStyle != f.strokeStyle) && (k = [10,
                f.strokeStyle, f.lineWidth, f.lineCap, f.lineJoin, f.miterLimit, f.lineDash, !1], this.c.push(k), this.a.push(k), null === h ? this.q = {
                lineCap: f.lineCap,
                lineDash: f.lineDash,
                lineJoin: f.lineJoin,
                lineWidth: f.lineWidth,
                miterLimit: f.miterLimit,
                strokeStyle: f.strokeStyle
            } : (h.lineCap = f.lineCap, h.lineDash = f.lineDash, h.lineJoin = f.lineJoin, h.lineWidth = f.lineWidth, h.miterLimit = f.miterLimit, h.strokeStyle = f.strokeStyle));
            f = this.f;
            h = this.r;
            if (null === h || h.font != f.font || h.textAlign != f.textAlign || h.textBaseline != f.textBaseline)k =
                [11, f.font, f.textAlign, f.textBaseline], this.c.push(k), this.a.push(k), null === h ? this.r = {
                font: f.font,
                textAlign: f.textAlign,
                textBaseline: f.textBaseline
            } : (h.font = f.font, h.textAlign = f.textAlign, h.textBaseline = f.textBaseline);
            Im(this, g);
            f = this.coordinates.length;
            b = Hm(this, b, c, d, e, !1);
            b = [5, f, b, this.g, this.o, this.i, this.n, this.j, null !== this.b, null !== this.e];
            this.c.push(b);
            this.a.push(b);
            Lm(this, g)
        }
    };
    Tm.prototype.xa = function (b) {
        if (null === b)this.g = ""; else {
            var c = b.a;
            null === c ? this.b = null : (c = c.a, c = wg(null === c ? Ml : c), null === this.b ? this.b = {fillStyle: c} : this.b.fillStyle = c);
            var d = b.f;
            if (null === d)this.e = null; else {
                var c = d.a, e = d.d, f = d.b, g = d.e, h = d.c, d = d.f, e = m(e) ? e : "round", f = null != f ? f.slice() : Nl, g = m(g) ? g : "round", h = m(h) ? h : 1, d = m(d) ? d : 10, c = wg(null === c ? Ol : c);
                if (null === this.e)this.e = {
                    lineCap: e,
                    lineDash: f,
                    lineJoin: g,
                    lineWidth: h,
                    miterLimit: d,
                    strokeStyle: c
                }; else {
                    var k = this.e;
                    k.lineCap = e;
                    k.lineDash = f;
                    k.lineJoin = g;
                    k.lineWidth =
                        h;
                    k.miterLimit = d;
                    k.strokeStyle = c
                }
            }
            var n = b.d, c = b.i, e = b.n, f = b.e, h = b.c, d = b.b, g = b.g, k = b.o;
            b = m(n) ? n : "10px sans-serif";
            g = m(g) ? g : "center";
            k = m(k) ? k : "middle";
            null === this.f ? this.f = {
                font: b,
                textAlign: g,
                textBaseline: k
            } : (n = this.f, n.font = b, n.textAlign = g, n.textBaseline = k);
            this.g = m(d) ? d : "";
            this.o = m(c) ? c : 0;
            this.i = m(e) ? e : 0;
            this.n = m(f) ? f : 0;
            this.j = m(h) ? h : 1
        }
    };
    function Um(b, c, d) {
        this.g = b;
        this.b = c;
        this.f = d;
        this.c = {};
        this.d = Tf(1, 1);
        this.e = Kd()
    }

    function Vm(b) {
        for (var c in b.c) {
            var d = b.c[c], e;
            for (e in d)d[e].Kb()
        }
    }

    function Wm(b, c, d, e, f, g) {
        var h = b.e;
        Vj(h, .5, .5, 1 / c, -1 / c, -d, -e[0], -e[1]);
        var k = b.d;
        k.clearRect(0, 0, 1, 1);
        return Xm(b, k, h, d, f, function (b) {
            if (0 < k.getImageData(0, 0, 1, 1).data[3]) {
                if (b = g(b))return b;
                k.clearRect(0, 0, 1, 1)
            }
        })
    }

    Um.prototype.a = function (b, c) {
        var d = m(b) ? b.toString() : "0", e = this.c[d];
        m(e) || (e = {}, this.c[d] = e);
        d = e[c];
        m(d) || (d = new Ym[c](this.g, this.b, this.f), e[c] = d);
        return d
    };
    Um.prototype.ia = function () {
        return xb(this.c)
    };
    function Zm(b, c, d, e, f, g) {
        var h = Va(sb(b.c), Number);
        gb(h);
        var k = b.b, n = k[0], p = k[1], q = k[2], k = k[3], n = [n, p, n, k, q, k, q, p];
        Lk(n, 0, 8, 2, e, n);
        c.save();
        c.beginPath();
        c.moveTo(n[0], n[1]);
        c.lineTo(n[2], n[3]);
        c.lineTo(n[4], n[5]);
        c.lineTo(n[6], n[7]);
        c.closePath();
        c.clip();
        for (var r, s, n = 0, p = h.length; n < p; ++n)for (r = b.c[h[n].toString()], q = 0, k = Fm.length; q < k; ++q)s = r[Fm[q]], m(s) && s.Hc(c, d, e, f, g);
        c.restore()
    }

    function Xm(b, c, d, e, f, g) {
        var h = Va(sb(b.c), Number);
        gb(h, function (b, c) {
            return c - b
        });
        var k, n, p, q, r;
        k = 0;
        for (n = h.length; k < n; ++k)for (q = b.c[h[k].toString()], p = Fm.length - 1; 0 <= p; --p)if (r = q[Fm[p]], m(r) && (r = Jm(r, c, 1, d, e, f, r.a, g)))return r
    }

    var Ym = {Image: Mm, LineString: Nm, Polygon: Qm, Text: Tm};

    function $m(b, c) {
        Hj.call(this, b, c);
        this.F = Kd()
    }

    u($m, Hj);
    $m.prototype.j = function (b, c, d) {
        an(this, "precompose", d, b, void 0);
        var e = this.p();
        if (null !== e) {
            var f = c.extent, g = m(f);
            if (g) {
                var h = me(f), k = je(f), n = ie(f), f = he(f);
                Xj(b.coordinateToPixelMatrix, h, h);
                Xj(b.coordinateToPixelMatrix, k, k);
                Xj(b.coordinateToPixelMatrix, n, n);
                Xj(b.coordinateToPixelMatrix, f, f);
                d.save();
                d.beginPath();
                d.moveTo(h[0], h[1]);
                d.lineTo(k[0], k[1]);
                d.lineTo(n[0], n[1]);
                d.lineTo(f[0], f[1]);
                d.clip()
            }
            h = this.n();
            k = d.globalAlpha;
            d.globalAlpha = c.opacity;
            0 === b.viewState.rotation ? (c = h[13], n = e.width * h[0],
                f = e.height * h[5], d.drawImage(e, 0, 0, +e.width, +e.height, Math.round(h[12]), Math.round(c), Math.round(n), Math.round(f))) : (d.setTransform(h[0], h[1], h[4], h[5], h[12], h[13]), d.drawImage(e, 0, 0), d.setTransform(1, 0, 0, 1, 0, 0));
            d.globalAlpha = k;
            g && d.restore()
        }
        an(this, "postcompose", d, b, void 0)
    };
    function an(b, c, d, e, f) {
        var g = b.a;
        ld(g, c) && (b = m(f) ? f : bn(b, e), b = new sm(d, e.pixelRatio, e.extent, b, e.viewState.rotation), g.dispatchEvent(new yl(c, g, b, null, e, d, null)), Em(b))
    }

    function bn(b, c) {
        var d = c.viewState, e = c.pixelRatio;
        return Vj(b.F, e * c.size[0] / 2, e * c.size[1] / 2, e / d.resolution, -e / d.resolution, -d.rotation, -d.center[0], -d.center[1])
    }

    var cn = function () {
        var b = null, c = null;
        return function (d) {
            if (null === b) {
                b = Tf(1, 1);
                c = b.createImageData(1, 1);
                var e = c.data;
                e[0] = 42;
                e[1] = 84;
                e[2] = 126;
                e[3] = 255
            }
            var e = b.canvas, f = d[0] <= e.width && d[1] <= e.height;
            f || (e.width = d[0], e.height = d[1], e = d[0] - 1, d = d[1] - 1, b.putImageData(c, e, d), d = b.getImageData(e, d, 1, 1), f = ib(c.data, d.data));
            return f
        }
    }();

    function dn(b, c) {
        $m.call(this, b, c);
        this.c = null;
        this.d = Kd()
    }

    u(dn, $m);
    dn.prototype.Zb = function (b, c, d, e) {
        var f = this.a;
        return f.a().yd(c.viewState.resolution, c.viewState.rotation, b, c.skippedFeatureUids, function (b) {
            return d.call(e, b, f)
        })
    };
    dn.prototype.p = function () {
        return null === this.c ? null : this.c.c()
    };
    dn.prototype.n = function () {
        return this.d
    };
    dn.prototype.i = function (b, c) {
        var d = b.pixelRatio, e = b.viewState, f = e.center, g = e.resolution, h = e.rotation, k, n = this.a.a(), p = b.viewHints;
        k = b.extent;
        m(c.extent) && (k = pe(k, c.extent));
        p[0] || p[1] || se(k) || (e = e.projection, p = n.g, null === p || (e = p), k = n.rc(k, g, d, e), null !== k && (e = k.state, 0 == e ? (Wc(k, "change", this.o, !1, this), k.load()) : 2 == e && (this.c = k)));
        if (null !== this.c) {
            k = this.c;
            var e = k.D(), p = k.resolution, q = k.e, g = d * p / (g * q);
            Vj(this.d, d * b.size[0] / 2, d * b.size[1] / 2, g, g, h, q * (e[0] - f[0]) / p, q * (f[1] - e[3]) / p);
            Kj(b.attributions, k.f);
            Lj(b, n)
        }
        return !0
    };
    function en(b, c) {
        $m.call(this, b, c);
        this.c = this.e = null;
        this.g = !1;
        this.q = null;
        this.r = Kd();
        this.t = NaN;
        this.f = this.d = null
    }

    u(en, $m);
    en.prototype.p = function () {
        return this.e
    };
    en.prototype.n = function () {
        return this.r
    };
    en.prototype.i = function (b, c) {
        var d = b.pixelRatio, e = b.viewState, f = e.projection, g = this.a, h = g.a(), k = Gj(h, f), n = h.bd(), p = ec(k.a, e.resolution, 0), q = h.Gc(p, b.pixelRatio, f), r = k.ka(p), s = r / (q / k.sa(p)), v = e.center, y;
        r == e.resolution ? (v = Oj(v, r, b.size), y = ne(v, r, e.rotation, b.size)) : y = b.extent;
        m(c.extent) && (y = pe(y, c.extent));
        if (se(y))return !1;
        var C = Aj(k, y, r), F = q * (C.d - C.a + 1), G = q * (C.c - C.b + 1), w, U;
        null === this.e ? (U = Tf(F, G), this.e = U.canvas, this.c = [F, G], this.q = U, this.g = !cn(this.c)) : (w = this.e, U = this.q, this.c[0] < F || this.c[1] <
        G || this.g && (this.c[0] > F || this.c[1] > G) ? (w.width = F, w.height = G, this.c = [F, G], this.g = !cn(this.c), this.d = null) : (F = this.c[0], G = this.c[1], p == this.t && rf(this.d, C) || (this.d = null)));
        var N, Y;
        null === this.d ? (F /= q, G /= q, N = C.a - Math.floor((F - (C.d - C.a + 1)) / 2), Y = C.b - Math.floor((G - (C.c - C.b + 1)) / 2), this.t = p, this.d = new of(N, N + F - 1, Y, Y + G - 1), this.f = Array(F * G), G = this.d) : (G = this.d, F = G.d - G.a + 1);
        w = {};
        w[p] = {};
        var T = [], qa = sa(h.fe, h, w, Nj(function (b) {
            return null !== b && 2 == b.state
        }, h, d, f)), vb = g.ea();
        m(vb) || (vb = !0);
        var Ka = Vd(), ac = new of(0,
            0, 0, 0), Sb, La, Pa;
        for (Y = C.a; Y <= C.d; ++Y)for (Pa = C.b; Pa <= C.c; ++Pa)La = h.Fb(p, Y, Pa, d, f), N = La.state, 2 == N || 4 == N || 3 == N && !vb ? w[p][nf(La.a)] = La : (Sb = k.$c(La.a, qa, null, ac, Ka), Sb || (T.push(La), Sb = k.kd(La.a, ac, Ka), null === Sb || qa(p + 1, Sb)));
        qa = 0;
        for (Sb = T.length; qa < Sb; ++qa)La = T[qa], Y = q * (La.a[1] - G.a), Pa = q * (G.c - La.a[2]), U.clearRect(Y, Pa, q, q);
        T = Va(sb(w), Number);
        gb(T);
        var Ud = h.t, qd = me(yj(k, [p, G.a, G.c], Ka)), fd, ve, Wi, Eh, Bf, Gl, qa = 0;
        for (Sb = T.length; qa < Sb; ++qa)if (fd = T[qa], q = h.Gc(fd, d, f), Eh = w[fd], fd == p)for (Wi in Eh)La = Eh[Wi], ve =
            (La.a[2] - G.b) * F + (La.a[1] - G.a), this.f[ve] != La && (Y = q * (La.a[1] - G.a), Pa = q * (G.c - La.a[2]), N = La.state, 4 != N && (3 != N || vb) && Ud || U.clearRect(Y, Pa, q, q), 2 == N && U.drawImage(La.Na(), n, n, q, q, Y, Pa, q, q), this.f[ve] = La); else for (Wi in fd = k.ka(fd) / r, Eh)for (La = Eh[Wi], ve = yj(k, La.a, Ka), Y = (ve[0] - qd[0]) / s, Pa = (qd[1] - ve[3]) / s, Gl = fd * q, Bf = fd * q, N = La.state, 4 != N && Ud || U.clearRect(Y, Pa, Gl, Bf), 2 == N && U.drawImage(La.Na(), n, n, q, q, Y, Pa, Gl, Bf), La = zj(k, ve, p, ac), N = Math.max(La.a, G.a), Pa = Math.min(La.d, G.d), Y = Math.max(La.b, G.b), La = Math.min(La.c,
            G.c); N <= Pa; ++N)for (Bf = Y; Bf <= La; ++Bf)ve = (Bf - G.b) * F + (N - G.a), this.f[ve] = void 0;
        Mj(b.usedTiles, h, p, C);
        Pj(b, h, k, d, f, y, p, g.r());
        Jj(b, h);
        Lj(b, h);
        Vj(this.r, d * b.size[0] / 2, d * b.size[1] / 2, d * s / e.resolution, d * s / e.resolution, e.rotation, (qd[0] - v[0]) / s, (v[1] - qd[1]) / s);
        return !0
    };
    function fn(b, c, d) {
        Mk.call(this);
        this.ag(b, m(c) ? c : 0, d)
    }

    u(fn, Mk);
    l = fn.prototype;
    l.clone = function () {
        var b = new fn(null);
        Ok(b, this.a, this.k.slice());
        b.l();
        return b
    };
    l.Va = function (b, c, d, e) {
        var f = this.k;
        b -= f[0];
        var g = c - f[1];
        c = b * b + g * g;
        if (c < e) {
            if (0 === c)for (e = 0; e < this.s; ++e)d[e] = f[e]; else for (e = this.vf() / Math.sqrt(c), d[0] = f[0] + e * b, d[1] = f[1] + e * g, e = 2; e < this.s; ++e)d[e] = f[e];
            d.length = this.s;
            return c
        }
        return e
    };
    l.Jb = function (b, c) {
        var d = this.k, e = b - d[0], d = c - d[1];
        return e * e + d * d <= gn(this)
    };
    l.qe = function () {
        return this.k.slice(0, this.s)
    };
    l.D = function (b) {
        if (this.g != this.c) {
            var c = this.k, d = c[this.s] - c[0];
            this.extent = Xd(c[0] - d, c[1] - d, c[0] + d, c[1] + d, this.extent);
            this.g = this.c
        }
        return te(this.extent, b)
    };
    l.vf = function () {
        return Math.sqrt(gn(this))
    };
    function gn(b) {
        var c = b.k[b.s] - b.k[0];
        b = b.k[b.s + 1] - b.k[1];
        return c * c + b * b
    }

    l.H = function () {
        return "Circle"
    };
    l.kj = function (b) {
        var c = this.s, d = b.slice();
        d[c] = d[0] + (this.k[c] - this.k[0]);
        var e;
        for (e = 1; e < c; ++e)d[c + e] = b[e];
        Ok(this, this.a, d);
        this.l()
    };
    l.ag = function (b, c, d) {
        if (null === b)Ok(this, "XY", null); else {
            Pk(this, d, b, 0);
            null === this.k && (this.k = []);
            d = this.k;
            b = Zk(d, b);
            d[b++] = d[0] + c;
            var e;
            c = 1;
            for (e = this.s; c < e; ++c)d[b++] = d[c];
            d.length = b
        }
        this.l()
    };
    l.jl = function (b) {
        this.k[this.s] = this.k[0] + b;
        this.l()
    };
    function hn(b) {
        Kk.call(this);
        this.d = m(b) ? b : null;
        jn(this)
    }

    u(hn, Kk);
    function kn(b) {
        var c = [], d, e;
        d = 0;
        for (e = b.length; d < e; ++d)c.push(b[d].clone());
        return c
    }

    function ln(b) {
        var c, d;
        if (null !== b.d)for (c = 0, d = b.d.length; c < d; ++c)Xc(b.d[c], "change", b.l, !1, b)
    }

    function jn(b) {
        var c, d;
        if (null !== b.d)for (c = 0, d = b.d.length; c < d; ++c)z(b.d[c], "change", b.l, !1, b)
    }

    l = hn.prototype;
    l.clone = function () {
        var b = new hn(null);
        b.bg(this.d);
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        var f = this.d, g, h;
        g = 0;
        for (h = f.length; g < h; ++g)e = f[g].Va(b, c, d, e);
        return e
    };
    l.Jb = function (b, c) {
        var d = this.d, e, f;
        e = 0;
        for (f = d.length; e < f; ++e)if (d[e].Jb(b, c))return !0;
        return !1
    };
    l.D = function (b) {
        if (this.g != this.c) {
            var c = Xd(Infinity, Infinity, -Infinity, -Infinity, this.extent), d = this.d, e, f;
            e = 0;
            for (f = d.length; e < f; ++e)ee(c, d[e].D());
            this.extent = c;
            this.g = this.c
        }
        return te(this.extent, b)
    };
    l.af = function () {
        return kn(this.d)
    };
    l.ke = function (b) {
        this.j != this.c && (yb(this.o), this.i = 0, this.j = this.c);
        if (0 > b || 0 !== this.i && b < this.i)return this;
        var c = b.toString();
        if (this.o.hasOwnProperty(c))return this.o[c];
        var d = [], e = this.d, f = !1, g, h;
        g = 0;
        for (h = e.length; g < h; ++g) {
            var k = e[g], n = k.ke(b);
            d.push(n);
            n !== k && (f = !0)
        }
        if (f)return b = new hn(null), ln(b), b.d = d, jn(b), b.l(), this.o[c] = b;
        this.i = b;
        return this
    };
    l.H = function () {
        return "GeometryCollection"
    };
    l.ha = function (b) {
        var c = this.d, d, e;
        d = 0;
        for (e = c.length; d < e; ++d)if (c[d].ha(b))return !0;
        return !1
    };
    l.ia = function () {
        return 0 == this.d.length
    };
    l.bg = function (b) {
        b = kn(b);
        ln(this);
        this.d = b;
        jn(this);
        this.l()
    };
    l.ma = function (b) {
        var c = this.d, d, e;
        d = 0;
        for (e = c.length; d < e; ++d)c[d].ma(b);
        this.l()
    };
    l.Aa = function (b, c) {
        var d = this.d, e, f;
        e = 0;
        for (f = d.length; e < f; ++e)d[e].Aa(b, c);
        this.l()
    };
    l.M = function () {
        ln(this);
        hn.S.M.call(this)
    };
    function mn(b, c, d, e, f) {
        var g = NaN, h = NaN, k = (d - c) / e;
        if (0 !== k)if (1 == k)g = b[c], h = b[c + 1]; else if (2 == k)g = .5 * b[c] + .5 * b[c + e], h = .5 * b[c + 1] + .5 * b[c + e + 1]; else {
            var h = b[c], k = b[c + 1], n = 0, g = [0], p;
            for (p = c + e; p < d; p += e) {
                var q = b[p], r = b[p + 1], n = n + Math.sqrt((q - h) * (q - h) + (r - k) * (r - k));
                g.push(n);
                h = q;
                k = r
            }
            d = .5 * n;
            for (var s, h = hb, k = 0, n = g.length; k < n;)p = k + n >> 1, q = h(d, g[p]), 0 < q ? k = p + 1 : (n = p, s = !q);
            s = s ? k : ~k;
            0 > s ? (d = (d - g[-s - 2]) / (g[-s - 1] - g[-s - 2]), c += (-s - 2) * e, g = $b(b[c], b[c + e], d), h = $b(b[c + 1], b[c + e + 1], d)) : (g = b[c + s * e], h = b[c + s * e + 1])
        }
        return null != f ?
            (f[0] = g, f[1] = h, f) : [g, h]
    }

    function nn(b, c, d, e, f, g) {
        if (d == c)return null;
        if (f < b[c + e - 1])return g ? (d = b.slice(c, c + e), d[e - 1] = f, d) : null;
        if (b[d - 1] < f)return g ? (d = b.slice(d - e, d), d[e - 1] = f, d) : null;
        if (f == b[c + e - 1])return b.slice(c, c + e);
        c /= e;
        for (d /= e; c < d;)g = c + d >> 1, f < b[(g + 1) * e - 1] ? d = g : c = g + 1;
        d = b[c * e - 1];
        if (f == d)return b.slice((c - 1) * e, (c - 1) * e + e);
        g = (f - d) / (b[(c + 1) * e - 1] - d);
        d = [];
        var h;
        for (h = 0; h < e - 1; ++h)d.push($b(b[(c - 1) * e + h], b[c * e + h], g));
        d.push(f);
        return d
    }

    function on(b, c, d, e, f, g) {
        var h = 0;
        if (g)return nn(b, h, c[c.length - 1], d, e, f);
        if (e < b[d - 1])return f ? (b = b.slice(0, d), b[d - 1] = e, b) : null;
        if (b[b.length - 1] < e)return f ? (b = b.slice(b.length - d), b[d - 1] = e, b) : null;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var k = c[f];
            if (h != k) {
                if (e < b[h + d - 1])break;
                if (e <= b[k - 1])return nn(b, h, k, d, e, !1);
                h = k
            }
        }
        return null
    };
    function M(b, c) {
        Mk.call(this);
        this.b = null;
        this.p = this.q = this.n = -1;
        this.U(b, c)
    }

    u(M, Mk);
    l = M.prototype;
    l.Sg = function (b) {
        null === this.k ? this.k = b.slice() : db(this.k, b);
        this.l()
    };
    l.clone = function () {
        var b = new M(null);
        pn(b, this.a, this.k.slice());
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        this.p != this.c && (this.q = Math.sqrt(Vk(this.k, 0, this.k.length, this.s, 0)), this.p = this.c);
        return Xk(this.k, 0, this.k.length, this.s, this.q, !1, b, c, d, e)
    };
    l.lj = function (b, c) {
        return "XYM" != this.a && "XYZM" != this.a ? null : nn(this.k, 0, this.k.length, this.s, b, m(c) ? c : !1)
    };
    l.K = function () {
        return bl(this.k, 0, this.k.length, this.s)
    };
    l.mj = function () {
        var b = this.k, c = this.s, d = b[0], e = b[1], f = 0, g;
        for (g = 0 + c; g < this.k.length; g += c)var h = b[g], k = b[g + 1], f = f + Math.sqrt((h - d) * (h - d) + (k - e) * (k - e)), d = h, e = k;
        return f
    };
    function Am(b) {
        b.n != b.c && (b.b = mn(b.k, 0, b.k.length, b.s, b.b), b.n = b.c);
        return b.b
    }

    l.mc = function (b) {
        var c = [];
        c.length = dl(this.k, 0, this.k.length, this.s, b, c, 0);
        b = new M(null);
        pn(b, "XY", c);
        return b
    };
    l.H = function () {
        return "LineString"
    };
    l.ha = function (b) {
        return pl(this.k, 0, this.k.length, this.s, b)
    };
    l.U = function (b, c) {
        null === b ? pn(this, "XY", null) : (Pk(this, c, b, 1), null === this.k && (this.k = []), this.k.length = $k(this.k, 0, b, this.s), this.l())
    };
    function pn(b, c, d) {
        Ok(b, c, d);
        b.l()
    };
    function qn(b, c) {
        Mk.call(this);
        this.b = [];
        this.n = this.p = -1;
        this.U(b, c)
    }

    u(qn, Mk);
    l = qn.prototype;
    l.Tg = function (b) {
        null === this.k ? this.k = b.k.slice() : db(this.k, b.k.slice());
        this.b.push(this.k.length);
        this.l()
    };
    l.clone = function () {
        var b = new qn(null);
        rn(b, this.a, this.k.slice(), this.b.slice());
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        this.n != this.c && (this.p = Math.sqrt(Wk(this.k, 0, this.b, this.s, 0)), this.n = this.c);
        return Yk(this.k, 0, this.b, this.s, this.p, !1, b, c, d, e)
    };
    l.oj = function (b, c, d) {
        return "XYM" != this.a && "XYZM" != this.a || 0 === this.k.length ? null : on(this.k, this.b, this.s, b, m(c) ? c : !1, m(d) ? d : !1)
    };
    l.K = function () {
        return cl(this.k, 0, this.b, this.s)
    };
    l.th = function (b) {
        if (0 > b || this.b.length <= b)return null;
        var c = new M(null);
        pn(c, this.a, this.k.slice(0 === b ? 0 : this.b[b - 1], this.b[b]));
        return c
    };
    l.Ec = function () {
        var b = this.k, c = this.b, d = this.a, e = [], f = 0, g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g], n = new M(null);
            pn(n, d, b.slice(f, k));
            e.push(n);
            f = k
        }
        return e
    };
    function Bm(b) {
        var c = [], d = b.k, e = 0, f = b.b;
        b = b.s;
        var g, h;
        g = 0;
        for (h = f.length; g < h; ++g) {
            var k = f[g], e = mn(d, e, k, b);
            db(c, e);
            e = k
        }
        return c
    }

    l.mc = function (b) {
        var c = [], d = [], e = this.k, f = this.b, g = this.s, h = 0, k = 0, n, p;
        n = 0;
        for (p = f.length; n < p; ++n) {
            var q = f[n], k = dl(e, h, q, g, b, c, k);
            d.push(k);
            h = q
        }
        c.length = k;
        b = new qn(null);
        rn(b, "XY", c, d);
        return b
    };
    l.H = function () {
        return "MultiLineString"
    };
    l.ha = function (b) {
        a:{
            var c = this.k, d = this.b, e = this.s, f = 0, g, h;
            g = 0;
            for (h = d.length; g < h; ++g) {
                if (pl(c, f, d[g], e, b)) {
                    b = !0;
                    break a
                }
                f = d[g]
            }
            b = !1
        }
        return b
    };
    l.U = function (b, c) {
        if (null === b)rn(this, "XY", null, this.b); else {
            Pk(this, c, b, 2);
            null === this.k && (this.k = []);
            var d = al(this.k, 0, b, this.s, this.b);
            this.k.length = 0 === d.length ? 0 : d[d.length - 1];
            this.l()
        }
    };
    function rn(b, c, d, e) {
        Ok(b, c, d);
        b.b = e;
        b.l()
    }

    function sn(b, c) {
        var d = "XY", e = [], f = [], g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g];
            0 === g && (d = k.a);
            db(e, k.k);
            f.push(e.length)
        }
        rn(b, d, e, f)
    };
    function tn(b, c) {
        Mk.call(this);
        this.U(b, c)
    }

    u(tn, Mk);
    l = tn.prototype;
    l.Vg = function (b) {
        null === this.k ? this.k = b.k.slice() : db(this.k, b.k);
        this.l()
    };
    l.clone = function () {
        var b = new tn(null);
        Ok(b, this.a, this.k.slice());
        b.l();
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        var f = this.k, g = this.s, h, k, n;
        h = 0;
        for (k = f.length; h < k; h += g)if (n = Tk(b, c, f[h], f[h + 1]), n < e) {
            e = n;
            for (n = 0; n < g; ++n)d[n] = f[h + n];
            d.length = g
        }
        return e
    };
    l.K = function () {
        return bl(this.k, 0, this.k.length, this.s)
    };
    l.Ch = function (b) {
        var c = null === this.k ? 0 : this.k.length / this.s;
        if (0 > b || c <= b)return null;
        c = new hl(null);
        il(c, this.a, this.k.slice(b * this.s, (b + 1) * this.s));
        return c
    };
    l.xd = function () {
        var b = this.k, c = this.a, d = this.s, e = [], f, g;
        f = 0;
        for (g = b.length; f < g; f += d) {
            var h = new hl(null);
            il(h, c, b.slice(f, f + d));
            e.push(h)
        }
        return e
    };
    l.H = function () {
        return "MultiPoint"
    };
    l.ha = function (b) {
        var c = this.k, d = this.s, e, f, g, h;
        e = 0;
        for (f = c.length; e < f; e += d)if (g = c[e], h = c[e + 1], ae(b, g, h))return !0;
        return !1
    };
    l.U = function (b, c) {
        null === b ? Ok(this, "XY", null) : (Pk(this, c, b, 1), null === this.k && (this.k = []), this.k.length = $k(this.k, 0, b, this.s));
        this.l()
    };
    function un(b, c) {
        Mk.call(this);
        this.b = [];
        this.p = -1;
        this.q = null;
        this.F = this.r = this.t = -1;
        this.n = null;
        this.U(b, c)
    }

    u(un, Mk);
    l = un.prototype;
    l.Wg = function (b) {
        if (null === this.k)this.k = b.k.slice(), b = b.b.slice(), this.b.push(); else {
            var c = this.k.length;
            db(this.k, b.k);
            b = b.b.slice();
            var d, e;
            d = 0;
            for (e = b.length; d < e; ++d)b[d] += c
        }
        this.b.push(b);
        this.l()
    };
    l.clone = function () {
        var b = new un(null);
        vn(b, this.a, this.k.slice(), this.b.slice());
        return b
    };
    l.Va = function (b, c, d, e) {
        if (e < Zd(this.D(), b, c))return e;
        if (this.r != this.c) {
            var f = this.b, g = 0, h = 0, k, n;
            k = 0;
            for (n = f.length; k < n; ++k)var p = f[k], h = Wk(this.k, g, p, this.s, h), g = p[p.length - 1];
            this.t = Math.sqrt(h);
            this.r = this.c
        }
        f = Cm(this);
        g = this.b;
        h = this.s;
        k = this.t;
        n = 0;
        var p = m(void 0) ? void 0 : [NaN, NaN], q, r;
        q = 0;
        for (r = g.length; q < r; ++q) {
            var s = g[q];
            e = Yk(f, n, s, h, k, !0, b, c, d, e, p);
            n = s[s.length - 1]
        }
        return e
    };
    l.Jb = function (b, c) {
        var d;
        a:{
            d = Cm(this);
            var e = this.b, f = 0;
            if (0 !== e.length) {
                var g, h;
                g = 0;
                for (h = e.length; g < h; ++g) {
                    var k = e[g];
                    if (ll(d, f, k, this.s, b, c)) {
                        d = !0;
                        break a
                    }
                    f = k[k.length - 1]
                }
            }
            d = !1
        }
        return d
    };
    l.pj = function () {
        var b = Cm(this), c = this.b, d = 0, e = 0, f, g;
        f = 0;
        for (g = c.length; f < g; ++f)var h = c[f], e = e + Rk(b, d, h, this.s), d = h[h.length - 1];
        return e
    };
    l.K = function () {
        var b = this.k, c = this.b, d = this.s, e = 0, f = m(void 0) ? void 0 : [], g = 0, h, k;
        h = 0;
        for (k = c.length; h < k; ++h) {
            var n = c[h];
            f[g++] = cl(b, e, n, d, f[g]);
            e = n[n.length - 1]
        }
        f.length = g;
        return f
    };
    function Dm(b) {
        if (b.p != b.c) {
            var c = b.k, d = b.b, e = b.s, f = 0, g = [], h, k, n = Vd();
            h = 0;
            for (k = d.length; h < k; ++h) {
                var p = d[h], n = fe(Xd(Infinity, Infinity, -Infinity, -Infinity, void 0), c, f, p[0], e);
                g.push((n[0] + n[2]) / 2, (n[1] + n[3]) / 2);
                f = p[p.length - 1]
            }
            c = Cm(b);
            d = b.b;
            e = b.s;
            f = 0;
            h = [];
            k = 0;
            for (n = d.length; k < n; ++k)p = d[k], h = ml(c, f, p, e, g, 2 * k, h), f = p[p.length - 1];
            b.q = h;
            b.p = b.c
        }
        return b.q
    }

    l.qh = function () {
        var b = new tn(null), c = Dm(this).slice();
        Ok(b, "XY", c);
        b.l();
        return b
    };
    function Cm(b) {
        if (b.F != b.c) {
            var c = b.k, d;
            a:{
                d = b.b;
                var e, f;
                e = 0;
                for (f = d.length; e < f; ++e)if (!sl(c, d[e], b.s)) {
                    d = !1;
                    break a
                }
                d = !0
            }
            if (d)b.n = c; else {
                b.n = c.slice();
                d = c = b.n;
                e = b.b;
                f = b.s;
                var g = 0, h, k;
                h = 0;
                for (k = e.length; h < k; ++h)g = tl(d, g, e[h], f);
                c.length = g
            }
            b.F = b.c
        }
        return b.n
    }

    l.mc = function (b) {
        var c = [], d = [], e = this.k, f = this.b, g = this.s;
        b = Math.sqrt(b);
        var h = 0, k = 0, n, p;
        n = 0;
        for (p = f.length; n < p; ++n) {
            var q = f[n], r = [], k = el(e, h, q, g, b, c, k, r);
            d.push(r);
            h = q[q.length - 1]
        }
        c.length = k;
        e = new un(null);
        vn(e, "XY", c, d);
        return e
    };
    l.Dh = function (b) {
        if (0 > b || this.b.length <= b)return null;
        var c;
        0 === b ? c = 0 : (c = this.b[b - 1], c = c[c.length - 1]);
        b = this.b[b].slice();
        var d = b[b.length - 1];
        if (0 !== c) {
            var e, f;
            e = 0;
            for (f = b.length; e < f; ++e)b[e] -= c
        }
        e = new H(null);
        ul(e, this.a, this.k.slice(c, d), b);
        return e
    };
    l.gd = function () {
        var b = this.a, c = this.k, d = this.b, e = [], f = 0, g, h, k, n;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var p = d[g].slice(), q = p[p.length - 1];
            if (0 !== f)for (k = 0, n = p.length; k < n; ++k)p[k] -= f;
            k = new H(null);
            ul(k, b, c.slice(f, q), p);
            e.push(k);
            f = q
        }
        return e
    };
    l.H = function () {
        return "MultiPolygon"
    };
    l.ha = function (b) {
        a:{
            var c = Cm(this), d = this.b, e = this.s, f = 0, g, h;
            g = 0;
            for (h = d.length; g < h; ++g) {
                var k = d[g];
                if (ql(c, f, k, e, b)) {
                    b = !0;
                    break a
                }
                f = k[k.length - 1]
            }
            b = !1
        }
        return b
    };
    l.U = function (b, c) {
        if (null === b)vn(this, "XY", null, this.b); else {
            Pk(this, c, b, 3);
            null === this.k && (this.k = []);
            var d = this.k, e = this.s, f = this.b, g = 0, f = m(f) ? f : [], h = 0, k, n;
            k = 0;
            for (n = b.length; k < n; ++k)g = al(d, g, b[k], e, f[h]), f[h++] = g, g = g[g.length - 1];
            f.length = h;
            0 === f.length ? this.k.length = 0 : (d = f[f.length - 1], this.k.length = 0 === d.length ? 0 : d[d.length - 1]);
            this.l()
        }
    };
    function vn(b, c, d, e) {
        Ok(b, c, d);
        b.b = e;
        b.l()
    }

    function wn(b, c) {
        var d = "XY", e = [], f = [], g, h, k;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var n = c[g];
            0 === g && (d = n.a);
            var p = e.length;
            k = n.b;
            var q, r;
            q = 0;
            for (r = k.length; q < r; ++q)k[q] += p;
            db(e, n.k);
            f.push(k)
        }
        vn(b, d, e, f)
    };
    function xn(b, c) {
        return ma(b) - ma(c)
    }

    function yn(b, c) {
        var d = .5 * b / c;
        return d * d
    }

    function zn(b, c, d, e, f, g) {
        var h = !1, k, n;
        k = d.f;
        null === k ? An(b, c, d, e) : (n = k.ue(), 2 == n || 3 == n ? (k.Ge(f, g), 2 == n && An(b, c, d, e)) : (0 == n && k.load(), k.ne(f, g), h = !0));
        return h
    }

    function An(b, c, d, e) {
        var f = (0, d.d)(c);
        null != f && (e = f.ke(e), (0, Bn[e.H()])(b, e, d, c))
    }

    var Bn = {
        Point: function (b, c, d, e) {
            var f = d.f;
            if (null !== f) {
                var g = b.a(d.a, "Image");
                g.cb(f);
                g.rb(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a, "Text"), b.xa(f), b.sb(c.K(), 0, 2, 2, c, e))
        }, LineString: function (b, c, d, e) {
            var f = d.b;
            if (null !== f) {
                var g = b.a(d.a, "LineString");
                g.wa(null, f);
                g.Cb(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a, "Text"), b.xa(f), b.sb(Am(c), 0, 2, 2, c, e))
        }, Polygon: function (b, c, d, e) {
            var f = d.e, g = d.b;
            if (null !== f || null !== g) {
                var h = b.a(d.a, "Polygon");
                h.wa(f, g);
                h.Sb(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a, "Text"), b.xa(f), b.sb(wl(c), 0, 2,
                2, c, e))
        }, MultiPoint: function (b, c, d, e) {
            var f = d.f;
            if (null !== f) {
                var g = b.a(d.a, "Image");
                g.cb(f);
                g.qb(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a, "Text"), b.xa(f), d = c.k, b.sb(d, 0, d.length, c.s, c, e))
        }, MultiLineString: function (b, c, d, e) {
            var f = d.b;
            if (null !== f) {
                var g = b.a(d.a, "LineString");
                g.wa(null, f);
                g.kc(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a, "Text"), b.xa(f), d = Bm(c), b.sb(d, 0, d.length, 2, c, e))
        }, MultiPolygon: function (b, c, d, e) {
            var f = d.e, g = d.b;
            if (null !== g || null !== f) {
                var h = b.a(d.a, "Polygon");
                h.wa(f, g);
                h.lc(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a,
                "Text"), b.xa(f), d = Dm(c), b.sb(d, 0, d.length, 2, c, e))
        }, GeometryCollection: function (b, c, d, e) {
            c = c.d;
            var f, g;
            f = 0;
            for (g = c.length; f < g; ++f)(0, Bn[c[f].H()])(b, c[f], d, e)
        }, Circle: function (b, c, d, e) {
            var f = d.e, g = d.b;
            if (null !== f || null !== g) {
                var h = b.a(d.a, "Polygon");
                h.wa(f, g);
                h.jc(c, e)
            }
            f = d.c;
            null !== f && (b = b.a(d.a, "Text"), b.xa(f), b.sb(c.qe(), 0, 2, 2, c, e))
        }
    };

    function Cn(b, c) {
        $m.call(this, b, c);
        this.d = !1;
        this.r = -1;
        this.q = NaN;
        this.f = Vd();
        this.c = this.g = null;
        this.e = Tf()
    }

    u(Cn, $m);
    Cn.prototype.j = function (b, c, d) {
        var e = bn(this, b);
        an(this, "precompose", d, b, e);
        var f = this.c;
        if (null !== f && !f.ia()) {
            var g;
            ld(this.a, "render") ? (this.e.canvas.width = d.canvas.width, this.e.canvas.height = d.canvas.height, g = this.e) : g = d;
            var h = g.globalAlpha;
            g.globalAlpha = c.opacity;
            Zm(f, g, b.pixelRatio, e, b.viewState.rotation, b.skippedFeatureUids);
            g != d && (an(this, "render", g, b, e), d.drawImage(g.canvas, 0, 0));
            g.globalAlpha = h
        }
        an(this, "postcompose", d, b, e)
    };
    Cn.prototype.Zb = function (b, c, d, e) {
        if (null !== this.c) {
            var f = this.a, g = {};
            return Wm(this.c, c.viewState.resolution, c.viewState.rotation, b, c.skippedFeatureUids, function (b) {
                var c = ma(b).toString();
                if (!(c in g))return g[c] = !0, d.call(e, b, f)
            })
        }
    };
    Cn.prototype.t = function () {
        Ij(this)
    };
    Cn.prototype.i = function (b) {
        function c(b) {
            var c;
            m(b.a) ? c = b.a.call(b, k) : m(d.r) && (c = (0, d.r)(b, k));
            if (null != c) {
                if (null != c) {
                    var e, f, g = !1;
                    e = 0;
                    for (f = c.length; e < f; ++e)g = zn(q, b, c[e], yn(k, n), this.t, this) || g;
                    b = g
                } else b = !1;
                this.d = this.d || b
            }
        }

        var d = this.a, e = d.a();
        Kj(b.attributions, e.e);
        Lj(b, e);
        if (!this.d && (b.viewHints[0] || b.viewHints[1]))return !0;
        var f = b.extent, g = b.viewState, h = g.projection, k = g.resolution, n = b.pixelRatio;
        b = d.c;
        var p = d.Ab, g = d.get("renderOrder");
        m(g) || (g = xn);
        f = Yd(f, p * k);
        if (!this.d && this.q == k && this.r ==
            b && this.g == g && $d(this.f, f))return !0;
        tc(this.c);
        this.c = null;
        this.d = !1;
        var q = new Um(.5 * k / n, f, k);
        e.Hb(f, k, h);
        if (null === g)e.Db(f, k, c, this); else {
            var r = [];
            e.Db(f, k, function (b) {
                r.push(b)
            }, this);
            gb(r, g);
            Ta(r, c, this)
        }
        Vm(q);
        this.q = k;
        this.r = b;
        this.g = g;
        this.f = f;
        this.c = q;
        return !0
    };
    function Dn(b, c) {
        Yj.call(this, 0, c);
        this.o = Tf();
        this.a = this.o.canvas;
        this.a.style.width = "100%";
        this.a.style.height = "100%";
        this.a.className = "ol-unselectable";
        Mf(b, this.a, 0);
        this.c = !0;
        this.i = Kd()
    }

    u(Dn, Yj);
    Dn.prototype.Yc = function (b) {
        return b instanceof J ? new dn(this, b) : b instanceof K ? new en(this, b) : b instanceof L ? new Cn(this, b) : null
    };
    function En(b, c, d) {
        var e = b.e, f = b.o;
        if (ld(e, c)) {
            var g = d.extent, h = d.pixelRatio, k = d.viewState, n = k.resolution, p = k.rotation;
            Vj(b.i, b.a.width / 2, b.a.height / 2, h / n, -h / n, -p, -k.center[0], -k.center[1]);
            k = new Um(.5 * n / h, g, n);
            g = new sm(f, h, g, b.i, p);
            e.dispatchEvent(new yl(c, e, g, k, d, f, null));
            Vm(k);
            k.ia() || Zm(k, f, h, b.i, p, {});
            Em(g);
            b.g = k
        }
    }

    Dn.prototype.H = function () {
        return "canvas"
    };
    Dn.prototype.Ld = function (b) {
        if (null === b)this.c && (Sg(this.a, !1), this.c = !1); else {
            var c = this.o, d = b.size[0] * b.pixelRatio, e = b.size[1] * b.pixelRatio;
            this.a.width != d || this.a.height != e ? (this.a.width = d, this.a.height = e) : c.clearRect(0, 0, this.a.width, this.a.height);
            Zj(b);
            En(this, "precompose", b);
            var d = b.layerStatesArray, e = b.viewState.resolution, f, g, h, k;
            f = 0;
            for (g = d.length; f < g; ++f)k = d[f], h = k.layer, h = bk(this, h), k.visible && e >= k.minResolution && e < k.maxResolution && "ready" == k.gc && h.i(b, k) && h.j(b, k, c);
            En(this, "postcompose",
                b);
            this.c || (Sg(this.a, !0), this.c = !0);
            ck(this, b);
            b.postRenderFunctions.push(ak)
        }
    };
    function Fn(b, c, d) {
        Hj.call(this, b, c);
        this.target = d
    }

    u(Fn, Hj);
    Fn.prototype.e = ca;
    Fn.prototype.i = ca;
    function Gn(b, c) {
        var d = If("DIV");
        d.style.position = "absolute";
        Fn.call(this, b, c, d);
        this.c = null;
        this.d = Md()
    }

    u(Gn, Fn);
    Gn.prototype.Zb = function (b, c, d, e) {
        var f = this.a;
        return f.a().yd(c.viewState.resolution, c.viewState.rotation, b, c.skippedFeatureUids, function (b) {
            return d.call(e, b, f)
        })
    };
    Gn.prototype.e = function () {
        Kf(this.target);
        this.c = null
    };
    Gn.prototype.f = function (b, c) {
        var d = b.viewState, e = d.center, f = d.resolution, g = d.rotation, h = this.c, k = this.a.a(), n = b.viewHints, p = b.extent;
        m(c.extent) && (p = pe(p, c.extent));
        n[0] || n[1] || se(p) || (d = d.projection, n = k.g, null === n || (d = n), p = k.rc(p, f, b.pixelRatio, d), null !== p && (d = p.state, 0 == d ? (Wc(p, "change", this.o, !1, this), p.load()) : 2 == d && (h = p)));
        null !== h && (d = h.D(), n = h.resolution, p = Kd(), Vj(p, b.size[0] / 2, b.size[1] / 2, n / f, n / f, g, (d[0] - e[0]) / n, (e[1] - d[3]) / n), h != this.c && (e = h.c(this), e.style.maxWidth = "none", e.style.position =
            "absolute", Kf(this.target), this.target.appendChild(e), this.c = h), Wj(p, this.d) || (Xf(this.target, p), Nd(this.d, p)), Kj(b.attributions, h.f), Lj(b, k));
        return !0
    };
    function Hn(b, c) {
        var d = If("DIV");
        d.style.position = "absolute";
        Fn.call(this, b, c, d);
        this.d = !0;
        this.n = 1;
        this.g = 0;
        this.c = {}
    }

    u(Hn, Fn);
    Hn.prototype.e = function () {
        Kf(this.target);
        this.g = 0
    };
    Hn.prototype.f = function (b, c) {
        if (!c.visible)return this.d && (Sg(this.target, !1), this.d = !1), !0;
        var d = b.pixelRatio, e = b.viewState, f = e.projection, g = this.a, h = g.a(), k = Gj(h, f), n = h.bd(), p = ec(k.a, e.resolution, 0), q = k.ka(p), r = e.center, s;
        q == e.resolution ? (r = Oj(r, q, b.size), s = ne(r, q, e.rotation, b.size)) : s = b.extent;
        m(c.extent) && (s = pe(s, c.extent));
        var q = Aj(k, s, q), v = {};
        v[p] = {};
        var y = sa(h.fe, h, v, Nj(function (b) {
            return null !== b && 2 == b.state
        }, h, d, f)), C = g.ea();
        m(C) || (C = !0);
        var F = Vd(), G = new of(0, 0, 0, 0), w, U, N, Y;
        for (N = q.a; N <=
        q.d; ++N)for (Y = q.b; Y <= q.c; ++Y)w = h.Fb(p, N, Y, d, f), U = w.state, 2 == U ? v[p][nf(w.a)] = w : 4 == U || 3 == U && !C || (U = k.$c(w.a, y, null, G, F), U || (w = k.kd(w.a, G, F), null === w || y(p + 1, w)));
        var T;
        if (this.g != h.c) {
            for (T in this.c)C = this.c[+T], Nf(C.target);
            this.c = {};
            this.g = h.c
        }
        F = Va(sb(v), Number);
        gb(F);
        var y = {}, qa;
        N = 0;
        for (Y = F.length; N < Y; ++N) {
            T = F[N];
            T in this.c ? C = this.c[T] : (C = k.Fc(r, T), C = new In(k, C), y[T] = !0, this.c[T] = C);
            T = v[T];
            for (qa in T)Jn(C, T[qa], n);
            Kn(C)
        }
        n = Va(sb(this.c), Number);
        gb(n);
        N = Kd();
        qa = 0;
        for (F = n.length; qa < F; ++qa)if (T = n[qa],
                C = this.c[T], T in v)if (w = C.g, Y = C.f, Vj(N, b.size[0] / 2, b.size[1] / 2, w / e.resolution, w / e.resolution, e.rotation, (Y[0] - r[0]) / w, (r[1] - Y[1]) / w), Ln(C, N), T in y) {
            for (--T; 0 <= T; --T)if (T in this.c) {
                Lf(C.target, this.c[T].target);
                break
            }
            0 > T && Mf(this.target, C.target, 0)
        } else b.viewHints[0] || b.viewHints[1] || Mn(C, s, G); else Nf(C.target), delete this.c[T];
        c.opacity != this.n && (this.n = this.target.style.opacity = c.opacity);
        c.visible && !this.d && (Sg(this.target, !0), this.d = !0);
        Mj(b.usedTiles, h, p, q);
        Pj(b, h, k, d, f, s, p, g.r());
        Jj(b, h);
        Lj(b, h);
        return !0
    };
    function In(b, c) {
        this.target = If("DIV");
        this.target.style.position = "absolute";
        this.target.style.width = "100%";
        this.target.style.height = "100%";
        this.d = b;
        this.b = c;
        this.f = me(yj(b, c));
        this.g = b.ka(c[0]);
        this.c = {};
        this.a = null;
        this.e = Md()
    }

    function Jn(b, c, d) {
        var e = c.a, f = e[0], g = e[1], h = e[2], e = nf(e);
        if (!(e in b.c)) {
            var f = b.d.sa(f), k = c.Na(b), n = k.style;
            n.maxWidth = "none";
            var p, q;
            0 < d ? (p = If("DIV"), q = p.style, q.overflow = "hidden", q.width = f + "px", q.height = f + "px", n.position = "absolute", n.left = -d + "px", n.top = -d + "px", n.width = f + 2 * d + "px", n.height = f + 2 * d + "px", p.appendChild(k)) : (n.width = f + "px", n.height = f + "px", p = k, q = n);
            q.position = "absolute";
            q.left = (g - b.b[1]) * f + "px";
            q.top = (b.b[2] - h) * f + "px";
            null === b.a && (b.a = document.createDocumentFragment());
            b.a.appendChild(p);
            b.c[e] = c
        }
    }

    function Kn(b) {
        null !== b.a && (b.target.appendChild(b.a), b.a = null)
    }

    function Mn(b, c, d) {
        var e = zj(b.d, c, b.b[0], d);
        c = [];
        for (var f in b.c)d = b.c[f], e.contains(d.a) || c.push(d);
        var g, e = 0;
        for (g = c.length; e < g; ++e)d = c[e], f = nf(d.a), Nf(d.Na(b)), delete b.c[f]
    }

    function Ln(b, c) {
        Wj(c, b.e) || (Xf(b.target, c), Nd(b.e, c))
    };
    function Nn(b, c) {
        this.g = Tf();
        var d = this.g.canvas;
        d.style.maxWidth = "none";
        d.style.position = "absolute";
        Fn.call(this, b, c, d);
        this.d = !1;
        this.q = -1;
        this.p = NaN;
        this.n = Vd();
        this.c = this.j = null;
        this.r = Kd()
    }

    u(Nn, Fn);
    Nn.prototype.i = function (b, c) {
        var d = b.viewState, e = d.rotation, f = b.pixelRatio, d = Vj(this.r, f * b.size[0] / 2, f * b.size[1] / 2, f / d.resolution, -f / d.resolution, -d.rotation, -d.center[0], -d.center[1]), g = this.g;
        g.canvas.width = b.size[0];
        g.canvas.height = b.size[1];
        On(this, "precompose", b, d);
        var h = this.c;
        null === h || h.ia() || (g.globalAlpha = c.opacity, Zm(h, g, f, d, e, b.skippedFeatureUids), On(this, "render", b, d));
        On(this, "postcompose", b, d)
    };
    function On(b, c, d, e) {
        var f = b.g;
        b = b.a;
        ld(b, c) && (e = new sm(f, d.pixelRatio, d.extent, e, d.viewState.rotation), b.dispatchEvent(new yl(c, b, e, null, d, f, null)), Em(e))
    }

    Nn.prototype.Zb = function (b, c, d, e) {
        if (null !== this.c) {
            var f = this.a, g = {};
            return Wm(this.c, c.viewState.resolution, c.viewState.rotation, b, c.skippedFeatureUids, function (b) {
                var c = ma(b).toString();
                if (!(c in g))return g[c] = !0, d.call(e, b, f)
            })
        }
    };
    Nn.prototype.t = function () {
        Ij(this)
    };
    Nn.prototype.f = function (b) {
        function c(b) {
            var c;
            m(b.a) ? c = b.a.call(b, k) : m(d.r) && (c = (0, d.r)(b, k));
            if (null != c) {
                if (null != c) {
                    var e, f, g = !1;
                    e = 0;
                    for (f = c.length; e < f; ++e)g = zn(q, b, c[e], yn(k, n), this.t, this) || g;
                    b = g
                } else b = !1;
                this.d = this.d || b
            }
        }

        var d = this.a, e = d.a();
        Kj(b.attributions, e.e);
        Lj(b, e);
        if (!this.d && (b.viewHints[0] || b.viewHints[1]))return !0;
        var f = b.extent, g = b.viewState, h = g.projection, k = g.resolution, n = b.pixelRatio;
        b = d.c;
        var p = d.Ab, g = d.get("renderOrder");
        m(g) || (g = xn);
        f = Yd(f, p * k);
        if (!this.d && this.p == k && this.q ==
            b && this.j == g && $d(this.n, f))return !0;
        tc(this.c);
        this.c = null;
        this.d = !1;
        var q = new Um(.5 * k / n, f, k);
        e.Hb(f, k, h);
        if (null === g)e.Db(f, k, c, this); else {
            var r = [];
            e.Db(f, k, function (b) {
                r.push(b)
            }, this);
            gb(r, g);
            Ta(r, c, this)
        }
        Vm(q);
        this.p = k;
        this.q = b;
        this.j = g;
        this.n = f;
        this.c = q;
        return !0
    };
    function Pn(b, c) {
        Yj.call(this, 0, c);
        this.c = null;
        this.c = Tf();
        var d = this.c.canvas;
        d.style.position = "absolute";
        d.style.width = "100%";
        d.style.height = "100%";
        d.className = "ol-unselectable";
        Mf(b, d, 0);
        this.i = Kd();
        this.a = If("DIV");
        this.a.className = "ol-unselectable";
        d = this.a.style;
        d.position = "absolute";
        d.width = "100%";
        d.height = "100%";
        z(this.a, "touchstart", wc);
        Mf(b, this.a, 0);
        this.o = !0
    }

    u(Pn, Yj);
    Pn.prototype.M = function () {
        Nf(this.a);
        Pn.S.M.call(this)
    };
    Pn.prototype.Yc = function (b) {
        if (b instanceof J)b = new Gn(this, b); else if (b instanceof K)b = new Hn(this, b); else if (b instanceof L)b = new Nn(this, b); else return null;
        return b
    };
    function Qn(b, c, d) {
        var e = b.e;
        if (ld(e, c)) {
            var f = d.extent, g = d.pixelRatio, h = d.viewState, k = h.resolution, n = h.rotation, p = b.c, q = p.canvas;
            Vj(b.i, q.width / 2, q.height / 2, g / h.resolution, -g / h.resolution, -h.rotation, -h.center[0], -h.center[1]);
            h = new sm(p, g, f, b.i, n);
            f = new Um(.5 * k / g, f, k);
            e.dispatchEvent(new yl(c, e, h, f, d, p, null));
            Vm(f);
            f.ia() || Zm(f, p, g, b.i, n, {});
            Em(h);
            b.g = f
        }
    }

    Pn.prototype.H = function () {
        return "dom"
    };
    Pn.prototype.Ld = function (b) {
        if (null === b)this.o && (Sg(this.a, !1), this.o = !1); else {
            var c;
            c = function (b, c) {
                Mf(this.a, b, c)
            };
            var d = this.e;
            if (ld(d, "precompose") || ld(d, "postcompose"))d = this.c.canvas, d.width = b.size[0], d.height = b.size[1];
            Qn(this, "precompose", b);
            var d = b.layerStatesArray, e, f, g, h;
            e = 0;
            for (f = d.length; e < f; ++e)h = d[e], g = h.layer, g = bk(this, g), c.call(this, g.target, e), "ready" == h.gc ? g.f(b, h) && g.i(b, h) : g.e();
            c = b.layerStates;
            for (var k in this.b)k in c || (g = this.b[k], Nf(g.target));
            this.o || (Sg(this.a, !0), this.o = !0);
            Zj(b);
            ck(this, b);
            b.postRenderFunctions.push(ak);
            Qn(this, "postcompose", b)
        }
    };
    function Rn(b) {
        this.a = b
    }

    function Sn(b) {
        this.a = b
    }

    u(Sn, Rn);
    Sn.prototype.H = function () {
        return 35632
    };
    function Tn(b) {
        this.a = b
    }

    u(Tn, Rn);
    Tn.prototype.H = function () {
        return 35633
    };
    function Un() {
        this.a = "precision mediump float;varying vec2 a;varying float b;uniform mat4 k;uniform float l;uniform sampler2D m;void main(void){vec4 texColor=texture2D(m,a);float alpha=texColor.a*b*l;if(alpha==0.0){discard;}gl_FragColor.a=alpha;gl_FragColor.rgb=(k*vec4(texColor.rgb,1.)).rgb;}"
    }

    u(Un, Sn);
    da(Un);
    function Vn() {
        this.a = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"
    }

    u(Vn, Tn);
    da(Vn);
    function Wn(b, c) {
        this.n = b.getUniformLocation(c, "k");
        this.o = b.getUniformLocation(c, "j");
        this.i = b.getUniformLocation(c, "i");
        this.f = b.getUniformLocation(c, "l");
        this.g = b.getUniformLocation(c, "h");
        this.a = b.getAttribLocation(c, "e");
        this.c = b.getAttribLocation(c, "f");
        this.d = b.getAttribLocation(c, "c");
        this.b = b.getAttribLocation(c, "g");
        this.e = b.getAttribLocation(c, "d")
    };
    function Xn() {
        this.a = "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"
    }

    u(Xn, Sn);
    da(Xn);
    function Yn() {
        this.a = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"
    }

    u(Yn, Tn);
    da(Yn);
    function Zn(b, c) {
        this.o = b.getUniformLocation(c, "j");
        this.i = b.getUniformLocation(c, "i");
        this.f = b.getUniformLocation(c, "k");
        this.g = b.getUniformLocation(c, "h");
        this.a = b.getAttribLocation(c, "e");
        this.c = b.getAttribLocation(c, "f");
        this.d = b.getAttribLocation(c, "c");
        this.b = b.getAttribLocation(c, "g");
        this.e = b.getAttribLocation(c, "d")
    };
    function $n(b) {
        this.a = m(b) ? b : [];
        this.c = m(void 0) ? void 0 : 35044
    };
    function ao(b, c) {
        this.n = this.i = void 0;
        this.Sa = new yg;
        this.e = ke(c);
        this.o = [];
        this.q = void 0;
        this.b = [];
        this.t = this.r = void 0;
        this.c = [];
        this.p = this.j = this.d = null;
        this.F = void 0;
        this.ga = Md();
        this.Ra = Md();
        this.Q = this.J = void 0;
        this.ea = Md();
        this.ca = this.ba = this.V = void 0;
        this.f = [];
        this.a = [];
        this.g = null;
        this.la = void 0
    }

    function bo(b, c) {
        var d = b.g, e = b.d, f = b.f, g = c.a;
        return function () {
            if (!g.isContextLost()) {
                var b, k;
                b = 0;
                for (k = f.length; b < k; ++b)g.deleteTexture(f[b])
            }
            co(c, d);
            co(c, e)
        }
    }

    function eo(b, c, d, e) {
        var f = b.i, g = b.n, h = b.q, k = b.r, n = b.t, p = b.F, q = b.J, r = b.Q, s = b.V ? 1 : 0, v = b.ba, y = b.ca, C = b.la, F = Math.cos(v), v = Math.sin(v), G = b.c.length, w = b.a.length, U, N, Y, T, qa, vb;
        for (U = 0; U < d; U += e)qa = c[U] - b.e[0], vb = c[U + 1] - b.e[1], N = w / 8, Y = -y * f, T = -y * (h - g), b.a[w++] = qa, b.a[w++] = vb, b.a[w++] = Y * F - T * v, b.a[w++] = Y * v + T * F, b.a[w++] = q / n, b.a[w++] = (r + h) / k, b.a[w++] = p, b.a[w++] = s, Y = y * (C - f), T = -y * (h - g), b.a[w++] = qa, b.a[w++] = vb, b.a[w++] = Y * F - T * v, b.a[w++] = Y * v + T * F, b.a[w++] = (q + C) / n, b.a[w++] = (r + h) / k, b.a[w++] = p, b.a[w++] = s, Y = y * (C - f), T =
            y * g, b.a[w++] = qa, b.a[w++] = vb, b.a[w++] = Y * F - T * v, b.a[w++] = Y * v + T * F, b.a[w++] = (q + C) / n, b.a[w++] = r / k, b.a[w++] = p, b.a[w++] = s, Y = -y * f, T = y * g, b.a[w++] = qa, b.a[w++] = vb, b.a[w++] = Y * F - T * v, b.a[w++] = Y * v + T * F, b.a[w++] = q / n, b.a[w++] = r / k, b.a[w++] = p, b.a[w++] = s, b.c[G++] = N, b.c[G++] = N + 1, b.c[G++] = N + 2, b.c[G++] = N, b.c[G++] = N + 2, b.c[G++] = N + 3
    }

    l = ao.prototype;
    l.qb = function (b) {
        var c = b.k;
        eo(this, c, c.length, b.s)
    };
    l.rb = function (b) {
        var c = b.k;
        eo(this, c, c.length, b.s)
    };
    l.Kb = function (b) {
        var c = b.a;
        this.o.push(this.c.length);
        this.g = new $n(this.a);
        fo(b, 34962, this.g);
        this.d = new $n(this.c);
        fo(b, 34963, this.d);
        var d, e, f = {}, g, h = this.b.length;
        for (g = 0; g < h; ++g)d = this.b[g], e = ma(d).toString(), e in f ? b = x(f, e) : (b = c.createTexture(), c.bindTexture(3553, b), c.texParameteri(3553, 10242, 33071), c.texParameteri(3553, 10243, 33071), c.texParameteri(3553, 10241, 9729), c.texParameteri(3553, 10240, 9729), c.texImage2D(3553, 0, 6408, 6408, 5121, d), f[e] = b), this.f[g] = b;
        this.q = this.n = this.i = void 0;
        this.b = null;
        this.t = this.r = void 0;
        this.c = null;
        this.ca = this.ba = this.V = this.Q = this.J = this.F = void 0;
        this.a = null;
        this.la = void 0
    };
    l.Hc = function (b, c, d, e, f, g, h, k, n, p, q) {
        g = b.a;
        fo(b, 34962, this.g);
        fo(b, 34963, this.d);
        var r = k || 1 != n || p || 1 != q, s, v;
        r ? (s = Un.Ja(), v = Vn.Ja()) : (s = Xn.Ja(), v = Yn.Ja());
        v = go(b, s, v);
        r ? null === this.j ? this.j = s = new Wn(g, v) : s = this.j : null === this.p ? this.p = s = new Zn(g, v) : s = this.p;
        b.Gd(v);
        g.enableVertexAttribArray(s.d);
        g.vertexAttribPointer(s.d, 2, 5126, !1, 32, 0);
        g.enableVertexAttribArray(s.a);
        g.vertexAttribPointer(s.a, 2, 5126, !1, 32, 8);
        g.enableVertexAttribArray(s.e);
        g.vertexAttribPointer(s.e, 2, 5126, !1, 32, 16);
        g.enableVertexAttribArray(s.c);
        g.vertexAttribPointer(s.c, 1, 5126, !1, 32, 24);
        g.enableVertexAttribArray(s.b);
        g.vertexAttribPointer(s.b, 1, 5126, !1, 32, 28);
        v = this.ea;
        Vj(v, 0, 0, 2 / (d * f[0]), 2 / (d * f[1]), -e, -(c[0] - this.e[0]), -(c[1] - this.e[1]));
        c = this.Ra;
        d = 2 / f[0];
        f = 2 / f[1];
        Od(c);
        c[0] = d;
        c[5] = f;
        c[10] = 1;
        c[15] = 1;
        f = this.ga;
        Od(f);
        0 !== e && Sd(f, -e);
        g.uniformMatrix4fv(s.g, !1, v);
        g.uniformMatrix4fv(s.i, !1, c);
        g.uniformMatrix4fv(s.o, !1, f);
        g.uniform1f(s.f, h);
        r && g.uniformMatrix4fv(s.n, !1, zg(this.Sa, k, n, p, q));
        e = 0;
        h = this.f.length;
        for (k = 0; e < h; ++e)g.bindTexture(3553,
            this.f[e]), n = this.o[e], g.drawElements(4, n - k, b.e ? 5125 : 5123, k * (b.e ? 4 : 2)), k = n;
        g.disableVertexAttribArray(s.d);
        g.disableVertexAttribArray(s.a);
        g.disableVertexAttribArray(s.e);
        g.disableVertexAttribArray(s.c);
        g.disableVertexAttribArray(s.b)
    };
    l.cb = function (b) {
        var c = b.tb(), d = b.yb(1), e = b.cd(), f = b.p, g = b.zb(), h = b.q, k = b.i, n = b.ab();
        b = b.n;
        0 === this.b.length ? this.b.push(d) : ma(this.b[this.b.length - 1]) != ma(d) && (this.o.push(this.c.length), this.b.push(d));
        this.i = c[0];
        this.n = c[1];
        this.q = n[1];
        this.r = e[1];
        this.t = e[0];
        this.F = f;
        this.J = g[0];
        this.Q = g[1];
        this.ba = k;
        this.V = h;
        this.ca = b;
        this.la = n[0]
    };
    function ho(b, c) {
        this.b = c;
        this.d = b;
        this.c = {}
    }

    function io(b, c) {
        var d = [], e;
        for (e in b.c)d.push(bo(b.c[e], c));
        return hd.apply(null, d)
    }

    function jo(b, c) {
        for (var d in b.c)b.c[d].Kb(c)
    }

    ho.prototype.a = function (b, c) {
        var d = this.c[c];
        m(d) || (d = new ko[c](this.d, this.b), this.c[c] = d);
        return d
    };
    ho.prototype.ia = function () {
        return xb(this.c)
    };
    function lo(b, c, d, e, f, g, h, k, n, p, q, r, s) {
        var v, y, C;
        v = 0;
        for (y = Fm.length; v < y && (C = b.c[Fm[v]], !m(C) || !(C = C.Hc(c, d, e, f, g, h, k, n, p, q, r, s))); ++v);
    }

    var ko = {Image: ao};

    function mo(b, c, d, e, f, g, h) {
        this.b = b;
        this.e = c;
        this.a = g;
        this.f = h;
        this.i = f;
        this.o = e;
        this.g = d;
        this.d = null;
        this.c = {}
    }

    l = mo.prototype;
    l.ic = function (b, c) {
        var d = b.toString(), e = this.c[d];
        m(e) ? e.push(c) : this.c[d] = [c]
    };
    l.jc = function () {
    };
    l.ee = function (b, c) {
        var d = (0, c.d)(b);
        if (null != d && qe(this.a, d.D())) {
            var e = c.a;
            m(e) || (e = 0);
            this.ic(e, function (b) {
                b.wa(c.e, c.b);
                b.cb(c.f);
                b.xa(c.c);
                var e = no[d.H()];
                e && e.call(b, d, null)
            })
        }
    };
    l.Zc = function (b, c) {
        var d = b.d, e, f;
        e = 0;
        for (f = d.length; e < f; ++e) {
            var g = d[e], h = no[g.H()];
            h && h.call(this, g, c)
        }
    };
    l.rb = function (b, c) {
        var d = this.b, e = (new ho(1, this.a)).a(0, "Image");
        e.cb(this.d);
        e.rb(b, c);
        e.Kb(d);
        e.Hc(this.b, this.e, this.g, this.o, this.i, this.a, this.f, 1, 0, 1, 0, 1, {});
        bo(e, d)()
    };
    l.Cb = function () {
    };
    l.kc = function () {
    };
    l.qb = function (b, c) {
        var d = this.b, e = (new ho(1, this.a)).a(0, "Image");
        e.cb(this.d);
        e.qb(b, c);
        e.Kb(d);
        e.Hc(this.b, this.e, this.g, this.o, this.i, this.a, this.f, 1, 0, 1, 0, 1, {});
        bo(e, d)()
    };
    l.lc = function () {
    };
    l.Sb = function () {
    };
    l.sb = function () {
    };
    l.wa = function () {
    };
    l.cb = function (b) {
        this.d = b
    };
    l.xa = function () {
    };
    var no = {Point: mo.prototype.rb, MultiPoint: mo.prototype.qb, GeometryCollection: mo.prototype.Zc};

    function oo() {
        this.a = "precision mediump float;varying vec2 a;uniform mat4 f;uniform float g;uniform sampler2D h;void main(void){vec4 texColor=texture2D(h,a);gl_FragColor.rgb=(f*vec4(texColor.rgb,1.)).rgb;gl_FragColor.a=texColor.a*g;}"
    }

    u(oo, Sn);
    da(oo);
    function po() {
        this.a = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"
    }

    u(po, Tn);
    da(po);
    function qo(b, c) {
        this.g = b.getUniformLocation(c, "f");
        this.b = b.getUniformLocation(c, "g");
        this.d = b.getUniformLocation(c, "e");
        this.f = b.getUniformLocation(c, "d");
        this.e = b.getUniformLocation(c, "h");
        this.a = b.getAttribLocation(c, "b");
        this.c = b.getAttribLocation(c, "c")
    };
    function ro() {
        this.a = "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"
    }

    u(ro, Sn);
    da(ro);
    function so() {
        this.a = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"
    }

    u(so, Tn);
    da(so);
    function to(b, c) {
        this.b = b.getUniformLocation(c, "f");
        this.d = b.getUniformLocation(c, "e");
        this.f = b.getUniformLocation(c, "d");
        this.e = b.getUniformLocation(c, "g");
        this.a = b.getAttribLocation(c, "b");
        this.c = b.getAttribLocation(c, "c")
    };
    function uo(b, c) {
        Hj.call(this, b, c);
        this.J = new $n([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
        this.e = this.Qa = null;
        this.f = void 0;
        this.q = Kd();
        this.F = Md();
        this.Q = new yg;
        this.i = this.g = null
    }

    u(uo, Hj);
    function vo(b, c, d) {
        var e = b.b.d;
        if (m(b.f) && b.f == d)e.bindFramebuffer(36160, b.e); else {
            c.postRenderFunctions.push(ta(function (b, c, d) {
                b.isContextLost() || (b.deleteFramebuffer(c), b.deleteTexture(d))
            }, e, b.e, b.Qa));
            c = e.createTexture();
            e.bindTexture(3553, c);
            e.texImage2D(3553, 0, 6408, d, d, 0, 6408, 5121, null);
            e.texParameteri(3553, 10240, 9729);
            e.texParameteri(3553, 10241, 9729);
            var f = e.createFramebuffer();
            e.bindFramebuffer(36160, f);
            e.framebufferTexture2D(36160, 36064, 3553, c, 0);
            b.Qa = c;
            b.e = f;
            b.f = d
        }
    }

    uo.prototype.xf = function (b, c, d) {
        wo(this, "precompose", d, b);
        fo(d, 34962, this.J);
        var e = d.a, f = c.brightness || 1 != c.contrast || c.hue || 1 != c.saturation, g, h;
        f ? (g = oo.Ja(), h = po.Ja()) : (g = ro.Ja(), h = so.Ja());
        g = go(d, g, h);
        f ? null === this.g ? this.g = h = new qo(e, g) : h = this.g : null === this.i ? this.i = h = new to(e, g) : h = this.i;
        d.Gd(g) && (e.enableVertexAttribArray(h.a), e.vertexAttribPointer(h.a, 2, 5126, !1, 16, 0), e.enableVertexAttribArray(h.c), e.vertexAttribPointer(h.c, 2, 5126, !1, 16, 8), e.uniform1i(h.e, 0));
        e.uniformMatrix4fv(h.f, !1, this.q);
        e.uniformMatrix4fv(h.d, !1, this.F);
        f && e.uniformMatrix4fv(h.g, !1, zg(this.Q, c.brightness, c.contrast, c.hue, c.saturation));
        e.uniform1f(h.b, c.opacity);
        e.bindTexture(3553, this.Qa);
        e.drawArrays(5, 0, 4);
        wo(this, "postcompose", d, b)
    };
    function wo(b, c, d, e) {
        b = b.a;
        if (ld(b, c)) {
            var f = e.viewState;
            b.dispatchEvent(new yl(c, b, new mo(d, f.center, f.resolution, f.rotation, e.size, e.extent, e.pixelRatio), null, e, null, d))
        }
    }

    uo.prototype.n = function () {
        this.e = this.Qa = null;
        this.f = void 0
    };
    function xo(b, c) {
        uo.call(this, b, c);
        this.c = null
    }

    u(xo, uo);
    function yo(b, c) {
        var d = c.c(), e = b.b.d, f = e.createTexture();
        e.bindTexture(3553, f);
        e.texImage2D(3553, 0, 6408, 6408, 5121, d);
        e.texParameteri(3553, 10242, 33071);
        e.texParameteri(3553, 10243, 33071);
        e.texParameteri(3553, 10241, 9729);
        e.texParameteri(3553, 10240, 9729);
        return f
    }

    xo.prototype.Zb = function (b, c, d, e) {
        var f = this.a;
        return f.a().yd(c.viewState.resolution, c.viewState.rotation, b, c.skippedFeatureUids, function (b) {
            return d.call(e, b, f)
        })
    };
    xo.prototype.re = function (b, c) {
        var d = this.b.d, e = b.viewState, f = e.center, g = e.resolution, h = e.rotation, k = this.c, n = this.Qa, p = this.a.a(), q = b.viewHints, r = b.extent;
        m(c.extent) && (r = pe(r, c.extent));
        q[0] || q[1] || se(r) || (e = e.projection, q = p.g, null === q || (e = q), r = p.rc(r, g, b.pixelRatio, e), null !== r && (e = r.state, 0 == e ? (Wc(r, "change", this.o, !1, this), r.load()) : 2 == e && (k = r, n = yo(this, r), null === this.Qa || b.postRenderFunctions.push(ta(function (b, c) {
            b.isContextLost() || b.deleteTexture(c)
        }, d, this.Qa)))));
        null !== k && (d = this.b.f.g, zo(this,
            d.width, d.height, f, g, h, k.D()), f = this.q, Od(f), Rd(f, 1, -1), Qd(f, 0, -1), this.c = k, this.Qa = n, Kj(b.attributions, k.f), Lj(b, p));
        return !0
    };
    function zo(b, c, d, e, f, g, h) {
        c *= f;
        d *= f;
        b = b.F;
        Od(b);
        Rd(b, 2 / c, 2 / d);
        Sd(b, -g);
        Qd(b, h[0] - e[0], h[1] - e[1]);
        Rd(b, (h[2] - h[0]) / 2, (h[3] - h[1]) / 2);
        Qd(b, 1, 1)
    };
    function Ao() {
        this.a = "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"
    }

    u(Ao, Sn);
    da(Ao);
    function Bo() {
        this.a = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"
    }

    u(Bo, Tn);
    da(Bo);
    function Co(b, c) {
        this.b = b.getUniformLocation(c, "e");
        this.d = b.getUniformLocation(c, "d");
        this.a = b.getAttribLocation(c, "b");
        this.c = b.getAttribLocation(c, "c")
    };
    function Do(b, c) {
        uo.call(this, b, c);
        this.t = Ao.Ja();
        this.V = Bo.Ja();
        this.c = null;
        this.r = new $n([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
        this.p = this.d = null;
        this.j = -1
    }

    u(Do, uo);
    Do.prototype.M = function () {
        co(this.b.f, this.r);
        Do.S.M.call(this)
    };
    Do.prototype.n = function () {
        Do.S.n.call(this);
        this.c = null
    };
    Do.prototype.re = function (b, c, d) {
        var e = this.b, f = d.a, g = b.viewState, h = g.projection, k = this.a, n = k.a(), p = Gj(n, h), q = ec(p.a, g.resolution, 0), r = p.ka(q), s = n.Gc(q, b.pixelRatio, h), v = s / p.sa(q), y = r / v, C = n.bd(), F = g.center, G;
        r == g.resolution ? (F = Oj(F, r, b.size), G = ne(F, r, g.rotation, b.size)) : G = b.extent;
        r = Aj(p, G, r);
        if (null !== this.d && sf(this.d, r) && this.j == n.c)y = this.p; else {
            var w = [r.d - r.a + 1, r.c - r.b + 1], w = Math.max(w[0] * s, w[1] * s), U = Math.pow(2, Math.ceil(Math.log(w) / Math.LN2)), w = y * U, N = p.Lb(q), Y = N[0] + r.a * s * y, y = N[1] + r.b * s * y, y = [Y,
                y, Y + w, y + w];
            vo(this, b, U);
            f.viewport(0, 0, U, U);
            f.clearColor(0, 0, 0, 0);
            f.clear(16384);
            f.disable(3042);
            U = go(d, this.t, this.V);
            d.Gd(U);
            null === this.c && (this.c = new Co(f, U));
            fo(d, 34962, this.r);
            f.enableVertexAttribArray(this.c.a);
            f.vertexAttribPointer(this.c.a, 2, 5126, !1, 16, 0);
            f.enableVertexAttribArray(this.c.c);
            f.vertexAttribPointer(this.c.c, 2, 5126, !1, 16, 8);
            f.uniform1i(this.c.b, 0);
            d = {};
            d[q] = {};
            var T = sa(n.fe, n, d, Nj(function (b) {
                return null !== b && 2 == b.state && Eo(e.c, b.mb())
            }, n, v, h)), qa = k.ea();
            m(qa) || (qa = !0);
            var U =
                !0, Y = Vd(), vb = new of(0, 0, 0, 0), Ka, ac, Sb;
            for (ac = r.a; ac <= r.d; ++ac)for (Sb = r.b; Sb <= r.c; ++Sb) {
                N = n.Fb(q, ac, Sb, v, h);
                if (m(c.extent) && (Ka = yj(p, N.a, Y), !qe(Ka, c.extent)))continue;
                Ka = N.state;
                if (2 == Ka) {
                    if (Eo(e.c, N.mb())) {
                        d[q][nf(N.a)] = N;
                        continue
                    }
                } else if (4 == Ka || 3 == Ka && !qa)continue;
                U = !1;
                Ka = p.$c(N.a, T, null, vb, Y);
                Ka || (N = p.kd(N.a, vb, Y), null === N || T(q + 1, N))
            }
            c = Va(sb(d), Number);
            gb(c);
            for (var T = new Float32Array(4), La, Pa, Ud, qa = 0, vb = c.length; qa < vb; ++qa)for (La in Pa = d[c[qa]], Pa)N = Pa[La], Ka = yj(p, N.a, Y), ac = 2 * (Ka[2] - Ka[0]) / w,
                Sb = 2 * (Ka[3] - Ka[1]) / w, Ud = 2 * (Ka[0] - y[0]) / w - 1, Ka = 2 * (Ka[1] - y[1]) / w - 1, Jd(T, ac, Sb, Ud, Ka), f.uniform4fv(this.c.d, T), Fo(e, N, s, C * v), f.drawArrays(5, 0, 4);
            U ? (this.d = r, this.p = y, this.j = n.c) : (this.p = this.d = null, this.j = -1, b.animate = !0)
        }
        Mj(b.usedTiles, n, q, r);
        var qd = e.i;
        Pj(b, n, p, v, h, G, q, k.r(), function (b) {
            var c;
            (c = 2 != b.state || Eo(e.c, b.mb())) || (c = b.mb()in qd.b);
            c || Qj(qd, [b, Cj(p, b.a), p.ka(b.a[0]), s, C * v])
        }, this);
        Jj(b, n);
        Lj(b, n);
        f = this.q;
        Od(f);
        Qd(f, (F[0] - y[0]) / (y[2] - y[0]), (F[1] - y[1]) / (y[3] - y[1]));
        0 !== g.rotation && Sd(f, g.rotation);
        Rd(f, b.size[0] * g.resolution / (y[2] - y[0]), b.size[1] * g.resolution / (y[3] - y[1]));
        Qd(f, -.5, -.5);
        return !0
    };
    function Go(b, c) {
        uo.call(this, b, c);
        this.d = !1;
        this.t = -1;
        this.r = NaN;
        this.j = Vd();
        this.c = this.p = null
    }

    u(Go, uo);
    l = Go.prototype;
    l.xf = function (b, c, d) {
        var e = b.viewState, f = this.c;
        null === f || f.ia() || lo(f, d, e.center, e.resolution, e.rotation, b.size, b.pixelRatio, c.opacity, c.brightness, c.contrast, c.hue, c.saturation, b.skippedFeatureUids)
    };
    l.M = function () {
        var b = this.c;
        null !== b && (io(b, this.b.f)(), this.c = null);
        Go.S.M.call(this)
    };
    l.Zb = function () {
    };
    l.vj = function () {
        Ij(this)
    };
    l.re = function (b, c, d) {
        function e(b) {
            var c;
            m(b.a) ? c = b.a.call(b, n) : m(f.r) && (c = (0, f.r)(b, n));
            if (null != c) {
                if (null != c) {
                    var d, e, g = !1;
                    d = 0;
                    for (e = c.length; d < e; ++d)g = zn(s, b, c[d], yn(n, p), this.vj, this) || g;
                    b = g
                } else b = !1;
                this.d = this.d || b
            }
        }

        var f = this.a;
        c = f.a();
        Kj(b.attributions, c.e);
        Lj(b, c);
        if (!this.d && (b.viewHints[0] || b.viewHints[1]))return !0;
        var g = b.extent, h = b.viewState, k = h.projection, n = h.resolution, p = b.pixelRatio, h = f.c, q = f.Ab, r = f.get("renderOrder");
        m(r) || (r = xn);
        g = Yd(g, q * n);
        if (!this.d && this.r == n && this.t == h && this.p ==
            r && $d(this.j, g))return !0;
        null === this.c || b.postRenderFunctions.push(io(this.c, d));
        this.d = !1;
        var s = new ho(.5 * n / p, g);
        c.Hb(g, n, k);
        if (null === r)c.Db(g, n, e, this); else {
            var v = [];
            c.Db(g, n, function (b) {
                v.push(b)
            }, this);
            gb(v, r);
            Ta(v, e, this)
        }
        jo(s, d);
        this.r = n;
        this.t = h;
        this.p = r;
        this.j = g;
        this.c = s;
        return !0
    };
    function Ho() {
        this.b = 0;
        this.d = {};
        this.c = this.a = null
    }

    l = Ho.prototype;
    l.clear = function () {
        this.b = 0;
        this.d = {};
        this.c = this.a = null
    };
    function Eo(b, c) {
        return b.d.hasOwnProperty(c)
    }

    l.forEach = function (b, c) {
        for (var d = this.a; null !== d;)b.call(c, d.dc, d.ud, this), d = d.Za
    };
    l.get = function (b) {
        b = this.d[b];
        if (b === this.c)return b.dc;
        b === this.a ? (this.a = this.a.Za, this.a.Mb = null) : (b.Za.Mb = b.Mb, b.Mb.Za = b.Za);
        b.Za = null;
        b.Mb = this.c;
        this.c = this.c.Za = b;
        return b.dc
    };
    l.Ub = function () {
        return this.b
    };
    l.I = function () {
        var b = Array(this.b), c = 0, d;
        for (d = this.c; null !== d; d = d.Mb)b[c++] = d.ud;
        return b
    };
    l.kb = function () {
        var b = Array(this.b), c = 0, d;
        for (d = this.c; null !== d; d = d.Mb)b[c++] = d.dc;
        return b
    };
    l.pop = function () {
        var b = this.a;
        delete this.d[b.ud];
        null !== b.Za && (b.Za.Mb = null);
        this.a = b.Za;
        null === this.a && (this.c = null);
        --this.b;
        return b.dc
    };
    l.set = function (b, c) {
        var d = {ud: b, Za: null, Mb: this.c, dc: c};
        null === this.c ? this.a = d : this.c.Za = d;
        this.c = d;
        this.d[b] = d;
        ++this.b
    };
    function Io(b, c) {
        this.g = b;
        this.a = c;
        this.c = {};
        this.d = {};
        this.b = {};
        this.f = null;
        (this.e = Za(wa, "OES_element_index_uint")) && c.getExtension("OES_element_index_uint");
        z(this.g, "webglcontextlost", this.lk, !1, this);
        z(this.g, "webglcontextrestored", this.mk, !1, this)
    }

    function fo(b, c, d) {
        var e = b.a, f = d.a, g = ma(d);
        if (g in b.c)e.bindBuffer(c, b.c[g].buffer); else {
            var h = e.createBuffer();
            e.bindBuffer(c, h);
            var k;
            34962 == c ? k = new Float32Array(f) : 34963 == c && (k = b.e ? new Uint32Array(f) : new Uint16Array(f));
            e.bufferData(c, k, d.c);
            b.c[g] = {b: d, buffer: h}
        }
    }

    function co(b, c) {
        var d = b.a, e = ma(c), f = b.c[e];
        d.isContextLost() || d.deleteBuffer(f.buffer);
        delete b.c[e]
    }

    l = Io.prototype;
    l.M = function () {
        var b = this.a;
        b.isContextLost() || (ob(this.c, function (c) {
            b.deleteBuffer(c.buffer)
        }), ob(this.b, function (c) {
            b.deleteProgram(c)
        }), ob(this.d, function (c) {
            b.deleteShader(c)
        }))
    };
    l.kk = function () {
        return this.a
    };
    function Jo(b, c) {
        var d = ma(c);
        if (d in b.d)return b.d[d];
        var e = b.a, f = e.createShader(c.H());
        e.shaderSource(f, c.a);
        e.compileShader(f);
        return b.d[d] = f
    }

    function go(b, c, d) {
        var e = ma(c) + "/" + ma(d);
        if (e in b.b)return b.b[e];
        var f = b.a, g = f.createProgram();
        f.attachShader(g, Jo(b, c));
        f.attachShader(g, Jo(b, d));
        f.linkProgram(g);
        return b.b[e] = g
    }

    l.lk = function () {
        yb(this.c);
        yb(this.d);
        yb(this.b);
        this.f = null
    };
    l.mk = function () {
    };
    l.Gd = function (b) {
        if (b == this.f)return !1;
        this.a.useProgram(b);
        this.f = b;
        return !0
    };
    function Ko(b, c) {
        Yj.call(this, 0, c);
        this.a = If("CANVAS");
        this.a.style.width = "100%";
        this.a.style.height = "100%";
        this.a.className = "ol-unselectable";
        Mf(b, this.a, 0);
        this.p = 0;
        this.q = Tf();
        this.n = !0;
        this.d = Zf(this.a, {antialias: !0, depth: !1, bh: !0, preserveDrawingBuffer: !1, stencil: !0});
        this.f = new Io(this.a, this.d);
        z(this.a, "webglcontextlost", this.tj, !1, this);
        z(this.a, "webglcontextrestored", this.uj, !1, this);
        this.c = new Ho;
        this.j = null;
        this.i = new dk(sa(function (b) {
            var c = b[1];
            b = b[2];
            var f = c[0] - this.j[0], c = c[1] - this.j[1];
            return 65536 * Math.log(b) + Math.sqrt(f * f + c * c) / b
        }, this), function (b) {
            return b[0].mb()
        });
        this.r = sa(function () {
            if (!this.i.ia()) {
                hk(this.i);
                var b = ek(this.i);
                Fo(this, b[0], b[3], b[4])
            }
        }, this);
        this.o = 0;
        Lo(this)
    }

    u(Ko, Yj);
    function Fo(b, c, d, e) {
        var f = b.d, g = c.mb();
        if (Eo(b.c, g))b = b.c.get(g), f.bindTexture(3553, b.Qa), 9729 != b.nf && (f.texParameteri(3553, 10240, 9729), b.nf = 9729), 9729 != b.of && (f.texParameteri(3553, 10240, 9729), b.of = 9729); else {
            var h = f.createTexture();
            f.bindTexture(3553, h);
            if (0 < e) {
                var k = b.q.canvas, n = b.q;
                b.p != d ? (k.width = d, k.height = d, b.p = d) : n.clearRect(0, 0, d, d);
                n.drawImage(c.Na(), e, e, d, d, 0, 0, d, d);
                f.texImage2D(3553, 0, 6408, 6408, 5121, k)
            } else f.texImage2D(3553, 0, 6408, 6408, 5121, c.Na());
            f.texParameteri(3553, 10240, 9729);
            f.texParameteri(3553,
                10241, 9729);
            f.texParameteri(3553, 10242, 33071);
            f.texParameteri(3553, 10243, 33071);
            b.c.set(g, {Qa: h, nf: 9729, of: 9729})
        }
    }

    l = Ko.prototype;
    l.Yc = function (b) {
        return b instanceof J ? new xo(this, b) : b instanceof K ? new Do(this, b) : b instanceof L ? new Go(this, b) : null
    };
    function Mo(b, c, d) {
        var e = b.e;
        if (ld(e, c)) {
            var f = b.f, g = d.extent, h = d.size, k = d.viewState, n = d.pixelRatio, p = k.resolution, q = k.center, r = k.rotation, k = new mo(f, q, p, r, h, g, n), g = new ho(.5 * p / n, g);
            e.dispatchEvent(new yl(c, e, k, g, d, null, f));
            jo(g, f);
            g.ia() || lo(g, f, q, p, r, h, n, 1, 0, 1, 0, 1, {});
            io(g, f)();
            c = Va(sb(k.c), Number);
            gb(c);
            d = 0;
            for (e = c.length; d < e; ++d)for (f = k.c[c[d].toString()], h = 0, n = f.length; h < n; ++h)f[h](k);
            b.g = g
        }
    }

    l.M = function () {
        var b = this.d;
        b.isContextLost() || this.c.forEach(function (c) {
            null === c || b.deleteTexture(c.Qa)
        });
        tc(this.f);
        Ko.S.M.call(this)
    };
    l.$g = function (b, c) {
        for (var d = this.d, e; 1024 < this.c.Ub() - this.o;) {
            e = this.c.a.dc;
            if (null === e)if (+this.c.a.ud == c.index)break; else--this.o; else d.deleteTexture(e.Qa);
            this.c.pop()
        }
    };
    l.H = function () {
        return "webgl"
    };
    l.tj = function (b) {
        b.preventDefault();
        this.c.clear();
        this.o = 0;
        ob(this.b, function (b) {
            b.n()
        })
    };
    l.uj = function () {
        Lo(this);
        this.e.render()
    };
    function Lo(b) {
        b = b.d;
        b.activeTexture(33984);
        b.blendFuncSeparate(770, 771, 1, 771);
        b.disable(2884);
        b.disable(2929);
        b.disable(3089);
        b.disable(2960)
    }

    l.Ld = function (b) {
        var c = this.f, d = this.d;
        if (d.isContextLost())return !1;
        if (null === b)return this.n && (Sg(this.a, !1), this.n = !1), !1;
        this.j = b.focus;
        this.c.set((-b.index).toString(), null);
        ++this.o;
        var e = [], f = b.layerStatesArray, g = b.viewState.resolution, h, k, n, p;
        h = 0;
        for (k = f.length; h < k; ++h)p = f[h], p.visible && g >= p.minResolution && g < p.maxResolution && "ready" == p.gc && (n = bk(this, p.layer), n.re(b, p, c) && e.push(p));
        f = b.size[0] * b.pixelRatio;
        g = b.size[1] * b.pixelRatio;
        if (this.a.width != f || this.a.height != g)this.a.width = f, this.a.height =
            g;
        d.bindFramebuffer(36160, null);
        d.clearColor(0, 0, 0, 0);
        d.clear(16384);
        d.enable(3042);
        d.viewport(0, 0, this.a.width, this.a.height);
        Mo(this, "precompose", b);
        h = 0;
        for (k = e.length; h < k; ++h)p = e[h], n = bk(this, p.layer), n.xf(b, p, c);
        this.n || (Sg(this.a, !0), this.n = !0);
        Zj(b);
        1024 < this.c.Ub() - this.o && b.postRenderFunctions.push(sa(this.$g, this));
        this.i.ia() || (b.postRenderFunctions.push(this.r), b.animate = !0);
        Mo(this, "postcompose", b);
        ck(this, b);
        b.postRenderFunctions.push(ak)
    };
    var No = ["canvas", "webgl", "dom"];

    function O(b) {
        td.call(this);
        var c = Oo(b);
        this.Yd = m(b.pixelRatio) ? b.pixelRatio : ag;
        this.Xd = c.logos;
        this.q = new Vh(this.Yk, void 0, this);
        sc(this, this.q);
        this.Uc = Kd();
        this.Zd = Kd();
        this.Wd = 0;
        this.d = null;
        this.Ea = Vd();
        this.p = this.Q = null;
        this.b = Ff("DIV", "ol-viewport");
        this.b.style.position = "relative";
        this.b.style.overflow = "hidden";
        this.b.style.width = "100%";
        this.b.style.height = "100%";
        this.b.style.msTouchAction = "none";
        gg && (this.b.className = "ol-touch");
        this.Da = Ff("DIV", "ol-overlaycontainer");
        this.b.appendChild(this.Da);
        this.t = Ff("DIV", "ol-overlaycontainer-stopevent");
        z(this.t, ["click", "dblclick", "mousedown", "touchstart", "MSPointerDown", mj, Ib ? "DOMMouseScroll" : "mousewheel"], vc);
        this.b.appendChild(this.t);
        b = new ej(this);
        z(b, rb(pj), this.gf, !1, this);
        sc(this, b);
        this.ga = c.keyboardEventTarget;
        this.r = new ji;
        z(this.r, "key", this.ef, !1, this);
        sc(this, this.r);
        b = new ri(this.b);
        z(b, "mousewheel", this.ef, !1, this);
        sc(this, b);
        this.i = c.controls;
        this.Vc = c.deviceOptions;
        this.g = c.interactions;
        this.n = c.overlays;
        this.ba = new c.$k(this.b,
            this);
        sc(this, this.ba);
        this.gc = new ei;
        sc(this, this.gc);
        z(this.gc, "resize", this.j, !1, this);
        this.V = null;
        this.F = [];
        this.oa = [];
        this.Ab = new ik(sa(this.Jh, this), sa(this.ri, this));
        this.ca = {};
        z(this, xd("layergroup"), this.ai, !1, this);
        z(this, xd("view"), this.$i, !1, this);
        z(this, xd("size"), this.pi, !1, this);
        z(this, xd("target"), this.qi, !1, this);
        this.G(c.xl);
        this.i.forEach(function (b) {
            b.setMap(this)
        }, this);
        z(this.i, "add", function (b) {
            b.element.setMap(this)
        }, !1, this);
        z(this.i, "remove", function (b) {
                b.element.setMap(null)
            },
            !1, this);
        this.g.forEach(function (b) {
            b.setMap(this)
        }, this);
        z(this.g, "add", function (b) {
            b.element.setMap(this)
        }, !1, this);
        z(this.g, "remove", function (b) {
            b.element.setMap(null)
        }, !1, this);
        this.n.forEach(function (b) {
            b.setMap(this)
        }, this);
        z(this.n, "add", function (b) {
            b.element.setMap(this)
        }, !1, this);
        z(this.n, "remove", function (b) {
            b.element.setMap(null)
        }, !1, this)
    }

    u(O, td);
    l = O.prototype;
    l.Qg = function (b) {
        this.i.push(b)
    };
    l.Rg = function (b) {
        this.g.push(b)
    };
    l.Se = function (b) {
        this.Eb().Yb().push(b)
    };
    l.Te = function (b) {
        this.n.push(b)
    };
    l.Ua = function (b) {
        this.render();
        Array.prototype.push.apply(this.F, arguments)
    };
    l.M = function () {
        Nf(this.b);
        O.S.M.call(this)
    };
    l.oe = function (b, c, d, e, f) {
        if (null !== this.d) {
            b = this.Ga(b);
            a:{
                var g = this.ba, h = this.d;
                d = m(d) ? d : null;
                e = m(e) ? e : dd;
                f = m(f) ? f : null;
                var k, n = h.extent, p = h.viewState, q = p.resolution, p = p.rotation;
                if (null !== g.g && (k = Wm(g.g, n, q, p, b, {}))) {
                    c = k;
                    break a
                }
                n = g.e.Eb().Da();
                for (p = n.length - 1; 0 <= p; --p) {
                    k = n[p];
                    var r = k.layer;
                    if (k.visible && q >= k.minResolution && q < k.maxResolution && e.call(f, r) && (k = bk(g, r).Zb(b, h, c, d))) {
                        c = k;
                        break a
                    }
                }
                c = void 0
            }
            return c
        }
    };
    l.ih = function (b) {
        return this.Ga(this.ad(b))
    };
    l.ad = function (b) {
        if (m(b.offsetX) && m(b.offsetY))return [b.offsetX, b.offsetY];
        if (m(b.changedTouches)) {
            var c = b.changedTouches[0];
            b = Og(this.b);
            return [c.clientX - b.x, c.clientY - b.y]
        }
        c = this.b;
        b = Og(b);
        c = Og(c);
        c = new vf(b.x - c.x, b.y - c.y);
        return [c.x, c.y]
    };
    l.qc = function () {
        return this.get("target")
    };
    O.prototype.getTarget = O.prototype.qc;
    l = O.prototype;
    l.Fh = function () {
        var b = this.qc();
        return m(b) ? Af(b) : null
    };
    l.Ga = function (b) {
        var c = this.d;
        if (null === c)return null;
        b = b.slice();
        return Xj(c.pixelToCoordinateMatrix, b, b)
    };
    l.hh = function () {
        return this.i
    };
    l.Ah = function () {
        return this.n
    };
    l.oh = function () {
        return this.g
    };
    l.Eb = function () {
        return this.get("layergroup")
    };
    O.prototype.getLayerGroup = O.prototype.Eb;
    O.prototype.ea = function () {
        return this.Eb().Yb()
    };
    O.prototype.f = function (b) {
        var c = this.d;
        if (null === c)return null;
        b = b.slice(0, 2);
        return Xj(c.coordinateToPixelMatrix, b, b)
    };
    O.prototype.e = function () {
        return this.get("size")
    };
    O.prototype.getSize = O.prototype.e;
    O.prototype.a = function () {
        return this.get("view")
    };
    O.prototype.getView = O.prototype.a;
    l = O.prototype;
    l.Lh = function () {
        return this.b
    };
    l.Jh = function (b, c, d, e) {
        var f = this.d;
        if (!(null !== f && c in f.wantedTiles && f.wantedTiles[c][nf(b.a)]))return Infinity;
        b = d[0] - f.focus[0];
        d = d[1] - f.focus[1];
        return 65536 * Math.log(e) + Math.sqrt(b * b + d * d) / e
    };
    l.ef = function (b, c) {
        var d = new cj(c || b.type, this, b);
        this.gf(d)
    };
    l.gf = function (b) {
        if (null !== this.d) {
            this.V = b.coordinate;
            b.frameState = this.d;
            var c = this.g.a, d;
            if (!1 !== this.dispatchEvent(b))for (d = c.length - 1; 0 <= d; d--) {
                var e = c[d];
                if (e.a() && !e.handleEvent(b))break
            }
        }
    };
    l.ni = function () {
        var b = this.d, c = this.Ab;
        if (!c.ia()) {
            var d = 16, e = d, f = 0;
            if (null !== b) {
                var f = b.viewHints, g = this.Vc;
                f[0] && (d = !1 === g.loadTilesWhileAnimating ? 0 : 8, e = 2);
                f[1] && (d = !1 === g.loadTilesWhileInteracting ? 0 : 8, e = 2);
                f = qb(b.wantedTiles)
            }
            d *= f;
            e *= f;
            if (c.d < d) {
                hk(c);
                d = Math.min(d - c.d, e, c.Ub());
                for (e = 0; e < d; ++e)f = ek(c)[0], Wc(f, "change", c.g, !1, c), f.load();
                c.d += d
            }
        }
        c = this.oa;
        d = 0;
        for (e = c.length; d < e; ++d)c[d](this, b);
        c.length = 0
    };
    l.pi = function () {
        this.render()
    };
    l.qi = function () {
        var b = this.qc(), b = m(b) ? Af(b) : null;
        qi(this.r);
        null === b ? Nf(this.b) : (b.appendChild(this.b), ki(this.r, null === this.ga ? b : this.ga));
        this.j()
    };
    l.ri = function () {
        this.render()
    };
    l.si = function () {
        this.render()
    };
    l.$i = function () {
        null !== this.Q && (Yc(this.Q), this.Q = null);
        var b = this.a();
        null !== b && (this.Q = z(b, "propertychange", this.si, !1, this));
        this.render()
    };
    l.bi = function () {
        this.render()
    };
    l.ci = function () {
        this.render()
    };
    l.ai = function () {
        if (null !== this.p) {
            for (var b = this.p.length, c = 0; c < b; ++c)Yc(this.p[c]);
            this.p = null
        }
        b = this.Eb();
        null != b && (this.p = [z(b, "propertychange", this.ci, !1, this), z(b, "change", this.bi, !1, this)]);
        this.render()
    };
    l.Zk = function () {
        var b = this.q;
        Wh(b);
        b.Ye()
    };
    l.render = function () {
        null != this.q.X || this.q.start()
    };
    l.Uk = function (b) {
        if (m(this.i.remove(b)))return b
    };
    l.Vk = function (b) {
        var c;
        m(this.g.remove(b)) && (c = b);
        return c
    };
    l.Wk = function (b) {
        return this.Eb().Yb().remove(b)
    };
    l.Xk = function (b) {
        if (m(this.n.remove(b)))return b
    };
    l.Yk = function (b) {
        var c, d, e, f = this.e(), g = this.a(), h = null;
        if (m(f) && 0 < f[0] && 0 < f[1] && null !== g && af(g)) {
            var h = cb(g.j), k = this.Eb().Da(), n = {};
            c = 0;
            for (d = k.length; c < d; ++c)n[ma(k[c].layer)] = k[c];
            e = $e(g);
            h = {
                animate: !1,
                attributions: {},
                coordinateToPixelMatrix: this.Uc,
                extent: null,
                focus: null === this.V ? e.center : this.V,
                index: this.Wd++,
                layerStates: n,
                layerStatesArray: k,
                logos: Cb(this.Xd),
                pixelRatio: this.Yd,
                pixelToCoordinateMatrix: this.Zd,
                postRenderFunctions: [],
                size: f,
                skippedFeatureUids: this.ca,
                tileQueue: this.Ab,
                time: b,
                usedTiles: {},
                viewState: e,
                viewHints: h,
                wantedTiles: {}
            }
        }
        if (null !== h) {
            b = this.F;
            c = f = 0;
            for (d = b.length; c < d; ++c)g = b[c], g(this, h) && (b[f++] = g);
            b.length = f;
            h.extent = ne(e.center, e.resolution, e.rotation, h.size)
        }
        this.d = h;
        this.ba.Ld(h);
        null !== h && (h.animate && this.render(), Array.prototype.push.apply(this.oa, h.postRenderFunctions), 0 !== this.F.length || h.viewHints[0] || h.viewHints[1] || de(h.extent, this.Ea) || (this.dispatchEvent(new Zg("moveend", this, h)), c = h.extent, d = this.Ea, m(d) && (d[0] = c[0], d[1] = c[1], d[2] = c[2], d[3] = c[3])));
        this.dispatchEvent(new Zg("postrender", this, h));
        $h(this.ni, this)
    };
    l.cg = function (b) {
        this.set("layergroup", b)
    };
    O.prototype.setLayerGroup = O.prototype.cg;
    O.prototype.J = function (b) {
        this.set("size", b)
    };
    O.prototype.setSize = O.prototype.J;
    O.prototype.qa = function (b) {
        this.set("target", b)
    };
    O.prototype.setTarget = O.prototype.qa;
    O.prototype.Ta = function (b) {
        this.set("view", b)
    };
    O.prototype.setView = O.prototype.Ta;
    O.prototype.eb = function (b) {
        b = ma(b).toString();
        this.ca[b] = !0;
        this.render()
    };
    O.prototype.j = function () {
        var b = this.qc(), b = m(b) ? Af(b) : null;
        if (null === b)this.J(void 0); else {
            var c = zf(b), d = Hb && b.currentStyle;
            d && Rf(xf(c)) && "auto" != d.width && "auto" != d.height && !d.boxSizing ? (c = Tg(b, d.width, "width", "pixelWidth"), b = Tg(b, d.height, "height", "pixelHeight"), b = new wf(c, b)) : (d = new wf(b.offsetWidth, b.offsetHeight), c = Vg(b, "padding"), b = Yg(b), b = new wf(d.width - b.left - c.left - c.right - b.right, d.height - b.top - c.top - c.bottom - b.bottom));
            this.J([b.width, b.height])
        }
    };
    O.prototype.fc = function (b) {
        b = ma(b).toString();
        delete this.ca[b];
        this.render()
    };
    function Oo(b) {
        var c = null;
        m(b.keyboardEventTarget) && (c = ia(b.keyboardEventTarget) ? document.getElementById(b.keyboardEventTarget) : b.keyboardEventTarget);
        var d = {}, e = {};
        if (!m(b.logo) || "boolean" == typeof b.logo && b.logo)e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"] = "http://openlayers.org/";
        else {
            var f = b.logo;
            ia(f) ? e[f] = "" : la(f) && (e[f.src] = f.href)
        }
        f = b.layers instanceof I ? b.layers : new I({layers: b.layers});
        d.layergroup = f;
        d.target = b.target;
        d.view = m(b.view) ? b.view : new A;
        var f = Yj, g;
        m(b.renderer) ? ga(b.renderer) ? g = b.renderer : ia(b.renderer) && (g = [b.renderer]) : g = No;
        var h, k;
        h = 0;
        for (k = g.length; h < k; ++h) {
            var n = g[h];
            if ("canvas" == n) {
                if (dg) {
                    f = Dn;
                    break
                }
            } else if ("dom" == n) {
                f = Pn;
                break
            } else if ("webgl" == n && $f) {
                f = Ko;
                break
            }
        }
        var p;
        m(b.controls) ? p = ga(b.controls) ? new B(cb(b.controls)) : b.controls : p = gh();
        g = m(b.deviceOptions) ?
            b.deviceOptions : {};
        var q;
        m(b.interactions) ? q = ga(b.interactions) ? new B(cb(b.interactions)) : b.interactions : q = km();
        b = m(b.overlays) ? ga(b.overlays) ? new B(cb(b.overlays)) : b.overlays : new B;
        return {
            controls: p,
            deviceOptions: g,
            interactions: q,
            keyboardEventTarget: c,
            logos: e,
            overlays: b,
            $k: f,
            xl: d
        }
    }

    rm();
    function P(b) {
        td.call(this);
        this.q = m(b.insertFirst) ? b.insertFirst : !0;
        this.r = m(b.stopEvent) ? b.stopEvent : !0;
        this.aa = If("DIV");
        this.aa.style.position = "absolute";
        this.a = {Wc: "", vd: "", Md: "", Nd: "", visible: !0};
        this.b = null;
        z(this, xd("element"), this.Uh, !1, this);
        z(this, xd("map"), this.hi, !1, this);
        z(this, xd("offset"), this.ji, !1, this);
        z(this, xd("position"), this.li, !1, this);
        z(this, xd("positioning"), this.mi, !1, this);
        m(b.element) && this.Ee(b.element);
        this.j(m(b.offset) ? b.offset : [0, 0]);
        this.p(m(b.positioning) ? b.positioning :
            "top-left");
        m(b.position) && this.f(b.position)
    }

    u(P, td);
    P.prototype.d = function () {
        return this.get("element")
    };
    P.prototype.getElement = P.prototype.d;
    P.prototype.e = function () {
        return this.get("map")
    };
    P.prototype.getMap = P.prototype.e;
    P.prototype.g = function () {
        return this.get("offset")
    };
    P.prototype.getOffset = P.prototype.g;
    P.prototype.n = function () {
        return this.get("position")
    };
    P.prototype.getPosition = P.prototype.n;
    P.prototype.i = function () {
        return this.get("positioning")
    };
    P.prototype.getPositioning = P.prototype.i;
    l = P.prototype;
    l.Uh = function () {
        Kf(this.aa);
        var b = this.d();
        null != b && Jf(this.aa, b)
    };
    l.hi = function () {
        null !== this.b && (Nf(this.aa), Yc(this.b), this.b = null);
        var b = this.e();
        null != b && (this.b = z(b, "postrender", this.render, !1, this), Po(this), b = this.r ? b.t : b.Da, this.q ? Mf(b, this.aa, 0) : Jf(b, this.aa))
    };
    l.render = function () {
        Po(this)
    };
    l.ji = function () {
        Po(this)
    };
    l.li = function () {
        Po(this)
    };
    l.mi = function () {
        Po(this)
    };
    l.Ee = function (b) {
        this.set("element", b)
    };
    P.prototype.setElement = P.prototype.Ee;
    P.prototype.setMap = function (b) {
        this.set("map", b)
    };
    P.prototype.setMap = P.prototype.setMap;
    P.prototype.j = function (b) {
        this.set("offset", b)
    };
    P.prototype.setOffset = P.prototype.j;
    P.prototype.f = function (b) {
        this.set("position", b)
    };
    P.prototype.setPosition = P.prototype.f;
    P.prototype.p = function (b) {
        this.set("positioning", b)
    };
    P.prototype.setPositioning = P.prototype.p;
    function Po(b) {
        var c = b.e(), d = b.n();
        if (m(c) && null !== c.d && m(d)) {
            var d = c.f(d), e = c.e(), c = b.aa.style, f = b.g(), g = b.i(), h = f[0], f = f[1];
            if ("bottom-right" == g || "center-right" == g || "top-right" == g)"" !== b.a.vd && (b.a.vd = c.left = ""), h = Math.round(e[0] - d[0] - h) + "px", b.a.Md != h && (b.a.Md = c.right = h); else {
                "" !== b.a.Md && (b.a.Md = c.right = "");
                if ("bottom-center" == g || "center-center" == g || "top-center" == g)h -= Qg(b.aa).width / 2;
                h = Math.round(d[0] + h) + "px";
                b.a.vd != h && (b.a.vd = c.left = h)
            }
            if ("bottom-left" == g || "bottom-center" == g || "bottom-right" ==
                g)"" !== b.a.Nd && (b.a.Nd = c.top = ""), d = Math.round(e[1] - d[1] - f) + "px", b.a.Wc != d && (b.a.Wc = c.bottom = d); else {
                "" !== b.a.Wc && (b.a.Wc = c.bottom = "");
                if ("center-left" == g || "center-center" == g || "center-right" == g)f -= Qg(b.aa).height / 2;
                d = Math.round(d[1] + f) + "px";
                b.a.Nd != d && (b.a.Nd = c.top = d)
            }
            b.a.visible || (Sg(b.aa, !0), b.a.visible = !0)
        } else b.a.visible && (Sg(b.aa, !1), b.a.visible = !1)
    };
    function Qo(b) {
        b = m(b) ? b : {};
        this.e = m(b.collapsed) ? b.collapsed : !0;
        this.f = m(b.collapsible) ? b.collapsible : !0;
        this.f || (this.e = !1);
        var c = m(b.className) ? b.className : "ol-overviewmap", d = m(b.tipLabel) ? b.tipLabel : "Overview map";
        this.j = m(b.collapseLabel) ? b.collapseLabel : "\u00ab";
        this.q = m(b.label) ? b.label : "\u00bb";
        this.p = Ff("SPAN", {}, this.f && !this.e ? this.j : this.q);
        d = Ff("BUTTON", {type: "button", title: d}, this.p);
        z(d, "click", this.hj, !1, this);
        z(d, ["mouseout", xc], function () {
            this.blur()
        }, !1);
        var e = Ff("DIV", "ol-overviewmap-map"),
            f = this.b = new O({controls: new B, interactions: new B, target: e});
        m(b.layers) && b.layers.forEach(function (b) {
            f.Se(b)
        }, this);
        var g = Ff("DIV", "ol-overviewmap-box");
        this.g = new P({position: [0, 0], positioning: "bottom-left", element: g});
        this.b.Te(this.g);
        c = Ff("DIV", c + " ol-unselectable ol-control" + (this.e && this.f ? " ol-collapsed" : "") + (this.f ? "" : " ol-uncollapsible"), e, d);
        $g.call(this, {element: c, render: m(b.render) ? b.render : Ro, target: b.target})
    }

    u(Qo, $g);
    l = Qo.prototype;
    l.setMap = function (b) {
        var c = this.a;
        null === b && null !== c && Xc(c, xd("view"), this.uf, !1, this);
        Qo.S.setMap.call(this, b);
        null !== b && (0 === this.b.ea().Ib() && this.b.O("layergroup", b), So(this), z(b, xd("view"), this.uf, !1, this), this.b.j(), To(this))
    };
    function So(b) {
        var c = b.a.a();
        null === c || b.b.a().O("rotation", c)
    }

    function Ro() {
        var b = this.a, c = this.b;
        if (null !== b.d && null !== c.d) {
            var d = b.e(), b = b.a().g(d), e = c.e(), d = c.a().g(e), f = c.f(me(b)), c = c.f(ie(b)), c = new wf(Math.abs(f[0] - c[0]), Math.abs(f[1] - c[1])), f = e[0], e = e[1];
            c.width < .1 * f || c.height < .1 * e || c.width > .75 * f || c.height > .75 * e ? To(this) : $d(d, b) || (b = this.b, d = this.a.a(), b.a().Oa(d.a()))
        }
        Uo(this)
    }

    l.uf = function () {
        So(this)
    };
    function To(b) {
        var c = b.a;
        b = b.b;
        var d = c.e(), c = c.a().g(d), d = b.e();
        b = b.a();
        var e = Math.log(7.5) / Math.LN2;
        ue(c, 1 / (.1 * Math.pow(2, e / 2)));
        b.ge(c, d)
    }

    function Uo(b) {
        var c = b.a, d = b.b;
        if (null !== c.d && null !== d.d) {
            var e = c.e(), f = c.a(), g = d.a();
            d.e();
            var c = f.e(), h = b.g, d = b.g.d(), f = f.g(e), e = g.b(), g = he(f), f = je(f), k;
            b = b.a.a().a();
            m(b) && (k = [g[0] - b[0], g[1] - b[1]], Dd(k, c), yd(k, b));
            h.f(k);
            null != d && (k = new wf(Math.abs((g[0] - f[0]) / e), Math.abs((f[1] - g[1]) / e)), c = Rf(xf(zf(d))), !Hb || Tb("10") || c && Tb("8") ? (d = d.style, Ib ? d.MozBoxSizing = "border-box" : Jb ? d.WebkitBoxSizing = "border-box" : d.boxSizing = "border-box", d.width = Math.max(k.width, 0) + "px", d.height = Math.max(k.height, 0) + "px") :
                (b = d.style, c ? (c = Vg(d, "padding"), d = Yg(d), b.pixelWidth = k.width - d.left - c.left - c.right - d.right, b.pixelHeight = k.height - d.top - c.top - c.bottom - d.bottom) : (b.pixelWidth = k.width, b.pixelHeight = k.height)))
        }
    }

    l.hj = function (b) {
        b.preventDefault();
        Vo(this)
    };
    function Vo(b) {
        Eg(b.element, "ol-collapsed");
        Qf(b.p, b.e ? b.j : b.q);
        b.e = !b.e;
        var c = b.b;
        b.e || null !== c.d || (c.j(), To(b), Wc(c, "postrender", function () {
            Uo(this)
        }, !1, b))
    }

    l.gj = function () {
        return this.f
    };
    l.jj = function (b) {
        this.f !== b && (this.f = b, Eg(this.element, "ol-uncollapsible"), !b && this.e && Vo(this))
    };
    l.ij = function (b) {
        this.f && this.e !== b && Vo(this)
    };
    l.fj = function () {
        return this.e
    };
    function Wo(b) {
        b = m(b) ? b : {};
        var c = m(b.className) ? b.className : "ol-scale-line";
        this.f = Ff("DIV", c + "-inner");
        this.aa = Ff("DIV", c + " ol-unselectable", this.f);
        this.q = null;
        this.g = m(b.minWidth) ? b.minWidth : 64;
        this.b = !1;
        this.t = void 0;
        this.r = "";
        this.e = null;
        $g.call(this, {element: this.aa, render: m(b.render) ? b.render : Xo, target: b.target});
        z(this, xd("units"), this.F, !1, this);
        this.p(b.units || "metric")
    }

    u(Wo, $g);
    var Yo = [1, 2, 5];
    Wo.prototype.j = function () {
        return this.get("units")
    };
    Wo.prototype.getUnits = Wo.prototype.j;
    function Xo(b) {
        b = b.frameState;
        null === b ? this.q = null : this.q = b.viewState;
        Zo(this)
    }

    Wo.prototype.F = function () {
        Zo(this)
    };
    Wo.prototype.p = function (b) {
        this.set("units", b)
    };
    Wo.prototype.setUnits = Wo.prototype.p;
    function Zo(b) {
        var c = b.q;
        if (null === c)b.b && (Sg(b.aa, !1), b.b = !1); else {
            var d = c.center, e = c.projection, c = e.je(c.resolution, d), f = e.c, g = b.j();
            "degrees" != f || "metric" != g && "imperial" != g && "us" != g && "nautical" != g ? "ft" != f && "m" != f || "degrees" != g ? b.e = null : (null === b.e && (b.e = De(e, Ee("EPSG:4326"))), d = Math.cos(bc(b.e(d)[1])), e = ze.radius, "ft" == f && (e /= .3048), c *= 180 / (Math.PI * d * e)) : (b.e = null, d = Math.cos(bc(d[1])), c *= Math.PI * d * ze.radius / 180);
            d = b.g * c;
            f = "";
            "degrees" == g ? d < 1 / 60 ? (f = "\u2033", c *= 3600) : 1 > d ? (f = "\u2032", c *= 60) : f = "\u00b0" :
                "imperial" == g ? .9144 > d ? (f = "in", c /= .0254) : 1609.344 > d ? (f = "ft", c /= .3048) : (f = "mi", c /= 1609.344) : "nautical" == g ? (c /= 1852, f = "nm") : "metric" == g ? 1 > d ? (f = "mm", c *= 1E3) : 1E3 > d ? f = "m" : (f = "km", c /= 1E3) : "us" == g && (.9144 > d ? (f = "in", c *= 39.37) : 1609.344 > d ? (f = "ft", c /= .30480061) : (f = "mi", c /= 1609.3472));
            for (d = 3 * Math.floor(Math.log(b.g * c) / Math.log(10)); ;) {
                e = Yo[d % 3] * Math.pow(10, Math.floor(d / 3));
                g = Math.round(e / c);
                if (isNaN(g)) {
                    Sg(b.aa, !1);
                    b.b = !1;
                    return
                }
                if (g >= b.g)break;
                ++d
            }
            c = e + f;
            b.r != c && (b.f.innerHTML = c, b.r = c);
            b.t != g && (b.f.style.width =
                g + "px", b.t = g);
            b.b || (Sg(b.aa, !0), b.b = !0)
        }
    };
    function $o(b) {
        pc.call(this);
        this.c = b;
        this.a = {}
    }

    u($o, pc);
    var ap = [];
    $o.prototype.La = function (b, c, d, e) {
        ga(c) || (c && (ap[0] = c.toString()), c = ap);
        for (var f = 0; f < c.length; f++) {
            var g = z(b, c[f], d || this.handleEvent, e || !1, this.c || this);
            if (!g)break;
            this.a[g.key] = g
        }
        return this
    };
    $o.prototype.Fe = function (b, c, d, e, f) {
        if (ga(c))for (var g = 0; g < c.length; g++)this.Fe(b, c[g], d, e, f); else d = d || this.handleEvent, f = f || this.c || this, d = Qc(d), e = !!e, c = Ec(b) ? Lc(b.gb, String(c), d, e, f) : b ? (b = Sc(b)) ? Lc(b, c, d, e, f) : null : null, c && (Yc(c), delete this.a[c.key]);
        return this
    };
    function bp(b) {
        ob(b.a, Yc);
        b.a = {}
    }

    $o.prototype.M = function () {
        $o.S.M.call(this);
        bp(this)
    };
    $o.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    function cp(b, c, d) {
        jd.call(this);
        this.target = b;
        this.handle = c || b;
        this.a = d || new Gg(NaN, NaN, NaN, NaN);
        this.b = zf(b);
        this.c = new $o(this);
        sc(this, this.c);
        z(this.handle, ["touchstart", "mousedown"], this.df, !1, this)
    }

    u(cp, jd);
    var dp = Hb || Ib && Tb("1.9.3");
    l = cp.prototype;
    l.clientX = 0;
    l.clientY = 0;
    l.screenX = 0;
    l.screenY = 0;
    l.dg = 0;
    l.eg = 0;
    l.nc = 0;
    l.oc = 0;
    l.Rb = !1;
    l.M = function () {
        cp.S.M.call(this);
        Xc(this.handle, ["touchstart", "mousedown"], this.df, !1, this);
        bp(this.c);
        dp && this.b.releaseCapture();
        this.handle = this.target = null
    };
    l.df = function (b) {
        var c = "mousedown" == b.type;
        if (this.Rb || c && !Cc(b))this.dispatchEvent("earlycancel"); else if (ep(b), this.dispatchEvent(new fp("start", this, b.clientX, b.clientY))) {
            this.Rb = !0;
            b.preventDefault();
            var c = this.b, d = c.documentElement, e = !dp;
            this.c.La(c, ["touchmove", "mousemove"], this.ii, e);
            this.c.La(c, ["touchend", "mouseup"], this.od, e);
            dp ? (d.setCapture(!1), this.c.La(d, "losecapture", this.od)) : this.c.La(c ? c.parentWindow || c.defaultView : window, "blur", this.od);
            this.e && this.c.La(this.e, "scroll", this.sk,
                e);
            this.clientX = this.dg = b.clientX;
            this.clientY = this.eg = b.clientY;
            this.screenX = b.screenX;
            this.screenY = b.screenY;
            this.nc = this.target.offsetLeft;
            this.oc = this.target.offsetTop;
            this.d = Sf(xf(this.b));
            ua()
        }
    };
    l.od = function (b) {
        bp(this.c);
        dp && this.b.releaseCapture();
        if (this.Rb) {
            ep(b);
            this.Rb = !1;
            var c = gp(this, this.nc), d = hp(this, this.oc);
            this.dispatchEvent(new fp("end", this, b.clientX, b.clientY, 0, c, d))
        } else this.dispatchEvent("earlycancel")
    };
    function ep(b) {
        var c = b.type;
        "touchstart" == c || "touchmove" == c ? Ac(b, b.a.targetTouches[0], b.b) : "touchend" != c && "touchcancel" != c || Ac(b, b.a.changedTouches[0], b.b)
    }

    l.ii = function (b) {
        ep(b);
        var c = 1 * (b.clientX - this.clientX), d = b.clientY - this.clientY;
        this.clientX = b.clientX;
        this.clientY = b.clientY;
        this.screenX = b.screenX;
        this.screenY = b.screenY;
        if (!this.Rb) {
            var e = this.dg - this.clientX, f = this.eg - this.clientY;
            if (0 < e * e + f * f)if (this.dispatchEvent(new fp("start", this, b.clientX, b.clientY)))this.Rb = !0; else {
                this.Sa || this.od(b);
                return
            }
        }
        d = ip(this, c, d);
        c = d.x;
        d = d.y;
        this.Rb && this.dispatchEvent(new fp("beforedrag", this, b.clientX, b.clientY, 0, c, d)) && (jp(this, b, c, d), b.preventDefault())
    };
    function ip(b, c, d) {
        var e = Sf(xf(b.b));
        c += e.x - b.d.x;
        d += e.y - b.d.y;
        b.d = e;
        b.nc += c;
        b.oc += d;
        c = gp(b, b.nc);
        b = hp(b, b.oc);
        return new vf(c, b)
    }

    l.sk = function (b) {
        var c = ip(this, 0, 0);
        b.clientX = this.clientX;
        b.clientY = this.clientY;
        jp(this, b, c.x, c.y)
    };
    function jp(b, c, d, e) {
        b.target.style.left = d + "px";
        b.target.style.top = e + "px";
        b.dispatchEvent(new fp("drag", b, c.clientX, c.clientY, 0, d, e))
    }

    function gp(b, c) {
        var d = b.a, e = isNaN(d.left) ? null : d.left, d = isNaN(d.width) ? 0 : d.width;
        return Math.min(null != e ? e + d : Infinity, Math.max(null != e ? e : -Infinity, c))
    }

    function hp(b, c) {
        var d = b.a, e = isNaN(d.top) ? null : d.top, d = isNaN(d.height) ? 0 : d.height;
        return Math.min(null != e ? e + d : Infinity, Math.max(null != e ? e : -Infinity, c))
    }

    function fp(b, c, d, e, f, g, h) {
        uc.call(this, b);
        this.clientX = d;
        this.clientY = e;
        this.left = m(g) ? g : c.nc;
        this.top = m(h) ? h : c.oc
    }

    u(fp, uc);
    function kp(b) {
        b = m(b) ? b : {};
        this.e = void 0;
        this.f = lp;
        this.g = null;
        this.j = !1;
        var c = m(b.className) ? b.className : "ol-zoomslider", d = Ff("DIV", [c + "-thumb", "ol-unselectable"]), c = Ff("DIV", [c, "ol-unselectable", "ol-control"], d);
        this.b = new cp(d);
        sc(this, this.b);
        z(this.b, "start", this.Th, !1, this);
        z(this.b, "drag", this.Rh, !1, this);
        z(this.b, "end", this.Sh, !1, this);
        z(c, "click", this.Qh, !1, this);
        z(d, "click", vc);
        $g.call(this, {element: c, render: m(b.render) ? b.render : mp})
    }

    u(kp, $g);
    var lp = 0;
    l = kp.prototype;
    l.setMap = function (b) {
        kp.S.setMap.call(this, b);
        null === b || b.render()
    };
    function mp(b) {
        if (null !== b.frameState) {
            if (!this.j) {
                var c = this.element, d = Qg(c), e = Of(c), c = Vg(e, "margin"), f = new wf(e.offsetWidth, e.offsetHeight), e = f.width + c.right + c.left, c = f.height + c.top + c.bottom;
                this.g = [e, c];
                e = d.width - e;
                c = d.height - c;
                d.width > d.height ? (this.f = 1, d = new Gg(0, 0, e, 0)) : (this.f = lp, d = new Gg(0, 0, 0, c));
                this.b.a = d || new Gg(NaN, NaN, NaN, NaN);
                this.j = !0
            }
            b = b.frameState.viewState.resolution;
            b !== this.e && (this.e = b, b = 1 - Ze(this.a.a())(b), d = this.b, c = Of(this.element), 1 == this.f ? Kg(c, d.a.left + d.a.width * b) : Kg(c,
                d.a.left, d.a.top + d.a.height * b))
        }
    }

    l.Qh = function (b) {
        var c = this.a, d = c.a(), e = d.b();
        c.Ua(jf({resolution: e, duration: 200, easing: cf}));
        b = np(this, b.offsetX - this.g[0] / 2, b.offsetY - this.g[1] / 2);
        b = op(this, b);
        d.d(d.constrainResolution(b))
    };
    l.Th = function () {
        bf(this.a.a(), 1)
    };
    l.Rh = function (b) {
        b = np(this, b.left, b.top);
        this.e = op(this, b);
        this.a.a().d(this.e)
    };
    l.Sh = function () {
        var b = this.a, c = b.a();
        bf(c, -1);
        b.Ua(jf({resolution: this.e, duration: 200, easing: cf}));
        b = c.constrainResolution(this.e);
        c.d(b)
    };
    function np(b, c, d) {
        var e = b.b.a;
        return Yb(1 === b.f ? (c - e.left) / e.width : (d - e.top) / e.height, 0, 1)
    }

    function op(b, c) {
        return Ye(b.a.a())(1 - c)
    };
    function pp(b) {
        b = m(b) ? b : {};
        this.b = m(b.extent) ? b.extent : null;
        var c = m(b.className) ? b.className : "ol-zoom-extent", d = Ff("BUTTON", {
            type: "button",
            title: m(b.tipLabel) ? b.tipLabel : "Fit to extent"
        });
        z(d, "click", this.e, !1, this);
        z(d, ["mouseout", xc], function () {
            this.blur()
        }, !1);
        c = Ff("DIV", c + " ol-unselectable ol-control", d);
        $g.call(this, {element: c, target: b.target})
    }

    u(pp, $g);
    pp.prototype.e = function (b) {
        b.preventDefault();
        var c = this.a;
        b = c.a();
        var d = null === this.b ? b.q.D() : this.b, c = c.e();
        b.ge(d, c)
    };
    function Q(b) {
        td.call(this);
        b = m(b) ? b : {};
        this.a = null;
        z(this, xd("tracking"), this.n, !1, this);
        this.b(m(b.tracking) ? b.tracking : !1)
    }

    u(Q, td);
    Q.prototype.M = function () {
        this.b(!1);
        Q.S.M.call(this)
    };
    Q.prototype.j = function (b) {
        b = b.a;
        if (null != b.alpha) {
            var c = bc(b.alpha);
            this.set("alpha", c);
            "boolean" == typeof b.absolute && b.absolute ? this.set("heading", c) : null != b.webkitCompassHeading && null != b.webkitCompassAccuracy && -1 != b.webkitCompassAccuracy && this.set("heading", bc(b.webkitCompassHeading))
        }
        null != b.beta && this.set("beta", bc(b.beta));
        null != b.gamma && this.set("gamma", bc(b.gamma));
        this.l()
    };
    Q.prototype.e = function () {
        return this.get("alpha")
    };
    Q.prototype.getAlpha = Q.prototype.e;
    Q.prototype.f = function () {
        return this.get("beta")
    };
    Q.prototype.getBeta = Q.prototype.f;
    Q.prototype.g = function () {
        return this.get("gamma")
    };
    Q.prototype.getGamma = Q.prototype.g;
    Q.prototype.i = function () {
        return this.get("heading")
    };
    Q.prototype.getHeading = Q.prototype.i;
    Q.prototype.d = function () {
        return this.get("tracking")
    };
    Q.prototype.getTracking = Q.prototype.d;
    Q.prototype.n = function () {
        if (eg) {
            var b = this.d();
            b && null === this.a ? this.a = z(ba, "deviceorientation", this.j, !1, this) : b || null === this.a || (Yc(this.a), this.a = null)
        }
    };
    Q.prototype.b = function (b) {
        this.set("tracking", b)
    };
    Q.prototype.setTracking = Q.prototype.b;
    function qp(b) {
        td.call(this);
        this.i = b;
        z(this.i, ["change", "input"], this.g, !1, this);
        z(this, xd("value"), this.n, !1, this);
        z(this, xd("checked"), this.f, !1, this)
    }

    u(qp, td);
    qp.prototype.a = function () {
        return this.get("checked")
    };
    qp.prototype.getChecked = qp.prototype.a;
    qp.prototype.b = function () {
        return this.get("value")
    };
    qp.prototype.getValue = qp.prototype.b;
    qp.prototype.e = function (b) {
        this.set("value", b)
    };
    qp.prototype.setValue = qp.prototype.e;
    qp.prototype.d = function (b) {
        this.set("checked", b)
    };
    qp.prototype.setChecked = qp.prototype.d;
    qp.prototype.g = function () {
        var b = this.i;
        "checkbox" === b.type || "radio" === b.type ? this.d(b.checked) : this.e(b.value)
    };
    qp.prototype.f = function () {
        this.i.checked = this.a()
    };
    qp.prototype.n = function () {
        this.i.value = this.b()
    };
    function R(b) {
        td.call(this);
        this.X = void 0;
        this.b = "geometry";
        this.g = null;
        this.a = void 0;
        this.f = null;
        z(this, xd(this.b), this.pd, !1, this);
        m(b) && (b instanceof Kk || null === b ? this.Ma(b) : this.G(b))
    }

    u(R, td);
    R.prototype.clone = function () {
        var b = new R(this.L());
        b.e(this.b);
        var c = this.N();
        null != c && b.Ma(c.clone());
        c = this.g;
        null === c || b.i(c);
        return b
    };
    R.prototype.N = function () {
        return this.get(this.b)
    };
    R.prototype.getGeometry = R.prototype.N;
    l = R.prototype;
    l.nh = function () {
        return this.X
    };
    l.mh = function () {
        return this.b
    };
    l.Si = function () {
        return this.g
    };
    l.Ti = function () {
        return this.a
    };
    l.$h = function () {
        this.l()
    };
    l.pd = function () {
        null !== this.f && (Yc(this.f), this.f = null);
        var b = this.N();
        null != b && (this.f = z(b, "change", this.$h, !1, this), this.l())
    };
    l.Ma = function (b) {
        this.set(this.b, b)
    };
    R.prototype.setGeometry = R.prototype.Ma;
    R.prototype.i = function (b) {
        this.g = b;
        null === b ? b = void 0 : ka(b) || (b = ga(b) ? b : [b], b = bd(b));
        this.a = b;
        this.l()
    };
    R.prototype.d = function (b) {
        this.X = b;
        this.l()
    };
    R.prototype.e = function (b) {
        Xc(this, xd(this.b), this.pd, !1, this);
        this.b = b;
        z(this, xd(this.b), this.pd, !1, this);
        this.pd()
    };
    function rp(b) {
        b = m(b) ? b : {};
        this.g = this.d = this.e = this.c = this.b = this.a = null;
        this.f = void 0;
        this.tf(m(b.style) ? b.style : Ul);
        m(b.features) ? ga(b.features) ? this.Mc(new B(cb(b.features))) : this.Mc(b.features) : this.Mc(new B);
        m(b.map) && this.setMap(b.map)
    }

    l = rp.prototype;
    l.rf = function (b) {
        this.a.push(b)
    };
    l.Ni = function () {
        return this.a
    };
    l.sf = function () {
        sp(this)
    };
    l.Yh = function (b) {
        b = b.element;
        this.c[ma(b).toString()] = z(b, "change", this.sf, !1, this);
        sp(this)
    };
    l.Zh = function (b) {
        b = ma(b.element).toString();
        Yc(this.c[b]);
        delete this.c[b];
        sp(this)
    };
    l.Qi = function () {
        sp(this)
    };
    l.Ri = function (b) {
        if (null !== this.a) {
            var c = this.f;
            m(c) || (c = Ul);
            var d = b.a;
            b = b.frameState;
            var e = b.viewState.resolution, f = yn(e, b.pixelRatio), g, h, k, n;
            this.a.forEach(function (b) {
                n = b.a;
                k = m(n) ? n.call(b, e) : c(b, e);
                if (null != k)for (h = k.length, g = 0; g < h; ++g)zn(d, b, k[g], f, this.Qi, this)
            }, this)
        }
    };
    l.wd = function (b) {
        this.a.remove(b)
    };
    function sp(b) {
        null === b.e || b.e.render()
    }

    l.Mc = function (b) {
        null !== this.b && (Ta(this.b, Yc), this.b = null);
        null !== this.c && (Ta(rb(this.c), Yc), this.c = null);
        this.a = b;
        null !== b && (this.b = [z(b, "add", this.Yh, !1, this), z(b, "remove", this.Zh, !1, this)], this.c = {}, b.forEach(function (b) {
            this.c[ma(b).toString()] = z(b, "change", this.sf, !1, this)
        }, this));
        sp(this)
    };
    l.setMap = function (b) {
        null !== this.d && (Yc(this.d), this.d = null);
        sp(this);
        this.e = b;
        null !== b && (this.d = z(b, "postcompose", this.Ri, !1, this), b.render())
    };
    l.tf = function (b) {
        this.g = b;
        this.f = Tl(b);
        sp(this)
    };
    l.Oi = function () {
        return this.g
    };
    l.Pi = function () {
        return this.f
    };
    function tp() {
        this.defaultDataProjection = null
    }

    function up(b, c, d) {
        var e;
        m(d) && (e = {
            dataProjection: m(d.dataProjection) ? d.dataProjection : b.Ba(c),
            featureProjection: d.featureProjection
        });
        return vp(b, e)
    }

    function vp(b, c) {
        var d;
        m(c) && (d = {
            featureProjection: c.featureProjection,
            dataProjection: null != c.dataProjection ? c.dataProjection : b.defaultDataProjection
        });
        return d
    }

    function wp(b, c, d) {
        var e = m(d) ? Ee(d.featureProjection) : null;
        d = m(d) ? Ee(d.dataProjection) : null;
        return null === e || null === d || Ue(e, d) ? b : b instanceof Kk ? (c ? b.clone() : b).e(c ? e : d, c ? d : e) : Xe(c ? cb(b) : b, c ? e : d, c ? d : e)
    };
    var xp = ba.JSON.parse, yp = ba.JSON.stringify;

    function zp() {
        this.defaultDataProjection = null
    }

    u(zp, tp);
    function Ap(b) {
        return la(b) ? b : ia(b) ? (b = xp(b), m(b) ? b : null) : null
    }

    l = zp.prototype;
    l.H = function () {
        return "json"
    };
    l.Nb = function (b, c) {
        return Bp(this, Ap(b), up(this, b, c))
    };
    l.ja = function (b, c) {
        return this.b(Ap(b), up(this, b, c))
    };
    l.Jc = function (b, c) {
        var d = Ap(b), e = up(this, b, c);
        return Cp(d, e)
    };
    l.Ba = function (b) {
        b = Ap(b).crs;
        return null != b ? "name" == b.type ? Ee(b.properties.name) : "EPSG" == b.type ? Ee("EPSG:" + b.properties.code) : null : this.defaultDataProjection
    };
    l.Pd = function (b, c) {
        return yp(this.a(b, c))
    };
    l.Qb = function (b, c) {
        return yp(this.d(b, c))
    };
    l.Qc = function (b, c) {
        return yp(this.e(b, c))
    };
    function Dp(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee(null != b.defaultDataProjection ? b.defaultDataProjection : "EPSG:4326");
        this.c = b.geometryName
    }

    u(Dp, zp);
    function Cp(b, c) {
        return null === b ? null : wp((0, Ep[b.type])(b), !1, c)
    }

    var Ep = {
        Point: function (b) {
            return new hl(b.coordinates)
        }, LineString: function (b) {
            return new M(b.coordinates)
        }, Polygon: function (b) {
            return new H(b.coordinates)
        }, MultiPoint: function (b) {
            return new tn(b.coordinates)
        }, MultiLineString: function (b) {
            return new qn(b.coordinates)
        }, MultiPolygon: function (b) {
            return new un(b.coordinates)
        }, GeometryCollection: function (b, c) {
            var d = Va(b.geometries, function (b) {
                return Cp(b, c)
            });
            return new hn(d)
        }
    }, Fp = {
        Point: function (b) {
            return {type: "Point", coordinates: b.K()}
        }, LineString: function (b) {
            return {
                type: "LineString",
                coordinates: b.K()
            }
        }, Polygon: function (b) {
            return {type: "Polygon", coordinates: b.K()}
        }, MultiPoint: function (b) {
            return {type: "MultiPoint", coordinates: b.K()}
        }, MultiLineString: function (b) {
            return {type: "MultiLineString", coordinates: b.K()}
        }, MultiPolygon: function (b) {
            return {type: "MultiPolygon", coordinates: b.K()}
        }, GeometryCollection: function (b, c) {
            return {
                type: "GeometryCollection", geometries: Va(b.d, function (b) {
                    return (0, Fp[b.H()])(wp(b, !0, c))
                })
            }
        }, Circle: function () {
            return {type: "GeometryCollection", geometries: []}
        }
    };

    function Bp(b, c, d) {
        d = Cp(c.geometry, d);
        var e = new R;
        m(b.c) && e.e(b.c);
        e.Ma(d);
        m(c.id) && e.d(c.id);
        m(c.properties) && e.G(c.properties);
        return e
    }

    Dp.prototype.b = function (b, c) {
        if ("Feature" == b.type)return [Bp(this, b, c)];
        if ("FeatureCollection" == b.type) {
            var d = [], e = b.features, f, g;
            f = 0;
            for (g = e.length; f < g; ++f)d.push(Bp(this, e[f], c));
            return d
        }
        return []
    };
    Dp.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = {type: "Feature"}, e = b.X;
        null != e && (d.id = e);
        e = b.N();
        null != e && (e = (0, Fp[e.H()])(wp(e, !0, c)), d.geometry = e);
        e = b.L();
        zb(e, b.b);
        xb(e) || (d.properties = e);
        return d
    };
    Dp.prototype.d = function (b, c) {
        c = vp(this, c);
        var d = [], e, f;
        e = 0;
        for (f = b.length; e < f; ++e)d.push(this.a(b[e], c));
        return {type: "FeatureCollection", features: d}
    };
    Dp.prototype.e = function (b, c) {
        return (0, Fp[b.H()])(wp(b, !0, vp(this, c)))
    };
    function Gp(b) {
        if ("undefined" != typeof XMLSerializer)return (new XMLSerializer).serializeToString(b);
        if (b = b.xml)return b;
        throw Error("Your browser does not support serializing XML documents");
    };
    var Hp;
    a:if (document.implementation && document.implementation.createDocument)Hp = document.implementation.createDocument("", "", null); else {
        if ("undefined" != typeof ActiveXObject) {
            var Ip = new ActiveXObject("MSXML2.DOMDocument");
            if (Ip) {
                Ip.resolveExternals = !1;
                Ip.validateOnParse = !1;
                try {
                    Ip.setProperty("ProhibitDTD", !0), Ip.setProperty("MaxXMLSize", 2048), Ip.setProperty("MaxElementDepth", 256)
                } catch (Jp) {
                }
            }
            if (Ip) {
                Hp = Ip;
                break a
            }
        }
        throw Error("Your browser does not support creating new documents");
    }
    var Kp = Hp;

    function Lp(b, c) {
        return Kp.createElementNS(b, c)
    }

    function Mp(b, c) {
        null === b && (b = "");
        return Kp.createNode(1, c, b)
    }

    var Np = document.implementation && document.implementation.createDocument ? Lp : Mp;

    function Op(b, c) {
        return Pp(b, c, []).join("")
    }

    function Pp(b, c, d) {
        if (4 == b.nodeType || 3 == b.nodeType)c ? d.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : d.push(b.nodeValue); else for (b = b.firstChild; null !== b; b = b.nextSibling)Pp(b, c, d);
        return d
    }

    function Qp(b) {
        return b.localName
    }

    function Rp(b) {
        var c = b.localName;
        return m(c) ? c : b.baseName
    }

    var Sp = Hb ? Rp : Qp;

    function Tp(b) {
        return b instanceof Document
    }

    function Up(b) {
        return la(b) && 9 == b.nodeType
    }

    var Vp = Hb ? Up : Tp;

    function Wp(b) {
        return b instanceof Node
    }

    function Xp(b) {
        return la(b) && m(b.nodeType)
    }

    var Yp = Hb ? Xp : Wp;

    function Zp(b, c, d) {
        return b.getAttributeNS(c, d) || ""
    }

    function $p(b, c, d) {
        var e = "";
        b = aq(b, c, d);
        m(b) && (e = b.nodeValue);
        return e
    }

    var bq = document.implementation && document.implementation.createDocument ? Zp : $p;

    function cq(b, c, d) {
        return b.getAttributeNodeNS(c, d)
    }

    function dq(b, c, d) {
        var e = null;
        b = b.attributes;
        for (var f, g, h = 0, k = b.length; h < k; ++h)if (f = b[h], f.namespaceURI == c && (g = f.prefix ? f.prefix + ":" + d : d, g == f.nodeName)) {
            e = f;
            break
        }
        return e
    }

    var aq = document.implementation && document.implementation.createDocument ? cq : dq;

    function eq(b, c, d, e) {
        b.setAttributeNS(c, d, e)
    }

    function fq(b, c, d, e) {
        null === c ? b.setAttribute(d, e) : (c = b.ownerDocument.createNode(2, d, c), c.nodeValue = e, b.setAttributeNode(c))
    }

    var gq = document.implementation && document.implementation.createDocument ? eq : fq;

    function hq(b) {
        return (new DOMParser).parseFromString(b, "application/xml")
    }

    function iq(b, c) {
        return function (d, e) {
            var f = b.call(c, d, e);
            m(f) && db(e[e.length - 1], f)
        }
    }

    function jq(b, c) {
        return function (d, e) {
            var f = b.call(m(c) ? c : this, d, e);
            m(f) && e[e.length - 1].push(f)
        }
    }

    function kq(b, c) {
        return function (d, e) {
            var f = b.call(m(c) ? c : this, d, e);
            m(f) && (e[e.length - 1] = f)
        }
    }

    function lq(b) {
        return function (c, d) {
            var e = b.call(m(void 0) ? void 0 : this, c, d);
            m(e) && Bb(d[d.length - 1], m(void 0) ? void 0 : c.localName).push(e)
        }
    }

    function S(b, c) {
        return function (d, e) {
            var f = b.call(m(void 0) ? void 0 : this, d, e);
            m(f) && (e[e.length - 1][m(c) ? c : d.localName] = f)
        }
    }

    function mq(b, c, d) {
        return nq(b, c, d)
    }

    function V(b, c) {
        return function (d, e, f) {
            b.call(m(c) ? c : this, d, e, f);
            f[f.length - 1].node.appendChild(d)
        }
    }

    function oq(b) {
        var c, d;
        return function (e, f, g) {
            if (!m(c)) {
                c = {};
                var h = {};
                h[e.localName] = b;
                c[e.namespaceURI] = h;
                d = pq(e.localName)
            }
            qq(c, d, f, g)
        }
    }

    function pq(b, c) {
        return function (d, e, f) {
            d = e[e.length - 1].node;
            e = b;
            m(e) || (e = f);
            f = c;
            m(c) || (f = d.namespaceURI);
            return Np(f, e)
        }
    }

    var rq = pq();

    function sq(b, c) {
        for (var d = c.length, e = Array(d), f = 0; f < d; ++f)e[f] = b[c[f]];
        return e
    }

    function nq(b, c, d) {
        d = m(d) ? d : {};
        var e, f;
        e = 0;
        for (f = b.length; e < f; ++e)d[b[e]] = c;
        return d
    }

    function tq(b, c, d, e) {
        for (c = c.firstElementChild; null !== c; c = c.nextElementSibling) {
            var f = b[c.namespaceURI];
            m(f) && (f = f[c.localName], m(f) && f.call(e, c, d))
        }
    }

    function W(b, c, d, e, f) {
        e.push(b);
        tq(c, d, e, f);
        return e.pop()
    }

    function qq(b, c, d, e, f, g) {
        for (var h = (m(f) ? f : d).length, k, n, p = 0; p < h; ++p)k = d[p], m(k) && (n = c.call(g, k, e, m(f) ? f[p] : void 0), m(n) && b[n.namespaceURI][n.localName].call(g, n, k, e))
    }

    function uq(b, c, d, e, f, g, h) {
        f.push(b);
        qq(c, d, e, f, g, h);
        f.pop()
    };
    function vq() {
        this.defaultDataProjection = null
    }

    u(vq, tp);
    l = vq.prototype;
    l.H = function () {
        return "xml"
    };
    l.Nb = function (b, c) {
        if (Vp(b))return wq(this, b, c);
        if (Yp(b))return this.Pf(b, c);
        if (ia(b)) {
            var d = hq(b);
            return wq(this, d, c)
        }
        return null
    };
    function wq(b, c, d) {
        b = xq(b, c, d);
        return 0 < b.length ? b[0] : null
    }

    l.ja = function (b, c) {
        if (Vp(b))return xq(this, b, c);
        if (Yp(b))return this.Ob(b, c);
        if (ia(b)) {
            var d = hq(b);
            return xq(this, d, c)
        }
        return []
    };
    function xq(b, c, d) {
        var e = [];
        for (c = c.firstChild; null !== c; c = c.nextSibling)1 == c.nodeType && db(e, b.Ob(c, d));
        return e
    }

    l.Jc = function (b, c) {
        if (Vp(b))return this.i(b, c);
        if (Yp(b)) {
            var d = this.Id(b, [up(this, b, m(c) ? c : {})]);
            return m(d) ? d : null
        }
        return ia(b) ? (d = hq(b), this.i(d, c)) : null
    };
    l.Ba = function (b) {
        return Vp(b) ? this.Lc(b) : Yp(b) ? this.tc(b) : ia(b) ? (b = hq(b), this.Lc(b)) : null
    };
    l.Pd = function (b, c) {
        var d = this.p(b, c);
        return Gp(d)
    };
    l.Qb = function (b, c) {
        var d = this.a(b, c);
        return Gp(d)
    };
    l.Qc = function (b, c) {
        var d = this.o(b, c);
        return Gp(d)
    };
    function yq(b) {
        b = m(b) ? b : {};
        this.featureType = b.featureType;
        this.featureNS = b.featureNS;
        this.srsName = b.srsName;
        this.schemaLocation = "";
        this.defaultDataProjection = null
    }

    u(yq, vq);
    l = yq.prototype;
    l.pe = function (b, c) {
        var d = Sp(b), e;
        if ("FeatureCollection" == d)e = W(null, this.Td, b, c, this); else if ("featureMembers" == d || "featureMember" == d) {
            e = c[0];
            var f = x(e, "featureType");
            if (!m(f) && null !== b.firstElementChild) {
                var g = b.firstElementChild, f = g.nodeName.split(":").pop();
                e.featureType = f;
                e.featureNS = g.namespaceURI
            }
            var g = {}, h = {};
            g[f] = "featureMembers" == d ? jq(this.ye, this) : kq(this.ye, this);
            h[x(e, "featureNS")] = g;
            e = W([], h, b, c)
        }
        m(e) || (e = []);
        return e
    };
    l.Td = Object({
        "http://www.opengis.net/gml": {
            featureMember: jq(yq.prototype.pe),
            featureMembers: kq(yq.prototype.pe)
        }
    });
    l.Id = function (b, c) {
        var d = c[0], e = b.firstElementChild.getAttribute("srsName");
        d.srsName = e;
        e = W(null, this.Le, b, c, this);
        if (null != e)return wp(e, !1, d)
    };
    l.ye = function (b, c) {
        var d, e = b.getAttribute("fid") || bq(b, "http://www.opengis.net/gml", "id"), f = {}, g;
        for (d = b.firstElementChild; null !== d; d = d.nextElementSibling) {
            var h = Sp(d);
            if (0 === d.childNodes.length || 1 === d.childNodes.length && 3 === d.firstChild.nodeType) {
                var k = Op(d, !1);
                /^[\s\xa0]*$/.test(k) && (k = void 0);
                f[h] = k
            } else"boundedBy" !== h && (g = h), f[h] = this.Id(d, c)
        }
        d = new R(f);
        m(g) && d.e(g);
        e && d.d(e);
        return d
    };
    l.Vf = function (b, c) {
        var d = this.Hd(b, c);
        if (null != d) {
            var e = new hl(null);
            il(e, "XYZ", d);
            return e
        }
    };
    l.Tf = function (b, c) {
        var d = W([], this.yg, b, c, this);
        if (m(d))return new tn(d)
    };
    l.Sf = function (b, c) {
        var d = W([], this.xg, b, c, this);
        if (m(d)) {
            var e = new qn(null);
            sn(e, d);
            return e
        }
    };
    l.Uf = function (b, c) {
        var d = W([], this.zg, b, c, this);
        if (m(d)) {
            var e = new un(null);
            wn(e, d);
            return e
        }
    };
    l.Kf = function (b, c) {
        tq(this.Cg, b, c, this)
    };
    l.mf = function (b, c) {
        tq(this.vg, b, c, this)
    };
    l.Lf = function (b, c) {
        tq(this.Dg, b, c, this)
    };
    l.Jd = function (b, c) {
        var d = this.Hd(b, c);
        if (null != d) {
            var e = new M(null);
            pn(e, "XYZ", d);
            return e
        }
    };
    l.Ik = function (b, c) {
        var d = W(null, this.Sc, b, c, this);
        if (null != d)return d
    };
    l.Rf = function (b, c) {
        var d = this.Hd(b, c);
        if (m(d)) {
            var e = new fl(null);
            gl(e, "XYZ", d);
            return e
        }
    };
    l.Kd = function (b, c) {
        var d = W([null], this.Ud, b, c, this);
        if (m(d) && null !== d[0]) {
            var e = new H(null), f = d[0], g = [f.length], h, k;
            h = 1;
            for (k = d.length; h < k; ++h)db(f, d[h]), g.push(f.length);
            ul(e, "XYZ", f, g);
            return e
        }
    };
    l.Hd = function (b, c) {
        return W(null, this.Sc, b, c, this)
    };
    l.yg = Object({
        "http://www.opengis.net/gml": {
            pointMember: jq(yq.prototype.Kf),
            pointMembers: jq(yq.prototype.Kf)
        }
    });
    l.xg = Object({
        "http://www.opengis.net/gml": {
            lineStringMember: jq(yq.prototype.mf),
            lineStringMembers: jq(yq.prototype.mf)
        }
    });
    l.zg = Object({
        "http://www.opengis.net/gml": {
            polygonMember: jq(yq.prototype.Lf),
            polygonMembers: jq(yq.prototype.Lf)
        }
    });
    l.Cg = Object({"http://www.opengis.net/gml": {Point: jq(yq.prototype.Hd)}});
    l.vg = Object({"http://www.opengis.net/gml": {LineString: jq(yq.prototype.Jd)}});
    l.Dg = Object({"http://www.opengis.net/gml": {Polygon: jq(yq.prototype.Kd)}});
    l.Tc = Object({"http://www.opengis.net/gml": {LinearRing: kq(yq.prototype.Ik)}});
    l.Ob = function (b, c) {
        var d = {featureType: this.featureType, featureNS: this.featureNS};
        m(c) && Eb(d, up(this, b, c));
        return this.pe(b, [d])
    };
    l.tc = function (b) {
        return Ee(m(this.n) ? this.n : b.firstElementChild.getAttribute("srsName"))
    };
    function zq(b) {
        b = Op(b, !1);
        return Aq(b)
    }

    function Aq(b) {
        if (b = /^\s*(true|1)|(false|0)\s*$/.exec(b))return m(b[1]) || !1
    }

    function Bq(b) {
        b = Op(b, !1);
        if (b = /^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?))\s*$/.exec(b)) {
            var c = Date.UTC(parseInt(b[1], 10), parseInt(b[2], 10) - 1, parseInt(b[3], 10), parseInt(b[4], 10), parseInt(b[5], 10), parseInt(b[6], 10)) / 1E3;
            if ("Z" != b[7]) {
                var d = "-" == b[8] ? -1 : 1, c = c + 60 * d * parseInt(b[9], 10);
                m(b[10]) && (c += 3600 * d * parseInt(b[10], 10))
            }
            return c
        }
    }

    function Cq(b) {
        b = Op(b, !1);
        return Dq(b)
    }

    function Dq(b) {
        if (b = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(b))return parseFloat(b[1])
    }

    function Eq(b) {
        b = Op(b, !1);
        return Fq(b)
    }

    function Fq(b) {
        if (b = /^\s*(\d+)\s*$/.exec(b))return parseInt(b[1], 10)
    }

    function Gq(b) {
        b = Op(b, !1);
        return Aa(b)
    }

    function Hq(b, c) {
        Iq(b, c ? "1" : "0")
    }

    function Jq(b, c) {
        b.appendChild(Kp.createTextNode(c.toPrecision()))
    }

    function Kq(b, c) {
        b.appendChild(Kp.createTextNode(c.toString()))
    }

    function Iq(b, c) {
        b.appendChild(Kp.createTextNode(c))
    };
    function X(b) {
        b = m(b) ? b : {};
        yq.call(this, b);
        this.g = m(b.surface) ? b.surface : !1;
        this.d = m(b.curve) ? b.curve : !1;
        this.e = m(b.multiCurve) ? b.multiCurve : !0;
        this.f = m(b.multiSurface) ? b.multiSurface : !0;
        this.schemaLocation = m(b.schemaLocation) ? b.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"
    }

    u(X, yq);
    l = X.prototype;
    l.Lk = function (b, c) {
        var d = W([], this.wg, b, c, this);
        if (m(d)) {
            var e = new qn(null);
            sn(e, d);
            return e
        }
    };
    l.Mk = function (b, c) {
        var d = W([], this.Ag, b, c, this);
        if (m(d)) {
            var e = new un(null);
            wn(e, d);
            return e
        }
    };
    l.We = function (b, c) {
        tq(this.sg, b, c, this)
    };
    l.fg = function (b, c) {
        tq(this.Gg, b, c, this)
    };
    l.Ok = function (b, c) {
        return W([null], this.Bg, b, c, this)
    };
    l.Qk = function (b, c) {
        return W([null], this.Fg, b, c, this)
    };
    l.Pk = function (b, c) {
        return W([null], this.Ud, b, c, this)
    };
    l.Kk = function (b, c) {
        return W([null], this.Sc, b, c, this)
    };
    l.vi = function (b, c) {
        var d = W(void 0, this.Tc, b, c, this);
        m(d) && c[c.length - 1].push(d)
    };
    l.ah = function (b, c) {
        var d = W(void 0, this.Tc, b, c, this);
        m(d) && (c[c.length - 1][0] = d)
    };
    l.Wf = function (b, c) {
        var d = W([null], this.Hg, b, c, this);
        if (m(d) && null !== d[0]) {
            var e = new H(null), f = d[0], g = [f.length], h, k;
            h = 1;
            for (k = d.length; h < k; ++h)db(f, d[h]), g.push(f.length);
            ul(e, "XYZ", f, g);
            return e
        }
    };
    l.Nf = function (b, c) {
        var d = W([null], this.tg, b, c, this);
        if (m(d)) {
            var e = new M(null);
            pn(e, "XYZ", d);
            return e
        }
    };
    l.Hk = function (b, c) {
        var d = W([null], this.ug, b, c, this);
        return Xd(d[1][0], d[1][1], d[2][0], d[2][1])
    };
    l.Jk = function (b, c) {
        for (var d = Op(b, !1), e = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/, f = [], g; g = e.exec(d);)f.push(parseFloat(g[1])), d = d.substr(g[0].length);
        if ("" === d) {
            d = x(c[0], "srsName");
            e = "enu";
            null === d || (e = Ce(Ee(d)));
            if ("neu" === e)for (d = 0, e = f.length; d < e; d += 3)g = f[d], f[d] = f[d + 1], f[d + 1] = g;
            d = f.length;
            2 == d && f.push(0);
            return 0 === d ? void 0 : f
        }
    };
    l.Ae = function (b, c) {
        var d = Op(b, !1).replace(/^\s*|\s*$/g, ""), e = x(c[0], "srsName"), f = b.parentNode.getAttribute("srsDimension"), g = "enu";
        null === e || (g = Ce(Ee(e)));
        d = d.split(/\s+/);
        e = 2;
        fa(b.getAttribute("srsDimension")) ? fa(b.getAttribute("dimension")) ? null === f || (e = Fq(f)) : e = Fq(b.getAttribute("dimension")) : e = Fq(b.getAttribute("srsDimension"));
        for (var h, k, n = [], p = 0, q = d.length; p < q; p += e)f = parseFloat(d[p]), h = parseFloat(d[p + 1]), k = 3 === e ? parseFloat(d[p + 2]) : 0, "en" === g.substr(0, 2) ? n.push(f, h, k) : n.push(h, f, k);
        return n
    };
    l.Sc = Object({"http://www.opengis.net/gml": {pos: kq(X.prototype.Jk), posList: kq(X.prototype.Ae)}});
    l.Ud = Object({"http://www.opengis.net/gml": {interior: X.prototype.vi, exterior: X.prototype.ah}});
    l.Le = Object({
        "http://www.opengis.net/gml": {
            Point: kq(yq.prototype.Vf),
            MultiPoint: kq(yq.prototype.Tf),
            LineString: kq(yq.prototype.Jd),
            MultiLineString: kq(yq.prototype.Sf),
            LinearRing: kq(yq.prototype.Rf),
            Polygon: kq(yq.prototype.Kd),
            MultiPolygon: kq(yq.prototype.Uf),
            Surface: kq(X.prototype.Wf),
            MultiSurface: kq(X.prototype.Mk),
            Curve: kq(X.prototype.Nf),
            MultiCurve: kq(X.prototype.Lk),
            Envelope: kq(X.prototype.Hk)
        }
    });
    l.wg = Object({"http://www.opengis.net/gml": {curveMember: jq(X.prototype.We), curveMembers: jq(X.prototype.We)}});
    l.Ag = Object({
        "http://www.opengis.net/gml": {
            surfaceMember: jq(X.prototype.fg),
            surfaceMembers: jq(X.prototype.fg)
        }
    });
    l.sg = Object({"http://www.opengis.net/gml": {LineString: jq(yq.prototype.Jd), Curve: jq(X.prototype.Nf)}});
    l.Gg = Object({"http://www.opengis.net/gml": {Polygon: jq(yq.prototype.Kd), Surface: jq(X.prototype.Wf)}});
    l.Hg = Object({"http://www.opengis.net/gml": {patches: kq(X.prototype.Ok)}});
    l.tg = Object({"http://www.opengis.net/gml": {segments: kq(X.prototype.Qk)}});
    l.ug = Object({"http://www.opengis.net/gml": {lowerCorner: jq(X.prototype.Ae), upperCorner: jq(X.prototype.Ae)}});
    l.Bg = Object({"http://www.opengis.net/gml": {PolygonPatch: kq(X.prototype.Pk)}});
    l.Fg = Object({"http://www.opengis.net/gml": {LineStringSegment: kq(X.prototype.Kk)}});
    function Lq(b, c, d) {
        d = x(d[d.length - 1], "srsName");
        c = c.K();
        for (var e = c.length, f = Array(e), g, h = 0; h < e; ++h) {
            g = c[h];
            var k = h, n = "enu";
            null != d && (n = Ce(Ee(d)));
            f[k] = "en" === n.substr(0, 2) ? g[0] + " " + g[1] : g[1] + " " + g[0]
        }
        Iq(b, f.join(" "))
    }

    l.og = function (b, c, d) {
        var e = x(d[d.length - 1], "srsName");
        null != e && b.setAttribute("srsName", e);
        e = Np(b.namespaceURI, "pos");
        b.appendChild(e);
        d = x(d[d.length - 1], "srsName");
        b = "enu";
        null != d && (b = Ce(Ee(d)));
        c = c.K();
        Iq(e, "en" === b.substr(0, 2) ? c[0] + " " + c[1] : c[1] + " " + c[0])
    };
    var Mq = {"http://www.opengis.net/gml": {lowerCorner: V(Iq), upperCorner: V(Iq)}};
    l = X.prototype;
    l.zl = function (b, c, d) {
        var e = x(d[d.length - 1], "srsName");
        m(e) && b.setAttribute("srsName", e);
        uq({node: b}, Mq, rq, [c[0] + " " + c[1], c[2] + " " + c[3]], d, ["lowerCorner", "upperCorner"], this)
    };
    l.lg = function (b, c, d) {
        var e = x(d[d.length - 1], "srsName");
        null != e && b.setAttribute("srsName", e);
        e = Np(b.namespaceURI, "posList");
        b.appendChild(e);
        Lq(e, c, d)
    };
    l.Eg = function (b, c) {
        var d = c[c.length - 1], e = d.node, f = x(d, "exteriorWritten");
        m(f) || (d.exteriorWritten = !0);
        return Np(e.namespaceURI, m(f) ? "interior" : "exterior")
    };
    l.Sd = function (b, c, d) {
        var e = x(d[d.length - 1], "srsName");
        "PolygonPatch" !== b.nodeName && null != e && b.setAttribute("srsName", e);
        "Polygon" === b.nodeName || "PolygonPatch" === b.nodeName ? (c = c.dd(), uq({
            node: b,
            srsName: e
        }, Nq, this.Eg, c, d, void 0, this)) : "Surface" === b.nodeName && (e = Np(b.namespaceURI, "patches"), b.appendChild(e), b = Np(e.namespaceURI, "PolygonPatch"), e.appendChild(b), this.Sd(b, c, d))
    };
    l.Od = function (b, c, d) {
        var e = x(d[d.length - 1], "srsName");
        "LineStringSegment" !== b.nodeName && null != e && b.setAttribute("srsName", e);
        "LineString" === b.nodeName || "LineStringSegment" === b.nodeName ? (e = Np(b.namespaceURI, "posList"), b.appendChild(e), Lq(e, c, d)) : "Curve" === b.nodeName && (e = Np(b.namespaceURI, "segments"), b.appendChild(e), b = Np(e.namespaceURI, "LineStringSegment"), e.appendChild(b), this.Od(b, c, d))
    };
    l.ng = function (b, c, d) {
        var e = d[d.length - 1], f = x(e, "srsName"), e = x(e, "surface");
        null != f && b.setAttribute("srsName", f);
        c = c.gd();
        uq({node: b, srsName: f, surface: e}, Oq, this.b, c, d, void 0, this)
    };
    l.Dl = function (b, c, d) {
        var e = x(d[d.length - 1], "srsName");
        null != e && b.setAttribute("srsName", e);
        c = c.xd();
        uq({node: b, srsName: e}, Pq, pq("pointMember"), c, d, void 0, this)
    };
    l.mg = function (b, c, d) {
        var e = d[d.length - 1], f = x(e, "srsName"), e = x(e, "curve");
        null != f && b.setAttribute("srsName", f);
        c = c.Ec();
        uq({node: b, srsName: f, curve: e}, Qq, this.b, c, d, void 0, this)
    };
    l.pg = function (b, c, d) {
        var e = Np(b.namespaceURI, "LinearRing");
        b.appendChild(e);
        this.lg(e, c, d)
    };
    l.qg = function (b, c, d) {
        var e = this.c(c, d);
        m(e) && (b.appendChild(e), this.Sd(e, c, d))
    };
    l.Gl = function (b, c, d) {
        var e = Np(b.namespaceURI, "Point");
        b.appendChild(e);
        this.og(e, c, d)
    };
    l.kg = function (b, c, d) {
        var e = this.c(c, d);
        m(e) && (b.appendChild(e), this.Od(e, c, d))
    };
    l.Rd = function (b, c, d) {
        var e = d[d.length - 1], f = Cb(e);
        f.node = b;
        var g;
        ga(c) ? m(e.dataProjection) ? g = Xe(c, e.featureProjection, e.dataProjection) : g = c : g = wp(c, !0, e);
        uq(f, Rq, this.c, [g], d, void 0, this)
    };
    l.hg = function (b, c, d) {
        var e = c.X;
        m(e) && b.setAttribute("fid", e);
        var e = d[d.length - 1], f = x(e, "featureNS"), g = c.b;
        m(e.ac) || (e.ac = {}, e.ac[f] = {});
        var h = c.L();
        c = [];
        var k = [], n;
        for (n in h) {
            var p = h[n];
            null !== p && (c.push(n), k.push(p), n == g ? n in e.ac[f] || (e.ac[f][n] = V(this.Rd, this)) : n in e.ac[f] || (e.ac[f][n] = V(Iq)))
        }
        n = Cb(e);
        n.node = b;
        uq(n, e.ac, pq(void 0, f), k, d, c)
    };
    var Oq = {
        "http://www.opengis.net/gml": {
            surfaceMember: V(X.prototype.qg),
            polygonMember: V(X.prototype.qg)
        }
    }, Pq = {"http://www.opengis.net/gml": {pointMember: V(X.prototype.Gl)}}, Qq = {
        "http://www.opengis.net/gml": {
            lineStringMember: V(X.prototype.kg),
            curveMember: V(X.prototype.kg)
        }
    }, Nq = {"http://www.opengis.net/gml": {exterior: V(X.prototype.pg), interior: V(X.prototype.pg)}}, Rq = {
        "http://www.opengis.net/gml": {
            Curve: V(X.prototype.Od),
            MultiCurve: V(X.prototype.mg),
            Point: V(X.prototype.og),
            MultiPoint: V(X.prototype.Dl),
            LineString: V(X.prototype.Od),
            MultiLineString: V(X.prototype.mg),
            LinearRing: V(X.prototype.lg),
            Polygon: V(X.prototype.Sd),
            MultiPolygon: V(X.prototype.ng),
            Surface: V(X.prototype.Sd),
            MultiSurface: V(X.prototype.ng),
            Envelope: V(X.prototype.zl)
        }
    }, Sq = {
        MultiLineString: "lineStringMember",
        MultiCurve: "curveMember",
        MultiPolygon: "polygonMember",
        MultiSurface: "surfaceMember"
    };
    X.prototype.b = function (b, c) {
        return Np("http://www.opengis.net/gml", Sq[c[c.length - 1].node.nodeName])
    };
    X.prototype.c = function (b, c) {
        var d = c[c.length - 1], e = x(d, "multiSurface"), f = x(d, "surface"), g = x(d, "curve"), d = x(d, "multiCurve"), h;
        ga(b) ? h = "Envelope" : (h = b.H(), "MultiPolygon" === h && !0 === e ? h = "MultiSurface" : "Polygon" === h && !0 === f ? h = "Surface" : "LineString" === h && !0 === g ? h = "Curve" : "MultiLineString" === h && !0 === d && (h = "MultiCurve"));
        return Np("http://www.opengis.net/gml", h)
    };
    X.prototype.o = function (b, c) {
        c = vp(this, c);
        var d = Np("http://www.opengis.net/gml", "geom"), e = {
            node: d,
            srsName: this.srsName,
            curve: this.d,
            surface: this.g,
            multiSurface: this.f,
            multiCurve: this.e
        };
        m(c) && Eb(e, c);
        this.Rd(d, b, [e]);
        return d
    };
    X.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = Np("http://www.opengis.net/gml", "featureMembers");
        gq(d, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.schemaLocation);
        var e = {
            srsName: this.srsName,
            curve: this.d,
            surface: this.g,
            multiSurface: this.f,
            multiCurve: this.e,
            featureNS: this.featureNS,
            featureType: this.featureType
        };
        m(c) && Eb(e, c);
        var e = [e], f = e[e.length - 1], g = x(f, "featureType"), h = x(f, "featureNS"), k = {};
        k[h] = {};
        k[h][g] = V(this.hg, this);
        f = Cb(f);
        f.node = d;
        uq(f, k, pq(g, h), b, e);
        return d
    };
    function Tq(b) {
        b = m(b) ? b : {};
        yq.call(this, b);
        this.schemaLocation = m(b.schemaLocation) ? b.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"
    }

    u(Tq, yq);
    l = Tq.prototype;
    l.Qf = function (b, c) {
        var d = Op(b, !1).replace(/^\s*|\s*$/g, ""), e = x(c[0], "srsName"), f = b.parentNode.getAttribute("srsDimension"), g = "enu";
        null === e || (g = Ce(Ee(e)));
        d = d.split(/[\s,]+/);
        e = 2;
        fa(b.getAttribute("srsDimension")) ? fa(b.getAttribute("dimension")) ? null === f || (e = Fq(f)) : e = Fq(b.getAttribute("dimension")) : e = Fq(b.getAttribute("srsDimension"));
        for (var h, k, n = [], p = 0, q = d.length; p < q; p += e)f = parseFloat(d[p]), h = parseFloat(d[p + 1]), k = 3 === e ? parseFloat(d[p + 2]) : 0, "en" === g.substr(0, 2) ? n.push(f, h, k) : n.push(h, f, k);
        return n
    };
    l.Gk = function (b, c) {
        var d = W([null], this.rg, b, c, this);
        return Xd(d[1][0], d[1][1], d[1][3], d[1][4])
    };
    l.ti = function (b, c) {
        var d = W(void 0, this.Tc, b, c, this);
        m(d) && c[c.length - 1].push(d)
    };
    l.tk = function (b, c) {
        var d = W(void 0, this.Tc, b, c, this);
        m(d) && (c[c.length - 1][0] = d)
    };
    l.Sc = Object({"http://www.opengis.net/gml": {coordinates: kq(Tq.prototype.Qf)}});
    l.Ud = Object({"http://www.opengis.net/gml": {innerBoundaryIs: Tq.prototype.ti, outerBoundaryIs: Tq.prototype.tk}});
    l.rg = Object({"http://www.opengis.net/gml": {coordinates: jq(Tq.prototype.Qf)}});
    l.Le = Object({
        "http://www.opengis.net/gml": {
            Point: kq(yq.prototype.Vf),
            MultiPoint: kq(yq.prototype.Tf),
            LineString: kq(yq.prototype.Jd),
            MultiLineString: kq(yq.prototype.Sf),
            LinearRing: kq(yq.prototype.Rf),
            Polygon: kq(yq.prototype.Kd),
            MultiPolygon: kq(yq.prototype.Uf),
            Box: kq(Tq.prototype.Gk)
        }
    });
    function Uq(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee("EPSG:4326");
        this.c = b.readExtensions
    }

    u(Uq, vq);
    var Vq = [null, "http://www.topografix.com/GPX/1/0", "http://www.topografix.com/GPX/1/1"];

    function Wq(b, c, d) {
        b.push(parseFloat(c.getAttribute("lon")), parseFloat(c.getAttribute("lat")));
        "ele"in d ? (b.push(x(d, "ele")), zb(d, "ele")) : b.push(0);
        "time"in d ? (b.push(x(d, "time")), zb(d, "time")) : b.push(0);
        return b
    }

    function Xq(b, c) {
        var d = c[c.length - 1], e = b.getAttribute("href");
        null !== e && (d.link = e);
        tq(Yq, b, c)
    }

    function Zq(b, c) {
        c[c.length - 1].extensionsNode_ = b
    }

    function $q(b, c) {
        var d = c[0], e = W({flatCoordinates: []}, ar, b, c);
        if (m(e)) {
            var f = x(e, "flatCoordinates");
            zb(e, "flatCoordinates");
            var g = new M(null);
            pn(g, "XYZM", f);
            wp(g, !1, d);
            d = new R(g);
            d.G(e);
            return d
        }
    }

    function br(b, c) {
        var d = c[0], e = W({flatCoordinates: [], ends: []}, cr, b, c);
        if (m(e)) {
            var f = x(e, "flatCoordinates");
            zb(e, "flatCoordinates");
            var g = x(e, "ends");
            zb(e, "ends");
            var h = new qn(null);
            rn(h, "XYZM", f, g);
            wp(h, !1, d);
            d = new R(h);
            d.G(e);
            return d
        }
    }

    function dr(b, c) {
        var d = c[0], e = W({}, er, b, c);
        if (m(e)) {
            var f = Wq([], b, e), f = new hl(f, "XYZM");
            wp(f, !1, d);
            d = new R(f);
            d.G(e);
            return d
        }
    }

    var fr = {rte: $q, trk: br, wpt: dr}, gr = mq(Vq, {
        rte: jq($q),
        trk: jq(br),
        wpt: jq(dr)
    }), Yq = mq(Vq, {text: S(Gq, "linkText"), type: S(Gq, "linkType")}), ar = mq(Vq, {
        name: S(Gq),
        cmt: S(Gq),
        desc: S(Gq),
        src: S(Gq),
        link: Xq,
        number: S(Eq),
        extensions: Zq,
        type: S(Gq),
        rtept: function (b, c) {
            var d = W({}, hr, b, c);
            m(d) && Wq(x(c[c.length - 1], "flatCoordinates"), b, d)
        }
    }), hr = mq(Vq, {ele: S(Cq), time: S(Bq)}), cr = mq(Vq, {
        name: S(Gq),
        cmt: S(Gq),
        desc: S(Gq),
        src: S(Gq),
        link: Xq,
        number: S(Eq),
        type: S(Gq),
        extensions: Zq,
        trkseg: function (b, c) {
            var d = c[c.length - 1];
            tq(ir, b, c);
            x(d, "ends").push(x(d, "flatCoordinates").length)
        }
    }), ir = mq(Vq, {
        trkpt: function (b, c) {
            var d = W({}, jr, b, c);
            m(d) && Wq(x(c[c.length - 1], "flatCoordinates"), b, d)
        }
    }), jr = mq(Vq, {ele: S(Cq), time: S(Bq)}), er = mq(Vq, {
        ele: S(Cq),
        time: S(Bq),
        magvar: S(Cq),
        geoidheight: S(Cq),
        name: S(Gq),
        cmt: S(Gq),
        desc: S(Gq),
        src: S(Gq),
        link: Xq,
        sym: S(Gq),
        type: S(Gq),
        fix: S(Gq),
        sat: S(Eq),
        hdop: S(Cq),
        vdop: S(Cq),
        pdop: S(Cq),
        ageofdgpsdata: S(Cq),
        dgpsid: S(Eq),
        extensions: Zq
    });

    function kr(b, c) {
        null === c && (c = []);
        for (var d = 0, e = c.length; d < e; ++d) {
            var f = c[d];
            if (m(b.c)) {
                var g = f.get("extensionsNode_") || null;
                b.c(f, g)
            }
            f.set("extensionsNode_", void 0)
        }
    }

    Uq.prototype.Pf = function (b, c) {
        if (!Za(Vq, b.namespaceURI))return null;
        var d = fr[b.localName];
        if (!m(d))return null;
        d = d(b, [up(this, b, c)]);
        if (!m(d))return null;
        kr(this, [d]);
        return d
    };
    Uq.prototype.Ob = function (b, c) {
        if (!Za(Vq, b.namespaceURI))return [];
        if ("gpx" == b.localName) {
            var d = W([], gr, b, [up(this, b, c)]);
            if (m(d))return kr(this, d), d
        }
        return []
    };
    Uq.prototype.Lc = function () {
        return this.defaultDataProjection
    };
    Uq.prototype.tc = function () {
        return this.defaultDataProjection
    };
    function lr(b, c, d) {
        b.setAttribute("href", c);
        c = x(d[d.length - 1], "properties");
        uq({node: b}, mr, rq, [x(c, "linkText"), x(c, "linkType")], d, nr)
    }

    function or(b, c, d) {
        var e = d[d.length - 1], f = e.node.namespaceURI, g = x(e, "properties");
        gq(b, null, "lat", c[1]);
        gq(b, null, "lon", c[0]);
        switch (x(e, "geometryLayout")) {
            case "XYZM":
                0 !== c[3] && (g.time = c[3]);
            case "XYZ":
                0 !== c[2] && (g.ele = c[2]);
                break;
            case "XYM":
                0 !== c[2] && (g.time = c[2])
        }
        c = pr[f];
        e = sq(g, c);
        uq({node: b, properties: g}, qr, rq, e, d, c)
    }

    var nr = ["text", "type"], mr = nq(Vq, {
            text: V(Iq),
            type: V(Iq)
        }), rr = nq(Vq, "name cmt desc src link number type rtept".split(" ")), sr = nq(Vq, {
            name: V(Iq),
            cmt: V(Iq),
            desc: V(Iq),
            src: V(Iq),
            link: V(lr),
            number: V(Kq),
            type: V(Iq),
            rtept: oq(V(or))
        }), tr = nq(Vq, "name cmt desc src link number type trkseg".split(" ")), wr = nq(Vq, {
            name: V(Iq),
            cmt: V(Iq),
            desc: V(Iq),
            src: V(Iq),
            link: V(lr),
            number: V(Kq),
            type: V(Iq),
            trkseg: oq(V(function (b, c, d) {
                uq({node: b, geometryLayout: c.a, properties: {}}, ur, vr, c.K(), d)
            }))
        }), vr = pq("trkpt"), ur = nq(Vq, {trkpt: V(or)}),
        pr = nq(Vq, "ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")), qr = nq(Vq, {
            ele: V(Jq),
            time: V(function (b, c) {
                var d = new Date(1E3 * c), d = d.getUTCFullYear() + "-" + Ma(d.getUTCMonth() + 1) + "-" + Ma(d.getUTCDate()) + "T" + Ma(d.getUTCHours()) + ":" + Ma(d.getUTCMinutes()) + ":" + Ma(d.getUTCSeconds()) + "Z";
                b.appendChild(Kp.createTextNode(d))
            }),
            magvar: V(Jq),
            geoidheight: V(Jq),
            name: V(Iq),
            cmt: V(Iq),
            desc: V(Iq),
            src: V(Iq),
            link: V(lr),
            sym: V(Iq),
            type: V(Iq),
            fix: V(Iq),
            sat: V(Kq),
            hdop: V(Jq),
            vdop: V(Jq),
            pdop: V(Jq),
            ageofdgpsdata: V(Jq),
            dgpsid: V(Kq)
        }), xr = {Point: "wpt", LineString: "rte", MultiLineString: "trk"};

    function yr(b, c) {
        var d = b.N();
        if (m(d))return Np(c[c.length - 1].node.namespaceURI, xr[d.H()])
    }

    var zr = nq(Vq, {
        rte: V(function (b, c, d) {
            var e = d[0], f = c.L();
            b = {node: b, properties: f};
            c = c.N();
            m(c) && (c = wp(c, !0, e), b.geometryLayout = c.a, e = c.K(), f.rtept = e);
            e = rr[d[d.length - 1].node.namespaceURI];
            f = sq(f, e);
            uq(b, sr, rq, f, d, e)
        }), trk: V(function (b, c, d) {
            var e = d[0], f = c.L();
            b = {node: b, properties: f};
            c = c.N();
            m(c) && (c = wp(c, !0, e), e = c.Ec(), f.trkseg = e);
            e = tr[d[d.length - 1].node.namespaceURI];
            f = sq(f, e);
            uq(b, wr, rq, f, d, e)
        }), wpt: V(function (b, c, d) {
            var e = d[0], f = d[d.length - 1], g = c.L();
            f.properties = g;
            c = c.N();
            m(c) && (c = wp(c, !0, e), f.geometryLayout =
                c.a, or(b, c.K(), d))
        })
    });
    Uq.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = Np("http://www.topografix.com/GPX/1/1", "gpx");
        uq({node: d}, zr, yr, b, [c]);
        return d
    };
    function Ar(b) {
        b = Br(b);
        return Va(b, function (b) {
            return b.b.substring(b.c, b.a)
        })
    }

    function Cr(b, c, d) {
        this.b = b;
        this.c = c;
        this.a = d
    }

    function Br(b) {
        for (var c = RegExp("\r\n|\r|\n", "g"), d = 0, e, f = []; e = c.exec(b);)d = new Cr(b, d, e.index), f.push(d), d = c.lastIndex;
        d < b.length && (d = new Cr(b, d, b.length), f.push(d));
        return f
    };
    function Dr() {
        this.defaultDataProjection = null
    }

    u(Dr, tp);
    l = Dr.prototype;
    l.H = function () {
        return "text"
    };
    l.Nb = function (b, c) {
        return this.Ic(ia(b) ? b : "", vp(this, c))
    };
    l.ja = function (b, c) {
        return this.ze(ia(b) ? b : "", vp(this, c))
    };
    l.Jc = function (b, c) {
        return this.Kc(ia(b) ? b : "", vp(this, c))
    };
    l.Ba = function (b) {
        return this.Ce(ia(b) ? b : "")
    };
    l.Pd = function (b, c) {
        return this.Qd(b, vp(this, c))
    };
    l.Qb = function (b, c) {
        return this.ig(b, vp(this, c))
    };
    l.Qc = function (b, c) {
        return this.Rc(b, vp(this, c))
    };
    function Er(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee("EPSG:4326");
        this.a = m(b.altitudeMode) ? b.altitudeMode : "none"
    }

    u(Er, Dr);
    var Fr = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/, Gr = /^H.([A-Z]{3}).*?:(.*)/, Hr = /^HFDTE(\d{2})(\d{2})(\d{2})/;
    Er.prototype.Ic = function (b, c) {
        var d = this.a, e = Ar(b), f = {}, g = [], h = 2E3, k = 0, n = 1, p, q;
        p = 0;
        for (q = e.length; p < q; ++p) {
            var r = e[p], s;
            if ("B" == r.charAt(0)) {
                if (s = Fr.exec(r)) {
                    var r = parseInt(s[1], 10), v = parseInt(s[2], 10), y = parseInt(s[3], 10), C = parseInt(s[4], 10) + parseInt(s[5], 10) / 6E4;
                    "S" == s[6] && (C = -C);
                    var F = parseInt(s[7], 10) + parseInt(s[8], 10) / 6E4;
                    "W" == s[9] && (F = -F);
                    g.push(F, C);
                    "none" != d && g.push("gps" == d ? parseInt(s[11], 10) : "barometric" == d ? parseInt(s[12], 10) : 0);
                    g.push(Date.UTC(h, k, n, r, v, y) / 1E3)
                }
            } else if ("H" == r.charAt(0))if (s =
                    Hr.exec(r))n = parseInt(s[1], 10), k = parseInt(s[2], 10) - 1, h = 2E3 + parseInt(s[3], 10); else if (s = Gr.exec(r))f[s[1]] = Aa(s[2]), Hr.exec(r)
        }
        if (0 === g.length)return null;
        e = new M(null);
        pn(e, "none" == d ? "XYM" : "XYZM", g);
        d = new R(wp(e, !1, c));
        d.G(f);
        return d
    };
    Er.prototype.ze = function (b, c) {
        var d = this.Ic(b, c);
        return null === d ? [] : [d]
    };
    Er.prototype.Ce = function () {
        return this.defaultDataProjection
    };
    function Ir(b) {
        b = m(b) ? b : {};
        this.d = b.font;
        this.e = b.rotation;
        this.c = b.scale;
        this.b = b.text;
        this.g = b.textAlign;
        this.o = b.textBaseline;
        this.a = m(b.fill) ? b.fill : null;
        this.f = m(b.stroke) ? b.stroke : null;
        this.i = m(b.offsetX) ? b.offsetX : 0;
        this.n = m(b.offsetY) ? b.offsetY : 0
    }

    l = Ir.prototype;
    l.kh = function () {
        return this.d
    };
    l.yh = function () {
        return this.i
    };
    l.zh = function () {
        return this.n
    };
    l.dk = function () {
        return this.a
    };
    l.ek = function () {
        return this.e
    };
    l.fk = function () {
        return this.c
    };
    l.gk = function () {
        return this.f
    };
    l.hk = function () {
        return this.b
    };
    l.Hh = function () {
        return this.g
    };
    l.Ih = function () {
        return this.o
    };
    l.dl = function (b) {
        this.d = b
    };
    l.cl = function (b) {
        this.a = b
    };
    l.ik = function (b) {
        this.e = b
    };
    l.jk = function (b) {
        this.c = b
    };
    l.kl = function (b) {
        this.f = b
    };
    l.ll = function (b) {
        this.b = b
    };
    l.ml = function (b) {
        this.g = b
    };
    l.nl = function (b) {
        this.o = b
    };
    function Jr(b) {
        function c(b) {
            return ga(b) ? b : ia(b) ? (!(b in e) && "#" + b in e && (b = "#" + b), c(e[b])) : d
        }

        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee("EPSG:4326");
        var d = m(b.defaultStyle) ? b.defaultStyle : Kr, e = {};
        this.b = m(b.extractStyles) ? b.extractStyles : !0;
        this.c = e;
        this.d = function () {
            var b = this.get("Style");
            if (m(b))return b;
            b = this.get("styleUrl");
            return m(b) ? c(b) : d
        }
    }

    u(Jr, vq);
    var Lr = ["http://www.google.com/kml/ext/2.2"], Mr = [null, "http://earth.google.com/kml/2.0", "http://earth.google.com/kml/2.1", "http://earth.google.com/kml/2.2", "http://www.opengis.net/kml/2.2"], Nr = [255, 255, 255, 1], Or = new Pl({color: Nr}), Pr = [2, 20], Qr = [32, 32], Rr = new Sj({
        anchor: Pr,
        anchorXUnits: "pixels",
        anchorYUnits: "pixels",
        crossOrigin: "anonymous",
        rotation: 0,
        scale: 1,
        size: Qr,
        src: "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
    }), Sr = new Ll({color: Nr, width: 1}), Tr = new Ir({
        font: "normal 16px Helvetica",
        fill: Or, stroke: Sr, scale: 1
    }), Kr = [new Rl({fill: Or, image: Rr, text: Tr, stroke: Sr, zIndex: 0})], Ur = {
        fraction: "fraction",
        pixels: "pixels"
    };

    function Vr(b) {
        b = Op(b, !1);
        if (b = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(b))return b = b[1], [parseInt(b.substr(6, 2), 16), parseInt(b.substr(4, 2), 16), parseInt(b.substr(2, 2), 16), parseInt(b.substr(0, 2), 16) / 255]
    }

    function Wr(b) {
        b = Op(b, !1);
        for (var c = [], d = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i, e; e = d.exec(b);)c.push(parseFloat(e[1]), parseFloat(e[2]), e[3] ? parseFloat(e[3]) : 0), b = b.substr(e[0].length);
        return "" !== b ? void 0 : c
    }

    function Xr(b) {
        var c = Op(b, !1);
        return null != b.baseURI ? Ph(b.baseURI, Aa(c)).toString() : Aa(c)
    }

    function Yr(b) {
        b = Cq(b);
        if (m(b))return Math.sqrt(b)
    }

    function Zr(b, c) {
        return W(null, $r, b, c)
    }

    function as(b, c) {
        var d = W({k: [], gg: []}, bs, b, c);
        if (m(d)) {
            var e = d.k, d = d.gg, f, g;
            f = 0;
            for (g = Math.min(e.length, d.length); f < g; ++f)e[4 * f + 3] = d[f];
            d = new M(null);
            pn(d, "XYZM", e);
            return d
        }
    }

    function cs(b, c) {
        var d = W(null, ds, b, c);
        if (m(d)) {
            var e = new M(null);
            pn(e, "XYZ", d);
            return e
        }
    }

    function es(b, c) {
        var d = W(null, ds, b, c);
        if (m(d)) {
            var e = new H(null);
            ul(e, "XYZ", d, [d.length]);
            return e
        }
    }

    function fs(b, c) {
        var d = W([], gs, b, c);
        if (!m(d))return null;
        if (0 === d.length)return new hn(d);
        var e = !0, f = d[0].H(), g, h, k;
        h = 1;
        for (k = d.length; h < k; ++h)if (g = d[h], g.H() != f) {
            e = !1;
            break
        }
        if (e) {
            if ("Point" == f) {
                g = d[0];
                e = g.a;
                f = g.k;
                h = 1;
                for (k = d.length; h < k; ++h)g = d[h], db(f, g.k);
                d = new tn(null);
                Ok(d, e, f);
                d.l();
                return d
            }
            return "LineString" == f ? (g = new qn(null), sn(g, d), g) : "Polygon" == f ? (g = new un(null), wn(g, d), g) : "GeometryCollection" == f ? new hn(d) : null
        }
        return new hn(d)
    }

    function hs(b, c) {
        var d = W(null, ds, b, c);
        if (null != d) {
            var e = new hl(null);
            il(e, "XYZ", d);
            return e
        }
    }

    function is(b, c) {
        var d = W([null], js, b, c);
        if (null != d && null !== d[0]) {
            var e = new H(null), f = d[0], g = [f.length], h, k;
            h = 1;
            for (k = d.length; h < k; ++h)db(f, d[h]), g.push(f.length);
            ul(e, "XYZ", f, g);
            return e
        }
    }

    function ks(b, c) {
        var d = W({}, ls, b, c);
        if (!m(d))return null;
        var e = x(d, "fillStyle", Or), f = x(d, "fill");
        m(f) && !f && (e = null);
        var f = x(d, "imageStyle", Rr), g = x(d, "textStyle", Tr), h = x(d, "strokeStyle", Sr), d = x(d, "outline");
        m(d) && !d && (h = null);
        return [new Rl({fill: e, image: f, stroke: h, text: g, zIndex: void 0})]
    }

    var ms = mq(Mr, {value: kq(Gq)}), os = mq(Mr, {
        Data: function (b, c) {
            var d = b.getAttribute("name");
            if (null !== d) {
                var e = W(void 0, ms, b, c);
                m(e) && (c[c.length - 1][d] = e)
            }
        }, SchemaData: function (b, c) {
            tq(ns, b, c)
        }
    }), $r = mq(Mr, {coordinates: kq(Wr)}), js = mq(Mr, {
        innerBoundaryIs: function (b, c) {
            var d = W(void 0, ps, b, c);
            m(d) && c[c.length - 1].push(d)
        }, outerBoundaryIs: function (b, c) {
            var d = W(void 0, qs, b, c);
            m(d) && (c[c.length - 1][0] = d)
        }
    }), bs = mq(Mr, {
        when: function (b, c) {
            var d = c[c.length - 1].gg, e = Op(b, !1);
            if (e = /^\s*(\d{4})($|-(\d{2})($|-(\d{2})($|T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?)))))\s*$/.exec(e)) {
                var f =
                    Date.UTC(parseInt(e[1], 10), m(e[3]) ? parseInt(e[3], 10) - 1 : 0, m(e[5]) ? parseInt(e[5], 10) : 1, m(e[7]) ? parseInt(e[7], 10) : 0, m(e[8]) ? parseInt(e[8], 10) : 0, m(e[9]) ? parseInt(e[9], 10) : 0);
                if (m(e[10]) && "Z" != e[10]) {
                    var g = "-" == e[11] ? -1 : 1, f = f + 60 * g * parseInt(e[12], 10);
                    m(e[13]) && (f += 3600 * g * parseInt(e[13], 10))
                }
                d.push(f)
            } else d.push(0)
        }
    }, mq(Lr, {
        coord: function (b, c) {
            var d = c[c.length - 1].k, e = Op(b, !1);
            (e = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(e)) ?
                d.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]), 0) : d.push(0, 0, 0, 0)
        }
    })), ds = mq(Mr, {coordinates: kq(Wr)}), rs = mq(Mr, {href: S(Xr)}, mq(Lr, {
        x: S(Cq),
        y: S(Cq),
        w: S(Cq),
        h: S(Cq)
    })), ss = mq(Mr, {
        Icon: S(function (b, c) {
            var d = W({}, rs, b, c);
            return m(d) ? d : null
        }), heading: S(Cq), hotSpot: S(function (b) {
            var c = b.getAttribute("xunits"), d = b.getAttribute("yunits");
            return {x: parseFloat(b.getAttribute("x")), Je: Ur[c], y: parseFloat(b.getAttribute("y")), Ke: Ur[d]}
        }), scale: S(Yr)
    }), ps = mq(Mr, {LinearRing: kq(Zr)}), ts = mq(Mr, {
        color: S(Vr),
        scale: S(Yr)
    }), us = mq(Mr, {color: S(Vr), width: S(Cq)}), gs = mq(Mr, {
        LineString: jq(cs),
        LinearRing: jq(es),
        MultiGeometry: jq(fs),
        Point: jq(hs),
        Polygon: jq(is)
    }), vs = mq(Lr, {Track: jq(as)}), qs = mq(Mr, {LinearRing: kq(Zr)}), ws = mq(Mr, {
        Style: S(ks),
        key: S(Gq),
        styleUrl: S(function (b) {
            var c = Aa(Op(b, !1));
            return null != b.baseURI ? Ph(b.baseURI, c).toString() : c
        })
    }), ys = mq(Mr, {
        ExtendedData: function (b, c) {
            tq(os, b, c)
        },
        MultiGeometry: S(fs, "geometry"),
        LineString: S(cs, "geometry"),
        LinearRing: S(es, "geometry"),
        Point: S(hs, "geometry"),
        Polygon: S(is,
            "geometry"),
        Style: S(ks),
        StyleMap: function (b, c) {
            var d = W(void 0, xs, b, c);
            if (m(d)) {
                var e = c[c.length - 1];
                ga(d) ? e.Style = d : ia(d) && (e.styleUrl = d)
            }
        },
        address: S(Gq),
        description: S(Gq),
        name: S(Gq),
        open: S(zq),
        phoneNumber: S(Gq),
        styleUrl: S(Xr),
        visibility: S(zq)
    }, mq(Lr, {
        MultiTrack: S(function (b, c) {
            var d = W([], vs, b, c);
            if (m(d)) {
                var e = new qn(null);
                sn(e, d);
                return e
            }
        }, "geometry"), Track: S(as, "geometry")
    })), zs = mq(Mr, {color: S(Vr), fill: S(zq), outline: S(zq)}), ns = mq(Mr, {
        SimpleData: function (b, c) {
            var d = b.getAttribute("name");
            if (null !==
                d) {
                var e = Gq(b);
                c[c.length - 1][d] = e
            }
        }
    }), ls = mq(Mr, {
        IconStyle: function (b, c) {
            var d = W({}, ss, b, c);
            if (m(d)) {
                var e = c[c.length - 1], f = x(d, "Icon", {}), g;
                g = x(f, "href");
                g = m(g) ? g : "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";
                var h, k, n, p = x(d, "hotSpot");
                m(p) ? (h = [p.x, p.y], k = p.Je, n = p.Ke) : "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" === g ? (h = Pr, n = k = "pixels") : /^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g) && (h = [.5, 0], n = k = "fraction");
                var q, p = x(f, "x"), r = x(f, "y");
                m(p) && m(r) && (q = [p, r]);
                var s, p = x(f, "w"), f = x(f, "h");
                m(p) && m(f) && (s = [p, f]);
                var v, f = x(d, "heading");
                m(f) && (v = bc(f));
                d = x(d, "scale");
                "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" == g && (s = Qr);
                h = new Sj({
                    anchor: h,
                    anchorOrigin: "bottom-left",
                    anchorXUnits: k,
                    anchorYUnits: n,
                    crossOrigin: "anonymous",
                    offset: q,
                    offsetOrigin: "bottom-left",
                    rotation: v,
                    scale: d,
                    size: s,
                    src: g
                });
                e.imageStyle = h
            }
        }, LabelStyle: function (b, c) {
            var d = W({}, ts, b, c);
            m(d) && (c[c.length - 1].textStyle = new Ir({
                fill: new Pl({color: x(d, "color", Nr)}),
                scale: x(d, "scale")
            }))
        },
        LineStyle: function (b, c) {
            var d = W({}, us, b, c);
            m(d) && (c[c.length - 1].strokeStyle = new Ll({color: x(d, "color", Nr), width: x(d, "width", 1)}))
        }, PolyStyle: function (b, c) {
            var d = W({}, zs, b, c);
            if (m(d)) {
                var e = c[c.length - 1];
                e.fillStyle = new Pl({color: x(d, "color", Nr)});
                var f = x(d, "fill");
                m(f) && (e.fill = f);
                d = x(d, "outline");
                m(d) && (e.outline = d)
            }
        }
    }), xs = mq(Mr, {
        Pair: function (b, c) {
            var d = W({}, ws, b, c);
            if (m(d)) {
                var e = x(d, "key");
                m(e) && "normal" == e && (e = x(d, "styleUrl"), m(e) && (c[c.length - 1] = e), d = x(d, "Style"), m(d) && (c[c.length - 1] = d))
            }
        }
    });
    l = Jr.prototype;
    l.Of = function (b, c) {
        Sp(b);
        var d = mq(Mr, {
            Folder: iq(this.Of, this),
            Placemark: jq(this.Be, this),
            Style: sa(this.Sk, this),
            StyleMap: sa(this.Rk, this)
        }), d = W([], d, b, c, this);
        if (m(d))return d
    };
    l.Be = function (b, c) {
        var d = W({geometry: null}, ys, b, c);
        if (m(d)) {
            var e = new R, f = b.getAttribute("id");
            null === f || e.d(f);
            f = c[0];
            null != d.geometry && wp(d.geometry, !1, f);
            e.G(d);
            this.b && e.i(this.d);
            return e
        }
    };
    l.Sk = function (b, c) {
        var d = b.getAttribute("id");
        if (null !== d) {
            var e = ks(b, c);
            m(e) && (d = null != b.baseURI ? Ph(b.baseURI, "#" + d).toString() : "#" + d, this.c[d] = e)
        }
    };
    l.Rk = function (b, c) {
        var d = b.getAttribute("id");
        if (null !== d) {
            var e = W(void 0, xs, b, c);
            m(e) && (d = null != b.baseURI ? Ph(b.baseURI, "#" + d).toString() : "#" + d, this.c[d] = e)
        }
    };
    l.Pf = function (b, c) {
        if (!Za(Mr, b.namespaceURI))return null;
        var d = this.Be(b, [up(this, b, c)]);
        return m(d) ? d : null
    };
    l.Ob = function (b, c) {
        if (!Za(Mr, b.namespaceURI))return [];
        var d;
        d = Sp(b);
        if ("Document" == d || "Folder" == d)return d = this.Of(b, [up(this, b, c)]), m(d) ? d : [];
        if ("Placemark" == d)return d = this.Be(b, [up(this, b, c)]), m(d) ? [d] : [];
        if ("kml" == d) {
            d = [];
            var e;
            for (e = b.firstElementChild; null !== e; e = e.nextElementSibling) {
                var f = this.Ob(e, c);
                m(f) && db(d, f)
            }
            return d
        }
        return []
    };
    l.Nk = function (b) {
        if (Vp(b))return As(this, b);
        if (Yp(b))return Bs(this, b);
        if (ia(b))return b = hq(b), As(this, b)
    };
    function As(b, c) {
        var d;
        for (d = c.firstChild; null !== d; d = d.nextSibling)if (1 == d.nodeType) {
            var e = Bs(b, d);
            if (m(e))return e
        }
    }

    function Bs(b, c) {
        var d;
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling)if (Za(Mr, d.namespaceURI) && "name" == d.localName)return Gq(d);
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling) {
            var e = Sp(d);
            if (Za(Mr, d.namespaceURI) && ("Document" == e || "Folder" == e || "Placemark" == e || "kml" == e) && (e = Bs(b, d), m(e)))return e
        }
    }

    l.Lc = function () {
        return this.defaultDataProjection
    };
    l.tc = function () {
        return this.defaultDataProjection
    };
    function Cs(b, c) {
        var d = ug(c), d = [255 * (4 == d.length ? d[3] : 1), d[2], d[1], d[0]], e;
        for (e = 0; 4 > e; ++e) {
            var f = parseInt(d[e], 10).toString(16);
            d[e] = 1 == f.length ? "0" + f : f
        }
        Iq(b, d.join(""))
    }

    function Ds(b, c, d) {
        uq({node: b}, Es, Fs, [c], d)
    }

    function Gs(b, c, d) {
        var e = {node: b};
        null != c.X && b.setAttribute("id", c.X);
        b = c.L();
        var f = c.a;
        m(f) && (f = f.call(c, 0), null !== f && 0 < f.length && (b.Style = f[0], f = f[0].c, null !== f && (b.name = f.b)));
        f = Hs[d[d.length - 1].node.namespaceURI];
        b = sq(b, f);
        uq(e, Is, rq, b, d, f);
        b = d[0];
        c = c.N();
        null != c && (c = wp(c, !0, b));
        uq(e, Is, Js, [c], d)
    }

    function Ks(b, c, d) {
        var e = c.k;
        b = {node: b};
        b.layout = c.a;
        b.stride = c.s;
        uq(b, Ls, Ms, [e], d)
    }

    function Ns(b, c, d) {
        c = c.dd();
        var e = c.shift();
        b = {node: b};
        uq(b, Os, Ps, c, d);
        uq(b, Os, Qs, [e], d)
    }

    function Rs(b, c) {
        Jq(b, c * c)
    }

    var Ss = nq(Mr, ["Document", "Placemark"]), Vs = nq(Mr, {
            Document: V(function (b, c, d) {
                uq({node: b}, Ts, Us, c, d)
            }), Placemark: V(Gs)
        }), Ts = nq(Mr, {Placemark: V(Gs)}), Ws = {
            Point: "Point",
            LineString: "LineString",
            LinearRing: "LinearRing",
            Polygon: "Polygon",
            MultiPoint: "MultiGeometry",
            MultiLineString: "MultiGeometry",
            MultiPolygon: "MultiGeometry"
        }, Xs = nq(Mr, ["href"], nq(Lr, ["x", "y", "w", "h"])), Ys = nq(Mr, {href: V(Iq)}, nq(Lr, {
            x: V(Jq),
            y: V(Jq),
            w: V(Jq),
            h: V(Jq)
        })), Zs = nq(Mr, ["scale", "heading", "Icon", "hotSpot"]), at = nq(Mr, {
            Icon: V(function (b,
                              c, d) {
                b = {node: b};
                var e = Xs[d[d.length - 1].node.namespaceURI], f = sq(c, e);
                uq(b, Ys, rq, f, d, e);
                e = Xs[Lr[0]];
                f = sq(c, e);
                uq(b, Ys, $s, f, d, e)
            }), heading: V(Jq), hotSpot: V(function (b, c) {
                b.setAttribute("x", c.x);
                b.setAttribute("y", c.y);
                b.setAttribute("xunits", c.Je);
                b.setAttribute("yunits", c.Ke)
            }), scale: V(Rs)
        }), bt = nq(Mr, ["color", "scale"]), ct = nq(Mr, {
            color: V(Cs),
            scale: V(Rs)
        }), dt = nq(Mr, ["color", "width"]), et = nq(Mr, {
            color: V(Cs),
            width: V(Jq)
        }), Es = nq(Mr, {LinearRing: V(Ks)}), ft = nq(Mr, {LineString: V(Ks), Point: V(Ks), Polygon: V(Ns)}),
        Hs = nq(Mr, "name open visibility address phoneNumber description styleUrl Style".split(" ")), Is = nq(Mr, {
            MultiGeometry: V(function (b, c, d) {
                b = {node: b};
                var e = c.H(), f, g;
                "MultiPoint" == e ? (f = c.xd(), g = gt) : "MultiLineString" == e ? (f = c.Ec(), g = ht) : "MultiPolygon" == e && (f = c.gd(), g = it);
                uq(b, ft, g, f, d)
            }),
            LineString: V(Ks),
            LinearRing: V(Ks),
            Point: V(Ks),
            Polygon: V(Ns),
            Style: V(function (b, c, d) {
                b = {node: b};
                var e = {}, f = c.e, g = c.b, h = c.f;
                c = c.c;
                null !== h && (e.IconStyle = h);
                null !== c && (e.LabelStyle = c);
                null !== g && (e.LineStyle = g);
                null !== f && (e.PolyStyle =
                    f);
                c = jt[d[d.length - 1].node.namespaceURI];
                e = sq(e, c);
                uq(b, kt, rq, e, d, c)
            }),
            address: V(Iq),
            description: V(Iq),
            name: V(Iq),
            open: V(Hq),
            phoneNumber: V(Iq),
            styleUrl: V(Iq),
            visibility: V(Hq)
        }), Ls = nq(Mr, {
            coordinates: V(function (b, c, d) {
                d = d[d.length - 1];
                var e = x(d, "layout");
                d = x(d, "stride");
                var f;
                "XY" == e || "XYM" == e ? f = 2 : ("XYZ" == e || "XYZM" == e) && (f = 3);
                var g, h = c.length, k = "";
                if (0 < h) {
                    k += c[0];
                    for (e = 1; e < f; ++e)k += "," + c[e];
                    for (g = d; g < h; g += d)for (k += " " + c[g], e = 1; e < f; ++e)k += "," + c[g + e]
                }
                Iq(b, k)
            })
        }), Os = nq(Mr, {outerBoundaryIs: V(Ds), innerBoundaryIs: V(Ds)}),
        lt = nq(Mr, {color: V(Cs)}), jt = nq(Mr, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]), kt = nq(Mr, {
            IconStyle: V(function (b, c, d) {
                b = {node: b};
                var e = {}, f = c.ab(), g = c.cd(), h = {href: c.a.f};
                if (null !== f) {
                    h.w = f[0];
                    h.h = f[1];
                    var k = c.tb(), n = c.zb();
                    null !== n && null !== g && 0 !== n[0] && n[1] !== f[1] && (h.x = n[0], h.y = g[1] - (n[1] + f[1]));
                    null !== k && 0 !== k[0] && k[1] !== f[1] && (e.hotSpot = {
                        x: k[0],
                        Je: "pixels",
                        y: f[1] - k[1],
                        Ke: "pixels"
                    })
                }
                e.Icon = h;
                f = c.n;
                1 !== f && (e.scale = f);
                c = c.i;
                0 !== c && (e.heading = c);
                c = Zs[d[d.length - 1].node.namespaceURI];
                e = sq(e, c);
                uq(b, at, rq, e, d, c)
            }), LabelStyle: V(function (b, c, d) {
                b = {node: b};
                var e = {}, f = c.a;
                null !== f && (e.color = f.a);
                c = c.c;
                m(c) && 1 !== c && (e.scale = c);
                c = bt[d[d.length - 1].node.namespaceURI];
                e = sq(e, c);
                uq(b, ct, rq, e, d, c)
            }), LineStyle: V(function (b, c, d) {
                b = {node: b};
                var e = dt[d[d.length - 1].node.namespaceURI];
                c = sq({color: c.a, width: c.c}, e);
                uq(b, et, rq, c, d, e)
            }), PolyStyle: V(function (b, c, d) {
                uq({node: b}, lt, mt, [c.a], d)
            })
        });

    function $s(b, c, d) {
        return Np(Lr[0], "gx:" + d)
    }

    function Us(b, c) {
        return Np(c[c.length - 1].node.namespaceURI, "Placemark")
    }

    function Js(b, c) {
        if (null != b)return Np(c[c.length - 1].node.namespaceURI, Ws[b.H()])
    }

    var mt = pq("color"), Ms = pq("coordinates"), Ps = pq("innerBoundaryIs"), gt = pq("Point"), ht = pq("LineString"), Fs = pq("LinearRing"), it = pq("Polygon"), Qs = pq("outerBoundaryIs");
    Jr.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = Np(Mr[4], "kml");
        gq(d, "http://www.w3.org/2000/xmlns/", "xmlns:gx", Lr[0]);
        gq(d, "http://www.w3.org/2000/xmlns/", "xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        gq(d, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");
        var e = {node: d}, f = {};
        1 < b.length ? f.Document = b : 1 == b.length && (f.Placemark = b[0]);
        var g = Ss[d.namespaceURI], f = sq(f, g);
        uq(e, Vs, rq, f, [c], g);
        return d
    };
    function nt() {
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee("EPSG:4326")
    }

    u(nt, vq);
    function ot(b, c) {
        var d = b.getAttribute("k"), e = b.getAttribute("v");
        c[c.length - 1].Oc[d] = e
    }

    var pt = [null], qt = mq(pt, {
        nd: function (b, c) {
            c[c.length - 1].pc.push(b.getAttribute("ref"))
        }, tag: ot
    }), st = mq(pt, {
        node: function (b, c) {
            var d = c[0], e = c[c.length - 1], f = b.getAttribute("id"), g = [parseFloat(b.getAttribute("lon")), parseFloat(b.getAttribute("lat"))];
            e.pf[f] = g;
            var h = W({Oc: {}}, rt, b, c);
            xb(h.Oc) || (g = new hl(g), wp(g, !1, d), d = new R(g), d.d(f), d.G(h.Oc), e.features.push(d))
        }, way: function (b, c) {
            for (var d = c[0], e = b.getAttribute("id"), f = W({
                pc: [],
                Oc: {}
            }, qt, b, c), g = c[c.length - 1], h = [], k = 0, n = f.pc.length; k < n; k++)db(h, x(g.pf,
                f.pc[k]));
            f.pc[0] == f.pc[f.pc.length - 1] ? (k = new H(null), ul(k, "XY", h, [h.length])) : (k = new M(null), pn(k, "XY", h));
            wp(k, !1, d);
            d = new R(k);
            d.d(e);
            d.G(f.Oc);
            g.features.push(d)
        }
    }), rt = mq(pt, {tag: ot});
    nt.prototype.Ob = function (b, c) {
        var d = up(this, b, c);
        return "osm" == b.localName && (d = W({pf: {}, features: []}, st, b, [d]), m(d.features)) ? d.features : []
    };
    nt.prototype.Lc = function () {
        return this.defaultDataProjection
    };
    nt.prototype.tc = function () {
        return this.defaultDataProjection
    };
    function tt(b) {
        return b.getAttributeNS("http://www.w3.org/1999/xlink", "href")
    };
    function ut() {
    }

    ut.prototype.a = function (b) {
        return Vp(b) ? vt(this, b) : Yp(b) ? wt(this, b) : ia(b) ? (b = hq(b), vt(this, b)) : null
    };
    function xt(b, c, d, e) {
        var f;
        m(e) ? f = m(void 0) ? void 0 : 0 : (e = [], f = 0);
        var g, h;
        for (g = 0; g < c;)for (h = b[g++], e[f++] = b[g++], e[f++] = h, h = 2; h < d; ++h)e[f++] = b[g++];
        e.length = f
    };
    function yt(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee("EPSG:4326");
        this.a = m(b.factor) ? b.factor : 1E5
    }

    u(yt, Dr);
    function zt(b, c, d) {
        d = m(d) ? d : 1E5;
        var e, f = Array(c);
        for (e = 0; e < c; ++e)f[e] = 0;
        var g, h;
        g = 0;
        for (h = b.length; g < h;)for (e = 0; e < c; ++e, ++g) {
            var k = b[g], n = k - f[e];
            f[e] = k;
            b[g] = n
        }
        return At(b, d)
    }

    function Bt(b, c, d) {
        var e = m(d) ? d : 1E5, f = Array(c);
        for (d = 0; d < c; ++d)f[d] = 0;
        b = Ct(b, e);
        var g, e = 0;
        for (g = b.length; e < g;)for (d = 0; d < c; ++d, ++e)f[d] += b[e], b[e] = f[d];
        return b
    }

    function At(b, c) {
        var d = m(c) ? c : 1E5, e, f;
        e = 0;
        for (f = b.length; e < f; ++e)b[e] = Math.round(b[e] * d);
        d = 0;
        for (e = b.length; d < e; ++d)f = b[d], b[d] = 0 > f ? ~(f << 1) : f << 1;
        d = "";
        e = 0;
        for (f = b.length; e < f; ++e) {
            for (var g = b[e], h = void 0, k = ""; 32 <= g;)h = (32 | g & 31) + 63, k += String.fromCharCode(h), g >>= 5;
            h = g + 63;
            k += String.fromCharCode(h);
            d += k
        }
        return d
    }

    function Ct(b, c) {
        var d = m(c) ? c : 1E5, e = [], f = 0, g = 0, h, k;
        h = 0;
        for (k = b.length; h < k; ++h) {
            var n = b.charCodeAt(h) - 63, f = f | (n & 31) << g;
            32 > n ? (e.push(f), g = f = 0) : g += 5
        }
        f = 0;
        for (g = e.length; f < g; ++f)h = e[f], e[f] = h & 1 ? ~(h >> 1) : h >> 1;
        f = 0;
        for (g = e.length; f < g; ++f)e[f] /= d;
        return e
    }

    l = yt.prototype;
    l.Ic = function (b, c) {
        var d = this.Kc(b, c);
        return new R(d)
    };
    l.ze = function (b, c) {
        return [this.Ic(b, c)]
    };
    l.Kc = function (b, c) {
        var d = Bt(b, 2, this.a);
        xt(d, d.length, 2, d);
        d = bl(d, 0, d.length, 2);
        return wp(new M(d), !1, vp(this, c))
    };
    l.Ce = function () {
        return this.defaultDataProjection
    };
    l.Qd = function (b, c) {
        var d = b.N();
        return null != d ? this.Rc(d, c) : ""
    };
    l.ig = function (b, c) {
        return this.Qd(b[0], c)
    };
    l.Rc = function (b, c) {
        b = wp(b, !0, vp(this, c));
        var d = b.k, e = b.s;
        xt(d, d.length, e, d);
        return zt(d, e, this.a)
    };
    function Dt(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Ee(null != b.defaultDataProjection ? b.defaultDataProjection : "EPSG:4326")
    }

    u(Dt, zp);
    function Et(b, c) {
        var d = [], e, f, g, h;
        g = 0;
        for (h = b.length; g < h; ++g)e = b[g], 0 < g && d.pop(), 0 <= e ? f = c[e] : f = c[~e].slice().reverse(), d.push.apply(d, f);
        e = 0;
        for (f = d.length; e < f; ++e)d[e] = d[e].slice();
        return d
    }

    function Ft(b, c, d, e, f) {
        b = b.geometries;
        var g = [], h, k;
        h = 0;
        for (k = b.length; h < k; ++h)g[h] = Gt(b[h], c, d, e, f);
        return g
    }

    function Gt(b, c, d, e, f) {
        var g = b.type, h = Ht[g];
        c = "Point" === g || "MultiPoint" === g ? h(b, d, e) : h(b, c);
        d = new R;
        d.Ma(wp(c, !1, f));
        m(b.id) && d.d(b.id);
        m(b.properties) && d.G(b.properties);
        return d
    }

    Dt.prototype.b = function (b, c) {
        if ("Topology" == b.type) {
            var d, e = null, f = null;
            m(b.transform) && (d = b.transform, e = d.scale, f = d.translate);
            var g = b.arcs;
            if (m(d)) {
                d = e;
                var h = f, k, n;
                k = 0;
                for (n = g.length; k < n; ++k)for (var p = g[k], q = d, r = h, s = 0, v = 0, y = void 0, C = void 0, F = void 0, C = 0, F = p.length; C < F; ++C)y = p[C], s += y[0], v += y[1], y[0] = s, y[1] = v, It(y, q, r)
            }
            d = [];
            h = rb(b.objects);
            k = 0;
            for (n = h.length; k < n; ++k)"GeometryCollection" === h[k].type ? (p = h[k], d.push.apply(d, Ft(p, g, e, f, c))) : (p = h[k], d.push(Gt(p, g, e, f, c)));
            return d
        }
        return []
    };
    function It(b, c, d) {
        b[0] = b[0] * c[0] + d[0];
        b[1] = b[1] * c[1] + d[1]
    }

    Dt.prototype.Ba = function () {
        return this.defaultDataProjection
    };
    var Ht = {
        Point: function (b, c, d) {
            b = b.coordinates;
            null === c || null === d || It(b, c, d);
            return new hl(b)
        }, LineString: function (b, c) {
            var d = Et(b.arcs, c);
            return new M(d)
        }, Polygon: function (b, c) {
            var d = [], e, f;
            e = 0;
            for (f = b.arcs.length; e < f; ++e)d[e] = Et(b.arcs[e], c);
            return new H(d)
        }, MultiPoint: function (b, c, d) {
            b = b.coordinates;
            var e, f;
            if (null !== c && null !== d)for (e = 0, f = b.length; e < f; ++e)It(b[e], c, d);
            return new tn(b)
        }, MultiLineString: function (b, c) {
            var d = [], e, f;
            e = 0;
            for (f = b.arcs.length; e < f; ++e)d[e] = Et(b.arcs[e], c);
            return new qn(d)
        },
        MultiPolygon: function (b, c) {
            var d = [], e, f, g, h, k, n;
            k = 0;
            for (n = b.arcs.length; k < n; ++k) {
                e = b.arcs[k];
                f = [];
                g = 0;
                for (h = e.length; g < h; ++g)f[g] = Et(e[g], c);
                d[k] = f
            }
            return new un(d)
        }
    };

    function Jt(b) {
        b = m(b) ? b : {};
        this.e = b.featureType;
        this.b = b.featureNS;
        this.c = m(b.gmlFormat) ? b.gmlFormat : new X;
        this.d = m(b.schemaLocation) ? b.schemaLocation : "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";
        this.defaultDataProjection = null
    }

    u(Jt, vq);
    Jt.prototype.Ob = function (b, c) {
        var d = {featureType: this.e, featureNS: this.b};
        Eb(d, up(this, b, m(c) ? c : {}));
        d = W([], this.c.Td, b, [d], this.c);
        m(d) || (d = []);
        return d
    };
    Jt.prototype.g = function (b) {
        if (Vp(b))return Kt(b);
        if (Yp(b))return W({}, Lt, b, []);
        if (ia(b))return b = hq(b), Kt(b)
    };
    Jt.prototype.f = function (b) {
        if (Vp(b))return Mt(this, b);
        if (Yp(b))return Nt(this, b);
        if (ia(b))return b = hq(b), Mt(this, b)
    };
    function Mt(b, c) {
        for (var d = c.firstChild; null !== d; d = d.nextSibling)if (1 == d.nodeType)return Nt(b, d)
    }

    var Ot = {"http://www.opengis.net/gml": {boundedBy: S(yq.prototype.Id, "bounds")}};

    function Nt(b, c) {
        var d = {}, e = Fq(c.getAttribute("numberOfFeatures"));
        d.numberOfFeatures = e;
        return W(d, Ot, c, [], b.c)
    }

    var Pt = {
        "http://www.opengis.net/wfs": {
            totalInserted: S(Eq),
            totalUpdated: S(Eq),
            totalDeleted: S(Eq)
        }
    }, Qt = {
        "http://www.opengis.net/ogc": {
            FeatureId: jq(function (b) {
                return b.getAttribute("fid")
            })
        }
    }, Rt = {
        "http://www.opengis.net/wfs": {
            Feature: function (b, c) {
                tq(Qt, b, c)
            }
        }
    }, Lt = {
        "http://www.opengis.net/wfs": {
            TransactionSummary: S(function (b, c) {
                return W({}, Pt, b, c)
            }, "transactionSummary"), InsertResults: S(function (b, c) {
                return W([], Rt, b, c)
            }, "insertIds")
        }
    };

    function Kt(b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return W({}, Lt, b, [])
    }

    var St = {"http://www.opengis.net/wfs": {PropertyName: V(Iq)}};

    function Tt(b, c) {
        var d = Np("http://www.opengis.net/ogc", "Filter"), e = Np("http://www.opengis.net/ogc", "FeatureId");
        d.appendChild(e);
        e.setAttribute("fid", c);
        b.appendChild(d)
    }

    var Ut = {
        "http://www.opengis.net/wfs": {
            Insert: V(function (b, c, d) {
                var e = d[d.length - 1], e = Np(x(e, "featureNS"), x(e, "featureType"));
                b.appendChild(e);
                X.prototype.hg(e, c, d)
            }), Update: V(function (b, c, d) {
                var e = d[d.length - 1], f = x(e, "featureType"), g = x(e, "featurePrefix"), g = m(g) ? g : "feature", h = x(e, "featureNS");
                b.setAttribute("typeName", g + ":" + f);
                gq(b, "http://www.w3.org/2000/xmlns/", "xmlns:" + g, h);
                f = c.X;
                if (m(f)) {
                    for (var g = c.I(), h = [], k = 0, n = g.length; k < n; k++) {
                        var p = c.get(g[k]);
                        m(p) && h.push({name: g[k], value: p})
                    }
                    uq({
                        node: b,
                        srsName: x(e, "srsName")
                    }, Ut, pq("Property"), h, d);
                    Tt(b, f)
                }
            }), Delete: V(function (b, c, d) {
                var e = d[d.length - 1];
                d = x(e, "featureType");
                var f = x(e, "featurePrefix"), f = m(f) ? f : "feature", e = x(e, "featureNS");
                b.setAttribute("typeName", f + ":" + d);
                gq(b, "http://www.w3.org/2000/xmlns/", "xmlns:" + f, e);
                c = c.X;
                m(c) && Tt(b, c)
            }), Property: V(function (b, c, d) {
                var e = Np("http://www.opengis.net/wfs", "Name");
                b.appendChild(e);
                Iq(e, c.name);
                null != c.value && (e = Np("http://www.opengis.net/wfs", "Value"), b.appendChild(e), c.value instanceof Kk ? X.prototype.Rd(e,
                    c.value, d) : Iq(e, c.value))
            }), Native: V(function (b, c) {
                m(c.yl) && b.setAttribute("vendorId", c.yl);
                m(c.al) && b.setAttribute("safeToIgnore", c.al);
                m(c.value) && Iq(b, c.value)
            })
        }
    }, Vt = {
        "http://www.opengis.net/wfs": {
            Query: V(function (b, c, d) {
                var e = d[d.length - 1], f = x(e, "featurePrefix"), g = x(e, "featureNS"), h = x(e, "propertyNames"), k = x(e, "srsName");
                b.setAttribute("typeName", (m(f) ? f + ":" : "") + c);
                m(k) && b.setAttribute("srsName", k);
                m(g) && gq(b, "http://www.w3.org/2000/xmlns/", "xmlns:" + f, g);
                c = Cb(e);
                c.node = b;
                uq(c, St, pq("PropertyName"),
                    h, d);
                e = x(e, "bbox");
                m(e) && (h = Np("http://www.opengis.net/ogc", "Filter"), c = x(d[d.length - 1], "geometryName"), f = Np("http://www.opengis.net/ogc", "BBOX"), h.appendChild(f), g = Np("http://www.opengis.net/ogc", "PropertyName"), Iq(g, c), f.appendChild(g), X.prototype.Rd(f, e, d), b.appendChild(h))
            })
        }
    };
    Jt.prototype.n = function (b) {
        var c = Np("http://www.opengis.net/wfs", "GetFeature");
        c.setAttribute("service", "WFS");
        c.setAttribute("version", "1.1.0");
        m(b) && (m(b.handle) && c.setAttribute("handle", b.handle), m(b.outputFormat) && c.setAttribute("outputFormat", b.outputFormat), m(b.maxFeatures) && c.setAttribute("maxFeatures", b.maxFeatures), m(b.resultType) && c.setAttribute("resultType", b.resultType), m(b.rl) && c.setAttribute("startIndex", b.rl), m(b.count) && c.setAttribute("count", b.count));
        gq(c, "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation", this.d);
        var d = b.featureTypes;
        b = [{
            node: c,
            srsName: b.srsName,
            featureNS: m(b.featureNS) ? b.featureNS : this.b,
            featurePrefix: b.featurePrefix,
            geometryName: b.geometryName,
            bbox: b.bbox,
            Mf: m(b.Mf) ? b.Mf : []
        }];
        var e = Cb(b[b.length - 1]);
        e.node = c;
        uq(e, Vt, pq("Query"), d, b);
        return c
    };
    Jt.prototype.j = function (b, c, d, e) {
        var f = [], g = Np("http://www.opengis.net/wfs", "Transaction");
        g.setAttribute("service", "WFS");
        g.setAttribute("version", "1.1.0");
        var h, k;
        m(e) && (h = m(e.gmlOptions) ? e.gmlOptions : {}, m(e.handle) && g.setAttribute("handle", e.handle));
        gq(g, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.d);
        null != b && (k = {
            node: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Eb(k, h), uq(k, Ut, pq("Insert"), b, f));
        null != c && (k = {
            node: g, featureNS: e.featureNS,
            featureType: e.featureType, featurePrefix: e.featurePrefix
        }, Eb(k, h), uq(k, Ut, pq("Update"), c, f));
        null != d && uq({
            node: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Ut, pq("Delete"), d, f);
        m(e.nativeElements) && uq({
            node: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Ut, pq("Native"), e.nativeElements, f);
        return g
    };
    Jt.prototype.Lc = function (b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return this.tc(b);
        return null
    };
    Jt.prototype.tc = function (b) {
        b = b.firstElementChild.firstElementChild;
        if (null != b)for (b = b.firstElementChild; null !== b; b = b.nextElementSibling)if (0 !== b.childNodes.length && (1 !== b.childNodes.length || 3 !== b.firstChild.nodeType)) {
            var c = [{}];
            this.c.Id(b, c);
            return Ee(c.pop().srsName)
        }
        return null
    };
    function Wt(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.a = m(b.splitCollection) ? b.splitCollection : !1
    }

    u(Wt, Dr);
    function Xt(b) {
        b = b.K();
        return 0 == b.length ? "" : b[0] + " " + b[1]
    }

    function Yt(b) {
        b = b.K();
        for (var c = [], d = 0, e = b.length; d < e; ++d)c.push(b[d][0] + " " + b[d][1]);
        return c.join(",")
    }

    function Zt(b) {
        var c = [];
        b = b.dd();
        for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Yt(b[d]) + ")");
        return c.join(",")
    }

    function $t(b) {
        var c = b.H();
        b = (0, au[c])(b);
        c = c.toUpperCase();
        return 0 === b.length ? c + " EMPTY" : c + "(" + b + ")"
    }

    var au = {
        Point: Xt, LineString: Yt, Polygon: Zt, MultiPoint: function (b) {
            var c = [];
            b = b.xd();
            for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Xt(b[d]) + ")");
            return c.join(",")
        }, MultiLineString: function (b) {
            var c = [];
            b = b.Ec();
            for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Yt(b[d]) + ")");
            return c.join(",")
        }, MultiPolygon: function (b) {
            var c = [];
            b = b.gd();
            for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Zt(b[d]) + ")");
            return c.join(",")
        }, GeometryCollection: function (b) {
            var c = [];
            b = b.af();
            for (var d = 0, e = b.length; d < e; ++d)c.push($t(b[d]));
            return c.join(",")
        }
    };
    l = Wt.prototype;
    l.Ic = function (b, c) {
        var d = this.Kc(b, c);
        if (m(d)) {
            var e = new R;
            e.Ma(d);
            return e
        }
        return null
    };
    l.ze = function (b, c) {
        var d = [], e = this.Kc(b, c);
        this.a && "GeometryCollection" == e.H() ? d = e.d : d = [e];
        for (var f = [], g = 0, h = d.length; g < h; ++g)e = new R, e.Ma(d[g]), f.push(e);
        return f
    };
    l.Kc = function (b, c) {
        var d;
        d = new bu(new cu(b));
        d.a = du(d.c);
        d = eu(d);
        return m(d) ? wp(d, !1, c) : null
    };
    l.Ce = function () {
        return null
    };
    l.Qd = function (b, c) {
        var d = b.N();
        return m(d) ? this.Rc(d, c) : ""
    };
    l.ig = function (b, c) {
        if (1 == b.length)return this.Qd(b[0], c);
        for (var d = [], e = 0, f = b.length; e < f; ++e)d.push(b[e].N());
        d = new hn(d);
        return this.Rc(d, c)
    };
    l.Rc = function (b, c) {
        return $t(wp(b, !0, c))
    };
    function cu(b) {
        this.c = b;
        this.a = -1
    }

    function fu(b, c) {
        var d = m(c) ? c : !1;
        return "0" <= b && "9" >= b || "." == b && !d
    }

    function du(b) {
        var c = b.c.charAt(++b.a), d = {position: b.a, value: c};
        if ("(" == c)d.type = 2; else if ("," == c)d.type = 5; else if (")" == c)d.type = 3; else if (fu(c) || "-" == c) {
            d.type = 4;
            var e, c = b.a, f = !1;
            do"." == e && (f = !0), e = b.c.charAt(++b.a); while (fu(e, f));
            b = parseFloat(b.c.substring(c, b.a--));
            d.value = b
        } else if ("a" <= c && "z" >= c || "A" <= c && "Z" >= c) {
            d.type = 1;
            c = b.a;
            do e = b.c.charAt(++b.a); while ("a" <= e && "z" >= e || "A" <= e && "Z" >= e);
            b = b.c.substring(c, b.a--).toUpperCase();
            d.value = b
        } else {
            if (" " == c || "\t" == c || "\r" == c || "\n" == c)return du(b);
            if ("" ===
                c)d.type = 6; else throw Error("Unexpected character: " + c);
        }
        return d
    }

    function bu(b) {
        this.c = b
    }

    l = bu.prototype;
    l.match = function (b) {
        if (b = this.a.type == b)this.a = du(this.c);
        return b
    };
    function eu(b) {
        var c = b.a;
        if (b.match(1)) {
            var d = c.value;
            if ("GEOMETRYCOLLECTION" == d) {
                a:{
                    if (b.match(2)) {
                        c = [];
                        do c.push(eu(b)); while (b.match(5));
                        if (b.match(3)) {
                            b = c;
                            break a
                        }
                    } else if (gu(b)) {
                        b = [];
                        break a
                    }
                    throw Error(hu(b));
                }
                return new hn(b)
            }
            var e = iu[d], c = ju[d];
            if (!m(e) || !m(c))throw Error("Invalid geometry type: " + d);
            b = e.call(b);
            return new c(b)
        }
        throw Error(hu(b));
    }

    l.we = function () {
        if (this.match(2)) {
            var b = ku(this);
            if (this.match(3))return b
        } else if (gu(this))return null;
        throw Error(hu(this));
    };
    l.ve = function () {
        if (this.match(2)) {
            var b = lu(this);
            if (this.match(3))return b
        } else if (gu(this))return [];
        throw Error(hu(this));
    };
    l.xe = function () {
        if (this.match(2)) {
            var b = mu(this);
            if (this.match(3))return b
        } else if (gu(this))return [];
        throw Error(hu(this));
    };
    l.wk = function () {
        if (this.match(2)) {
            var b;
            if (2 == this.a.type)for (b = [this.we()]; this.match(5);)b.push(this.we()); else b = lu(this);
            if (this.match(3))return b
        } else if (gu(this))return [];
        throw Error(hu(this));
    };
    l.vk = function () {
        if (this.match(2)) {
            var b = mu(this);
            if (this.match(3))return b
        } else if (gu(this))return [];
        throw Error(hu(this));
    };
    l.xk = function () {
        if (this.match(2)) {
            for (var b = [this.xe()]; this.match(5);)b.push(this.xe());
            if (this.match(3))return b
        } else if (gu(this))return [];
        throw Error(hu(this));
    };
    function ku(b) {
        for (var c = [], d = 0; 2 > d; ++d) {
            var e = b.a;
            if (b.match(4))c.push(e.value); else break
        }
        if (2 == c.length)return c;
        throw Error(hu(b));
    }

    function lu(b) {
        for (var c = [ku(b)]; b.match(5);)c.push(ku(b));
        return c
    }

    function mu(b) {
        for (var c = [b.ve()]; b.match(5);)c.push(b.ve());
        return c
    }

    function gu(b) {
        var c = 1 == b.a.type && "EMPTY" == b.a.value;
        c && (b.a = du(b.c));
        return c
    }

    function hu(b) {
        return "Unexpected `" + b.a.value + "` at position " + b.a.position + " in `" + b.c.c + "`"
    }

    var ju = {
        POINT: hl,
        LINESTRING: M,
        POLYGON: H,
        MULTIPOINT: tn,
        MULTILINESTRING: qn,
        MULTIPOLYGON: un
    }, iu = {
        POINT: bu.prototype.we,
        LINESTRING: bu.prototype.ve,
        POLYGON: bu.prototype.xe,
        MULTIPOINT: bu.prototype.wk,
        MULTILINESTRING: bu.prototype.vk,
        MULTIPOLYGON: bu.prototype.xk
    };

    function nu() {
        this.version = void 0
    }

    u(nu, ut);
    function vt(b, c) {
        for (var d = c.firstChild; null !== d; d = d.nextSibling)if (1 == d.nodeType)return wt(b, d);
        return null
    }

    function wt(b, c) {
        b.version = Aa(c.getAttribute("version"));
        var d = W({version: b.version}, ou, c, []);
        return m(d) ? d : null
    }

    function pu(b, c) {
        return W({}, qu, b, c)
    }

    function ru(b, c) {
        return W({}, su, b, c)
    }

    function tu(b, c) {
        var d = pu(b, c);
        if (m(d)) {
            var e = [Fq(b.getAttribute("width")), Fq(b.getAttribute("height"))];
            d.size = e;
            return d
        }
    }

    function uu(b, c) {
        return W([], vu, b, c)
    }

    var wu = [null, "http://www.opengis.net/wms"], ou = mq(wu, {
            Service: S(function (b, c) {
                return W({}, xu, b, c)
            }), Capability: S(function (b, c) {
                return W({}, yu, b, c)
            })
        }), yu = mq(wu, {
            Request: S(function (b, c) {
                return W({}, zu, b, c)
            }), Exception: S(function (b, c) {
                return W([], Au, b, c)
            }), Layer: S(function (b, c) {
                return W({}, Bu, b, c)
            })
        }), xu = mq(wu, {
            Name: S(Gq),
            Title: S(Gq),
            Abstract: S(Gq),
            KeywordList: S(uu),
            OnlineResource: S(tt),
            ContactInformation: S(function (b, c) {
                return W({}, Cu, b, c)
            }),
            Fees: S(Gq),
            AccessConstraints: S(Gq),
            LayerLimit: S(Eq),
            MaxWidth: S(Eq),
            MaxHeight: S(Eq)
        }), Cu = mq(wu, {
            ContactPersonPrimary: S(function (b, c) {
                return W({}, Du, b, c)
            }), ContactPosition: S(Gq), ContactAddress: S(function (b, c) {
                return W({}, Eu, b, c)
            }), ContactVoiceTelephone: S(Gq), ContactFacsimileTelephone: S(Gq), ContactElectronicMailAddress: S(Gq)
        }), Du = mq(wu, {ContactPerson: S(Gq), ContactOrganization: S(Gq)}), Eu = mq(wu, {
            AddressType: S(Gq),
            Address: S(Gq),
            City: S(Gq),
            StateOrProvince: S(Gq),
            PostCode: S(Gq),
            Country: S(Gq)
        }), Au = mq(wu, {Format: jq(Gq)}), Bu = mq(wu, {
            Name: S(Gq), Title: S(Gq), Abstract: S(Gq), KeywordList: S(uu),
            CRS: lq(Gq), EX_GeographicBoundingBox: S(function (b, c) {
                var d = W({}, Fu, b, c);
                if (m(d)) {
                    var e = x(d, "westBoundLongitude"), f = x(d, "southBoundLatitude"), g = x(d, "eastBoundLongitude"), d = x(d, "northBoundLatitude");
                    return m(e) && m(f) && m(g) && m(d) ? [e, f, g, d] : void 0
                }
            }), BoundingBox: lq(function (b) {
                var c = [Dq(b.getAttribute("minx")), Dq(b.getAttribute("miny")), Dq(b.getAttribute("maxx")), Dq(b.getAttribute("maxy"))], d = [Dq(b.getAttribute("resx")), Dq(b.getAttribute("resy"))];
                return {crs: b.getAttribute("CRS"), extent: c, res: d}
            }), Dimension: lq(function (b) {
                return {
                    name: b.getAttribute("name"),
                    units: b.getAttribute("units"),
                    unitSymbol: b.getAttribute("unitSymbol"),
                    "default": b.getAttribute("default"),
                    multipleValues: Aq(b.getAttribute("multipleValues")),
                    nearestValue: Aq(b.getAttribute("nearestValue")),
                    current: Aq(b.getAttribute("current")),
                    values: Gq(b)
                }
            }), Attribution: S(function (b, c) {
                return W({}, Gu, b, c)
            }), AuthorityURL: lq(function (b, c) {
                var d = pu(b, c);
                if (m(d)) {
                    var e = b.getAttribute("name");
                    d.name = e;
                    return d
                }
            }), Identifier: lq(Gq), MetadataURL: lq(function (b, c) {
                var d = pu(b, c);
                if (m(d)) {
                    var e = b.getAttribute("type");
                    d.type = e;
                    return d
                }
            }), DataURL: lq(pu), FeatureListURL: lq(pu), Style: lq(function (b, c) {
                return W({}, Hu, b, c)
            }), MinScaleDenominator: S(Cq), MaxScaleDenominator: S(Cq), Layer: lq(function (b, c) {
                var d = c[c.length - 1], e = W({}, Bu, b, c);
                if (m(e)) {
                    var f = Aq(b.getAttribute("queryable"));
                    m(f) || (f = x(d, "queryable"));
                    e.queryable = m(f) ? f : !1;
                    f = Fq(b.getAttribute("cascaded"));
                    m(f) || (f = x(d, "cascaded"));
                    e.cascaded = f;
                    f = Aq(b.getAttribute("opaque"));
                    m(f) || (f = x(d, "opaque"));
                    e.opaque = m(f) ? f : !1;
                    f = Aq(b.getAttribute("noSubsets"));
                    m(f) || (f = x(d,
                        "noSubsets"));
                    e.noSubsets = m(f) ? f : !1;
                    f = Dq(b.getAttribute("fixedWidth"));
                    m(f) || (f = x(d, "fixedWidth"));
                    e.fixedWidth = f;
                    f = Dq(b.getAttribute("fixedHeight"));
                    m(f) || (f = x(d, "fixedHeight"));
                    e.fixedHeight = f;
                    Ta(["Style", "CRS", "AuthorityURL"], function (b) {
                        var c = x(d, b);
                        if (m(c)) {
                            var f = Bb(e, b), f = f.concat(c);
                            e[b] = f
                        }
                    });
                    Ta("EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" "), function (b) {
                        m(x(e, b)) || (e[b] = x(d, b))
                    });
                    return e
                }
            })
        }), Gu = mq(wu, {
            Title: S(Gq), OnlineResource: S(tt),
            LogoURL: S(tu)
        }), Fu = mq(wu, {
            westBoundLongitude: S(Cq),
            eastBoundLongitude: S(Cq),
            southBoundLatitude: S(Cq),
            northBoundLatitude: S(Cq)
        }), zu = mq(wu, {GetCapabilities: S(ru), GetMap: S(ru), GetFeatureInfo: S(ru)}), su = mq(wu, {
            Format: lq(Gq),
            DCPType: lq(function (b, c) {
                return W({}, Iu, b, c)
            })
        }), Iu = mq(wu, {
            HTTP: S(function (b, c) {
                return W({}, Ju, b, c)
            })
        }), Ju = mq(wu, {Get: S(pu), Post: S(pu)}), Hu = mq(wu, {
            Name: S(Gq),
            Title: S(Gq),
            Abstract: S(Gq),
            LegendURL: lq(tu),
            StyleSheetURL: S(pu),
            StyleURL: S(pu)
        }), qu = mq(wu, {Format: S(Gq), OnlineResource: S(tt)}),
        vu = mq(wu, {Keyword: jq(Gq)});

    function Ku() {
        this.b = "http://mapserver.gis.umn.edu/mapserver";
        this.c = new Tq;
        this.defaultDataProjection = null
    }

    u(Ku, vq);
    function Lu(b, c, d) {
        c.namespaceURI = b.b;
        var e = Sp(c), f = [];
        if (0 === c.childNodes.length)return f;
        "msGMLOutput" == e && Ta(c.childNodes, function (b) {
            if (1 === b.nodeType) {
                var c = d[0], e = b.localName, n = new RegExp(Ja("_layer"), ""), e = e.replace(n, "") + "_feature";
                c.featureType = e;
                c.featureNS = this.b;
                n = {};
                n[e] = jq(this.c.ye, this.c);
                c = mq([x(c, "featureNS"), null], n);
                b.namespaceURI = this.b;
                b = W([], c, b, d, this.c);
                m(b) && db(f, b)
            }
        }, b);
        "FeatureCollection" == e && (b = W([], b.c.Td, c, [{}], b.c), m(b) && (f = b));
        return f
    }

    Ku.prototype.Ob = function (b, c) {
        var d = {featureType: this.featureType, featureNS: this.featureNS};
        m(c) && Eb(d, up(this, b, c));
        return Lu(this, b, [d])
    };
    var Mu = new xe(6378137);

    function Z(b) {
        td.call(this);
        b = m(b) ? b : {};
        this.a = null;
        this.e = We;
        this.d = void 0;
        z(this, xd("projection"), this.Ui, !1, this);
        z(this, xd("tracking"), this.Vi, !1, this);
        m(b.projection) && this.n(Ee(b.projection));
        m(b.trackingOptions) && this.j(b.trackingOptions);
        this.b(m(b.tracking) ? b.tracking : !1)
    }

    u(Z, td);
    l = Z.prototype;
    l.M = function () {
        this.b(!1);
        Z.S.M.call(this)
    };
    l.Ui = function () {
        var b = this.g();
        null != b && (this.e = De(Ee("EPSG:4326"), b), null === this.a || this.set("position", this.e(this.a)))
    };
    l.Vi = function () {
        if (fg) {
            var b = this.i();
            b && !m(this.d) ? this.d = ba.navigator.geolocation.watchPosition(sa(this.Ek, this), sa(this.Fk, this), this.f()) : !b && m(this.d) && (ba.navigator.geolocation.clearWatch(this.d), this.d = void 0)
        }
    };
    l.Ek = function (b) {
        b = b.coords;
        this.set("accuracy", b.accuracy);
        this.set("altitude", null === b.altitude ? void 0 : b.altitude);
        this.set("altitudeAccuracy", null === b.altitudeAccuracy ? void 0 : b.altitudeAccuracy);
        this.set("heading", null === b.heading ? void 0 : bc(b.heading));
        null === this.a ? this.a = [b.longitude, b.latitude] : (this.a[0] = b.longitude, this.a[1] = b.latitude);
        var c = this.e(this.a);
        this.set("position", c);
        this.set("speed", null === b.speed ? void 0 : b.speed);
        b = xl(Mu, this.a, b.accuracy);
        b.ma(this.e);
        this.set("accuracyGeometry",
            b);
        this.l()
    };
    l.Fk = function (b) {
        b.type = "error";
        this.b(!1);
        this.dispatchEvent(b)
    };
    l.$e = function () {
        return this.get("accuracy")
    };
    Z.prototype.getAccuracy = Z.prototype.$e;
    Z.prototype.p = function () {
        return this.get("accuracyGeometry") || null
    };
    Z.prototype.getAccuracyGeometry = Z.prototype.p;
    Z.prototype.q = function () {
        return this.get("altitude")
    };
    Z.prototype.getAltitude = Z.prototype.q;
    Z.prototype.r = function () {
        return this.get("altitudeAccuracy")
    };
    Z.prototype.getAltitudeAccuracy = Z.prototype.r;
    Z.prototype.F = function () {
        return this.get("heading")
    };
    Z.prototype.getHeading = Z.prototype.F;
    Z.prototype.J = function () {
        return this.get("position")
    };
    Z.prototype.getPosition = Z.prototype.J;
    Z.prototype.g = function () {
        return this.get("projection")
    };
    Z.prototype.getProjection = Z.prototype.g;
    Z.prototype.t = function () {
        return this.get("speed")
    };
    Z.prototype.getSpeed = Z.prototype.t;
    Z.prototype.i = function () {
        return this.get("tracking")
    };
    Z.prototype.getTracking = Z.prototype.i;
    Z.prototype.f = function () {
        return this.get("trackingOptions")
    };
    Z.prototype.getTrackingOptions = Z.prototype.f;
    Z.prototype.n = function (b) {
        this.set("projection", b)
    };
    Z.prototype.setProjection = Z.prototype.n;
    Z.prototype.b = function (b) {
        this.set("tracking", b)
    };
    Z.prototype.setTracking = Z.prototype.b;
    Z.prototype.j = function (b) {
        this.set("trackingOptions", b)
    };
    Z.prototype.setTrackingOptions = Z.prototype.j;
    function Nu(b, c, d) {
        for (var e = [], f = b(0), g = b(1), h = c(f), k = c(g), n = [g, f], p = [k, h], q = [1, 0], r = {}, s = 1E5, v, y, C, F, G; 0 < --s && 0 < q.length;)C = q.pop(), f = n.pop(), h = p.pop(), g = C.toString(), g in r || (e.push(h[0], h[1]), r[g] = !0), F = q.pop(), g = n.pop(), k = p.pop(), G = (C + F) / 2, v = b(G), y = c(v), Sk(y[0], y[1], h[0], h[1], k[0], k[1]) < d ? (e.push(k[0], k[1]), g = F.toString(), r[g] = !0) : (q.push(F, G, G, C), p.push(k, y, y, h), n.push(g, v, v, f));
        return e
    }

    function Ou(b, c, d, e, f) {
        var g = Ee("EPSG:4326");
        return Nu(function (e) {
            return [b, c + (d - c) * e]
        }, Ve(g, e), f)
    }

    function Pu(b, c, d, e, f) {
        var g = Ee("EPSG:4326");
        return Nu(function (e) {
            return [c + (d - c) * e, b]
        }, Ve(g, e), f)
    };
    function Qu(b) {
        b = m(b) ? b : {};
        this.o = this.g = null;
        this.d = this.b = Infinity;
        this.f = this.e = -Infinity;
        this.r = m(b.targetSize) ? b.targetSize : 100;
        this.p = m(b.maxLines) ? b.maxLines : 100;
        this.a = [];
        this.c = [];
        this.q = m(b.strokeStyle) ? b.strokeStyle : Ru;
        this.j = this.i = void 0;
        this.n = null;
        this.setMap(m(b.map) ? b.map : null)
    }

    var Ru = new Ll({color: "rgba(0,0,0,0.2)"}), Su = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001];

    function Tu(b, c, d, e, f) {
        var g = f;
        c = Ou(c, b.e, b.b, b.o, d);
        g = m(b.a[g]) ? b.a[g] : new M(null);
        pn(g, "XY", c);
        qe(g.D(), e) && (b.a[f++] = g);
        return f
    }

    function Uu(b, c, d, e, f) {
        var g = f;
        c = Pu(c, b.f, b.d, b.o, d);
        g = m(b.c[g]) ? b.c[g] : new M(null);
        pn(g, "XY", c);
        qe(g.D(), e) && (b.c[f++] = g);
        return f
    }

    l = Qu.prototype;
    l.Wi = function () {
        return this.g
    };
    l.wh = function () {
        return this.a
    };
    l.Bh = function () {
        return this.c
    };
    l.jf = function (b) {
        var c = b.vectorContext, d = b.frameState;
        b = d.extent;
        var e = d.viewState, f = e.center, g = e.projection, e = e.resolution, d = d.pixelRatio, d = e * e / (4 * d * d);
        if (null === this.o || !Ue(this.o, g)) {
            var h = g.D(), k = g.d, n = k[2], p = k[1], q = k[0];
            this.b = k[3];
            this.d = n;
            this.e = p;
            this.f = q;
            k = Ee("EPSG:4326");
            this.i = Ve(k, g);
            this.j = Ve(g, k);
            this.n = this.j(ke(h));
            this.o = g
        }
        for (var g = this.n[0], h = this.n[1], k = -1, r, p = Math.pow(this.r * e, 2), q = [], s = [], e = 0, n = Su.length; e < n; ++e) {
            r = Su[e] / 2;
            q[0] = g - r;
            q[1] = h - r;
            s[0] = g + r;
            s[1] = h + r;
            this.i(q, q);
            this.i(s,
                s);
            r = Math.pow(s[0] - q[0], 2) + Math.pow(s[1] - q[1], 2);
            if (r <= p)break;
            k = Su[e]
        }
        e = k;
        if (-1 == e)this.a.length = this.c.length = 0; else {
            g = this.j(f);
            f = g[0];
            g = g[1];
            h = this.p;
            f = Math.floor(f / e) * e;
            p = Yb(f, this.f, this.d);
            n = Tu(this, p, d, b, 0);
            for (k = 0; p != this.f && k++ < h;)p = Math.max(p - e, this.f), n = Tu(this, p, d, b, n);
            p = Yb(f, this.f, this.d);
            for (k = 0; p != this.d && k++ < h;)p = Math.min(p + e, this.d), n = Tu(this, p, d, b, n);
            this.a.length = n;
            g = Math.floor(g / e) * e;
            f = Yb(g, this.e, this.b);
            n = Uu(this, f, d, b, 0);
            for (k = 0; f != this.e && k++ < h;)f = Math.max(f - e, this.e), n =
                Uu(this, f, d, b, n);
            f = Yb(g, this.e, this.b);
            for (k = 0; f != this.b && k++ < h;)f = Math.min(f + e, this.b), n = Uu(this, f, d, b, n);
            this.c.length = n
        }
        c.wa(null, this.q);
        b = 0;
        for (d = this.a.length; b < d; ++b)f = this.a[b], c.Cb(f, null);
        b = 0;
        for (d = this.c.length; b < d; ++b)f = this.c[b], c.Cb(f, null)
    };
    l.setMap = function (b) {
        null !== this.g && (this.g.v("postcompose", this.jf, this), this.g.render());
        null !== b && (b.u("postcompose", this.jf, this), b.render());
        this.g = b
    };
    function Vu(b, c, d, e, f, g, h) {
        tj.call(this, b, c, d, 0, e);
        this.o = f;
        this.a = new Image;
        null !== g && (this.a.crossOrigin = g);
        this.d = {};
        this.b = null;
        this.state = 0;
        this.g = h
    }

    u(Vu, tj);
    Vu.prototype.c = function (b) {
        if (m(b)) {
            var c = ma(b);
            if (c in this.d)return this.d[c];
            b = xb(this.d) ? this.a : this.a.cloneNode(!1);
            return this.d[c] = b
        }
        return this.a
    };
    Vu.prototype.i = function () {
        this.state = 3;
        Ta(this.b, Yc);
        this.b = null;
        this.dispatchEvent("change")
    };
    Vu.prototype.n = function () {
        m(this.resolution) || (this.resolution = oe(this.extent) / this.a.height);
        this.state = 2;
        Ta(this.b, Yc);
        this.b = null;
        this.dispatchEvent("change")
    };
    Vu.prototype.load = function () {
        0 == this.state && (this.state = 1, this.b = [Wc(this.a, "error", this.i, !1, this), Wc(this.a, "load", this.n, !1, this)], this.g(this, this.o))
    };
    function Wu(b, c, d, e, f) {
        tj.call(this, b, c, d, 2, e);
        this.a = f
    }

    u(Wu, tj);
    Wu.prototype.c = function () {
        return this.a
    };
    function Xu(b, c, d, e, f) {
        uj.call(this, b, c);
        this.g = d;
        this.c = new Image;
        null !== e && (this.c.crossOrigin = e);
        this.d = {};
        this.b = null;
        this.o = f
    }

    u(Xu, uj);
    l = Xu.prototype;
    l.Na = function (b) {
        if (m(b)) {
            var c = ma(b);
            if (c in this.d)return this.d[c];
            b = xb(this.d) ? this.c : this.c.cloneNode(!1);
            return this.d[c] = b
        }
        return this.c
    };
    l.mb = function () {
        return this.g
    };
    l.Xi = function () {
        this.state = 3;
        Ta(this.b, Yc);
        this.b = null;
        vj(this)
    };
    l.Yi = function () {
        this.state = this.c.naturalWidth && this.c.naturalHeight ? 2 : 4;
        Ta(this.b, Yc);
        this.b = null;
        vj(this)
    };
    l.load = function () {
        0 == this.state && (this.state = 1, this.b = [Wc(this.c, "error", this.Xi, !1, this), Wc(this.c, "load", this.Yi, !1, this)], this.o(this, this.g))
    };
    function Yu(b, c, d) {
        return function (e, f, g) {
            return d(b, c, e, f, g)
        }
    }

    function Zu() {
    };
    function $u(b, c) {
        jd.call(this);
        this.a = new $o(this);
        var d = b;
        c && (d = zf(b));
        this.a.La(d, "dragenter", this.nk);
        d != b && this.a.La(d, "dragover", this.ok);
        this.a.La(b, "dragover", this.pk);
        this.a.La(b, "drop", this.qk)
    }

    u($u, jd);
    l = $u.prototype;
    l.Dc = !1;
    l.M = function () {
        $u.S.M.call(this);
        this.a.hc()
    };
    l.nk = function (b) {
        var c = b.a.dataTransfer;
        (this.Dc = !(!c || !(c.types && (Za(c.types, "Files") || Za(c.types, "public.file-url")) || c.files && 0 < c.files.length))) && b.preventDefault()
    };
    l.ok = function (b) {
        this.Dc && (b.preventDefault(), b.a.dataTransfer.dropEffect = "none")
    };
    l.pk = function (b) {
        this.Dc && (b.preventDefault(), b.lb(), b = b.a.dataTransfer, b.effectAllowed = "all", b.dropEffect = "copy")
    };
    l.qk = function (b) {
        this.Dc && (b.preventDefault(), b.lb(), b = new zc(b.a), b.type = "drop", this.dispatchEvent(b))
    };
    function av(b) {
        b.prototype.then = b.prototype.then;
        b.prototype.$goog_Thenable = !0
    }

    function bv(b) {
        if (!b)return !1;
        try {
            return !!b.$goog_Thenable
        } catch (c) {
            return !1
        }
    };
    function cv(b, c) {
        dv || ev();
        fv || (dv(), fv = !0);
        gv.push(new hv(b, c))
    }

    var dv;

    function ev() {
        if (ba.Promise && ba.Promise.resolve) {
            var b = ba.Promise.resolve();
            dv = function () {
                b.then(iv)
            }
        } else dv = function () {
            $h(iv)
        }
    }

    var fv = !1, gv = [];

    function iv() {
        for (; gv.length;) {
            var b = gv;
            gv = [];
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    d.a.call(d.c)
                } catch (e) {
                    Zh(e)
                }
            }
        }
        fv = !1
    }

    function hv(b, c) {
        this.a = b;
        this.c = c
    };
    function jv(b, c) {
        this.c = kv;
        this.f = void 0;
        this.a = this.b = null;
        this.d = this.e = !1;
        try {
            var d = this;
            b.call(c, function (b) {
                lv(d, mv, b)
            }, function (b) {
                lv(d, nv, b)
            })
        } catch (e) {
            lv(this, nv, e)
        }
    }

    var kv = 0, mv = 2, nv = 3;
    jv.prototype.then = function (b, c, d) {
        return ov(this, ka(b) ? b : null, ka(c) ? c : null, d)
    };
    av(jv);
    jv.prototype.cancel = function (b) {
        this.c == kv && cv(function () {
            var c = new pv(b);
            qv(this, c)
        }, this)
    };
    function qv(b, c) {
        if (b.c == kv)if (b.b) {
            var d = b.b;
            if (d.a) {
                for (var e = 0, f = -1, g = 0, h; h = d.a[g]; g++)if (h = h.wc)if (e++, h == b && (f = g), 0 <= f && 1 < e)break;
                0 <= f && (d.c == kv && 1 == e ? qv(d, c) : (e = d.a.splice(f, 1)[0], rv(d, e, nv, c)))
            }
        } else lv(b, nv, c)
    }

    function sv(b, c) {
        b.a && b.a.length || b.c != mv && b.c != nv || tv(b);
        b.a || (b.a = []);
        b.a.push(c)
    }

    function ov(b, c, d, e) {
        var f = {wc: null, Gf: null, If: null};
        f.wc = new jv(function (b, h) {
            f.Gf = c ? function (d) {
                try {
                    var f = c.call(e, d);
                    b(f)
                } catch (p) {
                    h(p)
                }
            } : b;
            f.If = d ? function (c) {
                try {
                    var f = d.call(e, c);
                    !m(f) && c instanceof pv ? h(c) : b(f)
                } catch (p) {
                    h(p)
                }
            } : h
        });
        f.wc.b = b;
        sv(b, f);
        return f.wc
    }

    jv.prototype.g = function (b) {
        this.c = kv;
        lv(this, mv, b)
    };
    jv.prototype.o = function (b) {
        this.c = kv;
        lv(this, nv, b)
    };
    function lv(b, c, d) {
        if (b.c == kv) {
            if (b == d)c = nv, d = new TypeError("Promise cannot resolve to itself"); else {
                if (bv(d)) {
                    b.c = 1;
                    d.then(b.g, b.o, b);
                    return
                }
                if (la(d))try {
                    var e = d.then;
                    if (ka(e)) {
                        uv(b, d, e);
                        return
                    }
                } catch (f) {
                    c = nv, d = f
                }
            }
            b.f = d;
            b.c = c;
            tv(b);
            c != nv || d instanceof pv || vv(b, d)
        }
    }

    function uv(b, c, d) {
        function e(c) {
            g || (g = !0, b.o(c))
        }

        function f(c) {
            g || (g = !0, b.g(c))
        }

        b.c = 1;
        var g = !1;
        try {
            d.call(c, f, e)
        } catch (h) {
            e(h)
        }
    }

    function tv(b) {
        b.e || (b.e = !0, cv(b.i, b))
    }

    jv.prototype.i = function () {
        for (; this.a && this.a.length;) {
            var b = this.a;
            this.a = [];
            for (var c = 0; c < b.length; c++)rv(this, b[c], this.c, this.f)
        }
        this.e = !1
    };
    function rv(b, c, d, e) {
        if (d == mv)c.Gf(e); else {
            if (c.wc)for (; b && b.d; b = b.b)b.d = !1;
            c.If(e)
        }
    }

    function vv(b, c) {
        b.d = !0;
        cv(function () {
            b.d && wv.call(null, c)
        })
    }

    var wv = Zh;

    function pv(b) {
        xa.call(this, b)
    }

    u(pv, xa);
    pv.prototype.name = "cancel";
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
     */
    function xv(b, c) {
        this.e = [];
        this.p = b;
        this.j = c || null;
        this.d = this.a = !1;
        this.b = void 0;
        this.i = this.q = this.g = !1;
        this.f = 0;
        this.c = null;
        this.o = 0
    }

    xv.prototype.cancel = function (b) {
        if (this.a)this.b instanceof xv && this.b.cancel(); else {
            if (this.c) {
                var c = this.c;
                delete this.c;
                b ? c.cancel(b) : (c.o--, 0 >= c.o && c.cancel())
            }
            this.p ? this.p.call(this.j, this) : this.i = !0;
            this.a || (b = new yv, zv(this), Av(this, !1, b))
        }
    };
    xv.prototype.n = function (b, c) {
        this.g = !1;
        Av(this, b, c)
    };
    function Av(b, c, d) {
        b.a = !0;
        b.b = d;
        b.d = !c;
        Bv(b)
    }

    function zv(b) {
        if (b.a) {
            if (!b.i)throw new Cv;
            b.i = !1
        }
    }

    function Dv(b, c, d, e) {
        b.e.push([c, d, e]);
        b.a && Bv(b)
    }

    xv.prototype.then = function (b, c, d) {
        var e, f, g = new jv(function (b, c) {
            e = b;
            f = c
        });
        Dv(this, e, function (b) {
            b instanceof yv ? g.cancel() : f(b)
        });
        return g.then(b, c, d)
    };
    av(xv);
    function Ev(b) {
        return Wa(b.e, function (b) {
            return ka(b[1])
        })
    }

    function Bv(b) {
        if (b.f && b.a && Ev(b)) {
            var c = b.f, d = Fv[c];
            d && (ba.clearTimeout(d.X), delete Fv[c]);
            b.f = 0
        }
        b.c && (b.c.o--, delete b.c);
        for (var c = b.b, e = d = !1; b.e.length && !b.g;) {
            var f = b.e.shift(), g = f[0], h = f[1], f = f[2];
            if (g = b.d ? h : g)try {
                var k = g.call(f || b.j, c);
                m(k) && (b.d = b.d && (k == c || k instanceof Error), b.b = c = k);
                bv(c) && (e = !0, b.g = !0)
            } catch (n) {
                c = n, b.d = !0, Ev(b) || (d = !0)
            }
        }
        b.b = c;
        e && (k = sa(b.n, b, !0), e = sa(b.n, b, !1), c instanceof xv ? (Dv(c, k, e), c.q = !0) : c.then(k, e));
        d && (c = new Gv(c), Fv[c.X] = c, b.f = c.X)
    }

    function Cv() {
        xa.call(this)
    }

    u(Cv, xa);
    Cv.prototype.message = "Deferred has already fired";
    Cv.prototype.name = "AlreadyCalledError";
    function yv() {
        xa.call(this)
    }

    u(yv, xa);
    yv.prototype.message = "Deferred was canceled";
    yv.prototype.name = "CanceledError";
    function Gv(b) {
        this.X = ba.setTimeout(sa(this.c, this), 0);
        this.a = b
    }

    Gv.prototype.c = function () {
        delete Fv[this.X];
        throw this.a;
    };
    var Fv = {};

    function Hv(b, c) {
        m(b.name) ? (this.name = b.name, this.code = wb[b.name]) : (this.code = b.code, this.name = Iv(b.code));
        xa.call(this, za("%s %s", this.name, c))
    }

    u(Hv, xa);
    function Iv(b) {
        var c = ub(function (c) {
            return b == c
        });
        if (!m(c))throw Error("Invalid code: " + b);
        return c
    }

    var wb = {
        AbortError: 3,
        EncodingError: 5,
        InvalidModificationError: 9,
        InvalidStateError: 7,
        NotFoundError: 1,
        NotReadableError: 4,
        NoModificationAllowedError: 6,
        PathExistsError: 12,
        QuotaExceededError: 10,
        SecurityError: 2,
        SyntaxError: 8,
        TypeMismatchError: 11
    };

    function Jv(b, c) {
        uc.call(this, b.type, c)
    }

    u(Jv, uc);
    function Kv() {
        jd.call(this);
        this.bb = new FileReader;
        this.bb.onloadstart = sa(this.a, this);
        this.bb.onprogress = sa(this.a, this);
        this.bb.onload = sa(this.a, this);
        this.bb.onabort = sa(this.a, this);
        this.bb.onerror = sa(this.a, this);
        this.bb.onloadend = sa(this.a, this)
    }

    u(Kv, jd);
    Kv.prototype.getError = function () {
        return this.bb.error && new Hv(this.bb.error, "reading file")
    };
    Kv.prototype.a = function (b) {
        this.dispatchEvent(new Jv(b, this))
    };
    Kv.prototype.M = function () {
        Kv.S.M.call(this);
        delete this.bb
    };
    function Lv(b) {
        var c = new xv;
        b.La("loadend", ta(function (b, c) {
            var f = c.bb.result, g = c.getError();
            null == f || g ? (zv(b), Av(b, !1, g)) : (zv(b), Av(b, !0, f));
            c.hc()
        }, c, b));
        return c
    };
    function Mv(b) {
        b = m(b) ? b : {};
        mk.call(this, {handleEvent: dd});
        this.f = m(b.formatConstructors) ? b.formatConstructors : [];
        this.j = m(b.projection) ? Ee(b.projection) : null;
        this.e = null;
        this.d = void 0
    }

    u(Mv, mk);
    Mv.prototype.M = function () {
        m(this.d) && Yc(this.d);
        Mv.S.M.call(this)
    };
    Mv.prototype.g = function (b) {
        b = b.a.dataTransfer.files;
        var c, d, e;
        c = 0;
        for (d = b.length; c < d; ++c) {
            var f = e = b[c], g = new Kv, h = Lv(g);
            g.bb.readAsText(f, "");
            Dv(h, ta(this.i, e), null, this)
        }
    };
    Mv.prototype.i = function (b, c) {
        var d = this.n, e = this.j;
        null === e && (e = d.a().q);
        var d = this.f, f = [], g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = new d[g], n;
            try {
                n = k.ja(c)
            } catch (p) {
                n = null
            }
            if (null !== n) {
                var k = k.Ba(c), k = Ve(k, e), q, r;
                q = 0;
                for (r = n.length; q < r; ++q) {
                    var s = n[q], v = s.N();
                    null != v && v.ma(k);
                    f.push(s)
                }
            }
        }
        this.dispatchEvent(new Nv(Ov, this, b, f, e))
    };
    Mv.prototype.setMap = function (b) {
        m(this.d) && (Yc(this.d), this.d = void 0);
        null !== this.e && (tc(this.e), this.e = null);
        Mv.S.setMap.call(this, b);
        null !== b && (this.e = new $u(b.b), this.d = z(this.e, "drop", this.g, !1, this))
    };
    var Ov = "addfeatures";

    function Nv(b, c, d, e, f) {
        uc.call(this, b, c);
        this.features = e;
        this.file = d;
        this.projection = f
    }

    u(Nv, uc);
    function Pv(b, c) {
        this.x = b;
        this.y = c
    }

    u(Pv, vf);
    Pv.prototype.clone = function () {
        return new Pv(this.x, this.y)
    };
    Pv.prototype.scale = vf.prototype.scale;
    Pv.prototype.add = function (b) {
        this.x += b.x;
        this.y += b.y;
        return this
    };
    Pv.prototype.rotate = function (b) {
        var c = Math.cos(b);
        b = Math.sin(b);
        var d = this.y * c + this.x * b;
        this.x = this.x * c - this.y * b;
        this.y = d;
        return this
    };
    function Qv(b) {
        b = m(b) ? b : {};
        zk.call(this, {handleDownEvent: Rv, handleDragEvent: Sv, handleUpEvent: Tv});
        this.i = m(b.condition) ? b.condition : wk;
        this.d = this.f = void 0;
        this.g = 0
    }

    u(Qv, zk);
    function Sv(b) {
        if (yk(b)) {
            var c = b.map, d = c.e();
            b = b.pixel;
            b = new Pv(b[0] - d[0] / 2, d[1] / 2 - b[1]);
            d = Math.atan2(b.y, b.x);
            b = Math.sqrt(b.x * b.x + b.y * b.y);
            var e = c.a(), f = $e(e);
            c.render();
            m(this.f) && nk(c, e, f.rotation - (d - this.f));
            this.f = d;
            m(this.d) && pk(c, e, f.resolution / b * this.d);
            m(this.d) && (this.g = this.d / b);
            this.d = b
        }
    }

    function Tv(b) {
        if (!yk(b))return !0;
        b = b.map;
        var c = b.a();
        bf(c, -1);
        var d = $e(c), e = this.g - 1, f = d.rotation, f = c.constrainRotation(f, 0);
        nk(b, c, f, void 0, void 0);
        d = d.resolution;
        d = c.constrainResolution(d, 0, e);
        pk(b, c, d, void 0, 400);
        this.g = 0;
        return !1
    }

    function Rv(b) {
        return yk(b) && this.i(b) ? (bf(b.map.a(), 1), this.d = this.f = void 0, !0) : !1
    };
    var Uv;
    (function () {
        var b = {Ze: {}};
        (function () {
            function c(b, d) {
                if (!(this instanceof c))return new c(b, d);
                this.$d = Math.max(4, b || 9);
                this.Qe = Math.max(2, Math.ceil(.4 * this.$d));
                d && this.Og(d);
                this.clear()
            }

            function d(b, c) {
                b.bbox = e(b, 0, b.children.length, c)
            }

            function e(b, c, d, e) {
                for (var g = [Infinity, Infinity, -Infinity, -Infinity], h; c < d; c++)h = b.children[c], f(g, b.ua ? e(h) : h.bbox);
                return g
            }

            function f(b, c) {
                b[0] = Math.min(b[0], c[0]);
                b[1] = Math.min(b[1], c[1]);
                b[2] = Math.max(b[2], c[2]);
                b[3] = Math.max(b[3], c[3])
            }

            function g(b, c) {
                return b.bbox[0] -
                    c.bbox[0]
            }

            function h(b, c) {
                return b.bbox[1] - c.bbox[1]
            }

            function k(b) {
                return (b[2] - b[0]) * (b[3] - b[1])
            }

            function n(b) {
                return b[2] - b[0] + (b[3] - b[1])
            }

            function p(b, c) {
                return b[0] <= c[0] && b[1] <= c[1] && c[2] <= b[2] && c[3] <= b[3]
            }

            function q(b, c) {
                return c[0] <= b[2] && c[1] <= b[3] && c[2] >= b[0] && c[3] >= b[1]
            }

            function r(b, c, d, e, f) {
                for (var g = [c, d], h; g.length;)d = g.pop(), c = g.pop(), d - c <= e || (h = c + Math.ceil((d - c) / e / 2) * e, s(b, c, d, h, f), g.push(c, h, h, d))
            }

            function s(b, c, d, e, f) {
                for (var g, h, k, n, p; d > c;) {
                    600 < d - c && (g = d - c + 1, h = e - c + 1, k = Math.log(g),
                        n = .5 * Math.exp(2 * k / 3), p = .5 * Math.sqrt(k * n * (g - n) / g) * (0 > h - g / 2 ? -1 : 1), k = Math.max(c, Math.floor(e - h * n / g + p)), h = Math.min(d, Math.floor(e + (g - h) * n / g + p)), s(b, k, h, e, f));
                    g = b[e];
                    h = c;
                    n = d;
                    v(b, c, e);
                    for (0 < f(b[d], g) && v(b, c, d); h < n;) {
                        v(b, h, n);
                        h++;
                        for (n--; 0 > f(b[h], g);)h++;
                        for (; 0 < f(b[n], g);)n--
                    }
                    0 === f(b[c], g) ? v(b, c, n) : (n++, v(b, n, d));
                    n <= e && (c = n + 1);
                    e <= n && (d = n - 1)
                }
            }

            function v(b, c, d) {
                var e = b[c];
                b[c] = b[d];
                b[d] = e
            }

            c.prototype = {
                all: function () {
                    return this.Me(this.data, [])
                }, search: function (b) {
                    var c = this.data, d = [], e = this.Ca;
                    if (!q(b, c.bbox))return d;
                    for (var f = [], g, h, k, n; c;) {
                        g = 0;
                        for (h = c.children.length; g < h; g++)k = c.children[g], n = c.ua ? e(k) : k.bbox, q(b, n) && (c.ua ? d.push(k) : p(b, n) ? this.Me(k, d) : f.push(k));
                        c = f.pop()
                    }
                    return d
                }, load: function (b) {
                    if (!b || !b.length)return this;
                    if (b.length < this.Qe) {
                        for (var c = 0, d = b.length; c < d; c++)this.na(b[c]);
                        return this
                    }
                    b = this.Oe(b.slice(), 0, b.length - 1, 0);
                    this.data.children.length ? this.data.height === b.height ? this.Re(this.data, b) : (this.data.height < b.height && (c = this.data, this.data = b, b = c), this.Pe(b, this.data.height - b.height - 1,
                        !0)) : this.data = b;
                    return this
                }, na: function (b) {
                    b && this.Pe(b, this.data.height - 1);
                    return this
                }, clear: function () {
                    this.data = {children: [], height: 1, bbox: [Infinity, Infinity, -Infinity, -Infinity], ua: !0};
                    return this
                }, remove: function (b) {
                    if (!b)return this;
                    for (var c = this.data, d = this.Ca(b), e = [], f = [], g, h, k, n; c || e.length;) {
                        c || (c = e.pop(), h = e[e.length - 1], g = f.pop(), n = !0);
                        if (c.ua && (k = c.children.indexOf(b), -1 !== k)) {
                            c.children.splice(k, 1);
                            e.push(c);
                            this.Ng(e);
                            break
                        }
                        n || c.ua || !p(c.bbox, d) ? h ? (g++, c = h.children[g], n = !1) : c = null :
                            (e.push(c), f.push(g), g = 0, h = c, c = c.children[0])
                    }
                    return this
                }, Ca: function (b) {
                    return b
                }, ce: function (b, c) {
                    return b[0] - c[0]
                }, de: function (b, c) {
                    return b[1] - c[1]
                }, toJSON: function () {
                    return this.data
                }, Me: function (b, c) {
                    for (var d = []; b;)b.ua ? c.push.apply(c, b.children) : d.push.apply(d, b.children), b = d.pop();
                    return c
                }, Oe: function (b, c, e, f) {
                    var g = e - c + 1, h = this.$d, k;
                    if (g <= h)return k = {
                        children: b.slice(c, e + 1),
                        height: 1,
                        bbox: null,
                        ua: !0
                    }, d(k, this.Ca), k;
                    f || (f = Math.ceil(Math.log(g) / Math.log(h)), h = Math.ceil(g / Math.pow(h, f - 1)));
                    k = {children: [], height: f, bbox: null};
                    var g = Math.ceil(g / h), h = g * Math.ceil(Math.sqrt(h)), n, p, q;
                    for (r(b, c, e, h, this.ce); c <= e; c += h)for (p = Math.min(c + h - 1, e), r(b, c, p, g, this.de), n = c; n <= p; n += g)q = Math.min(n + g - 1, p), k.children.push(this.Oe(b, n, q, f - 1));
                    d(k, this.Ca);
                    return k
                }, Mg: function (b, c, d, e) {
                    for (var f, g, h, n, p, q, r, s; ;) {
                        e.push(c);
                        if (c.ua || e.length - 1 === d)break;
                        r = s = Infinity;
                        f = 0;
                        for (g = c.children.length; f < g; f++) {
                            h = c.children[f];
                            p = k(h.bbox);
                            q = b;
                            var v = h.bbox;
                            q = (Math.max(v[2], q[2]) - Math.min(v[0], q[0])) * (Math.max(v[3],
                                q[3]) - Math.min(v[1], q[1])) - p;
                            q < s ? (s = q, r = p < r ? p : r, n = h) : q === s && p < r && (r = p, n = h)
                        }
                        c = n
                    }
                    return c
                }, Pe: function (b, c, d) {
                    var e = this.Ca;
                    d = d ? b.bbox : e(b);
                    var e = [], g = this.Mg(d, this.data, c, e);
                    g.children.push(b);
                    for (f(g.bbox, d); 0 <= c;)if (e[c].children.length > this.$d)this.Pg(e, c), c--; else break;
                    this.Jg(d, e, c)
                }, Pg: function (b, c) {
                    var e = b[c], f = e.children.length, g = this.Qe;
                    this.Kg(e, g, f);
                    f = {children: e.children.splice(this.Lg(e, g, f)), height: e.height};
                    e.ua && (f.ua = !0);
                    d(e, this.Ca);
                    d(f, this.Ca);
                    c ? b[c - 1].children.push(f) : this.Re(e,
                        f)
                }, Re: function (b, c) {
                    this.data = {children: [b, c], height: b.height + 1};
                    d(this.data, this.Ca)
                }, Lg: function (b, c, d) {
                    var f, g, h, n, p, q, r;
                    p = q = Infinity;
                    for (f = c; f <= d - c; f++) {
                        g = e(b, 0, f, this.Ca);
                        h = e(b, f, d, this.Ca);
                        var s = g, v = h;
                        n = Math.max(s[0], v[0]);
                        var ac = Math.max(s[1], v[1]), Sb = Math.min(s[2], v[2]), s = Math.min(s[3], v[3]);
                        n = Math.max(0, Sb - n) * Math.max(0, s - ac);
                        g = k(g) + k(h);
                        n < p ? (p = n, r = f, q = g < q ? g : q) : n === p && g < q && (q = g, r = f)
                    }
                    return r
                }, Kg: function (b, c, d) {
                    var e = b.ua ? this.ce : g, f = b.ua ? this.de : h, k = this.Ne(b, c, d, e);
                    c = this.Ne(b, c, d, f);
                    k < c && b.children.sort(e)
                }, Ne: function (b, c, d, g) {
                    b.children.sort(g);
                    g = this.Ca;
                    var h = e(b, 0, c, g), k = e(b, d - c, d, g), p = n(h) + n(k), q, r;
                    for (q = c; q < d - c; q++)r = b.children[q], f(h, b.ua ? g(r) : r.bbox), p += n(h);
                    for (q = d - c - 1; q >= c; q--)r = b.children[q], f(k, b.ua ? g(r) : r.bbox), p += n(k);
                    return p
                }, Jg: function (b, c, d) {
                    for (; 0 <= d; d--)f(c[d].bbox, b)
                }, Ng: function (b) {
                    for (var c = b.length - 1, e; 0 <= c; c--)0 === b[c].children.length ? 0 < c ? (e = b[c - 1].children, e.splice(e.indexOf(b[c]), 1)) : this.clear() : d(b[c], this.Ca)
                }, Og: function (b) {
                    var c = ["return a", " - b",
                        ";"];
                    this.ce = new Function("a", "b", c.join(b[0]));
                    this.de = new Function("a", "b", c.join(b[1]));
                    this.Ca = new Function("a", "return [a" + b.join(", a") + "];")
                }
            };
            "function" === typeof define && define.Ul ? define(function () {
                return c
            }) : "undefined" !== typeof b ? b.Ze = c : "undefined" !== typeof self ? self.a = c : window.a = c
        })();
        Uv = b.Ze
    })();
    function Vv(b) {
        this.a = Uv(b);
        this.c = {}
    }

    l = Vv.prototype;
    l.na = function (b, c) {
        var d = [b[0], b[1], b[2], b[3], c];
        this.a.na(d);
        Ab(this.c, ma(c).toString(), d)
    };
    l.load = function (b, c) {
        for (var d = Array(c.length), e = 0, f = c.length; e < f; e++) {
            var g = b[e], h = c[e], g = [g[0], g[1], g[2], g[3], h];
            d[e] = g;
            Ab(this.c, ma(h).toString(), g)
        }
        this.a.load(d)
    };
    l.remove = function (b) {
        b = ma(b).toString();
        var c = x(this.c, b);
        zb(this.c, b);
        return null !== this.a.remove(c)
    };
    l.update = function (b, c) {
        this.remove(c);
        this.na(b, c)
    };
    function Wv(b) {
        b = b.a.all();
        return Va(b, function (b) {
            return b[4]
        })
    }

    function Xv(b, c) {
        var d = b.a.search(c);
        return Va(d, function (b) {
            return b[4]
        })
    }

    l.forEach = function (b, c) {
        return Yv(Wv(this), b, c)
    };
    function Zv(b, c, d, e) {
        return Yv(Xv(b, c), d, e)
    }

    function Yv(b, c, d) {
        for (var e, f = 0, g = b.length; f < g && !(e = c.call(d, b[f])); f++);
        return e
    }

    l.ia = function () {
        return xb(this.c)
    };
    l.clear = function () {
        this.a.clear();
        this.c = {}
    };
    l.D = function () {
        return this.a.data.bbox
    };
    function $v(b) {
        b = m(b) ? b : {};
        qj.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            state: m(b.state) ? b.state : void 0
        });
        this.b = new Vv;
        this.d = {};
        this.f = {};
        this.o = {};
        this.i = {};
        m(b.features) && this.fb(b.features)
    }

    u($v, qj);
    l = $v.prototype;
    l.Pa = function (b) {
        var c = ma(b).toString();
        aw(this, c, b);
        var d = b.N();
        null != d ? (d = d.D(), this.b.na(d, b)) : this.d[c] = b;
        bw(this, c, b);
        this.dispatchEvent(new cw("addfeature", b));
        this.l()
    };
    function aw(b, c, d) {
        b.i[c] = [z(d, "change", b.Af, !1, b), z(d, "propertychange", b.Af, !1, b)]
    }

    function bw(b, c, d) {
        var e = d.X;
        m(e) ? b.f[e.toString()] = d : b.o[c] = d
    }

    l.ya = function (b) {
        this.fb(b);
        this.l()
    };
    l.fb = function (b) {
        var c, d, e, f, g = [], h = [];
        d = 0;
        for (e = b.length; d < e; d++) {
            f = b[d];
            c = ma(f).toString();
            aw(this, c, f);
            var k = f.N();
            null != k ? (c = k.D(), g.push(c), h.push(f)) : this.d[c] = f
        }
        this.b.load(g, h);
        d = 0;
        for (e = b.length; d < e; d++)f = b[d], c = ma(f).toString(), bw(this, c, f), this.dispatchEvent(new cw("addfeature", f))
    };
    l.clear = function (b) {
        if (b) {
            for (var c in this.i)Ta(this.i[c], Yc);
            this.i = {};
            this.f = {};
            this.o = {}
        } else b = this.Xf, this.b.forEach(b, this), ob(this.d, b, this);
        this.b.clear();
        this.d = {};
        this.dispatchEvent(new cw("clear"));
        this.l()
    };
    l.Xa = function (b, c) {
        return this.b.forEach(b, c)
    };
    function dw(b, c, d) {
        b.ra([c[0], c[1], c[0], c[1]], function (b) {
            if (b.N().Jb(c[0], c[1]))return d.call(void 0, b)
        })
    }

    l.ra = function (b, c, d) {
        return Zv(this.b, b, c, d)
    };
    l.Db = function (b, c, d, e) {
        return this.ra(b, d, e)
    };
    l.Fa = function (b, c, d) {
        return this.ra(b, function (e) {
            if (e.N().ha(b) && (e = c.call(d, e)))return e
        })
    };
    l.va = function () {
        var b = Wv(this.b);
        xb(this.d) || db(b, rb(this.d));
        return b
    };
    l.Ia = function (b) {
        var c = [];
        dw(this, b, function (b) {
            c.push(b)
        });
        return c
    };
    l.Ya = function (b) {
        var c = b[0], d = b[1], e = null, f = [NaN, NaN], g = Infinity, h = [-Infinity, -Infinity, Infinity, Infinity];
        Zv(this.b, h, function (b) {
            var n = b.N(), p = g;
            g = n.Va(c, d, f, g);
            g < p && (e = b, b = Math.sqrt(g), h[0] = c - b, h[1] = d - b, h[2] = c + b, h[3] = d + b)
        });
        return e
    };
    l.D = function () {
        return this.b.D()
    };
    l.Ha = function (b) {
        b = this.f[b.toString()];
        return m(b) ? b : null
    };
    l.Af = function (b) {
        b = b.target;
        var c = ma(b).toString(), d = b.N();
        null != d ? (d = d.D(), c in this.d ? (delete this.d[c], this.b.na(d, b)) : this.b.update(d, b)) : c in this.d || (this.b.remove(b), this.d[c] = b);
        d = b.X;
        m(d) ? (d = d.toString(), c in this.o ? (delete this.o[c], this.f[d] = b) : this.f[d] !== b && (ew(this, b), this.f[d] = b)) : c in this.o || (ew(this, b), this.o[c] = b);
        this.l();
        this.dispatchEvent(new cw("changefeature", b))
    };
    l.ia = function () {
        return this.b.ia() && xb(this.d)
    };
    l.Hb = ca;
    l.$a = function (b) {
        var c = ma(b).toString();
        c in this.d ? delete this.d[c] : this.b.remove(b);
        this.Xf(b);
        this.l()
    };
    l.Xf = function (b) {
        var c = ma(b).toString();
        Ta(this.i[c], Yc);
        delete this.i[c];
        var d = b.X;
        m(d) ? delete this.f[d.toString()] : delete this.o[c];
        this.dispatchEvent(new cw("removefeature", b))
    };
    function ew(b, c) {
        for (var d in b.f)if (b.f[d] === c) {
            delete b.f[d];
            break
        }
    }

    function cw(b, c) {
        uc.call(this, b);
        this.feature = c
    }

    u(cw, uc);
    function fw(b, c) {
        uc.call(this, b);
        this.feature = c
    }

    u(fw, uc);
    function gw(b) {
        zk.call(this, {handleDownEvent: hw, handleEvent: iw, handleUpEvent: jw});
        this.Q = null;
        this.ga = m(b.source) ? b.source : null;
        this.ba = m(b.features) ? b.features : null;
        this.Ab = m(b.snapTolerance) ? b.snapTolerance : 12;
        this.Ta = m(b.minPointsPerRing) ? b.minPointsPerRing : 3;
        var c = this.F = b.type, d;
        if ("Point" === c || "MultiPoint" === c)d = kw; else if ("LineString" === c || "MultiLineString" === c)d = lw; else if ("Polygon" === c || "MultiPolygon" === c)d = mw;
        this.d = d;
        this.f = this.r = this.j = this.g = this.i = null;
        this.J = new rp({
            style: m(b.style) ?
                b.style : nw()
        });
        this.ca = b.geometryName;
        this.eb = m(b.condition) ? b.condition : vk;
        z(this, xd("active"), this.ea, !1, this)
    }

    u(gw, zk);
    function nw() {
        var b = Vl();
        return function (c) {
            return b[c.N().H()]
        }
    }

    gw.prototype.setMap = function (b) {
        gw.S.setMap.call(this, b);
        this.ea()
    };
    function iw(b) {
        var c;
        c = b.map;
        if (Pf(document, c.b) && "none" != c.b.style.display) {
            var d = c.e();
            null == d || 0 >= d[0] || 0 >= d[1] ? c = !1 : (c = c.a(), c = null !== c && af(c) ? !0 : !1)
        } else c = !1;
        if (!c)return !0;
        c = !0;
        b.type === nj ? c = ow(this, b) : b.type === hj && (c = !1);
        return Ak.call(this, b) && c
    }

    function hw(b) {
        return this.eb(b) ? (this.Q = b.pixel, !0) : !1
    }

    function jw(b) {
        var c = this.Q, d = b.pixel, e = c[0] - d[0], c = c[1] - d[1], d = !0;
        4 >= e * e + c * c && (ow(this, b), null === this.i ? pw(this, b) : this.d === kw || qw(this, b) ? this.V() : (b = b.coordinate, e = this.g.N(), this.d === lw ? (this.i = b.slice(), c = e.K(), c.push(b.slice()), e.U(c)) : this.d === mw && (this.f[0].push(b.slice()), e.U(this.f)), rw(this)), d = !1);
        return d
    }

    function ow(b, c) {
        if (b.d === kw && null === b.i)pw(b, c); else if (null === b.i) {
            var d = c.coordinate.slice();
            null === b.j ? (b.j = new R(new hl(d)), rw(b)) : b.j.N().U(d)
        } else {
            var d = c.coordinate, e = b.g.N(), f, g;
            b.d === kw ? (g = e.K(), g[0] = d[0], g[1] = d[1], e.U(g)) : (b.d === lw ? f = e.K() : b.d === mw && (f = b.f[0]), qw(b, c) && (d = b.i.slice()), b.j.N().U(d), g = f[f.length - 1], g[0] = d[0], g[1] = d[1], b.d === lw ? e.U(f) : b.d === mw && (b.r.N().U(f), e.U(b.f)));
            rw(b)
        }
        return !0
    }

    function qw(b, c) {
        var d = !1;
        if (null !== b.g) {
            var e = b.g.N(), f = !1, g = [b.i];
            b.d === lw ? f = 2 < e.K().length : b.d === mw && (f = e.K()[0].length > b.Ta, g = [b.f[0][0], b.f[0][b.f[0].length - 2]]);
            if (f)for (var e = c.map, f = 0, h = g.length; f < h; f++) {
                var k = g[f], n = e.f(k), p = c.pixel, d = p[0] - n[0], n = p[1] - n[1];
                if (d = Math.sqrt(d * d + n * n) <= b.Ab) {
                    b.i = k;
                    break
                }
            }
        }
        return d
    }

    function pw(b, c) {
        var d = c.coordinate;
        b.i = d;
        var e;
        b.d === kw ? e = new hl(d.slice()) : b.d === lw ? e = new M([d.slice(), d.slice()]) : b.d === mw && (b.r = new R(new M([d.slice(), d.slice()])), b.f = [[d.slice(), d.slice()]], e = new H(b.f));
        b.g = new R;
        m(b.ca) && b.g.e(b.ca);
        b.g.Ma(e);
        rw(b);
        b.dispatchEvent(new fw("drawstart", b.g))
    }

    gw.prototype.V = function () {
        var b = sw(this), c, d = b.N();
        this.d === kw ? c = d.K() : this.d === lw ? (c = d.K(), c.pop(), d.U(c)) : this.d === mw && (this.f[0].pop(), this.f[0].push(this.f[0][0]), d.U(this.f), c = d.K());
        "MultiPoint" === this.F ? b.Ma(new tn([c])) : "MultiLineString" === this.F ? b.Ma(new qn([c])) : "MultiPolygon" === this.F && b.Ma(new un([c]));
        null === this.ba || this.ba.push(b);
        null === this.ga || this.ga.Pa(b);
        this.dispatchEvent(new fw("drawend", b))
    };
    function sw(b) {
        b.i = null;
        var c = b.g;
        null !== c && (b.g = null, b.j = null, b.r = null, b.J.a.clear());
        return c
    }

    gw.prototype.q = cd;
    function rw(b) {
        var c = [];
        null === b.g || c.push(b.g);
        null === b.r || c.push(b.r);
        null === b.j || c.push(b.j);
        b.J.Mc(new B(c))
    }

    gw.prototype.ea = function () {
        var b = this.n, c = this.a();
        null !== b && c || sw(this);
        this.J.setMap(c ? b : null)
    };
    var kw = "Point", lw = "LineString", mw = "Polygon";

    function tw(b) {
        zk.call(this, {handleDownEvent: uw, handleDragEvent: vw, handleEvent: ww, handleUpEvent: xw});
        this.ba = m(b.deleteCondition) ? b.deleteCondition : id(vk, uk);
        this.V = this.f = null;
        this.Q = [0, 0];
        this.d = new Vv;
        this.i = m(b.pixelTolerance) ? b.pixelTolerance : 10;
        this.J = !1;
        this.g = null;
        this.j = new rp({style: m(b.style) ? b.style : yw()});
        this.F = {
            Point: this.Fl,
            LineString: this.jg,
            LinearRing: this.jg,
            Polygon: this.Hl,
            MultiPoint: this.Cl,
            MultiLineString: this.Bl,
            MultiPolygon: this.El,
            GeometryCollection: this.Al
        };
        this.r = b.features;
        this.r.forEach(this.wf, this);
        z(this.r, "add", this.Wh, !1, this);
        z(this.r, "remove", this.Xh, !1, this)
    }

    u(tw, zk);
    l = tw.prototype;
    l.wf = function (b) {
        var c = b.N();
        m(this.F[c.H()]) && this.F[c.H()].call(this, b, c);
        b = this.n;
        null === b || zw(this, this.Q, b)
    };
    l.setMap = function (b) {
        this.j.setMap(b);
        tw.S.setMap.call(this, b)
    };
    l.Wh = function (b) {
        this.wf(b.element)
    };
    l.Xh = function (b) {
        var c = b.element;
        b = this.d;
        var d, e = [];
        Zv(b, c.N().D(), function (b) {
            c === b.feature && e.push(b)
        });
        for (d = e.length - 1; 0 <= d; --d)b.remove(e[d]);
        null !== this.f && 0 === this.r.Ib() && (this.j.wd(this.f), this.f = null)
    };
    l.Fl = function (b, c) {
        var d = c.K(), d = {feature: b, geometry: c, fa: [d, d]};
        this.d.na(c.D(), d)
    };
    l.Cl = function (b, c) {
        var d = c.K(), e, f, g;
        f = 0;
        for (g = d.length; f < g; ++f)e = d[f], e = {
            feature: b,
            geometry: c,
            depth: [f],
            index: f,
            fa: [e, e]
        }, this.d.na(c.D(), e)
    };
    l.jg = function (b, c) {
        var d = c.K(), e, f, g, h;
        e = 0;
        for (f = d.length - 1; e < f; ++e)g = d.slice(e, e + 2), h = {
            feature: b,
            geometry: c,
            index: e,
            fa: g
        }, this.d.na(Td(g), h)
    };
    l.Bl = function (b, c) {
        var d = c.K(), e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)for (e = d[h], f = 0, g = e.length - 1; f < g; ++f)n = e.slice(f, f + 2), p = {
            feature: b,
            geometry: c,
            depth: [h],
            index: f,
            fa: n
        }, this.d.na(Td(n), p)
    };
    l.Hl = function (b, c) {
        var d = c.K(), e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)for (e = d[h], f = 0, g = e.length - 1; f < g; ++f)n = e.slice(f, f + 2), p = {
            feature: b,
            geometry: c,
            depth: [h],
            index: f,
            fa: n
        }, this.d.na(Td(n), p)
    };
    l.El = function (b, c) {
        var d = c.K(), e, f, g, h, k, n, p, q, r, s;
        n = 0;
        for (p = d.length; n < p; ++n)for (q = d[n], h = 0, k = q.length; h < k; ++h)for (e = q[h], f = 0, g = e.length - 1; f < g; ++f)r = e.slice(f, f + 2), s = {
            feature: b,
            geometry: c,
            depth: [h, n],
            index: f,
            fa: r
        }, this.d.na(Td(r), s)
    };
    l.Al = function (b, c) {
        var d, e = c.d;
        for (d = 0; d < e.length; ++d)this.F[e[d].H()].call(this, b, e[d])
    };
    function Aw(b, c) {
        var d = b.f;
        null === d ? (d = new R(new hl(c)), b.f = d, b.j.rf(d)) : d.N().U(c)
    }

    function uw(b) {
        zw(this, b.pixel, b.map);
        this.g = [];
        var c = this.f;
        if (null !== c) {
            b = [];
            for (var c = c.N().K(), d = Td([c]), d = Xv(this.d, d), e = 0, f = d.length; e < f; ++e) {
                var g = d[e], h = g.fa;
                Cd(h[0], c) ? this.g.push([g, 0]) : Cd(h[1], c) ? this.g.push([g, 1]) : ma(h)in this.V && b.push([g, c])
            }
            for (e = b.length - 1; 0 <= e; --e)this.ui.apply(this, b[e])
        }
        return null !== this.f
    }

    function vw(b) {
        b = b.coordinate;
        for (var c = 0, d = this.g.length; c < d; ++c) {
            for (var e = this.g[c], f = e[0], g = f.depth, h = f.geometry, k = h.K(), n = f.fa, e = e[1]; b.length < h.s;)b.push(0);
            switch (h.H()) {
                case "Point":
                    k = b;
                    n[0] = n[1] = b;
                    break;
                case "MultiPoint":
                    k[f.index] = b;
                    n[0] = n[1] = b;
                    break;
                case "LineString":
                    k[f.index + e] = b;
                    n[e] = b;
                    break;
                case "MultiLineString":
                    k[g[0]][f.index + e] = b;
                    n[e] = b;
                    break;
                case "Polygon":
                    k[g[0]][f.index + e] = b;
                    n[e] = b;
                    break;
                case "MultiPolygon":
                    k[g[1]][g[0]][f.index + e] = b, n[e] = b
            }
            h.U(k);
            Aw(this, b)
        }
    }

    function xw() {
        for (var b, c = this.g.length - 1; 0 <= c; --c)b = this.g[c][0], this.d.update(Td(b.fa), b);
        return !1
    }

    function ww(b) {
        var c, d = b.map.a();
        cb(d.j)[1] || b.type != nj || (this.Q = b.pixel, zw(this, b.pixel, b.map));
        if (null !== this.f && this.J && this.ba(b)) {
            this.f.N();
            c = this.g;
            var d = {}, e = !1, f, g, h, k, n, p, q, r, s;
            for (n = c.length - 1; 0 <= n; --n)if (h = c[n], r = h[0], k = r.geometry, g = k.K(), s = ma(r.feature), f = q = p = void 0, 0 === h[1] ? (q = r, p = r.index) : 1 == h[1] && (f = r, p = r.index + 1), s in d || (d[s] = [f, q, p]), h = d[s], m(f) && (h[0] = f), m(q) && (h[1] = q), m(h[0]) && m(h[1])) {
                f = g;
                e = !1;
                q = p - 1;
                switch (k.H()) {
                    case "MultiLineString":
                        g[r.depth[0]].splice(p, 1);
                        e = !0;
                        break;
                    case "LineString":
                        g.splice(p,
                            1);
                        e = !0;
                        break;
                    case "MultiPolygon":
                        f = f[r.depth[1]];
                    case "Polygon":
                        f = f[r.depth[0]], 4 < f.length && (p == f.length - 1 && (p = 0), f.splice(p, 1), e = !0, 0 === p && (f.pop(), f.push(f[0]), q = f.length - 1))
                }
                e && (this.d.remove(h[0]), this.d.remove(h[1]), k.U(g), g = {
                    depth: r.depth,
                    feature: r.feature,
                    geometry: r.geometry,
                    index: q,
                    fa: [h[0].fa[0], h[1].fa[1]]
                }, this.d.na(Td(g.fa), g), Bw(this, k, p, r.depth, -1), this.j.wd(this.f), this.f = null)
            }
            c = e
        }
        return Ak.call(this, b) && !c
    }

    function zw(b, c, d) {
        function e(b, c) {
            return Ed(f, zd(f, b.fa)) - Ed(f, zd(f, c.fa))
        }

        var f = d.Ga(c), g = d.Ga([c[0] - b.i, c[1] + b.i]), h = d.Ga([c[0] + b.i, c[1] - b.i]), g = Td([g, h]), g = Xv(b.d, g);
        if (0 < g.length) {
            g.sort(e);
            var h = g[0].fa, k = zd(f, h), n = d.f(k);
            if (Math.sqrt(Ed(c, n)) <= b.i) {
                c = d.f(h[0]);
                d = d.f(h[1]);
                c = Ed(n, c);
                d = Ed(n, d);
                b.J = Math.sqrt(Math.min(c, d)) <= b.i;
                b.J && (k = c > d ? h[1] : h[0]);
                Aw(b, k);
                d = {};
                d[ma(h)] = !0;
                c = 1;
                for (n = g.length; c < n; ++c)if (k = g[c].fa, Cd(h[0], k[0]) && Cd(h[1], k[1]) || Cd(h[0], k[1]) && Cd(h[1], k[0]))d[ma(k)] = !0; else break;
                b.V = d;
                return
            }
        }
        null !== b.f && (b.j.wd(b.f), b.f = null)
    }

    l.ui = function (b, c) {
        for (var d = b.fa, e = b.feature, f = b.geometry, g = b.depth, h = b.index, k; c.length < f.s;)c.push(0);
        switch (f.H()) {
            case "MultiLineString":
                k = f.K();
                k[g[0]].splice(h + 1, 0, c);
                break;
            case "Polygon":
                k = f.K();
                k[g[0]].splice(h + 1, 0, c);
                break;
            case "MultiPolygon":
                k = f.K();
                k[g[1]][g[0]].splice(h + 1, 0, c);
                break;
            case "LineString":
                k = f.K();
                k.splice(h + 1, 0, c);
                break;
            default:
                return
        }
        f.U(k);
        k = this.d;
        k.remove(b);
        Bw(this, f, h, g, 1);
        var n = {fa: [d[0], c], feature: e, geometry: f, depth: g, index: h};
        k.na(Td(n.fa), n);
        this.g.push([n, 1]);
        d =
        {fa: [c, d[1]], feature: e, geometry: f, depth: g, index: h + 1};
        k.na(Td(d.fa), d);
        this.g.push([d, 0])
    };
    function Bw(b, c, d, e, f) {
        Zv(b.d, c.D(), function (b) {
            b.geometry === c && (!m(e) || ib(b.depth, e)) && b.index > d && (b.index += f)
        })
    }

    function yw() {
        var b = Vl();
        return function () {
            return b.Point
        }
    };
    function Cw(b) {
        mk.call(this, {handleEvent: Dw});
        b = m(b) ? b : {};
        this.g = m(b.condition) ? b.condition : uk;
        this.f = m(b.addCondition) ? b.addCondition : cd;
        this.p = m(b.removeCondition) ? b.removeCondition : cd;
        this.r = m(b.toggleCondition) ? b.toggleCondition : wk;
        var c;
        if (m(b.layers))if (ka(b.layers))c = b.layers; else {
            var d = b.layers;
            c = function (b) {
                return Za(d, b)
            }
        } else c = dd;
        this.e = c;
        this.d = new rp({style: m(b.style) ? b.style : Ew()});
        b = this.d.a;
        z(b, "add", this.i, !1, this);
        z(b, "remove", this.q, !1, this)
    }

    u(Cw, mk);
    Cw.prototype.j = function () {
        return this.d.a
    };
    function Dw(b) {
        if (!this.g(b))return !0;
        var c = this.f(b), d = this.p(b), e = this.r(b), f = b.map, g = this.d.a;
        if (c || d || e) {
            var h = [], k = [];
            f.oe(b.pixel, function (b) {
                -1 == Sa.indexOf.call(g.a, b, void 0) ? (c || e) && k.push(b) : (d || e) && h.push(b)
            }, void 0, this.e);
            for (f = h.length - 1; 0 <= f; --f)g.remove(h[f]);
            g.qf(k)
        } else f = f.oe(b.pixel, function (b) {
            return b
        }, void 0, this.e), m(f) && 1 == g.Ib() && g.item(0) == f || (0 !== g.Ib() && g.clear(), m(f) && g.push(f));
        return tk(b)
    }

    Cw.prototype.setMap = function (b) {
        var c = this.n, d = this.d.a;
        null === c || d.forEach(c.fc, c);
        Cw.S.setMap.call(this, b);
        this.d.setMap(b);
        null === b || d.forEach(b.eb, b)
    };
    function Ew() {
        var b = Vl();
        db(b.Polygon, b.LineString);
        db(b.GeometryCollection, b.LineString);
        return function (c) {
            return b[c.N().H()]
        }
    }

    Cw.prototype.i = function (b) {
        b = b.element;
        var c = this.n;
        null === c || c.eb(b)
    };
    Cw.prototype.q = function (b) {
        b = b.element;
        var c = this.n;
        null === c || c.fc(b)
    };
    function $(b) {
        b = m(b) ? b : {};
        L.call(this, b);
        this.ea = null;
        z(this, xd("gradient"), this.Wd, !1, this);
        this.fc(m(b.gradient) ? b.gradient : Fw);
        var c = Gw(m(b.radius) ? b.radius : 8, m(b.blur) ? b.blur : 15, m(b.shadow) ? b.shadow : 250), d = Array(256), e = m(b.weight) ? b.weight : "weight", f;
        ia(e) ? f = function (b) {
            return b.get(e)
        } : f = e;
        this.oa(function (b) {
            b = f(b);
            b = m(b) ? Yb(b, 0, 1) : 1;
            var e = 255 * b | 0, k = d[e];
            m(k) || (k = [new Rl({image: new Sj({opacity: b, src: c})})], d[e] = k);
            return k
        });
        this.set("renderOrder", null);
        z(this, "render", this.Xd, !1, this)
    }

    u($, L);
    var Fw = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];

    function Gw(b, c, d) {
        var e = b + c + 1, f = 2 * e, f = Tf(f, f);
        f.shadowOffsetX = f.shadowOffsetY = d;
        f.shadowBlur = c;
        f.shadowColor = "#000";
        f.beginPath();
        c = e - d;
        f.arc(c, c, b, 0, 2 * Math.PI, !0);
        f.fill();
        return f.canvas.toDataURL()
    }

    $.prototype.qa = function () {
        return this.get("gradient")
    };
    $.prototype.getGradient = $.prototype.qa;
    $.prototype.Wd = function () {
        for (var b = this.qa(), c = Tf(1, 256), d = c.createLinearGradient(0, 0, 1, 256), e = 1 / (b.length - 1), f = 0, g = b.length; f < g; ++f)d.addColorStop(f * e, b[f]);
        c.fillStyle = d;
        c.fillRect(0, 0, 1, 256);
        this.ea = c.getImageData(0, 0, 1, 256).data
    };
    $.prototype.Xd = function (b) {
        b = b.context;
        var c = b.canvas, c = b.getImageData(0, 0, c.width, c.height), d = c.data, e, f, g;
        e = 0;
        for (f = d.length; e < f; e += 4)if (g = 4 * d[e + 3])d[e] = this.ea[g], d[e + 1] = this.ea[g + 1], d[e + 2] = this.ea[g + 2];
        b.putImageData(c, 0, 0)
    };
    $.prototype.fc = function (b) {
        this.set("gradient", b)
    };
    $.prototype.setGradient = $.prototype.fc;
    function Hw(b) {
        return [b]
    };
    function Iw(b, c) {
        var d = c || {}, e = d.document || document, f = If("SCRIPT"), g = {
            $f: f,
            bc: void 0
        }, h = new xv(Jw, g), k = null, n = null != d.timeout ? d.timeout : 5E3;
        0 < n && (k = window.setTimeout(function () {
            Kw(f, !0);
            var c = new Lw(Mw, "Timeout reached for loading script " + b);
            zv(h);
            Av(h, !1, c)
        }, n), g.bc = k);
        f.onload = f.onreadystatechange = function () {
            f.readyState && "loaded" != f.readyState && "complete" != f.readyState || (Kw(f, d.Zg || !1, k), zv(h), Av(h, !0, null))
        };
        f.onerror = function () {
            Kw(f, !0, k);
            var c = new Lw(Nw, "Error while loading script " + b);
            zv(h);
            Av(h, !1, c)
        };
        Cf(f, {type: "text/javascript", charset: "UTF-8", src: b});
        Ow(e).appendChild(f);
        return h
    }

    function Ow(b) {
        var c = b.getElementsByTagName("HEAD");
        return c && 0 != c.length ? c[0] : b.documentElement
    }

    function Jw() {
        if (this && this.$f) {
            var b = this.$f;
            b && "SCRIPT" == b.tagName && Kw(b, !0, this.bc)
        }
    }

    function Kw(b, c, d) {
        null != d && ba.clearTimeout(d);
        b.onload = ca;
        b.onerror = ca;
        b.onreadystatechange = ca;
        c && window.setTimeout(function () {
            Nf(b)
        }, 0)
    }

    var Nw = 0, Mw = 1;

    function Lw(b, c) {
        var d = "Jsloader error (code #" + b + ")";
        c && (d += ": " + c);
        xa.call(this, d);
        this.code = b
    }

    u(Lw, xa);
    function Pw(b, c) {
        this.c = new Ah(b);
        this.a = c ? c : "callback";
        this.bc = 5E3
    }

    var Qw = 0;
    Pw.prototype.send = function (b, c, d, e) {
        b = b || null;
        e = e || "_" + (Qw++).toString(36) + ua().toString(36);
        ba._callbacks_ || (ba._callbacks_ = {});
        var f = this.c.clone();
        if (b)for (var g in b)if (!b.hasOwnProperty || b.hasOwnProperty(g)) {
            var h = f, k = g, n = b[g];
            ga(n) || (n = [String(n)]);
            Uh(h.a, k, n)
        }
        c && (ba._callbacks_[e] = Rw(e, c), c = this.a, g = "_callbacks_." + e, ga(g) || (g = [String(g)]), Uh(f.a, c, g));
        c = Iw(f.toString(), {timeout: this.bc, Zg: !0});
        Dv(c, null, Sw(e, b, d), void 0);
        return {X: e, Xe: c}
    };
    Pw.prototype.cancel = function (b) {
        b && (b.Xe && b.Xe.cancel(), b.X && Tw(b.X, !1))
    };
    function Sw(b, c, d) {
        return function () {
            Tw(b, !1);
            d && d(c)
        }
    }

    function Rw(b, c) {
        return function (d) {
            Tw(b, !0);
            c.apply(void 0, arguments)
        }
    }

    function Tw(b, c) {
        ba._callbacks_[b] && (c ? delete ba._callbacks_[b] : ba._callbacks_[b] = ca)
    };
    function Uw(b) {
        var c = /\{z\}/g, d = /\{x\}/g, e = /\{y\}/g, f = /\{-y\}/g;
        return function (g) {
            return null === g ? void 0 : b.replace(c, g[0].toString()).replace(d, g[1].toString()).replace(e, g[2].toString()).replace(f, function () {
                return ((1 << g[0]) - g[2] - 1).toString()
            })
        }
    }

    function Vw(b) {
        return Ww(Va(b, Uw))
    }

    function Ww(b) {
        return 1 === b.length ? b[0] : function (c, d, e) {
            return null === c ? void 0 : b[Zb((c[1] << c[0]) + c[2], b.length)](c, d, e)
        }
    }

    function Xw() {
    }

    function Yw(b, c) {
        var d = [0, 0, 0];
        return function (e, f, g) {
            return null === e ? void 0 : c(b(e, g, d), f, g)
        }
    }

    function Zw(b) {
        var c = [], d = /\{(\d)-(\d)\}/.exec(b) || /\{([a-z])-([a-z])\}/.exec(b);
        if (d) {
            var e = d[2].charCodeAt(0), f;
            for (f = d[1].charCodeAt(0); f <= e; ++f)c.push(b.replace(d[0], String.fromCharCode(f)))
        } else c.push(b);
        return c
    };
    function $w(b) {
        Ho.call(this);
        this.e = m(b) ? b : 2048
    }

    u($w, Ho);
    function ax(b) {
        return b.Ub() > b.e
    }

    function bx(b, c) {
        for (var d, e; ax(b) && !(d = b.a.dc, e = d.a[0].toString(), e in c && c[e].contains(d.a));)b.pop().hc()
    };
    function cx(b) {
        Fj.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            logo: b.logo,
            opaque: b.opaque,
            projection: b.projection,
            state: m(b.state) ? b.state : void 0,
            tileGrid: b.tileGrid,
            tilePixelRatio: b.tilePixelRatio
        });
        this.tileUrlFunction = m(b.tileUrlFunction) ? b.tileUrlFunction : Xw;
        this.crossOrigin = m(b.crossOrigin) ? b.crossOrigin : null;
        this.b = new $w;
        this.tileLoadFunction = m(b.tileLoadFunction) ? b.tileLoadFunction : dx;
        this.tileClass = m(b.tileClass) ? b.tileClass : Xu
    }

    u(cx, Fj);
    function dx(b, c) {
        b.Na().src = c
    }

    l = cx.prototype;
    l.zd = function () {
        return ax(this.b)
    };
    l.se = function (b) {
        bx(this.b, b)
    };
    l.Fb = function (b, c, d, e, f) {
        var g = this.hb(b, c, d);
        if (Eo(this.b, g))return this.b.get(g);
        b = [b, c, d];
        e = this.tileUrlFunction(b, e, f);
        e = new this.tileClass(b, m(e) ? 0 : 4, m(e) ? e : "", this.crossOrigin, this.tileLoadFunction);
        this.b.set(g, e);
        return e
    };
    l.ib = function () {
        return this.tileLoadFunction
    };
    l.jb = function () {
        return this.tileUrlFunction
    };
    l.ob = function (b) {
        this.b.clear();
        this.tileLoadFunction = b;
        this.l()
    };
    l.pa = function (b) {
        this.b.clear();
        this.tileUrlFunction = b;
        this.l()
    };
    l.He = function (b, c, d) {
        b = this.hb(b, c, d);
        Eo(this.b, b) && this.b.get(b)
    };
    function ex(b) {
        var c = m(b.extent) ? b.extent : mm, d = Dj(c, b.maxZoom, b.tileSize);
        wj.call(this, {minZoom: b.minZoom, origin: le(c, "top-left"), resolutions: d, tileSize: b.tileSize})
    }

    u(ex, wj);
    ex.prototype.Bb = function (b) {
        b = m(b) ? b : {};
        var c = this.minZoom, d = this.maxZoom, e = m(b.wrapX) ? b.wrapX : !0, f = null;
        if (m(b.extent)) {
            var f = Array(d + 1), g;
            for (g = 0; g <= d; ++g)f[g] = g < c ? null : zj(this, b.extent, g)
        }
        return function (b, g, n) {
            g = b[0];
            if (g < c || d < g)return null;
            var p = Math.pow(2, g), q = b[1];
            if (e)q = Zb(q, p); else if (0 > q || p <= q)return null;
            b = b[2];
            return b < -p || -1 < b || null !== f && !qf(f[g], q, b) ? null : kf(g, q, -b - 1, n)
        }
    };
    ex.prototype.kd = function (b, c) {
        if (b[0] < this.maxZoom) {
            var d = 2 * b[1], e = 2 * b[2];
            return pf(d, d + 1, e, e + 1, c)
        }
        return null
    };
    ex.prototype.$c = function (b, c, d, e) {
        e = pf(0, b[1], 0, b[2], e);
        for (b = b[0] - 1; b >= this.minZoom; --b)if (e.a = e.d >>= 1, e.b = e.c >>= 1, c.call(d, b, e))return !0;
        return !1
    };
    function fx(b) {
        cx.call(this, {
            crossOrigin: "anonymous",
            opaque: !0,
            projection: Ee("EPSG:3857"),
            state: "loading",
            tileLoadFunction: b.tileLoadFunction
        });
        this.d = m(b.culture) ? b.culture : "en-us";
        this.a = m(b.maxZoom) ? b.maxZoom : -1;
        var c = new Ah((Wb ? "https:" : "http:") + "//dev.virtualearth.net/REST/v1/Imagery/Metadata/" + b.imagerySet);
        (new Pw(c, "jsonp")).send({
            include: "ImageryProviders",
            uriScheme: Wb ? "https" : "http",
            key: b.key
        }, sa(this.f, this))
    }

    u(fx, cx);
    var gx = new tf({html: '<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});
    fx.prototype.f = function (b) {
        if (200 != b.statusCode || "OK" != b.statusDescription || "ValidCredentials" != b.authenticationResultCode || 1 != b.resourceSets.length || 1 != b.resourceSets[0].resources.length)rj(this, "error"); else {
            var c = b.brandLogoUri, d = b.resourceSets[0].resources[0], e = -1 == this.a ? d.zoomMax : this.a, f = new ex({
                extent: Ej(this.g),
                minZoom: d.zoomMin,
                maxZoom: e,
                tileSize: d.imageWidth
            });
            this.tileGrid = f;
            var g = this.d;
            this.tileUrlFunction = Yw(f.Bb(), Ww(Va(d.imageUrlSubdomains, function (b) {
                var c = d.imageUrl.replace("{subdomain}",
                    b).replace("{culture}", g);
                return function (b) {
                    return null === b ? void 0 : c.replace("{quadkey}", mf(b))
                }
            })));
            if (d.imageryProviders) {
                var h = De(Ee("EPSG:4326"), this.g);
                b = Va(d.imageryProviders, function (b) {
                    var c = b.attribution, d = {};
                    Ta(b.coverageAreas, function (b) {
                        var c = b.zoomMin, g = Math.min(b.zoomMax, e);
                        b = b.bbox;
                        b = we([b[1], b[0], b[3], b[2]], h);
                        var k, n;
                        for (k = c; k <= g; ++k)n = k.toString(), c = zj(f, b, k), n in d ? d[n].push(c) : d[n] = [c]
                    });
                    return new tf({html: c, tileRanges: d})
                });
                b.push(gx);
                this.e = b
            }
            this.r = c;
            rj(this, "ready")
        }
    };
    function hx(b) {
        $v.call(this, {attributions: b.attributions, extent: b.extent, logo: b.logo, projection: b.projection});
        this.j = void 0;
        this.q = m(b.distance) ? b.distance : 20;
        this.a = [];
        this.p = b.source;
        this.p.u("change", hx.prototype.t, this)
    }

    u(hx, $v);
    hx.prototype.Hb = function (b, c, d) {
        c !== this.j && (this.clear(), this.j = c, this.p.Hb(b, c, d), ix(this), this.ya(this.a))
    };
    hx.prototype.t = function () {
        this.clear();
        ix(this);
        this.ya(this.a);
        this.l()
    };
    function ix(b) {
        if (m(b.j)) {
            $a(b.a);
            for (var c = Vd(), d = b.q * b.j, e = b.p.va(), f = {}, g = 0, h = e.length; g < h; g++) {
                var k = e[g];
                tb(f, ma(k).toString()) || (k = k.N().K(), ce(k, c), Yd(c, d, c), k = Xv(b.p.b, c), k = Ua(k, function (b) {
                    b = ma(b).toString();
                    return b in f ? !1 : f[b] = !0
                }), b.a.push(jx(k)))
            }
        }
    }

    function jx(b) {
        for (var c = b.length, d = [0, 0], e = 0; e < c; e++) {
            var f = b[e].N().K();
            yd(d, f)
        }
        c = 1 / c;
        d[0] *= c;
        d[1] *= c;
        d = new R(new hl(d));
        d.set("features", b);
        return d
    };
    function kx(b, c, d) {
        if (ka(b))d && (b = sa(b, d)); else if (b && "function" == typeof b.handleEvent)b = sa(b.handleEvent, b); else throw Error("Invalid listener argument");
        return 2147483647 < c ? -1 : ba.setTimeout(b, c || 0)
    };
    function lx() {
    }

    lx.prototype.a = null;
    function mx(b) {
        var c;
        (c = b.a) || (c = {}, nx(b) && (c[0] = !0, c[1] = !0), c = b.a = c);
        return c
    };
    var ox;

    function px() {
    }

    u(px, lx);
    function qx(b) {
        return (b = nx(b)) ? new ActiveXObject(b) : new XMLHttpRequest
    }

    function nx(b) {
        if (!b.c && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0; d < c.length; d++) {
                var e = c[d];
                try {
                    return new ActiveXObject(e), b.c = e
                } catch (f) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return b.c
    }

    ox = new px;
    function rx(b) {
        jd.call(this);
        this.r = new rh;
        this.i = b || null;
        this.a = !1;
        this.o = this.T = null;
        this.e = this.p = "";
        this.c = this.j = this.d = this.n = !1;
        this.g = 0;
        this.b = null;
        this.f = sx;
        this.q = this.t = !1
    }

    u(rx, jd);
    var sx = "", tx = /^https?$/i, ux = ["POST", "PUT"];
    l = rx.prototype;
    l.send = function (b, c, d, e) {
        if (this.T)throw Error("[goog.net.XhrIo] Object is active with another request=" + this.p + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        this.p = b;
        this.e = "";
        this.n = !1;
        this.a = !0;
        this.T = this.i ? qx(this.i) : qx(ox);
        this.o = this.i ? mx(this.i) : mx(ox);
        this.T.onreadystatechange = sa(this.Hf, this);
        try {
            this.j = !0, this.T.open(c, String(b), !0), this.j = !1
        } catch (f) {
            vx(this, f);
            return
        }
        b = d || "";
        var g = this.r.clone();
        e && qh(e, function (b, c) {
            g.set(c, b)
        });
        e = Xa(g.I());
        d = ba.FormData && b instanceof ba.FormData;
        !Za(ux,
            c) || e || d || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        g.forEach(function (b, c) {
            this.T.setRequestHeader(c, b)
        }, this);
        this.f && (this.T.responseType = this.f);
        "withCredentials"in this.T && (this.T.withCredentials = this.t);
        try {
            wx(this), 0 < this.g && ((this.q = xx(this.T)) ? (this.T.timeout = this.g, this.T.ontimeout = sa(this.bc, this)) : this.b = kx(this.bc, this.g, this)), this.d = !0, this.T.send(b), this.d = !1
        } catch (h) {
            vx(this, h)
        }
    };
    function xx(b) {
        return Hb && Tb(9) && ja(b.timeout) && m(b.ontimeout)
    }

    function Ya(b) {
        return "content-type" == b.toLowerCase()
    }

    l.bc = function () {
        "undefined" != typeof aa && this.T && (this.e = "Timed out after " + this.g + "ms, aborting", this.dispatchEvent("timeout"), this.T && this.a && (this.a = !1, this.c = !0, this.T.abort(), this.c = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), yx(this)))
    };
    function vx(b, c) {
        b.a = !1;
        b.T && (b.c = !0, b.T.abort(), b.c = !1);
        b.e = c;
        zx(b);
        yx(b)
    }

    function zx(b) {
        b.n || (b.n = !0, b.dispatchEvent("complete"), b.dispatchEvent("error"))
    }

    l.M = function () {
        this.T && (this.a && (this.a = !1, this.c = !0, this.T.abort(), this.c = !1), yx(this, !0));
        rx.S.M.call(this)
    };
    l.Hf = function () {
        this.Sa || (this.j || this.d || this.c ? Ax(this) : this.rk())
    };
    l.rk = function () {
        Ax(this)
    };
    function Ax(b) {
        if (b.a && "undefined" != typeof aa && (!b.o[1] || 4 != Bx(b) || 2 != Cx(b)))if (b.d && 4 == Bx(b))kx(b.Hf, 0, b); else if (b.dispatchEvent("readystatechange"), 4 == Bx(b)) {
            b.a = !1;
            try {
                if (Dx(b))b.dispatchEvent("complete"), b.dispatchEvent("success"); else {
                    var c;
                    try {
                        c = 2 < Bx(b) ? b.T.statusText : ""
                    } catch (d) {
                        c = ""
                    }
                    b.e = c + " [" + Cx(b) + "]";
                    zx(b)
                }
            } finally {
                yx(b)
            }
        }
    }

    function yx(b, c) {
        if (b.T) {
            wx(b);
            var d = b.T, e = b.o[0] ? ca : null;
            b.T = null;
            b.o = null;
            c || b.dispatchEvent("ready");
            try {
                d.onreadystatechange = e
            } catch (f) {
            }
        }
    }

    function wx(b) {
        b.T && b.q && (b.T.ontimeout = null);
        ja(b.b) && (ba.clearTimeout(b.b), b.b = null)
    }

    function Dx(b) {
        var c = Cx(b), d;
        a:switch (c) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                d = !0;
                break a;
            default:
                d = !1
        }
        if (!d) {
            if (c = 0 === c)b = vh(String(b.p))[1] || null, !b && self.location && (b = self.location.protocol, b = b.substr(0, b.length - 1)), c = !tx.test(b ? b.toLowerCase() : "");
            d = c
        }
        return d
    }

    function Bx(b) {
        return b.T ? b.T.readyState : 0
    }

    function Cx(b) {
        try {
            return 2 < Bx(b) ? b.T.status : -1
        } catch (c) {
            return -1
        }
    }

    function Ex(b) {
        try {
            return b.T ? b.T.responseText : ""
        } catch (c) {
            return ""
        }
    }

    function Fx(b) {
        try {
            if (!b.T)return null;
            if ("response"in b.T)return b.T.response;
            switch (b.f) {
                case sx:
                case "text":
                    return b.T.responseText;
                case "arraybuffer":
                    if ("mozResponseArrayBuffer"in b.T)return b.T.mozResponseArrayBuffer
            }
            return null
        } catch (c) {
            return null
        }
    };
    function Gx(b) {
        $v.call(this, {attributions: b.attributions, logo: b.logo, projection: b.projection});
        this.format = b.format
    }

    u(Gx, $v);
    function Hx(b, c, d, e, f) {
        var g = new rx;
        g.f = "binary" == b.format.H() && bg ? "arraybuffer" : "text";
        z(g, "complete", function (b) {
            b = b.target;
            if (Dx(b)) {
                var c = this.format.H(), g;
                if ("binary" == c && bg)g = Fx(b); else if ("json" == c)g = Ex(b); else if ("text" == c)g = Ex(b); else if ("xml" == c) {
                    if (!Hb)try {
                        g = b.T ? b.T.responseXML : null
                    } catch (p) {
                        g = null
                    }
                    null != g || (g = hq(Ex(b)))
                }
                null != g ? d.call(f, this.a(g)) : rj(this, "error")
            } else e.call(f);
            tc(b)
        }, !1, b);
        g.send(c)
    }

    Gx.prototype.a = function (b) {
        return this.format.ja(b, {featureProjection: this.g})
    };
    function Ix(b) {
        Gx.call(this, {attributions: b.attributions, format: b.format, logo: b.logo, projection: b.projection});
        m(b.arrayBuffer) && this.fb(this.a(b.arrayBuffer));
        m(b.doc) && this.fb(this.a(b.doc));
        m(b.node) && this.fb(this.a(b.node));
        m(b.object) && this.fb(this.a(b.object));
        m(b.text) && this.fb(this.a(b.text));
        if (m(b.url) || m(b.urls))if (rj(this, "loading"), m(b.url) && Hx(this, b.url, this.p, this.j, this), m(b.urls)) {
            b = b.urls;
            var c, d;
            c = 0;
            for (d = b.length; c < d; ++c)Hx(this, b[c], this.p, this.j, this)
        }
    }

    u(Ix, Gx);
    Ix.prototype.j = function () {
        rj(this, "error")
    };
    Ix.prototype.p = function (b) {
        this.fb(b);
        rj(this, "ready")
    };
    function Jx(b) {
        b = m(b) ? b : {};
        Ix.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            format: new Dp({defaultDataProjection: b.defaultProjection}),
            logo: b.logo,
            object: b.object,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    u(Jx, Ix);
    function Kx(b) {
        b = m(b) ? b : {};
        Ix.call(this, {
            attributions: b.attributions,
            doc: b.doc,
            extent: b.extent,
            format: new Uq,
            logo: b.logo,
            node: b.node,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    u(Kx, Ix);
    function Lx(b) {
        b = m(b) ? b : {};
        Ix.call(this, {
            format: new Er({altitudeMode: b.altitudeMode}),
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    u(Lx, Ix);
    function Mx(b) {
        qj.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            logo: b.logo,
            projection: b.projection,
            state: b.state
        });
        this.o = m(b.resolutions) ? b.resolutions : null
    }

    u(Mx, qj);
    function Nx(b, c) {
        if (null !== b.o) {
            var d = ec(b.o, c, 0);
            c = b.o[d]
        }
        return c
    }

    function Ox(b, c) {
        b.c().src = c
    };
    function Px(b) {
        Mx.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            resolutions: b.resolutions,
            state: m(b.state) ? b.state : void 0
        });
        this.t = b.canvasFunction;
        this.p = null;
        this.q = 0;
        this.F = m(b.ratio) ? b.ratio : 1.5
    }

    u(Px, Mx);
    Px.prototype.rc = function (b, c, d, e) {
        c = Nx(this, c);
        var f = this.p;
        if (null !== f && this.q == this.c && f.resolution == c && f.e == d && $d(f.D(), b))return f;
        b = b.slice();
        ue(b, this.F);
        e = this.t(b, c, d, [re(b) / c * d, oe(b) / c * d], e);
        null === e || (f = new Wu(b, c, d, this.e, e));
        this.p = f;
        this.q = this.c;
        return f
    };
    function Qx(b) {
        Mx.call(this, {projection: b.projection, resolutions: b.resolutions});
        this.q = m(b.crossOrigin) ? b.crossOrigin : null;
        this.b = m(b.displayDpi) ? b.displayDpi : 96;
        this.a = m(b.params) ? b.params : {};
        var c;
        m(b.url) ? c = Yu(b.url, this.a, sa(this.Q, this)) : c = Zu;
        this.j = c;
        this.F = m(b.imageLoadFunction) ? b.imageLoadFunction : Ox;
        this.t = m(b.hidpi) ? b.hidpi : !0;
        this.p = m(b.metersPerUnit) ? b.metersPerUnit : 1;
        this.f = m(b.ratio) ? b.ratio : 1;
        this.ba = m(b.useOverlay) ? b.useOverlay : !1;
        this.d = null;
        this.i = 0
    }

    u(Qx, Mx);
    Qx.prototype.J = function () {
        return this.a
    };
    Qx.prototype.rc = function (b, c, d, e) {
        c = Nx(this, c);
        d = this.t ? d : 1;
        var f = this.d;
        if (null !== f && this.i == this.c && f.resolution == c && f.e == d && $d(f.D(), b))return f;
        1 != this.f && (b = b.slice(), ue(b, this.f));
        e = this.j(b, [re(b) / c * d, oe(b) / c * d], e);
        m(e) ? f = new Vu(b, c, d, this.e, e, this.q, this.F) : f = null;
        this.d = f;
        this.i = this.c;
        return f
    };
    Qx.prototype.V = function (b) {
        Eb(this.a, b);
        this.l()
    };
    Qx.prototype.Q = function (b, c, d, e) {
        var f;
        f = this.p;
        var g = re(d), h = oe(d), k = e[0], n = e[1], p = .0254 / this.b;
        f = n * g > k * h ? g * f / (k * p) : h * f / (n * p);
        d = ke(d);
        e = {
            OPERATION: this.ba ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
            VERSION: "2.0.0",
            LOCALE: "en",
            CLIENTAGENT: "ol.source.ImageMapGuide source",
            CLIP: "1",
            SETDISPLAYDPI: this.b,
            SETDISPLAYWIDTH: Math.round(e[0]),
            SETDISPLAYHEIGHT: Math.round(e[1]),
            SETVIEWSCALE: f,
            SETVIEWCENTERX: d[0],
            SETVIEWCENTERY: d[1]
        };
        Eb(e, c);
        return xh(zh([b], e))
    };
    function Rx(b) {
        var c = m(b.attributions) ? b.attributions : null, d = b.imageExtent, e, f;
        m(b.imageSize) && (e = oe(d) / b.imageSize[1], f = [e]);
        var g = m(b.crossOrigin) ? b.crossOrigin : null, h = m(b.imageLoadFunction) ? b.imageLoadFunction : Ox;
        Mx.call(this, {attributions: c, logo: b.logo, projection: Ee(b.projection), resolutions: f});
        this.a = new Vu(d, e, 1, c, b.url, g, h)
    }

    u(Rx, Mx);
    Rx.prototype.rc = function (b) {
        return qe(b, this.a.D()) ? this.a : null
    };
    function Sx(b) {
        this.a = b.source;
        this.J = Kd();
        this.b = Tf();
        this.d = [0, 0];
        this.i = null;
        Px.call(this, {
            attributions: b.attributions,
            canvasFunction: sa(this.Xg, this),
            logo: b.logo,
            projection: b.projection,
            ratio: b.ratio,
            resolutions: b.resolutions,
            state: this.a.n
        });
        this.j = null;
        this.f = void 0;
        this.yf(b.style);
        z(this.a, "change", this.Aj, void 0, this)
    }

    u(Sx, Px);
    l = Sx.prototype;
    l.Xg = function (b, c, d, e, f) {
        var g = new Um(.5 * c / d, b, c);
        this.a.Hb(b, c, f);
        var h = !1;
        this.a.Db(b, c, function (b) {
            var e;
            if (!(e = h)) {
                var f;
                m(b.a) ? f = b.a.call(b, c) : m(this.f) && (f = this.f(b, c));
                if (null != f) {
                    var q, r = !1;
                    e = 0;
                    for (q = f.length; e < q; ++e)r = zn(g, b, f[e], yn(c, d), this.zj, this) || r;
                    e = r
                } else e = !1
            }
            h = e
        }, this);
        Vm(g);
        if (h)return null;
        this.d[0] != e[0] || this.d[1] != e[1] ? (this.b.canvas.width = e[0], this.b.canvas.height = e[1], this.d[0] = e[0], this.d[1] = e[1]) : this.b.clearRect(0, 0, e[0], e[1]);
        b = Tx(this, ke(b), c, d, e);
        Zm(g, this.b, d, b, 0,
            {});
        this.i = g;
        return this.b.canvas
    };
    l.yd = function (b, c, d, e, f) {
        if (null !== this.i) {
            var g = {};
            return Wm(this.i, b, 0, d, e, function (b) {
                var c = ma(b).toString();
                if (!(c in g))return g[c] = !0, f(b)
            })
        }
    };
    l.wj = function () {
        return this.a
    };
    l.xj = function () {
        return this.j
    };
    l.yj = function () {
        return this.f
    };
    function Tx(b, c, d, e, f) {
        return Vj(b.J, f[0] / 2, f[1] / 2, e / d, -e / d, 0, -c[0], -c[1])
    }

    l.zj = function () {
        this.l()
    };
    l.Aj = function () {
        rj(this, this.a.n)
    };
    l.yf = function (b) {
        this.j = m(b) ? b : Ul;
        this.f = null === b ? void 0 : Tl(this.j);
        this.l()
    };
    function Ux(b) {
        b = m(b) ? b : {};
        Mx.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            resolutions: b.resolutions
        });
        this.t = m(b.crossOrigin) ? b.crossOrigin : null;
        this.b = b.url;
        this.J = m(b.imageLoadFunction) ? b.imageLoadFunction : Ox;
        this.a = b.params;
        this.f = !0;
        Vx(this);
        this.q = b.serverType;
        this.F = m(b.hidpi) ? b.hidpi : !0;
        this.d = null;
        this.i = [0, 0];
        this.p = 0;
        this.j = m(b.ratio) ? b.ratio : 1.5
    }

    u(Ux, Mx);
    var Wx = [101, 101];
    l = Ux.prototype;
    l.Bj = function (b, c, d, e) {
        if (m(this.b)) {
            var f = ne(b, c, 0, Wx), g = {
                SERVICE: "WMS",
                VERSION: "1.3.0",
                REQUEST: "GetFeatureInfo",
                FORMAT: "image/png",
                TRANSPARENT: !0,
                QUERY_LAYERS: x(this.a, "LAYERS")
            };
            Eb(g, this.a, e);
            e = Math.floor((f[3] - b[1]) / c);
            g[this.f ? "I" : "X"] = Math.floor((b[0] - f[0]) / c);
            g[this.f ? "J" : "Y"] = e;
            return Xx(this, f, Wx, 1, Ee(d), g)
        }
    };
    l.Cj = function () {
        return this.a
    };
    l.rc = function (b, c, d, e) {
        if (!m(this.b))return null;
        c = Nx(this, c);
        1 == d || this.F && m(this.q) || (d = 1);
        var f = this.d;
        if (null !== f && this.p == this.c && f.resolution == c && f.e == d && $d(f.D(), b))return f;
        f = {SERVICE: "WMS", VERSION: "1.3.0", REQUEST: "GetMap", FORMAT: "image/png", TRANSPARENT: !0};
        Eb(f, this.a);
        b = b.slice();
        var g = (b[0] + b[2]) / 2, h = (b[1] + b[3]) / 2;
        if (1 != this.j) {
            var k = this.j * re(b) / 2, n = this.j * oe(b) / 2;
            b[0] = g - k;
            b[1] = h - n;
            b[2] = g + k;
            b[3] = h + n
        }
        var k = c / d, n = Math.ceil(re(b) / k), p = Math.ceil(oe(b) / k);
        b[0] = g - k * n / 2;
        b[2] = g + k * n / 2;
        b[1] = h - k *
        p / 2;
        b[3] = h + k * p / 2;
        this.i[0] = n;
        this.i[1] = p;
        e = Xx(this, b, this.i, d, e, f);
        this.d = new Vu(b, c, d, this.e, e, this.t, this.J);
        this.p = this.c;
        return this.d
    };
    function Xx(b, c, d, e, f, g) {
        g[b.f ? "CRS" : "SRS"] = f.a;
        "STYLES"in b.a || (g.STYLES = new String(""));
        if (1 != e)switch (b.q) {
            case "geoserver":
                g.FORMAT_OPTIONS = "dpi:" + (90 * e + .5 | 0);
                break;
            case "mapserver":
                g.MAP_RESOLUTION = 90 * e;
                break;
            case "carmentaserver":
            case "qgis":
                g.DPI = 90 * e
        }
        g.WIDTH = d[0];
        g.HEIGHT = d[1];
        d = f.b;
        var h;
        b.f && "ne" == d.substr(0, 2) ? h = [c[1], c[0], c[3], c[2]] : h = c;
        g.BBOX = h.join(",");
        return xh(zh([b.b], g))
    }

    l.Dj = function () {
        return this.b
    };
    l.Ej = function (b) {
        b != this.b && (this.b = b, this.d = null, this.l())
    };
    l.Fj = function (b) {
        Eb(this.a, b);
        Vx(this);
        this.d = null;
        this.l()
    };
    function Vx(b) {
        b.f = 0 <= Na(x(b.a, "VERSION", "1.3.0"), "1.3")
    };
    function Yx(b) {
        b = m(b) ? b : {};
        Ix.call(this, {
            attributions: b.attributions,
            doc: b.doc,
            format: new Jr({extractStyles: b.extractStyles, defaultStyle: b.defaultStyle}),
            logo: b.logo,
            node: b.node,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    u(Yx, Ix);
    function Zx(b) {
        var c = m(b.projection) ? b.projection : "EPSG:3857", d = new ex({
            extent: Ej(c),
            maxZoom: b.maxZoom,
            tileSize: b.tileSize
        });
        cx.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            projection: c,
            tileGrid: d,
            tileLoadFunction: b.tileLoadFunction,
            tilePixelRatio: b.tilePixelRatio,
            tileUrlFunction: Xw
        });
        this.d = d.Bb({wrapX: b.wrapX});
        m(b.tileUrlFunction) ? this.pa(b.tileUrlFunction) : m(b.urls) ? this.pa(Vw(b.urls)) : m(b.url) && this.a(b.url)
    }

    u(Zx, cx);
    Zx.prototype.pa = function (b) {
        Zx.S.pa.call(this, Yw(this.d, b))
    };
    Zx.prototype.a = function (b) {
        this.pa(Vw(Zw(b)))
    };
    function $x(b) {
        b = m(b) ? b : {};
        var c;
        m(b.attributions) ? c = b.attributions : c = [ay];
        var d = Wb ? "https:" : "http:";
        Zx.call(this, {
            attributions: c,
            crossOrigin: m(b.crossOrigin) ? b.crossOrigin : "anonymous",
            opaque: !0,
            maxZoom: m(b.maxZoom) ? b.maxZoom : 19,
            tileLoadFunction: b.tileLoadFunction,
            url: m(b.url) ? b.url : d + "//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        })
    }

    u($x, Zx);
    var ay = new tf({html: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});

    function by(b) {
        b = m(b) ? b : {};
        var c = cy[b.layer];
        Zx.call(this, {
            attributions: c.attributions,
            crossOrigin: "anonymous",
            logo: "//developer.mapquest.com/content/osm/mq_logo.png",
            maxZoom: c.maxZoom,
            opaque: !0,
            tileLoadFunction: b.tileLoadFunction,
            url: (Wb ? "https:" : "http:") + "//otile{1-4}-s.mqcdn.com/tiles/1.0.0/" + b.layer + "/{z}/{x}/{y}.jpg"
        })
    }

    u(by, Zx);
    var dy = new tf({html: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'}), cy = {
        osm: {
            maxZoom: 19,
            attributions: [dy, ay]
        },
        sat: {
            maxZoom: 18,
            attributions: [dy, new tf({html: "Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]
        },
        hyb: {maxZoom: 18, attributions: [dy, ay]}
    };

    function ey(b) {
        b = m(b) ? b : {};
        Ix.call(this, {
            attributions: b.attributions,
            doc: b.doc,
            format: new nt,
            logo: b.logo,
            node: b.node,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    u(ey, Ix);
    function fy(b) {
        Gx.call(this, {attributions: b.attributions, format: b.format, logo: b.logo, projection: b.projection});
        this.p = new Vv;
        this.q = b.loader;
        this.t = m(b.strategy) ? b.strategy : Hw;
        this.j = {}
    }

    u(fy, Gx);
    fy.prototype.fb = function (b) {
        var c = [], d, e;
        d = 0;
        for (e = b.length; d < e; ++d) {
            var f = b[d], g = f.X;
            m(g) ? g in this.j || (c.push(f), this.j[g] = !0) : c.push(f)
        }
        fy.S.fb.call(this, c)
    };
    fy.prototype.clear = function () {
        yb(this.j);
        this.p.clear();
        fy.S.clear.call(this)
    };
    fy.prototype.Hb = function (b, c, d) {
        var e = this.p;
        b = this.t(b, c);
        var f, g;
        f = 0;
        for (g = b.length; f < g; ++f) {
            var h = b[f];
            Zv(e, h, function (b) {
                return $d(b.extent, h)
            }) || (this.q.call(this, h, c, d), e.na(h, {extent: h.slice()}))
        }
    };
    var gy = {
        terrain: {Wa: "jpg", opaque: !0},
        "terrain-background": {Wa: "jpg", opaque: !0},
        "terrain-labels": {Wa: "png", opaque: !1},
        "terrain-lines": {Wa: "png", opaque: !1},
        "toner-background": {Wa: "png", opaque: !0},
        toner: {Wa: "png", opaque: !0},
        "toner-hybrid": {Wa: "png", opaque: !1},
        "toner-labels": {Wa: "png", opaque: !1},
        "toner-lines": {Wa: "png", opaque: !1},
        "toner-lite": {Wa: "png", opaque: !0},
        watercolor: {Wa: "jpg", opaque: !0}
    }, hy = {
        terrain: {minZoom: 4, maxZoom: 18},
        toner: {minZoom: 0, maxZoom: 20},
        watercolor: {minZoom: 3, maxZoom: 16}
    };

    function iy(b) {
        var c = b.layer.indexOf("-"), d = gy[b.layer], e = Wb ? "https://stamen-tiles-{a-d}.a.ssl.fastly.net/" : "http://{a-d}.tile.stamen.com/";
        Zx.call(this, {
            attributions: jy,
            crossOrigin: "anonymous",
            maxZoom: hy[-1 == c ? b.layer : b.layer.slice(0, c)].maxZoom,
            opaque: d.opaque,
            tileLoadFunction: b.tileLoadFunction,
            url: m(b.url) ? b.url : e + b.layer + "/{z}/{x}/{y}." + d.Wa
        })
    }

    u(iy, Zx);
    var jy = [new tf({html: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}), ay];

    function ky(b, c) {
        uj.call(this, b, 2);
        this.b = c.sa(b[0]);
        this.c = {}
    }

    u(ky, uj);
    ky.prototype.Na = function (b) {
        b = m(b) ? ma(b) : -1;
        if (b in this.c)return this.c[b];
        var c = this.b, d = Tf(c, c);
        d.strokeStyle = "black";
        d.strokeRect(.5, .5, c + .5, c + .5);
        d.fillStyle = "black";
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.font = "24px sans-serif";
        d.fillText(nf(this.a), c / 2, c / 2);
        return this.c[b] = d.canvas
    };
    function ly(b) {
        Fj.call(this, {opaque: !1, projection: b.projection, tileGrid: b.tileGrid});
        this.a = new $w
    }

    u(ly, Fj);
    ly.prototype.zd = function () {
        return ax(this.a)
    };
    ly.prototype.se = function (b) {
        bx(this.a, b)
    };
    ly.prototype.Fb = function (b, c, d) {
        var e = this.hb(b, c, d);
        if (Eo(this.a, e))return this.a.get(e);
        b = new ky([b, c, d], this.tileGrid);
        this.a.set(e, b);
        return b
    };
    function my(b) {
        cx.call(this, {
            crossOrigin: b.crossOrigin,
            projection: Ee("EPSG:3857"),
            state: "loading",
            tileLoadFunction: b.tileLoadFunction
        });
        this.d = b.wrapX;
        (new Pw(b.url)).send(void 0, sa(this.a, this))
    }

    u(my, cx);
    my.prototype.a = function (b) {
        var c = Ee("EPSG:4326"), d = this.g, e;
        m(b.bounds) && (e = we(b.bounds, De(c, d)));
        var f = b.minzoom || 0, g = b.maxzoom || 22;
        this.tileGrid = d = new ex({extent: Ej(d), maxZoom: g, minZoom: f});
        this.tileUrlFunction = Yw(d.Bb({extent: e, wrapX: this.d}), Vw(b.tiles));
        if (m(b.attribution)) {
            c = m(e) ? e : c.D();
            e = {};
            for (var h; f <= g; ++f)h = f.toString(), e[h] = [zj(d, c, f)];
            this.e = [new tf({html: b.attribution, tileRanges: e})]
        }
        rj(this, "ready")
    };
    function ny(b) {
        Fj.call(this, {projection: Ee("EPSG:3857"), state: "loading"});
        this.f = m(b.preemptive) ? b.preemptive : !0;
        this.b = Xw;
        this.a = new $w;
        this.d = void 0;
        (new Pw(b.url)).send(void 0, sa(this.Gj, this))
    }

    u(ny, Fj);
    l = ny.prototype;
    l.zd = function () {
        return ax(this.a)
    };
    l.se = function (b) {
        bx(this.a, b)
    };
    l.Gh = function () {
        return this.d
    };
    l.eh = function (b, c, d, e, f) {
        null === this.tileGrid ? !0 === f ? $h(function () {
            d.call(e, null)
        }) : d.call(e, null) : (c = this.tileGrid.Vb(b, c), oy(this.Fb(c[0], c[1], c[2], 1, this.g), b, d, e, f))
    };
    l.Gj = function (b) {
        var c = Ee("EPSG:4326"), d = this.g, e;
        m(b.bounds) && (e = we(b.bounds, De(c, d)));
        var f = b.minzoom || 0, g = b.maxzoom || 22;
        this.tileGrid = d = new ex({extent: Ej(d), maxZoom: g, minZoom: f});
        this.d = b.template;
        var h = b.grids;
        if (null != h) {
            this.b = Yw(d.Bb({extent: e}), Vw(h));
            if (m(b.attribution)) {
                c = m(e) ? e : c.D();
                for (e = {}; f <= g; ++f)h = f.toString(), e[h] = [zj(d, c, f)];
                this.e = [new tf({html: b.attribution, tileRanges: e})]
            }
            rj(this, "ready")
        } else rj(this, "error")
    };
    l.Fb = function (b, c, d, e, f) {
        var g = this.hb(b, c, d);
        if (Eo(this.a, g))return this.a.get(g);
        b = [b, c, d];
        e = this.b(b, e, f);
        e = new py(b, m(e) ? 0 : 4, m(e) ? e : "", yj(this.tileGrid, b), this.f);
        this.a.set(g, e);
        return e
    };
    l.He = function (b, c, d) {
        b = this.hb(b, c, d);
        Eo(this.a, b) && this.a.get(b)
    };
    function py(b, c, d, e, f) {
        uj.call(this, b, c);
        this.g = d;
        this.c = e;
        this.o = f;
        this.d = this.e = this.b = null
    }

    u(py, uj);
    l = py.prototype;
    l.Na = function () {
        return null
    };
    function qy(b, c) {
        if (null === b.b || null === b.e || null === b.d)return null;
        var d = b.b[Math.floor((1 - (c[1] - b.c[1]) / (b.c[3] - b.c[1])) * b.b.length)];
        if (!ia(d))return null;
        d = d.charCodeAt(Math.floor((c[0] - b.c[0]) / (b.c[2] - b.c[0]) * d.length));
        93 <= d && d--;
        35 <= d && d--;
        d = b.e[d - 32];
        return null != d ? b.d[d] : null
    }

    function oy(b, c, d, e, f) {
        0 == b.state && !0 === f ? (Wc(b, "change", function () {
            d.call(e, qy(this, c))
        }, !1, b), ry(b)) : !0 === f ? $h(function () {
            d.call(e, qy(this, c))
        }, b) : d.call(e, qy(b, c))
    }

    l.mb = function () {
        return this.g
    };
    l.Vh = function () {
        this.state = 3;
        vj(this)
    };
    l.gi = function (b) {
        this.b = b.grid;
        this.e = b.keys;
        this.d = b.data;
        this.state = 4;
        vj(this)
    };
    function ry(b) {
        0 == b.state && (b.state = 1, (new Pw(b.g)).send(void 0, sa(b.gi, b), sa(b.Vh, b)))
    }

    l.load = function () {
        this.o && ry(this)
    };
    function sy(b) {
        Gx.call(this, {attributions: b.attributions, format: b.format, logo: b.logo, projection: b.projection});
        this.p = b.tileGrid;
        this.q = Xw;
        this.t = this.p.Bb();
        this.j = {};
        m(b.tileUrlFunction) ? (this.q = b.tileUrlFunction, this.l()) : m(b.urls) ? (this.q = Vw(b.urls), this.l()) : m(b.url) && (this.q = Vw(Zw(b.url)), this.l())
    }

    u(sy, Gx);
    l = sy.prototype;
    l.clear = function () {
        yb(this.j)
    };
    function ty(b, c, d, e) {
        var f = b.j;
        b = b.p.Vb(c, d);
        f = f[b[0] + "/" + b[1] + "/" + b[2]];
        if (m(f))for (b = 0, d = f.length; b < d; ++b) {
            var g = f[b];
            if (g.N().Jb(c[0], c[1]) && e.call(void 0, g))break
        }
    }

    l.Db = function (b, c, d, e) {
        var f = this.p, g = this.j;
        c = ec(f.a, c, 0);
        b = zj(f, b, c);
        for (var h, f = b.a; f <= b.d; ++f)for (h = b.b; h <= b.c; ++h) {
            var k = g[c + "/" + f + "/" + h];
            if (m(k)) {
                var n, p;
                n = 0;
                for (p = k.length; n < p; ++n) {
                    var q = d.call(e, k[n]);
                    if (q)return q
                }
            }
        }
    };
    l.va = function () {
        var b = this.j, c = [], d;
        for (d in b)db(c, b[d]);
        return c
    };
    l.jh = function (b, c) {
        var d = [];
        ty(this, b, c, function (b) {
            d.push(b)
        });
        return d
    };
    l.Hb = function (b, c, d) {
        function e(b, c) {
            k[b] = c;
            rj(this, "ready")
        }

        var f = this.t, g = this.p, h = this.q, k = this.j;
        c = ec(g.a, c, 0);
        b = zj(g, b, c);
        var g = [c, 0, 0], n, p;
        for (n = b.a; n <= b.d; ++n)for (p = b.b; p <= b.c; ++p) {
            var q = c + "/" + n + "/" + p;
            if (!(q in k)) {
                g[0] = c;
                g[1] = n;
                g[2] = p;
                f(g, d, g);
                var r = h(g, 1, d);
                m(r) && (k[q] = [], Hx(this, r, ta(e, q), ca, this))
            }
        }
    };
    function uy(b) {
        b = m(b) ? b : {};
        var c = m(b.params) ? b.params : {};
        cx.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            opaque: !x(c, "TRANSPARENT", !0),
            projection: b.projection,
            tileGrid: b.tileGrid,
            tileLoadFunction: b.tileLoadFunction,
            tileUrlFunction: sa(this.Kj, this)
        });
        var d = b.urls;
        !m(d) && m(b.url) && (d = Zw(b.url));
        this.f = null != d ? d : [];
        this.o = m(b.gutter) ? b.gutter : 0;
        this.a = c;
        this.d = !0;
        this.i = b.serverType;
        this.p = m(b.hidpi) ? b.hidpi : !0;
        this.j = "";
        vy(this);
        this.q = Vd();
        wy(this)
    }

    u(uy, cx);
    l = uy.prototype;
    l.Hj = function (b, c, d, e) {
        d = Ee(d);
        var f = this.tileGrid;
        null === f && (f = Gj(this, d));
        c = f.Vb(b, c);
        if (!(f.a.length <= c[0])) {
            var g = f.ka(c[0]), h = yj(f, c, this.q), f = f.sa(c[0]), k = this.o;
            0 !== k && (f += 2 * k, h = Yd(h, g * k, h));
            k = {
                SERVICE: "WMS",
                VERSION: "1.3.0",
                REQUEST: "GetFeatureInfo",
                FORMAT: "image/png",
                TRANSPARENT: !0,
                QUERY_LAYERS: x(this.a, "LAYERS")
            };
            Eb(k, this.a, e);
            e = Math.floor((h[3] - b[1]) / g);
            k[this.d ? "I" : "X"] = Math.floor((b[0] - h[0]) / g);
            k[this.d ? "J" : "Y"] = e;
            return xy(this, c, f, h, 1, d, k)
        }
    };
    l.bd = function () {
        return this.o
    };
    l.hb = function (b, c, d) {
        return this.j + uy.S.hb.call(this, b, c, d)
    };
    l.Ij = function () {
        return this.a
    };
    function xy(b, c, d, e, f, g, h) {
        var k = b.f;
        if (0 != k.length) {
            h.WIDTH = d;
            h.HEIGHT = d;
            h[b.d ? "CRS" : "SRS"] = g.a;
            "STYLES"in b.a || (h.STYLES = new String(""));
            if (1 != f)switch (b.i) {
                case "geoserver":
                    h.FORMAT_OPTIONS = "dpi:" + (90 * f + .5 | 0);
                    break;
                case "mapserver":
                    h.MAP_RESOLUTION = 90 * f;
                    break;
                case "carmentaserver":
                case "qgis":
                    h.DPI = 90 * f
            }
            d = g.b;
            b.d && "ne" == d.substr(0, 2) && (b = e[0], e[0] = e[1], e[1] = b, b = e[2], e[2] = e[3], e[3] = b);
            h.BBOX = e.join(",");
            return xh(zh([1 == k.length ? k[0] : k[Zb((c[1] << c[0]) + c[2], k.length)]], h))
        }
    }

    l.Gc = function (b, c, d) {
        b = uy.S.Gc.call(this, b, c, d);
        return 1 != c && this.p && m(this.i) ? b * c + .5 | 0 : b
    };
    l.Kh = function () {
        return this.f
    };
    function vy(b) {
        var c = 0, d = [], e, f;
        e = 0;
        for (f = b.f.length; e < f; ++e)d[c++] = b.f[e];
        for (var g in b.a)d[c++] = g + "-" + b.a[g];
        b.j = d.join("#")
    }

    l.Jj = function (b) {
        b = m(b) ? Zw(b) : null;
        this.zf(b)
    };
    l.zf = function (b) {
        this.f = null != b ? b : [];
        vy(this);
        this.l()
    };
    l.Kj = function (b, c, d) {
        var e = this.tileGrid;
        null === e && (e = Gj(this, d));
        if (!(e.a.length <= b[0])) {
            1 == c || this.p && m(this.i) || (c = 1);
            var f = e.ka(b[0]), g = yj(e, b, this.q), e = e.sa(b[0]), h = this.o;
            0 !== h && (e += 2 * h, g = Yd(g, f * h, g));
            1 != c && (e = e * c + .5 | 0);
            f = {SERVICE: "WMS", VERSION: "1.3.0", REQUEST: "GetMap", FORMAT: "image/png", TRANSPARENT: !0};
            Eb(f, this.a);
            return xy(this, b, e, g, c, d, f)
        }
    };
    l.Lj = function (b) {
        Eb(this.a, b);
        vy(this);
        wy(this);
        this.l()
    };
    function wy(b) {
        b.d = 0 <= Na(x(b.a, "VERSION", "1.3.0"), "1.3")
    };
    function yy(b) {
        b = m(b) ? b : {};
        Ix.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            format: new Dt({defaultDataProjection: b.defaultProjection}),
            logo: b.logo,
            object: b.object,
            projection: b.projection,
            text: b.text,
            url: b.url
        })
    }

    u(yy, Ix);
    function zy(b) {
        this.b = b.matrixIds;
        wj.call(this, {
            origin: b.origin,
            origins: b.origins,
            resolutions: b.resolutions,
            tileSize: b.tileSize,
            tileSizes: b.tileSizes
        })
    }

    u(zy, wj);
    zy.prototype.g = function () {
        return this.b
    };
    function Ay(b) {
        function c(b) {
            b = "KVP" == f ? xh(zh([b], h)) : b.replace(/\{(\w+?)\}/g, function (b, c) {
                return c in h ? h[c] : b
            });
            return function (c) {
                if (null !== c) {
                    var d = {TileMatrix: g.b[c[0]], TileCol: c[1], TileRow: c[2]};
                    Eb(d, k);
                    c = b;
                    return c = "KVP" == f ? xh(zh([c], d)) : c.replace(/\{(\w+?)\}/g, function (b, c) {
                        return d[c]
                    })
                }
            }
        }

        var d = m(b.version) ? b.version : "1.0.0", e = m(b.format) ? b.format : "image/jpeg";
        this.a = m(b.dimensions) ? b.dimensions : {};
        this.d = "";
        By(this);
        var f = m(b.requestEncoding) ? b.requestEncoding : "KVP", g = b.tileGrid, h = {
            Layer: b.layer,
            Style: b.style, TileMatrixSet: b.matrixSet
        };
        "KVP" == f && Eb(h, {Service: "WMTS", Request: "GetTile", Version: d, Format: e});
        var k = this.a, d = Xw, e = b.urls;
        !m(e) && m(b.url) && (e = Zw(b.url));
        m(e) && (d = Ww(Va(e, c)));
        var n = Vd(), p = [0, 0, 0], d = Yw(function (b, c, d) {
            if (g.a.length <= b[0])return null;
            var e = b[1], f = -b[2] - 1, h = yj(g, b, n), k = c.D();
            null !== k && c.f && (c = Math.ceil(re(k) / re(h)), e = Zb(e, c), p[0] = b[0], p[1] = e, p[2] = b[2], h = yj(g, p, n));
            return !qe(h, k) || qe(h, k) && (h[0] == k[2] || h[2] == k[0] || h[1] == k[3] || h[3] == k[1]) ? null : kf(b[0], e, f, d)
        }, d);
        cx.call(this,
            {
                attributions: b.attributions,
                crossOrigin: b.crossOrigin,
                logo: b.logo,
                projection: b.projection,
                tileClass: b.tileClass,
                tileGrid: g,
                tileLoadFunction: b.tileLoadFunction,
                tilePixelRatio: b.tilePixelRatio,
                tileUrlFunction: d
            })
    }

    u(Ay, cx);
    Ay.prototype.f = function () {
        return this.a
    };
    Ay.prototype.hb = function (b, c, d) {
        return this.d + Ay.S.hb.call(this, b, c, d)
    };
    function By(b) {
        var c = 0, d = [], e;
        for (e in b.a)d[c++] = e + "-" + b.a[e];
        b.d = d.join("/")
    }

    Ay.prototype.o = function (b) {
        Eb(this.a, b);
        By(this);
        this.l()
    };
    function Cy(b) {
        var c = m(b) ? b : c;
        wj.call(this, {origin: [0, 0], resolutions: c.resolutions})
    }

    u(Cy, wj);
    Cy.prototype.Bb = function (b) {
        b = m(b) ? b : {};
        var c = this.minZoom, d = this.maxZoom, e = null;
        if (m(b.extent)) {
            var e = Array(d + 1), f;
            for (f = 0; f <= d; ++f)e[f] = f < c ? null : zj(this, b.extent, f)
        }
        return function (b, f, k) {
            f = b[0];
            if (f < c || d < f)return null;
            var n = Math.pow(2, f), p = b[1];
            if (0 > p || n <= p)return null;
            b = b[2];
            return b < -n || -1 < b || null !== e && !qf(e[f], p, -b - 1) ? null : kf(f, p, -b - 1, k)
        }
    };
    function Dy(b) {
        b = m(b) ? b : {};
        var c = b.size, d = c[0], e = c[1], f = [], g = 256;
        switch (m(b.tierSizeCalculation) ? b.tierSizeCalculation : "default") {
            case "default":
                for (; d > g || e > g;)f.push([Math.ceil(d / g), Math.ceil(e / g)]), g += g;
                break;
            case "truncated":
                for (; d > g || e > g;)f.push([Math.ceil(d / g), Math.ceil(e / g)]), d >>= 1, e >>= 1
        }
        f.push([1, 1]);
        f.reverse();
        for (var g = [1], h = [0], e = 1, d = f.length; e < d; e++)g.push(1 << e), h.push(f[e - 1][0] * f[e - 1][1] + h[e - 1]);
        g.reverse();
        var g = new Cy({resolutions: g}), k = b.url, c = Yw(g.Bb({extent: [0, 0, c[0], c[1]]}), function (b) {
            if (null !==
                b) {
                var c = b[0], d = b[1];
                b = b[2];
                return k + "TileGroup" + ((d + b * f[c][0] + h[c]) / 256 | 0) + "/" + c + "-" + d + "-" + b + ".jpg"
            }
        });
        cx.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            tileClass: Ey,
            tileGrid: g,
            tileUrlFunction: c
        })
    }

    u(Dy, cx);
    function Ey(b, c, d, e, f) {
        Xu.call(this, b, c, d, e, f);
        this.e = {}
    }

    u(Ey, Xu);
    Ey.prototype.Na = function (b) {
        var c = m(b) ? ma(b).toString() : "";
        if (c in this.e)return this.e[c];
        b = Ey.S.Na.call(this, b);
        if (2 == this.state) {
            if (256 == b.width && 256 == b.height)return this.e[c] = b;
            var d = Tf(256, 256);
            d.drawImage(b, 0, 0);
            return this.e[c] = d.canvas
        }
        return b
    };
    function Fy(b) {
        b = m(b) ? b : {};
        this.c = m(b.initialSize) ? b.initialSize : 256;
        this.b = m(b.maxSize) ? b.maxSize : m(va) ? va : 2048;
        this.a = m(b.space) ? b.space : 1;
        this.e = [new Gy(this.c, this.a)];
        this.d = this.c;
        this.f = [new Gy(this.d, this.a)]
    }

    Fy.prototype.add = function (b, c, d, e, f, g) {
        if (c + this.a > this.b || d + this.a > this.b)return null;
        e = Hy(this, !1, b, c, d, e, g);
        if (null === e)return null;
        var h = null;
        m(f) && (h = Hy(this, !0, b, c, d, f, g));
        return {
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            image: e.image,
            Wl: null === h ? void 0 : h.offsetX,
            Xl: null === h ? void 0 : h.offsetY,
            kf: null === h ? void 0 : h.image
        }
    };
    function Hy(b, c, d, e, f, g, h) {
        var k = c ? b.f : b.e, n, p, q;
        p = 0;
        for (q = k.length; p < q; ++p) {
            n = k[p];
            n = n.add(d, e, f, g, h);
            if (null !== n)return n;
            null === n && p === q - 1 && (c ? (n = Math.min(2 * b.d, b.b), b.d = n) : (n = Math.min(2 * b.c, b.b), b.c = n), n = new Gy(n, b.a), k.push(n), ++q)
        }
    }

    function Gy(b, c) {
        this.a = c;
        this.c = [{x: 0, y: 0, width: b, height: b}];
        this.d = {};
        this.b = If("CANVAS");
        this.b.width = b;
        this.b.height = b;
        this.e = this.b.getContext("2d")
    }

    Gy.prototype.get = function (b) {
        return x(this.d, b, null)
    };
    Gy.prototype.add = function (b, c, d, e, f) {
        var g, h, k;
        h = 0;
        for (k = this.c.length; h < k; ++h)if (g = this.c[h], g.width >= c + this.a && g.height >= d + this.a)return k = {
            offsetX: g.x + this.a,
            offsetY: g.y + this.a,
            image: this.b
        }, this.d[b] = k, e.call(f, this.e, g.x + this.a, g.y + this.a), b = h, c = c + this.a, d = d + this.a, f = e = void 0, g.width - c > g.height - d ? (e = {
            x: g.x + c,
            y: g.y,
            width: g.width - c,
            height: g.height
        }, f = {x: g.x, y: g.y + d, width: c, height: g.height - d}, Iy(this, b, e, f)) : (e = {
            x: g.x + c,
            y: g.y,
            width: g.width - c,
            height: d
        }, f = {
            x: g.x, y: g.y + d, width: g.width, height: g.height -
            d
        }, Iy(this, b, e, f)), k;
        return null
    };
    function Iy(b, c, d, e) {
        c = [c, 1];
        0 < d.width && 0 < d.height && c.push(d);
        0 < e.width && 0 < e.height && c.push(e);
        b.c.splice.apply(b.c, c)
    };
    function Jy(b) {
        this.j = this.b = this.d = null;
        this.o = m(b.fill) ? b.fill : null;
        this.J = [0, 0];
        this.a = b.points;
        this.c = m(b.radius) ? b.radius : b.radius1;
        this.f = m(b.radius2) ? b.radius2 : this.c;
        this.g = m(b.angle) ? b.angle : 0;
        this.e = m(b.stroke) ? b.stroke : null;
        this.F = this.Q = this.t = null;
        var c = b.atlasManager, d = null, e, f = 0;
        null !== this.e && (e = wg(this.e.a), f = this.e.c, m(f) || (f = 1), d = this.e.b, cg || (d = null));
        var g = 2 * (this.c + f) + 1, d = {strokeStyle: e, Nc: f, size: g, lineDash: d};
        if (m(c)) {
            g = Math.round(g);
            e = null === this.o;
            var h;
            e && (h = sa(this.Df, this,
                d));
            f = this.ub();
            d = c.add(f, g, g, sa(this.Ef, this, d), h);
            this.b = d.image;
            this.J = [d.offsetX, d.offsetY];
            c = d.image.width;
            this.j = e ? d.kf : this.b
        } else this.b = If("CANVAS"), this.b.height = g, this.b.width = g, c = g = this.b.width, h = this.b.getContext("2d"), this.Ef(d, h, 0, 0), null === this.o ? (h = this.j = If("CANVAS"), h.height = d.size, h.width = d.size, h = h.getContext("2d"), this.Df(d, h, 0, 0)) : this.j = this.b;
        this.t = [g / 2, g / 2];
        this.Q = [g, g];
        this.F = [c, c];
        Rj.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: m(b.rotation) ? b.rotation : 0,
            scale: 1,
            snapToPixel: m(b.snapToPixel) ?
                b.snapToPixel : !0
        })
    }

    u(Jy, Rj);
    l = Jy.prototype;
    l.tb = function () {
        return this.t
    };
    l.Qj = function () {
        return this.g
    };
    l.Rj = function () {
        return this.o
    };
    l.te = function () {
        return this.j
    };
    l.yb = function () {
        return this.b
    };
    l.cd = function () {
        return this.F
    };
    l.ue = function () {
        return 2
    };
    l.zb = function () {
        return this.J
    };
    l.Sj = function () {
        return this.a
    };
    l.Tj = function () {
        return this.c
    };
    l.Eh = function () {
        return this.f
    };
    l.ab = function () {
        return this.Q
    };
    l.Uj = function () {
        return this.e
    };
    l.ne = ca;
    l.load = ca;
    l.Ge = ca;
    l.Ef = function (b, c, d, e) {
        var f;
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        this.f !== this.c && (this.a *= 2);
        for (d = 0; d <= this.a; d++)e = 2 * d * Math.PI / this.a - Math.PI / 2 + this.g, f = 0 === d % 2 ? this.c : this.f, c.lineTo(b.size / 2 + f * Math.cos(e), b.size / 2 + f * Math.sin(e));
        null !== this.o && (c.fillStyle = wg(this.o.a), c.fill());
        null !== this.e && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Nc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.Df = function (b, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        this.f !== this.c && (this.a *= 2);
        var f;
        for (d = 0; d <= this.a; d++)f = 2 * d * Math.PI / this.a - Math.PI / 2 + this.g, e = 0 === d % 2 ? this.c : this.f, c.lineTo(b.size / 2 + e * Math.cos(f), b.size / 2 + e * Math.sin(f));
        c.fillStyle = Ml;
        c.fill();
        null !== this.e && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Nc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.ub = function () {
        var b = null === this.e ? "-" : this.e.ub(), c = null === this.o ? "-" : this.o.ub();
        if (null === this.d || b != this.d[1] || c != this.d[2] || this.c != this.d[3] || this.f != this.d[4] || this.g != this.d[5] || this.a != this.d[6])this.d = ["r" + b + c + (m(this.c) ? this.c.toString() : "-") + (m(this.f) ? this.f.toString() : "-") + (m(this.g) ? this.g.toString() : "-") + (m(this.a) ? this.a.toString() : "-"), b, c, this.c, this.f, this.g, this.a];
        return this.d[0]
    };
    t("ol.animation.bounce", function (b) {
        var c = b.resolution, d = m(b.start) ? b.start : ua(), e = m(b.duration) ? b.duration : 1E3, f = m(b.easing) ? b.easing : ff;
        return function (b, h) {
            if (h.time < d)return h.animate = !0, h.viewHints[0] += 1, !0;
            if (h.time < d + e) {
                var k = f((h.time - d) / e), n = c - h.viewState.resolution;
                h.animate = !0;
                h.viewState.resolution += k * n;
                h.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }, OPENLAYERS);
    t("ol.animation.pan", gf, OPENLAYERS);
    t("ol.animation.rotate", hf, OPENLAYERS);
    t("ol.animation.zoom", jf, OPENLAYERS);
    t("ol.Attribution", tf, OPENLAYERS);
    tf.prototype.getHTML = tf.prototype.b;
    pg.prototype.element = pg.prototype.element;
    t("ol.Collection", B, OPENLAYERS);
    B.prototype.clear = B.prototype.clear;
    B.prototype.extend = B.prototype.qf;
    B.prototype.forEach = B.prototype.forEach;
    B.prototype.getArray = B.prototype.Mi;
    B.prototype.item = B.prototype.item;
    B.prototype.getLength = B.prototype.Ib;
    B.prototype.insertAt = B.prototype.rd;
    B.prototype.pop = B.prototype.pop;
    B.prototype.push = B.prototype.push;
    B.prototype.remove = B.prototype.remove;
    B.prototype.removeAt = B.prototype.De;
    B.prototype.setAt = B.prototype.bl;
    t("ol.coordinate.add", yd, OPENLAYERS);
    t("ol.coordinate.createStringXY", function (b) {
        return function (c) {
            return Fd(c, b)
        }
    }, OPENLAYERS);
    t("ol.coordinate.format", Bd, OPENLAYERS);
    t("ol.coordinate.rotate", Dd, OPENLAYERS);
    t("ol.coordinate.toStringHDMS", function (b) {
        return m(b) ? Ad(b[1], "NS") + " " + Ad(b[0], "EW") : ""
    }, OPENLAYERS);
    t("ol.coordinate.toStringXY", Fd, OPENLAYERS);
    t("ol.DeviceOrientation", Q, OPENLAYERS);
    Q.prototype.getAlpha = Q.prototype.e;
    Q.prototype.getBeta = Q.prototype.f;
    Q.prototype.getGamma = Q.prototype.g;
    Q.prototype.getHeading = Q.prototype.i;
    Q.prototype.getTracking = Q.prototype.d;
    Q.prototype.setTracking = Q.prototype.b;
    t("ol.easing.easeIn", function (b) {
        return Math.pow(b, 3)
    }, OPENLAYERS);
    t("ol.easing.easeOut", cf, OPENLAYERS);
    t("ol.easing.inAndOut", df, OPENLAYERS);
    t("ol.easing.linear", ef, OPENLAYERS);
    t("ol.easing.upAndDown", ff, OPENLAYERS);
    t("ol.extent.boundingExtent", Td, OPENLAYERS);
    t("ol.extent.buffer", Yd, OPENLAYERS);
    t("ol.extent.containsCoordinate", function (b, c) {
        return ae(b, c[0], c[1])
    }, OPENLAYERS);
    t("ol.extent.containsExtent", $d, OPENLAYERS);
    t("ol.extent.containsXY", ae, OPENLAYERS);
    t("ol.extent.createEmpty", Vd, OPENLAYERS);
    t("ol.extent.equals", de, OPENLAYERS);
    t("ol.extent.extend", ee, OPENLAYERS);
    t("ol.extent.getBottomLeft", he, OPENLAYERS);
    t("ol.extent.getBottomRight", ie, OPENLAYERS);
    t("ol.extent.getCenter", ke, OPENLAYERS);
    t("ol.extent.getHeight", oe, OPENLAYERS);
    t("ol.extent.getIntersection", pe, OPENLAYERS);
    t("ol.extent.getSize", function (b) {
        return [b[2] - b[0], b[3] - b[1]]
    }, OPENLAYERS);
    t("ol.extent.getTopLeft", me, OPENLAYERS);
    t("ol.extent.getTopRight", je, OPENLAYERS);
    t("ol.extent.getWidth", re, OPENLAYERS);
    t("ol.extent.intersects", qe, OPENLAYERS);
    t("ol.extent.isEmpty", se, OPENLAYERS);
    t("ol.extent.applyTransform", we, OPENLAYERS);
    t("ol.Feature", R, OPENLAYERS);
    R.prototype.clone = R.prototype.clone;
    R.prototype.getGeometry = R.prototype.N;
    R.prototype.getId = R.prototype.nh;
    R.prototype.getGeometryName = R.prototype.mh;
    R.prototype.getStyle = R.prototype.Si;
    R.prototype.getStyleFunction = R.prototype.Ti;
    R.prototype.setGeometry = R.prototype.Ma;
    R.prototype.setStyle = R.prototype.i;
    R.prototype.setId = R.prototype.d;
    R.prototype.setGeometryName = R.prototype.e;
    t("ol.FeatureOverlay", rp, OPENLAYERS);
    rp.prototype.addFeature = rp.prototype.rf;
    rp.prototype.getFeatures = rp.prototype.Ni;
    rp.prototype.removeFeature = rp.prototype.wd;
    rp.prototype.setFeatures = rp.prototype.Mc;
    rp.prototype.setMap = rp.prototype.setMap;
    rp.prototype.setStyle = rp.prototype.tf;
    rp.prototype.getStyle = rp.prototype.Oi;
    rp.prototype.getStyleFunction = rp.prototype.Pi;
    t("ol.Geolocation", Z, OPENLAYERS);
    Z.prototype.getAccuracy = Z.prototype.$e;
    Z.prototype.getAccuracyGeometry = Z.prototype.p;
    Z.prototype.getAltitude = Z.prototype.q;
    Z.prototype.getAltitudeAccuracy = Z.prototype.r;
    Z.prototype.getHeading = Z.prototype.F;
    Z.prototype.getPosition = Z.prototype.J;
    Z.prototype.getProjection = Z.prototype.g;
    Z.prototype.getSpeed = Z.prototype.t;
    Z.prototype.getTracking = Z.prototype.i;
    Z.prototype.getTrackingOptions = Z.prototype.f;
    Z.prototype.setProjection = Z.prototype.n;
    Z.prototype.setTracking = Z.prototype.b;
    Z.prototype.setTrackingOptions = Z.prototype.j;
    t("ol.Graticule", Qu, OPENLAYERS);
    Qu.prototype.getMap = Qu.prototype.Wi;
    Qu.prototype.getMeridians = Qu.prototype.wh;
    Qu.prototype.getParallels = Qu.prototype.Bh;
    Qu.prototype.setMap = Qu.prototype.setMap;
    t("ol.has.DEVICE_PIXEL_RATIO", ag, OPENLAYERS);
    t("ol.has.CANVAS", dg, OPENLAYERS);
    t("ol.has.DEVICE_ORIENTATION", eg, OPENLAYERS);
    t("ol.has.GEOLOCATION", fg, OPENLAYERS);
    t("ol.has.TOUCH", gg, OPENLAYERS);
    t("ol.has.WEBGL", $f, OPENLAYERS);
    Vu.prototype.getImage = Vu.prototype.c;
    Xu.prototype.getImage = Xu.prototype.Na;
    t("ol.Kinetic", jk, OPENLAYERS);
    t("ol.loadingstrategy.all", function () {
        return [[-Infinity, -Infinity, Infinity, Infinity]]
    }, OPENLAYERS);
    t("ol.loadingstrategy.bbox", Hw, OPENLAYERS);
    t("ol.loadingstrategy.createTile", function (b) {
        return function (c, d) {
            var e = ec(b.a, d, 0), f = zj(b, c, e), g = [], e = [e, 0, 0];
            for (e[1] = f.a; e[1] <= f.d; ++e[1])for (e[2] = f.b; e[2] <= f.c; ++e[2])g.push(yj(b, e));
            return g
        }
    }, OPENLAYERS);
    t("ol.Map", O, OPENLAYERS);
    O.prototype.addControl = O.prototype.Qg;
    O.prototype.addInteraction = O.prototype.Rg;
    O.prototype.addLayer = O.prototype.Se;
    O.prototype.addOverlay = O.prototype.Te;
    O.prototype.beforeRender = O.prototype.Ua;
    O.prototype.forEachFeatureAtPixel = O.prototype.oe;
    O.prototype.getEventCoordinate = O.prototype.ih;
    O.prototype.getEventPixel = O.prototype.ad;
    O.prototype.getTarget = O.prototype.qc;
    O.prototype.getTargetElement = O.prototype.Fh;
    O.prototype.getCoordinateFromPixel = O.prototype.Ga;
    O.prototype.getControls = O.prototype.hh;
    O.prototype.getOverlays = O.prototype.Ah;
    O.prototype.getInteractions = O.prototype.oh;
    O.prototype.getLayerGroup = O.prototype.Eb;
    O.prototype.getLayers = O.prototype.ea;
    O.prototype.getPixelFromCoordinate = O.prototype.f;
    O.prototype.getSize = O.prototype.e;
    O.prototype.getView = O.prototype.a;
    O.prototype.getViewport = O.prototype.Lh;
    O.prototype.renderSync = O.prototype.Zk;
    O.prototype.render = O.prototype.render;
    O.prototype.removeControl = O.prototype.Uk;
    O.prototype.removeInteraction = O.prototype.Vk;
    O.prototype.removeLayer = O.prototype.Wk;
    O.prototype.removeOverlay = O.prototype.Xk;
    O.prototype.setLayerGroup = O.prototype.cg;
    O.prototype.setSize = O.prototype.J;
    O.prototype.setTarget = O.prototype.qa;
    O.prototype.setView = O.prototype.Ta;
    O.prototype.updateSize = O.prototype.j;
    cj.prototype.originalEvent = cj.prototype.originalEvent;
    cj.prototype.pixel = cj.prototype.pixel;
    cj.prototype.coordinate = cj.prototype.coordinate;
    cj.prototype.preventDefault = cj.prototype.preventDefault;
    cj.prototype.stopPropagation = cj.prototype.lb;
    Zg.prototype.map = Zg.prototype.map;
    Zg.prototype.frameState = Zg.prototype.frameState;
    od.prototype.key = od.prototype.key;
    od.prototype.oldValue = od.prototype.oldValue;
    pd.prototype.transform = pd.prototype.e;
    t("ol.Object", td, OPENLAYERS);
    td.prototype.bindTo = td.prototype.O;
    td.prototype.get = td.prototype.get;
    td.prototype.getKeys = td.prototype.I;
    td.prototype.getProperties = td.prototype.L;
    td.prototype.set = td.prototype.set;
    td.prototype.setProperties = td.prototype.G;
    td.prototype.unbind = td.prototype.P;
    td.prototype.unbindAll = td.prototype.R;
    t("ol.Observable", md, OPENLAYERS);
    t("ol.Observable.unByKey", nd, OPENLAYERS);
    md.prototype.changed = md.prototype.l;
    md.prototype.getRevision = md.prototype.A;
    md.prototype.on = md.prototype.u;
    md.prototype.once = md.prototype.B;
    md.prototype.un = md.prototype.v;
    md.prototype.unByKey = md.prototype.C;
    t("ol.WEBGL_MAX_TEXTURE_SIZE", va, OPENLAYERS);
    t("ol.inherits", u, OPENLAYERS);
    t("ol.Overlay", P, OPENLAYERS);
    P.prototype.getElement = P.prototype.d;
    P.prototype.getMap = P.prototype.e;
    P.prototype.getOffset = P.prototype.g;
    P.prototype.getPosition = P.prototype.n;
    P.prototype.getPositioning = P.prototype.i;
    P.prototype.setElement = P.prototype.Ee;
    P.prototype.setMap = P.prototype.setMap;
    P.prototype.setOffset = P.prototype.j;
    P.prototype.setPosition = P.prototype.f;
    P.prototype.setPositioning = P.prototype.p;
    uj.prototype.getTileCoord = uj.prototype.f;
    t("ol.View", A, OPENLAYERS);
    A.prototype.constrainCenter = A.prototype.i;
    A.prototype.constrainResolution = A.prototype.constrainResolution;
    A.prototype.constrainRotation = A.prototype.constrainRotation;
    A.prototype.getCenter = A.prototype.a;
    A.prototype.calculateExtent = A.prototype.g;
    A.prototype.getProjection = A.prototype.J;
    A.prototype.getResolution = A.prototype.b;
    A.prototype.getResolutionForExtent = A.prototype.n;
    A.prototype.getRotation = A.prototype.e;
    A.prototype.getZoom = A.prototype.Oh;
    A.prototype.fitExtent = A.prototype.ge;
    A.prototype.fitGeometry = A.prototype.dh;
    A.prototype.centerOn = A.prototype.Yg;
    A.prototype.rotate = A.prototype.rotate;
    A.prototype.setCenter = A.prototype.Oa;
    A.prototype.setResolution = A.prototype.d;
    A.prototype.setRotation = A.prototype.r;
    A.prototype.setZoom = A.prototype.Q;
    t("ol.xml.getAllTextContent", Op, OPENLAYERS);
    t("ol.xml.parse", hq, OPENLAYERS);
    t("ol.webgl.Context", Io, OPENLAYERS);
    Io.prototype.getGL = Io.prototype.kk;
    Io.prototype.useProgram = Io.prototype.Gd;
    t("ol.tilegrid.TileGrid", wj, OPENLAYERS);
    wj.prototype.getMaxZoom = wj.prototype.ed;
    wj.prototype.getMinZoom = wj.prototype.fd;
    wj.prototype.getOrigin = wj.prototype.Lb;
    wj.prototype.getResolution = wj.prototype.ka;
    wj.prototype.getResolutions = wj.prototype.Fd;
    wj.prototype.getTileCoordForCoordAndResolution = wj.prototype.Vb;
    wj.prototype.getTileCoordForCoordAndZ = wj.prototype.Fc;
    wj.prototype.getTileSize = wj.prototype.sa;
    t("ol.tilegrid.WMTS", zy, OPENLAYERS);
    zy.prototype.getMatrixIds = zy.prototype.g;
    t("ol.tilegrid.XYZ", ex, OPENLAYERS);
    t("ol.tilegrid.Zoomify", Cy, OPENLAYERS);
    t("ol.style.AtlasManager", Fy, OPENLAYERS);
    t("ol.style.Circle", Ql, OPENLAYERS);
    Ql.prototype.getAnchor = Ql.prototype.tb;
    Ql.prototype.getFill = Ql.prototype.Mj;
    Ql.prototype.getImage = Ql.prototype.yb;
    Ql.prototype.getOrigin = Ql.prototype.zb;
    Ql.prototype.getRadius = Ql.prototype.Nj;
    Ql.prototype.getSize = Ql.prototype.ab;
    Ql.prototype.getStroke = Ql.prototype.Oj;
    t("ol.style.Fill", Pl, OPENLAYERS);
    Pl.prototype.getColor = Pl.prototype.b;
    Pl.prototype.setColor = Pl.prototype.d;
    t("ol.style.Icon", Sj, OPENLAYERS);
    Sj.prototype.getAnchor = Sj.prototype.tb;
    Sj.prototype.getImage = Sj.prototype.yb;
    Sj.prototype.getOrigin = Sj.prototype.zb;
    Sj.prototype.getSrc = Sj.prototype.Pj;
    Sj.prototype.getSize = Sj.prototype.ab;
    t("ol.style.Image", Rj, OPENLAYERS);
    Rj.prototype.getOpacity = Rj.prototype.Ad;
    Rj.prototype.getRotateWithView = Rj.prototype.hd;
    Rj.prototype.getRotation = Rj.prototype.Bd;
    Rj.prototype.getScale = Rj.prototype.Cd;
    Rj.prototype.getSnapToPixel = Rj.prototype.jd;
    Rj.prototype.getImage = Rj.prototype.yb;
    Rj.prototype.setRotation = Rj.prototype.Dd;
    Rj.prototype.setScale = Rj.prototype.Ed;
    t("ol.style.RegularShape", Jy, OPENLAYERS);
    Jy.prototype.getAnchor = Jy.prototype.tb;
    Jy.prototype.getAngle = Jy.prototype.Qj;
    Jy.prototype.getFill = Jy.prototype.Rj;
    Jy.prototype.getImage = Jy.prototype.yb;
    Jy.prototype.getOrigin = Jy.prototype.zb;
    Jy.prototype.getPoints = Jy.prototype.Sj;
    Jy.prototype.getRadius = Jy.prototype.Tj;
    Jy.prototype.getRadius2 = Jy.prototype.Eh;
    Jy.prototype.getSize = Jy.prototype.ab;
    Jy.prototype.getStroke = Jy.prototype.Uj;
    t("ol.style.Stroke", Ll, OPENLAYERS);
    Ll.prototype.getColor = Ll.prototype.Vj;
    Ll.prototype.getLineCap = Ll.prototype.rh;
    Ll.prototype.getLineDash = Ll.prototype.Wj;
    Ll.prototype.getLineJoin = Ll.prototype.sh;
    Ll.prototype.getMiterLimit = Ll.prototype.xh;
    Ll.prototype.getWidth = Ll.prototype.Xj;
    Ll.prototype.setColor = Ll.prototype.Yj;
    Ll.prototype.setLineCap = Ll.prototype.el;
    Ll.prototype.setLineDash = Ll.prototype.Zj;
    Ll.prototype.setLineJoin = Ll.prototype.fl;
    Ll.prototype.setMiterLimit = Ll.prototype.gl;
    Ll.prototype.setWidth = Ll.prototype.ol;
    t("ol.style.Style", Rl, OPENLAYERS);
    Rl.prototype.getGeometry = Rl.prototype.N;
    Rl.prototype.getGeometryFunction = Rl.prototype.lh;
    Rl.prototype.getFill = Rl.prototype.$j;
    Rl.prototype.getImage = Rl.prototype.ak;
    Rl.prototype.getStroke = Rl.prototype.bk;
    Rl.prototype.getText = Rl.prototype.ck;
    Rl.prototype.getZIndex = Rl.prototype.Nh;
    Rl.prototype.setGeometry = Rl.prototype.Ff;
    Rl.prototype.setZIndex = Rl.prototype.ql;
    t("ol.style.Text", Ir, OPENLAYERS);
    Ir.prototype.getFont = Ir.prototype.kh;
    Ir.prototype.getOffsetX = Ir.prototype.yh;
    Ir.prototype.getOffsetY = Ir.prototype.zh;
    Ir.prototype.getFill = Ir.prototype.dk;
    Ir.prototype.getRotation = Ir.prototype.ek;
    Ir.prototype.getScale = Ir.prototype.fk;
    Ir.prototype.getStroke = Ir.prototype.gk;
    Ir.prototype.getText = Ir.prototype.hk;
    Ir.prototype.getTextAlign = Ir.prototype.Hh;
    Ir.prototype.getTextBaseline = Ir.prototype.Ih;
    Ir.prototype.setFont = Ir.prototype.dl;
    Ir.prototype.setFill = Ir.prototype.cl;
    Ir.prototype.setRotation = Ir.prototype.ik;
    Ir.prototype.setScale = Ir.prototype.jk;
    Ir.prototype.setStroke = Ir.prototype.kl;
    Ir.prototype.setText = Ir.prototype.ll;
    Ir.prototype.setTextAlign = Ir.prototype.ml;
    Ir.prototype.setTextBaseline = Ir.prototype.nl;
    t("ol.Sphere", xe, OPENLAYERS);
    t("ol.source.BingMaps", fx, OPENLAYERS);
    t("ol.source.BingMaps.TOS_ATTRIBUTION", gx, OPENLAYERS);
    t("ol.source.Cluster", hx, OPENLAYERS);
    Gx.prototype.readFeatures = Gx.prototype.a;
    t("ol.source.GeoJSON", Jx, OPENLAYERS);
    t("ol.source.GPX", Kx, OPENLAYERS);
    t("ol.source.IGC", Lx, OPENLAYERS);
    t("ol.source.ImageCanvas", Px, OPENLAYERS);
    t("ol.source.ImageMapGuide", Qx, OPENLAYERS);
    Qx.prototype.getParams = Qx.prototype.J;
    Qx.prototype.updateParams = Qx.prototype.V;
    t("ol.source.Image", Mx, OPENLAYERS);
    t("ol.source.ImageStatic", Rx, OPENLAYERS);
    t("ol.source.ImageVector", Sx, OPENLAYERS);
    Sx.prototype.getSource = Sx.prototype.wj;
    Sx.prototype.getStyle = Sx.prototype.xj;
    Sx.prototype.getStyleFunction = Sx.prototype.yj;
    Sx.prototype.setStyle = Sx.prototype.yf;
    t("ol.source.ImageWMS", Ux, OPENLAYERS);
    Ux.prototype.getGetFeatureInfoUrl = Ux.prototype.Bj;
    Ux.prototype.getParams = Ux.prototype.Cj;
    Ux.prototype.getUrl = Ux.prototype.Dj;
    Ux.prototype.setUrl = Ux.prototype.Ej;
    Ux.prototype.updateParams = Ux.prototype.Fj;
    t("ol.source.KML", Yx, OPENLAYERS);
    t("ol.source.MapQuest", by, OPENLAYERS);
    t("ol.source.OSM", $x, OPENLAYERS);
    t("ol.source.OSM.ATTRIBUTION", ay, OPENLAYERS);
    t("ol.source.OSMXML", ey, OPENLAYERS);
    t("ol.source.ServerVector", fy, OPENLAYERS);
    fy.prototype.readFeatures = fy.prototype.a;
    t("ol.source.Source", qj, OPENLAYERS);
    qj.prototype.getAttributions = qj.prototype.Y;
    qj.prototype.getLogo = qj.prototype.W;
    qj.prototype.getProjection = qj.prototype.Z;
    qj.prototype.getState = qj.prototype.$;
    t("ol.source.Stamen", iy, OPENLAYERS);
    t("ol.source.StaticVector", Ix, OPENLAYERS);
    t("ol.source.TileDebug", ly, OPENLAYERS);
    t("ol.source.TileImage", cx, OPENLAYERS);
    cx.prototype.getTileLoadFunction = cx.prototype.ib;
    cx.prototype.getTileUrlFunction = cx.prototype.jb;
    cx.prototype.setTileLoadFunction = cx.prototype.ob;
    cx.prototype.setTileUrlFunction = cx.prototype.pa;
    t("ol.source.TileJSON", my, OPENLAYERS);
    t("ol.source.Tile", Fj, OPENLAYERS);
    Fj.prototype.getTileGrid = Fj.prototype.za;
    t("ol.source.TileUTFGrid", ny, OPENLAYERS);
    ny.prototype.getTemplate = ny.prototype.Gh;
    ny.prototype.forDataAtCoordinateAndResolution = ny.prototype.eh;
    t("ol.source.TileVector", sy, OPENLAYERS);
    sy.prototype.getFeatures = sy.prototype.va;
    sy.prototype.getFeaturesAtCoordinateAndResolution = sy.prototype.jh;
    t("ol.source.TileWMS", uy, OPENLAYERS);
    uy.prototype.getGetFeatureInfoUrl = uy.prototype.Hj;
    uy.prototype.getParams = uy.prototype.Ij;
    uy.prototype.getUrls = uy.prototype.Kh;
    uy.prototype.setUrl = uy.prototype.Jj;
    uy.prototype.setUrls = uy.prototype.zf;
    uy.prototype.updateParams = uy.prototype.Lj;
    t("ol.source.TopoJSON", yy, OPENLAYERS);
    t("ol.source.Vector", $v, OPENLAYERS);
    $v.prototype.addFeature = $v.prototype.Pa;
    $v.prototype.addFeatures = $v.prototype.ya;
    $v.prototype.clear = $v.prototype.clear;
    $v.prototype.forEachFeature = $v.prototype.Xa;
    $v.prototype.forEachFeatureInExtent = $v.prototype.ra;
    $v.prototype.forEachFeatureIntersectingExtent = $v.prototype.Fa;
    $v.prototype.getFeatures = $v.prototype.va;
    $v.prototype.getFeaturesAtCoordinate = $v.prototype.Ia;
    $v.prototype.getClosestFeatureToCoordinate = $v.prototype.Ya;
    $v.prototype.getExtent = $v.prototype.D;
    $v.prototype.getFeatureById = $v.prototype.Ha;
    $v.prototype.removeFeature = $v.prototype.$a;
    cw.prototype.feature = cw.prototype.feature;
    t("ol.source.WMTS", Ay, OPENLAYERS);
    Ay.prototype.getDimensions = Ay.prototype.f;
    Ay.prototype.updateDimensions = Ay.prototype.o;
    t("ol.source.XYZ", Zx, OPENLAYERS);
    Zx.prototype.setTileUrlFunction = Zx.prototype.pa;
    Zx.prototype.setUrl = Zx.prototype.a;
    t("ol.source.Zoomify", Dy, OPENLAYERS);
    yl.prototype.vectorContext = yl.prototype.vectorContext;
    yl.prototype.frameState = yl.prototype.frameState;
    yl.prototype.context = yl.prototype.context;
    yl.prototype.glContext = yl.prototype.glContext;
    mo.prototype.drawAsync = mo.prototype.ic;
    mo.prototype.drawCircleGeometry = mo.prototype.jc;
    mo.prototype.drawFeature = mo.prototype.ee;
    mo.prototype.drawGeometryCollectionGeometry = mo.prototype.Zc;
    mo.prototype.drawPointGeometry = mo.prototype.rb;
    mo.prototype.drawLineStringGeometry = mo.prototype.Cb;
    mo.prototype.drawMultiLineStringGeometry = mo.prototype.kc;
    mo.prototype.drawMultiPointGeometry = mo.prototype.qb;
    mo.prototype.drawMultiPolygonGeometry = mo.prototype.lc;
    mo.prototype.drawPolygonGeometry = mo.prototype.Sb;
    mo.prototype.drawText = mo.prototype.sb;
    mo.prototype.setFillStrokeStyle = mo.prototype.wa;
    mo.prototype.setImageStyle = mo.prototype.cb;
    mo.prototype.setTextStyle = mo.prototype.xa;
    sm.prototype.drawAsync = sm.prototype.ic;
    sm.prototype.drawCircleGeometry = sm.prototype.jc;
    sm.prototype.drawFeature = sm.prototype.ee;
    sm.prototype.drawPointGeometry = sm.prototype.rb;
    sm.prototype.drawMultiPointGeometry = sm.prototype.qb;
    sm.prototype.drawLineStringGeometry = sm.prototype.Cb;
    sm.prototype.drawMultiLineStringGeometry = sm.prototype.kc;
    sm.prototype.drawPolygonGeometry = sm.prototype.Sb;
    sm.prototype.drawMultiPolygonGeometry = sm.prototype.lc;
    sm.prototype.setFillStrokeStyle = sm.prototype.wa;
    sm.prototype.setImageStyle = sm.prototype.cb;
    sm.prototype.setTextStyle = sm.prototype.xa;
    t("ol.proj.common.add", rm, OPENLAYERS);
    t("ol.proj.METERS_PER_UNIT", Ae, OPENLAYERS);
    t("ol.proj.Projection", Be, OPENLAYERS);
    Be.prototype.getCode = Be.prototype.gh;
    Be.prototype.getExtent = Be.prototype.D;
    Be.prototype.getUnits = Be.prototype.rj;
    Be.prototype.getMetersPerUnit = Be.prototype.ie;
    Be.prototype.getWorldExtent = Be.prototype.Mh;
    Be.prototype.isGlobal = Be.prototype.wi;
    Be.prototype.setExtent = Be.prototype.sj;
    Be.prototype.setWorldExtent = Be.prototype.pl;
    t("ol.proj.addEquivalentProjections", He, OPENLAYERS);
    t("ol.proj.addProjection", Qe, OPENLAYERS);
    t("ol.proj.addCoordinateTransforms", Se, OPENLAYERS);
    t("ol.proj.get", Ee, OPENLAYERS);
    t("ol.proj.getTransform", Ve, OPENLAYERS);
    t("ol.proj.transform", function (b, c, d) {
        return Ve(c, d)(b, void 0, b.length)
    }, OPENLAYERS);
    t("ol.proj.transformExtent", Xe, OPENLAYERS);
    t("ol.layer.Heatmap", $, OPENLAYERS);
    $.prototype.getGradient = $.prototype.qa;
    $.prototype.setGradient = $.prototype.fc;
    t("ol.layer.Image", J, OPENLAYERS);
    J.prototype.getSource = J.prototype.a;
    t("ol.layer.Layer", E, OPENLAYERS);
    E.prototype.getSource = E.prototype.a;
    E.prototype.setSource = E.prototype.ga;
    t("ol.layer.Base", D, OPENLAYERS);
    D.prototype.getBrightness = D.prototype.d;
    D.prototype.getContrast = D.prototype.e;
    D.prototype.getHue = D.prototype.f;
    D.prototype.getExtent = D.prototype.D;
    D.prototype.getMaxResolution = D.prototype.g;
    D.prototype.getMinResolution = D.prototype.i;
    D.prototype.getOpacity = D.prototype.j;
    D.prototype.getSaturation = D.prototype.n;
    D.prototype.getVisible = D.prototype.b;
    D.prototype.setBrightness = D.prototype.t;
    D.prototype.setContrast = D.prototype.F;
    D.prototype.setHue = D.prototype.J;
    D.prototype.setExtent = D.prototype.p;
    D.prototype.setMaxResolution = D.prototype.Q;
    D.prototype.setMinResolution = D.prototype.V;
    D.prototype.setOpacity = D.prototype.q;
    D.prototype.setSaturation = D.prototype.ba;
    D.prototype.setVisible = D.prototype.ca;
    t("ol.layer.Group", I, OPENLAYERS);
    I.prototype.getLayers = I.prototype.Yb;
    I.prototype.setLayers = I.prototype.r;
    t("ol.layer.Tile", K, OPENLAYERS);
    K.prototype.getPreload = K.prototype.r;
    K.prototype.getSource = K.prototype.a;
    K.prototype.setPreload = K.prototype.oa;
    K.prototype.getUseInterimTilesOnError = K.prototype.ea;
    K.prototype.setUseInterimTilesOnError = K.prototype.qa;
    t("ol.layer.Vector", L, OPENLAYERS);
    L.prototype.getSource = L.prototype.a;
    L.prototype.getStyle = L.prototype.Uc;
    L.prototype.getStyleFunction = L.prototype.Vc;
    L.prototype.setStyle = L.prototype.oa;
    t("ol.interaction.DoubleClickZoom", qk, OPENLAYERS);
    t("ol.interaction.DoubleClickZoom.handleEvent", rk, OPENLAYERS);
    t("ol.interaction.DragAndDrop", Mv, OPENLAYERS);
    t("ol.interaction.DragAndDrop.handleEvent", dd, OPENLAYERS);
    Nv.prototype.features = Nv.prototype.features;
    Nv.prototype.file = Nv.prototype.file;
    Nv.prototype.projection = Nv.prototype.projection;
    Cl.prototype.coordinate = Cl.prototype.coordinate;
    t("ol.interaction.DragBox", Dl, OPENLAYERS);
    Dl.prototype.getGeometry = Dl.prototype.N;
    t("ol.interaction.DragPan", Ck, OPENLAYERS);
    t("ol.interaction.DragRotateAndZoom", Qv, OPENLAYERS);
    t("ol.interaction.DragRotate", Gk, OPENLAYERS);
    t("ol.interaction.DragZoom", Wl, OPENLAYERS);
    fw.prototype.feature = fw.prototype.feature;
    t("ol.interaction.Draw", gw, OPENLAYERS);
    t("ol.interaction.Draw.handleEvent", iw, OPENLAYERS);
    gw.prototype.finishDrawing = gw.prototype.V;
    t("ol.interaction.Interaction", mk, OPENLAYERS);
    mk.prototype.getActive = mk.prototype.a;
    mk.prototype.setActive = mk.prototype.b;
    t("ol.interaction.defaults", km, OPENLAYERS);
    t("ol.interaction.KeyboardPan", Xl, OPENLAYERS);
    t("ol.interaction.KeyboardPan.handleEvent", Yl, OPENLAYERS);
    t("ol.interaction.KeyboardZoom", Zl, OPENLAYERS);
    t("ol.interaction.KeyboardZoom.handleEvent", $l, OPENLAYERS);
    t("ol.interaction.Modify", tw, OPENLAYERS);
    t("ol.interaction.Modify.handleEvent", ww, OPENLAYERS);
    t("ol.interaction.MouseWheelZoom", am, OPENLAYERS);
    t("ol.interaction.MouseWheelZoom.handleEvent", bm, OPENLAYERS);
    t("ol.interaction.PinchRotate", cm, OPENLAYERS);
    t("ol.interaction.PinchZoom", gm, OPENLAYERS);
    t("ol.interaction.Pointer", zk, OPENLAYERS);
    t("ol.interaction.Pointer.handleEvent", Ak, OPENLAYERS);
    t("ol.interaction.Select", Cw, OPENLAYERS);
    Cw.prototype.getFeatures = Cw.prototype.j;
    t("ol.interaction.Select.handleEvent", Dw, OPENLAYERS);
    Cw.prototype.setMap = Cw.prototype.setMap;
    t("ol.geom.Circle", fn, OPENLAYERS);
    fn.prototype.clone = fn.prototype.clone;
    fn.prototype.getCenter = fn.prototype.qe;
    fn.prototype.getExtent = fn.prototype.D;
    fn.prototype.getRadius = fn.prototype.vf;
    fn.prototype.getType = fn.prototype.H;
    fn.prototype.setCenter = fn.prototype.kj;
    fn.prototype.setCenterAndRadius = fn.prototype.ag;
    fn.prototype.setRadius = fn.prototype.jl;
    fn.prototype.transform = fn.prototype.e;
    t("ol.geom.Geometry", Kk, OPENLAYERS);
    Kk.prototype.clone = Kk.prototype.clone;
    Kk.prototype.getClosestPoint = Kk.prototype.f;
    Kk.prototype.getExtent = Kk.prototype.D;
    Kk.prototype.getType = Kk.prototype.H;
    Kk.prototype.applyTransform = Kk.prototype.ma;
    Kk.prototype.intersectsExtent = Kk.prototype.ha;
    Kk.prototype.translate = Kk.prototype.Aa;
    Kk.prototype.transform = Kk.prototype.e;
    t("ol.geom.GeometryCollection", hn, OPENLAYERS);
    hn.prototype.clone = hn.prototype.clone;
    hn.prototype.getExtent = hn.prototype.D;
    hn.prototype.getGeometries = hn.prototype.af;
    hn.prototype.getType = hn.prototype.H;
    hn.prototype.intersectsExtent = hn.prototype.ha;
    hn.prototype.setGeometries = hn.prototype.bg;
    hn.prototype.applyTransform = hn.prototype.ma;
    hn.prototype.translate = hn.prototype.Aa;
    t("ol.geom.LinearRing", fl, OPENLAYERS);
    fl.prototype.clone = fl.prototype.clone;
    fl.prototype.getArea = fl.prototype.nj;
    fl.prototype.getCoordinates = fl.prototype.K;
    fl.prototype.getType = fl.prototype.H;
    fl.prototype.setCoordinates = fl.prototype.U;
    t("ol.geom.LineString", M, OPENLAYERS);
    M.prototype.appendCoordinate = M.prototype.Sg;
    M.prototype.clone = M.prototype.clone;
    M.prototype.getCoordinateAtM = M.prototype.lj;
    M.prototype.getCoordinates = M.prototype.K;
    M.prototype.getLength = M.prototype.mj;
    M.prototype.getType = M.prototype.H;
    M.prototype.intersectsExtent = M.prototype.ha;
    M.prototype.setCoordinates = M.prototype.U;
    t("ol.geom.MultiLineString", qn, OPENLAYERS);
    qn.prototype.appendLineString = qn.prototype.Tg;
    qn.prototype.clone = qn.prototype.clone;
    qn.prototype.getCoordinateAtM = qn.prototype.oj;
    qn.prototype.getCoordinates = qn.prototype.K;
    qn.prototype.getLineString = qn.prototype.th;
    qn.prototype.getLineStrings = qn.prototype.Ec;
    qn.prototype.getType = qn.prototype.H;
    qn.prototype.intersectsExtent = qn.prototype.ha;
    qn.prototype.setCoordinates = qn.prototype.U;
    t("ol.geom.MultiPoint", tn, OPENLAYERS);
    tn.prototype.appendPoint = tn.prototype.Vg;
    tn.prototype.clone = tn.prototype.clone;
    tn.prototype.getCoordinates = tn.prototype.K;
    tn.prototype.getPoint = tn.prototype.Ch;
    tn.prototype.getPoints = tn.prototype.xd;
    tn.prototype.getType = tn.prototype.H;
    tn.prototype.intersectsExtent = tn.prototype.ha;
    tn.prototype.setCoordinates = tn.prototype.U;
    t("ol.geom.MultiPolygon", un, OPENLAYERS);
    un.prototype.appendPolygon = un.prototype.Wg;
    un.prototype.clone = un.prototype.clone;
    un.prototype.getArea = un.prototype.pj;
    un.prototype.getCoordinates = un.prototype.K;
    un.prototype.getInteriorPoints = un.prototype.qh;
    un.prototype.getPolygon = un.prototype.Dh;
    un.prototype.getPolygons = un.prototype.gd;
    un.prototype.getType = un.prototype.H;
    un.prototype.intersectsExtent = un.prototype.ha;
    un.prototype.setCoordinates = un.prototype.U;
    t("ol.geom.Point", hl, OPENLAYERS);
    hl.prototype.clone = hl.prototype.clone;
    hl.prototype.getCoordinates = hl.prototype.K;
    hl.prototype.getType = hl.prototype.H;
    hl.prototype.intersectsExtent = hl.prototype.ha;
    hl.prototype.setCoordinates = hl.prototype.U;
    t("ol.geom.Polygon", H, OPENLAYERS);
    H.prototype.appendLinearRing = H.prototype.Ug;
    H.prototype.clone = H.prototype.clone;
    H.prototype.getArea = H.prototype.qj;
    H.prototype.getCoordinates = H.prototype.K;
    H.prototype.getInteriorPoint = H.prototype.ph;
    H.prototype.getLinearRingCount = H.prototype.vh;
    H.prototype.getLinearRing = H.prototype.uh;
    H.prototype.getLinearRings = H.prototype.dd;
    H.prototype.getType = H.prototype.H;
    H.prototype.intersectsExtent = H.prototype.ha;
    H.prototype.setCoordinates = H.prototype.U;
    t("ol.geom.Polygon.circular", xl, OPENLAYERS);
    t("ol.geom.Polygon.fromExtent", function (b) {
        var c = b[0], d = b[1], e = b[2];
        b = b[3];
        c = [c, d, c, b, e, b, e, d, c, d];
        d = new H(null);
        ul(d, "XY", c, [c.length]);
        return d
    }, OPENLAYERS);
    t("ol.geom.SimpleGeometry", Mk, OPENLAYERS);
    Mk.prototype.getExtent = Mk.prototype.D;
    Mk.prototype.getFirstCoordinate = Mk.prototype.vb;
    Mk.prototype.getLastCoordinate = Mk.prototype.wb;
    Mk.prototype.getLayout = Mk.prototype.xb;
    Mk.prototype.applyTransform = Mk.prototype.ma;
    Mk.prototype.translate = Mk.prototype.Aa;
    t("ol.format.Feature", tp, OPENLAYERS);
    t("ol.format.GeoJSON", Dp, OPENLAYERS);
    Dp.prototype.readFeature = Dp.prototype.Nb;
    Dp.prototype.readFeatures = Dp.prototype.ja;
    Dp.prototype.readGeometry = Dp.prototype.Jc;
    Dp.prototype.readProjection = Dp.prototype.Ba;
    Dp.prototype.writeFeature = Dp.prototype.Pd;
    Dp.prototype.writeFeatureObject = Dp.prototype.a;
    Dp.prototype.writeFeatures = Dp.prototype.Qb;
    Dp.prototype.writeFeaturesObject = Dp.prototype.d;
    Dp.prototype.writeGeometry = Dp.prototype.Qc;
    Dp.prototype.writeGeometryObject = Dp.prototype.e;
    t("ol.format.GPX", Uq, OPENLAYERS);
    Uq.prototype.readFeature = Uq.prototype.Nb;
    Uq.prototype.readFeatures = Uq.prototype.ja;
    Uq.prototype.readProjection = Uq.prototype.Ba;
    Uq.prototype.writeFeatures = Uq.prototype.Qb;
    Uq.prototype.writeFeaturesNode = Uq.prototype.a;
    t("ol.format.IGC", Er, OPENLAYERS);
    Er.prototype.readFeature = Er.prototype.Nb;
    Er.prototype.readFeatures = Er.prototype.ja;
    Er.prototype.readProjection = Er.prototype.Ba;
    t("ol.format.KML", Jr, OPENLAYERS);
    Jr.prototype.readFeature = Jr.prototype.Nb;
    Jr.prototype.readFeatures = Jr.prototype.ja;
    Jr.prototype.readName = Jr.prototype.Nk;
    Jr.prototype.readProjection = Jr.prototype.Ba;
    Jr.prototype.writeFeatures = Jr.prototype.Qb;
    Jr.prototype.writeFeaturesNode = Jr.prototype.a;
    t("ol.format.OSMXML", nt, OPENLAYERS);
    nt.prototype.readFeatures = nt.prototype.ja;
    nt.prototype.readProjection = nt.prototype.Ba;
    t("ol.format.Polyline", yt, OPENLAYERS);
    t("ol.format.Polyline.encodeDeltas", zt, OPENLAYERS);
    t("ol.format.Polyline.decodeDeltas", Bt, OPENLAYERS);
    t("ol.format.Polyline.encodeFloats", At, OPENLAYERS);
    t("ol.format.Polyline.decodeFloats", Ct, OPENLAYERS);
    yt.prototype.readFeature = yt.prototype.Nb;
    yt.prototype.readFeatures = yt.prototype.ja;
    yt.prototype.readGeometry = yt.prototype.Jc;
    yt.prototype.readProjection = yt.prototype.Ba;
    yt.prototype.writeGeometry = yt.prototype.Qc;
    t("ol.format.TopoJSON", Dt, OPENLAYERS);
    Dt.prototype.readFeatures = Dt.prototype.ja;
    Dt.prototype.readProjection = Dt.prototype.Ba;
    t("ol.format.WFS", Jt, OPENLAYERS);
    Jt.prototype.readFeatures = Jt.prototype.ja;
    Jt.prototype.readTransactionResponse = Jt.prototype.g;
    Jt.prototype.readFeatureCollectionMetadata = Jt.prototype.f;
    Jt.prototype.writeGetFeature = Jt.prototype.n;
    Jt.prototype.writeTransaction = Jt.prototype.j;
    Jt.prototype.readProjection = Jt.prototype.Ba;
    t("ol.format.WKT", Wt, OPENLAYERS);
    Wt.prototype.readFeature = Wt.prototype.Nb;
    Wt.prototype.readFeatures = Wt.prototype.ja;
    Wt.prototype.readGeometry = Wt.prototype.Jc;
    Wt.prototype.writeFeature = Wt.prototype.Pd;
    Wt.prototype.writeFeatures = Wt.prototype.Qb;
    Wt.prototype.writeGeometry = Wt.prototype.Qc;
    t("ol.format.WMSCapabilities", nu, OPENLAYERS);
    nu.prototype.read = nu.prototype.a;
    t("ol.format.WMSGetFeatureInfo", Ku, OPENLAYERS);
    Ku.prototype.readFeatures = Ku.prototype.ja;
    t("ol.format.GML2", Tq, OPENLAYERS);
    t("ol.format.GML3", X, OPENLAYERS);
    X.prototype.writeGeometryNode = X.prototype.o;
    X.prototype.writeFeatures = X.prototype.Qb;
    X.prototype.writeFeaturesNode = X.prototype.a;
    t("ol.format.GML", X, OPENLAYERS);
    X.prototype.writeFeatures = X.prototype.Qb;
    X.prototype.writeFeaturesNode = X.prototype.a;
    t("ol.format.GMLBase", yq, OPENLAYERS);
    yq.prototype.readFeatures = yq.prototype.ja;
    t("ol.events.condition.altKeyOnly", function (b) {
        b = b.a;
        return b.c && !b.g && !b.d
    }, OPENLAYERS);
    t("ol.events.condition.altShiftKeysOnly", sk, OPENLAYERS);
    t("ol.events.condition.always", dd, OPENLAYERS);
    t("ol.events.condition.click", function (b) {
        return b.type == gj
    }, OPENLAYERS);
    t("ol.events.condition.mouseMove", tk, OPENLAYERS);
    t("ol.events.condition.never", cd, OPENLAYERS);
    t("ol.events.condition.singleClick", uk, OPENLAYERS);
    t("ol.events.condition.noModifierKeys", vk, OPENLAYERS);
    t("ol.events.condition.platformModifierKeyOnly", function (b) {
        b = b.a;
        return !b.c && b.g && !b.d
    }, OPENLAYERS);
    t("ol.events.condition.shiftKeyOnly", wk, OPENLAYERS);
    t("ol.events.condition.targetNotEditable", xk, OPENLAYERS);
    t("ol.events.condition.mouseOnly", yk, OPENLAYERS);
    t("ol.dom.Input", qp, OPENLAYERS);
    qp.prototype.getChecked = qp.prototype.a;
    qp.prototype.getValue = qp.prototype.b;
    qp.prototype.setValue = qp.prototype.e;
    qp.prototype.setChecked = qp.prototype.d;
    t("ol.control.Attribution", ah, OPENLAYERS);
    t("ol.control.Attribution.render", bh, OPENLAYERS);
    ah.prototype.getCollapsible = ah.prototype.bj;
    ah.prototype.setCollapsible = ah.prototype.ej;
    ah.prototype.setCollapsed = ah.prototype.dj;
    ah.prototype.getCollapsed = ah.prototype.aj;
    t("ol.control.Control", $g, OPENLAYERS);
    $g.prototype.getMap = $g.prototype.d;
    $g.prototype.setMap = $g.prototype.setMap;
    t("ol.control.defaults", gh, OPENLAYERS);
    t("ol.control.FullScreen", lh, OPENLAYERS);
    t("ol.control.MousePosition", mh, OPENLAYERS);
    t("ol.control.MousePosition.render", nh, OPENLAYERS);
    mh.prototype.getCoordinateFormat = mh.prototype.g;
    mh.prototype.getProjection = mh.prototype.p;
    mh.prototype.setMap = mh.prototype.setMap;
    mh.prototype.setCoordinateFormat = mh.prototype.r;
    mh.prototype.setProjection = mh.prototype.q;
    t("ol.control.OverviewMap", Qo, OPENLAYERS);
    Qo.prototype.setMap = Qo.prototype.setMap;
    t("ol.control.OverviewMap.render", Ro, OPENLAYERS);
    Qo.prototype.getCollapsible = Qo.prototype.gj;
    Qo.prototype.setCollapsible = Qo.prototype.jj;
    Qo.prototype.setCollapsed = Qo.prototype.ij;
    Qo.prototype.getCollapsed = Qo.prototype.fj;
    t("ol.control.Rotate", dh, OPENLAYERS);
    t("ol.control.Rotate.render", eh, OPENLAYERS);
    t("ol.control.ScaleLine", Wo, OPENLAYERS);
    Wo.prototype.getUnits = Wo.prototype.j;
    t("ol.control.ScaleLine.render", Xo, OPENLAYERS);
    Wo.prototype.setUnits = Wo.prototype.p;
    t("ol.control.Zoom", fh, OPENLAYERS);
    t("ol.control.ZoomSlider", kp, OPENLAYERS);
    t("ol.control.ZoomSlider.render", mp, OPENLAYERS);
    t("ol.control.ZoomToExtent", pp, OPENLAYERS);
    t("ol.color.asArray", ug, OPENLAYERS);
    t("ol.color.asString", wg, OPENLAYERS);
    td.prototype.changed = td.prototype.l;
    td.prototype.getRevision = td.prototype.A;
    td.prototype.on = td.prototype.u;
    td.prototype.once = td.prototype.B;
    td.prototype.un = td.prototype.v;
    td.prototype.unByKey = td.prototype.C;
    B.prototype.bindTo = B.prototype.O;
    B.prototype.get = B.prototype.get;
    B.prototype.getKeys = B.prototype.I;
    B.prototype.getProperties = B.prototype.L;
    B.prototype.set = B.prototype.set;
    B.prototype.setProperties = B.prototype.G;
    B.prototype.unbind = B.prototype.P;
    B.prototype.unbindAll = B.prototype.R;
    B.prototype.changed = B.prototype.l;
    B.prototype.getRevision = B.prototype.A;
    B.prototype.on = B.prototype.u;
    B.prototype.once = B.prototype.B;
    B.prototype.un = B.prototype.v;
    B.prototype.unByKey = B.prototype.C;
    Q.prototype.bindTo = Q.prototype.O;
    Q.prototype.get = Q.prototype.get;
    Q.prototype.getKeys = Q.prototype.I;
    Q.prototype.getProperties = Q.prototype.L;
    Q.prototype.set = Q.prototype.set;
    Q.prototype.setProperties = Q.prototype.G;
    Q.prototype.unbind = Q.prototype.P;
    Q.prototype.unbindAll = Q.prototype.R;
    Q.prototype.changed = Q.prototype.l;
    Q.prototype.getRevision = Q.prototype.A;
    Q.prototype.on = Q.prototype.u;
    Q.prototype.once = Q.prototype.B;
    Q.prototype.un = Q.prototype.v;
    Q.prototype.unByKey = Q.prototype.C;
    R.prototype.bindTo = R.prototype.O;
    R.prototype.get = R.prototype.get;
    R.prototype.getKeys = R.prototype.I;
    R.prototype.getProperties = R.prototype.L;
    R.prototype.set = R.prototype.set;
    R.prototype.setProperties = R.prototype.G;
    R.prototype.unbind = R.prototype.P;
    R.prototype.unbindAll = R.prototype.R;
    R.prototype.changed = R.prototype.l;
    R.prototype.getRevision = R.prototype.A;
    R.prototype.on = R.prototype.u;
    R.prototype.once = R.prototype.B;
    R.prototype.un = R.prototype.v;
    R.prototype.unByKey = R.prototype.C;
    Z.prototype.bindTo = Z.prototype.O;
    Z.prototype.get = Z.prototype.get;
    Z.prototype.getKeys = Z.prototype.I;
    Z.prototype.getProperties = Z.prototype.L;
    Z.prototype.set = Z.prototype.set;
    Z.prototype.setProperties = Z.prototype.G;
    Z.prototype.unbind = Z.prototype.P;
    Z.prototype.unbindAll = Z.prototype.R;
    Z.prototype.changed = Z.prototype.l;
    Z.prototype.getRevision = Z.prototype.A;
    Z.prototype.on = Z.prototype.u;
    Z.prototype.once = Z.prototype.B;
    Z.prototype.un = Z.prototype.v;
    Z.prototype.unByKey = Z.prototype.C;
    Xu.prototype.getTileCoord = Xu.prototype.f;
    O.prototype.bindTo = O.prototype.O;
    O.prototype.get = O.prototype.get;
    O.prototype.getKeys = O.prototype.I;
    O.prototype.getProperties = O.prototype.L;
    O.prototype.set = O.prototype.set;
    O.prototype.setProperties = O.prototype.G;
    O.prototype.unbind = O.prototype.P;
    O.prototype.unbindAll = O.prototype.R;
    O.prototype.changed = O.prototype.l;
    O.prototype.getRevision = O.prototype.A;
    O.prototype.on = O.prototype.u;
    O.prototype.once = O.prototype.B;
    O.prototype.un = O.prototype.v;
    O.prototype.unByKey = O.prototype.C;
    cj.prototype.map = cj.prototype.map;
    cj.prototype.frameState = cj.prototype.frameState;
    dj.prototype.originalEvent = dj.prototype.originalEvent;
    dj.prototype.pixel = dj.prototype.pixel;
    dj.prototype.coordinate = dj.prototype.coordinate;
    dj.prototype.preventDefault = dj.prototype.preventDefault;
    dj.prototype.stopPropagation = dj.prototype.lb;
    dj.prototype.map = dj.prototype.map;
    dj.prototype.frameState = dj.prototype.frameState;
    P.prototype.bindTo = P.prototype.O;
    P.prototype.get = P.prototype.get;
    P.prototype.getKeys = P.prototype.I;
    P.prototype.getProperties = P.prototype.L;
    P.prototype.set = P.prototype.set;
    P.prototype.setProperties = P.prototype.G;
    P.prototype.unbind = P.prototype.P;
    P.prototype.unbindAll = P.prototype.R;
    P.prototype.changed = P.prototype.l;
    P.prototype.getRevision = P.prototype.A;
    P.prototype.on = P.prototype.u;
    P.prototype.once = P.prototype.B;
    P.prototype.un = P.prototype.v;
    P.prototype.unByKey = P.prototype.C;
    A.prototype.bindTo = A.prototype.O;
    A.prototype.get = A.prototype.get;
    A.prototype.getKeys = A.prototype.I;
    A.prototype.getProperties = A.prototype.L;
    A.prototype.set = A.prototype.set;
    A.prototype.setProperties = A.prototype.G;
    A.prototype.unbind = A.prototype.P;
    A.prototype.unbindAll = A.prototype.R;
    A.prototype.changed = A.prototype.l;
    A.prototype.getRevision = A.prototype.A;
    A.prototype.on = A.prototype.u;
    A.prototype.once = A.prototype.B;
    A.prototype.un = A.prototype.v;
    A.prototype.unByKey = A.prototype.C;
    zy.prototype.getMaxZoom = zy.prototype.ed;
    zy.prototype.getMinZoom = zy.prototype.fd;
    zy.prototype.getOrigin = zy.prototype.Lb;
    zy.prototype.getResolution = zy.prototype.ka;
    zy.prototype.getResolutions = zy.prototype.Fd;
    zy.prototype.getTileCoordForCoordAndResolution = zy.prototype.Vb;
    zy.prototype.getTileCoordForCoordAndZ = zy.prototype.Fc;
    zy.prototype.getTileSize = zy.prototype.sa;
    ex.prototype.getMaxZoom = ex.prototype.ed;
    ex.prototype.getMinZoom = ex.prototype.fd;
    ex.prototype.getOrigin = ex.prototype.Lb;
    ex.prototype.getResolution = ex.prototype.ka;
    ex.prototype.getResolutions = ex.prototype.Fd;
    ex.prototype.getTileCoordForCoordAndResolution = ex.prototype.Vb;
    ex.prototype.getTileCoordForCoordAndZ = ex.prototype.Fc;
    ex.prototype.getTileSize = ex.prototype.sa;
    Cy.prototype.getMaxZoom = Cy.prototype.ed;
    Cy.prototype.getMinZoom = Cy.prototype.fd;
    Cy.prototype.getOrigin = Cy.prototype.Lb;
    Cy.prototype.getResolution = Cy.prototype.ka;
    Cy.prototype.getResolutions = Cy.prototype.Fd;
    Cy.prototype.getTileCoordForCoordAndResolution = Cy.prototype.Vb;
    Cy.prototype.getTileCoordForCoordAndZ = Cy.prototype.Fc;
    Cy.prototype.getTileSize = Cy.prototype.sa;
    Ql.prototype.getOpacity = Ql.prototype.Ad;
    Ql.prototype.getRotateWithView = Ql.prototype.hd;
    Ql.prototype.getRotation = Ql.prototype.Bd;
    Ql.prototype.getScale = Ql.prototype.Cd;
    Ql.prototype.getSnapToPixel = Ql.prototype.jd;
    Ql.prototype.setRotation = Ql.prototype.Dd;
    Ql.prototype.setScale = Ql.prototype.Ed;
    Sj.prototype.getOpacity = Sj.prototype.Ad;
    Sj.prototype.getRotateWithView = Sj.prototype.hd;
    Sj.prototype.getRotation = Sj.prototype.Bd;
    Sj.prototype.getScale = Sj.prototype.Cd;
    Sj.prototype.getSnapToPixel = Sj.prototype.jd;
    Sj.prototype.setRotation = Sj.prototype.Dd;
    Sj.prototype.setScale = Sj.prototype.Ed;
    Jy.prototype.getOpacity = Jy.prototype.Ad;
    Jy.prototype.getRotateWithView = Jy.prototype.hd;
    Jy.prototype.getRotation = Jy.prototype.Bd;
    Jy.prototype.getScale = Jy.prototype.Cd;
    Jy.prototype.getSnapToPixel = Jy.prototype.jd;
    Jy.prototype.setRotation = Jy.prototype.Dd;
    Jy.prototype.setScale = Jy.prototype.Ed;
    qj.prototype.changed = qj.prototype.l;
    qj.prototype.getRevision = qj.prototype.A;
    qj.prototype.on = qj.prototype.u;
    qj.prototype.once = qj.prototype.B;
    qj.prototype.un = qj.prototype.v;
    qj.prototype.unByKey = qj.prototype.C;
    Fj.prototype.getAttributions = Fj.prototype.Y;
    Fj.prototype.getLogo = Fj.prototype.W;
    Fj.prototype.getProjection = Fj.prototype.Z;
    Fj.prototype.getState = Fj.prototype.$;
    Fj.prototype.changed = Fj.prototype.l;
    Fj.prototype.getRevision = Fj.prototype.A;
    Fj.prototype.on = Fj.prototype.u;
    Fj.prototype.once = Fj.prototype.B;
    Fj.prototype.un = Fj.prototype.v;
    Fj.prototype.unByKey = Fj.prototype.C;
    cx.prototype.getTileGrid = cx.prototype.za;
    cx.prototype.getAttributions = cx.prototype.Y;
    cx.prototype.getLogo = cx.prototype.W;
    cx.prototype.getProjection = cx.prototype.Z;
    cx.prototype.getState = cx.prototype.$;
    cx.prototype.changed = cx.prototype.l;
    cx.prototype.getRevision = cx.prototype.A;
    cx.prototype.on = cx.prototype.u;
    cx.prototype.once = cx.prototype.B;
    cx.prototype.un = cx.prototype.v;
    cx.prototype.unByKey = cx.prototype.C;
    fx.prototype.getTileLoadFunction = fx.prototype.ib;
    fx.prototype.getTileUrlFunction = fx.prototype.jb;
    fx.prototype.setTileLoadFunction = fx.prototype.ob;
    fx.prototype.setTileUrlFunction = fx.prototype.pa;
    fx.prototype.getTileGrid = fx.prototype.za;
    fx.prototype.getAttributions = fx.prototype.Y;
    fx.prototype.getLogo = fx.prototype.W;
    fx.prototype.getProjection = fx.prototype.Z;
    fx.prototype.getState = fx.prototype.$;
    fx.prototype.changed = fx.prototype.l;
    fx.prototype.getRevision = fx.prototype.A;
    fx.prototype.on = fx.prototype.u;
    fx.prototype.once = fx.prototype.B;
    fx.prototype.un = fx.prototype.v;
    fx.prototype.unByKey = fx.prototype.C;
    $v.prototype.getAttributions = $v.prototype.Y;
    $v.prototype.getLogo = $v.prototype.W;
    $v.prototype.getProjection = $v.prototype.Z;
    $v.prototype.getState = $v.prototype.$;
    $v.prototype.changed = $v.prototype.l;
    $v.prototype.getRevision = $v.prototype.A;
    $v.prototype.on = $v.prototype.u;
    $v.prototype.once = $v.prototype.B;
    $v.prototype.un = $v.prototype.v;
    $v.prototype.unByKey = $v.prototype.C;
    hx.prototype.addFeature = hx.prototype.Pa;
    hx.prototype.addFeatures = hx.prototype.ya;
    hx.prototype.clear = hx.prototype.clear;
    hx.prototype.forEachFeature = hx.prototype.Xa;
    hx.prototype.forEachFeatureInExtent = hx.prototype.ra;
    hx.prototype.forEachFeatureIntersectingExtent = hx.prototype.Fa;
    hx.prototype.getFeatures = hx.prototype.va;
    hx.prototype.getFeaturesAtCoordinate = hx.prototype.Ia;
    hx.prototype.getClosestFeatureToCoordinate = hx.prototype.Ya;
    hx.prototype.getExtent = hx.prototype.D;
    hx.prototype.getFeatureById = hx.prototype.Ha;
    hx.prototype.removeFeature = hx.prototype.$a;
    hx.prototype.getAttributions = hx.prototype.Y;
    hx.prototype.getLogo = hx.prototype.W;
    hx.prototype.getProjection = hx.prototype.Z;
    hx.prototype.getState = hx.prototype.$;
    hx.prototype.changed = hx.prototype.l;
    hx.prototype.getRevision = hx.prototype.A;
    hx.prototype.on = hx.prototype.u;
    hx.prototype.once = hx.prototype.B;
    hx.prototype.un = hx.prototype.v;
    hx.prototype.unByKey = hx.prototype.C;
    Gx.prototype.addFeature = Gx.prototype.Pa;
    Gx.prototype.addFeatures = Gx.prototype.ya;
    Gx.prototype.clear = Gx.prototype.clear;
    Gx.prototype.forEachFeature = Gx.prototype.Xa;
    Gx.prototype.forEachFeatureInExtent = Gx.prototype.ra;
    Gx.prototype.forEachFeatureIntersectingExtent = Gx.prototype.Fa;
    Gx.prototype.getFeatures = Gx.prototype.va;
    Gx.prototype.getFeaturesAtCoordinate = Gx.prototype.Ia;
    Gx.prototype.getClosestFeatureToCoordinate = Gx.prototype.Ya;
    Gx.prototype.getExtent = Gx.prototype.D;
    Gx.prototype.getFeatureById = Gx.prototype.Ha;
    Gx.prototype.removeFeature = Gx.prototype.$a;
    Gx.prototype.getAttributions = Gx.prototype.Y;
    Gx.prototype.getLogo = Gx.prototype.W;
    Gx.prototype.getProjection = Gx.prototype.Z;
    Gx.prototype.getState = Gx.prototype.$;
    Gx.prototype.changed = Gx.prototype.l;
    Gx.prototype.getRevision = Gx.prototype.A;
    Gx.prototype.on = Gx.prototype.u;
    Gx.prototype.once = Gx.prototype.B;
    Gx.prototype.un = Gx.prototype.v;
    Gx.prototype.unByKey = Gx.prototype.C;
    Ix.prototype.readFeatures = Ix.prototype.a;
    Ix.prototype.addFeature = Ix.prototype.Pa;
    Ix.prototype.addFeatures = Ix.prototype.ya;
    Ix.prototype.clear = Ix.prototype.clear;
    Ix.prototype.forEachFeature = Ix.prototype.Xa;
    Ix.prototype.forEachFeatureInExtent = Ix.prototype.ra;
    Ix.prototype.forEachFeatureIntersectingExtent = Ix.prototype.Fa;
    Ix.prototype.getFeatures = Ix.prototype.va;
    Ix.prototype.getFeaturesAtCoordinate = Ix.prototype.Ia;
    Ix.prototype.getClosestFeatureToCoordinate = Ix.prototype.Ya;
    Ix.prototype.getExtent = Ix.prototype.D;
    Ix.prototype.getFeatureById = Ix.prototype.Ha;
    Ix.prototype.removeFeature = Ix.prototype.$a;
    Ix.prototype.getAttributions = Ix.prototype.Y;
    Ix.prototype.getLogo = Ix.prototype.W;
    Ix.prototype.getProjection = Ix.prototype.Z;
    Ix.prototype.getState = Ix.prototype.$;
    Ix.prototype.changed = Ix.prototype.l;
    Ix.prototype.getRevision = Ix.prototype.A;
    Ix.prototype.on = Ix.prototype.u;
    Ix.prototype.once = Ix.prototype.B;
    Ix.prototype.un = Ix.prototype.v;
    Ix.prototype.unByKey = Ix.prototype.C;
    Jx.prototype.readFeatures = Jx.prototype.a;
    Jx.prototype.addFeature = Jx.prototype.Pa;
    Jx.prototype.addFeatures = Jx.prototype.ya;
    Jx.prototype.clear = Jx.prototype.clear;
    Jx.prototype.forEachFeature = Jx.prototype.Xa;
    Jx.prototype.forEachFeatureInExtent = Jx.prototype.ra;
    Jx.prototype.forEachFeatureIntersectingExtent = Jx.prototype.Fa;
    Jx.prototype.getFeatures = Jx.prototype.va;
    Jx.prototype.getFeaturesAtCoordinate = Jx.prototype.Ia;
    Jx.prototype.getClosestFeatureToCoordinate = Jx.prototype.Ya;
    Jx.prototype.getExtent = Jx.prototype.D;
    Jx.prototype.getFeatureById = Jx.prototype.Ha;
    Jx.prototype.removeFeature = Jx.prototype.$a;
    Jx.prototype.getAttributions = Jx.prototype.Y;
    Jx.prototype.getLogo = Jx.prototype.W;
    Jx.prototype.getProjection = Jx.prototype.Z;
    Jx.prototype.getState = Jx.prototype.$;
    Jx.prototype.changed = Jx.prototype.l;
    Jx.prototype.getRevision = Jx.prototype.A;
    Jx.prototype.on = Jx.prototype.u;
    Jx.prototype.once = Jx.prototype.B;
    Jx.prototype.un = Jx.prototype.v;
    Jx.prototype.unByKey = Jx.prototype.C;
    Kx.prototype.readFeatures = Kx.prototype.a;
    Kx.prototype.addFeature = Kx.prototype.Pa;
    Kx.prototype.addFeatures = Kx.prototype.ya;
    Kx.prototype.clear = Kx.prototype.clear;
    Kx.prototype.forEachFeature = Kx.prototype.Xa;
    Kx.prototype.forEachFeatureInExtent = Kx.prototype.ra;
    Kx.prototype.forEachFeatureIntersectingExtent = Kx.prototype.Fa;
    Kx.prototype.getFeatures = Kx.prototype.va;
    Kx.prototype.getFeaturesAtCoordinate = Kx.prototype.Ia;
    Kx.prototype.getClosestFeatureToCoordinate = Kx.prototype.Ya;
    Kx.prototype.getExtent = Kx.prototype.D;
    Kx.prototype.getFeatureById = Kx.prototype.Ha;
    Kx.prototype.removeFeature = Kx.prototype.$a;
    Kx.prototype.getAttributions = Kx.prototype.Y;
    Kx.prototype.getLogo = Kx.prototype.W;
    Kx.prototype.getProjection = Kx.prototype.Z;
    Kx.prototype.getState = Kx.prototype.$;
    Kx.prototype.changed = Kx.prototype.l;
    Kx.prototype.getRevision = Kx.prototype.A;
    Kx.prototype.on = Kx.prototype.u;
    Kx.prototype.once = Kx.prototype.B;
    Kx.prototype.un = Kx.prototype.v;
    Kx.prototype.unByKey = Kx.prototype.C;
    Lx.prototype.readFeatures = Lx.prototype.a;
    Lx.prototype.addFeature = Lx.prototype.Pa;
    Lx.prototype.addFeatures = Lx.prototype.ya;
    Lx.prototype.clear = Lx.prototype.clear;
    Lx.prototype.forEachFeature = Lx.prototype.Xa;
    Lx.prototype.forEachFeatureInExtent = Lx.prototype.ra;
    Lx.prototype.forEachFeatureIntersectingExtent = Lx.prototype.Fa;
    Lx.prototype.getFeatures = Lx.prototype.va;
    Lx.prototype.getFeaturesAtCoordinate = Lx.prototype.Ia;
    Lx.prototype.getClosestFeatureToCoordinate = Lx.prototype.Ya;
    Lx.prototype.getExtent = Lx.prototype.D;
    Lx.prototype.getFeatureById = Lx.prototype.Ha;
    Lx.prototype.removeFeature = Lx.prototype.$a;
    Lx.prototype.getAttributions = Lx.prototype.Y;
    Lx.prototype.getLogo = Lx.prototype.W;
    Lx.prototype.getProjection = Lx.prototype.Z;
    Lx.prototype.getState = Lx.prototype.$;
    Lx.prototype.changed = Lx.prototype.l;
    Lx.prototype.getRevision = Lx.prototype.A;
    Lx.prototype.on = Lx.prototype.u;
    Lx.prototype.once = Lx.prototype.B;
    Lx.prototype.un = Lx.prototype.v;
    Lx.prototype.unByKey = Lx.prototype.C;
    Mx.prototype.getAttributions = Mx.prototype.Y;
    Mx.prototype.getLogo = Mx.prototype.W;
    Mx.prototype.getProjection = Mx.prototype.Z;
    Mx.prototype.getState = Mx.prototype.$;
    Mx.prototype.changed = Mx.prototype.l;
    Mx.prototype.getRevision = Mx.prototype.A;
    Mx.prototype.on = Mx.prototype.u;
    Mx.prototype.once = Mx.prototype.B;
    Mx.prototype.un = Mx.prototype.v;
    Mx.prototype.unByKey = Mx.prototype.C;
    Px.prototype.getAttributions = Px.prototype.Y;
    Px.prototype.getLogo = Px.prototype.W;
    Px.prototype.getProjection = Px.prototype.Z;
    Px.prototype.getState = Px.prototype.$;
    Px.prototype.changed = Px.prototype.l;
    Px.prototype.getRevision = Px.prototype.A;
    Px.prototype.on = Px.prototype.u;
    Px.prototype.once = Px.prototype.B;
    Px.prototype.un = Px.prototype.v;
    Px.prototype.unByKey = Px.prototype.C;
    Qx.prototype.getAttributions = Qx.prototype.Y;
    Qx.prototype.getLogo = Qx.prototype.W;
    Qx.prototype.getProjection = Qx.prototype.Z;
    Qx.prototype.getState = Qx.prototype.$;
    Qx.prototype.changed = Qx.prototype.l;
    Qx.prototype.getRevision = Qx.prototype.A;
    Qx.prototype.on = Qx.prototype.u;
    Qx.prototype.once = Qx.prototype.B;
    Qx.prototype.un = Qx.prototype.v;
    Qx.prototype.unByKey = Qx.prototype.C;
    Rx.prototype.getAttributions = Rx.prototype.Y;
    Rx.prototype.getLogo = Rx.prototype.W;
    Rx.prototype.getProjection = Rx.prototype.Z;
    Rx.prototype.getState = Rx.prototype.$;
    Rx.prototype.changed = Rx.prototype.l;
    Rx.prototype.getRevision = Rx.prototype.A;
    Rx.prototype.on = Rx.prototype.u;
    Rx.prototype.once = Rx.prototype.B;
    Rx.prototype.un = Rx.prototype.v;
    Rx.prototype.unByKey = Rx.prototype.C;
    Sx.prototype.getAttributions = Sx.prototype.Y;
    Sx.prototype.getLogo = Sx.prototype.W;
    Sx.prototype.getProjection = Sx.prototype.Z;
    Sx.prototype.getState = Sx.prototype.$;
    Sx.prototype.changed = Sx.prototype.l;
    Sx.prototype.getRevision = Sx.prototype.A;
    Sx.prototype.on = Sx.prototype.u;
    Sx.prototype.once = Sx.prototype.B;
    Sx.prototype.un = Sx.prototype.v;
    Sx.prototype.unByKey = Sx.prototype.C;
    Ux.prototype.getAttributions = Ux.prototype.Y;
    Ux.prototype.getLogo = Ux.prototype.W;
    Ux.prototype.getProjection = Ux.prototype.Z;
    Ux.prototype.getState = Ux.prototype.$;
    Ux.prototype.changed = Ux.prototype.l;
    Ux.prototype.getRevision = Ux.prototype.A;
    Ux.prototype.on = Ux.prototype.u;
    Ux.prototype.once = Ux.prototype.B;
    Ux.prototype.un = Ux.prototype.v;
    Ux.prototype.unByKey = Ux.prototype.C;
    Yx.prototype.readFeatures = Yx.prototype.a;
    Yx.prototype.addFeature = Yx.prototype.Pa;
    Yx.prototype.addFeatures = Yx.prototype.ya;
    Yx.prototype.clear = Yx.prototype.clear;
    Yx.prototype.forEachFeature = Yx.prototype.Xa;
    Yx.prototype.forEachFeatureInExtent = Yx.prototype.ra;
    Yx.prototype.forEachFeatureIntersectingExtent = Yx.prototype.Fa;
    Yx.prototype.getFeatures = Yx.prototype.va;
    Yx.prototype.getFeaturesAtCoordinate = Yx.prototype.Ia;
    Yx.prototype.getClosestFeatureToCoordinate = Yx.prototype.Ya;
    Yx.prototype.getExtent = Yx.prototype.D;
    Yx.prototype.getFeatureById = Yx.prototype.Ha;
    Yx.prototype.removeFeature = Yx.prototype.$a;
    Yx.prototype.getAttributions = Yx.prototype.Y;
    Yx.prototype.getLogo = Yx.prototype.W;
    Yx.prototype.getProjection = Yx.prototype.Z;
    Yx.prototype.getState = Yx.prototype.$;
    Yx.prototype.changed = Yx.prototype.l;
    Yx.prototype.getRevision = Yx.prototype.A;
    Yx.prototype.on = Yx.prototype.u;
    Yx.prototype.once = Yx.prototype.B;
    Yx.prototype.un = Yx.prototype.v;
    Yx.prototype.unByKey = Yx.prototype.C;
    Zx.prototype.getTileLoadFunction = Zx.prototype.ib;
    Zx.prototype.getTileUrlFunction = Zx.prototype.jb;
    Zx.prototype.setTileLoadFunction = Zx.prototype.ob;
    Zx.prototype.getTileGrid = Zx.prototype.za;
    Zx.prototype.getAttributions = Zx.prototype.Y;
    Zx.prototype.getLogo = Zx.prototype.W;
    Zx.prototype.getProjection = Zx.prototype.Z;
    Zx.prototype.getState = Zx.prototype.$;
    Zx.prototype.changed = Zx.prototype.l;
    Zx.prototype.getRevision = Zx.prototype.A;
    Zx.prototype.on = Zx.prototype.u;
    Zx.prototype.once = Zx.prototype.B;
    Zx.prototype.un = Zx.prototype.v;
    Zx.prototype.unByKey = Zx.prototype.C;
    by.prototype.setTileUrlFunction = by.prototype.pa;
    by.prototype.setUrl = by.prototype.a;
    by.prototype.getTileLoadFunction = by.prototype.ib;
    by.prototype.getTileUrlFunction = by.prototype.jb;
    by.prototype.setTileLoadFunction = by.prototype.ob;
    by.prototype.getTileGrid = by.prototype.za;
    by.prototype.getAttributions = by.prototype.Y;
    by.prototype.getLogo = by.prototype.W;
    by.prototype.getProjection = by.prototype.Z;
    by.prototype.getState = by.prototype.$;
    by.prototype.changed = by.prototype.l;
    by.prototype.getRevision = by.prototype.A;
    by.prototype.on = by.prototype.u;
    by.prototype.once = by.prototype.B;
    by.prototype.un = by.prototype.v;
    by.prototype.unByKey = by.prototype.C;
    $x.prototype.setTileUrlFunction = $x.prototype.pa;
    $x.prototype.setUrl = $x.prototype.a;
    $x.prototype.getTileLoadFunction = $x.prototype.ib;
    $x.prototype.getTileUrlFunction = $x.prototype.jb;
    $x.prototype.setTileLoadFunction = $x.prototype.ob;
    $x.prototype.getTileGrid = $x.prototype.za;
    $x.prototype.getAttributions = $x.prototype.Y;
    $x.prototype.getLogo = $x.prototype.W;
    $x.prototype.getProjection = $x.prototype.Z;
    $x.prototype.getState = $x.prototype.$;
    $x.prototype.changed = $x.prototype.l;
    $x.prototype.getRevision = $x.prototype.A;
    $x.prototype.on = $x.prototype.u;
    $x.prototype.once = $x.prototype.B;
    $x.prototype.un = $x.prototype.v;
    $x.prototype.unByKey = $x.prototype.C;
    ey.prototype.readFeatures = ey.prototype.a;
    ey.prototype.addFeature = ey.prototype.Pa;
    ey.prototype.addFeatures = ey.prototype.ya;
    ey.prototype.clear = ey.prototype.clear;
    ey.prototype.forEachFeature = ey.prototype.Xa;
    ey.prototype.forEachFeatureInExtent = ey.prototype.ra;
    ey.prototype.forEachFeatureIntersectingExtent = ey.prototype.Fa;
    ey.prototype.getFeatures = ey.prototype.va;
    ey.prototype.getFeaturesAtCoordinate = ey.prototype.Ia;
    ey.prototype.getClosestFeatureToCoordinate = ey.prototype.Ya;
    ey.prototype.getExtent = ey.prototype.D;
    ey.prototype.getFeatureById = ey.prototype.Ha;
    ey.prototype.removeFeature = ey.prototype.$a;
    ey.prototype.getAttributions = ey.prototype.Y;
    ey.prototype.getLogo = ey.prototype.W;
    ey.prototype.getProjection = ey.prototype.Z;
    ey.prototype.getState = ey.prototype.$;
    ey.prototype.changed = ey.prototype.l;
    ey.prototype.getRevision = ey.prototype.A;
    ey.prototype.on = ey.prototype.u;
    ey.prototype.once = ey.prototype.B;
    ey.prototype.un = ey.prototype.v;
    ey.prototype.unByKey = ey.prototype.C;
    fy.prototype.addFeature = fy.prototype.Pa;
    fy.prototype.addFeatures = fy.prototype.ya;
    fy.prototype.forEachFeature = fy.prototype.Xa;
    fy.prototype.forEachFeatureInExtent = fy.prototype.ra;
    fy.prototype.forEachFeatureIntersectingExtent = fy.prototype.Fa;
    fy.prototype.getFeatures = fy.prototype.va;
    fy.prototype.getFeaturesAtCoordinate = fy.prototype.Ia;
    fy.prototype.getClosestFeatureToCoordinate = fy.prototype.Ya;
    fy.prototype.getExtent = fy.prototype.D;
    fy.prototype.getFeatureById = fy.prototype.Ha;
    fy.prototype.removeFeature = fy.prototype.$a;
    fy.prototype.getAttributions = fy.prototype.Y;
    fy.prototype.getLogo = fy.prototype.W;
    fy.prototype.getProjection = fy.prototype.Z;
    fy.prototype.getState = fy.prototype.$;
    fy.prototype.changed = fy.prototype.l;
    fy.prototype.getRevision = fy.prototype.A;
    fy.prototype.on = fy.prototype.u;
    fy.prototype.once = fy.prototype.B;
    fy.prototype.un = fy.prototype.v;
    fy.prototype.unByKey = fy.prototype.C;
    iy.prototype.setTileUrlFunction = iy.prototype.pa;
    iy.prototype.setUrl = iy.prototype.a;
    iy.prototype.getTileLoadFunction = iy.prototype.ib;
    iy.prototype.getTileUrlFunction = iy.prototype.jb;
    iy.prototype.setTileLoadFunction = iy.prototype.ob;
    iy.prototype.getTileGrid = iy.prototype.za;
    iy.prototype.getAttributions = iy.prototype.Y;
    iy.prototype.getLogo = iy.prototype.W;
    iy.prototype.getProjection = iy.prototype.Z;
    iy.prototype.getState = iy.prototype.$;
    iy.prototype.changed = iy.prototype.l;
    iy.prototype.getRevision = iy.prototype.A;
    iy.prototype.on = iy.prototype.u;
    iy.prototype.once = iy.prototype.B;
    iy.prototype.un = iy.prototype.v;
    iy.prototype.unByKey = iy.prototype.C;
    ly.prototype.getTileGrid = ly.prototype.za;
    ly.prototype.getAttributions = ly.prototype.Y;
    ly.prototype.getLogo = ly.prototype.W;
    ly.prototype.getProjection = ly.prototype.Z;
    ly.prototype.getState = ly.prototype.$;
    ly.prototype.changed = ly.prototype.l;
    ly.prototype.getRevision = ly.prototype.A;
    ly.prototype.on = ly.prototype.u;
    ly.prototype.once = ly.prototype.B;
    ly.prototype.un = ly.prototype.v;
    ly.prototype.unByKey = ly.prototype.C;
    my.prototype.getTileLoadFunction = my.prototype.ib;
    my.prototype.getTileUrlFunction = my.prototype.jb;
    my.prototype.setTileLoadFunction = my.prototype.ob;
    my.prototype.setTileUrlFunction = my.prototype.pa;
    my.prototype.getTileGrid = my.prototype.za;
    my.prototype.getAttributions = my.prototype.Y;
    my.prototype.getLogo = my.prototype.W;
    my.prototype.getProjection = my.prototype.Z;
    my.prototype.getState = my.prototype.$;
    my.prototype.changed = my.prototype.l;
    my.prototype.getRevision = my.prototype.A;
    my.prototype.on = my.prototype.u;
    my.prototype.once = my.prototype.B;
    my.prototype.un = my.prototype.v;
    my.prototype.unByKey = my.prototype.C;
    ny.prototype.getTileGrid = ny.prototype.za;
    ny.prototype.getAttributions = ny.prototype.Y;
    ny.prototype.getLogo = ny.prototype.W;
    ny.prototype.getProjection = ny.prototype.Z;
    ny.prototype.getState = ny.prototype.$;
    ny.prototype.changed = ny.prototype.l;
    ny.prototype.getRevision = ny.prototype.A;
    ny.prototype.on = ny.prototype.u;
    ny.prototype.once = ny.prototype.B;
    ny.prototype.un = ny.prototype.v;
    ny.prototype.unByKey = ny.prototype.C;
    sy.prototype.readFeatures = sy.prototype.a;
    sy.prototype.forEachFeatureIntersectingExtent = sy.prototype.Fa;
    sy.prototype.getFeaturesAtCoordinate = sy.prototype.Ia;
    sy.prototype.getFeatureById = sy.prototype.Ha;
    sy.prototype.getAttributions = sy.prototype.Y;
    sy.prototype.getLogo = sy.prototype.W;
    sy.prototype.getProjection = sy.prototype.Z;
    sy.prototype.getState = sy.prototype.$;
    sy.prototype.changed = sy.prototype.l;
    sy.prototype.getRevision = sy.prototype.A;
    sy.prototype.on = sy.prototype.u;
    sy.prototype.once = sy.prototype.B;
    sy.prototype.un = sy.prototype.v;
    sy.prototype.unByKey = sy.prototype.C;
    uy.prototype.getTileLoadFunction = uy.prototype.ib;
    uy.prototype.getTileUrlFunction = uy.prototype.jb;
    uy.prototype.setTileLoadFunction = uy.prototype.ob;
    uy.prototype.setTileUrlFunction = uy.prototype.pa;
    uy.prototype.getTileGrid = uy.prototype.za;
    uy.prototype.getAttributions = uy.prototype.Y;
    uy.prototype.getLogo = uy.prototype.W;
    uy.prototype.getProjection = uy.prototype.Z;
    uy.prototype.getState = uy.prototype.$;
    uy.prototype.changed = uy.prototype.l;
    uy.prototype.getRevision = uy.prototype.A;
    uy.prototype.on = uy.prototype.u;
    uy.prototype.once = uy.prototype.B;
    uy.prototype.un = uy.prototype.v;
    uy.prototype.unByKey = uy.prototype.C;
    yy.prototype.readFeatures = yy.prototype.a;
    yy.prototype.addFeature = yy.prototype.Pa;
    yy.prototype.addFeatures = yy.prototype.ya;
    yy.prototype.clear = yy.prototype.clear;
    yy.prototype.forEachFeature = yy.prototype.Xa;
    yy.prototype.forEachFeatureInExtent = yy.prototype.ra;
    yy.prototype.forEachFeatureIntersectingExtent = yy.prototype.Fa;
    yy.prototype.getFeatures = yy.prototype.va;
    yy.prototype.getFeaturesAtCoordinate = yy.prototype.Ia;
    yy.prototype.getClosestFeatureToCoordinate = yy.prototype.Ya;
    yy.prototype.getExtent = yy.prototype.D;
    yy.prototype.getFeatureById = yy.prototype.Ha;
    yy.prototype.removeFeature = yy.prototype.$a;
    yy.prototype.getAttributions = yy.prototype.Y;
    yy.prototype.getLogo = yy.prototype.W;
    yy.prototype.getProjection = yy.prototype.Z;
    yy.prototype.getState = yy.prototype.$;
    yy.prototype.changed = yy.prototype.l;
    yy.prototype.getRevision = yy.prototype.A;
    yy.prototype.on = yy.prototype.u;
    yy.prototype.once = yy.prototype.B;
    yy.prototype.un = yy.prototype.v;
    yy.prototype.unByKey = yy.prototype.C;
    Ay.prototype.getTileLoadFunction = Ay.prototype.ib;
    Ay.prototype.getTileUrlFunction = Ay.prototype.jb;
    Ay.prototype.setTileLoadFunction = Ay.prototype.ob;
    Ay.prototype.setTileUrlFunction = Ay.prototype.pa;
    Ay.prototype.getTileGrid = Ay.prototype.za;
    Ay.prototype.getAttributions = Ay.prototype.Y;
    Ay.prototype.getLogo = Ay.prototype.W;
    Ay.prototype.getProjection = Ay.prototype.Z;
    Ay.prototype.getState = Ay.prototype.$;
    Ay.prototype.changed = Ay.prototype.l;
    Ay.prototype.getRevision = Ay.prototype.A;
    Ay.prototype.on = Ay.prototype.u;
    Ay.prototype.once = Ay.prototype.B;
    Ay.prototype.un = Ay.prototype.v;
    Ay.prototype.unByKey = Ay.prototype.C;
    Dy.prototype.getTileLoadFunction = Dy.prototype.ib;
    Dy.prototype.getTileUrlFunction = Dy.prototype.jb;
    Dy.prototype.setTileLoadFunction = Dy.prototype.ob;
    Dy.prototype.setTileUrlFunction = Dy.prototype.pa;
    Dy.prototype.getTileGrid = Dy.prototype.za;
    Dy.prototype.getAttributions = Dy.prototype.Y;
    Dy.prototype.getLogo = Dy.prototype.W;
    Dy.prototype.getProjection = Dy.prototype.Z;
    Dy.prototype.getState = Dy.prototype.$;
    Dy.prototype.changed = Dy.prototype.l;
    Dy.prototype.getRevision = Dy.prototype.A;
    Dy.prototype.on = Dy.prototype.u;
    Dy.prototype.once = Dy.prototype.B;
    Dy.prototype.un = Dy.prototype.v;
    Dy.prototype.unByKey = Dy.prototype.C;
    D.prototype.bindTo = D.prototype.O;
    D.prototype.get = D.prototype.get;
    D.prototype.getKeys = D.prototype.I;
    D.prototype.getProperties = D.prototype.L;
    D.prototype.set = D.prototype.set;
    D.prototype.setProperties = D.prototype.G;
    D.prototype.unbind = D.prototype.P;
    D.prototype.unbindAll = D.prototype.R;
    D.prototype.changed = D.prototype.l;
    D.prototype.getRevision = D.prototype.A;
    D.prototype.on = D.prototype.u;
    D.prototype.once = D.prototype.B;
    D.prototype.un = D.prototype.v;
    D.prototype.unByKey = D.prototype.C;
    E.prototype.getBrightness = E.prototype.d;
    E.prototype.getContrast = E.prototype.e;
    E.prototype.getHue = E.prototype.f;
    E.prototype.getExtent = E.prototype.D;
    E.prototype.getMaxResolution = E.prototype.g;
    E.prototype.getMinResolution = E.prototype.i;
    E.prototype.getOpacity = E.prototype.j;
    E.prototype.getSaturation = E.prototype.n;
    E.prototype.getVisible = E.prototype.b;
    E.prototype.setBrightness = E.prototype.t;
    E.prototype.setContrast = E.prototype.F;
    E.prototype.setHue = E.prototype.J;
    E.prototype.setExtent = E.prototype.p;
    E.prototype.setMaxResolution = E.prototype.Q;
    E.prototype.setMinResolution = E.prototype.V;
    E.prototype.setOpacity = E.prototype.q;
    E.prototype.setSaturation = E.prototype.ba;
    E.prototype.setVisible = E.prototype.ca;
    E.prototype.bindTo = E.prototype.O;
    E.prototype.get = E.prototype.get;
    E.prototype.getKeys = E.prototype.I;
    E.prototype.getProperties = E.prototype.L;
    E.prototype.set = E.prototype.set;
    E.prototype.setProperties = E.prototype.G;
    E.prototype.unbind = E.prototype.P;
    E.prototype.unbindAll = E.prototype.R;
    E.prototype.changed = E.prototype.l;
    E.prototype.getRevision = E.prototype.A;
    E.prototype.on = E.prototype.u;
    E.prototype.once = E.prototype.B;
    E.prototype.un = E.prototype.v;
    E.prototype.unByKey = E.prototype.C;
    L.prototype.setSource = L.prototype.ga;
    L.prototype.getBrightness = L.prototype.d;
    L.prototype.getContrast = L.prototype.e;
    L.prototype.getHue = L.prototype.f;
    L.prototype.getExtent = L.prototype.D;
    L.prototype.getMaxResolution = L.prototype.g;
    L.prototype.getMinResolution = L.prototype.i;
    L.prototype.getOpacity = L.prototype.j;
    L.prototype.getSaturation = L.prototype.n;
    L.prototype.getVisible = L.prototype.b;
    L.prototype.setBrightness = L.prototype.t;
    L.prototype.setContrast = L.prototype.F;
    L.prototype.setHue = L.prototype.J;
    L.prototype.setExtent = L.prototype.p;
    L.prototype.setMaxResolution = L.prototype.Q;
    L.prototype.setMinResolution = L.prototype.V;
    L.prototype.setOpacity = L.prototype.q;
    L.prototype.setSaturation = L.prototype.ba;
    L.prototype.setVisible = L.prototype.ca;
    L.prototype.bindTo = L.prototype.O;
    L.prototype.get = L.prototype.get;
    L.prototype.getKeys = L.prototype.I;
    L.prototype.getProperties = L.prototype.L;
    L.prototype.set = L.prototype.set;
    L.prototype.setProperties = L.prototype.G;
    L.prototype.unbind = L.prototype.P;
    L.prototype.unbindAll = L.prototype.R;
    L.prototype.changed = L.prototype.l;
    L.prototype.getRevision = L.prototype.A;
    L.prototype.on = L.prototype.u;
    L.prototype.once = L.prototype.B;
    L.prototype.un = L.prototype.v;
    L.prototype.unByKey = L.prototype.C;
    $.prototype.getSource = $.prototype.a;
    $.prototype.getStyle = $.prototype.Uc;
    $.prototype.getStyleFunction = $.prototype.Vc;
    $.prototype.setStyle = $.prototype.oa;
    $.prototype.setSource = $.prototype.ga;
    $.prototype.getBrightness = $.prototype.d;
    $.prototype.getContrast = $.prototype.e;
    $.prototype.getHue = $.prototype.f;
    $.prototype.getExtent = $.prototype.D;
    $.prototype.getMaxResolution = $.prototype.g;
    $.prototype.getMinResolution = $.prototype.i;
    $.prototype.getOpacity = $.prototype.j;
    $.prototype.getSaturation = $.prototype.n;
    $.prototype.getVisible = $.prototype.b;
    $.prototype.setBrightness = $.prototype.t;
    $.prototype.setContrast = $.prototype.F;
    $.prototype.setHue = $.prototype.J;
    $.prototype.setExtent = $.prototype.p;
    $.prototype.setMaxResolution = $.prototype.Q;
    $.prototype.setMinResolution = $.prototype.V;
    $.prototype.setOpacity = $.prototype.q;
    $.prototype.setSaturation = $.prototype.ba;
    $.prototype.setVisible = $.prototype.ca;
    $.prototype.bindTo = $.prototype.O;
    $.prototype.get = $.prototype.get;
    $.prototype.getKeys = $.prototype.I;
    $.prototype.getProperties = $.prototype.L;
    $.prototype.set = $.prototype.set;
    $.prototype.setProperties = $.prototype.G;
    $.prototype.unbind = $.prototype.P;
    $.prototype.unbindAll = $.prototype.R;
    $.prototype.changed = $.prototype.l;
    $.prototype.getRevision = $.prototype.A;
    $.prototype.on = $.prototype.u;
    $.prototype.once = $.prototype.B;
    $.prototype.un = $.prototype.v;
    $.prototype.unByKey = $.prototype.C;
    J.prototype.setSource = J.prototype.ga;
    J.prototype.getBrightness = J.prototype.d;
    J.prototype.getContrast = J.prototype.e;
    J.prototype.getHue = J.prototype.f;
    J.prototype.getExtent = J.prototype.D;
    J.prototype.getMaxResolution = J.prototype.g;
    J.prototype.getMinResolution = J.prototype.i;
    J.prototype.getOpacity = J.prototype.j;
    J.prototype.getSaturation = J.prototype.n;
    J.prototype.getVisible = J.prototype.b;
    J.prototype.setBrightness = J.prototype.t;
    J.prototype.setContrast = J.prototype.F;
    J.prototype.setHue = J.prototype.J;
    J.prototype.setExtent = J.prototype.p;
    J.prototype.setMaxResolution = J.prototype.Q;
    J.prototype.setMinResolution = J.prototype.V;
    J.prototype.setOpacity = J.prototype.q;
    J.prototype.setSaturation = J.prototype.ba;
    J.prototype.setVisible = J.prototype.ca;
    J.prototype.bindTo = J.prototype.O;
    J.prototype.get = J.prototype.get;
    J.prototype.getKeys = J.prototype.I;
    J.prototype.getProperties = J.prototype.L;
    J.prototype.set = J.prototype.set;
    J.prototype.setProperties = J.prototype.G;
    J.prototype.unbind = J.prototype.P;
    J.prototype.unbindAll = J.prototype.R;
    J.prototype.changed = J.prototype.l;
    J.prototype.getRevision = J.prototype.A;
    J.prototype.on = J.prototype.u;
    J.prototype.once = J.prototype.B;
    J.prototype.un = J.prototype.v;
    J.prototype.unByKey = J.prototype.C;
    I.prototype.getBrightness = I.prototype.d;
    I.prototype.getContrast = I.prototype.e;
    I.prototype.getHue = I.prototype.f;
    I.prototype.getExtent = I.prototype.D;
    I.prototype.getMaxResolution = I.prototype.g;
    I.prototype.getMinResolution = I.prototype.i;
    I.prototype.getOpacity = I.prototype.j;
    I.prototype.getSaturation = I.prototype.n;
    I.prototype.getVisible = I.prototype.b;
    I.prototype.setBrightness = I.prototype.t;
    I.prototype.setContrast = I.prototype.F;
    I.prototype.setHue = I.prototype.J;
    I.prototype.setExtent = I.prototype.p;
    I.prototype.setMaxResolution = I.prototype.Q;
    I.prototype.setMinResolution = I.prototype.V;
    I.prototype.setOpacity = I.prototype.q;
    I.prototype.setSaturation = I.prototype.ba;
    I.prototype.setVisible = I.prototype.ca;
    I.prototype.bindTo = I.prototype.O;
    I.prototype.get = I.prototype.get;
    I.prototype.getKeys = I.prototype.I;
    I.prototype.getProperties = I.prototype.L;
    I.prototype.set = I.prototype.set;
    I.prototype.setProperties = I.prototype.G;
    I.prototype.unbind = I.prototype.P;
    I.prototype.unbindAll = I.prototype.R;
    I.prototype.changed = I.prototype.l;
    I.prototype.getRevision = I.prototype.A;
    I.prototype.on = I.prototype.u;
    I.prototype.once = I.prototype.B;
    I.prototype.un = I.prototype.v;
    I.prototype.unByKey = I.prototype.C;
    K.prototype.setSource = K.prototype.ga;
    K.prototype.getBrightness = K.prototype.d;
    K.prototype.getContrast = K.prototype.e;
    K.prototype.getHue = K.prototype.f;
    K.prototype.getExtent = K.prototype.D;
    K.prototype.getMaxResolution = K.prototype.g;
    K.prototype.getMinResolution = K.prototype.i;
    K.prototype.getOpacity = K.prototype.j;
    K.prototype.getSaturation = K.prototype.n;
    K.prototype.getVisible = K.prototype.b;
    K.prototype.setBrightness = K.prototype.t;
    K.prototype.setContrast = K.prototype.F;
    K.prototype.setHue = K.prototype.J;
    K.prototype.setExtent = K.prototype.p;
    K.prototype.setMaxResolution = K.prototype.Q;
    K.prototype.setMinResolution = K.prototype.V;
    K.prototype.setOpacity = K.prototype.q;
    K.prototype.setSaturation = K.prototype.ba;
    K.prototype.setVisible = K.prototype.ca;
    K.prototype.bindTo = K.prototype.O;
    K.prototype.get = K.prototype.get;
    K.prototype.getKeys = K.prototype.I;
    K.prototype.getProperties = K.prototype.L;
    K.prototype.set = K.prototype.set;
    K.prototype.setProperties = K.prototype.G;
    K.prototype.unbind = K.prototype.P;
    K.prototype.unbindAll = K.prototype.R;
    K.prototype.changed = K.prototype.l;
    K.prototype.getRevision = K.prototype.A;
    K.prototype.on = K.prototype.u;
    K.prototype.once = K.prototype.B;
    K.prototype.un = K.prototype.v;
    K.prototype.unByKey = K.prototype.C;
    mk.prototype.bindTo = mk.prototype.O;
    mk.prototype.get = mk.prototype.get;
    mk.prototype.getKeys = mk.prototype.I;
    mk.prototype.getProperties = mk.prototype.L;
    mk.prototype.set = mk.prototype.set;
    mk.prototype.setProperties = mk.prototype.G;
    mk.prototype.unbind = mk.prototype.P;
    mk.prototype.unbindAll = mk.prototype.R;
    mk.prototype.changed = mk.prototype.l;
    mk.prototype.getRevision = mk.prototype.A;
    mk.prototype.on = mk.prototype.u;
    mk.prototype.once = mk.prototype.B;
    mk.prototype.un = mk.prototype.v;
    mk.prototype.unByKey = mk.prototype.C;
    qk.prototype.getActive = qk.prototype.a;
    qk.prototype.setActive = qk.prototype.b;
    qk.prototype.bindTo = qk.prototype.O;
    qk.prototype.get = qk.prototype.get;
    qk.prototype.getKeys = qk.prototype.I;
    qk.prototype.getProperties = qk.prototype.L;
    qk.prototype.set = qk.prototype.set;
    qk.prototype.setProperties = qk.prototype.G;
    qk.prototype.unbind = qk.prototype.P;
    qk.prototype.unbindAll = qk.prototype.R;
    qk.prototype.changed = qk.prototype.l;
    qk.prototype.getRevision = qk.prototype.A;
    qk.prototype.on = qk.prototype.u;
    qk.prototype.once = qk.prototype.B;
    qk.prototype.un = qk.prototype.v;
    qk.prototype.unByKey = qk.prototype.C;
    Mv.prototype.getActive = Mv.prototype.a;
    Mv.prototype.setActive = Mv.prototype.b;
    Mv.prototype.bindTo = Mv.prototype.O;
    Mv.prototype.get = Mv.prototype.get;
    Mv.prototype.getKeys = Mv.prototype.I;
    Mv.prototype.getProperties = Mv.prototype.L;
    Mv.prototype.set = Mv.prototype.set;
    Mv.prototype.setProperties = Mv.prototype.G;
    Mv.prototype.unbind = Mv.prototype.P;
    Mv.prototype.unbindAll = Mv.prototype.R;
    Mv.prototype.changed = Mv.prototype.l;
    Mv.prototype.getRevision = Mv.prototype.A;
    Mv.prototype.on = Mv.prototype.u;
    Mv.prototype.once = Mv.prototype.B;
    Mv.prototype.un = Mv.prototype.v;
    Mv.prototype.unByKey = Mv.prototype.C;
    zk.prototype.getActive = zk.prototype.a;
    zk.prototype.setActive = zk.prototype.b;
    zk.prototype.bindTo = zk.prototype.O;
    zk.prototype.get = zk.prototype.get;
    zk.prototype.getKeys = zk.prototype.I;
    zk.prototype.getProperties = zk.prototype.L;
    zk.prototype.set = zk.prototype.set;
    zk.prototype.setProperties = zk.prototype.G;
    zk.prototype.unbind = zk.prototype.P;
    zk.prototype.unbindAll = zk.prototype.R;
    zk.prototype.changed = zk.prototype.l;
    zk.prototype.getRevision = zk.prototype.A;
    zk.prototype.on = zk.prototype.u;
    zk.prototype.once = zk.prototype.B;
    zk.prototype.un = zk.prototype.v;
    zk.prototype.unByKey = zk.prototype.C;
    Dl.prototype.getActive = Dl.prototype.a;
    Dl.prototype.setActive = Dl.prototype.b;
    Dl.prototype.bindTo = Dl.prototype.O;
    Dl.prototype.get = Dl.prototype.get;
    Dl.prototype.getKeys = Dl.prototype.I;
    Dl.prototype.getProperties = Dl.prototype.L;
    Dl.prototype.set = Dl.prototype.set;
    Dl.prototype.setProperties = Dl.prototype.G;
    Dl.prototype.unbind = Dl.prototype.P;
    Dl.prototype.unbindAll = Dl.prototype.R;
    Dl.prototype.changed = Dl.prototype.l;
    Dl.prototype.getRevision = Dl.prototype.A;
    Dl.prototype.on = Dl.prototype.u;
    Dl.prototype.once = Dl.prototype.B;
    Dl.prototype.un = Dl.prototype.v;
    Dl.prototype.unByKey = Dl.prototype.C;
    Ck.prototype.getActive = Ck.prototype.a;
    Ck.prototype.setActive = Ck.prototype.b;
    Ck.prototype.bindTo = Ck.prototype.O;
    Ck.prototype.get = Ck.prototype.get;
    Ck.prototype.getKeys = Ck.prototype.I;
    Ck.prototype.getProperties = Ck.prototype.L;
    Ck.prototype.set = Ck.prototype.set;
    Ck.prototype.setProperties = Ck.prototype.G;
    Ck.prototype.unbind = Ck.prototype.P;
    Ck.prototype.unbindAll = Ck.prototype.R;
    Ck.prototype.changed = Ck.prototype.l;
    Ck.prototype.getRevision = Ck.prototype.A;
    Ck.prototype.on = Ck.prototype.u;
    Ck.prototype.once = Ck.prototype.B;
    Ck.prototype.un = Ck.prototype.v;
    Ck.prototype.unByKey = Ck.prototype.C;
    Qv.prototype.getActive = Qv.prototype.a;
    Qv.prototype.setActive = Qv.prototype.b;
    Qv.prototype.bindTo = Qv.prototype.O;
    Qv.prototype.get = Qv.prototype.get;
    Qv.prototype.getKeys = Qv.prototype.I;
    Qv.prototype.getProperties = Qv.prototype.L;
    Qv.prototype.set = Qv.prototype.set;
    Qv.prototype.setProperties = Qv.prototype.G;
    Qv.prototype.unbind = Qv.prototype.P;
    Qv.prototype.unbindAll = Qv.prototype.R;
    Qv.prototype.changed = Qv.prototype.l;
    Qv.prototype.getRevision = Qv.prototype.A;
    Qv.prototype.on = Qv.prototype.u;
    Qv.prototype.once = Qv.prototype.B;
    Qv.prototype.un = Qv.prototype.v;
    Qv.prototype.unByKey = Qv.prototype.C;
    Gk.prototype.getActive = Gk.prototype.a;
    Gk.prototype.setActive = Gk.prototype.b;
    Gk.prototype.bindTo = Gk.prototype.O;
    Gk.prototype.get = Gk.prototype.get;
    Gk.prototype.getKeys = Gk.prototype.I;
    Gk.prototype.getProperties = Gk.prototype.L;
    Gk.prototype.set = Gk.prototype.set;
    Gk.prototype.setProperties = Gk.prototype.G;
    Gk.prototype.unbind = Gk.prototype.P;
    Gk.prototype.unbindAll = Gk.prototype.R;
    Gk.prototype.changed = Gk.prototype.l;
    Gk.prototype.getRevision = Gk.prototype.A;
    Gk.prototype.on = Gk.prototype.u;
    Gk.prototype.once = Gk.prototype.B;
    Gk.prototype.un = Gk.prototype.v;
    Gk.prototype.unByKey = Gk.prototype.C;
    Wl.prototype.getGeometry = Wl.prototype.N;
    Wl.prototype.getActive = Wl.prototype.a;
    Wl.prototype.setActive = Wl.prototype.b;
    Wl.prototype.bindTo = Wl.prototype.O;
    Wl.prototype.get = Wl.prototype.get;
    Wl.prototype.getKeys = Wl.prototype.I;
    Wl.prototype.getProperties = Wl.prototype.L;
    Wl.prototype.set = Wl.prototype.set;
    Wl.prototype.setProperties = Wl.prototype.G;
    Wl.prototype.unbind = Wl.prototype.P;
    Wl.prototype.unbindAll = Wl.prototype.R;
    Wl.prototype.changed = Wl.prototype.l;
    Wl.prototype.getRevision = Wl.prototype.A;
    Wl.prototype.on = Wl.prototype.u;
    Wl.prototype.once = Wl.prototype.B;
    Wl.prototype.un = Wl.prototype.v;
    Wl.prototype.unByKey = Wl.prototype.C;
    gw.prototype.getActive = gw.prototype.a;
    gw.prototype.setActive = gw.prototype.b;
    gw.prototype.bindTo = gw.prototype.O;
    gw.prototype.get = gw.prototype.get;
    gw.prototype.getKeys = gw.prototype.I;
    gw.prototype.getProperties = gw.prototype.L;
    gw.prototype.set = gw.prototype.set;
    gw.prototype.setProperties = gw.prototype.G;
    gw.prototype.unbind = gw.prototype.P;
    gw.prototype.unbindAll = gw.prototype.R;
    gw.prototype.changed = gw.prototype.l;
    gw.prototype.getRevision = gw.prototype.A;
    gw.prototype.on = gw.prototype.u;
    gw.prototype.once = gw.prototype.B;
    gw.prototype.un = gw.prototype.v;
    gw.prototype.unByKey = gw.prototype.C;
    Xl.prototype.getActive = Xl.prototype.a;
    Xl.prototype.setActive = Xl.prototype.b;
    Xl.prototype.bindTo = Xl.prototype.O;
    Xl.prototype.get = Xl.prototype.get;
    Xl.prototype.getKeys = Xl.prototype.I;
    Xl.prototype.getProperties = Xl.prototype.L;
    Xl.prototype.set = Xl.prototype.set;
    Xl.prototype.setProperties = Xl.prototype.G;
    Xl.prototype.unbind = Xl.prototype.P;
    Xl.prototype.unbindAll = Xl.prototype.R;
    Xl.prototype.changed = Xl.prototype.l;
    Xl.prototype.getRevision = Xl.prototype.A;
    Xl.prototype.on = Xl.prototype.u;
    Xl.prototype.once = Xl.prototype.B;
    Xl.prototype.un = Xl.prototype.v;
    Xl.prototype.unByKey = Xl.prototype.C;
    Zl.prototype.getActive = Zl.prototype.a;
    Zl.prototype.setActive = Zl.prototype.b;
    Zl.prototype.bindTo = Zl.prototype.O;
    Zl.prototype.get = Zl.prototype.get;
    Zl.prototype.getKeys = Zl.prototype.I;
    Zl.prototype.getProperties = Zl.prototype.L;
    Zl.prototype.set = Zl.prototype.set;
    Zl.prototype.setProperties = Zl.prototype.G;
    Zl.prototype.unbind = Zl.prototype.P;
    Zl.prototype.unbindAll = Zl.prototype.R;
    Zl.prototype.changed = Zl.prototype.l;
    Zl.prototype.getRevision = Zl.prototype.A;
    Zl.prototype.on = Zl.prototype.u;
    Zl.prototype.once = Zl.prototype.B;
    Zl.prototype.un = Zl.prototype.v;
    Zl.prototype.unByKey = Zl.prototype.C;
    tw.prototype.getActive = tw.prototype.a;
    tw.prototype.setActive = tw.prototype.b;
    tw.prototype.bindTo = tw.prototype.O;
    tw.prototype.get = tw.prototype.get;
    tw.prototype.getKeys = tw.prototype.I;
    tw.prototype.getProperties = tw.prototype.L;
    tw.prototype.set = tw.prototype.set;
    tw.prototype.setProperties = tw.prototype.G;
    tw.prototype.unbind = tw.prototype.P;
    tw.prototype.unbindAll = tw.prototype.R;
    tw.prototype.changed = tw.prototype.l;
    tw.prototype.getRevision = tw.prototype.A;
    tw.prototype.on = tw.prototype.u;
    tw.prototype.once = tw.prototype.B;
    tw.prototype.un = tw.prototype.v;
    tw.prototype.unByKey = tw.prototype.C;
    am.prototype.getActive = am.prototype.a;
    am.prototype.setActive = am.prototype.b;
    am.prototype.bindTo = am.prototype.O;
    am.prototype.get = am.prototype.get;
    am.prototype.getKeys = am.prototype.I;
    am.prototype.getProperties = am.prototype.L;
    am.prototype.set = am.prototype.set;
    am.prototype.setProperties = am.prototype.G;
    am.prototype.unbind = am.prototype.P;
    am.prototype.unbindAll = am.prototype.R;
    am.prototype.changed = am.prototype.l;
    am.prototype.getRevision = am.prototype.A;
    am.prototype.on = am.prototype.u;
    am.prototype.once = am.prototype.B;
    am.prototype.un = am.prototype.v;
    am.prototype.unByKey = am.prototype.C;
    cm.prototype.getActive = cm.prototype.a;
    cm.prototype.setActive = cm.prototype.b;
    cm.prototype.bindTo = cm.prototype.O;
    cm.prototype.get = cm.prototype.get;
    cm.prototype.getKeys = cm.prototype.I;
    cm.prototype.getProperties = cm.prototype.L;
    cm.prototype.set = cm.prototype.set;
    cm.prototype.setProperties = cm.prototype.G;
    cm.prototype.unbind = cm.prototype.P;
    cm.prototype.unbindAll = cm.prototype.R;
    cm.prototype.changed = cm.prototype.l;
    cm.prototype.getRevision = cm.prototype.A;
    cm.prototype.on = cm.prototype.u;
    cm.prototype.once = cm.prototype.B;
    cm.prototype.un = cm.prototype.v;
    cm.prototype.unByKey = cm.prototype.C;
    gm.prototype.getActive = gm.prototype.a;
    gm.prototype.setActive = gm.prototype.b;
    gm.prototype.bindTo = gm.prototype.O;
    gm.prototype.get = gm.prototype.get;
    gm.prototype.getKeys = gm.prototype.I;
    gm.prototype.getProperties = gm.prototype.L;
    gm.prototype.set = gm.prototype.set;
    gm.prototype.setProperties = gm.prototype.G;
    gm.prototype.unbind = gm.prototype.P;
    gm.prototype.unbindAll = gm.prototype.R;
    gm.prototype.changed = gm.prototype.l;
    gm.prototype.getRevision = gm.prototype.A;
    gm.prototype.on = gm.prototype.u;
    gm.prototype.once = gm.prototype.B;
    gm.prototype.un = gm.prototype.v;
    gm.prototype.unByKey = gm.prototype.C;
    Cw.prototype.getActive = Cw.prototype.a;
    Cw.prototype.setActive = Cw.prototype.b;
    Cw.prototype.bindTo = Cw.prototype.O;
    Cw.prototype.get = Cw.prototype.get;
    Cw.prototype.getKeys = Cw.prototype.I;
    Cw.prototype.getProperties = Cw.prototype.L;
    Cw.prototype.set = Cw.prototype.set;
    Cw.prototype.setProperties = Cw.prototype.G;
    Cw.prototype.unbind = Cw.prototype.P;
    Cw.prototype.unbindAll = Cw.prototype.R;
    Cw.prototype.changed = Cw.prototype.l;
    Cw.prototype.getRevision = Cw.prototype.A;
    Cw.prototype.on = Cw.prototype.u;
    Cw.prototype.once = Cw.prototype.B;
    Cw.prototype.un = Cw.prototype.v;
    Cw.prototype.unByKey = Cw.prototype.C;
    Kk.prototype.changed = Kk.prototype.l;
    Kk.prototype.getRevision = Kk.prototype.A;
    Kk.prototype.on = Kk.prototype.u;
    Kk.prototype.once = Kk.prototype.B;
    Kk.prototype.un = Kk.prototype.v;
    Kk.prototype.unByKey = Kk.prototype.C;
    Mk.prototype.clone = Mk.prototype.clone;
    Mk.prototype.getClosestPoint = Mk.prototype.f;
    Mk.prototype.getType = Mk.prototype.H;
    Mk.prototype.intersectsExtent = Mk.prototype.ha;
    Mk.prototype.transform = Mk.prototype.e;
    Mk.prototype.changed = Mk.prototype.l;
    Mk.prototype.getRevision = Mk.prototype.A;
    Mk.prototype.on = Mk.prototype.u;
    Mk.prototype.once = Mk.prototype.B;
    Mk.prototype.un = Mk.prototype.v;
    Mk.prototype.unByKey = Mk.prototype.C;
    fn.prototype.getFirstCoordinate = fn.prototype.vb;
    fn.prototype.getLastCoordinate = fn.prototype.wb;
    fn.prototype.getLayout = fn.prototype.xb;
    fn.prototype.applyTransform = fn.prototype.ma;
    fn.prototype.translate = fn.prototype.Aa;
    fn.prototype.getClosestPoint = fn.prototype.f;
    fn.prototype.intersectsExtent = fn.prototype.ha;
    fn.prototype.changed = fn.prototype.l;
    fn.prototype.getRevision = fn.prototype.A;
    fn.prototype.on = fn.prototype.u;
    fn.prototype.once = fn.prototype.B;
    fn.prototype.un = fn.prototype.v;
    fn.prototype.unByKey = fn.prototype.C;
    hn.prototype.getClosestPoint = hn.prototype.f;
    hn.prototype.transform = hn.prototype.e;
    hn.prototype.changed = hn.prototype.l;
    hn.prototype.getRevision = hn.prototype.A;
    hn.prototype.on = hn.prototype.u;
    hn.prototype.once = hn.prototype.B;
    hn.prototype.un = hn.prototype.v;
    hn.prototype.unByKey = hn.prototype.C;
    fl.prototype.getExtent = fl.prototype.D;
    fl.prototype.getFirstCoordinate = fl.prototype.vb;
    fl.prototype.getLastCoordinate = fl.prototype.wb;
    fl.prototype.getLayout = fl.prototype.xb;
    fl.prototype.applyTransform = fl.prototype.ma;
    fl.prototype.translate = fl.prototype.Aa;
    fl.prototype.getClosestPoint = fl.prototype.f;
    fl.prototype.intersectsExtent = fl.prototype.ha;
    fl.prototype.transform = fl.prototype.e;
    fl.prototype.changed = fl.prototype.l;
    fl.prototype.getRevision = fl.prototype.A;
    fl.prototype.on = fl.prototype.u;
    fl.prototype.once = fl.prototype.B;
    fl.prototype.un = fl.prototype.v;
    fl.prototype.unByKey = fl.prototype.C;
    M.prototype.getExtent = M.prototype.D;
    M.prototype.getFirstCoordinate = M.prototype.vb;
    M.prototype.getLastCoordinate = M.prototype.wb;
    M.prototype.getLayout = M.prototype.xb;
    M.prototype.applyTransform = M.prototype.ma;
    M.prototype.translate = M.prototype.Aa;
    M.prototype.getClosestPoint = M.prototype.f;
    M.prototype.transform = M.prototype.e;
    M.prototype.changed = M.prototype.l;
    M.prototype.getRevision = M.prototype.A;
    M.prototype.on = M.prototype.u;
    M.prototype.once = M.prototype.B;
    M.prototype.un = M.prototype.v;
    M.prototype.unByKey = M.prototype.C;
    qn.prototype.getExtent = qn.prototype.D;
    qn.prototype.getFirstCoordinate = qn.prototype.vb;
    qn.prototype.getLastCoordinate = qn.prototype.wb;
    qn.prototype.getLayout = qn.prototype.xb;
    qn.prototype.applyTransform = qn.prototype.ma;
    qn.prototype.translate = qn.prototype.Aa;
    qn.prototype.getClosestPoint = qn.prototype.f;
    qn.prototype.transform = qn.prototype.e;
    qn.prototype.changed = qn.prototype.l;
    qn.prototype.getRevision = qn.prototype.A;
    qn.prototype.on = qn.prototype.u;
    qn.prototype.once = qn.prototype.B;
    qn.prototype.un = qn.prototype.v;
    qn.prototype.unByKey = qn.prototype.C;
    tn.prototype.getExtent = tn.prototype.D;
    tn.prototype.getFirstCoordinate = tn.prototype.vb;
    tn.prototype.getLastCoordinate = tn.prototype.wb;
    tn.prototype.getLayout = tn.prototype.xb;
    tn.prototype.applyTransform = tn.prototype.ma;
    tn.prototype.translate = tn.prototype.Aa;
    tn.prototype.getClosestPoint = tn.prototype.f;
    tn.prototype.transform = tn.prototype.e;
    tn.prototype.changed = tn.prototype.l;
    tn.prototype.getRevision = tn.prototype.A;
    tn.prototype.on = tn.prototype.u;
    tn.prototype.once = tn.prototype.B;
    tn.prototype.un = tn.prototype.v;
    tn.prototype.unByKey = tn.prototype.C;
    un.prototype.getExtent = un.prototype.D;
    un.prototype.getFirstCoordinate = un.prototype.vb;
    un.prototype.getLastCoordinate = un.prototype.wb;
    un.prototype.getLayout = un.prototype.xb;
    un.prototype.applyTransform = un.prototype.ma;
    un.prototype.translate = un.prototype.Aa;
    un.prototype.getClosestPoint = un.prototype.f;
    un.prototype.transform = un.prototype.e;
    un.prototype.changed = un.prototype.l;
    un.prototype.getRevision = un.prototype.A;
    un.prototype.on = un.prototype.u;
    un.prototype.once = un.prototype.B;
    un.prototype.un = un.prototype.v;
    un.prototype.unByKey = un.prototype.C;
    hl.prototype.getFirstCoordinate = hl.prototype.vb;
    hl.prototype.getLastCoordinate = hl.prototype.wb;
    hl.prototype.getLayout = hl.prototype.xb;
    hl.prototype.applyTransform = hl.prototype.ma;
    hl.prototype.translate = hl.prototype.Aa;
    hl.prototype.getClosestPoint = hl.prototype.f;
    hl.prototype.transform = hl.prototype.e;
    hl.prototype.changed = hl.prototype.l;
    hl.prototype.getRevision = hl.prototype.A;
    hl.prototype.on = hl.prototype.u;
    hl.prototype.once = hl.prototype.B;
    hl.prototype.un = hl.prototype.v;
    hl.prototype.unByKey = hl.prototype.C;
    H.prototype.getExtent = H.prototype.D;
    H.prototype.getFirstCoordinate = H.prototype.vb;
    H.prototype.getLastCoordinate = H.prototype.wb;
    H.prototype.getLayout = H.prototype.xb;
    H.prototype.applyTransform = H.prototype.ma;
    H.prototype.translate = H.prototype.Aa;
    H.prototype.getClosestPoint = H.prototype.f;
    H.prototype.transform = H.prototype.e;
    H.prototype.changed = H.prototype.l;
    H.prototype.getRevision = H.prototype.A;
    H.prototype.on = H.prototype.u;
    H.prototype.once = H.prototype.B;
    H.prototype.un = H.prototype.v;
    H.prototype.unByKey = H.prototype.C;
    Tq.prototype.readFeatures = Tq.prototype.ja;
    X.prototype.readFeatures = X.prototype.ja;
    X.prototype.readFeatures = X.prototype.ja;
    qp.prototype.bindTo = qp.prototype.O;
    qp.prototype.get = qp.prototype.get;
    qp.prototype.getKeys = qp.prototype.I;
    qp.prototype.getProperties = qp.prototype.L;
    qp.prototype.set = qp.prototype.set;
    qp.prototype.setProperties = qp.prototype.G;
    qp.prototype.unbind = qp.prototype.P;
    qp.prototype.unbindAll = qp.prototype.R;
    qp.prototype.changed = qp.prototype.l;
    qp.prototype.getRevision = qp.prototype.A;
    qp.prototype.on = qp.prototype.u;
    qp.prototype.once = qp.prototype.B;
    qp.prototype.un = qp.prototype.v;
    qp.prototype.unByKey = qp.prototype.C;
    $g.prototype.bindTo = $g.prototype.O;
    $g.prototype.get = $g.prototype.get;
    $g.prototype.getKeys = $g.prototype.I;
    $g.prototype.getProperties = $g.prototype.L;
    $g.prototype.set = $g.prototype.set;
    $g.prototype.setProperties = $g.prototype.G;
    $g.prototype.unbind = $g.prototype.P;
    $g.prototype.unbindAll = $g.prototype.R;
    $g.prototype.changed = $g.prototype.l;
    $g.prototype.getRevision = $g.prototype.A;
    $g.prototype.on = $g.prototype.u;
    $g.prototype.once = $g.prototype.B;
    $g.prototype.un = $g.prototype.v;
    $g.prototype.unByKey = $g.prototype.C;
    ah.prototype.getMap = ah.prototype.d;
    ah.prototype.setMap = ah.prototype.setMap;
    ah.prototype.bindTo = ah.prototype.O;
    ah.prototype.get = ah.prototype.get;
    ah.prototype.getKeys = ah.prototype.I;
    ah.prototype.getProperties = ah.prototype.L;
    ah.prototype.set = ah.prototype.set;
    ah.prototype.setProperties = ah.prototype.G;
    ah.prototype.unbind = ah.prototype.P;
    ah.prototype.unbindAll = ah.prototype.R;
    ah.prototype.changed = ah.prototype.l;
    ah.prototype.getRevision = ah.prototype.A;
    ah.prototype.on = ah.prototype.u;
    ah.prototype.once = ah.prototype.B;
    ah.prototype.un = ah.prototype.v;
    ah.prototype.unByKey = ah.prototype.C;
    lh.prototype.getMap = lh.prototype.d;
    lh.prototype.setMap = lh.prototype.setMap;
    lh.prototype.bindTo = lh.prototype.O;
    lh.prototype.get = lh.prototype.get;
    lh.prototype.getKeys = lh.prototype.I;
    lh.prototype.getProperties = lh.prototype.L;
    lh.prototype.set = lh.prototype.set;
    lh.prototype.setProperties = lh.prototype.G;
    lh.prototype.unbind = lh.prototype.P;
    lh.prototype.unbindAll = lh.prototype.R;
    lh.prototype.changed = lh.prototype.l;
    lh.prototype.getRevision = lh.prototype.A;
    lh.prototype.on = lh.prototype.u;
    lh.prototype.once = lh.prototype.B;
    lh.prototype.un = lh.prototype.v;
    lh.prototype.unByKey = lh.prototype.C;
    mh.prototype.getMap = mh.prototype.d;
    mh.prototype.bindTo = mh.prototype.O;
    mh.prototype.get = mh.prototype.get;
    mh.prototype.getKeys = mh.prototype.I;
    mh.prototype.getProperties = mh.prototype.L;
    mh.prototype.set = mh.prototype.set;
    mh.prototype.setProperties = mh.prototype.G;
    mh.prototype.unbind = mh.prototype.P;
    mh.prototype.unbindAll = mh.prototype.R;
    mh.prototype.changed = mh.prototype.l;
    mh.prototype.getRevision = mh.prototype.A;
    mh.prototype.on = mh.prototype.u;
    mh.prototype.once = mh.prototype.B;
    mh.prototype.un = mh.prototype.v;
    mh.prototype.unByKey = mh.prototype.C;
    Qo.prototype.getMap = Qo.prototype.d;
    Qo.prototype.bindTo = Qo.prototype.O;
    Qo.prototype.get = Qo.prototype.get;
    Qo.prototype.getKeys = Qo.prototype.I;
    Qo.prototype.getProperties = Qo.prototype.L;
    Qo.prototype.set = Qo.prototype.set;
    Qo.prototype.setProperties = Qo.prototype.G;
    Qo.prototype.unbind = Qo.prototype.P;
    Qo.prototype.unbindAll = Qo.prototype.R;
    Qo.prototype.changed = Qo.prototype.l;
    Qo.prototype.getRevision = Qo.prototype.A;
    Qo.prototype.on = Qo.prototype.u;
    Qo.prototype.once = Qo.prototype.B;
    Qo.prototype.un = Qo.prototype.v;
    Qo.prototype.unByKey = Qo.prototype.C;
    dh.prototype.getMap = dh.prototype.d;
    dh.prototype.setMap = dh.prototype.setMap;
    dh.prototype.bindTo = dh.prototype.O;
    dh.prototype.get = dh.prototype.get;
    dh.prototype.getKeys = dh.prototype.I;
    dh.prototype.getProperties = dh.prototype.L;
    dh.prototype.set = dh.prototype.set;
    dh.prototype.setProperties = dh.prototype.G;
    dh.prototype.unbind = dh.prototype.P;
    dh.prototype.unbindAll = dh.prototype.R;
    dh.prototype.changed = dh.prototype.l;
    dh.prototype.getRevision = dh.prototype.A;
    dh.prototype.on = dh.prototype.u;
    dh.prototype.once = dh.prototype.B;
    dh.prototype.un = dh.prototype.v;
    dh.prototype.unByKey = dh.prototype.C;
    Wo.prototype.getMap = Wo.prototype.d;
    Wo.prototype.setMap = Wo.prototype.setMap;
    Wo.prototype.bindTo = Wo.prototype.O;
    Wo.prototype.get = Wo.prototype.get;
    Wo.prototype.getKeys = Wo.prototype.I;
    Wo.prototype.getProperties = Wo.prototype.L;
    Wo.prototype.set = Wo.prototype.set;
    Wo.prototype.setProperties = Wo.prototype.G;
    Wo.prototype.unbind = Wo.prototype.P;
    Wo.prototype.unbindAll = Wo.prototype.R;
    Wo.prototype.changed = Wo.prototype.l;
    Wo.prototype.getRevision = Wo.prototype.A;
    Wo.prototype.on = Wo.prototype.u;
    Wo.prototype.once = Wo.prototype.B;
    Wo.prototype.un = Wo.prototype.v;
    Wo.prototype.unByKey = Wo.prototype.C;
    fh.prototype.getMap = fh.prototype.d;
    fh.prototype.setMap = fh.prototype.setMap;
    fh.prototype.bindTo = fh.prototype.O;
    fh.prototype.get = fh.prototype.get;
    fh.prototype.getKeys = fh.prototype.I;
    fh.prototype.getProperties = fh.prototype.L;
    fh.prototype.set = fh.prototype.set;
    fh.prototype.setProperties = fh.prototype.G;
    fh.prototype.unbind = fh.prototype.P;
    fh.prototype.unbindAll = fh.prototype.R;
    fh.prototype.changed = fh.prototype.l;
    fh.prototype.getRevision = fh.prototype.A;
    fh.prototype.on = fh.prototype.u;
    fh.prototype.once = fh.prototype.B;
    fh.prototype.un = fh.prototype.v;
    fh.prototype.unByKey = fh.prototype.C;
    kp.prototype.getMap = kp.prototype.d;
    kp.prototype.bindTo = kp.prototype.O;
    kp.prototype.get = kp.prototype.get;
    kp.prototype.getKeys = kp.prototype.I;
    kp.prototype.getProperties = kp.prototype.L;
    kp.prototype.set = kp.prototype.set;
    kp.prototype.setProperties = kp.prototype.G;
    kp.prototype.unbind = kp.prototype.P;
    kp.prototype.unbindAll = kp.prototype.R;
    kp.prototype.changed = kp.prototype.l;
    kp.prototype.getRevision = kp.prototype.A;
    kp.prototype.on = kp.prototype.u;
    kp.prototype.once = kp.prototype.B;
    kp.prototype.un = kp.prototype.v;
    kp.prototype.unByKey = kp.prototype.C;
    pp.prototype.getMap = pp.prototype.d;
    pp.prototype.setMap = pp.prototype.setMap;
    pp.prototype.bindTo = pp.prototype.O;
    pp.prototype.get = pp.prototype.get;
    pp.prototype.getKeys = pp.prototype.I;
    pp.prototype.getProperties = pp.prototype.L;
    pp.prototype.set = pp.prototype.set;
    pp.prototype.setProperties = pp.prototype.G;
    pp.prototype.unbind = pp.prototype.P;
    pp.prototype.unbindAll = pp.prototype.R;
    pp.prototype.changed = pp.prototype.l;
    pp.prototype.getRevision = pp.prototype.A;
    pp.prototype.on = pp.prototype.u;
    pp.prototype.once = pp.prototype.B;
    pp.prototype.un = pp.prototype.v;
    pp.prototype.unByKey = pp.prototype.C;
    return OPENLAYERS.ol;
}));

