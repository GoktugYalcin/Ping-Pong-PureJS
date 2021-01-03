var hizOyuncu = 15;
var xHizi = 3;
var yHizi = 1;
var oyunHizi = 1; //Tavsiye edilen aralık : 1-10

function pxToNum(urpx) {//CSS'ten gelen px değerlerini Number değişkene çevirmek için kullanır.
    return Number(urpx.replace("px", ""))
}

var sagBar = document.getElementById('sag-bar');
var solBar = document.getElementById('sol-bar');
var topOyun = document.getElementById('top');

var puanSag = document.getElementById('puanSag');
var puanSol = document.getElementById('puanSol');
var ayrac = document.getElementById('ayrac');
var geri = document.getElementById('geri');

var genislik = window.innerWidth;
var yukseklik = window.innerHeight;

var map = []; //Tus dizilimini barindiran array
onkeydown = onkeyup = function(e) {//key'e basma handle'ı
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

geri.onclick = function(){
    document.location.href="./anasayfa.html";
}

function tusKontrol() {//Tuslar icin top property'leri ayarlama
    if (map[40]) { //asagi tusu
        if (pxToNum(sagBar.style.top) + hizOyuncu > yukseklik - 85)
            sagBar.style.top = yukseklik - 85 + "px";
        else
            sagBar.style.top = pxToNum(sagBar.style.top) + hizOyuncu + "px";
    }

    else if (map[38]) {//yukari tusu
        if (pxToNum(sagBar.style.top) - hizOyuncu < 0)
            sagBar.style.top = 0 + "px";
        else
            sagBar.style.top = pxToNum(sagBar.style.top) - hizOyuncu + "px";
    }

    if (map[83]) { //s tusu
        if (pxToNum(solBar.style.top) + hizOyuncu > yukseklik - 85)
            solBar.style.top = yukseklik - 85 + "px";
        else
            solBar.style.top = pxToNum(solBar.style.top) + hizOyuncu + "px";
    }

    else if (map[87]) { //w tusu
        if (pxToNum(solBar.style.top) - hizOyuncu < 0)
            solBar.style.top = 0 + "px";
        else
            solBar.style.top = pxToNum(solBar.style.top) - hizOyuncu + "px";
    }
}

topOyun.style.left = genislik / 2 + "px";

function topYer() {//Topun konum güncellemesi
    topOyun.style.left = pxToNum(topOyun.style.left) + xHizi + "px";
    topOyun.style.top = pxToNum(topOyun.style.top) + yHizi + "px";
}

function topHareket() {//Topun hareket kuralları
    topYer();
    if (yukseklik < pxToNum(topOyun.style.top) + 20 || pxToNum(topOyun.style.top) < 0) {
        yHizi *= -1;
    }

    //Taşma kontrolleri
    if (pxToNum(topOyun.style.left) >= genislik - 30) {
        if (pxToNum(sagBar.style.top) <= pxToNum(topOyun.style.top) + 20 && pxToNum(sagBar.style.top) + 85 >= pxToNum(topOyun.style.top)) {
            xHizi *= -1;
        } else if (pxToNum(topOyun.style.left) >= genislik - 20)
            puanTablosu('sol');
    }

    if (pxToNum(topOyun.style.left) <= 12) {
        if (pxToNum(solBar.style.top) <= pxToNum(topOyun.style.top) + 20 && pxToNum(solBar.style.top) + 85 >= pxToNum(topOyun.style.top)) {
            xHizi *= -1;
        } else if (pxToNum(topOyun.style.left) <= 0)
            puanTablosu('sag');
    }
    setTimeout(function() {//Topun oynamasının ve hızının kontrolü
        topHareket()
    }, oyunHizi);
}

function geriKontrol() {//Geri tuşunun solBar ile çakışmasının kontrolü
    if(pxToNum(solBar.style.top) <= 125 )
        geri.style.color = "wheat";
    else
        geri.style.color = "#003366";
}

function puanKontrol() {//Maç kazananın handle'ı
    if(Number(puanSol.innerHTML)>= 5)
    {
        document.location.href="./anasayfa.html";
        alert("Sol taraf kazandı !"+
        "\nSol Taraf : "+puanSol.innerHTML+
        "\nSağ Taraf : "+puanSag.innerHTML);

        var sonuc = [{"skor":puanSol.innerHTML+" - "+puanSag.innerHTML,
        "kazanan":"Sol Taraf"}];
        localStorage.setItem("sonuc", JSON.stringify(sonuc));
    }

    else if(Number(puanSag.innerHTML)>= 5)
    {
        document.location.href="./anasayfa.html";
        alert("Sağ taraf kazandı !"+
        "\nSol Taraf : "+puanSol.innerHTML+
        "\nSağ Taraf : "+puanSag.innerHTML);

        var sonuc = [{"skor":puanSag.innerHTML+" - "+puanSol.innerHTML,
        "kazanan":"Sag Taraf"}];
        localStorage.setItem("sonuc", JSON.stringify(sonuc));
    }

}

setInterval(function() {//Ana fonksiyonlar
    tusKontrol();
    geriKontrol();
    puanKontrol();
}, 10);
topHareket();

function puanTablosu(taraf) {//Puan tablosunun kontrolleri

    puanSag.style.color = "#144955";
    puanSol.style.color = "#144955";
    ayrac.style.color = "#144955";

    setTimeout(function() {
        puanSag.style.color = "wheat";
        puanSol.style.color = "wheat";
        ayrac.style.color = "wheat";
    }, 1000);

    if (taraf == "sag")
        puanSag.innerHTML = Number(puanSag.innerHTML) + 1;
    else
        puanSol.innerHTML = Number(puanSol.innerHTML) + 1;

    xHizi *= -1;
    topOyun.style.left = genislik / 2 + "px";
}
