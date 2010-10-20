window.app = {};
require(["lib/common", "lib/util", "lib/jquery.tmpl", "lib/jquery.hotkeys", "lib/jquery-ui-1.8.5.min", "lib/fake", "lib/pixastic", "app/app.init", "app/app.clipboard", "app/app.controls", "app/app.files", "app/app.images", "app/app.clipboard", "app/app.layers", "app/app.loader"]);
define("app", function() {
});
window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  this.console && console.log(Array.prototype.slice.call(arguments))
};
window.log.dump = function() {
  for(var a = window.log.history, c = 0;c < a.length;c++) {
    console.log(Array.prototype.slice.call(a[c]))
  }
};
CanvasRenderingContext2D.prototype.dashedLineTo = function(a, c, d, e, g) {
  var b = function(n, p) {
    return n <= p
  }, f = function(n, p) {
    return n >= p
  }, h = function(n, p) {
    return Math.min(n, p)
  }, k = function(n, p) {
    return Math.max(n, p)
  }, m = {thereYet:f, cap:h};
  f = {thereYet:f, cap:h};
  if(c - e > 0) {
    f.thereYet = b;
    f.cap = k
  }if(a - d > 0) {
    m.thereYet = b;
    m.cap = k
  }this.moveTo(a, c);
  b = a;
  k = c;
  h = 0;
  for(var q = true;!(m.thereYet(b, d) && f.thereYet(k, e));) {
    var o = Math.atan2(e - c, d - a), l = g[h];
    b = m.cap(d, b + Math.cos(o) * l);
    k = f.cap(e, k + Math.sin(o) * l);
    q ? this.lineTo(b, k) : this.moveTo(b, k);
    h = (h + 1) % g.length;
    q = !q
  }
};
define("lib/common", function() {
});
if(!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(a, c) {
    var d = this.length >>> 0;
    c = Number(c) || 0;
    c = Math[c < 0 ? "ceil" : "floor"](c);
    if(c < 0) {
      c += d
    }for(;c < d;c++) {
      if(c in this && this[c] === a) {
        return c
      }
    }return-1
  }
}if(!Array.prototype.forEach) {
  Array.prototype.forEach = function(a, c) {
    for(var d = 0, e = this.length >>> 0;d < e;d++) {
      d in this && a.call(c, this[d], d, this)
    }
  }
}if(!Array.prototype.map) {
  Array.prototype.map = function(a, c) {
    for(var d = [], e = 0, g = this.length >>> 0;e < g;e++) {
      if(e in this) {
        d[e] = a.call(c, this[e], e, this)
      }
    }return d
  }
}if(!Array.prototype.every) {
  Array.prototype.every = function(a, c) {
    for(var d = 0, e = this.length >>> 0;d < e;d++) {
      if(d in this && !a.call(c, this[d], d, this)) {
        return false
      }
    }return true
  }
}if(!Array.prototype.some) {
  Array.prototype.some = function(a, c) {
    for(var d = 0, e = this.length >>> 0;d < e;d++) {
      if(d in this && a.call(c, this[d], d, this)) {
        return true
      }
    }return false
  }
}if(!Array.prototype.filter) {
  Array.prototype.filter = function(a, c) {
    for(var d = [], e, g = 0, b = this.length >>> 0;g < b;g++) {
      if(g in this) {
        e = this[g];
        a.call(c, e, g, this) && d.push(e)
      }
    }return d
  }
}if(!Array.prototype.reduce) {
  Array.prototype.reduce = function(a) {
    var c = this.length >>> 0, d = 0, e;
    if(arguments.length > 1) {
      e = arguments[1]
    }else {
      do {
        if(d in this) {
          e = this[d++];
          break
        }if(++d >= c) {
          throw new TypeError;
        }
      }while(1)
    }for(;d < c;d++) {
      if(d in this) {
        e = a.call(null, e, this[d], d, this)
      }
    }return e
  }
}if(!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
  }
}if(!String.prototype.endsWith) {
  String.prototype.endsWith = function(a) {
    return this.match(a + "$") == a
  }
}define("lib/util", function() {
});
(function(a) {
  function c(x, z, C, A) {
    A = {data:A || (z ? z.data : {}), _wrap:z ? z._wrap : null, tmpl:null, parent:z || null, nodes:[], calls:m, nest:q, wrap:o, html:l, update:n};
    x && a.extend(A, x, {nodes:[], parent:z});
    if(C) {
      A.tmpl = C;
      A._ctnt = A._ctnt || A.tmpl(a, A);
      A.key = ++B;
      (E.length ? v : u)[B] = A
    }return A
  }
  function d(x, z, C) {
    var A;
    C = C ? a.map(C, function(F) {
      return typeof F === "string" ? x.key ? F.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + r + '="' + x.key + '" $2') : F : d(F, x, F._ctnt)
    }) : x;
    if(z) {
      return C
    }C = C.join("");
    C.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(F, G, J, K) {
      A = a(J).get();
      k(A);
      if(G) {
        A = e(G).concat(A)
      }if(K) {
        A = A.concat(e(K))
      }
    });
    return A ? A : e(C)
  }
  function e(x) {
    var z = document.createElement("div");
    z.innerHTML = x;
    return a.makeArray(z.childNodes)
  }
  function g(x) {
    return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + a.trim(x).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(z, C, A, F, G, J, K) {
      z = a.tmpl.tag[A];
      if(!z) {
        throw"Template command not found: " + A;
      }A = z._default || [];
      if(J && !/\w$/.test(G)) {
        G += J;
        J = ""
      }if(G) {
        G = f(G);
        K = K ? "," + f(K) + ")" : J ? ")" : "";
        K = J ? G.indexOf(".") > -1 ? G + J : "(" + G + ").call($item" + K : G;
        J = J ? K : "(typeof(" + G + ")==='function'?(" + G + ").call($item):(" + G + "))"
      }else {
        J = K = A.$1 || "null"
      }F = f(F);
      return"');" + z[C ? "close" : "open"].split("$notnull_1").join(G ? "typeof(" + G + ")!=='undefined' && (" + G + ")!=null" : "true").split("$1a").join(J).split("$1").join(K).split("$2").join(F ? F.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(O, I, N, M) {
        return(M = M ? "," + M + ")" : N ? ")" : "") ? "(" + I + ").call($item" + M : O
      }) : A.$2 || "") + "_.push('"
    }) + "');}return _;")
  }
  function b(x, z) {
    x._wrap = d(x, true, a.isArray(z) ? z : [s.test(z) ? z : a(z).html()]).join("")
  }
  function f(x) {
    return x ? x.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
  }
  function h(x) {
    var z = document.createElement("div");
    z.appendChild(x.cloneNode(true));
    return z.innerHTML
  }
  function k(x) {
    function z(I) {
      function N(P) {
        P += C;
        L = G[P] = G[P] || c(L, u[L.parent.key + C] || L.parent, null, true)
      }
      var M, H = I, L, Q;
      if(Q = I.getAttribute(r)) {
        for(;H.parentNode && (H = H.parentNode).nodeType === 1 && !(M = H.getAttribute(r)););if(M !== Q) {
          H = H.parentNode ? H.nodeType === 11 ? 0 : H.getAttribute(r) || 0 : 0;
          if(!(L = u[Q])) {
            L = v[Q];
            L = c(L, u[H] || v[H], null, true);
            L.key = ++B;
            u[B] = L
          }D && N(Q)
        }I.removeAttribute(r)
      }else {
        if(D && (L = a.data(I, "tmplItem"))) {
          N(L.key);
          u[L.key] = L;
          H = (H = a.data(I.parentNode, "tmplItem")) ? H.key : 0
        }
      }if(L) {
        for(M = L;M && M.key != H;) {
          M.nodes.push(I);
          M = M.parent
        }delete L._ctnt;
        delete L._wrap;
        a.data(I, "tmplItem", L)
      }
    }
    var C = "_" + D, A, F, G = {}, J, K, O;
    J = 0;
    for(K = x.length;J < K;J++) {
      if((A = x[J]).nodeType === 1) {
        F = A.getElementsByTagName("*");
        for(O = F.length - 1;O >= 0;O--) {
          z(F[O])
        }z(A)
      }
    }
  }
  function m(x, z, C, A) {
    if(!x) {
      return E.pop()
    }E.push({_:x, tmpl:z, item:this, data:C, options:A})
  }
  function q(x, z, C) {
    return a.tmpl(a.template(x), z, C, this)
  }
  function o(x, z) {
    var C = x.options || {};
    C.wrapped = z;
    return a.tmpl(a.template(x.tmpl), x.data, C, x.item)
  }
  function l(x, z) {
    var C = this._wrap;
    return a.map(a(a.isArray(C) ? C.join("") : C).filter(x || "*"), function(A) {
      return z ? A.innerText || A.textContent : A.outerHTML || h(A)
    })
  }
  function n() {
    var x = this.nodes;
    a.tmpl(null, null, null, this).insertBefore(x[0]);
    a(x).remove()
  }
  var p = a.fn.domManip, r = "_tmplitem", s = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, u = {}, v = {}, w, y = {key:0, data:{}}, B = 0, D = 0, E = [];
  a.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(x, z) {
    a.fn[x] = function(C) {
      var A = [];
      C = a(C);
      var F, G, J;
      F = this.length === 1 && this[0].parentNode;
      w = u || {};
      if(F && F.nodeType === 11 && F.childNodes.length === 1 && C.length === 1) {
        C[z](this[0]);
        A = this
      }else {
        G = 0;
        for(J = C.length;G < J;G++) {
          D = G;
          F = (G > 0 ? this.clone(true) : this).get();
          a.fn[z].apply(a(C[G]), F);
          A = A.concat(F)
        }D = 0;
        A = this.pushStack(A, x, C.selector)
      }C = w;
      w = null;
      a.tmpl.complete(C);
      return A
    }
  });
  a.fn.extend({tmpl:function(x, z, C) {
    return a.tmpl(this[0], x, z, C)
  }, tmplItem:function() {
    return a.tmplItem(this[0])
  }, template:function(x) {
    return a.template(x, this[0])
  }, domManip:function(x, z, C) {
    if(x[0] && x[0].nodeType) {
      for(var A = a.makeArray(arguments), F = x.length, G = 0, J;G < F && !(J = a.data(x[G++], "tmplItem")););if(F > 1) {
        A[0] = [a.makeArray(x)]
      }if(J && D) {
        A[2] = function(K) {
          a.tmpl.afterManip(this, K, C)
        }
      }p.apply(this, A)
    }else {
      p.apply(this, arguments)
    }D = 0;
    w || a.tmpl.complete(u);
    return this
  }});
  a.extend({tmpl:function(x, z, C, A) {
    var F = !A;
    if(F) {
      A = y;
      x = a.template[x] || a.template(null, x);
      v = {}
    }else {
      if(!x) {
        x = A.tmpl;
        u[A.key] = A;
        A.nodes = [];
        A.wrapped && b(A, A.wrapped);
        return a(d(A, null, A.tmpl(a, A)))
      }
    }if(!x) {
      return[]
    }if(typeof z === "function") {
      z = z.call(A || {})
    }C && C.wrapped && b(C, C.wrapped);
    z = a.isArray(z) ? a.map(z, function(G) {
      return G ? c(C, A, x, G) : null
    }) : [c(C, A, x, z)];
    return F ? a(d(A, null, z)) : z
  }, tmplItem:function(x) {
    var z;
    if(x instanceof a) {
      x = x[0]
    }for(;x && x.nodeType === 1 && !(z = a.data(x, "tmplItem")) && (x = x.parentNode););return z || y
  }, template:function(x, z) {
    if(z) {
      if(typeof z === "string") {
        z = g(z)
      }else {
        if(z instanceof a) {
          z = z[0] || {}
        }
      }if(z.nodeType) {
        z = a.data(z, "tmpl") || a.data(z, "tmpl", g(z.innerHTML))
      }return typeof x === "string" ? (a.template[x] = z) : z
    }return x ? typeof x !== "string" ? a.template(null, x) : a.template[x] || a.template(null, s.test(x) ? x : a(x)) : null
  }, encode:function(x) {
    return("" + x).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
  }});
  a.extend(a.tmpl, {tag:{tmpl:{_default:{$2:"null"}, open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"}, wrap:{_default:{$2:"null"}, open:"$item.calls(_,$1,$2);_=[];", close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"}, each:{_default:{$2:"$index, $value"}, open:"if($notnull_1){$.each($1a,function($2){with(this){", close:"}});}"}, "if":{open:"if(($notnull_1) && $1a){", close:"}"}, "else":{_default:{$1:"true"}, open:"}else if(($notnull_1) && $1a){"}, html:{open:"if($notnull_1){_.push($1a);}"}, 
  "=":{_default:{$1:"$data"}, open:"if($notnull_1){_.push($.encode($1a));}"}, "!":{open:""}}, complete:function() {
    u = {}
  }, afterManip:function(x, z, C) {
    var A = z.nodeType === 11 ? a.makeArray(z.childNodes) : z.nodeType === 1 ? [z] : [];
    C.call(x, z);
    k(A);
    D++
  }})
})(jQuery);
define("lib/jquery.tmpl", function() {
});
(function(a) {
  function c(d) {
    if(typeof d.data === "string") {
      var e = d.handler, g = d.data.toLowerCase().split(" ");
      d.handler = function(b) {
        if(!(this !== b.target && (/textarea|select/i.test(b.target.nodeName) || b.target.type === "text"))) {
          var f = b.type !== "keypress" && a.hotkeys.specialKeys[b.which], h = String.fromCharCode(b.which).toLowerCase(), k = "", m = {};
          if(b.altKey && f !== "alt") {
            k += "alt+"
          }if(b.ctrlKey && f !== "ctrl") {
            k += "ctrl+"
          }if(b.metaKey && !b.ctrlKey && f !== "meta") {
            k += "meta+"
          }if(b.shiftKey && f !== "shift") {
            k += "shift+"
          }if(f) {
            m[k + f] = true
          }else {
            m[k + h] = true;
            m[k + a.hotkeys.shiftNums[h]] = true;
            if(k === "shift+") {
              m[a.hotkeys.shiftNums[h]] = true
            }
          }f = 0;
          for(h = g.length;f < h;f++) {
            if(m[g[f]]) {
              return e.apply(this, arguments)
            }
          }
        }
      }
    }
  }
  a.hotkeys = {version:"0.8", specialKeys:{8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pause", 20:"capslock", 27:"esc", 32:"space", 33:"pageup", 34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 45:"insert", 46:"del", 96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9", 106:"*", 107:"+", 109:"-", 110:".", 111:"/", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 
  122:"f11", 123:"f12", 144:"numlock", 145:"scroll", 191:"/", 224:"meta"}, shiftNums:{"`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":": ", "'":'"', ",":"<", ".":">", "/":"?", "\\":"|"}};
  a.each(["keydown", "keyup", "keypress"], function() {
    a.event.special[this] = {add:c}
  })
})(jQuery);
define("lib/jquery.hotkeys", function() {
});
(function(a, c) {
  function d(e) {
    return!a(e).parents().andSelf().filter(function() {
      return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
    }).length
  }
  a.ui = a.ui || {};
  if(!a.ui.version) {
    a.extend(a.ui, {version:"1.8.5", keyCode:{ALT:18, BACKSPACE:8, CAPS_LOCK:20, COMMA:188, COMMAND:91, COMMAND_LEFT:91, COMMAND_RIGHT:93, CONTROL:17, DELETE:46, DOWN:40, END:35, ENTER:13, ESCAPE:27, HOME:36, INSERT:45, LEFT:37, MENU:93, NUMPAD_ADD:107, NUMPAD_DECIMAL:110, NUMPAD_DIVIDE:111, NUMPAD_ENTER:108, NUMPAD_MULTIPLY:106, NUMPAD_SUBTRACT:109, PAGE_DOWN:34, PAGE_UP:33, PERIOD:190, RIGHT:39, SHIFT:16, SPACE:32, TAB:9, UP:38, WINDOWS:91}});
    a.fn.extend({_focus:a.fn.focus, focus:function(e, g) {
      return typeof e === "number" ? this.each(function() {
        var b = this;
        setTimeout(function() {
          a(b).focus();
          g && g.call(b)
        }, e)
      }) : this._focus.apply(this, arguments)
    }, scrollParent:function() {
      var e;
      e = a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
        return/(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
      }).eq(0) : this.parents().filter(function() {
        return/(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
      }).eq(0);
      return/fixed/.test(this.css("position")) || !e.length ? a(document) : e
    }, zIndex:function(e) {
      if(e !== c) {
        return this.css("zIndex", e)
      }if(this.length) {
        e = a(this[0]);
        for(var g;e.length && e[0] !== document;) {
          g = e.css("position");
          if(g === "absolute" || g === "relative" || g === "fixed") {
            g = parseInt(e.css("zIndex"));
            if(!isNaN(g) && g != 0) {
              return g
            }
          }e = e.parent()
        }
      }return 0
    }, disableSelection:function() {
      return this.bind("mousedown.ui-disableSelection selectstart.ui-disableSelection", function(e) {
        e.preventDefault()
      })
    }, enableSelection:function() {
      return this.unbind(".ui-disableSelection")
    }});
    a.each(["Width", "Height"], function(e, g) {
      function b(m, q, o, l) {
        a.each(f, function() {
          q -= parseFloat(a.curCSS(m, "padding" + this, true)) || 0;
          if(o) {
            q -= parseFloat(a.curCSS(m, "border" + this + "Width", true)) || 0
          }if(l) {
            q -= parseFloat(a.curCSS(m, "margin" + this, true)) || 0
          }
        });
        return q
      }
      var f = g === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], h = g.toLowerCase(), k = {innerWidth:a.fn.innerWidth, innerHeight:a.fn.innerHeight, outerWidth:a.fn.outerWidth, outerHeight:a.fn.outerHeight};
      a.fn["inner" + g] = function(m) {
        if(m === c) {
          return k["inner" + g].call(this)
        }return this.each(function() {
          a.style(this, h, b(this, m) + "px")
        })
      };
      a.fn["outer" + g] = function(m, q) {
        if(typeof m !== "number") {
          return k["outer" + g].call(this, m)
        }return this.each(function() {
          a.style(this, h, b(this, m, true, q) + "px")
        })
      }
    });
    a.extend(a.expr[":"], {data:function(e, g, b) {
      return!!a.data(e, b[3])
    }, focusable:function(e) {
      var g = e.nodeName.toLowerCase(), b = a.attr(e, "tabindex");
      if("area" === g) {
        g = e.parentNode;
        b = g.name;
        if(!e.href || !b || g.nodeName.toLowerCase() !== "map") {
          return false
        }e = a("img[usemap=#" + b + "]")[0];
        return!!e && d(e)
      }return(/input|select|textarea|button|object/.test(g) ? !e.disabled : "a" == g ? e.href || !isNaN(b) : !isNaN(b)) && d(e)
    }, tabbable:function(e) {
      var g = a.attr(e, "tabindex");
      return(isNaN(g) || g >= 0) && a(e).is(":focusable")
    }});
    a(function() {
      var e = document.createElement("div"), g = document.body;
      a.extend(e.style, {minHeight:"100px", height:"auto", padding:0, borderWidth:0});
      a.support.minHeight = g.appendChild(e).offsetHeight === 100;
      g.removeChild(e).style.display = "none"
    });
    a.extend(a.ui, {plugin:{add:function(e, g, b) {
      e = a.ui[e].prototype;
      for(var f in b) {
        e.plugins[f] = e.plugins[f] || [];
        e.plugins[f].push([g, b[f]])
      }
    }, call:function(e, g, b) {
      if((g = e.plugins[g]) && e.element[0].parentNode) {
        for(var f = 0;f < g.length;f++) {
          e.options[g[f][0]] && g[f][1].apply(e.element, b)
        }
      }
    }}, contains:function(e, g) {
      return document.compareDocumentPosition ? e.compareDocumentPosition(g) & 16 : e !== g && e.contains(g)
    }, hasScroll:function(e, g) {
      if(a(e).css("overflow") === "hidden") {
        return false
      }g = g && g === "left" ? "scrollLeft" : "scrollTop";
      var b = false;
      if(e[g] > 0) {
        return true
      }e[g] = 1;
      b = e[g] > 0;
      e[g] = 0;
      return b
    }, isOverAxis:function(e, g, b) {
      return e > g && e < g + b
    }, isOver:function(e, g, b, f, h, k) {
      return a.ui.isOverAxis(e, b, h) && a.ui.isOverAxis(g, f, k)
    }})
  }
})(jQuery);
(function(a, c) {
  if(a.cleanData) {
    var d = a.cleanData;
    a.cleanData = function(g) {
      for(var b = 0, f;(f = g[b]) != null;b++) {
        a(f).triggerHandler("remove")
      }d(g)
    }
  }else {
    var e = a.fn.remove;
    a.fn.remove = function(g, b) {
      return this.each(function() {
        if(!b) {
          if(!g || a.filter(g, [this]).length) {
            a("*", this).add([this]).each(function() {
              a(this).triggerHandler("remove")
            })
          }
        }return e.call(a(this), g, b)
      })
    }
  }a.widget = function(g, b, f) {
    var h = g.split(".")[0], k;
    g = g.split(".")[1];
    k = h + "-" + g;
    if(!f) {
      f = b;
      b = a.Widget
    }a.expr[":"][k] = function(m) {
      return!!a.data(m, g)
    };
    a[h] = a[h] || {};
    a[h][g] = function(m, q) {
      arguments.length && this._createWidget(m, q)
    };
    b = new b;
    b.options = a.extend(true, {}, b.options);
    a[h][g].prototype = a.extend(true, b, {namespace:h, widgetName:g, widgetEventPrefix:a[h][g].prototype.widgetEventPrefix || g, widgetBaseClass:k}, f);
    a.widget.bridge(g, a[h][g])
  };
  a.widget.bridge = function(g, b) {
    a.fn[g] = function(f) {
      var h = typeof f === "string", k = Array.prototype.slice.call(arguments, 1), m = this;
      f = !h && k.length ? a.extend.apply(null, [true, f].concat(k)) : f;
      if(h && f.substring(0, 1) === "_") {
        return m
      }h ? this.each(function() {
        var q = a.data(this, g);
        if(!q) {
          throw"cannot call methods on " + g + " prior to initialization; attempted to call method '" + f + "'";
        }if(!a.isFunction(q[f])) {
          throw"no such method '" + f + "' for " + g + " widget instance";
        }var o = q[f].apply(q, k);
        if(o !== q && o !== c) {
          m = o;
          return false
        }
      }) : this.each(function() {
        var q = a.data(this, g);
        q ? q.option(f || {})._init() : a.data(this, g, new b(f, this))
      });
      return m
    }
  };
  a.Widget = function(g, b) {
    arguments.length && this._createWidget(g, b)
  };
  a.Widget.prototype = {widgetName:"widget", widgetEventPrefix:"", options:{disabled:false}, _createWidget:function(g, b) {
    a.data(b, this.widgetName, this);
    this.element = a(b);
    this.options = a.extend(true, {}, this.options, a.metadata && a.metadata.get(b)[this.widgetName], g);
    var f = this;
    this.element.bind("remove." + this.widgetName, function() {
      f.destroy()
    });
    this._create();
    this._init()
  }, _create:function() {
  }, _init:function() {
  }, destroy:function() {
    this.element.unbind("." + this.widgetName).removeData(this.widgetName);
    this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
  }, widget:function() {
    return this.element
  }, option:function(g, b) {
    var f = g, h = this;
    if(arguments.length === 0) {
      return a.extend({}, h.options)
    }if(typeof g === "string") {
      if(b === c) {
        return this.options[g]
      }f = {};
      f[g] = b
    }a.each(f, function(k, m) {
      h._setOption(k, m)
    });
    return h
  }, _setOption:function(g, b) {
    this.options[g] = b;
    if(g === "disabled") {
      this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", b)
    }return this
  }, enable:function() {
    return this._setOption("disabled", false)
  }, disable:function() {
    return this._setOption("disabled", true)
  }, _trigger:function(g, b, f) {
    var h = this.options[g];
    b = a.Event(b);
    b.type = (g === this.widgetEventPrefix ? g : this.widgetEventPrefix + g).toLowerCase();
    f = f || {};
    if(b.originalEvent) {
      g = a.event.props.length;
      for(var k;g;) {
        k = a.event.props[--g];
        b[k] = b.originalEvent[k]
      }
    }this.element.trigger(b, f);
    return!(a.isFunction(h) && h.call(this.element[0], b, f) === false || b.isDefaultPrevented())
  }}
})(jQuery);
(function(a) {
  a.widget("ui.mouse", {options:{cancel:":input,option", distance:1, delay:0}, _mouseInit:function() {
    var c = this;
    this.element.bind("mousedown." + this.widgetName, function(d) {
      return c._mouseDown(d)
    }).bind("click." + this.widgetName, function(d) {
      if(c._preventClickEvent) {
        c._preventClickEvent = false;
        d.stopImmediatePropagation();
        return false
      }
    });
    this.started = false
  }, _mouseDestroy:function() {
    this.element.unbind("." + this.widgetName)
  }, _mouseDown:function(c) {
    c.originalEvent = c.originalEvent || {};
    if(!c.originalEvent.mouseHandled) {
      this._mouseStarted && this._mouseUp(c);
      this._mouseDownEvent = c;
      var d = this, e = c.which == 1, g = typeof this.options.cancel == "string" ? a(c.target).parents().add(c.target).filter(this.options.cancel).length : false;
      if(!e || g || !this._mouseCapture(c)) {
        return true
      }this.mouseDelayMet = !this.options.delay;
      if(!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function() {
          d.mouseDelayMet = true
        }, this.options.delay)
      }if(this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
        this._mouseStarted = this._mouseStart(c) !== false;
        if(!this._mouseStarted) {
          c.preventDefault();
          return true
        }
      }this._mouseMoveDelegate = function(b) {
        return d._mouseMove(b)
      };
      this._mouseUpDelegate = function(b) {
        return d._mouseUp(b)
      };
      a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
      a.browser.safari || c.preventDefault();
      return c.originalEvent.mouseHandled = true
    }
  }, _mouseMove:function(c) {
    if(a.browser.msie && !c.button) {
      return this._mouseUp(c)
    }if(this._mouseStarted) {
      this._mouseDrag(c);
      return c.preventDefault()
    }if(this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
      (this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c)
    }return!this._mouseStarted
  }, _mouseUp:function(c) {
    a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
    if(this._mouseStarted) {
      this._mouseStarted = false;
      this._preventClickEvent = c.target == this._mouseDownEvent.target;
      this._mouseStop(c)
    }return false
  }, _mouseDistanceMet:function(c) {
    return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
  }, _mouseDelayMet:function() {
    return this.mouseDelayMet
  }, _mouseStart:function() {
  }, _mouseDrag:function() {
  }, _mouseStop:function() {
  }, _mouseCapture:function() {
    return true
  }})
})(jQuery);
(function(a) {
  a.widget("ui.draggable", a.ui.mouse, {widgetEventPrefix:"drag", options:{addClasses:true, appendTo:"parent", axis:false, connectToSortable:false, containment:false, cursor:"auto", cursorAt:false, grid:false, handle:false, helper:"original", iframeFix:false, opacity:false, refreshPositions:false, revert:false, revertDuration:500, scope:"default", scroll:true, scrollSensitivity:20, scrollSpeed:20, snap:false, snapMode:"both", snapTolerance:20, stack:false, zIndex:false}, _create:function() {
    if(this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) {
      this.element[0].style.position = "relative"
    }this.options.addClasses && this.element.addClass("ui-draggable");
    this.options.disabled && this.element.addClass("ui-draggable-disabled");
    this._mouseInit()
  }, destroy:function() {
    if(this.element.data("draggable")) {
      this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
      this._mouseDestroy();
      return this
    }
  }, _mouseCapture:function(c) {
    var d = this.options;
    if(this.helper || d.disabled || a(c.target).is(".ui-resizable-handle")) {
      return false
    }this.handle = this._getHandle(c);
    if(!this.handle) {
      return false
    }return true
  }, _mouseStart:function(c) {
    var d = this.options;
    this.helper = this._createHelper(c);
    this._cacheHelperProportions();
    if(a.ui.ddmanager) {
      a.ui.ddmanager.current = this
    }this._cacheMargins();
    this.cssPosition = this.helper.css("position");
    this.scrollParent = this.helper.scrollParent();
    this.offset = this.positionAbs = this.element.offset();
    this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left};
    a.extend(this.offset, {click:{left:c.pageX - this.offset.left, top:c.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()});
    this.originalPosition = this.position = this._generatePosition(c);
    this.originalPageX = c.pageX;
    this.originalPageY = c.pageY;
    d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt);
    d.containment && this._setContainment();
    if(this._trigger("start", c) === false) {
      this._clear();
      return false
    }this._cacheHelperProportions();
    a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c);
    this.helper.addClass("ui-draggable-dragging");
    this._mouseDrag(c, true);
    return true
  }, _mouseDrag:function(c, d) {
    this.position = this._generatePosition(c);
    this.positionAbs = this._convertPositionTo("absolute");
    if(!d) {
      d = this._uiHash();
      if(this._trigger("drag", c, d) === false) {
        this._mouseUp({});
        return false
      }this.position = d.position
    }if(!this.options.axis || this.options.axis != "y") {
      this.helper[0].style.left = this.position.left + "px"
    }if(!this.options.axis || this.options.axis != "x") {
      this.helper[0].style.top = this.position.top + "px"
    }a.ui.ddmanager && a.ui.ddmanager.drag(this, c);
    return false
  }, _mouseStop:function(c) {
    var d = false;
    if(a.ui.ddmanager && !this.options.dropBehaviour) {
      d = a.ui.ddmanager.drop(this, c)
    }if(this.dropped) {
      d = this.dropped;
      this.dropped = false
    }if(!this.element[0] || !this.element[0].parentNode) {
      return false
    }if(this.options.revert == "invalid" && !d || this.options.revert == "valid" && d || this.options.revert === true || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d)) {
      var e = this;
      a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
        e._trigger("stop", c) !== false && e._clear()
      })
    }else {
      this._trigger("stop", c) !== false && this._clear()
    }return false
  }, cancel:function() {
    this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
    return this
  }, _getHandle:function(c) {
    var d = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
    a(this.options.handle, this.element).find("*").andSelf().each(function() {
      if(this == c.target) {
        d = true
      }
    });
    return d
  }, _createHelper:function(c) {
    var d = this.options;
    c = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : d.helper == "clone" ? this.element.clone() : this.element;
    c.parents("body").length || c.appendTo(d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo);
    c[0] != this.element[0] && !/(fixed|absolute)/.test(c.css("position")) && c.css("position", "absolute");
    return c
  }, _adjustOffsetFromHelper:function(c) {
    if(typeof c == "string") {
      c = c.split(" ")
    }if(a.isArray(c)) {
      c = {left:+c[0], top:+c[1] || 0}
    }if("left" in c) {
      this.offset.click.left = c.left + this.margins.left
    }if("right" in c) {
      this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
    }if("top" in c) {
      this.offset.click.top = c.top + this.margins.top
    }if("bottom" in c) {
      this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
    }
  }, _getParentOffset:function() {
    this.offsetParent = this.helper.offsetParent();
    var c = this.offsetParent.offset();
    if(this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
      c.left += this.scrollParent.scrollLeft();
      c.top += this.scrollParent.scrollTop()
    }if(this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) {
      c = {top:0, left:0}
    }return{top:c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
  }, _getRelativeOffset:function() {
    if(this.cssPosition == "relative") {
      var c = this.element.position();
      return{top:c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
    }else {
      return{top:0, left:0}
    }
  }, _cacheMargins:function() {
    this.margins = {left:parseInt(this.element.css("marginLeft"), 10) || 0, top:parseInt(this.element.css("marginTop"), 10) || 0}
  }, _cacheHelperProportions:function() {
    this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()}
  }, _setContainment:function() {
    var c = this.options;
    if(c.containment == "parent") {
      c.containment = this.helper[0].parentNode
    }if(c.containment == "document" || c.containment == "window") {
      this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(c.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(c.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
    }if(!/^(document|window|parent)$/.test(c.containment) && c.containment.constructor != Array) {
      var d = a(c.containment)[0];
      if(d) {
        c = a(c.containment).offset();
        var e = a(d).css("overflow") != "hidden";
        this.containment = [c.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (e ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + 
        (e ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
      }
    }else {
      if(c.containment.constructor == Array) {
        this.containment = c.containment
      }
    }
  }, _convertPositionTo:function(c, d) {
    if(!d) {
      d = this.position
    }c = c == "absolute" ? 1 : -1;
    var e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(e[0].tagName);
    return{top:d.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : e.scrollTop()) * c), left:d.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : e.scrollLeft()) * 
    c)}
  }, _generatePosition:function(c) {
    var d = this.options, e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(e[0].tagName), b = c.pageX, f = c.pageY;
    if(this.originalPosition) {
      if(this.containment) {
        if(c.pageX - this.offset.click.left < this.containment[0]) {
          b = this.containment[0] + this.offset.click.left
        }if(c.pageY - this.offset.click.top < this.containment[1]) {
          f = this.containment[1] + this.offset.click.top
        }if(c.pageX - this.offset.click.left > this.containment[2]) {
          b = this.containment[2] + this.offset.click.left
        }if(c.pageY - this.offset.click.top > this.containment[3]) {
          f = this.containment[3] + this.offset.click.top
        }
      }if(d.grid) {
        f = this.originalPageY + Math.round((f - this.originalPageY) / d.grid[1]) * d.grid[1];
        f = this.containment ? !(f - this.offset.click.top < this.containment[1] || f - this.offset.click.top > this.containment[3]) ? f : !(f - this.offset.click.top < this.containment[1]) ? f - d.grid[1] : f + d.grid[1] : f;
        b = this.originalPageX + Math.round((b - this.originalPageX) / d.grid[0]) * d.grid[0];
        b = this.containment ? !(b - this.offset.click.left < this.containment[0] || b - this.offset.click.left > this.containment[2]) ? b : !(b - this.offset.click.left < this.containment[0]) ? b - d.grid[0] : b + d.grid[0] : b
      }
    }return{top:f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : e.scrollTop()), left:b - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 
    0 : e.scrollLeft())}
  }, _clear:function() {
    this.helper.removeClass("ui-draggable-dragging");
    this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
    this.helper = null;
    this.cancelHelperRemoval = false
  }, _trigger:function(c, d, e) {
    e = e || this._uiHash();
    a.ui.plugin.call(this, c, [d, e]);
    if(c == "drag") {
      this.positionAbs = this._convertPositionTo("absolute")
    }return a.Widget.prototype._trigger.call(this, c, d, e)
  }, plugins:{}, _uiHash:function() {
    return{helper:this.helper, position:this.position, originalPosition:this.originalPosition, offset:this.positionAbs}
  }});
  a.extend(a.ui.draggable, {version:"1.8.5"});
  a.ui.plugin.add("draggable", "connectToSortable", {start:function(c, d) {
    var e = a(this).data("draggable"), g = e.options, b = a.extend({}, d, {item:e.element});
    e.sortables = [];
    a(g.connectToSortable).each(function() {
      var f = a.data(this, "sortable");
      if(f && !f.options.disabled) {
        e.sortables.push({instance:f, shouldRevert:f.options.revert});
        f._refreshItems();
        f._trigger("activate", c, b)
      }
    })
  }, stop:function(c, d) {
    var e = a(this).data("draggable"), g = a.extend({}, d, {item:e.element});
    a.each(e.sortables, function() {
      if(this.instance.isOver) {
        this.instance.isOver = 0;
        e.cancelHelperRemoval = true;
        this.instance.cancelHelperRemoval = false;
        if(this.shouldRevert) {
          this.instance.options.revert = true
        }this.instance._mouseStop(c);
        this.instance.options.helper = this.instance.options._helper;
        e.options.helper == "original" && this.instance.currentItem.css({top:"auto", left:"auto"})
      }else {
        this.instance.cancelHelperRemoval = false;
        this.instance._trigger("deactivate", c, g)
      }
    })
  }, drag:function(c, d) {
    var e = a(this).data("draggable"), g = this;
    a.each(e.sortables, function() {
      this.instance.positionAbs = e.positionAbs;
      this.instance.helperProportions = e.helperProportions;
      this.instance.offset.click = e.offset.click;
      if(this.instance._intersectsWith(this.instance.containerCache)) {
        if(!this.instance.isOver) {
          this.instance.isOver = 1;
          this.instance.currentItem = a(g).clone().appendTo(this.instance.element).data("sortable-item", true);
          this.instance.options._helper = this.instance.options.helper;
          this.instance.options.helper = function() {
            return d.helper[0]
          };
          c.target = this.instance.currentItem[0];
          this.instance._mouseCapture(c, true);
          this.instance._mouseStart(c, true, true);
          this.instance.offset.click.top = e.offset.click.top;
          this.instance.offset.click.left = e.offset.click.left;
          this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
          this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
          e._trigger("toSortable", c);
          e.dropped = this.instance.element;
          e.currentItem = e.element;
          this.instance.fromOutside = e
        }this.instance.currentItem && this.instance._mouseDrag(c)
      }else {
        if(this.instance.isOver) {
          this.instance.isOver = 0;
          this.instance.cancelHelperRemoval = true;
          this.instance.options.revert = false;
          this.instance._trigger("out", c, this.instance._uiHash(this.instance));
          this.instance._mouseStop(c, true);
          this.instance.options.helper = this.instance.options._helper;
          this.instance.currentItem.remove();
          this.instance.placeholder && this.instance.placeholder.remove();
          e._trigger("fromSortable", c);
          e.dropped = false
        }
      }
    })
  }});
  a.ui.plugin.add("draggable", "cursor", {start:function() {
    var c = a("body"), d = a(this).data("draggable").options;
    if(c.css("cursor")) {
      d._cursor = c.css("cursor")
    }c.css("cursor", d.cursor)
  }, stop:function() {
    var c = a(this).data("draggable").options;
    c._cursor && a("body").css("cursor", c._cursor)
  }});
  a.ui.plugin.add("draggable", "iframeFix", {start:function() {
    var c = a(this).data("draggable").options;
    a(c.iframeFix === true ? "iframe" : c.iframeFix).each(function() {
      a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth + "px", height:this.offsetHeight + "px", position:"absolute", opacity:"0.001", zIndex:1E3}).css(a(this).offset()).appendTo("body")
    })
  }, stop:function() {
    a("div.ui-draggable-iframeFix").each(function() {
      this.parentNode.removeChild(this)
    })
  }});
  a.ui.plugin.add("draggable", "opacity", {start:function(c, d) {
    c = a(d.helper);
    d = a(this).data("draggable").options;
    if(c.css("opacity")) {
      d._opacity = c.css("opacity")
    }c.css("opacity", d.opacity)
  }, stop:function(c, d) {
    c = a(this).data("draggable").options;
    c._opacity && a(d.helper).css("opacity", c._opacity)
  }});
  a.ui.plugin.add("draggable", "scroll", {start:function() {
    var c = a(this).data("draggable");
    if(c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
      c.overflowOffset = c.scrollParent.offset()
    }
  }, drag:function(c) {
    var d = a(this).data("draggable"), e = d.options, g = false;
    if(d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
      if(!e.axis || e.axis != "x") {
        if(d.overflowOffset.top + d.scrollParent[0].offsetHeight - c.pageY < e.scrollSensitivity) {
          d.scrollParent[0].scrollTop = g = d.scrollParent[0].scrollTop + e.scrollSpeed
        }else {
          if(c.pageY - d.overflowOffset.top < e.scrollSensitivity) {
            d.scrollParent[0].scrollTop = g = d.scrollParent[0].scrollTop - e.scrollSpeed
          }
        }
      }if(!e.axis || e.axis != "y") {
        if(d.overflowOffset.left + d.scrollParent[0].offsetWidth - c.pageX < e.scrollSensitivity) {
          d.scrollParent[0].scrollLeft = g = d.scrollParent[0].scrollLeft + e.scrollSpeed
        }else {
          if(c.pageX - d.overflowOffset.left < e.scrollSensitivity) {
            d.scrollParent[0].scrollLeft = g = d.scrollParent[0].scrollLeft - e.scrollSpeed
          }
        }
      }
    }else {
      if(!e.axis || e.axis != "x") {
        if(c.pageY - a(document).scrollTop() < e.scrollSensitivity) {
          g = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed)
        }else {
          if(a(window).height() - (c.pageY - a(document).scrollTop()) < e.scrollSensitivity) {
            g = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed)
          }
        }
      }if(!e.axis || e.axis != "y") {
        if(c.pageX - a(document).scrollLeft() < e.scrollSensitivity) {
          g = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed)
        }else {
          if(a(window).width() - (c.pageX - a(document).scrollLeft()) < e.scrollSensitivity) {
            g = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed)
          }
        }
      }
    }g !== false && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, c)
  }});
  a.ui.plugin.add("draggable", "snap", {start:function() {
    var c = a(this).data("draggable"), d = c.options;
    c.snapElements = [];
    a(d.snap.constructor != String ? d.snap.items || ":data(draggable)" : d.snap).each(function() {
      var e = a(this), g = e.offset();
      this != c.element[0] && c.snapElements.push({item:this, width:e.outerWidth(), height:e.outerHeight(), top:g.top, left:g.left})
    })
  }, drag:function(c, d) {
    for(var e = a(this).data("draggable"), g = e.options, b = g.snapTolerance, f = d.offset.left, h = f + e.helperProportions.width, k = d.offset.top, m = k + e.helperProportions.height, q = e.snapElements.length - 1;q >= 0;q--) {
      var o = e.snapElements[q].left, l = o + e.snapElements[q].width, n = e.snapElements[q].top, p = n + e.snapElements[q].height;
      if(o - b < f && f < l + b && n - b < k && k < p + b || o - b < f && f < l + b && n - b < m && m < p + b || o - b < h && h < l + b && n - b < k && k < p + b || o - b < h && h < l + b && n - b < m && m < p + b) {
        if(g.snapMode != "inner") {
          var r = Math.abs(n - m) <= b, s = Math.abs(p - k) <= b, u = Math.abs(o - h) <= b, v = Math.abs(l - f) <= b;
          if(r) {
            d.position.top = e._convertPositionTo("relative", {top:n - e.helperProportions.height, left:0}).top - e.margins.top
          }if(s) {
            d.position.top = e._convertPositionTo("relative", {top:p, left:0}).top - e.margins.top
          }if(u) {
            d.position.left = e._convertPositionTo("relative", {top:0, left:o - e.helperProportions.width}).left - e.margins.left
          }if(v) {
            d.position.left = e._convertPositionTo("relative", {top:0, left:l}).left - e.margins.left
          }
        }var w = r || s || u || v;
        if(g.snapMode != "outer") {
          r = Math.abs(n - k) <= b;
          s = Math.abs(p - m) <= b;
          u = Math.abs(o - f) <= b;
          v = Math.abs(l - h) <= b;
          if(r) {
            d.position.top = e._convertPositionTo("relative", {top:n, left:0}).top - e.margins.top
          }if(s) {
            d.position.top = e._convertPositionTo("relative", {top:p - e.helperProportions.height, left:0}).top - e.margins.top
          }if(u) {
            d.position.left = e._convertPositionTo("relative", {top:0, left:o}).left - e.margins.left
          }if(v) {
            d.position.left = e._convertPositionTo("relative", {top:0, left:l - e.helperProportions.width}).left - e.margins.left
          }
        }if(!e.snapElements[q].snapping && (r || s || u || v || w)) {
          e.options.snap.snap && e.options.snap.snap.call(e.element, c, a.extend(e._uiHash(), {snapItem:e.snapElements[q].item}))
        }e.snapElements[q].snapping = r || s || u || v || w
      }else {
        e.snapElements[q].snapping && e.options.snap.release && e.options.snap.release.call(e.element, c, a.extend(e._uiHash(), {snapItem:e.snapElements[q].item}));
        e.snapElements[q].snapping = false
      }
    }
  }});
  a.ui.plugin.add("draggable", "stack", {start:function() {
    var c = a(this).data("draggable").options;
    c = a.makeArray(a(c.stack)).sort(function(e, g) {
      return(parseInt(a(e).css("zIndex"), 10) || 0) - (parseInt(a(g).css("zIndex"), 10) || 0)
    });
    if(c.length) {
      var d = parseInt(c[0].style.zIndex) || 0;
      a(c).each(function(e) {
        this.style.zIndex = d + e
      });
      this[0].style.zIndex = d + c.length
    }
  }});
  a.ui.plugin.add("draggable", "zIndex", {start:function(c, d) {
    c = a(d.helper);
    d = a(this).data("draggable").options;
    if(c.css("zIndex")) {
      d._zIndex = c.css("zIndex")
    }c.css("zIndex", d.zIndex)
  }, stop:function(c, d) {
    c = a(this).data("draggable").options;
    c._zIndex && a(d.helper).css("zIndex", c._zIndex)
  }})
})(jQuery);
(function(a) {
  a.widget("ui.droppable", {widgetEventPrefix:"drop", options:{accept:"*", activeClass:false, addClasses:true, greedy:false, hoverClass:false, scope:"default", tolerance:"intersect"}, _create:function() {
    var c = this.options, d = c.accept;
    this.isover = 0;
    this.isout = 1;
    this.accept = a.isFunction(d) ? d : function(e) {
      return e.is(d)
    };
    this.proportions = {width:this.element[0].offsetWidth, height:this.element[0].offsetHeight};
    a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope] || [];
    a.ui.ddmanager.droppables[c.scope].push(this);
    c.addClasses && this.element.addClass("ui-droppable")
  }, destroy:function() {
    for(var c = a.ui.ddmanager.droppables[this.options.scope], d = 0;d < c.length;d++) {
      c[d] == this && c.splice(d, 1)
    }this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
    return this
  }, _setOption:function(c, d) {
    if(c == "accept") {
      this.accept = a.isFunction(d) ? d : function(e) {
        return e.is(d)
      }
    }a.Widget.prototype._setOption.apply(this, arguments)
  }, _activate:function(c) {
    var d = a.ui.ddmanager.current;
    this.options.activeClass && this.element.addClass(this.options.activeClass);
    d && this._trigger("activate", c, this.ui(d))
  }, _deactivate:function(c) {
    var d = a.ui.ddmanager.current;
    this.options.activeClass && this.element.removeClass(this.options.activeClass);
    d && this._trigger("deactivate", c, this.ui(d))
  }, _over:function(c) {
    var d = a.ui.ddmanager.current;
    if(!(!d || (d.currentItem || d.element)[0] == this.element[0])) {
      if(this.accept.call(this.element[0], d.currentItem || d.element)) {
        this.options.hoverClass && this.element.addClass(this.options.hoverClass);
        this._trigger("over", c, this.ui(d))
      }
    }
  }, _out:function(c) {
    var d = a.ui.ddmanager.current;
    if(!(!d || (d.currentItem || d.element)[0] == this.element[0])) {
      if(this.accept.call(this.element[0], d.currentItem || d.element)) {
        this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
        this._trigger("out", c, this.ui(d))
      }
    }
  }, _drop:function(c, d) {
    var e = d || a.ui.ddmanager.current;
    if(!e || (e.currentItem || e.element)[0] == this.element[0]) {
      return false
    }var g = false;
    this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
      var b = a.data(this, "droppable");
      if(b.options.greedy && !b.options.disabled && b.options.scope == e.options.scope && b.accept.call(b.element[0], e.currentItem || e.element) && a.ui.intersect(e, a.extend(b, {offset:b.element.offset()}), b.options.tolerance)) {
        g = true;
        return false
      }
    });
    if(g) {
      return false
    }if(this.accept.call(this.element[0], e.currentItem || e.element)) {
      this.options.activeClass && this.element.removeClass(this.options.activeClass);
      this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
      this._trigger("drop", c, this.ui(e));
      return this.element
    }return false
  }, ui:function(c) {
    return{draggable:c.currentItem || c.element, helper:c.helper, position:c.position, offset:c.positionAbs}
  }});
  a.extend(a.ui.droppable, {version:"1.8.5"});
  a.ui.intersect = function(c, d, e) {
    if(!d.offset) {
      return false
    }var g = (c.positionAbs || c.position.absolute).left, b = g + c.helperProportions.width, f = (c.positionAbs || c.position.absolute).top, h = f + c.helperProportions.height, k = d.offset.left, m = k + d.proportions.width, q = d.offset.top, o = q + d.proportions.height;
    switch(e) {
      case "fit":
        return k <= g && b <= m && q <= f && h <= o;
      case "intersect":
        return k < g + c.helperProportions.width / 2 && b - c.helperProportions.width / 2 < m && q < f + c.helperProportions.height / 2 && h - c.helperProportions.height / 2 < o;
      case "pointer":
        return a.ui.isOver((c.positionAbs || c.position.absolute).top + (c.clickOffset || c.offset.click).top, (c.positionAbs || c.position.absolute).left + (c.clickOffset || c.offset.click).left, q, k, d.proportions.height, d.proportions.width);
      case "touch":
        return(f >= q && f <= o || h >= q && h <= o || f < q && h > o) && (g >= k && g <= m || b >= k && b <= m || g < k && b > m);
      default:
        return false
    }
  };
  a.ui.ddmanager = {current:null, droppables:{"default":[]}, prepareOffsets:function(c, d) {
    var e = a.ui.ddmanager.droppables[c.options.scope] || [], g = d ? d.type : null, b = (c.currentItem || c.element).find(":data(droppable)").andSelf(), f = 0;
    a:for(;f < e.length;f++) {
      if(!(e[f].options.disabled || c && !e[f].accept.call(e[f].element[0], c.currentItem || c.element))) {
        for(var h = 0;h < b.length;h++) {
          if(b[h] == e[f].element[0]) {
            e[f].proportions.height = 0;
            continue a
          }
        }e[f].visible = e[f].element.css("display") != "none";
        if(e[f].visible) {
          e[f].offset = e[f].element.offset();
          e[f].proportions = {width:e[f].element[0].offsetWidth, height:e[f].element[0].offsetHeight};
          g == "mousedown" && e[f]._activate.call(e[f], d)
        }
      }
    }
  }, drop:function(c, d) {
    var e = false;
    a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function() {
      if(this.options) {
        if(!this.options.disabled && this.visible && a.ui.intersect(c, this, this.options.tolerance)) {
          e = e || this._drop.call(this, d)
        }if(!this.options.disabled && this.visible && this.accept.call(this.element[0], c.currentItem || c.element)) {
          this.isout = 1;
          this.isover = 0;
          this._deactivate.call(this, d)
        }
      }
    });
    return e
  }, drag:function(c, d) {
    c.options.refreshPositions && a.ui.ddmanager.prepareOffsets(c, d);
    a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function() {
      if(!(this.options.disabled || this.greedyChild || !this.visible)) {
        var e = a.ui.intersect(c, this, this.options.tolerance);
        if(e = !e && this.isover == 1 ? "isout" : e && this.isover == 0 ? "isover" : null) {
          var g;
          if(this.options.greedy) {
            var b = this.element.parents(":data(droppable):eq(0)");
            if(b.length) {
              g = a.data(b[0], "droppable");
              g.greedyChild = e == "isover" ? 1 : 0
            }
          }if(g && e == "isover") {
            g.isover = 0;
            g.isout = 1;
            g._out.call(g, d)
          }this[e] = 1;
          this[e == "isout" ? "isover" : "isout"] = 0;
          this[e == "isover" ? "_over" : "_out"].call(this, d);
          if(g && e == "isout") {
            g.isout = 0;
            g.isover = 1;
            g._over.call(g, d)
          }
        }
      }
    })
  }}
})(jQuery);
(function(a) {
  a.widget("ui.resizable", a.ui.mouse, {widgetEventPrefix:"resize", options:{alsoResize:false, animate:false, animateDuration:"slow", animateEasing:"swing", aspectRatio:false, autoHide:false, containment:false, ghost:false, grid:false, handles:"e,s,se", helper:false, maxHeight:null, maxWidth:null, minHeight:10, minWidth:10, zIndex:1E3}, _create:function() {
    var e = this, g = this.options;
    this.element.addClass("ui-resizable");
    a.extend(this, {_aspectRatio:!!g.aspectRatio, aspectRatio:g.aspectRatio, originalElement:this.element, _proportionallyResizeElements:[], _helper:g.helper || g.ghost || g.animate ? g.helper || "ui-resizable-helper" : null});
    if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
      /relative/.test(this.element.css("position")) && a.browser.opera && this.element.css({position:"relative", top:"auto", left:"auto"});
      this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"), width:this.element.outerWidth(), height:this.element.outerHeight(), top:this.element.css("top"), left:this.element.css("left")}));
      this.element = this.element.parent().data("resizable", this.element.data("resizable"));
      this.elementIsWrapper = true;
      this.element.css({marginLeft:this.originalElement.css("marginLeft"), marginTop:this.originalElement.css("marginTop"), marginRight:this.originalElement.css("marginRight"), marginBottom:this.originalElement.css("marginBottom")});
      this.originalElement.css({marginLeft:0, marginTop:0, marginRight:0, marginBottom:0});
      this.originalResizeStyle = this.originalElement.css("resize");
      this.originalElement.css("resize", "none");
      this._proportionallyResizeElements.push(this.originalElement.css({position:"static", zoom:1, display:"block"}));
      this.originalElement.css({margin:this.originalElement.css("margin")});
      this._proportionallyResize()
    }this.handles = g.handles || (!a(".ui-resizable-handle", this.element).length ? "e,s,se" : {n:".ui-resizable-n", e:".ui-resizable-e", s:".ui-resizable-s", w:".ui-resizable-w", se:".ui-resizable-se", sw:".ui-resizable-sw", ne:".ui-resizable-ne", nw:".ui-resizable-nw"});
    if(this.handles.constructor == String) {
      if(this.handles == "all") {
        this.handles = "n,e,s,w,se,sw,ne,nw"
      }var b = this.handles.split(",");
      this.handles = {};
      for(var f = 0;f < b.length;f++) {
        var h = a.trim(b[f]), k = a('<div class="ui-resizable-handle ' + ("ui-resizable-" + h) + '"></div>');
        /sw|se|ne|nw/.test(h) && k.css({zIndex:++g.zIndex});
        "se" == h && k.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
        this.handles[h] = ".ui-resizable-" + h;
        this.element.append(k)
      }
    }this._renderAxis = function(m) {
      m = m || this.element;
      for(var q in this.handles) {
        if(this.handles[q].constructor == String) {
          this.handles[q] = a(this.handles[q], this.element).show()
        }if(this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
          var o = a(this.handles[q], this.element), l = 0;
          l = /sw|ne|nw|se|n|s/.test(q) ? o.outerHeight() : o.outerWidth();
          o = ["padding", /ne|nw|n/.test(q) ? "Top" : /se|sw|s/.test(q) ? "Bottom" : /^e$/.test(q) ? "Right" : "Left"].join("");
          m.css(o, l);
          this._proportionallyResize()
        }a(this.handles[q])
      }
    };
    this._renderAxis(this.element);
    this._handles = a(".ui-resizable-handle", this.element).disableSelection();
    this._handles.mouseover(function() {
      if(!e.resizing) {
        if(this.className) {
          var m = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
        }e.axis = m && m[1] ? m[1] : "se"
      }
    });
    if(g.autoHide) {
      this._handles.hide();
      a(this.element).addClass("ui-resizable-autohide").hover(function() {
        a(this).removeClass("ui-resizable-autohide");
        e._handles.show()
      }, function() {
        if(!e.resizing) {
          a(this).addClass("ui-resizable-autohide");
          e._handles.hide()
        }
      })
    }this._mouseInit()
  }, destroy:function() {
    this._mouseDestroy();
    var e = function(b) {
      a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
    };
    if(this.elementIsWrapper) {
      e(this.element);
      var g = this.element;
      g.after(this.originalElement.css({position:g.css("position"), width:g.outerWidth(), height:g.outerHeight(), top:g.css("top"), left:g.css("left")})).remove()
    }this.originalElement.css("resize", this.originalResizeStyle);
    e(this.originalElement);
    return this
  }, _mouseCapture:function(e) {
    var g = false;
    for(var b in this.handles) {
      if(a(this.handles[b])[0] == e.target) {
        g = true
      }
    }return!this.options.disabled && g
  }, _mouseStart:function(e) {
    var g = this.options, b = this.element.position(), f = this.element;
    this.resizing = true;
    this.documentScroll = {top:a(document).scrollTop(), left:a(document).scrollLeft()};
    if(f.is(".ui-draggable") || /absolute/.test(f.css("position"))) {
      f.css({position:"absolute", top:b.top, left:b.left})
    }a.browser.opera && /relative/.test(f.css("position")) && f.css({position:"relative", top:"auto", left:"auto"});
    this._renderProxy();
    b = c(this.helper.css("left"));
    var h = c(this.helper.css("top"));
    if(g.containment) {
      b += a(g.containment).scrollLeft() || 0;
      h += a(g.containment).scrollTop() || 0
    }this.offset = this.helper.offset();
    this.position = {left:b, top:h};
    this.size = this._helper ? {width:f.outerWidth(), height:f.outerHeight()} : {width:f.width(), height:f.height()};
    this.originalSize = this._helper ? {width:f.outerWidth(), height:f.outerHeight()} : {width:f.width(), height:f.height()};
    this.originalPosition = {left:b, top:h};
    this.sizeDiff = {width:f.outerWidth() - f.width(), height:f.outerHeight() - f.height()};
    this.originalMousePosition = {left:e.pageX, top:e.pageY};
    this.aspectRatio = typeof g.aspectRatio == "number" ? g.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
    g = a(".ui-resizable-" + this.axis).css("cursor");
    a("body").css("cursor", g == "auto" ? this.axis + "-resize" : g);
    f.addClass("ui-resizable-resizing");
    this._propagate("start", e);
    return true
  }, _mouseDrag:function(e) {
    var g = this.helper, b = this.originalMousePosition, f = this._change[this.axis];
    if(!f) {
      return false
    }b = f.apply(this, [e, e.pageX - b.left || 0, e.pageY - b.top || 0]);
    if(this._aspectRatio || e.shiftKey) {
      b = this._updateRatio(b, e)
    }b = this._respectSize(b, e);
    this._propagate("resize", e);
    g.css({top:this.position.top + "px", left:this.position.left + "px", width:this.size.width + "px", height:this.size.height + "px"});
    !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
    this._updateCache(b);
    this._trigger("resize", e, this.ui());
    return false
  }, _mouseStop:function(e) {
    this.resizing = false;
    var g = this.options;
    if(this._helper) {
      var b = this._proportionallyResizeElements, f = b.length && /textarea/i.test(b[0].nodeName);
      b = f && a.ui.hasScroll(b[0], "left") ? 0 : this.sizeDiff.height;
      f = {width:this.size.width - (f ? 0 : this.sizeDiff.width), height:this.size.height - b};
      b = parseInt(this.element.css("left"), 10) + (this.position.left - this.originalPosition.left) || null;
      var h = parseInt(this.element.css("top"), 10) + (this.position.top - this.originalPosition.top) || null;
      g.animate || this.element.css(a.extend(f, {top:h, left:b}));
      this.helper.height(this.size.height);
      this.helper.width(this.size.width);
      this._helper && !g.animate && this._proportionallyResize()
    }a("body").css("cursor", "auto");
    this.element.removeClass("ui-resizable-resizing");
    this._propagate("stop", e);
    this._helper && this.helper.remove();
    return false
  }, _updateCache:function(e) {
    this.offset = this.helper.offset();
    if(d(e.left)) {
      this.position.left = e.left
    }if(d(e.top)) {
      this.position.top = e.top
    }if(d(e.height)) {
      this.size.height = e.height
    }if(d(e.width)) {
      this.size.width = e.width
    }
  }, _updateRatio:function(e) {
    var g = this.position, b = this.size, f = this.axis;
    if(e.height) {
      e.width = b.height * this.aspectRatio
    }else {
      if(e.width) {
        e.height = b.width / this.aspectRatio
      }
    }if(f == "sw") {
      e.left = g.left + (b.width - e.width);
      e.top = null
    }if(f == "nw") {
      e.top = g.top + (b.height - e.height);
      e.left = g.left + (b.width - e.width)
    }return e
  }, _respectSize:function(e) {
    var g = this.options, b = this.axis, f = d(e.width) && g.maxWidth && g.maxWidth < e.width, h = d(e.height) && g.maxHeight && g.maxHeight < e.height, k = d(e.width) && g.minWidth && g.minWidth > e.width, m = d(e.height) && g.minHeight && g.minHeight > e.height;
    if(k) {
      e.width = g.minWidth
    }if(m) {
      e.height = g.minHeight
    }if(f) {
      e.width = g.maxWidth
    }if(h) {
      e.height = g.maxHeight
    }var q = this.originalPosition.left + this.originalSize.width, o = this.position.top + this.size.height, l = /sw|nw|w/.test(b);
    b = /nw|ne|n/.test(b);
    if(k && l) {
      e.left = q - g.minWidth
    }if(f && l) {
      e.left = q - g.maxWidth
    }if(m && b) {
      e.top = o - g.minHeight
    }if(h && b) {
      e.top = o - g.maxHeight
    }if((g = !e.width && !e.height) && !e.left && e.top) {
      e.top = null
    }else {
      if(g && !e.top && e.left) {
        e.left = null
      }
    }return e
  }, _proportionallyResize:function() {
    if(this._proportionallyResizeElements.length) {
      for(var e = this.helper || this.element, g = 0;g < this._proportionallyResizeElements.length;g++) {
        var b = this._proportionallyResizeElements[g];
        if(!this.borderDif) {
          var f = [b.css("borderTopWidth"), b.css("borderRightWidth"), b.css("borderBottomWidth"), b.css("borderLeftWidth")], h = [b.css("paddingTop"), b.css("paddingRight"), b.css("paddingBottom"), b.css("paddingLeft")];
          this.borderDif = a.map(f, function(k, m) {
            k = parseInt(k, 10) || 0;
            m = parseInt(h[m], 10) || 0;
            return k + m
          })
        }a.browser.msie && (a(e).is(":hidden") || a(e).parents(":hidden").length) || b.css({height:e.height() - this.borderDif[0] - this.borderDif[2] || 0, width:e.width() - this.borderDif[1] - this.borderDif[3] || 0})
      }
    }
  }, _renderProxy:function() {
    var e = this.options;
    this.elementOffset = this.element.offset();
    if(this._helper) {
      this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
      var g = a.browser.msie && a.browser.version < 7, b = g ? 1 : 0;
      g = g ? 2 : -1;
      this.helper.addClass(this._helper).css({width:this.element.outerWidth() + g, height:this.element.outerHeight() + g, position:"absolute", left:this.elementOffset.left - b + "px", top:this.elementOffset.top - b + "px", zIndex:++e.zIndex});
      this.helper.appendTo("body").disableSelection()
    }else {
      this.helper = this.element
    }
  }, _change:{e:function(e, g) {
    return{width:this.originalSize.width + g}
  }, w:function(e, g) {
    return{left:this.originalPosition.left + g, width:this.originalSize.width - g}
  }, n:function(e, g, b) {
    return{top:this.originalPosition.top + b, height:this.originalSize.height - b}
  }, s:function(e, g, b) {
    return{height:this.originalSize.height + b}
  }, se:function(e, g, b) {
    return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, g, b]))
  }, sw:function(e, g, b) {
    return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, g, b]))
  }, ne:function(e, g, b) {
    return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, g, b]))
  }, nw:function(e, g, b) {
    return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, g, b]))
  }}, _propagate:function(e, g) {
    a.ui.plugin.call(this, e, [g, this.ui()]);
    e != "resize" && this._trigger(e, g, this.ui())
  }, plugins:{}, ui:function() {
    return{originalElement:this.originalElement, element:this.element, helper:this.helper, position:this.position, size:this.size, originalSize:this.originalSize, originalPosition:this.originalPosition}
  }});
  a.extend(a.ui.resizable, {version:"1.8.5"});
  a.ui.plugin.add("resizable", "alsoResize", {start:function() {
    var e = a(this).data("resizable").options, g = function(b) {
      a(b).each(function() {
        var f = a(this);
        f.data("resizable-alsoresize", {width:parseInt(f.width(), 10), height:parseInt(f.height(), 10), left:parseInt(f.css("left"), 10), top:parseInt(f.css("top"), 10), position:f.css("position")})
      })
    };
    if(typeof e.alsoResize == "object" && !e.alsoResize.parentNode) {
      if(e.alsoResize.length) {
        e.alsoResize = e.alsoResize[0];
        g(e.alsoResize)
      }else {
        a.each(e.alsoResize, function(b) {
          g(b)
        })
      }
    }else {
      g(e.alsoResize)
    }
  }, resize:function(e, g) {
    var b = a(this).data("resizable");
    e = b.options;
    var f = b.originalSize, h = b.originalPosition, k = {height:b.size.height - f.height || 0, width:b.size.width - f.width || 0, top:b.position.top - h.top || 0, left:b.position.left - h.left || 0}, m = function(q, o) {
      a(q).each(function() {
        var l = a(this), n = a(this).data("resizable-alsoresize"), p = {}, r = o && o.length ? o : l.parents(g.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
        a.each(r, function(s, u) {
          if((s = (n[u] || 0) + (k[u] || 0)) && s >= 0) {
            p[u] = s || null
          }
        });
        if(a.browser.opera && /relative/.test(l.css("position"))) {
          b._revertToRelativePosition = true;
          l.css({position:"absolute", top:"auto", left:"auto"})
        }l.css(p)
      })
    };
    typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(q, o) {
      m(q, o)
    }) : m(e.alsoResize)
  }, stop:function() {
    var e = a(this).data("resizable"), g = e.options, b = function(f) {
      a(f).each(function() {
        var h = a(this);
        h.css({position:h.data("resizable-alsoresize").position})
      })
    };
    if(e._revertToRelativePosition) {
      e._revertToRelativePosition = false;
      typeof g.alsoResize == "object" && !g.alsoResize.nodeType ? a.each(g.alsoResize, function(f) {
        b(f)
      }) : b(g.alsoResize)
    }a(this).removeData("resizable-alsoresize")
  }});
  a.ui.plugin.add("resizable", "animate", {stop:function(e) {
    var g = a(this).data("resizable"), b = g.options, f = g._proportionallyResizeElements, h = f.length && /textarea/i.test(f[0].nodeName), k = h && a.ui.hasScroll(f[0], "left") ? 0 : g.sizeDiff.height;
    h = {width:g.size.width - (h ? 0 : g.sizeDiff.width), height:g.size.height - k};
    k = parseInt(g.element.css("left"), 10) + (g.position.left - g.originalPosition.left) || null;
    var m = parseInt(g.element.css("top"), 10) + (g.position.top - g.originalPosition.top) || null;
    g.element.animate(a.extend(h, m && k ? {top:m, left:k} : {}), {duration:b.animateDuration, easing:b.animateEasing, step:function() {
      var q = {width:parseInt(g.element.css("width"), 10), height:parseInt(g.element.css("height"), 10), top:parseInt(g.element.css("top"), 10), left:parseInt(g.element.css("left"), 10)};
      f && f.length && a(f[0]).css({width:q.width, height:q.height});
      g._updateCache(q);
      g._propagate("resize", e)
    }})
  }});
  a.ui.plugin.add("resizable", "containment", {start:function() {
    var e = a(this).data("resizable"), g = e.element, b = e.options.containment;
    if(g = b instanceof a ? b.get(0) : /parent/.test(b) ? g.parent().get(0) : b) {
      e.containerElement = a(g);
      if(/document/.test(b) || b == document) {
        e.containerOffset = {left:0, top:0};
        e.containerPosition = {left:0, top:0};
        e.parentData = {element:a(document), left:0, top:0, width:a(document).width(), height:a(document).height() || document.body.parentNode.scrollHeight}
      }else {
        var f = a(g), h = [];
        a(["Top", "Right", "Left", "Bottom"]).each(function(q, o) {
          h[q] = c(f.css("padding" + o))
        });
        e.containerOffset = f.offset();
        e.containerPosition = f.position();
        e.containerSize = {height:f.innerHeight() - h[3], width:f.innerWidth() - h[1]};
        b = e.containerOffset;
        var k = e.containerSize.height, m = e.containerSize.width;
        m = a.ui.hasScroll(g, "left") ? g.scrollWidth : m;
        k = a.ui.hasScroll(g) ? g.scrollHeight : k;
        e.parentData = {element:g, left:b.left, top:b.top, width:m, height:k}
      }
    }
  }, resize:function(e) {
    var g = a(this).data("resizable"), b = g.options, f = g.containerOffset, h = g.position;
    e = g._aspectRatio || e.shiftKey;
    var k = {top:0, left:0}, m = g.containerElement;
    if(m[0] != document && /static/.test(m.css("position"))) {
      k = f
    }if(h.left < (g._helper ? f.left : 0)) {
      g.size.width += g._helper ? g.position.left - f.left : g.position.left - k.left;
      if(e) {
        g.size.height = g.size.width / b.aspectRatio
      }g.position.left = b.helper ? f.left : 0
    }if(h.top < (g._helper ? f.top : 0)) {
      g.size.height += g._helper ? g.position.top - f.top : g.position.top;
      if(e) {
        g.size.width = g.size.height * b.aspectRatio
      }g.position.top = g._helper ? f.top : 0
    }g.offset.left = g.parentData.left + g.position.left;
    g.offset.top = g.parentData.top + g.position.top;
    b = Math.abs((g._helper ? g.offset.left - k.left : g.offset.left - k.left) + g.sizeDiff.width);
    f = Math.abs((g._helper ? g.offset.top - k.top : g.offset.top - f.top) + g.sizeDiff.height);
    h = g.containerElement.get(0) == g.element.parent().get(0);
    k = /relative|absolute/.test(g.containerElement.css("position"));
    if(h && k) {
      b -= g.parentData.left
    }if(b + g.size.width >= g.parentData.width) {
      g.size.width = g.parentData.width - b;
      if(e) {
        g.size.height = g.size.width / g.aspectRatio
      }
    }if(f + g.size.height >= g.parentData.height) {
      g.size.height = g.parentData.height - f;
      if(e) {
        g.size.width = g.size.height * g.aspectRatio
      }
    }
  }, stop:function() {
    var e = a(this).data("resizable"), g = e.options, b = e.containerOffset, f = e.containerPosition, h = e.containerElement, k = a(e.helper), m = k.offset(), q = k.outerWidth() - e.sizeDiff.width;
    k = k.outerHeight() - e.sizeDiff.height;
    e._helper && !g.animate && /relative/.test(h.css("position")) && a(this).css({left:m.left - f.left - b.left, width:q, height:k});
    e._helper && !g.animate && /static/.test(h.css("position")) && a(this).css({left:m.left - f.left - b.left, width:q, height:k})
  }});
  a.ui.plugin.add("resizable", "ghost", {start:function() {
    var e = a(this).data("resizable"), g = e.options, b = e.size;
    e.ghost = e.originalElement.clone();
    e.ghost.css({opacity:0.25, display:"block", position:"relative", height:b.height, width:b.width, margin:0, left:0, top:0}).addClass("ui-resizable-ghost").addClass(typeof g.ghost == "string" ? g.ghost : "");
    e.ghost.appendTo(e.helper)
  }, resize:function() {
    var e = a(this).data("resizable");
    e.ghost && e.ghost.css({position:"relative", height:e.size.height, width:e.size.width})
  }, stop:function() {
    var e = a(this).data("resizable");
    e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
  }});
  a.ui.plugin.add("resizable", "grid", {resize:function() {
    var e = a(this).data("resizable"), g = e.options, b = e.size, f = e.originalSize, h = e.originalPosition, k = e.axis;
    g.grid = typeof g.grid == "number" ? [g.grid, g.grid] : g.grid;
    var m = Math.round((b.width - f.width) / (g.grid[0] || 1)) * (g.grid[0] || 1);
    g = Math.round((b.height - f.height) / (g.grid[1] || 1)) * (g.grid[1] || 1);
    if(/^(se|s|e)$/.test(k)) {
      e.size.width = f.width + m;
      e.size.height = f.height + g
    }else {
      if(/^(ne)$/.test(k)) {
        e.size.width = f.width + m;
        e.size.height = f.height + g;
        e.position.top = h.top - g
      }else {
        if(/^(sw)$/.test(k)) {
          e.size.width = f.width + m;
          e.size.height = f.height + g
        }else {
          e.size.width = f.width + m;
          e.size.height = f.height + g;
          e.position.top = h.top - g
        }e.position.left = h.left - m
      }
    }
  }});
  var c = function(e) {
    return parseInt(e, 10) || 0
  }, d = function(e) {
    return!isNaN(parseInt(e, 10))
  }
})(jQuery);
(function(a) {
  a.widget("ui.selectable", a.ui.mouse, {options:{appendTo:"body", autoRefresh:true, distance:0, filter:"*", tolerance:"touch"}, _create:function() {
    var c = this;
    this.element.addClass("ui-selectable");
    this.dragged = false;
    var d;
    this.refresh = function() {
      d = a(c.options.filter, c.element[0]);
      d.each(function() {
        var e = a(this), g = e.offset();
        a.data(this, "selectable-item", {element:this, $element:e, left:g.left, top:g.top, right:g.left + e.outerWidth(), bottom:g.top + e.outerHeight(), startselected:false, selected:e.hasClass("ui-selected"), selecting:e.hasClass("ui-selecting"), unselecting:e.hasClass("ui-unselecting")})
      })
    };
    this.refresh();
    this.selectees = d.addClass("ui-selectee");
    this._mouseInit();
    this.helper = a("<div class='ui-selectable-helper'></div>")
  }, destroy:function() {
    this.selectees.removeClass("ui-selectee").removeData("selectable-item");
    this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
    this._mouseDestroy();
    return this
  }, _mouseStart:function(c) {
    var d = this;
    this.opos = [c.pageX, c.pageY];
    if(!this.options.disabled) {
      var e = this.options;
      this.selectees = a(e.filter, this.element[0]);
      this._trigger("start", c);
      a(e.appendTo).append(this.helper);
      this.helper.css({left:c.clientX, top:c.clientY, width:0, height:0});
      e.autoRefresh && this.refresh();
      this.selectees.filter(".ui-selected").each(function() {
        var g = a.data(this, "selectable-item");
        g.startselected = true;
        if(!c.metaKey) {
          g.$element.removeClass("ui-selected");
          g.selected = false;
          g.$element.addClass("ui-unselecting");
          g.unselecting = true;
          d._trigger("unselecting", c, {unselecting:g.element})
        }
      });
      a(c.target).parents().andSelf().each(function() {
        var g = a.data(this, "selectable-item");
        if(g) {
          var b = !c.metaKey || !g.$element.hasClass("ui-selected");
          g.$element.removeClass(b ? "ui-unselecting" : "ui-selected").addClass(b ? "ui-selecting" : "ui-unselecting");
          g.unselecting = !b;
          g.selecting = b;
          (g.selected = b) ? d._trigger("selecting", c, {selecting:g.element}) : d._trigger("unselecting", c, {unselecting:g.element});
          return false
        }
      })
    }
  }, _mouseDrag:function(c) {
    var d = this;
    this.dragged = true;
    if(!this.options.disabled) {
      var e = this.options, g = this.opos[0], b = this.opos[1], f = c.pageX, h = c.pageY;
      if(g > f) {
        var k = f;
        f = g;
        g = k
      }if(b > h) {
        k = h;
        h = b;
        b = k
      }this.helper.css({left:g, top:b, width:f - g, height:h - b});
      this.selectees.each(function() {
        var m = a.data(this, "selectable-item");
        if(!(!m || m.element == d.element[0])) {
          var q = false;
          if(e.tolerance == "touch") {
            q = !(m.left > f || m.right < g || m.top > h || m.bottom < b)
          }else {
            if(e.tolerance == "fit") {
              q = m.left > g && m.right < f && m.top > b && m.bottom < h
            }
          }if(q) {
            if(m.selected) {
              m.$element.removeClass("ui-selected");
              m.selected = false
            }if(m.unselecting) {
              m.$element.removeClass("ui-unselecting");
              m.unselecting = false
            }if(!m.selecting) {
              m.$element.addClass("ui-selecting");
              m.selecting = true;
              d._trigger("selecting", c, {selecting:m.element})
            }
          }else {
            if(m.selecting) {
              if(c.metaKey && m.startselected) {
                m.$element.removeClass("ui-selecting");
                m.selecting = false;
                m.$element.addClass("ui-selected");
                m.selected = true
              }else {
                m.$element.removeClass("ui-selecting");
                m.selecting = false;
                if(m.startselected) {
                  m.$element.addClass("ui-unselecting");
                  m.unselecting = true
                }d._trigger("unselecting", c, {unselecting:m.element})
              }
            }if(m.selected) {
              if(!c.metaKey && !m.startselected) {
                m.$element.removeClass("ui-selected");
                m.selected = false;
                m.$element.addClass("ui-unselecting");
                m.unselecting = true;
                d._trigger("unselecting", c, {unselecting:m.element})
              }
            }
          }
        }
      });
      return false
    }
  }, _mouseStop:function(c) {
    var d = this;
    this.dragged = false;
    a(".ui-unselecting", this.element[0]).each(function() {
      var e = a.data(this, "selectable-item");
      e.$element.removeClass("ui-unselecting");
      e.unselecting = false;
      e.startselected = false;
      d._trigger("unselected", c, {unselected:e.element})
    });
    a(".ui-selecting", this.element[0]).each(function() {
      var e = a.data(this, "selectable-item");
      e.$element.removeClass("ui-selecting").addClass("ui-selected");
      e.selecting = false;
      e.selected = true;
      e.startselected = true;
      d._trigger("selected", c, {selected:e.element})
    });
    this._trigger("stop", c);
    this.helper.remove();
    return false
  }});
  a.extend(a.ui.selectable, {version:"1.8.5"})
})(jQuery);
(function(a) {
  a.widget("ui.sortable", a.ui.mouse, {widgetEventPrefix:"sort", options:{appendTo:"parent", axis:false, connectWith:false, containment:false, cursor:"auto", cursorAt:false, dropOnEmpty:true, forcePlaceholderSize:false, forceHelperSize:false, grid:false, handle:false, helper:"original", items:"> *", opacity:false, placeholder:false, revert:false, scroll:true, scrollSensitivity:20, scrollSpeed:20, scope:"default", tolerance:"intersect", zIndex:1E3}, _create:function() {
    this.containerCache = {};
    this.element.addClass("ui-sortable");
    this.refresh();
    this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) : false;
    this.offset = this.element.offset();
    this._mouseInit()
  }, destroy:function() {
    this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
    this._mouseDestroy();
    for(var c = this.items.length - 1;c >= 0;c--) {
      this.items[c].item.removeData("sortable-item")
    }return this
  }, _setOption:function(c, d) {
    if(c === "disabled") {
      this.options[c] = d;
      this.widget()[d ? "addClass" : "removeClass"]("ui-sortable-disabled")
    }else {
      a.Widget.prototype._setOption.apply(this, arguments)
    }
  }, _mouseCapture:function(c, d) {
    if(this.reverting) {
      return false
    }if(this.options.disabled || this.options.type == "static") {
      return false
    }this._refreshItems(c);
    var e = null, g = this;
    a(c.target).parents().each(function() {
      if(a.data(this, "sortable-item") == g) {
        e = a(this);
        return false
      }
    });
    if(a.data(c.target, "sortable-item") == g) {
      e = a(c.target)
    }if(!e) {
      return false
    }if(this.options.handle && !d) {
      var b = false;
      a(this.options.handle, e).find("*").andSelf().each(function() {
        if(this == c.target) {
          b = true
        }
      });
      if(!b) {
        return false
      }
    }this.currentItem = e;
    this._removeCurrentsFromItems();
    return true
  }, _mouseStart:function(c, d, e) {
    d = this.options;
    this.currentContainer = this;
    this.refreshPositions();
    this.helper = this._createHelper(c);
    this._cacheHelperProportions();
    this._cacheMargins();
    this.scrollParent = this.helper.scrollParent();
    this.offset = this.currentItem.offset();
    this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left};
    this.helper.css("position", "absolute");
    this.cssPosition = this.helper.css("position");
    a.extend(this.offset, {click:{left:c.pageX - this.offset.left, top:c.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()});
    this.originalPosition = this._generatePosition(c);
    this.originalPageX = c.pageX;
    this.originalPageY = c.pageY;
    d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt);
    this.domPosition = {prev:this.currentItem.prev()[0], parent:this.currentItem.parent()[0]};
    this.helper[0] != this.currentItem[0] && this.currentItem.hide();
    this._createPlaceholder();
    d.containment && this._setContainment();
    if(d.cursor) {
      if(a("body").css("cursor")) {
        this._storedCursor = a("body").css("cursor")
      }a("body").css("cursor", d.cursor)
    }if(d.opacity) {
      if(this.helper.css("opacity")) {
        this._storedOpacity = this.helper.css("opacity")
      }this.helper.css("opacity", d.opacity)
    }if(d.zIndex) {
      if(this.helper.css("zIndex")) {
        this._storedZIndex = this.helper.css("zIndex")
      }this.helper.css("zIndex", d.zIndex)
    }if(this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
      this.overflowOffset = this.scrollParent.offset()
    }this._trigger("start", c, this._uiHash());
    this._preserveHelperProportions || this._cacheHelperProportions();
    if(!e) {
      for(e = this.containers.length - 1;e >= 0;e--) {
        this.containers[e]._trigger("activate", c, this._uiHash(this))
      }
    }if(a.ui.ddmanager) {
      a.ui.ddmanager.current = this
    }a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c);
    this.dragging = true;
    this.helper.addClass("ui-sortable-helper");
    this._mouseDrag(c);
    return true
  }, _mouseDrag:function(c) {
    this.position = this._generatePosition(c);
    this.positionAbs = this._convertPositionTo("absolute");
    if(!this.lastPositionAbs) {
      this.lastPositionAbs = this.positionAbs
    }if(this.options.scroll) {
      var d = this.options, e = false;
      if(this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
        if(this.overflowOffset.top + this.scrollParent[0].offsetHeight - c.pageY < d.scrollSensitivity) {
          this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop + d.scrollSpeed
        }else {
          if(c.pageY - this.overflowOffset.top < d.scrollSensitivity) {
            this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop - d.scrollSpeed
          }
        }if(this.overflowOffset.left + this.scrollParent[0].offsetWidth - c.pageX < d.scrollSensitivity) {
          this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft + d.scrollSpeed
        }else {
          if(c.pageX - this.overflowOffset.left < d.scrollSensitivity) {
            this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft - d.scrollSpeed
          }
        }
      }else {
        if(c.pageY - a(document).scrollTop() < d.scrollSensitivity) {
          e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed)
        }else {
          if(a(window).height() - (c.pageY - a(document).scrollTop()) < d.scrollSensitivity) {
            e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed)
          }
        }if(c.pageX - a(document).scrollLeft() < d.scrollSensitivity) {
          e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed)
        }else {
          if(a(window).width() - (c.pageX - a(document).scrollLeft()) < d.scrollSensitivity) {
            e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)
          }
        }
      }e !== false && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c)
    }this.positionAbs = this._convertPositionTo("absolute");
    if(!this.options.axis || this.options.axis != "y") {
      this.helper[0].style.left = this.position.left + "px"
    }if(!this.options.axis || this.options.axis != "x") {
      this.helper[0].style.top = this.position.top + "px"
    }for(d = this.items.length - 1;d >= 0;d--) {
      e = this.items[d];
      var g = e.item[0], b = this._intersectsWithPointer(e);
      if(b) {
        if(g != this.currentItem[0] && this.placeholder[b == 1 ? "next" : "prev"]()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], g) : true)) {
          this.direction = b == 1 ? "down" : "up";
          if(this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
            this._rearrange(c, e)
          }else {
            break
          }this._trigger("change", c, this._uiHash());
          break
        }
      }
    }this._contactContainers(c);
    a.ui.ddmanager && a.ui.ddmanager.drag(this, c);
    this._trigger("sort", c, this._uiHash());
    this.lastPositionAbs = this.positionAbs;
    return false
  }, _mouseStop:function(c, d) {
    if(c) {
      a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, c);
      if(this.options.revert) {
        var e = this;
        d = e.placeholder.offset();
        e.reverting = true;
        a(this.helper).animate({left:d.left - this.offset.parent.left - e.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft), top:d.top - this.offset.parent.top - e.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function() {
          e._clear(c)
        })
      }else {
        this._clear(c, d)
      }return false
    }
  }, cancel:function() {
    if(this.dragging) {
      this._mouseUp();
      this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
      for(var c = this.containers.length - 1;c >= 0;c--) {
        this.containers[c]._trigger("deactivate", null, this._uiHash(this));
        if(this.containers[c].containerCache.over) {
          this.containers[c]._trigger("out", null, this._uiHash(this));
          this.containers[c].containerCache.over = 0
        }
      }
    }this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
    this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
    a.extend(this, {helper:null, dragging:false, reverting:false, _noFinalSort:null});
    this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem);
    return this
  }, serialize:function(c) {
    var d = this._getItemsAsjQuery(c && c.connected), e = [];
    c = c || {};
    a(d).each(function() {
      var g = (a(c.item || this).attr(c.attribute || "id") || "").match(c.expression || /(.+)[-=_](.+)/);
      if(g) {
        e.push((c.key || g[1] + "[]") + "=" + (c.key && c.expression ? g[1] : g[2]))
      }
    });
    !e.length && c.key && e.push(c.key + "=");
    return e.join("&")
  }, toArray:function(c) {
    var d = this._getItemsAsjQuery(c && c.connected), e = [];
    c = c || {};
    d.each(function() {
      e.push(a(c.item || this).attr(c.attribute || "id") || "")
    });
    return e
  }, _intersectsWith:function(c) {
    var d = this.positionAbs.left, e = d + this.helperProportions.width, g = this.positionAbs.top, b = g + this.helperProportions.height, f = c.left, h = f + c.width, k = c.top, m = k + c.height, q = this.offset.click.top, o = this.offset.click.left;
    q = g + q > k && g + q < m && d + o > f && d + o < h;
    return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > c[this.floating ? "width" : "height"] ? q : f < d + this.helperProportions.width / 2 && e - this.helperProportions.width / 2 < h && k < g + this.helperProportions.height / 2 && b - this.helperProportions.height / 2 < m
  }, _intersectsWithPointer:function(c) {
    var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top, c.height);
    c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left, c.width);
    d = d && c;
    c = this._getDragVerticalDirection();
    var e = this._getDragHorizontalDirection();
    if(!d) {
      return false
    }return this.floating ? e && e == "right" || c == "down" ? 2 : 1 : c && (c == "down" ? 2 : 1)
  }, _intersectsWithSides:function(c) {
    var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top + c.height / 2, c.height);
    c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left + c.width / 2, c.width);
    var e = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
    return this.floating && g ? g == "right" && c || g == "left" && !c : e && (e == "down" && d || e == "up" && !d)
  }, _getDragVerticalDirection:function() {
    var c = this.positionAbs.top - this.lastPositionAbs.top;
    return c != 0 && (c > 0 ? "down" : "up")
  }, _getDragHorizontalDirection:function() {
    var c = this.positionAbs.left - this.lastPositionAbs.left;
    return c != 0 && (c > 0 ? "right" : "left")
  }, refresh:function(c) {
    this._refreshItems(c);
    this.refreshPositions();
    return this
  }, _connectWith:function() {
    var c = this.options;
    return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
  }, _getItemsAsjQuery:function(c) {
    var d = [], e = [], g = this._connectWith();
    if(g && c) {
      for(c = g.length - 1;c >= 0;c--) {
        for(var b = a(g[c]), f = b.length - 1;f >= 0;f--) {
          var h = a.data(b[f], "sortable");
          if(h && h != this && !h.options.disabled) {
            e.push([a.isFunction(h.options.items) ? h.options.items.call(h.element) : a(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
          }
        }
      }
    }e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options:this.options, item:this.currentItem}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
    for(c = e.length - 1;c >= 0;c--) {
      e[c][0].each(function() {
        d.push(this)
      })
    }return a(d)
  }, _removeCurrentsFromItems:function() {
    for(var c = this.currentItem.find(":data(sortable-item)"), d = 0;d < this.items.length;d++) {
      for(var e = 0;e < c.length;e++) {
        c[e] == this.items[d].item[0] && this.items.splice(d, 1)
      }
    }
  }, _refreshItems:function(c) {
    this.items = [];
    this.containers = [this];
    var d = this.items, e = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {item:this.currentItem}) : a(this.options.items, this.element), this]], g = this._connectWith();
    if(g) {
      for(var b = g.length - 1;b >= 0;b--) {
        for(var f = a(g[b]), h = f.length - 1;h >= 0;h--) {
          var k = a.data(f[h], "sortable");
          if(k && k != this && !k.options.disabled) {
            e.push([a.isFunction(k.options.items) ? k.options.items.call(k.element[0], c, {item:this.currentItem}) : a(k.options.items, k.element), k]);
            this.containers.push(k)
          }
        }
      }
    }for(b = e.length - 1;b >= 0;b--) {
      c = e[b][1];
      g = e[b][0];
      h = 0;
      for(f = g.length;h < f;h++) {
        k = a(g[h]);
        k.data("sortable-item", c);
        d.push({item:k, instance:c, width:0, height:0, left:0, top:0})
      }
    }
  }, refreshPositions:function(c) {
    if(this.offsetParent && this.helper) {
      this.offset.parent = this._getParentOffset()
    }for(var d = this.items.length - 1;d >= 0;d--) {
      var e = this.items[d], g = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
      if(!c) {
        e.width = g.outerWidth();
        e.height = g.outerHeight()
      }g = g.offset();
      e.left = g.left;
      e.top = g.top
    }if(this.options.custom && this.options.custom.refreshContainers) {
      this.options.custom.refreshContainers.call(this)
    }else {
      for(d = this.containers.length - 1;d >= 0;d--) {
        g = this.containers[d].element.offset();
        this.containers[d].containerCache.left = g.left;
        this.containers[d].containerCache.top = g.top;
        this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
        this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
      }
    }return this
  }, _createPlaceholder:function(c) {
    var d = c || this, e = d.options;
    if(!e.placeholder || e.placeholder.constructor == String) {
      var g = e.placeholder;
      e.placeholder = {element:function() {
        var b = a(document.createElement(d.currentItem[0].nodeName)).addClass(g || d.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
        if(!g) {
          b.style.visibility = "hidden"
        }return b
      }, update:function(b, f) {
        if(!(g && !e.forcePlaceholderSize)) {
          f.height() || f.height(d.currentItem.innerHeight() - parseInt(d.currentItem.css("paddingTop") || 0, 10) - parseInt(d.currentItem.css("paddingBottom") || 0, 10));
          f.width() || f.width(d.currentItem.innerWidth() - parseInt(d.currentItem.css("paddingLeft") || 0, 10) - parseInt(d.currentItem.css("paddingRight") || 0, 10))
        }
      }}
    }d.placeholder = a(e.placeholder.element.call(d.element, d.currentItem));
    d.currentItem.after(d.placeholder);
    e.placeholder.update(d, d.placeholder)
  }, _contactContainers:function(c) {
    for(var d = null, e = null, g = this.containers.length - 1;g >= 0;g--) {
      if(!a.ui.contains(this.currentItem[0], this.containers[g].element[0])) {
        if(this._intersectsWith(this.containers[g].containerCache)) {
          if(!(d && a.ui.contains(this.containers[g].element[0], d.element[0]))) {
            d = this.containers[g];
            e = g
          }
        }else {
          if(this.containers[g].containerCache.over) {
            this.containers[g]._trigger("out", c, this._uiHash(this));
            this.containers[g].containerCache.over = 0
          }
        }
      }
    }if(d) {
      if(this.containers.length === 1) {
        this.containers[e]._trigger("over", c, this._uiHash(this));
        this.containers[e].containerCache.over = 1
      }else {
        if(this.currentContainer != this.containers[e]) {
          d = 1E4;
          g = null;
          for(var b = this.positionAbs[this.containers[e].floating ? "left" : "top"], f = this.items.length - 1;f >= 0;f--) {
            if(a.ui.contains(this.containers[e].element[0], this.items[f].item[0])) {
              var h = this.items[f][this.containers[e].floating ? "left" : "top"];
              if(Math.abs(h - b) < d) {
                d = Math.abs(h - b);
                g = this.items[f]
              }
            }
          }if(g || this.options.dropOnEmpty) {
            this.currentContainer = this.containers[e];
            g ? this._rearrange(c, g, null, true) : this._rearrange(c, null, this.containers[e].element, true);
            this._trigger("change", c, this._uiHash());
            this.containers[e]._trigger("change", c, this._uiHash(this));
            this.options.placeholder.update(this.currentContainer, this.placeholder);
            this.containers[e]._trigger("over", c, this._uiHash(this));
            this.containers[e].containerCache.over = 1
          }
        }
      }
    }
  }, _createHelper:function(c) {
    var d = this.options;
    c = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : d.helper == "clone" ? this.currentItem.clone() : this.currentItem;
    c.parents("body").length || a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(c[0]);
    if(c[0] == this.currentItem[0]) {
      this._storedCSS = {width:this.currentItem[0].style.width, height:this.currentItem[0].style.height, position:this.currentItem.css("position"), top:this.currentItem.css("top"), left:this.currentItem.css("left")}
    }if(c[0].style.width == "" || d.forceHelperSize) {
      c.width(this.currentItem.width())
    }if(c[0].style.height == "" || d.forceHelperSize) {
      c.height(this.currentItem.height())
    }return c
  }, _adjustOffsetFromHelper:function(c) {
    if(typeof c == "string") {
      c = c.split(" ")
    }if(a.isArray(c)) {
      c = {left:+c[0], top:+c[1] || 0}
    }if("left" in c) {
      this.offset.click.left = c.left + this.margins.left
    }if("right" in c) {
      this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
    }if("top" in c) {
      this.offset.click.top = c.top + this.margins.top
    }if("bottom" in c) {
      this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
    }
  }, _getParentOffset:function() {
    this.offsetParent = this.helper.offsetParent();
    var c = this.offsetParent.offset();
    if(this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
      c.left += this.scrollParent.scrollLeft();
      c.top += this.scrollParent.scrollTop()
    }if(this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) {
      c = {top:0, left:0}
    }return{top:c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
  }, _getRelativeOffset:function() {
    if(this.cssPosition == "relative") {
      var c = this.currentItem.position();
      return{top:c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
    }else {
      return{top:0, left:0}
    }
  }, _cacheMargins:function() {
    this.margins = {left:parseInt(this.currentItem.css("marginLeft"), 10) || 0, top:parseInt(this.currentItem.css("marginTop"), 10) || 0}
  }, _cacheHelperProportions:function() {
    this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()}
  }, _setContainment:function() {
    var c = this.options;
    if(c.containment == "parent") {
      c.containment = this.helper[0].parentNode
    }if(c.containment == "document" || c.containment == "window") {
      this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(c.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(c.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
    }if(!/^(document|window|parent)$/.test(c.containment)) {
      var d = a(c.containment)[0];
      c = a(c.containment).offset();
      var e = a(d).css("overflow") != "hidden";
      this.containment = [c.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (e ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + 
      (e ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
    }
  }, _convertPositionTo:function(c, d) {
    if(!d) {
      d = this.position
    }c = c == "absolute" ? 1 : -1;
    var e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(e[0].tagName);
    return{top:d.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : e.scrollTop()) * c), left:d.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : e.scrollLeft()) * c)}
  }, _generatePosition:function(c) {
    var d = this.options, e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(e[0].tagName);
    if(this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
      this.offset.relative = this._getRelativeOffset()
    }var b = c.pageX, f = c.pageY;
    if(this.originalPosition) {
      if(this.containment) {
        if(c.pageX - this.offset.click.left < this.containment[0]) {
          b = this.containment[0] + this.offset.click.left
        }if(c.pageY - this.offset.click.top < this.containment[1]) {
          f = this.containment[1] + this.offset.click.top
        }if(c.pageX - this.offset.click.left > this.containment[2]) {
          b = this.containment[2] + this.offset.click.left
        }if(c.pageY - this.offset.click.top > this.containment[3]) {
          f = this.containment[3] + this.offset.click.top
        }
      }if(d.grid) {
        f = this.originalPageY + Math.round((f - this.originalPageY) / d.grid[1]) * d.grid[1];
        f = this.containment ? !(f - this.offset.click.top < this.containment[1] || f - this.offset.click.top > this.containment[3]) ? f : !(f - this.offset.click.top < this.containment[1]) ? f - d.grid[1] : f + d.grid[1] : f;
        b = this.originalPageX + Math.round((b - this.originalPageX) / d.grid[0]) * d.grid[0];
        b = this.containment ? !(b - this.offset.click.left < this.containment[0] || b - this.offset.click.left > this.containment[2]) ? b : !(b - this.offset.click.left < this.containment[0]) ? b - d.grid[0] : b + d.grid[0] : b
      }
    }return{top:f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : e.scrollTop()), left:b - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : e.scrollLeft())}
  }, _rearrange:function(c, d, e, g) {
    e ? e[0].appendChild(this.placeholder[0]) : d.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? d.item[0] : d.item[0].nextSibling);
    this.counter = this.counter ? ++this.counter : 1;
    var b = this, f = this.counter;
    window.setTimeout(function() {
      f == b.counter && b.refreshPositions(!g)
    }, 0)
  }, _clear:function(c, d) {
    this.reverting = false;
    var e = [];
    !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
    this._noFinalSort = null;
    if(this.helper[0] == this.currentItem[0]) {
      for(var g in this._storedCSS) {
        if(this._storedCSS[g] == "auto" || this._storedCSS[g] == "static") {
          this._storedCSS[g] = ""
        }
      }this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
    }else {
      this.currentItem.show()
    }this.fromOutside && !d && e.push(function(b) {
      this._trigger("receive", b, this._uiHash(this.fromOutside))
    });
    if((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !d) {
      e.push(function(b) {
        this._trigger("update", b, this._uiHash())
      })
    }if(!a.ui.contains(this.element[0], this.currentItem[0])) {
      d || e.push(function(b) {
        this._trigger("remove", b, this._uiHash())
      });
      for(g = this.containers.length - 1;g >= 0;g--) {
        if(a.ui.contains(this.containers[g].element[0], this.currentItem[0]) && !d) {
          e.push(function(b) {
            return function(f) {
              b._trigger("receive", f, this._uiHash(this))
            }
          }.call(this, this.containers[g]));
          e.push(function(b) {
            return function(f) {
              b._trigger("update", f, this._uiHash(this))
            }
          }.call(this, this.containers[g]))
        }
      }
    }for(g = this.containers.length - 1;g >= 0;g--) {
      d || e.push(function(b) {
        return function(f) {
          b._trigger("deactivate", f, this._uiHash(this))
        }
      }.call(this, this.containers[g]));
      if(this.containers[g].containerCache.over) {
        e.push(function(b) {
          return function(f) {
            b._trigger("out", f, this._uiHash(this))
          }
        }.call(this, this.containers[g]));
        this.containers[g].containerCache.over = 0
      }
    }this._storedCursor && a("body").css("cursor", this._storedCursor);
    this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
    if(this._storedZIndex) {
      this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
    }this.dragging = false;
    if(this.cancelHelperRemoval) {
      if(!d) {
        this._trigger("beforeStop", c, this._uiHash());
        for(g = 0;g < e.length;g++) {
          e[g].call(this, c)
        }this._trigger("stop", c, this._uiHash())
      }return false
    }d || this._trigger("beforeStop", c, this._uiHash());
    this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
    this.helper[0] != this.currentItem[0] && this.helper.remove();
    this.helper = null;
    if(!d) {
      for(g = 0;g < e.length;g++) {
        e[g].call(this, c)
      }this._trigger("stop", c, this._uiHash())
    }this.fromOutside = false;
    return true
  }, _trigger:function() {
    a.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
  }, _uiHash:function(c) {
    var d = c || this;
    return{helper:d.helper, placeholder:d.placeholder || a([]), position:d.position, originalPosition:d.originalPosition, offset:d.positionAbs, item:d.currentItem, sender:c ? c.element : null}
  }});
  a.extend(a.ui.sortable, {version:"1.8.5"})
})(jQuery);
jQuery.effects || function(a, c) {
  function d(o) {
    var l;
    if(o && o.constructor == Array && o.length == 3) {
      return o
    }if(l = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(o)) {
      return[parseInt(l[1], 10), parseInt(l[2], 10), parseInt(l[3], 10)]
    }if(l = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(o)) {
      return[parseFloat(l[1]) * 2.55, parseFloat(l[2]) * 2.55, parseFloat(l[3]) * 2.55]
    }if(l = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(o)) {
      return[parseInt(l[1], 16), parseInt(l[2], 16), parseInt(l[3], 16)]
    }if(l = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(o)) {
      return[parseInt(l[1] + l[1], 16), parseInt(l[2] + l[2], 16), parseInt(l[3] + l[3], 16)]
    }if(/rgba\(0, 0, 0, 0\)/.exec(o)) {
      return k.transparent
    }return k[a.trim(o).toLowerCase()]
  }
  function e(o, l) {
    var n;
    do {
      n = a.curCSS(o, l);
      if(n != "" && n != "transparent" || a.nodeName(o, "body")) {
        break
      }l = "backgroundColor"
    }while(o = o.parentNode);
    return d(n)
  }
  function g() {
    var o = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, l = {}, n, p;
    if(o && o.length && o[0] && o[o[0]]) {
      for(var r = o.length;r--;) {
        n = o[r];
        if(typeof o[n] == "string") {
          p = n.replace(/\-(\w)/g, function(s, u) {
            return u.toUpperCase()
          });
          l[p] = o[n]
        }
      }
    }else {
      for(n in o) {
        if(typeof o[n] === "string") {
          l[n] = o[n]
        }
      }
    }return l
  }
  function b(o) {
    var l, n;
    for(l in o) {
      n = o[l];
      if(n == null || a.isFunction(n) || l in q || /scrollbar/.test(l) || !/color/i.test(l) && isNaN(parseFloat(n))) {
        delete o[l]
      }
    }return o
  }
  function f(o, l) {
    var n = {_:0}, p;
    for(p in l) {
      if(o[p] != l[p]) {
        n[p] = l[p]
      }
    }return n
  }
  function h(o, l, n, p) {
    if(typeof o == "object") {
      p = l;
      n = null;
      l = o;
      o = l.effect
    }if(a.isFunction(l)) {
      p = l;
      n = null;
      l = {}
    }if(typeof l == "number" || a.fx.speeds[l]) {
      p = n;
      n = l;
      l = {}
    }if(a.isFunction(n)) {
      p = n;
      n = null
    }l = l || {};
    n = n || l.duration;
    n = a.fx.off ? 0 : typeof n == "number" ? n : a.fx.speeds[n] || a.fx.speeds._default;
    p = p || l.complete;
    return[o, l, n, p]
  }
  a.effects = {};
  a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(o, l) {
    a.fx.step[l] = function(n) {
      if(!n.colorInit) {
        n.start = e(n.elem, l);
        n.end = d(n.end);
        n.colorInit = true
      }n.elem.style[l] = "rgb(" + Math.max(Math.min(parseInt(n.pos * (n.end[0] - n.start[0]) + n.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(n.pos * (n.end[1] - n.start[1]) + n.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(n.pos * (n.end[2] - n.start[2]) + n.start[2], 10), 255), 0) + ")"
    }
  });
  var k = {aqua:[0, 255, 255], azure:[240, 255, 255], beige:[245, 245, 220], black:[0, 0, 0], blue:[0, 0, 255], brown:[165, 42, 42], cyan:[0, 255, 255], darkblue:[0, 0, 139], darkcyan:[0, 139, 139], darkgrey:[169, 169, 169], darkgreen:[0, 100, 0], darkkhaki:[189, 183, 107], darkmagenta:[139, 0, 139], darkolivegreen:[85, 107, 47], darkorange:[255, 140, 0], darkorchid:[153, 50, 204], darkred:[139, 0, 0], darksalmon:[233, 150, 122], darkviolet:[148, 0, 211], fuchsia:[255, 0, 255], gold:[255, 215, 0], 
  green:[0, 128, 0], indigo:[75, 0, 130], khaki:[240, 230, 140], lightblue:[173, 216, 230], lightcyan:[224, 255, 255], lightgreen:[144, 238, 144], lightgrey:[211, 211, 211], lightpink:[255, 182, 193], lightyellow:[255, 255, 224], lime:[0, 255, 0], magenta:[255, 0, 255], maroon:[128, 0, 0], navy:[0, 0, 128], olive:[128, 128, 0], orange:[255, 165, 0], pink:[255, 192, 203], purple:[128, 0, 128], violet:[128, 0, 128], red:[255, 0, 0], silver:[192, 192, 192], white:[255, 255, 255], yellow:[255, 255, 0], 
  transparent:[255, 255, 255]}, m = ["add", "remove", "toggle"], q = {border:1, borderBottom:1, borderColor:1, borderLeft:1, borderRight:1, borderTop:1, borderWidth:1, margin:1, padding:1};
  a.effects.animateClass = function(o, l, n, p) {
    if(a.isFunction(n)) {
      p = n;
      n = null
    }return this.each(function() {
      var r = a(this), s = r.attr("style") || " ", u = b(g.call(this)), v, w = r.attr("className");
      a.each(m, function(y, B) {
        o[B] && r[B + "Class"](o[B])
      });
      v = b(g.call(this));
      r.attr("className", w);
      r.animate(f(u, v), l, n, function() {
        a.each(m, function(y, B) {
          o[B] && r[B + "Class"](o[B])
        });
        if(typeof r.attr("style") == "object") {
          r.attr("style").cssText = "";
          r.attr("style").cssText = s
        }else {
          r.attr("style", s)
        }p && p.apply(this, arguments)
      })
    })
  };
  a.fn.extend({_addClass:a.fn.addClass, addClass:function(o, l, n, p) {
    return l ? a.effects.animateClass.apply(this, [{add:o}, l, n, p]) : this._addClass(o)
  }, _removeClass:a.fn.removeClass, removeClass:function(o, l, n, p) {
    return l ? a.effects.animateClass.apply(this, [{remove:o}, l, n, p]) : this._removeClass(o)
  }, _toggleClass:a.fn.toggleClass, toggleClass:function(o, l, n, p, r) {
    return typeof l == "boolean" || l === c ? n ? a.effects.animateClass.apply(this, [l ? {add:o} : {remove:o}, n, p, r]) : this._toggleClass(o, l) : a.effects.animateClass.apply(this, [{toggle:o}, l, n, p])
  }, switchClass:function(o, l, n, p, r) {
    return a.effects.animateClass.apply(this, [{add:l, remove:o}, n, p, r])
  }});
  a.extend(a.effects, {version:"1.8.5", save:function(o, l) {
    for(var n = 0;n < l.length;n++) {
      l[n] !== null && o.data("ec.storage." + l[n], o[0].style[l[n]])
    }
  }, restore:function(o, l) {
    for(var n = 0;n < l.length;n++) {
      l[n] !== null && o.css(l[n], o.data("ec.storage." + l[n]))
    }
  }, setMode:function(o, l) {
    if(l == "toggle") {
      l = o.is(":hidden") ? "show" : "hide"
    }return l
  }, getBaseline:function(o, l) {
    var n;
    switch(o[0]) {
      case "top":
        n = 0;
        break;
      case "middle":
        n = 0.5;
        break;
      case "bottom":
        n = 1;
        break;
      default:
        n = o[0] / l.height
    }
    switch(o[1]) {
      case "left":
        o = 0;
        break;
      case "center":
        o = 0.5;
        break;
      case "right":
        o = 1;
        break;
      default:
        o = o[1] / l.width
    }
    return{x:o, y:n}
  }, createWrapper:function(o) {
    if(o.parent().is(".ui-effects-wrapper")) {
      return o.parent()
    }var l = {width:o.outerWidth(true), height:o.outerHeight(true), "float":o.css("float")}, n = a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%", background:"transparent", border:"none", margin:0, padding:0});
    o.wrap(n);
    n = o.parent();
    if(o.css("position") == "static") {
      n.css({position:"relative"});
      o.css({position:"relative"})
    }else {
      a.extend(l, {position:o.css("position"), zIndex:o.css("z-index")});
      a.each(["top", "left", "bottom", "right"], function(p, r) {
        l[r] = o.css(r);
        if(isNaN(parseInt(l[r], 10))) {
          l[r] = "auto"
        }
      });
      o.css({position:"relative", top:0, left:0})
    }return n.css(l).show()
  }, removeWrapper:function(o) {
    if(o.parent().is(".ui-effects-wrapper")) {
      return o.parent().replaceWith(o)
    }return o
  }, setTransition:function(o, l, n, p) {
    p = p || {};
    a.each(l, function(r, s) {
      unit = o.cssUnit(s);
      if(unit[0] > 0) {
        p[s] = unit[0] * n + unit[1]
      }
    });
    return p
  }});
  a.fn.extend({effect:function(o) {
    var l = h.apply(this, arguments);
    l = {options:l[1], duration:l[2], callback:l[3]};
    var n = a.effects[o];
    return n && !a.fx.off ? n.call(this, l) : this
  }, _show:a.fn.show, show:function(o) {
    if(!o || typeof o == "number" || a.fx.speeds[o] || !a.effects[o]) {
      return this._show.apply(this, arguments)
    }else {
      var l = h.apply(this, arguments);
      l[1].mode = "show";
      return this.effect.apply(this, l)
    }
  }, _hide:a.fn.hide, hide:function(o) {
    if(!o || typeof o == "number" || a.fx.speeds[o] || !a.effects[o]) {
      return this._hide.apply(this, arguments)
    }else {
      var l = h.apply(this, arguments);
      l[1].mode = "hide";
      return this.effect.apply(this, l)
    }
  }, __toggle:a.fn.toggle, toggle:function(o) {
    if(!o || typeof o == "number" || a.fx.speeds[o] || !a.effects[o] || typeof o == "boolean" || a.isFunction(o)) {
      return this.__toggle.apply(this, arguments)
    }else {
      var l = h.apply(this, arguments);
      l[1].mode = "toggle";
      return this.effect.apply(this, l)
    }
  }, cssUnit:function(o) {
    var l = this.css(o), n = [];
    a.each(["em", "px", "%", "pt"], function(p, r) {
      if(l.indexOf(r) > 0) {
        n = [parseFloat(l), r]
      }
    });
    return n
  }});
  a.easing.jswing = a.easing.swing;
  a.extend(a.easing, {def:"easeOutQuad", swing:function(o, l, n, p, r) {
    return a.easing[a.easing.def](o, l, n, p, r)
  }, easeInQuad:function(o, l, n, p, r) {
    return p * (l /= r) * l + n
  }, easeOutQuad:function(o, l, n, p, r) {
    return-p * (l /= r) * (l - 2) + n
  }, easeInOutQuad:function(o, l, n, p, r) {
    if((l /= r / 2) < 1) {
      return p / 2 * l * l + n
    }return-p / 2 * (--l * (l - 2) - 1) + n
  }, easeInCubic:function(o, l, n, p, r) {
    return p * (l /= r) * l * l + n
  }, easeOutCubic:function(o, l, n, p, r) {
    return p * ((l = l / r - 1) * l * l + 1) + n
  }, easeInOutCubic:function(o, l, n, p, r) {
    if((l /= r / 2) < 1) {
      return p / 2 * l * l * l + n
    }return p / 2 * ((l -= 2) * l * l + 2) + n
  }, easeInQuart:function(o, l, n, p, r) {
    return p * (l /= r) * l * l * l + n
  }, easeOutQuart:function(o, l, n, p, r) {
    return-p * ((l = l / r - 1) * l * l * l - 1) + n
  }, easeInOutQuart:function(o, l, n, p, r) {
    if((l /= r / 2) < 1) {
      return p / 2 * l * l * l * l + n
    }return-p / 2 * ((l -= 2) * l * l * l - 2) + n
  }, easeInQuint:function(o, l, n, p, r) {
    return p * (l /= r) * l * l * l * l + n
  }, easeOutQuint:function(o, l, n, p, r) {
    return p * ((l = l / r - 1) * l * l * l * l + 1) + n
  }, easeInOutQuint:function(o, l, n, p, r) {
    if((l /= r / 2) < 1) {
      return p / 2 * l * l * l * l * l + n
    }return p / 2 * ((l -= 2) * l * l * l * l + 2) + n
  }, easeInSine:function(o, l, n, p, r) {
    return-p * Math.cos(l / r * (Math.PI / 2)) + p + n
  }, easeOutSine:function(o, l, n, p, r) {
    return p * Math.sin(l / r * (Math.PI / 2)) + n
  }, easeInOutSine:function(o, l, n, p, r) {
    return-p / 2 * (Math.cos(Math.PI * l / r) - 1) + n
  }, easeInExpo:function(o, l, n, p, r) {
    return l == 0 ? n : p * Math.pow(2, 10 * (l / r - 1)) + n
  }, easeOutExpo:function(o, l, n, p, r) {
    return l == r ? n + p : p * (-Math.pow(2, -10 * l / r) + 1) + n
  }, easeInOutExpo:function(o, l, n, p, r) {
    if(l == 0) {
      return n
    }if(l == r) {
      return n + p
    }if((l /= r / 2) < 1) {
      return p / 2 * Math.pow(2, 10 * (l - 1)) + n
    }return p / 2 * (-Math.pow(2, -10 * --l) + 2) + n
  }, easeInCirc:function(o, l, n, p, r) {
    return-p * (Math.sqrt(1 - (l /= r) * l) - 1) + n
  }, easeOutCirc:function(o, l, n, p, r) {
    return p * Math.sqrt(1 - (l = l / r - 1) * l) + n
  }, easeInOutCirc:function(o, l, n, p, r) {
    if((l /= r / 2) < 1) {
      return-p / 2 * (Math.sqrt(1 - l * l) - 1) + n
    }return p / 2 * (Math.sqrt(1 - (l -= 2) * l) + 1) + n
  }, easeInElastic:function(o, l, n, p, r) {
    var s = 0, u = p;
    if(l == 0) {
      return n
    }if((l /= r) == 1) {
      return n + p
    }s || (s = r * 0.3);
    if(u < Math.abs(p)) {
      u = p;
      o = s / 4
    }else {
      o = s / (2 * Math.PI) * Math.asin(p / u)
    }return-(u * Math.pow(2, 10 * (l -= 1)) * Math.sin((l * r - o) * 2 * Math.PI / s)) + n
  }, easeOutElastic:function(o, l, n, p, r) {
    var s = 0, u = p;
    if(l == 0) {
      return n
    }if((l /= r) == 1) {
      return n + p
    }s || (s = r * 0.3);
    if(u < Math.abs(p)) {
      u = p;
      o = s / 4
    }else {
      o = s / (2 * Math.PI) * Math.asin(p / u)
    }return u * Math.pow(2, -10 * l) * Math.sin((l * r - o) * 2 * Math.PI / s) + p + n
  }, easeInOutElastic:function(o, l, n, p, r) {
    var s = 0, u = p;
    if(l == 0) {
      return n
    }if((l /= r / 2) == 2) {
      return n + p
    }s || (s = r * 0.3 * 1.5);
    if(u < Math.abs(p)) {
      u = p;
      o = s / 4
    }else {
      o = s / (2 * Math.PI) * Math.asin(p / u)
    }if(l < 1) {
      return-0.5 * u * Math.pow(2, 10 * (l -= 1)) * Math.sin((l * r - o) * 2 * Math.PI / s) + n
    }return u * Math.pow(2, -10 * (l -= 1)) * Math.sin((l * r - o) * 2 * Math.PI / s) * 0.5 + p + n
  }, easeInBack:function(o, l, n, p, r, s) {
    if(s == c) {
      s = 1.70158
    }return p * (l /= r) * l * ((s + 1) * l - s) + n
  }, easeOutBack:function(o, l, n, p, r, s) {
    if(s == c) {
      s = 1.70158
    }return p * ((l = l / r - 1) * l * ((s + 1) * l + s) + 1) + n
  }, easeInOutBack:function(o, l, n, p, r, s) {
    if(s == c) {
      s = 1.70158
    }if((l /= r / 2) < 1) {
      return p / 2 * l * l * (((s *= 1.525) + 1) * l - s) + n
    }return p / 2 * ((l -= 2) * l * (((s *= 1.525) + 1) * l + s) + 2) + n
  }, easeInBounce:function(o, l, n, p, r) {
    return p - a.easing.easeOutBounce(o, r - l, 0, p, r) + n
  }, easeOutBounce:function(o, l, n, p, r) {
    return(l /= r) < 1 / 2.75 ? p * 7.5625 * l * l + n : l < 2 / 2.75 ? p * (7.5625 * (l -= 1.5 / 2.75) * l + 0.75) + n : l < 2.5 / 2.75 ? p * (7.5625 * (l -= 2.25 / 2.75) * l + 0.9375) + n : p * (7.5625 * (l -= 2.625 / 2.75) * l + 0.984375) + n
  }, easeInOutBounce:function(o, l, n, p, r) {
    if(l < r / 2) {
      return a.easing.easeInBounce(o, l * 2, 0, p, r) * 0.5 + n
    }return a.easing.easeOutBounce(o, l * 2 - r, 0, p, r) * 0.5 + p * 0.5 + n
  }})
}(jQuery);
(function(a) {
  a.effects.blind = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left"], g = a.effects.setMode(d, c.options.mode || "hide"), b = c.options.direction || "vertical";
      a.effects.save(d, e);
      d.show();
      var f = a.effects.createWrapper(d).css({overflow:"hidden"}), h = b == "vertical" ? "height" : "width";
      b = b == "vertical" ? f.height() : f.width();
      g == "show" && f.css(h, 0);
      var k = {};
      k[h] = g == "show" ? b : 0;
      f.animate(k, c.duration, c.options.easing, function() {
        g == "hide" && d.hide();
        a.effects.restore(d, e);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(d[0], arguments);
        d.dequeue()
      })
    })
  }
})(jQuery);
(function(a) {
  a.effects.bounce = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left"], g = a.effects.setMode(d, c.options.mode || "effect"), b = c.options.direction || "up", f = c.options.distance || 20, h = c.options.times || 5, k = c.duration || 250;
      /show|hide/.test(g) && e.push("opacity");
      a.effects.save(d, e);
      d.show();
      a.effects.createWrapper(d);
      var m = b == "up" || b == "down" ? "top" : "left";
      b = b == "up" || b == "left" ? "pos" : "neg";
      f = c.options.distance || (m == "top" ? d.outerHeight({margin:true}) / 3 : d.outerWidth({margin:true}) / 3);
      if(g == "show") {
        d.css("opacity", 0).css(m, b == "pos" ? -f : f)
      }if(g == "hide") {
        f /= h * 2
      }g != "hide" && h--;
      if(g == "show") {
        var q = {opacity:1};
        q[m] = (b == "pos" ? "+=" : "-=") + f;
        d.animate(q, k / 2, c.options.easing);
        f /= 2;
        h--
      }for(q = 0;q < h;q++) {
        var o = {}, l = {};
        o[m] = (b == "pos" ? "-=" : "+=") + f;
        l[m] = (b == "pos" ? "+=" : "-=") + f;
        d.animate(o, k / 2, c.options.easing).animate(l, k / 2, c.options.easing);
        f = g == "hide" ? f * 2 : f / 2
      }if(g == "hide") {
        q = {opacity:0};
        q[m] = (b == "pos" ? "-=" : "+=") + f;
        d.animate(q, k / 2, c.options.easing, function() {
          d.hide();
          a.effects.restore(d, e);
          a.effects.removeWrapper(d);
          c.callback && c.callback.apply(this, arguments)
        })
      }else {
        o = {};
        l = {};
        o[m] = (b == "pos" ? "-=" : "+=") + f;
        l[m] = (b == "pos" ? "+=" : "-=") + f;
        d.animate(o, k / 2, c.options.easing).animate(l, k / 2, c.options.easing, function() {
          a.effects.restore(d, e);
          a.effects.removeWrapper(d);
          c.callback && c.callback.apply(this, arguments)
        })
      }d.queue("fx", function() {
        d.dequeue()
      });
      d.dequeue()
    })
  }
})(jQuery);
(function(a) {
  a.effects.clip = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left", "height", "width"], g = a.effects.setMode(d, c.options.mode || "hide"), b = c.options.direction || "vertical";
      a.effects.save(d, e);
      d.show();
      var f = a.effects.createWrapper(d).css({overflow:"hidden"});
      f = d[0].tagName == "IMG" ? f : d;
      var h = {size:b == "vertical" ? "height" : "width", position:b == "vertical" ? "top" : "left"};
      b = b == "vertical" ? f.height() : f.width();
      if(g == "show") {
        f.css(h.size, 0);
        f.css(h.position, b / 2)
      }var k = {};
      k[h.size] = g == "show" ? b : 0;
      k[h.position] = g == "show" ? 0 : b / 2;
      f.animate(k, {queue:false, duration:c.duration, easing:c.options.easing, complete:function() {
        g == "hide" && d.hide();
        a.effects.restore(d, e);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(d[0], arguments);
        d.dequeue()
      }})
    })
  }
})(jQuery);
(function(a) {
  a.effects.drop = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left", "opacity"], g = a.effects.setMode(d, c.options.mode || "hide"), b = c.options.direction || "left";
      a.effects.save(d, e);
      d.show();
      a.effects.createWrapper(d);
      var f = b == "up" || b == "down" ? "top" : "left";
      b = b == "up" || b == "left" ? "pos" : "neg";
      var h = c.options.distance || (f == "top" ? d.outerHeight({margin:true}) / 2 : d.outerWidth({margin:true}) / 2);
      if(g == "show") {
        d.css("opacity", 0).css(f, b == "pos" ? -h : h)
      }var k = {opacity:g == "show" ? 1 : 0};
      k[f] = (g == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-=" : "+=") + h;
      d.animate(k, {queue:false, duration:c.duration, easing:c.options.easing, complete:function() {
        g == "hide" && d.hide();
        a.effects.restore(d, e);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(this, arguments);
        d.dequeue()
      }})
    })
  }
})(jQuery);
(function(a) {
  a.effects.explode = function(c) {
    return this.queue(function() {
      var d = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3, e = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
      c.options.mode = c.options.mode == "toggle" ? a(this).is(":visible") ? "hide" : "show" : c.options.mode;
      var g = a(this).show().css("visibility", "hidden"), b = g.offset();
      b.top -= parseInt(g.css("marginTop"), 10) || 0;
      b.left -= parseInt(g.css("marginLeft"), 10) || 0;
      for(var f = g.outerWidth(true), h = g.outerHeight(true), k = 0;k < d;k++) {
        for(var m = 0;m < e;m++) {
          g.clone().appendTo("body").wrap("<div></div>").css({position:"absolute", visibility:"visible", left:-m * (f / e), top:-k * (h / d)}).parent().addClass("ui-effects-explode").css({position:"absolute", overflow:"hidden", width:f / e, height:h / d, left:b.left + m * (f / e) + (c.options.mode == "show" ? (m - Math.floor(e / 2)) * (f / e) : 0), top:b.top + k * (h / d) + (c.options.mode == "show" ? (k - Math.floor(d / 2)) * (h / d) : 0), opacity:c.options.mode == "show" ? 0 : 1}).animate({left:b.left + 
          m * (f / e) + (c.options.mode == "show" ? 0 : (m - Math.floor(e / 2)) * (f / e)), top:b.top + k * (h / d) + (c.options.mode == "show" ? 0 : (k - Math.floor(d / 2)) * (h / d)), opacity:c.options.mode == "show" ? 1 : 0}, c.duration || 500)
        }
      }setTimeout(function() {
        c.options.mode == "show" ? g.css({visibility:"visible"}) : g.css({visibility:"visible"}).hide();
        c.callback && c.callback.apply(g[0]);
        g.dequeue();
        a("div.ui-effects-explode").remove()
      }, c.duration || 500)
    })
  }
})(jQuery);
(function(a) {
  a.effects.fade = function(c) {
    return this.queue(function() {
      var d = a(this), e = a.effects.setMode(d, c.options.mode || "hide");
      d.animate({opacity:e}, {queue:false, duration:c.duration, easing:c.options.easing, complete:function() {
        c.callback && c.callback.apply(this, arguments);
        d.dequeue()
      }})
    })
  }
})(jQuery);
(function(a) {
  a.effects.fold = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left"], g = a.effects.setMode(d, c.options.mode || "hide"), b = c.options.size || 15, f = !!c.options.horizFirst, h = c.duration ? c.duration / 2 : a.fx.speeds._default / 2;
      a.effects.save(d, e);
      d.show();
      var k = a.effects.createWrapper(d).css({overflow:"hidden"}), m = g == "show" != f, q = m ? ["width", "height"] : ["height", "width"];
      m = m ? [k.width(), k.height()] : [k.height(), k.width()];
      var o = /([0-9]+)%/.exec(b);
      if(o) {
        b = parseInt(o[1], 10) / 100 * m[g == "hide" ? 0 : 1]
      }if(g == "show") {
        k.css(f ? {height:0, width:b} : {height:b, width:0})
      }f = {};
      o = {};
      f[q[0]] = g == "show" ? m[0] : b;
      o[q[1]] = g == "show" ? m[1] : 0;
      k.animate(f, h, c.options.easing).animate(o, h, c.options.easing, function() {
        g == "hide" && d.hide();
        a.effects.restore(d, e);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(d[0], arguments);
        d.dequeue()
      })
    })
  }
})(jQuery);
(function(a) {
  a.effects.highlight = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["backgroundImage", "backgroundColor", "opacity"], g = a.effects.setMode(d, c.options.mode || "show"), b = {backgroundColor:d.css("backgroundColor")};
      if(g == "hide") {
        b.opacity = 0
      }a.effects.save(d, e);
      d.show().css({backgroundImage:"none", backgroundColor:c.options.color || "#ffff99"}).animate(b, {queue:false, duration:c.duration, easing:c.options.easing, complete:function() {
        g == "hide" && d.hide();
        a.effects.restore(d, e);
        g == "show" && !a.support.opacity && this.style.removeAttribute("filter");
        c.callback && c.callback.apply(this, arguments);
        d.dequeue()
      }})
    })
  }
})(jQuery);
(function(a) {
  a.effects.pulsate = function(c) {
    return this.queue(function() {
      var d = a(this), e = a.effects.setMode(d, c.options.mode || "show");
      times = (c.options.times || 5) * 2 - 1;
      duration = c.duration ? c.duration / 2 : a.fx.speeds._default / 2;
      isVisible = d.is(":visible");
      animateTo = 0;
      if(!isVisible) {
        d.css("opacity", 0).show();
        animateTo = 1
      }if(e == "hide" && isVisible || e == "show" && !isVisible) {
        times--
      }for(e = 0;e < times;e++) {
        d.animate({opacity:animateTo}, duration, c.options.easing);
        animateTo = (animateTo + 1) % 2
      }d.animate({opacity:animateTo}, duration, c.options.easing, function() {
        animateTo == 0 && d.hide();
        c.callback && c.callback.apply(this, arguments)
      });
      d.queue("fx", function() {
        d.dequeue()
      }).dequeue()
    })
  }
})(jQuery);
(function(a) {
  a.effects.puff = function(c) {
    return this.queue(function() {
      var d = a(this), e = a.effects.setMode(d, c.options.mode || "hide"), g = parseInt(c.options.percent, 10) || 150, b = g / 100, f = {height:d.height(), width:d.width()};
      a.extend(c.options, {fade:true, mode:e, percent:e == "hide" ? g : 100, from:e == "hide" ? f : {height:f.height * b, width:f.width * b}});
      d.effect("scale", c.options, c.duration, c.callback);
      d.dequeue()
    })
  };
  a.effects.scale = function(c) {
    return this.queue(function() {
      var d = a(this), e = a.extend(true, {}, c.options), g = a.effects.setMode(d, c.options.mode || "effect"), b = parseInt(c.options.percent, 10) || (parseInt(c.options.percent, 10) == 0 ? 0 : g == "hide" ? 0 : 100), f = c.options.direction || "both", h = c.options.origin;
      if(g != "effect") {
        e.origin = h || ["middle", "center"];
        e.restore = true
      }h = {height:d.height(), width:d.width()};
      d.from = c.options.from || (g == "show" ? {height:0, width:0} : h);
      b = {y:f != "horizontal" ? b / 100 : 1, x:f != "vertical" ? b / 100 : 1};
      d.to = {height:h.height * b.y, width:h.width * b.x};
      if(c.options.fade) {
        if(g == "show") {
          d.from.opacity = 0;
          d.to.opacity = 1
        }if(g == "hide") {
          d.from.opacity = 1;
          d.to.opacity = 0
        }
      }e.from = d.from;
      e.to = d.to;
      e.mode = g;
      d.effect("size", e, c.duration, c.callback);
      d.dequeue()
    })
  };
  a.effects.size = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left", "width", "height", "overflow", "opacity"], g = ["position", "top", "left", "overflow", "opacity"], b = ["width", "height", "overflow"], f = ["fontSize"], h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], k = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], m = a.effects.setMode(d, c.options.mode || "effect"), q = c.options.restore || false, o = c.options.scale || "both", l = c.options.origin, n = 
      {height:d.height(), width:d.width()};
      d.from = c.options.from || n;
      d.to = c.options.to || n;
      if(l) {
        l = a.effects.getBaseline(l, n);
        d.from.top = (n.height - d.from.height) * l.y;
        d.from.left = (n.width - d.from.width) * l.x;
        d.to.top = (n.height - d.to.height) * l.y;
        d.to.left = (n.width - d.to.width) * l.x
      }var p = {from:{y:d.from.height / n.height, x:d.from.width / n.width}, to:{y:d.to.height / n.height, x:d.to.width / n.width}};
      if(o == "box" || o == "both") {
        if(p.from.y != p.to.y) {
          e = e.concat(h);
          d.from = a.effects.setTransition(d, h, p.from.y, d.from);
          d.to = a.effects.setTransition(d, h, p.to.y, d.to)
        }if(p.from.x != p.to.x) {
          e = e.concat(k);
          d.from = a.effects.setTransition(d, k, p.from.x, d.from);
          d.to = a.effects.setTransition(d, k, p.to.x, d.to)
        }
      }if(o == "content" || o == "both") {
        if(p.from.y != p.to.y) {
          e = e.concat(f);
          d.from = a.effects.setTransition(d, f, p.from.y, d.from);
          d.to = a.effects.setTransition(d, f, p.to.y, d.to)
        }
      }a.effects.save(d, q ? e : g);
      d.show();
      a.effects.createWrapper(d);
      d.css("overflow", "hidden").css(d.from);
      if(o == "content" || o == "both") {
        h = h.concat(["marginTop", "marginBottom"]).concat(f);
        k = k.concat(["marginLeft", "marginRight"]);
        b = e.concat(h).concat(k);
        d.find("*[width]").each(function() {
          child = a(this);
          q && a.effects.save(child, b);
          var r = {height:child.height(), width:child.width()};
          child.from = {height:r.height * p.from.y, width:r.width * p.from.x};
          child.to = {height:r.height * p.to.y, width:r.width * p.to.x};
          if(p.from.y != p.to.y) {
            child.from = a.effects.setTransition(child, h, p.from.y, child.from);
            child.to = a.effects.setTransition(child, h, p.to.y, child.to)
          }if(p.from.x != p.to.x) {
            child.from = a.effects.setTransition(child, k, p.from.x, child.from);
            child.to = a.effects.setTransition(child, k, p.to.x, child.to)
          }child.css(child.from);
          child.animate(child.to, c.duration, c.options.easing, function() {
            q && a.effects.restore(child, b)
          })
        })
      }d.animate(d.to, {queue:false, duration:c.duration, easing:c.options.easing, complete:function() {
        d.to.opacity === 0 && d.css("opacity", d.from.opacity);
        m == "hide" && d.hide();
        a.effects.restore(d, q ? e : g);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(this, arguments);
        d.dequeue()
      }})
    })
  }
})(jQuery);
(function(a) {
  a.effects.shake = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left"];
      a.effects.setMode(d, c.options.mode || "effect");
      var g = c.options.direction || "left", b = c.options.distance || 20, f = c.options.times || 3, h = c.duration || c.options.duration || 140;
      a.effects.save(d, e);
      d.show();
      a.effects.createWrapper(d);
      var k = g == "up" || g == "down" ? "top" : "left", m = g == "up" || g == "left" ? "pos" : "neg";
      g = {};
      var q = {}, o = {};
      g[k] = (m == "pos" ? "-=" : "+=") + b;
      q[k] = (m == "pos" ? "+=" : "-=") + b * 2;
      o[k] = (m == "pos" ? "-=" : "+=") + b * 2;
      d.animate(g, h, c.options.easing);
      for(b = 1;b < f;b++) {
        d.animate(q, h, c.options.easing).animate(o, h, c.options.easing)
      }d.animate(q, h, c.options.easing).animate(g, h / 2, c.options.easing, function() {
        a.effects.restore(d, e);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(this, arguments)
      });
      d.queue("fx", function() {
        d.dequeue()
      });
      d.dequeue()
    })
  }
})(jQuery);
(function(a) {
  a.effects.slide = function(c) {
    return this.queue(function() {
      var d = a(this), e = ["position", "top", "left"], g = a.effects.setMode(d, c.options.mode || "show"), b = c.options.direction || "left";
      a.effects.save(d, e);
      d.show();
      a.effects.createWrapper(d).css({overflow:"hidden"});
      var f = b == "up" || b == "down" ? "top" : "left";
      b = b == "up" || b == "left" ? "pos" : "neg";
      var h = c.options.distance || (f == "top" ? d.outerHeight({margin:true}) : d.outerWidth({margin:true}));
      if(g == "show") {
        d.css(f, b == "pos" ? -h : h)
      }var k = {};
      k[f] = (g == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-=" : "+=") + h;
      d.animate(k, {queue:false, duration:c.duration, easing:c.options.easing, complete:function() {
        g == "hide" && d.hide();
        a.effects.restore(d, e);
        a.effects.removeWrapper(d);
        c.callback && c.callback.apply(this, arguments);
        d.dequeue()
      }})
    })
  }
})(jQuery);
(function(a) {
  a.effects.transfer = function(c) {
    return this.queue(function() {
      var d = a(this), e = a(c.options.to), g = e.offset();
      e = {top:g.top, left:g.left, height:e.innerHeight(), width:e.innerWidth()};
      g = d.offset();
      var b = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({top:g.top, left:g.left, height:d.innerHeight(), width:d.innerWidth(), position:"absolute"}).animate(e, c.duration, c.options.easing, function() {
        b.remove();
        c.callback && c.callback.apply(d[0], arguments);
        d.dequeue()
      })
    })
  }
})(jQuery);
(function(a) {
  a.widget("ui.accordion", {options:{active:0, animated:"slide", autoHeight:true, clearStyle:false, collapsible:false, event:"click", fillSpace:false, header:"> li > :first-child,> :not(li):even", icons:{header:"ui-icon-triangle-1-e", headerSelected:"ui-icon-triangle-1-s"}, navigation:false, navigationFilter:function() {
    return this.href.toLowerCase() === location.href.toLowerCase()
  }}, _create:function() {
    var c = this, d = c.options;
    c.running = 0;
    c.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
    c.headers = c.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
      d.disabled || a(this).addClass("ui-state-hover")
    }).bind("mouseleave.accordion", function() {
      d.disabled || a(this).removeClass("ui-state-hover")
    }).bind("focus.accordion", function() {
      d.disabled || a(this).addClass("ui-state-focus")
    }).bind("blur.accordion", function() {
      d.disabled || a(this).removeClass("ui-state-focus")
    });
    c.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
    if(d.navigation) {
      var e = c.element.find("a").filter(d.navigationFilter).eq(0);
      if(e.length) {
        var g = e.closest(".ui-accordion-header");
        c.active = g.length ? g : e.closest(".ui-accordion-content").prev()
      }
    }c.active = c._findActive(c.active || d.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all ui-corner-top");
    c.active.next().addClass("ui-accordion-content-active");
    c._createIcons();
    c.resize();
    c.element.attr("role", "tablist");
    c.headers.attr("role", "tab").bind("keydown.accordion", function(b) {
      return c._keydown(b)
    }).next().attr("role", "tabpanel");
    c.headers.not(c.active || "").attr({"aria-expanded":"false", tabIndex:-1}).next().hide();
    c.active.length ? c.active.attr({"aria-expanded":"true", tabIndex:0}) : c.headers.eq(0).attr("tabIndex", 0);
    a.browser.safari || c.headers.find("a").attr("tabIndex", -1);
    d.event && c.headers.bind(d.event.split(" ").join(".accordion ") + ".accordion", function(b) {
      c._clickHandler.call(c, b, this);
      b.preventDefault()
    })
  }, _createIcons:function() {
    var c = this.options;
    if(c.icons) {
      a("<span></span>").addClass("ui-icon " + c.icons.header).prependTo(this.headers);
      this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
      this.element.addClass("ui-accordion-icons")
    }
  }, _destroyIcons:function() {
    this.headers.children(".ui-icon").remove();
    this.element.removeClass("ui-accordion-icons")
  }, destroy:function() {
    var c = this.options;
    this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
    this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
    this.headers.find("a").removeAttr("tabIndex");
    this._destroyIcons();
    var d = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
    if(c.autoHeight || c.fillHeight) {
      d.css("height", "")
    }return a.Widget.prototype.destroy.call(this)
  }, _setOption:function(c, d) {
    a.Widget.prototype._setOption.apply(this, arguments);
    c == "active" && this.activate(d);
    if(c == "icons") {
      this._destroyIcons();
      d && this._createIcons()
    }if(c == "disabled") {
      this.headers.add(this.headers.next())[d ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
    }
  }, _keydown:function(c) {
    if(!(this.options.disabled || c.altKey || c.ctrlKey)) {
      var d = a.ui.keyCode, e = this.headers.length, g = this.headers.index(c.target), b = false;
      switch(c.keyCode) {
        case d.RIGHT:
        ;
        case d.DOWN:
          b = this.headers[(g + 1) % e];
          break;
        case d.LEFT:
        ;
        case d.UP:
          b = this.headers[(g - 1 + e) % e];
          break;
        case d.SPACE:
        ;
        case d.ENTER:
          this._clickHandler({target:c.target}, c.target);
          c.preventDefault()
      }
      if(b) {
        a(c.target).attr("tabIndex", -1);
        a(b).attr("tabIndex", 0);
        b.focus();
        return false
      }return true
    }
  }, resize:function() {
    var c = this.options, d;
    if(c.fillSpace) {
      if(a.browser.msie) {
        var e = this.element.parent().css("overflow");
        this.element.parent().css("overflow", "hidden")
      }d = this.element.parent().height();
      a.browser.msie && this.element.parent().css("overflow", e);
      this.headers.each(function() {
        d -= a(this).outerHeight(true)
      });
      this.headers.next().each(function() {
        a(this).height(Math.max(0, d - a(this).innerHeight() + a(this).height()))
      }).css("overflow", "auto")
    }else {
      if(c.autoHeight) {
        d = 0;
        this.headers.next().each(function() {
          d = Math.max(d, a(this).height("").height())
        }).height(d)
      }
    }return this
  }, activate:function(c) {
    this.options.active = c;
    c = this._findActive(c)[0];
    this._clickHandler({target:c}, c);
    return this
  }, _findActive:function(c) {
    return c ? typeof c === "number" ? this.headers.filter(":eq(" + c + ")") : this.headers.not(this.headers.not(c)) : c === false ? a([]) : this.headers.filter(":eq(0)")
  }, _clickHandler:function(c, d) {
    var e = this.options;
    if(!e.disabled) {
      if(c.target) {
        c = a(c.currentTarget || d);
        d = c[0] === this.active[0];
        e.active = e.collapsible && d ? false : this.headers.index(c);
        if(!(this.running || !e.collapsible && d)) {
          this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
          if(!d) {
            c.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(e.icons.header).addClass(e.icons.headerSelected);
            c.next().addClass("ui-accordion-content-active")
          }f = c.next();
          g = this.active.next();
          b = {options:e, newHeader:d && e.collapsible ? a([]) : c, oldHeader:this.active, newContent:d && e.collapsible ? a([]) : f, oldContent:g};
          e = this.headers.index(this.active[0]) > this.headers.index(c[0]);
          this.active = d ? a([]) : c;
          this._toggle(f, g, b, d, e)
        }
      }else {
        if(e.collapsible) {
          this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
          this.active.next().addClass("ui-accordion-content-active");
          var g = this.active.next(), b = {options:e, newHeader:a([]), oldHeader:e.active, newContent:a([]), oldContent:g}, f = this.active = a([]);
          this._toggle(f, g, b)
        }
      }
    }
  }, _toggle:function(c, d, e, g, b) {
    var f = this, h = f.options;
    f.toShow = c;
    f.toHide = d;
    f.data = e;
    var k = function() {
      if(f) {
        return f._completed.apply(f, arguments)
      }
    };
    f._trigger("changestart", null, f.data);
    f.running = d.size() === 0 ? c.size() : d.size();
    if(h.animated) {
      e = {};
      e = h.collapsible && g ? {toShow:a([]), toHide:d, complete:k, down:b, autoHeight:h.autoHeight || h.fillSpace} : {toShow:c, toHide:d, complete:k, down:b, autoHeight:h.autoHeight || h.fillSpace};
      if(!h.proxied) {
        h.proxied = h.animated
      }if(!h.proxiedDuration) {
        h.proxiedDuration = h.duration
      }h.animated = a.isFunction(h.proxied) ? h.proxied(e) : h.proxied;
      h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(e) : h.proxiedDuration;
      g = a.ui.accordion.animations;
      var m = h.duration, q = h.animated;
      if(q && !g[q] && !a.easing[q]) {
        q = "slide"
      }g[q] || (g[q] = function(o) {
        this.slide(o, {easing:q, duration:m || 700})
      });
      g[q](e)
    }else {
      if(h.collapsible && g) {
        c.toggle()
      }else {
        d.hide();
        c.show()
      }k(true)
    }d.prev().attr({"aria-expanded":"false", tabIndex:-1}).blur();
    c.prev().attr({"aria-expanded":"true", tabIndex:0}).focus()
  }, _completed:function(c) {
    this.running = c ? 0 : --this.running;
    if(!this.running) {
      this.options.clearStyle && this.toShow.add(this.toHide).css({height:"", overflow:""});
      this.toHide.removeClass("ui-accordion-content-active");
      this._trigger("change", null, this.data)
    }
  }});
  a.extend(a.ui.accordion, {version:"1.8.5", animations:{slide:function(c, d) {
    c = a.extend({easing:"swing", duration:300}, c, d);
    if(c.toHide.size()) {
      if(c.toShow.size()) {
        var e = c.toShow.css("overflow"), g = 0, b = {}, f = {}, h;
        d = c.toShow;
        h = d[0].style.width;
        d.width(parseInt(d.parent().width(), 10) - parseInt(d.css("paddingLeft"), 10) - parseInt(d.css("paddingRight"), 10) - (parseInt(d.css("borderLeftWidth"), 10) || 0) - (parseInt(d.css("borderRightWidth"), 10) || 0));
        a.each(["height", "paddingTop", "paddingBottom"], function(k, m) {
          f[m] = "hide";
          k = ("" + a.css(c.toShow[0], m)).match(/^([\d+-.]+)(.*)$/);
          b[m] = {value:k[1], unit:k[2] || "px"}
        });
        c.toShow.css({height:0, overflow:"hidden"}).show();
        c.toHide.filter(":hidden").each(c.complete).end().filter(":visible").animate(f, {step:function(k, m) {
          if(m.prop == "height") {
            g = m.end - m.start === 0 ? 0 : (m.now - m.start) / (m.end - m.start)
          }c.toShow[0].style[m.prop] = g * b[m.prop].value + b[m.prop].unit
        }, duration:c.duration, easing:c.easing, complete:function() {
          c.autoHeight || c.toShow.css("height", "");
          c.toShow.css({width:h, overflow:e});
          c.complete()
        }})
      }else {
        c.toHide.animate({height:"hide", paddingTop:"hide", paddingBottom:"hide"}, c)
      }
    }else {
      c.toShow.animate({height:"show", paddingTop:"show", paddingBottom:"show"}, c)
    }
  }, bounceslide:function(c) {
    this.slide(c, {easing:c.down ? "easeOutBounce" : "swing", duration:c.down ? 1E3 : 200})
  }}})
})(jQuery);
(function(a) {
  a.widget("ui.autocomplete", {options:{appendTo:"body", delay:300, minLength:1, position:{my:"left top", at:"left bottom", collision:"none"}, source:null}, _create:function() {
    var c = this, d = this.element[0].ownerDocument;
    this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({role:"textbox", "aria-autocomplete":"list", "aria-haspopup":"true"}).bind("keydown.autocomplete", function(e) {
      if(!c.options.disabled) {
        var g = a.ui.keyCode;
        switch(e.keyCode) {
          case g.PAGE_UP:
            c._move("previousPage", e);
            break;
          case g.PAGE_DOWN:
            c._move("nextPage", e);
            break;
          case g.UP:
            c._move("previous", e);
            e.preventDefault();
            break;
          case g.DOWN:
            c._move("next", e);
            e.preventDefault();
            break;
          case g.ENTER:
          ;
          case g.NUMPAD_ENTER:
            c.menu.element.is(":visible") && e.preventDefault();
          case g.TAB:
            if(!c.menu.active) {
              return
            }c.menu.select(e);
            break;
          case g.ESCAPE:
            c.element.val(c.term);
            c.close(e);
            break;
          default:
            clearTimeout(c.searching);
            c.searching = setTimeout(function() {
              if(c.term != c.element.val()) {
                c.selectedItem = null;
                c.search(null, e)
              }
            }, c.options.delay);
            break
        }
      }
    }).bind("focus.autocomplete", function() {
      if(!c.options.disabled) {
        c.selectedItem = null;
        c.previous = c.element.val()
      }
    }).bind("blur.autocomplete", function(e) {
      if(!c.options.disabled) {
        clearTimeout(c.searching);
        c.closing = setTimeout(function() {
          c.close(e);
          c._change(e)
        }, 150)
      }
    });
    this._initSource();
    this.response = function() {
      return c._response.apply(c, arguments)
    };
    this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", d)[0]).mousedown(function(e) {
      var g = c.menu.element[0];
      e.target === g && setTimeout(function() {
        a(document).one("mousedown", function(b) {
          b.target !== c.element[0] && b.target !== g && !a.ui.contains(g, b.target) && c.close()
        })
      }, 1);
      setTimeout(function() {
        clearTimeout(c.closing)
      }, 13)
    }).menu({focus:function(e, g) {
      g = g.item.data("item.autocomplete");
      false !== c._trigger("focus", null, {item:g}) && /^key/.test(e.originalEvent.type) && c.element.val(g.value)
    }, selected:function(e, g) {
      g = g.item.data("item.autocomplete");
      var b = c.previous;
      if(c.element[0] !== d.activeElement) {
        c.element.focus();
        c.previous = b
      }if(false !== c._trigger("select", e, {item:g})) {
        c.term = g.value;
        c.element.val(g.value)
      }c.close(e);
      c.selectedItem = g
    }, blur:function() {
      c.menu.element.is(":visible") && c.element.val() !== c.term && c.element.val(c.term)
    }}).zIndex(this.element.zIndex() + 1).css({top:0, left:0}).hide().data("menu");
    a.fn.bgiframe && this.menu.element.bgiframe()
  }, destroy:function() {
    this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
    this.menu.element.remove();
    a.Widget.prototype.destroy.call(this)
  }, _setOption:function(c, d) {
    a.Widget.prototype._setOption.apply(this, arguments);
    c === "source" && this._initSource();
    if(c === "appendTo") {
      this.menu.element.appendTo(a(d || "body", this.element[0].ownerDocument)[0])
    }
  }, _initSource:function() {
    var c = this, d, e;
    if(a.isArray(this.options.source)) {
      d = this.options.source;
      this.source = function(g, b) {
        b(a.ui.autocomplete.filter(d, g.term))
      }
    }else {
      if(typeof this.options.source === "string") {
        e = this.options.source;
        this.source = function(g, b) {
          c.xhr && c.xhr.abort();
          c.xhr = a.getJSON(e, g, function(f, h, k) {
            k === c.xhr && b(f);
            c.xhr = null
          })
        }
      }else {
        this.source = this.options.source
      }
    }
  }, search:function(c, d) {
    c = c != null ? c : this.element.val();
    this.term = this.element.val();
    if(c.length < this.options.minLength) {
      return this.close(d)
    }clearTimeout(this.closing);
    if(this._trigger("search") !== false) {
      return this._search(c)
    }
  }, _search:function(c) {
    this.element.addClass("ui-autocomplete-loading");
    this.source({term:c}, this.response)
  }, _response:function(c) {
    if(c.length) {
      c = this._normalize(c);
      this._suggest(c);
      this._trigger("open")
    }else {
      this.close()
    }this.element.removeClass("ui-autocomplete-loading")
  }, close:function(c) {
    clearTimeout(this.closing);
    if(this.menu.element.is(":visible")) {
      this._trigger("close", c);
      this.menu.element.hide();
      this.menu.deactivate()
    }
  }, _change:function(c) {
    this.previous !== this.element.val() && this._trigger("change", c, {item:this.selectedItem})
  }, _normalize:function(c) {
    if(c.length && c[0].label && c[0].value) {
      return c
    }return a.map(c, function(d) {
      if(typeof d === "string") {
        return{label:d, value:d}
      }return a.extend({label:d.label || d.value, value:d.value || d.label}, d)
    })
  }, _suggest:function(c) {
    var d = this.menu.element.empty().zIndex(this.element.zIndex() + 1), e;
    this._renderMenu(d, c);
    this.menu.deactivate();
    this.menu.refresh();
    this.menu.element.show().position(a.extend({of:this.element}, this.options.position));
    c = d.width("").outerWidth();
    e = this.element.outerWidth();
    d.outerWidth(Math.max(c, e))
  }, _renderMenu:function(c, d) {
    var e = this;
    a.each(d, function(g, b) {
      e._renderItem(c, b)
    })
  }, _renderItem:function(c, d) {
    return a("<li></li>").data("item.autocomplete", d).append(a("<a></a>").text(d.label)).appendTo(c)
  }, _move:function(c, d) {
    if(this.menu.element.is(":visible")) {
      if(this.menu.first() && /^previous/.test(c) || this.menu.last() && /^next/.test(c)) {
        this.element.val(this.term);
        this.menu.deactivate()
      }else {
        this.menu[c](d)
      }
    }else {
      this.search(null, d)
    }
  }, widget:function() {
    return this.menu.element
  }});
  a.extend(a.ui.autocomplete, {escapeRegex:function(c) {
    return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  }, filter:function(c, d) {
    var e = new RegExp(a.ui.autocomplete.escapeRegex(d), "i");
    return a.grep(c, function(g) {
      return e.test(g.label || g.value || g)
    })
  }})
})(jQuery);
(function(a) {
  a.widget("ui.menu", {_create:function() {
    var c = this;
    this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox", "aria-activedescendant":"ui-active-menuitem"}).click(function(d) {
      if(a(d.target).closest(".ui-menu-item a").length) {
        d.preventDefault();
        c.select(d)
      }
    });
    this.refresh()
  }, refresh:function() {
    var c = this;
    this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(d) {
      c.activate(d, a(this).parent())
    }).mouseleave(function() {
      c.deactivate()
    })
  }, activate:function(c, d) {
    this.deactivate();
    if(this.hasScroll()) {
      var e = d.offset().top - this.element.offset().top, g = this.element.attr("scrollTop"), b = this.element.height();
      if(e < 0) {
        this.element.attr("scrollTop", g + e)
      }else {
        e >= b && this.element.attr("scrollTop", g + e - b + d.height())
      }
    }this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
    this._trigger("focus", c, {item:d})
  }, deactivate:function() {
    if(this.active) {
      this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
      this._trigger("blur");
      this.active = null
    }
  }, next:function(c) {
    this.move("next", ".ui-menu-item:first", c)
  }, previous:function(c) {
    this.move("prev", ".ui-menu-item:last", c)
  }, first:function() {
    return this.active && !this.active.prevAll(".ui-menu-item").length
  }, last:function() {
    return this.active && !this.active.nextAll(".ui-menu-item").length
  }, move:function(c, d, e) {
    if(this.active) {
      c = this.active[c + "All"](".ui-menu-item").eq(0);
      c.length ? this.activate(e, c) : this.activate(e, this.element.children(d))
    }else {
      this.activate(e, this.element.children(d))
    }
  }, nextPage:function(c) {
    if(this.hasScroll()) {
      if(!this.active || this.last()) {
        this.activate(c, this.element.children(":first"))
      }else {
        var d = this.active.offset().top, e = this.element.height(), g = this.element.children("li").filter(function() {
          var b = a(this).offset().top - d - e + a(this).height();
          return b < 10 && b > -10
        });
        g.length || (g = this.element.children(":last"));
        this.activate(c, g)
      }
    }else {
      this.activate(c, this.element.children(!this.active || this.last() ? ":first" : ":last"))
    }
  }, previousPage:function(c) {
    if(this.hasScroll()) {
      if(!this.active || this.first()) {
        this.activate(c, this.element.children(":last"))
      }else {
        var d = this.active.offset().top, e = this.element.height();
        result = this.element.children("li").filter(function() {
          var g = a(this).offset().top - d + e - a(this).height();
          return g < 10 && g > -10
        });
        result.length || (result = this.element.children(":first"));
        this.activate(c, result)
      }
    }else {
      this.activate(c, this.element.children(!this.active || this.first() ? ":last" : ":first"))
    }
  }, hasScroll:function() {
    return this.element.height() < this.element.attr("scrollHeight")
  }, select:function(c) {
    this._trigger("selected", c, {item:this.active})
  }})
})(jQuery);
(function(a) {
  var c, d = function(g) {
    a(":ui-button", g.target.form).each(function() {
      var b = a(this).data("button");
      setTimeout(function() {
        b.refresh()
      }, 1)
    })
  }, e = function(g) {
    var b = g.name, f = g.form, h = a([]);
    if(b) {
      h = f ? a(f).find("[name='" + b + "']") : a("[name='" + b + "']", g.ownerDocument).filter(function() {
        return!this.form
      })
    }return h
  };
  a.widget("ui.button", {options:{disabled:null, text:true, label:null, icons:{primary:null, secondary:null}}, _create:function() {
    this.element.closest("form").unbind("reset.button").bind("reset.button", d);
    if(typeof this.options.disabled !== "boolean") {
      this.options.disabled = this.element.attr("disabled")
    }this._determineButtonType();
    this.hasTitle = !!this.buttonElement.attr("title");
    var g = this, b = this.options, f = this.type === "checkbox" || this.type === "radio", h = "ui-state-hover" + (!f ? " ui-state-active" : "");
    if(b.label === null) {
      b.label = this.buttonElement.html()
    }if(this.element.is(":disabled")) {
      b.disabled = true
    }this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function() {
      if(!b.disabled) {
        a(this).addClass("ui-state-hover");
        this === c && a(this).addClass("ui-state-active")
      }
    }).bind("mouseleave.button", function() {
      b.disabled || a(this).removeClass(h)
    }).bind("focus.button", function() {
      a(this).addClass("ui-state-focus")
    }).bind("blur.button", function() {
      a(this).removeClass("ui-state-focus")
    });
    f && this.element.bind("change.button", function() {
      g.refresh()
    });
    if(this.type === "checkbox") {
      this.buttonElement.bind("click.button", function() {
        if(b.disabled) {
          return false
        }a(this).toggleClass("ui-state-active");
        g.buttonElement.attr("aria-pressed", g.element[0].checked)
      })
    }else {
      if(this.type === "radio") {
        this.buttonElement.bind("click.button", function() {
          if(b.disabled) {
            return false
          }a(this).addClass("ui-state-active");
          g.buttonElement.attr("aria-pressed", true);
          var k = g.element[0];
          e(k).not(k).map(function() {
            return a(this).button("widget")[0]
          }).removeClass("ui-state-active").attr("aria-pressed", false)
        })
      }else {
        this.buttonElement.bind("mousedown.button", function() {
          if(b.disabled) {
            return false
          }a(this).addClass("ui-state-active");
          c = this;
          a(document).one("mouseup", function() {
            c = null
          })
        }).bind("mouseup.button", function() {
          if(b.disabled) {
            return false
          }a(this).removeClass("ui-state-active")
        }).bind("keydown.button", function(k) {
          if(b.disabled) {
            return false
          }if(k.keyCode == a.ui.keyCode.SPACE || k.keyCode == a.ui.keyCode.ENTER) {
            a(this).addClass("ui-state-active")
          }
        }).bind("keyup.button", function() {
          a(this).removeClass("ui-state-active")
        });
        this.buttonElement.is("a") && this.buttonElement.keyup(function(k) {
          k.keyCode === a.ui.keyCode.SPACE && a(this).click()
        })
      }
    }this._setOption("disabled", b.disabled)
  }, _determineButtonType:function() {
    this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
    if(this.type === "checkbox" || this.type === "radio") {
      this.buttonElement = this.element.parents().last().find("label[for=" + this.element.attr("id") + "]");
      this.element.addClass("ui-helper-hidden-accessible");
      var g = this.element.is(":checked");
      g && this.buttonElement.addClass("ui-state-active");
      this.buttonElement.attr("aria-pressed", g)
    }else {
      this.buttonElement = this.element
    }
  }, widget:function() {
    return this.buttonElement
  }, destroy:function() {
    this.element.removeClass("ui-helper-hidden-accessible");
    this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
    this.hasTitle || this.buttonElement.removeAttr("title");
    a.Widget.prototype.destroy.call(this)
  }, _setOption:function(g, b) {
    a.Widget.prototype._setOption.apply(this, arguments);
    if(g === "disabled") {
      b ? this.element.attr("disabled", true) : this.element.removeAttr("disabled")
    }this._resetButton()
  }, refresh:function() {
    var g = this.element.is(":disabled");
    g !== this.options.disabled && this._setOption("disabled", g);
    if(this.type === "radio") {
      e(this.element[0]).each(function() {
        a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true) : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
      })
    }else {
      if(this.type === "checkbox") {
        this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true) : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
      }
    }
  }, _resetButton:function() {
    if(this.type === "input") {
      this.options.label && this.element.val(this.options.label)
    }else {
      var g = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"), b = a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(g.empty()).text(), f = this.options.icons, h = f.primary && f.secondary;
      if(f.primary || f.secondary) {
        g.addClass("ui-button-text-icon" + (h ? "s" : f.primary ? "-primary" : "-secondary"));
        f.primary && g.prepend("<span class='ui-button-icon-primary ui-icon " + f.primary + "'></span>");
        f.secondary && g.append("<span class='ui-button-icon-secondary ui-icon " + f.secondary + "'></span>");
        if(!this.options.text) {
          g.addClass(h ? "ui-button-icons-only" : "ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
          this.hasTitle || g.attr("title", b)
        }
      }else {
        g.addClass("ui-button-text-only")
      }
    }
  }});
  a.widget("ui.buttonset", {_create:function() {
    this.element.addClass("ui-buttonset");
    this._init()
  }, _init:function() {
    this.refresh()
  }, _setOption:function(g, b) {
    g === "disabled" && this.buttons.button("option", g, b);
    a.Widget.prototype._setOption.apply(this, arguments)
  }, refresh:function() {
    this.buttons = this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
      return a(this).button("widget")[0]
    }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":visible").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end().end()
  }, destroy:function() {
    this.element.removeClass("ui-buttonset");
    this.buttons.map(function() {
      return a(this).button("widget")[0]
    }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
    a.Widget.prototype.destroy.call(this)
  }})
})(jQuery);
(function(a, c) {
  function d() {
    this.debug = false;
    this._curInst = null;
    this._keyEvent = false;
    this._disabledInputs = [];
    this._inDialog = this._datepickerShowing = false;
    this._mainDivId = "ui-datepicker-div";
    this._inlineClass = "ui-datepicker-inline";
    this._appendClass = "ui-datepicker-append";
    this._triggerClass = "ui-datepicker-trigger";
    this._dialogClass = "ui-datepicker-dialog";
    this._disableClass = "ui-datepicker-disabled";
    this._unselectableClass = "ui-datepicker-unselectable";
    this._currentClass = "ui-datepicker-current-day";
    this._dayOverClass = "ui-datepicker-days-cell-over";
    this.regional = [];
    this.regional[""] = {closeText:"Done", prevText:"Prev", nextText:"Next", currentText:"Today", monthNames:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin:["Su", 
    "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader:"Wk", dateFormat:"mm/dd/yy", firstDay:0, isRTL:false, showMonthAfterYear:false, yearSuffix:""};
    this._defaults = {showOn:"focus", showAnim:"fadeIn", showOptions:{}, defaultDate:null, appendText:"", buttonText:"...", buttonImage:"", buttonImageOnly:false, hideIfNoPrevNext:false, navigationAsDateFormat:false, gotoCurrent:false, changeMonth:false, changeYear:false, yearRange:"c-10:c+10", showOtherMonths:false, selectOtherMonths:false, showWeek:false, calculateWeek:this.iso8601Week, shortYearCutoff:"+10", minDate:null, maxDate:null, duration:"fast", beforeShowDay:null, beforeShow:null, onSelect:null, 
    onChangeMonthYear:null, onClose:null, numberOfMonths:1, showCurrentAtPos:0, stepMonths:1, stepBigMonths:12, altField:"", altFormat:"", constrainInput:true, showButtonPanel:false, autoSize:false};
    a.extend(this._defaults, this.regional[""]);
    this.dpDiv = a('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
  }
  function e(b, f) {
    a.extend(b, f);
    for(var h in f) {
      if(f[h] == null || f[h] == c) {
        b[h] = f[h]
      }
    }return b
  }
  a.extend(a.ui, {datepicker:{version:"1.8.5"}});
  var g = (new Date).getTime();
  a.extend(d.prototype, {markerClassName:"hasDatepicker", log:function() {
    this.debug && console.log.apply("", arguments)
  }, _widgetDatepicker:function() {
    return this.dpDiv
  }, setDefaults:function(b) {
    e(this._defaults, b || {});
    return this
  }, _attachDatepicker:function(b, f) {
    var h = null;
    for(var k in this._defaults) {
      var m = b.getAttribute("date:" + k);
      if(m) {
        h = h || {};
        try {
          h[k] = eval(m)
        }catch(q) {
          h[k] = m
        }
      }
    }k = b.nodeName.toLowerCase();
    m = k == "div" || k == "span";
    if(!b.id) {
      this.uuid += 1;
      b.id = "dp" + this.uuid
    }var o = this._newInst(a(b), m);
    o.settings = a.extend({}, f || {}, h || {});
    if(k == "input") {
      this._connectDatepicker(b, o)
    }else {
      m && this._inlineDatepicker(b, o)
    }
  }, _newInst:function(b, f) {
    return{id:b[0].id.replace(/([^A-Za-z0-9_])/g, "\\\\$1"), input:b, selectedDay:0, selectedMonth:0, selectedYear:0, drawMonth:0, drawYear:0, inline:f, dpDiv:!f ? this.dpDiv : a('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}
  }, _connectDatepicker:function(b, f) {
    var h = a(b);
    f.append = a([]);
    f.trigger = a([]);
    if(!h.hasClass(this.markerClassName)) {
      this._attachments(h, f);
      h.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(k, m, q) {
        f.settings[m] = q
      }).bind("getData.datepicker", function(k, m) {
        return this._get(f, m)
      });
      this._autoSize(f);
      a.data(b, "datepicker", f)
    }
  }, _attachments:function(b, f) {
    var h = this._get(f, "appendText"), k = this._get(f, "isRTL");
    f.append && f.append.remove();
    if(h) {
      f.append = a('<span class="' + this._appendClass + '">' + h + "</span>");
      b[k ? "before" : "after"](f.append)
    }b.unbind("focus", this._showDatepicker);
    f.trigger && f.trigger.remove();
    h = this._get(f, "showOn");
    if(h == "focus" || h == "both") {
      b.focus(this._showDatepicker)
    }if(h == "button" || h == "both") {
      h = this._get(f, "buttonText");
      var m = this._get(f, "buttonImage");
      f.trigger = a(this._get(f, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({src:m, alt:h, title:h}) : a('<button type="button"></button>').addClass(this._triggerClass).html(m == "" ? h : a("<img/>").attr({src:m, alt:h, title:h})));
      b[k ? "before" : "after"](f.trigger);
      f.trigger.click(function() {
        a.datepicker._datepickerShowing && a.datepicker._lastInput == b[0] ? a.datepicker._hideDatepicker() : a.datepicker._showDatepicker(b[0]);
        return false
      })
    }
  }, _autoSize:function(b) {
    if(this._get(b, "autoSize") && !b.inline) {
      var f = new Date(2009, 11, 20), h = this._get(b, "dateFormat");
      if(h.match(/[DM]/)) {
        var k = function(m) {
          for(var q = 0, o = 0, l = 0;l < m.length;l++) {
            if(m[l].length > q) {
              q = m[l].length;
              o = l
            }
          }return o
        };
        f.setMonth(k(this._get(b, h.match(/MM/) ? "monthNames" : "monthNamesShort")));
        f.setDate(k(this._get(b, h.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())
      }b.input.attr("size", this._formatDate(b, f).length)
    }
  }, _inlineDatepicker:function(b, f) {
    var h = a(b);
    if(!h.hasClass(this.markerClassName)) {
      h.addClass(this.markerClassName).append(f.dpDiv).bind("setData.datepicker", function(k, m, q) {
        f.settings[m] = q
      }).bind("getData.datepicker", function(k, m) {
        return this._get(f, m)
      });
      a.data(b, "datepicker", f);
      this._setDate(f, this._getDefaultDate(f), true);
      this._updateDatepicker(f);
      this._updateAlternate(f)
    }
  }, _dialogDatepicker:function(b, f, h, k, m) {
    b = this._dialogInst;
    if(!b) {
      this.uuid += 1;
      this._dialogInput = a('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
      this._dialogInput.keydown(this._doKeyDown);
      a("body").append(this._dialogInput);
      b = this._dialogInst = this._newInst(this._dialogInput, false);
      b.settings = {};
      a.data(this._dialogInput[0], "datepicker", b)
    }e(b.settings, k || {});
    f = f && f.constructor == Date ? this._formatDate(b, f) : f;
    this._dialogInput.val(f);
    this._pos = m ? m.length ? m : [m.pageX, m.pageY] : null;
    if(!this._pos) {
      this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)]
    }this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
    b.settings.onSelect = h;
    this._inDialog = true;
    this.dpDiv.addClass(this._dialogClass);
    this._showDatepicker(this._dialogInput[0]);
    a.blockUI && a.blockUI(this.dpDiv);
    a.data(this._dialogInput[0], "datepicker", b);
    return this
  }, _destroyDatepicker:function(b) {
    var f = a(b), h = a.data(b, "datepicker");
    if(f.hasClass(this.markerClassName)) {
      var k = b.nodeName.toLowerCase();
      a.removeData(b, "datepicker");
      if(k == "input") {
        h.append.remove();
        h.trigger.remove();
        f.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
      }else {
        if(k == "div" || k == "span") {
          f.removeClass(this.markerClassName).empty()
        }
      }
    }
  }, _enableDatepicker:function(b) {
    var f = a(b), h = a.data(b, "datepicker");
    if(f.hasClass(this.markerClassName)) {
      var k = b.nodeName.toLowerCase();
      if(k == "input") {
        b.disabled = false;
        h.trigger.filter("button").each(function() {
          this.disabled = false
        }).end().filter("img").css({opacity:"1.0", cursor:""})
      }else {
        if(k == "div" || k == "span") {
          f.children("." + this._inlineClass).children().removeClass("ui-state-disabled")
        }
      }this._disabledInputs = a.map(this._disabledInputs, function(m) {
        return m == b ? null : m
      })
    }
  }, _disableDatepicker:function(b) {
    var f = a(b), h = a.data(b, "datepicker");
    if(f.hasClass(this.markerClassName)) {
      var k = b.nodeName.toLowerCase();
      if(k == "input") {
        b.disabled = true;
        h.trigger.filter("button").each(function() {
          this.disabled = true
        }).end().filter("img").css({opacity:"0.5", cursor:"default"})
      }else {
        if(k == "div" || k == "span") {
          f.children("." + this._inlineClass).children().addClass("ui-state-disabled")
        }
      }this._disabledInputs = a.map(this._disabledInputs, function(m) {
        return m == b ? null : m
      });
      this._disabledInputs[this._disabledInputs.length] = b
    }
  }, _isDisabledDatepicker:function(b) {
    if(!b) {
      return false
    }for(var f = 0;f < this._disabledInputs.length;f++) {
      if(this._disabledInputs[f] == b) {
        return true
      }
    }return false
  }, _getInst:function(b) {
    try {
      return a.data(b, "datepicker")
    }catch(f) {
      throw"Missing instance data for this datepicker";
    }
  }, _optionDatepicker:function(b, f, h) {
    var k = this._getInst(b);
    if(arguments.length == 2 && typeof f == "string") {
      return f == "defaults" ? a.extend({}, a.datepicker._defaults) : k ? f == "all" ? a.extend({}, k.settings) : this._get(k, f) : null
    }var m = f || {};
    if(typeof f == "string") {
      m = {};
      m[f] = h
    }if(k) {
      this._curInst == k && this._hideDatepicker();
      var q = this._getDateDatepicker(b, true);
      e(k.settings, m);
      this._attachments(a(b), k);
      this._autoSize(k);
      this._setDateDatepicker(b, q);
      this._updateDatepicker(k)
    }
  }, _changeDatepicker:function(b, f, h) {
    this._optionDatepicker(b, f, h)
  }, _refreshDatepicker:function(b) {
    (b = this._getInst(b)) && this._updateDatepicker(b)
  }, _setDateDatepicker:function(b, f) {
    if(b = this._getInst(b)) {
      this._setDate(b, f);
      this._updateDatepicker(b);
      this._updateAlternate(b)
    }
  }, _getDateDatepicker:function(b, f) {
    (b = this._getInst(b)) && !b.inline && this._setDateFromField(b, f);
    return b ? this._getDate(b) : null
  }, _doKeyDown:function(b) {
    var f = a.datepicker._getInst(b.target), h = true, k = f.dpDiv.is(".ui-datepicker-rtl");
    f._keyEvent = true;
    if(a.datepicker._datepickerShowing) {
      switch(b.keyCode) {
        case 9:
          a.datepicker._hideDatepicker();
          h = false;
          break;
        case 13:
          h = a("td." + a.datepicker._dayOverClass, f.dpDiv).add(a("td." + a.datepicker._currentClass, f.dpDiv));
          h[0] ? a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, h[0]) : a.datepicker._hideDatepicker();
          return false;
        case 27:
          a.datepicker._hideDatepicker();
          break;
        case 33:
          a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
          break;
        case 34:
          a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
          break;
        case 35:
          if(b.ctrlKey || b.metaKey) {
            a.datepicker._clearDate(b.target)
          }h = b.ctrlKey || b.metaKey;
          break;
        case 36:
          if(b.ctrlKey || b.metaKey) {
            a.datepicker._gotoToday(b.target)
          }h = b.ctrlKey || b.metaKey;
          break;
        case 37:
          if(b.ctrlKey || b.metaKey) {
            a.datepicker._adjustDate(b.target, k ? +1 : -1, "D")
          }h = b.ctrlKey || b.metaKey;
          if(b.originalEvent.altKey) {
            a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M")
          }break;
        case 38:
          if(b.ctrlKey || b.metaKey) {
            a.datepicker._adjustDate(b.target, -7, "D")
          }h = b.ctrlKey || b.metaKey;
          break;
        case 39:
          if(b.ctrlKey || b.metaKey) {
            a.datepicker._adjustDate(b.target, k ? -1 : +1, "D")
          }h = b.ctrlKey || b.metaKey;
          if(b.originalEvent.altKey) {
            a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M")
          }break;
        case 40:
          if(b.ctrlKey || b.metaKey) {
            a.datepicker._adjustDate(b.target, +7, "D")
          }h = b.ctrlKey || b.metaKey;
          break;
        default:
          h = false
      }
    }else {
      if(b.keyCode == 36 && b.ctrlKey) {
        a.datepicker._showDatepicker(this)
      }else {
        h = false
      }
    }if(h) {
      b.preventDefault();
      b.stopPropagation()
    }
  }, _doKeyPress:function(b) {
    var f = a.datepicker._getInst(b.target);
    if(a.datepicker._get(f, "constrainInput")) {
      f = a.datepicker._possibleChars(a.datepicker._get(f, "dateFormat"));
      var h = String.fromCharCode(b.charCode == c ? b.keyCode : b.charCode);
      return b.ctrlKey || h < " " || !f || f.indexOf(h) > -1
    }
  }, _doKeyUp:function(b) {
    b = a.datepicker._getInst(b.target);
    if(b.input.val() != b.lastVal) {
      try {
        if(a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, a.datepicker._getFormatConfig(b))) {
          a.datepicker._setDateFromField(b);
          a.datepicker._updateAlternate(b);
          a.datepicker._updateDatepicker(b)
        }
      }catch(f) {
        a.datepicker.log(f)
      }
    }return true
  }, _showDatepicker:function(b) {
    b = b.target || b;
    if(b.nodeName.toLowerCase() != "input") {
      b = a("input", b.parentNode)[0]
    }if(!(a.datepicker._isDisabledDatepicker(b) || a.datepicker._lastInput == b)) {
      var f = a.datepicker._getInst(b);
      a.datepicker._curInst && a.datepicker._curInst != f && a.datepicker._curInst.dpDiv.stop(true, true);
      var h = a.datepicker._get(f, "beforeShow");
      e(f.settings, h ? h.apply(b, [b, f]) : {});
      f.lastVal = null;
      a.datepicker._lastInput = b;
      a.datepicker._setDateFromField(f);
      if(a.datepicker._inDialog) {
        b.value = ""
      }if(!a.datepicker._pos) {
        a.datepicker._pos = a.datepicker._findPos(b);
        a.datepicker._pos[1] += b.offsetHeight
      }var k = false;
      a(b).parents().each(function() {
        k |= a(this).css("position") == "fixed";
        return!k
      });
      if(k && a.browser.opera) {
        a.datepicker._pos[0] -= document.documentElement.scrollLeft;
        a.datepicker._pos[1] -= document.documentElement.scrollTop
      }h = {left:a.datepicker._pos[0], top:a.datepicker._pos[1]};
      a.datepicker._pos = null;
      f.dpDiv.css({position:"absolute", display:"block", top:"-1000px"});
      a.datepicker._updateDatepicker(f);
      h = a.datepicker._checkOffset(f, h, k);
      f.dpDiv.css({position:a.datepicker._inDialog && a.blockUI ? "static" : k ? "fixed" : "absolute", display:"none", left:h.left + "px", top:h.top + "px"});
      if(!f.inline) {
        h = a.datepicker._get(f, "showAnim");
        var m = a.datepicker._get(f, "duration"), q = function() {
          a.datepicker._datepickerShowing = true;
          var o = a.datepicker._getBorders(f.dpDiv);
          f.dpDiv.find("iframe.ui-datepicker-cover").css({left:-o[0], top:-o[1], width:f.dpDiv.outerWidth(), height:f.dpDiv.outerHeight()})
        };
        f.dpDiv.zIndex(a(b).zIndex() + 1);
        a.effects && a.effects[h] ? f.dpDiv.show(h, a.datepicker._get(f, "showOptions"), m, q) : f.dpDiv[h || "show"](h ? m : null, q);
        if(!h || !m) {
          q()
        }f.input.is(":visible") && !f.input.is(":disabled") && f.input.focus();
        a.datepicker._curInst = f
      }
    }
  }, _updateDatepicker:function(b) {
    var f = this, h = a.datepicker._getBorders(b.dpDiv);
    b.dpDiv.empty().append(this._generateHTML(b)).find("iframe.ui-datepicker-cover").css({left:-h[0], top:-h[1], width:b.dpDiv.outerWidth(), height:b.dpDiv.outerHeight()}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function() {
      a(this).removeClass("ui-state-hover");
      this.className.indexOf("ui-datepicker-prev") != -1 && a(this).removeClass("ui-datepicker-prev-hover");
      this.className.indexOf("ui-datepicker-next") != -1 && a(this).removeClass("ui-datepicker-next-hover")
    }).bind("mouseover", function() {
      if(!f._isDisabledDatepicker(b.inline ? b.dpDiv.parent()[0] : b.input[0])) {
        a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
        a(this).addClass("ui-state-hover");
        this.className.indexOf("ui-datepicker-prev") != -1 && a(this).addClass("ui-datepicker-prev-hover");
        this.className.indexOf("ui-datepicker-next") != -1 && a(this).addClass("ui-datepicker-next-hover")
      }
    }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
    h = this._getNumberOfMonths(b);
    var k = h[1];
    k > 1 ? b.dpDiv.addClass("ui-datepicker-multi-" + k).css("width", 17 * k + "em") : b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
    b.dpDiv[(h[0] != 1 || h[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
    b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
    b == a.datepicker._curInst && a.datepicker._datepickerShowing && b.input && b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus()
  }, _getBorders:function(b) {
    var f = function(h) {
      return{thin:1, medium:2, thick:3}[h] || h
    };
    return[parseFloat(f(b.css("border-left-width"))), parseFloat(f(b.css("border-top-width")))]
  }, _checkOffset:function(b, f, h) {
    var k = b.dpDiv.outerWidth(), m = b.dpDiv.outerHeight(), q = b.input ? b.input.outerWidth() : 0, o = b.input ? b.input.outerHeight() : 0, l = document.documentElement.clientWidth + a(document).scrollLeft(), n = document.documentElement.clientHeight + a(document).scrollTop();
    f.left -= this._get(b, "isRTL") ? k - q : 0;
    f.left -= h && f.left == b.input.offset().left ? a(document).scrollLeft() : 0;
    f.top -= h && f.top == b.input.offset().top + o ? a(document).scrollTop() : 0;
    f.left -= Math.min(f.left, f.left + k > l && l > k ? Math.abs(f.left + k - l) : 0);
    f.top -= Math.min(f.top, f.top + m > n && n > m ? Math.abs(m + o) : 0);
    return f
  }, _findPos:function(b) {
    for(var f = this._get(this._getInst(b), "isRTL");b && (b.type == "hidden" || b.nodeType != 1);) {
      b = b[f ? "previousSibling" : "nextSibling"]
    }b = a(b).offset();
    return[b.left, b.top]
  }, _hideDatepicker:function(b) {
    var f = this._curInst;
    if(!(!f || b && f != a.data(b, "datepicker"))) {
      if(this._datepickerShowing) {
        b = this._get(f, "showAnim");
        var h = this._get(f, "duration"), k = function() {
          a.datepicker._tidyDialog(f);
          this._curInst = null
        };
        a.effects && a.effects[b] ? f.dpDiv.hide(b, a.datepicker._get(f, "showOptions"), h, k) : f.dpDiv[b == "slideDown" ? "slideUp" : b == "fadeIn" ? "fadeOut" : "hide"](b ? h : null, k);
        b || k();
        if(b = this._get(f, "onClose")) {
          b.apply(f.input ? f.input[0] : null, [f.input ? f.input.val() : "", f])
        }this._datepickerShowing = false;
        this._lastInput = null;
        if(this._inDialog) {
          this._dialogInput.css({position:"absolute", left:"0", top:"-100px"});
          if(a.blockUI) {
            a.unblockUI();
            a("body").append(this.dpDiv)
          }
        }this._inDialog = false
      }
    }
  }, _tidyDialog:function(b) {
    b.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
  }, _checkExternalClick:function(b) {
    if(a.datepicker._curInst) {
      b = a(b.target);
      b[0].id != a.datepicker._mainDivId && b.parents("#" + a.datepicker._mainDivId).length == 0 && !b.hasClass(a.datepicker.markerClassName) && !b.hasClass(a.datepicker._triggerClass) && a.datepicker._datepickerShowing && !(a.datepicker._inDialog && a.blockUI) && a.datepicker._hideDatepicker()
    }
  }, _adjustDate:function(b, f, h) {
    b = a(b);
    var k = this._getInst(b[0]);
    if(!this._isDisabledDatepicker(b[0])) {
      this._adjustInstDate(k, f + (h == "M" ? this._get(k, "showCurrentAtPos") : 0), h);
      this._updateDatepicker(k)
    }
  }, _gotoToday:function(b) {
    b = a(b);
    var f = this._getInst(b[0]);
    if(this._get(f, "gotoCurrent") && f.currentDay) {
      f.selectedDay = f.currentDay;
      f.drawMonth = f.selectedMonth = f.currentMonth;
      f.drawYear = f.selectedYear = f.currentYear
    }else {
      var h = new Date;
      f.selectedDay = h.getDate();
      f.drawMonth = f.selectedMonth = h.getMonth();
      f.drawYear = f.selectedYear = h.getFullYear()
    }this._notifyChange(f);
    this._adjustDate(b)
  }, _selectMonthYear:function(b, f, h) {
    b = a(b);
    var k = this._getInst(b[0]);
    k._selectingMonthYear = false;
    k["selected" + (h == "M" ? "Month" : "Year")] = k["draw" + (h == "M" ? "Month" : "Year")] = parseInt(f.options[f.selectedIndex].value, 10);
    this._notifyChange(k);
    this._adjustDate(b)
  }, _clickMonthYear:function(b) {
    var f = this._getInst(a(b)[0]);
    f.input && f._selectingMonthYear && setTimeout(function() {
      f.input.focus()
    }, 0);
    f._selectingMonthYear = !f._selectingMonthYear
  }, _selectDay:function(b, f, h, k) {
    var m = a(b);
    if(!(a(k).hasClass(this._unselectableClass) || this._isDisabledDatepicker(m[0]))) {
      m = this._getInst(m[0]);
      m.selectedDay = m.currentDay = a("a", k).html();
      m.selectedMonth = m.currentMonth = f;
      m.selectedYear = m.currentYear = h;
      this._selectDate(b, this._formatDate(m, m.currentDay, m.currentMonth, m.currentYear))
    }
  }, _clearDate:function(b) {
    b = a(b);
    this._getInst(b[0]);
    this._selectDate(b, "")
  }, _selectDate:function(b, f) {
    b = this._getInst(a(b)[0]);
    f = f != null ? f : this._formatDate(b);
    b.input && b.input.val(f);
    this._updateAlternate(b);
    var h = this._get(b, "onSelect");
    if(h) {
      h.apply(b.input ? b.input[0] : null, [f, b])
    }else {
      b.input && b.input.trigger("change")
    }if(b.inline) {
      this._updateDatepicker(b)
    }else {
      this._hideDatepicker();
      this._lastInput = b.input[0];
      typeof b.input[0] != "object" && b.input.focus();
      this._lastInput = null
    }
  }, _updateAlternate:function(b) {
    var f = this._get(b, "altField");
    if(f) {
      var h = this._get(b, "altFormat") || this._get(b, "dateFormat"), k = this._getDate(b), m = this.formatDate(h, k, this._getFormatConfig(b));
      a(f).each(function() {
        a(this).val(m)
      })
    }
  }, noWeekends:function(b) {
    b = b.getDay();
    return[b > 0 && b < 6, ""]
  }, iso8601Week:function(b) {
    b = new Date(b.getTime());
    b.setDate(b.getDate() + 4 - (b.getDay() || 7));
    var f = b.getTime();
    b.setMonth(0);
    b.setDate(1);
    return Math.floor(Math.round((f - b) / 864E5) / 7) + 1
  }, parseDate:function(b, f, h) {
    if(b == null || f == null) {
      throw"Invalid arguments";
    }f = typeof f == "object" ? f.toString() : f + "";
    if(f == "") {
      return null
    }for(var k = (h ? h.shortYearCutoff : null) || this._defaults.shortYearCutoff, m = (h ? h.dayNamesShort : null) || this._defaults.dayNamesShort, q = (h ? h.dayNames : null) || this._defaults.dayNames, o = (h ? h.monthNamesShort : null) || this._defaults.monthNamesShort, l = (h ? h.monthNames : null) || this._defaults.monthNames, n = h = -1, p = -1, r = -1, s = false, u = function(x) {
      (x = D + 1 < b.length && b.charAt(D + 1) == x) && D++;
      return x
    }, v = function(x) {
      u(x);
      x = new RegExp("^\\d{1," + (x == "@" ? 14 : x == "!" ? 20 : x == "y" ? 4 : x == "o" ? 3 : 2) + "}");
      x = f.substring(B).match(x);
      if(!x) {
        throw"Missing number at position " + B;
      }B += x[0].length;
      return parseInt(x[0], 10)
    }, w = function(x, z, C) {
      x = u(x) ? C : z;
      for(z = 0;z < x.length;z++) {
        if(f.substr(B, x[z].length).toLowerCase() == x[z].toLowerCase()) {
          B += x[z].length;
          return z + 1
        }
      }throw"Unknown name at position " + B;
    }, y = function() {
      if(f.charAt(B) != b.charAt(D)) {
        throw"Unexpected literal at position " + B;
      }B++
    }, B = 0, D = 0;D < b.length;D++) {
      if(s) {
        if(b.charAt(D) == "'" && !u("'")) {
          s = false
        }else {
          y()
        }
      }else {
        switch(b.charAt(D)) {
          case "d":
            p = v("d");
            break;
          case "D":
            w("D", m, q);
            break;
          case "o":
            r = v("o");
            break;
          case "m":
            n = v("m");
            break;
          case "M":
            n = w("M", o, l);
            break;
          case "y":
            h = v("y");
            break;
          case "@":
            var E = new Date(v("@"));
            h = E.getFullYear();
            n = E.getMonth() + 1;
            p = E.getDate();
            break;
          case "!":
            E = new Date((v("!") - this._ticksTo1970) / 1E4);
            h = E.getFullYear();
            n = E.getMonth() + 1;
            p = E.getDate();
            break;
          case "'":
            if(u("'")) {
              y()
            }else {
              s = true
            }break;
          default:
            y()
        }
      }
    }if(h == -1) {
      h = (new Date).getFullYear()
    }else {
      if(h < 100) {
        h += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h <= k ? 0 : -100)
      }
    }if(r > -1) {
      n = 1;
      p = r;
      do {
        k = this._getDaysInMonth(h, n - 1);
        if(p <= k) {
          break
        }n++;
        p -= k
      }while(1)
    }E = this._daylightSavingAdjust(new Date(h, n - 1, p));
    if(E.getFullYear() != h || E.getMonth() + 1 != n || E.getDate() != p) {
      throw"Invalid date";
    }return E
  }, ATOM:"yy-mm-dd", COOKIE:"D, dd M yy", ISO_8601:"yy-mm-dd", RFC_822:"D, d M y", RFC_850:"DD, dd-M-y", RFC_1036:"D, d M y", RFC_1123:"D, d M yy", RFC_2822:"D, d M yy", RSS:"D, d M y", TICKS:"!", TIMESTAMP:"@", W3C:"yy-mm-dd", _ticksTo1970:(718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7, formatDate:function(b, f, h) {
    if(!f) {
      return""
    }var k = (h ? h.dayNamesShort : null) || this._defaults.dayNamesShort, m = (h ? h.dayNames : null) || this._defaults.dayNames, q = (h ? h.monthNamesShort : null) || this._defaults.monthNamesShort;
    h = (h ? h.monthNames : null) || this._defaults.monthNames;
    var o = function(u) {
      (u = s + 1 < b.length && b.charAt(s + 1) == u) && s++;
      return u
    }, l = function(u, v, w) {
      v = "" + v;
      if(o(u)) {
        for(;v.length < w;) {
          v = "0" + v
        }
      }return v
    }, n = function(u, v, w, y) {
      return o(u) ? y[v] : w[v]
    }, p = "", r = false;
    if(f) {
      for(var s = 0;s < b.length;s++) {
        if(r) {
          if(b.charAt(s) == "'" && !o("'")) {
            r = false
          }else {
            p += b.charAt(s)
          }
        }else {
          switch(b.charAt(s)) {
            case "d":
              p += l("d", f.getDate(), 2);
              break;
            case "D":
              p += n("D", f.getDay(), k, m);
              break;
            case "o":
              p += l("o", (f.getTime() - (new Date(f.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
              break;
            case "m":
              p += l("m", f.getMonth() + 1, 2);
              break;
            case "M":
              p += n("M", f.getMonth(), q, h);
              break;
            case "y":
              p += o("y") ? f.getFullYear() : (f.getYear() % 100 < 10 ? "0" : "") + f.getYear() % 100;
              break;
            case "@":
              p += f.getTime();
              break;
            case "!":
              p += f.getTime() * 1E4 + this._ticksTo1970;
              break;
            case "'":
              if(o("'")) {
                p += "'"
              }else {
                r = true
              }break;
            default:
              p += b.charAt(s)
          }
        }
      }
    }return p
  }, _possibleChars:function(b) {
    for(var f = "", h = false, k = function(q) {
      (q = m + 1 < b.length && b.charAt(m + 1) == q) && m++;
      return q
    }, m = 0;m < b.length;m++) {
      if(h) {
        if(b.charAt(m) == "'" && !k("'")) {
          h = false
        }else {
          f += b.charAt(m)
        }
      }else {
        switch(b.charAt(m)) {
          case "d":
          ;
          case "m":
          ;
          case "y":
          ;
          case "@":
            f += "0123456789";
            break;
          case "D":
          ;
          case "M":
            return null;
          case "'":
            if(k("'")) {
              f += "'"
            }else {
              h = true
            }break;
          default:
            f += b.charAt(m)
        }
      }
    }return f
  }, _get:function(b, f) {
    return b.settings[f] !== c ? b.settings[f] : this._defaults[f]
  }, _setDateFromField:function(b, f) {
    if(b.input.val() != b.lastVal) {
      var h = this._get(b, "dateFormat"), k = b.lastVal = b.input ? b.input.val() : null, m, q;
      m = q = this._getDefaultDate(b);
      var o = this._getFormatConfig(b);
      try {
        m = this.parseDate(h, k, o) || q
      }catch(l) {
        this.log(l);
        k = f ? "" : k
      }b.selectedDay = m.getDate();
      b.drawMonth = b.selectedMonth = m.getMonth();
      b.drawYear = b.selectedYear = m.getFullYear();
      b.currentDay = k ? m.getDate() : 0;
      b.currentMonth = k ? m.getMonth() : 0;
      b.currentYear = k ? m.getFullYear() : 0;
      this._adjustInstDate(b)
    }
  }, _getDefaultDate:function(b) {
    return this._restrictMinMax(b, this._determineDate(b, this._get(b, "defaultDate"), new Date))
  }, _determineDate:function(b, f, h) {
    var k = function(q) {
      var o = new Date;
      o.setDate(o.getDate() + q);
      return o
    }, m = function(q) {
      try {
        return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), q, a.datepicker._getFormatConfig(b))
      }catch(o) {
      }var l = (q.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, n = l.getFullYear(), p = l.getMonth();
      l = l.getDate();
      for(var r = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, s = r.exec(q);s;) {
        switch(s[2] || "d") {
          case "d":
          ;
          case "D":
            l += parseInt(s[1], 10);
            break;
          case "w":
          ;
          case "W":
            l += parseInt(s[1], 10) * 7;
            break;
          case "m":
          ;
          case "M":
            p += parseInt(s[1], 10);
            l = Math.min(l, a.datepicker._getDaysInMonth(n, p));
            break;
          case "y":
          ;
          case "Y":
            n += parseInt(s[1], 10);
            l = Math.min(l, a.datepicker._getDaysInMonth(n, p));
            break
        }
        s = r.exec(q)
      }return new Date(n, p, l)
    };
    if(f = (f = f == null ? h : typeof f == "string" ? m(f) : typeof f == "number" ? isNaN(f) ? h : k(f) : f) && f.toString() == "Invalid Date" ? h : f) {
      f.setHours(0);
      f.setMinutes(0);
      f.setSeconds(0);
      f.setMilliseconds(0)
    }return this._daylightSavingAdjust(f)
  }, _daylightSavingAdjust:function(b) {
    if(!b) {
      return null
    }b.setHours(b.getHours() > 12 ? b.getHours() + 2 : 0);
    return b
  }, _setDate:function(b, f, h) {
    var k = !f, m = b.selectedMonth, q = b.selectedYear;
    f = this._restrictMinMax(b, this._determineDate(b, f, new Date));
    b.selectedDay = b.currentDay = f.getDate();
    b.drawMonth = b.selectedMonth = b.currentMonth = f.getMonth();
    b.drawYear = b.selectedYear = b.currentYear = f.getFullYear();
    if((m != b.selectedMonth || q != b.selectedYear) && !h) {
      this._notifyChange(b)
    }this._adjustInstDate(b);
    if(b.input) {
      b.input.val(k ? "" : this._formatDate(b))
    }
  }, _getDate:function(b) {
    return!b.currentYear || b.input && b.input.val() == "" ? null : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay))
  }, _generateHTML:function(b) {
    var f = new Date;
    f = this._daylightSavingAdjust(new Date(f.getFullYear(), f.getMonth(), f.getDate()));
    var h = this._get(b, "isRTL"), k = this._get(b, "showButtonPanel"), m = this._get(b, "hideIfNoPrevNext"), q = this._get(b, "navigationAsDateFormat"), o = this._getNumberOfMonths(b), l = this._get(b, "showCurrentAtPos"), n = this._get(b, "stepMonths"), p = o[0] != 1 || o[1] != 1, r = this._daylightSavingAdjust(!b.currentDay ? new Date(9999, 9, 9) : new Date(b.currentYear, b.currentMonth, b.currentDay)), s = this._getMinMaxDate(b, "min"), u = this._getMinMaxDate(b, "max");
    l = b.drawMonth - l;
    var v = b.drawYear;
    if(l < 0) {
      l += 12;
      v--
    }if(u) {
      var w = this._daylightSavingAdjust(new Date(u.getFullYear(), u.getMonth() - o[0] * o[1] + 1, u.getDate()));
      for(w = s && w < s ? s : w;this._daylightSavingAdjust(new Date(v, l, 1)) > w;) {
        l--;
        if(l < 0) {
          l = 11;
          v--
        }
      }
    }b.drawMonth = l;
    b.drawYear = v;
    w = this._get(b, "prevText");
    w = !q ? w : this.formatDate(w, this._daylightSavingAdjust(new Date(v, l - n, 1)), this._getFormatConfig(b));
    w = this._canAdjustMonth(b, -1, v, l) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._adjustDate('#" + b.id + "', -" + n + ", 'M');\" title=\"" + w + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "e" : "w") + '">' + w + "</span></a>" : m ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + w + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "e" : "w") + '">' + w + "</span></a>";
    var y = this._get(b, "nextText");
    y = !q ? y : this.formatDate(y, this._daylightSavingAdjust(new Date(v, l + n, 1)), this._getFormatConfig(b));
    m = this._canAdjustMonth(b, +1, v, l) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._adjustDate('#" + b.id + "', +" + n + ", 'M');\" title=\"" + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "w" : "e") + '">' + y + "</span></a>" : m ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "w" : "e") + '">' + y + "</span></a>";
    n = this._get(b, "currentText");
    y = this._get(b, "gotoCurrent") && b.currentDay ? r : f;
    n = !q ? n : this.formatDate(n, y, this._getFormatConfig(b));
    q = !b.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + g + '.datepicker._hideDatepicker();">' + this._get(b, "closeText") + "</button>" : "";
    k = k ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (h ? q : "") + (this._isInRange(b, y) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._gotoToday('#" + b.id + "');\">" + n + "</button>" : "") + (h ? "" : q) + "</div>" : "";
    q = parseInt(this._get(b, "firstDay"), 10);
    q = isNaN(q) ? 0 : q;
    n = this._get(b, "showWeek");
    y = this._get(b, "dayNames");
    this._get(b, "dayNamesShort");
    var B = this._get(b, "dayNamesMin"), D = this._get(b, "monthNames"), E = this._get(b, "monthNamesShort"), x = this._get(b, "beforeShowDay"), z = this._get(b, "showOtherMonths"), C = this._get(b, "selectOtherMonths");
    this._get(b, "calculateWeek");
    for(var A = this._getDefaultDate(b), F = "", G = 0;G < o[0];G++) {
      for(var J = "", K = 0;K < o[1];K++) {
        var O = this._daylightSavingAdjust(new Date(v, l, b.selectedDay)), I = " ui-corner-all", N = "";
        if(p) {
          N += '<div class="ui-datepicker-group';
          if(o[1] > 1) {
            switch(K) {
              case 0:
                N += " ui-datepicker-group-first";
                I = " ui-corner-" + (h ? "right" : "left");
                break;
              case o[1] - 1:
                N += " ui-datepicker-group-last";
                I = " ui-corner-" + (h ? "left" : "right");
                break;
              default:
                N += " ui-datepicker-group-middle";
                I = "";
                break
            }
          }N += '">'
        }N += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + I + '">' + (/all|left/.test(I) && G == 0 ? h ? m : w : "") + (/all|right/.test(I) && G == 0 ? h ? w : m : "") + this._generateMonthYearHeader(b, l, v, s, u, G > 0 || K > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
        var M = n ? '<th class="ui-datepicker-week-col">' + this._get(b, "weekHeader") + "</th>" : "";
        for(I = 0;I < 7;I++) {
          var H = (I + q) % 7;
          M += "<th" + ((I + q + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + y[H] + '">' + B[H] + "</span></th>"
        }N += M + "</tr></thead><tbody>";
        M = this._getDaysInMonth(v, l);
        if(v == b.selectedYear && l == b.selectedMonth) {
          b.selectedDay = Math.min(b.selectedDay, M)
        }I = (this._getFirstDayOfMonth(v, l) - q + 7) % 7;
        M = p ? 6 : Math.ceil((I + M) / 7);
        H = this._daylightSavingAdjust(new Date(v, l, 1 - I));
        for(var L = 0;L < M;L++) {
          N += "<tr>";
          var Q = !n ? "" : '<td class="ui-datepicker-week-col">' + this._get(b, "calculateWeek")(H) + "</td>";
          for(I = 0;I < 7;I++) {
            var P = x ? x.apply(b.input ? b.input[0] : null, [H]) : [true, ""], R = H.getMonth() != l, S = R && !C || !P[0] || s && H < s || u && H > u;
            Q += '<td class="' + ((I + q + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (R ? " ui-datepicker-other-month" : "") + (H.getTime() == O.getTime() && l == b.selectedMonth && b._keyEvent || A.getTime() == H.getTime() && A.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (S ? " " + this._unselectableClass + " ui-state-disabled" : "") + (R && !z ? "" : " " + P[1] + (H.getTime() == r.getTime() ? " " + this._currentClass : "") + (H.getTime() == f.getTime() ? " ui-datepicker-today" : 
            "")) + '"' + ((!R || z) && P[2] ? ' title="' + P[2] + '"' : "") + (S ? "" : ' onclick="DP_jQuery_' + g + ".datepicker._selectDay('#" + b.id + "'," + H.getMonth() + "," + H.getFullYear() + ', this);return false;"') + ">" + (R && !z ? "&#xa0;" : S ? '<span class="ui-state-default">' + H.getDate() + "</span>" : '<a class="ui-state-default' + (H.getTime() == f.getTime() ? " ui-state-highlight" : "") + (H.getTime() == O.getTime() ? " ui-state-active" : "") + (R ? " ui-priority-secondary" : 
            "") + '" href="#">' + H.getDate() + "</a>") + "</td>";
            H.setDate(H.getDate() + 1);
            H = this._daylightSavingAdjust(H)
          }N += Q + "</tr>"
        }l++;
        if(l > 11) {
          l = 0;
          v++
        }N += "</tbody></table>" + (p ? "</div>" + (o[0] > 0 && K == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
        J += N
      }F += J
    }F += k + (a.browser.msie && parseInt(a.browser.version, 10) < 7 && !b.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
    b._keyEvent = false;
    return F
  }, _generateMonthYearHeader:function(b, f, h, k, m, q, o, l) {
    var n = this._get(b, "changeMonth"), p = this._get(b, "changeYear"), r = this._get(b, "showMonthAfterYear"), s = '<div class="ui-datepicker-title">', u = "";
    if(q || !n) {
      u += '<span class="ui-datepicker-month">' + o[f] + "</span>"
    }else {
      o = k && k.getFullYear() == h;
      var v = m && m.getFullYear() == h;
      u += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + b.id + "', this, 'M');\" onclick=\"DP_jQuery_" + g + ".datepicker._clickMonthYear('#" + b.id + "');\">";
      for(var w = 0;w < 12;w++) {
        if((!o || w >= k.getMonth()) && (!v || w <= m.getMonth())) {
          u += '<option value="' + w + '"' + (w == f ? ' selected="selected"' : "") + ">" + l[w] + "</option>"
        }
      }u += "</select>"
    }r || (s += u + (q || !(n && p) ? "&#xa0;" : ""));
    if(q || !p) {
      s += '<span class="ui-datepicker-year">' + h + "</span>"
    }else {
      l = this._get(b, "yearRange").split(":");
      var y = (new Date).getFullYear();
      o = function(B) {
        B = B.match(/c[+-].*/) ? h + parseInt(B.substring(1), 10) : B.match(/[+-].*/) ? y + parseInt(B, 10) : parseInt(B, 10);
        return isNaN(B) ? y : B
      };
      f = o(l[0]);
      l = Math.max(f, o(l[1] || ""));
      f = k ? Math.max(f, k.getFullYear()) : f;
      l = m ? Math.min(l, m.getFullYear()) : l;
      for(s += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + b.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + g + ".datepicker._clickMonthYear('#" + b.id + "');\">";f <= l;f++) {
        s += '<option value="' + f + '"' + (f == h ? ' selected="selected"' : "") + ">" + f + "</option>"
      }s += "</select>"
    }s += this._get(b, "yearSuffix");
    if(r) {
      s += (q || !(n && p) ? "&#xa0;" : "") + u
    }s += "</div>";
    return s
  }, _adjustInstDate:function(b, f, h) {
    var k = b.drawYear + (h == "Y" ? f : 0), m = b.drawMonth + (h == "M" ? f : 0);
    f = Math.min(b.selectedDay, this._getDaysInMonth(k, m)) + (h == "D" ? f : 0);
    k = this._restrictMinMax(b, this._daylightSavingAdjust(new Date(k, m, f)));
    b.selectedDay = k.getDate();
    b.drawMonth = b.selectedMonth = k.getMonth();
    b.drawYear = b.selectedYear = k.getFullYear();
    if(h == "M" || h == "Y") {
      this._notifyChange(b)
    }
  }, _restrictMinMax:function(b, f) {
    var h = this._getMinMaxDate(b, "min");
    b = this._getMinMaxDate(b, "max");
    f = h && f < h ? h : f;
    return b && f > b ? b : f
  }, _notifyChange:function(b) {
    var f = this._get(b, "onChangeMonthYear");
    if(f) {
      f.apply(b.input ? b.input[0] : null, [b.selectedYear, b.selectedMonth + 1, b])
    }
  }, _getNumberOfMonths:function(b) {
    b = this._get(b, "numberOfMonths");
    return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
  }, _getMinMaxDate:function(b, f) {
    return this._determineDate(b, this._get(b, f + "Date"), null)
  }, _getDaysInMonth:function(b, f) {
    return 32 - (new Date(b, f, 32)).getDate()
  }, _getFirstDayOfMonth:function(b, f) {
    return(new Date(b, f, 1)).getDay()
  }, _canAdjustMonth:function(b, f, h, k) {
    var m = this._getNumberOfMonths(b);
    h = this._daylightSavingAdjust(new Date(h, k + (f < 0 ? f : m[0] * m[1]), 1));
    f < 0 && h.setDate(this._getDaysInMonth(h.getFullYear(), h.getMonth()));
    return this._isInRange(b, h)
  }, _isInRange:function(b, f) {
    var h = this._getMinMaxDate(b, "min");
    b = this._getMinMaxDate(b, "max");
    return(!h || f.getTime() >= h.getTime()) && (!b || f.getTime() <= b.getTime())
  }, _getFormatConfig:function(b) {
    var f = this._get(b, "shortYearCutoff");
    f = typeof f != "string" ? f : (new Date).getFullYear() % 100 + parseInt(f, 10);
    return{shortYearCutoff:f, dayNamesShort:this._get(b, "dayNamesShort"), dayNames:this._get(b, "dayNames"), monthNamesShort:this._get(b, "monthNamesShort"), monthNames:this._get(b, "monthNames")}
  }, _formatDate:function(b, f, h, k) {
    if(!f) {
      b.currentDay = b.selectedDay;
      b.currentMonth = b.selectedMonth;
      b.currentYear = b.selectedYear
    }f = f ? typeof f == "object" ? f : this._daylightSavingAdjust(new Date(k, h, f)) : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay));
    return this.formatDate(this._get(b, "dateFormat"), f, this._getFormatConfig(b))
  }});
  a.fn.datepicker = function(b) {
    if(!a.datepicker.initialized) {
      a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);
      a.datepicker.initialized = true
    }var f = Array.prototype.slice.call(arguments, 1);
    if(typeof b == "string" && (b == "isDisabled" || b == "getDate" || b == "widget")) {
      return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(f))
    }if(b == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
      return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(f))
    }return this.each(function() {
      typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(f)) : a.datepicker._attachDatepicker(this, b)
    })
  };
  a.datepicker = new d;
  a.datepicker.initialized = false;
  a.datepicker.uuid = (new Date).getTime();
  a.datepicker.version = "1.8.5";
  window["DP_jQuery_" + g] = a
})(jQuery);
(function(a, c) {
  a.widget("ui.dialog", {options:{autoOpen:true, buttons:{}, closeOnEscape:true, closeText:"close", dialogClass:"", draggable:true, hide:null, height:"auto", maxHeight:false, maxWidth:false, minHeight:150, minWidth:150, modal:false, position:{my:"center", at:"center", of:window, collision:"fit", using:function(d) {
    var e = a(this).css(d).offset().top;
    e < 0 && a(this).css("top", d.top - e)
  }}, resizable:true, show:null, stack:true, title:"", width:300, zIndex:1E3}, _create:function() {
    this.originalTitle = this.element.attr("title");
    if(typeof this.originalTitle !== "string") {
      this.originalTitle = ""
    }this.options.title = this.options.title || this.originalTitle;
    var d = this, e = d.options, g = e.title || "&#160;", b = a.ui.dialog.getTitleId(d.element), f = (d.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + e.dialogClass).css({zIndex:e.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function(m) {
      if(e.closeOnEscape && m.keyCode && m.keyCode === a.ui.keyCode.ESCAPE) {
        d.close(m);
        m.preventDefault()
      }
    }).attr({role:"dialog", "aria-labelledby":b}).mousedown(function(m) {
      d.moveToTop(false, m)
    });
    d.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(f);
    var h = (d.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(f), k = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
      k.addClass("ui-state-hover")
    }, function() {
      k.removeClass("ui-state-hover")
    }).focus(function() {
      k.addClass("ui-state-focus")
    }).blur(function() {
      k.removeClass("ui-state-focus")
    }).click(function(m) {
      d.close(m);
      return false
    }).appendTo(h);
    (d.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(e.closeText).appendTo(k);
    a("<span></span>").addClass("ui-dialog-title").attr("id", b).html(g).prependTo(h);
    if(a.isFunction(e.beforeclose) && !a.isFunction(e.beforeClose)) {
      e.beforeClose = e.beforeclose
    }h.find("*").add(h).disableSelection();
    e.draggable && a.fn.draggable && d._makeDraggable();
    e.resizable && a.fn.resizable && d._makeResizable();
    d._createButtons(e.buttons);
    d._isOpen = false;
    a.fn.bgiframe && f.bgiframe()
  }, _init:function() {
    this.options.autoOpen && this.open()
  }, destroy:function() {
    this.overlay && this.overlay.destroy();
    this.uiDialog.hide();
    this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
    this.uiDialog.remove();
    this.originalTitle && this.element.attr("title", this.originalTitle);
    return this
  }, widget:function() {
    return this.uiDialog
  }, close:function(d) {
    var e = this, g;
    if(false !== e._trigger("beforeClose", d)) {
      e.overlay && e.overlay.destroy();
      e.uiDialog.unbind("keypress.ui-dialog");
      e._isOpen = false;
      if(e.options.hide) {
        e.uiDialog.hide(e.options.hide, function() {
          e._trigger("close", d)
        })
      }else {
        e.uiDialog.hide();
        e._trigger("close", d)
      }a.ui.dialog.overlay.resize();
      if(e.options.modal) {
        g = 0;
        a(".ui-dialog").each(function() {
          if(this !== e.uiDialog[0]) {
            g = Math.max(g, a(this).css("z-index"))
          }
        });
        a.ui.dialog.maxZ = g
      }return e
    }
  }, isOpen:function() {
    return this._isOpen
  }, moveToTop:function(d, e) {
    var g = this.options;
    if(g.modal && !d || !g.stack && !g.modal) {
      return this._trigger("focus", e)
    }if(g.zIndex > a.ui.dialog.maxZ) {
      a.ui.dialog.maxZ = g.zIndex
    }if(this.overlay) {
      a.ui.dialog.maxZ += 1;
      this.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)
    }d = {scrollTop:this.element.attr("scrollTop"), scrollLeft:this.element.attr("scrollLeft")};
    a.ui.dialog.maxZ += 1;
    this.uiDialog.css("z-index", a.ui.dialog.maxZ);
    this.element.attr(d);
    this._trigger("focus", e);
    return this
  }, open:function() {
    if(!this._isOpen) {
      var d = this.options, e = this.uiDialog;
      this.overlay = d.modal ? new a.ui.dialog.overlay(this) : null;
      e.next().length && e.appendTo("body");
      this._size();
      this._position(d.position);
      e.show(d.show);
      this.moveToTop(true);
      d.modal && e.bind("keypress.ui-dialog", function(g) {
        if(g.keyCode === a.ui.keyCode.TAB) {
          var b = a(":tabbable", this), f = b.filter(":first");
          b = b.filter(":last");
          if(g.target === b[0] && !g.shiftKey) {
            f.focus(1);
            return false
          }else {
            if(g.target === f[0] && g.shiftKey) {
              b.focus(1);
              return false
            }
          }
        }
      });
      a(this.element.find(":tabbable").get().concat(e.find(".ui-dialog-buttonpane :tabbable").get().concat(e.get()))).eq(0).focus();
      this._isOpen = true;
      this._trigger("open");
      return this
    }
  }, _createButtons:function(d) {
    var e = this, g = false, b = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), f = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(b);
    e.uiDialog.find(".ui-dialog-buttonpane").remove();
    typeof d === "object" && d !== null && a.each(d, function() {
      return!(g = true)
    });
    if(g) {
      a.each(d, function(h, k) {
        k = a.isFunction(k) ? {click:k, text:h} : k;
        h = a("<button></button>", k).unbind("click").click(function() {
          k.click.apply(e.element[0], arguments)
        }).appendTo(f);
        a.fn.button && h.button()
      });
      b.appendTo(e.uiDialog)
    }
  }, _makeDraggable:function() {
    function d(h) {
      return{position:h.position, offset:h.offset}
    }
    var e = this, g = e.options, b = a(document), f;
    e.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close", handle:".ui-dialog-titlebar", containment:"document", start:function(h, k) {
      f = g.height === "auto" ? "auto" : a(this).height();
      a(this).height(a(this).height()).addClass("ui-dialog-dragging");
      e._trigger("dragStart", h, d(k))
    }, drag:function(h, k) {
      e._trigger("drag", h, d(k))
    }, stop:function(h, k) {
      g.position = [k.position.left - b.scrollLeft(), k.position.top - b.scrollTop()];
      a(this).removeClass("ui-dialog-dragging").height(f);
      e._trigger("dragStop", h, d(k));
      a.ui.dialog.overlay.resize()
    }})
  }, _makeResizable:function(d) {
    function e(h) {
      return{originalPosition:h.originalPosition, originalSize:h.originalSize, position:h.position, size:h.size}
    }
    d = d === c ? this.options.resizable : d;
    var g = this, b = g.options, f = g.uiDialog.css("position");
    d = typeof d === "string" ? d : "n,e,s,w,se,sw,ne,nw";
    g.uiDialog.resizable({cancel:".ui-dialog-content", containment:"document", alsoResize:g.element, maxWidth:b.maxWidth, maxHeight:b.maxHeight, minWidth:b.minWidth, minHeight:g._minHeight(), handles:d, start:function(h, k) {
      a(this).addClass("ui-dialog-resizing");
      g._trigger("resizeStart", h, e(k))
    }, resize:function(h, k) {
      g._trigger("resize", h, e(k))
    }, stop:function(h, k) {
      a(this).removeClass("ui-dialog-resizing");
      b.height = a(this).height();
      b.width = a(this).width();
      g._trigger("resizeStop", h, e(k));
      a.ui.dialog.overlay.resize()
    }}).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
  }, _minHeight:function() {
    var d = this.options;
    return d.height === "auto" ? d.minHeight : Math.min(d.minHeight, d.height)
  }, _position:function(d) {
    var e = [], g = [0, 0], b;
    if(d) {
      if(typeof d === "string" || typeof d === "object" && "0" in d) {
        e = d.split ? d.split(" ") : [d[0], d[1]];
        if(e.length === 1) {
          e[1] = e[0]
        }a.each(["left", "top"], function(f, h) {
          if(+e[f] === e[f]) {
            g[f] = e[f];
            e[f] = h
          }
        });
        d = {my:e.join(" "), at:e.join(" "), offset:g.join(" ")}
      }d = a.extend({}, a.ui.dialog.prototype.options.position, d)
    }else {
      d = a.ui.dialog.prototype.options.position
    }(b = this.uiDialog.is(":visible")) || this.uiDialog.show();
    this.uiDialog.css({top:0, left:0}).position(d);
    b || this.uiDialog.hide()
  }, _setOption:function(d, e) {
    var g = this.uiDialog, b = g.is(":data(resizable)"), f = false;
    switch(d) {
      case "beforeclose":
        d = "beforeClose";
        break;
      case "buttons":
        this._createButtons(e);
        f = true;
        break;
      case "closeText":
        this.uiDialogTitlebarCloseText.text("" + e);
        break;
      case "dialogClass":
        g.removeClass(this.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + e);
        break;
      case "disabled":
        e ? g.addClass("ui-dialog-disabled") : g.removeClass("ui-dialog-disabled");
        break;
      case "draggable":
        e ? this._makeDraggable() : g.draggable("destroy");
        break;
      case "height":
        f = true;
        break;
      case "maxHeight":
        b && g.resizable("option", "maxHeight", e);
        f = true;
        break;
      case "maxWidth":
        b && g.resizable("option", "maxWidth", e);
        f = true;
        break;
      case "minHeight":
        b && g.resizable("option", "minHeight", e);
        f = true;
        break;
      case "minWidth":
        b && g.resizable("option", "minWidth", e);
        f = true;
        break;
      case "position":
        this._position(e);
        break;
      case "resizable":
        b && !e && g.resizable("destroy");
        b && typeof e === "string" && g.resizable("option", "handles", e);
        !b && e !== false && this._makeResizable(e);
        break;
      case "title":
        a(".ui-dialog-title", this.uiDialogTitlebar).html("" + (e || "&#160;"));
        break;
      case "width":
        f = true;
        break
    }
    a.Widget.prototype._setOption.apply(this, arguments);
    f && this._size()
  }, _size:function() {
    var d = this.options, e;
    this.element.css({width:"auto", minHeight:0, height:0});
    if(d.minWidth > d.width) {
      d.width = d.minWidth
    }e = this.uiDialog.css({height:"auto", width:d.width}).height();
    this.element.css(d.height === "auto" ? {minHeight:Math.max(d.minHeight - e, 0), height:a.support.minHeight ? "auto" : Math.max(d.minHeight - e, 0)} : {minHeight:0, height:Math.max(d.height - e, 0)}).show();
    this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
  }});
  a.extend(a.ui.dialog, {version:"1.8.5", uuid:0, maxZ:0, getTitleId:function(d) {
    d = d.attr("id");
    if(!d) {
      this.uuid += 1;
      d = this.uuid
    }return"ui-dialog-title-" + d
  }, overlay:function(d) {
    this.$el = a.ui.dialog.overlay.create(d)
  }});
  a.extend(a.ui.dialog.overlay, {instances:[], oldInstances:[], maxZ:0, events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(d) {
    return d + ".dialog-overlay"
  }).join(" "), create:function(d) {
    if(this.instances.length === 0) {
      setTimeout(function() {
        a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function(g) {
          if(a(g.target).zIndex() < a.ui.dialog.overlay.maxZ) {
            return false
          }
        })
      }, 1);
      a(document).bind("keydown.dialog-overlay", function(g) {
        if(d.options.closeOnEscape && g.keyCode && g.keyCode === a.ui.keyCode.ESCAPE) {
          d.close(g);
          g.preventDefault()
        }
      });
      a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize)
    }var e = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(), height:this.height()});
    a.fn.bgiframe && e.bgiframe();
    this.instances.push(e);
    return e
  }, destroy:function(d) {
    this.oldInstances.push(this.instances.splice(a.inArray(d, this.instances), 1)[0]);
    this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay");
    d.remove();
    var e = 0;
    a.each(this.instances, function() {
      e = Math.max(e, this.css("z-index"))
    });
    this.maxZ = e
  }, height:function() {
    var d, e;
    if(a.browser.msie && a.browser.version < 7) {
      d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      e = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
      return d < e ? a(window).height() + "px" : d + "px"
    }else {
      return a(document).height() + "px"
    }
  }, width:function() {
    var d, e;
    if(a.browser.msie && a.browser.version < 7) {
      d = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      e = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
      return d < e ? a(window).width() + "px" : d + "px"
    }else {
      return a(document).width() + "px"
    }
  }, resize:function() {
    var d = a([]);
    a.each(a.ui.dialog.overlay.instances, function() {
      d = d.add(this)
    });
    d.css({width:0, height:0}).css({width:a.ui.dialog.overlay.width(), height:a.ui.dialog.overlay.height()})
  }});
  a.extend(a.ui.dialog.overlay.prototype, {destroy:function() {
    a.ui.dialog.overlay.destroy(this.$el)
  }})
})(jQuery);
(function(a) {
  a.ui = a.ui || {};
  var c = /left|center|right/, d = /top|center|bottom/, e = a.fn.position, g = a.fn.offset;
  a.fn.position = function(b) {
    if(!b || !b.of) {
      return e.apply(this, arguments)
    }b = a.extend({}, b);
    var f = a(b.of), h = f[0], k = (b.collision || "flip").split(" "), m = b.offset ? b.offset.split(" ") : [0, 0], q, o, l;
    if(h.nodeType === 9) {
      q = f.width();
      o = f.height();
      l = {top:0, left:0}
    }else {
      if(h.scrollTo && h.document) {
        q = f.width();
        o = f.height();
        l = {top:f.scrollTop(), left:f.scrollLeft()}
      }else {
        if(h.preventDefault) {
          b.at = "left top";
          q = o = 0;
          l = {top:b.of.pageY, left:b.of.pageX}
        }else {
          q = f.outerWidth();
          o = f.outerHeight();
          l = f.offset()
        }
      }
    }a.each(["my", "at"], function() {
      var n = (b[this] || "").split(" ");
      if(n.length === 1) {
        n = c.test(n[0]) ? n.concat(["center"]) : d.test(n[0]) ? ["center"].concat(n) : ["center", "center"]
      }n[0] = c.test(n[0]) ? n[0] : "center";
      n[1] = d.test(n[1]) ? n[1] : "center";
      b[this] = n
    });
    if(k.length === 1) {
      k[1] = k[0]
    }m[0] = parseInt(m[0], 10) || 0;
    if(m.length === 1) {
      m[1] = m[0]
    }m[1] = parseInt(m[1], 10) || 0;
    if(b.at[0] === "right") {
      l.left += q
    }else {
      if(b.at[0] === "center") {
        l.left += q / 2
      }
    }if(b.at[1] === "bottom") {
      l.top += o
    }else {
      if(b.at[1] === "center") {
        l.top += o / 2
      }
    }l.left += m[0];
    l.top += m[1];
    return this.each(function() {
      var n = a(this), p = n.outerWidth(), r = n.outerHeight(), s = parseInt(a.curCSS(this, "marginLeft", true)) || 0, u = parseInt(a.curCSS(this, "marginTop", true)) || 0, v = p + s + parseInt(a.curCSS(this, "marginRight", true)) || 0, w = r + u + parseInt(a.curCSS(this, "marginBottom", true)) || 0, y = a.extend({}, l), B;
      if(b.my[0] === "right") {
        y.left -= p
      }else {
        if(b.my[0] === "center") {
          y.left -= p / 2
        }
      }if(b.my[1] === "bottom") {
        y.top -= r
      }else {
        if(b.my[1] === "center") {
          y.top -= r / 2
        }
      }y.left = parseInt(y.left);
      y.top = parseInt(y.top);
      B = {left:y.left - s, top:y.top - u};
      a.each(["left", "top"], function(D, E) {
        a.ui.position[k[D]] && a.ui.position[k[D]][E](y, {targetWidth:q, targetHeight:o, elemWidth:p, elemHeight:r, collisionPosition:B, collisionWidth:v, collisionHeight:w, offset:m, my:b.my, at:b.at})
      });
      a.fn.bgiframe && n.bgiframe();
      n.offset(a.extend(y, {using:b.using}))
    })
  };
  a.ui.position = {fit:{left:function(b, f) {
    var h = a(window);
    h = f.collisionPosition.left + f.collisionWidth - h.width() - h.scrollLeft();
    b.left = h > 0 ? b.left - h : Math.max(b.left - f.collisionPosition.left, b.left)
  }, top:function(b, f) {
    var h = a(window);
    h = f.collisionPosition.top + f.collisionHeight - h.height() - h.scrollTop();
    b.top = h > 0 ? b.top - h : Math.max(b.top - f.collisionPosition.top, b.top)
  }}, flip:{left:function(b, f) {
    if(f.at[0] !== "center") {
      var h = a(window);
      h = f.collisionPosition.left + f.collisionWidth - h.width() - h.scrollLeft();
      var k = f.my[0] === "left" ? -f.elemWidth : f.my[0] === "right" ? f.elemWidth : 0, m = f.at[0] === "left" ? f.targetWidth : -f.targetWidth, q = -2 * f.offset[0];
      b.left += f.collisionPosition.left < 0 ? k + m + q : h > 0 ? k + m + q : 0
    }
  }, top:function(b, f) {
    if(f.at[1] !== "center") {
      var h = a(window);
      h = f.collisionPosition.top + f.collisionHeight - h.height() - h.scrollTop();
      var k = f.my[1] === "top" ? -f.elemHeight : f.my[1] === "bottom" ? f.elemHeight : 0, m = f.at[1] === "top" ? f.targetHeight : -f.targetHeight, q = -2 * f.offset[1];
      b.top += f.collisionPosition.top < 0 ? k + m + q : h > 0 ? k + m + q : 0
    }
  }}};
  if(!a.offset.setOffset) {
    a.offset.setOffset = function(b, f) {
      if(/static/.test(a.curCSS(b, "position"))) {
        b.style.position = "relative"
      }var h = a(b), k = h.offset(), m = parseInt(a.curCSS(b, "top", true), 10) || 0, q = parseInt(a.curCSS(b, "left", true), 10) || 0;
      k = {top:f.top - k.top + m, left:f.left - k.left + q};
      "using" in f ? f.using.call(b, k) : h.css(k)
    };
    a.fn.offset = function(b) {
      var f = this[0];
      if(!f || !f.ownerDocument) {
        return null
      }if(b) {
        return this.each(function() {
          a.offset.setOffset(this, b)
        })
      }return g.call(this)
    }
  }
})(jQuery);
(function(a, c) {
  a.widget("ui.progressbar", {options:{value:0}, min:0, max:100, _create:function() {
    this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar", "aria-valuemin":this.min, "aria-valuemax":this.max, "aria-valuenow":this._value()});
    this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
    this._refreshValue()
  }, destroy:function() {
    this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
    this.valueDiv.remove();
    a.Widget.prototype.destroy.apply(this, arguments)
  }, value:function(d) {
    if(d === c) {
      return this._value()
    }this._setOption("value", d);
    return this
  }, _setOption:function(d, e) {
    if(d === "value") {
      this.options.value = e;
      this._refreshValue();
      this._trigger("change")
    }a.Widget.prototype._setOption.apply(this, arguments)
  }, _value:function() {
    var d = this.options.value;
    if(typeof d !== "number") {
      d = 0
    }return Math.min(this.max, Math.max(this.min, d))
  }, _refreshValue:function() {
    var d = this.value();
    this.valueDiv.toggleClass("ui-corner-right", d === this.max).width(d + "%");
    this.element.attr("aria-valuenow", d)
  }});
  a.extend(a.ui.progressbar, {version:"1.8.5"})
})(jQuery);
(function(a) {
  a.widget("ui.slider", a.ui.mouse, {widgetEventPrefix:"slide", options:{animate:false, distance:0, max:100, min:0, orientation:"horizontal", range:false, step:1, value:0, values:null}, _create:function() {
    var c = this, d = this.options;
    this._mouseSliding = this._keySliding = false;
    this._animateOff = true;
    this._handleIndex = null;
    this._detectOrientation();
    this._mouseInit();
    this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
    d.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
    this.range = a([]);
    if(d.range) {
      if(d.range === true) {
        this.range = a("<div></div>");
        if(!d.values) {
          d.values = [this._valueMin(), this._valueMin()]
        }if(d.values.length && d.values.length !== 2) {
          d.values = [d.values[0], d.values[0]]
        }
      }else {
        this.range = a("<div></div>")
      }this.range.appendTo(this.element).addClass("ui-slider-range");
      if(d.range === "min" || d.range === "max") {
        this.range.addClass("ui-slider-range-" + d.range)
      }this.range.addClass("ui-widget-header")
    }a(".ui-slider-handle", this.element).length === 0 && a("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
    if(d.values && d.values.length) {
      for(;a(".ui-slider-handle", this.element).length < d.values.length;) {
        a("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
      }
    }this.handles = a(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
    this.handle = this.handles.eq(0);
    this.handles.add(this.range).filter("a").click(function(e) {
      e.preventDefault()
    }).hover(function() {
      d.disabled || a(this).addClass("ui-state-hover")
    }, function() {
      a(this).removeClass("ui-state-hover")
    }).focus(function() {
      if(d.disabled) {
        a(this).blur()
      }else {
        a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
        a(this).addClass("ui-state-focus")
      }
    }).blur(function() {
      a(this).removeClass("ui-state-focus")
    });
    this.handles.each(function(e) {
      a(this).data("index.ui-slider-handle", e)
    });
    this.handles.keydown(function(e) {
      var g = true, b = a(this).data("index.ui-slider-handle"), f, h, k;
      if(!c.options.disabled) {
        switch(e.keyCode) {
          case a.ui.keyCode.HOME:
          ;
          case a.ui.keyCode.END:
          ;
          case a.ui.keyCode.PAGE_UP:
          ;
          case a.ui.keyCode.PAGE_DOWN:
          ;
          case a.ui.keyCode.UP:
          ;
          case a.ui.keyCode.RIGHT:
          ;
          case a.ui.keyCode.DOWN:
          ;
          case a.ui.keyCode.LEFT:
            g = false;
            if(!c._keySliding) {
              c._keySliding = true;
              a(this).addClass("ui-state-active");
              f = c._start(e, b);
              if(f === false) {
                return
              }
            }break
        }
        k = c.options.step;
        f = c.options.values && c.options.values.length ? (h = c.values(b)) : (h = c.value());
        switch(e.keyCode) {
          case a.ui.keyCode.HOME:
            h = c._valueMin();
            break;
          case a.ui.keyCode.END:
            h = c._valueMax();
            break;
          case a.ui.keyCode.PAGE_UP:
            h = c._trimAlignValue(f + (c._valueMax() - c._valueMin()) / 5);
            break;
          case a.ui.keyCode.PAGE_DOWN:
            h = c._trimAlignValue(f - (c._valueMax() - c._valueMin()) / 5);
            break;
          case a.ui.keyCode.UP:
          ;
          case a.ui.keyCode.RIGHT:
            if(f === c._valueMax()) {
              return
            }h = c._trimAlignValue(f + k);
            break;
          case a.ui.keyCode.DOWN:
          ;
          case a.ui.keyCode.LEFT:
            if(f === c._valueMin()) {
              return
            }h = c._trimAlignValue(f - k);
            break
        }
        c._slide(e, b, h);
        return g
      }
    }).keyup(function(e) {
      var g = a(this).data("index.ui-slider-handle");
      if(c._keySliding) {
        c._keySliding = false;
        c._stop(e, g);
        c._change(e, g);
        a(this).removeClass("ui-state-active")
      }
    });
    this._refreshValue();
    this._animateOff = false
  }, destroy:function() {
    this.handles.remove();
    this.range.remove();
    this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
    this._mouseDestroy();
    return this
  }, _mouseCapture:function(c) {
    var d = this.options, e, g, b, f, h;
    if(d.disabled) {
      return false
    }this.elementSize = {width:this.element.outerWidth(), height:this.element.outerHeight()};
    this.elementOffset = this.element.offset();
    e = this._normValueFromMouse({x:c.pageX, y:c.pageY});
    g = this._valueMax() - this._valueMin() + 1;
    f = this;
    this.handles.each(function(k) {
      var m = Math.abs(e - f.values(k));
      if(g > m) {
        g = m;
        b = a(this);
        h = k
      }
    });
    if(d.range === true && this.values(1) === d.min) {
      h += 1;
      b = a(this.handles[h])
    }if(this._start(c, h) === false) {
      return false
    }this._mouseSliding = true;
    f._handleIndex = h;
    b.addClass("ui-state-active").focus();
    d = b.offset();
    this._clickOffset = !a(c.target).parents().andSelf().is(".ui-slider-handle") ? {left:0, top:0} : {left:c.pageX - d.left - b.width() / 2, top:c.pageY - d.top - b.height() / 2 - (parseInt(b.css("borderTopWidth"), 10) || 0) - (parseInt(b.css("borderBottomWidth"), 10) || 0) + (parseInt(b.css("marginTop"), 10) || 0)};
    this._slide(c, h, e);
    return this._animateOff = true
  }, _mouseStart:function() {
    return true
  }, _mouseDrag:function(c) {
    var d = this._normValueFromMouse({x:c.pageX, y:c.pageY});
    this._slide(c, this._handleIndex, d);
    return false
  }, _mouseStop:function(c) {
    this.handles.removeClass("ui-state-active");
    this._mouseSliding = false;
    this._stop(c, this._handleIndex);
    this._change(c, this._handleIndex);
    this._clickOffset = this._handleIndex = null;
    return this._animateOff = false
  }, _detectOrientation:function() {
    this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
  }, _normValueFromMouse:function(c) {
    var d;
    if(this.orientation === "horizontal") {
      d = this.elementSize.width;
      c = c.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
    }else {
      d = this.elementSize.height;
      c = c.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
    }d = c / d;
    if(d > 1) {
      d = 1
    }if(d < 0) {
      d = 0
    }if(this.orientation === "vertical") {
      d = 1 - d
    }c = this._valueMax() - this._valueMin();
    return this._trimAlignValue(this._valueMin() + d * c)
  }, _start:function(c, d) {
    var e = {handle:this.handles[d], value:this.value()};
    if(this.options.values && this.options.values.length) {
      e.value = this.values(d);
      e.values = this.values()
    }return this._trigger("start", c, e)
  }, _slide:function(c, d, e) {
    var g;
    if(this.options.values && this.options.values.length) {
      g = this.values(d ? 0 : 1);
      if(this.options.values.length === 2 && this.options.range === true && (d === 0 && e > g || d === 1 && e < g)) {
        e = g
      }if(e !== this.values(d)) {
        g = this.values();
        g[d] = e;
        c = this._trigger("slide", c, {handle:this.handles[d], value:e, values:g});
        this.values(d ? 0 : 1);
        c !== false && this.values(d, e, true)
      }
    }else {
      if(e !== this.value()) {
        c = this._trigger("slide", c, {handle:this.handles[d], value:e});
        c !== false && this.value(e)
      }
    }
  }, _stop:function(c, d) {
    var e = {handle:this.handles[d], value:this.value()};
    if(this.options.values && this.options.values.length) {
      e.value = this.values(d);
      e.values = this.values()
    }this._trigger("stop", c, e)
  }, _change:function(c, d) {
    if(!this._keySliding && !this._mouseSliding) {
      var e = {handle:this.handles[d], value:this.value()};
      if(this.options.values && this.options.values.length) {
        e.value = this.values(d);
        e.values = this.values()
      }this._trigger("change", c, e)
    }
  }, value:function(c) {
    if(arguments.length) {
      this.options.value = this._trimAlignValue(c);
      this._refreshValue();
      this._change(null, 0)
    }return this._value()
  }, values:function(c, d) {
    var e, g, b;
    if(arguments.length > 1) {
      this.options.values[c] = this._trimAlignValue(d);
      this._refreshValue();
      this._change(null, c)
    }if(arguments.length) {
      if(a.isArray(arguments[0])) {
        e = this.options.values;
        g = arguments[0];
        for(b = 0;b < e.length;b += 1) {
          e[b] = this._trimAlignValue(g[b]);
          this._change(null, b)
        }this._refreshValue()
      }else {
        return this.options.values && this.options.values.length ? this._values(c) : this.value()
      }
    }else {
      return this._values()
    }
  }, _setOption:function(c, d) {
    var e, g = 0;
    if(a.isArray(this.options.values)) {
      g = this.options.values.length
    }a.Widget.prototype._setOption.apply(this, arguments);
    switch(c) {
      case "disabled":
        if(d) {
          this.handles.filter(".ui-state-focus").blur();
          this.handles.removeClass("ui-state-hover");
          this.handles.attr("disabled", "disabled");
          this.element.addClass("ui-disabled")
        }else {
          this.handles.removeAttr("disabled");
          this.element.removeClass("ui-disabled")
        }break;
      case "orientation":
        this._detectOrientation();
        this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
        this._refreshValue();
        break;
      case "value":
        this._animateOff = true;
        this._refreshValue();
        this._change(null, 0);
        this._animateOff = false;
        break;
      case "values":
        this._animateOff = true;
        this._refreshValue();
        for(e = 0;e < g;e += 1) {
          this._change(null, e)
        }this._animateOff = false;
        break
    }
  }, _value:function() {
    return this._trimAlignValue(this.options.value)
  }, _values:function(c) {
    var d, e;
    if(arguments.length) {
      d = this.options.values[c];
      return this._trimAlignValue(d)
    }else {
      d = this.options.values.slice();
      for(e = 0;e < d.length;e += 1) {
        d[e] = this._trimAlignValue(d[e])
      }return d
    }
  }, _trimAlignValue:function(c) {
    if(c < this._valueMin()) {
      return this._valueMin()
    }if(c > this._valueMax()) {
      return this._valueMax()
    }var d = this.options.step > 0 ? this.options.step : 1, e = c % d;
    c -= e;
    if(Math.abs(e) * 2 >= d) {
      c += e > 0 ? d : -d
    }return parseFloat(c.toFixed(5))
  }, _valueMin:function() {
    return this.options.min
  }, _valueMax:function() {
    return this.options.max
  }, _refreshValue:function() {
    var c = this.options.range, d = this.options, e = this, g = !this._animateOff ? d.animate : false, b, f = {}, h, k, m, q;
    if(this.options.values && this.options.values.length) {
      this.handles.each(function(o) {
        b = (e.values(o) - e._valueMin()) / (e._valueMax() - e._valueMin()) * 100;
        f[e.orientation === "horizontal" ? "left" : "bottom"] = b + "%";
        a(this).stop(1, 1)[g ? "animate" : "css"](f, d.animate);
        if(e.options.range === true) {
          if(e.orientation === "horizontal") {
            if(o === 0) {
              e.range.stop(1, 1)[g ? "animate" : "css"]({left:b + "%"}, d.animate)
            }if(o === 1) {
              e.range[g ? "animate" : "css"]({width:b - h + "%"}, {queue:false, duration:d.animate})
            }
          }else {
            if(o === 0) {
              e.range.stop(1, 1)[g ? "animate" : "css"]({bottom:b + "%"}, d.animate)
            }if(o === 1) {
              e.range[g ? "animate" : "css"]({height:b - h + "%"}, {queue:false, duration:d.animate})
            }
          }
        }h = b
      })
    }else {
      k = this.value();
      m = this._valueMin();
      q = this._valueMax();
      b = q !== m ? (k - m) / (q - m) * 100 : 0;
      f[e.orientation === "horizontal" ? "left" : "bottom"] = b + "%";
      this.handle.stop(1, 1)[g ? "animate" : "css"](f, d.animate);
      if(c === "min" && this.orientation === "horizontal") {
        this.range.stop(1, 1)[g ? "animate" : "css"]({width:b + "%"}, d.animate)
      }if(c === "max" && this.orientation === "horizontal") {
        this.range[g ? "animate" : "css"]({width:100 - b + "%"}, {queue:false, duration:d.animate})
      }if(c === "min" && this.orientation === "vertical") {
        this.range.stop(1, 1)[g ? "animate" : "css"]({height:b + "%"}, d.animate)
      }if(c === "max" && this.orientation === "vertical") {
        this.range[g ? "animate" : "css"]({height:100 - b + "%"}, {queue:false, duration:d.animate})
      }
    }
  }});
  a.extend(a.ui.slider, {version:"1.8.5"})
})(jQuery);
(function(a, c) {
  function d() {
    return++g
  }
  function e() {
    return++b
  }
  var g = 0, b = 0;
  a.widget("ui.tabs", {options:{add:null, ajaxOptions:null, cache:false, cookie:null, collapsible:false, disable:null, disabled:[], enable:null, event:"click", fx:null, idPrefix:"ui-tabs-", load:null, panelTemplate:"<div></div>", remove:null, select:null, show:null, spinner:"<em>Loading&#8230;</em>", tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"}, _create:function() {
    this._tabify(true)
  }, _setOption:function(f, h) {
    if(f == "selected") {
      this.options.collapsible && h == this.options.selected || this.select(h)
    }else {
      this.options[f] = h;
      this._tabify()
    }
  }, _tabId:function(f) {
    return f.title && f.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + d()
  }, _sanitizeSelector:function(f) {
    return f.replace(/:/g, "\\:")
  }, _cookie:function() {
    var f = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + e());
    return a.cookie.apply(null, [f].concat(a.makeArray(arguments)))
  }, _ui:function(f, h) {
    return{tab:f, panel:h, index:this.anchors.index(f)}
  }, _cleanup:function() {
    this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
      var f = a(this);
      f.html(f.data("label.tabs")).removeData("label.tabs")
    })
  }, _tabify:function(f) {
    function h(v, w) {
      v.css("display", "");
      !a.support.opacity && w.opacity && v[0].style.removeAttribute("filter")
    }
    var k = this, m = this.options, q = /^#.+/;
    this.list = this.element.find("ol,ul").eq(0);
    this.lis = a(" > li:has(a[href])", this.list);
    this.anchors = this.lis.map(function() {
      return a("a", this)[0]
    });
    this.panels = a([]);
    this.anchors.each(function(v, w) {
      var y = a(w).attr("href"), B = y.split("#")[0], D;
      if(B && (B === location.toString().split("#")[0] || (D = a("base")[0]) && B === D.href)) {
        y = w.hash;
        w.href = y
      }if(q.test(y)) {
        k.panels = k.panels.add(k._sanitizeSelector(y))
      }else {
        if(y && y !== "#") {
          a.data(w, "href.tabs", y);
          a.data(w, "load.tabs", y.replace(/#.*$/, ""));
          y = k._tabId(w);
          w.href = "#" + y;
          w = a("#" + y);
          if(!w.length) {
            w = a(m.panelTemplate).attr("id", y).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(k.panels[v - 1] || k.list);
            w.data("destroy.tabs", true)
          }k.panels = k.panels.add(w)
        }else {
          m.disabled.push(v)
        }
      }
    });
    if(f) {
      this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
      this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
      this.lis.addClass("ui-state-default ui-corner-top");
      this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
      if(m.selected === c) {
        location.hash && this.anchors.each(function(v, w) {
          if(w.hash == location.hash) {
            m.selected = v;
            return false
          }
        });
        if(typeof m.selected !== "number" && m.cookie) {
          m.selected = parseInt(k._cookie(), 10)
        }if(typeof m.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) {
          m.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
        }m.selected = m.selected || (this.lis.length ? 0 : -1)
      }else {
        if(m.selected === null) {
          m.selected = -1
        }
      }m.selected = m.selected >= 0 && this.anchors[m.selected] || m.selected < 0 ? m.selected : 0;
      m.disabled = a.unique(m.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function(v) {
        return k.lis.index(v)
      }))).sort();
      a.inArray(m.selected, m.disabled) != -1 && m.disabled.splice(a.inArray(m.selected, m.disabled), 1);
      this.panels.addClass("ui-tabs-hide");
      this.lis.removeClass("ui-tabs-selected ui-state-active");
      if(m.selected >= 0 && this.anchors.length) {
        this.panels.eq(m.selected).removeClass("ui-tabs-hide");
        this.lis.eq(m.selected).addClass("ui-tabs-selected ui-state-active");
        k.element.queue("tabs", function() {
          k._trigger("show", null, k._ui(k.anchors[m.selected], k.panels[m.selected]))
        });
        this.load(m.selected)
      }a(window).bind("unload", function() {
        k.lis.add(k.anchors).unbind(".tabs");
        k.lis = k.anchors = k.panels = null
      })
    }else {
      m.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
    }this.element[m.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
    m.cookie && this._cookie(m.selected, m.cookie);
    f = 0;
    for(var o;o = this.lis[f];f++) {
      a(o)[a.inArray(f, m.disabled) != -1 && !a(o).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
    }m.cache === false && this.anchors.removeData("cache.tabs");
    this.lis.add(this.anchors).unbind(".tabs");
    if(m.event !== "mouseover") {
      var l = function(v, w) {
        w.is(":not(.ui-state-disabled)") && w.addClass("ui-state-" + v)
      }, n = function(v, w) {
        w.removeClass("ui-state-" + v)
      };
      this.lis.bind("mouseover.tabs", function() {
        l("hover", a(this))
      });
      this.lis.bind("mouseout.tabs", function() {
        n("hover", a(this))
      });
      this.anchors.bind("focus.tabs", function() {
        l("focus", a(this).closest("li"))
      });
      this.anchors.bind("blur.tabs", function() {
        n("focus", a(this).closest("li"))
      })
    }var p, r;
    if(m.fx) {
      if(a.isArray(m.fx)) {
        p = m.fx[0];
        r = m.fx[1]
      }else {
        p = r = m.fx
      }
    }var s = r ? function(v, w) {
      a(v).closest("li").addClass("ui-tabs-selected ui-state-active");
      w.hide().removeClass("ui-tabs-hide").animate(r, r.duration || "normal", function() {
        h(w, r);
        k._trigger("show", null, k._ui(v, w[0]))
      })
    } : function(v, w) {
      a(v).closest("li").addClass("ui-tabs-selected ui-state-active");
      w.removeClass("ui-tabs-hide");
      k._trigger("show", null, k._ui(v, w[0]))
    }, u = p ? function(v, w) {
      w.animate(p, p.duration || "normal", function() {
        k.lis.removeClass("ui-tabs-selected ui-state-active");
        w.addClass("ui-tabs-hide");
        h(w, p);
        k.element.dequeue("tabs")
      })
    } : function(v, w) {
      k.lis.removeClass("ui-tabs-selected ui-state-active");
      w.addClass("ui-tabs-hide");
      k.element.dequeue("tabs")
    };
    this.anchors.bind(m.event + ".tabs", function() {
      var v = this, w = a(v).closest("li"), y = k.panels.filter(":not(.ui-tabs-hide)"), B = a(k._sanitizeSelector(v.hash));
      if(w.hasClass("ui-tabs-selected") && !m.collapsible || w.hasClass("ui-state-disabled") || w.hasClass("ui-state-processing") || k.panels.filter(":animated").length || k._trigger("select", null, k._ui(this, B[0])) === false) {
        this.blur();
        return false
      }m.selected = k.anchors.index(this);
      k.abort();
      if(m.collapsible) {
        if(w.hasClass("ui-tabs-selected")) {
          m.selected = -1;
          m.cookie && k._cookie(m.selected, m.cookie);
          k.element.queue("tabs", function() {
            u(v, y)
          }).dequeue("tabs");
          this.blur();
          return false
        }else {
          if(!y.length) {
            m.cookie && k._cookie(m.selected, m.cookie);
            k.element.queue("tabs", function() {
              s(v, B)
            });
            k.load(k.anchors.index(this));
            this.blur();
            return false
          }
        }
      }m.cookie && k._cookie(m.selected, m.cookie);
      if(B.length) {
        y.length && k.element.queue("tabs", function() {
          u(v, y)
        });
        k.element.queue("tabs", function() {
          s(v, B)
        });
        k.load(k.anchors.index(this))
      }else {
        throw"jQuery UI Tabs: Mismatching fragment identifier.";
      }a.browser.msie && this.blur()
    });
    this.anchors.bind("click.tabs", function() {
      return false
    })
  }, _getIndex:function(f) {
    if(typeof f == "string") {
      f = this.anchors.index(this.anchors.filter("[href$=" + f + "]"))
    }return f
  }, destroy:function() {
    var f = this.options;
    this.abort();
    this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
    this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
    this.anchors.each(function() {
      var h = a.data(this, "href.tabs");
      if(h) {
        this.href = h
      }var k = a(this).unbind(".tabs");
      a.each(["href", "load", "cache"], function(m, q) {
        k.removeData(q + ".tabs")
      })
    });
    this.lis.unbind(".tabs").add(this.panels).each(function() {
      a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
    });
    f.cookie && this._cookie(null, f.cookie);
    return this
  }, add:function(f, h, k) {
    if(k === c) {
      k = this.anchors.length
    }var m = this, q = this.options;
    h = a(q.tabTemplate.replace(/#\{href\}/g, f).replace(/#\{label\}/g, h));
    f = !f.indexOf("#") ? f.replace("#", "") : this._tabId(a("a", h)[0]);
    h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
    var o = a("#" + f);
    o.length || (o = a(q.panelTemplate).attr("id", f).data("destroy.tabs", true));
    o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
    if(k >= this.lis.length) {
      h.appendTo(this.list);
      o.appendTo(this.list[0].parentNode)
    }else {
      h.insertBefore(this.lis[k]);
      o.insertBefore(this.panels[k])
    }q.disabled = a.map(q.disabled, function(l) {
      return l >= k ? ++l : l
    });
    this._tabify();
    if(this.anchors.length == 1) {
      q.selected = 0;
      h.addClass("ui-tabs-selected ui-state-active");
      o.removeClass("ui-tabs-hide");
      this.element.queue("tabs", function() {
        m._trigger("show", null, m._ui(m.anchors[0], m.panels[0]))
      });
      this.load(0)
    }this._trigger("add", null, this._ui(this.anchors[k], this.panels[k]));
    return this
  }, remove:function(f) {
    f = this._getIndex(f);
    var h = this.options, k = this.lis.eq(f).remove(), m = this.panels.eq(f).remove();
    if(k.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
      this.select(f + (f + 1 < this.anchors.length ? 1 : -1))
    }h.disabled = a.map(a.grep(h.disabled, function(q) {
      return q != f
    }), function(q) {
      return q >= f ? --q : q
    });
    this._tabify();
    this._trigger("remove", null, this._ui(k.find("a")[0], m[0]));
    return this
  }, enable:function(f) {
    f = this._getIndex(f);
    var h = this.options;
    if(a.inArray(f, h.disabled) != -1) {
      this.lis.eq(f).removeClass("ui-state-disabled");
      h.disabled = a.grep(h.disabled, function(k) {
        return k != f
      });
      this._trigger("enable", null, this._ui(this.anchors[f], this.panels[f]));
      return this
    }
  }, disable:function(f) {
    f = this._getIndex(f);
    var h = this.options;
    if(f != h.selected) {
      this.lis.eq(f).addClass("ui-state-disabled");
      h.disabled.push(f);
      h.disabled.sort();
      this._trigger("disable", null, this._ui(this.anchors[f], this.panels[f]))
    }return this
  }, select:function(f) {
    f = this._getIndex(f);
    if(f == -1) {
      if(this.options.collapsible && this.options.selected != -1) {
        f = this.options.selected
      }else {
        return this
      }
    }this.anchors.eq(f).trigger(this.options.event + ".tabs");
    return this
  }, load:function(f) {
    f = this._getIndex(f);
    var h = this, k = this.options, m = this.anchors.eq(f)[0], q = a.data(m, "load.tabs");
    this.abort();
    if(!q || this.element.queue("tabs").length !== 0 && a.data(m, "cache.tabs")) {
      this.element.dequeue("tabs")
    }else {
      this.lis.eq(f).addClass("ui-state-processing");
      if(k.spinner) {
        var o = a("span", m);
        o.data("label.tabs", o.html()).html(k.spinner)
      }this.xhr = a.ajax(a.extend({}, k.ajaxOptions, {url:q, success:function(l, n) {
        a(h._sanitizeSelector(m.hash)).html(l);
        h._cleanup();
        k.cache && a.data(m, "cache.tabs", true);
        h._trigger("load", null, h._ui(h.anchors[f], h.panels[f]));
        try {
          k.ajaxOptions.success(l, n)
        }catch(p) {
        }
      }, error:function(l, n) {
        h._cleanup();
        h._trigger("load", null, h._ui(h.anchors[f], h.panels[f]));
        try {
          k.ajaxOptions.error(l, n, f, m)
        }catch(p) {
        }
      }}));
      h.element.dequeue("tabs");
      return this
    }
  }, abort:function() {
    this.element.queue([]);
    this.panels.stop(false, true);
    this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
    if(this.xhr) {
      this.xhr.abort();
      delete this.xhr
    }this._cleanup();
    return this
  }, url:function(f, h) {
    this.anchors.eq(f).removeData("cache.tabs").data("load.tabs", h);
    return this
  }, length:function() {
    return this.anchors.length
  }});
  a.extend(a.ui.tabs, {version:"1.8.5"});
  a.extend(a.ui.tabs.prototype, {rotation:null, rotate:function(f, h) {
    var k = this, m = this.options, q = k._rotate || (k._rotate = function(o) {
      clearTimeout(k.rotation);
      k.rotation = setTimeout(function() {
        var l = m.selected;
        k.select(++l < k.anchors.length ? l : 0)
      }, f);
      o && o.stopPropagation()
    });
    h = k._unrotate || (k._unrotate = !h ? function(o) {
      o.clientX && k.rotate(null)
    } : function() {
      t = m.selected;
      q()
    });
    if(f) {
      this.element.bind("tabsshow", q);
      this.anchors.bind(m.event + ".tabs", h);
      q()
    }else {
      clearTimeout(k.rotation);
      this.element.unbind("tabsshow", q);
      this.anchors.unbind(m.event + ".tabs", h);
      delete this._rotate;
      delete this._unrotate
    }return this
  }})
})(jQuery);
define("lib/jquery-ui-1.8.5.min", function() {
});
var LOADED = {files:[{name:"file 1", size:[640, 480], position:[10, 20], layers:[{name:"layer 1", classname:"layer1", images:[{name:"taj", src:"samples/taj.jpeg", position:[15, 50]}, {name:"taj", src:"images/aristo/progress_bar.gif", position:[20, 60]}]}]}, {name:"file 2", size:[500, 200], position:[100, 200], layers:[{name:"layer 1", classname:"layer1", images:[{name:"taj", src:"samples/taj.jpeg", position:[15, 50]}]}, {name:"layer 2", classname:"layer2", images:[{name:"prog", src:"images/aristo/progress_bar.gif", 
position:[20, 60]}]}]}]};
define("lib/fake", function() {
});
var Pixastic = function() {
  function a(k, m, q) {
    if(k.addEventListener) {
      k.addEventListener(m, q, false)
    }else {
      k.attachEvent && k.attachEvent("on" + m, q)
    }
  }
  function c(k) {
    var m = false, q = function() {
      if(!m) {
        m = true;
        k()
      }
    };
    document.write('<script defer src="//:" id="__onload_ie_pixastic__"><\/script>');
    var o = document.getElementById("__onload_ie_pixastic__");
    o.onreadystatechange = function() {
      if(o.readyState == "complete") {
        o.parentNode.removeChild(o);
        q()
      }
    };
    document.addEventListener && document.addEventListener("DOMContentLoaded", q, false);
    a(window, "load", q)
  }
  function d() {
    for(var k = e("pixastic", null, "img"), m = e("pixastic", null, "canvas"), q = k.concat(m), o = 0;o < q.length;o++) {
      (function() {
        for(var l = q[o], n = [], p = l.className.split(" "), r = 0;r < p.length;r++) {
          var s = p[r];
          if(s.substring(0, 9) == "pixastic-") {
            s = s.substring(9);
            s != "" && n.push(s)
          }
        }if(n.length) {
          if(l.tagName.toLowerCase() == "img") {
            p = new Image;
            p.src = l.src;
            if(p.complete) {
              for(p = 0;p < n.length;p++) {
                if(r = Pixastic.applyAction(l, l, n[p], null)) {
                  l = r
                }
              }
            }else {
              p.onload = function() {
                for(var u = 0;u < n.length;u++) {
                  var v = Pixastic.applyAction(l, l, n[u], null);
                  if(v) {
                    l = v
                  }
                }
              }
            }
          }else {
            setTimeout(function() {
              for(var u = 0;u < n.length;u++) {
                var v = Pixastic.applyAction(l, l, n[u], null);
                if(v) {
                  l = v
                }
              }
            }, 1)
          }
        }
      })()
    }
  }
  function e(k, m, q) {
    var o = [];
    if(m == null) {
      m = document
    }if(q == null) {
      q = "*"
    }m = m.getElementsByTagName(q);
    q = m.length;
    k = new RegExp("(^|\\s)" + k + "(\\s|$)");
    for(j = i = 0;i < q;i++) {
      if(k.test(m[i].className)) {
        o[j] = m[i];
        j++
      }
    }return o
  }
  function g(k, m) {
    if(Pixastic.debug) {
      try {
        switch(m) {
          case "warn":
            console.warn("Pixastic:", k);
            break;
          case "error":
            console.error("Pixastic:", k);
            break;
          default:
            console.log("Pixastic:", k)
        }
      }catch(q) {
      }
    }
  }
  typeof pixastic_parseonload != "undefined" && pixastic_parseonload && c(d);
  var b = function() {
    var k = document.createElement("canvas"), m = false;
    try {
      m = !!(typeof k.getContext == "function" && k.getContext("2d"))
    }catch(q) {
    }return function() {
      return m
    }
  }(), f = function() {
    var k = document.createElement("canvas"), m = false, q;
    try {
      if(typeof k.getContext == "function" && (q = k.getContext("2d"))) {
        m = typeof q.getImageData == "function"
      }
    }catch(o) {
    }return function() {
      return m
    }
  }(), h = function() {
    var k = false, m = document.createElement("canvas");
    if(b() && f()) {
      m.width = m.height = 1;
      m = m.getContext("2d");
      m.fillStyle = "rgb(255,0,0)";
      m.fillRect(0, 0, 1, 1);
      var q = document.createElement("canvas");
      q.width = q.height = 1;
      var o = q.getContext("2d");
      o.fillStyle = "rgb(0,0,255)";
      o.fillRect(0, 0, 1, 1);
      m.globalAlpha = 0.5;
      m.drawImage(q, 0, 0);
      k = m.getImageData(0, 0, 1, 1).data[2] != 255
    }return function() {
      return k
    }
  }();
  return{parseOnLoad:false, debug:false, applyAction:function(k, m, q, o) {
    o = o || {};
    var l = k.tagName.toLowerCase() == "canvas";
    if(l && Pixastic.Client.isIE()) {
      Pixastic.debug && g("Tried to process a canvas element but browser is IE.");
      return false
    }var n, p, r = false;
    if(Pixastic.Client.hasCanvas()) {
      r = !!o.resultCanvas;
      n = o.resultCanvas || document.createElement("canvas");
      p = n.getContext("2d")
    }var s = k.offsetWidth, u = k.offsetHeight;
    if(l) {
      s = k.width;
      u = k.height
    }if(s == 0 || u == 0) {
      if(k.parentNode == null) {
        var v = k.style.position, w = k.style.left;
        k.style.position = "absolute";
        k.style.left = "-9999px";
        document.body.appendChild(k);
        s = k.offsetWidth;
        u = k.offsetHeight;
        document.body.removeChild(k);
        k.style.position = v;
        k.style.left = w
      }else {
        Pixastic.debug && g("Image has 0 width and/or height.");
        return
      }
    }if(q.indexOf("(") > -1) {
      v = q;
      q = v.substr(0, v.indexOf("("));
      v = v.match(/\((.*?)\)/);
      if(v[1]) {
        v = v[1].split(";");
        for(w = 0;w < v.length;w++) {
          thisArg = v[w].split("=");
          if(thisArg.length == 2) {
            if(thisArg[0] == "rect") {
              var y = thisArg[1].split(",");
              o[thisArg[0]] = {left:parseInt(y[0], 10) || 0, top:parseInt(y[1], 10) || 0, width:parseInt(y[2], 10) || 0, height:parseInt(y[3], 10) || 0}
            }else {
              o[thisArg[0]] = thisArg[1]
            }
          }
        }
      }
    }if(o.rect) {
      o.rect.left = Math.round(o.rect.left);
      o.rect.top = Math.round(o.rect.top);
      o.rect.width = Math.round(o.rect.width);
      o.rect.height = Math.round(o.rect.height)
    }else {
      o.rect = {left:0, top:0, width:s, height:u}
    }v = false;
    if(Pixastic.Actions[q] && typeof Pixastic.Actions[q].process == "function") {
      v = true
    }if(!v) {
      Pixastic.debug && g('Invalid action "' + q + '". Maybe file not included?');
      return false
    }if(!Pixastic.Actions[q].checkSupport()) {
      Pixastic.debug && g('Action "' + q + '" not supported by this browser.');
      return false
    }if(Pixastic.Client.hasCanvas()) {
      if(n !== k) {
        n.width = s;
        n.height = u
      }if(!r) {
        n.style.width = s + "px";
        n.style.height = u + "px"
      }p.drawImage(m, 0, 0, s, u);
      if(k.__pixastic_org_image) {
        n.__pixastic_org_image = k.__pixastic_org_image;
        n.__pixastic_org_width = k.__pixastic_org_width;
        n.__pixastic_org_height = k.__pixastic_org_height
      }else {
        n.__pixastic_org_image = k;
        n.__pixastic_org_width = s;
        n.__pixastic_org_height = u
      }
    }else {
      if(Pixastic.Client.isIE() && typeof k.__pixastic_org_style == "undefined") {
        k.__pixastic_org_style = k.style.cssText
      }
    }m = {image:k, canvas:n, width:s, height:u, useData:true, options:o};
    if(!Pixastic.Actions[q].process(m)) {
      return false
    }if(Pixastic.Client.hasCanvas()) {
      if(m.useData) {
        if(Pixastic.Client.hasCanvasImageData()) {
          n.getContext("2d").putImageData(m.canvasData, o.rect.left, o.rect.top);
          n.getContext("2d").fillRect(0, 0, 0, 0)
        }
      }if(!o.leaveDOM) {
        n.title = k.title;
        n.imgsrc = k.imgsrc;
        if(!l) {
          n.alt = k.alt
        }if(!l) {
          n.imgsrc = k.src
        }n.className = k.className;
        n.style.cssText = k.style.cssText;
        n.name = k.name;
        n.tabIndex = k.tabIndex;
        n.id = k.id;
        k.parentNode && k.parentNode.replaceChild && k.parentNode.replaceChild(n, k)
      }return o.resultCanvas = n
    }return k
  }, prepareData:function(k, m) {
    var q = k.canvas.getContext("2d"), o = k.options.rect;
    q = q.getImageData(o.left, o.top, o.width, o.height);
    o = q.data;
    if(!m) {
      k.canvasData = q
    }return o
  }, process:function(k, m, q, o) {
    if(k.tagName.toLowerCase() == "img") {
      var l = new Image;
      l.src = k.src;
      if(l.complete) {
        var n = Pixastic.applyAction(k, l, m, q);
        o && o(n);
        return n
      }else {
        l.onload = function() {
          var p = Pixastic.applyAction(k, l, m, q);
          o && o(p)
        }
      }
    }if(k.tagName.toLowerCase() == "canvas") {
      n = Pixastic.applyAction(k, k, m, q);
      o && o(n);
      return n
    }
  }, revert:function(k) {
    if(Pixastic.Client.hasCanvas()) {
      if(k.tagName.toLowerCase() == "canvas" && k.__pixastic_org_image) {
        k.width = k.__pixastic_org_width;
        k.height = k.__pixastic_org_height;
        k.getContext("2d").drawImage(k.__pixastic_org_image, 0, 0);
        k.parentNode && k.parentNode.replaceChild && k.parentNode.replaceChild(k.__pixastic_org_image, k);
        return k
      }
    }else {
      if(Pixastic.Client.isIE()) {
        if(typeof k.__pixastic_org_style != "undefined") {
          k.style.cssText = k.__pixastic_org_style
        }
      }
    }
  }, Client:{hasCanvas:b, hasCanvasImageData:f, hasGlobalAlpha:h, isIE:function() {
    return!!document.all && !!window.attachEvent && !window.opera
  }}, Actions:{}}
}();
if(typeof jQuery != "undefined" && jQuery && jQuery.fn) {
  jQuery.fn.pixastic = function(a, c) {
    var d = [];
    this.each(function() {
      if(!(this.tagName.toLowerCase() == "img" && !this.complete)) {
        var e = Pixastic.process(this, a, c);
        e && d.push(e)
      }
    });
    return d.length > 0 ? jQuery(d) : this
  }
}Pixastic.Actions.blend = {process:function(a) {
  var c = parseFloat(a.options.amount), d = (a.options.mode || "normal").toLowerCase(), e = a.options.image;
  c = Math.max(0, Math.min(1, c));
  if(!e) {
    return false
  }if(Pixastic.Client.hasCanvasImageData()) {
    var g = a.options.rect, b = Pixastic.prepareData(a), f = g.width, h = g.height;
    a.useData = false;
    var k = document.createElement("canvas");
    k.width = a.canvas.width;
    k.height = a.canvas.height;
    var m = k.getContext("2d");
    m.drawImage(e, 0, 0);
    var q = {canvas:k, options:a.options};
    e = Pixastic.prepareData(q);
    var o = q.canvasData;
    q = f * h;
    var l = q * 4, n, p, r, s, u, v, w, y, B, D, E, x, z, C, A = false;
    switch(d) {
      case "normal":
        break;
      case "multiply":
        for(;q--;) {
          e[l -= 4] = b[l] * e[l] / 255;
          e[n = l + 1] = b[n] * e[n] / 255;
          e[p = l + 2] = b[p] * e[p] / 255
        }A = true;
        break;
      case "lighten":
        for(;q--;) {
          if((r = b[l -= 4]) > e[l]) {
            e[l] = r
          }if((s = b[n = l + 1]) > e[n]) {
            e[n] = s
          }if((u = b[p = l + 2]) > e[p]) {
            e[p] = u
          }
        }A = true;
        break;
      case "darken":
        for(;q--;) {
          if((r = b[l -= 4]) < e[l]) {
            e[l] = r
          }if((s = b[n = l + 1]) < e[n]) {
            e[n] = s
          }if((u = b[p = l + 2]) < e[p]) {
            e[p] = u
          }
        }A = true;
        break;
      case "darkercolor":
        for(;q--;) {
          if((r = b[l -= 4]) * 0.3 + (s = b[n = l + 1]) * 0.59 + (u = b[p = l + 2]) * 0.11 <= e[l] * 0.3 + e[n] * 0.59 + e[p] * 0.11) {
            e[l] = r;
            e[n] = s;
            e[p] = u
          }
        }A = true;
        break;
      case "lightercolor":
        for(;q--;) {
          if((r = b[l -= 4]) * 0.3 + (s = b[n = l + 1]) * 0.59 + (u = b[p = l + 2]) * 0.11 > e[l] * 0.3 + e[n] * 0.59 + e[p] * 0.11) {
            e[l] = r;
            e[n] = s;
            e[p] = u
          }
        }A = true;
        break;
      case "lineardodge":
        for(;q--;) {
          e[l] = (B = b[l -= 4] + e[l]) > 255 ? 255 : B;
          e[n] = (D = b[n = l + 1] + e[n]) > 255 ? 255 : D;
          e[p] = (E = b[p = l + 2] + e[p]) > 255 ? 255 : E
        }A = true;
        break;
      case "linearburn":
        for(;q--;) {
          e[l] = (B = b[l -= 4] + e[l]) < 255 ? 0 : B - 255;
          e[n] = (D = b[n = l + 1] + e[n]) < 255 ? 0 : D - 255;
          e[p] = (E = b[p = l + 2] + e[p]) < 255 ? 0 : E - 255
        }A = true;
        break;
      case "difference":
        for(;q--;) {
          e[l] = (B = b[l -= 4] - e[l]) < 0 ? -B : B;
          e[n] = (D = b[n = l + 1] - e[n]) < 0 ? -D : D;
          e[p] = (E = b[p = l + 2] - e[p]) < 0 ? -E : E
        }A = true;
        break;
      case "screen":
        for(;q--;) {
          e[l -= 4] = 255 - ((255 - e[l]) * (255 - b[l]) >> 8);
          e[n = l + 1] = 255 - ((255 - e[n]) * (255 - b[n]) >> 8);
          e[p = l + 2] = 255 - ((255 - e[p]) * (255 - b[p]) >> 8)
        }A = true;
        break;
      case "exclusion":
        for(d = 2 / 255;q--;) {
          e[l -= 4] = (r = b[l]) - (r * d - 1) * e[l];
          e[n = l + 1] = (s = b[n]) - (s * d - 1) * e[n];
          e[p = l + 2] = (u = b[p]) - (u * d - 1) * e[p]
        }A = true;
        break;
      case "overlay":
        for(d = 2 / 255;q--;) {
          e[l] = (r = b[l -= 4]) < 128 ? e[l] * r * d : 255 - (255 - e[l]) * (255 - r) * d;
          e[n] = (s = b[n = l + 1]) < 128 ? e[n] * s * d : 255 - (255 - e[n]) * (255 - s) * d;
          e[p] = (u = b[p = l + 2]) < 128 ? e[p] * u * d : 255 - (255 - e[p]) * (255 - u) * d
        }A = true;
        break;
      case "softlight":
        for(d = 2 / 255;q--;) {
          e[l] = (r = b[l -= 4]) < 128 ? ((e[l] >> 1) + 64) * r * d : 255 - (191 - (e[l] >> 1)) * (255 - r) * d;
          e[n] = (s = b[n = l + 1]) < 128 ? ((e[n] >> 1) + 64) * s * d : 255 - (191 - (e[n] >> 1)) * (255 - s) * d;
          e[p] = (u = b[p = l + 2]) < 128 ? ((e[p] >> 1) + 64) * u * d : 255 - (191 - (e[p] >> 1)) * (255 - u) * d
        }A = true;
        break;
      case "hardlight":
        for(d = 2 / 255;q--;) {
          e[l] = (v = e[l -= 4]) < 128 ? b[l] * v * d : 255 - (255 - b[l]) * (255 - v) * d;
          e[n] = (w = e[n = l + 1]) < 128 ? b[n] * w * d : 255 - (255 - b[n]) * (255 - w) * d;
          e[p] = (y = e[p = l + 2]) < 128 ? b[p] * y * d : 255 - (255 - b[p]) * (255 - y) * d
        }A = true;
        break;
      case "colordodge":
        for(;q--;) {
          e[l] = (B = (b[l -= 4] << 8) / (255 - (v = e[l]))) > 255 || v == 255 ? 255 : B;
          e[n] = (D = (b[n = l + 1] << 8) / (255 - (w = e[n]))) > 255 || w == 255 ? 255 : D;
          e[p] = (E = (b[p = l + 2] << 8) / (255 - (y = e[p]))) > 255 || y == 255 ? 255 : E
        }A = true;
        break;
      case "colorburn":
        for(;q--;) {
          e[l] = (B = 255 - (255 - b[l -= 4] << 8) / e[l]) < 0 || e[l] == 0 ? 0 : B;
          e[n] = (D = 255 - (255 - b[n = l + 1] << 8) / e[n]) < 0 || e[n] == 0 ? 0 : D;
          e[p] = (E = 255 - (255 - b[p = l + 2] << 8) / e[p]) < 0 || e[p] == 0 ? 0 : E
        }A = true;
        break;
      case "linearlight":
        for(;q--;) {
          e[l] = (B = 2 * (v = e[l -= 4]) + b[l] - 256) < 0 || v < 128 && B < 0 ? 0 : B > 255 ? 255 : B;
          e[n] = (D = 2 * (w = e[n = l + 1]) + b[n] - 256) < 0 || w < 128 && D < 0 ? 0 : D > 255 ? 255 : D;
          e[p] = (E = 2 * (y = e[p = l + 2]) + b[p] - 256) < 0 || y < 128 && E < 0 ? 0 : E > 255 ? 255 : E
        }A = true;
        break;
      case "vividlight":
        for(;q--;) {
          e[l] = (v = e[l -= 4]) < 128 ? v ? (B = 255 - (255 - b[l] << 8) / (2 * v)) < 0 ? 0 : B : 0 : (B = x = 2 * v - 256) < 255 ? (B = (b[l] << 8) / (255 - x)) > 255 ? 255 : B : B < 0 ? 0 : B;
          e[n] = (w = e[n = l + 1]) < 128 ? w ? (D = 255 - (255 - b[n] << 8) / (2 * w)) < 0 ? 0 : D : 0 : (D = z = 2 * w - 256) < 255 ? (D = (b[n] << 8) / (255 - z)) > 255 ? 255 : D : D < 0 ? 0 : D;
          e[p] = (y = e[p = l + 2]) < 128 ? y ? (E = 255 - (255 - b[p] << 8) / (2 * y)) < 0 ? 0 : E : 0 : (E = C = 2 * y - 256) < 255 ? (E = (b[p] << 8) / (255 - C)) > 255 ? 255 : E : E < 0 ? 0 : E
        }A = true;
        break;
      case "pinlight":
        for(;q--;) {
          e[l] = (v = e[l -= 4]) < 128 ? (r = b[l]) < (x = 2 * v) ? r : x : (r = b[l]) > (x = 2 * v - 256) ? r : x;
          e[n] = (w = e[n = l + 1]) < 128 ? (s = b[n]) < (z = 2 * w) ? s : z : (s = b[n]) > (z = 2 * w - 256) ? s : z;
          e[p] = (v = e[p = l + 2]) < 128 ? (r = b[p]) < (x = 2 * v) ? r : x : (r = b[p]) > (x = 2 * v - 256) ? r : x
        }A = true;
        break;
      case "hardmix":
        for(;q--;) {
          e[l] = (v = e[l -= 4]) < 128 ? 255 - (255 - b[l] << 8) / (2 * v) < 128 || v == 0 ? 0 : 255 : (x = 2 * v - 256) < 255 && (b[l] << 8) / (255 - x) < 128 ? 0 : 255;
          e[n] = (w = e[n = l + 1]) < 128 ? 255 - (255 - b[n] << 8) / (2 * w) < 128 || w == 0 ? 0 : 255 : (z = 2 * w - 256) < 255 && (b[n] << 8) / (255 - z) < 128 ? 0 : 255;
          e[p] = (y = e[p = l + 2]) < 128 ? 255 - (255 - b[p] << 8) / (2 * y) < 128 || y == 0 ? 0 : 255 : (C = 2 * y - 256) < 255 && (b[p] << 8) / (255 - C) < 128 ? 0 : 255
        }A = true;
        break
    }
    A && m.putImageData(o, 0, 0);
    if(c != 1 && !Pixastic.Client.hasGlobalAlpha()) {
      q = f * h;
      g = c;
      for(c = 1 - c;q--;) {
        l = q * 4;
        k = b[l + 1] * c + e[l + 1] * g >> 0;
        f = b[l + 2] * c + e[l + 2] * g >> 0;
        b[l] = b[l] * c + e[l] * g >> 0;
        b[l + 1] = k;
        b[l + 2] = f
      }a.useData = true
    }else {
      a = a.canvas.getContext("2d");
      a.save();
      a.globalAlpha = c;
      a.drawImage(k, 0, 0, g.width, g.height, g.left, g.top, g.width, g.height);
      a.globalAlpha = 1;
      a.restore()
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.blur = {process:function(a) {
  if(typeof a.options.fixMargin == "undefined") {
    a.options.fixMargin = true
  }if(Pixastic.Client.hasCanvasImageData()) {
    for(var c = Pixastic.prepareData(a), d = Pixastic.prepareData(a, true), e = [[0, 1, 0], [1, 2, 1], [0, 1, 0]], g = 0, b = 0;b < 3;b++) {
      for(var f = 0;f < 3;f++) {
        g += e[b][f]
      }
    }g = 1 / (g * 2);
    e = a.options.rect;
    a = e.width;
    e = e.height;
    b = a * 4;
    f = e;
    do {
      var h = (f - 1) * b, k = (f == 1 ? 0 : f - 2) * a * 4, m = (f == e ? f - 1 : f) * a * 4, q = a;
      do {
        var o = h + (q * 4 - 4), l = k + (q == 1 ? 0 : q - 2) * 4, n = m + (q == a ? q - 1 : q) * 4;
        c[o] = ((d[l] + d[o - 4] + d[o + 4] + d[n]) * 2 + d[o] * 4) * g;
        c[o + 1] = ((d[l + 1] + d[o - 3] + d[o + 5] + d[n + 1]) * 2 + d[o + 1] * 4) * g;
        c[o + 2] = ((d[l + 2] + d[o - 2] + d[o + 6] + d[n + 2]) * 2 + d[o + 2] * 4) * g
      }while(--q)
    }while(--f);
    return true
  }else {
    if(Pixastic.Client.isIE()) {
      a.image.style.filter += " progid:DXImageTransform.Microsoft.Blur(pixelradius=1.5)";
      if(a.options.fixMargin) {
        a.image.style.marginLeft = (parseInt(a.image.style.marginLeft, 10) || 0) - 2 + "px";
        a.image.style.marginTop = (parseInt(a.image.style.marginTop, 10) || 0) - 2 + "px"
      }return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE()
}};
Pixastic.Actions.blurfast = {process:function(a) {
  var c = parseFloat(a.options.amount) || 0, d = !!(a.options.clear && a.options.clear != "false");
  c = Math.max(0, Math.min(5, c));
  if(Pixastic.Client.hasCanvas()) {
    var e = a.options.rect, g = a.canvas.getContext("2d");
    g.save();
    g.beginPath();
    g.rect(e.left, e.top, e.width, e.height);
    g.clip();
    var b = Math.round(a.width / 2), f = Math.round(a.height / 2), h = document.createElement("canvas");
    h.width = b;
    h.height = f;
    d = false;
    c = Math.round(c * 20);
    for(var k = h.getContext("2d"), m = 0;m < c;m++) {
      var q = Math.max(1, Math.round(b - m)), o = Math.max(1, Math.round(f - m));
      k.clearRect(0, 0, b, f);
      k.drawImage(a.canvas, 0, 0, a.width, a.height, 0, 0, q, o);
      d && g.clearRect(e.left, e.top, e.width, e.height);
      g.drawImage(h, 0, 0, q, o, 0, 0, a.width, a.height)
    }g.restore();
    a.useData = false;
    return true
  }else {
    if(Pixastic.Client.isIE()) {
      d = 10 * c;
      a.image.style.filter += " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + d + ")";
      a.image.style.marginLeft = (parseInt(a.image.style.marginLeft, 10) || 0) - Math.round(d) + "px";
      a.image.style.marginTop = (parseInt(a.image.style.marginTop, 10) || 0) - Math.round(d) + "px";
      return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas() || Pixastic.Client.isIE()
}};
Pixastic.Actions.brightness = {process:function(a) {
  var c = parseInt(a.options.brightness, 10) || 0, d = parseFloat(a.options.contrast) || 0, e = !!(a.options.legacy && a.options.legacy != "false");
  if(e) {
    c = Math.min(150, Math.max(-150, c))
  }else {
    var g = 1 + Math.min(150, Math.max(-150, c)) / 150
  }d = Math.max(0, d + 1);
  if(Pixastic.Client.hasCanvasImageData()) {
    var b = Pixastic.prepareData(a);
    a = a.options.rect;
    a = a.width * a.height;
    var f = a * 4, h, k;
    if(d != 1) {
      if(e) {
        e = d;
        c = (c - 128) * d + 128
      }else {
        e = g * d;
        c = -d * 128 + 128
      }
    }else {
      if(e) {
        e = 1;
        c = c
      }else {
        e = g;
        c = 0
      }
    }for(var m, q, o;a--;) {
      b[f] = (m = b[f -= 4] * e + c) > 255 ? 255 : m < 0 ? 0 : m;
      b[h] = (q = b[h = f + 1] * e + c) > 255 ? 255 : q < 0 ? 0 : q;
      b[k] = (o = b[k = f + 2] * e + c) > 255 ? 255 : o < 0 ? 0 : o
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.coloradjust = {process:function(a) {
  var c = parseFloat(a.options.red) || 0, d = parseFloat(a.options.green) || 0, e = parseFloat(a.options.blue) || 0;
  c = Math.round(c * 255);
  d = Math.round(d * 255);
  e = Math.round(e * 255);
  if(Pixastic.Client.hasCanvasImageData()) {
    var g = Pixastic.prepareData(a);
    a = a.options.rect;
    a = a.width * a.height;
    for(var b = a * 4, f, h, k, m, q;a--;) {
      b -= 4;
      if(c) {
        g[b] = (k = g[b] + c) < 0 ? 0 : k > 255 ? 255 : k
      }if(d) {
        g[f] = (m = g[f = b + 1] + d) < 0 ? 0 : m > 255 ? 255 : m
      }if(e) {
        g[h] = (q = g[h = b + 2] + e) < 0 ? 0 : q > 255 ? 255 : q
      }
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.colorhistogram = {array256:function(a) {
  arr = [];
  for(var c = 0;c < 256;c++) {
    arr[c] = a
  }return arr
}, process:function(a) {
  if(typeof a.options.returnValue != "object") {
    a.options.returnValue = {rvals:[], gvals:[], bvals:[]}
  }var c = !!a.options.paint, d = a.options.returnValue;
  if(typeof d.values != "array") {
    d.rvals = [];
    d.gvals = [];
    d.bvals = []
  }if(Pixastic.Client.hasCanvasImageData()) {
    var e = Pixastic.prepareData(a);
    a.useData = false;
    var g = this.array256(0), b = this.array256(0), f = this.array256(0), h = a.options.rect;
    h = h.width * h.height;
    for(var k = h * 4;h--;) {
      g[e[k -= 4]]++;
      b[e[k + 1]]++;
      f[e[k + 2]]++
    }d.rvals = g;
    d.gvals = b;
    d.bvals = f;
    if(c) {
      c = a.canvas.getContext("2d");
      g = [g, b, f];
      for(b = 0;b < 3;b++) {
        f = (b + 1) * a.height / 3;
        for(d = e = 0;d < 256;d++) {
          if(g[b][d] > e) {
            e = g[b][d]
          }
        }e = a.height / 3 / e;
        h = a.width / 256;
        if(b == 0) {
          c.fillStyle = "rgba(255,0,0,0.5)"
        }else {
          if(b == 1) {
            c.fillStyle = "rgba(0,255,0,0.5)"
          }else {
            if(b == 2) {
              c.fillStyle = "rgba(0,0,255,0.5)"
            }
          }
        }for(d = 0;d < 256;d++) {
          c.fillRect(d * h, a.height - e * g[b][d] - a.height + f, h, g[b][d] * e)
        }
      }
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.crop = {process:function(a) {
  if(Pixastic.Client.hasCanvas()) {
    var c = a.options.rect, d = c.width, e = c.height, g = c.top;
    c = c.left;
    if(typeof a.options.left != "undefined") {
      c = parseInt(a.options.left, 10)
    }if(typeof a.options.top != "undefined") {
      g = parseInt(a.options.top, 10)
    }if(typeof a.options.height != "undefined") {
      d = parseInt(a.options.width, 10)
    }if(typeof a.options.height != "undefined") {
      e = parseInt(a.options.height, 10)
    }if(c < 0) {
      c = 0
    }if(c > a.width - 1) {
      c = a.width - 1
    }if(g < 0) {
      g = 0
    }if(g > a.height - 1) {
      g = a.height - 1
    }if(d < 1) {
      d = 1
    }if(c + d > a.width) {
      d = a.width - c
    }if(e < 1) {
      e = 1
    }if(g + e > a.height) {
      e = a.height - g
    }var b = document.createElement("canvas");
    b.width = a.width;
    b.height = a.height;
    b.getContext("2d").drawImage(a.canvas, 0, 0);
    a.canvas.width = d;
    a.canvas.height = e;
    a.canvas.getContext("2d").clearRect(0, 0, d, e);
    a.canvas.getContext("2d").drawImage(b, c, g, d, e, 0, 0, d, e);
    a.useData = false;
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas()
}};
Pixastic.Actions.desaturate = {process:function(a) {
  var c = !!(a.options.average && a.options.average != "false");
  if(Pixastic.Client.hasCanvasImageData()) {
    var d = Pixastic.prepareData(a);
    a = a.options.rect;
    a = a.width * a.height;
    var e = a * 4, g, b;
    if(c) {
      for(;a--;) {
        d[e -= 4] = d[g = e + 1] = d[b = e + 2] = (d[e] + d[g] + d[b]) / 3
      }
    }else {
      for(;a--;) {
        d[e -= 4] = d[g = e + 1] = d[b = e + 2] = d[e] * 0.3 + d[g] * 0.59 + d[b] * 0.11
      }
    }return true
  }else {
    if(Pixastic.Client.isIE()) {
      a.image.style.filter += " gray";
      return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE()
}};
Pixastic.Actions.edges = {process:function(a) {
  var c = !!(a.options.mono && a.options.mono != "false"), d = !!(a.options.invert && a.options.invert != "false");
  if(Pixastic.Client.hasCanvasImageData()) {
    var e = Pixastic.prepareData(a), g = Pixastic.prepareData(a, true);
    weight = -8;
    var b = a.options.rect;
    a = b.width;
    b = b.height;
    var f = a * 4, h = b;
    do {
      var k = (h - 1) * f, m = (h == 1 ? 0 : h - 2) * a * 4, q = (h == b ? h - 1 : h) * a * 4, o = a;
      do {
        var l = k + (o * 4 - 4), n = m + (o == 1 ? 0 : o - 2) * 4, p = q + (o == a ? o - 1 : o) * 4, r = ((g[n - 4] + g[n] + g[n + 4] + g[l - 4] + g[l + 4] + g[p - 4] + g[p] + g[p + 4]) * -0.125 + g[l]) * weight, s = ((g[n - 3] + g[n + 1] + g[n + 5] + g[l - 3] + g[l + 5] + g[p - 3] + g[p + 1] + g[p + 5]) * -0.125 + g[l + 1]) * weight;
        n = ((g[n - 2] + g[n + 2] + g[n + 6] + g[l - 2] + g[l + 6] + g[p - 2] + g[p + 2] + g[p + 6]) * -0.125 + g[l + 2]) * weight;
        if(c) {
          r = r * 0.3 + s * 0.59 + n * 0.11 || 0;
          if(d) {
            r = 255 - r
          }if(r < 0) {
            r = 0
          }if(r > 255) {
            r = 255
          }r = s = n = r
        }else {
          if(d) {
            r = 255 - r;
            s = 255 - s;
            n = 255 - n
          }if(r < 0) {
            r = 0
          }if(s < 0) {
            s = 0
          }if(n < 0) {
            n = 0
          }if(r > 255) {
            r = 255
          }if(s > 255) {
            s = 255
          }if(n > 255) {
            n = 255
          }
        }e[l] = r;
        e[l + 1] = s;
        e[l + 2] = n
      }while(--o)
    }while(--h);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.edges2 = {process:function(a) {
  if(Pixastic.Client.hasCanvasImageData()) {
    var c = Pixastic.prepareData(a), d = Pixastic.prepareData(a, true), e = a.options.rect, g = e.width;
    a = g * 4;
    var b = a + 4;
    e = e.height - 1;
    g = g - 1;
    for(var f = 1;f < e;++f) {
      for(var h = b - 4, k = h - a, m = h + a, q = -d[k] - d[h] - d[m], o = -d[++k] - d[++h] - d[++m], l = -d[++k] - d[++h] - d[++m], n = d[k += 2], p = d[++k], r = d[++k], s = d[h += 2], u = d[++h], v = d[++h], w = d[m += 2], y = d[++m], B = d[++m], D = -n - s - w, E = -p - u - y, x = -r - v - B, z = 1;z < g;++z) {
        h = b + 4;
        k = h - a;
        m = h + a;
        var C = 127 + q - n - s * -8 - w, A = 127 + o - p - u * -8 - y, F = 127 + l - r - v * -8 - B;
        q = D;
        o = E;
        l = x;
        n = d[k];
        p = d[++k];
        r = d[++k];
        s = d[h];
        u = d[++h];
        v = d[++h];
        w = d[m];
        y = d[++m];
        B = d[++m];
        C += D = -n - s - w;
        A += E = -p - u - y;
        F += x = -r - v - B;
        if(C > 255) {
          C = 255
        }if(A > 255) {
          A = 255
        }if(F > 255) {
          F = 255
        }if(C < 0) {
          C = 0
        }if(A < 0) {
          A = 0
        }if(F < 0) {
          F = 0
        }c[b] = C;
        c[++b] = A;
        c[++b] = F;
        b += 2
      }b += 8
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.emboss = {process:function(a) {
  var c = parseFloat(a.options.strength) || 1, d = typeof a.options.greyLevel != "undefined" ? parseInt(a.options.greyLevel) : 180, e = !!(a.options.blend && a.options.blend != "false"), g = 0, b = 0;
  switch(a.options.direction || "topleft") {
    case "topleft":
      b = g = -1;
      break;
    case "top":
      g = -1;
      b = 0;
      break;
    case "topright":
      g = -1;
      b = 1;
      break;
    case "right":
      g = 0;
      b = 1;
      break;
    case "bottomright":
      b = g = 1;
      break;
    case "bottom":
      g = 1;
      b = 0;
      break;
    case "bottomleft":
      g = 1;
      b = -1;
      break;
    case "left":
      g = 0;
      b = -1;
      break
  }
  if(Pixastic.Client.hasCanvasImageData()) {
    var f = Pixastic.prepareData(a), h = Pixastic.prepareData(a, true), k = a.options.rect;
    a = k.width;
    k = k.height;
    var m = a * 4, q = k;
    do {
      var o = (q - 1) * m, l = g;
      if(q + l < 1) {
        l = 0
      }if(q + l > k) {
        l = 0
      }l = (q - 1 + l) * a * 4;
      var n = a;
      do {
        var p = o + (n - 1) * 4, r = b;
        if(n + r < 1) {
          r = 0
        }if(n + r > a) {
          r = 0
        }r = l + (n - 1 + r) * 4;
        var s = h[p + 1] - h[r + 1], u = h[p + 2] - h[r + 2];
        r = h[p] - h[r];
        var v = r > 0 ? r : -r, w = u > 0 ? u : -u;
        if((s > 0 ? s : -s) > v) {
          r = s
        }if(w > v) {
          r = u
        }r *= c;
        if(e) {
          s = f[p] + r;
          u = f[p + 1] + r;
          r = f[p + 2] + r;
          f[p] = s > 255 ? 255 : s < 0 ? 0 : s;
          f[p + 1] = u > 255 ? 255 : u < 0 ? 0 : u;
          f[p + 2] = r > 255 ? 255 : r < 0 ? 0 : r
        }else {
          r = d - r;
          if(r < 0) {
            r = 0
          }else {
            if(r > 255) {
              r = 255
            }
          }f[p] = f[p + 1] = f[p + 2] = r
        }
      }while(--n)
    }while(--q);
    return true
  }else {
    if(Pixastic.Client.isIE()) {
      a.image.style.filter += " progid:DXImageTransform.Microsoft.emboss()";
      return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE()
}};
Pixastic.Actions.flip = {process:function(a) {
  var c = a.options.rect, d = document.createElement("canvas");
  d.width = c.width;
  d.height = c.height;
  d.getContext("2d").drawImage(a.image, c.left, c.top, c.width, c.height, 0, 0, c.width, c.height);
  var e = a.canvas.getContext("2d");
  e.clearRect(c.left, c.top, c.width, c.height);
  if(a.options.axis == "horizontal") {
    e.scale(-1, 1);
    e.drawImage(d, -c.left - c.width, c.top, c.width, c.height)
  }else {
    e.scale(1, -1);
    e.drawImage(d, c.left, -c.top - c.height, c.width, c.height)
  }a.useData = false;
  return true
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas()
}};
Pixastic.Actions.fliph = {process:function(a) {
  if(Pixastic.Client.hasCanvas()) {
    var c = a.options.rect, d = document.createElement("canvas");
    d.width = c.width;
    d.height = c.height;
    d.getContext("2d").drawImage(a.image, c.left, c.top, c.width, c.height, 0, 0, c.width, c.height);
    var e = a.canvas.getContext("2d");
    e.clearRect(c.left, c.top, c.width, c.height);
    e.scale(-1, 1);
    e.drawImage(d, -c.left - c.width, c.top, c.width, c.height);
    a.useData = false;
    return true
  }else {
    if(Pixastic.Client.isIE()) {
      a.image.style.filter += " fliph";
      return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas() || Pixastic.Client.isIE()
}};
Pixastic.Actions.flipv = {process:function(a) {
  if(Pixastic.Client.hasCanvas()) {
    var c = a.options.rect, d = document.createElement("canvas");
    d.width = c.width;
    d.height = c.height;
    d.getContext("2d").drawImage(a.image, c.left, c.top, c.width, c.height, 0, 0, c.width, c.height);
    var e = a.canvas.getContext("2d");
    e.clearRect(c.left, c.top, c.width, c.height);
    e.scale(1, -1);
    e.drawImage(d, c.left, -c.top - c.height, c.width, c.height);
    a.useData = false;
    return true
  }else {
    if(Pixastic.Client.isIE()) {
      a.image.style.filter += " flipv";
      return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas() || Pixastic.Client.isIE()
}};
Pixastic.Actions.glow = {process:function(a) {
  var c = parseFloat(a.options.amount) || 0, d = parseFloat(a.options.radius) || 0;
  c = Math.min(1, Math.max(0, c));
  d = Math.min(5, Math.max(0, d));
  if(Pixastic.Client.hasCanvasImageData()) {
    var e = a.options.rect, g = document.createElement("canvas");
    g.width = a.width;
    g.height = a.height;
    var b = g.getContext("2d");
    b.drawImage(a.canvas, 0, 0);
    var f = Math.round(a.width / 2), h = Math.round(a.height / 2), k = document.createElement("canvas");
    k.width = f;
    k.height = h;
    d = Math.round(d * 20);
    for(var m = k.getContext("2d"), q = 0;q < d;q++) {
      var o = Math.max(1, Math.round(f - q)), l = Math.max(1, Math.round(h - q));
      m.clearRect(0, 0, f, h);
      m.drawImage(g, 0, 0, a.width, a.height, 0, 0, o, l);
      b.clearRect(0, 0, a.width, a.height);
      b.drawImage(k, 0, 0, o, l, 0, 0, a.width, a.height)
    }b = Pixastic.prepareData(a);
    a = Pixastic.prepareData({canvas:g, options:a.options});
    e = e.width * e.height;
    g = e * 4;
    f = g + 1;
    for(h = g + 2;e--;) {
      if((b[g -= 4] += c * a[g]) > 255) {
        b[g] = 255
      }if((b[f -= 4] += c * a[f]) > 255) {
        b[f] = 255
      }if((b[h -= 4] += c * a[h]) > 255) {
        b[h] = 255
      }
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.histogram = {process:function(a) {
  var c = !!(a.options.average && a.options.average != "false"), d = !!(a.options.paint && a.options.paint != "false"), e = a.options.color || "rgba(255,255,255,0.5)", g = [];
  if(typeof a.options.returnValue != "object") {
    a.options.returnValue = {values:[]}
  }var b = a.options.returnValue;
  if(typeof b.values != "array") {
    b.values = []
  }g = b.values;
  if(Pixastic.Client.hasCanvasImageData()) {
    var f = Pixastic.prepareData(a);
    a.useData = false;
    for(var h = 0;h < 256;h++) {
      g[h] = 0
    }h = a.options.rect;
    h = h.width * h.height;
    var k = h * 4, m = Math.round;
    if(c) {
      for(;h--;) {
        g[m((f[k -= 4] + f[k + 1] + f[k + 2]) / 3)]++
      }
    }else {
      for(;h--;) {
        g[m(f[k -= 4] * 0.3 + f[k + 1] * 0.59 + f[k + 2] * 0.11)]++
      }
    }if(d) {
      for(h = c = 0;h < 256;h++) {
        if(g[h] > c) {
          c = g[h]
        }
      }c = a.height / c;
      d = a.width / 256;
      f = a.canvas.getContext("2d");
      f.fillStyle = e;
      for(h = 0;h < 256;h++) {
        f.fillRect(h * d, a.height - c * g[h], d, g[h] * c)
      }
    }b.values = g;
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.hsl = {process:function(a) {
  var c = parseInt(a.options.hue, 10) || 0, d = (parseInt(a.options.saturation, 10) || 0) / 100, e = (parseInt(a.options.lightness, 10) || 0) / 100, g = d < 0 ? 1 + d : 1 + d * 2;
  c = c % 360 / 360;
  var b = c * 6, f = e * 255, h = 1 + e, k = 1 - e;
  if(Pixastic.Client.hasCanvasImageData()) {
    var m = Pixastic.prepareData(a);
    a = a.options.rect;
    a = a.width * a.height;
    for(var q = a * 4, o = q + 1, l = q + 2;a--;) {
      var n = m[q -= 4], p = m[o = q + 1], r = m[l = q + 2];
      if(c != 0 || d != 0) {
        var s = n;
        if(p > s) {
          s = p
        }if(r > s) {
          s = r
        }var u = n;
        if(p < u) {
          u = p
        }if(r < u) {
          u = r
        }var v = s - u, w = (u + s) / 510;
        if(w > 0) {
          if(v > 0) {
            if(w <= 0.5) {
              var y = v / (s + u) * g;
              if(y > 1) {
                y = 1
              }y = w * (1 + y)
            }else {
              y = v / (510 - s - u) * g;
              if(y > 1) {
                y = 1
              }y = w + y - w * y
            }s = n == s ? p == u ? 5 + (s - r) / v + b : 1 - (s - p) / v + b : p == s ? r == u ? 1 + (s - n) / v + b : 3 - (s - r) / v + b : n == u ? 3 + (s - p) / v + b : 5 - (s - n) / v + b;
            if(s < 0) {
              s += 6
            }if(s >= 6) {
              s -= 6
            }w = w + w - y;
            u = s >> 0;
            if(u == 0) {
              n = y * 255;
              p = (w + (y - w) * (s - u)) * 255;
              r = w * 255
            }else {
              if(u == 1) {
                n = (y - (y - w) * (s - u)) * 255;
                p = y * 255;
                r = w * 255
              }else {
                if(u == 2) {
                  n = w * 255;
                  p = y * 255;
                  r = (w + (y - w) * (s - u)) * 255
                }else {
                  if(u == 3) {
                    n = w * 255;
                    p = (y - (y - w) * (s - u)) * 255;
                    r = y * 255
                  }else {
                    if(u == 4) {
                      n = (w + (y - w) * (s - u)) * 255;
                      p = w * 255;
                      r = y * 255
                    }else {
                      if(u == 5) {
                        n = y * 255;
                        p = w * 255;
                        r = (y - (y - w) * (s - u)) * 255
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }if(e < 0) {
        n *= h;
        p *= h;
        r *= h
      }else {
        if(e > 0) {
          n = n * k + f;
          p = p * k + f;
          r = r * k + f
        }
      }m[q] = n < 0 ? 0 : n > 255 ? 255 : n;
      m[o] = p < 0 ? 0 : p > 255 ? 255 : p;
      m[l] = r < 0 ? 0 : r > 255 ? 255 : r
    }return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.invert = {process:function(a) {
  if(Pixastic.Client.hasCanvasImageData()) {
    var c = Pixastic.prepareData(a), d = !!a.options.invertAlpha;
    a = a.options.rect;
    a = a.width * a.height;
    for(var e = a * 4, g = e + 1, b = e + 2, f = e + 3;a--;) {
      c[e -= 4] = 255 - c[e];
      c[g -= 4] = 255 - c[g];
      c[b -= 4] = 255 - c[b];
      if(d) {
        c[f -= 4] = 255 - c[f]
      }
    }return true
  }else {
    if(Pixastic.Client.isIE()) {
      a.image.style.filter += " invert";
      return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE()
}};
Pixastic.Actions.laplace = {process:function(a) {
  var c = !!(a.options.invert && a.options.invert != "false"), d = parseFloat(a.options.edgeStrength) || 0, e = parseInt(a.options.greyLevel) || 0;
  d = -d;
  if(Pixastic.Client.hasCanvasImageData()) {
    var g = Pixastic.prepareData(a), b = Pixastic.prepareData(a, true), f = a.options.rect;
    a = f.width;
    f = f.height;
    var h = a * 4, k = f;
    do {
      var m = (k - 1) * h, q = (k == 1 ? 0 : k - 2) * a * 4, o = (k == f ? k - 1 : k) * a * 4, l = a;
      do {
        var n = m + (l * 4 - 4), p = q + (l == 1 ? 0 : l - 2) * 4, r = o + (l == a ? l - 1 : l) * 4;
        p = ((-b[p - 4] - b[p] - b[p + 4] - b[n - 4] - b[n + 4] - b[r - 4] - b[r] - b[r + 4] + b[n] * 8) * 0.125 + (-b[p - 3] - b[p + 1] - b[p + 5] - b[n - 3] - b[n + 5] - b[r - 3] - b[r + 1] - b[r + 5] + b[n + 1] * 8) * 0.125 + (-b[p - 2] - b[p + 2] - b[p + 6] - b[n - 2] - b[n + 6] - b[r - 2] - b[r + 2] - b[r + 6] + b[n + 2] * 8) * 0.125) / 3 + e;
        if(d != 0) {
          if(p > 127) {
            p += (p + 1 - 128) * d
          }else {
            if(p < 127) {
              p -= (p + 1) * d
            }
          }
        }if(c) {
          p = 255 - p
        }if(p < 0) {
          p = 0
        }if(p > 255) {
          p = 255
        }g[n] = g[n + 1] = g[n + 2] = p
      }while(--l)
    }while(--k);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.lighten = {process:function(a) {
  var c = parseFloat(a.options.amount) || 0;
  c = Math.max(-1, Math.min(1, c));
  if(Pixastic.Client.hasCanvasImageData()) {
    var d = Pixastic.prepareData(a);
    a = a.options.rect;
    a = a.width * a.height;
    var e = a * 4, g = e + 1, b = e + 2;
    for(c = c + 1;a--;) {
      if((d[e -= 4] = d[e] * c) > 255) {
        d[e] = 255
      }if((d[g -= 4] = d[g] * c) > 255) {
        d[g] = 255
      }if((d[b -= 4] = d[b] * c) > 255) {
        d[b] = 255
      }
    }return true
  }else {
    if(Pixastic.Client.isIE()) {
      d = a.image;
      if(c < 0) {
        d.style.filter += " light()";
        d.filters[d.filters.length - 1].addAmbient(255, 255, 255, 100 * -c)
      }else {
        if(c > 0) {
          d.style.filter += " light()";
          d.filters[d.filters.length - 1].addAmbient(255, 255, 255, 100);
          d.filters[d.filters.length - 1].addAmbient(255, 255, 255, 100 * c)
        }
      }return true
    }
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData() || Pixastic.Client.isIE()
}};
Pixastic.Actions.mosaic = {process:function(a) {
  var c = Math.max(1, parseInt(a.options.blockSize, 10));
  if(Pixastic.Client.hasCanvasImageData()) {
    var d = a.options.rect, e = d.width, g = d.height, b = g, f = a.canvas.getContext("2d");
    b = document.createElement("canvas");
    b.width = b.height = 1;
    var h = b.getContext("2d"), k = document.createElement("canvas");
    k.width = e;
    k.height = g;
    k.getContext("2d").drawImage(a.canvas, d.left, d.top, e, g, 0, 0, e, g);
    for(b = 0;b < g;b += c) {
      for(var m = 0;m < e;m += c) {
        var q = c, o = c;
        if(q + m > e) {
          q = e - m
        }if(o + b > g) {
          o = g - b
        }h.drawImage(k, m, b, q, o, 0, 0, 1, 1);
        q = h.getImageData(0, 0, 1, 1).data;
        f.fillStyle = "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")";
        f.fillRect(d.left + m, d.top + b, c, c)
      }
    }a.useData = false;
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.noise = {process:function(a) {
  var c = 0, d = 0, e = false;
  if(typeof a.options.amount != "undefined") {
    c = parseFloat(a.options.amount) || 0
  }if(typeof a.options.strength != "undefined") {
    d = parseFloat(a.options.strength) || 0
  }if(typeof a.options.mono != "undefined") {
    e = !!(a.options.mono && a.options.mono != "false")
  }c = Math.max(0, Math.min(1, c));
  d = Math.max(0, Math.min(1, d));
  d = 128 * d;
  var g = d / 2;
  if(Pixastic.Client.hasCanvasImageData()) {
    var b = Pixastic.prepareData(a), f = a.options.rect;
    a = f.width;
    var h = a * 4;
    f = f.height;
    var k = Math.random;
    do {
      var m = (f - 1) * h, q = a;
      do {
        var o = m + (q - 1) * 4;
        if(k() < c) {
          if(e) {
            var l = -g + k() * d, n = b[o] + l, p = b[o + 1] + l;
            l = b[o + 2] + l
          }else {
            n = b[o] - g + k() * d;
            p = b[o + 1] - g + k() * d;
            l = b[o + 2] - g + k() * d
          }if(n < 0) {
            n = 0
          }if(p < 0) {
            p = 0
          }if(l < 0) {
            l = 0
          }if(n > 255) {
            n = 255
          }if(p > 255) {
            p = 255
          }if(l > 255) {
            l = 255
          }b[o] = n;
          b[o + 1] = p;
          b[o + 2] = l
        }
      }while(--q)
    }while(--f);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.posterize = {process:function(a) {
  var c = 256;
  if(typeof a.options.levels != "undefined") {
    c = parseInt(a.options.levels, 10) || 1
  }if(Pixastic.Client.hasCanvasImageData()) {
    var d = Pixastic.prepareData(a);
    c = Math.max(2, Math.min(256, c));
    var e = 256 / c;
    c = 256 / (c - 1);
    var g = a.options.rect;
    a = g.width;
    var b = a * 4;
    g = g.height;
    do {
      var f = (g - 1) * b, h = a;
      do {
        var k = f + (h - 1) * 4, m = c * (d[k] / e >> 0), q = c * (d[k + 1] / e >> 0), o = c * (d[k + 2] / e >> 0);
        if(m > 255) {
          m = 255
        }if(q > 255) {
          q = 255
        }if(o > 255) {
          o = 255
        }d[k] = m;
        d[k + 1] = q;
        d[k + 2] = o
      }while(--h)
    }while(--g);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.pointillize = {process:function(a) {
  var c = Math.max(1, parseInt(a.options.radius, 10)), d = Math.min(5, Math.max(0, parseFloat(a.options.density) || 0)), e = Math.max(0, parseFloat(a.options.noise) || 0), g = !!(a.options.transparent && a.options.transparent != "false");
  if(Pixastic.Client.hasCanvasImageData()) {
    var b = a.options.rect, f = b.width, h = b.height, k = h, m = a.canvas.getContext("2d"), q = a.canvas.width, o = a.canvas.height;
    k = document.createElement("canvas");
    k.width = k.height = 1;
    var l = k.getContext("2d"), n = document.createElement("canvas");
    n.width = f;
    n.height = h;
    n.getContext("2d").drawImage(a.canvas, b.left, b.top, f, h, 0, 0, f, h);
    var p = c * 2;
    g && m.clearRect(b.left, b.top, b.width, b.height);
    g = c * e;
    d = 1 / d;
    for(k = 0;k < h + c;k += p * d) {
      for(var r = 0;r < f + c;r += p * d) {
        rndX = e ? r + (Math.random() * 2 - 1) * g >> 0 : r;
        rndY = e ? k + (Math.random() * 2 - 1) * g >> 0 : k;
        var s = rndX - c, u = rndY - c;
        if(s < 0) {
          s = 0
        }if(u < 0) {
          u = 0
        }var v = rndX + b.left, w = rndY + b.top;
        if(v < 0) {
          v = 0
        }if(v > q) {
          v = q
        }if(w < 0) {
          w = 0
        }if(w > o) {
          w = o
        }var y = p, B = p;
        if(y + s > f) {
          y = f - s
        }if(B + u > h) {
          B = h - u
        }if(y < 1) {
          y = 1
        }if(B < 1) {
          B = 1
        }l.drawImage(n, s, u, y, B, 0, 0, 1, 1);
        s = l.getImageData(0, 0, 1, 1).data;
        m.fillStyle = "rgb(" + s[0] + "," + s[1] + "," + s[2] + ")";
        m.beginPath();
        m.arc(v, w, c, 0, Math.PI * 2, true);
        m.closePath();
        m.fill()
      }
    }a.useData = false;
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.removenoise = {process:function(a) {
  if(Pixastic.Client.hasCanvasImageData()) {
    var c = Pixastic.prepareData(a), d = a.options.rect;
    a = d.width;
    d = d.height;
    var e = a * 4, g = d;
    do {
      var b = (g - 1) * e, f = (g == 1 ? 0 : g - 2) * a * 4, h = (g == d ? g - 1 : g) * a * 4, k = a;
      do {
        var m = b + (k * 4 - 4), q = f + (k == 1 ? 0 : k - 2) * 4, o = h + (k == a ? k - 1 : k) * 4, l, n, p, r, s;
        l = n = c[q];
        p = c[m - 4];
        r = c[m + 4];
        s = c[o];
        if(p < l) {
          l = p
        }if(r < l) {
          l = r
        }if(s < l) {
          l = s
        }if(p > n) {
          n = p
        }if(r > n) {
          n = r
        }if(s > n) {
          n = s
        }p = r = c[q + 1];
        s = c[m - 3];
        var u = c[m + 5], v = c[o + 1];
        if(s < p) {
          p = s
        }if(u < p) {
          p = u
        }if(v < p) {
          p = v
        }if(s > r) {
          r = s
        }if(u > r) {
          r = u
        }if(v > r) {
          r = v
        }q = s = c[q + 2];
        u = c[m - 2];
        v = c[m + 6];
        o = c[o + 2];
        if(u < q) {
          q = u
        }if(v < q) {
          q = v
        }if(o < q) {
          q = o
        }if(u > s) {
          s = u
        }if(v > s) {
          s = v
        }if(o > s) {
          s = o
        }if(c[m] > n) {
          c[m] = n
        }else {
          if(c[m] < l) {
            c[m] = l
          }
        }if(c[m + 1] > r) {
          c[m + 1] = r
        }else {
          if(c[m + 1] < p) {
            c[m + 1] = p
          }
        }if(c[m + 2] > s) {
          c[m + 2] = s
        }else {
          if(c[m + 2] < q) {
            c[m + 2] = q
          }
        }
      }while(--k)
    }while(--g);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.resize = {process:function(a) {
  if(Pixastic.Client.hasCanvas()) {
    var c = parseInt(a.options.width, 10), d = parseInt(a.options.height, 10), e = a.canvas;
    if(c < 1) {
      c = 1
    }if(c < 2) {
      c = 2
    }var g = document.createElement("canvas");
    g.width = c;
    g.height = d;
    g.getContext("2d").drawImage(e, 0, 0, c, d);
    e.width = c;
    e.height = d;
    e.getContext("2d").drawImage(g, 0, 0);
    a.useData = false;
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas()
}};
Pixastic.Actions.rotate = {process:function(a) {
  if(Pixastic.Client.hasCanvas()) {
    var c = a.canvas, d = a.width, e = a.height, g = document.createElement("canvas");
    g.width = d;
    g.height = e;
    g.getContext("2d").drawImage(c, 0, 0, d, e);
    var b = -parseFloat(a.options.angle) * Math.PI / 180, f = b;
    if(f > Math.PI * 0.5) {
      f = Math.PI - f
    }if(f < -Math.PI * 0.5) {
      f = -Math.PI - f
    }var h = Math.sqrt(d * d + e * e), k = Math.abs(f) - Math.abs(Math.atan2(e, d));
    f = Math.abs(f) + Math.abs(Math.atan2(e, d));
    k = Math.abs(Math.cos(k) * h);
    h = Math.abs(Math.sin(f) * h);
    c.width = k;
    c.height = h;
    c = c.getContext("2d");
    c.translate(k / 2, h / 2);
    c.rotate(b);
    c.drawImage(g, -d / 2, -e / 2);
    a.useData = false;
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvas()
}};
Pixastic.Actions.sepia = {process:function(a) {
  var c = parseInt(a.options.mode, 10) || 0;
  if(c < 0) {
    c = 0
  }if(c > 1) {
    c = 1
  }if(Pixastic.Client.hasCanvasImageData()) {
    var d = Pixastic.prepareData(a), e = a.options.rect;
    a = e.width;
    var g = a * 4;
    e = e.height;
    do {
      var b = (e - 1) * g, f = a;
      do {
        var h = b + (f - 1) * 4;
        if(c) {
          var k = d[h] * 0.299 + d[h + 1] * 0.587 + d[h + 2] * 0.114, m = k + 39, q = k + 14;
          k = k - 36
        }else {
          k = d[h];
          var o = d[h + 1], l = d[h + 2];
          m = k * 0.393 + o * 0.769 + l * 0.189;
          q = k * 0.349 + o * 0.686 + l * 0.168;
          k = k * 0.272 + o * 0.534 + l * 0.131
        }if(m < 0) {
          m = 0
        }if(m > 255) {
          m = 255
        }if(q < 0) {
          q = 0
        }if(q > 255) {
          q = 255
        }if(k < 0) {
          k = 0
        }if(k > 255) {
          k = 255
        }d[h] = m;
        d[h + 1] = q;
        d[h + 2] = k
      }while(--f)
    }while(--e);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.sharpen = {process:function(a) {
  var c = 0;
  if(typeof a.options.amount != "undefined") {
    c = parseFloat(a.options.amount) || 0
  }if(c < 0) {
    c = 0
  }if(c > 1) {
    c = 1
  }if(Pixastic.Client.hasCanvasImageData()) {
    var d = Pixastic.prepareData(a), e = Pixastic.prepareData(a, true), g = 15;
    c = 1 + 3 * c;
    for(var b = [[0, -c, 0], [-c, g, -c], [0, -c, 0]], f = 0, h = 0;h < 3;h++) {
      for(var k = 0;k < 3;k++) {
        f += b[h][k]
      }
    }f = 1 / f;
    b = a.options.rect;
    a = b.width;
    b = b.height;
    g *= f;
    c *= f;
    f = a * 4;
    h = b;
    do {
      k = (h - 1) * f;
      var m = (h == 1 ? 0 : h - 2) * f, q = (h == b ? h - 1 : h) * f, o = a;
      do {
        var l = k + (o * 4 - 4), n = m + (o == 1 ? 0 : o - 2) * 4, p = q + (o == a ? o - 1 : o) * 4, r = (-e[n] - e[l - 4] - e[l + 4] - e[p]) * c + e[l] * g, s = (-e[n + 1] - e[l - 3] - e[l + 5] - e[p + 1]) * c + e[l + 1] * g;
        n = (-e[n + 2] - e[l - 2] - e[l + 6] - e[p + 2]) * c + e[l + 2] * g;
        if(r < 0) {
          r = 0
        }if(s < 0) {
          s = 0
        }if(n < 0) {
          n = 0
        }if(r > 255) {
          r = 255
        }if(s > 255) {
          s = 255
        }if(n > 255) {
          n = 255
        }d[l] = r;
        d[l + 1] = s;
        d[l + 2] = n
      }while(--o)
    }while(--h);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.solarize = {process:function(a) {
  if(Pixastic.Client.hasCanvasImageData()) {
    var c = Pixastic.prepareData(a), d = a.options.rect;
    a = d.width;
    var e = a * 4;
    d = d.height;
    do {
      var g = (d - 1) * e, b = a;
      do {
        var f = g + (b - 1) * 4, h = c[f], k = c[f + 1], m = c[f + 2];
        if(h > 127) {
          h = 255 - h
        }if(k > 127) {
          k = 255 - k
        }if(m > 127) {
          m = 255 - m
        }c[f] = h;
        c[f + 1] = k;
        c[f + 2] = m
      }while(--b)
    }while(--d);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
Pixastic.Actions.unsharpmask = {process:function(a) {
  var c = parseFloat(a.options.amount) || 0, d = parseFloat(a.options.radius) || 0, e = parseFloat(a.options.threshold) || 0;
  c = Math.min(500, Math.max(0, c)) / 2;
  d = Math.min(5, Math.max(0, d)) / 10;
  e = Math.min(255, Math.max(0, e));
  e--;
  var g = -e;
  c *= 0.016;
  c++;
  if(Pixastic.Client.hasCanvasImageData()) {
    var b = a.options.rect, f = document.createElement("canvas");
    f.width = a.width;
    f.height = a.height;
    var h = f.getContext("2d");
    h.drawImage(a.canvas, 0, 0);
    var k = Math.round(a.width / 2), m = Math.round(a.height / 2), q = document.createElement("canvas");
    q.width = k;
    q.height = m;
    d = Math.round(d * 20);
    for(var o = q.getContext("2d"), l = 0;l < d;l++) {
      var n = Math.max(1, Math.round(k - l)), p = Math.max(1, Math.round(m - l));
      o.clearRect(0, 0, k, m);
      o.drawImage(f, 0, 0, a.width, a.height, 0, 0, n, p);
      h.clearRect(0, 0, a.width, a.height);
      h.drawImage(q, 0, 0, n, p, 0, 0, a.width, a.height)
    }h = Pixastic.prepareData(a);
    a = Pixastic.prepareData({canvas:f, options:a.options});
    f = b.width;
    k = f * 4;
    b = b.height;
    do {
      m = (b - 1) * k;
      q = f;
      do {
        d = m + (q * 4 - 4);
        o = h[d] - a[d];
        if(o > e || o < g) {
          l = a[d];
          l = c * o + l;
          h[d] = l > 255 ? 255 : l < 0 ? 0 : l
        }o = h[d + 1] - a[d + 1];
        if(o > e || o < g) {
          l = a[d + 1];
          l = c * o + l;
          h[d + 1] = l > 255 ? 255 : l < 0 ? 0 : l
        }o = h[d + 2] - a[d + 2];
        if(o > e || o < g) {
          l = a[d + 2];
          l = c * o + l;
          h[d + 2] = l > 255 ? 255 : l < 0 ? 0 : l
        }
      }while(--q)
    }while(--b);
    return true
  }
}, checkSupport:function() {
  return Pixastic.Client.hasCanvasImageData()
}};
define("lib/pixastic", function() {
});
(function() {
  function a() {
    app.container.height(document.body.scrollHeight - app.container.offset().top)
  }
  function c() {
    var d = (new Date).getTime();
    app.container = $("#workspace");
    app.controldispatcher.initialize();
    app.load(LOADED.files);
    $("#modal").resizable();
    app.resize();
    $(document).bind("keydown", "Ctrl+c", app.clipboard.copy);
    $(document).bind("keydown", "Ctrl+v", app.clipboard.paste);
    $("#control-select").click();
    $("#layer-list").click(function(e) {
      e = $(e.target);
      if(e.is("input")) {
        var g = e.closest("li").attr("data-ind");
        g = app.files.current.layers[g];
        e.is(":checked") ? g.show() : g.hide()
      }
    });
    app.files.active[0].makeActive();
    log("Loaded in " + ((new Date).getTime() - d) + " ms")
  }
  app.resize = a;
  app.initialize = c
})();
define("app/app.init", function() {
});
app.clipboard = function() {
  var a = {}, c = null;
  a.copy = function() {
    log("here");
    c = {touhed:true}
  };
  a.paste = function() {
    log("HERE", a.getData())
  };
  a.getData = function() {
    return c
  };
  return a
}();
define("app/app.clipboard", function() {
});
app.controldispatcher = {};
app.controldispatcher.dispatch = function(a) {
  $(app.container).trigger("control." + a.type, [a])
};
app.controldispatcher.initialize = function() {
  var a = [], c = 0, d = ["control.mousemove", "control.mouseup", "control.click", "control.mousedown"];
  for(var e in app.controls) {
    var g = app.controls[e];
    g.id = e;
    g.ind = c++;
    a.push(g)
  }c = $("#templateControl").tmpl(a);
  $("#control-list").append(c).click(function(b) {
    if($(b.target).is("li")) {
      b = $(b.target);
      var f = h, h = a[b.attr("data-index")];
      f && f.deactivate && f.deactivate();
      h.activate && h.activate();
      b.addClass("active").siblings().removeClass("active");
      $.each(d, function(k, m) {
        $(app.container).unbind(m)
      });
      app.controldispatcher.bindControl(h, "control.mousemove", "mousemove");
      app.controldispatcher.bindControl(h, "control.mousedown", "mousestart");
      app.controldispatcher.bindControl(h, "control.mouseup", "mouseup")
    }
  })
};
app.controldispatcher.bindControl = function(a, c, d) {
  var e = a[d];
  e && $(app.container).bind(c, function(g, b) {
    g = b.data.file.editor.offset();
    b.data.fileX = b.pageX - g.left;
    b.data.fileY = b.pageY - g.top;
    e(b)
  })
};
app.controls = {};
app.controls.pointer = {id:"pointer", alt:"pointer", activate:function() {
  $(app.container).css("cursor", "move")
}, deactivate:function() {
  $(app.container).css("cursor", "normal")
}, mousemove:function() {
}, mousestart:function() {
}, mouseup:function() {
}};
app.controls.select = function() {
  var a = {}, c = false, d = [], e = [], g = $("<div class='selection-helper'></div>");
  a.id = "select";
  a.alt = "select";
  a.activate = function() {
  };
  a.mousemove = function(b) {
    var f = d[0], h = d[1], k = b.data.fileX;
    b = b.data.fileY;
    if(f > k) {
      var m = k;
      k = f;
      f = m
    }if(h > b) {
      m = b;
      b = h;
      h = m
    }g.css({left:f, top:h, width:k - f, height:b - h})
  };
  a.mousestart = function(b) {
    var f = b.data.file;
    f.removeSelection();
    f.addMask();
    g.css({left:b.data.fileX, top:b.data.fileY, width:0, height:0}).appendTo(f.editor);
    c = true;
    d = [b.data.fileX, b.data.fileY]
  };
  a.mouseup = function(b) {
    var f = b.data.file;
    c = false;
    e = [b.data.fileX, b.data.fileY];
    g.remove();
    f.removeMask();
    d != e && b.data.file.addSelection(d, e)
  };
  a.deactivate = function() {
  };
  return a
}();
app.controls.blur = function() {
  var a = {};
  a.id = "blur";
  a.alt = "blur";
  a.activate = function() {
  };
  a.mousestart = function(c) {
    log("mousestart");
    c.data.file.process("sepia")
  };
  return a
}();
app.controls.fill = function() {
  var a = {};
  a.id = "fill";
  a.alt = "fill";
  a.activate = function() {
  };
  a.mousestart = function(c) {
    c.data.file.process("sepia")
  };
  return a
}();
app.controls.wand = {id:"wand", alt:"wand", activate:function() {
}, deactivate:function() {
}};
define("app/app.controls", function() {
});
(function() {
  var a = this.app || (this.app = {});
  a.files = {};
  a.files.active = [];
  a.files.current = null;
  a.files.dom = $([]);
  a.files.template = "#templateFile";
  a.files.add = function(c) {
    c = a.files.instance(c);
    a.files.active.push(c);
    a.files.dom.add(c.container);
    return c
  };
  a.files.instance = function(c) {
    var d = {};
    d.opts = c;
    d.name = c.name;
    var e = d.layers = [], g = $("<div class='mask'></div>"), b = d.container = $(a.files.template).tmpl([c]), f = d.editor = d.container.find(".editor"), h = d.selection = [], k = d.width = c.size[0], m = d.height = c.size[1];
    d.scroller = d.container.find(".editor-container");
    d.addlayer = function(q) {
      q.redraw(k, m);
      q.container.appendTo(f);
      q.ind = e.length;
      e.push(q);
      d.orderLayers()
    };
    d.removeLayer = function() {
    };
    d.addMask = function() {
      g.width(f.width()).height(f.height());
      f.append(g)
    };
    d.eachPx = function() {
    };
    d.removeMask = function() {
      g.remove()
    };
    d.addSelection = function(q, o) {
      var l = Math.min(q[0], o[0]), n = Math.min(q[1], o[1]), p = Math.max(q[0], o[0]);
      q = Math.max(q[1], o[1]);
      o = Math.abs(p - l);
      var r = Math.abs(q - n);
      h = [[l, n], [p, q]];
      d.getSelectedCanvas();
      l = $("<div class='selection'></div>").css({top:n, left:l}).width(o).height(r);
      d.editor.append(l)
    };
    d.getSelectedCanvas = function() {
      if(!h.length) {
        return null
      }var q = h[0][0], o = h[0][1], l = h[1][0] - q, n = h[1][1] - o, p = e[0], r = document.createElement("canvas"), s = r.getContext("2d");
      r.width = l;
      r.height = n;
      s.drawImage(p.canvas, q, o, l, n, 0, 0, l, n);
      return r
    };
    d.setSelectedCanvas = function(q) {
      if(!h.length) {
        return null
      }e[0].context.drawImage(q, h[0][0], h[0][1])
    };
    d.process = function(q) {
      var o = {}, l = d.getSelectedCanvas();
      Pixastic.process(l, q, o);
      d.setSelectedCanvas(o.resultCanvas);
      return o
    };
    d.removeSelection = function() {
      d.editor.find(".selection").remove()
    };
    d.orderLayers = function() {
      for(var q = e.length, o = 0;o < e.length;o++) {
        log(e[o].name);
        e[o].container.css({zIndex:q--})
      }
    };
    d.resetLayerOrder = function(q) {
      for(var o = [], l = 0;l < q.length;l++) {
        var n = e[q[l]];
        n.ind = l;
        o.push(n)
      }e = o;
      d.orderLayers();
      d.makeActive()
    };
    d.makeActive = function() {
      a.files.current && a.files.current.container.removeClass("active");
      a.files.current = d;
      b.addClass("active");
      var q = $("#templateLayer").tmpl(e);
      $("#layer-list").empty().append(q).sortable({update:function() {
        d.resetLayerOrder($(this).find("li").map(function() {
          return $(this).attr("data-ind")
        }).get())
      }})
    };
    d.editor.width(k).height(m);
    d.container.appendTo(a.container).width(k + d.editor.position().left).height(m + 70);
    d.container.draggable({handle:".file-title", containment:"parent"});
    d.container.resizable({alsoResize:d.scroller[0], stop:a.resize, minHeight:100, minWidth:200, containment:"parent"});
    d.container.find(".file-title").mousedown(function() {
      d.makeActive()
    });
    d.container.css({top:c.position[0], left:c.position[1], position:"absolute"});
    $(d.editor).bind("mousemove mousedown mouseup", {file:d}, a.controldispatcher.dispatch);
    return d
  }
})();
define("app/app.files", function() {
});
app.images = {};
app.images.active = [];
app.images.add = function(a) {
  a = app.images.instance(a);
  app.images.active.push(a);
  return a
};
app.images.instance = function(a) {
  var c = {}, d = c.img = new Image, e = c.canvas = document.createElement("canvas"), g = c.context = e.getContext("2d");
  c.left = a.position[0];
  c.top = a.position[1];
  var b = false, f = null;
  d.onload = function() {
    c.width = d.width;
    c.height = d.height;
    $(e).attr({width:c.width, height:c.height});
    g.drawImage(d, 0, 0, c.width, c.height);
    b = true;
    f && f()
  };
  d.src = a.src;
  $(d).addClass("hide").appendTo("body");
  c.onready = function(h) {
    if(b) {
      h()
    }else {
      f = h
    }
  };
  return c
};
define("app/app.images", function() {
});
app.layers = {};
app.layers.active = [];
app.layers.add = function(a) {
  a = app.layers.instance(a);
  app.layers.active.push(a);
  return a
};
app.layers.instance = function(a) {
  var c = {};
  c.className = "layer" + a.name;
  c.name = a.name;
  c.visible = a.visible === false ? false : true;
  c.images = [];
  a = c.canvas = document.createElement("canvas");
  var d = c.context = a.getContext("2d"), e = c.container = $(a).attr("name", c.name);
  c.redraw = function(g, b) {
    c.container.attr({width:g, height:b});
    c.drawAllImages()
  };
  c.drawAllImages = function() {
    for(var g = 0;g < c.images.length;g++) {
      c.drawImage(c.images[g])
    }
  };
  c.drawImage = function(g) {
    d.drawImage(g.canvas, g.left, g.top)
  };
  c.addimage = function(g) {
    $(g.canvas).attr("class", c.className);
    c.images.push(g);
    g.onready(c.drawAllImages)
  };
  c.getPx = function() {
  };
  c.removeimage = function() {
  };
  c.hide = function() {
    c.visible = false;
    $(e).hide()
  };
  c.show = function() {
    c.visible = true;
    $(e).show()
  };
  return c
};
define("app/app.layers", function() {
});
app.load = function(a) {
  for(var c = 0;c < a.length;c++) {
    app.load.file(a[c])
  }
};
app.load.file = function(a) {
  for(var c = app.files.add(a), d = a.layers, e = 0;e < d.length;e++) {
    var g = app.load.layer(a.layers[e]);
    c.addlayer(g)
  }return c
};
app.load.layer = function(a) {
  var c = app.layers.add(a);
  a = a.images;
  for(var d = 0;d < a.length;d++) {
    var e = app.load.image(a[d]);
    c.addimage(e)
  }return c
};
app.load.image = function(a) {
  return app.images.add(a)
};
define("app/app.loader", function() {
});