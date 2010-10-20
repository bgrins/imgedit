var require, define;
(function() {
  function J(i) {
    return da.call(i) === "[object Function]"
  }
  function F(i, k, p) {
    var o = A.plugins.defined[i];
    if(o) {
      o[p.name].apply(null, p.args)
    }else {
      o = A.plugins.waiting[i] || (A.plugins.waiting[i] = []);
      o.push(p);
      u(["require/" + i], k.contextName)
    }
  }
  function ka(i, k) {
    qa.apply(u, i);
    k.loaded[i[0]] = true
  }
  function wa(i, k, p) {
    var o, t, x;
    for(o = 0;x = k[o];o++) {
      x = typeof x === "string" ? {name:x} : x;
      t = x.location;
      if(p && (!t || t.indexOf("/") !== 0 && t.indexOf(":") === -1)) {
        x.location = p + "/" + (x.location || x.name)
      }x.location = x.location || x.name;
      x.lib = x.lib || "lib";
      x.main = x.main || "main";
      i[x.name] = x
    }
  }
  function la(i) {
    var k = true, p = i.config.priorityWait, o, t;
    if(p) {
      for(t = 0;o = p[t];t++) {
        if(!i.loaded[o]) {
          k = false;
          break
        }
      }k && delete i.config.priorityWait
    }return k
  }
  function Y(i) {
    var k, p = A.paused;
    if(i.scriptCount <= 0) {
      for(i.scriptCount = 0;ea.length;) {
        k = ea.shift();
        k[0] === null ? u.onError(new Error("Mismatched anonymous require.def modules")) : ka(k, i)
      }if(!(i.config.priorityWait && !la(i))) {
        if(p.length) {
          for(i = 0;k = p[i];i++) {
            u.checkDeps.apply(u, k)
          }
        }u.checkLoaded(A.ctxName)
      }
    }
  }
  function ra(i, k) {
    var p = A.plugins.callbacks[i] = [];
    A.plugins[i] = function() {
      for(var o = 0, t;t = p[o];o++) {
        if(t.apply(null, arguments) === true && k) {
          return true
        }
      }return false
    }
  }
  function ma(i, k) {
    if(!i.jQuery) {
      if((k = k || (typeof jQuery !== "undefined" ? jQuery : null)) && "readyWait" in k) {
        i.jQuery = k;
        if(!i.defined.jquery && !i.jQueryDef) {
          i.defined.jquery = k
        }if(i.scriptCount) {
          k.readyWait += 1;
          i.jQueryIncremented = true
        }
      }
    }
  }
  function xa(i) {
    return function(k) {
      i.exports = k
    }
  }
  function fa(i, k, p) {
    return function() {
      var o = [].concat(sa.call(arguments, 0));
      o.push(k, p);
      return(i ? require[i] : require).apply(null, o)
    }
  }
  function ya(i, k) {
    var p = i.contextName, o = fa(null, p, k);
    u.mixin(o, {modify:fa("modify", p, k), def:fa("def", p, k), get:fa("get", p, k), nameToUrl:fa("nameToUrl", p, k), ready:u.ready, context:i, config:i.config, isBrowser:A.isBrowser});
    return o
  }
  var T = {}, A, S, Z = [], na, c, za, ia, y, U = {}, Aa, Ea = /^(complete|loaded)$/, Fa = /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, Ga = /require\(["']([\w-_\.\/]+)["']\)/g, qa, R = !!(typeof window !== "undefined" && navigator && document), ta = !R && typeof importScripts !== "undefined", da = Object.prototype.toString, ba = Array.prototype, sa = ba.slice, ja, u, aa, ea = [], $ = false, ua;
  if(typeof require !== "undefined") {
    if(J(require)) {
      return
    }else {
      U = require
    }
  }u = require = function(i, k, p, o, t) {
    var x;
    if(typeof i === "string" && !J(k)) {
      return require.get(i, k, p, o)
    }if(!require.isArray(i)) {
      x = i;
      if(require.isArray(k)) {
        i = k;
        k = p;
        p = o;
        o = t
      }else {
        i = []
      }
    }qa(null, i, k, x, p, o);
    (i = A.contexts[p || x && x.context || A.ctxName]) && i.scriptCount === 0 && Y(i)
  };
  u.onError = function(i) {
    throw i;
  };
  define = u.def = function(i, k, p, o) {
    var t, x, B = ua;
    if(typeof i !== "string") {
      o = p;
      p = k;
      k = i;
      i = null
    }if(!u.isArray(k)) {
      o = p;
      p = k;
      k = []
    }if(!i && !k.length && u.isFunction(p)) {
      p.toString().replace(Fa, "").replace(Ga, function(C, N) {
        k.push(N)
      });
      k = ["require", "exports", "module"].concat(k)
    }if(!i && $) {
      t = document.getElementsByTagName("script");
      for(i = t.length - 1;i > -1 && (x = t[i]);i--) {
        if(x.readyState === "interactive") {
          B = x;
          break
        }
      }B || u.onError(new Error("ERROR: No matching script interactive for " + p));
      i = B.getAttribute("data-requiremodule")
    }if(typeof i === "string") {
      A.contexts[A.ctxName].jQueryDef = i === "jquery"
    }ea.push([i, k, p, null, o])
  };
  qa = function(i, k, p, o, t, x) {
    var B, C, N, M, I;
    t = t ? t : o && o.context ? o.context : A.ctxName;
    B = A.contexts[t];
    if(i) {
      C = i.indexOf("!");
      if(C !== -1) {
        N = i.substring(0, C);
        i = i.substring(C + 1, i.length)
      }else {
        N = B.defPlugin[i]
      }C = B.waiting[i];
      if(B && (B.defined[i] || C && C !== ba[i])) {
        return
      }
    }if(t !== A.ctxName) {
      C = A.contexts[A.ctxName] && A.contexts[A.ctxName].loaded;
      M = true;
      if(C) {
        for(I in C) {
          if(!(I in T)) {
            if(!C[I]) {
              M = false;
              break
            }
          }
        }
      }if(M) {
        A.ctxName = t
      }
    }if(!B) {
      B = {contextName:t, config:{waitSeconds:7, baseUrl:A.baseUrl || "./", paths:{}, packages:{}}, waiting:[], specified:{require:true, exports:true, module:true}, loaded:{}, scriptCount:0, urlFetched:{}, defPlugin:{}, defined:{}, modifiers:{}};
      A.plugins.newContext && A.plugins.newContext(B);
      B = A.contexts[t] = B
    }if(o) {
      if(o.baseUrl) {
        if(o.baseUrl.charAt(o.baseUrl.length - 1) !== "/") {
          o.baseUrl += "/"
        }
      }M = B.config.paths;
      C = B.config.packages;
      u.mixin(B.config, o, true);
      if(o.paths) {
        for(I in o.paths) {
          I in T || (M[I] = o.paths[I])
        }B.config.paths = M
      }if((M = o.packagePaths) || o.packages) {
        if(M) {
          for(I in M) {
            I in T || wa(C, M[I], I)
          }
        }o.packages && wa(C, o.packages);
        B.config.packages = C
      }if(o.priority) {
        u(o.priority);
        B.config.priorityWait = o.priority
      }if(o.deps || o.callback) {
        u(o.deps || [], o.callback)
      }o.ready && u.ready(o.ready);
      if(!k) {
        return
      }
    }if(k) {
      I = k;
      k = [];
      for(o = 0;o < I.length;o++) {
        k[o] = u.splitPrefix(I[o], i || x, B)
      }
    }x = B.waiting.push({name:i, deps:k, callback:p});
    if(i) {
      B.waiting[i] = x - 1;
      B.specified[i] = true;
      if(x = B.modifiers[i]) {
        u(x, t);
        if(x = x.__deferMods) {
          for(o = 0;o < x.length;o++) {
            I = x[o];
            C = I[I.length - 1];
            if(C === undefined) {
              I[I.length - 1] = t
            }else {
              typeof C === "string" && x.push(t)
            }require.def.apply(require, I)
          }
        }
      }
    }if(i && p && !u.isFunction(p)) {
      B.defined[i] = p
    }N && F(N, B, {name:"require", args:[i, k, p, B]});
    A.paused.push([N, i, k, B]);
    if(i) {
      B.loaded[i] = true;
      B.jQueryDef = i === "jquery"
    }
  };
  u.mixin = function(i, k, p) {
    for(var o in k) {
      if(!(o in T) && (!(o in i) || p)) {
        i[o] = k[o]
      }
    }return u
  };
  u.version = "0.14.5";
  A = u.s = {ctxName:"_", contexts:{}, paused:[], plugins:{defined:{}, callbacks:{}, waiting:{}}, skipAsync:{}, isBrowser:R, isPageLoaded:!R, readyCalls:[], doc:R ? document : null};
  u.isBrowser = A.isBrowser;
  if(R) {
    A.head = document.getElementsByTagName("head")[0];
    if(aa = document.getElementsByTagName("base")[0]) {
      A.head = aa.parentNode
    }
  }u.plugin = function(i) {
    var k, p, o, t = i.prefix, x = A.plugins.callbacks, B = A.plugins.waiting[t], C;
    k = A.plugins.defined;
    o = A.contexts;
    if(k[t]) {
      return u
    }k[t] = i;
    C = ["newContext", "isWaiting", "orderDeps"];
    for(k = 0;p = C[k];k++) {
      A.plugins[p] || ra(p, p === "isWaiting");
      x[p].push(i[p])
    }if(i.newContext) {
      for(p in o) {
        if(!(p in T)) {
          k = o[p];
          i.newContext(k)
        }
      }
    }if(B) {
      for(k = 0;o = B[k];k++) {
        i[o.name] && i[o.name].apply(null, o.args)
      }delete A.plugins.waiting[t]
    }return u
  };
  u.completeLoad = function(i, k) {
    for(var p;ea.length;) {
      p = ea.shift();
      if(p[0] === null) {
        p[0] = i;
        break
      }else {
        if(p[0] === i) {
          break
        }else {
          ka(p, k)
        }
      }
    }p && ka(p, k);
    k.loaded[i] = true;
    ma(k);
    k.scriptCount -= 1;
    Y(k)
  };
  u.pause = u.resume = function() {
  };
  u.checkDeps = function(i, k, p, o) {
    if(i) {
      F(i, o, {name:"checkDeps", args:[k, p, o]})
    }else {
      for(i = 0;k = p[i];i++) {
        if(!o.specified[k.fullName]) {
          o.specified[k.fullName] = true;
          o.startTime = (new Date).getTime();
          k.prefix ? F(k.prefix, o, {name:"load", args:[k.name, o.contextName]}) : u.load(k.name, o.contextName)
        }
      }
    }
  };
  u.modify = function(i, k, p, o, t) {
    var x, B, C = (typeof i === "string" ? t : k) || A.ctxName, N = A.contexts[C], M = N.modifiers;
    if(typeof i === "string") {
      B = M[i] || (M[i] = []);
      if(!B[k]) {
        B.push(k);
        B[k] = true
      }N.specified[i] ? u.def(k, p, o, t) : (B.__deferMods || (B.__deferMods = [])).push([k, p, o, t])
    }else {
      for(x in i) {
        if(!(x in T)) {
          k = i[x];
          B = M[x] || (N.modifiers[x] = []);
          if(!B[k]) {
            B.push(k);
            B[k] = true;
            N.specified[x] && u([k], C)
          }
        }
      }
    }
  };
  u.isArray = function(i) {
    return da.call(i) === "[object Array]"
  };
  u.isFunction = J;
  u.get = function(i, k, p) {
    if(i === "require" || i === "exports" || i === "module") {
      u.onError(new Error("Explicit require of " + i + " is not allowed."))
    }k = k || A.ctxName;
    var o = A.contexts[k];
    i = u.normalizeName(i, p, o);
    p = o.defined[i];
    p === undefined && u.onError(new Error("require: module name '" + i + "' has not been loaded yet for context: " + k));
    return p
  };
  u.load = function(i, k) {
    var p = A.contexts[k], o = p.urlFetched, t = p.loaded;
    A.isDone = false;
    t[i] || (t[i] = false);
    if(k !== A.ctxName) {
      Z.push(arguments)
    }else {
      t = u.nameToUrl(i, null, k);
      if(!o[t]) {
        p.scriptCount += 1;
        u.attach(t, k, i);
        o[t] = true;
        if(p.jQuery && !p.jQueryIncremented) {
          p.jQuery.readyWait += 1;
          p.jQueryIncremented = true
        }
      }
    }
  };
  u.jsExtRegExp = /\.js$/;
  u.normalizeName = function(i, k, p) {
    if(i.charAt(0) === ".") {
      k || u.onError(new Error("Cannot normalize module name: " + i + ", no relative module name available."));
      if(p.config.packages[k]) {
        k = [k]
      }else {
        k = k.split("/");
        k = k.slice(0, k.length - 1)
      }i = k.concat(i.split("/"));
      for(S = 0;k = i[S];S++) {
        if(k === ".") {
          i.splice(S, 1);
          S -= 1
        }else {
          if(k === "..") {
            i.splice(S - 1, 2);
            S -= 2
          }
        }
      }i = i.join("/")
    }return i
  };
  u.splitPrefix = function(i, k, p) {
    var o = i.indexOf("!"), t = null;
    if(o !== -1) {
      t = i.substring(0, o);
      i = i.substring(o + 1, i.length)
    }i = u.normalizeName(i, k, p);
    return{prefix:t, name:i, fullName:t ? t + "!" + i : i}
  };
  u.nameToUrl = function(i, k, p, o) {
    var t, x, B, C;
    C = A.contexts[p];
    p = C.config;
    i = u.normalizeName(i, o, C);
    if(i.indexOf(":") !== -1 || i.charAt(0) === "/" || u.jsExtRegExp.test(i)) {
      i += k ? k : ""
    }else {
      t = p.paths;
      x = p.packages;
      o = i.split("/");
      for(C = o.length;C > 0;C--) {
        B = o.slice(0, C).join("/");
        if(t[B]) {
          o.splice(0, C, t[B]);
          break
        }else {
          if(B = x[B]) {
            t = B.location + "/" + B.lib;
            if(i === B.name) {
              t += "/" + B.main
            }o.splice(0, C, t);
            break
          }
        }
      }i = o.join("/") + (k || ".js");
      i = (i.charAt(0) === "/" || i.match(/^\w+:/) ? "" : p.baseUrl) + i
    }return p.urlArgs ? i + ((i.indexOf("?") === -1 ? "?" : "&") + p.urlArgs) : i
  };
  u.checkLoaded = function(i) {
    var k = A.contexts[i || A.ctxName], p = k.config.waitSeconds * 1E3, o = p && k.startTime + p < (new Date).getTime(), t, x = k.defined, B = k.modifiers, C = "", N = false, M = false, I, Q = A.plugins.isWaiting, ca = A.plugins.orderDeps;
    if(!k.isCheckLoaded) {
      if(k.config.priorityWait) {
        if(la(k)) {
          Y(k)
        }else {
          return
        }
      }k.isCheckLoaded = true;
      p = k.waiting;
      t = k.loaded;
      for(I in t) {
        if(!(I in T)) {
          N = true;
          if(!t[I]) {
            if(o) {
              C += I + " "
            }else {
              M = true;
              break
            }
          }
        }
      }if(!N && !p.length && (!Q || !Q(k))) {
        k.isCheckLoaded = false
      }else {
        if(o && C) {
          t = new Error("require.js load timeout for modules: " + C);
          t.requireType = "timeout";
          t.requireModules = C;
          u.onError(t)
        }if(M) {
          k.isCheckLoaded = false;
          if(R || ta) {
            setTimeout(function() {
              u.checkLoaded(i)
            }, 50)
          }
        }else {
          k.waiting = [];
          k.loaded = {};
          ca && ca(k);
          for(I in B) {
            I in T || x[I] && u.execModifiers(I, {}, p, k)
          }for(t = 0;x = p[t];t++) {
            u.exec(x, {}, p, k)
          }k.isCheckLoaded = false;
          if(k.waiting.length || Q && Q(k)) {
            u.checkLoaded(i)
          }else {
            if(Z.length) {
              t = k.loaded;
              k = true;
              for(I in t) {
                if(!(I in T)) {
                  if(!t[I]) {
                    k = false;
                    break
                  }
                }
              }if(k) {
                A.ctxName = Z[0][1];
                I = Z;
                Z = [];
                for(t = 0;k = I[t];t++) {
                  u.load.apply(u, k)
                }
              }
            }else {
              A.ctxName = "_";
              A.isDone = true;
              u.callReady && u.callReady()
            }
          }
        }
      }
    }
  };
  u.exec = function(i, k, p, o) {
    if(i) {
      var t = i.name, x = i.callback;
      x = i.deps;
      var B, C, N = o.defined, M, I = [], Q, ca = false;
      if(t) {
        if(k[t] || t in N) {
          return N[t]
        }k[t] = true
      }if(x) {
        for(B = 0;C = x[B];B++) {
          C = C.name;
          if(C === "require") {
            C = ya(o, t)
          }else {
            if(C === "exports") {
              C = N[t] = {};
              ca = true
            }else {
              if(C === "module") {
                Q = C = {id:t, uri:t ? u.nameToUrl(t, null, o.contextName) : undefined};
                Q.setExports = xa(Q)
              }else {
                C = C in N ? N[C] : k[C] ? undefined : u.exec(p[p[C]], k, p, o)
              }
            }
          }I.push(C)
        }
      }if((x = i.callback) && u.isFunction(x)) {
        M = u.execCb(t, x, I);
        if(t) {
          if(ca && M === undefined && (!Q || !("exports" in Q))) {
            M = N[t]
          }else {
            if(Q && "exports" in Q) {
              M = N[t] = Q.exports
            }else {
              t in N && !ca && u.onError(new Error(t + " has already been defined"));
              N[t] = M
            }
          }
        }
      }u.execModifiers(t, k, p, o);
      return M
    }
  };
  u.execCb = function(i, k, p) {
    return k.apply(null, p)
  };
  u.execModifiers = function(i, k, p, o) {
    var t = o.modifiers, x = t[i], B, C;
    if(x) {
      for(C = 0;C < x.length;C++) {
        B = x[C];
        B in p && u.exec(p[p[B]], k, p, o)
      }delete t[i]
    }
  };
  u.onScriptLoad = function(i) {
    var k = i.currentTarget || i.srcElement, p;
    if(i.type === "load" || Ea.test(k.readyState)) {
      p = k.getAttribute("data-requirecontext");
      i = k.getAttribute("data-requiremodule");
      p = A.contexts[p];
      u.completeLoad(i, p);
      k.removeEventListener ? k.removeEventListener("load", u.onScriptLoad, false) : k.detachEvent("onreadystatechange", u.onScriptLoad)
    }
  };
  u.attach = function(i, k, p, o, t) {
    var x;
    if(R) {
      o = o || u.onScriptLoad;
      x = document.createElement("script");
      x.type = t || "text/javascript";
      x.charset = "utf-8";
      if(!A.skipAsync[i]) {
        x.async = true
      }x.setAttribute("data-requirecontext", k);
      x.setAttribute("data-requiremodule", p);
      if(x.addEventListener) {
        x.addEventListener("load", o, false)
      }else {
        $ = true;
        x.attachEvent("onreadystatechange", o)
      }x.src = i;
      ua = x;
      aa ? A.head.insertBefore(x, aa) : A.head.appendChild(x);
      ua = null;
      return x
    }else {
      if(ta) {
        o = A.contexts[k];
        k = o.loaded;
        k[p] = false;
        importScripts(i);
        u.completeLoad(p, o)
      }
    }return null
  };
  A.baseUrl = U.baseUrl;
  if(R && (!A.baseUrl || !A.head)) {
    na = document.getElementsByTagName("script");
    za = U.baseUrlMatch ? U.baseUrlMatch : /(allplugins-)?require\.js(\W|$)/i;
    for(S = na.length - 1;S > -1 && (c = na[S]);S--) {
      if(!A.head) {
        A.head = c.parentNode
      }if(!U.deps) {
        if(ia = c.getAttribute("data-main")) {
          U.deps = [ia]
        }
      }if((ia = c.src) && !A.baseUrl) {
        if(y = ia.match(za)) {
          A.baseUrl = ia.substring(0, y.index);
          break
        }
      }
    }
  }u.pageLoaded = function() {
    if(!A.isPageLoaded) {
      A.isPageLoaded = true;
      ja && clearInterval(ja);
      if(Aa) {
        document.readyState = "complete"
      }u.callReady()
    }
  };
  u.callReady = function() {
    var i = A.readyCalls, k, p, o;
    if(A.isPageLoaded && A.isDone) {
      if(i.length) {
        A.readyCalls = [];
        for(k = 0;p = i[k];k++) {
          p()
        }
      }i = A.contexts;
      for(o in i) {
        if(!(o in T)) {
          k = i[o];
          if(k.jQueryIncremented) {
            k.jQuery.readyWait -= 1;
            k.jQueryIncremented = false
          }
        }
      }
    }
  };
  u.ready = function(i) {
    A.isPageLoaded && A.isDone ? i() : A.readyCalls.push(i);
    return u
  };
  if(R) {
    if(document.addEventListener) {
      document.addEventListener("DOMContentLoaded", u.pageLoaded, false);
      window.addEventListener("load", u.pageLoaded, false);
      if(!document.readyState) {
        Aa = true;
        document.readyState = "loading"
      }
    }else {
      if(window.attachEvent) {
        window.attachEvent("onload", u.pageLoaded);
        if(self === self.top) {
          ja = setInterval(function() {
            try {
              if(document.body) {
                document.documentElement.doScroll("left");
                u.pageLoaded()
              }
            }catch(i) {
            }
          }, 30)
        }
      }
    }document.readyState === "complete" && u.pageLoaded()
  }u(U);
  typeof setTimeout !== "undefined" && setTimeout(function() {
    var i = A.contexts[U.context || "_"];
    ma(i);
    Y(i)
  }, 0)
})();
(function(J, F) {
  function ka() {
    if(!c.isReady) {
      try {
        y.documentElement.doScroll("left")
      }catch(a) {
        setTimeout(ka, 1);
        return
      }c.ready()
    }
  }
  function wa(a, b) {
    b.src ? c.ajax({url:b.src, async:false, dataType:"script"}) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
    b.parentNode && b.parentNode.removeChild(b)
  }
  function la(a, b, d, f, e, j) {
    var l = a.length;
    if(typeof b === "object") {
      for(var s in b) {
        la(a, s, b[s], f, e, d)
      }return a
    }if(d !== F) {
      f = !j && f && c.isFunction(d);
      for(s = 0;s < l;s++) {
        e(a[s], b, f ? d.call(a[s], s, e(a[s], b)) : d, j)
      }return a
    }return l ? e(a[0], b) : F
  }
  function Y() {
    return(new Date).getTime()
  }
  function ra() {
    return false
  }
  function ma() {
    return true
  }
  function xa(a, b, d) {
    d[0].type = a;
    return c.event.handle.apply(b, d)
  }
  function fa(a) {
    var b, d = [], f = [], e = arguments, j, l, s, m, r, z;
    l = c.data(this, "events");
    if(!(a.liveFired === this || !l || !l.live || a.button && a.type === "click")) {
      a.liveFired = this;
      var E = l.live.slice(0);
      for(m = 0;m < E.length;m++) {
        l = E[m];
        l.origType.replace(M, "") === a.type ? f.push(l.selector) : E.splice(m--, 1)
      }j = c(a.target).closest(f, a.currentTarget);
      r = 0;
      for(z = j.length;r < z;r++) {
        for(m = 0;m < E.length;m++) {
          l = E[m];
          if(j[r].selector === l.selector) {
            s = j[r].elem;
            f = null;
            if(l.preType === "mouseenter" || l.preType === "mouseleave") {
              f = c(a.relatedTarget).closest(l.selector)[0]
            }if(!f || f !== s) {
              d.push({elem:s, handleObj:l})
            }
          }
        }
      }r = 0;
      for(z = d.length;r < z;r++) {
        j = d[r];
        a.currentTarget = j.elem;
        a.data = j.handleObj.data;
        a.handleObj = j.handleObj;
        if(j.handleObj.origHandler.apply(j.elem, e) === false) {
          b = false;
          break
        }
      }return b
    }
  }
  function ya(a, b) {
    return"live." + (a && a !== "*" ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g, "&")
  }
  function T(a) {
    return!a || !a.parentNode || a.parentNode.nodeType === 11
  }
  function A(a, b) {
    var d = 0;
    b.each(function() {
      if(this.nodeName === (a[d] && a[d].nodeName)) {
        var f = c.data(a[d++]), e = c.data(this, f);
        if(f = f && f.events) {
          delete e.handle;
          e.events = {};
          for(var j in f) {
            for(var l in f[j]) {
              c.event.add(this, j, f[j][l], f[j][l].data)
            }
          }
        }
      }
    })
  }
  function S(a, b, d) {
    var f, e, j;
    b = b && b[0] ? b[0].ownerDocument || b[0] : y;
    if(a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === y && !Qa.test(a[0]) && (c.support.checkClone || !Ra.test(a[0]))) {
      e = true;
      if(j = c.fragments[a[0]]) {
        if(j !== 1) {
          f = j
        }
      }
    }if(!f) {
      f = b.createDocumentFragment();
      c.clean(a, b, f, d)
    }if(e) {
      c.fragments[a[0]] = j ? f : 1
    }return{fragment:f, cacheable:e}
  }
  function Z(a, b) {
    var d = {};
    c.each(Sa.concat.apply([], Sa.slice(0, b)), function() {
      d[this] = a
    });
    return d
  }
  function na(a) {
    return"scrollTo" in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
  }
  var c = function(a, b) {
    return new c.fn.init(a, b)
  }, za = J.jQuery, ia = J.$, y = J.document, U, Aa = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, Ea = /^.[^:#\[\.,]*$/, Fa = /\S/, Ga = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, qa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, R = navigator.userAgent, ta = false, da = [], ba, sa = Object.prototype.toString, ja = Object.prototype.hasOwnProperty, u = Array.prototype.push, aa = Array.prototype.slice, ea = Array.prototype.indexOf;
  c.fn = c.prototype = {init:function(a, b) {
    var d, f;
    if(!a) {
      return this
    }if(a.nodeType) {
      this.context = this[0] = a;
      this.length = 1;
      return this
    }if(a === "body" && !b) {
      this.context = y;
      this[0] = y.body;
      this.selector = "body";
      this.length = 1;
      return this
    }if(typeof a === "string") {
      if((d = Aa.exec(a)) && (d[1] || !b)) {
        if(d[1]) {
          f = b ? b.ownerDocument || b : y;
          if(a = qa.exec(a)) {
            if(c.isPlainObject(b)) {
              a = [y.createElement(a[1])];
              c.fn.attr.call(a, b, true)
            }else {
              a = [f.createElement(a[1])]
            }
          }else {
            a = S([d[1]], [f]);
            a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes
          }return c.merge(this, a)
        }else {
          if(b = y.getElementById(d[2])) {
            if(b.id !== d[2]) {
              return U.find(a)
            }this.length = 1;
            this[0] = b
          }this.context = y;
          this.selector = a;
          return this
        }
      }else {
        if(!b && /^\w+$/.test(a)) {
          this.selector = a;
          this.context = y;
          a = y.getElementsByTagName(a);
          return c.merge(this, a)
        }else {
          return!b || b.jquery ? (b || U).find(a) : c(b).find(a)
        }
      }
    }else {
      if(c.isFunction(a)) {
        return U.ready(a)
      }
    }if(a.selector !== F) {
      this.selector = a.selector;
      this.context = a.context
    }return c.makeArray(a, this)
  }, selector:"", jquery:"1.4.2", length:0, size:function() {
    return this.length
  }, toArray:function() {
    return aa.call(this, 0)
  }, get:function(a) {
    return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a]
  }, pushStack:function(a, b, d) {
    var f = c();
    c.isArray(a) ? u.apply(f, a) : c.merge(f, a);
    f.prevObject = this;
    f.context = this.context;
    if(b === "find") {
      f.selector = this.selector + (this.selector ? " " : "") + d
    }else {
      if(b) {
        f.selector = this.selector + "." + b + "(" + d + ")"
      }
    }return f
  }, each:function(a, b) {
    return c.each(this, a, b)
  }, ready:function(a) {
    c.bindReady();
    if(c.isReady) {
      a.call(y, c)
    }else {
      da && da.push(a)
    }return this
  }, eq:function(a) {
    return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
  }, first:function() {
    return this.eq(0)
  }, last:function() {
    return this.eq(-1)
  }, slice:function() {
    return this.pushStack(aa.apply(this, arguments), "slice", aa.call(arguments).join(","))
  }, map:function(a) {
    return this.pushStack(c.map(this, function(b, d) {
      return a.call(b, d, b)
    }))
  }, end:function() {
    return this.prevObject || c(null)
  }, push:u, sort:[].sort, splice:[].splice};
  c.fn.init.prototype = c.fn;
  c.extend = c.fn.extend = function() {
    var a = arguments[0] || {}, b = 1, d = arguments.length, f = false, e, j, l, s;
    if(typeof a === "boolean") {
      f = a;
      a = arguments[1] || {};
      b = 2
    }if(typeof a !== "object" && !c.isFunction(a)) {
      a = {}
    }if(d === b) {
      a = this;
      --b
    }for(;b < d;b++) {
      if((e = arguments[b]) != null) {
        for(j in e) {
          l = a[j];
          s = e[j];
          if(a !== s) {
            if(f && s && (c.isPlainObject(s) || c.isArray(s))) {
              l = l && (c.isPlainObject(l) || c.isArray(l)) ? l : c.isArray(s) ? [] : {};
              a[j] = c.extend(f, l, s)
            }else {
              if(s !== F) {
                a[j] = s
              }
            }
          }
        }
      }
    }return a
  };
  c.extend({noConflict:function(a) {
    J.$ = ia;
    if(a) {
      J.jQuery = za
    }return c
  }, isReady:false, ready:function() {
    if(!c.isReady) {
      if(!y.body) {
        return setTimeout(c.ready, 13)
      }c.isReady = true;
      if(da) {
        for(var a, b = 0;a = da[b++];) {
          a.call(y, c)
        }da = null
      }c.fn.triggerHandler && c(y).triggerHandler("ready")
    }
  }, bindReady:function() {
    if(!ta) {
      ta = true;
      if(y.readyState === "complete") {
        return c.ready()
      }if(y.addEventListener) {
        y.addEventListener("DOMContentLoaded", ba, false);
        J.addEventListener("load", c.ready, false)
      }else {
        if(y.attachEvent) {
          y.attachEvent("onreadystatechange", ba);
          J.attachEvent("onload", c.ready);
          var a = false;
          try {
            a = J.frameElement == null
          }catch(b) {
          }y.documentElement.doScroll && a && ka()
        }
      }
    }
  }, isFunction:function(a) {
    return sa.call(a) === "[object Function]"
  }, isArray:function(a) {
    return sa.call(a) === "[object Array]"
  }, isPlainObject:function(a) {
    if(!a || sa.call(a) !== "[object Object]" || a.nodeType || a.setInterval) {
      return false
    }if(a.constructor && !ja.call(a, "constructor") && !ja.call(a.constructor.prototype, "isPrototypeOf")) {
      return false
    }var b;
    for(b in a);return b === F || ja.call(a, b)
  }, isEmptyObject:function(a) {
    for(var b in a) {
      return false
    }return true
  }, error:function(a) {
    throw a;
  }, parseJSON:function(a) {
    if(typeof a !== "string" || !a) {
      return null
    }a = c.trim(a);
    if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
      return J.JSON && J.JSON.parse ? J.JSON.parse(a) : (new Function("return " + a))()
    }else {
      c.error("Invalid JSON: " + a)
    }
  }, noop:function() {
  }, globalEval:function(a) {
    if(a && Fa.test(a)) {
      var b = y.getElementsByTagName("head")[0] || y.documentElement, d = y.createElement("script");
      d.type = "text/javascript";
      if(c.support.scriptEval) {
        d.appendChild(y.createTextNode(a))
      }else {
        d.text = a
      }b.insertBefore(d, b.firstChild);
      b.removeChild(d)
    }
  }, nodeName:function(a, b) {
    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
  }, each:function(a, b, d) {
    var f, e = 0, j = a.length, l = j === F || c.isFunction(a);
    if(d) {
      if(l) {
        for(f in a) {
          if(b.apply(a[f], d) === false) {
            break
          }
        }
      }else {
        for(;e < j;) {
          if(b.apply(a[e++], d) === false) {
            break
          }
        }
      }
    }else {
      if(l) {
        for(f in a) {
          if(b.call(a[f], f, a[f]) === false) {
            break
          }
        }
      }else {
        for(d = a[0];e < j && b.call(d, e, d) !== false;d = a[++e]);
      }
    }return a
  }, trim:function(a) {
    return(a || "").replace(Ga, "")
  }, makeArray:function(a, b) {
    b = b || [];
    if(a != null) {
      a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? u.call(b, a) : c.merge(b, a)
    }return b
  }, inArray:function(a, b) {
    if(b.indexOf) {
      return b.indexOf(a)
    }for(var d = 0, f = b.length;d < f;d++) {
      if(b[d] === a) {
        return d
      }
    }return-1
  }, merge:function(a, b) {
    var d = a.length, f = 0;
    if(typeof b.length === "number") {
      for(var e = b.length;f < e;f++) {
        a[d++] = b[f]
      }
    }else {
      for(;b[f] !== F;) {
        a[d++] = b[f++]
      }
    }a.length = d;
    return a
  }, grep:function(a, b, d) {
    for(var f = [], e = 0, j = a.length;e < j;e++) {
      !d !== !b(a[e], e) && f.push(a[e])
    }return f
  }, map:function(a, b, d) {
    for(var f = [], e, j = 0, l = a.length;j < l;j++) {
      e = b(a[j], j, d);
      if(e != null) {
        f[f.length] = e
      }
    }return f.concat.apply([], f)
  }, guid:1, proxy:function(a, b, d) {
    if(arguments.length === 2) {
      if(typeof b === "string") {
        d = a;
        a = d[b];
        b = F
      }else {
        if(b && !c.isFunction(b)) {
          d = b;
          b = F
        }
      }
    }if(!b && a) {
      b = function() {
        return a.apply(d || this, arguments)
      }
    }if(a) {
      b.guid = a.guid = a.guid || b.guid || c.guid++
    }return b
  }, uaMatch:function(a) {
    a = a.toLowerCase();
    a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
    return{browser:a[1] || "", version:a[2] || "0"}
  }, browser:{}});
  R = c.uaMatch(R);
  if(R.browser) {
    c.browser[R.browser] = true;
    c.browser.version = R.version
  }if(c.browser.webkit) {
    c.browser.safari = true
  }if(ea) {
    c.inArray = function(a, b) {
      return ea.call(b, a)
    }
  }U = c(y);
  if(y.addEventListener) {
    ba = function() {
      y.removeEventListener("DOMContentLoaded", ba, false);
      c.ready()
    }
  }else {
    if(y.attachEvent) {
      ba = function() {
        if(y.readyState === "complete") {
          y.detachEvent("onreadystatechange", ba);
          c.ready()
        }
      }
    }
  }(function() {
    c.support = {};
    var a = y.documentElement, b = y.createElement("script"), d = y.createElement("div"), f = "script" + Y();
    d.style.display = "none";
    d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    var e = d.getElementsByTagName("*"), j = d.getElementsByTagName("a")[0];
    if(!(!e || !e.length || !j)) {
      c.support = {leadingWhitespace:d.firstChild.nodeType === 3, tbody:!d.getElementsByTagName("tbody").length, htmlSerialize:!!d.getElementsByTagName("link").length, style:/red/.test(j.getAttribute("style")), hrefNormalized:j.getAttribute("href") === "/a", opacity:/^0.55$/.test(j.style.opacity), cssFloat:!!j.style.cssFloat, checkOn:d.getElementsByTagName("input")[0].value === "on", optSelected:y.createElement("select").appendChild(y.createElement("option")).selected, parentNode:d.removeChild(d.appendChild(y.createElement("div"))).parentNode === 
      null, deleteExpando:true, checkClone:false, scriptEval:false, noCloneEvent:true, boxModel:null};
      b.type = "text/javascript";
      try {
        b.appendChild(y.createTextNode("window." + f + "=1;"))
      }catch(l) {
      }a.insertBefore(b, a.firstChild);
      if(J[f]) {
        c.support.scriptEval = true;
        delete J[f]
      }try {
        delete b.test
      }catch(s) {
        c.support.deleteExpando = false
      }a.removeChild(b);
      if(d.attachEvent && d.fireEvent) {
        d.attachEvent("onclick", function m() {
          c.support.noCloneEvent = false;
          d.detachEvent("onclick", m)
        });
        d.cloneNode(true).fireEvent("onclick")
      }d = y.createElement("div");
      d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
      a = y.createDocumentFragment();
      a.appendChild(d.firstChild);
      c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
      c(function() {
        var m = y.createElement("div");
        m.style.width = m.style.paddingLeft = "1px";
        y.body.appendChild(m);
        c.boxModel = c.support.boxModel = m.offsetWidth === 2;
        y.body.removeChild(m).style.display = "none"
      });
      a = function(m) {
        var r = y.createElement("div");
        m = "on" + m;
        var z = m in r;
        if(!z) {
          r.setAttribute(m, "return;");
          z = typeof r[m] === "function"
        }return z
      };
      c.support.submitBubbles = a("submit");
      c.support.changeBubbles = a("change");
      a = b = d = e = j = null
    }
  })();
  c.props = {"for":"htmlFor", "class":"className", readonly:"readOnly", maxlength:"maxLength", cellspacing:"cellSpacing", rowspan:"rowSpan", colspan:"colSpan", tabindex:"tabIndex", usemap:"useMap", frameborder:"frameBorder"};
  var $ = "jQuery" + Y(), ua = 0, i = {};
  c.extend({cache:{}, expando:$, noData:{embed:true, object:true, applet:true}, data:function(a, b, d) {
    if(!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
      a = a == J ? i : a;
      var f = a[$], e = c.cache;
      if(!f && typeof b === "string" && d === F) {
        return null
      }f || (f = ++ua);
      if(typeof b === "object") {
        a[$] = f;
        e[f] = c.extend(true, {}, b)
      }else {
        if(!e[f]) {
          a[$] = f;
          e[f] = {}
        }
      }a = e[f];
      if(d !== F) {
        a[b] = d
      }return typeof b === "string" ? a[b] : a
    }
  }, removeData:function(a, b) {
    if(!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
      a = a == J ? i : a;
      var d = a[$], f = c.cache, e = f[d];
      if(b) {
        if(e) {
          delete e[b];
          c.isEmptyObject(e) && c.removeData(a)
        }
      }else {
        if(c.support.deleteExpando) {
          delete a[c.expando]
        }else {
          a.removeAttribute && a.removeAttribute(c.expando)
        }delete f[d]
      }
    }
  }});
  c.fn.extend({data:function(a, b) {
    if(typeof a === "undefined" && this.length) {
      return c.data(this[0])
    }else {
      if(typeof a === "object") {
        return this.each(function() {
          c.data(this, a)
        })
      }
    }var d = a.split(".");
    d[1] = d[1] ? "." + d[1] : "";
    if(b === F) {
      var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
      if(f === F && this.length) {
        f = c.data(this[0], a)
      }return f === F && d[1] ? this.data(d[0]) : f
    }else {
      return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function() {
        c.data(this, a, b)
      })
    }
  }, removeData:function(a) {
    return this.each(function() {
      c.removeData(this, a)
    })
  }});
  c.extend({queue:function(a, b, d) {
    if(a) {
      b = (b || "fx") + "queue";
      var f = c.data(a, b);
      if(!d) {
        return f || []
      }if(!f || c.isArray(d)) {
        f = c.data(a, b, c.makeArray(d))
      }else {
        f.push(d)
      }return f
    }
  }, dequeue:function(a, b) {
    b = b || "fx";
    var d = c.queue(a, b), f = d.shift();
    if(f === "inprogress") {
      f = d.shift()
    }if(f) {
      b === "fx" && d.unshift("inprogress");
      f.call(a, function() {
        c.dequeue(a, b)
      })
    }
  }});
  c.fn.extend({queue:function(a, b) {
    if(typeof a !== "string") {
      b = a;
      a = "fx"
    }if(b === F) {
      return c.queue(this[0], a)
    }return this.each(function() {
      var d = c.queue(this, a, b);
      a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
    })
  }, dequeue:function(a) {
    return this.each(function() {
      c.dequeue(this, a)
    })
  }, delay:function(a, b) {
    a = c.fx ? c.fx.speeds[a] || a : a;
    b = b || "fx";
    return this.queue(b, function() {
      var d = this;
      setTimeout(function() {
        c.dequeue(d, b)
      }, a)
    })
  }, clearQueue:function(a) {
    return this.queue(a || "fx", [])
  }});
  var k = /[\n\t]/g, p = /\s+/, o = /\r/g, t = /href|src|style/, x = /(button|input)/i, B = /(button|input|object|select|textarea)/i, C = /^(a|area)$/i, N = /radio|checkbox/;
  c.fn.extend({attr:function(a, b) {
    return la(this, a, b, true, c.attr)
  }, removeAttr:function(a) {
    return this.each(function() {
      c.attr(this, a, "");
      this.nodeType === 1 && this.removeAttribute(a)
    })
  }, addClass:function(a) {
    if(c.isFunction(a)) {
      return this.each(function(r) {
        var z = c(this);
        z.addClass(a.call(this, r, z.attr("class")))
      })
    }if(a && typeof a === "string") {
      for(var b = (a || "").split(p), d = 0, f = this.length;d < f;d++) {
        var e = this[d];
        if(e.nodeType === 1) {
          if(e.className) {
            for(var j = " " + e.className + " ", l = e.className, s = 0, m = b.length;s < m;s++) {
              if(j.indexOf(" " + b[s] + " ") < 0) {
                l += " " + b[s]
              }
            }e.className = c.trim(l)
          }else {
            e.className = a
          }
        }
      }
    }return this
  }, removeClass:function(a) {
    if(c.isFunction(a)) {
      return this.each(function(m) {
        var r = c(this);
        r.removeClass(a.call(this, m, r.attr("class")))
      })
    }if(a && typeof a === "string" || a === F) {
      for(var b = (a || "").split(p), d = 0, f = this.length;d < f;d++) {
        var e = this[d];
        if(e.nodeType === 1 && e.className) {
          if(a) {
            for(var j = (" " + e.className + " ").replace(k, " "), l = 0, s = b.length;l < s;l++) {
              j = j.replace(" " + b[l] + " ", " ")
            }e.className = c.trim(j)
          }else {
            e.className = ""
          }
        }
      }
    }return this
  }, toggleClass:function(a, b) {
    var d = typeof a, f = typeof b === "boolean";
    if(c.isFunction(a)) {
      return this.each(function(e) {
        var j = c(this);
        j.toggleClass(a.call(this, e, j.attr("class"), b), b)
      })
    }return this.each(function() {
      if(d === "string") {
        for(var e, j = 0, l = c(this), s = b, m = a.split(p);e = m[j++];) {
          s = f ? s : !l.hasClass(e);
          l[s ? "addClass" : "removeClass"](e)
        }
      }else {
        if(d === "undefined" || d === "boolean") {
          this.className && c.data(this, "__className__", this.className);
          this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
        }
      }
    })
  }, hasClass:function(a) {
    a = " " + a + " ";
    for(var b = 0, d = this.length;b < d;b++) {
      if((" " + this[b].className + " ").replace(k, " ").indexOf(a) > -1) {
        return true
      }
    }return false
  }, val:function(a) {
    if(a === F) {
      var b = this[0];
      if(b) {
        if(c.nodeName(b, "option")) {
          return(b.attributes.value || {}).specified ? b.value : b.text
        }if(c.nodeName(b, "select")) {
          var d = b.selectedIndex, f = [], e = b.options;
          b = b.type === "select-one";
          if(d < 0) {
            return null
          }var j = b ? d : 0;
          for(d = b ? d + 1 : e.length;j < d;j++) {
            var l = e[j];
            if(l.selected) {
              a = c(l).val();
              if(b) {
                return a
              }f.push(a)
            }
          }return f
        }if(N.test(b.type) && !c.support.checkOn) {
          return b.getAttribute("value") === null ? "on" : b.value
        }return(b.value || "").replace(o, "")
      }return F
    }var s = c.isFunction(a);
    return this.each(function(m) {
      var r = c(this), z = a;
      if(this.nodeType === 1) {
        if(s) {
          z = a.call(this, m, r.val())
        }if(typeof z === "number") {
          z += ""
        }if(c.isArray(z) && N.test(this.type)) {
          this.checked = c.inArray(r.val(), z) >= 0
        }else {
          if(c.nodeName(this, "select")) {
            var E = c.makeArray(z);
            c("option", this).each(function() {
              this.selected = c.inArray(c(this).val(), E) >= 0
            });
            if(!E.length) {
              this.selectedIndex = -1
            }
          }else {
            this.value = z
          }
        }
      }
    })
  }});
  c.extend({attrFn:{val:true, css:true, html:true, text:true, data:true, width:true, height:true, offset:true}, attr:function(a, b, d, f) {
    if(!a || a.nodeType === 3 || a.nodeType === 8) {
      return F
    }if(f && b in c.attrFn) {
      return c(a)[b](d)
    }f = a.nodeType !== 1 || !c.isXMLDoc(a);
    var e = d !== F;
    b = f && c.props[b] || b;
    if(a.nodeType === 1) {
      var j = t.test(b);
      if(b in a && f && !j) {
        if(e) {
          b === "type" && x.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
          a[b] = d
        }if(c.nodeName(a, "form") && a.getAttributeNode(b)) {
          return a.getAttributeNode(b).nodeValue
        }if(b === "tabIndex") {
          return(b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : B.test(a.nodeName) || C.test(a.nodeName) && a.href ? 0 : F
        }return a[b]
      }if(!c.support.style && f && b === "style") {
        if(e) {
          a.style.cssText = "" + d
        }return a.style.cssText
      }e && a.setAttribute(b, "" + d);
      a = !c.support.hrefNormalized && f && j ? a.getAttribute(b, 2) : a.getAttribute(b);
      return a === null ? F : a
    }return c.style(a, b, d)
  }});
  var M = /\.(.*)$/, I = function(a) {
    return a.replace(/[^\w\s\.\|`]/g, function(b) {
      return"\\" + b
    })
  };
  c.event = {add:function(a, b, d, f) {
    if(!(a.nodeType === 3 || a.nodeType === 8)) {
      if(a.setInterval && a !== J && !a.frameElement) {
        a = J
      }var e, j;
      if(d.handler) {
        e = d;
        d = e.handler
      }if(!d.guid) {
        d.guid = c.guid++
      }if(j = c.data(a)) {
        var l = j.events = j.events || {}, s = j.handle;
        if(!s) {
          j.handle = s = function() {
            return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(s.elem, arguments) : F
          }
        }s.elem = a;
        b = b.split(" ");
        for(var m, r = 0, z;m = b[r++];) {
          j = e ? c.extend({}, e) : {handler:d, data:f};
          if(m.indexOf(".") > -1) {
            z = m.split(".");
            m = z.shift();
            j.namespace = z.slice(0).sort().join(".")
          }else {
            z = [];
            j.namespace = ""
          }j.type = m;
          j.guid = d.guid;
          var E = l[m], L = c.event.special[m] || {};
          if(!E) {
            E = l[m] = [];
            if(!L.setup || L.setup.call(a, f, z, s) === false) {
              if(a.addEventListener) {
                a.addEventListener(m, s, false)
              }else {
                a.attachEvent && a.attachEvent("on" + m, s)
              }
            }
          }if(L.add) {
            L.add.call(a, j);
            if(!j.handler.guid) {
              j.handler.guid = d.guid
            }
          }E.push(j);
          c.event.global[m] = true
        }a = null
      }
    }
  }, global:{}, remove:function(a, b, d, f) {
    if(!(a.nodeType === 3 || a.nodeType === 8)) {
      var e, j = 0, l, s, m, r, z, E, L = c.data(a), P = L && L.events;
      if(L && P) {
        if(b && b.type) {
          d = b.handler;
          b = b.type
        }if(!b || typeof b === "string" && b.charAt(0) === ".") {
          b = b || "";
          for(e in P) {
            c.event.remove(a, e + b)
          }
        }else {
          for(b = b.split(" ");e = b[j++];) {
            r = e;
            l = e.indexOf(".") < 0;
            s = [];
            if(!l) {
              s = e.split(".");
              e = s.shift();
              m = new RegExp("(^|\\.)" + c.map(s.slice(0).sort(), I).join("\\.(?:.*\\.)?") + "(\\.|$)")
            }if(z = P[e]) {
              if(d) {
                r = c.event.special[e] || {};
                for(O = f || 0;O < z.length;O++) {
                  E = z[O];
                  if(d.guid === E.guid) {
                    if(l || m.test(E.namespace)) {
                      f == null && z.splice(O--, 1);
                      r.remove && r.remove.call(a, E)
                    }if(f != null) {
                      break
                    }
                  }
                }if(z.length === 0 || f != null && z.length === 1) {
                  if(!r.teardown || r.teardown.call(a, s) === false) {
                    Q(a, e, L.handle)
                  }delete P[e]
                }
              }else {
                for(var O = 0;O < z.length;O++) {
                  E = z[O];
                  if(l || m.test(E.namespace)) {
                    c.event.remove(a, r, E.handler, O);
                    z.splice(O--, 1)
                  }
                }
              }
            }
          }if(c.isEmptyObject(P)) {
            if(b = L.handle) {
              b.elem = null
            }delete L.events;
            delete L.handle;
            c.isEmptyObject(L) && c.removeData(a)
          }
        }
      }
    }
  }, trigger:function(a, b, d, f) {
    var e = a.type || a;
    if(!f) {
      a = typeof a === "object" ? a[$] ? a : c.extend(c.Event(e), a) : c.Event(e);
      if(e.indexOf("!") >= 0) {
        a.type = e = e.slice(0, -1);
        a.exclusive = true
      }if(!d) {
        a.stopPropagation();
        c.event.global[e] && c.each(c.cache, function() {
          this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem)
        })
      }if(!d || d.nodeType === 3 || d.nodeType === 8) {
        return F
      }a.result = F;
      a.target = d;
      b = c.makeArray(b);
      b.unshift(a)
    }a.currentTarget = d;
    (f = c.data(d, "handle")) && f.apply(d, b);
    f = d.parentNode || d.ownerDocument;
    try {
      if(!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) {
        if(d["on" + e] && d["on" + e].apply(d, b) === false) {
          a.result = false
        }
      }
    }catch(j) {
    }if(!a.isPropagationStopped() && f) {
      c.event.trigger(a, b, f, true)
    }else {
      if(!a.isDefaultPrevented()) {
        f = a.target;
        var l, s = c.nodeName(f, "a") && e === "click", m = c.event.special[e] || {};
        if((!m._default || m._default.call(d, a) === false) && !s && !(f && f.nodeName && c.noData[f.nodeName.toLowerCase()])) {
          try {
            if(f[e]) {
              if(l = f["on" + e]) {
                f["on" + e] = null
              }c.event.triggered = true;
              f[e]()
            }
          }catch(r) {
          }if(l) {
            f["on" + e] = l
          }c.event.triggered = false
        }
      }
    }
  }, handle:function(a) {
    var b, d, f, e;
    a = arguments[0] = c.event.fix(a || J.event);
    a.currentTarget = this;
    b = a.type.indexOf(".") < 0 && !a.exclusive;
    if(!b) {
      d = a.type.split(".");
      a.type = d.shift();
      f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
    }e = c.data(this, "events");
    d = e[a.type];
    if(e && d) {
      d = d.slice(0);
      e = 0;
      for(var j = d.length;e < j;e++) {
        var l = d[e];
        if(b || f.test(l.namespace)) {
          a.handler = l.handler;
          a.data = l.data;
          a.handleObj = l;
          l = l.handler.apply(this, arguments);
          if(l !== F) {
            a.result = l;
            if(l === false) {
              a.preventDefault();
              a.stopPropagation()
            }
          }if(a.isImmediatePropagationStopped()) {
            break
          }
        }
      }
    }return a.result
  }, props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "), fix:function(a) {
    if(a[$]) {
      return a
    }var b = a;
    a = c.Event(b);
    for(var d = this.props.length, f;d;) {
      f = this.props[--d];
      a[f] = b[f]
    }if(!a.target) {
      a.target = a.srcElement || y
    }if(a.target.nodeType === 3) {
      a.target = a.target.parentNode
    }if(!a.relatedTarget && a.fromElement) {
      a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement
    }if(a.pageX == null && a.clientX != null) {
      b = y.documentElement;
      d = y.body;
      a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
      a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
    }if(!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) {
      a.which = a.charCode || a.keyCode
    }if(!a.metaKey && a.ctrlKey) {
      a.metaKey = a.ctrlKey
    }if(!a.which && a.button !== F) {
      a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0
    }return a
  }, guid:1E8, proxy:c.proxy, special:{ready:{setup:c.bindReady, teardown:c.noop}, live:{add:function(a) {
    c.event.add(this, a.origType, c.extend({}, a, {handler:fa}))
  }, remove:function(a) {
    var b = true, d = a.origType.replace(M, "");
    c.each(c.data(this, "events").live || [], function() {
      if(d === this.origType.replace(M, "")) {
        return b = false
      }
    });
    b && c.event.remove(this, a.origType, fa)
  }}, beforeunload:{setup:function(a, b, d) {
    if(this.setInterval) {
      this.onbeforeunload = d
    }return false
  }, teardown:function(a, b) {
    if(this.onbeforeunload === b) {
      this.onbeforeunload = null
    }
  }}}};
  var Q = y.removeEventListener ? function(a, b, d) {
    a.removeEventListener(b, d, false)
  } : function(a, b, d) {
    a.detachEvent("on" + b, d)
  };
  c.Event = function(a) {
    if(!this.preventDefault) {
      return new c.Event(a)
    }if(a && a.type) {
      this.originalEvent = a;
      this.type = a.type
    }else {
      this.type = a
    }this.timeStamp = Y();
    this[$] = true
  };
  c.Event.prototype = {preventDefault:function() {
    this.isDefaultPrevented = ma;
    var a = this.originalEvent;
    if(a) {
      a.preventDefault && a.preventDefault();
      a.returnValue = false
    }
  }, stopPropagation:function() {
    this.isPropagationStopped = ma;
    var a = this.originalEvent;
    if(a) {
      a.stopPropagation && a.stopPropagation();
      a.cancelBubble = true
    }
  }, stopImmediatePropagation:function() {
    this.isImmediatePropagationStopped = ma;
    this.stopPropagation()
  }, isDefaultPrevented:ra, isPropagationStopped:ra, isImmediatePropagationStopped:ra};
  var ca = function(a) {
    var b = a.relatedTarget;
    try {
      for(;b && b !== this;) {
        b = b.parentNode
      }if(b !== this) {
        a.type = a.data;
        c.event.handle.apply(this, arguments)
      }
    }catch(d) {
    }
  }, Ta = function(a) {
    a.type = a.data;
    c.event.handle.apply(this, arguments)
  };
  c.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function(a, b) {
    c.event.special[a] = {setup:function(d) {
      c.event.add(this, b, d && d.selector ? Ta : ca, a)
    }, teardown:function(d) {
      c.event.remove(this, b, d && d.selector ? Ta : ca)
    }}
  });
  if(!c.support.submitBubbles) {
    c.event.special.submit = {setup:function() {
      if(this.nodeName.toLowerCase() !== "form") {
        c.event.add(this, "click.specialSubmit", function(a) {
          var b = a.target, d = b.type;
          if((d === "submit" || d === "image") && c(b).closest("form").length) {
            return xa("submit", this, arguments)
          }
        });
        c.event.add(this, "keypress.specialSubmit", function(a) {
          var b = a.target, d = b.type;
          if((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) {
            return xa("submit", this, arguments)
          }
        })
      }else {
        return false
      }
    }, teardown:function() {
      c.event.remove(this, ".specialSubmit")
    }}
  }if(!c.support.changeBubbles) {
    var Ha = /textarea|input|select/i, Ia, Ua = function(a) {
      var b = a.type, d = a.value;
      if(b === "radio" || b === "checkbox") {
        d = a.checked
      }else {
        if(b === "select-multiple") {
          d = a.selectedIndex > -1 ? c.map(a.options, function(f) {
            return f.selected
          }).join("-") : ""
        }else {
          if(a.nodeName.toLowerCase() === "select") {
            d = a.selectedIndex
          }
        }
      }return d
    }, Ja = function(a, b) {
      var d = a.target, f, e;
      if(!(!Ha.test(d.nodeName) || d.readOnly)) {
        f = c.data(d, "_change_data");
        e = Ua(d);
        if(a.type !== "focusout" || d.type !== "radio") {
          c.data(d, "_change_data", e)
        }if(!(f === F || e === f)) {
          if(f != null || e) {
            a.type = "change";
            return c.event.trigger(a, b, d)
          }
        }
      }
    };
    c.event.special.change = {filters:{focusout:Ja, click:function(a) {
      var b = a.target, d = b.type;
      if(d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") {
        return Ja.call(this, a)
      }
    }, keydown:function(a) {
      var b = a.target, d = b.type;
      if(a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") {
        return Ja.call(this, a)
      }
    }, beforeactivate:function(a) {
      a = a.target;
      c.data(a, "_change_data", Ua(a))
    }}, setup:function() {
      if(this.type === "file") {
        return false
      }for(var a in Ia) {
        c.event.add(this, a + ".specialChange", Ia[a])
      }return Ha.test(this.nodeName)
    }, teardown:function() {
      c.event.remove(this, ".specialChange");
      return Ha.test(this.nodeName)
    }};
    Ia = c.event.special.change.filters
  }y.addEventListener && c.each({focus:"focusin", blur:"focusout"}, function(a, b) {
    function d(f) {
      f = c.event.fix(f);
      f.type = b;
      return c.event.handle.call(this, f)
    }
    c.event.special[b] = {setup:function() {
      this.addEventListener(a, d, true)
    }, teardown:function() {
      this.removeEventListener(a, d, true)
    }}
  });
  c.each(["bind", "one"], function(a, b) {
    c.fn[b] = function(d, f, e) {
      if(typeof d === "object") {
        for(var j in d) {
          this[b](j, f, d[j], e)
        }return this
      }if(c.isFunction(f)) {
        e = f;
        f = F
      }var l = b === "one" ? c.proxy(e, function(m) {
        c(this).unbind(m, l);
        return e.apply(this, arguments)
      }) : e;
      if(d === "unload" && b !== "one") {
        this.one(d, f, e)
      }else {
        j = 0;
        for(var s = this.length;j < s;j++) {
          c.event.add(this[j], d, l, f)
        }
      }return this
    }
  });
  c.fn.extend({unbind:function(a, b) {
    if(typeof a === "object" && !a.preventDefault) {
      for(var d in a) {
        this.unbind(d, a[d])
      }
    }else {
      d = 0;
      for(var f = this.length;d < f;d++) {
        c.event.remove(this[d], a, b)
      }
    }return this
  }, delegate:function(a, b, d, f) {
    return this.live(b, d, f, a)
  }, undelegate:function(a, b, d) {
    return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
  }, trigger:function(a, b) {
    return this.each(function() {
      c.event.trigger(a, b, this)
    })
  }, triggerHandler:function(a, b) {
    if(this[0]) {
      a = c.Event(a);
      a.preventDefault();
      a.stopPropagation();
      c.event.trigger(a, b, this[0]);
      return a.result
    }
  }, toggle:function(a) {
    for(var b = arguments, d = 1;d < b.length;) {
      c.proxy(a, b[d++])
    }return this.click(c.proxy(a, function(f) {
      var e = (c.data(this, "lastToggle" + a.guid) || 0) % d;
      c.data(this, "lastToggle" + a.guid, e + 1);
      f.preventDefault();
      return b[e].apply(this, arguments) || false
    }))
  }, hover:function(a, b) {
    return this.mouseenter(a).mouseleave(b || a)
  }});
  var Va = {focus:"focusin", blur:"focusout", mouseenter:"mouseover", mouseleave:"mouseout"};
  c.each(["live", "die"], function(a, b) {
    c.fn[b] = function(d, f, e, j) {
      var l, s = 0, m, r, z = j || this.selector, E = j ? this : c(this.context);
      if(c.isFunction(f)) {
        e = f;
        f = F
      }for(d = (d || "").split(" ");(l = d[s++]) != null;) {
        j = M.exec(l);
        m = "";
        if(j) {
          m = j[0];
          l = l.replace(M, "")
        }if(l === "hover") {
          d.push("mouseenter" + m, "mouseleave" + m)
        }else {
          r = l;
          if(l === "focus" || l === "blur") {
            d.push(Va[l] + m);
            l += m
          }else {
            l = (Va[l] || l) + m
          }b === "live" ? E.each(function() {
            c.event.add(this, ya(l, z), {data:f, selector:z, handler:e, origType:l, origHandler:e, preType:r})
          }) : E.unbind(ya(l, z), e)
        }
      }return this
    }
  });
  c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
    c.fn[b] = function(d) {
      return d ? this.bind(b, d) : this.trigger(b)
    };
    if(c.attrFn) {
      c.attrFn[b] = true
    }
  });
  J.attachEvent && !J.addEventListener && J.attachEvent("onunload", function() {
    for(var a in c.cache) {
      if(c.cache[a].handle) {
        try {
          c.event.remove(c.cache[a].handle.elem)
        }catch(b) {
        }
      }
    }
  });
  (function() {
    function a(g) {
      for(var h = "", n, q = 0;g[q];q++) {
        n = g[q];
        if(n.nodeType === 3 || n.nodeType === 4) {
          h += n.nodeValue
        }else {
          if(n.nodeType !== 8) {
            h += a(n.childNodes)
          }
        }
      }return h
    }
    function b(g, h, n, q, w, v) {
      w = 0;
      for(var G = q.length;w < G;w++) {
        var D = q[w];
        if(D) {
          D = D[g];
          for(var K = false;D;) {
            if(D.sizcache === n) {
              K = q[D.sizset];
              break
            }if(D.nodeType === 1 && !v) {
              D.sizcache = n;
              D.sizset = w
            }if(D.nodeName.toLowerCase() === h) {
              K = D;
              break
            }D = D[g]
          }q[w] = K
        }
      }
    }
    function d(g, h, n, q, w, v) {
      w = 0;
      for(var G = q.length;w < G;w++) {
        var D = q[w];
        if(D) {
          D = D[g];
          for(var K = false;D;) {
            if(D.sizcache === n) {
              K = q[D.sizset];
              break
            }if(D.nodeType === 1) {
              if(!v) {
                D.sizcache = n;
                D.sizset = w
              }if(typeof h !== "string") {
                if(D === h) {
                  K = true;
                  break
                }
              }else {
                if(m.filter(h, [D]).length > 0) {
                  K = D;
                  break
                }
              }
            }D = D[g]
          }q[w] = K
        }
      }
    }
    var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, e = 0, j = Object.prototype.toString, l = false, s = true;
    [0, 0].sort(function() {
      s = false;
      return 0
    });
    var m = function(g, h, n, q) {
      n = n || [];
      var w = h = h || y;
      if(h.nodeType !== 1 && h.nodeType !== 9) {
        return[]
      }if(!g || typeof g !== "string") {
        return n
      }for(var v = [], G, D, K, va, ga = true, oa = H(h), ha = g;(f.exec(""), G = f.exec(ha)) !== null;) {
        ha = G[3];
        v.push(G[1]);
        if(G[2]) {
          va = G[3];
          break
        }
      }if(v.length > 1 && z.exec(g)) {
        if(v.length === 2 && r.relative[v[0]]) {
          D = Ka(v[0] + v[1], h)
        }else {
          for(D = r.relative[v[0]] ? [h] : m(v.shift(), h);v.length;) {
            g = v.shift();
            if(r.relative[g]) {
              g += v.shift()
            }D = Ka(g, D)
          }
        }
      }else {
        if(!q && v.length > 1 && h.nodeType === 9 && !oa && r.match.ID.test(v[0]) && !r.match.ID.test(v[v.length - 1])) {
          G = m.find(v.shift(), h, oa);
          h = G.expr ? m.filter(G.expr, G.set)[0] : G.set[0]
        }if(h) {
          G = q ? {expr:v.pop(), set:L(q)} : m.find(v.pop(), v.length === 1 && (v[0] === "~" || v[0] === "+") && h.parentNode ? h.parentNode : h, oa);
          D = G.expr ? m.filter(G.expr, G.set) : G.set;
          if(v.length > 0) {
            K = L(D)
          }else {
            ga = false
          }for(;v.length;) {
            var V = v.pop();
            G = V;
            if(r.relative[V]) {
              G = v.pop()
            }else {
              V = ""
            }if(G == null) {
              G = h
            }r.relative[V](K, G, oa)
          }
        }else {
          K = []
        }
      }K || (K = D);
      K || m.error(V || g);
      if(j.call(K) === "[object Array]") {
        if(ga) {
          if(h && h.nodeType === 1) {
            for(g = 0;K[g] != null;g++) {
              if(K[g] && (K[g] === true || K[g].nodeType === 1 && W(h, K[g]))) {
                n.push(D[g])
              }
            }
          }else {
            for(g = 0;K[g] != null;g++) {
              K[g] && K[g].nodeType === 1 && n.push(D[g])
            }
          }
        }else {
          n.push.apply(n, K)
        }
      }else {
        L(K, n)
      }if(va) {
        m(va, w, n, q);
        m.uniqueSort(n)
      }return n
    };
    m.uniqueSort = function(g) {
      if(O) {
        l = s;
        g.sort(O);
        if(l) {
          for(var h = 1;h < g.length;h++) {
            g[h] === g[h - 1] && g.splice(h--, 1)
          }
        }
      }return g
    };
    m.matches = function(g, h) {
      return m(g, null, null, h)
    };
    m.find = function(g, h, n) {
      var q, w;
      if(!g) {
        return[]
      }for(var v = 0, G = r.order.length;v < G;v++) {
        var D = r.order[v];
        if(w = r.leftMatch[D].exec(g)) {
          var K = w[1];
          w.splice(1, 1);
          if(K.substr(K.length - 1) !== "\\") {
            w[1] = (w[1] || "").replace(/\\/g, "");
            q = r.find[D](w, h, n);
            if(q != null) {
              g = g.replace(r.match[D], "");
              break
            }
          }
        }
      }q || (q = h.getElementsByTagName("*"));
      return{set:q, expr:g}
    };
    m.filter = function(g, h, n, q) {
      for(var w = g, v = [], G = h, D, K, va = h && h[0] && H(h[0]);g && h.length;) {
        for(var ga in r.filter) {
          if((D = r.leftMatch[ga].exec(g)) != null && D[2]) {
            var oa = r.filter[ga], ha, V;
            V = D[1];
            K = false;
            D.splice(1, 1);
            if(V.substr(V.length - 1) !== "\\") {
              if(G === v) {
                v = []
              }if(r.preFilter[ga]) {
                if(D = r.preFilter[ga](D, G, n, v, q, va)) {
                  if(D === true) {
                    continue
                  }
                }else {
                  K = ha = true
                }
              }if(D) {
                for(var Ba = 0;(V = G[Ba]) != null;Ba++) {
                  if(V) {
                    ha = oa(V, D, Ba, G);
                    var Wa = q ^ !!ha;
                    if(n && ha != null) {
                      if(Wa) {
                        K = true
                      }else {
                        G[Ba] = false
                      }
                    }else {
                      if(Wa) {
                        v.push(V);
                        K = true
                      }
                    }
                  }
                }
              }if(ha !== F) {
                n || (G = v);
                g = g.replace(r.match[ga], "");
                if(!K) {
                  return[]
                }break
              }
            }
          }
        }if(g === w) {
          if(K == null) {
            m.error(g)
          }else {
            break
          }
        }w = g
      }return G
    };
    m.error = function(g) {
      throw"Syntax error, unrecognized expression: " + g;
    };
    var r = m.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/, CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/, PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, 
    leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function(g) {
      return g.getAttribute("href")
    }}, relative:{"+":function(g, h) {
      var n = typeof h === "string", q = n && !/\W/.test(h);
      n = n && !q;
      if(q) {
        h = h.toLowerCase()
      }q = 0;
      for(var w = g.length, v;q < w;q++) {
        if(v = g[q]) {
          for(;(v = v.previousSibling) && v.nodeType !== 1;);g[q] = n || v && v.nodeName.toLowerCase() === h ? v || false : v === h
        }
      }n && m.filter(h, g, true)
    }, ">":function(g, h) {
      var n = typeof h === "string";
      if(n && !/\W/.test(h)) {
        h = h.toLowerCase();
        for(var q = 0, w = g.length;q < w;q++) {
          var v = g[q];
          if(v) {
            n = v.parentNode;
            g[q] = n.nodeName.toLowerCase() === h ? n : false
          }
        }
      }else {
        q = 0;
        for(w = g.length;q < w;q++) {
          if(v = g[q]) {
            g[q] = n ? v.parentNode : v.parentNode === h
          }
        }n && m.filter(h, g, true)
      }
    }, "":function(g, h, n) {
      var q = e++, w = d;
      if(typeof h === "string" && !/\W/.test(h)) {
        var v = h = h.toLowerCase();
        w = b
      }w("parentNode", h, q, g, v, n)
    }, "~":function(g, h, n) {
      var q = e++, w = d;
      if(typeof h === "string" && !/\W/.test(h)) {
        var v = h = h.toLowerCase();
        w = b
      }w("previousSibling", h, q, g, v, n)
    }}, find:{ID:function(g, h, n) {
      if(typeof h.getElementById !== "undefined" && !n) {
        return(g = h.getElementById(g[1])) ? [g] : []
      }
    }, NAME:function(g, h) {
      if(typeof h.getElementsByName !== "undefined") {
        var n = [];
        h = h.getElementsByName(g[1]);
        for(var q = 0, w = h.length;q < w;q++) {
          h[q].getAttribute("name") === g[1] && n.push(h[q])
        }return n.length === 0 ? null : n
      }
    }, TAG:function(g, h) {
      return h.getElementsByTagName(g[1])
    }}, preFilter:{CLASS:function(g, h, n, q, w, v) {
      g = " " + g[1].replace(/\\/g, "") + " ";
      if(v) {
        return g
      }v = 0;
      for(var G;(G = h[v]) != null;v++) {
        if(G) {
          if(w ^ (G.className && (" " + G.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) {
            n || q.push(G)
          }else {
            if(n) {
              h[v] = false
            }
          }
        }
      }return false
    }, ID:function(g) {
      return g[1].replace(/\\/g, "")
    }, TAG:function(g) {
      return g[1].toLowerCase()
    }, CHILD:function(g) {
      if(g[1] === "nth") {
        var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
        g[2] = h[1] + (h[2] || 1) - 0;
        g[3] = h[3] - 0
      }g[0] = e++;
      return g
    }, ATTR:function(g, h, n, q, w, v) {
      h = g[1].replace(/\\/g, "");
      if(!v && r.attrMap[h]) {
        g[1] = r.attrMap[h]
      }if(g[2] === "~=") {
        g[4] = " " + g[4] + " "
      }return g
    }, PSEUDO:function(g, h, n, q, w) {
      if(g[1] === "not") {
        if((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) {
          g[3] = m(g[3], null, null, h)
        }else {
          g = m.filter(g[3], h, n, true ^ w);
          n || q.push.apply(q, g);
          return false
        }
      }else {
        if(r.match.POS.test(g[0]) || r.match.CHILD.test(g[0])) {
          return true
        }
      }return g
    }, POS:function(g) {
      g.unshift(true);
      return g
    }}, filters:{enabled:function(g) {
      return g.disabled === false && g.type !== "hidden"
    }, disabled:function(g) {
      return g.disabled === true
    }, checked:function(g) {
      return g.checked === true
    }, selected:function(g) {
      return g.selected === true
    }, parent:function(g) {
      return!!g.firstChild
    }, empty:function(g) {
      return!g.firstChild
    }, has:function(g, h, n) {
      return!!m(n[3], g).length
    }, header:function(g) {
      return/h\d/i.test(g.nodeName)
    }, text:function(g) {
      return"text" === g.type
    }, radio:function(g) {
      return"radio" === g.type
    }, checkbox:function(g) {
      return"checkbox" === g.type
    }, file:function(g) {
      return"file" === g.type
    }, password:function(g) {
      return"password" === g.type
    }, submit:function(g) {
      return"submit" === g.type
    }, image:function(g) {
      return"image" === g.type
    }, reset:function(g) {
      return"reset" === g.type
    }, button:function(g) {
      return"button" === g.type || g.nodeName.toLowerCase() === "button"
    }, input:function(g) {
      return/input|select|textarea|button/i.test(g.nodeName)
    }}, setFilters:{first:function(g, h) {
      return h === 0
    }, last:function(g, h, n, q) {
      return h === q.length - 1
    }, even:function(g, h) {
      return h % 2 === 0
    }, odd:function(g, h) {
      return h % 2 === 1
    }, lt:function(g, h, n) {
      return h < n[3] - 0
    }, gt:function(g, h, n) {
      return h > n[3] - 0
    }, nth:function(g, h, n) {
      return n[3] - 0 === h
    }, eq:function(g, h, n) {
      return n[3] - 0 === h
    }}, filter:{PSEUDO:function(g, h, n, q) {
      var w = h[1], v = r.filters[w];
      if(v) {
        return v(g, n, h, q)
      }else {
        if(w === "contains") {
          return(g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0
        }else {
          if(w === "not") {
            h = h[3];
            n = 0;
            for(q = h.length;n < q;n++) {
              if(h[n] === g) {
                return false
              }
            }return true
          }else {
            m.error("Syntax error, unrecognized expression: " + w)
          }
        }
      }
    }, CHILD:function(g, h) {
      var n = h[1], q = g;
      switch(n) {
        case "only":
        ;
        case "first":
          for(;q = q.previousSibling;) {
            if(q.nodeType === 1) {
              return false
            }
          }if(n === "first") {
            return true
          }q = g;
        case "last":
          for(;q = q.nextSibling;) {
            if(q.nodeType === 1) {
              return false
            }
          }return true;
        case "nth":
          n = h[2];
          var w = h[3];
          if(n === 1 && w === 0) {
            return true
          }h = h[0];
          var v = g.parentNode;
          if(v && (v.sizcache !== h || !g.nodeIndex)) {
            var G = 0;
            for(q = v.firstChild;q;q = q.nextSibling) {
              if(q.nodeType === 1) {
                q.nodeIndex = ++G
              }
            }v.sizcache = h
          }g = g.nodeIndex - w;
          return n === 0 ? g === 0 : g % n === 0 && g / n >= 0
      }
    }, ID:function(g, h) {
      return g.nodeType === 1 && g.getAttribute("id") === h
    }, TAG:function(g, h) {
      return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h
    }, CLASS:function(g, h) {
      return(" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1
    }, ATTR:function(g, h) {
      var n = h[1];
      g = r.attrHandle[n] ? r.attrHandle[n](g) : g[n] != null ? g[n] : g.getAttribute(n);
      n = g + "";
      var q = h[2];
      h = h[4];
      return g == null ? q === "!=" : q === "=" ? n === h : q === "*=" ? n.indexOf(h) >= 0 : q === "~=" ? (" " + n + " ").indexOf(h) >= 0 : !h ? n && g !== false : q === "!=" ? n !== h : q === "^=" ? n.indexOf(h) === 0 : q === "$=" ? n.substr(n.length - h.length) === h : q === "|=" ? n === h || n.substr(0, h.length + 1) === h + "-" : false
    }, POS:function(g, h, n, q) {
      var w = r.setFilters[h[2]];
      if(w) {
        return w(g, n, h, q)
      }
    }}}, z = r.match.POS;
    for(var E in r.match) {
      r.match[E] = new RegExp(r.match[E].source + /(?![^\[]*\])(?![^\(]*\))/.source);
      r.leftMatch[E] = new RegExp(/(^(?:.|\r|\n)*?)/.source + r.match[E].source.replace(/\\(\d+)/g, function(g, h) {
        return"\\" + (h - 0 + 1)
      }))
    }var L = function(g, h) {
      g = Array.prototype.slice.call(g, 0);
      if(h) {
        h.push.apply(h, g);
        return h
      }return g
    };
    try {
      Array.prototype.slice.call(y.documentElement.childNodes, 0)
    }catch(P) {
      L = function(g, h) {
        h = h || [];
        if(j.call(g) === "[object Array]") {
          Array.prototype.push.apply(h, g)
        }else {
          if(typeof g.length === "number") {
            for(var n = 0, q = g.length;n < q;n++) {
              h.push(g[n])
            }
          }else {
            for(n = 0;g[n];n++) {
              h.push(g[n])
            }
          }
        }return h
      }
    }var O;
    if(y.documentElement.compareDocumentPosition) {
      O = function(g, h) {
        if(!g.compareDocumentPosition || !h.compareDocumentPosition) {
          if(g == h) {
            l = true
          }return g.compareDocumentPosition ? -1 : 1
        }g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1;
        if(g === 0) {
          l = true
        }return g
      }
    }else {
      if("sourceIndex" in y.documentElement) {
        O = function(g, h) {
          if(!g.sourceIndex || !h.sourceIndex) {
            if(g == h) {
              l = true
            }return g.sourceIndex ? -1 : 1
          }g = g.sourceIndex - h.sourceIndex;
          if(g === 0) {
            l = true
          }return g
        }
      }else {
        if(y.createRange) {
          O = function(g, h) {
            if(!g.ownerDocument || !h.ownerDocument) {
              if(g == h) {
                l = true
              }return g.ownerDocument ? -1 : 1
            }var n = g.ownerDocument.createRange(), q = h.ownerDocument.createRange();
            n.setStart(g, 0);
            n.setEnd(g, 0);
            q.setStart(h, 0);
            q.setEnd(h, 0);
            g = n.compareBoundaryPoints(Range.START_TO_END, q);
            if(g === 0) {
              l = true
            }return g
          }
        }
      }
    }(function() {
      var g = y.createElement("div"), h = "script" + (new Date).getTime();
      g.innerHTML = "<a name='" + h + "'/>";
      var n = y.documentElement;
      n.insertBefore(g, n.firstChild);
      if(y.getElementById(h)) {
        r.find.ID = function(q, w, v) {
          if(typeof w.getElementById !== "undefined" && !v) {
            return(w = w.getElementById(q[1])) ? w.id === q[1] || typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id").nodeValue === q[1] ? [w] : F : []
          }
        };
        r.filter.ID = function(q, w) {
          var v = typeof q.getAttributeNode !== "undefined" && q.getAttributeNode("id");
          return q.nodeType === 1 && v && v.nodeValue === w
        }
      }n.removeChild(g);
      n = g = null
    })();
    (function() {
      var g = y.createElement("div");
      g.appendChild(y.createComment(""));
      if(g.getElementsByTagName("*").length > 0) {
        r.find.TAG = function(h, n) {
          n = n.getElementsByTagName(h[1]);
          if(h[1] === "*") {
            h = [];
            for(var q = 0;n[q];q++) {
              n[q].nodeType === 1 && h.push(n[q])
            }n = h
          }return n
        }
      }g.innerHTML = "<a href='#'></a>";
      if(g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") {
        r.attrHandle.href = function(h) {
          return h.getAttribute("href", 2)
        }
      }g = null
    })();
    y.querySelectorAll && function() {
      var g = m, h = y.createElement("div");
      h.innerHTML = "<p class='TEST'></p>";
      if(!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) {
        m = function(q, w, v, G) {
          w = w || y;
          if(!G && w.nodeType === 9 && !H(w)) {
            try {
              return L(w.querySelectorAll(q), v)
            }catch(D) {
            }
          }return g(q, w, v, G)
        };
        for(var n in g) {
          m[n] = g[n]
        }h = null
      }
    }();
    (function() {
      var g = y.createElement("div");
      g.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if(!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
        g.lastChild.className = "e";
        if(g.getElementsByClassName("e").length !== 1) {
          r.order.splice(1, 0, "CLASS");
          r.find.CLASS = function(h, n, q) {
            if(typeof n.getElementsByClassName !== "undefined" && !q) {
              return n.getElementsByClassName(h[1])
            }
          };
          g = null
        }
      }
    })();
    var W = y.compareDocumentPosition ? function(g, h) {
      return!!(g.compareDocumentPosition(h) & 16)
    } : function(g, h) {
      return g !== h && (g.contains ? g.contains(h) : true)
    }, H = function(g) {
      return(g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
    }, Ka = function(g, h) {
      var n = [], q = "", w;
      for(h = h.nodeType ? [h] : h;w = r.match.PSEUDO.exec(g);) {
        q += w[0];
        g = g.replace(r.match.PSEUDO, "")
      }g = r.relative[g] ? g + "*" : g;
      w = 0;
      for(var v = h.length;w < v;w++) {
        m(g, h[w], n)
      }return m.filter(q, n)
    };
    c.find = m;
    c.expr = m.selectors;
    c.expr[":"] = c.expr.filters;
    c.unique = m.uniqueSort;
    c.text = a;
    c.isXMLDoc = H;
    c.contains = W
  })();
  var eb = /Until$/, fb = /^(?:parents|prevUntil|prevAll)/, gb = /,/;
  aa = Array.prototype.slice;
  var Xa = function(a, b, d) {
    if(c.isFunction(b)) {
      return c.grep(a, function(e, j) {
        return!!b.call(e, j, e) === d
      })
    }else {
      if(b.nodeType) {
        return c.grep(a, function(e) {
          return e === b === d
        })
      }else {
        if(typeof b === "string") {
          var f = c.grep(a, function(e) {
            return e.nodeType === 1
          });
          if(Ea.test(b)) {
            return c.filter(b, f, !d)
          }else {
            b = c.filter(b, f)
          }
        }
      }
    }return c.grep(a, function(e) {
      return c.inArray(e, b) >= 0 === d
    })
  };
  c.fn.extend({find:function(a) {
    for(var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length;f < e;f++) {
      d = b.length;
      c.find(a, this[f], b);
      if(f > 0) {
        for(var j = d;j < b.length;j++) {
          for(var l = 0;l < d;l++) {
            if(b[l] === b[j]) {
              b.splice(j--, 1);
              break
            }
          }
        }
      }
    }return b
  }, has:function(a) {
    var b = c(a);
    return this.filter(function() {
      for(var d = 0, f = b.length;d < f;d++) {
        if(c.contains(this, b[d])) {
          return true
        }
      }
    })
  }, not:function(a) {
    return this.pushStack(Xa(this, a, false), "not", a)
  }, filter:function(a) {
    return this.pushStack(Xa(this, a, true), "filter", a)
  }, is:function(a) {
    return!!a && c.filter(a, this).length > 0
  }, closest:function(a, b) {
    if(c.isArray(a)) {
      var d = [], f = this[0], e, j = {}, l;
      if(f && a.length) {
        e = 0;
        for(var s = a.length;e < s;e++) {
          l = a[e];
          j[l] || (j[l] = c.expr.match.POS.test(l) ? c(l, b || this.context) : l)
        }for(;f && f.ownerDocument && f !== b;) {
          for(l in j) {
            e = j[l];
            if(e.jquery ? e.index(f) > -1 : c(f).is(e)) {
              d.push({selector:l, elem:f});
              delete j[l]
            }
          }f = f.parentNode
        }
      }return d
    }var m = c.expr.match.POS.test(a) ? c(a, b || this.context) : null;
    return this.map(function(r, z) {
      for(;z && z.ownerDocument && z !== b;) {
        if(m ? m.index(z) > -1 : c(z).is(a)) {
          return z
        }z = z.parentNode
      }return null
    })
  }, index:function(a) {
    if(!a || typeof a === "string") {
      return c.inArray(this[0], a ? c(a) : this.parent().children())
    }return c.inArray(a.jquery ? a[0] : a, this)
  }, add:function(a, b) {
    a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a);
    b = c.merge(this.get(), a);
    return this.pushStack(T(a[0]) || T(b[0]) ? b : c.unique(b))
  }, andSelf:function() {
    return this.add(this.prevObject)
  }});
  c.each({parent:function(a) {
    return(a = a.parentNode) && a.nodeType !== 11 ? a : null
  }, parents:function(a) {
    return c.dir(a, "parentNode")
  }, parentsUntil:function(a, b, d) {
    return c.dir(a, "parentNode", d)
  }, next:function(a) {
    return c.nth(a, 2, "nextSibling")
  }, prev:function(a) {
    return c.nth(a, 2, "previousSibling")
  }, nextAll:function(a) {
    return c.dir(a, "nextSibling")
  }, prevAll:function(a) {
    return c.dir(a, "previousSibling")
  }, nextUntil:function(a, b, d) {
    return c.dir(a, "nextSibling", d)
  }, prevUntil:function(a, b, d) {
    return c.dir(a, "previousSibling", d)
  }, siblings:function(a) {
    return c.sibling(a.parentNode.firstChild, a)
  }, children:function(a) {
    return c.sibling(a.firstChild)
  }, contents:function(a) {
    return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
  }}, function(a, b) {
    c.fn[a] = function(d, f) {
      var e = c.map(this, b, d);
      eb.test(a) || (f = d);
      if(f && typeof f === "string") {
        e = c.filter(f, e)
      }e = this.length > 1 ? c.unique(e) : e;
      if((this.length > 1 || gb.test(f)) && fb.test(a)) {
        e = e.reverse()
      }return this.pushStack(e, a, aa.call(arguments).join(","))
    }
  });
  c.extend({filter:function(a, b, d) {
    if(d) {
      a = ":not(" + a + ")"
    }return c.find.matches(a, b)
  }, dir:function(a, b, d) {
    var f = [];
    for(a = a[b];a && a.nodeType !== 9 && (d === F || a.nodeType !== 1 || !c(a).is(d));) {
      a.nodeType === 1 && f.push(a);
      a = a[b]
    }return f
  }, nth:function(a, b, d) {
    b = b || 1;
    for(var f = 0;a;a = a[d]) {
      if(a.nodeType === 1 && ++f === b) {
        break
      }
    }return a
  }, sibling:function(a, b) {
    for(var d = [];a;a = a.nextSibling) {
      a.nodeType === 1 && a !== b && d.push(a)
    }return d
  }});
  var Ya = / jQuery\d+="(?:\d+|null)"/g, Ca = /^\s+/, Za = /(<([\w:]+)[^>]*?)\/>/g, hb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, $a = /<([\w:]+)/, ib = /<tbody/i, jb = /<|&#?\w+;/, Qa = /<script|<object|<embed|<option|<style/i, Ra = /checked\s*(?:[^=]|=\s*.checked.)/i, ab = function(a, b, d) {
    return hb.test(d) ? a : b + "></" + d + ">"
  }, X = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]};
  X.optgroup = X.option;
  X.tbody = X.tfoot = X.colgroup = X.caption = X.thead;
  X.th = X.td;
  if(!c.support.htmlSerialize) {
    X._default = [1, "div<div>", "</div>"]
  }c.fn.extend({text:function(a) {
    if(c.isFunction(a)) {
      return this.each(function(b) {
        var d = c(this);
        d.text(a.call(this, b, d.text()))
      })
    }if(typeof a !== "object" && a !== F) {
      return this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
    }return c.text(this)
  }, wrapAll:function(a) {
    if(c.isFunction(a)) {
      return this.each(function(d) {
        c(this).wrapAll(a.call(this, d))
      })
    }if(this[0]) {
      var b = c(a, this[0].ownerDocument).eq(0).clone(true);
      this[0].parentNode && b.insertBefore(this[0]);
      b.map(function() {
        for(var d = this;d.firstChild && d.firstChild.nodeType === 1;) {
          d = d.firstChild
        }return d
      }).append(this)
    }return this
  }, wrapInner:function(a) {
    if(c.isFunction(a)) {
      return this.each(function(b) {
        c(this).wrapInner(a.call(this, b))
      })
    }return this.each(function() {
      var b = c(this), d = b.contents();
      d.length ? d.wrapAll(a) : b.append(a)
    })
  }, wrap:function(a) {
    return this.each(function() {
      c(this).wrapAll(a)
    })
  }, unwrap:function() {
    return this.parent().each(function() {
      c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
    }).end()
  }, append:function() {
    return this.domManip(arguments, true, function(a) {
      this.nodeType === 1 && this.appendChild(a)
    })
  }, prepend:function() {
    return this.domManip(arguments, true, function(a) {
      this.nodeType === 1 && this.insertBefore(a, this.firstChild)
    })
  }, before:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, false, function(b) {
        this.parentNode.insertBefore(b, this)
      })
    }else {
      if(arguments.length) {
        var a = c(arguments[0]);
        a.push.apply(a, this.toArray());
        return this.pushStack(a, "before", arguments)
      }
    }
  }, after:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, false, function(b) {
        this.parentNode.insertBefore(b, this.nextSibling)
      })
    }else {
      if(arguments.length) {
        var a = this.pushStack(this, "after", arguments);
        a.push.apply(a, c(arguments[0]).toArray());
        return a
      }
    }
  }, remove:function(a, b) {
    for(var d = 0, f;(f = this[d]) != null;d++) {
      if(!a || c.filter(a, [f]).length) {
        if(!b && f.nodeType === 1) {
          c.cleanData(f.getElementsByTagName("*"));
          c.cleanData([f])
        }f.parentNode && f.parentNode.removeChild(f)
      }
    }return this
  }, empty:function() {
    for(var a = 0, b;(b = this[a]) != null;a++) {
      for(b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*"));b.firstChild;) {
        b.removeChild(b.firstChild)
      }
    }return this
  }, clone:function(a) {
    var b = this.map(function() {
      if(!c.support.noCloneEvent && !c.isXMLDoc(this)) {
        var d = this.outerHTML, f = this.ownerDocument;
        if(!d) {
          d = f.createElement("div");
          d.appendChild(this.cloneNode(true));
          d = d.innerHTML
        }return c.clean([d.replace(Ya, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(Ca, "")], f)[0]
      }else {
        return this.cloneNode(true)
      }
    });
    if(a === true) {
      A(this, b);
      A(this.find("*"), b.find("*"))
    }return b
  }, html:function(a) {
    if(a === F) {
      return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ya, "") : null
    }else {
      if(typeof a === "string" && !Qa.test(a) && (c.support.leadingWhitespace || !Ca.test(a)) && !X[($a.exec(a) || ["", ""])[1].toLowerCase()]) {
        a = a.replace(Za, ab);
        try {
          for(var b = 0, d = this.length;b < d;b++) {
            if(this[b].nodeType === 1) {
              c.cleanData(this[b].getElementsByTagName("*"));
              this[b].innerHTML = a
            }
          }
        }catch(f) {
          this.empty().append(a)
        }
      }else {
        c.isFunction(a) ? this.each(function(e) {
          var j = c(this), l = j.html();
          j.empty().append(function() {
            return a.call(this, e, l)
          })
        }) : this.empty().append(a)
      }
    }return this
  }, replaceWith:function(a) {
    if(this[0] && this[0].parentNode) {
      if(c.isFunction(a)) {
        return this.each(function(b) {
          var d = c(this), f = d.html();
          d.replaceWith(a.call(this, b, f))
        })
      }if(typeof a !== "string") {
        a = c(a).detach()
      }return this.each(function() {
        var b = this.nextSibling, d = this.parentNode;
        c(this).remove();
        b ? c(b).before(a) : c(d).append(a)
      })
    }else {
      return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
    }
  }, detach:function(a) {
    return this.remove(a, true)
  }, domManip:function(a, b, d) {
    function f(E) {
      return c.nodeName(E, "table") ? E.getElementsByTagName("tbody")[0] || E.appendChild(E.ownerDocument.createElement("tbody")) : E
    }
    var e, j, l = a[0], s = [], m;
    if(!c.support.checkClone && arguments.length === 3 && typeof l === "string" && Ra.test(l)) {
      return this.each(function() {
        c(this).domManip(a, b, d, true)
      })
    }if(c.isFunction(l)) {
      return this.each(function(E) {
        var L = c(this);
        a[0] = l.call(this, E, b ? L.html() : F);
        L.domManip(a, b, d)
      })
    }if(this[0]) {
      e = l && l.parentNode;
      e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {fragment:e} : S(a, this, s);
      m = e.fragment;
      if(j = m.childNodes.length === 1 ? (m = m.firstChild) : m.firstChild) {
        b = b && c.nodeName(j, "tr");
        for(var r = 0, z = this.length;r < z;r++) {
          d.call(b ? f(this[r], j) : this[r], r > 0 || e.cacheable || this.length > 1 ? m.cloneNode(true) : m)
        }
      }s.length && c.each(s, wa)
    }return this
  }});
  c.fragments = {};
  c.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(a, b) {
    c.fn[a] = function(d) {
      var f = [];
      d = c(d);
      var e = this.length === 1 && this[0].parentNode;
      if(e && e.nodeType === 11 && e.childNodes.length === 1 && d.length === 1) {
        d[b](this[0]);
        return this
      }else {
        e = 0;
        for(var j = d.length;e < j;e++) {
          var l = (e > 0 ? this.clone(true) : this).get();
          c.fn[b].apply(c(d[e]), l);
          f = f.concat(l)
        }return this.pushStack(f, a, d.selector)
      }
    }
  });
  c.extend({clean:function(a, b, d, f) {
    b = b || y;
    if(typeof b.createElement === "undefined") {
      b = b.ownerDocument || b[0] && b[0].ownerDocument || y
    }for(var e = [], j = 0, l;(l = a[j]) != null;j++) {
      if(typeof l === "number") {
        l += ""
      }if(l) {
        if(typeof l === "string" && !jb.test(l)) {
          l = b.createTextNode(l)
        }else {
          if(typeof l === "string") {
            l = l.replace(Za, ab);
            var s = ($a.exec(l) || ["", ""])[1].toLowerCase(), m = X[s] || X._default, r = m[0], z = b.createElement("div");
            for(z.innerHTML = m[1] + l + m[2];r--;) {
              z = z.lastChild
            }if(!c.support.tbody) {
              r = ib.test(l);
              s = s === "table" && !r ? z.firstChild && z.firstChild.childNodes : m[1] === "<table>" && !r ? z.childNodes : [];
              for(m = s.length - 1;m >= 0;--m) {
                c.nodeName(s[m], "tbody") && !s[m].childNodes.length && s[m].parentNode.removeChild(s[m])
              }
            }!c.support.leadingWhitespace && Ca.test(l) && z.insertBefore(b.createTextNode(Ca.exec(l)[0]), z.firstChild);
            l = z.childNodes
          }
        }if(l.nodeType) {
          e.push(l)
        }else {
          e = c.merge(e, l)
        }
      }
    }if(d) {
      for(j = 0;e[j];j++) {
        if(f && c.nodeName(e[j], "script") && (!e[j].type || e[j].type.toLowerCase() === "text/javascript")) {
          f.push(e[j].parentNode ? e[j].parentNode.removeChild(e[j]) : e[j])
        }else {
          e[j].nodeType === 1 && e.splice.apply(e, [j + 1, 0].concat(c.makeArray(e[j].getElementsByTagName("script"))));
          d.appendChild(e[j])
        }
      }
    }return e
  }, cleanData:function(a) {
    for(var b, d, f = c.cache, e = c.event.special, j = c.support.deleteExpando, l = 0, s;(s = a[l]) != null;l++) {
      if(d = s[c.expando]) {
        b = f[d];
        if(b.events) {
          for(var m in b.events) {
            e[m] ? c.event.remove(s, m) : Q(s, m, b.handle)
          }
        }if(j) {
          delete s[c.expando]
        }else {
          s.removeAttribute && s.removeAttribute(c.expando)
        }delete f[d]
      }
    }
  }});
  var kb = /z-?index|font-?weight|opacity|zoom|line-?height/i, bb = /alpha\([^)]*\)/, cb = /opacity=([^)]*)/, La = /float/i, Ma = /-([a-z])/ig, lb = /([A-Z])/g, mb = /^-?\d+(?:px)?$/i, nb = /^-?\d/, ob = {position:"absolute", visibility:"hidden", display:"block"}, pb = ["Left", "Right"], qb = ["Top", "Bottom"], rb = y.defaultView && y.defaultView.getComputedStyle, db = c.support.cssFloat ? "cssFloat" : "styleFloat", Na = function(a, b) {
    return b.toUpperCase()
  };
  c.fn.css = function(a, b) {
    return la(this, a, b, true, function(d, f, e) {
      if(e === F) {
        return c.curCSS(d, f)
      }if(typeof e === "number" && !kb.test(f)) {
        e += "px"
      }c.style(d, f, e)
    })
  };
  c.extend({style:function(a, b, d) {
    if(!a || a.nodeType === 3 || a.nodeType === 8) {
      return F
    }if((b === "width" || b === "height") && parseFloat(d) < 0) {
      d = F
    }var f = a.style || a, e = d !== F;
    if(!c.support.opacity && b === "opacity") {
      if(e) {
        f.zoom = 1;
        b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")";
        a = f.filter || c.curCSS(a, "filter") || "";
        f.filter = bb.test(a) ? a.replace(bb, b) : b
      }return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(cb.exec(f.filter)[1]) / 100 + "" : ""
    }if(La.test(b)) {
      b = db
    }b = b.replace(Ma, Na);
    if(e) {
      f[b] = d
    }return f[b]
  }, css:function(a, b, d, f) {
    if(b === "width" || b === "height") {
      var e, j = b === "width" ? pb : qb;
      d = function() {
        e = b === "width" ? a.offsetWidth : a.offsetHeight;
        f !== "border" && c.each(j, function() {
          f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
          if(f === "margin") {
            e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0
          }else {
            e -= parseFloat(c.curCSS(a, "border" + this + "Width", true)) || 0
          }
        })
      };
      a.offsetWidth !== 0 ? d() : c.swap(a, ob, d);
      return Math.max(0, Math.round(e))
    }return c.curCSS(a, b, d)
  }, curCSS:function(a, b, d) {
    var f, e = a.style;
    if(!c.support.opacity && b === "opacity" && a.currentStyle) {
      f = cb.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
      return f === "" ? "1" : f
    }if(La.test(b)) {
      b = db
    }if(!d && e && e[b]) {
      f = e[b]
    }else {
      if(rb) {
        if(La.test(b)) {
          b = "float"
        }b = b.replace(lb, "-$1").toLowerCase();
        e = a.ownerDocument.defaultView;
        if(!e) {
          return null
        }if(a = e.getComputedStyle(a, null)) {
          f = a.getPropertyValue(b)
        }if(b === "opacity" && f === "") {
          f = "1"
        }
      }else {
        if(a.currentStyle) {
          d = b.replace(Ma, Na);
          f = a.currentStyle[b] || a.currentStyle[d];
          if(!mb.test(f) && nb.test(f)) {
            b = e.left;
            var j = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            e.left = d === "fontSize" ? "1em" : f || 0;
            f = e.pixelLeft + "px";
            e.left = b;
            a.runtimeStyle.left = j
          }
        }
      }
    }return f
  }, swap:function(a, b, d) {
    var f = {};
    for(var e in b) {
      f[e] = a.style[e];
      a.style[e] = b[e]
    }d.call(a);
    for(e in b) {
      a.style[e] = f[e]
    }
  }});
  if(c.expr && c.expr.filters) {
    c.expr.filters.hidden = function(a) {
      var b = a.offsetWidth, d = a.offsetHeight, f = a.nodeName.toLowerCase() === "tr";
      return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
    };
    c.expr.filters.visible = function(a) {
      return!c.expr.filters.hidden(a)
    }
  }var sb = Y(), tb = /<script(.|\s)*?\/script>/gi, ub = /select|textarea/i, vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, pa = /=\?(&|$)/, Oa = /\?/, wb = /(\?|&)_=.*?(&|$)/, xb = /^(\w+:)?\/\/([^\/?#]+)/, yb = /%20/g, zb = c.fn.load;
  c.fn.extend({load:function(a, b, d) {
    if(typeof a !== "string") {
      return zb.call(this, a)
    }else {
      if(!this.length) {
        return this
      }
    }var f = a.indexOf(" ");
    if(f >= 0) {
      var e = a.slice(f, a.length);
      a = a.slice(0, f)
    }f = "GET";
    if(b) {
      if(c.isFunction(b)) {
        d = b;
        b = null
      }else {
        if(typeof b === "object") {
          b = c.param(b, c.ajaxSettings.traditional);
          f = "POST"
        }
      }
    }var j = this;
    c.ajax({url:a, type:f, dataType:"html", data:b, complete:function(l, s) {
      if(s === "success" || s === "notmodified") {
        j.html(e ? c("<div />").append(l.responseText.replace(tb, "")).find(e) : l.responseText)
      }d && j.each(d, [l.responseText, s, l])
    }});
    return this
  }, serialize:function() {
    return c.param(this.serializeArray())
  }, serializeArray:function() {
    return this.map(function() {
      return this.elements ? c.makeArray(this.elements) : this
    }).filter(function() {
      return this.name && !this.disabled && (this.checked || ub.test(this.nodeName) || vb.test(this.type))
    }).map(function(a, b) {
      a = c(this).val();
      return a == null ? null : c.isArray(a) ? c.map(a, function(d) {
        return{name:b.name, value:d}
      }) : {name:b.name, value:a}
    }).get()
  }});
  c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
    c.fn[b] = function(d) {
      return this.bind(b, d)
    }
  });
  c.extend({get:function(a, b, d, f) {
    if(c.isFunction(b)) {
      f = f || d;
      d = b;
      b = null
    }return c.ajax({type:"GET", url:a, data:b, success:d, dataType:f})
  }, getScript:function(a, b) {
    return c.get(a, null, b, "script")
  }, getJSON:function(a, b, d) {
    return c.get(a, b, d, "json")
  }, post:function(a, b, d, f) {
    if(c.isFunction(b)) {
      f = f || d;
      d = b;
      b = {}
    }return c.ajax({type:"POST", url:a, data:b, success:d, dataType:f})
  }, ajaxSetup:function(a) {
    c.extend(c.ajaxSettings, a)
  }, ajaxSettings:{url:location.href, global:true, type:"GET", contentType:"application/x-www-form-urlencoded", processData:true, async:true, xhr:J.XMLHttpRequest && (J.location.protocol !== "file:" || !J.ActiveXObject) ? function() {
    return new J.XMLHttpRequest
  } : function() {
    try {
      return new J.ActiveXObject("Microsoft.XMLHTTP")
    }catch(a) {
    }
  }, accepts:{xml:"application/xml, text/xml", html:"text/html", script:"text/javascript, application/javascript", json:"application/json, text/javascript", text:"text/plain", _default:"*/*"}}, lastModified:{}, etag:{}, ajax:function(a) {
    function b() {
      e.success && e.success.call(m, s, l, H);
      e.global && f("ajaxSuccess", [H, e])
    }
    function d() {
      e.complete && e.complete.call(m, H, l);
      e.global && f("ajaxComplete", [H, e]);
      e.global && !--c.active && c.event.trigger("ajaxStop")
    }
    function f(w, v) {
      (e.context ? c(e.context) : c.event).trigger(w, v)
    }
    var e = c.extend(true, {}, c.ajaxSettings, a), j, l, s, m = a && a.context || e, r = e.type.toUpperCase();
    if(e.data && e.processData && typeof e.data !== "string") {
      e.data = c.param(e.data, e.traditional)
    }if(e.dataType === "jsonp") {
      if(r === "GET") {
        pa.test(e.url) || (e.url += (Oa.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?")
      }else {
        if(!e.data || !pa.test(e.data)) {
          e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?"
        }
      }e.dataType = "json"
    }if(e.dataType === "json" && (e.data && pa.test(e.data) || pa.test(e.url))) {
      j = e.jsonpCallback || "jsonp" + sb++;
      if(e.data) {
        e.data = (e.data + "").replace(pa, "=" + j + "$1")
      }e.url = e.url.replace(pa, "=" + j + "$1");
      e.dataType = "script";
      J[j] = J[j] || function(w) {
        s = w;
        b();
        d();
        J[j] = F;
        try {
          delete J[j]
        }catch(v) {
        }L && L.removeChild(P)
      }
    }if(e.dataType === "script" && e.cache === null) {
      e.cache = false
    }if(e.cache === false && r === "GET") {
      var z = Y(), E = e.url.replace(wb, "$1_=" + z + "$2");
      e.url = E + (E === e.url ? (Oa.test(e.url) ? "&" : "?") + "_=" + z : "")
    }if(e.data && r === "GET") {
      e.url += (Oa.test(e.url) ? "&" : "?") + e.data
    }e.global && !c.active++ && c.event.trigger("ajaxStart");
    z = (z = xb.exec(e.url)) && (z[1] && z[1] !== location.protocol || z[2] !== location.host);
    if(e.dataType === "script" && r === "GET" && z) {
      var L = y.getElementsByTagName("head")[0] || y.documentElement, P = y.createElement("script");
      P.src = e.url;
      if(e.scriptCharset) {
        P.charset = e.scriptCharset
      }if(!j) {
        var O = false;
        P.onload = P.onreadystatechange = function() {
          if(!O && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            O = true;
            b();
            d();
            P.onload = P.onreadystatechange = null;
            L && P.parentNode && L.removeChild(P)
          }
        }
      }L.insertBefore(P, L.firstChild);
      return F
    }var W = false, H = e.xhr();
    if(H) {
      e.username ? H.open(r, e.url, e.async, e.username, e.password) : H.open(r, e.url, e.async);
      try {
        if(e.data || a && a.contentType) {
          H.setRequestHeader("Content-Type", e.contentType)
        }if(e.ifModified) {
          c.lastModified[e.url] && H.setRequestHeader("If-Modified-Since", c.lastModified[e.url]);
          c.etag[e.url] && H.setRequestHeader("If-None-Match", c.etag[e.url])
        }z || H.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        H.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
      }catch(Ka) {
      }if(e.beforeSend && e.beforeSend.call(m, H, e) === false) {
        e.global && !--c.active && c.event.trigger("ajaxStop");
        H.abort();
        return false
      }e.global && f("ajaxSend", [H, e]);
      var g = H.onreadystatechange = function(w) {
        if(!H || H.readyState === 0 || w === "abort") {
          W || d();
          W = true;
          if(H) {
            H.onreadystatechange = c.noop
          }
        }else {
          if(!W && H && (H.readyState === 4 || w === "timeout")) {
            W = true;
            H.onreadystatechange = c.noop;
            l = w === "timeout" ? "timeout" : !c.httpSuccess(H) ? "error" : e.ifModified && c.httpNotModified(H, e.url) ? "notmodified" : "success";
            var v;
            if(l === "success") {
              try {
                s = c.httpData(H, e.dataType, e)
              }catch(G) {
                l = "parsererror";
                v = G
              }
            }if(l === "success" || l === "notmodified") {
              j || b()
            }else {
              c.handleError(e, H, l, v)
            }d();
            w === "timeout" && H.abort();
            if(e.async) {
              H = null
            }
          }
        }
      };
      try {
        var h = H.abort;
        H.abort = function() {
          H && h.call(H);
          g("abort")
        }
      }catch(n) {
      }e.async && e.timeout > 0 && setTimeout(function() {
        H && !W && g("timeout")
      }, e.timeout);
      try {
        H.send(r === "POST" || r === "PUT" || r === "DELETE" ? e.data : null)
      }catch(q) {
        c.handleError(e, H, null, q);
        d()
      }e.async || g();
      return H
    }
  }, handleError:function(a, b, d, f) {
    if(a.error) {
      a.error.call(a.context || a, b, d, f)
    }if(a.global) {
      (a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f])
    }
  }, active:0, httpSuccess:function(a) {
    try {
      return!a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223 || a.status === 0
    }catch(b) {
    }return false
  }, httpNotModified:function(a, b) {
    var d = a.getResponseHeader("Last-Modified"), f = a.getResponseHeader("Etag");
    if(d) {
      c.lastModified[b] = d
    }if(f) {
      c.etag[b] = f
    }return a.status === 304 || a.status === 0
  }, httpData:function(a, b, d) {
    var f = a.getResponseHeader("content-type") || "", e = b === "xml" || !b && f.indexOf("xml") >= 0;
    a = e ? a.responseXML : a.responseText;
    e && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
    if(d && d.dataFilter) {
      a = d.dataFilter(a, b)
    }if(typeof a === "string") {
      if(b === "json" || !b && f.indexOf("json") >= 0) {
        a = c.parseJSON(a)
      }else {
        if(b === "script" || !b && f.indexOf("javascript") >= 0) {
          c.globalEval(a)
        }
      }
    }return a
  }, param:function(a, b) {
    function d(l, s) {
      if(c.isArray(s)) {
        c.each(s, function(m, r) {
          b || /\[\]$/.test(l) ? f(l, r) : d(l + "[" + (typeof r === "object" || c.isArray(r) ? m : "") + "]", r)
        })
      }else {
        !b && s != null && typeof s === "object" ? c.each(s, function(m, r) {
          d(l + "[" + m + "]", r)
        }) : f(l, s)
      }
    }
    function f(l, s) {
      s = c.isFunction(s) ? s() : s;
      e[e.length] = encodeURIComponent(l) + "=" + encodeURIComponent(s)
    }
    var e = [];
    if(b === F) {
      b = c.ajaxSettings.traditional
    }if(c.isArray(a) || a.jquery) {
      c.each(a, function() {
        f(this.name, this.value)
      })
    }else {
      for(var j in a) {
        d(j, a[j])
      }
    }return e.join("&").replace(yb, "+")
  }});
  var Pa = {}, Ab = /toggle|show|hide/, Bb = /^([+-]=)?([\d+-.]+)(.*)$/, Da, Sa = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
  c.fn.extend({show:function(a, b) {
    if(a || a === 0) {
      return this.animate(Z("show", 3), a, b)
    }else {
      a = 0;
      for(b = this.length;a < b;a++) {
        var d = c.data(this[a], "olddisplay");
        this[a].style.display = d || "";
        if(c.css(this[a], "display") === "none") {
          d = this[a].nodeName;
          var f;
          if(Pa[d]) {
            f = Pa[d]
          }else {
            var e = c("<" + d + " />").appendTo("body");
            f = e.css("display");
            if(f === "none") {
              f = "block"
            }e.remove();
            Pa[d] = f
          }c.data(this[a], "olddisplay", f)
        }
      }a = 0;
      for(b = this.length;a < b;a++) {
        this[a].style.display = c.data(this[a], "olddisplay") || ""
      }return this
    }
  }, hide:function(a, b) {
    if(a || a === 0) {
      return this.animate(Z("hide", 3), a, b)
    }else {
      a = 0;
      for(b = this.length;a < b;a++) {
        var d = c.data(this[a], "olddisplay");
        !d && d !== "none" && c.data(this[a], "olddisplay", c.css(this[a], "display"))
      }a = 0;
      for(b = this.length;a < b;a++) {
        this[a].style.display = "none"
      }return this
    }
  }, _toggle:c.fn.toggle, toggle:function(a, b) {
    var d = typeof a === "boolean";
    if(c.isFunction(a) && c.isFunction(b)) {
      this._toggle.apply(this, arguments)
    }else {
      a == null || d ? this.each(function() {
        var f = d ? a : c(this).is(":hidden");
        c(this)[f ? "show" : "hide"]()
      }) : this.animate(Z("toggle", 3), a, b)
    }return this
  }, fadeTo:function(a, b, d) {
    return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:b}, a, d)
  }, animate:function(a, b, d, f) {
    var e = c.speed(b, d, f);
    if(c.isEmptyObject(a)) {
      return this.each(e.complete)
    }return this[e.queue === false ? "each" : "queue"](function() {
      var j = c.extend({}, e), l, s = this.nodeType === 1 && c(this).is(":hidden"), m = this;
      for(l in a) {
        var r = l.replace(Ma, Na);
        if(l !== r) {
          a[r] = a[l];
          delete a[l];
          l = r
        }if(a[l] === "hide" && s || a[l] === "show" && !s) {
          return j.complete.call(this)
        }if((l === "height" || l === "width") && this.style) {
          j.display = c.css(this, "display");
          j.overflow = this.style.overflow
        }if(c.isArray(a[l])) {
          (j.specialEasing = j.specialEasing || {})[l] = a[l][1];
          a[l] = a[l][0]
        }
      }if(j.overflow != null) {
        this.style.overflow = "hidden"
      }j.curAnim = c.extend({}, a);
      c.each(a, function(z, E) {
        var L = new c.fx(m, j, z);
        if(Ab.test(E)) {
          L[E === "toggle" ? s ? "show" : "hide" : E](a)
        }else {
          var P = Bb.exec(E), O = L.cur(true) || 0;
          if(P) {
            E = parseFloat(P[2]);
            var W = P[3] || "px";
            if(W !== "px") {
              m.style[z] = (E || 1) + W;
              O = (E || 1) / L.cur(true) * O;
              m.style[z] = O + W
            }if(P[1]) {
              E = (P[1] === "-=" ? -1 : 1) * E + O
            }L.custom(O, E, W)
          }else {
            L.custom(O, E, "")
          }
        }
      });
      return true
    })
  }, stop:function(a, b) {
    var d = c.timers;
    a && this.queue([]);
    this.each(function() {
      for(var f = d.length - 1;f >= 0;f--) {
        if(d[f].elem === this) {
          b && d[f](true);
          d.splice(f, 1)
        }
      }
    });
    b || this.dequeue();
    return this
  }});
  c.each({slideDown:Z("show", 1), slideUp:Z("hide", 1), slideToggle:Z("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}}, function(a, b) {
    c.fn[a] = function(d, f) {
      return this.animate(b, d, f)
    }
  });
  c.extend({speed:function(a, b, d) {
    var f = a && typeof a === "object" ? a : {complete:d || !d && b || c.isFunction(a) && a, duration:a, easing:d && b || b && !c.isFunction(b) && b};
    f.duration = c.fx.off ? 0 : typeof f.duration === "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
    f.old = f.complete;
    f.complete = function() {
      f.queue !== false && c(this).dequeue();
      c.isFunction(f.old) && f.old.call(this)
    };
    return f
  }, easing:{linear:function(a, b, d, f) {
    return d + f * a
  }, swing:function(a, b, d, f) {
    return(-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
  }}, timers:[], fx:function(a, b, d) {
    this.options = b;
    this.elem = a;
    this.prop = d;
    if(!b.orig) {
      b.orig = {}
    }
  }});
  c.fx.prototype = {update:function() {
    this.options.step && this.options.step.call(this.elem, this.now, this);
    (c.fx.step[this.prop] || c.fx.step._default)(this);
    if((this.prop === "height" || this.prop === "width") && this.elem.style) {
      this.elem.style.display = "block"
    }
  }, cur:function(a) {
    if(this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
      return this.elem[this.prop]
    }return(a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
  }, custom:function(a, b, d) {
    function f(j) {
      return e.step(j)
    }
    this.startTime = Y();
    this.start = a;
    this.end = b;
    this.unit = d || this.unit || "px";
    this.now = this.start;
    this.pos = this.state = 0;
    var e = this;
    f.elem = this.elem;
    if(f() && c.timers.push(f) && !Da) {
      Da = setInterval(c.fx.tick, 13)
    }
  }, show:function() {
    this.options.orig[this.prop] = c.style(this.elem, this.prop);
    this.options.show = true;
    this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
    c(this.elem).show()
  }, hide:function() {
    this.options.orig[this.prop] = c.style(this.elem, this.prop);
    this.options.hide = true;
    this.custom(this.cur(), 0)
  }, step:function(a) {
    var b = Y(), d = true;
    if(a || b >= this.options.duration + this.startTime) {
      this.now = this.end;
      this.pos = this.state = 1;
      this.update();
      this.options.curAnim[this.prop] = true;
      for(var f in this.options.curAnim) {
        if(this.options.curAnim[f] !== true) {
          d = false
        }
      }if(d) {
        if(this.options.display != null) {
          this.elem.style.overflow = this.options.overflow;
          a = c.data(this.elem, "olddisplay");
          this.elem.style.display = a ? a : this.options.display;
          if(c.css(this.elem, "display") === "none") {
            this.elem.style.display = "block"
          }
        }this.options.hide && c(this.elem).hide();
        if(this.options.hide || this.options.show) {
          for(var e in this.options.curAnim) {
            c.style(this.elem, e, this.options.orig[e])
          }
        }this.options.complete.call(this.elem)
      }return false
    }else {
      e = b - this.startTime;
      this.state = e / this.options.duration;
      a = this.options.easing || (c.easing.swing ? "swing" : "linear");
      this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration);
      this.now = this.start + (this.end - this.start) * this.pos;
      this.update()
    }return true
  }};
  c.extend(c.fx, {tick:function() {
    for(var a = c.timers, b = 0;b < a.length;b++) {
      a[b]() || a.splice(b--, 1)
    }a.length || c.fx.stop()
  }, stop:function() {
    clearInterval(Da);
    Da = null
  }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function(a) {
    c.style(a.elem, "opacity", a.now)
  }, _default:function(a) {
    if(a.elem.style && a.elem.style[a.prop] != null) {
      a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit
    }else {
      a.elem[a.prop] = a.now
    }
  }}});
  if(c.expr && c.expr.filters) {
    c.expr.filters.animated = function(a) {
      return c.grep(c.timers, function(b) {
        return a === b.elem
      }).length
    }
  }c.fn.offset = "getBoundingClientRect" in y.documentElement ? function(a) {
    var b = this[0];
    if(a) {
      return this.each(function(e) {
        c.offset.setOffset(this, a, e)
      })
    }if(!b || !b.ownerDocument) {
      return null
    }if(b === b.ownerDocument.body) {
      return c.offset.bodyOffset(b)
    }var d = b.getBoundingClientRect(), f = b.ownerDocument;
    b = f.body;
    f = f.documentElement;
    return{top:d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0), left:d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)}
  } : function(a) {
    var b = this[0];
    if(a) {
      return this.each(function(z) {
        c.offset.setOffset(this, a, z)
      })
    }if(!b || !b.ownerDocument) {
      return null
    }if(b === b.ownerDocument.body) {
      return c.offset.bodyOffset(b)
    }c.offset.initialize();
    var d = b.offsetParent, f = b, e = b.ownerDocument, j, l = e.documentElement, s = e.body;
    f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle;
    for(var m = b.offsetTop, r = b.offsetLeft;(b = b.parentNode) && b !== s && b !== l;) {
      if(c.offset.supportsFixedPosition && f.position === "fixed") {
        break
      }j = e ? e.getComputedStyle(b, null) : b.currentStyle;
      m -= b.scrollTop;
      r -= b.scrollLeft;
      if(b === d) {
        m += b.offsetTop;
        r += b.offsetLeft;
        if(c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) {
          m += parseFloat(j.borderTopWidth) || 0;
          r += parseFloat(j.borderLeftWidth) || 0
        }f = d;
        d = b.offsetParent
      }if(c.offset.subtractsBorderForOverflowNotVisible && j.overflow !== "visible") {
        m += parseFloat(j.borderTopWidth) || 0;
        r += parseFloat(j.borderLeftWidth) || 0
      }f = j
    }if(f.position === "relative" || f.position === "static") {
      m += s.offsetTop;
      r += s.offsetLeft
    }if(c.offset.supportsFixedPosition && f.position === "fixed") {
      m += Math.max(l.scrollTop, s.scrollTop);
      r += Math.max(l.scrollLeft, s.scrollLeft)
    }return{top:m, left:r}
  };
  c.offset = {initialize:function() {
    var a = y.body, b = y.createElement("div"), d, f, e, j = parseFloat(c.curCSS(a, "marginTop", true)) || 0;
    c.extend(b.style, {position:"absolute", top:0, left:0, margin:0, border:0, width:"1px", height:"1px", visibility:"hidden"});
    b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
    a.insertBefore(b, a.firstChild);
    d = b.firstChild;
    f = d.firstChild;
    e = d.nextSibling.firstChild.firstChild;
    this.doesNotAddBorder = f.offsetTop !== 5;
    this.doesAddBorderForTableAndCells = e.offsetTop === 5;
    f.style.position = "fixed";
    f.style.top = "20px";
    this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15;
    f.style.position = f.style.top = "";
    d.style.overflow = "hidden";
    d.style.position = "relative";
    this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
    this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== j;
    a.removeChild(b);
    c.offset.initialize = c.noop
  }, bodyOffset:function(a) {
    var b = a.offsetTop, d = a.offsetLeft;
    c.offset.initialize();
    if(c.offset.doesNotIncludeMarginInBodyOffset) {
      b += parseFloat(c.curCSS(a, "marginTop", true)) || 0;
      d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0
    }return{top:b, left:d}
  }, setOffset:function(a, b, d) {
    if(/static/.test(c.curCSS(a, "position"))) {
      a.style.position = "relative"
    }var f = c(a), e = f.offset(), j = parseInt(c.curCSS(a, "top", true), 10) || 0, l = parseInt(c.curCSS(a, "left", true), 10) || 0;
    if(c.isFunction(b)) {
      b = b.call(a, d, e)
    }d = {top:b.top - e.top + j, left:b.left - e.left + l};
    "using" in b ? b.using.call(a, d) : f.css(d)
  }};
  c.fn.extend({position:function() {
    if(!this[0]) {
      return null
    }var a = this[0], b = this.offsetParent(), d = this.offset(), f = /^body|html$/i.test(b[0].nodeName) ? {top:0, left:0} : b.offset();
    d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0;
    d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0;
    f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0;
    f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0;
    return{top:d.top - f.top, left:d.left - f.left}
  }, offsetParent:function() {
    return this.map(function() {
      for(var a = this.offsetParent || y.body;a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static";) {
        a = a.offsetParent
      }return a
    })
  }});
  c.each(["Left", "Top"], function(a, b) {
    var d = "scroll" + b;
    c.fn[d] = function(f) {
      var e = this[0], j;
      if(!e) {
        return null
      }return f !== F ? this.each(function() {
        if(j = na(this)) {
          j.scrollTo(!a ? f : c(j).scrollLeft(), a ? f : c(j).scrollTop())
        }else {
          this[d] = f
        }
      }) : (j = na(e)) ? "pageXOffset" in j ? j[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && j.document.documentElement[d] || j.document.body[d] : e[d]
    }
  });
  c.each(["Height", "Width"], function(a, b) {
    var d = b.toLowerCase();
    c.fn["inner" + b] = function() {
      return this[0] ? c.css(this[0], d, false, "padding") : null
    };
    c.fn["outer" + b] = function(f) {
      return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null
    };
    c.fn[d] = function(f) {
      var e = this[0];
      if(!e) {
        return f == null ? null : this
      }if(c.isFunction(f)) {
        return this.each(function(j) {
          var l = c(this);
          l[d](f.call(this, j, l[d]()))
        })
      }return"scrollTo" in e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === F ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
    }
  });
  J.jQuery = J.$ = c
})(window);