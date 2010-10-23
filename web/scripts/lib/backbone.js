(function(){var o=this,A=o._,r=typeof StopIteration!=="undefined"?StopIteration:"__break__",k=Array.prototype,m=Object.prototype,i=k.slice,B=k.unshift,C=m.toString,p=m.hasOwnProperty,s=k.forEach,t=k.map,u=k.reduce,v=k.reduceRight,w=k.filter,x=k.every,y=k.some,n=k.indexOf,z=k.lastIndexOf;m=Array.isArray;var D=Object.keys,b=function(a){return new l(a)};if(typeof exports!=="undefined")exports._=b;o._=b;b.VERSION="1.1.2";var j=b.each=b.forEach=function(a,c,d){try{if(s&&a.forEach===s)a.forEach(c,d);else if(b.isNumber(a.length))for(var e=
0,f=a.length;e<f;e++)c.call(d,a[e],e,a);else for(e in a)p.call(a,e)&&c.call(d,a[e],e,a)}catch(g){if(g!=r)throw g;}return a};b.map=function(a,c,d){if(t&&a.map===t)return a.map(c,d);var e=[];j(a,function(f,g,h){e[e.length]=c.call(d,f,g,h)});return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){if(u&&a.reduce===u){if(e)c=b.bind(c,e);return a.reduce(c,d)}j(a,function(f,g,h){d=c.call(e,d,f,g,h)});return d};b.reduceRight=b.foldr=function(a,c,d,e){if(v&&a.reduceRight===v){if(e)c=b.bind(c,e);return a.reduceRight(c,
d)}a=(b.isArray(a)?a.slice():b.toArray(a)).reverse();return b.reduce(a,c,d,e)};b.find=b.detect=function(a,c,d){var e;j(a,function(f,g,h){if(c.call(d,f,g,h)){e=f;b.breakLoop()}});return e};b.filter=b.select=function(a,c,d){if(w&&a.filter===w)return a.filter(c,d);var e=[];j(a,function(f,g,h){if(c.call(d,f,g,h))e[e.length]=f});return e};b.reject=function(a,c,d){var e=[];j(a,function(f,g,h){c.call(d,f,g,h)||(e[e.length]=f)});return e};b.every=b.all=function(a,c,d){c=c||b.identity;if(x&&a.every===x)return a.every(c,
d);var e=true;j(a,function(f,g,h){(e=e&&c.call(d,f,g,h))||b.breakLoop()});return e};b.some=b.any=function(a,c,d){c=c||b.identity;if(y&&a.some===y)return a.some(c,d);var e=false;j(a,function(f,g,h){if(e=c.call(d,f,g,h))b.breakLoop()});return e};b.include=b.contains=function(a,c){if(n&&a.indexOf===n)return a.indexOf(c)!=-1;var d=false;j(a,function(e){if(d=e===c)b.breakLoop()});return d};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(e){return(c?e[c]:e).apply(e,d)})};b.pluck=
function(a,c){return b.map(a,function(d){return d[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);var e={computed:-Infinity};j(a,function(f,g,h){g=c?c.call(d,f,g,h):f;g>=e.computed&&(e={value:f,computed:g})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};j(a,function(f,g,h){g=c?c.call(d,f,g,h):f;g<e.computed&&(e={value:f,computed:g})});return e.value};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(e,
f,g){return{value:e,criteria:c.call(d,e,f,g)}}).sort(function(e,f){var g=e.criteria,h=f.criteria;return g<h?-1:g>h?1:0}),"value")};b.sortedIndex=function(a,c,d){d=d||b.identity;for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){if(!a)return[];if(a.toArray)return a.toArray();if(b.isArray(a))return a;if(b.isArguments(a))return i.call(a);return b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,c,d){return c&&!d?i.call(a,
0,c):a[0]};b.rest=b.tail=function(a,c,d){return i.call(a,b.isUndefined(c)||d?1:c)};b.last=function(a){return a[a.length-1]};b.compact=function(a){return b.filter(a,function(c){return!!c})};b.flatten=function(a){return b.reduce(a,function(c,d){if(b.isArray(d))return c.concat(b.flatten(d));c[c.length]=d;return c},[])};b.without=function(a){var c=i.call(arguments,1);return b.filter(a,function(d){return!b.include(c,d)})};b.uniq=b.unique=function(a,c){return b.reduce(a,function(d,e,f){if(0==f||(c===true?
b.last(d)!=e:!b.include(d,e)))d[d.length]=e;return d},[])};b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(d){return b.every(c,function(e){return b.indexOf(e,d)>=0})})};b.zip=function(){for(var a=i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c){if(n&&a.indexOf===n)return a.indexOf(c);for(var d=0,e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,c){if(z&&a.lastIndexOf===
z)return a.lastIndexOf(c);for(var d=a.length;d--;)if(a[d]===c)return d;return-1};b.range=function(a,c,d){var e=i.call(arguments),f=e.length<=1;a=f?0:e[0];c=f?e[0]:e[1];d=e[2]||1;e=Math.max(Math.ceil((c-a)/d),0);f=0;for(var g=Array(e);f<e;){g[f++]=a;a+=d}return g};b.bind=function(a,c){var d=i.call(arguments,2);return function(){return a.apply(c||{},d.concat(i.call(arguments)))}};b.bindAll=function(a){var c=i.call(arguments,1);if(c.length==0)c=b.functions(a);j(c,function(d){a[d]=b.bind(a[d],a)});return a};
b.memoize=function(a,c){var d={};c=c||b.identity;return function(){var e=c.apply(this,arguments);return e in d?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,c){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},c)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.wrap=function(a,c){return function(){var d=[a].concat(i.call(arguments));return c.apply(c,d)}};b.compose=function(){var a=i.call(arguments);return function(){for(var c=i.call(arguments),
d=a.length-1;d>=0;d--)c=[a[d].apply(this,c)];return c[0]}};b.keys=D||function(a){if(b.isArray(a))return b.range(0,a.length);var c=[],d;for(d in a)if(p.call(a,d))c[c.length]=d;return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){return b.filter(b.keys(a),function(c){return b.isFunction(a[c])}).sort()};b.extend=function(a){j(i.call(arguments,1),function(c){for(var d in c)a[d]=c[d]});return a};b.clone=function(a){return b.isArray(a)?a.slice():b.extend({},a)};b.tap=
function(a,c){c(a);return a};b.isEqual=function(a,c){if(a===c)return true;var d=typeof a;if(d!=typeof c)return false;if(a==c)return true;if(!a&&c||a&&!c)return false;if(a.isEqual)return a.isEqual(c);if(b.isDate(a)&&b.isDate(c))return a.getTime()===c.getTime();if(b.isNaN(a)&&b.isNaN(c))return false;if(b.isRegExp(a)&&b.isRegExp(c))return a.source===c.source&&a.global===c.global&&a.ignoreCase===c.ignoreCase&&a.multiline===c.multiline;if(d!=="object")return false;if(a.length&&a.length!==c.length)return false;
d=b.keys(a);var e=b.keys(c);if(d.length!=e.length)return false;for(var f in a)if(!(f in c)||!b.isEqual(a[f],c[f]))return false;return true};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(p.call(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=m||function(a){return!!(a&&a.concat&&a.unshift&&!a.callee)};b.isArguments=function(a){return!!(a&&a.callee)};b.isFunction=function(a){return!!(a&&a.constructor&&a.call&&a.apply)};
b.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};b.isNumber=function(a){return a===+a||C.call(a)==="[object Number]"};b.isBoolean=function(a){return a===true||a===false};b.isDate=function(a){return!!(a&&a.getTimezoneOffset&&a.setUTCFullYear)};b.isRegExp=function(a){return!!(a&&a.test&&a.exec&&(a.ignoreCase||a.ignoreCase===false))};b.isNaN=function(a){return b.isNumber(a)&&isNaN(a)};b.isNull=function(a){return a===null};b.isUndefined=function(a){return typeof a=="undefined"};b.noConflict=
function(){o._=A;return this};b.identity=function(a){return a};b.times=function(a,c,d){for(var e=0;e<a;e++)c.call(d,e)};b.breakLoop=function(){throw r;};b.mixin=function(a){j(b.functions(a),function(c){E(c,b[c]=a[c])})};var F=0;b.uniqueId=function(a){var c=F++;return a?a+c:c};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};b.template=function(a,c){var d=b.templateSettings;d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/'/g,
"\\'").replace(d.interpolate,function(e,f){return"',"+f.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||null,function(e,f){return"');"+f.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";d=new Function("obj",d);return c?d(c):d};var l=function(a){this._wrapped=a};b.prototype=l.prototype;var q=function(a,c){return c?b(a).chain():a},E=function(a,c){l.prototype[a]=function(){var d=i.call(arguments);B.call(d,
this._wrapped);return q(c.apply(b,d),this._chain)}};b.mixin(b);j(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var c=k[a];l.prototype[a]=function(){c.apply(this._wrapped,arguments);return q(this._wrapped,this._chain)}});j(["concat","join","slice"],function(a){var c=k[a];l.prototype[a]=function(){return q(c.apply(this._wrapped,arguments),this._chain)}});l.prototype.chain=function(){this._chain=true;return this};l.prototype.value=function(){return this._wrapped}})();

