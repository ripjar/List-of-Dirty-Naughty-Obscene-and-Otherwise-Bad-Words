#!/bin/bash

curl http://download.openwall.net/pub/wordlists/languages/English/1-tiny/lower.gz | gunzip > en
curl http://download.openwall.net/pub/wordlists/languages/German/1-small/lower.gz | gunzip > de
curl http://download.openwall.net/pub/wordlists/languages/Italian/1-small/lower.gz | gunzip > it

# place names in england and scotland lets hope wikipedia doesn't change the
# formatting of their source code.
curl "https://en.wikipedia.org/wiki/List_of_towns_in_England" | grep "<td><a href=\"/wiki/" | cut -d '>' -f3 | cut -d'<' -f1 | tr '[:upper:]' '[:lower:]' >> en
curl "https://en.wikipedia.org/wiki/List_of_burghs_in_Scotland" |  grep "<td><a href=\"/wiki/" | cut -d '>' -f3 | cut -d'<' -f1 | tr '[:upper:]' '[:lower:]' >> en
