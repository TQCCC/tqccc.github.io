var imgList = {};
var imgData = new Array(
    {type: "js", path: "./js/Head.js"},
    {type: "js", path: "./js/Texts.js"},
    {name: "head", path: "./images/head.png"},
    {name: "left_head", path: "./images/left_head.png"},
    {name: "right_head", path: "./images/right_head.png"},
    {name: "left_arm", path: "./images/left_arm.png"},
    {name: "right_arm", path: "./images/right_arm.png"},
    {name: "left_body", path: "./images/left_body.png"},
    {name: "right_body", path: "./images/right_body.png"},
    {name: "left_eye", path: "./images/left_eye.png"},
    {name: "right_eye", path: "./images/right_eye.png"},
    {name: "mouth", path: "./images/mouth.png"}
);
var backLayer, loadingLayer;
var head;
var txt;

function main() {
    // LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    // LGlobal.setDebug(true);
    LGlobal.box2d = new LBox2d([0, 0]);
    LSystem.screen(LStage.FULL_SCREEN);

    backLayer = new LSprite();
    backLayer.graphics.drawRect(1, "#E0FFFF", [0, 0, BACK_WIDTH, BACK_HEIGHT], 1, "#fff");
    addChild(backLayer);

    loadingLayer = new LoadingSample1(50);
    backLayer.addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            loadingLayer.setProgress(progress);
        },
        gameInit
    );
}

function gameInit(result) {
    imgList = result;
    backLayer.removeChild(loadingLayer);
    loadingLayer = null;

    //Initial more.
    var wall = new LSprite();
    var wt = 5;
    wall.x = 0;
    wall.y = 0;
    var wallshapes = [
        [[0, 0], [BACK_WIDTH, 0], [BACK_WIDTH, wt], [0, wt]],
        [[0, BACK_HEIGHT - wt], [BACK_WIDTH, BACK_HEIGHT - wt], [BACK_WIDTH, BACK_HEIGHT], [0, BACK_HEIGHT]],
        [[BACK_WIDTH - wt, 0], [BACK_WIDTH, 0], [BACK_WIDTH, BACK_HEIGHT], [BACK_WIDTH - wt, BACK_HEIGHT]],
        [[0, 0], [wt, 0], [wt, BACK_HEIGHT], [0, BACK_HEIGHT]]
    ];
    wall.addBodyVertices(wallshapes, 0, 0, 0, .5, .4, 0.0);
    wall.graphics.drawRect(1, "#000", [0, BACK_HEIGHT - wt, BACK_WIDTH, BACK_HEIGHT], 1, "#000");
    wall.graphics.drawRect(1, "#000", [0, 0, BACK_WIDTH, wt], 1, "#000");
    wall.graphics.drawRect(1, "#000", [0, 0, wt, BACK_HEIGHT], 1, "#000");
    wall.graphics.drawRect(1, "#000", [BACK_WIDTH - wt, 0, BACK_WIDTH, BACK_HEIGHT], 1, "#000");
    backLayer.addChild(wall);

    var f = "幼圆";
    var c = "#000";
    var s = 15;
    txt = new MiddleText(200, "↑试试拖动↑", 20, "#964B00", 1, f);
    txt = new MiddleText(txt.y + txt.getHeight() * 2, "唐庆昌", 30, c, 1, f);
    txt = new MiddleText(txt.y + txt.getHeight() * 2, "Programming,", s, c, 1, f);
    txt = new MiddleText(txt.y + txt.getHeight() * 2, "should be more than coding.", s, c, 1, f);


    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * 2, "·坐标：北京", s, c, 1, f);
    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * 2, "·邮箱：qingchang96@sina.com", s, c, 1, f);
    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * 2, "·西安理工大学-计算机科学-18届", s, c, 1, f);
    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * 2, "·生日：1996-03-07", s, c, 1, f);

    var btn = new LButtonSample2("简历 ▶", 20);
    btn.x = BACK_WIDTH * .5;
    btn.y = txt.y + btn.height;
    btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
        window.open('../resume/resume.html');
    });
    backLayer.addChild(btn);
    var btn = new LButtonSample2("主页 ▶", 20);
    btn.x = BACK_WIDTH * .5 - btn.width * 1.2;
    btn.y = txt.y + btn.height;
    btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
        window.open('../index.html');
    });
    backLayer.addChild(btn);

    ofs = 2
    txt = new NormalText(BACK_WIDTH * 0.03, btn.y + btn.getHeight() * ofs, "Skills:", s, c, 1, f);
    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * ofs, "·Linux、Java", s, c, 1, f);
    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * ofs, "·SpringBoot、SpringMVC、Mybatis、MySQL", s, c, 1, f);
    txt = new NormalText(BACK_WIDTH * 0.03, txt.y + txt.getHeight() * ofs, "·SpringCloud、Docker", s, c, 1, f);

    head = new Head(BACK_WIDTH / 2 - 10, backLayer.y + 100, imgList['head']);
    head.x = BACK_WIDTH * .5 - head.getWidth() * .5;
    head.addEventListener(LMouseEvent.MOUSE_DOWN, head_mousedown);
    head.addEventListener(LMouseEvent.MOUSE_UP, head_mouseup);
    backLayer.addChild(head);

    // 为头像施加随机力
    // var rf = 80;
    // rvx = Math.floor(Math.random()*rf)+Math.floor(Math.random()*-rf);
    // rvy = Math.floor(Math.random()*rf)+Math.floor(Math.random()*-rf);
    // var v = new LGlobal.box2d.b2Vec2(rvx,rvy);
    // head.box2dBody.ApplyForce(v,head.box2dBody.GetWorldCenter());

    //Initial events.
    LGlobal.stage.addEventListener(LKeyboardEvent.KEY_DOWN, onkeydown);
    LGlobal.stage.addEventListener(LKeyboardEvent.KEY_UP, onkeyup);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP, mouseup);
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, mousedown);
    backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, mousemove);

    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    LGlobal.box2d.setEvent(LEvent.POST_SOLVE, postSolve);

    window.onmousewheel = function (event) {
        var v = event.wheelDelta;
        var o = 30;
        if (v >= 0) {
            backLayer.y += o;
        } else {
            backLayer.y -= o;
        }
        if (backLayer.y > 0) {
            backLayer.y = 0;
        } else if (backLayer.y < LGlobal.height - BACK_HEIGHT) {
            backLayer.y = LGlobal.height - BACK_HEIGHT
        }
        LGlobal.box2d.synchronous();
    }


}