//     (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://documentcloud.github.com/backbone

(function(){

  // Initial Setup
  // -------------

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = this.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.1.2';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = this._;
  if (!_ && (typeof require !== 'undefined')) _ = require("underscore")._;

  // For Backbone's purposes, jQuery owns the `$` variable.
  var $ = this.jQuery;

  // Turn on `emulateHttp` to fake `"PUT"` and `"DELETE"` requests via
  // the `_method` parameter.
  Backbone.emulateHttp = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may `bind` or `unbind` a callback function to an event;
  // `trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.bind('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback` function.
    // Passing `"all"` will bind the callback to all events fired.
    bind : function(ev, callback) {
      var calls = this._callbacks || (this._callbacks = {});
      var list  = this._callbacks[ev] || (this._callbacks[ev] = []);
      list.push(callback);
      return this;
    },

    // Remove one or many callbacks. If `callback` is null, removes all
    // callbacks for the event. If `ev` is null, removes all bound callbacks
    // for all events.
    unbind : function(ev, callback) {
      var calls;
      if (!ev) {
        this._callbacks = {};
      } else if (calls = this._callbacks) {
        if (!callback) {
          calls[ev] = [];
        } else {
          var list = calls[ev];
          if (!list) return this;
          for (var i = 0, l = list.length; i < l; i++) {
            if (callback === list[i]) {
              list.splice(i, 1);
              break;
            }
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger : function(ev) {
      var list, calls, i, l;
      if (!(calls = this._callbacks)) return this;
      if (list = calls[ev]) {
        for (i = 0, l = list.length; i < l; i++) {
          list[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      }
      if (list = calls['all']) {
        for (i = 0, l = list.length; i < l; i++) {
          list[i].apply(this, arguments);
        }
      }
      return this;
    }

  };

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes) {
    this.attributes = {};
    this.cid = _.uniqueId('c');
    this.set(attributes || {}, {silent : true});
    this._previousAttributes = _.clone(this.attributes);
    if (this.initialize) this.initialize(attributes);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // A snapshot of the model's previous attributes, taken immediately
    // after the last `"change"` event was fired.
    _previousAttributes : null,

    // Has the item been changed since the last `"change"` event?
    _changed : false,

    // Return a copy of the model's `attributes` object.
    toJSON : function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get : function(attr) {
      return this.attributes[attr];
    },

    // Set a hash of model attributes on the object, firing `"change"` unless you
    // choose to silence it.
    set : function(attrs, options) {

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs.attributes) attrs = attrs.attributes;
      var now = this.attributes;

      // Run validation if `validate` is defined. If a specific `error` callback
      // has been passed, call that instead of firing the general `"error"` event.
      if (this.validate) {
        var error = this.validate(attrs);
        if (error) {
          if (options.error) {
            options.error(this, error);
          } else {
            this.trigger('error', this, error);
          }
          return false;
        }
      }

      // Check for changes of `id`.
      if ('id' in attrs) this.id = attrs.id;

      // Update attributes.
      for (var attr in attrs) {
        var val = attrs[attr];
        if (val === '') val = null;
        if (!_.isEqual(now[attr], val)) {
          now[attr] = val;
          if (!options.silent) {
            this._changed = true;
            this.trigger('change:' + attr, this, val);
          }
        }
      }

      // Fire the `"change"` event, if the model has been changed.
      if (!options.silent && this._changed) this.change();
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose to
    // silence it.
    unset : function(attr, options) {
      options || (options = {});
      var value = this.attributes[attr];
      delete this.attributes[attr];
      if (!options.silent) {
        this._changed = true;
        this.trigger('change:' + attr, this);
        this.change();
      }
      return value;
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch : function(options) {
      options || (options = {});
      var model = this;
      var success = function(resp) {
        if (!model.set(resp.model, options)) return false;
        if (options.success) options.success(model, resp);
      };
      var error = options.error && _.bind(options.error, null, model);
      Backbone.sync('read', this, success, error);
      return this;
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save : function(attrs, options) {
      attrs   || (attrs = {});
      options || (options = {});
      if (!this.set(attrs, options)) return false;
      var model = this;
      var success = function(resp) {
        if (!model.set(resp.model, options)) return false;
        if (options.success) options.success(model, resp);
      };
      var error = options.error && _.bind(options.error, null, model);
      var method = this.isNew() ? 'create' : 'update';
      Backbone.sync(method, this, success, error);
      return this;
    },

    // Destroy this model on the server. Upon success, the model is removed
    // from its collection, if it has one.
    destroy : function(options) {
      options || (options = {});
      var model = this;
      var success = function(resp) {
        if (model.collection) model.collection.remove(model);
        if (options.success) options.success(model, resp);
      };
      var error = options.error && _.bind(options.error, null, model);
      Backbone.sync('delete', this, success, error);
      return this;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url : function() {
      var base = getUrl(this.collection);
      if (this.isNew()) return base;
      return base + '/' + this.id;
    },

    // Create a new model with identical attributes to this one.
    clone : function() {
      return new this.constructor(this);
    },

    // A model is new if it has never been saved to the server, and has a negative
    // ID.
    isNew : function() {
      return !this.id;
    },

    // Call this method to fire manually fire a `change` event for this model.
    // Calling this will cause all objects observing the model to update.
    change : function() {
      this.trigger('change', this);
      this._previousAttributes = _.clone(this.attributes);
      this._changed = false;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged : function(attr) {
      if (attr) return this._previousAttributes[attr] != this.attributes[attr];
      return this._changed;
    },

    // Return an object containing all the attributes that have changed, or false
    // if there are no changed attributes. Useful for determining what parts of a
    // view need to be updated and/or what attributes need to be persisted to
    // the server.
    changedAttributes : function(now) {
      now || (now = this.attributes);
      var old = this._previousAttributes;
      var changed = false;
      for (var attr in now) {
        if (!_.isEqual(old[attr], now[attr])) {
          changed = changed || {};
          changed[attr] = now[attr];
        }
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous : function(attr) {
      if (!attr || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes : function() {
      return _.clone(this._previousAttributes);
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) {
      this.comparator = options.comparator;
      delete options.comparator;
    }
    this._boundOnModelEvent = _.bind(this._onModelEvent, this);
    this._reset();
    if (models) this.refresh(models, {silent: true});
    if (this.initialize) this.initialize(models, options);
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model : Backbone.Model,

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `added` event for every new model.
    add : function(models, options) {
      if (_.isArray(models)) {
        for (var i = 0, l = models.length; i < l; i++) {
          this._add(models[i], options);
        }
      } else {
        this._add(models, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `removed` event for every model removed.
    remove : function(models, options) {
      if (_.isArray(models)) {
        for (var i = 0, l = models.length; i < l; i++) {
          this._remove(models[i], options);
        }
      } else {
        this._remove(models, options);
      }
      return this;
    },

    // Get a model from the set by id.
    get : function(id) {
      return id && this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid : function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under normal
    // circumstances, as the set will maintain sort order as each item is added.
    sort : function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      this.models = this.sortBy(this.comparator);
      if (!options.silent) this.trigger('refresh', this);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck : function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can refresh the entire set with a new list of models, without firing
    // any `added` or `removed` events. Fires `refresh` when finished.
    refresh : function(models, options) {
      models  || (models = []);
      options || (options = {});
      this._reset();
      this.add(models, {silent: true});
      if (!options.silent) this.trigger('refresh', this);
      return this;
    },

    // Fetch the default set of models for this collection, refreshing the
    // collection when they arrive.
    fetch : function(options) {
      options || (options = {});
      var collection = this;
      var success = function(resp) {
        collection.refresh(resp.models);
        if (options.success) options.success(collection, resp);
      };
      var error = options.error && _.bind(options.error, null, collection);
      Backbone.sync('read', this, success, error);
      return this;
    },

    // Create a new instance of a model in this collection. After the model
    // has been created on the server, it will be added to the collection.
    create : function(model, options) {
      options || (options = {});
      if (!(model instanceof Backbone.Model)) model = new this.model(model);
      model.collection = this;
      var success = function(resp) {
        model.collection.add(model);
        if (options.success) options.success(model, resp);
      };
      return model.save(null, {success : success, error : options.error});
    },

    // Reset all internal state. Called when the collection is refreshed.
    _reset : function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Internal implementation of adding a single model to the set, updating
    // hash indexes for `id` and `cid` lookups.
    _add : function(model, options) {
      options || (options = {});
      if (!(model instanceof Backbone.Model)) {
        model = new this.model(model);
      }
      var already = this.getByCid(model);
      if (already) throw new Error(["Can't add the same model to a set twice", already.id]);
      this._byId[model.id] = model;
      this._byCid[model.cid] = model;
      model.collection = this;
      var index = this.comparator ? this.sortedIndex(model, this.comparator) : this.length;
      this.models.splice(index, 0, model);
      model.bind('all', this._boundOnModelEvent);
      this.length++;
      if (!options.silent) this.trigger('add', model);
      return model;
    },

    // Internal implementation of removing a single model from the set, updating
    // hash indexes for `id` and `cid` lookups.
    _remove : function(model, options) {
      options || (options = {});
      model = this.getByCid(model);
      if (!model) return null;
      delete this._byId[model.id];
      delete this._byCid[model.cid];
      delete model.collection;
      this.models.splice(this.indexOf(model), 1);
      model.unbind('all', this._boundOnModelEvent);
      this.length--;
      if (!options.silent) this.trigger('remove', model);
      return model;
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids.
    _onModelEvent : function(ev, model, error) {
      switch (ev) {
        case 'change':
          if (model.hasChanged('id')) {
            delete this._byId[model.previous('id')];
            this._byId[model.id] = model;
          }
          this.trigger('change', model);
          break;
        case 'error':
          this.trigger('error', model, error);
          break;
      }
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find', 'detect',
    'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include',
    'invoke', 'max', 'min', 'sortBy', 'sortedIndex', 'toArray', 'size',
    'first', 'rest', 'last', 'without', 'indexOf', 'lastIndexOf', 'isEmpty'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this._configure(options || {});
    if (this.options.el) {
      this.el = this.options.el;
    } else {
      var attrs = {};
      if (this.id) attrs.id = this.id;
      if (this.className) attrs.className = this.className;
      this.el = this.make(this.tagName, attrs);
    }
    if (this.initialize) this.initialize(options);
  };

  // jQuery lookup, scoped to DOM elements within the current view.
  // This should be prefered to global jQuery lookups, if you're dealing with
  // a specific view.
  var jQueryDelegate = function(selector) {
    return $(selector, this.el);
  };

  // Cached regex to split keys for `handleEvents`.
  var eventSplitter = /^(\w+)\s*(.*)$/;

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, {

    // The default `tagName` of a View's element is `"div"`.
    tagName : 'div',

    // Attach the jQuery function as the `$` and `jQuery` properties.
    $       : jQueryDelegate,
    jQuery  : jQueryDelegate,

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render : function() {
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.get('title'));
    //
    make : function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Set callbacks, where `this.callbacks` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses jQuery event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // `"change"` events are not delegated through the view because IE does not
    // bubble change events at all.
    handleEvents : function(events) {
      $(this.el).unbind();
      if (!(events || (events = this.events))) return this;
      for (var key in events) {
        var methodName = events[key];
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        var method = _.bind(this[methodName], this);
        if (selector === '' || eventName == 'change') {
          $(this.el).bind(eventName, method);
        } else {
          $(this.el).delegate(selector, eventName, method);
        }
      }
      return this;
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure : function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      if (options.model)      this.model      = options.model;
      if (options.collection) this.collection = options.collection;
      if (options.id)         this.id         = options.id;
      if (options.className)  this.className  = options.className;
      if (options.tagName)    this.tagName    = options.tagName;
      this.options = options;
    }

  });

  // Set up inheritance for the model, collection, and view.
  var extend = Backbone.Model.extend = Backbone.Collection.extend = Backbone.View.extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = extend;
    return child;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
  };

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, uses jQuery to make a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHttp` in order to send `PUT` and `DELETE` requests
  // as `POST`, with an `_method` parameter containing the true HTTP method.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, success, error) {
    var sendModel = method === 'create' || method === 'update';
    var data = sendModel ? {model : JSON.stringify(model)} : {};
    var type = methodMap[method];
    if (Backbone.emulateHttp && (type === 'PUT' || type === 'DELETE')) {
      data._method = type;
      type = 'POST';
    }
    $.ajax({
      url       : getUrl(model),
      type      : type,
      data      : data,
      dataType  : 'json',
      success   : success,
      error     : error
    });
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, classProps) {
    var child;
    if (protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    _.extend(child.prototype, protoProps);
    if (classProps) _.extend(child, classProps);
    child.prototype.constructor = child;
    return child;
  };

  // Helper function to get a URL from a Model or Collection as a property
  // or as a function.
  var getUrl = function(object) {
    if (!(object && object.url)) throw new Error("A 'url' property or function must be specified");
    return _.isFunction(object.url) ? object.url() : object.url;
  };

})();