---
layout: default
---

# SenNet Antibody schema

## Overview:
This page describes the Antibody schema for SenNet data. Antibody data occurs in the Dataset schema.

### Antibody Attributes

| Attribute                | Type   | Description |
|--------------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| antibody_name            | string | The name of the antibody.                                                                                                                                                   |
| channel_id               | string | The assay specific identifier for the channel corresponding to the antibody.                                                                                                |
| conjugated_cat_number    | string | An antibody may be conjugated to a fluorescent tag or a metal tag for detection. Conjugated antibodies may be purchased from commercial providers. Blank if not applicable. |
| conjugated_tag           | string | An antibody may be conjugated to a fluorescent tag or a metal tag for detection. Conjugated antibodies may be purchased from commercial providers. Blank if not applicable. |
| dilution                 | string | The dilition ratio, e.g. 1/200 for the antibody. Blank if not applicable.                                                                                                   |
| lot_number               | string | The antibody lot number from the vendor.                                                                                                                                    |
| rr_id                    | string | The unique antibody identifier from the Antibody Registry (https://antibodyregistry.org).                                                                                   |
| uniprot_accession_number | string | The unique identifier for the target protein in the UniProt database (https://www.uniprot.org).                                                                             |
