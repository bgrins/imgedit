(function () {
    var F = ZING.GUI;
    var A = ZING.Net;
    var E = ZING.Core;
    var B = ZING.Input;
    var D = ZING.Client;
    var C = ZING.Application.States.registerClass("ImageEditor", ZING.Application.State, function (G) {
        this.__State(G);
        this._oActiveImage = null;
        this._iActiveWidth = 0;
        this._iActiveHeight = 0;
        this._bImageLoaded = false;
        this._oActiveTool = null;
        this._bMouseIsDown = false;
        this._oToolCanvas = null;
        this._iSelectX = 0;
        this._iSelectY = 0;
        this._iSelectWidth = 0;
        this._iSelectHeight = 0;
        this._oActiveColor = new E.Color(0, 0, 0, 255);
        this._oSelectionMask = null;
        this._oClipCanvas = null;
        this._fZoomScale = 1;
        this._fZoomX = 0;
        this._fZoomY = 0;
        this._iUndoStates = 10;
        this._iCurrentUndo = 0;
        this._aUndoStates = [];
        this._bWarned = false;
    });
    C.setup = function () {
        if (!D.Caps.Canvas2DContext) {
            return;
        }
        this._createEditor();
    };
    C._createEditor = function () {
        var U = this.getSkin();
        var m = this.addWidget(new F.Image(U.Logo, true));
        var b = this.addWidget(new F.Label(U.LogoSubHeader, true));
        b.setText("JavaScript/Canvas Photo Editing");
        var Y = this.addWidget(new F.Image(U.BetaImage));
        Y.setTooltip("Way way beta, really.");
        var d = this._oTabContainer = this.addWidget(new F.Container(U.TabContainer, true));
        var X = this._oTabControl = d.addChildWidget(new F.TabControl(U.TabControl));
        d.lockDimensions(X);
        var I = this._oImageTab = X.addTab("Image");
        var H = I.Container;
        var V = this._oImgContainer = H.addChildWidget(new F.Container(U.ImageContainer, true));
        var l = this._oTransBG = V.addChildWidget(new F.Image(U.ImageTransBackground.Image, true));
        var R = U.LeftBar;
        var J = this._oLeftCnt = this.addWidget(new F.Container(R, true));
        var e = J.addChildWidget(new F.Accordion(R.MenuAccordion));
        J.lockDimensions(e);
        var j = ["File", "Edit", "Transform", "Adjust", "Effects", "About"];
        var k = {};
        var P = {};
        var q = {};
        for (var h = 0; h < j.length; h++) {
            q[j[h]] = e.addSection(j[h]);
            k[j[h]] = q[j[h]].addChildWidget(new F.Container(U.ButtonContainer, true));
            P[j[h]] = [];
        }
        k.About.loadHTMLContent("about.htm");
        var p = this;

        function T(a, u) {
            var t = 0;
            for (var r = 0; r < u.length; r++) {
                var s = a.addChildWidget(new F.TextButton(u[r][0]));
                u[r].push(s);
                s.setText(u[r][1]);
                (function () {
                    var v = u[r][2];
                    var i = u[r][3];
                    s.listen("shiftclick", function () {
                        if (v.sourcefile) {
                            this._showSourceFile(v.sourcefile);
                        }
                    }, p);
                    s.listen("buttonclick", function () {
                        if (this._bImageLoaded || v.nonimage) {
                            if (v.pixelaccess && !ZING.Client.Caps.CanvasPixelAccess) {
                                this.createMessageBox("Sorry!", "This action is only supported in browsers that allow access to pixel data (Firefox 2 & 3, Opera 9 or a recent WebKit nightly)");
                            } else {
                                if (v.dataurl && !ZING.Client.Caps.CanvasDataUrl) {
                                    this.createMessageBox("Sorry!", "This action is only supported in browsers that implement the toDataUrl() method on the canvas (Firefox 2 & 3, Opera 9 or a recent WebKit nightly)");
                                } else {
                                    var x = this;
                                    var w = function () {
                                        if (v.dialog) {
                                            x._spawnActionDialog(v, i);
                                        } else {
                                            x._doImageAction(v);
                                        }
                                    };
                                    if (v.warning && !this._bWarned) {
                                        this._spawnWarningBox(w);
                                    } else {
                                        w();
                                    }
                                }
                            }
                        }
                    }, p);
                })();
                s.setPositionY(r * s.getHeight());
                t += s.getHeight();
            }
            a.setHeight(t);
        }
        var O = U.Buttons;
        for (var o in ImageActions) {
            if (ImageActions.hasOwnProperty(o)) {
                var g = ImageActions[o];
                if (g.menusetup) {
                    var G = g.menusetup(O);
                    if (P[G[0]]) {
                        P[G[0]].push([G[1], G[2], g, o]);
                    } else {
                        this.warn("Tried to add button to non-existing menu: " + G[0]);
                    }
                }
            }
        }
        for (var h = 0; h < j.length; h++) {
            T(k[j[h]], P[j[h]]);
        }
        var c = this._aToolButtons = [];
        var n = U.Tools;
        for (var o in ImageTools) {
            if (ImageTools.hasOwnProperty(o)) {
                var W = ImageTools[o];
                if (W.buttonsetup) {
                    var G = W.buttonsetup(n);
                    c.push([G[0], G[1], W, o, G[2]]);
                }
            }
        }
        var M = this.addWidget(new F.Container(U.ToolContainer));
        var N = 0;
        var K = 1;
        var L = 0;
        for (var h = 0; h < c.length; h++) {
            var S = M.addChildWidget(new F.TextButton(c[h][0]));
            S.setTooltip(c[h][1]);
            (function () {
                var i = c[h][2];
                var a = c[h][3];
                i.name = a;
                i.button = S;
                var r = c[h][4];
                S.listen("shiftclick", function () {
                    if (i.sourcefile) {
                        this._showSourceFile(i.sourcefile);
                    }
                }, p);
                S.listen("buttonclick", function () {
                    if (!this._bImageLoaded) {
                        return;
                    }
                    if (i.pixelaccess && !ZING.Client.Caps.CanvasPixelAccess) {
                        this.createMessageBox("Sorry!", "This tool is only supported in browsers that allow access to pixel data (Firefox 2 & 3, Opera 9 or a recent WebKit nightly)");
                    } else {
                        this._selectTool(i, a);
                        if (r) {
                            p._oCanvasContainer.setCursor(r);
                        } else {
                            p._oCanvasContainer.setCursor("Default");
                        }
                    }
                }, p);
            })();
            S.setPositionY(K * S.getHeight() + U.ToolContainer.ButtonPadding * K);
            S.setPositionX(L * S.getWidth() + U.ToolContainer.ButtonPadding * L);
            K++;
            if (K > 2) {
                K = 0;
                L++;
            }
        }
        this._oClipCanvas = this._createCanvasElement(0, 0);
        e.setOpenSection(0);
        X.showTab(I);
        var f = this._oActiveColorSquare = this.addWidget(new F.Container(U.ActiveColor));
        f.setTooltip("Select color");
        f.listen("click", this._spawnColorPicker, this);
        this.setActiveColor(new E.Color(0, 0, 0));
        var Q = this._oInfoCtr = this.addWidget(new F.Container(U.InfoContainer, true));
        Q.addChildWidget(new F.Label(U.InfoContainer.LabelWidth, true)).setText("Width: ");
        Q.addChildWidget(new F.Label(U.InfoContainer.LabelHeight, true)).setText("Height: ");
        this._oInfoValueWidth = Q.addChildWidget(new F.Label(U.InfoContainer.ValueWidth, true));
        this._oInfoValueHeight = Q.addChildWidget(new F.Label(U.InfoContainer.ValueHeight, true));
        Q.addChildWidget(new F.Label(U.InfoContainer.LabelX, true)).setText("X: ");
        Q.addChildWidget(new F.Label(U.InfoContainer.LabelY, true)).setText("Y: ");
        this._oInfoValueX = Q.addChildWidget(new F.Label(U.InfoContainer.ValueX, true));
        this._oInfoValueY = Q.addChildWidget(new F.Label(U.InfoContainer.ValueY, true));
        this._oToolOptionsCtr = this.addWidget(new F.Container(U.ToolOptionsContainer, true));
        this.getKeyListener();
        this.addWidget(new F.Container(U.Adsense1, true)).loadHTMLContent("adsense1.htm");
        var Z = q.File.addChildWidget(new F.Container(null, false));
        Z.setDimensions(150, 50);
        Z.setPosition(15, 250);
        Z.getHTMLElement().innerHTML = '<iframe src="diggbutton.htm" width=150 height=50 scrolling="no" frameborder=0 marginwidth=0 marginheight=0></iframe>';
    };
    C.getClipCanvas = function () {
        return this._oClipCanvas;
    };
    C.getActiveWidth = function () {
        return this._iActiveWidth;
    };
    C.getActiveHeight = function () {
        return this._iActiveHeight;
    };
    C.getActiveColor = function () {
        return this._oActiveColor;
    };
    C.setActiveColor = function (G) {
        this._oActiveColor = G;
        this._oActiveColorSquare.setBackgroundColor(G);
    };
    C._selectTool = function (K, J) {
        if (this._oActiveTool && this._bImageLoaded) {
            this._oActiveTool.cancel(this, this._oToolCanvas);
        }
        for (var H = 0; H < this._aToolButtons.length; H++) {
            var I = this._aToolButtons[H][2];
            I.button.setState("Normal", true);
        }
        K.button.setState("Active");
        var G = this.getSkin();
        if (this._oToolOptionsCtr) {
            this.removeWidget(this._oToolOptionsCtr);
            this._oToolOptionsCtr.kill();
        }
        this._oToolOptionsCtr = this.addWidget(new F.Container(G.ToolOptionsContainer));
        if (K.optionssetup) {
            K.options = K.optionssetup(this._oToolOptionsCtr, G.ToolOptions[K.name]);
        }
        this._oActiveTool = K;
        this._oToolCanvas.width = this._iActiveWidth;
        this._oToolCanvas.height = this._iActiveHeight;
        this.resetSelection();
    };
    C.resetSelection = function () {
        this.setSelectionBox(0, 0, this.getActiveWidth(), this.getActiveHeight());
        this.setSelectionMask(null);
    };
    C.setSelectionBox = function (G, J, H, I) {
        this._iSelectX = G;
        this._iSelectY = J;
        this._iSelectWidth = H;
        this._iSelectHeight = I;
    };
    C.setSelectionMask = function (G) {
        this._oSelectionMask = G;
    };
    C.getImageCanvas = function () {
        return this._oActiveImage;
    };
    C.loadImageURL = function (H, G) {
        this.loadImage("./app/loadurl/?url=" + H, G);
    };
    C.loadImage = function (K, G) {
        var I = this._oImageTab.Container;
        I.setWaiting(true);
        var H = ZING.DOM.createElement("img");
        H.style.position = "absolute";
        H.style.right = "10000px";
        H.style.top = "0px";
        H = ZING.DOM.appendChild(document.body, H);
        var J = this;
        ZING.Event.listen(H, "error", function () {
            this._oImageTab.Container.setWaiting(false);
            if (G) {
                G();
            }
            this.createMessageBox("Oops!", "Something happened when loading the file");
        }, this);
        ZING.Event.listen(H, "load", function () {
            this._onImageLoaded(H);
            this._oImageTab.Container.setWaiting(false);
            if (G) {
                G();
            }
        }, this);
        H.src = K;
    };
    C._onImageLoaded = function (I) {
        var J = I.offsetWidth;
        var K = I.offsetHeight;
        var L = J / K;
        var G = 2048;
        var H = 2048;
        if (J > G) {
            J = G;
            K = Math.round(J / L);
        }
        if (K > H) {
            K = H;
            J = Math.round(K * L);
        }
        this.createNewImage(J, K, I.offsetWidth, I.offsetHeight, I);
    };
    C.createNewImage = function (K, H, I, S, M) {
        this._oImgContainer.removeAllChildren(true);
        var N = this.getSkin();
        var P = this._oImageTab;
        var Q = P.Container;
        var J = this._oImgContainer;
        var L = this._createCanvasElement(K, H);
        var O = this;
        this._oActiveImage = L;
        this._iActiveWidth = K;
        this._iActiveHeight = H;
        L.style.zIndex = 100;
        var G = L.getContext("2d");
        if (M) {
            G.drawImage(M, 0, 0, I, S, 0, 0, K, H);
        }
        this._fZoomScale = 1;
        this._fZoomX = K / 2;
        this._fZoomY = H / 2;
        var R = O._oCanvasContainer = J.addChildWidget(new F.Container(N.CanvasContainer));
        R.setDimensions(K, H);
        R.center();
        R.addChildWidget(new F.Image(N.ImageTransBackground.Image));
        ZING.DOM.appendChild(R.getHTMLElement(), L);
        O.createToolCanvas();
        O._registerCanvasEvents();
        this._updateImageDisplay();
        this._clearUndoStates();
        this._bImageLoaded = true;
    };
    C._addUndoState = function () {
        var G = this._aUndoStates[this._iCurrentUndo];
        G.canvas.width = this._oActiveImage.width;
        G.canvas.height = this._oActiveImage.height;
        G.canvas.clear();
        G.canvas.getContext("2d").drawImage(this._oActiveImage, 0, 0);
        G.hasdata = true;
        this._iCurrentUndo++;
        if (this._iCurrentUndo >= this._iUndoStates) {
            this._iCurrentUndo = 0;
        }
    };
    C._clearUndoStates = function () {
        for (var H = 0; H < this._iUndoStates; H++) {
            var G = this._createCanvasElement(this._iActiveWidth, this._iActiveHeight);
            this._aUndoStates[H] = {
                canvas: G,
                hasdata: false
            };
        }
    };
    C._undo = function () {
        var H = this._iCurrentUndo - 1;
        if (H < 0) {
            H = this._iUndoStates - 1;
        }
        var G = this._aUndoStates[H];
        if (G.hasdata) {
            this.resetSelection();
            this._oActiveImage.clear();
            this._oActiveImage.width = G.canvas.width;
            this._oActiveImage.height = G.canvas.height;
            this._oActiveImage.getContext("2d").drawImage(G.canvas, 0, 0);
            this._oActiveWidth = this._oActiveImage.width;
            this._oActiveHeight = this._oActiveImage.height;
            G.hasdata = false;
            this._iCurrentUndo = H;
            this._updateImageDisplay();
        } else {
            return;
        }
    };
    C._scrollImageLeft = function () {
        var G = this._oCanvasContainer;
        var H = G.getPositionX();
        G.setPositionX(Math.max(H - 20, -this.getActiveWidth() * this.getZoomScale()));
    };
    C._scrollImageUp = function () {
        var G = this._oCanvasContainer;
        var H = G.getPositionY();
        G.setPositionY(Math.max(H - 20, -this.getActiveHeight() * this.getZoomScale()));
    };
    C._scrollImageDown = function () {
        var G = this._oCanvasContainer;
        var H = G.getPositionY();
        G.setPositionY(Math.min(H + 20, Math.min(this._oImgContainer.getHeight(), this.getActiveHeight() * this.getZoomScale())));
    };
    C._scrollImageRight = function () {
        var G = this._oCanvasContainer;
        var H = G.getPositionX();
        G.setPositionX(Math.min(H + 20, Math.min(this._oImgContainer.getWidth(), this.getActiveWidth() * this.getZoomScale())));
    };
    C._zoomIn = function () {
        this.setZoomScale(this.getZoomScale() * 2);
    };
    C._zoomOut = function () {
        this.setZoomScale(this.getZoomScale() * 0.5);
    };
    C._registerCanvasEvents = function () {
        var G = this._oCanvasContainer;
        G.listen("mousedown", this._onCanvasMouseDown, this);
        G.listen("mousemove", this._onCanvasMouseMove, this);
        G.listen("mouseup", this._onCanvasMouseUp, this);
        G.listen("click", this._onCanvasClick, this);
        G.listen("mousewheel", this._onCanvasMouseWheel, this);
        var H = this.getKeyListener();
        H.bind(B.Keys.KEY_Z, [B.Keys.CTRL], this._undo, this);
        H.bind(B.Keys.KEY_Z, [B.Keys.CTRL, B.Keys.SHIFT], this._undo, this);
        H.bind(B.Keys.KEY_C, [B.Keys.CTRL], this._copy, this);
        H.bind(B.Keys.KEY_C, [B.Keys.CTRL, B.Keys.SHIFT], this._copy, this);
        H.bind(B.Keys.KEY_X, [B.Keys.CTRL], this._cut, this);
        H.bind(B.Keys.KEY_X, [B.Keys.CTRL, B.Keys.SHIFT], this._cut, this);
        H.bind(B.Keys.KEY_V, [B.Keys.CTRL], this._paste, this);
        H.bind(B.Keys.KEY_V, [B.Keys.CTRL, B.Keys.SHIFT], this._paste, this);
        H.bind(B.Keys.BACKSPACE, [B.Keys.ALT], this._fill, this);
        H.bind(B.Keys.BACKSPACE, [B.Keys.CTRL], this._fill, this);
        H.bind(B.Keys.BACKSPACE, [B.Keys.CTRL, B.Keys.SHIFT], this._fill, this);
        H.bind(B.Keys.LEFT, null, this._scrollImageLeft, this, 500, 100);
        H.bind(B.Keys.RIGHT, null, this._scrollImageRight, this, 500, 100);
        H.bind(B.Keys.UP, null, this._scrollImageUp, this, 500, 100);
        H.bind(B.Keys.DOWN, null, this._scrollImageDown, this, 500, 100);
        H.bind(B.Keys.NUM_PLUS, null, this._zoomIn, this);
        H.bind(B.Keys.NUM_MINUS, null, this._zoomOut, this);
        H.bind(B.Keys.KEY_Z, null, this._zoomIn, this);
        H.bind(B.Keys.KEY_X, null, this._zoomOut, this);
        H.bind(B.Keys.SPACE, null, this._onKeyDownSpace, this);
        H.bind(B.Keys.SPACE, null, this._onKeyUpSpace, this, null, null, true);
    };
    C._getCanvasMousePos = function (H) {
        var G = this._oCanvasContainer;
        return {
            x: Math.round(ZING.Event.getRelativeMouseX(H) / this._fZoomScale),
            y: Math.round(ZING.Event.getRelativeMouseY(H) / this._fZoomScale)
        };
    };
    C._onCanvasMouseWheel = function (H) {
        var G = H.wheelDelta;
        if (G < 0) {
            this._zoomIn();
        }
        if (G > 0) {
            this._zoomOut();
        }
    };
    C._onCanvasMouseDown = function (H) {
        if (this._oActiveTool && this._bImageLoaded) {
            this._bMouseIsDown = true;
            var G = this._getCanvasMousePos(H);
            if (this._oActiveTool.start) {
                this._oActiveTool.start(this, this._oToolCanvas, this._oCanvasContainer, G.x, G.y);
            }
        }
    };
    C._onCanvasClick = function (H) {
        if (this._oActiveTool && this._bImageLoaded) {
            var G = this._getCanvasMousePos(H);
            if (this._oActiveTool.point) {
                this._oActiveTool.point(this, this._oToolCanvas, this._oCanvasContainer, G.x, G.y);
            }
        }
    };
    C._onCanvasMouseMove = function (H) {
        var G = this._getCanvasMousePos(H);
        if (this._oActiveTool && this._bImageLoaded) {
            if (this._bMouseIsDown) {
                if (this._oActiveTool.drag) {
                    this._oActiveTool.drag(this, this._oToolCanvas, this._oCanvasContainer, G.x, G.y);
                }
            } else {
                if (this._oActiveTool.move) {
                    this._oActiveTool.move(this, this._oToolCanvas, this._oCanvasContainer, G.x, G.y);
                }
            }
        }
        this._oInfoValueX.setText(G.x + "");
        this._oInfoValueY.setText(G.y + "");
    };
    C._onCanvasMouseUp = function (H) {
        if (this._oActiveTool && this._bImageLoaded) {
            var G = this._getCanvasMousePos(H);
            this._oActiveTool.end(this, this._oToolCanvas, this._oCanvasContainer, G.x, G.y);
            this._bMouseIsDown = false;
        }
    };
    C.isKeyShiftDown = function () {
        var G = this.getKeyListener();
        return G.isKeyDown(B.Keys.SHIFT);
    };
    C.paintToolCanvas = function () {
        this._addUndoState();
        this._oActiveImage.getContext("2d").drawImage(this._oToolCanvas, 0, 0);
    };
    C._createDialogPreview = function (P, Q, U, S, R, M) {
        var O = this.getSkin();
        var K = Q.addChildWidget(new ZING.GUI.Container(O.DialogPreview));
        var T = K.getWidth();
        var X = K.getHeight();
        var G = T / X;
        var L = R / M;
        var J = G / L;
        if (J < 1) {
            var V = (X * J);
            K.setPositionY(K.getPositionY() + Math.floor((X - V) / 2));
            X = V;
        }
        if (J > 1) {
            T = (T / J);
        }
        T = Math.round(T);
        X = Math.round(X);
        K.setDimensions(T, X);
        var H = this._createCanvasElement(T, X);
        K.getHTMLElement().appendChild(H);
        var I = H.getContext("2d");
        I.drawImage(P, U, S, R, M, 0, 0, T, X);
        var N = this._createCanvasElement(T, X);
        N.getContext("2d").drawImage(P, U, S, R, M, 0, 0, T, X);
        var W = function (Z, Y) {
            H.getContext("2d").clearRect(0, 0, T, X);
            H.getContext("2d").drawImage(N, 0, 0);
            Z.action(H, 0, 0, T, X, null, Y);
        };
        return {
            canvas: H,
            copy: N,
            width: T,
            height: X,
            scale: T / R,
            update: W
        };
    };
    C._showSourceFile = function (K) {
        var H = this.getSkin().ViewSourceWindow;
        var G = new F.Window(H.Window);
        G.setTitle("View source: " + K);
        var M = G.getContainer();
        var I = M.addChildWidget(new F.TextArea(H.Text));
        I.setSelectable(true);
        var L = M.addChildWidget(new F.TextButton(H.ButtonOK));
        M.lockYToHeight(L, -L.getHeight());
        M.lockXToWidth(L, -L.getWidth());
        L.listen("buttonclick", G.kill, G);
        M.setWaiting(true);
        var J = new A.HTTPRequest();
        J.listen("response", function () {
            I.setText(J.getResponse().replace(/\t/g, "  "));
            M.setWaiting(false);
        }, this);
        J.send(K);
        ZING.getEnvironment().setModalWidget(G);
        G.center();
        G.listen("close", function () {
            ZING.getEnvironment().setModalWidget(null);
        });
    };
    C._spawnActionDialog = function (O, J) {
        var P = this.getSkin().ActionDialog;
        var G = new F.Window(P.Window);
        var I = G.getContainer();
        if (!O.customokbutton) {
            var H = I.addChildWidget(new F.TextButton(P.ButtonOK));
            I.lockYToHeight(H, -H.getHeight());
            I.lockXToWidth(H, -H.getWidth());
        }
        var R = I.addChildWidget(new F.TextButton(P.ButtonCancel));
        R.listen("buttonclick", G.close, G);
        I.lockYToHeight(R, -R.getHeight());
        I.lockXToWidth(R, -(R.getWidth() + H.getWidth()));
        if (O.dialogname) {
            G.setTitle(O.dialogname);
        }
        if (O.help) {
            G.listen("help", O.help);
        }
        G.center();
        var M;
        var Q = this._getActiveRegion();
        if (O.dialogpreview) {
            M = this._createDialogPreview(this._oActiveImage, I, Q.x, Q.y, Q.w, Q.h);
        }
        var N = this.getSkin().Dialogs[J];
        if (E.isDefined(N.Width)) {
            G.setWidth(N.Width);
        }
        if (E.isDefined(N.Height)) {
            G.setHeight(N.Height);
        }
        var L = O.dialog(G, N, M, this);
        if (O.sourcefile) {
            var K = I.addChildWidget(new F.Label(P.SourceFileLabel));
            K.setText("[Source]");
            K.setTooltip("View JavaScript source for this action");
            K.listen("click", function () {
                G.kill();
                this._showSourceFile(O.sourcefile);
            }, this);
            I.lockYToHeight(K, -K.getHeight());
        }
        ZING.getEnvironment().setModalWidget(G);
        if (!O.customokbutton) {
            H.listen("buttonclick", function () {
                G.hide();
                var S = function () {
                    G.kill();
                };
                this._doImageAction(O, L(), S);
            }, this);
        }
        G.listen("close", function () {
            ZING.getEnvironment().setModalWidget(null);
        });
    };
    C._copy = function () {
        if (!this._bImageLoaded) {
            return;
        }
        this._doImageAction(ImageActions.Copy);
    };
    C._cut = function () {
        if (!this._bImageLoaded) {
            return;
        }
        this._doImageAction(ImageActions.Cut);
    };
    C._paste = function () {
        if (!this._bImageLoaded) {
            return;
        }
        this._doImageAction(ImageActions.Paste);
    };
    C._fill = function () {
        if (!this._bImageLoaded) {
            return;
        }
        this._doImageAction(ImageActions.Fill);
    };
    C._spawnColorPicker = function () {
        var H = this.getSkin().ColorPickerDialog;
        var G = new F.Window(H.Window);
        var L = G.getContainer();
        var K = L.addChildWidget(new F.ColorPicker(H.ColorPicker));
        K.setSelectedColor(this.getActiveColor());
        var J = L.addChildWidget(new F.TextButton(H.ButtonOK));
        var I = L.addChildWidget(new F.TextButton(H.ButtonCancel));
        I.listen("buttonclick", G.close, G);
        L.lockYToHeight(J, -J.getHeight());
        L.lockYToHeight(I, -I.getHeight());
        L.lockXToWidth(J, -J.getWidth());
        L.lockXToWidth(I, -(I.getWidth() + J.getWidth()));
        G.setTitle("Pick color");
        G.center();
        ZING.getEnvironment().setModalWidget(G);
        J.listen("buttonclick", function () {
            G.hide();
            this.setActiveColor(new E.Color().fromHSV(K.getHue(), K.getSaturation(), K.getVariance()));
            G.kill();
        }, this);
        G.listen("close", function () {
            ZING.getEnvironment().setModalWidget(null);
        });
    };
    C.resetSelection = function () {
        this.setSelectionBox(0, 0, 0, 0);
        if (this._oActiveTool && this._bImageLoaded) {
            this._oActiveTool.cancel(this, this._oToolCanvas);
        }
    };
    C._getActiveRegion = function () {
        var J = Math.min(this._iActiveWidth, Math.max(0, this._iSelectX));
        var H = Math.min(this._iActiveHeight, Math.max(0, this._iSelectY));
        if (this._iSelectWidth > 0) {
            var G = Math.min(this._iActiveWidth - J, this._iSelectWidth);
        } else {
            var G = this._iActiveWidth - J;
        }
        if (this._iSelectHeight > 0) {
            var I = Math.min(this._iActiveHeight - H, this._iSelectHeight);
        } else {
            var I = this._iActiveHeight - H;
        }
        return {
            x: J,
            y: H,
            w: G,
            h: I
        };
    };
    C._doImageAction = function (K, H, G) {
        if (!K.instant) {
            this._oImageTab.Container.setWaiting(true);
        }
        var I = this;
        var J = this._getActiveRegion();
        setTimeout(function () {
            var N = I._oActiveImage;
            var L = false;
            if (!K.nonimage) {
                if (K.undoable) {
                    I._addUndoState();
                }
                if (I._oSelectionMask && !K.nonmaskable) {
                    var M = I._oSelectionMask;
                    L = true;
                    var O = I._createCanvasElement(I.getActiveWidth(), I.getActiveHeight());
                    O.getContext("2d").drawImage(N, 0, 0);
                    N = O;
                }
            }
            K.action(N, J.x, J.y, J.w, J.h, function () {
                if (!K.instant) {
                    I._oImageTab.Container.setWaiting(false);
                }
                if (G) {
                    G();
                }
                if (L) {
                    O.getContext("2d").globalCompositeOperation = "destination-in";
                    O.getContext("2d").drawImage(M, 0, 0);
                    O.getContext("2d").globalCompositeOperation = "source-over";
                    I._oActiveImage.getContext("2d").globalCompositeOperation = "destination-out";
                    I._oActiveImage.getContext("2d").drawImage(M, 0, 0);
                    I._oActiveImage.getContext("2d").globalCompositeOperation = "source-over";
                    I._oActiveImage.getContext("2d").drawImage(O, 0, 0);
                }
                I._updateImageDisplay();
            }, H, I);
        }, 0);
    };
    C.setZoomScale = function (G) {
        if (!this._bImageLoaded) {
            return;
        }
        this._fZoomScale = G;
        this._updateImageDisplay();
        this._oCanvasContainer.setPosition(this._oImgContainer.getWidth() / 2 - this._fZoomX * G, this._oImgContainer.getHeight() / 2 - this._fZoomY * G);
        if (this._oActiveTool) {
            this._oActiveTool.cancel(this, this._oToolCanvas);
        }
        this.resetSelection();
    };
    C.getZoomScale = function () {
        return this._fZoomScale;
    };
    C._updateImageDisplay = function () {
        if (!this._bImageLoaded) {
            return;
        }
        var H = this._oActiveImage;
        var G = this._oCanvasContainer;
        var J = this._fZoomScale;
        var I = false;
        if (H.width != this._iActiveWidth || H.height != this._iActiveHeight) {
            this.resetSelection();
            this._iActiveWidth = H.width;
            this._iActiveHeight = H.height;
            G.setDimensions(this._iActiveWidth * J, this._iActiveHeight * J);
            G.center();
            this._oToolCanvas.width = this._iActiveWidth;
            this._oToolCanvas.height = this._iActiveHeight;
            I = true;
        }
        this._oToolCanvas.style.width = this._iActiveWidth * J + "px";
        this._oToolCanvas.style.height = this._iActiveHeight * J + "px";
        H.style.width = this._iActiveWidth * J + "px";
        H.style.height = this._iActiveHeight * J + "px";
        this._oCanvasContainer.setDimensions(this._iActiveWidth * J, this._iActiveHeight * J);
        if (I) {
            G.center();
            this._fZoomX = this._iActiveWidth / 2;
            this._fZoomY = this._iActiveHeight / 2;
        }
        this._oInfoValueWidth.setText(this._iActiveWidth + "px");
        this._oInfoValueHeight.setText(this._iActiveHeight + "px");
    };
    C.recreateToolCanvas = function () {
        if (this._oToolCanvas) {
            ZING.DOM.removeChild(this._oCanvasContainer.getHTMLElement(), this._oToolCanvas);
        }
        return this.createToolCanvas();
    };
    C.createToolCanvas = function () {
        this._oToolCanvas = this._createCanvasElement(this._iActiveWidth, this._iActiveHeight);
        this._oToolCanvas.style.width = this._iActiveWidth * this._fZoomScale + "px";
        this._oToolCanvas.style.height = this._iActiveHeight * this._fZoomScale + "px";
        ZING.DOM.setZIndex(this._oToolCanvas, 500);
        ZING.DOM.appendChild(this._oCanvasContainer.getHTMLElement(), this._oToolCanvas);
        return this._oToolCanvas;
    };
    C._spawnWarningBox = function (K) {
        this._bWarned = true;
        var H = this.getSkin().WarningBox;
        var G = new F.Window(H.Window);
        var M = G.getContainer();
        var I = M.addChildWidget(new F.TextBox(H.WarningText));
        I.setWordWrap(true);
        I.setText('The actions in "Adjust" and "Effects" may take several seconds for even small images. Do you want to continue?');
        var L = M.addChildWidget(new F.TextButton(H.ButtonOK));
        M.lockYToHeight(L, -L.getHeight());
        M.lockXToWidth(L, -L.getWidth());
        var J = M.addChildWidget(new F.TextButton(H.ButtonCancel));
        J.listen("buttonclick", G.close, G);
        M.lockYToHeight(J, -J.getHeight());
        M.lockXToWidth(J, -(J.getWidth() + L.getWidth()));
        G.setTitle("Message");
        G.center();
        ZING.getEnvironment().setModalWidget(G);
        L.listen("buttonclick", function () {
            G.hide();
            G.kill();
            K();
        }, this);
    };
    C.createMessageBox = function (I, H) {
        var G = this.getSkin().MessageBox;
        var K = new F.Window(G.Window);
        var M = K.getContainer();
        var J = M.addChildWidget(new F.TextBox(G.MessageText));
        J.setWordWrap(true);
        J.setText(H || "");
        var L = M.addChildWidget(new F.TextButton(G.ButtonOK));
        M.lockYToHeight(L, -L.getHeight());
        M.lockXToWidth(L, -L.getWidth());
        K.setTitle(I || "Message");
        K.center();
        ZING.getEnvironment().setModalWidget(K);
        L.listen("buttonclick", function () {
            K.hide();
            K.kill();
        }, this);
    };
    C._createCanvasElement = function (H, J) {
        var L = ZING.DOM.createElement("canvas");
        if (H) {
            L.width = H;
            L.style.width = H + "px";
        }
        if (J) {
            L.height = J;
            L.style.height = J + "px";
        }
        L.style.position = "absolute";
        L.style.left = "0px";
        L.style.top = "0px";
        var I = L.getContext("2d");
        L.context2d = I;
        L.clear = function () {
            this.getContext("2d").clearRect(0, 0, this.width, this.height);
        };
        var K = this;
        L.copy = function () {
            var N = K._createCanvasElement(this.width, this.height);
            N.getContext("2d").drawImage(this, 0, 0);
            return N;
        };
        try {
            var G = L.getContext("opera-2dgame");
            L._context2dgame = G;
        } catch (M) {}
        if (I.getImageData) {
            L.prepareData = function (W, V, X, S, U) {
                var N = this.context2d.getImageData(W, V, X, S);
                this._data = N.data;
                this._datadesc = N;
                this._dataOffsetX = W;
                this._dataOffsetY = V;
                this._dataWidth = X;
                this._dataHeight = S;
                this._useorgdata = !! U;
                if (!this._useorgdata) {
                    var O = [];
                    var R = this._data;
                    var Q = S;
                    for (var Q = 0; Q < S * X; Q++) {
                        var P = Q;
                        var T = P * 4;
                        O[P] = [R[T], R[T + 1], R[T + 2], R[T + 3]];
                    }
                    this._pixels = O;
                }
            };
            L.cancelData = function () {
                this._pixels = [];
                this._data = null;
                this._datadesc = null;
            };
            L.setPixel = function (O, T, R, Q, N, P) {
                if (R < 0) {
                    R = 0;
                }
                if (R > 255) {
                    R = 255;
                }
                if (Q < 0) {
                    Q = 0;
                }
                if (Q > 255) {
                    Q = 255;
                }
                if (N < 0) {
                    N = 0;
                }
                if (N > 255) {
                    N = 255;
                }
                if (P < 0) {
                    P = 0;
                }
                if (P > 255) {
                    P = 255;
                }
                var S = T * this._dataWidth * 4 + O * 4;
                this._data[S] = R;
                this._data[S + 1] = Q;
                this._data[S + 2] = N;
                this._data[S + 3] = P;
            };
            L.getPixel = function (N, P) {
                if (this._useorgdata) {
                    var O = P * this._dataWidth * 4 + N * 4;
                    return [this._data[O], this._data[O + 1], this._data[O + 2], this._data[O + 3]];
                } else {
                    return this._pixels[P * this._dataWidth + N];
                }
            };
            L.endData = function () {
                if (!this._datadesc) {
                    return;
                }
                this.context2d.putImageData(this._datadesc, this._dataOffsetX, this._dataOffsetY);
                this.context2d.fillRect(0, 0, 0, 0);
            };
        } else {
            if (G) {
                L.prepareData = function (N, Q, O, P) {
                    this._dataOffsetX = N;
                    this._dataOffsetY = Q;
                    this._dataWidth = O;
                    this._dataHeight = P;
                    this._context2dgame.lockCanvasUpdates(true);
                };
                L.cancelData = function () {
                    this._context2dgame.lockCanvasUpdates(false);
                };
                L.setPixel = function (O, S, R, Q, N, P) {
                    if (R < 0) {
                        R = 0;
                    }
                    if (R > 255) {
                        R = 255;
                    }
                    if (Q < 0) {
                        Q = 0;
                    }
                    if (Q > 255) {
                        Q = 255;
                    }
                    if (N < 0) {
                        N = 0;
                    }
                    if (N > 255) {
                        N = 255;
                    }
                    if (P < 0) {
                        P = 0;
                    }
                    if (P > 255) {
                        P = 255;
                    }
                    this._context2dgame.setPixel(this._dataOffsetX + O, this._dataOffsetY + S, "rgba(" + R + "," + Q + "," + N + "," + P + ")");
                };
                L.getPixel = function (N, Q) {
                    var P = this._context2dgame.getPixel(this._dataOffsetX + N, this._dataOffsetY + Q);
                    if (P.substring(0, 1) == "#") {
                        var O = parseInt(P.substring(1), 16);
                        return aComps = [O >> 16, O >> 8 & 255, O & 255, 255];
                    } else {
                        return P.substring(5).substring(-1).split(",");
                    }
                };
                L.endData = function () {
                    this._context2dgame.lockCanvasUpdates(false);
                    this._context2dgame.updateCanvas();
                    this.context2d.fillRect(0, 0, 0, 0);
                };
            }
        }
        return L;
    };
})();
(function () {
    var C = ZING.GUI;
    var B = ZING.Core;
    var A = ZING.Application.States.registerClass("NoCanvas", ZING.Application.State, function (D) {
        this.__State(D);
    });
    A.setup = function () {
        var D = this.getSkin();
        this.addWidget(new C.Image(D.Logo));
        this.addWidget(new C.TextBox(D.Text)).loadHTMLContent("nocanvas.htm");
        this.addWidget(new C.Container(D.GoogleFirefox)).loadHTMLContent("getfirefox.htm");
        this.addWidget(new C.Container(D.GoogleAdsense));
    };
})();
ImageActions = {};
(function () {
    var E = ZING.GUI;
    var C = ZING.DOM;
    var B = ZING.Client.Quirks;
    var A = ZING.Net;
    ImageActions.Open = {
        action: function (H, M, L, G, F, I, N, J) {
            var K = N.uploader;
            K.setTargetURL("./app/loadimage/");
            K.setElementName("image");
            K.listen("response", function () {
                var O = K.getResponse();
                J.loadImage("./upload/" + O, function () {
                    if (I) {
                        I();
                    }
                });
            });
            K.upload();
            return true;
        },
        dialogname: "Open file from disk",
        dialoglonglast: true,
        dialog: function (H, G) {
            var F = H.getContainer();
            var I = F.addChildWidget(new E.Label(G.Text));
            I.setText("Please pick a file to upload.\r\nAccepted formats are PNG, JPEG, GIF and BMP. Maximum filesize is 4,000,000 bytes.");
            I.setAdjustToText(false);
            var J = F.addChildWidget(new E.FileUploader(G.Upload));
            J.setAccept("image/jpeg,image/jpg,image/png,image/gif,image/bmp");
            J.getButton().setText("Browse...");
            return function () {
                return {
                    uploader: J
                };
            };
        },
        menusetup: function (F) {
            return ["File", F.File.Open, "Open file"];
        },
        nonimage: true,
        sourcefile: "actions/open.js"
    };
    ImageActions.OpenURL = {
        action: function (I, M, L, H, F, J, N, K) {
            var G = N.url;
            K.loadImageURL(G, function () {
                J(true);
            });
            return true;
        },
        dialogname: "Open image from URL",
        dialog: function (H, G) {
            var F = H.getContainer();
            var I = F.addChildWidget(new E.Label(G.Text));
            I.setText("Please enter the address of a valid image file.\r\nAccepted formats are PNG, JPEG, GIF and BMP. Maximum filesize is 4,000,000 bytes.");
            I.setAdjustToText(false);
            F.addChildWidget(new E.Label(G.URLInputLabel)).setText("URL:");
            var J = F.addChildWidget(new E.InputField(G.URLInput));
            return function () {
                return {
                    url: J.getValue()
                };
            };
        },
        menusetup: function (F) {
            return ["File", F.File.OpenURL, "Open URL"];
        },
        nonimage: true
    };
    ImageActions.Save = {
        action: function (H, L, K, G, F, I, M) {
            var O = H.toDataURL();
            var J = new A.HTTPRequest();
            var N = function () {
                var P = J.getResponse();
                document.location.href = "./app/getimage/?id=" + P + "&frm=" + M.format;
                I(true);
            };
            J.listen("response", N);
            O = O.substring(("data:image/png;base64").length + 1);
            J.send("./app/saveimage/", {
                data: O
            }, "POST");
            return true;
        },
        dialogname: "Save image",
        dialog: function (I, H) {
            var G = I.getContainer();
            var J = G.addChildWidget(new E.Label(H.Text));
            J.setText("You are about to download your image to your desktop. Please select a file format from the list below.");
            J.setAdjustToText(false);
            var F = G.addChildWidget(new E.SelectBox(H.FormatList));
            F.addItem("PNG", "PNG");
            F.addItem("JPEG (Low quality)", "JPEGLOW");
            F.addItem("JPEG (Medium quality)", "JPEGMEDIUM");
            F.addItem("JPEG (High quality)", "JPEGHIGH");
            F.addItem("BMP (Windows Bitmap)", "BMP");
            F.addItem("WBMP (Monochrome)", "WBMP");
            var K = G.addChildWidget(new E.Label(H.FormatLabel));
            K.setText("Image format");
            return function () {
                return {
                    format: F.getValue()
                };
            };
        },
        menusetup: function (F) {
            return ["File", F.File.Save, "Save"];
        },
        nonmaskable: false,
        dataurl: true,
        sourcefile: "actions/save.js"
    };
    var E = ZING.GUI;
    ImageActions.SaveURL = {
        action: function (H, L, K, G, F, I, M) {
            var O = H.toDataURL();
            var J = new A.HTTPRequest();
            var N = function () {
                var R = J.getResponse();
                var S = "http://editor.pixastic.com/app/getimage/?id=" + R + "&frm=" + M.format + "&nd=true";
                var P = M.urlwindow;
                var Q = M.urlinput;
                Q.setValue(S);
                ZING.getEnvironment().setModalWidget(P);
                P.center();
                I(true);
            };
            J.listen("response", N);
            O = O.substring(("data:image/png;base64").length + 1);
            J.send("./app/saveimage/", {
                data: O
            }, "POST");
            return true;
        },
        dialogname: "Save image to URL",
        dialog: function (H, N) {
            var L = H.getContainer();
            var M = L.addChildWidget(new E.Label(N.Text));
            M.setText("You are about to save your image to a temporary URL. Please select a file format from the list below.");
            M.setAdjustToText(false);
            var G = L.addChildWidget(new E.SelectBox(N.FormatList));
            G.addItem("PNG", "PNG");
            G.addItem("JPEG (Low quality)", "JPEGLOW");
            G.addItem("JPEG (Medium quality)", "JPEGMEDIUM");
            G.addItem("JPEG (High quality)", "JPEGHIGH");
            G.addItem("BMP (Windows Bitmap)", "BMP");
            G.addItem("WBMP (Monochrome)", "WBMP");
            var I = L.addChildWidget(new E.Label(N.FormatLabel));
            I.setText("Image format");
            var O = new E.Window(N.URLWindow.Window);
            var K = O.getContainer();
            var F = K.addChildWidget(new E.InputField(N.URLWindow.URLInput));
            var P = K.addChildWidget(new E.Label(N.URLWindow.Text));
            P.setText("Below is the URL to your image. Since Pixastic is not an image hosting service, the URL is only valid for 5 minutes to allow you to upload it to another site.");
            P.setAdjustToText(false);
            var J = K.addChildWidget(new E.TextButton(N.URLWindow.ButtonOK));
            K.lockYToHeight(J, -J.getHeight());
            K.lockXToWidth(J, -J.getWidth());
            O.setTitle("Image URL");
            J.listen("buttonclick", function () {
                O.hide();
                O.kill();
            }, this);
            return function () {
                return {
                    format: G.getValue(),
                    urlwindow: O,
                    urlinput: F
                };
            };
        },
        menusetup: function (F) {
            return ["File", F.File.SaveURL, "Save to URL"];
        },
        nonmaskable: true,
        dataurl: true,
        sourcefile: "actions/saveurl.js"
    };
    ImageActions.SampleImages = {
        action: function (I, F, M, J, L, G, H, K) {
            K.loadImage("sample/" + H.image, function () {
                G(true);
            });
            return true;
        },
        dialogname: "Open sample image",
        dialog: function (H, Q, L, I) {
            var K = H.getContainer().addChildWidget(new E.Container(Q.ImageContainer));
            var O = ["Kendwa.jpg", "Kilimanjaro.jpg", "RogerWaters.jpg", "RoskildeTents.jpg", "SillyPeter.jpg", "Wildebeest.jpg"];
            var J = Q.ImagesPerRow;
            var R = 0;
            var P = 0;

            function G(T) {
                H.hide();
                var S = function () {
                    H.kill();
                };
                I._doImageAction(ImageActions.SampleImages, {
                    image: T
                }, S);
            }
            var N = Q.ImagePadding;
            for (var M = 0; M < O.length; M++) {
                var F = K.addChildWidget(new E.Image(Q.ImageSmall));
                F.setSource("sample/" + O[M]);
                F.setTooltip(O[M]);
                (function () {
                    var S = O[M];
                    F.listen("click", function () {
                        G(S);
                    });
                })();
                F.setPosition((F.getWidth() + N) * R, (F.getHeight() + N) * P);
                R++;
                if (R >= J) {
                    R = 0;
                    P++;
                }
            }
        },
        menusetup: function (F) {
            return ["File", F.File.SampleImages, "Sample images"];
        },
        nonimage: true,
        sourcefile: "actions/sampleimages.js"
    };
    ImageActions.Cut = {
        action: function (I, M, L, H, G, J, N, K) {
            var O = K.getClipCanvas();
            O.width = H;
            O.height = G;
            O.getContext("2d").drawImage(I, M, L, H, G, 0, 0, H, G);
            var F = I.getContext("2d");
            F.clearRect(M, L, H, G);
            if (J) {
                J(true);
            }
            return true;
        },
        menusetup: function (F) {
            return ["Edit", F.Edit.Cut, "Cut"];
        },
        instant: true,
        sourcefile: "actions/cut.js"
    };
    ImageActions.Copy = {
        action: function (H, L, K, G, F, I, M, J) {
            var N = J.getClipCanvas();
            N.width = G;
            N.height = F;
            N.getContext("2d").drawImage(H, L, K, G, F, 0, 0, G, F);
            if (I) {
                I(true);
            }
            return true;
        },
        menusetup: function (F) {
            return ["Edit", F.Edit.Copy, "Copy"];
        },
        instant: true,
        nonimage: true,
        sourcefile: "actions/copy.js"
    };
    ImageActions.Paste = {
        action: function (H, L, K, G, F, I, M, J) {
            var N = J.getClipCanvas();
            H.getContext("2d").drawImage(N, L, K);
            if (I) {
                I(true);
            }
            return true;
        },
        menusetup: function (F) {
            return ["Edit", F.Edit.Paste, "Paste"];
        },
        instant: true,
        undoable: true
    };
    ImageActions.PasteScaled = {
        action: function (H, L, K, G, F, I, M, J) {
            var N = J.getClipCanvas();
            H.getContext("2d").drawImage(N, L, K, G, F);
            if (I) {
                I(true);
            }
            return true;
        },
        menusetup: function (F) {
            return ["Edit", F.Edit.PasteScaled, "Paste scaled"];
        },
        instant: true,
        undoable: true,
        sourcefile: "actions/pastescaled.js"
    };
    ImageActions.Fill = {
        action: function (I, M, L, H, G, J, N, K) {
            var F = I.getContext("2d");
            F.fillStyle = K.getActiveColor().toRGBAString();
            F.fillRect(M, L, H, G);
            if (J) {
                J(true);
            }
            return true;
        },
        menusetup: function (F) {
            return ["Edit", F.Edit.Fill, "Fill"];
        },
        instant: true,
        undoable: true,
        sourcefile: "actions/fill.js"
    };
    ImageActions.Stroke = {
        action: function (I, M, L, H, G, J, N, K) {
            var F = I.getContext("2d");
            F.strokeStyle = K.getActiveColor().toRGBAString();
            F.strokeRect(M, L, H, G);
            if (J) {
                J(true);
            }
            return true;
        },
        menusetup: function (F) {
            return ["Edit", F.Edit.Stroke, "Stroke"];
        },
        instant: true,
        undoable: true,
        sourcefile: "actions/stroke.js"
    };
    ImageActions.Resize = {
        action: function (I, N, M, H, G, J, P, K) {
            if (!P) {
                return false;
            }
            var O = parseInt(P.width, 10);
            var L = parseInt(P.height, 10);
            O = Math.max(1, O);
            L = Math.max(1, L);
            O = Math.min(2048, O);
            L = Math.min(2048, L);
            if (O != I.width || L != I.height) {
                var Q = C.createElement("canvas");
                Q.width = I.width;
                Q.height = I.height;
                Q.style.width = I.style.width;
                Q.style.height = I.style.height;
                Q.getContext("2d").drawImage(I, 0, 0);
                I.width = O;
                I.height = L;
                var F = I.getContext("2d");
                F.drawImage(Q, 0, 0, Q.width, Q.height, 0, 0, O, L);
                K.resetSelection();
            }
            if (J) {
                J(true);
            }
            return true;
        },
        nonmaskable: true,
        dialogname: "Resize image",
        dialog: function (F, O, L, G) {
            var K = F.getContainer();
            K.addChildWidget(new E.Label(O.Text)).setText("Maximum size: 2048 x 2048 px");
            var M = K.addChildWidget(new E.Label(O.WidthLabel));
            M.setText("Width:");
            var J = K.addChildWidget(new E.Label(O.HeightLabel));
            J.setText("Height:");
            var N = K.addChildWidget(new E.InputField(O.WidthInput));
            var I = K.addChildWidget(new E.InputField(O.HeightInput));
            N.setValue(G.getActiveWidth());
            I.setValue(G.getActiveHeight());
            var H = function () {
                return {
                    width: parseInt(N.getValue(), 10),
                    height: parseInt(I.getValue(), 10)
                };
            };
            return H;
        },
        menusetup: function (F) {
            return ["Transform", F.Transform.Resize, "Resize"];
        },
        undoable: true,
        sourcefile: "actions/resize.js"
    };
    ImageActions.Crop = {
        action: function (I, M, L, H, G, J, N, K) {
            if (M == 0 && L == 0 && H == I.width && G == I.height) {
                K.createMessageBox("Crop", "Use the selection tool to select a rectangular region before cropping.");
            } else {
                var O = C.createElement("canvas");
                O.width = I.width;
                O.height = I.height;
                O.style.width = I.style.width;
                O.style.height = I.style.height;
                O.getContext("2d").drawImage(I, 0, 0);
                I.width = H;
                I.height = G;
                var F = I.getContext("2d");
                F.drawImage(O, M, L, H, G, 0, 0, H, G);
                K.resetSelection();
            }
            if (J) {
                J(true);
            }
            return true;
        },
        dialog: null,
        menusetup: function (F) {
            return ["Transform", F.Transform.Crop, "Crop"];
        },
        instant: true,
        sourcefile: "actions/crop.js"
    };
    ImageActions.Rotate90CW = {
        action: function (I, M, L, H, G, J) {
            var N = I.height;
            var K = I.width;
            var O = C.createElement("canvas");
            O.width = I.width;
            O.height = I.height;
            O.getContext("2d").drawImage(I, 0, 0);
            I.width = N;
            I.height = K;
            var F = I.getContext("2d");
            F.save();
            F.rotate(90 * Math.PI / 180);
            F.drawImage(O, 0, -N);
            F.restore();
            if (J) {
                J(true);
            }
            return true;
        },
        instant: true,
        dialog: null,
        menusetup: function (F) {
            return ["Transform", F.Transform.Rotate90CW, "Rotate 90� CW"];
        },
        undoable: true,
        sourcefile: "actions/rotate90cw.js"
    };
    ImageActions.Rotate90CCW = {
        action: function (I, F, M, K, L, H) {
            var G = C.createElement("canvas");
            G.width = I.width;
            G.height = I.height;
            G.getContext("2d").drawImage(I, 0, 0);
            I.width = G.height;
            I.height = G.width;
            var J = I.getContext("2d");
            J.save();
            J.translate(0, I.height);
            J.rotate(-90 * Math.PI / 180);
            J.drawImage(G, 0, 0);
            J.restore();
            if (H) {
                H(true);
            }
            return true;
        },
        instant: true,
        dialog: null,
        menusetup: function (F) {
            return ["Transform", F.Transform.Rotate90CCW, "Rotate 90� CCW"];
        },
        undoable: true,
        sourcefile: "actions/rotate90ccw.js"
    };
    ImageActions.FlipHorizontal = {
        action: function (I, M, L, H, F, J) {
            var N = C.createElement("canvas");
            N.width = H;
            N.height = F;
            N.getContext("2d").drawImage(I, M, L, H, F, 0, 0, H, F);
            var G = I.getContext("2d");
            G.clearRect(M, L, H, F);
            if (B.CanvasFlipGap) {
                for (var K = 0; K < H; K++) {
                    G.drawImage(N, K, 0, 1, F, M + H - (K) - 1, L, 1, F);
                }
            } else {
                G.save();
                G.translate(H, 0);
                G.scale(-1, 1);
                G.drawImage(N, -M, L);
                G.restore();
            }
            if (J) {
                J(true);
            }
            return true;
        },
        dialog: null,
        menusetup: function (F) {
            return ["Transform", F.Transform.FlipH, "Flip horizontally"];
        },
        undoable: true,
        sourcefile: "actions/fliphorizontal.js"
    };
    ImageActions.FlipVertical = {
        action: function (I, M, L, H, F, J) {
            var N = C.createElement("canvas");
            N.width = H;
            N.height = F;
            N.getContext("2d").drawImage(I, M, L, H, F, 0, 0, H, F);
            var G = I.getContext("2d");
            G.clearRect(M, L, H, F);
            if (B.CanvasFlipGap) {
                for (var K = 0; K < F; K++) {
                    G.drawImage(N, 0, K, H, 1, M, L + F - (K) - 1, H, 1);
                }
            } else {
                G.save();
                G.translate(0, F);
                G.scale(1, -1);
                G.drawImage(N, M, -L);
                G.restore();
            }
            J(true);
            return true;
        },
        dialog: null,
        menusetup: function (F) {
            return ["Transform", F.Transform.FlipV, "Flip vertically"];
        },
        undoable: true,
        sourcefile: "actions/flipvertical.js"
    };
    ImageActions.Desaturate = {
        action: function (H, L, K, G, F, I) {
            H.prepareData(L, K, G, F, true);
            var J = F;
            var P = G;
            var N = J;
            do {
                var O = P;
                do {
                    var Q = H.getPixel(O - 1, N - 1);
                    if (Q[3] > 0) {
                        var M = Q[0] * 0.3 + Q[1] * 0.59 + Q[2] * 0.11;
                        H.setPixel(O - 1, N - 1, M, M, M, Q[3]);
                    }
                } while (--O);
            } while (--N);
            H.endData();
            if (I) {
                I(true);
            }
            return true;
        },
        pixelaccess: true,
        menusetup: function (F) {
            return ["Adjust", F.Adjust.Desaturate, "Desaturate"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/desaturate.js"
    };
    ImageActions.BrightnessContrast = {
        action: function (H, O, N, G, F, J, Q) {
            H.prepareData(O, N, G, F, true);
            var R = 1;
            var I = 1;
            if (Q) {
                if (typeof Q.brightness != "undefined") {
                    R = parseFloat(Q.brightness);
                }
                if (typeof Q.contrast != "undefined") {
                    I = parseFloat(Q.contrast);
                }
            }
            var L = F;
            var T = G;
            var P = L;
            do {
                var S = T;
                do {
                    var V = H.getPixel(S - 1, P - 1);
                    if (V[3] > 0) {
                        var U = V[0];
                        var K = V[1];
                        var M = V[2];
                        U = (U * R);
                        U = ((U - 128) * I + 128);
                        K = (K * R);
                        K = ((K - 128) * I + 128);
                        M = (M * R);
                        M = ((M - 128) * I + 128);
                        H.setPixel(S - 1, P - 1, U, K, M, V[3]);
                    }
                } while (--S);
            } while (--P);
            H.endData();
            if (J) {
                J(true);
            }
            return true;
        },
        pixelaccess: true,
        dialogname: "Brightness/Contrast",
        dialogpreview: true,
        dialog: function (F, N, K) {
            var J = F.getContainer();
            var H = J.addChildWidget(new E.Label(N.BrightnessLabel));
            H.setText("Brightness");
            var O = J.addChildWidget(new E.SliderHorizontal(N.BrightnessSlider));
            O.setValue(0.5);
            O.update();
            var G = J.addChildWidget(new E.Label(N.ContrastLabel));
            G.setText("Contrast");
            var L = J.addChildWidget(new E.SliderHorizontal(N.ContrastSlider));
            L.setValue(0.5);
            L.update();
            var I = function () {
                return {
                    brightness: O.getValue() * 2,
                    contrast: L.getValue() * 2
                };
            };
            var M = function () {
                K.update(ImageActions.BrightnessContrast, I());
            };
            O.listen("handledragend", M);
            L.listen("handledragend", M);
            return I;
        },
        menusetup: function (F) {
            return ["Adjust", F.Adjust.BrightnessContrast, "Bright/Contrast"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/brightnesscontrast.js"
    };
    var D = ZING.Core;
    ImageActions.HSL = {
        action: function (M, X, W, P, H, U, O) {
            M.prepareData(X, W, P, H, true);
            var F = Math.round(O.hue);
            var R = O.saturation / 100;
            var V = O.lightness / 100;
            var S = H;
            var L = P;
            var J = S;
            var N = new D.Color();
            do {
                var K = L;
                do {
                    var T = M.getPixel(K - 1, J - 1);
                    if (T[3] > 0) {
                        var Y = T[0];
                        var G = T[1];
                        var I = T[2];
                        if (F != 0 || R != 0) {
                            N.set(Y, G, I);
                            var Q = N.toHSL();
                            Q.H += F;
                            if (R < 0) {
                                Q.S *= 1 + R;
                            } else {
                                if (R > 0) {
                                    Q.S *= 1 + R * 2;
                                }
                            }
                            if (Q.S < 0) {
                                Q.S = 0;
                            }
                            if (Q.S > 1) {
                                Q.S = 1;
                            }
                            var N = N.fromHSL(Q.H, Q.S, Q.L);
                            Y = N.getRed();
                            G = N.getGreen();
                            I = N.getBlue();
                        }
                        if (V < 0) {
                            Y = Y * (1 + V);
                            G = G * (1 + V);
                            I = I * (1 + V);
                        } else {
                            if (V > 0) {
                                Y = Y * (1 - V) + 255 * V;
                                G = G * (1 - V) + 255 * V;
                                I = I * (1 - V) + 255 * V;
                            }
                        }
                        M.setPixel(K - 1, J - 1, Y, G, I, T[3]);
                    }
                } while (--K);
            } while (--J);
            M.endData();
            if (U) {
                U(true);
            }
            return true;
        },
        dialogname: "Hue/Saturation",
        dialogpreview: true,
        dialog: function (H, O, L) {
            var K = H.getContainer();
            var F = K.addChildWidget(new E.Label(O.HueLabel));
            var R = K.addChildWidget(new E.SliderHorizontal(O.HueSlider));
            R.moveToValue(0.5);
            var Q = K.addChildWidget(new E.Label(O.SaturationLabel));
            var I = K.addChildWidget(new E.SliderHorizontal(O.SaturationSlider));
            I.moveToValue(0.5);
            var N = K.addChildWidget(new E.Label(O.LightLabel));
            var P = K.addChildWidget(new E.SliderHorizontal(O.LightSlider));
            P.moveToValue(0.5);
            var J = function () {
                return {
                    hue: Math.round((R.getValue() - 0.5) * 360),
                    saturation: Math.round((I.getValue() - 0.5) * 200),
                    lightness: Math.round((P.getValue() - 0.5) * 200)
                };
            };
            var G = function () {
                var S = J();
                F.setText("Hue: " + S.hue + "�");
                Q.setText("Saturation: " + S.saturation);
                N.setText("Lightness: " + S.lightness);
            };
            var M = function () {
                L.update(ImageActions.HSL, J());
            };
            R.listen("handledragend", M);
            R.listen("change", G);
            I.listen("handledragend", M);
            I.listen("change", G);
            P.listen("handledragend", M);
            P.listen("change", G);
            M();
            G();
            return J;
        },
        pixelaccess: true,
        menusetup: function (F) {
            return ["Adjust", F.Adjust.HSL, "Hue/Saturation"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/hsl.js"
    };
    ImageActions.BlurFast = {
        action: function (J, T, R, P, G, Q, L) {
            var K = J.getContext("2d");
            var N = 2;
            var M = Math.round(P / N);
            var W = Math.round(G / N);
            var I = C.createElement("canvas");
            I.width = M;
            I.height = W;
            I.style.width = M + "px";
            I.style.height = W + "px";
            var S = false;
            var U = Math.round(L.amount * 20);
            var H = I.getContext("2d");
            for (var O = 0; O < U; O++) {
                var V = Math.max(1, Math.round(M - O));
                var F = Math.max(1, Math.round(W - O));
                H.clearRect(0, 0, M, W);
                H.drawImage(J, T, R, P, G, 0, 0, V, F);
                if (S) {
                    K.clearRect(0, 0, P, G);
                }
                K.drawImage(I, 0, 0, V, F, T, R, P, G);
            }
            if (Q) {
                Q(true);
            }
            return true;
        },
        dialogname: "Blur",
        dialogpreview: true,
        dialog: function (I, H, M) {
            var G = I.getContainer();
            var J = G.addChildWidget(new E.Label(H.AmountLabel));
            J.setText("Amount");
            var F = G.addChildWidget(new E.SliderHorizontal(H.Slider));
            var K = function () {
                return {
                    amount: F.getValue()
                };
            };
            var L = function () {
                M.update(ImageActions.BlurFast, K());
            };
            F.listen("change", L);
            return K;
        },
        menusetup: function (F) {
            return ["Effects", F.Effects.BlurFast, "Blur"];
        },
        undoable: true,
        sourcefile: "actions/blurfast.js"
    };
    ImageActions.UnsharpMask = {
        action: function (S, j, f, a, H, e, V) {
            var I = V.threshold;
            var m = V.radius;
            var o = V.amount * 0.016;
            var X = 2;
            var W = Math.round(a / X);
            var n = Math.round(H / X);
            var O = C.createElement("canvas");
            O.width = W;
            O.height = n;
            O.style.width = W + "px";
            O.style.height = n + "px";
            var L = S.copy();
            var T = L.getContext("2d");
            var g = true;
            var k = Math.round(m * 20);
            var K = O.getContext("2d");
            for (var Z = 0; Z < k; Z++) {
                var l = Math.max(1, Math.round(W - Z));
                var G = Math.max(1, Math.round(n - Z));
                K.clearRect(0, 0, W, n);
                K.drawImage(S, j, f, a, H, 0, 0, l, G);
                if (g) {
                    T.clearRect(0, 0, a, H);
                }
                T.drawImage(O, 0, 0, l, G, j, f, a, H);
            }
            S.prepareData(j, f, a, H, true);
            L.prepareData(j, f, a, H, true);
            var c = H;
            var R = a;
            var N = c;
            do {
                var Q = R;
                do {
                    var d = S.getPixel(Q - 1, N - 1);
                    if (d[3] > 0) {
                        var Y = L.getPixel(Q - 1, N - 1);
                        var p = d[0];
                        var F = d[1];
                        var J = d[2];
                        var P = Y[0];
                        var U = Y[1];
                        var b = Y[2];
                        var M = false;
                        if (Math.abs(p - P) >= I) {
                            p = (o + 1) * (p - P) + P;
                            M = true;
                        }
                        if (Math.abs(F - U) >= I) {
                            F = (o + 1) * (F - U) + U;
                            M = true;
                        }
                        if (Math.abs(J - b) >= I) {
                            J = (o + 1) * (J - b) + b;
                            M = true;
                        }
                        if (M) {
                            S.setPixel(Q - 1, N - 1, p, F, J, d[3]);
                        }
                    }
                } while (--Q);
            } while (--N);
            L.cancelData();
            S.endData();
            if (e) {
                e(true);
            }
            return true;
        },
        dialogname: "Unsharp mask",
        dialogpreview: true,
        dialog: function (G, O, K) {
            var J = G.getContainer();
            var P = J.addChildWidget(new E.Label(O.AmountLabel));
            var M = J.addChildWidget(new E.Label(O.RadiusLabel));
            var Q = J.addChildWidget(new E.Label(O.ThresholdLabel));
            var R = J.addChildWidget(new E.SliderHorizontal(O.AmountSlider));
            var L = J.addChildWidget(new E.SliderHorizontal(O.RadiusSlider));
            var H = J.addChildWidget(new E.SliderHorizontal(O.ThresholdSlider));
            R.moveToValue(0.2);
            var I = function () {
                return {
                    amount: Math.round(R.getValue() * 500),
                    radius: L.getValue() * 5,
                    threshold: Math.round(H.getValue() * 255)
                };
            };
            var F = function () {
                var S = I();
                P.setText("Amount: " + S.amount + "%");
                M.setText("Radius: " + S.radius.toFixed(2) + " pixels");
                Q.setText("Threshold: " + S.threshold + " levels");
            };
            var N = function () {
                var S = I();
                S.radius *= K.scale;
                K.update(ImageActions.UnsharpMask, S);
            };
            R.listen("change", F);
            L.listen("change", F);
            H.listen("change", F);
            R.listen("handledragend", N);
            L.listen("handledragend", N);
            H.listen("handledragend", N);
            N();
            F();
            return I;
        },
        pixelaccess: true,
        menusetup: function (F) {
            return ["Effects", F.Effects.UnsharpMask, "Unsharp mask"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/unsharpmask.js"
    };
    ImageActions.Posterize = {
        action: function (N, W, V, R, G, U, O) {
            N.prepareData(W, V, R, G, true);
            var Z = 256;
            if (O) {
                if (typeof O.levels != "undefined") {
                    Z = parseInt(O.levels, 10);
                }
            }
            Z = Math.max(2, Math.min(256, Z));
            var J = 256 / Z;
            var P = 256 / (Z - 1);
            var Y = [];
            for (var Q = 0; Q < 256; Q++) {
                Y[Q] = 255 * (Z * Q / 256) / (Z - 1);
                Y[Q] = (Z / 256) * (Q / 256) * 256;
            }
            var I = new Date().getTime();
            var S = G;
            var M = R;
            var K = S;
            do {
                var L = M;
                do {
                    var T = N.getPixel(L - 1, K - 1);
                    if (T[3] > 0) {
                        var X = P * Math.floor(T[0] / J);
                        var F = P * Math.floor(T[1] / J);
                        var H = P * Math.floor(T[2] / J);
                        N.setPixel(L - 1, K - 1, X, F, H, T[3]);
                    }
                } while (--L);
            } while (--K);
            N.endData();
            if (U) {
                U(true);
            }
            return true;
        },
        dialogname: "Posterize",
        dialogpreview: true,
        dialog: function (G, N, K) {
            var J = G.getContainer();
            var H = J.addChildWidget(new E.Label(N.LevelsLabel));
            var L = J.addChildWidget(new E.SliderHorizontal(N.LevelsSlider));
            L.setValue(1 / 64 * 16);
            L.update();
            var I = function () {
                return {
                    levels: Math.max(1, Math.round(L.getValue() * 32))
                };
            };
            var F = function () {
                var O = I();
                H.setText("Levels: " + O.levels);
            };
            var M = function () {
                K.update(ImageActions.Posterize, I());
            };
            L.listen("handledragend", M);
            L.listen("change", F);
            M();
            F();
            return I;
        },
        pixelaccess: true,
        menusetup: function (F) {
            return ["Effects", F.Effects.Posterize, "Posterize"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/posterize.js"
    };
    ImageActions.Invert = {
        action: function (H, L, K, G, F, I, N) {
            H.prepareData(L, K, G, F);
            var J = F;
            var P = G;
            var M = J;
            do {
                var O = P;
                do {
                    var Q = H.getPixel(O - 1, M - 1);
                    if (Q[3] > 0) {
                        H.setPixel(O - 1, M - 1, 255 - Q[0], 255 - Q[1], 255 - Q[2], Q[3]);
                    }
                } while (--O);
            } while (--M);
            H.endData();
            if (I) {
                I(true);
            }
            return true;
        },
        pixelaccess: true,
        menusetup: function (F) {
            return ["Effects", F.Effects.Invert, "Invert"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/invert.js"
    };
    ImageActions.Sepia = {
        action: function (I, N, M, H, F, J) {
            I.prepareData(N, M, H, F, true);
            var L = F;
            var Q = H;
            var O = L;
            do {
                var P = Q;
                do {
                    var S = I.getPixel(P - 1, O - 1);
                    if (S[3] > 0) {
                        var K = S[0];
                        var R = S[1];
                        var G = S[2];
                        I.setPixel(P - 1, O - 1, (K * 0.393 + R * 0.769 + G * 0.189), (K * 0.349 + R * 0.686 + G * 0.168), (K * 0.272 + R * 0.534 + G * 0.131), S[3]);
                    }
                } while (--P);
            } while (--O);
            I.endData();
            J(true);
            return true;
        },
        pixelaccess: true,
        dialog: null,
        menusetup: function (F) {
            return ["Effects", F.Effects.Sepia, "Sepia tone"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/sepia.js"
    };
    ImageActions.Edges = {
        action: function (L, d, b, o, c, G, J) {
            L.prepareData(d, b, o, c);
            var Y = 1;
            var F = -Y / 8;
            var f = false;
            var K = true;
            if (J) {
                if (typeof J.invert != "undefined") {
                    K = Options.invert;
                }
                if (typeof J.mono != "undefined") {
                    f = Options.mono;
                }
            }
            var O = [
                [F, F, F],
                [F, 1, F],
                [F, F, F]
            ];
            var Q = 0;
            for (var k = 0; k < 3; k++) {
                for (var g = 0; g < 3; g++) {
                    Q += O[k][g];
                }
            }
            Q = F;
            var l = c;
            var a = o;
            var X = l;
            do {
                var p = -1;
                var U = 1;
                if (X == 1) {
                    p = 0;
                }
                if (X == l) {
                    U = 0;
                }
                var Z = a;
                do {
                    var V = 1;
                    var q = -1;
                    if (Z == 1) {
                        q = 0;
                    }
                    if (Z == a) {
                        V = 0;
                    }
                    var P = L.getPixel(Z - 1, X - 1);
                    if (P[3] > 0) {
                        var n = L.getPixel(Z - 1 + q, X - 1);
                        var T = L.getPixel(Z - 1 + V, X - 1);
                        var m = L.getPixel(Z - 1, X - 1 + p);
                        var S = L.getPixel(Z - 1, X - 1 + U);
                        var R = L.getPixel(Z - 1 + q, X - 1 + p);
                        var I = L.getPixel(Z - 1 + q, X - 1 + U);
                        var M = L.getPixel(Z - 1 + V, X - 1 + p);
                        var W = L.getPixel(Z - 1 + V, X - 1 + U);
                        var e = ((R[0] + m[0] + M[0] + n[0] + T[0] + I[0] + S[0] + W[0]) * F + P[0]) / Q;
                        var r = ((R[1] + m[1] + M[1] + n[1] + T[1] + I[1] + S[1] + W[1]) * F + P[1]) / Q;
                        var H = ((R[2] + m[2] + M[2] + n[2] + T[2] + I[2] + S[2] + W[2]) * F + P[2]) / Q;
                        if (f) {
                            var N = Math.round(e * 0.3 + r * 0.59 + H * 0.11);
                            if (K) {
                                N = 255 - N;
                            }
                            if (N < 0) {
                                N = 0;
                            }
                            if (N > 255) {
                                N = 255;
                            }
                            e = r = H = N;
                        } else {
                            if (K) {
                                e = 255 - e;
                                r = 255 - r;
                                H = 255 - H;
                            }
                        }
                        L.setPixel(Z - 1, X - 1, e, r, H, P[3]);
                    }
                } while (--Z);
            } while (--X);
            L.endData();
            if (G) {
                G(true);
            }
            return true;
        },
        pixelaccess: true,
        dialog: null,
        menusetup: function (F) {
            return ["Effects", F.Effects.Edges, "Edge detection"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/edges.js"
    };
    ImageActions.Laplace = {
        action: function (U, d, c, Y, L, b, W) {
            U.prepareData(d, c, Y, L);
            var K = 1.5;
            var I = false;
            if (W) {
                if (typeof W.contrast != "undefined") {
                    K = parseFloat(W.contrast);
                }
                if (typeof W.invert != "undefined") {
                    I = (W.invert == "true");
                }
            }
            if (K > 1) {
                K *= 3;
            }
            var Z = L;
            var T = Y;
            var R = Z;
            do {
                var P = -1;
                var j = 1;
                if (R == 1) {
                    P = 0;
                }
                if (R == Z) {
                    j = 0;
                }
                var S = T;
                do {
                    var F = 1;
                    var Q = -1;
                    if (S == 1) {
                        Q = 0;
                    }
                    if (S == T) {
                        F = 0;
                    }
                    var a = U.getPixel(S - 1, R - 1);
                    if (a[3] > 0) {
                        var N = U.getPixel(S - 1 + Q, R - 1);
                        var f = U.getPixel(S - 1 + F, R - 1);
                        var M = U.getPixel(S - 1, R - 1 + P);
                        var e = U.getPixel(S - 1, R - 1 + j);
                        var i = U.getPixel(S - 1 + Q, R - 1 + P);
                        var H = U.getPixel(S - 1 + Q, R - 1 + j);
                        var V = U.getPixel(S - 1 + F, R - 1 + P);
                        var X = U.getPixel(S - 1 + F, R - 1 + j);
                        var g = (-i[0] - M[0] - V[0] - N[0] + a[0] * 8 - f[0] - H[0] - e[0] - X[0]) / 8;
                        var J = (-i[1] - M[1] - V[1] - N[1] + a[1] * 8 - f[1] - H[1] - e[1] - X[1]) / 8;
                        var O = (-i[2] - M[2] - V[2] - N[2] + a[2] * 8 - f[2] - H[2] - e[2] - X[2]) / 8;
                        var G = ((g + J + O) / 3) + 128;
                        if (K != 1) {
                            G = ((G - 128) * K + 128);
                        }
                        if (I) {
                            G = 255 - G;
                        }
                        U.setPixel(S - 1, R - 1, G, G, G, a[3]);
                    }
                } while (--S);
            } while (--R);
            U.endData();
            if (b) {
                b(true);
            }
            return true;
        },
        pixelaccess: true,
        dialog: null,
        menusetup: function (F) {
            return ["Effects", F.Effects.Laplace, "Laplace edges"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/laplace.js"
    };
    ImageActions.Emboss = {
        action: function (M, W, U, P, H, T, N) {
            M.prepareData(W, U, P, H);
            var Z = 180;
            var K = 1;
            var a = 0;
            if (N) {
                if (typeof N.strength != "undefined") {
                    K = parseFloat(N.strength);
                }
                if (typeof N.graylevel != "undefined") {
                    Z = parseInt(N.graylevel, 10);
                }
                if (typeof N.direction != "undefined") {
                    a = parseInt(N.direction, 10);
                }
            }
            Z = Math.max(0, Math.min(255, Z));
            var Q = H;
            var L = P;
            var X = 0;
            var Y = 0;
            switch (a) {
            case 0:
                X = -1;
                Y = -1;
                break;
            case 1:
                X = -1;
                Y = 0;
                break;
            case 2:
                X = -1;
                Y = 1;
                break;
            case 3:
                X = 0;
                Y = 1;
                break;
            case 4:
                X = 1;
                Y = 1;
                break;
            case 5:
                X = 1;
                Y = 0;
                break;
            case 6:
                X = 1;
                Y = -1;
                break;
            case 7:
                X = 0;
                Y = -1;
                break;
            }
            var I = Q;
            do {
                var F = X;
                if (I == 1 && F < 0) {
                    F = 0;
                }
                if (I == Q && F > 0) {
                    F = 0;
                }
                var J = L;
                do {
                    var G = Y;
                    if (J == 1 && G < 0) {
                        G = 0;
                    }
                    if (J == L && G > 0) {
                        G = 0;
                    }
                    var R = M.getPixel(J - 1, I - 1);
                    if (R[3] > 0) {
                        var O = M.getPixel(J - 1 + G, I - 1 + F);
                        iDeltaR = R[0] - O[0];
                        iDeltaG = R[1] - O[1];
                        iDeltaB = R[2] - O[2];
                        var S = iDeltaR;
                        if (Math.abs(iDeltaG) > Math.abs(S)) {
                            S = iDeltaG;
                        }
                        if (Math.abs(iDeltaB) > Math.abs(S)) {
                            S = iDeltaB;
                        }
                        var V = Z - S;
                        M.setPixel(J - 1, I - 1, V, V, V, R[3]);
                    }
                } while (--J);
            } while (--I);
            M.endData();
            if (T) {
                T(true);
            }
            return true;
        },
        dialogname: "Emboss",
        dialogpreview: true,
        dialog: function (H, N, L) {
            var K = H.getContainer();
            var I = K.addChildWidget(new E.Label(N.GrayLabel));
            I.setText("Gray level");
            var O = K.addChildWidget(new E.SliderHorizontal(N.GraySlider));
            O.setValue(180 / 255);
            O.update();
            var F = K.addChildWidget(new E.SelectBox(N.DirectionList));
            F.addItem("Top left", 0);
            F.addItem("Top", 1);
            F.addItem("Top right", 2);
            F.addItem("Right", 3);
            F.addItem("Bottom right", 4);
            F.addItem("Bottom", 5);
            F.addItem("Bottom left", 6);
            F.addItem("Left", 7);
            var G = K.addChildWidget(new E.Label(N.DirectionLabel));
            G.setText("Direction");
            var J = function () {
                return {
                    graylevel: O.getValue() * 255,
                    direction: F.getValue()
                };
            };
            var M = function () {
                L.update(ImageActions.Emboss, J());
            };
            O.listen("handledragend", M);
            F.listen("select", M);
            M();
            return J;
        },
        pixelaccess: true,
        menusetup: function (F) {
            return ["Effects", F.Effects.Emboss, "Emboss"];
        },
        undoable: true,
        warning: true,
        sourcefile: "actions/emboss.js"
    };
})();
ImageTools = {};
(function () {
    var E = ZING.GUI;
    var D = ZING.Core;
    var C = ZING.DOM;
    var B = ZING.Client.Quirks;
    var A = ZING.Net;
    ImageTools.SelectRect = {
        buttonsetup: function (F) {
            return [F.SelectRect, "Select rectangular region", "Crosshair"];
        },
        cancel: function (G, F) {
            F.getContext("2d").clearRect(0, 0, F.width, F.height);
        },
        start: function (H, K, I, M, L) {
            this._iStartX = M;
            this._iStartY = L;
            var G = this._oDash = new Image();
            var F = K.getContext("2d");
            this._strStroke = "black";
            var N = this;
            G.onload = function () {
                N._strStroke = F.createPattern(G, "repeat");
                F.strokeStyle = N._strStroke;
            };
            G.src = "gfx/check.gif";
            var J = H.getZoomScale();
            K.width = H.getActiveWidth() * J;
            K.height = H.getActiveHeight() * J;
        },
        end: function () {},
        move: function () {},
        drag: function (I, L, J, R, Q) {
            L.width = L.width;
            var K = I.getZoomScale();
            if (R == this._iStartX || Q == this._iStartY) {
                return;
            }
            var G = L.getContext("2d");
            G.strokeStyle = this._strStroke;
            G.lineSize = 1;
            if (I.isKeyShiftDown()) {
                var N = R - this._iStartX;
                var M = Q - this._iStartY;
                if (N > 0) {
                    if (M > 0) {
                        if (Math.abs(N) < Math.abs(M)) {
                            Q = this._iStartY + N;
                        } else {
                            R = this._iStartX + M;
                        }
                    } else {
                        if (Math.abs(N) < Math.abs(M)) {
                            Q = this._iStartY - N;
                        } else {
                            R = this._iStartX - M;
                        }
                    }
                } else {
                    if (M > 0) {
                        if (Math.abs(N) < Math.abs(M)) {
                            Q = this._iStartY - N;
                        } else {
                            R = this._iStartX - M;
                        }
                    } else {
                        if (Math.abs(N) < Math.abs(M)) {
                            Q = this._iStartY + N;
                        } else {
                            R = this._iStartX + M;
                        }
                    }
                }
            }
            var H = this._iStartX;
            var F = this._iStartY;
            var P = R - this._iStartX;
            var S = Q - this._iStartY;
            if (R < this._iStartX) {
                H = R;
                P = this._iStartX - R;
            }
            if (Q < this._iStartY) {
                F = Q;
                S = this._iStartY - Q;
            }
            try {
                G.strokeRect(Math.round(H * K) - 0.5, Math.round(F * K) - 0.5, Math.round(P * K), Math.round(S * K));
                I.setSelectionBox(H, F, P, S);
            } catch (O) {}
        },
        point: function (I, H, G, F, J) {
            if (F == this._iStartX && J == this._iStartY) {
                H.width = H.width;
                H.getContext("2d").fillRect(0, 0, 0, 0);
                I.setSelectionBox(0, 0, 0, 0);
            }
        },
        sourcefile: "tools/selectrect.js"
    };
    ImageTools.SelectWand = {
        buttonsetup: function (F) {
            return [F.SelectWand, "Select region with wand", "Crosshair"];
        },
        optionssetup: function (H, G) {
            H.addChildWidget(new E.Label(G.LabelTolerance)).setText("Tolerance:");
            var F = H.addChildWidget(new E.InputField(G.InputTolerance));
            F.setValue(0);
            var I = H.addChildWidget(new E.TextBox(G.TextWarning));
            I.setText("Please note that using the wand tool with high tolerance and/or selecting a large area can be very CPU intensive.");
            return {
                inputtolerance: F
            };
        },
        cancel: function (G, F) {
            F.getContext("2d").clearRect(0, 0, F.width, F.height);
            G.setSelectionMask(null);
        },
        start: function (I, H, G, F, J) {},
        end: function (I, H, G, F, J) {},
        move: function (I, H, G, F, J) {},
        drag: function (I, H, G, F, J) {},
        point: function (k, Q, T, e, b) {
            k._oImageTab.Container.setWaiting(true);
            var g = k.getImageCanvas();
            var W = g.width;
            var J = g.height;
            Q.clear();
            var I = Q.getContext("2d");
            g.prepareData(0, 0, W, J, true);
            var Z = g.getPixel(e, b);
            var X = [];
            for (var P = 0; P < W; P++) {
                X[P] = [];
            }
            var Y = [];
            Y.push([e, b]);
            var M = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1],
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1]
            ];
            var R = k._createCanvasElement(g.width, g.height);
            R.prepareData(0, 0, R.width, R.height, true);
            var H = ImageTools.SelectWand.options;
            var d = parseInt(H.inputtolerance.getValue(), 10);
            var N = [];
            var S = [];
            for (var P = 0; P < W; P++) {
                S[P] = [];
            }
            var L = false;
            for (var V = 0; V < Y.length; V++) {
                var P = Y[V][0];
                var O = Y[V][1];
                X[P][O] = true;
                R.setPixel(P, O, 0, 0, 0, 255);
                for (var h = 0; h < 8; h++) {
                    var f = P + M[h][0];
                    var c = O + M[h][1];
                    L = false;
                    if (!X[f][c]) {
                        if (f > 0 && f < W - 1 && c > 0 && c < J - 1) {
                            X[f][c] = true;
                            var K = g.getPixel(f, c);
                            var U = Z[0] - K[0];
                            var j = Z[1] - K[1];
                            var F = Z[2] - K[2];
                            if (U < 0) {
                                U = -U;
                            }
                            if (j < 0) {
                                j = -j;
                            }
                            if (F < 0) {
                                F = -F;
                            }
                            if (U <= d && j <= d && F <= d) {
                                Y.push([f, c]);
                            } else {
                                if (!S[f][c]) {
                                    S[f][c] = true;
                                    L = true;
                                }
                            }
                        } else {
                            L = true;
                        }
                        if (L) {
                            if (f < 0) {
                                f = 0;
                            }
                            if (f > W - 1) {
                                f = W - 1;
                            }
                            if (c < 0) {
                                c = 0;
                            }
                            if (c > J - 1) {
                                c = J - 1;
                            }
                            var G = "black";
                            if (((Math.floor(f / 4) % 2) && !(Math.floor(c / 4) % 2)) || (!(Math.floor(f / 4) % 2) && (Math.floor(c / 4) % 2))) {
                                G = "white";
                            }
                            I.fillStyle = G;
                            I.fillRect(f, c, 1, 1);
                        }
                    }
                }
            }
            R.endData();
            g.cancelData();
            k.setSelectionMask(R);
            k._oImageTab.Container.setWaiting(false);
        },
        pixelaccess: true,
        sourcefile: "tools/selectwand.js"
    };
    ImageTools.Pencil = {
        buttonsetup: function (F) {
            return [F.Pencil, "Freehand draw", "Crosshair"];
        },
        cancel: function (G, F) {
            F.clear();
        },
        start: function (I, H, G, F, J) {
            this._iStartX = F;
            this._iStartY = J;
            this._iLastX = F;
            this._iLastY = J;
        },
        end: function (I, H, G, F, J) {
            I.paintToolCanvas();
            H.clear();
        },
        move: function (I, H, G, F, J) {},
        drag: function (J, I, G, F, K) {
            if (F == this._iLastX || K == this._iLastY) {
                return;
            }
            var H = I.getContext("2d");
            H.beginPath();
            H.moveTo(this._iLastX, this._iLastY);
            H.lineTo(F, K);
            H.closePath();
            H.strokeStyle = J.getActiveColor().toRGBString();
            H.lineSize = 1;
            H.stroke();
            this._iLastX = F;
            this._iLastY = K;
        },
        point: function (J, I, G, F, K) {
            var H = I.getContext("2d");
            H.fillStyle = J.getActiveColor().toRGBString();
            H.fillRect(F, K, 1, 1);
            J.paintToolCanvas();
            I.clear();
        },
        sourcefile: "tools/pencil.js"
    };
    ImageTools.Line = {
        buttonsetup: function (F) {
            return [F.Line, "Draw line", "Crosshair"];
        },
        cancel: function (G, F) {
            F.clear();
        },
        start: function (I, H, G, F, J) {
            this._iStartX = F;
            this._iStartY = J;
        },
        end: function (I, H, G, F, J) {
            I.paintToolCanvas();
            H.clear();
        },
        move: function (I, H, G, F, J) {},
        drag: function (H, K, I, O, N) {
            K.width = K.width;
            if (O == this._iStartX || N == this._iStartY) {
                return;
            }
            if (H.isKeyShiftDown()) {
                var M = O - this._iStartX;
                var L = N - this._iStartY;
                var P = L / M;
                var J = Math.atan2(M, L) / Math.PI * 180;
                J += 45 / 2;
                while (J < 0) {
                    J += 360;
                }
                while (J > 360) {
                    J -= 360;
                }
                var G = Math.floor(J / 360 * 8);
                switch (G) {
                case 0:
                case 4:
                    O = this._iStartX;
                    break;
                case 2:
                case 6:
                    N = this._iStartY;
                    break;
                case 1:
                case 5:
                    if (Math.abs(M) > Math.abs(L)) {
                        N = this._iStartY + M;
                    } else {
                        O = this._iStartX + L;
                    }
                    break;
                case 3:
                case 7:
                    if (Math.abs(M) > Math.abs(L)) {
                        N = this._iStartY - M;
                    } else {
                        O = this._iStartX - L;
                    }
                    break;
                }
            }
            var F = K.getContext("2d");
            F.beginPath();
            F.moveTo(this._iStartX, this._iStartY);
            F.lineTo(O, N);
            F.closePath();
            F.strokeStyle = H.getActiveColor().toRGBString();
            F.lineSize = 1;
            F.stroke();
        },
        point: function (I, H, G, F, J) {},
        sourcefile: "tools/line.js"
    };
    ImageTools.Fill = {
        buttonsetup: function (F) {
            return [F.Fill, "Flood fill", "Crosshair"];
        },
        optionssetup: function (H, G) {
            H.addChildWidget(new E.Label(G.LabelTolerance)).setText("Tolerance:");
            var F = H.addChildWidget(new E.InputField(G.InputTolerance));
            F.setValue(0);
            var I = H.addChildWidget(new E.TextBox(G.TextWarning));
            I.setText("Please note that using the fill tool with high tolerance and/or filling a large area can be very CPU intensive.");
            return {
                inputtolerance: F
            };
        },
        cancel: function (G, F) {
            F.clear();
        },
        start: function (I, H, G, F, J) {},
        end: function (I, H, G, F, J) {
            I.paintToolCanvas();
            H.clear();
        },
        move: function (I, H, G, F, J) {},
        drag: function (I, H, G, F, J) {},
        point: function (l, M, P, d, Y) {
            var f = l.getImageCanvas();
            var T = f.width;
            var H = f.height;
            f.prepareData(0, 0, T, H, true);
            var R = l.getActiveColor();
            var O = R.getRed();
            var X = R.getGreen();
            var h = R.getBlue();
            var N = true;
            var W = f.getPixel(d, Y);
            var U = [];
            for (var L = 0; L < T; L++) {
                U[L] = [];
            }
            var V = [];
            V.push([d, Y]);
            var J = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1],
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1]
            ];
            var G = ImageTools.Fill.options;
            var c = parseInt(G.inputtolerance.getValue(), 10);
            for (var S = 0; S < V.length; S++) {
                var L = V[S][0];
                var K = V[S][1];
                U[L][K] = true;
                f.setPixel(L, K, O, X, h, 255);
                for (var j = 0; j < 8; j++) {
                    var e = L + J[j][0];
                    var Z = K + J[j][1];
                    if (!U[e][Z]) {
                        U[e][Z] = true;
                        if (e >= 0 && e < T && Z >= 0 && Z < H) {
                            var I = f.getPixel(e, Z);
                            var Q = W[0] - I[0];
                            var k = W[1] - I[1];
                            var F = W[2] - I[2];
                            if (Q < 0) {
                                Q = -Q;
                            }
                            if (k < 0) {
                                k = -k;
                            }
                            if (F < 0) {
                                F = -F;
                            }
                            if (Q <= c && k <= c && F <= c) {
                                V.push([e, Z]);
                            }
                        }
                    }
                }
            }
            f.endData();
        },
        pixelaccess: true,
        sourcefile: "tools/fill.js"
    };
    ImageTools.Eyedropper = {
        buttonsetup: function (F) {
            return [F.Eyedropper, "Eyedropper", "Eyedropper"];
        },
        optionssetup: function (G, F) {
            G.addChildWidget(new E.Label(F.LabelR)).setText("R:");
            G.addChildWidget(new E.Label(F.LabelG)).setText("G:");
            G.addChildWidget(new E.Label(F.LabelB)).setText("B:");
            G.addChildWidget(new E.Label(F.LabelHex)).setText("#");
            return {
                valuer: G.addChildWidget(new E.Label(F.LabelValueR)),
                valueg: G.addChildWidget(new E.Label(F.LabelValueG)),
                valueb: G.addChildWidget(new E.Label(F.LabelValueB)),
                valuehex: G.addChildWidget(new E.Label(F.LabelValueHex))
            };
        },
        cancel: function (G, F) {},
        start: function (I, H, G, F, J) {},
        end: function (I, H, G, F, J) {},
        move: function (L, K, G, F, M) {
            var J = L.getImageCanvas();
            J.prepareData(F, M, 1, 1, true);
            var H = J.getPixel(0, 0);
            J.cancelData();
            var I = ImageTools.Eyedropper.options;
            I.valuer.setText(H[0]);
            I.valueg.setText(H[1]);
            I.valueb.setText(H[2]);
            I.valuehex.setText(new D.Color(H[0], H[1], H[2]).toHex());
        },
        drag: function (I, H, G, F, J) {},
        point: function (K, J, G, F, L) {
            var I = K.getImageCanvas();
            I.prepareData(F, L, 1, 1, true);
            var H = I.getPixel(0, 0);
            K.setActiveColor(new ZING.Core.Color(H[0], H[1], H[2], 255));
            I.cancelData();
        },
        pixelaccess: true,
        sourcefile: "tools/eyedropper.js"
    };
})();