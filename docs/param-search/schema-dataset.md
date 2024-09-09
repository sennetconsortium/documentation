---
layout: page
---

# SenNet Dataset schema

## Overview:
This page describes the Dataset attributes available for querying via the [SenNet parameterized search endpoint](index.html).  Full Dataset schema information can be found at the [SenNet Search API documentation page](https://smart-api.info/ui/7aaf02b838022d564da776b03f357158) at the bottom of the page in the `Schemas` section under the Dataset section.


## Description: 
A query string is built by combining schema elements documented below with matching values.  Each "term" of the query is combined using the & character, and the entire query is attached to the base URL after a ? character, per web standards.

Query terms may be composed from attributes deeper in the schema type of an attribute. The parameter names can be top level attributes from any of the entities or they can be nested attributes, for example `/param-search/datasets?dataset_type=RNAseq` queries the top level Dataset attribute `dataset_type`, whereas `/param-search/datasets?metadata.metadata.is_targeted=Yes` queries the `is_targeted` attribute that is nested under metadata.metadata. (NOTE: The dual nesting of metadata.metadata will be updated to a single level, just metadata, soon).

This example finds all Datasets of type `RNAseq` where specific molecules are not targeted for detection use this query:
```
 GET https://search.api.sennetconsortium.org/v3/param-search/datasets?dataset_type=RNAseq&metadata.metadata.is_targeted=No
```

### Dataset Attributes

| Attribute                        | Type                                                                                    | Description                                                                                                                                                                                                                                          |
|----------------------------------|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| uuid                             | string                                                                                  | The SenNet unique identifier, intended for internal software use only. This is a 32 digit hexadecimal uuid e.g. 461bbfdc353a2673e381f632510b0f17                                                                                                     |
| hubmap_id                        | string                                                                                  | A SenNet Consortium wide unique identifier randomly generated in the format HBM###.ABCD.### for every entity.                                                                                                                                        |
| registered_doi                   | string                                                                                  | The doi of a the registered entity. e.g. 10.35079/hbm289.pcbm.487. This is set during the publication process and currently available for certain Collections and Datasets.                                                                          |
| doi_url                          | string                                                                                  | The url from the doi registry for this entity. e.g. https://doi.org/10.35079/hbm289.pcbm.487                                                                                                                                                         |
| contains_human_genetic_sequences | boolean                                                                                 | True if the data contains any human genetic sequence information. Can only be set at CREATE/POST time                                                                                                                                                |
| group_name                       | string                                                                                  | The displayname of globus group which the user who created this entity is a member of                                                                                                                                                                |
| dbgap_sra_experiment_url         | string                                                                                  | A URL linking the dataset to the associated uploaded data at dbGaP.                                                                                                                                                                                  |
| dbgap_study_url                  | string                                                                                  | A URL linking the dataset to the particular study on dbGap it belongs to                                                                                                                                                                             |
| data_access_level                | string from [`data_access_level` attribute values](#data_access_level-attribute-values) | One of the values: public, consortium.                                                                                                                                                                                                               |
| status                           | string string from [`status` attribute values](#status-attribute-values)                | One of: NewProcessing, QA Published Error Hold Invalid                                                                                                                                                                                               |
| antibodies                       | array of [`Antibody Schema`](./schema-antibody.html)                                    | A list of antibodies used in the assay that created the dataset                                                                                                                                                                                      |
| metadata.metadata                | JSON-encoded string for a supported [assay type schema](#assay-type-schemas)            | The assay level metadata submitted by data providers with data. Provided as json. Metadata schemas per dataset_type are linked from the [dataset type allowable values section](#dataset_type-allowable-values). (NOTE: The dual nesting of metadata.metadata will be updated to a single level, just metadata, soon).                |
| dataset_type                     | string [dataset type allowable values](#dataset_type-allowable-values)                                 |  The type of data contained in the dataset (as derived from a specific assay type |
| donor                     | Donor Object |  The donor from which the tissue was taken for the assay.  The sub-attributes under donor are specified in the [Donor Schema](schema-donor.html) |
| origin_samples            | Sample Object Array | The organ from which the tissue was taken for the assay.  The sub-attributes under origin_samples are specified in the [Sample Schema](schema-sample.html). This is modeled as an array because it is possible for data to be derived from multiple organs, but currently SenNet only has data derived from a single organ. |


### `data_access_level` attribute values
The data_access_level of the `Dataset Schema` is one of the values following enumerated values:
- `public`
- `consortium`

### `status` attribute values
The status attribute of the `Dataset Schema` is one of the values following enumerated values:
- `New`
- `Processing`
- `QA`
- `Published`
- `Error`
- `Hold`
- `Invalid`

### `dataset_type` allowable values
The `dataset_type` attribute of the `Dataset Schema` is a value from the current, authoritative list of [dataset types](https://ontology.api.hubmapconsortium.org/dataset-types?application_context=HUBMAP). The valid dataset types, as of, 8/26/2024 are listed below.  Additionally, linked next to the dataset types are the metadata schema pages for each dataset type.  The metadata attributes listed for each dataset type are accessible below the Dataset.metadata.metadata attribute (e.g. Dataset.`metadata.metadata.preparation_instrument_model`.

- `10X Multiome`: [10X Multiome metadata](../assays/metadata/10XMultiome.html)
- `2D Imaging Mass Cytometry`: [Imaging Mass Cytometry metadata](../assays/metadata/IMC.html)
- `3D Imaging Mass Cytometry`: [Imaging Mass Cytometry metadata](../assays/metadata/IMC.html)
- `ATACseq`: [ATACseq metadata](../assays/metadata/ATACseq.html)
- `Auto-fluorescence` [Auto-fuorescence metadata](../assays/metadata/AutoFluorescence.html)
- `CODEX`: [CODEX metadata](../assays/metadata/CODEX.html)
- `DESI`: [DESI metadata](../assays/metadata/DESI.html)
- `GeoMx (NGS)`: [GeoMx (NGS) metadata](../assays/metadata/GeoMx.html)
- `HiFi-Slide`: [HiFi-Slide metadata](../assays/metadata/HiFi-Slide.html)
- `Histology`: [Histology metadata](../assays/metadata/Histology.html)
- `LC-MS`: [LC-MS metadata](../assays/metadata/LC-MS.html)
- `Light Sheet`: [Light Sheet metadata](../assays/metadata/LightSheet.html)
- `MALDI`: [MALDI metadata](../assays/metadata/MALDI.html)
- `MERFISH`: [MERFISH metadata](../assays/metadata/MERFISH.html)
- `MIBI`: [MIBI metadata](../assays/metadata/MIBI.html)
- `MUSIC`: [MUSIC metadata](../assays/metadata/MUSIC.html)
- `PhenoCycler`: [PhenoCycler metadata](../assays/metadata/PhenoCycler.html)
- `RNAseq`: [RNAseq metadata](../assays/metadata/RNAseq.html)
- `RNAseq (with probes)`: [RNAseq (with probes) metadata](../assays/metadata/RNAseqWithProbes.html)
- `SIMS`: [SIMS metadata](../assays/metadata/SIMS.html)
- `SNARE-seq2`: [SNARE-seq2 metadata](../assays/metadata/SnareSeq2.html)
- `Second Harmonic Generation (SHG)`: [Second Harmonic Generation (SHG) metadata](../assays/metadata/SecondHarmonicGeneration.html)
- `seqFISH`: [seqFISH metadata](../assays/metadata/seqFISH.html)
- `Slideseq`: [Slideseq metadata](../assays/metadata/Slide-seq.html)
- `Thick section Multiphoton MxIF`: [Thick section Multiphoton MxIF metadata](../assays/metadata/ThickSectionMultiphotonMxIF.html)
- `Visium (no probes)`: [Visium (no probes) metadata](../assays/metadata/VisiumNoProbes.html)
- `Visium (with probes)`: [Visium (with probes) metadata](../assays/metadata/VisiumWithProbes.html)
- `WGS`: [WGS metadata](../assays/metadata/WGS.html)
