function NormalText(x, y, text, size, color, isbolder, font) {
    base(this,LTextField,[]);
    this.x = x;
    this.y = y;
    this.text = text;
    this.size = size;
    this.color = color;
    this.font = font;
    if (isbolder) {
        this.weight = "bolder";
    }

    backLayer.addChild(this);
}

function MiddleText(y, text, size, color, isbolder, font) {
    base(this,LTextField,[]);
    this.y = y;
    this.size = size;
    this.color = color;
    this.font = font;
    this.text = text;
    if (isbolder) {
        this.weight = "bolder";
    }

    this.x = BACK_WIDTH*.5 - this.getWidth()*.5;

    backLayer.addChild(this);
}


// <font> 标签指定一种字体或一个字体列表来显示文本。字体标签支持以下属性：
// ・color：字体的颜色。
// ・face：指定要使用的字体的名称。
// ・size：指定字体的大小。
function HtmlText(x, y, htmltext) {
    base(this,LTextField,[]);
    this.x = x;
    this.y = y;
    this.htmlText = htmltext;

    backLayer.addChild(this);
}
