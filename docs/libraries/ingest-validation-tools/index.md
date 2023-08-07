---
layout: default
---
# Ingest Validation Tools & Upload Guidelines

Well-defined schemas ensure that SenNet data and metadata are reusable. 
If you are starting work on a new assay type, review the guidelines for directory schemas. 
If you have an upload prepared, it can be validated with [validate_upload.py](https://github.com/sennetconsortium/ingest-validation-tools/blob/main/src/validate_upload.py), or if you only have an individual TSV, use [validate_tsv.py](https://github.com/sennetconsortium/ingest-validation-tools/blob/main/src/validate_tsv.py). 
Examples of both good and bad uploads, and the validation messages they produce, are available.
- [GitHub](https://github.com/sennetconsortium/ingest-validation-tools)

Assay types and their schemas are linked below.

- An Excel file listing all the schemas and their fields is available.
- For more information, see the [ingest-validation-tools repo](https://github.com/sennetconsortium/ingest-validation-tools).

## New to the Data Submission Process?
Visit this page to learn more: [Getting Started](/libraries/ingest-validation-tools/upload-guidelines/getting-started)

# Available Metadata and Directory Schemas
### Source
- [Source - Human](/libraries/ingest-validation-tools/schemas/source-human)
- [Source - Murine](/libraries/ingest-validation-tools/schemas/source-murine)

### Organ
- [Organ](/libraries/ingest-validation-tools/schemas/organ)

### Sample
- [Sample - Block](/libraries/ingest-validation-tools/schemas/sample-block)
- [Sample - Section](/libraries/ingest-validation-tools/schemas/sample-section)
- [Sample - Suspension](/libraries/ingest-validation-tools/schemas/sample-suspension)

## Assays
### Clinical Imaging Modalities
- [Body CT](/libraries/ingest-validation-tools/schemas/bodyct)
- [MRI](/libraries/ingest-validation-tools/schemas/mri)
- [Micro CT](/libraries/ingest-validation-tools/schemas/microct)
- [OCT](/libraries/ingest-validation-tools/schemas/oct)
- [Ultrasound](/libraries/ingest-validation-tools/schemas/ultrasound)

### Fluorescence In Situ Hybridization (FISH)
- [seqFISH](/libraries/ingest-validation-tools/schemas/seqfish)

### Histology
- [Histology](/libraries/ingest-validation-tools/schemas/histology)

### Imaging Mass Spectrometry (IMS)
- [3D Imaging Mass Cytometry](/libraries/ingest-validation-tools/schemas/imc3d)
- [DESI](/libraries/ingest-validation-tools/schemas/desi)
- [Imaging Mass Cytometry](/libraries/ingest-validation-tools/schemas/imc)
- [MALDI](/libraries/ingest-validation-tools/schemas/maldi)
- [Multiplex Ion Beam Imaging](/libraries/ingest-validation-tools/schemas/mibi)
- [NanoDESI](/libraries/ingest-validation-tools/schemas/nano-desi)
- [SIMS](/libraries/ingest-validation-tools/schemas/sims)

### Mass Spectrometry
- [CE-MS](/libraries/ingest-validation-tools/schemas/cems)
- [GC-MS](/libraries/ingest-validation-tools/schemas/gcms)
- [LC-MS](/libraries/ingest-validation-tools/schemas/lcms)

### Multiplex Fluorescence Based Experiments (MxFBE)
- [CODEX](/libraries/ingest-validation-tools/schemas/codex)
- [Cell DIVE](/libraries/ingest-validation-tools/schemas/celldive)
- [CyCIF](/libraries/ingest-validation-tools/schemas/cycif)
- [MxIF](/libraries/ingest-validation-tools/schemas/mxif)
- [Phenocycler](/libraries/ingest-validation-tools/schemas/phenocycler)

### Sequence Assays
- [10x Multiome](/libraries/ingest-validation-tools/schemas/10x-multiome)
- [bulkATACseq](/libraries/ingest-validation-tools/schemas/bulkATACseq)
- [RNAseq (GeoMx)](/libraries/ingest-validation-tools/schemas/rnaseq-geomx)
- [RNAseq (Visium)](/libraries/ingest-validation-tools/schemas/rnaseq-visium)
- [bulkRNAseq](/libraries/ingest-validation-tools/schemas/bulkRNAseq)
- [SNARE-seq2 / sciATACseq / snATACseq / scATAC-seq](/libraries/ingest-validation-tools/schemas/scatacseq)
- [Slide-seq](/libraries/ingest-validation-tools/schemas/slideseq)
- [WGS](/libraries/ingest-validation-tools/schemas/wgs)
- [scRNAseq-10xGenomics-v2 / scRNAseq-10xGenomics-v3 / snRNAseq-10xGenomics-v2 / snRNAseq-10xGenomics-v3 / scRNAseq / sciRNAseq / snRNAseq / SNARE2-RNAseq / scRNA-seq](/libraries/ingest-validation-tools/schemas/scrnaseq)

### Single-cycle Fluorescence Microscopy (SFM)
- [AF](/libraries/ingest-validation-tools/schemas/af)
- [Confocal](/libraries/ingest-validation-tools/schemas/confocal)
- [Enhanced Stimulated Raman Spectroscopy (SRS)](/libraries/ingest-validation-tools/schemas/enhanced-srs)
- [Light Sheet](/libraries/ingest-validation-tools/schemas/lightsheet)
- [Second Harmonic Generation](/libraries/ingest-validation-tools/schemas/second-harmonic-generation)
- [Thick Section Multiphoton MxIF](/libraries/ingest-validation-tools/schemas/thick-section-multiphoton-mxif)

### Spatial Transcriptomics
- [CosMx](/libraries/ingest-validation-tools/schemas/cosmx)
- [DBiT](/libraries/ingest-validation-tools/schemas/dbit)
- [GeoMx (RNA) / GeoMx (protein) / GeoMx](/libraries/ingest-validation-tools/schemas/geomx)
- [HiFi-Slide](/libraries/ingest-validation-tools/schemas/hifi-slide)
- [Molecular Cartography](/libraries/ingest-validation-tools/schemas/mc)
- [Visium](/libraries/ingest-validation-tools/schemas/visium)
- [Xenium](/libraries/ingest-validation-tools/schemas/xenium)

### Other Schemas
- [antibodies](/libraries/ingest-validation-tools/schemas/antibodies)
- [contributors](/libraries/ingest-validation-tools/schemas/contributors)






