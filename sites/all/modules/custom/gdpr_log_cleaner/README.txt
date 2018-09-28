GDPR log cleaner
===============

The goal of this module is to help protect the privacy of the users
as outlined in the EU GDPR legislation ("the right to be forgotten").

It has two main functions:

1: It lets admin users delete all data related to a specific user from the various logging tables.
Currently supporting: dblog, login_history

2: It lets admin users define a time interval (default 6 months) to keep log data.
It does so by adjusting the dblogs module default "keep n messages" setting to "Keep all" at cron run. 
It does so in a kind of crude way disregarding the settings of the dblog module. @todo this should
be improved by at providing a warning on the dblogs settings page.