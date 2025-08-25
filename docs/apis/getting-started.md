---
layout: default
---

# Getting Started With SenNet APIs

Some data is not accessible to the public, for non-public data, you will need an authorization token. Easily grab a token by first logging into the SenNet Data Sharing Portal. Then navigate to your user menu on the top
right. Select `Copy Globus Token`. This will copy the active token to your clipboard for later usage.

## Making your first request
Now that you have a token, let's make a simple request to retrieve data about a given entity. The endpoint that handles that request is `/entities/<id>`. You will need
to build the full url to be requested against the domain base for the service which the endpoint belongs to, in this case, that's the Entity API. The domain base for the Entity API is `https://entity.api.sennetconsortium.org`. For a full list of API services see the
[APIs page](/apis). Given a Source with UUID `2f2a7af9951f50b399d76b5080486fe1` (SenNet ID SNT722.BGFJ.623), data about this entity can be requested using the following code below.


<pre>
<code class="language-python">
import requests
import os
domain_base = "https://entity.api.sennetconsortium.org" 
headers = {
    "Authorization": "Bearer COPIED_TOKEN_HERE",
    "Content-Type": "application/json"
}
endpoint = "/entities/2f2a7af9951f50b399d76b5080486fe1"

query_url =  f"{domain_base}{endpoint}"
try:
    entity_data = None

    #make request and grap the HTTP response code
    response = requests.get(query_url, headers)
    response_code = response.status_code

    if response_code == 200:
        entity_data = response.json
    else:
        print(f"An error occurred {response_code}")
except Exception as err:
    print(f"An unexpected error occurred: {err}")

</code>
</pre>

You may want to write this response data to a file. You can do so with the following code:

<pre>
<code class="language-python">
if not entity_data is None:
    file_name = "entity_data.json"
    with open(file_name, 'w') as file:                                                                                           
        file.write(entity_data)
    print(f"manifest file written at: {os.path.abspath(file_name)}")
else:
    print("ERROR: No entity data information found. File not written")
</code>
</pre>

And that's all it is. For a complete guide per service, visit the [APIs home page](/apis) and navigate to the usage links for the API you wish to query.