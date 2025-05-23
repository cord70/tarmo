//cord70.github.io/tarmo

//var googlecounter='UA-9493768-5';
var googlecounter='G-R0FRG6NEF1';
var disqusname='cyber-ek';

var alt = 'logo - Механизмы сознания';
var alt_en = 'logo - Mechanisms of Consciousness';
var title = 'Механизмы сознания';
var title_en = 'Mechanisms of Consciousness';
var logo = 'images/home.gif';

function topmenu() {
    if (pagelang == 'ru') {
	return ""
    }
    else {
	return ""
    }
}


//photo-ek.ru cyber-ek.ru cord70.github.io/tarmo 

// lazy counters
var scrolldone = false;
function onLazyScroll() {
    if (!scrolldone) {
        scrolldone = true; if (!navigator.onLine) return;

        // google analytics
        setTimeout(function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', googlecounter);
            var s = document.createElement("script");
            s.src = 'https://www.googletagmanager.com/gtag/js?id=' + googlecounter;
            s.async = true;
            document.body.appendChild(s);
        }, 500); // 500ms после scroll
    }
}
addScrollEvent(onLazyScroll);


var homepage = 'index.html';
var comments = 'Комментарии';
var email = 'post/email.html';
var email_title = 'автор';
var path = window.location.pathname; // путь внутри домена например /txt/love-me.html
var page = path.split("/").pop(); // имя файла например love-me.html
var pagelang = document.getElementsByTagName('html')[0].lang; // maybe undefined
if (pagelang == 'en') {
    homepage = 'en.html';
    alt = alt_en;
    title = title_en;
    comments = 'Comments';
    email = 'post/email-en.html';
    email_title = 'author';
} else pagelang = 'ru';

var author = '';
var authors = document.getElementsByName('author');
if (authors.length > 0) author = authors[0].content;


