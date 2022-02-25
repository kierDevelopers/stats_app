import TileLayer from 'ol/layer/Tile';
import WMS from 'ol/source/TileWMS';
import XYZ from 'ol/source/XYZ';

export const test = new TileLayer({
  source: new WMS({
    url: 'http://10.231.8.215:8080/geoserver/Proveit/ows',
    crossOrigin: undefined,
    params: {
      layers: ['test'],
      version: '1.3.0',
    },
  }),
});
export const pumpEsri = new TileLayer({
  source: new WMS({
    url: 'http://10.231.8.215:8080/geoserver/Proveit/ows',
    crossOrigin: undefined,
    params: {
      layers: ['pumpEsri'],
      version: '1.3.0',
    },
  }),
});

export  const topo = new TileLayer({
  source: new WMS({
    url: 'http://10.231.8.215:8080/geoserver/Proveit/ows',
    params: {
      'LAYERS': 'Proveit:topo', 'TILED': true},
    serverType: 'geoserver',
    transition: 0,
    
  }),
});

// basemap
export const baseMap = new TileLayer({
  source: new XYZ({
    attributions:
      'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
      'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    url:
      'https://server.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  }),
});
