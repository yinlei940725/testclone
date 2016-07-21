
//$(window).load(function(){
//    $('.preloader').delay(1500).fadeOut("slow"); // set duration in brackets    
//});

// HOME BACKGROUND SLIDESHOW
//$(function () {
//    jQuery(document).ready(function () {
//        $('body').backstretch([
//	 		 "images/background/tm-bg-slide-1.jpg",
//	 		 "images/background/tm-bg-slide-2.jpg",
//			 "images/background/tm-bg-slide-3.jpg",
//             "images/background/tm-bg-slide-4.jpg",
//             "images/background/tm-bg-slide-5.jpg",
//             "images/background/tm-bg-slide-6.jpg"
//        ], { duration: 3200, fade: 1300 });
//    });
//});

//typewriter
(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var e = $(this);
            var str = e.html();
            var index = 0;
            e.html("");
            var timer = setInterval(function () {
                var cur = str.substr(index, 1);
                if (cur == '<')
                    index = str.indexOf('>', index) + 1;
                else
                    index++;
                e.html(str.substring(0, index) + (index & 1 ? '' : '_'));
                if (index >= str.length)
                    clearInterval(timer);
            }, 30);
        });
    }
})(jQuery);


//������
(function ($) {
    $.fn.coderain = function (font_size, font_color, w, h) {
        var elementid = this.attr("id");
        var matrix = document.getElementById(elementid);
        var context = matrix.getContext("2d");
        matrix.width = w || window.innerWidth;
        matrix.height = h || window.innerHeight;

        var drop = [];
        var font_size = font_size || 12;
        var columns = matrix.width / font_size;
        for (var i = 0; i < columns; i++)
            drop[i] = 1;

        function drawMatrix() {

            context.fillStyle = "rgba(16, 21, 36, 0.1)";
            context.fillRect(0, 0, matrix.width, matrix.height);

            context.fillStyle = font_color || "green";
            context.font = font_size + "px";
            for (var i = 0; i < columns; i++) {
                context.fillText(Math.floor(Math.random() * 2), i * font_size, drop[i] * font_size);/*get 0 and 1*/

                if (drop[i] * font_size > (matrix.height * 2 / 3) && Math.random() > 0.8)/*reset*/
                    drop[i] = 0;
                drop[i]++;
            }
        }
        setInterval(drawMatrix, 60);
    }
})(jQuery);



//��������
//�����ֱ���: JS��ȡDOM��������ȣ������߶ȣ������������Ĵ�С�������ɫ�����ߵľ��룬���ߵ���ɫ
//��������Ϊ: Element, Number, Number, Number, Number, string, Number, {r:0,g:0,b:0}
//$.flowmolecule(element,width,height,dotsnum,dotsize,dotcolor,wireddistance,wiredcolor:{r,g,b})
(function ($) {
    $.extend({
        flowmolecule: function () {
            var element = arguments[0] || document.getElementsByName("canvas")[0];
            var width = arguments[1] || document.body.scrollWidth;
            var height = arguments[2] || document.body.scrollHeight;
            var dotsnum = arguments[3] || 100;
            var dotsize = arguments[4] || 2;
            var dotcolor = arguments[5] || "rgba{ r: 0, g: 0, b: 0, a: 1 }";
            var wireddistance = arguments[6] || 20000;
            var wiredcolor = arguments[7] || { r: 0, g: 0, b: 0 };

            var canvas = element;
            var ctx = canvas.getContext("2d");
            resize();
            //window.onresize = resize;
            function resize() {
                canvas.width = width;//window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                canvas.height = height;//window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            }

            var screenWidth = window.innerWidth;
            if (screenWidth > 1024) {
                var RAF = (function () {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
                })();
                // ���ʱ����ȡ�������
                var warea = { x: null, y: null, max: wireddistance };
                window.onmousemove = function (e) {
                    e = e || window.event;
                    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    warea.x = e.clientX;
                    warea.y = e.clientY + scrollTop;
                };
                window.onmouseout = function (e) {
                    warea.x = null;
                    warea.y = null;
                };
                // �������
                // x��yΪ�������꣬xa, yaΪ����xy����ٶȣ�maxΪ���ߵ�������
                var dots = [];
                for (var i = 0; i < dotsnum; i++) {
                    var x = Math.random() * canvas.width;
                    var y = Math.random() * canvas.height;
                    var xa = Math.random() - (4 / 5);
                    var ya = Math.random() - (4 / 5);
                    dots.push({
                        x: x,
                        y: y,
                        xa: xa,
                        ya: ya,
                        max: wireddistance
                    })
                }
                // �ӳ�100���뿪ʼִ�ж������������ִ����ʱλ�ü�������
                setTimeout(function () {
                    animate();
                }, 100);
                // ÿһ֡ѭ�����߼�
                function animate() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // �����������ӽ�ȥ������һ�����ڱȶԾ���ĵ�����
                    var ndots = [warea].concat(dots);
                    dots.forEach(function (dot) {
                        // ����λ��
                        dot.x += dot.xa;
                        dot.y += dot.ya;
                        // �����߽罫���ٶȷ���
                        dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
                        dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
                        // ���Ƶ�
                        ctx.fillStyle = dotcolor;
                        ctx.beginPath();
                        ctx.arc(dot.x, dot.y, dotsize, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();
                        //ctx.fillRect(dot.x, dot.y, dotsize.w, dotsize.h);
                        // ѭ���ȶ����Ӽ�ľ���
                        for (var i = 0; i < ndots.length; i++) {
                            var d2 = ndots[i];
                            if (dot === d2 || d2.x === null || d2.y === null) continue;
                            var xc = dot.x - d2.x;
                            var yc = dot.y - d2.y;
                            // ��������֮��ľ���
                            var dis = xc * xc + yc * yc;
                            // �����
                            var ratio;
                            // �����������֮��ľ���С�����Ӷ����maxֵ�������������Ӽ仭��
                            if (dis < d2.max) {
                                // �������꣬��������������λ���ƶ�
                                if (d2 === warea && dis > (d2.max / 2)) {
                                    dot.x -= xc * 0.03;
                                    dot.y -= yc * 0.03;
                                }
                                // ��������
                                ratio = (d2.max - dis) / d2.max;
                                // ����
                                ctx.beginPath();
                                ctx.lineWidth = ratio / 2;
                                ctx.strokeStyle = 'rgba(' + wiredcolor.r + ',' + wiredcolor.g + ',' + wiredcolor.b + ',' + (ratio + 0.2) + ')';
                                //'rgba(0,0,0,' + (ratio + 0.2) + ')';
                                ctx.moveTo(dot.x, dot.y);
                                ctx.lineTo(d2.x, d2.y);
                                ctx.stroke();
                            }
                        }
                        // ���Ѿ�����������Ӵ�������ɾ��
                        ndots.splice(ndots.indexOf(dot), 1);
                    });
                    RAF(animate);
                }
            }
        }
    });
})($);