---
layout: default
---

# Entity API Usage
The Entity API returns information about SenNet data entities. The document describes a few real world scenarios on retrieving entity data.

The domain base for the Entity API is `https://entity.api.sennetconsortium.org`. The domain base will prefix the various endpoints. For a full list of Entity API 
endpoints, see its [Smart API](https://smart-api.info/ui/7d838c9dee0caa2f8fe57173282c5812).

This python library is required for making our HTTP calls. Let's import that first and only once in our file.
<pre>
<code class="language-python">
import requests
</code>
</pre>

Let's also define a variable for our domain base:
<pre>
<code class="language-python">
domain_base = "https://entity.api.sennetconsortium.org"
</code>
</pre>


## Defining a reusable `get_data` function
To get started, lets define a simple function that we will use for our GET requests.
<pre>
<code class="language-python">
def get_data(endpoint):
    query_url =  f"{domain_base}{endpoint}"
    entity_data = None
    try:
        response = requests.get(query_url)
        response_code = response.status_code

        if response_code == 200:
            entity_data = response.json
        else:
            print(f"An error occurred {response_code}")
    except Exception as err:
        print(f"An unexpected error occurred: {err}")

return entity_data
</code>
</pre>
Now that we have that method, we will make use of it in the following code snippets below!
## Given a Source with SenNet ID `SNT722.BGFJ.623`
### Get Entity by ID:
The follow code retrieves an entity by its ID (either SenNet ID or UUID) by making a call to the `/entities/<id>` endpoint.
<pre>
<code class="language-python">
uuid = "2f2a7af9951f50b399d76b5080486fe1"
entity_data = get_data(f"/entities/{uuid}")
</code>
</pre>

We could similarly use the entity's SenNet ID, and the results would remain the same.
<pre>
<code class="language-python">
sennet_id = "SNT722.BGFJ.623"
entity_data = get_data(f"/entities/{uuid}")
</code>
</pre>

The response to any of these calls would look like:

<pre>
<code class="language-json">
{
    "cedar_mapped_metadata": {
        "Bedding": "1/4-inch pelleted cellulose",
        "Cage Enhancements": "Nestlets",
        "Date Of Birth Or Fertilization": "2021/9/9 12:00:00 AM",
        "Date Of Death": "2023/10/24 12:00:00 AM",
        "Diet": "Chow",
        "Euthanization Method": "Inhaled anesthetic euthanasia",
        "Is Deceased": "Yes",
        "Is Embryo": "No",
        "Light Cycle": "Standard/default",
        "Local Lifespan Data": "25.5 month",
        "Metadata Schema ID": "44662059-aa73-4756-a4a7-990489ca2f43",
        "Rack Setup": "Ventilated",
        "Room Health Status": "Pathogen free",
        "Room Temperature": "23",
        "Sex": "Male",
        "Source ID": "SNT722.BGFJ.623",
        "Strain": "C57BL6",
        "Strain Rrid": "RRID:IMSR_JAX:000664",
        "Water Source": "Hydropac individual pouch water"
    },
    "created_by_user_displayname": "Hester Doyle",
    "created_by_user_email": "hester.doyle@yale.edu",
    "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
    "created_timestamp": 1698069424312,
    "creation_action": "Create Source Activity",
    "data_access_level": "public",
    "entity_type": "Source",
    "group_name": "TMC - Yale University - Dixit",
    "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
    "last_modified_timestamp": 1754746533320,
    "last_modified_user_displayname": "Jungmin Nam",
    "last_modified_user_email": "jungmin.nam@yale.edu",
    "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
    "metadata": {
        "bedding": "1/4-inch pelleted cellulose",
        "cage_enhancements": "Nestlets",
        "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
        "date_of_death": "2023/10/24 12:00:00 AM",
        "diet": "Chow",
        "euthanization_method": "Inhaled anesthetic euthanasia",
        "is_deceased": "Yes",
        "is_embryo": "No",
        "light_cycle": "Standard/default",
        "local_lifespan_data": "25.5 month",
        "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
        "rack_setup": "Ventilated",
        "room_health_status": "Pathogen free",
        "room_temperature": "23",
        "sex": "Male",
        "source_id": "SNT722.BGFJ.623",
        "strain": "C57BL6",
        "strain_rrid": "RRID:IMSR_JAX:000664",
        "water_source": "Hydropac individual pouch water"
    },
    "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
    "sennet_id": "SNT722.BGFJ.623",
    "source_type": "Mouse",
    "uuid": "2f2a7af9951f50b399d76b5080486fe1"
}
</code>
</pre>

### Get Entity's Descendants:
To retrieve the descendants of this `Source`, we would request the `/descendants/<id>` endpoint. 
<pre>
<code class="language-python">
uuid = "2f2a7af9951f50b399d76b5080486fe1"
entity_data = get_data(f"/descendants/{uuid}")
</code>
</pre>
The response of this request would look like
<pre>
<code class="language-json">
[
    {
        "created_by_user_displayname": "Hester Doyle",
        "created_by_user_email": "hester.doyle@yale.edu",
        "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
        "created_timestamp": 1698074603414,
        "creation_action": "Create Sample Activity",
        "data_access_level": "public",
        "entity_type": "Sample",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "last_modified_timestamp": 1698074603414,
        "last_modified_user_displayname": "Hester Doyle",
        "last_modified_user_email": "hester.doyle@yale.edu",
        "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
        "organ": "UBERON:0002106",
        "organ_hierarchy": "Spleen",
        "origin_samples": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698074603414,
                "creation_action": "Create Sample Activity",
                "data_access_level": "public",
                "entity_type": "Sample",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1698074603414,
                "last_modified_user_displayname": "Hester Doyle",
                "last_modified_user_email": "hester.doyle@yale.edu",
                "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "organ": "UBERON:0002106",
                "organ_hierarchy": "Spleen",
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sample_category": "Organ",
                "sennet_id": "SNT666.XZGV.432",
                "source": {
                    "created_by_user_displayname": "Hester Doyle",
                    "created_by_user_email": "hester.doyle@yale.edu",
                    "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                    "created_timestamp": 1698069424312,
                    "creation_action": "Create Source Activity",
                    "data_access_level": "public",
                    "entity_type": "Source",
                    "group_name": "TMC - Yale University - Dixit",
                    "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                    "last_modified_timestamp": 1754746533320,
                    "last_modified_user_displayname": "Jungmin Nam",
                    "last_modified_user_email": "jungmin.nam@yale.edu",
                    "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
                    "metadata": {
                        "bedding": "1/4-inch pelleted cellulose",
                        "cage_enhancements": "Nestlets",
                        "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
                        "date_of_death": "2023/10/24 12:00:00 AM",
                        "diet": "Chow",
                        "euthanization_method": "Inhaled anesthetic euthanasia",
                        "is_deceased": "Yes",
                        "is_embryo": "No",
                        "light_cycle": "Standard/default",
                        "local_lifespan_data": "25.5 month",
                        "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
                        "rack_setup": "Ventilated",
                        "room_health_status": "Pathogen free",
                        "room_temperature": "23",
                        "sex": "Male",
                        "source_id": "SNT722.BGFJ.623",
                        "strain": "C57BL6",
                        "strain_rrid": "RRID:IMSR_JAX:000664",
                        "water_source": "Hydropac individual pouch water"
                    },
                    "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                    "sennet_id": "SNT722.BGFJ.623",
                    "source_type": "Mouse",
                    "uuid": "2f2a7af9951f50b399d76b5080486fe1"
                },
                "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
            }
        ],
        "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
        "sample_category": "Organ",
        "sennet_id": "SNT666.XZGV.432",
        "source": {
            "created_by_user_displayname": "Hester Doyle",
            "created_by_user_email": "hester.doyle@yale.edu",
            "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
            "created_timestamp": 1698069424312,
            "creation_action": "Create Source Activity",
            "data_access_level": "public",
            "entity_type": "Source",
            "group_name": "TMC - Yale University - Dixit",
            "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
            "last_modified_timestamp": 1754746533320,
            "last_modified_user_displayname": "Jungmin Nam",
            "last_modified_user_email": "jungmin.nam@yale.edu",
            "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
            "metadata": {
                "bedding": "1/4-inch pelleted cellulose",
                "cage_enhancements": "Nestlets",
                "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
                "date_of_death": "2023/10/24 12:00:00 AM",
                "diet": "Chow",
                "euthanization_method": "Inhaled anesthetic euthanasia",
                "is_deceased": "Yes",
                "is_embryo": "No",
                "light_cycle": "Standard/default",
                "local_lifespan_data": "25.5 month",
                "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
                "rack_setup": "Ventilated",
                "room_health_status": "Pathogen free",
                "room_temperature": "23",
                "sex": "Male",
                "source_id": "SNT722.BGFJ.623",
                "strain": "C57BL6",
                "strain_rrid": "RRID:IMSR_JAX:000664",
                "water_source": "Hydropac individual pouch water"
            },
            "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
            "sennet_id": "SNT722.BGFJ.623",
            "source_type": "Mouse",
            "uuid": "2f2a7af9951f50b399d76b5080486fe1"
        },
        "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
    },
    {
        "created_by_user_displayname": "Hester Doyle",
        "created_by_user_email": "hester.doyle@yale.edu",
        "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
        "created_timestamp": 1698075340002,
        "creation_action": "Create Sample Activity",
        "data_access_level": "public",
        "entity_type": "Sample",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "last_modified_timestamp": 1698075340002,
        "last_modified_user_displayname": "Hester Doyle",
        "last_modified_user_email": "hester.doyle@yale.edu",
        "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
        "origin_samples": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698074603414,
                "creation_action": "Create Sample Activity",
                "data_access_level": "public",
                "entity_type": "Sample",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1698074603414,
                "last_modified_user_displayname": "Hester Doyle",
                "last_modified_user_email": "hester.doyle@yale.edu",
                "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "organ": "UBERON:0002106",
                "organ_hierarchy": "Spleen",
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sample_category": "Organ",
                "sennet_id": "SNT666.XZGV.432",
                "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
            }
        ],
        "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
        "sample_category": "Block",
        "sennet_id": "SNT664.KFZW.224",
        "source": {
            "created_by_user_displayname": "Hester Doyle",
            "created_by_user_email": "hester.doyle@yale.edu",
            "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
            "created_timestamp": 1698069424312,
            "creation_action": "Create Source Activity",
            "data_access_level": "public",
            "entity_type": "Source",
            "group_name": "TMC - Yale University - Dixit",
            "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
            "last_modified_timestamp": 1754746533320,
            "last_modified_user_displayname": "Jungmin Nam",
            "last_modified_user_email": "jungmin.nam@yale.edu",
            "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
            "metadata": {
                "bedding": "1/4-inch pelleted cellulose",
                "cage_enhancements": "Nestlets",
                "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
                "date_of_death": "2023/10/24 12:00:00 AM",
                "diet": "Chow",
                "euthanization_method": "Inhaled anesthetic euthanasia",
                "is_deceased": "Yes",
                "is_embryo": "No",
                "light_cycle": "Standard/default",
                "local_lifespan_data": "25.5 month",
                "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
                "rack_setup": "Ventilated",
                "room_health_status": "Pathogen free",
                "room_temperature": "23",
                "sex": "Male",
                "source_id": "SNT722.BGFJ.623",
                "strain": "C57BL6",
                "strain_rrid": "RRID:IMSR_JAX:000664",
                "water_source": "Hydropac individual pouch water"
            },
            "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
            "sennet_id": "SNT722.BGFJ.623",
            "source_type": "Mouse",
            "uuid": "2f2a7af9951f50b399d76b5080486fe1"
        },
        "uuid": "8208088865da724bbb55cae38632a88a"
    },
    {
        "created_by_user_displayname": "Jungmin Nam",
        "created_by_user_email": "jungmin.nam@yale.edu",
        "created_by_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
        "created_timestamp": 1725408148919,
        "creation_action": "Create Sample Activity",
        "data_access_level": "public",
        "description": "fresh frozen",
        "entity_type": "Sample",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "last_modified_timestamp": 1725408148919,
        "last_modified_user_displayname": "Jungmin Nam",
        "last_modified_user_email": "jungmin.nam@yale.edu",
        "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
        "origin_samples": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698074603414,
                "creation_action": "Create Sample Activity",
                "data_access_level": "public",
                "entity_type": "Sample",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1698074603414,
                "last_modified_user_displayname": "Hester Doyle",
                "last_modified_user_email": "hester.doyle@yale.edu",
                "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "organ": "UBERON:0002106",
                "organ_hierarchy": "Spleen",
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sample_category": "Organ",
                "sennet_id": "SNT666.XZGV.432",
                "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
            }
        ],
        "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
        "sample_category": "Section",
        "sennet_id": "SNT587.LHXH.846",
        "source": {
            "created_by_user_displayname": "Hester Doyle",
            "created_by_user_email": "hester.doyle@yale.edu",
            "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
            "created_timestamp": 1698069424312,
            "creation_action": "Create Source Activity",
            "data_access_level": "public",
            "entity_type": "Source",
            "group_name": "TMC - Yale University - Dixit",
            "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
            "last_modified_timestamp": 1754746533320,
            "last_modified_user_displayname": "Jungmin Nam",
            "last_modified_user_email": "jungmin.nam@yale.edu",
            "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
            "metadata": {
                "bedding": "1/4-inch pelleted cellulose",
                "cage_enhancements": "Nestlets",
                "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
                "date_of_death": "2023/10/24 12:00:00 AM",
                "diet": "Chow",
                "euthanization_method": "Inhaled anesthetic euthanasia",
                "is_deceased": "Yes",
                "is_embryo": "No",
                "light_cycle": "Standard/default",
                "local_lifespan_data": "25.5 month",
                "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
                "rack_setup": "Ventilated",
                "room_health_status": "Pathogen free",
                "room_temperature": "23",
                "sex": "Male",
                "source_id": "SNT722.BGFJ.623",
                "strain": "C57BL6",
                "strain_rrid": "RRID:IMSR_JAX:000664",
                "water_source": "Hydropac individual pouch water"
            },
            "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
            "sennet_id": "SNT722.BGFJ.623",
            "source_type": "Mouse",
            "uuid": "2f2a7af9951f50b399d76b5080486fe1"
        },
        "uuid": "fb1398a3f416df8f2fc97583796f29be"
    },
    {
        "antibodies": [
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3254603",
                "channel_id": "CD31",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406302",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q08481"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644273",
                "channel_id": "CD90.2",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406230",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01831"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271531",
                "channel_id": "CD44",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B360593",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P15379"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644275",
                "channel_id": "Ter119",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B349936",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P14220"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271528",
                "channel_id": "CD3",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B388260",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P22646"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271532",
                "channel_id": "MHC II",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B360847",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P18468"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644271",
                "channel_id": "CD45",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000158",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P06800"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271541",
                "channel_id": "Ly6g",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B381166",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P35461"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3254289",
                "channel_id": "CD19",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B404569",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P25918"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644277",
                "channel_id": "IgM",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B358628",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01872"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271535",
                "channel_id": "CD71",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B347017",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q62351"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644265",
                "channel_id": "CD21/35",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406366",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P19070"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644270",
                "channel_id": "CD38",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B388259",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P56528"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271529",
                "channel_id": "CD11c",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B388264",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q9QXH4"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271537",
                "channel_id": "CD4",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406310",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P06332"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644269",
                "channel_id": "CD24",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000169",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P24807"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3254703",
                "channel_id": "CD49f",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000165",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q61739"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271540",
                "channel_id": "CD8a",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B394300",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01731"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644264",
                "channel_id": "CD11b",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000267",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P05555"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_2895046",
                "channel_id": "Ki67",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000313",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "E9PVX6"
            }
        ],
        "cedar_mapped_metadata": {
            "Acquisition Instrument Model": "Phenocycler-Fusion 1.0",
            "Acquisition Instrument Vendor": "Akoya Biosciences",
            "Analyte Class": "Protein",
            "Antibodies Path": "extras/SNT926_antibodies.tsv",
            "Cell Boundary Marker Or Stain": "Not applicable",
            "Contributors Path": "extras/validated-SNT926_contributors.tsv",
            "Dataset Type": "PhenoCycler",
            "Is Targeted": "Yes",
            "Metadata Schema ID": "62af6829-743d-423e-a701-204710e56beb",
            "Non Global Files": "",
            "Nuclear Marker Or Stain": "DAPI",
            "Number Of Antibodies": "21",
            "Number Of Biomarker Imaging Rounds": "8",
            "Number Of Channels": "3",
            "Number Of Total Imaging Rounds": "10",
            "Preparation Protocol DOI": "https://dx.doi.org/10.17504/protocols.io.8epv5jdbnl1b/v1",
            "Source Storage Duration": "2 month",
            "Time Since Acquisition Instrument Calibration": "5 day",
            "Total Run Time": "14 hour"
        },
        "contacts": [
            {
                "affiliation": "Yale",
                "display_name": "Jungmin Nam",
                "email": "jungmin.nam@yale.edu",
                "first_name": "Jungmin",
                "is_contact": "Yes",
                "is_operator": "Yes",
                "is_principal_investigator": "No",
                "last_name": "Nam",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0002-6717-1328"
            },
            {
                "affiliation": "Yale",
                "display_name": "Rong Fan",
                "email": "rong.fan@yale.edu",
                "first_name": "Rong",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Fan",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0001-7805-8059"
            },
            {
                "affiliation": "Yale",
                "display_name": "Vishwa Deep Dixit",
                "email": "vishwa.dixit@yale.edu",
                "first_name": "Vishwa",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Dixit",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "Deep",
                "orcid": "0000-0002-5341-6494"
            }
        ],
        "contains_human_genetic_sequences": false,
        "contributors": [
            {
                "affiliation": "Yale",
                "display_name": "Jungmin Nam",
                "email": "jungmin.nam@yale.edu",
                "first_name": "Jungmin",
                "is_contact": "Yes",
                "is_operator": "Yes",
                "is_principal_investigator": "No",
                "last_name": "Nam",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0002-6717-1328"
            },
            {
                "affiliation": "Yale",
                "display_name": "Rong Fan",
                "email": "rong.fan@yale.edu",
                "first_name": "Rong",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Fan",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0001-7805-8059"
            },
            {
                "affiliation": "Yale",
                "display_name": "Anthony Fung",
                "email": "anthony.fung@yale.edu",
                "first_name": "Anthony",
                "is_contact": "No",
                "is_operator": "Yes",
                "is_principal_investigator": "No",
                "last_name": "Fung",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0003-1631-7451"
            },
            {
                "affiliation": "Yale",
                "display_name": "Yunhee Youm",
                "email": "yunhee.youm@yale.edu",
                "first_name": "Yun-Hee",
                "is_contact": "No",
                "is_operator": "No",
                "is_principal_investigator": "No",
                "last_name": "Youm",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0002-8098-8527"
            },
            {
                "affiliation": "Yale",
                "display_name": "Vishwa Deep Dixit",
                "email": "vishwa.dixit@yale.edu",
                "first_name": "Vishwa",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Dixit",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "Deep",
                "orcid": "0000-0002-5341-6494"
            }
        ],
        "created_by_user_displayname": "SenNet Process",
        "created_by_user_email": "sennet@sennetconsortium.org",
        "created_by_user_sub": "ea9712ff-129d-33d0-8f6c-834b34cd382e",
        "created_timestamp": 1754587701243,
        "creation_action": "Create Dataset Activity",
        "data_access_level": "public",
        "dataset_type": "PhenoCycler",
        "description": "Aging in the immune system is marked by various phenotypic changes of the immune cells across organs and a functional decline in their ability to combat disease and infection. At the Yale TMCs, we aim to characterize how senescence manifests in the lymphoid and non-lymphoid tissues, how it affects immune cell function, and the complex relationship between immune cells and senescence-associated secretory phenotype (SASP) producing senescence cells. To achieve this, we are using the Phenocycler-Fusion system and a customized immune-senescence panel to produce high-plex immunofluorescence images of young and aged immune tissues and cells. In this dataset, we present imaging data from fresh frozen (FF) spleen tissues from male 25.5 month old wild-type C57BL6 mice, stained with 20 markers consisting of immune cell type and cell proliferation markers that show the spatial distribution of various cell phenotypes in the spleen.",
        "doi_url": "https://doi.org/10.60586/SNT854.VJMX.652",
        "entity_type": "Dataset",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "ingest_id": "b2c290335c4d69f377fce7b71ae91db6_scan.and.begin.processing_2025-08-11T09:50:25.114585-04:00",
        "ingest_metadata": {
            "dag_provenance_list": [
                {
                    "documentation_url": null,
                    "hash": "9fa7a3b",
                    "input_parameters": [],
                    "origin": "https://github.com/sennetconsortium/ingest-pipeline.git",
                    "version": "v6.0.1"
                },
                {
                    "documentation_url": null,
                    "hash": "24c8bc97",
                    "input_parameters": [],
                    "origin": "https://github.com/hubmapconsortium/ingest-validation-tools",
                    "version": "v0.0.37"
                }
            ],
            "extra_metadata": {
                "collectiontype": "generic_metadatatsv"
            }
        },
        "last_modified_timestamp": 1754943430299,
        "last_modified_user_displayname": "Max Sibilla",
        "last_modified_user_email": "MAS400@pitt.edu",
        "last_modified_user_sub": "1b8f1792-0ee8-473f-9249-2dc5aa4ce19c",
        "local_directory_rel_path": "public/TMC - Yale University - Dixit/b2c290335c4d69f377fce7b71ae91db6/",
        "metadata": {
            "acquisition_instrument_model": "Phenocycler-Fusion 1.0",
            "acquisition_instrument_vendor": "Akoya Biosciences",
            "analyte_class": "Protein",
            "antibodies_path": "extras/SNT926_antibodies.tsv",
            "cell_boundary_marker_or_stain": "Not applicable",
            "contributors_path": "extras/validated-SNT926_contributors.tsv",
            "dataset_type": "PhenoCycler",
            "is_targeted": "Yes",
            "metadata_schema_id": "62af6829-743d-423e-a701-204710e56beb",
            "non_global_files": "",
            "nuclear_marker_or_stain": "DAPI",
            "number_of_antibodies": "21",
            "number_of_biomarker_imaging_rounds": "8",
            "number_of_channels": "3",
            "number_of_total_imaging_rounds": "10",
            "preparation_protocol_doi": "https://dx.doi.org/10.17504/protocols.io.8epv5jdbnl1b/v1",
            "source_storage_duration_unit": "month",
            "source_storage_duration_value": "2",
            "time_since_acquisition_instrument_calibration_unit": "day",
            "time_since_acquisition_instrument_calibration_value": "5",
            "total_run_time_unit": "hour",
            "total_run_time_value": "14"
        },
        "origin_samples": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698074603414,
                "creation_action": "Create Sample Activity",
                "data_access_level": "public",
                "entity_type": "Sample",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1698074603414,
                "last_modified_user_displayname": "Hester Doyle",
                "last_modified_user_email": "hester.doyle@yale.edu",
                "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "organ": "UBERON:0002106",
                "organ_hierarchy": "Spleen",
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sample_category": "Organ",
                "sennet_id": "SNT666.XZGV.432",
                "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
            }
        ],
        "pipeline_message": "the process ran",
        "provider_info": "PhenoCycler Fusion Data for WT aged mice",
        "published_timestamp": 1754943430299,
        "published_user_displayname": "Max Sibilla",
        "published_user_email": "MAS400@pitt.edu",
        "published_user_sub": "1b8f1792-0ee8-473f-9249-2dc5aa4ce19c",
        "registered_doi": "10.60586/SNT854.VJMX.652",
        "run_id": "b2c290335c4d69f377fce7b71ae91db6_scan.and.begin.processing_2025-08-11T09:50:25.114585-04:00",
        "sennet_id": "SNT854.VJMX.652",
        "sources": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698069424312,
                "creation_action": "Create Source Activity",
                "data_access_level": "public",
                "entity_type": "Source",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1754746533320,
                "last_modified_user_displayname": "Jungmin Nam",
                "last_modified_user_email": "jungmin.nam@yale.edu",
                "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
                "metadata": {
                    "bedding": "1/4-inch pelleted cellulose",
                    "cage_enhancements": "Nestlets",
                    "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
                    "date_of_death": "2023/10/24 12:00:00 AM",
                    "diet": "Chow",
                    "euthanization_method": "Inhaled anesthetic euthanasia",
                    "is_deceased": "Yes",
                    "is_embryo": "No",
                    "light_cycle": "Standard/default",
                    "local_lifespan_data": "25.5 month",
                    "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
                    "rack_setup": "Ventilated",
                    "room_health_status": "Pathogen free",
                    "room_temperature": "23",
                    "sex": "Male",
                    "source_id": "SNT722.BGFJ.623",
                    "strain": "C57BL6",
                    "strain_rrid": "RRID:IMSR_JAX:000664",
                    "water_source": "Hydropac individual pouch water"
                },
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sennet_id": "SNT722.BGFJ.623",
                "source_type": "Mouse",
                "uuid": "2f2a7af9951f50b399d76b5080486fe1"
            }
        ],
        "status": "Published",
        "status_history": [
            {
                "change_timestamp": 1754587701243,
                "changed_by_email": "sennet@sennetconsortium.org",
                "status": "New"
            },
            {
                "change_timestamp": 1754587728124,
                "changed_by_email": "sennet@sennetconsortium.org",
                "status": "Submitted"
            },
            {
                "change_timestamp": 1754920225687,
                "changed_by_email": "bhonick@andrew.cmu.edu",
                "status": "Processing"
            },
            {
                "change_timestamp": 1754920348212,
                "changed_by_email": "sennet@sennetconsortium.org",
                "status": "QA"
            },
            {
                "change_timestamp": 1754943430296,
                "changed_by_email": "MAS400@pitt.edu",
                "status": "Published"
            }
        ],
        "uuid": "b2c290335c4d69f377fce7b71ae91db6"
    },
    {
        "antibodies": [
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "1016",
                "antibody_rrid": "AB_3675510",
                "channel_id": "p16",
                "conjugated_cat_number": "5250014",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1067764-6",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P51480"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644264",
                "channel_id": "CD11b",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000267",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P05555"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "985",
                "antibody_rrid": "AB_3675506",
                "channel_id": "53BP1",
                "conjugated_cat_number": "5550002",
                "conjugated_tag": "AF647",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1078675-2",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P70399"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "1028",
                "antibody_rrid": "AB_3675511",
                "channel_id": "p21",
                "conjugated_cat_number": "5250008",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1063056-4",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P39689"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644273",
                "channel_id": "CD90.2",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406230",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01831"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "928",
                "antibody_rrid": "AB_3675505",
                "channel_id": "p53",
                "conjugated_cat_number": "5550016",
                "conjugated_tag": "AF647",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1081067-2",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P02340"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "1017",
                "antibody_rrid": "AB_2864385",
                "channel_id": "gH2AX",
                "conjugated_cat_number": "5250012",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1018786-4",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P27661"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644275",
                "channel_id": "Ter119",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B349936",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P14220"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "1000",
                "antibody_rrid": "AB_2564794",
                "channel_id": "H3K9me3",
                "conjugated_cat_number": "5150009",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B410781",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P68433"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "994",
                "antibody_rrid": "AB_3675509",
                "channel_id": "LaminB1",
                "conjugated_cat_number": "5250019",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1045596-1",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P14733"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644269",
                "channel_id": "CD24",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000169",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P24807"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271538",
                "channel_id": "CD169",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B399274",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q62230"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "1032",
                "antibody_rrid": "AB_3675507",
                "channel_id": "H3K27ac",
                "conjugated_cat_number": "5250018",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1072898",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P68433"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644270",
                "channel_id": "CD38",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B388259",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P56528"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271528",
                "channel_id": "CD3",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B388260",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P22646"
            },
            {
                "antibody_concentration_unit": "ug/ml",
                "antibody_concentration_value": "1026",
                "antibody_rrid": "AB_3675508",
                "channel_id": "Rb",
                "conjugated_cat_number": "5250006",
                "conjugated_tag": "Atto550",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1051741-7",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P13405"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644276",
                "channel_id": "IgD",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "100",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "BX97932",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01882"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644274",
                "channel_id": "TCRb",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000357",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01852"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_2895046",
                "channel_id": "Ki67",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000313",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "E9PVX6"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644277",
                "channel_id": "IgM",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B358628",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01872"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271529",
                "channel_id": "CD11c",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B388264",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q9QXH4"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271540",
                "channel_id": "CD8a",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B394300",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P01731"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644272",
                "channel_id": "CD45R/B220",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B396437",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P06800"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271541",
                "channel_id": "Ly6g",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B381166",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P35461"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271534",
                "channel_id": "CD5",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B397930",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P13379"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644271",
                "channel_id": "CD45",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000158",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P06800"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271535",
                "channel_id": "CD71",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B347017",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q62351"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271532",
                "channel_id": "MHC II",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B360847",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P18468"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3254703",
                "channel_id": "CD49f",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "1000000165",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q61739"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271537",
                "channel_id": "CD4",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406310",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P06332"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3254603",
                "channel_id": "CD31",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406302",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "Q08481"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3254289",
                "channel_id": "CD19",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B404569",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P25918"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3644265",
                "channel_id": "CD21/35",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "400",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B406366",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P19070"
            },
            {
                "antibody_concentration_unit": "",
                "antibody_concentration_value": "",
                "antibody_rrid": "AB_3271531",
                "channel_id": "CD44",
                "conjugated_cat_number": "",
                "conjugated_tag": "",
                "dilution_factor": "200",
                "hgnc_symbol": "Not Applicable",
                "lot_number": "B360593",
                "metadata_schema_id": "312f7be0-9aec-4cae-b942-a8864c0aa1ce",
                "uniprot_accession_number": "P15379"
            }
        ],
        "cedar_mapped_metadata": {
            "Acquisition Instrument Model": "Phenocycler-Fusion 1.0",
            "Acquisition Instrument Vendor": "Akoya Biosciences",
            "Analyte Class": "Protein",
            "Antibodies Path": "extras/validated-SNT524_antibodies.tsv",
            "Cell Boundary Marker Or Stain": "Not applicable",
            "Contributors Path": "extras/validated-SNT524_contributors.tsv",
            "Dataset Type": "PhenoCycler",
            "Is Targeted": "Yes",
            "Metadata Schema ID": "62af6829-743d-423e-a701-204710e56beb",
            "Non Global Files": "",
            "Nuclear Marker Or Stain": "DAPI",
            "Number Of Antibodies": "35",
            "Number Of Biomarker Imaging Rounds": "17",
            "Number Of Channels": "3",
            "Number Of Total Imaging Rounds": "19",
            "Preparation Protocol DOI": "https://dx.doi.org/10.17504/protocols.io.8epv5jdbnl1b/v1",
            "Source Storage Duration": "2 month",
            "Time Since Acquisition Instrument Calibration": "5 day",
            "Total Run Time": "22 hour"
        },
        "contacts": [
            {
                "affiliation": "Yale",
                "display_name": "Jungmin Nam",
                "email": "jungmin.nam@yale.edu",
                "first_name": "Jungmin",
                "is_contact": "Yes",
                "is_operator": "Yes",
                "is_principal_investigator": "No",
                "last_name": "Nam",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0002-6717-1328"
            },
            {
                "affiliation": "Yale",
                "display_name": "Rong Fan",
                "email": "rong.fan@yale.edu",
                "first_name": "Rong",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Fan",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0001-7805-8059"
            },
            {
                "affiliation": "Yale",
                "display_name": "Vishwa Deep Dixit",
                "email": "vishwa.dixit@yale.edu",
                "first_name": "Vishwa",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Dixit",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "Deep",
                "orcid": "0000-0002-5341-6494"
            }
        ],
        "contains_human_genetic_sequences": false,
        "contributors": [
            {
                "affiliation": "Yale",
                "display_name": "Jungmin Nam",
                "email": "jungmin.nam@yale.edu",
                "first_name": "Jungmin",
                "is_contact": "Yes",
                "is_operator": "Yes",
                "is_principal_investigator": "No",
                "last_name": "Nam",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0002-6717-1328"
            },
            {
                "affiliation": "Yale",
                "display_name": "Rong Fan",
                "email": "rong.fan@yale.edu",
                "first_name": "Rong",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Fan",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0001-7805-8059"
            },
            {
                "affiliation": "Yale",
                "display_name": "Anthony Fung",
                "email": "anthony.fung@yale.edu",
                "first_name": "Anthony",
                "is_contact": "No",
                "is_operator": "Yes",
                "is_principal_investigator": "No",
                "last_name": "Fung",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0003-1631-7451"
            },
            {
                "affiliation": "Yale",
                "display_name": "Yunhee Youm",
                "email": "yunhee.youm@yale.edu",
                "first_name": "Yun-Hee",
                "is_contact": "No",
                "is_operator": "No",
                "is_principal_investigator": "No",
                "last_name": "Youm",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "",
                "orcid": "0000-0002-8098-8527"
            },
            {
                "affiliation": "Yale",
                "display_name": "Vishwa Deep Dixit",
                "email": "vishwa.dixit@yale.edu",
                "first_name": "Vishwa",
                "is_contact": "Yes",
                "is_operator": "No",
                "is_principal_investigator": "Yes",
                "last_name": "Dixit",
                "metadata_schema_id": "94dae6f8-0756-4ab0-a47b-138e446a9501",
                "middle_name_or_initial": "Deep",
                "orcid": "0000-0002-5341-6494"
            }
        ],
        "created_by_user_displayname": "SenNet Process",
        "created_by_user_email": "sennet@sennetconsortium.org",
        "created_by_user_sub": "ea9712ff-129d-33d0-8f6c-834b34cd382e",
        "created_timestamp": 1754923869475,
        "creation_action": "Create Dataset Activity",
        "data_access_level": "public",
        "dataset_type": "PhenoCycler",
        "description": "Aging in the immune system is marked by various phenotypic changes of the immune cells across organs and a functional decline in their ability to combat disease and infection. At the Yale TMCs, we aim to characterize how senescence manifests in the lymphoid and non-lymphoid tissues, how it affects immune cell function, and the complex relationship between immune cells and senescence-associated secretory phenotype (SASP) producing senescence cells. To achieve this, we are using the Phenocycler-Fusion system and a customized immune-senescence panel to produce high-plex immunofluorescence images of young and aged immune tissues and cells. In this dataset, we present imaging data from  formalin-fixed paraffin-embedded (FFPE) spleen tissues from a 7.5 month old and 25.5 month old wild-type C57BL6 mice, stained with 36 markers including eight markers for cell proliferation and senescence (Ki67, p16, 53BP1, p21, p53, gH2AX, LaminB1, Rb), various immune cell type markers, and two histone modification markers (H3K9me3, H3K27ac).",
        "doi_url": "https://doi.org/10.60586/SNT397.CRWK.458",
        "entity_type": "Dataset",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "ingest_id": "f9a36aa133fff9cb3e62c2e4ea885578_scan.and.begin.processing_2025-08-11T10:54:07.592734-04:00",
        "ingest_metadata": {
            "dag_provenance_list": [
                {
                    "documentation_url": null,
                    "hash": "9fa7a3b",
                    "input_parameters": [],
                    "origin": "https://github.com/sennetconsortium/ingest-pipeline.git",
                    "version": "v6.0.1"
                },
                {
                    "documentation_url": null,
                    "hash": "24c8bc97",
                    "input_parameters": [],
                    "origin": "https://github.com/hubmapconsortium/ingest-validation-tools",
                    "version": "v0.0.37"
                }
            ],
            "extra_metadata": {
                "collectiontype": "generic_metadatatsv"
            }
        },
        "last_modified_timestamp": 1754943461893,
        "last_modified_user_displayname": "Max Sibilla",
        "last_modified_user_email": "MAS400@pitt.edu",
        "last_modified_user_sub": "1b8f1792-0ee8-473f-9249-2dc5aa4ce19c",
        "local_directory_rel_path": "public/TMC - Yale University - Dixit/f9a36aa133fff9cb3e62c2e4ea885578/",
        "metadata": {
            "acquisition_instrument_model": "Phenocycler-Fusion 1.0",
            "acquisition_instrument_vendor": "Akoya Biosciences",
            "analyte_class": "Protein",
            "antibodies_path": "extras/validated-SNT524_antibodies.tsv",
            "cell_boundary_marker_or_stain": "Not applicable",
            "contributors_path": "extras/validated-SNT524_contributors.tsv",
            "dataset_type": "PhenoCycler",
            "is_targeted": "Yes",
            "metadata_schema_id": "62af6829-743d-423e-a701-204710e56beb",
            "non_global_files": "",
            "nuclear_marker_or_stain": "DAPI",
            "number_of_antibodies": "35",
            "number_of_biomarker_imaging_rounds": "17",
            "number_of_channels": "3",
            "number_of_total_imaging_rounds": "19",
            "preparation_protocol_doi": "https://dx.doi.org/10.17504/protocols.io.8epv5jdbnl1b/v1",
            "source_storage_duration_unit": "month",
            "source_storage_duration_value": "2",
            "time_since_acquisition_instrument_calibration_unit": "day",
            "time_since_acquisition_instrument_calibration_value": "5",
            "total_run_time_unit": "hour",
            "total_run_time_value": "22"
        },
        "origin_samples": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698074603414,
                "creation_action": "Create Sample Activity",
                "data_access_level": "public",
                "entity_type": "Sample",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1698074603414,
                "last_modified_user_displayname": "Hester Doyle",
                "last_modified_user_email": "hester.doyle@yale.edu",
                "last_modified_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "organ": "UBERON:0002106",
                "organ_hierarchy": "Spleen",
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sample_category": "Organ",
                "sennet_id": "SNT666.XZGV.432",
                "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
            }
        ],
        "pipeline_message": "the process ran",
        "provider_info": "FFPE Spleen Phenocycler Data",
        "published_timestamp": 1754943461893,
        "published_user_displayname": "Max Sibilla",
        "published_user_email": "MAS400@pitt.edu",
        "published_user_sub": "1b8f1792-0ee8-473f-9249-2dc5aa4ce19c",
        "registered_doi": "10.60586/SNT397.CRWK.458",
        "run_id": "f9a36aa133fff9cb3e62c2e4ea885578_scan.and.begin.processing_2025-08-11T10:54:07.592734-04:00",
        "sennet_id": "SNT397.CRWK.458",
        "sources": [
            {
                "created_by_user_displayname": "Hester Doyle",
                "created_by_user_email": "hester.doyle@yale.edu",
                "created_by_user_sub": "0e5f9972-21ad-42e2-8aef-01a324a400a1",
                "created_timestamp": 1698069424312,
                "creation_action": "Create Source Activity",
                "data_access_level": "public",
                "entity_type": "Source",
                "group_name": "TMC - Yale University - Dixit",
                "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
                "last_modified_timestamp": 1754746533320,
                "last_modified_user_displayname": "Jungmin Nam",
                "last_modified_user_email": "jungmin.nam@yale.edu",
                "last_modified_user_sub": "6b297ad2-d33e-4534-8acf-3456e4611324",
                "metadata": {
                    "bedding": "1/4-inch pelleted cellulose",
                    "cage_enhancements": "Nestlets",
                    "date_of_birth_or_fertilization": "2021/9/9 12:00:00 AM",
                    "date_of_death": "2023/10/24 12:00:00 AM",
                    "diet": "Chow",
                    "euthanization_method": "Inhaled anesthetic euthanasia",
                    "is_deceased": "Yes",
                    "is_embryo": "No",
                    "light_cycle": "Standard/default",
                    "local_lifespan_data": "25.5 month",
                    "metadata_schema_id": "44662059-aa73-4756-a4a7-990489ca2f43",
                    "rack_setup": "Ventilated",
                    "room_health_status": "Pathogen free",
                    "room_temperature": "23",
                    "sex": "Male",
                    "source_id": "SNT722.BGFJ.623",
                    "strain": "C57BL6",
                    "strain_rrid": "RRID:IMSR_JAX:000664",
                    "water_source": "Hydropac individual pouch water"
                },
                "protocol_url": "dx.doi.org/10.17504/protocols.io.kqdg3x8keg25/v2",
                "sennet_id": "SNT722.BGFJ.623",
                "source_type": "Mouse",
                "uuid": "2f2a7af9951f50b399d76b5080486fe1"
            }
        ],
        "status": "Published",
        "status_history": [
            {
                "change_timestamp": 1754923869475,
                "changed_by_email": "sennet@sennetconsortium.org",
                "status": "New"
            },
            {
                "change_timestamp": 1754923910340,
                "changed_by_email": "sennet@sennetconsortium.org",
                "status": "Submitted"
            },
            {
                "change_timestamp": 1754924048109,
                "changed_by_email": "bhonick@andrew.cmu.edu",
                "status": "Processing"
            },
            {
                "change_timestamp": 1754924168277,
                "changed_by_email": "sennet@sennetconsortium.org",
                "status": "QA"
            },
            {
                "change_timestamp": 1754943461890,
                "changed_by_email": "MAS400@pitt.edu",
                "status": "Published"
            }
        ],
        "uuid": "f9a36aa133fff9cb3e62c2e4ea885578"
    }
]
</code>
</pre>
Woah! That's a lot! Next, we'll show how to trim the results to return only certain properties.
### Filtering the results
What if we want to filter our results such that only the necessary properties are returned? We could issue calls to the same endpoints, but
instead of a GET request, we will make a POST request so we can add some `body` to our request. The body data will define what properties we expect. Let's create a `filter_data` method that we will reuse for upcoming requests.
<pre>
<code class="language-python">
def filter_data(endpoint, body):
    query_url =  f"{domain_base}{endpoint}"
    entity_data = None
    try:
        response = requests.post(query_url, data=body) # notice the use of the post method, and passing additional data via the data param
        response_code = response.status_code

        if response_code == 200:
            entity_data = response.json
        else:
            print(f"An error occurred {response_code}")
    except Exception as err:
        print(f"An unexpected error occurred: {err}")

