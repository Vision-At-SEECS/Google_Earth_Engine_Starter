// Load the Hub Dam image
var hubDamImage = ee.Image("projects/uatharmsai22seecs/assets/Hub_Dam_2017-01-13");

// Load polygon features for Gujranwala and Sargodha
var gujranwalaPolygon = ee.FeatureCollection("projects/uatharmsai22seecs/assets/gujranwala-polygon");
var sargodhaPolygon = ee.FeatureCollection("projects/uatharmsai22seecs/assets/sargodha-polygon");

// Add the Hub Dam image to the map
Map.addLayer(hubDamImage, {}, 'Hub Dam Image');

// Add Gujranwala and Sargodha polygons to the map
Map.addLayer(gujranwalaPolygon, {}, 'Gujranwala Polygon');
Map.addLayer(sargodhaPolygon, {}, 'Sargodha Polygon');

// Center the map on the Sargodha polygon
Map.centerObject(sargodhaPolygon);

// Export the Hub Dam image to Google Drive
Export.image.toDrive({
  image: hubDamImage,
  description: 'Hub_Dam_2017-01-13',
  scale: 30, // Adjust the scale as needed
  region: sargodhaPolygon.geometry(), // Export within the Sargodha polygon
});

// You can uncomment and modify the following lines to export the polygons as tables if needed
// Export.table.toDrive({
//   collection: gujranwalaPolygon,
//   description: 'Gujranwala_Polygon',
//   fileFormat: 'CSV',
// });

// Export.table.toDrive({
//   collection: sargodhaPolygon,
//   description: 'Sargodha_Polygon',
//   fileFormat: 'CSV',
// });