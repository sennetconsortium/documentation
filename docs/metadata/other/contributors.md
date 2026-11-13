---
layout: page-triary
---

# Contributors Metadata Attributes

These fields have been colleced for contributors, available from the [HuBMAP Search and Entity APIs](/apis) in a list of contributors at ```Dataset.contributors[]<attribute>```.<br />
These fields are harmonized across all versions of the contributor metadata specifications. See the latest version of the [Contributor Metadata Specifications](https://hubmapconsortium.github.io/ingest-validation-tools/contributors/current/) for the schema and directory structure needed when ingesting Segmentation Mask metadata.
&nbsp;


<span style="color:red" title="Required">*</span><span class="requiredNote"> indicates a required field</span>

| Attribute | Type | Description | Allowable Values |
|------|------|-------------|-------------------|
| first_name <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | First name |  |
| last_name <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Last name |  |
| middle_name_or_initial | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Middle name or initial. Leave blank if not applicable |  |
| display_name <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Name for display |  |
| affiliation <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Institutional affiliation |  |
| orcid <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | ORCID ID of contributor. Example: 0000-0002-8928-741X |  |
| email | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Email address for the individual |  |
| is_contact <span class="requiredMark">*</span> | <i class="fa-solid fa-circle-dot" title="Radio" aria-label="Radio"></i> | Is this individual a contact for DOI purposes? | ```Yes``` ```No``` |
| is_principal_investigator <span class="requiredMark">*</span> | <i class="fa-solid fa-circle-dot" title="Radio" aria-label="Radio"></i> | Is this individual a principal investigator responsible for the data? | ```Yes``` ```No``` |
| is_operator <span class="requiredMark">*</span> | <i class="fa-solid fa-circle-dot" title="Radio" aria-label="Radio"></i> | Is this person responsible for executing the assay(s) in whole or part? If more than one person is responsible for running the assay(s), then each operator should be listed separately in the contributors file. | ```Yes``` ```No``` |
| metadata_schema_id <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | The string that serves as the definitive identifier for the metadata schema version and is readily interpretable by computers for data validation and processing. Example: 22bc762a-5020-419d-b170-24253ed9e8d9 |  |
