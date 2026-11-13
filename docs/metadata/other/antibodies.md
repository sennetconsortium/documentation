---
layout: page-triary
---

# Antibodies Metadata Attributes

<span style="color:red" title="Required">*</span><span class="requiredNote"> indicates a required field</span>

| Attribute | Type | Description |
|------|------|-------------|
| channel_id | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | The identifier of the imaging channel as recorded by the acquisition system. This identifier typically refers to a specific biological structure or marker imaged (e.g., nucleus, cell membrane) and should exactly match the channel ID present in the metadata of the OME-TIFF file. For instance, if the channel ID in an OME TIFF is "Channel:0:13", this exact value should be entered here. Example: Channel:0:13 |
| hgnc_symbol <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Gene symbol approved by HGNC (https://www.genenames.org/) for target gene. Example: ID2B |
| antibody_rrid <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | The RRID is a unique antibody identifier that comes from the Antibody Registry (https://antibodyregistry.org). If needed, more info available here: https://www.antibodyregistry.org/faq. Example: AB_10002075 |
| uniprot_accession_number <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | A unique identifier for the target protein in the UniProt database (https://www.uniprot.org). Example: Q9NNX6 |
| lot_number | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | The lot number is specific to the vendor. Example: Abcam lot number is GR3238979-1 |
| dilution_factor | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | Dillution factor is a whole number. Ratio of stock antibody in the experimental solution, with numerator of 1 assumed. e.g. for a 1:200 (1/200) dilution, the dilution factor would be 200. |
| antibody_concentration_value | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | The concentration value of the antibody preparation. Leave blank if not applicable. |
| antibody_concentration_unit | <i class="fa-solid fa-circle-nodes" title="Allowable Value" aria-label="Allowable Value"></i> | The unit of measurement for the antibody concentration value. If the concentration is not applicable, this field may be left blank. Example: ug/ml |
| conjugated_cat_number | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | An antibody may be conjugated to a fluorescent tag or a metal tag for detection. Conjugated antibodies may be purchased from commercial providers. Leave blank if not applicable. |
| conjugated_tag | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> |  |
| metadata_schema_id <span class="requiredMark">*</span> | <i class="fa-solid fa-font" title="Textfield" aria-label="Textfield"></i> | The unique string identifier for the metadata specification version, which is easily interpretable by computers for purposes of data validation and processing. Example: 22bc762a-5020-419d-b170-24253ed9e8d9 |
