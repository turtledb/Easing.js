var test = new Test();

if (this.document) {
    test.add([
        testEasing
    ]);
}

test.run();

function testEasing(next) {

    var currentTime    = 0;
    var beginningValue = 0;
    var endValue       = 1000;
    var durationTime   = 1000;
    var beginningTime  = Date.now();
    var offsetX        = 50;

    var particle = [];

    function _createParticle(x, y, w, h, color) {
        var div = document.createElement("div");

        div.style.cssText = "position:absolute;" +
                            "left:" + x + "px;top:" + y + "px;" +
                            "width:" + w + "px;height:" + h + "px;" +
                            "background-color:" + color;
        return div;
    }

    for (var i = 0; i < 18; ++i) {
        var div = _createParticle(offsetX,  // init x
                                  i * 16,   // init y
                                  16,       // width
                                  16,       // height
                                  "rgb(" + i * 5 + "%,0%,0%)");

        document.body.appendChild(div);
        particle.push(div);
    }

    (function _tick() {
        currentTime = Date.now() - beginningTime;

        for (var i = 0; i < 18; ++i) {
            var x = Easing[i](currentTime > durationTime ? durationTime
                                                         : currentTime,
                              beginningValue,
                              endValue - beginningValue,
                              durationTime);

            particle[i].style.left = (offsetX + x) + "px";
        }
        if (currentTime < durationTime) {
            setTimeout(_tick, 0);
        } else {
            console.log("testEasing ok");
            next && next.pass();
        }
    })();
}

