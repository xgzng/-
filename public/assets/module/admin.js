﻿/** EasyWeb iframe v3.1.7 date:2020-03-11 License By http://easyweb.vip */
layui.define(["layer"], function (f) {
    var h = layui.jquery;
    var k = layui.layer;
    var d = layui.cache;
    var b = ".layui-layout-admin>.layui-body";
    var l = b + ">.layui-tab";
    var e = ".layui-layout-admin>.layui-side>.layui-side-scroll";
    var j = ".layui-layout-admin>.layui-header";
    var c = "admin-side-nav";
    var n = {version: "v3.1.7", layerData: {}};
    n.flexible = function (i) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.flexible(i)
        }
        var q = h(".layui-layout-admin");
        var p = q.hasClass("admin-nav-mini");
        if (i === undefined) {
            i = p
        }
        if (p === i) {
            if (i) {
                n.hideTableScrollBar();
                q.removeClass("admin-nav-mini")
            } else {
                q.addClass("admin-nav-mini")
            }
        }
        layui.event.call(this, "admin", "flexible({*})", {expand: i})
    };
    n.activeNav = function (p) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.activeNav(p)
        }
        if (p) {
            h(e + ">.layui-nav .layui-nav-item .layui-nav-child dd.layui-this").removeClass("layui-this");
            h(e + ">.layui-nav .layui-nav-item.layui-this").removeClass("layui-this");
            var s = h(e + '>.layui-nav a[lay-href="' + p + '"]');
            if (s.length > 0) {
                var r = h(".layui-layout-admin").hasClass("admin-nav-mini");
                if (h(e + ">.layui-nav").attr("lay-shrink") === "all") {
                    var i = s.parent("dd").parents(".layui-nav-child");
                    if (r) {
                        h(e + ">.layui-nav .layui-nav-itemed>.layui-nav-child").not(i).css("display", "none")
                    } else {
                        h(e + ">.layui-nav .layui-nav-itemed>.layui-nav-child").not(i).slideUp("fast")
                    }
                    h(e + ">.layui-nav .layui-nav-itemed").not(i.parent()).removeClass("layui-nav-itemed")
                }
                s.parent().addClass("layui-this");
                var t = s.parent("dd").parents(".layui-nav-child").parent();
                if (r) {
                    t.not(".layui-nav-itemed").children(".layui-nav-child").css("display", "block")
                } else {
                    t.not(".layui-nav-itemed").children(".layui-nav-child").slideDown("fast", function () {
                        var u = s.offset().top + s.outerHeight() + 30 - n.getPageHeight();
                        var v = 50 + 65 - s.offset().top;
                        if (u > 0) {
                            h(e).animate({"scrollTop": h(e).scrollTop() + u}, 100)
                        } else {
                            if (v > 0) {
                                h(e).animate({"scrollTop": h(e).scrollTop() - v}, 100)
                            }
                        }
                    })
                }
                t.addClass("layui-nav-itemed");
                h('ul[lay-filter="' + c + '"]').addClass("layui-hide");
                var q = s.parents(".layui-nav");
                q.removeClass("layui-hide");
                h(j + ">.layui-nav>.layui-nav-item").removeClass("layui-this");
                h(j + '>.layui-nav>.layui-nav-item>a[nav-bind="' + q.attr("nav-id") + '"]').parent().addClass("layui-this")
            }
        } else {
            console.warn("active url is null")
        }
    };
    n.popupRight = function (i) {
        i.anim = -1;
        i.offset = "r";
        i.move = false;
        i.fixed = true;
        if (i.area === undefined) {
            i.area = "336px"
        }
        if (i.title === undefined) {
            i.title = false
        }
        if (i.closeBtn === undefined) {
            i.closeBtn = false
        }
        if (i.shadeClose === undefined) {
            i.shadeClose = true
        }
        if (i.skin === undefined) {
            i.skin = "layui-anim layui-anim-rl layui-layer-adminRight"
        }
        return n.open(i)
    };
    n.open = function (r) {
        if (r.content && r.type === 2) {
            r.url = undefined
        }
        if (r.url && (r.type === 2 || r.type === undefined)) {
            r.type = 1
        }
        if (r.area === undefined) {
            r.area = r.type === 2 ? ["360px", "300px"] : "360px"
        }
        if (r.offset === undefined) {
            r.offset = "70px"
        }
        if (r.shade === undefined) {
            r.shade = 0.1
        }
        if (r.fixed === undefined) {
            r.fixed = false
        }
        if (r.resize === undefined) {
            r.resize = false
        }
        if (r.skin === undefined) {
            r.skin = "layui-layer-admin"
        }
        var p = r.end;
        r.end = function () {
            k.closeAll("tips");
            p && p()
        };
        if (r.url) {
            var q = r.success;
            r.success = function (s, t) {
                h(s).data("tpl", r.tpl || "");
                n.reloadLayer(t, r.url, q)
            }
        }
        var i = k.open(r);
        if (r.data) {
            n.layerData["d" + i] = r.data
        }
        return i
    };
    n.getLayerData = function (i, p) {
        if (i === undefined) {
            i = parent.layer.getFrameIndex(window.name);
            if (i === undefined) {
                return null
            } else {
                return parent.layui.admin.getLayerData(parseInt(i), p)
            }
        } else {
            if (isNaN(i)) {
                var q = h(i).parents(".layui-layer").first().attr("id");
                if (q) {
                    i = q.substring(11)
                }
            }
        }
        var r = n.layerData["d" + i];
        if (p && r) {
            return r[p]
        }
        return r
    };
    n.putLayerData = function (p, s, i) {
        if (i === undefined) {
            i = parent.layer.getFrameIndex(window.name);
            if (i === undefined) {
                return
            } else {
                return parent.layui.admin.putLayerData(p, s, parseInt(i))
            }
        } else {
            if (isNaN(i)) {
                var q = h(i).parents(".layui-layer").first().attr("id");
                if (q) {
                    i = q.substring(11)
                }
            }
        }
        var r = n.getLayerData(i);
        if (!r) {
            r = {}
        }
        r[p] = s;
        n.layerData["d" + i] = r
    };
    n.reloadLayer = function (p, i, s) {
        if (typeof i === "function") {
            s = i;
            i = undefined
        }
        if (isNaN(p)) {
            var r = h(p).parents(".layui-layer").first().attr("id");
            if (r) {
                p = r.substring(11)
            }
        }
        var q = h("#layui-layer" + p);
        if (i === undefined) {
            i = q.data("url")
        }
        if (!i) {
            return
        }
        q.data("url", i);
        n.showLoading(q);
        n.ajax({
            url: i, dataType: "html", success: function (u) {
                n.removeLoading(q, false);
                if (typeof u !== "string") {
                    u = JSON.stringify(u)
                }
                var t = q.data("tpl");
                if (t === true || t === "true") {
                    var v = n.getLayerData(p) || {};
                    v.layerIndex = p;
                    u = n.util.tpl(u, v, d.tplOpen, d.tplClose)
                }
                q.children(".layui-layer-content").html(u);
                s && s(q[0], p)
            }
        })
    };
    n.alert = function (p, i, q) {
        if (typeof i === "function") {
            q = i;
            i = {}
        }
        if (i.skin === undefined) {
            i.skin = "layui-layer-admin"
        }
        if (param.shade === undefined) {
            param.shade = 0.1
        }
        return k.alert(p, i, q)
    };
    n.confirm = function (q, i, r, p) {
        if (typeof i === "function") {
            p = r;
            r = i;
            i = {}
        }
        if (i.skin === undefined) {
            i.skin = "layui-layer-admin"
        }
        if (i.shade === undefined) {
            i.shade = 0.1
        }
        return k.confirm(q, i, r, p)
    };
    n.prompt = function (i, p) {
        if (typeof i === "function") {
            p = i;
            i = {}
        }
        if (i.skin === undefined) {
            i.skin = "layui-layer-admin layui-layer-prompt"
        }
        if (i.shade === undefined) {
            i.shade = 0.1
        }
        return k.prompt(i, p)
    };
    n.req = function (i, q, r, s, p) {
        if (typeof q === "function") {
            p = s;
            s = r;
            r = q;
            q = {}
        }
        if (s !== undefined && typeof s !== "string") {
            p = s;
            s = undefined
        }
        if (!s) {
            s = "GET"
        }
        if (typeof q === "string") {
            if (!p) {
                p = {}
            }
            if (!p.contentType) {
                p.contentType = "application/json"
            }
        } else {
            if (d.reqPutToPost) {
                if ("put" === s.toLowerCase()) {
                    s = "POST";
                    q._method = "PUT"
                } else {
                    if ("delete" === s.toLowerCase()) {
                        s = "GET";
                        q._method = "DELETE"
                    }
                }
            }
        }
        return n.ajax(h.extend({url: (d.baseServer || "") + i, data: q, type: s, dataType: "json", success: r}, p))
    };
    n.ajax = function (t) {
        var q = n.util.deepClone(t);
        if (!t.dataType) {
            t.dataType = "json"
        }
        if (!t.headers) {
            t.headers = {}
        }
        var s = d.getAjaxHeaders(t.url);
        if (s) {
            for (var p = 0; p < s.length; p++) {
                if (t.headers[s[p].name] === undefined) {
                    t.headers[s[p].name] = s[p].value
                }
            }
        }
        var r = t.success;
        t.success = function (i, u, w) {
            var v = d.ajaxSuccessBefore(n.parseJSON(i), t.url, {
                param: q, reload: function (x) {
                    n.ajax(h.extend(q, x))
                }, update: function (x) {
                    i = x
                }
            });
            if (v !== false) {
                r && r(i, u, w)
            } else {
                t.cancel && t.cancel()
            }
        };
        t.error = function (u, i) {
            t.success({code: u.status, msg: u.statusText}, i, u)
        };
        if (layui.cache.version && (!d.apiNoCache || t.dataType.toLowerCase() !== "json")) {
            if (t.url.indexOf("?") === -1) {
                t.url += "?v="
            } else {
                t.url += "&v="
            }
            if (layui.cache.version === true) {
                t.url += new Date().getTime()
            } else {
                t.url += layui.cache.version
            }
        }
        return h.ajax(t)
    };
    n.parseJSON = function (p) {
        if (typeof p === "string") {
            try {
                return JSON.parse(p)
            } catch (i) {
            }
        }
        return p
    };
    n.showLoading = function (s, r, p, q) {
        if (s !== undefined && (typeof s !== "string") && !(s instanceof h)) {
            r = s.type;
            p = s.opacity;
            q = s.size;
            s = s.elem
        }
        if (r === undefined) {
            r = 1
        }
        if (q === undefined) {
            q = "sm"
        }
        if (s === undefined) {
            s = "body"
        }
        var i = ['<div class="ball-loader ' + q + '"><span></span><span></span><span></span><span></span></div>', '<div class="rubik-loader ' + q + '"></div>', '<div class="signal-loader ' + q + '"><span></span><span></span><span></span><span></span></div>'];
        h(s).addClass("page-no-scroll");
        h(s).scrollTop(0);
        var t = h(s).children(".page-loading");
        if (t.length <= 0) {
            h(s).append('<div class="page-loading">' + i[r - 1] + "</div>");
            t = h(s).children(".page-loading")
        }
        if (p !== undefined) {
            t.css("background-color", "rgba(255,255,255," + p + ")")
        }
        t.show()
    };
    n.removeLoading = function (p, r, i) {
        if (p === undefined) {
            p = "body"
        }
        if (r === undefined) {
            r = true
        }
        var q = h(p).children(".page-loading");
        if (i) {
            q.remove()
        } else {
            if (r) {
                q.fadeOut("fast")
            } else {
                q.hide()
            }
        }
        h(p).removeClass("page-no-scroll")
    };
    n.putTempData = function (q, r, p) {
        var i = p ? d.tableName : d.tableName + "_tempData";
        if (r === undefined || r === null) {
            if (p) {
                layui.data(i, {key: q, remove: true})
            } else {
                layui.sessionData(i, {key: q, remove: true})
            }
        } else {
            if (p) {
                layui.data(i, {key: q, value: r})
            } else {
                layui.sessionData(i, {key: q, value: r})
            }
        }
    };
    n.getTempData = function (q, p) {
        if (typeof q === "boolean") {
            p = q;
            q = undefined
        }
        var i = p ? d.tableName : d.tableName + "_tempData";
        var r = p ? layui.data(i) : layui.sessionData(i);
        if (!q) {
            return r
        }
        return r ? r[q] : undefined
    };
    n.rollPage = function (r) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.rollPage(r)
        }
        var p = h(l + ">.layui-tab-title");
        var q = p.scrollLeft();
        if ("left" === r) {
            p.animate({"scrollLeft": q - 120}, 100)
        } else {
            if ("auto" === r) {
                var i = 0;
                p.children("li").each(function () {
                    if (h(this).hasClass("layui-this")) {
                        return false
                    } else {
                        i += h(this).outerWidth()
                    }
                });
                p.animate({"scrollLeft": i - 120}, 100)
            } else {
                p.animate({"scrollLeft": q + 120}, 100)
            }
        }
    };
    n.refresh = function (i) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.refresh(i)
        }
        var q;
        if (!i) {
            q = h(l + ">.layui-tab-content>.layui-tab-item.layui-show>.admin-iframe");
            if (!q || q.length <= 0) {
                q = h(b + ">div>.admin-iframe")
            }
        } else {
            q = h(l + '>.layui-tab-content>.layui-tab-item>.admin-iframe[lay-id="' + i + '"]');
            if (!q || q.length <= 0) {
                q = h(b + ">.admin-iframe")
            }
        }
        if (q && q[0]) {
            try {
                q[0].contentWindow.location.reload()
            } catch (p) {
                q.attr("src", q.attr("src"))
            }
        } else {
            console.warn(i + " is not found")
        }
    };
    n.closeThisTabs = function (i) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.closeThisTabs(i)
        }
        n.closeTabOperNav();
        var p = h(l + ">.layui-tab-title");
        if (!i) {
            if (p.find("li").first().hasClass("layui-this")) {
                k.msg("主页不能关闭", {icon: 2});
                return
            }
            p.find("li.layui-this").find(".layui-tab-close").trigger("click")
        } else {
            if (i === p.find("li").first().attr("lay-id")) {
                k.msg("主页不能关闭", {icon: 2});
                return
            }
            p.find('li[lay-id="' + i + '"]').find(".layui-tab-close").trigger("click")
        }
    };
    n.closeOtherTabs = function (i) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.closeOtherTabs(i)
        }
        if (!i) {
            h(l + ">.layui-tab-title li:gt(0):not(.layui-this)").find(".layui-tab-close").trigger("click")
        } else {
            h(l + ">.layui-tab-title li:gt(0)").each(function () {
                if (i !== h(this).attr("lay-id")) {
                    h(this).find(".layui-tab-close").trigger("click")
                }
            })
        }
        n.closeTabOperNav()
    };
    n.closeAllTabs = function () {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.closeAllTabs()
        }
        h(l + ">.layui-tab-title li:gt(0)").find(".layui-tab-close").trigger("click");
        h(l + ">.layui-tab-title li:eq(0)").trigger("click");
        n.closeTabOperNav()
    };
    n.closeTabOperNav = function () {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.closeTabOperNav()
        }
        h(".layui-icon-down .layui-nav .layui-nav-child").removeClass("layui-show")
    };
    n.changeTheme = function (v, u, p, t) {
        if (!p) {
            n.putSetting("defaultTheme", v)
        }
        if (!u) {
            u = top
        }
        n.removeTheme(u);
        if (v) {
            try {
                var r = u.layui.jquery("body");
                r.addClass(v);
                r.data("theme", v)
            } catch (s) {
            }
        }
        if (!t) {
            var w = u.frames;
            for (var q = 0; q < w.length; q++) {
                n.changeTheme(v, w[q], true, false)
            }
        }
    };
    n.removeTheme = function (i) {
        if (!i) {
            i = window
        }
        try {
            var p = i.layui.jquery("body");
            var r = p.data("theme");
            if (r) {
                p.removeClass(r)
            }
            p.removeData("theme")
        } catch (q) {
        }
    };
    n.closeThisDialog = function () {
        return n.closeDialog()
    };
    n.closeDialog = function (i) {
        if (i) {
            var p = h(i).parents(".layui-layer").first().attr("id");
            if (p && p.length >= 11) {
                k.close(p.substring(11))
            }
        } else {
            parent.layer.close(parent.layer.getFrameIndex(window.name))
        }
    };
    n.iframeAuto = function () {
        parent.layer.iframeAuto(parent.layer.getFrameIndex(window.name))
    };
    n.getPageHeight = function () {
        return document.documentElement.clientHeight || document.body.clientHeight
    };
    n.getPageWidth = function () {
        return document.documentElement.clientWidth || document.body.clientWidth
    };
    n.modelForm = function (p, s, i) {
        var r = h(p);
        r.addClass("layui-form");
        if (i) {
            r.attr("lay-filter", i)
        }
        var q = r.find(".layui-layer-btn .layui-layer-btn0");
        q.attr("lay-submit", "");
        q.attr("lay-filter", s)
    };
    n.btnLoading = function (p, q, r) {
        if (q !== undefined && (typeof q === "boolean")) {
            r = q;
            q = undefined
        }
        if (q === undefined) {
            q = "&nbsp;加载中"
        }
        if (r === undefined) {
            r = true
        }
        var i = h(p);
        if (r) {
            i.addClass("ew-btn-loading");
            i.prepend('<span class="ew-btn-loading-text"><i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>' + q + "</span>");
            i.prop("disabled", "disabled")
        } else {
            i.removeClass("ew-btn-loading");
            i.children(".ew-btn-loading-text").remove();
            i.removeProp("disabled", "disabled")
        }
    };
    n.openSideAutoExpand = function () {
        var i = h(".layui-layout-admin>.layui-side");
        i.off("mouseenter.openSideAutoExpand").on("mouseenter.openSideAutoExpand", function () {
            if (h(this).parent().hasClass("admin-nav-mini")) {
                n.flexible(true);
                h(this).addClass("side-mini-hover")
            }
        });
        i.off("mouseleave.openSideAutoExpand").on("mouseleave.openSideAutoExpand", function () {
            if (h(this).hasClass("side-mini-hover")) {
                n.flexible(false);
                h(this).removeClass("side-mini-hover")
            }
        })
    };
    n.openCellAutoExpand = function () {
        var i = h("body");
        i.off("mouseenter.openCellAutoExpand").on("mouseenter.openCellAutoExpand", ".layui-table-view td", function () {
            h(this).find(".layui-table-grid-down").trigger("click")
        });
        i.off("mouseleave.openCellAutoExpand").on("mouseleave.openCellAutoExpand", ".layui-table-tips>.layui-layer-content", function () {
            h(".layui-table-tips-c").trigger("click")
        })
    };
    n.parseLayerOption = function (s) {
        for (var t in s) {
            if (!s.hasOwnProperty(t)) {
                continue
            }
            if (s[t] && s[t].toString().indexOf(",") !== -1) {
                s[t] = s[t].toString().split(",")
            }
        }
        var p = ["success", "cancel", "end", "full", "min", "restore"];
        for (var r = 0; r < p.length; r++) {
            for (var q in s) {
                if (!s.hasOwnProperty(q)) {
                    continue
                }
                if (q === p[r]) {
                    s[q] = window[s[q]]
                }
            }
        }
        if (s.content && (typeof s.content === "string") && s.content.indexOf("#") === 0) {
            if (h(s.content).is("script")) {
                s.content = h(s.content).html()
            } else {
                s.content = h(s.content)
            }
        }
        if (s.type === undefined && s.url === undefined) {
            s.type = 2
        }
        return s
    };
    n.strToWin = function (s) {
        var r = window;
        if (!s) {
            return r
        }
        var p = s.split(".");
        for (var q = 0; q < p.length; q++) {
            r = r[p[q]]
        }
        return r
    };
    n.hideTableScrollBar = function (q) {
        if (n.getPageWidth() <= 768) {
            return
        }
        if (!q) {
            var p = h(l + ">.layui-tab-content>.layui-tab-item.layui-show>.admin-iframe");
            if (p.length <= 0) {
                p = h(b + ">div>.admin-iframe")
            }
            if (p.length > 0) {
                q = p[0].contentWindow
            }
        }
        try {
            if (window.hsbTimer) {
                clearTimeout(window.hsbTimer)
            }
            q.layui.jquery(".layui-table-body.layui-table-main").addClass("no-scrollbar");
            window.hsbTimer = setTimeout(function () {
                q.layui.jquery(".layui-table-body.layui-table-main").removeClass("no-scrollbar")
            }, 600)
        } catch (i) {
        }
    };
    n.isTop = function () {
        return h(b).length > 0
    };
    n.events = {
        flexible: function () {
            n.strToWin(h(this).data("window")).layui.admin.flexible()
        }, refresh: function () {
            n.strToWin(h(this).data("window")).layui.admin.refresh()
        }, back: function () {
            n.strToWin(h(this).data("window")).history.back()
        }, theme: function () {
            var i = n.util.deepClone(h(this).data());
            n.strToWin(i.window).layui.admin.popupRight(h.extend({
                id: "layer-theme",
                url: "theme"
            }, n.parseLayerOption(i)))
        }, note: function () {
            var i = n.util.deepClone(h(this).data());
            n.strToWin(i.window).layui.admin.popupRight(h.extend({
                id: "layer-note",
                url: i.url || "page/tpl/tpl-note.html"
            }, n.parseLayerOption(i)))
        }, message: function () {
            var i = n.util.deepClone(h(this).data());
            n.strToWin(i.window).layui.admin.popupRight(h.extend({
                id: "layer-notice",
                url: i.url || "page/tpl/tpl-message.html"
            }, n.parseLayerOption(i)))
        }, psw: function () {
            var i = n.util.deepClone(h(this).data());
            n.strToWin(i.window).layui.admin.open(h.extend({
                id: "layer-psw",
                title: "修改密码",
                shade: 0,
                url: i.url || "page/tpl/tpl-password.html"
            }, n.parseLayerOption(i)))
        }, logout: function () {
            var p = n.util.deepClone(h(this).data());
            n.unlockScreen();
            if (false === p.confirm || "false" === p.confirm) {
                i();
                return
            }
            n.strToWin(p.window).layui.layer.confirm(p.content || "确定要退出登录吗？", h.extend({
                title: "温馨提示",
                skin: "layui-layer-admin",
                shade: 0.1
            }, n.parseLayerOption(p)), function () {
                i()
            });

            function i() {
                if (p.ajax) {
                    var q = k.load(2);
                    n.req(p.ajax, function (r) {
                        k.close(q);
                        if (r.code == (p.code || 0)) {
                            d.removeToken && d.removeToken();
                            location.replace(p.url || "/")
                        } else {
                            k.msg(r.msg, {icon: 2})
                        }
                    }, p.method || "delete")
                } else {
                    d.removeToken && d.removeToken();
                    location.replace(p.url || "/")
                }
            }
        }, open: function () {
            var i = n.util.deepClone(h(this).data());
            n.strToWin(i.window).layui.admin.open(n.parseLayerOption(i))
        }, popupRight: function () {
            var i = n.util.deepClone(h(this).data());
            n.strToWin(i.window).layui.admin.popupRight(n.parseLayerOption(i))
        }, fullScreen: function () {
            var w = "layui-icon-screen-full", p = "layui-icon-screen-restore";
            var v = h(this).find("i");
            var s = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
            if (s) {
                var r = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
                if (r) {
                    r.call(document)
                } else {
                    if (window.ActiveXObject) {
                        var t = new ActiveXObject("WScript.Shell");
                        t && t.SendKeys("{F11}")
                    }
                }
                v.addClass(w).removeClass(p)
            } else {
                var i = document.documentElement;
                var q = i.requestFullscreen || i.webkitRequestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen;
                if (q) {
                    q.call(i)
                } else {
                    if (window.ActiveXObject) {
                        var u = new ActiveXObject("WScript.Shell");
                        u && u.SendKeys("{F11}")
                    }
                }
                v.addClass(p).removeClass(w)
            }
        }, leftPage: function () {
            n.strToWin(h(this).data("window")).layui.admin.rollPage("left")
        }, rightPage: function () {
            n.strToWin(h(this).data("window")).layui.admin.rollPage()
        }, closeThisTabs: function () {
            var i = h(this).data("url");
            n.strToWin(h(this).data("window")).layui.admin.closeThisTabs(i)
        }, closeOtherTabs: function () {
            n.strToWin(h(this).data("window")).layui.admin.closeOtherTabs()
        }, closeAllTabs: function () {
            n.strToWin(h(this).data("window")).layui.admin.closeAllTabs()
        }, closeDialog: function () {
            if (h(this).parents(".layui-layer").length > 0) {
                n.closeDialog(this)
            } else {
                n.closeDialog()
            }
        }, closeIframeDialog: function () {
            n.closeDialog()
        }, closePageDialog: function () {
            n.closeDialog(this)
        }, lockScreen: function () {
            var i = h(this).data("url");
            n.strToWin(h(this).data("window")).layui.admin.lockScreen(i)
        }
    };
    n.chooseLocation = function (t) {
        var p = t.title;
        var x = t.onSelect;
        var r = t.needCity;
        var y = t.center;
        var B = t.defaultZoom;
        var u = t.pointZoom;
        var w = t.keywords;
        var A = t.pageSize;
        var s = t.mapJsUrl;
        if (p === undefined) {
            p = "选择位置"
        }
        if (B === undefined) {
            B = 11
        }
        if (u === undefined) {
            u = 17
        }
        if (w === undefined) {
            w = ""
        }
        if (A === undefined) {
            A = 30
        }
        if (s === undefined) {
            s = "https://webapi.amap.com/maps?v=1.4.14&key=006d995d433058322319fa797f2876f5"
        }
        var C = false, z;
        var v = function (E, D) {
            AMap.service(["AMap.PlaceSearch"], function () {
                var G = new AMap.PlaceSearch({type: "", pageSize: A, pageIndex: 1});
                var F = [D, E];
                G.searchNearBy(w, F, 1000, function (I, H) {
                    if (I === "complete") {
                        var L = H.poiList.pois;
                        var M = "";
                        for (var K = 0; K < L.length; K++) {
                            var J = L[K];
                            if (J.location !== undefined) {
                                M += '<div data-lng="' + J.location.lng + '" data-lat="' + J.location.lat + '" class="ew-map-select-search-list-item">';
                                M += '     <div class="ew-map-select-search-list-item-title">' + J.name + "</div>";
                                M += '     <div class="ew-map-select-search-list-item-address">' + J.address + "</div>";
                                M += '     <div class="ew-map-select-search-list-item-icon-ok layui-hide"><i class="layui-icon layui-icon-ok-circle"></i></div>';
                                M += "</div>"
                            }
                        }
                        h("#ew-map-select-pois").html(M)
                    }
                })
            })
        };
        var i = function () {
            var D = {resizeEnable: true, zoom: B};
            y && (D.center = y);
            var F = new AMap.Map("ew-map-select-map", D);
            F.on("complete", function () {
                var G = F.getCenter();
                v(G.lat, G.lng)
            });
            F.on("moveend", function () {
                if (C) {
                    C = false
                } else {
                    h("#ew-map-select-tips").addClass("layui-hide");
                    h("#ew-map-select-center-img").removeClass("bounceInDown");
                    setTimeout(function () {
                        h("#ew-map-select-center-img").addClass("bounceInDown")
                    });
                    var G = F.getCenter();
                    v(G.lat, G.lng)
                }
            });
            h("#ew-map-select-pois").off("click").on("click", ".ew-map-select-search-list-item", function () {
                h("#ew-map-select-tips").addClass("layui-hide");
                h("#ew-map-select-pois .ew-map-select-search-list-item-icon-ok").addClass("layui-hide");
                h(this).find(".ew-map-select-search-list-item-icon-ok").removeClass("layui-hide");
                h("#ew-map-select-center-img").removeClass("bounceInDown");
                setTimeout(function () {
                    h("#ew-map-select-center-img").addClass("bounceInDown")
                });
                var I = h(this).data("lng");
                var J = h(this).data("lat");
                var H = h(this).find(".ew-map-select-search-list-item-title").text();
                var G = h(this).find(".ew-map-select-search-list-item-address").text();
                z = {name: H, address: G, lat: J, lng: I};
                C = true;
                F.setZoomAndCenter(u, [I, J])
            });
            h("#ew-map-select-btn-ok").click(function () {
                if (z === undefined) {
                    k.msg("请点击位置列表选择", {icon: 2, anim: 6})
                } else {
                    if (x) {
                        if (r) {
                            var G = k.load(2);
                            F.setCenter([z.lng, z.lat]);
                            F.getCity(function (H) {
                                k.close(G);
                                z.city = H;
                                n.closeDialog("#ew-map-select-btn-ok");
                                x(z)
                            })
                        } else {
                            n.closeDialog("#ew-map-select-btn-ok");
                            x(z)
                        }
                    } else {
                        n.closeDialog("#ew-map-select-btn-ok")
                    }
                }
            });
            var E = h("#ew-map-select-input-search");
            E.off("input").on("input", function () {
                var G = h(this).val();
                var H = h("#ew-map-select-tips");
                if (!G) {
                    H.html("");
                    H.addClass("layui-hide")
                }
                AMap.plugin("AMap.Autocomplete", function () {
                    var I = new AMap.Autocomplete({city: "全国"});
                    I.search(G, function (L, K) {
                        if (K.tips) {
                            var J = K.tips;
                            var N = "";
                            for (var M = 0; M < J.length; M++) {
                                var O = J[M];
                                if (O.location !== undefined) {
                                    N += '<div data-lng="' + O.location.lng + '" data-lat="' + O.location.lat + '" class="ew-map-select-search-list-item">';
                                    N += '     <div class="ew-map-select-search-list-item-icon-search"><i class="layui-icon layui-icon-search"></i></div>';
                                    N += '     <div class="ew-map-select-search-list-item-title">' + O.name + "</div>";
                                    N += '     <div class="ew-map-select-search-list-item-address">' + O.address + "</div>";
                                    N += "</div>"
                                }
                            }
                            H.html(N);
                            if (J.length === 0) {
                                h("#ew-map-select-tips").addClass("layui-hide")
                            } else {
                                h("#ew-map-select-tips").removeClass("layui-hide")
                            }
                        } else {
                            H.html("");
                            H.addClass("layui-hide")
                        }
                    })
                })
            });
            E.off("blur").on("blur", function () {
                var G = h(this).val();
                var H = h("#ew-map-select-tips");
                if (!G) {
                    H.html("");
                    H.addClass("layui-hide")
                }
            });
            E.off("focus").on("focus", function () {
                var G = h(this).val();
                if (G) {
                    h("#ew-map-select-tips").removeClass("layui-hide")
                }
            });
            h("#ew-map-select-tips").off("click").on("click", ".ew-map-select-search-list-item", function () {
                h("#ew-map-select-tips").addClass("layui-hide");
                var G = h(this).data("lng");
                var H = h(this).data("lat");
                z = undefined;
                F.setZoomAndCenter(u, [G, H])
            })
        };
        var q = '<div class="ew-map-select-tool" style="position: relative;">';
        q += '        搜索：<input id="ew-map-select-input-search" class="layui-input icon-search inline-block" style="width: 190px;" placeholder="输入关键字搜索" autocomplete="off" />';
        q += '        <button id="ew-map-select-btn-ok" class="layui-btn icon-btn pull-right" type="button"><i class="layui-icon">&#xe605;</i>确定</button>';
        q += '        <div id="ew-map-select-tips" class="ew-map-select-search-list layui-hide">';
        q += "        </div>";
        q += "   </div>";
        q += '   <div class="layui-row ew-map-select">';
        q += '        <div class="layui-col-sm7 ew-map-select-map-group" style="position: relative;">';
        q += '             <div id="ew-map-select-map"></div>';
        q += '             <i id="ew-map-select-center-img2" class="layui-icon layui-icon-add-1"></i>';
        q += '             <img id="ew-map-select-center-img" src="https://3gimg.qq.com/lightmap/components/locationPicker2/image/marker.png" alt=""/>';
        q += "        </div>";
        q += '        <div id="ew-map-select-pois" class="layui-col-sm5 ew-map-select-search-list">';
        q += "        </div>";
        q += "   </div>";
        n.open({
            id: "ew-map-select", type: 1, title: p, area: "750px", content: q, success: function (D, F) {
                var E = h(D).children(".layui-layer-content");
                E.css("overflow", "visible");
                n.showLoading(E);
                if (undefined === window.AMap) {
                    h.getScript(s, function () {
                        i();
                        n.removeLoading(E)
                    })
                } else {
                    i();
                    n.removeLoading(E)
                }
            }
        })
    };
    n.cropImg = function (r) {
        var p = "image/jpeg";
        var w = r.aspectRatio;
        var x = r.imgSrc;
        var u = r.imgType;
        var s = r.onCrop;
        var t = r.limitSize;
        var v = r.acceptMime;
        var q = r.exts;
        var i = r.title;
        if (w === undefined) {
            w = 1
        }
        if (i === undefined) {
            i = "裁剪图片"
        }
        if (u) {
            p = u
        }
        layui.use(["Cropper", "upload"], function () {
            var z = layui.Cropper;
            var y = layui.upload;

            function A() {
                var D, E = h("#ew-crop-img");
                var F = {
                    elem: "#ew-crop-img-upload", auto: false, drag: false, choose: function (G) {
                        G.preview(function (I, J, H) {
                            p = J.type;
                            E.attr("src", H);
                            if (!x || !D) {
                                x = H;
                                A()
                            } else {
                                D.destroy();
                                D = new z(E[0], C)
                            }
                        })
                    }
                };
                if (t !== undefined) {
                    F.size = t
                }
                if (v !== undefined) {
                    F.acceptMime = v
                }
                if (q !== undefined) {
                    F.exts = q
                }
                y.render(F);
                if (!x) {
                    h("#ew-crop-img-upload").trigger("click");
                    return
                }
                var C = {aspectRatio: w, preview: "#ew-crop-img-preview"};
                D = new z(E[0], C);
                h(".ew-crop-tool").on("click", "[data-method]", function () {
                    var H = h(this).data(), I, G;
                    if (!D || !H.method) {
                        return
                    }
                    H = h.extend({}, H);
                    I = D.cropped;
                    switch (H.method) {
                        case"rotate":
                            if (I && C.viewMode > 0) {
                                D.clear()
                            }
                            break;
                        case"getCroppedCanvas":
                            if (p === "image/jpeg") {
                                if (!H.option) {
                                    H.option = {}
                                }
                                H.option.fillColor = "#fff"
                            }
                            break
                    }
                    G = D[H.method](H.option, H.secondOption);
                    switch (H.method) {
                        case"rotate":
                            if (I && C.viewMode > 0) {
                                D.crop()
                            }
                            break;
                        case"scaleX":
                        case"scaleY":
                            h(this).data("option", -H.option);
                            break;
                        case"getCroppedCanvas":
                            if (G) {
                                s && s(G.toDataURL(p));
                                n.closeDialog("#ew-crop-img")
                            } else {
                                k.msg("裁剪失败", {icon: 2, anim: 6})
                            }
                            break
                    }
                })
            }

            var B = '<div class="layui-row">';
            B += '        <div class="layui-col-sm8" style="min-height: 9rem;">';
            B += '             <img id="ew-crop-img" src="' + (x ? x : "") + '" style="max-width:100%;" alt=""/>';
            B += "        </div>";
            B += '        <div class="layui-col-sm4 layui-hide-xs" style="padding: 15px;text-align: center;">';
            B += '             <div id="ew-crop-img-preview" style="width: 100%;height: 9rem;overflow: hidden;display: inline-block;border: 1px solid #dddddd;"></div>';
            B += "        </div>";
            B += "   </div>";
            B += '   <div class="text-center ew-crop-tool" style="padding: 15px 10px 5px 0;">';
            B += '        <div class="layui-btn-group" style="margin-bottom: 10px;margin-left: 10px;">';
            B += '             <button title="放大" data-method="zoom" data-option="0.1" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-add-1"></i></button>';
            B += '             <button title="缩小" data-method="zoom" data-option="-0.1" class="layui-btn icon-btn" type="button"><span style="display: inline-block;width: 12px;height: 2.5px;background: rgba(255, 255, 255, 0.9);vertical-align: middle;margin: 0 4px;"></span></button>';
            B += "        </div>";
            B += '        <div class="layui-btn-group layui-hide-xs" style="margin-bottom: 10px;">';
            B += '             <button title="向左旋转" data-method="rotate" data-option="-45" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-refresh-1" style="transform: rotateY(180deg) rotate(40deg);display: inline-block;"></i></button>';
            B += '             <button title="向右旋转" data-method="rotate" data-option="45" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-refresh-1" style="transform: rotate(30deg);display: inline-block;"></i></button>';
            B += "        </div>";
            B += '        <div class="layui-btn-group" style="margin-bottom: 10px;">';
            B += '             <button title="左移" data-method="move" data-option="-10" data-second-option="0" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-left"></i></button>';
            B += '             <button title="右移" data-method="move" data-option="10" data-second-option="0" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-right"></i></button>';
            B += '             <button title="上移" data-method="move" data-option="0" data-second-option="-10" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-up"></i></button>';
            B += '             <button title="下移" data-method="move" data-option="0" data-second-option="10" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-down"></i></button>';
            B += "        </div>";
            B += '        <div class="layui-btn-group" style="margin-bottom: 10px;">';
            B += '             <button title="左右翻转" data-method="scaleX" data-option="-1" class="layui-btn icon-btn" type="button" style="position: relative;width: 41px;"><i class="layui-icon layui-icon-triangle-r" style="position: absolute;left: 9px;top: 0;transform: rotateY(180deg);font-size: 16px;"></i><i class="layui-icon layui-icon-triangle-r" style="position: absolute; right: 3px; top: 0;font-size: 16px;"></i></button>';
            B += '             <button title="上下翻转" data-method="scaleY" data-option="-1" class="layui-btn icon-btn" type="button" style="position: relative;width: 41px;"><i class="layui-icon layui-icon-triangle-d" style="position: absolute;left: 11px;top: 6px;transform: rotateX(180deg);line-height: normal;font-size: 16px;"></i><i class="layui-icon layui-icon-triangle-d" style="position: absolute; left: 11px; top: 14px;line-height: normal;font-size: 16px;"></i></button>';
            B += "        </div>";
            B += '        <div class="layui-btn-group" style="margin-bottom: 10px;">';
            B += '             <button title="重新开始" data-method="reset" class="layui-btn icon-btn" type="button"><i class="layui-icon layui-icon-refresh"></i></button>';
            B += '             <button title="选择图片" id="ew-crop-img-upload" class="layui-btn icon-btn" type="button" style="border-radius: 0 2px 2px 0;"><i class="layui-icon layui-icon-upload-drag"></i></button>';
            B += "        </div>";
            B += '        <button data-method="getCroppedCanvas" data-option="{ &quot;maxWidth&quot;: 4096, &quot;maxHeight&quot;: 4096 }" class="layui-btn icon-btn" type="button" style="margin-left: 10px;margin-bottom: 10px;"><i class="layui-icon">&#xe605;</i>完成</button>';
            B += "   </div>";
            n.open({
                title: i, area: "665px", type: 1, content: B, success: function (C, D) {
                    h(C).children(".layui-layer-content").css("overflow", "visible");
                    A()
                }
            })
        })
    };
    n.util = {
        Convert_BD09_To_GCJ02: function (p) {
            var r = (3.141592653589793 * 3000) / 180;
            var i = p.lng - 0.0065, t = p.lat - 0.006;
            var s = Math.sqrt(i * i + t * t) - 0.00002 * Math.sin(t * r);
            var q = Math.atan2(t, i) - 0.000003 * Math.cos(i * r);
            p.lng = s * Math.cos(q);
            p.lat = s * Math.sin(q);
            return p
        }, Convert_GCJ02_To_BD09: function (p) {
            var r = (3.141592653589793 * 3000) / 180;
            var i = p.lng, t = p.lat;
            var s = Math.sqrt(i * i + t * t) + 0.00002 * Math.sin(t * r);
            var q = Math.atan2(t, i) + 0.000003 * Math.cos(i * r);
            p.lng = s * Math.cos(q) + 0.0065;
            p.lat = s * Math.sin(q) + 0.006;
            return p
        }, animateNum: function (t, p, r, u) {
            p = p === null || p === undefined || p === true || p === "true";
            r = isNaN(r) ? 500 : r;
            u = isNaN(u) ? 100 : u;
            var s = function (x) {
                var v = "";
                for (var w = 0; w < x.length; w++) {
                    if (!isNaN(x.charAt(w))) {
                        return v
                    } else {
                        v += x.charAt(w)
                    }
                }
            }, i = function (x) {
                var v = "";
                for (var w = x.length - 1; w >= 0; w--) {
                    if (!isNaN(x.charAt(w))) {
                        return v
                    } else {
                        v = x.charAt(w) + v
                    }
                }
            }, q = function (w, v) {
                if (!v) {
                    return w
                }
                if (!/^[0-9]+.?[0-9]*$/.test(w)) {
                    return w
                }
                w = w.toString();
                return w.replace(w.indexOf(".") > 0 ? /(\d)(?=(\d{3})+(?:\.))/g : /(\d)(?=(\d{3})+(?:$))/g, "$1,")
            };
            h(t).each(function () {
                var B = h(this);
                var y = B.data("num");
                if (!y) {
                    y = B.text().replace(/,/g, "");
                    B.data("num", y)
                }
                var A = "INPUT,TEXTAREA".indexOf(B.get(0).tagName) >= 0;
                var H = s(y.toString());
                var E = i(y.toString());
                var G = y.toString().replace(H, "").replace(E, "");
                if (isNaN(G * 1) || G === "0") {
                    A ? B.val(y) : B.html(y);
                    console.error("not a number");
                    return
                }
                var v = G.split(".");
                var C = v[1] ? v[1].length : 0;
                var x = 0, D = G;
                if (Math.abs(D * 1) > 10) {
                    x = parseFloat(v[0].substring(0, v[0].length - 1) + (v[1] ? ".0" + v[1] : ""))
                }
                var z = (D - x) / u, F = 0;
                var w = setInterval(function () {
                    var I = H + q(x.toFixed(C), p) + E;
                    A ? B.val(I) : B.html(I);
                    x += z;
                    F++;
                    if (Math.abs(x) >= Math.abs(D * 1) || F > 5000) {
                        I = H + q(D, p) + E;
                        A ? B.val(I) : B.html(I);
                        clearInterval(w)
                    }
                }, r / u)
            })
        }, deepClone: function (s) {
            var i;
            var p = n.util.isClass(s);
            if (p === "Object") {
                i = {}
            } else {
                if (p === "Array") {
                    i = []
                } else {
                    return s
                }
            }
            for (var r in s) {
                if (!s.hasOwnProperty(r)) {
                    continue
                }
                var t = s[r], q = n.util.isClass(t);
                if (q === "Object") {
                    i[r] = arguments.callee(t)
                } else {
                    if (q === "Array") {
                        i[r] = arguments.callee(t)
                    } else {
                        i[r] = s[r]
                    }
                }
            }
            return i
        }, isClass: function (i) {
            if (i === null) {
                return "Null"
            }
            if (i === undefined) {
                return "Undefined"
            }
            return Object.prototype.toString.call(i).slice(8, -1)
        }, fullTextIsEmpty: function (s) {
            if (!s) {
                return true
            }
            var q = ["img", "audio", "video", "iframe", "object"];
            for (var p = 0; p < q.length; p++) {
                if (s.indexOf("<" + q[p]) > -1) {
                    return false
                }
            }
            var r = s.replace(/\s*/g, "");
            if (!r) {
                return true
            }
            r = r.replace(/&nbsp;/ig, "");
            if (!r) {
                return true
            }
            r = r.replace(/<[^>]+>/g, "");
            return !r
        }, removeStyle: function (p, i) {
            if (typeof i === "string") {
                i = [i]
            }
            h(p).each(function () {
                try {
                    var q = h(this).attr("style").split(";");
                    var u = "";
                    for (var t = 0; t < q.length; t++) {
                        if (!h.trim(q[t])) {
                            continue
                        }
                        var w = true;
                        var r = h.trim(q[t].split(":")[0]);
                        for (var s = 0; s < i.length; s++) {
                            if (!h.trim(i[s]) || r === h.trim(i[s])) {
                                w = false;
                                break
                            }
                        }
                        if (w) {
                            u += (h.trim(q[t]) + ";")
                        }
                    }
                    h(this).attr("style", u)
                } catch (v) {
                }
            })
        }, scrollTop: function (i) {
            if (!i) {
                i = h("html,body")
            } else {
                i = h(i)
            }
            i.animate({scrollTop: 0}, 300)
        }, tpl: function (q, r, i, s) {
            if (q === undefined || q === null || typeof q !== "string") {
                return q
            }
            if (!r) {
                r = {}
            }
            if (!i) {
                i = "{{"
            }
            if (!s) {
                s = "}}"
            }
            var p = {
                exp: function (t) {
                    return new RegExp(t, "g")
                }, query: function (v, t, w) {
                    var u = ["#([\\s\\S])+?", "([^{#}])*?"][v || 0];
                    return p.exp((t || "") + i + u + s + (w || ""))
                }, escape: function (t) {
                    return String(t || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
                }, error: function (u, t) {
                    console.error("Laytpl Error：" + u + "\n" + (t || ""))
                }, parse: function (u, v) {
                    var t = u;
                    try {
                        var x = p.exp("^" + i + "#"), y = p.exp(s + "$");
                        u = u.replace(p.exp(i + "#"), i + "# ").replace(p.exp(s + "}"), "} " + s).replace(/\\/g, "\\\\").replace(p.exp(i + "!(.+?)!" + s), function (z) {
                            z = z.replace(p.exp("^" + i + "!"), "").replace(p.exp("!" + s), "").replace(p.exp(i + "|" + s), function (A) {
                                return A.replace(/(.)/g, "\\$1")
                            });
                            return z
                        }).replace(/(?="|')/g, "\\").replace(p.query(), function (z) {
                            z = z.replace(x, "").replace(y, "");
                            return '";' + z.replace(/\\/g, "") + ';view+="'
                        }).replace(p.query(1), function (z) {
                            var A = '"+(';
                            if (z.replace(/\s/g, "") === i + s) {
                                return ""
                            }
                            z = z.replace(p.exp(i + "|" + s), "");
                            if (/^=/.test(z)) {
                                z = z.replace(/^=/, "");
                                A = '"+_escape_('
                            }
                            return A + z.replace(/\\/g, "") + ')+"'
                        }).replace(/\r\n/g, '\\r\\n" + "').replace(/\n/g, '\\n" + "').replace(/\r/g, '\\r" + "');
                        u = '"use strict";var view = "' + u + '";return view;';
                        u = new Function("d, _escape_", u);
                        return u(v, p.escape)
                    } catch (w) {
                        p.error(w, t);
                        return t
                    }
                }
            };
            return p.parse(q, r)
        }
    };
    n.lockScreen = function (q) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.lockScreen(q)
        }
        if (!q) {
            q = "page/tpl/tpl-lock-screen.html"
        }
        var i = h("#ew-lock-screen-group");
        if (i.length > 0) {
            i.fadeIn("fast");
            n.isLockScreen = true;
            n.putTempData("isLockScreen", n.isLockScreen, true)
        } else {
            var p = k.load(2);
            n.ajax({
                url: q, dataType: "html", success: function (r) {
                    k.close(p);
                    if (typeof r === "string") {
                        h("body").append('<div id="ew-lock-screen-group">' + r + "</div>");
                        n.isLockScreen = true;
                        n.putTempData("isLockScreen", n.isLockScreen, true);
                        n.putTempData("lockScreenUrl", q, true)
                    } else {
                        console.error(r);
                        k.msg(JSON.stringify(r), {icon: 2})
                    }
                }
            })
        }
    };
    n.unlockScreen = function (p) {
        if (window !== top && !n.isTop() && top.layui && top.layui.admin) {
            return top.layui.admin.unlockScreen(p)
        }
        var i = h("#ew-lock-screen-group");
        p ? i.remove() : i.fadeOut("fast");
        n.isLockScreen = false;
        n.putTempData("isLockScreen", null, true)
    };
    n.putSetting = function (i, p) {
        d[i] = p;
        n.putTempData(i, p, true)
    };
    n.recoverState = function () {
        if (n.getTempData("isLockScreen", true)) {
            n.lockScreen(n.getTempData("lockScreenUrl", true))
        }
        if (d.defaultTheme) {
            n.changeTheme(d.defaultTheme, window, true, true)
        }
        if (d.closeFooter) {
            h("body").addClass("close-footer")
        }
        if (d.navArrow !== undefined) {
            var i = h(e + ">.layui-nav-tree");
            i.removeClass("arrow2 arrow3");
            if (d.navArrow) {
                i.addClass(d.navArrow)
            }
        }
        if (d.pageTabs && d.tabAutoRefresh) {
            h(l).attr("lay-autoRefresh", "true")
        }
    };
    n.on = function (i, p) {
        return layui.onevent.call(this, "admin", i, p)
    };
    var m = ".layui-layout-admin.admin-nav-mini>.layui-side .layui-nav .layui-nav-item";
    h(document).on("mouseenter", m + "," + m + " .layui-nav-child>dd", function () {
        if (n.getPageWidth() > 768) {
            var p = h(this), r = p.find(">.layui-nav-child");
            if (r.length > 0) {
                p.addClass("admin-nav-hover");
                r.css("left", p.offset().left + p.outerWidth());
                var q = p.offset().top;
                if (q + r.outerHeight() > n.getPageHeight()) {
                    q = q - r.outerHeight() + p.outerHeight();
                    if (q < 60) {
                        q = 60
                    }
                    r.addClass("show-top")
                }
                r.css("top", q);
                r.addClass("ew-anim-drop-in")
            } else {
                if (p.hasClass("layui-nav-item")) {
                    var i = p.find("cite").text();
                    k.tips(i, p, {
                        tips: [2, "#303133"], time: -1, success: function (s) {
                            h(s).css("margin-top", "12px")
                        }
                    })
                }
            }
        }
    }).on("mouseleave", m + "," + m + " .layui-nav-child>dd", function () {
        k.closeAll("tips");
        var p = h(this);
        p.removeClass("admin-nav-hover");
        var i = p.find(">.layui-nav-child");
        i.removeClass("show-top ew-anim-drop-in");
        i.css({"left": "auto", "top": "auto"})
    });
    h(document).on("click", "*[ew-event]", function () {
        var i = h(this).attr("ew-event");
        var p = n.events[i];
        p && p.call(this, h(this))
    });
    h(document).on("mouseenter", "*[lay-tips]", function () {
        var i = h(this);
        n.tips({
            elem: this,
            text: i.attr("lay-tips"),
            direction: i.attr("lay-direction"),
            bg: i.attr("lay-bg"),
            offset: i.attr("lay-offset"),
            padding: i.attr("lay-padding"),
            color: i.attr("lay-color"),
            bgImg: i.attr("lay-bgImg"),
            fontSize: i.attr("lay-fontSize")
        })
    }).on("mouseleave", "*[lay-tips]", function () {
        k.closeAll("tips")
    });
    n.tips = function (i) {
        k.tips(i.text, i.elem, {
            tips: [i.direction || 1, i.bg || "#303133"],
            tipsMore: i.tipsMore,
            time: i.time || -1,
            success: function (p) {
                var q = h(p).children(".layui-layer-content");
                if (i.padding || i.padding === 0) {
                    q.css("padding", i.padding)
                }
                if (i.color) {
                    q.css("color", i.color)
                }
                if (i.bgImg) {
                    q.css("background-image", i.bgImg)
                }
                if (i.fontSize) {
                    q.css("font-size", i.fontSize)
                }
                if (!i.offset) {
                    return
                }
                var t = i.offset.split(",");
                var s = t[0], r = t.length > 1 ? t[1] : undefined;
                if (s) {
                    h(p).css("margin-top", s)
                }
                if (r) {
                    h(p).css("margin-left", r)
                }
            }
        })
    };
    h(document).on("click", ".form-search-expand,[search-expand]", function () {
        var s = h(this);
        var p = s.parents(".layui-form").first();
        var q = s.data("expand");
        var t = s.attr("search-expand");
        if (q === undefined || q === true) {
            q = true;
            s.data("expand", false);
            h(this).html('收起 <i class="layui-icon layui-icon-up"></i>');
            var i = p.find(".form-search-show-expand");
            i.attr("expand-show", "");
            i.removeClass("form-search-show-expand")
        } else {
            q = false;
            s.data("expand", true);
            h(this).html('展开 <i class="layui-icon layui-icon-down"></i>');
            p.find("[expand-show]").addClass("form-search-show-expand")
        }
        if (!t) {
            return
        }
        try {
            new Function("d", t)({expand: q, elem: s})
        } catch (r) {
            console.error(r)
        }
    });
    h(document).on("click", "*[ew-href]", function () {
        var i = h(this).attr("ew-href");
        var q = h(this).attr("ew-title");
        if (!q) {
            q = h(this).text()
        }
        var p = h(this).data("window");
        p ? (p = n.strToWin(p)) : (p = top);
        if (p.layui && p.layui.index) {
            p.layui.index.openTab({title: q ? q : "", url: i})
        } else {
            location.href = i
        }
    });
    if (!layui.contextMenu) {
        h(document).off("click.ctxMenu").on("click.ctxMenu", function () {
            try {
                var s = top.window.frames;
                for (var p = 0; p < s.length; p++) {
                    var q = s[p];
                    try {
                        if (q.layui && q.layui.jquery) {
                            q.layui.jquery("body>.ctxMenu").remove()
                        }
                    } catch (r) {
                    }
                }
                try {
                    if (top.layui && top.layui.jquery) {
                        top.layui.jquery("body>.ctxMenu").remove()
                    }
                } catch (r) {
                }
            } catch (r) {
            }
        })
    }
    if (layui.device().ios) {
        h("body").addClass("ios-iframe-body")
    }
    d = h.extend({
        pageTabs: true,
        cacheTab: true,
        defaultTheme: "",
        openTabCtxMenu: true,
        maxTabNum: 20,
        tableName: "easyweb-iframe",
        apiNoCache: true,
        ajaxSuccessBefore: function (p, i, q) {
            return n.ajaxSuccessBefore ? n.ajaxSuccessBefore(p, i, q) : true
        },
        getAjaxHeaders: function (p, i, q) {
            return n.getAjaxHeaders ? n.getAjaxHeaders(p, i, q) : []
        }
    }, d);
    var a = n.getTempData(true);
    if (a) {
        var o = ["pageTabs", "cacheTab", "defaultTheme", "navArrow", "closeFooter", "tabAutoRefresh"];
        for (var g = 0; g < o.length; g++) {
            if (a[o[g]] !== undefined) {
                d[o[g]] = a[o[g]]
            }
        }
    }
    n.recoverState();
    n.setter = d;
    f("admin", n)
});