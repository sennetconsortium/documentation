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

## New to the Data Submission process?
Visit this page to learn more: [Getting Started](/libraries/ingest-validation-tools/upload-guidelines/getting-started)

## Available metadata schemas
- [Source - Human](/libraries/ingest-validation-tools/schemas/source-human)
- [Source - Murine](/libraries/ingest-validation-tools/schemas/source-murine)
- [Sample - Block](/libraries/ingest-validation-tools/schemas/sample-block)
- [Sample - Section](/libraries/ingest-validation-tools/schemas/sample-section)
- [Sample - Suspension](/libraries/ingest-validation-tools/schemas/sample-suspension)
