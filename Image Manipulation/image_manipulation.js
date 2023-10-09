// Define the Sentinel-2 image collection
var sentinelCollection = ee.ImageCollection("COPERNICUS/S2_HARMONIZED");

// Define the region of interest as a polygon
var regionOfInterest = ee.Geometry.Polygon(
  [
    [72.87652662260612, 33.3573485947331],
    [73.30499341948112, 33.53381510718497],
    [73.09350660307487, 33.86058424564462],
    [72.70349195463737, 33.69392730212371]
  ]
);

// Define NDVI visualization parameters
var ndviParams = {
  opacity: 1,
  bands: ["B8"],
  min: 0.19257925380001778,
  max: 0.3979852247102836,
  palette: ["ff0000", "ffbd04", "1bff00"]
};

// Filter Sentinel-2 data based on the region, cloud percentage, and date range
var filteredData = sentinelCollection
  .filterBounds(regionOfInterest)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 1)
  .filterDate('2022-01-01', '2022-12-31');

// Calculate the median image from the filtered data
var medianImage = filteredData.median();

// Select individual bands from the median image
var redBand = medianImage.select('B4');
var greenBand = medianImage.select('B3');
var blueBand = medianImage.select('B2');
var nirBand = medianImage.select('B8');

// Calculate NDVI
var ndvi = nirBand.subtract(redBand).divide(nirBand.add(redBand));

// Add NDVI layer to the map with specified visualization parameters
Map.addLayer(ndvi, ndviParams, 'NDVI Layer');