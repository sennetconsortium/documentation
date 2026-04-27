---
layout: default
---
<meta name="robots" content="noindex">

# Project (HuBMAP/SenNet) specific content

<b>Example of how to include/exclude document page sections for based on the project (HuBMAP/SenNet) context.</b>

The css styling classes `sn-only` and `hm-only` are now available in GitHub Pages the [SenNet Documentation](https://docs.sennetconsortium.org) [(Sennet Docs GitHub Repo)](https://github.com/sennetconsortium/documentation) and [HuBMAP Documentation](https://docs.hubmapconsortium.org) [(HuBMAP Docs GitHubRepo)](https://github.com/hubmapconsortium/documentation).  These classes, when specified as the styling class for an element (via HTML or markdown), will optionally display the element only in HuBMAP (`hm-only` class) or SenNet (`sn-only class).

#### Example:

```
<div class="hm-only">
     This div will show only in the HuBMAP documentation site.
</div>
<div class="sn-only">
     This div will show only in the SenNet documentation site.
</div>
```
<br />
### Same HTML rendered on the SenNet site:
<div class="hm-only">
     This div will show only in the HuBMAP documentation site.
</div>
<div class="sn-only">
     This div will show only in the SenNet documentation site.
</div>
<br /><br />
Further documentation and examples of this feature for other html and markdown uses can be found in the [Project Specific Content README](https://docs.sennetconsortium.org/hs-context-classing.html).