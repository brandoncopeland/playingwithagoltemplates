require(['esri/map', 'esri/dijit/Legend', 'esri/arcgis/utils', 'esri/urlUtils', 'dojo/domReady!'], function (Map, Legend, arcgisUtils, urlUtils) {
  var configRequest, map, legend, urlObj = urlUtils.urlToObject(document.location.href);
  if (urlObj.query && urlObj.query.appid) {
    configRequest = esri.request({
      url: arcgisUtils.arcgisUrl + '/' + urlObj.query.appid + '/data',
      content: {
        f: 'json'
      },
      callbackParamName: 'callback'
    });
    // arcgisUtils.createMap(urlObj.query.webmap, 'map').then(function (response) {
    //   map = response.map;

    //   legend = new Legend({
    //     map: map,
    //     layerInfos: arcgisUtils.getLegendLayers(response)
    //   }, 'legend');

    //   legend.startup();
    // }, function (err) {
    //   console.log('Problem creating map from webmap `' + webmapId + '`. ' + err.message);
    // });
  } else {
    // No webmap query param
  }
});


// var requestHandle = esri.request({
//     url: esri.arcgis.utils.arcgisUrl + "/" + appid + "/data",
//     content: {
//         f: "json"
//      },
//     callbackParamName: "callback",
//     load: function (response) {
//      for (var key in response.values){
//       if(response.values[key]!==undefined)configOptions[key]=response.values[key];
//       }
//     }, 
// });