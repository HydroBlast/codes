! function() {
    "use strict";
    window.makeoverKit = function(o) {
        function e() {
            window.lipstickColor = "rgba(0,0,0,0)", window.lipstickAmount = .5, window.lipglossColor = "rgba(0,0,0,0)", window.lipglossAmount = .2, window.liplinerColor = "rgba(0,0,0,0)", window.liplinerAmount = .5, window.eyeshadowColor = "rgba(0,0,0,0)", window.eyeshadowAmount = .5, window.eyeshadowSize = 20, window.eyelinerColor = "rgba(0,0,0,0)", window.eyelinerAmount = .5, window.eyelinerSize = 10, window.eyebrowColor = "rgba(0,0,0,0)", window.eyebowAmount = .5, window.eyebrowSize = 2, window.facefoundationColor = "rgba(0,0,0,0)", window.facefoundationAmount = .5, window.faceconcealerColor = "rgba(0,0,0,0)", window.faceconcealerAmount = .5, window.faceblushColor = "rgba(0,0,0,0)", window.faceblushAmount = .5
        }

        function n() {
            W.canUndo() ? $("#" + z.undoBtn).removeClass("disable") : $("#" + z.undoBtn).addClass("disable"), W.canRedo() ? $("#" + z.redoBtn).removeClass("disable") : $("#" + z.redoBtn).addClass("disable")
        }

        function i(o) {
            function e(o) {
                var e = o.screenX,
                    n = o.screenY;
                s.getZoom() > 1 && s.relativePan({
                    x: e - i,
                    y: n - a
                }), i = e, a = n
            }

            function n(o) {
                $(window).off("mousemove", e), $(window).off("mouseup", n)
            }
            2 != o.button;
            var i = o.screenX,
                a = o.screenY;
            $(window).mousemove(e), $(window).mouseup(n), $(window).contextmenu(t)
        }

        function t() {
            return $(window).off("contextmenu", t), !1
        }

        function a(o, e, n, i) {
            null != i ? q[o] = {
                color: e,
                amount: n,
                size: i
            } : q[o] = {
                color: e,
                amount: n
            }
        }

        function r(o) {
            var e = [];
            return null != q[o].size ? (e.push(q[o].color), e.push(q[o].amount), e.push(q[o].size), e) : (e.push(q[o].color), e.push(q[o].amount), e)
        }

        function l(o, e) {
            c.eventTrigger("onMakeupApply", {
                detail: {
                    which: o,
                    color: e
                }
            })
        }
        var c = this;
        c.config = {
            canvas: "default",
            canvasW: 480,
            canvasH: 480,
            waterMark: !0,
            waterMarkText1: "darkvalley",
            waterMarkText2: " Developed By Dark Valley",
            manualPoints: !1,
            facePoint: [],
            nosePoint: [],
            lipPoint: [],
            lipOpenPoint: [],
            leftEyePoint: [],
            rightEyePoint: [],
            leftEyeBrowPoint: [],
            rightEyeBrowPoint: [],
            photoInput: "files",
            webCam: "web-cam-btn",
            faceBook: "fb-btn",
            undoBtn: "undo-btn",
            redoBtn: "redo-btn",
            previewBtn: "preview-btn",
            downloadBtn: "down-btn",
            shareBtn: "",
            clearAll: "clear-all-btn",
            "new": "new-btn",
            mainTab: "main-tabs",
            lipTab: "lip-tabs",
            eyeTab: "eye-tabs",
            headTab: "head-tabs",
            zoomSlider: "zoom-slider",
            lipstickAmtSlider: "lipstick-amt",
            lipsglossAmtSlider: "lipgloss-amt",
            liplinerAmtSlider: "lipliner-amt",
            eyeshadowAmtSlider: "eyeshadow-amt",
            eyeshadowSizeSlider: "eyeshadow-size",
            eyelinerAmtSlider: "eyeliner-amt",
            eyelinerSizeSlider: "eyeliner-size",
            eyebrowAmtSlider: "eyebrow-amt",
            eyebrowSizeSlider: "eyebrow-size",
            foundationAmtSlider: "foundation-amt",
            concealerAmtSlider: "concealer-amt",
            blushAmtSlider: "blush-amt",
            lipstickChart: "lipstick-color-chart",
            lipglossChart: "lipgloss-color-chart",
            liplinerChart: "lipliner-color-chart",
            eyeshadowChart: "eyeshadow-color-chart",
            eyelinerChart: "eyeliner-color-chart",
            eyebrowChart: "eyebrow-color-chart",
            foundationChart: "foundation-color-chart",
            concealerChart: "concealer-color-chart",
            blushChart: "blush-color-chart",
            lipstickColors: ["#C0283F", "#C22029", "#C1212A", "#ffb3db", "#ff99cf", "#ff80c3", "#ff66b8", "#ff4dac", "#ff33a0", "#ff1a94", "#ff1493", "#ff0088", "#e6007a", "#cc006d", "#ffdacc", "#ffc7b3", "#ffb499", "#ffa280", "#ff8f66", "#ff7c4d", "#ff6933", "#ff571a", "#ff4500", "#e63d00", "#cc3600"],
            lipglowColors: ["#EEB9BE", "#EEB4CE", "#FE799F"],
            liplinerColors: ["#E01B70", "#C65A6A", "#DB7781"],
            eyeshadowColors: ["#DB7781", "#807E88", "#B0ACA2"],
            eyelinerColors: ["#B0ACA2", "#78223B", "#4D4C00"],
            eyebrowColors: ["#723820", "#723820", "#28363F"],
            foundationColors: ["#FAEFDF", "#F1C6B6", "#ECC7B8"],
            concealerColors: ["#F0C4A9", "#EACDAD", "#EAC7B4"],
            blushColors: ["#FEBBCC", "#E3919B", "#D1638C"]
        }, c.version = "1.0.0";
        var d = new faceTracker.tracker({
            stopOnConvergence: !0
        });
        d.init(Model);
        var s, f, g, w, u, y, h, m, v, p, b, C, x, E, P, k, A, S, B, L = "lip",
            M = !1;
        e();
        for (var T in o) c.config[T] = o[T];
        var z = c.config,
            I = document.createElement("canvas");
        I.id = "pcLay", I.className = "pcLay", I.width = c.config.canvasW, I.height = c.config.canvasH, I.style.cssText = "display: none;", document.body.appendChild(I);
        var _ = '<div id="loading-modal" class="modal">        <div class="modal-content loading-content">          <img src="img/loading.gif" style="width:100%;"/>     </div> </div> <div id="face-correct" class="modal">               <div class="modal-content">                     <span class="close">×</span>                      <div style="width: 450px;display: inline-block;position: relative;bottom: 25px;"><span style="font-size: 28px;color: #4787ed;">if worng correct selection Like this</span><img src="img/ref/1.jpg"/></div>            <div style="display: inline-block;">               <canvas id="pc" width="' + c.config.canvasW + '" height="' + c.config.canvasH + '" ></canvas>           </div>           <div style="text-align:center;">                <button class="nxt-btn-1">Next</button>           </div>     </div>           </div> <div id="point-correct" class="modal">                <div class="modal-content">                               <div style="width: 450px;display: inline-block;position: relative;bottom: 25px;"><span style="font-size: 28px;color: #4787ed;">if worng correct point Like this</span><img id="ref-img" src="img/ref/1.jpg"/></div>          <div style="display:inline-block;position: relative;">           <canvas id="Lay-ref" width="' + c.config.canvasW + '" height="' + c.config.canvasH + '" ></canvas>           <canvas id="Lay" width="' + c.config.canvasW + '" height="' + c.config.canvasH + '"  style="position: absolute; top: 0px; right:0;"></canvas>         </div> <div style="text-align:center;">          <button class="nxt-btn-2">Next</button></div>     </div>            </div>  <div id="point-ref-prev" style="display:none;">      <canvas id="prv" width="250" height="250"></canvas>      <canvas id="prv-2" width="250" height="250" style="position: absolute;left: 0;top:0"></canvas>  </div>  <div id="dialog-confirm"></div> <canvas id="for-orginal" width="' + c.config.canvasW + '" height="' + c.config.canvasH + '" style="display:none;"></canvas><div id="previewModal" class="modal">    <div class="modal-content prv">         <span class="close">×</span>         <div class="twentytwenty-container">            <img id="prvImg" />            <img id="prvImg1"/>        </div>        </div></div><div id="web-cam-modal" class="modal">        <div class="modal-content">      <div style="text-align: center;">        <div id="web_camera" style="width:' + c.config.canvasW + "px; height:" + c.config.canvasH + 'px;display:inline-block;vertical-align: top;"></div>        <div id="web_result" style="display:inline-block;vertical-align: middle;"></div>        <div style="text-align: center;">           <button id="web-take">Take Photo</button>           <button id="web-nxt">Next</button>        </div>       </div>     </div> </div>';
        document.body.innerHTML += _;
        var W = new UndoManager;
        n(), W.onundo = function(o) {}, W.onredo = function(o) {}, W.onchange = function(o) {
            n()
        }, c.init = function() {
            c.eventTrigger("onKitInit"), s = new fabric.Canvas(c.config.canvas, {
                selection: !1,
                containerClass: "edit-canvas",
                backgroundColor: "rgb(255,255,255)"
            }), v = new fabric.Canvas("for-orginal", {
                selection: !1,
                containerClass: "orgimg-canvas",
                backgroundColor: "rgb(255,255,255)"
            }), c.upload(c.config.photoInput), $(function() {
                var o = !1,
                    e = !1;
                $("#" + z.mainTab).tabs({
                    activate: function(n, i) {
                        L = i.newTab[0].id, "eye" != L || o ? "face" != L || e || ($("#point").trigger("click"), e = !0) : ($("#point").trigger("click"), o = !0)
                    }
                }), $("#" + z.lipTab).tabs(), $("#" + z.eyeTab).tabs(), $("#" + z.headTab).tabs(), $("#" + z.zoomSlider).slider({
                    min: 10,
                    max: 50,
                    start: function(o, e) {
                        h = e.value
                    },
                    change: function(o, e) {
                        h <= e.value ? (m = e.value / 10, s.zoomToPoint(new fabric.Point(s.width / 2, s.height / 2), m)) : (m = e.value / 10, s.zoomToPoint(new fabric.Point(s.width / 2, s.height / 2), m), e.value / 10 < 1.2 && s.absolutePan(new fabric.Point(0, 0)))
                    },
                    slide: function(o, e) {
                        h <= e.value ? (m = e.value / 10, s.zoomToPoint(new fabric.Point(s.width / 2, s.height / 2), m)) : (m = e.value / 10, s.zoomToPoint(new fabric.Point(s.width / 2, s.height / 2), m), e.value / 10 < 1.2 && s.absolutePan(new fabric.Point(0, 0)))
                    }
                }), $("#" + z.lipstickAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 3,
                    stop: function(o, e) {
                        window.lipstickAmount = e.value / 10, c.lipstick(window.lipstickColor, window.lipstickAmount)
                    }
                }), $("#" + z.lipsglossAmtSlider).slider({
                    min: 0,
                    max: 5,
                    value: 2,
                    stop: function(o, e) {
                        window.lipglossAmount = e.value / 10, c.lipgloss(window.lipglossColor, window.lipglossAmount)
                    }
                }), $("#" + z.liplinerAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 3,
                    stop: function(o, e) {
                        window.liplinerAmount = e.value / 10, c.lipliner(window.liplinerColor, window.liplinerAmount)
                    }
                }), $("#" + z.eyeshadowAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 3,
                    stop: function(o, e) {
                        window.eyeshadowAmount = e.value / 10, c.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize)
                    }
                }), $("#" + z.eyeshadowSizeSlider).slider({
                    min: 0,
                    max: 50,
                    value: 20,
                    stop: function(o, e) {
                        window.eyeshadowSize = e.value, c.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize)
                    }
                }), $("#" + z.eyelinerAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 5,
                    stop: function(o, e) {
                        window.eyelinerAmount = e.value / 10, c.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize)
                    }
                }), $("#" + z.eyelinerSizeSlider).slider({
                    min: 0,
                    max: 25,
                    value: 10,
                    stop: function(o, e) {
                        window.eyelinerSize = e.value, c.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize)
                    }
                }), $("#" + z.eyebrowAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 5,
                    stop: function(o, e) {
                        window.eyebrowAmount = e.value / 10, c.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize)
                    }
                }), $("#" + z.eyebrowSizeSlider).slider({
                    min: 0,
                    max: 5,
                    value: 3,
                    stop: function(o, e) {
                        window.eyebrowSize = e.value, c.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize)
                    }
                }), $("#" + z.foundationAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 5,
                    stop: function(o, e) {
                        window.facefoundationAmount = e.value / 10, c.foundation(window.facefoundationColor, window.facefoundationAmount)
                    }
                }), $("#" + z.concealerAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 5,
                    stop: function(o, e) {
                        window.faceconcealerAmount = e.value / 10, c.concealer(window.faceconcealerColor, window.faceconcealerAmount)
                    }
                }), $("#" + z.blushAmtSlider).slider({
                    min: 0,
                    max: 10,
                    value: 5,
                    stop: function(o, e) {
                        window.faceblushAmount = e.value / 10, c.blush(window.faceblushColor, window.faceblushAmount)
                    }
                }), $(".close").click(function() {
                    y.setOptions({
                        hide: !0
                    }), y.update(), $(".modal").hide()
                }), $(".nxt-btn-1").click(function() {
                    y.setOptions({
                        hide: !0
                    }), y.update(), $("#face-correct").hide(), c.findLandmark(document.getElementById("pc"), f)
                });
                var n = 0,
                    i = 0;
                $(".nxt-btn-2").click(function() {
                    function o() {
                        function o(o) {
                            return "rgba(0,0,0,0)" === o ? !1 : !0
                        }
                        $("#point-correct").hide(), o(window.lipstickColor) ? c.lipstick(window.lipstickColor, window.lipstickAmount) : null, o(window.liplinerColor) ? c.lipliner(window.liplinerColor, window.liplinerAmount) : null, o(window.lipglossColor) ? c.lipgloss(window.lipglossColor, window.lipglossAmount) : null, o(window.eyeshadowColor) ? c.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize) : null, o(window.eyelinerColor) ? c.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize) : null, o(window.eyebrowColor) ? c.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize) : null, o(window.facefoundationColor) ? c.foundation(window.facefoundationColor, window.facefoundationAmount) : null, o(window.faceconcealerColor) ? c.concealer(window.faceconcealerColor, window.faceconcealerAmount) : null, o(window.faceblushColor) ? c.blush(window.faceblushColor, window.faceblushAmount) : null, n = 0
                    }
                    "lip" == L && 0 == n ? ($("#ref-img").attr("src", "img/ref/lip.jpg"), c.drawPoints(c.config.lipPoint, !0), n++) : "lip" != L || 1 != n || M || 0 != i ? "eye" == L && 0 == n ? ($("#ref-img").attr("src", "img/ref/left-eye.jpg"), c.drawPoints(c.config.leftEyePoint, !0), n++) : "eye" == L && 1 == n ? ($("#ref-img").attr("src", "img/ref/right-eye.jpg"), c.drawPoints(c.config.rightEyePoint, !0), n++) : "eye" == L && 2 == n ? ($("#ref-img").attr("src", "img/ref/left-brow.jpg"), c.drawPoints(c.config.leftEyeBrowPoint, !1), n++) : "eye" == L && 3 == n ? ($("#ref-img").attr("src", "img/ref/right-brow.jpg"), c.drawPoints(c.config.rightEyeBrowPoint, !1), n++) : "face" == L && 0 == n ? ($("#ref-img").attr("src", "img/ref/face.jpg"), c.drawPoints(c.config.facePoint, !0), n++) : o() : (M ? c.drawPoints(c.config.lipOpenPoint, !0) : ($("#dialog-confirm").html("Is your Image have a open mouth..?"), $("#dialog-confirm").dialog({
                        resizable: !1,
                        modal: !0,
                        height: 200,
                        width: 250,
                        buttons: {
                            Yes: function() {
                                M = !0, $(this).dialog("close"), $("#ref-img").attr("src", "img/ref/smile.jpg"), c.drawPoints(c.config.lipOpenPoint, !0)
                            },
                            No: function() {
                                M = !1, i++, $(this).dialog("close"), o()
                            }
                        }
                    })), n++)
                }), $("#point").click(function() {
                    $(".nxt-btn-2").trigger("click"), $("#point-correct").show()
                }), b = $("#" + c.config.lipstickChart), C = $("#" + c.config.lipglossChart), x = $("#" + c.config.liplinerChart), E = $("#" + c.config.eyeshadowChart), P = $("#" + c.config.eyelinerChart), k = $("#" + c.config.eyebrowChart), A = $("#" + c.config.foundationChart), S = $("#" + c.config.concealerChart), B = $("#" + c.config.blushChart), c.colorChart("lipstick", c.config.lipstickColors), c.colorChart("lipliner", c.config.liplinerColors), c.colorChart("lipgloss", c.config.lipglowColors), c.colorChart("eyeshadow", c.config.eyeshadowColors), c.colorChart("eyeliner", c.config.eyelinerColors), c.colorChart("eyebrow", c.config.eyebrowColors), c.colorChart("foundation", c.config.foundationColors), c.colorChart("concealer", c.config.concealerColors), c.colorChart("blush", c.config.blushColors), $("#" + z.undoBtn).click(function() {
                    W.undo()
                }), $("#" + z.redoBtn).click(function() {
                    W.redo()
                }), $("#" + z.previewBtn).click(function() {
                    c.showPreview()
                }), $("#" + z.webCam).click(function() {
                    $("#web-cam-modal").show(), c.webCam()
                }), $(".mod-img").click(function() {
                    var o = $(this).attr("src");
                    $("#loading-modal").show(), c.modelImg(o)
                }), $("#" + z.clearAll).click(function() {
                    var o = confirm("Are you sure want to clear all!");
                    1 == o && c.clearAll()
                }), $("#" + z["new"]).click(function() {
                    var o = confirm("Are you sure!");
                    1 == o && c["new"]()
                }), $("#" + z.downloadBtn).click(function() {
                    c.download(this, s, "darkvalley")
                })
            })
        }, c.download = function(o, e, n) {
            o.href = e.toDataURL({
                format: "png",
                multiplier: 2
            }), o.download = n
        }, c["new"] = function() {
            window.location.reload()
        }, c.clearAll = function() {
            s.clear(), c.drawMain(p, !0)
        }, c.modelImg = function(o) {
            var e = new Image;
            e.onload = function() {
                var o = document.createElement("canvas");
                o.width = this.width, o.height = this.height;
                var e = o.getContext("2d");
                e.drawImage(this, 0, 0);
                var n = o.toDataURL("image/png");
                c.drawMain(n)
            }, e.src = o
        }, c.webCam = function() {
            function o() {
                Webcam.snap(function(o) {
                    e = o, document.getElementById("web_result").innerHTML = '<img src="' + o + '"/>'
                }), $("#web-nxt").click(function() {
                    c.drawMain(e), $("#web-cam-modal").hide(), $("#loading-modal").show()
                })
            }
            Webcam.attach("#web_camera");
            var e = "";
            $("#web-take").click(function() {
                o()
            })
        };
        var O, F, H, R, j, D, U, N, K;
        c.colorChart = function(o, e) {
            function n(o) {
                o && o.destroy()
            }

            function i(o, e) {
                c.eventTrigger("onChartClick", {
                    detail: {
                        chart: o,
                        color: e
                    }
                })
            }
            for (var t = [], a = 0; a <= e.length - 1; a++) t.push(10);
            "lipstick" == o ? (n(O), O = new Chart(b, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = O.getElementsAtEvent(e);
                        n[0] && (window.lipstickColor = n[0]._model.backgroundColor, c.lipstick(window.lipstickColor, window.lipstickAmount), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "lipgloss" == o ? (n(F), F = new Chart(C, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = F.getElementsAtEvent(e);
                        n[0] && (window.lipglossColor = n[0]._model.backgroundColor, c.lipgloss(window.lipglossColor, window.lipglossAmount), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "lipliner" == o ? (n(H), H = new Chart(x, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = H.getElementsAtEvent(e);
                        n[0] && (window.liplinerColor = n[0]._model.backgroundColor, c.lipliner(window.liplinerColor, window.liplinerAmount), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "eyeshadow" == o ? (n(R), R = new Chart(E, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = R.getElementsAtEvent(e);
                        n[0] && (window.eyeshadowColor = n[0]._model.backgroundColor, c.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "eyeliner" == o ? (n(j), j = new Chart(P, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = j.getElementsAtEvent(e);
                        n[0] && (window.eyelinerColor = n[0]._model.backgroundColor, c.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "eyebrow" == o ? (n(D), D = new Chart(k, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = D.getElementsAtEvent(e);
                        n[0] && (window.eyebrowColor = n[0]._model.backgroundColor, c.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "foundation" == o ? (n(U), U = new Chart(A, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = U.getElementsAtEvent(e);
                        n[0] && (window.facefoundationColor = n[0]._model.backgroundColor, c.foundation(window.facefoundationColor, window.facefoundationAmount), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "concealer" == o ? (n(N), N = new Chart(S, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = N.getElementsAtEvent(e);
                        n[0] && (window.faceconcealerColor = n[0]._model.backgroundColor, c.concealer(window.faceconcealerColor, window.faceconcealerAmount), i(o, n[0]._model.backgroundColor))
                    }
                }
            })) : "blush" == o && (n(K), K = new Chart(B, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: t,
                        backgroundColor: e,
                        hoverBackgroundColor: e
                    }]
                },
                options: {
                    tooltips: {
                        enabled: !1
                    },
                    onClick: function(e) {
                        var n = K.getElementsAtEvent(e);
                        n[0] && (window.faceblushColor = n[0]._model.backgroundColor, c.blush(window.faceblushColor, window.faceblushAmount), i(o, n[0]._model.backgroundColor))
                    }
                }
            })), c.eventTrigger("onChartChange", {
                detail: {
                    chart: o,
                    color: e
                }
            })
        }, c.clearCanvas = function(o) {
            function e(o) {
                var e = document.getElementById(o),
                    n = e.getContext("2d");
                n.clearRect(0, 0, e.width, e.height)
            }
            s.clear(), o.forEach(function(o) {
                e(o)
            })
        }, c.upload = function(o) {
            function e(o) {
                $("#loading-modal").show(), c.clearCanvas(["pc", "pcLay"]);
                var e = o.target.files;
                n = [];
                for (var t = 0; t < e.length; t++) e[t].type.match("image.*") && n.push(e[t]);
                e.length > 0 && (i = 0), c.getImagedata(n[0])
            }
            var n, i;
            window.File && window.FileReader && window.FileList && document.getElementById(o).addEventListener("change", e, !1)
        }, c.getImagedata = function(o) {
            var e = new FileReader;
            e.onload = function(o) {
                return function(o) {
                    var e = o.target.result;
                    c.drawMain(e)
                }
            }(o), e.readAsDataURL(o)
        }, c.drawFace = function(o, e) {
            var n = document.getElementById(o);
            n.width = c.config.canvasW, n.height = c.config.canvasH;
            var i = n.getContext("2d");
            i.drawImage(document.getElementById(e), 0, 0), "pc" == o && c.findFace(document.getElementById(o))
        }, c.findFace = function(o) {
            y = $("#pc").imgAreaSelect({
                handles: !0,
                onSelectEnd: function(o, e) {
                    f = [e.x1, e.y1, e.width, e.height]
                },
                autoHide: !1,
                instance: !0
            }), $("#face-correct").show();
            var e = document.createElement("canvas");
            e.width = o.width, e.height = o.height;
            var n = e.getContext("2d");
            n.drawImage(o, 0, 0, o.width, o.height);
            var i = new jsfeat_face(e),
                t = i.findFace();
            return t.length > 0 ? (f = [t[0].x, t[0].y, t[0].width, t[0].height], y.setSelection(t[0].x, t[0].y, t[0].x + t[0].width, t[0].y + t[0].height, !1), y.setOptions({
                show: !0
            }), y.update(), void 0) : !1
        }, c.drawMain = function(o, e) {
            p = o, fabric.Image.fromURL(o, function(o) {
                var n = Math.min(s.width / o.width, s.height / o.height);
                if (w = Math.max((s.width - o.width * n) / 2, 0), u = Math.max((s.height - o.height * n) / 2, 0), o.scale(n), o.left = w, o.top = u, o.evented = !1, o.selectable = !1, o.hasControls = !1, o.hasBorders = !1, o.name = "orginal-img", z.waterMark) {
                    var i = new fabric.Text(z.waterMarkText1, {
                        fill: "#50E6B6",
                        fontSize: 12
                    });
                    s.add(i);
                    var t = new fabric.Text(z.waterMarkText2, {
                            left: i.getBoundingRectWidth(),
                            fill: "#CACACA",
                            fontSize: 12
                        }),
                        a = new fabric.Group([i, t], {
                            left: w + 5,
                            top: u + 5,
                            selectable: !1,
                            hasControls: !1,
                            hasBorders: !1
                        })
                }
                s.add(o), v.add(o), s.add(a), o.sendToBack(), s.centerObject(o), s.backgroundColor = "rgb(255,255,255)", s.renderAll(), v.centerObject(o), v.backgroundColor = "rgb(255,255,255)", v.renderAll(), e || c.drawFace("pc", c.config.canvas)
            })
        }, c.fetchDataPoints = function(o) {
            return new Promise(function(e, n) {
                o.length > 0 ? (c.config.facePoint.push({
                    x: o[0][0],
                    y: o[0][1]
                }, {
                    x: o[3][0],
                    y: o[3][1]
                }, {
                    x: o[7][0],
                    y: o[7][1]
                }, {
                    x: o[11][0],
                    y: o[11][1]
                }, {
                    x: o[14][0],
                    y: o[14][1]
                }, {
                    x: o[14][0] - 20,
                    y: o[14][1] - 40
                }, {
                    x: o[33][0],
                    y: o[33][1] - 70
                }, {
                    x: o[0][0] + 20,
                    y: o[0][1] - 40
                }), c.config.lipPoint.push({
                    x: o[44][0],
                    y: o[44][1]
                }, {
                    x: o[46][0],
                    y: o[46][1]
                }, {
                    x: o[47][0],
                    y: o[47][1]
                }, {
                    x: o[48][0],
                    y: o[48][1]
                }, {
                    x: o[50][0],
                    y: o[50][1]
                }, {
                    x: o[52][0],
                    y: o[52][1]
                }, {
                    x: o[54][0],
                    y: o[54][1]
                }), c.config.lipOpenPoint.push({
                    x: o[44][0] + 5,
                    y: o[44][1]
                }, {
                    x: o[60][0],
                    y: o[60][1]
                }, {
                    x: o[50][0] - 5,
                    y: o[50][1]
                }, {
                    x: o[57][0],
                    y: o[57][1]
                }), c.config.leftEyePoint.push({
                    x: o[23][0],
                    y: o[23][1]
                }, {
                    x: o[24][0],
                    y: o[24][1]
                }, {
                    x: o[25][0],
                    y: o[25][1]
                }, {
                    x: o[26][0],
                    y: o[26][1]
                }), c.config.rightEyePoint.push({
                    x: o[30][0],
                    y: o[30][1]
                }, {
                    x: o[29][0],
                    y: o[29][1]
                }, {
                    x: o[28][0],
                    y: o[28][1]
                }, {
                    x: o[31][0],
                    y: o[31][1]
                }), c.config.leftEyeBrowPoint.push({
                    x: o[19][0],
                    y: o[19][1]
                }, {
                    x: o[20][0],
                    y: o[20][1]
                }, {
                    x: o[21][0],
                    y: o[21][1]
                }, {
                    x: o[22][0],
                    y: o[22][1]
                }), c.config.rightEyeBrowPoint.push({
                    x: o[18][0],
                    y: o[18][1]
                }, {
                    x: o[17][0],
                    y: o[17][1]
                }, {
                    x: o[16][0],
                    y: o[16][1]
                }, {
                    x: o[15][0],
                    y: o[15][1]
                }), c.config.nosePoint.push({
                    x: o[35][0],
                    y: o[35][1]
                }, {
                    x: o[39][0],
                    y: o[39][1]
                }), e("success")) : n(Error("error"))
            })
        }, c.drawPoints = function(o, e) {
            function n(e) {
                p.setTransform(1, 0, 0, 1, 0, 0), p.transform(1, 0, 0, 1, -o[e].x, -o[e].y), p.scale(2, 2), b.setTransform(1, 0, 0, 1, 0, 0), b.transform(1, 0, 0, 1, -o[e].x, -o[e].y), b.scale(2, 2), w.drawImage(document.getElementById("pc"), 0, 0), p.drawImage(document.getElementById("pc"), 0, 0)
            }

            function i() {
                u.lineJoin = "miter", b.lineJoin = "miter", a(u, 0), a(b, 0)
            }

            function t(o) {
                var e = d.getBoundingClientRect();
                return {
                    x: o.clientX - e.left,
                    y: o.clientY - e.top
                }
            }

            function a(n, i) {
                n.clearRect(0, 0, C, x), n.beginPath(), n.moveTo(r[0], r[1]), n.curve(r, .5, 10, e ? !0 : !1), n.strokeStyle = "#6677cc", n.lineWidth = 1, n.fillStyle = "rgba(255,86,86,0.3)", e && n.fill(), n.stroke();
                var t = r.length - 2;
                n.lineWidth = 1, n.strokeStyle = "rgba(0,0,0,1)", n.beginPath();
                for (var a = 0, l = 0; t >= l; l += 2) 0 == l ? n.rect(r[l] - 2, r[1] - 2, 4, 4) : n.rect(r[l] - 2, r[l + 1] - 2, 4, 4), o[a] = {
                    x: r[l],
                    y: r[l + 1]
                }, a++;
                n.stroke(), n.fillStyle = "rgba(255,255,255,0.5)", n.fill(), y.clearRect(0, 0, 250, 250), h.clearRect(0, 0, 250, 250), y.drawImage(v, o[i / 2].x - 100, o[i / 2].y - 100, 250, 250, 0, 0, 250, 250), h.drawImage(m, o[i / 2].x - 100, o[i / 2].y - 100, 250, 250, 0, 0, 250, 250)
            }
            for (var r = [], l = 0; l <= o.length - 1; l++) r.push(o[l].x, o[l].y);
            var d = document.getElementById("Lay"),
                s = document.getElementById("Lay-ref"),
                f = document.getElementById("prv"),
                g = document.getElementById("prv-2"),
                w = s.getContext("2d"),
                u = d.getContext("2d"),
                y = f.getContext("2d"),
                h = g.getContext("2d"),
                m = document.createElement("canvas");
            m.width = c.config.canvasW, m.height = c.config.canvasH;
            var v = document.createElement("canvas");
            v.width = c.config.canvasW, v.height = c.config.canvasH;
            var p = v.getContext("2d"),
                b = m.getContext("2d");
            n(0);
            var C = d.width,
                x = d.height,
                E = !1,
                P = -1;
            i(), d.onmousedown = function(o) {
                var e = t(o),
                    i = 0,
                    a = 5;
                for (P = -1, E = !1; i < r.length; i += 2) e.x >= r[i] - a && e.x < r[i] + a && e.y >= r[i + 1] - a && e.y < r[i + 1] + a && (E = !0, P = i); - 1 != P && n(P / 2)
            }, d.onmousemove = function(o) {
                if (E) {
                    var e = t(o);
                    $("#point-ref-prev").show(), $("#point-ref-prev").attr("style", "width:200px;position:absolute;z-index:99999;left:" + parseInt(e.x - 20) + "px;top:" + e.y + "px;"), r[P] = e.x, r[P + 1] = e.y, a(u, P), a(b, P)
                }
            }, d.onmouseup = function() {
                E = !1, $("#point-ref-prev").hide()
            }
        };
        var Y = 1;
        c.findLandmark = function(o, e) {
            function n() {
                g = requestAnimFrame(n), r.clearRect(0, 0, 720, 576);
                try {
                    d.getCurrentPosition() && d.draw(a)
                } catch (o) {
                    alert("I can't find face on your image..! Try selecting the face in the image manually.")
                }
            }

            function t() {
                c.config.facePoint = [], c.config.lipPoint = [], c.config.lipOpenPoint = [], c.config.leftEyePoint = [], c.config.rightEyePoint = [], c.config.leftEyeBrowPoint = [], c.config.rightEyeBrowPoint = []
            }
            $("#loading-modal").show();
            var a = document.getElementById("pcLay"),
                r = a.getContext("2d");
            c.config.manualPoints || (d.reset(), d.start(o, e), n(), document.addEventListener("facetrackrNotFound", function(o) {
                d.stop(), alert("I can't find face on your image..! Try selecting the face in the image manually."), $("#loading-modal").hide(), $("#face-correct").show()
            }, !1), document.addEventListener("facetrackrLost", function(o) {
                d.stop(), alert("I can't find face on your image..! Try selecting the face in the image manually."), $("#loading-modal").hide(), $("#face-correct").show()
            }, !1), document.addEventListener("facetrackrConverged", function(o) {
                if (1 == Y) {
                    console.log("points gets"), cancelRequestAnimFrame(g);
                    var e = d.getCurrentPosition();
                    t(), c.fetchDataPoints(e).then(function() {
                        $(".nxt-btn-2").trigger("click"), $(".modal").hide(), $("#point-correct").show(), $("#loading-modal").hide(), $("#center-div").hide(), $("#right-div").show(), $("#left-div").show();
                        var o = document.getElementById("edit-Wrapper");
                        $(o).mousedown(i)
                    }), Y++
                }
            }, !1))
        }, c.drawLayer = function(o, e, n) {
            for (var i = [], t = 0; t <= e.length - 1; t++) i.push(e[t].x, e[t].y);
            o.beginPath(), o.moveTo(e[0].x, e[0].y), o.curve(i, .5, 30, n ? !0 : !1)
        }, c.drawBlur = function(o, e, n, i) {
            var t = new createjs.Stage(o),
                a = new createjs.Bitmap(o),
                r = new createjs.BlurFilter(e, n, i);
            a.filters = [r], a.cache(0, 0, 450, 450), t.addChild(a), t.update()
        }, c.drawLayerToMain = function(o, e, n, i, t) {
            var a = new fabric.Image(o);
            a.opacity = n, a.selectable = !1, a.globalCompositeOperation = t, a.name = i, e.add(a), e.renderAll()
        }, c.removeLayerFromMain = function(o, e) {
            if (o) {
                try {
                    $.each(o.getObjects(), function(n, i) {
                        null !== i && $.each(i, function(i, t) {
                            return t === e ? (o.remove(o._objects[n]), !1) : void 0
                        })
                    })
                } catch (n) {}
                o.renderAll()
            }
        }, c.undoManager = function(o, e, i, t) {
            W.beginGrouping(UndoManager.COALESCE_MODE.CONSECUTIVE_DUPLICATES), W.registerUndoAction(o, e, i, {
                type: t
            }), n(), W.endGrouping()
        };
        var q = {
            lipstick: {
                color: "rgba(0,0,0,0)",
                amount: 0
            },
            lipliner: {
                color: "rgba(0,0,0,0)",
                amount: 0
            },
            lipgloss: {
                color: "rgba(0,0,0,0)",
                amount: 0
            },
            eyeshadow: {
                color: "rgba(0,0,0,0)",
                amount: 0,
                size: 0
            },
            eyeliner: {
                color: "rgba(0,0,0,0)",
                amount: 0,
                size: 0
            },
            eyebrow: {
                color: "rgba(0,0,0,0)",
                amount: 0,
                size: 0
            },
            foundation: {
                color: "rgba(0,0,0,0)",
                amount: 0
            },
            concealer: {
                color: "rgba(0,0,0,0)",
                amount: 0
            },
            blush: {
                color: "rgba(0,0,0,0)",
                amount: 0
            }
        };
        c.lipstick = function(o, e) {
            $("#" + z.lipstickAmtSlider).slider({
                value: 10 * e
            }), c.undoManager(this, c.lipstick, r("lipstick"), "lipstick"), a("lipstick", o, e);
            var n = document.createElement("canvas");
            n.width = c.config.canvasW, n.height = c.config.canvasH;
            var i = n.getContext("2d");
            i.clearRect(0, 0, c.config.canvasW, c.config.canvasH), c.drawLayer(i, c.config.lipPoint, !0), o ? (i.fillStyle = o, i.strokeStyle = o) : (i.fillStyle = "rgba(0,0,0,0)", i.strokeStyle = "rgba(0,0,0,0)"), i.fill(), M && (i.globalCompositeOperation = "destination-out", c.drawLayer(i, c.config.lipOpenPoint, !0), i.fill(), i.globalCompositeOperation = "source-over"), c.drawBlur(n, 2, 2, 2), c.removeLayerFromMain(s, "libstick_layer"), c.drawLayerToMain(n, s, e, "libstick_layer", "soft-light"), l("lipstick", o)
        }, c.lipgloss = function(o, e) {
            $("#" + z.lipglossAmtSlider).slider({
                value: 10 * e
            }), c.undoManager(this, c.lipgloss, r("lipgloss"), "lipgloss"), a("lipgloss", o, e), c.removeLayerFromMain(s, "libgloss_layer");
            var n = document.createElement("canvas");
            n.width = c.config.canvasW, n.height = c.config.canvasH;
            var i = n.getContext("2d");
            i.clearRect(0, 0, c.config.canvasW, c.config.canvasH), c.drawLayer(i, c.config.lipPoint, !0), o ? i.fillStyle = o : (i.fillStyle = "rgba(0,0,0,0)", i.strokeStyle = "rgba(0,0,0,0)"), i.fill(), M && (i.globalCompositeOperation = "destination-out", c.drawLayer(i, c.config.lipOpenPoint, !0), i.fill(), i.globalCompositeOperation = "source-over"), c.drawLayerToMain(n, s, e, "libgloss_layer", "overlay"), l("lipgloss", o)
        }, c.lipliner = function(o, e) {
            $("#" + z.liplinerAmtSlider).slider({
                value: 10 * e
            }), c.undoManager(this, c.lipliner, r("lipliner"), "lipliner"), a("lipliner", o, e), c.removeLayerFromMain(s, "lipliner_layer");
            var n = document.createElement("canvas");
            n.width = c.config.canvasW, n.height = c.config.canvasH;
            var i = n.getContext("2d");
            i.clearRect(0, 0, c.config.canvasW, c.config.canvasH), c.drawLayer(i, c.config.lipPoint, !0), o ? i.strokeStyle = o : i.strokeStyle = "rgba(0,0,0,0)", i.lineWidth = 1, i.stroke(), M && (i.globalCompositeOperation = "destination-out", c.drawLayer(i, c.config.lipOpenPoint, !0), i.fill(), i.globalCompositeOperation = "source-over"), c.drawBlur(n, 1, 1, 2), c.drawLayerToMain(n, s, e, "lipliner_layer", "normal"), l("lipliner", o)
        }, c.eyeshadow = function(o, e, n) {
            function i() {
                f.beginPath(), f.moveTo(c.config.leftEyePoint[0].x - n / 2, c.config.leftEyePoint[0].y - n / 2);
                var o = [c.config.leftEyePoint[0].x - n / 2, c.config.leftEyePoint[0].y - n / 2, c.config.leftEyePoint[1].x, c.config.leftEyePoint[1].y - n / 2, c.config.leftEyePoint[2].x, c.config.leftEyePoint[2].y, c.config.leftEyePoint[3].x, c.config.leftEyePoint[3].y];
                f.curve(o, .5, 30, !0)
            }

            function t() {
                f.beginPath(), f.moveTo(c.config.rightEyePoint[2].x + n / 2, c.config.rightEyePoint[2].y - n / 2);
                var o = [c.config.rightEyePoint[2].x + n / 2, c.config.rightEyePoint[2].y - n / 2, c.config.rightEyePoint[1].x, c.config.rightEyePoint[1].y - n / 2, c.config.rightEyePoint[0].x, c.config.rightEyePoint[0].y, c.config.rightEyePoint[3].x, c.config.rightEyePoint[3].y];
                f.curve(o, .5, 30, !0)
            }
            $("#" + z.eyeshadowAmtSlider).slider({
                value: 10 * e
            }), $("#" + z.eyeshadowSizeSlider).slider({
                value: n
            }), c.undoManager(this, c.eyeshadow, r("eyeshadow"), "eyeshadow"), a("eyeshadow", o, e, n), c.removeLayerFromMain(s, "eyeshadow_layer");
            var d = document.createElement("canvas");
            d.width = c.config.canvasW, d.height = c.config.canvasH;
            var f = d.getContext("2d");
            f.clearRect(0, 0, c.config.canvasW, c.config.canvasH);
            i(), o ? f.fillStyle = o : (f.fillStyle = "rgba(0,0,0,0)", f.strokeStyle = "rgba(0,0,0,0)"), f.fill(), f.globalCompositeOperation = "destination-out", c.drawLayer(f, c.config.leftEyePoint, !0), f.fill(), f.globalCompositeOperation = "source-over", t(), f.fill(), f.globalCompositeOperation = "destination-out", c.drawLayer(f, c.config.rightEyePoint, !0), f.fill(), f.globalCompositeOperation = "source-over", c.drawBlur(d, 10, 10, 4), c.drawLayerToMain(d, s, e, "eyeshadow_layer", "multiply"), l("eyeshadow", o)
        }, c.eyeliner = function(o, e, n) {
            function i() {
                f.beginPath(), f.moveTo(c.config.leftEyePoint[0].x - n / 2, c.config.leftEyePoint[0].y - n / 2);
                var o = [c.config.leftEyePoint[0].x - n / 2, c.config.leftEyePoint[0].y - n / 2, c.config.leftEyePoint[1].x, c.config.leftEyePoint[1].y - n / 2, c.config.leftEyePoint[2].x, c.config.leftEyePoint[2].y, c.config.leftEyePoint[3].x, c.config.leftEyePoint[3].y];
                f.curve(o, .5, 30, !0)
            }

            function t() {
                f.beginPath(), f.moveTo(c.config.rightEyePoint[2].x + n / 2, c.config.rightEyePoint[2].y - n / 2);
                var o = [c.config.rightEyePoint[2].x + n / 2, c.config.rightEyePoint[2].y - n / 2, c.config.rightEyePoint[1].x, c.config.rightEyePoint[1].y - n / 2, c.config.rightEyePoint[0].x, c.config.rightEyePoint[0].y, c.config.rightEyePoint[3].x, c.config.rightEyePoint[3].y];
                f.curve(o, .5, 30, !0)
            }
            $("#" + z.eyelinerAmtSlider).slider({
                value: 10 * e
            }), $("#" + z.eyelinerSizeSlider).slider({
                value: n
            }), c.undoManager(this, c.eyeliner, r("eyeliner"), "eyeliner"), a("eyeliner", o, e, n), c.removeLayerFromMain(s, "eyeliner_layer");
            var d = document.createElement("canvas");
            d.width = c.config.canvasW, d.height = c.config.canvasH;
            var f = d.getContext("2d");
            f.clearRect(0, 0, c.config.canvasW, c.config.canvasH);
            i(), o ? f.fillStyle = o : (f.fillStyle = "rgba(0,0,0,0)", f.strokeStyle = "rgba(0,0,0,0)"), f.fill(), f.globalCompositeOperation = "destination-out", c.drawLayer(f, c.config.leftEyePoint, !0), f.fill(), f.globalCompositeOperation = "source-over", t(), f.fill(), f.globalCompositeOperation = "destination-out", c.drawLayer(f, c.config.rightEyePoint, !0), f.fill(), f.globalCompositeOperation = "source-over", c.drawBlur(d, 1, 1, 2), c.drawLayerToMain(d, s, e, "eyeliner_layer", "multiply"), l("eyeliner", o)
        }, c.eyebrow = function(o, e, n) {
            $("#" + z.eyebrowSizeSlider).slider({
                value: n
            }), c.undoManager(this, c.eyebrow, r("eyebrow"), "eyebrow"), a("eyebrow", o, e, n), c.removeLayerFromMain(s, "eyebrow_layer");
            var i = document.createElement("canvas");
            i.width = c.config.canvasW, i.height = c.config.canvasH;
            var t = i.getContext("2d");
            t.clearRect(0, 0, c.config.canvasW, c.config.canvasH), t.strokeStyle = o, t.lineWidth = n, c.drawLayer(t, c.config.leftEyeBrowPoint, !1), t.stroke(), c.drawLayer(t, c.config.rightEyeBrowPoint, !1), t.stroke(), c.drawBlur(i, 4, 4, 5), c.drawLayerToMain(i, s, e, "eyebrow_layer", "multiply"), l("eyebrow", o)
        }, c.foundation = function(o, e) {
            $("#" + z.foundationAmtSlider).slider({
                value: 10 * e
            }), c.undoManager(this, c.foundation, r("foundation"), "foundation"), a("foundation", o, e), c.removeLayerFromMain(s, "foundation_layer");
            var n = document.createElement("canvas");
            n.width = c.config.canvasW, n.height = c.config.canvasH;
            var i = n.getContext("2d");
            i.clearRect(0, 0, c.config.canvasW, c.config.canvasH), c.drawLayer(i, c.config.facePoint, !0), o ? i.fillStyle = o : (i.fillStyle = "rgba(0,0,0,0)", i.strokeStyle = "rgba(0,0,0,0)"), i.fill(), i.globalCompositeOperation = "destination-out", c.drawLayer(i, c.config.lipPoint, !0), i.fill();
            var t = 10,
                d = [{
                    x: c.config.leftEyePoint[0].x,
                    y: c.config.leftEyePoint[0].y + t
                }, {
                    x: c.config.leftEyePoint[3].x,
                    y: c.config.leftEyePoint[3].y + t
                }, {
                    x: c.config.leftEyePoint[2].x,
                    y: c.config.leftEyePoint[2].y + t
                }, {
                    x: c.config.leftEyeBrowPoint[3].x,
                    y: c.config.leftEyeBrowPoint[3].y - t
                }, {
                    x: c.config.leftEyeBrowPoint[1].x,
                    y: c.config.leftEyeBrowPoint[1].y - t
                }, {
                    x: c.config.leftEyeBrowPoint[0].x,
                    y: c.config.leftEyeBrowPoint[0].y - t
                }];
            c.drawLayer(i, d, !0), i.fill();
            var f = [{
                x: c.config.rightEyePoint[0].x,
                y: c.config.rightEyePoint[0].y + t
            }, {
                x: c.config.rightEyePoint[3].x,
                y: c.config.rightEyePoint[3].y + t
            }, {
                x: c.config.rightEyePoint[2].x,
                y: c.config.rightEyePoint[2].y + t
            }, {
                x: c.config.rightEyeBrowPoint[3].x,
                y: c.config.rightEyeBrowPoint[3].y - t
            }, {
                x: c.config.rightEyeBrowPoint[1].x,
                y: c.config.rightEyeBrowPoint[1].y - t
            }, {
                x: c.config.rightEyeBrowPoint[0].x,
                y: c.config.rightEyeBrowPoint[0].y - t
            }];
            c.drawLayer(i, f, !0), i.fill(), i.globalCompositeOperation = "source-over", c.drawBlur(n, 15, 15, 5), c.drawLayerToMain(n, s, e, "foundation_layer", "soft-light"), l("foundation", o)
        }, c.concealer = function(o, e) {
            $("#" + z.concealerAmtSlider).slider({
                value: 10 * e
            }), c.undoManager(this, c.concealer, r("concealer"), "concealer"), a("concealer", o, e), c.removeLayerFromMain(s, "concealer_layer");
            var n = document.createElement("canvas");
            n.width = c.config.canvasW, n.height = c.config.canvasH;
            var i = n.getContext("2d");
            i.clearRect(0, 0, c.config.canvasW, c.config.canvasH);
            var t = [{
                    x: c.config.leftEyePoint[0].x - 2,
                    y: c.config.leftEyePoint[0].y + 2
                }, {
                    x: c.config.leftEyePoint[3].x,
                    y: c.config.leftEyePoint[3].y + 2
                }, {
                    x: c.config.leftEyePoint[2].x + 2,
                    y: c.config.leftEyePoint[2].y + 2
                }, {
                    x: c.config.leftEyePoint[3].x,
                    y: c.config.leftEyePoint[3].y + 25
                }],
                d = [{
                    x: c.config.rightEyePoint[0].x - 2,
                    y: c.config.rightEyePoint[0].y + 2
                }, {
                    x: c.config.rightEyePoint[3].x,
                    y: c.config.rightEyePoint[3].y + 2
                }, {
                    x: c.config.rightEyePoint[2].x + 2,
                    y: c.config.rightEyePoint[2].y + 2
                }, {
                    x: c.config.rightEyePoint[3].x,
                    y: c.config.rightEyePoint[3].y + 25
                }];
            c.drawLayer(i, t, !0), o ? i.fillStyle = o : (i.fillStyle = "rgba(0,0,0,0)", i.strokeStyle = "rgba(0,0,0,0)"), i.fill(), c.drawLayer(i, d, !0), i.fill(), c.drawBlur(n, 8, 5, 3), c.drawLayerToMain(n, s, e, "concealer_layer", "soft-light"), l("concealer", o)
        }, c.blush = function(o, e) {
            function n(o, e) {
                var n = 0,
                    i = 0;
                return n = e.x - o.x, n *= n, i = e.y - o.y, i *= i, Math.sqrt(n + i)
            }

            function i(e, n, i, t) {
                e.beginPath(), e.arc(i, t, n, 0, 2 * Math.PI), e.fillStyle = o, e.fill(), e.closePath()
            }

            function t(o, e, t, a, r, l, c) {
                f.moveTo(o, e), f.curve([o, e, t, a, r, l], 0, 25, !0);
                var d = (o + t + r) / 3,
                    s = (e + a + l) / 3,
                    g = n({
                        x: o,
                        y: e
                    }, {
                        x: t,
                        y: a
                    }),
                    w = n({
                        x: t,
                        y: a
                    }, {
                        x: r,
                        y: l
                    }),
                    u = n({
                        x: r,
                        y: l
                    }, {
                        x: o,
                        y: e
                    }),
                    y = g + w + u,
                    h = w / 2 * (a - e),
                    m = 2 * h / y;
                i(f, m - c, d, s)
            }
            $("#" + z.blushAmtSlider).slider({
                value: 10 * e
            }), c.undoManager(this, c.blush, r("blush"), "blush"), a("blush", o, e), c.removeLayerFromMain(s, "blush_layer");
            var d = document.createElement("canvas");
            d.width = c.config.canvasW, d.height = c.config.canvasH;
            var f = d.getContext("2d");
            f.clearRect(0, 0, c.config.canvasW, c.config.canvasH), t(c.config.facePoint[0].x, c.config.facePoint[0].y, c.config.facePoint[1].x, c.config.facePoint[1].y, c.config.nosePoint[0].x, c.config.nosePoint[0].y, 0), t(c.config.facePoint[4].x, c.config.facePoint[4].y, c.config.facePoint[3].x, c.config.facePoint[3].y, c.config.nosePoint[1].x, c.config.nosePoint[1].y, 3), c.drawBlur(d, 15, 15, 5), c.drawLayerToMain(d, s, e, "blush_layer", "soft-light"), l("blush", o)
        };
        var G = !1;
        c.showPreview = function() {
            s.deactivateAll().renderAll(), $("#zoom-slider").slider({
                value: 0
            });
            var o = s.toDataURL({
                    format: "png",
                    multiplier: 1.2
                }),
                e = v.toDataURL({
                    format: "png",
                    multiplier: 1.2
                });
            $("#prvImg1").attr("src", o), $("#prvImg").attr("src", e);
            var n = new Image;
            n.onload = function() {
                $(".prv").css("width", n.width)
            }, n.src = o, $("#previewModal").show(), setTimeout(function() {
                G || ($(".twentytwenty-container").twentytwenty(), G = !0)
            }, 100)
        }, c.eventTrigger = function(o, e) {
            var n = new CustomEvent(o, e);
            document.dispatchEvent(n)
        }
    }
}();
! function(e, t, a, n, c, s, o) {
    e.GoogleAnalyticsObject = c, e[c] = e[c] || function() {
        (e[c].q = e[c].q || []).push(arguments)
    }, e[c].l = 1 * new Date, s = t.createElement(a), o = t.getElementsByTagName(a)[0], s.async = 1, s.src = n, o.parentNode.insertBefore(s, o)
}(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", "#", "auto"), ga("send", "pageview");