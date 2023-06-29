---
layout: default
---
# SenNet Command-Line Transfer

The SenNet Command-Line Transfer (CLT) tool streamlines the download of individual files and directories from multiple datasets and uploads. Files and directories are specified in a manifest file and given to the CLT.


## Installation

The CLT uses the [Globus Connect Personal](https://www.globus.org/globus-connect-personal) (GCP) application to download the specified files and directories to your computer. GCP and the CLT require a SenNet account. This account is the same account used to log in to the SenNet Portal. Windows users should follow [additional instructions](gcp-windows) while settings up GCP.

The CLT requires Python 3.6 or above. The CLT can be installed through PyPI using the following command:

```
pip install sennet-clt
```

## Manifest File
Files and directories of interest are specified in a manifest file. A manifest is a text file that contains the dataset id and the path to the dataset, separated by a space. Multiple files or directories can be specified by placing each on a separate line. A directory can be specified by ending the path with a slash `/`. An optional header can be specified at the top of the file. Text after the path will be ignored and can be used for comments.

### Example
```
dataset_id file_or_dir_specifier    #optional header line is ignored
SNT123.ABCD.456 /metadata.tsv       #download the metadata.tsv file for dataset SNT123.ABCD.456
SNT345.ABCD.456 /                   #download all files in the dataset SNT345.ABCD.456
SNT378.HDGT.837 /extras             #download the extras directory from dataset SNT378.HDGT.837
```

## Usage

Usage documentation can also be found by running the following command:
```
sennet-clt -h
```

### Login

A one-time login is required for any download session. For non-public data, you must log in with your SenNet account. For publicly available data, you can log in with any account accepted by the login form (Google and OrCID). Log in can be initiated using the following command:

``` 
sennet-clt login
```

### Logout

Logout can be used to log out the current user.
```
sennet-clt logout
```

### Transfer

A data transfer and download can be initiated using the transfer command and a manifest file. You must be logged in to use the transfer command.
```
sennet-clt transfer <PATH/TO/MANIFEST/FILE> 
```
An optional destination argument can be specified. The destination is the directory on the user's computer where data will be downloaded. The directory will be created if it doesn't exist. The destination argument is relative to the user's home directory (~). For example, `--destination Desktop/sennet-data` corresponds to an absolute path of `~/Desktop/sennet-data`. The default destination directory is `~/sennet-downloads`.
```
sennet-clt transfer <PATH/TO/MANIFEST/FILE> --destination <PATH/TO/DESTINATION/DIRECTORY>
```

### Whoami

Whoami can be used to display the information of the currently logged in user.
``` 
sennet-clt whoami
```