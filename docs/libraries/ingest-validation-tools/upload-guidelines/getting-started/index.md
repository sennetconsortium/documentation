---
layout: default
---

# Getting Started with Data Submission

**PLEASE NOTE:** This page may be out of date to the current implementation of CEDAR schemas. Please reach out to [help@sennetconsortium.org](mailto:help@sennetconsortium.org) with any questions.

Are you new to the data submission process in SenNet or looking for a refresher? Then this is the resource for you!

First, here are some key concepts and definitions:
- **Data Submission**: The process whereby data providers from SenNet funded components register sources (whole mice and humans), whole organs, tissue blocks, tissue sections, tissue suspensions, and datasets containing raw data files on the [SenNet Data Sharing Portal](https://data.sennetconsortium.org/search?size=n_10000_n&sort%5B0%5D%5Bfield%5D=last_modified_timestamp&sort%5B0%5D%5Bdirection%5D=desc). Data Submission also involves protocol registration (case selection, sample preparation, and experimental modality) in the SenNet workspace on [protocols.io](protocols.io) as well as data file transfer via Globus.
- **Data Ingest** The process by which SenNet Curation and other members of the CODCC validate datasets/uploads, reorganize uploads (split them into their component datasets with each dataset gaining a unique SenNet ID), and run datasets through processing pipelines to generate "derived datasets." Publishing datasets (making them available to the public) depends on all processes working together in addition to successful data submission on the part of the data provider.
- **Entity**: Anything that can be described using information.
- **Registration**: The process of generating a SenNet ID (e.g., SNT123.ABCD.4567) for an entity via the Data Sharing Portal.
- **Metadata**: Literally "information about information" or "data about data." Descriptive information about various entities submitted to the CODCC via TSV files.
- **Source**: The entire human, mouse, human organoid, or murine organoid from which samples are collected.
- **Sample**: An organ, tissue block, tissue section, or tissue suspension.
- **Dataset**: Contains the data files for a particular run of an experimental modality (assay). Note that SenNet Curation will use "experimental modality" and "assay" interchangeably.
- **Provenance**: The origin of a particular entity. Captured internally via a graph database in the CODCC. A typical flow of provenance in SenNet is `source -> organ -> block -> a further block, a section, or a suspension -> dataset`. Everything from organ down is registered to a direct ancestor (organ registered to source, tissue block to organ, section/suspension/block to first block, dataset to sample). A dataset is descended from the most granular sample against which the experimental modality was run.
- **Registration User Interface (RUI)**: The tool allowing for the spatial coordinate registration of tissue blocks.

An overview of a typical data submission process workflow can be found below:

![SenNet Data Submission Overview Registration drawio](/20240327 SenNet Data Submission Overview Registration.drawio.png)

A lecture recording on the above concepts as well as registering entities on the Data Sharing Portal can be found via [this link](https://iu.mediaspace.kaltura.com/media/t/1_9acekkx1) (hosting courtesy of Indiana University via Kaltura).

The Data Submission Guide can be found [here](/data-submission).

If you need further help with the data submission process, please schedule a 30-minute SenNet Data Submission Office Hours meeting with one of the curators via [this link](https://calendly.com/bhonick-psc/30min?) or reach out to the SenNet Help Desk via [help@sennetconsortium.org](mailto:help@sennetconsortium.org).


By: Brendan J. Honick 2023-06-23

Last updated by: Brendan J. Honick 2024-03-29
