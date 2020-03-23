function Head(x, y, bitmapdata) {
    base(this,LSprite,[]);
    this.x = x;
    this.y = y;
    this.IsDie = false;
    this.HP = 1;

    this.bitmapData = new LBitmapData(bitmapdata);
    this.bitmap = new LBitmap(this.bitmapData);

    this.addChild(this.bitmap);

    this.addBodyPolygon(this.bitmap.width, this.bitmap.height, 1, 0.1, 0.8, 0.7);
    this.setBodyMouseJoint(true);

}

Head.prototype.Die = function () {
    this.IsDie = true;
    IsDownOnHead = false;
    backLayer.removeChild(this);

    var strlist = [
        "left_body",
        "right_body",
        "left_head",
        "right_head",
        "left_arm",

        "right_arm",
        "left_eye",
        "right_eye",
        "mouth"
    ];

    var pieces = [];

    for(var i=0;i<strlist.length;i++){
        pieces[i] = new Head(this.x + backLayer.x, this.y + backLayer.y, imgList[strlist[i]]);

        backLayer.addChild(pieces[i]);

        var rf = 150;
        rvx = Math.floor(Math.random()*rf)+Math.floor(Math.random()*-rf);
        rvy = Math.floor(Math.random()*rf)+Math.floor(Math.random()*-rf);
        var v = new LGlobal.box2d.b2Vec2(rvx,rvy);
        pieces[i].box2dBody.ApplyForce(v,pieces[i].box2dBody.GetWorldCenter());
    }

    setTimeout(function () {
        for(var i=0;i<pieces.length;i++){
            backLayer.removeChild(pieces[i]);
            pieces[i] = null;
        }

        head = new Head(BACK_WIDTH/2-10,backLayer.y+100,imgList['head']);
        head.x = BACK_WIDTH*.5-head.getWidth()*.5;
        backLayer.addChild(head);
        head.addEventListener(LMouseEvent.MOUSE_DOWN,head_mousedown);
        head.addEventListener(LMouseEvent.MOUSE_UP,head_mouseup);
    },5000);

};
