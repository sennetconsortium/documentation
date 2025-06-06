---
layout: default
---

# SenNet APIs

The following APIs, available as RESTful web services, support data ingest, querying, and delivery of metadata.
Data delivery is available via the [Globus Transfer Service](https://www.globus.org/data-transfer)
and [Globus Transfer API](https://docs.globus.org/api/transfer/). See the [SenNet IDs](#identifiers-used-in-sennet-and-the-apis) section below for
information about how the IDs are used by the SenNet APIs. SenNet is powered by a number of APIs. The SenNet Portal software also has a number of dependencies. 
You may check the status of these services [here](/status).

## Entity API
The Entity API returns information about SenNet data entities.
- [GitHub](https://github.com/sennetconsortium/entity-api)
- [Smart API](https://smart-api.info/ui/7d838c9dee0caa2f8fe57173282c5812)

## Ingest API

The Ingest API supports writing data and metadata to SenNet. Tissue Mapping Centers (TMCs) use it to contribute data to
SenNet which is then used to deposit derived data resulting from the execution of pipelines.

- [GitHub](https://github.com/sennetconsortium/ingest-api)
- [Smart API](https://smart-api.info/ui/6d853628150eb1883bacf98690c890d4)

## Search API

The Search API supports searching and reindexing of SenNet metadata and data. The `/search` endpoint returns sets of data
entities matching specified queries for Sources, Tissue Samples, and Datasets. The `/reindex` endpoint is used internally
to index new and changed entities, this endpoint is not accessible externally, but only from other APIs that create,
update, or delete entities.
<br/><br/>
For a quick guide to query and data download access via the APIs please see
the [Data Query and Download example](/param-search/data-query-download-example.html) and the detailed guide to using
the [Search API Parameter Search feature](/param-search).

- [GitHub](https://github.com/sennetconsortium/search-api)
- [Smart API](https://smart-api.info/ui/10ed9b5eb8ff960d4431befc591ed842)

### UUID API
The UUID API supports donor and tissue sample registration, submission of data, and collection of provenance information via the Ingest UI. The Ingest UI is a web user interface used by the Tissue Mapping Centers (TMCs) when contributing raw and derived data which result from the execution of pipelines.
- [GitHub](https://github.com/x-atlas-consortia/uuid-api)

### Ontology/UBKG API

The Ontology API accesses an instance of a **Unified Biomedical Knowledge Graph** (UBKG), a neo4j knowledge graph that
links infomation from a variety of biomedical vocabulary systems. The SenNet instance of UBKG includes SenNet's *
*application ontology** that represents the SenNet operational model.

- [UBKG](https://ubkg.docs.xconsortia.org/), including links to relevant GitHub repositories
- [Smart API](https://smart-api.info/ui/96e5b5c0b0efeef5b93ea98ac2794837)


# Identifiers used in SenNet and the APIs

SenNet uses three different kinds of identifiers:

### SenNet ID

SenNet IDs are "human readable" identifiers that are used when displaying information about SenNet entities such as Donors, Tissue Samples, Datasets, and Collections.

- Example: `SNT123.ABCD.456` 
- Used for identification of SenNet entities and referencing in SenNet context, e.g. in the portal UI, slides, human-human communication, etc.
- These identifiers can be used in the APIs to query portal UI and APIs
- There is a one-to-one mapping between SenNet IDs and UUIDs, with all SenNet IDs guaranteed to having a corresponding UUID, though not all UUIDs have a corresponding SenNet ID.

### UUID
SenNet UUIDs are intended for use internally in software and data storage.  They are intended for use by software and systems only and not human readable.

- These ids are 32 digit hexadecimal numbers. Example: `0123456789abcdef0123456789abcdef`
- Used for software implementation and data storage.
- These identifiers can be used to query the APIs and data portal.

### DOI
Digital Object Identifiers (DOIs) are generated for published SenNet data and allow for permanent references outside of SenNet.

- Example: `10.1234/SNT123.ABCD.456` 
- Used for referencing outside SenNet context, in particular for use as references in publications.
- Displayed as: `doi:10.1234/SNT.123.ABCD.456`
- Linked to: `https://doi.org/10.1234/SNT.123.ABCD.456`
- Not all SenNet IDs are registered as DOIs, primarily published (public) Datasets and Collections of datasets have DOIs.