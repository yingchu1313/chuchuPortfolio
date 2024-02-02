// 登入狀態
var isLogin = false

//檢查是否登入
function checkLogin() {
    $.ajax({
        url: '/PersonalLogin/CheckLogin',
        type: 'get',
        async: false,
        contentType: 'application/json',
        beforeSend: function (xhr) {
        },
        success: function (rtn) {
            if (rtn.data) {
                // 已登入
                isLogin = true
            } else {
                // 未登入，跳出登入視窗                    
                LoginSharedModalByCallFunction(setisLogin);
            }
        },
        error: function (rtn) { console.log(rtn) },
    });
}

//登入後重設登入狀態
function setisLogin() {
    isLogin = true
}

//載入時檢查登入狀態
checkLogin();

// 獎品清單
var prizeList = [
    {
        scGroupId: 1340,
        LinkTitle: "一鍵領取",
        LinkUrl: "https://www.eclife.com.tw/Personal/ShoppingCash/",
        Message: "看來是擁有金手指的大師，恭喜搶到最高$420品牌購物金，品牌商品滿$4600可使用"
    },
    {
        scGroupId: 1339,
        LinkTitle: "一鍵領取",
        LinkUrl: "https://www.eclife.com.tw/Personal/ShoppingCash/",
        Message: "恭喜搶到$360品牌購物金，品牌商品滿$4500可使用"

    },
    {
        scGroupId: 1338,
        LinkTitle: "一鍵領取",
        LinkUrl: "https://www.eclife.com.tw/Personal/ShoppingCash/",
        Message: "恭喜搶到$300品牌購物金，品牌商品滿$3700可使用"
    },
    {
        scGroupId: 1337,
        LinkTitle: "一鍵領取",
        LinkUrl: "https://www.eclife.com.tw/Personal/ShoppingCash/",
        Message: "恭喜搶到$240品牌購物金，品牌商品滿$3000可使用"
    },
    {
        scGroupId: 1336,
        LinkTitle: "一鍵領取",
        LinkUrl: "https://www.eclife.com.tw/Personal/ShoppingCash/",
        Message: "恭喜搶到$180品牌購物金，品牌商品滿$2300可使用"
    },
    {
        scGroupId: 1335,
        LinkTitle: "一鍵領取",
        LinkUrl: "https://www.eclife.com.tw/Personal/ShoppingCash/",
        Message: "恭喜搶到$120品牌購物金，滿$1600可使用"
    },
    {
        scGroupId: 0,
        LinkTitle: "選把好鼠鼠吧",
        LinkUrl: "https://www.eclife.com.tw/MonthEvent/doubleone",
        Message: "你可能要換把反應更快的滑鼠了…"
    },
]

