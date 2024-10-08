---
layout: default
---
# SenNet Assays

## [Autofluorescence Microscopy](/assays/af)

Autofluorescence microscopy exploits endogenous fluorescence in a biological tissue to capture an image. The image can then be used to integrate other images from multiple modalities and to align tissues within a 3D experiment. Autofluorescence microscopy requires no sample preparation and can be performed on any fluorescence microscope. 


## [Assay for Transposase-Accessible Chromatin (ATACseq)](/assays/atacseq)

While bulk ATACseq (_Assay for Transposase-Accessible Chromatin_) resolves the _average_ of chromatin architecture in cells comprising a tissue sample, single-cell ATACseq employs per-cell and per-molecule barcoding to enable single-cell resolution of chromatin architecture. The ATACseq assay itself is the same for bulk and single-cell templates. ATAC-seq employs a genetically engineered Tn5 transposase that inserts sequencing adapters into accessible regions on the chromatin surface. Analysis of the sequences derived from the Tn5 sequencing adapters allows identification of those regions of the chromatin located on the cell-state-specific surface of the chromatin.


## [Co-detection by indexing (CODEX)](/assays/codex)

Codex is a strategy for conducting highly multiplexed microscopy of fluorescent-dye-labeled antigens. In brief, antibodies to antigens of interest are barcoded with unique oligonucleotide sequences. A complementary oligonucleotide sequence tagged with a fluorescent probe hybridizes to each antibody barcode allowing visualization of the targeted antigen. The fluorophores are then stripped from the tissue and the process is repeated allowing up to 50 protein targets to be visualized within a single tissue section. 


## [Image Mass Cytometry (IMC)](/assays/imc)

Imaging Mass Cytometry combines standard immunohistochemistry with CyTOF mass cytometry to resolve the cellular localization of up to 40 proteins in a tissue sample.  Multiplexing of dozens of proteins is possible because the antibodies are tagged with rare-earth metal isotopes of defined atomic mass rather than fluorophores, which are subject to spectral signal overlap. High-resolution laser ablation of tissue stained with these antibody-metal conjugates generates clouds of tissue particles which are atomized, ionized, and detected in a time-of-flight mass cytometer. Signals are then plotted against the coordinates of each single laser shot to synthesize one image per mass channel with high-dimensional images produced by overlaying images from multiple channels.

## [Lightsheet](/assays/lightsheet)

Light sheet fluorescence microscopy is used to image large volumes of tissue following clearing and multiplexed immunolabeling protocols. Datasets consist of one or more Z-stacks, series of optical sections along the z axis. Corresponding Z-stack planes can be stitched together for a Multiview dataset.

## [Liquid Chromatography Mass Spectrometry (LC-MS)](/assays/lcms)

Coupling of liquid chromatography (LC) to mass spectrometry (MS) has become an indispensable technique for analyzing complex mixtures of biomolecules. Chromatography is a technique for separation of molecules based on their interactions with a stationary phase and a mobile phase of flowing solvent. For example, in reversed-phase chromatography, the stationary phase is commonly composed of hydrophobic C18-functionalized silica particles that are packed into a column while the mobile phase is composed of a hydrophilic solution. Based on differences in hydrophobicity, biomolecules partition differently between the stationary and mobile phases. Consequently, biomolecules elute off of a column at different times. Mass spectrometry measures the molecular weights of eluted biomolecules via detection of gas-phase ions. To obtain the masses of eluted biomolecules via mass spectrometry, solution-phase biomolecules are most commonly converted to gas-phase ions via electrospray ionization in which a high voltage is applied to the liquid coming out of the column.


## [Matrix Assisted Laser Desorption/Ionization Imaging Mass Spectrometry (MALDI-IMS)](/assays/maldi-ims)

