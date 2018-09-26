GDPR log cleaner
===============

The goal of this module is to help protect the privacy of the users
as outlined in the EU GDPR legislation.

It has two main functions:

1: It lets admin users delete all data related to a specific user from the dblogs watchdog table

2: It lets admin users define a time interval (default 6 months) to keep dblog data.
It does so by adjusting the dblogs module default "keep n messages" setting to "Keep all" at cron run. 
It does so in a totally crude way disregarding the settings of the dblog module. @todo this should
be improved by at providing a warning on the dblogs settings page.