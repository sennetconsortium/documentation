---
layout: default
---

# Getting Started With SenNet APIs

Some data is not accessible to the public, for non-public data, you will need an authorization token. Easily grab a token by first logging into the SenNet [Data Sharing Portal](https://data.sennetconsortium.org/). Then navigate to your user menu on the top
right. Select `Copy Globus Token`. This will copy the active token to your clipboard for later usage.  
![SenNet Globus Token](./../../imgs/copy-globus-menu-screen.jpg){:width="263px"}

## Making your first API request
Now that you have a token, let's make a simple request to retrieve data about a given entity. The endpoint that handles that request is `/entities/<id>`. You will need
to build the full url to be requested against the domain base for the service which the endpoint belongs to, in this case, that's the Entity API. The domain base for the Entity API is `https://entity.api.sennetconsortium.org`. For a full list of API services see the
[APIs page](/apis). Given a Source with UUID `2f2a7af9951f50b399d76b5080486fe1` (SenNet ID SNT722.BGFJ.623), data about this entity can be requested using the following code below.

<pre class="line-numbers">
<code class="language-python" data-section='getting_started' data-prismjs-copy="Copy">import requests
import os
import json
domain_base = "https://entity.api.sennetconsortium.org" 
headers = {
    "Authorization": "Bearer COPIED_TOKEN_HERE",
    "Content-Type": "application/json"
}
endpoint = "/entities/2f2a7af9951f50b399d76b5080486fe1"

query_url =  f"{domain_base}{endpoint}"
entity_data = None
try:
    #make request and grap the HTTP response code
    response = requests.get(query_url, headers=headers)
    response_code = response.status_code

    if response_code == 200:
        entity_data = response.json()
    else:
        print(f"An error occurred {response_code}")
except Exception as err:
    print(f"An unexpected error occurred: {err}")

</code>
</pre>

You may want to write this response data to a file. You can do so with the following code:

<pre class="line-numbers">
<code class="language-python" data-section='guide' data-prismjs-copy="Copy">if not entity_data is None:
    file_name = "entity_data.json"
    with open(file_name, 'w') as file:                                                                                           
        file.write(json.dumps(entity_data))
    print(f"manifest file written at: {os.path.abspath(file_name)}")
else:
    print("ERROR: No entity data information found. File not written")
</code>
</pre>
<div class="alert alert-info c-info" markdown="1">
#### Downloads & Tools
[Jupyter Notebook](/#){:.btn.btn-outline-primary data-js-jupyter="getting_started,guide"} [Source](#){:.btn.btn-outline-primary data-js-copy="getting_started,guide"}
</div>

## Using Smart API to test the APIs

Most of the various SenNet [API services](/apis) have accompanying full documentation via Smart API. For our example above, we could also make use of the Smart API Try It Out tool
to check entity data. To do so, follow the steps below.  
1. Navigate to the [/entities/{id}](https://smart-api.info/ui/7d838c9dee0caa2f8fe57173282c5812#/entities/get_entities__id_){: target="_blank"} endpoint.
2. Click `Authorize` on the top right <app-modal data-title="Click Authorize on the top right" data-body="<img alt='Click Authorize on the top right' src='./../../imgs/smartapi-guide-1.jpg' width='800px' />"><i role='button' aria-label='View modal for Click Authorize' class='js-modal link-primary fa fa-picture-o'>&nbsp;</i> </app-modal>
3. Paste your bearer token in the modal `Value:` field <app-modal data-title="Paste your bearer token" data-body="<img alt='Paste your bearer token' src='./../../imgs/smartapi-guide-2.jpg' width='800px' />"><i role='button' aria-label='View modal for Paste your bearer token' class='js-modal link-primary fa fa-picture-o'>&nbsp;</i> </app-modal>
4. Click the `Authorize` button in the modal <app-modal data-title="Click the Authorize button" data-body="<img alt='Click the Authorize button' src='./../../imgs/smartapi-guide-2.jpg' width='800px' />"><i role='button' aria-label='View modal for Click the Authorize button' class='js-modal link-primary fa fa-picture-o'>&nbsp;</i> </app-modal>
5. Then in the `/entities/{id}` section, click `Try it out` <app-modal data-title="Click the Try it out button" data-body="<img alt='Click Try it out' src='./../../imgs/smartapi-guide-3.jpg' width='800px' />"><i role='button' aria-label='View modal for Click the Try it out' class='js-modal link-primary fa fa-picture-o'>&nbsp;</i> </app-modal>
6. In `Parameters` area, paste the entity's id UUID or SenNet ID the `id` field <app-modal data-title="Paste entity ID" data-body="<img alt='Paste entity ID' src='./../../imgs/smartapi-guide-4.jpg' width='800px' />"><i role='button' aria-label='View modal for Paste entity ID' class='js-modal link-primary fa fa-picture-o'>&nbsp;</i> </app-modal>
7. Then click the `Execute` button <app-modal data-title="Click the Execute button" data-body="<img alt='Click the Execute button' src='./../../imgs/smartapi-guide-4.jpg' width='800px' />"><i role='button' aria-label='View modal for Click the Execute button' class='js-modal link-primary fa fa-picture-o'>&nbsp;</i> </app-modal>

A `200` response means a successful result. A `404` response means that the entity was not found. Per endpoint, the `Responses` section describes the various response codes that could occur.


And that's all it is. For a complete guide per service, visit the [APIs home page](/apis) and navigate to the usage links for the API you wish to query.