// определение относительного адреса и пути
var refpath = ''; // путь возвращения к домену в виде последовательных ../
var refurl = homepage; // адрес относительно домена
var scripts = document.getElementsByTagName('script'); // никогда не null
for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf('ansimeta.js') > 0) { // путь к ansimeta.js должен быть относительным
        var html = scripts[i].outerHTML; // пример <script src="../../../images/ansimeta.js"></script>
        var p1 = html.indexOf('../');
        var p2 = html.lastIndexOf('../') + 3;
        if (p1 > 0) refpath = html.substring(p1, p2); // пример ../../../
        var pathlevel = (refpath.match(/\.\.\//g) || []).length; // сколько раз встречается ../ , пример 3
        refurl = window.location.pathname; // пример /photo/underwater/coral/index.html
        if (refurl[refurl.length - 1] == '/') refurl = refurl + homepage; // endsWith() не работает в IE
        while ((refurl.match(/\//g) || []).length > pathlevel)
            refurl = refurl.substring(refurl.indexOf('/') + 1); // пример photo/underwater/coral/index.html
        break;
    }
}


header();
navstring();
footer();
includeMenu();


//-------------------------------------------
// функции
function header() {
    var headers = document.body.getElementsByTagName('header');
    if (headers.length > 0) {
        var h0 = headers[0];
        var html = h0.innerHTML.replace(/\s*/g, ''); // удаление пробелов

        if (html.length == 0) // если header пустой
            h0.outerHTML =
                '<header>' +
                '<span class="hide-lt480px"><a href="' + refpath + homepage + '">' +
                '<img src="' + refpath + logo + '" alt="' + alt + '" width="76" height="27"></a></span> ' +
                '<span class="big"><a href="' + refpath + homepage + '">' + title + '</a></span>' +
                '<nav><p class="hide-lt480px">' + removeSelfRef(topmenu()) + '</p></nav>' +
                '</header>';
    }
}


function footer() {
    var footers = document.body.getElementsByTagName('footer');
    if (footers.length > 0) {
        var prevnext = '<nav class="foot1 sel"><p id="prev"></p><p id="next"></p></nav>';

        var lastnav = '';
        if (author != '')
            lastnav = '<nav class="foot1" ><a rel="author" title="' +
                email_title + '" href="' + refpath + email + '">' + author + '</a></nav>';

        footers[0].outerHTML = '<footer> ' + prevnext + lastnav + ' </footer>';
    }
}

function navstring() {//вывод навигации в виде строки
    var menu = document.getElementById('navstring');
    if (!menu) return;

    var html = '';
    var pageadr = refurl;
    var pagetitle;
    var p1 = 0;
    do {
        if (pagetitle != 'images' && pagetitle != '600' && pagetitle != '200')
            if (html == '')
                html = document.title;
            else
                html = ' <a href="' + refpath + pageadr + '/' + homepage + '">' + pagetitle + '►</a>' + html;
        p1 = pageadr.lastIndexOf('/');
        pageadr = pageadr.substring(0, p1);
        var p2 = pageadr.lastIndexOf('/');
        pagetitle = pageadr.substring(p2 + 1); // имя директории
    } while (p1 >= 0);

    html = '<a href="' + refpath + homepage + '">' +
        '<img src="' + refpath + logo + '" alt="ref to home page" title="home page"></a> ' + html;

    menu.outerHTML = '<nav><p class="hide-lt480px">' + html + '</p></nav>';
}


// disqus
var chat = document.getElementById('disqus_thread');
var disqusLoaded = false;
if (chat) {
    insertBeforeend(chat, '<div class="center"><button class="big" onclick="loadDisqus();">' +
        comments + '...</button></div>'); // на случай если не работает scroll	
    function onDisqusScroll(e) {
        // scrollingElement.scrollTop не работает в ie8
        var currentScroll = document.documentElement.scrollTop;
        if (!disqusLoaded && (currentScroll > chat.getBoundingClientRect().top - 100)) loadDisqus();
    }
    addScrollEvent(onDisqusScroll);

}
function loadDisqus() {
    disqusLoaded = true;
    window.disqus_config = function () {
        this.page.url = chat.getAttribute('data-url');
        this.page.identifier = chat.getAttribute('data-id');
    };
    var s = document.createElement('script');
    s.setAttribute('data-timestamp', +new Date());
    s.async = true; // чтобы страница не повисла на время загрузки
    s.src = 'https://' + disqusname + '.disqus.com/embed.js';
    (document.head || document.body).appendChild(s);
    insertBeforebegin(chat, '<h2 class="foot1">' + comments + '</h2>');
}


function addScrollEvent(func) {
    if (window.addEventListener) window.addEventListener('scroll', func, false);
    else if (window.attachEvent) window.attachEvent('onscroll', func);
    else window['scroll'] = func;
}


function insertBeforeend(elem, htmlText) { elem.insertAdjacentHTML('beforeend', htmlText); }
function insertBeforebegin(elem, htmlText) { elem.insertAdjacentHTML('beforebegin', htmlText); }


function show() { // отладочная функция, показываем строки в конце страницы
    var str = '<p>debug_output: ' + show.caller.name + '<br>';
    for (var i = 0; i < arguments.length; i++)
        str += '<span class="big"> ' + arguments[i] + '</span><br>';
    var body = document.getElementsByTagName('body')[0];
    if (body) insertBeforeend(body, str);
}


function includeMenu() {
    var m = document.getElementById('menu'); if (!m) return;

    if (pagelang == 'en') menu = menuen;

    var links = menu.match(new RegExp(/<a.*?a>/g)); // '<a href="omar.html"> Омар Хайям</a>'

    // ищем предыдущую и следующую ссылку
    for (var i = 0; i < links.length; i++)
        if (links[i].indexOf('"' + page + '"') > 0) {
            if (i > 0) {
                var prev = document.getElementById('prev');
                if (prev) prev.outerHTML = '<p class="left"> ◄ ' + links[i - 1] + '</p>';
            }
            if (i < links.length - 1) {
                var next = document.getElementById('next');
                if (next) next.outerHTML = '<p class="right">' + links[i + 1] + ' ► </p>';
            }
            break;
        }

    var nav = document.createElement('nav'); nav.className = 'leftnav';
    nav.innerHTML = removeSelfRef(menu);
    m.appendChild(nav);
}


function removeSelfRef(menu) {
    if (path == '/' + page) // для страницы index.html
        return menu;

    // находим строку со ссылкой на себя
    var linkPage = new RegExp('<a href="' + page + '">(.*?)</a>'); 
    var link = menu.match(linkPage); // найденный текст
    if (link == null) // для topmenu требуется алгоритм
        return menu;

    // убираем ссылку на себя, оставляем текст
    return menu.replace(linkPage, '<span class="white">' + '$1' + '</span>');
}