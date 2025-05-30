---
layout: default
---

# SenNet Sample schema

## Overview:
This page describes the Sample attributes available for querying via the [SenNet parameterized search endpoint](index.html). Full Sample schema information can be found at the [SenNet Search API documentation page](https://smart-api.info/ui/10ed9b5eb8ff960d4431befc591ed842) at the bottom of the page in the `Schemas` section under the Sample section.

For example, this endpoint searches Samples for a specified sample category of `block`, all tissue registrations that are of type `block` will be returned:
```
GET https://search.api.sennetconsortium.org/param-search/samples?sample_category=Block
```

## Description: 
A query string is built by combining schema elements documented below with matching values.  Each "term" of the query is combined using the & character, and the entire query is attached to the base URL after a ? character, per web standards.

Query terms may be composited from attributes deeper in the schema type of an attribute.  For example, the Sample Schema attribute ```metadata``` is has a type of [Sample Metadata Schema](/libraries/ingest-validation-tools/schemas/), and Sample `Block` Metadata Schema has an attribute ```preparation_condition```. Querying Samples supports a term to search for sample blocks with a preparation condition, such as ```metadata.preparation_condition=Frozen%20on%20ice```, and a query like:
```
GET https://search.api.sennetconsortium.org/param-search/samples?metadata.preparation_condition=Frozen%20on%20ice&origin_samples.organ=HT
```

| Attribute                   | Type                                                                                    | Description                                                                                                                                                                                                   |
|-----------------------------|-----------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid                        | string                                                                                  | The SenNet unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                              |
| sennet_id                   | string                                                                                  | A SenNet Consortium wide unique identifier randomly generated in the format SNT###.ABCD.### for every entity.                                                                                                 |
| protocol_url                | string                                                                                  | The protocols.io doi url pointing the protocol under wich the sample was obtained and/or prepared.                                                                                                            |
| group_name                  | string                                                                                  | The name of the SenNet data provider group which registered the sample.  See the [SenNet Data Provider Groups](data-provider-groups.html) for a list of valid group names.                                    |
| data_access_level           | string from [`data_access_level` attribute values](#data_access_level-attribute-values) | One of the values: public, consortium                                                                                                                                                                         |
| sample_category             | string from [`sample_category` attribute values](#sample_category-attribute-values)     | A code representing the category of the specimen. Must be one of organ, block, section , suspension. This is a required field. If set to organ, the organ property must be provided as well.                  |
| organ                       | string from [`organ` attribute values](#organ-attribute-values)                         | Organ code specifier, only set if sample_category == Organ. Valid values found in the `organ_uberon` attribute in: [organ types](https://ontology.api.hubmapconsortium.org/organs?application_context=SENNET) |
| metadata                    | JSON-encoded string for a supported [`Sample Metadata Schema`](/libraries/ingest-validation-tools/schemas/)                                                  | The sample specific metadata derived from the uploaded sample_metadata.tsv file. Returned as a json object.                                                                                                   |

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
The organ of the `Sample Schema` is a value from the current, authoritative list of `organ_uberon` attributes in: [organ types](https://ontology.api.hubmapconsortium.org/organs?application_context=SENNET)
As of 6/01/2025, the list is:
- UBERON_0001013: Adipose Tissue
- UBERON_0000178: Blood
- UBERON_0001474: Bone
- UBERON_0002371: Bone Marrow
- UBERON_0000955: Brain
- UBERON_0000948: Heart
- UBERON_0004538: Kidney (Left)
- UBERON_0004539: Kidney (Right)
- UBERON_0000059: Large Intestine
- UBERON_0002107: Liver
- UBERON_0002168: Lung (Left)
- UBERON_0002167: Lung (Right)
- UBERON_0000029: Lymph Node
- UBERON_0001911: Mammary Gland
- FMA_57991: Mammary Gland (Left)
- FMA_57987: Mammary Gland (Right)
- UBERON_0005090: Muscle
- UBERON_0010000: Other
- UBERON_0002119: Ovary (Left)
- UBERON_0002118: Ovary (Right)
- UBERON_0001264: Pancreas
- UBERON_0001987: Placenta
- UBERON_0002097: Skin
- UBERON_0002240: Spinal Cord
- UBERON_0002106: Spleen
- UBERON_0002370: Thymus
- FMA_54974: Tonsil (Left)
- FMA_54973: Tonsil (Right)
- UBERON_0003126: Trachea

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