//遊戲開始函式
function GameStart() {
    // 檢查是否登入
    if (!isLogin) {
        LoginSharedModalByCallFunction(setisLogin);
        return false
    }
    else {
        if (Game.time > 0 && Game.time != 21) {
            alert("遊戲尚未結束,不能重新開始哦!");
            return;
        }
        Game.reset();
        Game.init();
        Game.start();
        Game.startTime();
        $(".start").css("display", "none")
    }
}
var Mouse = function (type) {
    //地鼠的具體dom元素,新增到頁面上的
    this.mouse = null;
    //地鼠的編號
    this.num = -1;
    //地洞的編號(地鼠藏身在哪個洞)
    this.hole = -1;
    //初始化,type為地鼠型別,好與壞
    this.init(type);
}
Mouse.prototype = {
    //地鼠型別,好,壞,好的被殺,壞的被殺
    mousetype: {
        "good": "https://img.eclife.com.tw/EDM/11011/doubleone202111/money.png",
        "bad": "https://img.eclife.com.tw/EDM/11011/doubleone202111/money.png",
        "goodkill": "https://img.eclife.com.tw/EDM/11011/doubleone202111/money_touch.png",
        "badkill": "https://img.eclife.com.tw/EDM/11011/doubleone202111/money_touch.png"
    },
    //初始化地鼠
    init: function (type) {
        type = type || "good";
        var _this = this;
        //建立地鼠的dom元素
        this.mouse = document.createElement("div");
        //擴充套件屬性--地鼠型別
        this.mouse.mousetype = type;
        //擴充套件型別--屬否活著
        this.mouse.islive = true;
        if (screen.width < 992) {
            this.mouse.style.cssText = "width:200px;height:200px;background:url('" + this.mousetype[type] + "') no-repeat;left:50%;transform: translateX(-50%);bottom:-10px;position:absolute;margin:auto;cursor:pointer;";
            this.mouse.style.backgroundSize = "190px 190px";
            if (screen.width < 768) {
                this.mouse.style.cssText = "width:150px;height:150px;background:url('" + this.mousetype[type] + "') no-repeat;left:50%;transform: translateX(-35%);bottom:-35px;position:absolute;margin:auto;cursor:pointer;";
                this.mouse.style.backgroundSize = "110px 110px";
            }
        } else {
            this.mouse.style.cssText = "width:200px;height:200px;background:url('" + this.mousetype[type] + "') no-repeat;left:50%;transform: translateX(-45%);bottom:-12px;position:absolute;margin:auto;cursor:pointer;";
            this.mouse.style.backgroundSize = "180px 180px";
        }
        //繫結地鼠被點選事件
        this.mouse.onclick = function (e) { _this.beat(e); };
    },
    //地鼠被點中
    beat: function (e) {
        if (this.mouse.islive) {
            this.mouse.islive = false;
            this.onbeat();
            this.mouse.style.background = "url(" + this.mousetype[this.mouse.mousetype + "kill"] + ")";
            if (screen.width < 992) {
                this.mouse.style.backgroundSize = "190px 190px";
                if (screen.width < 768) {
                    this.mouse.style.backgroundSize = "110px 110px";
                }
            } else {
                this.mouse.style.backgroundSize = "180px 180px";
            }
        }
    },
    //地鼠的動畫
    animation: function (speed) {
        if (screen.width < 992) {
            // 手機速度
            speed = speed == 'fast' ? 30 : speed == 'normal' ? 70 : 110;
        } else {
            // 電腦速度
            speed = speed == 'fast' ? 100 : speed == 'normal' ? 90 : 110;
        }
        var obj = this.mouse,
            ost = obj.style,
            oTop = parseInt(ost.top, 10),
            cut = 5,
            _this = this;
        //讓地鼠從地洞冒出來
        var show = function (top) {
            top = top - cut;
            if (top >= -40) {
                ost.top = top + 'px';
                setTimeout(function () { show(top); }, speed);
            } else {
                setTimeout(function () { hide(-40); }, speed * 10);
            }
        }
        //隱藏地鼠
        var hide = function (top) {
            top = top + cut;
            if (top <= oTop) {
                ost.top = top + 'px';
                setTimeout(function () { hide(top); }, speed);
            } else {
                _this.reset();
            }
        }
        show(oTop);
    },
    //重置地鼠,當地鼠滾回洞裡的時候
    reset: function () {
        this.mouse.islive = true;
        this.mouse.style.background = "url(" + this.mousetype[this.mouse.mousetype] + ")";
        if (screen.width < 992) {
            this.mouse.style.backgroundSize = "190px 190px";
            if (screen.width < 768) {
                this.mouse.style.backgroundSize = "110px 110px";
            }
        } else {
            this.mouse.style.backgroundSize = "180px 180px";
        }
        this.onend();
    },
    //擴充套件方法:地鼠被點中
    onbeat: function () { },
    //擴充套件方法:地鼠動畫結束後
    onend: function () { }
}

//遊戲控制類
var Game = {
    //遊戲時間,20秒
    time: 21,
    //地鼠地圖,總共有十隻,其中兩隻是壞的
    mouseMap: {
        1: 'good',
        2: 'bad',
        3: 'good',
        4: 'bad',
        5: 'bad',
        6: 'good',
        7: 'bad',
        8: 'good',
        9: 'good',
        10: 'bad'
    },
    //所有的地鼠dom元素
    allMouse: [],
    //目前分數
    nowScore: 0,
    //目前有哪幾個地洞給佔用
    hasHole: {},
    //目前有哪幾只地鼠是活動的
    hasMouse: {},
    //頁面的地洞集合
    lis: null,
    //初始化地鼠與地洞
    init: function () {
        //獲取頁面的地洞集合
        this.lis = document.getElementById('panel').getElementsByTagName('li');
        _this = this;
        //初始化10只地鼠
        for (var i = 1; i <= 10; i++) {
            var mouse = new Mouse(this.mouseMap[i]);
            //擴充套件地鼠被點中事件
            mouse.onbeat = function () {
                //修改分數
                Game.changeScore(+5);
            }
            //擴充套件地鼠動畫結束事件
            mouse.onend = function () {
                //移除地洞中的地鼠
                var li = _this.lis[this.hole];
                li.removeChild(li.mouse.mouse);
                li.mouse = null;
                //清除對應的地洞與地鼠
                _this.hasHole[this.hole] = null;
                _this.hasMouse[this.num] = null;
            }
            this.allMouse.push(mouse);
        }
    },
    //修改遊戲分數
    changeScore: function (score) {
        this.nowScore += score;
        document.getElementById('score').innerHTML = this.nowScore;
    },
    //遊戲開始
    start: function () {
        if (this.time <= 0) return;
        var _this = this;
        //隨機地洞編號
        var random = parseInt(Math.random() * 9, 10);
        while (this.hasHole[random]) {
            random = parseInt(Math.random() * 9, 10);
        }
        //隨機地鼠編號
        var randomMouse = parseInt(Math.random() * 10, 10);
        while (this.hasMouse[randomMouse]) {
            randomMouse = parseInt(Math.random() * 10, 10);
        }
        //新增地鼠到地洞中
        this.allMouse[randomMouse].hole = random;
        this.allMouse[randomMouse].num = randomMouse;
        this.lis[random].appendChild(this.allMouse[randomMouse].mouse);
        this.lis[random].mouse = this.allMouse[randomMouse];
        this.lis[random].mouse.animation('normal');
        //記錄地鼠與地洞編號
        this.hasHole[random] = 'true';
        this.hasMouse[randomMouse] = 'true';
        setTimeout(function () { _this.start(); }, 200);
    },
    //倒計時
    startTime: function () {
        this.time -= 1;
        var _this = this;
        document.getElementById('time').innerHTML = this.time;
        if (this.time > 0) {
            setTimeout(function () { _this.startTime() }, 1000);
        }
        if (this.time == 0) {
            scoremodal()
            $(".start").css("display", "block")
        }
    },
    //重置遊戲設定
    reset: function () {
        this.time = 21;
        this.allMouse = [];
        this.nowScore = 0;
        this.hasHole = {};
        this.hasMouse = {};
        this.lis = null;
        this.changeScore(0);
    }
}

