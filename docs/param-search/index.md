---
layout: default
---
# SenNet Parameterized Search

## Overview:
The SenNet parameterized search endpoints provide an option for a simpler programmatic search mechanism vs using the full search-api `/search` endpoints. Both the `/param-search` and `/search` endpoints are backed by Elasticsearch indices, but the parameterized search facility follows a simple RESTful parameter scheme vs the complicated Elasticsearch json query syntax used by the full `/search` mechanism. The `/param-search` endpoint only allows for searching specific values of "allowable value" attributes "anded" together vs the full logic and attribute types available in the [Elasticsearch supported queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html) available in the full `/search` endpoint.

This page documents the public usage of the `/param-search` endpoint and its variants vs the fully documented [SenNet Search API](https://smart-api.info/ui/10ed9b5eb8ff960d4431befc591ed842), which includes less detail of the `/param-search` endpoint, but also detail of the more capable, but more complicated `/search` endpoint.

## Description: 
The `/param-search/<entity-type>` endpoint of the [SenNet Search API service](https://smart-api.info/ui/10ed9b5eb8ff960d4431befc591ed842) is a RESTful search interface allowing simple attribute matching by providing attribute value pairs as query parameters at the end of the RESTful URL call.  Multiple query parameters can be provided, which will be "ANDed" together in the query logic, for example the URL `https://searchapi.service.endpoint/entity-type?param1=value1&param2=value2&param3=value3` will find all entities of type "entity-type" where entity.param1 equals "value1" and entity.param2 equals "value2" and entity.param3 equals "value3"

For an example of how to use the `produce-clt-manifest` option (described below), see the [Example Query and Download page](data-query-download-example.html)

### Inputs
 - <entity-type> The type of entity to search for provided as an in-URL resource parameter after the `/param-search/` endpoint name, where valid entity types are:
   - `sources` See the [Source Schema](schema-source.html) for the list of queryable Dataset parameters.
   - `samples` See the [Sample Schema](schema-sample.html) for the list of queryable Sample parameters.
   - `datasets` See the [Dataset Schema](schema-dataset.html) for the list of queryable Dataset parameters.
 - attribute value pairs as query parameters i.e `attribute-name=value`, at least one pair is required with the upper limit based on maximum URL length.  An attribute name can only be included once in the attribute value pairs.
Example call: `/param-search/datasets?dataset_type=CODEX&status=Published` will return all datasets of type CODEX that are published.
 - optional query parameter `produce-clt-manifest=true`, that will produce, instead of a list of matching entities, a list of unique datasets ids for each dataset matching the query in the format of a manifest that is directly usable by the [SenNet Command Line Transfer Tool](/libraries/clt/] to download the full datasets via the SenNet Globus Endpoint.

The parameter names can be top level attributes from any of the entities or they can be nested attributes, for example `/param-search/datasets?dataset_type=CODEX` queries the top level Dataset attribute `dataset_type`, whereas `/param-search/datasets?metadata.is_targeted=Yes` queries the `is_targeted` attribute that is nested under metadata.

### Response
Response Code: `200`:
When at least one entity matches the query, a 200 HTTP response code and if query parameter `produce-clt-manifest=true` is NOT include a json array of all entities matching the <entity-type> and query parameters, with each item in the list containing a json object of <entity-type>, with the associated attributes for the entity type and values. Otherwise, if the query parameter `produce-clt-manifest=true` is included, the list of ids of all matching datasets

Response Code: `303`:
If the total response payload exceeds 10 MB, the response is returned via an S3 bucket.  A 303 HTTP response code will be returned with the redirect URL where the query can be retrieved.

Response Code `404`:
When no entities are matched a 404 HTTP response code is returned.

Response Code `504`:
There is a maximum query and response time of 30 seconds.  If the query response takes 30 seconds or longer, a 504 HTTP response code will be returned and you'll need to constrain your query to return less values.


Each document in the `entities` indices contains information about one entity in a Dataset.  The structure of these documents is described below.

## Examples:
---
To find all Datasets of type `RNAseq` where specific molecules are not targeted for detection use this query:
```
 GET https://search.api.sennetconsortium.org/param-search/datasets?dataset_type=RNAseq&metadata.is_targeted=No
```

A json array containing Dataset objects will be returned.

---

To find all Histology datasets (`dataset_type=Histology`) that were run on tissue from a right lung (`origin_samples.organ=RL`):
```
 GET https://search.api.sennetconsortium.org/param-search/datasets?origin_samples.organ=RL&dataset_type=Histology
```
A json array containing Dataset objects will be returned.

---

To run the same query finding all Histology datasets, but produce a manifest file to download all of the data instead of producing the json of all dataset information, add the `produce-clt-manifest=true` option
```
 GET https://search.api.sennetconsortium.org/param-search/datasets?origin_samples.organ=RL&dataset_type=Histology&produce-clt-manifest=true
```

This will produce a list of dataset ids in a format usable by the [SenNet Command Line Transfer Tool](/libraries/clt/) to download the data.  A Linux/MAC command line example of how to produce a manifest file:

```
curl "https://search.api.sennetconsortium.org/param-search/datasets?origin_samples.organ=RL&dataset_type=Histology&produce-clt-manifest=true" > manifest.out
```

