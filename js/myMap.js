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

// ルート1
let route0= omnivore.kml('../kml/test.kml',null,
    L.geoJson(null,
    {style: {color: "red", weight: 3, opacity: 1},}))
    .bindTooltip('<strong>1日目のルート</strong><br><p>桂川PA→ルーピアイン南湖</p><p>所要時間：3時間</p>',{opacity:1})
    .bindPopup('<strong>1日目のルート</strong><br><p>桂川PA→ルーピアイン南湖</p><p>所要時間：3時間</p>',{autoClose:false});
mapTop.addLayer(route0);
let routefr0=L.marker([35.365354,138.730979],{icon:telharuflag}).bindPopup("<p>スタート</p><div><img src=\"/wp-content/uploads/2021/08/steering-2.jpg\"></div><div><a href=\"https://test.fujisan-lt.jp/\">リンクも貼れます</a></div>",{autoClose:false});
let routeto0=L.marker([35.363721,138.728563],{icon:checkeredflag}).bindPopup("<p>ゴール</p><a data-fancybox=\"gallery\" href=\"/wp-content/uploads/2021/08/steering-2.jpg\" data-caption=\"花\"><img src=\"/wp-content/uploads/2021/08/steering-2.jpg\" width=\"320\" height=\"240\" /></a>",{autoClose:false});
let routeGP0=L.layerGroup([route0,routefr0,routeto0]);
mapTop.addLayer(routeGP0);

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


// レイヤーグループ
let routelayers = {
    "ルート1":routeGP0,
    "ルート2":routeGP2,
    "トイレ":toiletGP1
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
