---
layout: default
---
# SenNet PAS Stained Microscopy

### Last Updated 6/15/2020

## Overview
This document details stained microscopy data states, metadata fields, file structure, QA/QC thresholds, and data processing.

## Description
Stained microscopy employs histological stains such as H&E or PAS to improve resolution and contrast for visualization of physiological structures such as tubules or glomeruli.

## Definitions
There are a variety of terms used in this document that may not be familiar to all researchers wanting to make use of the HubMap data. The following figures illustrate several of these terms:
![](assays/images/pas1.png)  
  
*Figure 1: Pictorial representation of microscopy terms. The black box is an example slide or cover slip where the sample is located. Blue boxes are examples of “regions” or user defined imaging areas. For instance, if you want to image a specific structure in the tissue, you would designate a “region” over the structure. Red boxes are examples of “tiles” or the microscope “field of view”. The size of the tile is dependent on the microscope set up and objective. Tiles will fill the region. Because the field of view cannot be changed, tiles will overhang from the region, ensuring the entire region is imaged at the expense of extra tiles being acquired.*


![](assays/images/pas2.png)
*Figure 2: Images are generally acquired with adjacent tiles overlapping, as indicated by the dark regions in the image on the right above. Overlap enhances alignment of tiles for stitching to create a composite image, as shown in Figure 4 below.*


![](assays/images/pas3.png)
*Figure 3: Images of tiles are captured as the stage moves across the imaged region row by row (left) or via a serpentine (or snake-like) path (right).*

![](assays/images/pas4.png)
*Figure 4:* Stitching is the process of aligning and merging neighboring image tiles into a single composite image.

![](assays/images/pas5.png)
*Figure 5: Example defined plane (left) with example imaged z planes (right).*

## SenNet Stained Microscopy Data States (Levels)
| Data State | Description | Example File Type |
|---|---|---|
|  0 | Raw image data: This is the data that comes directly off the microscope without preprocessing; sometimes referred to as tiled or unstitched data. (may not always be included).| SCN, TIFF|
| 1 |  Processed Microscopy data: Can include stitching, thresholding, background subtraction, z-stack alignment, deconvolution |  CZI, TIFF, OME-TIFF|
| 2 |  Segmentation: Computationally predicted cell (nucleus, cytoplasm) and/or structural boundaries (tubules, ventricles, etc.) |  CSV, TIFF|
| 3 |  Annotation (Cells and Structures): Interpretation of microscopy image and/or segmentation in terms of biology (e.g. unhealthy vs healthy, cell-type, function, functional region). |  TIFF, PNG|

## SenNet Metadata
This metadata schema is now available in [Github](https://github.com/hubmapconsortium/ingest-validation-tools/tree/master/docs/stained) for download.

## Associated Metadata files
| Metadata File Name | File Type | Field | Definition |
|---|---|---|---|
| Instrument Metadata |XML | SchemaType|Metadata schema type|
|  | | AcquisitionDate|Date and Time of Acqusition|
|  | | ObjectiveSettings|Nominal Magnification|
|  | | PhysicalSizeX|Spatial Resolution in x dimension (Pixel Size)|
|  | | PhysicalSizeY|Spatial Resolution in y dimension (Pixel Size)|
|  | | PhysicalSizeZ|Spatial Resolution in z dimension (Pixel Size)|
|  | | SizeX|Number of pixels in x axis|
|  | | SizeY|Number of pixels in y axis|
|  | | SizeZ|Number of pixels in z axis|
|  | | IlluminationType|Type of light used|
|CCF Spatial Metadata|JSON| alignment_id | Unique identifier given to each instance of the Registration UI running in a user's web browser|
|  | | alignment_operator_first_name|Person who aligned tissue to CCF-First Name|
|  | | alignment_operator_last_name|Person who aligned tissue to CCF - Last Name|
|  | | alignment_datetime|Date and time tissue was aligned to CCF|
|  | | reference_organ_id|Identifier for the reference organ the sample is registered to|
|  | | tissue_position_mass_point_x|x position of the center of mass of the tissue sample in relation to the 3-D grid wrapped around the reference organ|
|  | | tissue_position_mass_point_y|y position of the center of mass of the tissue sample in relation to the 3-D grid wrapped around the reference organ|
|  | | tissue_position_mass_point_z|z position of the center of mass of the tissue sample in relation to the 3-D grid wrapped around the reference organ|
|  | | tissue_object_rotation_x|Rotation of the tissue sample around the x-axis of its mass point|
|  | | tissue_object_rotation_y|Rotation of the tissue sample around the y-axis of its mass point|
|  | | tissue_object_rotation_z|Rotation of the tissue sample around the z-axis of its mass point|
|  | | tissue_object_size_x|Size of the x-dimension of the tissue sample|
|  | | tissue_object_size_y|Size of the y-dimension of the tissue sample|
|  | | tissue_object_size_z|Size of the z-dimension of the tissue sample|
|  | | section_number|Tissue Section number. Each section is 10µm thick.|


## Terms defined in this document
| Term | Definition |
|---|---|
|  Intensity| Detector Counts|
|  Signal| Intensity produced by fluorescence, both endogenous and introduced|
|  Noise| Intensity not produced by light but electronic fluctuations or electronic background.|
|  Stitching| Image stitching is the process of combining multiple images (tiles) with overlapping fields of view to produce a single, large image.|
|  Alignment/Registration| Image registration is the process of transforming different images into one coordinate system. Registration of all channels in each cycle is performed.|
|  Regions| User defined imaging area.|
|  Autofluorescence/Background| Endogenous fluorescence signal.|
|  Z-stack| A series of images produced at different stage heights or z positions.|
|  X plane| Plane that determines width|
|  Y plane| Plane that determines height|
|  Z plane| Plane that determines depth|
|  Pitch| Distance between pixels|
|  Tile| Rectangular field-of-view (Figure 1).|
| Pixel| How close two objects can be and still be differentiated within an image. This is generally dependent upon the diffraction limit of light and the microscope objective.|
| Field of View| Angle through which light can reach the detector. Available imaging area without stage movement.|

## For Additional Help
Please contact:[Jeffrey Spraggins](mailto:jeff.spraggins@Vanderbilt.Edu) 
