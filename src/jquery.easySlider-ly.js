/*
 *  Easy Slider 1.8 - jQuery plugin
 *  written by Alen Grakalic (modified by Kyle Florence)
 *
 *  Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *  Dual licensed under the MIT (MIT-LICENSE.txt)
 *  and GPL (GPL-LICENSE.txt) licenses.
 *
 *  Built for jQuery library
 *  http://jquery.com
 */

/*
 *  markup example for $("#slider").easySlider();
 *
 *  <div id="slider">
 *    <ul>
 *      <li><img src="images/01.jpg" alt="" /></li>
 *      <li><img src="images/02.jpg" alt="" /></li>
 *      <li><img src="images/03.jpg" alt="" /></li>
 *      <li><img src="images/04.jpg" alt="" /></li>
 *      <li><img src="images/05.jpg" alt="" /></li>
 *    </ul>
 *  </div>
 *
 */

(function($)
{
    $.fn.easySlider = function(options)
    {
        // default configuration properties
        var defaults = {
            controlsBefore: '',             //控制器之前加入的html代码
            controlsAfter:  '',             //控制器之后加入的html代码
            controlsFade:   true,
            vertical:       false,
            duration:       800,
            ease:           'swing',
            auto:           false,
            pause:          2000,
            continuous:     false,
            prevNext:       true,
            prevId:         'prevBtn',
            nextId:         'nextBtn',
            numeric:        false,
            numericId:      'controls'
        };

        var options = $.extend(defaults, options);

        this.each(function()
        {
            var obj = $(this);

            // Fix for nested list items
            var ul = obj.children("ul");
            var li = ul.children("li");

            var s = li.length;
            var t = 0;
            var ts = s-1;
            var clickable = true;

            // 方案1：子元素宽高为准
            var w = li.width();
            var h = li.height();
            obj.width(w);
            obj.height(h);

            // 方案2：父元素宽高为准
            /*var w = obj.width();
             var h = obj.height();
             li.each(function() {
             if(options.vertical) $(this).height(h);
             else $(this).width(w);
             });*/

            // Set obj overflow to hidden
            obj.css("overflow","hidden");

            // Float items to the left
            if (!options.vertical) {
                li.css('float', 'left');
            }

            // Set width/height of ul
            if(options.vertical) ul.height(s*h);
            else ul.width(s*w);

            // Clone elements for continuous scrolling
            if(options.continuous)
            {
                if(options.vertical)
                {
                    ul.prepend(li.filter(":last-child").clone().css("margin-top","-"+ h +"px"));
                    ul.append(li.filter(":nth-child(2)").clone());
                    ul.height((s+1)*h);
                } else {
                    ul.prepend(li.filter(":last-child").clone().css("margin-left","-"+ w +"px"));
                    ul.append(li.filter(":nth-child(2)").clone());
                    ul.width((s+1)*w);
                }
            };

            //创建控制器的过程
            if (true) {
                var html = options.controlsBefore;

                if (options.numeric) {
                    html += '<ol id="' + options.numericId + '" class="es-paging"></ol>';
                }

                if (options.prevNext) {
                    html += ' <span id="' + options.prevId + '" class="es-prev"><a href=\"javascript:void(0);\">Previous</a></span>';
                    html += ' <span id="' + options.nextId + '" class="es-next"><a href=\"javascript:void(0);\">Next</a></span>';
                };

                html += options.controlsAfter;
                $(obj).after(html);

                if (options.numeric) {
                    for (var i = 0; i < s; i++) {
                        $(document.createElement("li"))
                            .attr('id', options.numericId + (i + 1))
                            .html('<a rel=' + i + ' href=\"javascript:void(0);\">' + (i + 1) + '</a>')
                            .appendTo($("#" + options.numericId))
                            .click(function () {
                                animate(parseInt($('a', this).attr('rel')), true);
                            });
                    };
                }
                if (options.prevNext) {
                    $("#" + options.nextId).click(function () {
                        animate("next", true);
                    });
                    $("#" + options.prevId).click(function () {
                        animate("prev", true);
                    });
                }
            };

            function setCurrent(i)
            {
                i = parseInt(i)+1;
                $("li", "#" + options.numericId).removeClass("current");
                $("li#" + options.numericId + i).addClass("current");
            };

            function adjust()
            {
                if(t>ts) t=0;
                if(t<0) t=ts;
                if(!options.vertical) {
                    ul.css("margin-left",(t*w*-1));
                } else {
                    ul.css("margin-top",(t*h*-1));
                }
                clickable = true;
                if(options.numeric) setCurrent(t);
            };

            function animate(dir,clicked)
            {
                if (clickable)
                {
                    clickable = false;
                    var ot = t;
                    switch(dir)
                    {
                        case "next":
                            t = (ot>=ts) ? (options.continuous ? t+1 : ts) : t+1;
                            break;
                        case "prev":
                            t = (t<=0) ? (options.continuous ? t-1 : 0) : t-1;
                            break;
                        case "first":
                            t = 0;
                            break;
                        case "last":
                            t = ts;
                            break;
                        default:
                            t = parseInt(dir);
                            break;
                    };

                    if(!options.vertical) {
                        p = (t*w*-1);
                        ul.animate(
                            { marginLeft: p },
                            {
                                queue:false,
                                duration:options.duration,
                                easing:options.ease,
                                complete:adjust
                            }
                        );
                    } else {
                        p = (t*h*-1);
                        ul.animate(
                            { marginTop: p },
                            {
                                queue:false,
                                duration:options.duration,
                                easing:options.ease,
                                complete:adjust
                            }
                        );
                    };

                    if(!options.continuous && options.controlsFade)
                    {
                        if(t==0){
                            $("a","#"+options.prevId).fadeOut('slow');
                            $("a","#"+options.firstId).fadeOut('slow');
                        } else if(t==ts){
                            $("a","#"+options.nextId).fadeOut('slow');
                            $("a","#"+options.lastId).fadeOut('slow');
                        } else {
                            $("a","#"+options.prevId).fadeIn('slow');
                            $("a","#"+options.firstId).fadeIn('slow');
                            $("a","#"+options.nextId).fadeIn('slow');
                            $("a","#"+options.lastId).fadeIn('slow');
                        };
                    };

                    if(clicked) clearTimeout(timeout);
                    if(options.auto && dir=="next" && !clicked){;
                        timeout = setTimeout(function(){
                            animate("next",false);
                        },options.duration+options.pause);
                    };

                };
            };
            // init
            var timeout;
            if(options.auto){
                timeout = setTimeout(function(){
                    animate("next",false);
                },options.pause);
            };

            if(options.numeric) setCurrent(0);

            if(!options.continuous && options.controlsFade){
                $("a","#"+options.prevId).hide();
            };
        });
    };
})(jQuery);
