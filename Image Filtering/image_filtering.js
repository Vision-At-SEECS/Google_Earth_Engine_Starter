// Define the Sentinel-2 image collection
var sentinelCollection = ee.ImageCollection("COPERNICUS/S2_HARMONIZED");

// Define the region of interest as a polygon
var regionOfInterest = ee.Geometry.Polygon(
  [
    [72.7577051008371, 32.73645006321369],
    [74.4495996320871, 33.3442844782922],
    [73.6256250227121, 34.52917568820194],
    [72.1095117414621, 33.8840859104851]
  ]
);

// Define visualization parameters
var visualizationParams = {
  opacity: 1,
  bands: ["B4", "B3", "B2"],
  min: -128.57486075578413,
  max: 2719.2300436276137,
  gamma: 1
};

// Filter the Sentinel-2 data based on the region, cloud percentage, and date range
var filteredData = sentinelCollection
  .filterBounds(regionOfInterest)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 1)
  .filterDate('2022-01-01', '2022-12-31');

// Calculate the median image from the filtered data
var medianImage = filteredData.median();

// Add the median image to the map with specified visualization parameters
Map.addLayer(medianImage, visualizationParams, 'Sentinel-2 Median Image');