//領取購物金跳窗
function scoremodal() {
    var scorenum = $("#score").text();
    var scoreTotal = scorenum.toString();
    var prize = prizeList[6]

    if (scoreTotal >= 360) {
        prize = prizeList[0]
    }
    else if (scoreTotal>=310) {
        prize = prizeList[1]
    }
    else if (scoreTotal >= 260) {
        prize = prizeList[2]
    }
    else if (scoreTotal >= 210) {
        prize = prizeList[3]
    }
    else if (scoreTotal >= 160) {
        prize = prizeList[4]
    }
    else if (scoreTotal >= 110) {
        prize = prizeList[5]
    }

    if (scoreTotal < 110) {
        // 未達成再玩一次訊息
        showModalFail(prize);
    } else if (scoreTotal >= 110) {
        // 達成110枚以上時，領取購物金跳窗
        showModal(prize);
        setTimeout(function () {
            checkMediaCouponAjax(prize.scGroupId);
        }, 500)
    }
}

//複製折扣碼
function copyurl1() {
    var copyText = document.getElementById("txt_output1");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert('copy success');
}

// 顯示訊息視窗
function showModal(prize) {
    link = "<a href=" + prize.LinkUrl + " target='_blank'>" + prize.LinkTitle + "</a>"
    $("#modal-container1 .modal-content").html("<div class='col-xs-12'><p class='modal-title'>" + prize.Message + "</p><p class='modal-ps'>" + link + "</p></div>");
    $("#modal-container1").modal();
}

// 顯示訊息視窗
function showModalFail(prize) {
    link = "<a href=" + prize.LinkUrl + " target='_blank'>" + prize.LinkTitle + "</a>"
    $("#modal-container2 .modal-content").html("<div class='col-xs-12'><p class='modal-title'>" + prize.Message + "</p><p class='modal-ps'>" + link + "</p></div>");
    $("#modal-container2").modal();
}

// 已登入，檢查活動
function checkMediaCouponAjax(scGroupId) {
    // ajax 檢查活動
    $.ajax({
        url: '/Event/CheckEvnShoopinCash?scGroupId=' + scGroupId,
        type: 'get',
        async: false,
        contentType: 'application/json',
        beforeSend: function (xhr) {
        },
        success: function (rtn) {
            if (rtn.status == 'ok') {
                // 已登入，領取優惠券
                getMediaCouponAjax(scGroupId);
            } else {
                alert(rtn.message)
            }
        },
        error: function (rtn) { console.log(rtn) },
    });
}

// Ajax 領取優惠券
function getMediaCouponAjax(scGroupId) {   
    $.ajax({
        url: '/Event/GiveEvntShopingCashByscGroupId',
        data: JSON.stringify({ "scGroupId": scGroupId }),
        type: 'post',
        async: false,
        contentType: 'application/json',
        beforeSend: function (xhr) {
        },
        success: function (rtn) {
            if (rtn.status == 'ok') {
                console.log('感謝您！購物金已匯入您的會員帳戶！')
            } else {
                console.log('感謝！您已成功領取，請記得使用喔！')
            }
        },
        error: function (rtn) { console.log(rtn) },
    });
}

