---
layout: page
---

# SenNet Sample schema

## Overview:
This page describes the Sample attributes available for querying via the [SenNet parameterized search endpoint](index.html). Full Sample schema information can be found at the [SenNet Search API documentation page](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) at the bottom of the page in the `Schemas` section under the Sample section.

For example, this endpoint searches Samples for a specified sample category of `block`, all tissue registrations that are of type `block` will be returned:
```
GET https://search.api.sennetconsortium.org/v3/param-search/samples?sample_category=block
```

## Description: 
A query string is built by combining schema elements documented below with matching values.  Each "term" of the query is combined using the & character, and the entire query is attached to the base URL after a ? character, per web standards.

Query terms may be composited from attributes deeper in the schema type of an attribute.  For example, the Sample Schema attribute ```metadata``` is has a type of Sample Metadata Schema, and Sample Metadata Schema has an attribute ```organ_condition```. Querying Samples supports a term to search for samples from healthy organs, such as ```metadata.organ_condition=healthy```, and a query like:
```
GET https://search.api.sennetconsortium.org/v3/param-search/samples?metadata.organ_condition=healthy&organ=LI
```

| Attribute                   | Type                                                                                                  | Description                                                                                                                                                                                                                                                                                        |
|-----------------------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid                        | string                                                                                                | The SenNet unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                                                                   |
| hubmap_id                   | string                                                                                                | A SenNet Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                                                                      |
| protocol_url                | string                                                                                                | The protocols.io doi url pointing the protocol under wich the sample was obtained and/or prepared.                                                                                                                                                                                                 |
| group_name                  | string                                                                                                | The name of the SenNet data provider group which registered the sample.  See the [SenNet Data Provider Groups](data-provider-groups.html) for a list of valid group names.                                                                                                |
| data_access_level           | string from [`data_access_level` attribute values](#data_access_level-attribute-values)               | One of the values: public, consortium                                                                                                                                                                                                                                                              |
| sample_category             | string from [`sample_category` attribute values](#sample_category-attribute-values)                   | A code representing the category of the specimen. Must be one of organ, block, section , suspension. This is a required field. If set to organ, the organ property must be provided as well.                                                                                                       |
| organ                       | string from [`organ` attribute values](#organ-attribute-values)                                       | Organ code specifier, only set if sample_category == organ. Valid values found in the `rui_code` attribute in: [organ types](https://ontology.api.hubmapconsortium.org/organs?application_context=HUBMAP)                                                                     |
| metadata                    | array of [`Sample Metadata Schema`](#sample-metadata-schema)                                          | The sample specific metadata derived from the uploaded sample_metadata.tsv file. Returned as a json object.                                                                                                                                                                                        |

### Sample Metadata Schema
The sample specific metadata derived from the sample_metadata.tsv files provided with tissue registration:

| Attribute                         | Type                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sample_id                         | string                                                                                   | The SenNet Identifier for the sample.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| warm_ischemia_time_value          | integer                                                                                  | Time interval between cessation of blood flow and cooling to 4C. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| warm_ischemia_time_unit           | string                                                                                   | Time units that the warm_ischemia_time_value is reported in. Blank if not applicable                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cold_ischemia_time_value          | integer                                                                                  | Time interval on ice to the start of preservation protocol. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cold_ischemia_time_unit           | string                                                                                   | Time units that the cold_ischemia_time_value is reported in. Blank if not applicable.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| specimen_preservation_temperature | string                                                                                   | The temperature of the medium during the preservation process. Reported as preservation method, temperature and units, e.g. Freezer (-80 Celsius)                                                                                                                                                                                                                                                                                                                                                                                          |
| specimen_quality_criteria         | string                                                                                   | RIN score. e.g. RIN: 8.7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| specimen_tumor_distance_value     | string                                                                                   | If surgical sample from a tumor biopsy, how far from the tumor was the sample obtained from. Typically a number of centimeters. Blank if not applicable or unknown.                                                                                                                                                                                                                                                                                                                                                                        |
| specimen_tumor_distance_unit      | string                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| vital_state                       | string from [`vital_state` attribute values](#vitalstate-attribute-values)               | The vital state of the donor who the tissue sample came from.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| health_status                     | string from [`health_status` attribute values](#healthstatus-attribute-values)           | Donor from which the tissue sample came from's baseline physical condition prior to immediate event leading to organ/tissue acquisition. For example, if a relatively healthy patient suffers trauma, and as a result of reparative surgery, a tissue sample is collected, the subject will be deemed 'relatively healthy'. Likewise, a relatively healthy subject may have experienced trauma leading to brain death. As a result of organ donation, a sample is collected. In this scenario, the subject is deemed 'relatively healthy'. |
| organ_condition                   | string from [`organ_condition` attribute values](#organcondition-attribute-values)       | Health status of the organ at the time of tissue sample recovery.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| perfusion_solution                | string from [`perfusion_solution` attribute values](#perfusionsolution-attribute-values) | Health status of the organ at the time of sample recovery.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### `data_access_level` attribute values
The data_access_level of the `Sample Schema` is one of the values following enumerated values:
- `public`
- `consortium`

### `sample_category` attribute values
The sample_category of the `Sample Schema` is one of the values following enumerated values:
- `organ`
- `block`
- `section`
- `suspension`

### `organ` attribute values
The organ of the `Sample Schema` is a value from the current, authoritative list of `rui_code` attributes in: [organ types](https://ontology.api.hubmapconsortium.org/organs?application_context=HUBMAP)
As of 8/25/2024, the list is:
- `AO`: Aorta
- `BL`: Bladder
- `BD`: Blood
- `BM`: Bone Marrow
- `BR`: Brain
- `LB`: Bronchus (Left)
- `RB`: Bronchus (Right)
- `LE`: Eye (Left)
- `RE`: Eye (Right)
- `LF`: Fallopian Tube (Left)
- `RF`: Fallopian Tube (Right)
- `HT`: Heart
- `LK`: Kidney (Left)
- `RK`: Kidney (Right)
- `LN`: Knee (Left)
- `RN`: Knee (Right)
- `LI`: Large Intestine
- `LV`: Liver
- `LL`: Lung (Left)
- `RL`: Lung (Right)
- `LY`: Lymph Node
- `VL`: Lymphatic Vasculature
- `VL`: Lymphatic Vasculature
- `LO`: Ovary (Left)
- `RO`: Ovary (Right)
- `PA`: Pancreas
- `PL`: Placenta
- `PL`: Placenta
- `SK`: Skin
- `SI`: Small Intestine
- `SC`: Spinal Cord
- `SP`: Spleen
- `ST`: Sternum
- `TH`: Thymus
- `LT`: Tonsil (Left)
- `RT`: Tonsil (Right)
- `TR`: Trachea
- `UR`: Ureter
- `UT`: Uterus

### `vital_state` attribute values
The vital_state of the `Sample Metadata Schema` is one of the values following enumerated values:
- `living`
- `deceased`

### `health_status` attribute values
The health_status of the `Sample Metadata Schema` is one of the values following enumerated values:
- `cancer`
- `relatively`
- `healthy`
- `chronic illness`

### `organ_condition` attribute values
The organ_condition of the `Sample Metadata Schema` is one of the values following enumerated values:
- `healthy` 
- `diseased`

### `perfusion_solution` attribute values
The perfusion_solution of the `Sample Metadata Schema` is one of the values following enumerated values:
- `UWS`
- `HTK`
- `Belzer`
- `MPS/KPS`
- `Formalin`
- `Unknown`
- `None`

### File Schema

| Attribute   | Type   | Description                                                                                |
|-------------|--------|--------------------------------------------------------------------------------------------|
| filename    | string | The name of the file.                                                                      |
| description | string | A description of the file. The Dataset.thumbnail_file does not have this file description. |
| file_uuid   | string | The SenNet unique identifier for the file.                                                 |