Matrix-assisted laser desorption/ionization (_MALDI_) imaging mass spectrometry (_IMS_) combines the sensitivity and molecular specificity of MS with the spatial fidelity of classical microscopy. IMS is routinely used to study a variety of analyte classes including pharmaceuticals, metabolites, lipids, nucleic acids, glycans, peptides and proteins. Briefly, tissue samples are thinly sectioned, mounted onto conductive glass slides, and coated with a light absorbing matrix that facilitates desorption and ionization of endogenous molecules. Ions are generated by laser irradiation at each position (_pixel coordinate_) within a region of interest in the tissue resulting in the generation of a mass/charge (_m/z_) signal spectrum for each pixel.  The spatial resolution is defined by the size of the laser spot at the sample surface, the spacing between pixel coordinates in the array (_i.e. pitch_), and by the sample preparation processes. An image is then synthesized by plotting the m/z signal intensities for the entire array of pixel coordinates.


## [Multiplexed Immunofluorescence (MxIF)](/assays/mxif)

MxIF is used to visualize the distribution of multiple protein antigens in an intact tissue section by labeling them with fluorophore-tagged antibodies. Tagged antibodies are iteratively incubated with a tissue section, visualized with a fluorescence microscope and then stripped.


## [RNA Sequencing (RNAseq)](/assays/rnaseq)

While bulk RNAseq elucidates the average gene expression profile in cells comprising a tissue sample, single-cell RNAseq employs per-cell and per-molecule barcoding to enable single-cell resolution of the gene expression profile. The RNAseq assay itself is the same for bulk and single-cell templates. Evaluation of the total gene expression profile of a biological sample is referred to as “transcriptomics”. Genes are transcribed in response to some signal(s) to generate certain gene products (proteins) required by the cell. Transcribed RNA then undergoes processing (_addition of a poly-A tail, 5’-capping, exon splicing_) to generate messenger RNA (_mRNA_), which is exported from the nucleus to the cytoplasm for translation into the corresponding encoded protein. The derived sequences of each mRNA transcript are aligned against a reference genome to establish the identity of the corresponding gene. Since each mRNA molecule represents a single gene transcript, the total mRNA-count aligning to a gene represents the expression profile for that gene.


## [Sequencing by Fluorescence In-Situ Hybridization (seqFISH)](/assays/seqfish)

seqFISH technology allows multiplex in situ imaging of mRNA within cells using barcoding and hybridization of probes labeled with as few as 3 fluorescent dyes. seqFISH+ is a highly-multiplexed version of seqFISH that can resolve the identities and subcellular localization of thousands of gene transcripts by generating dozens of pseudocolors from as few as 3 standard fluorescent dyes. Pseudocolors serve as proxies for hybridization-step-order. The strategy is to first hybridize mRNA barcode probes to each mRNA in situ. Each mRNA barcode probe has 4 barcode regions numbered I-IV. Decoding of each barcode region is performed through sequential hybridization and imaging of 60 readout-probes (_3 dye-channels * 20 probes per channel_) distinguished from one another by assigned pseudocolors. Readout-probes are hybridized and imaged one probe at a time such that each of the 20 readout-probes per detection channel can then be assigned a unique pseudocolor (_a number from 1-20_) reflecting the hybridization-step order.  The complete barcode for each mRNA is deduced from the sequence of pseudocolor numbers for regions I-III (_region IV is an additional round used for error correction_). A total of 8,000 (20 × 20 × 20) mRNA barcodes _per dye-channel_ allows a grand total of 24,000 unique mRNA barcodes to be interrogated. The composite image reveals both the identities and subcellular localization of up to 24,000 mRNA molecules.


## [Stained Microscopy](/assays/pas)

Stained microscopy employs histological stains such as H&E or PAS to improve resolution and contrast for visualization of anatomical structures such as tubules or glomeruli. 


## [Whole Genome Sequencing (WGS)](/assays/wgs)
Whole genome sequencing (_WGS_) measures the genome-wide nucleotide sequence in a biological sample. Generally, the purpose is to screen the entire genome for all sequence variations (_against a reference sequence_) such as benign sequence variants (_SNPs_) or candidate pathogenic mutations. Examples of sequence variants include chromosomal rearrangements, nucleotide substitutions, deletions or insertions. An example use case would be a genome-wide search for somatic mutations (_cancer-causing mutations that arose in a somatic cell, as opposed to arising in a germline cell_) by comparing DNA sequence in a patient’s tumor cells to that in the same patient’s healthy cells.
