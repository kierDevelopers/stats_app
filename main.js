import './style.css';
import { Map, View } from 'ol';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import LayerGroup from 'ol/layer/Group';
import { baseMap, topo, test, pumpEsri } from './data/layers_connections';
import Draw from 'ol/interaction/Draw';
import VectorL from 'ol/layer/Vector';
import VectorS from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import button from 'ol-ext/control/Button'
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import MousePosition from 'ol/control/MousePosition'
import * as olCoordinate from 'ol/coordinate';


// register 27700 as a spatial reference
proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs'
);
register(proj4);


const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

// const popup = new Overlay({
//   element: container,
//   autoPan: true,
//   autoPanAnimation: {
//     duration: 1500,
//   },
// });



// create view and map objects

let mapView = new View({
  center: [339861.7958798604, 100319.43155530083],
  zoom: 10,
  projection: 'EPSG:27700'
  
  
})

const map = new Map({
  target: 'map',
  layers: [baseMap, topo, test, pumpEsri],
  view: mapView,
  //overlays: [popup]
});


// function will save a newly created feature to the postGIS database 
async function SaveDatatodb(x, y) {
  try {
    const result = await fetch('http://localhost:8111/database', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({"col_1": "test", "geometry": {"type": "Point", "coordinates": [x, y]}})

    })
    console.log(result)
  }
  catch (err) {
    console.log(err)

  } 
    
}

//add draw interaction to map
const drawSource = new VectorS()
const drawLayer = new VectorL({
  source: drawSource
});

map.addLayer(drawLayer)

const draw = new Draw({
  type: 'Point',
  source: drawSource
});

map.addInteraction(draw)

draw.on('drawend', function(evt){
  //let clickedCoo = evt.feature.getGeometry().getArea()
  const coordinate = evt.feature.getGeometry().flatCoordinates;
  
 // map.getView().animate({zoom: 15, center:[540055.3264104014, 141854.6262954283]})
  
  
  console.log(coordinate)
  // SaveDatatodb(coordinate[0], coordinate[1])

  //content.innerHTML =   
  //overlay.setPosition(coordinate);
 // console.log(clickedCoo)

})


// add mouse position to application as easting and northing
// const mousePosition = new MousePosition({
//   className: 'mousePosition',
//   projection: 'EPSG 27700',
//   coordinateFormat: coordinate => {
//     return olCoordinate.format(coordinate, '{x}, {y}')}
// });
// map.addControl(mousePosition);


//Add a custom push button with onToggle function
var hello = new button (
    {	html: '<div class="btn-event"></div>',
      className: "draw-btn",
      title: "The button",
      handleClick: () =>
        {	console.log('hello!!!');
        }
    });
map.addControl(hello);


// popup closer
// closer.onclick = () => {
//   popup.setPosition(undefined);
//   closer.blur();
//   return false;
// };


// get feature info as a Geojson
// map.on('singleclick', (evt) => {
//   content.innerHTML = ''
//   popup.setPosition(evt.coordinate);
//   const viewResolution = mapView.getResolution();
//   const url = topo.getSource().getFeatureInfoUrl(
//     evt.coordinate,
//     viewResolution,
//     'EPSG:27700',
//     {'INFO_FORMAT': 'application/json'}
//   );
//   console.log(url)
//   if (url) {
//     fetch(url)
//       .then((response) => response.json())
//       .then((jsonResp) => {
//         content.innerHTML = `<h3><u>${jsonResp.features[0].id}</u></h3>`
//         let featuresProperties = jsonResp.features[0].properties
//         for (let key in featuresProperties) {
//           if (featuresProperties.hasOwnProperty(key) && key != 'OBJECTID') {
//               // console.log(key + " -> " + featuresProperties[key]);
//               content.innerHTML += `<p><strong>${key}: </strong>${featuresProperties[key]}</p>`
//           }
//       }
//         //document.getElementById('popup').innerHTML = JSON.stringify(featuresProperties);
//         console.log(JSON.stringify(jsonResp.features[0].id))
        
//       })
//       .catch((err) => {
//       throw(err)});
      
//   } else {
//     popup.setPosition(undefined);
//   }
// });