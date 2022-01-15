// leaflet.js
let mapTop = L.map('mapTop',{
    center:[35.363032, 138.730934],
    zoom:15,
    dragging:true,
    touchZoom:true,
    scrollWheelZoom:false,
    doubleClickZoom:true,
    boxZoom:true,
    tap:true,
    keyboard:true,
    zoomControl:true,
    closePopupOnClick: false,
    });
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    minZoom:10,
    maxZoom:17,
    attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
    }).addTo(mapTop);
mapTop.zoomControl.setPosition('bottomright');

// アイコン
let telharuflag= L.icon({
    iconUrl:'../img/icon-toilet.svg',
    iconSize: [25, 25],
    iconAnchor: [10, 15],
    popupAnchor: [0, -50],
    className: 'i_start active'
    });
let checkeredflag= L.icon({
    iconUrl:'../img/icon-toilet.svg',
    iconSize: [25, 25],
    iconAnchor: [10, 15],
    popupAnchor: [0, -50],
    className: 'i_goals active'
    });
let toilet= L.icon({
    iconUrl:'../img/icon-toilet.svg',
    iconSize: [25, 25],
    iconAnchor: [10, 15],
    popupAnchor: [0, -50],
    className: 'i_toilet active'
    });
let peek= L.icon({
    iconUrl:'../img/icon-peek.svg',
    iconSize: [25, 25],
    iconAnchor: [10, 15],
    popupAnchor: [0, -50],
    className: 'i_peek active'
    });
let ridge= L.icon({
    iconUrl:'../img/icon-ridge.svg',
    iconSize: [25, 25],
    iconAnchor: [10, 15],
    popupAnchor: [0, -50],
    className: 'i_ridge active'
    });

// メインルート
let mainRoute1= omnivore.kml('../kml/mainRoute.kml',null,
    L.geoJson(null,
    {style: {color: "red", weight: 3, opacity: 1},}))
    .bindTooltip('<p>メインルートツールチップ</p>',{opacity:1})
    .bindPopup('<p>メインルートポップアップ</p>',{autoClose:false});
mapTop.addLayer(mainRoute1);
let mainRouteGp=L.layerGroup([mainRoute1]);
mapTop.addLayer(mainRouteGp);

// ルート2
let route2= omnivore.kml('../kml/test2.kml',null,
    L.geoJson(null,
    {style: {color: "#0b8050", weight: 3, opacity: 1},}))
    .bindPopup('<strong>2日目のルート</strong><br>ルーピアイン南湖→桂川PA',{autoClose:false});
mapTop.addLayer(route2);
let routefr2=L.marker([35.360077,138.729361],{icon:telharuflag}).bindPopup("<p>スタート</p>",{autoClose:false});
let routeto2=L.marker([35.360349,138.734489],{icon:checkeredflag}).bindPopup("<p>ゴール</p>",{autoClose:false});
let routeGP2=L.layerGroup([route2,routefr2,routeto2]);
mapTop.addLayer(routeGP2);

// toilet
let toilet_1=L.marker([35.362408,138.733587],{icon:toilet}).bindPopup("<p>トイレ1</p>",{autoClose:false});
let toilet_2=L.marker([35.364254,138.727880],{icon:toilet}).bindPopup("<p>トイレ2</p>",{autoClose:false});
let toilet_3=L.marker([35.361057,138.732214],{icon:toilet}).bindPopup("<p>トイレ3</p>",{autoClose:false});
let toiletGP1=L.layerGroup([toilet_1,toilet_2,toilet_3]);
mapTop.addLayer(toiletGP1);

// ピーク
let peek_1=L.marker([35.485184,138.866179],{icon:peek}).bindPopup("<ul><li>杓子山</li><li>しゃくしやま</li><li>1597.5m</li><li>19</li><li>山梨百名山</li></ul>",{autoClose:false});
let peek_2=L.marker([35.487967,138.878399],{icon:peek}).bindPopup("<ul><li>鹿留山</li><li>ししどめやま</li><li>1632.0m</li><li>15</li></ul>",{autoClose:false});
let peek_3=L.marker([35.468264,138.882616],{icon:peek}).bindPopup("<ul><li>加瀬山</li><li>かせやま</li><li>1275m</li><li>46</li></ul>",{autoClose:false});
let peekGP=L.layerGroup([peek_1,peek_2,peek_3]);
mapTop.addLayer(peekGP);

// 峠
let ridge_1=L.marker([35.480217,138.863922],{icon:ridge}).bindPopup("<ul><li>大権首峠</li><li>おおざすとうげ</li><li>1330m</li></ul>",{autoClose:false});
let ridge_2=L.marker([35.475535,138.883955],{icon:ridge}).bindPopup("<ul><li>立ノ塚峠</li><li>たちんづかとうげたちんづかとうげ</li><li>1233m</li><li>「内野峠」とも呼ばれる</li></ul>",{autoClose:false});
let ridge_3=L.marker([35.457043,138.892599],{icon:ridge}).bindPopup("<ul><li>二十曲峠</li><li>にじゅうまがりとうげ</li><li>1150m</li></ul>",{autoClose:false});
let ridgeGP=L.layerGroup([ridge_1,ridge_2,ridge_3]);
mapTop.addLayer(ridgeGP);


// レイヤーグループ
let routelayers = {
    "ルート1":mainRouteGp,
    "ルート2":routeGP2,
    "トイレ":toiletGP1,
    "ピーク":peekGP,
    "峠":ridgeGP,
};
// L.control.layers(null,routelayers ).addTo(mapTop);
L.control.scale().addTo(mapTop);

// 印刷
L.easyPrint({
    title: '地図を印刷する',
    position: 'bottomright',
    sizeModes: ['A4Portrait', 'A4Landscape']
}).addTo(mapTop);
    



// アイコンの表示切り替え
jQuery('.i_root1_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.leaflet-overlay-pane svg g path:nth-of-type(1)').toggleClass('hidde');
});
jQuery('.i_root2_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.leaflet-overlay-pane svg g path:nth-of-type(2)').toggleClass('hidde');
});
jQuery('.i_start_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.i_start').toggleClass('active');
});
jQuery('.i_goals_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.i_goals').toggleClass('active');
});
jQuery('.i_toilet_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.i_toilet').toggleClass('active');
});
jQuery('.i_peek_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.i_peek').toggleClass('active');
});
jQuery('.i_ridge_cont').on('click', function() {
    jQuery(this).toggleClass('hidde');
    jQuery('.i_ridge').toggleClass('active');
});
