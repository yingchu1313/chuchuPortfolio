$(document).ready(function() {

    
    $(".gobtn").on('click', function(event) {
        $(".gobtn").hide()
        $(".game").show()
        startTime();
    });

    // 點選領取優惠券
    // //隨活動更換
    // var scGroupId = 1623

    // // 已登入，檢查活動
    // function checkMediaCouponAjax() {
    //     // ajax 檢查活動
    //     $.ajax({
    //         url: '/Event/CheckEvnShoopinCash?scGroupId=' + scGroupId,
    //         type: 'get',
    //         async: false,
    //         contentType: 'application/json',
    //         beforeSend: function(xhr) {},
    //         success: function(rtn) {
    //             if (rtn.status == 'ok') {
    //                 // 已登入，開始遊戲
    //                 $(".gobtn").hide()
    //                 $(".game").show()
    //                 startTime();
    //             } else {
    //                 alert('活動已經結束囉！')
    //             }
    //         },
    //         error: function(rtn) { console.log(rtn) },
    //     });
    // }

    // function getMediaCouponAjax() {
    //     // ajax 領取優惠券
    //     $.ajax({
    //         url: '/Event/GiveEvntShopingCashByscGroupId',
    //         data: JSON.stringify({ "scGroupId": scGroupId }),
    //         type: 'post',
    //         async: false,
    //         contentType: 'application/json',
    //         beforeSend: function(xhr) {},
    //         success: function(rtn) {
    //             if (rtn.status == 'ok') {
    //                 // alert('感謝您！購物金已匯入您的會員帳戶，\n請記得使用喔，謝謝！')
    //                 $("#modal-container1").modal();
    //             } else {
    //                 // alert('感謝！您已成功領取，請記得使用喔，謝謝！')
    //                 $("#modal-container2").modal();
    //             }
    //         },
    //         error: function(rtn) { console.log(rtn) },
    //     });
    // }


    var timer = 30
    //倒計時
    function startTime() {
        var interval = setInterval(function() {
            timer--;
            $('#time').text(timer);
            if (timer === 0 || $(".card-removed").length == 12) clearInterval(interval);
            if (timer ===0 && $(".card-removed").length < 12){
                $("#modal-container3").modal();
            }
        }, 1000);
    }

    //翻牌遊戲
    var bleep = new Audio();
    bleep.src = "https://img.eclife.com.tw/EDM/11005/MatchGame/cigarette_lighter_1.wav"
    var neusoft = {};
    neusoft.matchingGame = {};
    neusoft.matchingGame.cardWidth = 200; //牌宽
    neusoft.matchingGame.cardHeight = 300;
    neusoft.matchingGame.deck = [
        "cardAK", "cardAK",
        "cardAQ", "cardAQ",
        "cardAJ", "cardAJ",
        "cardBK", "cardBK",
        "cardBQ", "cardBQ",
        "cardBJ", "cardBJ",
    ]
    //隨機排序函數,返回-1或1
    function shuffle() {
        //Math.random能返回0~1之間的數
        return Math.random() > 0.5 ? -1 : 1
    }
    //翻牌功能
    function selectCard() {
        var $fcard = $(".card-flipped");
        //翻了兩張牌後退出翻牌
        if ($fcard.length > 1) {
            return;
        }
        $(this).addClass("card-flipped");
        //若翻動兩張牌觸發檢查是否一致
        var $fcards = $(".card-flipped");
        if ($fcards.length == 2) {
            setTimeout(function() {
                checkPattern($fcards);
            }, 400);
        }
        console.log($fcards.length);

        if ($fcards.length == 8) {
            alert('恭喜挑戰成功！');
            success = true;
        }
    }
    //實現隨機洗牌
    neusoft.matchingGame.deck.sort(shuffle);
    var $card = $(".cardBox");
    for (var i = 0; i < 11; i++) {
        $card.clone().appendTo($(".cards"));
    }
    //對每張牌進行設置
    $(".card").each(function(index) {
        //吐出一個牌號
        var pattern = neusoft.matchingGame.deck.pop();
        //暫存牌號
        $(this).data("pattern", pattern);
        //把其翻牌後的對應牌面附加上去
        $(this).find(".back").addClass(pattern);
        //典籍排的功能函數掛接
        $(this).click(selectCard);
    });

    //檢查是否一致
    function checkPattern(cards) {
        var good = new Audio();
        good.src = "./music/correct2.mp3"
        var pattern1 = $(cards[0]).data("pattern");
        var pattern2 = $(cards[1]).data("pattern");

        $(cards).removeClass("card-flipped");
        if (pattern1 == pattern2) {
            good.play();
            $(cards).addClass("card-removed");
            console.log($(".card-removed").length);
            if ($(".card-removed").length == 12) {
                $("#modal-container1").modal();
            }
        }
    }



});

// 重新來
function EventReset() {
    window.location.reload();
}
    
function copyurl1() {
    var copyText = document.getElementById("txt_output1");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert('複製成功');
}

function copyurl2() {
    var copyText = document.getElementById("txt_output2");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert('複製成功');
}

function copyurl3() {
    var copyText = document.getElementById("txt_output3");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert('複製成功');
}
//header選單
$(function () {
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemMargin: 5,
        pausePlay: false
    });
    $("#js-mainNAV button").click(function(){
      $("#js-side-nav-open").css("right", "0%");
      $("#js-doc-bg").show();
      $("html").addClass("htmlFix");
    });
    $("#js-doc-bg").click(function(event) {
      $("#js-side-nav-open").css("right", "");
      $("#js-doc-bg").hide();
      $("html").removeClass("htmlFix");
    });
    // 算螢幕的寬度
    function getTotalWidth() {
        var myWidth;
        if (typeof (window.innerWidth) == 'number') {
            myWidth = window.innerWidth - 20;
        } else {
            myWidth = document.documentElement.clientWidth - 20;
        }
        return myWidth;
    }

    if (getTotalWidth() < 1200) {
        $("#js-side-nav-open .megaMENU").css("margin-left", "");
        // 點擊 li 打開次選單
        $("#js-side-nav-open li").click(function(){
          $("#js-side-nav-open li").removeClass("js-side-nav-in");
          $(this).toggleClass("js-side-nav-in");
        });
        $(".megaMENU").css("width", "");
    }
});