click = 0;

function overclick() {
    click++;
    if (click == 50) {
        alert("點擊超過50下，重新挑戰!");
        history.go(0);
    }
}

function get(e) {
    var point = document.getElementById("point");
    sum = point.innerHTML = (parseInt(point.innerHTML) + 1);
    e.onclick = function() {
        e.onclick = null;
    }
    e.style.border = "3px solid red";
    document.getElementById("answer").play();
    if (sum === 10) {
        document.getElementById("photo").style = "filter:opacity(30%)";
        $("#modal-container1").modal();
    }
}

function start(e) {
    var photo = document.getElementById("photo");
    photo.style = "filter:opacity(100%)";
    e.style.display = 'none';
    time();
}

function time() {
    var time = document.getElementById("time");
    time.innerHTML = (parseInt(time.innerHTML) - 1);
    var point = document.getElementById("point");
    if (parseInt(point.innerHTML) < 10) {
        if (parseInt(time.innerHTML) > 0) {
            setTimeout("time()", 1000);
        }
    }

    if (parseInt(time.innerHTML) == 0) {
        var sum = point.innerHTML
        if (sum != 10) {
            $("#modal-container2").modal();
            document.getElementById("photo").style = "filter:opacity(30%)";
        }
    }
}

function reload() {
    location = ''
}

function copyurl1() {
    var copyText = document.getElementById("txt_output1");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert('複製成功');
}