return entity_data
</code>
</pre>
In this method, notice the use of the `post` method, and passing additional data via the `data` param. 
#### Defining a request body for the `data` param
What if for the previous `/descendants` call we just want a list of the most basic information for the entities? We could get those results by creating a request body with `filter_properties` setting. It's just a list of strings.
The strings are the property names that should be returned in the response body. In this case, we just want the basic properties defined by the application. So we just need to set the list to be empty `[]`. Like so:
<pre>
<code class="language-python">
body = {
    "filter_properties": []
}
uuid = "2f2a7af9951f50b399d76b5080486fe1"
entity_data = filter_data(f"/descendants/{uuid}", body)
</code>
</pre>
This call would yield:
<pre>
<code class="language-json">
[
    {
        "contains_human_genetic_sequences": false,
        "data_access_level": "public",
        "dataset_type": "PhenoCycler",
        "entity_type": "Dataset",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "sennet_id": "SNT397.CRWK.458",
        "status": "Published",
        "uuid": "f9a36aa133fff9cb3e62c2e4ea885578"
    },
    {
        "data_access_level": "public",
        "entity_type": "Sample",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "sample_category": "Block",
        "sennet_id": "SNT664.KFZW.224",
        "uuid": "8208088865da724bbb55cae38632a88a"
    },
    {
        "data_access_level": "public",
        "entity_type": "Sample",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "sample_category": "Section",
        "sennet_id": "SNT587.LHXH.846",
        "uuid": "fb1398a3f416df8f2fc97583796f29be"
    },
    {
        "contains_human_genetic_sequences": false,
        "data_access_level": "public",
        "dataset_type": "PhenoCycler",
        "entity_type": "Dataset",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "sennet_id": "SNT854.VJMX.652",
        "status": "Published",
        "uuid": "b2c290335c4d69f377fce7b71ae91db6"
    },
    {
        "data_access_level": "public",
        "entity_type": "Sample",
        "group_name": "TMC - Yale University - Dixit",
        "group_uuid": "1350e2f9-23a9-11ed-a56b-4ffe8363feee",
        "organ": "UBERON:0002106",
        "sample_category": "Organ",
        "sennet_id": "SNT666.XZGV.432",
        "uuid": "1c49b822f9a9341cfb2be080f08eb15f"
    }
]
</code>
</pre>
If we only wanted the UUIDs in the response, our code would look like:
<pre>
<code class="language-python">
body = {
    "filter_properties": ["uuid"]
}
uuid = "2f2a7af9951f50b399d76b5080486fe1"
entity_data = filter_data(f"/descendants/{uuid}", body)
</code>
</pre>
That would yield:
<pre>
<code class="language-json">
[
"1c49b822f9a9341cfb2be080f08eb15f",
"8208088865da724bbb55cae38632a88a",
"fb1398a3f416df8f2fc97583796f29be",
"b2c290335c4d69f377fce7b71ae91db6",
"f9a36aa133fff9cb3e62c2e4ea885578"
]
</code>
</pre>