function postSolve() {
    if (head != null && !head.IsDie) {
        if (head.HP <= 0) {
            setTimeout(function () {
                if (head != null && !head.IsDie) {
                    head.Die();
                }
            }, 50);
        } else {
            head.HP--;
        }
    }
}

var IsDownOnHead = false;

function head_mousedown(event) {
    IsDownOnHead = true;
}

function head_mouseup(event) {
    IsDownOnHead = false;
}

function onkeyup(event) {
}

var IsDown = false;
var sx = 0;
var sy = 0;
var ex = 0;
var ey = 0;

function mouseup(event) {
    IsDown = false;
    var ox = event.offsetX - backLayer.x;
    var oy = event.offsetY - backLayer.y;

    if (ox < head.x || ox > head.getWidth() || oy < head.y || oy > head.getHeight()) {
        IsDownOnHead = false;
    }
}

function mousedown(event) {
    IsDown = true;
    sx = event.offsetX;
    sy = event.offsetY;
}

function mousemove(event) {
    if (IsDown && !IsDownOnHead) {
        ex = event.offsetX;
        ey = event.offsetY;
        var dx = ex - sx;
        var dy = ey - sy;


        if (Math.abs(dx) < 10) {
            backLayer.y += dy;
            if (backLayer.y > 0) {
                backLayer.y = 0;
            } else if (backLayer.y < LGlobal.height - BACK_HEIGHT) {
                backLayer.y = LGlobal.height - BACK_HEIGHT
            }
            LGlobal.box2d.synchronous();
        }

        sx = ex;
        sy = ey;
    }
}

function onframe() {
}

function onkeydown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 65:    //A
            if (!head.IsDie) {
                head.Die();
            }
            break;
        default:
            break;
    }
}
