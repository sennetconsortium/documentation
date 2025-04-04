---
layout: default
---
# Dell Innovation "Moonshot" Hub Access

The Dell Innovation Hub is a small cluster used by SenNet for compute and data storage. To gain Linux command line access (via ssh) to the Hub, you'll first need to gain access to the private network using the GlobalProtect client for remote access into the private network. Additionally, you will need a Pitt account to log into GlobalProtect. The following instructions are specifically for users with a sponsored account (non-Pitt employees), but will work similarly for users with a standard Pitt account. If you don't have a Pitt sponsored account, or you have a Pitt account, but haven't been granted access to the Hub see the [Requesting Hub Access](request-hub-access.html) page.

This document describes how to gain access to the private network where the Hub sits by using the GlobalProtect security client.

<h2 id="installing-global-protect-to-use-with-pitt-sponsored-accounts">Installing GlobalProtect to use with Pitt sponsored accounts</h2>
### Introduction

Global Protect is the client required to access resources secured behind Pitt's firewall. Several use cases require the use of Global Protect for users external to Pitt who have a valid sponsored Pitt account. Install using the instructions included here for Windows, Mac or Linux.  After installation see the details below the installation instructions to check access to internal Pitt resources.

### Requirements

GlobalProtect requires specific system requirements in order to pass a system "Health Check" before connections will be allowed to pass into the protected zones.  These requirements are listed below (click to expand). Verify your system can pass these checks before installing GlobalProtect.

**IMPORTANT** Once GlobalProtect is installed and enabled, make an ssh connection to `login0.moonshot.pitt.edu`, if the connection is successful (doesn't hang) and you are prompted to log in, GlobalProtect is working and you have passed all Health Checks. However, you may not be able to log in if access to the systems has not been granted yet.


<details style="margin-bottom: 20px;">
<summary>GlobalProtect Health Check Requirements for a Pitt Sponsored Account (click to expand)</summary>

<h3 id="GP-HIPCheck-Requirements">GlobalProtect Health Check Requirements:</h3>

  - Disk Encryption must be enabled on your computer
  - Your computer must be one of the following operating systems:
      - Linux CentOS 8.x
      - Linux CentOS 7.x
      - Linux RHEL 8.x
      - Linux RHEL 9.x
      - Linux Ubuntu 20.x
      - Linux Ubuntu 22.x
      - Linux Ubuntu 16.04
      - Linux Ubuntu 18.04
      - Windows 10 Education
      - Windows 10 Enterprise
      - Windows 10 Pro
      - Windows 10 Home
      - Windows 11
      - Mac OS X 13.x
      - Mac OS X 14.x
      - Mac OS X 15.x

</details>

### Installing GlobalProtect
To install GlobalProtect, use your Pitt sponsored account to log into <a href="https://software.pitt.edu" target="_blank" rel="noopener noreferrer">Pitt Software Repository</a>. Search for GlobalProtect and open the section matching your OS to display download and installation instructions. GlobalProtect specific download instructions by OS are available:
  - <a href="https://docs.paloaltonetworks.com/globalprotect/6-0/globalprotect-app-user-guide/globalprotect-app-for-windows/download-and-install-the-globalprotect-app-for-windows#idf9d1968d-51fb-463b-8923-4c785cee5f18" target="_blank" rel="noopener noreferrer">Microsoft Windows</a>
  - <a href="https://docs.paloaltonetworks.com/globalprotect/6-0/globalprotect-app-user-guide/globalprotect-app-for-mac/download-and-install-the-globalprotect-app-for-mac" target="_blank" rel="noopener noreferrer">Apple macOS</a>
  - <a href="https://docs.paloaltonetworks.com/globalprotect/6-0/globalprotect-app-user-guide/globalprotect-app-for-linux/download-and-install-the-globalprotect-app-for-linux" target="_blank" rel="noopener noreferrer">Linux</a>


### Enabling and Testing GlobalProtect

 1. After installation, run GlobalProtect, enter `portal-palo.pitt.edu` as the portal endpoint and click connect:<br/>
<img src="imgs/globalprotect-step1.png" alt="Enter Endpoint" width="255" height="356"><br/><br/>
 2. Login with your Pitt username and password:<br/>
<img src="imgs/globalprotect-step2.png" alt="Enter Username and Password" width="255" height="356"><br/><br/>
 3. Enter the two-factor authentication method- depending on how you set up the two-factor authentication for your Pitt account, enter:<br/>
    1 -to push to Duo<br/>
    2 -to get a phone call<br/>
    3 -to get a text message<br/>
<img src="imgs/globalprotect-step3.png" alt="Choose 2FA Method" width="255" height="356"><br/><br/>

#### Testing GlobalProtect

To test GlobalProtect after it has been successfully installed and enabled, open a shell/terminal on your computer and try to make an ssh connection to `yourpittusername@login0.moonshot.pitt.edu`. If you see the login prompt, everything is working, however, you will not be able to log in if full accss hasn't yet been granted. You will be notified once access has been granted.  If the ssh connection hangs or times out GlobalProtect is not working and likely hasn't passed one of the Health Check requirements listed above.<br/><br/>
<img src="imgs/globalprotect-ssh.png" alt="Enter Endpoint" width="878" height="540">
