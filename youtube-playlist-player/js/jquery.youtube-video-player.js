(function($) {
    $.youtubeVideo = function(k, o) {
        var p = this;
        p.$el = $(k);
        p.el = k;
        p.$el.data("youtubeVideo", p);
        p.init = function() {
            p.options = $.extend({}, $.youtubeVideo.defaultOptions, o);
            p.options_copy = $.extend({}, $.youtubeVideo.defaultOptions, o);
            p.apiKey = p.options.apiKey;
            p.$el.addClass("yesp");
            p.$logo = [];
            p.type = false;
            if (p.options.playlist !== false) {
                p.id = "yt_player_" + p.options.playlist.replace(/[^a-z0-9]/ig, "");
                p.type = "playlist"
            } else if (p.options.channel !== false) {
                p.id = "yt_player_" + p.options.channel.replace(/[^a-z0-9]/ig, "");
                p.type = "channel"
            } else if (p.options.user !== false) {
                p.id = "yt_player_" + p.options.user.replace(/[^a-z0-9]/ig, "");
                p.type = "user"
            } else if (p.options.videos !== false) {
                if (typeof(p.options.videos) == "string") {
                    p.options.videos = [p.options.videos]
                }
                p.id = "yt_player_" + p.options.videos[0].replace(/[^a-z0-9]/ig, "");
                p.type = "videos"
            } else {
                p.displayError('No playlist/channel/user/videos entered. Set at least 1.', true);
                return
            }
            if (p.options.shadow) {
                p.$el.addClass("yesp-shadow")
            }
            if (typeof(p.options.playerId) !== typeof(undefined) && p.options.playerId !== false) {
                p.id = p.options.playerId
            }
            if (typeof p.$el.attr("id") !== typeof undefined && p.$el.attr("id") !== false) {
                p.id = p.$el.attr("id")
            } else {
                p.$el.attr("id", p.id)
            }
            if (p.options.maxResults > 50) {
                p.options.maxResults = 50
            }
            p.$controls = [];
            p.$title = null;
            p.$container = p.$el.find(".yesp-container");
            p.youtube = null;
            p.playlistItems = [];
            p.playlistCount = 0;
            p.info = {
                "width": 0,
                "height": 0,
                "duration": 0,
                "currentTime": 0,
                "previousTime": 0,
                "volume": p.options.volume,
                "timeDrag": false,
                "volumeDrag": false,
                "ie": p.detectIe(),
                "iePreviousTime": 0,
                "touch": p.detectTouch(),
                "youtubeLoaded": false,
                "ios": (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
                "mobile": (navigator.userAgent.match(/(Android|webOS|iPad|iPhone|iPod|BlackBerry|Windows Phone)/g) ? true : false),
                "ipad": (navigator.userAgent.match(/(iPad)/g) ? true : false),
                "state": false,
                "index": 0,
                "hover": true,
                "fullscreen": false,
                "idleTime": 0,
                "idleControlsHidden": false,
                "playlistShown": true,
                "horizontalPlaylistShown": true,
                "playlistWidth": 200,
                "playlistAnimating": false,
                "firstPlay": false,
                "currentVideoUrl": "",
                "nextPageToken": false,
                "playlistI": 0,
                "alternativeApiReadyCheck": false,
                "youtubeLogoTimer": false
            };
            if (p.info.ios) {
                p.$el.addClass("yesp-ios");
                p.options.volumeControl = false;
                p.options_copy.volumeControl = false
            }
            if (p.info.mobile) {
                p.$el.addClass("yesp-mobile");
                p.options.showControlsOnLoad = true;
                p.options.showControlsOnPause = true;
                p.options.showControlsOnPlay = true
            }
            if (p.info.ie) {
                p.$el.addClass('yesp-ie')
            }
            if (!p.$el[0].requestFullScreen && !p.$el[0].mozRequestFullScreen && !p.$el[0].webkitRequestFullScreen) {
                p.options.fullscreenControl = false
            }
            p.createPlayerElement();
            p.initPlaylist();
            p.createControls();
            p.createTitle();
            p.createOverlays();
            p.showControls();
            p.bindControls();
            $(window).on("resize", p.resize);
            p.resize();
            p.initTimeSlider();
            p.initVolumeSlider();
            p.setStyle();
            if (p.options.width !== false) {
                p.$el.css("width", p.options.width);
                p.resize()
            }
            if (!p.options.showControlsOnLoad) {
                p.hideControls()
            }
            if (p.options.playlistType === "horizontal") {
                p.hidePlaylist(true);
                if (!p.options.showPlaylist) {
                    p.hideHorizontalPlaylist()
                } else {
                    p.showHorizontalPlaylist()
                }
            } else {
                p.hideHorizontalPlaylist();
                if (!p.options.showPlaylist) {
                    p.hidePlaylist(true)
                }
            }
            document.addEventListener("fullscreenchange", function() {
                if (!document.fullscreen) {
                    p.exitFullscreen()
                }
            }, false);
            document.addEventListener("mozfullscreenchange", function() {
                if (!document.mozFullScreen) {
                    p.exitFullscreen()
                }
            }, false);
            document.addEventListener("webkitfullscreenchange", function() {
                if (!document.webkitIsFullScreen) {
                    p.exitFullscreen()
                }
            }, false);
            document.addEventListener("msfullscreenchange", function() {
                if (!document.msFullscreenElement) {
                    p.exitFullscreen()
                }
            }, false);
            setInterval(function() {
                if (p.info.mobile) {
                    return
                }
                p.info.idleTime += 500;
                if (p.info.fullscreen && p.info.idleTime > 2000) {
                    p.info.idleControlsHidden = true;
                    p.hideControls(true)
                }
            }, 500);
            p.$el.mousemove(function(e) {
                p.info.idleTime = 0;
                if (p.info.idleControlsHidden && p.info.fullscreen) {
                    p.info.idleControlsHidden = false;
                    p.showControls()
                }
            });
            p.$el.keypress(function(e) {
                p.info.idleTime = 0;
                if (p.info.idleControlsHidden && p.info.fullscreen) {
                    p.info.idleControlsHidden = false;
                    p.showControls()
                }
            });
            if (p.info.touch) {
                p.$el.addClass("yesp-touch")
            }
            setTimeout(function() {
                p.info.alternativeApiReadyCheck = true
            }, 1000)
        };
        p.displayError = function(a, b) {
            var c = p.$el.find(".yesp-error").html('<i class="fa fa-warning"></i> ' + a).slideDown();
            if (c.length === 0) {
                alert(a)
            }
            if (b === true) {
                p.$el.find(".yesp-video").remove();
                p.$el.find(".yesp-container, .yesp-hp").css("background-image", "none")
            }
        };
        p.removeNextPage = function() {
            p.info.nextPageToken = false;
            p.$el.find(".yesp-next-page").remove();
            p.$el.find(".yesp-hp-next-page").remove();
            p.$el.find(".yesp-hp-videos").css("width", (p.playlistCount) * 160)
        };
        p.getPlaylistNext = function() {
            if (p.info.nextPageToken === false) {
                p.removeNextPage();
                return
            }
            p.$el.find(".yesp-next-page").html('<i class="fa-spinner fa-spin"></i>');
            p.getPlaylist(p.info.nextPageToken, p.options.playlist)
        };
        p.getPlaylist = function(d, e) {
            if (typeof(d) === typeof(undefined) || d === false) {
                d = false;
                through_pagination = false
            } else {
                through_pagination = true
            }
            var f = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=' + p.options.maxResults + '&playlistId=' + e + '&key=' + p.options.apiKey;
            if (through_pagination === true) {
                f += '&pageToken=' + d
            }
            var r = $.getJSON(f, function(a) {
                if (typeof(a.items) !== 'undefined') {
                    if (a.items.length === 0) {
                        p.displayError('This playlist is empty.', true)
                    }
                    if (p.options.shuffle) {
                        a.items = p.shuffleArray(a.items)
                    }
                    var b = p.createPlaylist(through_pagination, a.items, a.items.length);
                    p.playlistItems = p.playlistItems.concat(b.items);
                    p.playlistCount += b.count;
                    if (p.options.pagination === true) {
                        if (typeof(a.nextPageToken) === typeof(undefined)) {
                            p.removeNextPage()
                        } else {
                            p.info.nextPageToken = a.nextPageToken;
                            p.$el.find(".yesp-next-page").html('<i class="fa fa-plus"></i>' + p.options.loadMoreText).show()
                        }
                    } else {
                        p.info.nextPageToken = false
                    }
                    if (p.playlistCount < 2 && !through_pagination && p.info.nextPageToken === false) {
                        p.hidePlaylist(true);
                        p.options.showPlaylist = false;
                        p.options.playlistToggleControl = false;
                        p.$controls['playlist_toggle'].hide();
                        p.options.fwdBckControl = false;
                        p.options_copy.fwdBckControl = false;
                        p.$controls['forward'].hide();
                        p.$controls['backward'].hide();
                        p.resize();
                        if (p.playlistCount === 0) {
                            p.displayError('This playlist is empty.', true)
                        }
                    }
                } else {
                    p.displayError('An error occured while retrieving the playlist.', true)
                }
            });
            r.fail(function(a) {
                var b = 'An error occured while retrieving the playlist.';
                if (typeof(a.responseText) !== typeof(undefined)) {
                    var c = $.parseJSON(a.responseText);
                    if (c.error.code == '404') {
                        b = 'The playlist was not found.'
                    } else if (c.error.code == '403') {
                        b = c.error.message
                    } else if (c.error.code == '400') {
                        b = 'The API key you have entered is invalid.'
                    } else {
                        b = 'An error occured while retrieving the playlist.<br /><em>' + c.error.message + '</em>'
                    }
                }
                p.displayError(b, true);
                p.hidePlaylist(true)
            })
        };
        p.getChannel = function(c, d) {
            var e = "";
            if (c === "user") {
                e = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&maxResults=' + p.options.maxResults + '&forUsername=' + encodeURIComponent(d) + '&key=' + p.apiKey
            } else {
                e = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&maxResults=' + p.options.maxResults + '&id=' + d + '&key=' + p.apiKey
            }
            $.getJSON(e, function(a) {
                if (typeof(a.items) !== undefined && a.items.length == 1) {
                    var b = a.items[0].contentDetails.relatedPlaylists.uploads;
                    p.options.playlist = b;
                    p.getPlaylist(false, p.options.playlist)
                } else {
                    p.displayError('An error occured while retrieving the channel/user.', true)
                }
            })
        };
        p.getVideos = function(c) {
            var d = '',
                l = c.length;
            for (var i = 0; i < l; i++) {
                if (i !== l - 1) {
                    d += c[i] + ","
                } else {
                    d += c[i]
                }
            }
            var e = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,status&maxResults=' + p.options.maxResults + '&id=' + d + '&key=' + p.apiKey;
            $.getJSON(e, function(a) {
                if (typeof(a.items) !== 'undefined') {
                    for (var i = 0; i < a.items.length; i++) {
                        a.items[i].snippet.resourceId = {
                            videoId: a.items[i].id
                        }
                    }
                    var b = p.createPlaylist(false, a.items, a.items.length);
                    p.playlistItems = p.playlistItems.concat(b.items);
                    p.playlistCount += b.count;
                    if (p.playlistCount < 2) {
                        p.hidePlaylist(true);
                        p.options.showPlaylist = false;
                        p.options.playlistToggleControl = false;
                        p.$controls['playlist_toggle'].hide();
                        p.options.fwdBckControl = false;
                        p.options_copy.fwdBckControl = false;
                        p.$controls['forward'].hide();
                        p.$controls['backward'].hide();
                        p.resize();
                        if (p.playlistCount === 0) {
                            p.displayError('This playlist is empty, or the video\'s were not found.', true)
                        }
                    }
                } else {
                    p.displayError('An error occured while retrieving the video(s).', true)
                }
            });
            return
        };
        p.initPlaylist = function() {
            if (p.type === "playlist") {
                p.getPlaylist(false, p.options.playlist);
                return
            }
            if (p.type == "channel") {
                p.getChannel("channel", p.options.channel);
                return
            }
            if (p.type == "user") {
                p.getChannel("user", p.options.user);
                return
            }
            if (p.type == "videos") {
                p.getVideos(p.options.videos);
                return
            }
        };
        p.createPlaylist = function(a, b, c) {
            if (!a) {
                p.createYoutubeElement()
            }
            var i = 0;
            while (typeof(b[i]) !== "undefined") {
                if (b[i].status.privacyStatus == "private") {
                    b.splice(i, 1);
                    c--;
                    continue
                }
                if (typeof(b[i].snippet.thumbnails) == typeof(undefined)) {
                    b.splice(i, 1);
                    c--;
                    continue
                }
                i++
            }
            p.options.onDoneLoading(b);
            for (p.info.playlistI; p.info.playlistI < p.playlistCount + c; p.info.playlistI++) {
                var d = b[p.info.playlistI - p.playlistCount],
                    img_src = "";
                if (typeof(d.snippet.thumbnails.medium) !== "undefined" && d.snippet.thumbnails.medium.width / d.snippet.thumbnails.medium.height == 16 / 9) {
                    img_src = d.snippet.thumbnails.medium.url
                } else if (typeof(d.snippet.thumbnails.medium) !== "undefined") {
                    img_src = d.snippet.thumbnails.medium.url
                } else if (typeof(d.snippet.thumbnails.high) !== "undefined") {
                    img_src = d.snippet.thumbnails.high.url
                } else if (typeof(d.snippet.thumbnails.default) !== "undefined") {
                    img_src = d.snippet.thumbnails.default.url
                }
                var f = d.snippet.title;
                if (d.snippet.title.length > 80) {
                    d.snippet.title = d.snippet.title.substr(0, 80) + "..."
                }
                if (d.snippet.channelTitle.length > 20) {
                    d.snippet.channelTitle = d.snippet.channelTitle.substr(0, 20) + "..."
                }
                var g = $('					<div class="yesp-playlist-video" data-playing="0" data-index="' + p.info.playlistI + '">						<img src="' + img_src + '" width="200" />						<div class="yesp-playlist-overlay">							<div class="yesp-playlist-title">' + d.snippet.title + '</div>							<div class="yesp-playlist-channel">' + d.snippet.channelTitle + '</div>						</div>						<div class="yesp-playlist-current">							<i class="fa fa-play"></i>							<span>' + p.options.nowPlayingText + '</span>						</div>					</div>');
                g.click(function(e) {
                    e.preventDefault();
                    if (!p.options.showControlsOnPlay) {
                        p.hideControls()
                    }
                    p.playVideo(parseFloat($(this).attr('data-index')))
                });
                if (p.options.showChannelInPlaylist == false) {
                    g.find('.yesp-playlist-channel').remove()
                }
                g.insertBefore(p.$el.find(".yesp-playlist .yesp-next-page"));
                p.$el.find(".yesp-playlist, .yesp-hp").css("background-image", "none");
                var h = d.snippet.title;
                if (h.length > 45) {
                    h = d.snippet.title.substring(0, 45) + "..."
                }
                var j = $('					<div class="yesp-hp-video" data-playing="0" data-index="' + p.info.playlistI + '">						<img src="' + img_src + '" width="200" />						<div class="yesp-hp-overlay">							<div class="yesp-hp-title">' + h + '</div>							<div class="yesp-hp-channel">' + d.snippet.channelTitle + '</div>						</div>						<div class="yesp-hp-current">							<i class="fa fa-play"></i>							<span>' + p.options.nowPlayingText + '</span>						</div>					</div>');
                j.click(function(e) {
                    e.preventDefault();
                    if (!p.options.showControlsOnPlay) {
                        p.hideControls()
                    }
                    p.playVideo(parseFloat($(this).attr("data-index")))
                });
                if (p.options.showChannelInPlaylist == false) {
                    j.find(".yesp-hp-channel").remove()
                }
                j.insertBefore(p.$el.find(".yesp-hp .yesp-hp-next-page"))
            }
            p.$el.find(".yesp-hp-videos").css("width", (p.info.playlistI) * 160 + 50);
            if (a === false) {
                p.$el.find(".yesp-playlist").perfectScrollbar({
                    "suppressScrollX": true
                });
                p.$el.find('.yesp-hp').perfectScrollbar({
                    "suppressScrollY": true,
                    "useBothWheelAxes": true
                });
                p.resize(false, true)
            }
            if (a === true) {
                setTimeout(function() {
                    p.updateScrollPosition(false, Math.floor(p.info.playlistWidth / 16 * 9) * (p.playlistCount - c))
                }, 10)
            }
            return {
                "items": b,
                "count": c,
            }
        };
        p.checkYoutubeApiReady = function() {
            if (!p.info.alternativeApiReadyCheck) {
                if (!$("body").hasClass("yesp-youtube-iframe-ready")) {
                    return false
                }
            } else {
                if (typeof(YT) !== typeof({})) {
                    return false
                }
                if (YT.loaded == 0) {
                    return false
                }
            }
            return true
        };
        p.createYoutubeElement = function() {
            if (!p.checkYoutubeApiReady()) {
                setTimeout(p.createYoutubeElement, 10);
                return
            }
            if (p.info.youtubeLoaded) {
                return
            }
            p.info.youtubeLoaded = true;
            var a = {
                "controls": 0,
                "showinfo": 0,
                "fullscreen": 0,
                "iv_load_policy": p.options.showAnnotations ? 1 : 3,
                "fs": 0,
                "wmode": "opaque"
            };
            if (p.options.forceHD) {
                a.vq = "hd720"
            }
            if (p.options.hideYoutubeLogo) {
                a.modestbranding = 1
            }
            for (var i in p.options.playerVars) {
                a[i] = p.options.playerVars[i]
            }
            window.YTConfig = {
                "host": "https://www.youtube.com"
            };
            p.youtube = new YT.Player(p.id + "_yt", {
                playerVars: a,
                events: {
                    "onReady": p.youtubeReady,
                    "onStateChange": p.youtubeStateChange
                }
            })
        };
        p.youtubeReady = function() {
            setInterval(p.youtube_player_updates, 500);
            if (p.playlistCount == 0) {
                return
            }
            p.playVideo(p.options.firstVideo, !p.options.autoplay, true);
            if (p.options.volume !== false) {
                p.updateVolume(0, p.options.volume)
            }
            p.$el.find(".yesp-container").hover(function() {
                p.info.hover = true;
                p.showControls()
            }, function() {
                p.info.hover = false;
                var s = p.youtube.getPlayerState();
                if (p.options.showControlsOnPause && (s == -1 || s == 0 || s == 2 || s == 5)) {} else if (p.options.showControlsOnPlay) {} else {
                    p.hideControls()
                }
                p.hideShare()
            })
        };
        p.youtube_player_updates = function() {
            p.info.currentTime = p.youtube.getCurrentTime();
            if (!p.youtube.getCurrentTime()) {
                p.info.currentTime = 0
            }
            p.info.duration = p.youtube.getDuration();
            if (!p.info.duration) {
                return
            }
            if (p.info.currentTime == p.info.previousTime) {
                return
            }
            p.info.previousTime = p.info.currentTime;
            if (p.options.timeIndicator == "full") {
                p.$controls["time"].html(p.formatTime(p.info.currentTime) + " / " + p.formatTime(p.info.duration))
            } else {
                p.$controls["time"].html(p.formatTime(p.info.currentTime))
            }
            var s = Math.round(p.info.currentTime);
            if (s == 0) {
                p.$controls["youtube"].attr("href", p.$controls["youtube"].attr("data-href"))
            } else {
                p.$controls["youtube"].attr("href", p.$controls['youtube'].attr("data-href") + "#t=" + s)
            }
            p.info.currentVideoUrl = p.$controls["youtube"].attr("data-href");
            var a = 100 * p.info.currentTime / p.info.duration;
            p.$controls["time_bar_time"].css("width", a + "%");
            p.$controls["time_bar_buffer"].css("width", p.youtube.getVideoLoadedFraction() * 100 + "%");
            p.options.onTimeUpdate(p.info.currentTime)
        };
        p.youtubeStateChange = function(e) {
            var a = e.data;
            if (a == 0) {
                if (p.options.continuous) {
                    p.forward()
                } else {
                    p.playVideo(p.info.index, true);
                    p.$controls["play"].find("i").removeClass("fa-play").removeClass("fa-pause").addClass("fa-undo");
                    p.showControls()
                }
            } else if (a == 1 || a == 3) {
                p.$controls["play"].find("i").removeClass("fa-play").addClass("fa-pause").removeClass("fa-undo")
            } else if (a == 2) {
                p.$controls["play"].find("i").addClass("fa-play").removeClass("fa-pause").removeClass("fa-undo")
            }
            if (!p.info.firstPlay && a !== -1 && a !== 5) {
                p.info.firstPlay = true
            }
            p.youtube_player_updates();
            p.options.onStateChange(a)
        };
        p.createPlayerElement = function() {
            p.$el.css("width", "100%").addClass("yesp").html('				<div class="yesp-container">					<div class="yesp-autoposter">						<div class="yesp-autoposter-icon">							<div></div>						</div>					</div>					<div class="yesp-video-container">						<div class="yesp-video" id="' + p.id + '_yt"></div>						<div class="yesp-error"></div>					</div>				</div>				<div class="yesp-playlist">					<div class="yesp-next-page"><i class="fa fa-plus"></i>Load More</div>				</div>				<div class="yesp-hp">					<div class="yesp-hp-videos">						<div class="yesp-hp-next-page"><i class="fa fa-plus"></i></div>					</div>				</div>');
            p.$el.find(".yesp-video-container").click(function(e) {
                p.playPause()
            });
            if (p.options.playlistType == "horizontal") {
                p.$el.find(".yesp-playlist").remove()
            }
            p.$el.find(".yesp-next-page, .yesp-hp-next-page").click(function(e) {
                p.getPlaylistNext()
            });
            p.$el.find(".yesp-autoposter").click(function(e) {
                e.preventDefault();
                p.play()
            })
        };
        p.createControls = function() {
            var a = $('<div class="yesp-controls"></div>');
            a.html('				<div class="yesp-controls-wrapper">					<a href="#" class="yesp-play"><i class="fa fa-play"></i></a>					<div class="yesp-time">00:00 / 00:00</div>					<div class="yesp-bar">						<div class="yesp-bar-buffer"></div>						<div class="yesp-bar-time"></div>					</div>					<div class="yesp-volume">						<a href="#" class="yesp-volume-icon" title="Toggle Mute"><i class="fa fa-volume-up"></i></a>						<div class="yesp-volume-bar">							<div class="yesp-volume-amount"></div>						</div>					</div>					<a href="#" class="yesp-share" title="Share"><i class="fa fa-share-square-o"></i></a>					<a href="#" target="_blank" class="yesp-youtube" title="Open in Youtube"><i class="fa fa-youtube-play"></i></a>					<a href="#" class="yesp-backward" title="Previous Video"><i class="fa fa-backward"></i></a>					<a href="#" class="yesp-forward" title="Forward Video"><i class="fa fa-forward"></i></a>					<a href="#" class="yesp-playlist-toggle yesp-rotate-180" title="Toggle Playlist"><i class="fa fa-align-justify"></i></a>					<a href="#" class="yesp-fullscreen" title="Toggle Fullscreen"><i class="fa fa-expand"></i></a>				</div>');
            p.$controls["play"] = a.find(".yesp-play");
            p.$controls["time"] = a.find(".yesp-time");
            p.$controls["time_bar"] = a.find(".yesp-bar");
            p.$controls["time_bar_buffer"] = a.find(".yesp-bar-buffer");
            p.$controls["time_bar_time"] = a.find(".yesp-bar-time");
            p.$controls["volume"] = a.find(".yesp-volume");
            p.$controls["volume_icon"] = a.find(".yesp-volume-icon");
            p.$controls["volume_bar"] = a.find(".yesp-volume-bar");
            p.$controls["volume_amount"] = a.find(".yesp-volume-amount");
            p.$controls["share"] = a.find(".yesp-share");
            p.$controls["youtube"] = a.find(".yesp-youtube");
            p.$controls["forward"] = a.find(".yesp-forward");
            p.$controls["backward"] = a.find(".yesp-backward");
            p.$controls["playlist_toggle"] = a.find(".yesp-playlist-toggle");
            p.$controls["fullscreen"] = a.find(".yesp-fullscreen");
            if (!p.options.playControl) {
                p.$controls["play"].hide()
            }
            if (!p.options.timeIndicator) {
                p.$controls["time"].hide()
            } else if (p.options.timeIndicator == "full") {
                p.$controls["time"].addClass("yesp-full-time")
            }
            if (!p.options.volumeControl) {
                p.$controls["volume"].hide()
            }
            if (!p.options.shareControl) {
                p.$controls["share"].hide()
            }
            if (!p.options.youtubeLinkControl) {
                p.$controls["youtube"].hide()
            }
            if (!p.options.fwdBckControl) {
                p.$controls["backward"].hide();
                p.$controls["forward"].hide()
            }
            if (!p.options.fullscreenControl) {
                p.$controls["fullscreen"].hide()
            }
            if (!p.options.playlistToggleControl) {
                p.$controls["playlist_toggle"].hide()
            }
            a.appendTo(this.$el.find(".yesp-container"));
            p.$logo = $('<a href="#" target="_blank" class="yesp-youtube-logo"></a>');
            p.$logo.appendTo(this.$el.find(".yesp-container"));
            if (p.options.hideYoutubeLogo || p.info.mobile) {
                p.$logo.hide();
                p.options.hideYoutubeLogo = true
            }
        };
        p.createTitle = function() {
            p.$title = $('<div class="yesp-title"></div>');
            p.$title.html('<div class="yesp-title-wrapper"></div>');
            p.$title.appendTo(p.$el.find(".yesp-container"))
        };
        p.updateTitle = function(a, b, c) {
            if (p.options.showChannelInTitle) {
                p.$title.find("div.yesp-title-wrapper").html('<a href="' + c + '" target="_blank" class="yesp-subtitle">' + b + '</a>' + a)
            } else {
                p.$title.find("div.yesp-title-wrapper").html(a)
            }
        };
        p.createOverlays = function() {
            p.$social = $('				<div class="yesp-social" data-show="0">					<a href="#" class="yesp-social-button yesp-social-google"><i class="fa fa-google-plus"></i></a>					<a href="#" class="yesp-social-button yesp-social-twitter"><i class="fa fa-twitter"></i></a>					<a href="#" class="yesp-social-button yesp-social-facebook"><i class="fa fa-facebook"></i></a>				</div>').appendTo(p.$el.find(".yesp-container"));
            p.$social.find(".yesp-social-facebook").click(function(e) {
                e.preventDefault();
                p.shareFacebook()
            });
            p.$social.find(".yesp-social-twitter").click(function(e) {
                e.preventDefault();
                p.shareTwitter()
            });
            p.$social.find(".yesp-social-google").click(function(e) {
                e.preventDefault();
                p.shareGoogle()
            })
        };
        p.shareFacebook = function() {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + p.shareUrl(), 'Share on Facebook', "height=300,width=600")
        };
        p.shareTwitter = function() {
            window.open('https://twitter.com/home?status=' + p.shareUrl(), 'Share on Twitter', "height=300,width=600")
        };
        p.shareGoogle = function() {
            window.open('https://plus.google.com/share?url=' + p.shareUrl(), 'Share on Google+', "height=300,width=600")
        };
        p.bindControls = function() {
            p.$controls["play"].click(function(e) {
                e.preventDefault();
                p.playPause()
            });
            p.$controls["volume_icon"].click(function(e) {
                e.preventDefault();
                if (p.youtube.isMuted()) {
                    if (p.info.volume == 0) {
                        p.info.volume = p.options.volume
                    }
                    p.updateVolume(0, p.info.volume)
                } else {
                    var a = p.youtube.getVolume() / 100;
                    p.updateVolume(0, 0);
                    p.info.volume = a
                }
            });
            p.$controls["share"].click(function(e) {
                e.preventDefault();
                p.toggleShare()
            });
            p.$controls["youtube"].click(function(e) {
                p.pause()
            });
            p.$controls["backward"].click(function(e) {
                e.preventDefault();
                p.backward()
            });
            p.$controls["forward"].click(function(e) {
                e.preventDefault();
                p.forward()
            });
            p.$controls["fullscreen"].click(function(e) {
                e.preventDefault();
                if (p.info.fullscreen) {
                    p.exitFullscreen(true);
                    $(this).find("i").removeClass("fa-compress").addClass("fa-expand")
                } else {
                    p.enterFullscreen();
                    $(this).find("i").removeClass("fa-expand").addClass("fa-compress")
                }
            });
            p.$controls["playlist_toggle"].click(function(e) {
                e.preventDefault();
                p.togglePlaylist()
            })
        };
        p.showControls = function() {
            p.$title.stop().animate({
                "opacity": 1
            }, 250);
            p.$el.find(".yesp-controls").stop().animate({
                "bottom": 0,
                "opacity": 1,
            }, 250);
            if (!p.options.hideYoutubeLogo && !p.info.mobile) {
                p.info.youtubeLogoTimer = setTimeout(function() {
                    p.$logo.stop().fadeTo(250, .25, function() {
                        p.$logo.css("opacity", "")
                    })
                }, 250)
            }
        };
        p.hideControls = function(a) {
            if (typeof(a) !== "undefined" && a == true) {
                p.$el.find(".yesp-controls").stop().animate({
                    "bottom": 0,
                    "opacity": 0,
                }, 250)
            } else {
                p.$el.find(".yesp-controls").stop().animate({
                    "bottom": -50
                }, 250)
            }
            if (p.info.youtubeLogoTimer !== false) {
                clearTimeout(p.info.youtubeLogoTimer)
            }
            p.$el.find(".yesp-youtube-logo").stop().fadeTo(350, 0, function() {});
            if (p.info.ios) {
                return
            }
            p.$title.stop().animate({
                "opacity": 0
            }, 250)
        };
        p.playPause = function() {
            var a = p.youtube.getPlayerState();
            if (a == 2) {
                p.play()
            } else if (a == 0) {
                p.youtube.seekTo(0);
                p.play()
            } else if (a == 5) {
                p.play()
            } else {
                p.pause()
            }
        };
        p.play = function() {
            p.youtube.playVideo();
            p.$el.find(".yesp-autoposter").hide();
            p.$controls["play"].find("i").removeClass("fa-play").addClass("fa-pause").removeClass("fa-undo")
        };
        p.pause = function() {
            p.youtube.pauseVideo();
            p.$controls["play"].find("i").addClass("fa-play").removeClass("fa-pause").removeClass("fa-undo")
        };
        p.stop = function() {
            p.pause();
            p.youtube.stopVideo()
        };
        p.forward = function() {
            p.info.index++;
            if (p.info.index >= p.playlistCount) {
                p.info.index = 0
            }
            p.playVideo(p.info.index)
        };
        p.backward = function() {
            p.info.index--;
            if (p.info.index < 0) {
                p.info.index = p.playlistCount - 1
            }
            p.playVideo(p.info.index)
        };
        p.playVideo = function(a, b, c) {
            if (parseFloat(a, 10) == a && parseFloat(a, 10) <= p.playlistItems.length) {
                a = parseFloat(a, 10)
            } else {
                var d = a;
                a = 0;
                for (var i = 0; i < p.playlistItems.length; i++) {
                    if (p.playlistItems[i].snippet.resourceId.videoId === d) {
                        a = i;
                        break
                    }
                }
            }
            var e = p.playlistItems[a];
            if (e == undefined) {
                return
            }
            if (typeof(c) === typeof(undefined)) {
                c = false
            }
            if (p.info.mobile && !p.info.firstPlay) {
                b = true
            }
            var f = e.snippet.title,
                channel = e.snippet.channelTitle,
                channel_link = "https://www.youtube.com/channel/" + e.snippet.channelId,
                d = e.snippet.resourceId.videoId,
                video_link = "https://www.youtube.com/watch?v=" + d;
            p.updateTitle(f, channel, channel_link);
            if (typeof(b) == "undefined" || b == false) {
                p.youtube.loadVideoById(d)
            } else {
                p.youtube.cueVideoById(d)
            }
            p.$logo.attr("href", video_link);
            p.$controls["youtube"].attr("href", video_link).attr("data-href", video_link);
            p.info.currentVideoUrl = video_link;
            p.$el.find(".yesp-playlist-video").attr("data-playing", "0");
            p.$el.find(".yesp-playlist-video[data-index=" + a + "]").attr("data-playing", "1");
            p.$el.find(".yesp-hp-video").attr("data-playing", "0");
            p.$el.find(".yesp-hp-video[data-index=" + a + "]").attr("data-playing", "1");
            if (p.options.timeIndicator == "full") {
                p.$controls["time"].html("00:00 / 00:00")
            } else {
                p.$controls["time"].html("00:00")
            }
            p.$controls["time_bar_time"].css("width", 0);
            p.$controls["time_bar_buffer"].css("width", 0);
            p.info.index = a;
            p.updateScrollPosition(c);
            if (b === true && !p.info.mobile) {
                var g = false;
                if (typeof(e.snippet.thumbnails.maxres) !== "undefined") {
                    g = e.snippet.thumbnails.maxres.url
                } else if (typeof(e.snippet.thumbnails.high) !== "undefined") {
                    g = e.snippet.thumbnails.high.url
                } else if (typeof(e.snippet.thumbnails.medium) !== "undefined") {
                    g = e.snippet.thumbnails.medium.url
                } else if (typeof(e.snippet.thumbnails.standard) !== "undefined") {
                    g = e.snippet.thumbnails.standard.url
                } else if (typeof(e.snippet.thumbnails.default) !== "undefined") {
                    g = e.snippet.thumbnails.default.url
                }
                if (g !== false) {
                    p.$el.find(".yesp-autoposter").css("background-image", 'url("' + g + '")').show()
                }
            } else {
                p.$el.find(".yesp-autoposter").hide()
            }
            p.options.onLoad(e.snippet)
        };
        p.updateScrollPosition = function(a, b) {
            if (p.options.playlistType === "horizontal") {
                var c = 160 * p.info.index;
                if (typeof(b) !== typeof(undefined)) {
                    c = b
                }
                if (a == true) {
                    p.$el.find(".yesp-hp").scrollLeft(c);
                    p.$el.find(".yesp-hp").perfectScrollbar("update")
                } else {
                    p.$el.find(".yesp-hp").stop().animate({
                        scrollLeft: c
                    }, 500, function() {
                        p.$el.find(".yesp-hp").perfectScrollbar("update")
                    })
                }
                return
            }
            var c = Math.floor(p.info.playlistWidth / 16 * 9) * p.info.index;
            if (typeof(b) !== typeof(undefined)) {
                c = b
            }
            if (c < 0) {
                c = 0
            }
            var d = p.$el.find(".yesp-playlist").innerHeight(),
                item_heights = Math.floor(p.info.playlistWidth / 16 * 9) * p.playlistCount;
            var e = item_heights - d;
            if (p.info.nextPageToken) {
                e += 50
            }
            if (c > e) {
                c = e
            }
            if (a == true) {
                p.$el.find(".yesp-playlist").scrollTop(c);
                p.$el.find(".yesp-playlist").perfectScrollbar("update")
            } else {
                p.$el.find(".yesp-playlist").stop().animate({
                    scrollTop: c
                }, 500, function() {
                    p.$el.find(".yesp-playlist").perfectScrollbar("update")
                })
            }
        };
        p.toggleFullscreen = function() {
            if (p.info.fullscreen) {
                p.exitFullscreen(true)
            } else {
                p.enterFullscreen()
            }
        };
        p.enterFullscreen = function() {
            if (p.info.mobile) {}
            var a = p.$el.find(".yesp-container")[0].webkitRequestFullScreen || p.$el.find(".yesp-container")[0].requestFullScreen || p.$el.find(".yesp-container")[0].mozRequestFullScreen;
            if (!a) {
                return
            }
            var w = $(window).width(),
                h = $(window).height();
            p.info.fullscreen = true;
            p.$el.find(".yesp-container, .yesp-container iframe").css({
                "width": "100%",
                "height": "100%"
            });
            p.youtube.setSize(w, h);
            a.bind(p.$el.find(".yesp-container")[0])()
        };
        p.exitFullscreen = function(a) {
            if (typeof(a) !== "undefined" && a) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            }
            p.info.fullscreen = false;
            p.resize()
        };
        p.togglePlaylist = function() {
            if (p.options.playlistType === "horizontal") {
                if (p.info.horizontalPlaylistShown) {
                    p.hideHorizontalPlaylist()
                } else {
                    p.showHorizontalPlaylist()
                }
            } else {
                if (p.info.playlistShown) {
                    p.hidePlaylist(false)
                } else {
                    p.showPlaylist(false)
                }
                if (p.options.showPlaylist !== "auto") {
                    p.resize()
                }
            }
        };
        p.showPlaylist = function(a, b) {
            if (p.options.playlistType == "horizontal") {
                return
            }
            if (typeof(b) == typeof(undefined)) {
                b = true
            }
            a = true;
            if (p.info.playlistAnimating) {
                return
            }
            p.info.playlistAnimating = true;
            var c = p.$el.find(".yesp-playlist"),
                w = 0;
            p.$el.find(".fa-list").removeClass("fa-list").addClass("fa-align-justify");
            if (a) {
                c.css("width", p.info.playlistWidth);
                p.info.playlistShown = true;
                p.info.playlistAnimating = false;
                if (b) {
                    p.resize(true)
                }
                return
            }
        };
        p.hidePlaylist = function(a, b) {
            if (typeof(b) == typeof(undefined)) {
                b = true
            }
            a = true;
            if (p.info.playlistAnimating) {
                return
            }
            p.info.playlistAnimating = true;
            var c = p.$el.find(".yesp-playlist");
            if (p.options.playlistType == "vertical") {
                p.$el.find(".fa-align-justify").removeClass("fa-align-justify").addClass("fa-list")
            }
            if (a) {
                c.css("width", 0);
                p.info.playlistShown = false;
                p.info.playlistAnimating = false;
                if (b) {
                    p.resize(true)
                }
                return
            }
        };
        p.showHorizontalPlaylist = function() {
            p.info.horizontalPlaylistShown = true;
            p.$el.find(".yesp-hp").show();
            p.$el.find(".fa-list").removeClass("fa-list").addClass("fa-align-justify")
        };
        p.hideHorizontalPlaylist = function() {
            p.info.horizontalPlaylistShown = false;
            p.$el.find(".yesp-hp").hide();
            p.$el.find(".fa-align-justify").removeClass("fa-align-justify").addClass("fa-list")
        };
        p.setPlaylistWidth = function(a) {
            if (p.info.playlistShown) {
                p.info.playlistWidth = a
            }
            var b = Math.floor(a / 16 * 9);
            p.$el.find(".yesp-playlist").css({
                "width": a
            }).find(".yesp-playlist-video").css({
                "width": a,
                "height": b
            });
            p.$el.find(".yesp-playlist .yesp-playlist-current").css("width", a - 20);
            if (a <= 100) {
                p.$el.find(".yesp-playlist").addClass("yesp-playlist-simple");
                p.$el.find(".yesp-playlist .yesp-playlist-current").css("width", 10)
            } else {
                p.$el.find(".yesp-playlist").removeClass("yesp-playlist-simple")
            }
        };
        p.resize = function(a, b) {
            if (typeof(a) == typeof(undefined) || typeof(a) == typeof({})) {
                a = false
            }
            var c = p.$el.innerWidth();
            if (p.options.showPlaylist == "auto" && a == false) {
                if (c < 660 && (b == true || p.info.playlistWidth == 200)) {
                    p.setPlaylistWidth(100);
                    p.updateScrollPosition(true)
                }
                if (c < 500 && (b == true || p.info.playlistShown == true)) {
                    p.hidePlaylist(false, false);
                    p.updateScrollPosition(true)
                }
                if (c >= 500 && (b == true || p.info.playlistShown == false)) {
                    p.showPlaylist(false, false);
                    p.updateScrollPosition(true)
                }
                if (c >= 660 && (b == true || p.info.playlistWidth == 100)) {
                    p.setPlaylistWidth(200);
                    p.updateScrollPosition(true)
                }
            } else if (a == false) {
                b = true;
                if (c < 660 && (b == true || p.info.playlistWidth == 200)) {
                    p.setPlaylistWidth(100);
                    p.updateScrollPosition(true)
                }
                if (c >= 660 && (b == true || p.info.playlistWidth == 100)) {
                    p.setPlaylistWidth(200);
                    p.updateScrollPosition(true)
                }
                if (p.info.playlistShown == false) {
                    p.hidePlaylist(true, false)
                }
            }
            var d = c - (p.info.playlistShown ? p.info.playlistWidth : 0),
                height = d / 16 * 9;
            if (p.info.fullscreen) {
                c = $(window).width();
                d = c;
                height = $(window).height()
            }
            p.$el.find(".yesp-container, .yesp-playlist, .yesp-video").css("height", height);
            p.$el.find(".yesp-container, .yesp-video").css("width", d);
            p.$el.find(".yesp-playlist").perfectScrollbar("update");
            p.info.width = d;
            p.info.height = height;
            var e = d - 20;
            if (d < 600) {
                if (p.options.timeIndicator == "full") {
                    p.options.timeIndicator = true;
                    p.$controls["time"].html(p.formatTime(p.info.currentTime));
                    p.$controls["time"].removeClass("yesp-full-time")
                }
            }
            if (d < 530) {
                p.options.fwdBckControl = false;
                p.options.youtubeLinkControl = false;
                p.$controls["forward"].hide();
                p.$controls["backward"].hide();
                p.$controls["youtube"].hide()
            }
            if (d < 400) {
                p.options.volumeControl = false;
                p.$controls["volume"].hide()
            }
            if (d < 300) {
                p.options.timeIndicator = false;
                p.$controls["time"].hide();
                p.options.shareControl = false;
                p.$controls["share"].hide()
            }
            if (d >= 300 && (p.options_copy.timeIndicator == true || p.options_copy.timeIndicator == "full")) {
                p.options.timeIndicator = true;
                p.$controls["time"].show()
            }
            if (d >= 300 && p.options_copy.shareControl == true) {
                p.options.shareControl = true;
                p.$controls["share"].show()
            }
            if (d >= 400 && p.options_copy.volumeControl == true) {
                p.options.volumeControl = true;
                p.$controls["volume"].show()
            }
            if (d >= 530 && p.options_copy.fwdBckControl == true) {
                p.options.fwdBckControl = true;
                p.$controls["forward"].show();
                p.$controls["backward"].show()
            }
            if (d >= 530 && p.options_copy.youtubeLinkControl == true) {
                p.options.youtubeLinkControl = true;
                p.$controls["youtube"].show()
            }
            if (d >= 600 && p.options_copy.timeIndicator == "full") {
                p.options.timeIndicator = "full";
                p.$controls["time"].html(p.formatTime(p.info.currentTime) + " / " + p.formatTime(p.info.duration));
                p.$controls["time"].addClass("yesp-full-time")
            }
            if (p.options.playControl) {
                e -= 30
            }
            if (p.options.timeIndicator) {
                e -= 58
            }
            if (p.options.timeIndicator == "full") {
                e -= 40
            }
            if (p.options.volumeControl) {
                e -= 110
            }
            if (p.options.shareControl) {
                e -= 30
            }
            if (p.options.youtubeLinkControl) {
                e -= 30
            }
            if (p.options.fwdBckControl) {
                e -= 60
            }
            if (p.options.fullscreenControl) {
                e -= 30
            }
            if (p.options.playlistToggleControl) {
                e -= 30
            }
            e -= 18;
            p.$controls["time_bar"].css("width", e)
        };
        p.initTimeSlider = function() {
            p.$controls["time_bar"].on("mousedown", function(e) {
                if (!p.info.ipad) {
                    p.info.timeDrag = true
                }
                p.updateTimeSlider(e.pageX)
            });
            $(document).on("mouseup", function(e) {
                if (p.info.timeDrag) {
                    p.info.timeDrag = false;
                    p.updateTimeSlider(e.pageX)
                }
            });
            $(document).on("mousemove", function(e) {
                if (p.info.timeDrag) {
                    p.updateTimeSlider(e.pageX)
                }
            })
        };
        p.updateTimeSlider = function(x) {
            if (p.info.duration == 0) {
                return
            }
            var a = p.info.duration;
            var b = x - p.$controls["time_bar"].offset().left;
            var c = 100 * b / p.$controls["time_bar"].width();
            if (c > 100) {
                c = 100
            }
            if (c < 0) {
                c = 0
            }
            var d = Math.round(a * c / 100);
            p.$controls["time_bar_time"].css("width", c + "%");
            p.youtube.seekTo(d);
            p.options.onSeek(a * c / 100)
        };
        p.initVolumeSlider = function() {
            p.$controls["volume_bar"].on("mousedown", function(e) {
                p.info.volumeDrag = true;
                p.$controls["volume_icon"].find("i").removeClass("fa-volume-off").addClass("fa-volume-up");
                p.updateVolume(e.pageX)
            });
            $(document).on("mouseup", function(e) {
                if (p.info.volumeDrag) {
                    p.info.volumeDrag = false;
                    p.updateVolume(e.pageX)
                }
            });
            $(document).on("mousemove", function(e) {
                if (p.info.volumeDrag) {
                    p.updateVolume(e.pageX)
                }
            })
        };
        p.updateVolume = function(x, a) {
            var b;
            if (a) {
                b = a * 100
            } else {
                var c = x - p.$controls["volume_bar"].offset().left;
                b = 100 * c / p.$controls["volume_bar"].width()
            }
            if (b > 100) {
                b = 100
            }
            if (b < 0) {
                b = 0
            }
            p.$controls["volume_amount"].css("width", b + "%");
            p.youtube.setVolume(b);
            if (b == 0) {
                p.youtube.mute()
            } else if (p.youtube.isMuted()) {
                p.youtube.unMute()
            }
            if (b == 0) {
                p.$controls["volume_icon"].find("i").addClass("fa-volume-off").removeClass("fa-volume-up")
            } else {
                p.$controls["volume_icon"].find("i").removeClass("fa-volume-off").addClass("fa-volume-up")
            }
            p.options.onVolume(b / 100)
        };
        p.toggleShare = function() {
            if (p.$social.attr("show") == "1") {
                p.hideShare()
            } else {
                p.showShare()
            }
        };
        p.showShare = function() {
            p.$social.attr("show", "1").stop().animate({
                right: 10
            }, 200)
        };
        p.hideShare = function() {
            p.$social.attr("show", "0").stop().animate({
                right: -140
            }, 200)
        };
        p.setStyle = function() {
            var a = $("<style />");
            var b = {
                controls_bg: "rgba(0,0,0,.9)",
                buttons: "rgba(255,255,255,.5)",
                buttons_hover: "rgba(255,255,255,1)",
                buttons_active: "rgba(255,255,255,1)",
                time_text: "#fff",
                bar_bg: "rgba(255,255,255,.5)",
                buffer: "rgba(255,255,255,.25)",
                fill: "#fff",
                video_title: "#fff",
                video_channel: "#1fb4da",
                playlist_overlay: "rgba(0,0,0,.5)",
                playlist_title: "#fff",
                playlist_channel: "#1fb4da",
                scrollbar: "rgba(255,255,255,.9)",
                scrollbar_bg: "rgba(255,255,255,0)",
                load_more_bg: "#000",
                loadMoreText: "#fff",
            };
            for (key in p.options.colors) {
                b[key] = p.options.colors[key]
            }
            a.html('				#' + p.id + '.yesp .yesp-controls {background:' + b.controls_bg + '!important}				#' + p.id + '.yesp .yesp-controls a {color:' + b.buttons + '!important}				#' + p.id + '.yesp .yesp-controls a:hover {color:' + b.buttons_hover + '!important}				#' + p.id + '.yesp .yesp-controls a:active {color:' + b.buttons_active + '!important}				#' + p.id + '.yesp .yesp-time {color:' + b.time_text + '!important}				#' + p.id + '.yesp .yesp-bar,				#' + p.id + '.yesp .yesp-volume .yesp-volume-bar {background:' + b.bar_bg + '!important}				#' + p.id + '.yesp .yesp-bar .yesp-bar-buffer {background:' + b.buffer + '!important}				#' + p.id + '.yesp .yesp-bar .yesp-bar-time,				#' + p.id + '.yesp .yesp-volume .yesp-volume-bar .yesp-volume-amount {background:' + b.fill + '!important}				#' + p.id + '.yesp .yesp-title-wrapper {color:' + b.video_title + '!important}				#' + p.id + '.yesp .yesp-title a.yesp-subtitle {border-color:' + b.video_title + '!important}				#' + p.id + '.yesp .yesp-title-wrapper a {color:' + b.video_channel + '!important}				#' + p.id + '.yesp .yesp-playlist-overlay,				#' + p.id + '.yesp .yesp-hp-overlay,				#' + p.id + '.yesp .yesp-playlist-current,				#' + p.id + '.yesp .yesp-hp-current {background:' + b.playlist_overlay + ' !important;}				#' + p.id + '.yesp .yesp-playlist-overlay .yesp-playlist-title,				#' + p.id + '.yesp .yesp-hp-overlay .yesp-hp-title,				#' + p.id + '.yesp .yesp-playlist-current,				#' + p.id + '.yesp .yesp-hp-current {color:' + b.playlist_title + ' !important;}				#' + p.id + '.yesp .yesp-playlist-overlay .yesp-playlist-channel,				#' + p.id + '.yesp .yesp-hp-overlay .yesp-hp-channel {color:' + b.playlist_channel + ' !important;}				#' + p.id + '.yesp .ps-scrollbar-y-rail,				#' + p.id + '.yesp .ps-scrollbar-x-rail {background:' + b.scrollbar_bg + ' !important;}				#' + p.id + '.yesp .ps-scrollbar-y,				#' + p.id + '.yesp .ps-scrollbar-x {background:' + b.scrollbar + ' !important;}				#' + p.id + '.yesp .yesp-next-page,				#' + p.id + '.yesp .yesp-hp-next-page {background:' + b.load_more_bg + ' !important;color:' + b.loadMoreText + ' !important;}			');
            a.appendTo("body")
        };
        p.formatTime = function(a) {
            var m = Math.floor(a / 60) < 10 ? "0" + Math.floor(a / 60) : Math.floor(a / 60),
                s = Math.floor(a - (m * 60)) < 10 ? "0" + Math.floor(a - (m * 60)) : Math.floor(a - (m * 60));
            return m + ":" + s
        };
        p.cutText = function(n) {
            return function textCutter(i, a) {
                var b = a.substr(0, n);
                if (/^\S/.test(a.substr(n))) {
                    return b.replace(/\s+\S*$/, "")
                }
                return b
            }
        };
        p.shareUrl = function() {
            return p.info.currentVideoUrl
        };
        p.detectIe = function() {
            var a = window.navigator.userAgent;
            var b = a.indexOf("MSIE ");
            var c = a.indexOf("Trident/");
            if (b > 0) {
                return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10)
            }
            if (c > 0) {
                var d = a.indexOf("rv:");
                return parseInt(a.substring(d + 3, a.indexOf(".", d)), 10)
            }
            return false
        };
        p.detectTouch = function() {
            return !!("ontouchstart" in window) || !!("onmsgesturechange" in window)
        };
        p.shuffleArray = function(a) {
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var b = a[i];
                a[i] = a[j];
                a[j] = b
            }
            return a
        };
        p.init()
    };
    $.youtubeVideo.defaultOptions = {
        playlist: false,
        channel: false,
        user: false,
        videos: false,
        playerId: false,
        shuffle: false,
        apiKey: "",
        maxResults: 50,
        pagination: true,
        continuous: true,
        firstVideo: 0,
        showPlaylist: "auto",
        playlistType: "vertical",
        showChannelInPlaylist: true,
        showChannelInTitle: true,
        width: false,
        showAnnotations: false,
        nowPlayingText: "Now Playing",
        loadMoreText: "Load More",
        forceHD: false,
        hideYoutubeLogo: false,
        autoplay: false,
        playControl: true,
        timeIndicator: "full",
        volumeControl: true,
        shareControl: true,
        fwdBckControl: true,
        youtubeLinkControl: true,
        fullscreenControl: true,
        playlistToggleControl: true,
        volume: false,
        showControlsOnLoad: true,
        showControlsOnPause: true,
        showControlsOnPlay: false,
        shadow: true,
        playerVars: {},
        colors: {},
        onLoad: function(a) {},
        onDoneLoading: function(a) {},
        onStateChange: function(a) {},
        onSeek: function(a) {},
        onVolume: function(a) {},
        onTimeUpdate: function(a) {},
    };
    $.fn.youtubeVideo = function(a) {
        return this.each(function() {
            (new $.youtubeVideo(this, a))
        })
    };
    $.fn.youtubeVideoPlay = function() {
        return this.each(function() {
            (new $.youtubeVideoPlay(this))
        })
    };
    $.youtubeVideoPlay = function(a) {
        var b = $(a),
            base = b.data("youtubeVideo");
        base.play()
    };
    $.fn.youtubeVideoPause = function() {
        return this.each(function() {
            (new $.youtubeVideoPause(this))
        })
    };
    $.youtubeVideoPause = function(a) {
        var b = $(a),
            base = b.data("youtubeVideo");
        base.pause()
    };
    $.fn.youtubeVideoStop = function() {
        return this.each(function() {
            (new $.youtubeVideoStop(this))
        })
    };
    $.youtubeVideoStop = function(a) {
        var b = $(a),
            base = b.data("youtubeVideo");
        base.stop()
    };
    $.fn.youtubeVideoSeek = function(t) {
        return this.each(function() {
            (new $.youtubeVideoSeek(this, t))
        })
    };
    $.youtubeVideoSeek = function(a, b) {
        var c = $(a),
            base = c.data("youtubeVideo");
        var d = base.info.duration,
            percentage = b / d * 100;
        base.$controls["time_bar_time"].css("width", percentage + "%");
        base.youtube.seekTo(d * percentage / 100);
        base.options.onSeek(b)
    };
    $.fn.youtubeVideoLoad = function(a) {
        return this.each(function() {
            (new $.youtubeVideoLoad(this, a))
        })
    };
    $.youtubeVideoLoad = function(a, b) {
        var c = $(a),
            base = c.data("youtubeVideo");
        base.playVideo(b)
    };
    $.fn.youtubeVideoVolume = function(a) {
        return this.each(function() {
            (new $.youtubeVideoVolume(this, a))
        })
    };
    $.youtubeVideoVolume = function(a, b) {
        var c = $(a),
            base = c.data("youtubeVideo");
        base.updateVolume(0, b)
    };
    $.fn.youtubeShowControls = function() {
        return this.each(function() {
            (new $.youtubeShowControls(this))
        })
    };
    $.youtubeShowControls = function(a) {
        var b = $(a),
            base = b.data("youtubeVideo");
        base.showControls()
    }
})(jQuery);

function onYouTubeIframeAPIReady() {
    jQuery("body").addClass("yesp-youtube-iframe-ready")
}
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);