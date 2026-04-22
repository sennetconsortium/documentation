<meta name="robots" content="noindex">

# Content Editor
To make certain content show up in either SenNet or HuBMAP documentation site, use `sn-only` or `hm-only` css classes respectively.

## Simple Examples:
- Paragraphs: `<p class="hm-only">Text here shows up in HuBMAP only</p>`
- Links: `<a href="url" class="btn sn-only">Button Text for SenNet only</a>`
- Divs: `<div class="sn-only">...Markdown content for SenNet only...</div>`
- Markdown header `## SenNet only Header {: .sn-only}`
- Markdown link `[HuBMAP Link Text](url){.hm-only}`
- Markdown list `- {.hm-only} List item`

## Real world examples:
### Add to already existing html tags
```
<ol>
    <li> <b>Getting started</b> </li> 
        <ul>
            <li class="hm-only">HuBMAP members:</li>
              <ul>
              <li>On the <a href="http://ingest.hubmapconsortium.org">HuBMAP ingest portal</a></li>
              <li>Register a single donor, sample, dataset, or publication or bulk register samples or data.</li> 
              </ul>
            <li class="sn-only">SenNet members: </li>
              <ul>
              <li>On the <a href="http://data.sennetconsortium.org/search">SenNet Data Sharing portal</a></li> 
              <li>Register a single source, sample, dataset, or publication or bulk register samples or data.</li>
              </ul>
        </ul>
</ol>
```
### Inline classing via the `<span>` tag
```
**Submitting <span class="hm-only">Donor</span><span class="sn-only">Source</span> Data**
```
### Add to already existing tags and markdown lists

```
1. **Email the <a href="mailto:help@hubmapconsortium.org" class="hm-only">HuBMAP Helpdesk</a> <a href="mailto:help@sennetconsortium.org" class="sn-only">SenNet Helpdesk</a> to create a Helpdesk ticket** (for tracking purposes).
   - **Request donor (or source) directory:**
      - {.hm-only} HuBMAP - The HIVE creates a <a href="https://app.globus.org/groups">Globus</a> directory for your donor information.
      - {.sn-only} SenNet - The CODCC creates a <a href="https://app.globus.org/groups">Globus</a> directory for your source information.
```