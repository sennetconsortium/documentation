---
layout: default
---

# Source Bulk Registration

To bulk register sources log into
the [Data Sharing Portal](https://data.sennetconsortium.org/edit/bulk/source?action=register) and from the top, click "
Register entity" and select "Sources".

On the `source` bulk registration page you'll be asked to upload a .tsv file containing one row for each source that
will be registered. An [example_source.tsv](https://data.sennetconsortium.org/bulk/entities/example_source.tsv) file is
provided as a template. This .tsv file contains 4 columns (fields) that contain required information for each source to
be registered. Descriptions of these fields are below.

### Source Registration Fields

| Field/Column       | Description                                                                                                                                                                              |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lab_id             | `Required`: An identifier used internally by the lab to identify the Source. This can be useful for lab members to identify and look-up Sources. `DO NOT INCLUDE ANY PHI`.               |
| source_type        | `Required`: The type from which the source orginated, can be Human, Human Organoid, Mouse, or Mouse Organoid                                                                             |
| selection_protocol | `Required`: The protocol used for Source selection including any inclusion or exclusion criteria. This must be provided as a protocols.io DOI see: [protocols.io](https://protocols.io). |
| lab_notes          | A general description of the source for public display and to be used to find the source by searching in the Data Sharing Portal. `DO NOT INCLUDE ANY PHI` in this description.          |

### Source metadata submission
After a `murine` source has been registered you can bulk upload metadata by clicking "Upload metadata" and then selecting `Mouse`. For more information regarding metadata upload you can visit the [documentation page](../../libraries/ingest-validation-tools/schemas/source-murine).

After a `human` source has been registered, documents need to be provided to the HIVE so additional metadata can be
extracted. See a description on the [documentation page](../../libraries/ingest-validation-tools/schemas/source-human).