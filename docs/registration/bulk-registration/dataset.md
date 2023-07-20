---
layout: default
---
# Dataset Bulk Registration

To bulk register tissue samples log into the [Data Sharing Portal](https://data.sennetconsortium.org/edit/bulk/dataset?action=register) and from the top, click "Register entity" and select "Datasets".

On the `dataset` bulk registration page you'll be asked to upload a .tsv file containing one row for each tissue sample that will be registered.  An [example_dataset.tsv](https://data.sennetconsortium.org/bulk/entities/example_dataset.tsv) file is provided as a template. This .tsv file contains 5 columns (fields) that contain required information for each tissue to be registered.  A description of these fields is below.  Once the .tsv file has been successfully uploaded and submitted the system will register the datasets.


## Dataset Bulk Registration TSV Fields

| Field/Column         | Description                                                                                                                                                                          |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lab_id               | An identifier used internally by the lab to identify the Dataset. This can be useful for lab members to identify and look-up Datasets.                                               |
| ancestor_id          | `Required`: The SenNet ID (e.g. `SNT123.ABCD.567`) of the ancestor for the dataset.                                                                                                  |
| doi_abstract         | An abstract publicly available when the Dataset is published. This will be included with the DOI information of the published Dataset.                                               |
| human_gene_sequences | `Required`: Does this data contain any human genetic sequences?                                                                                                                      |
| data_types           | `Required`: The type of data contained in this Dataset. A list of available types can be found [here](https://ontology.api.hubmapconsortium.org/datasets?application_context=SENNET) |
