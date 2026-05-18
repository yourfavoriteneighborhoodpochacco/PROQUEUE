# How PROQUEUE'S External Data & API Calls Work
Why did I choose to use Henrik's API over Riot's API?

## Endpoint & Resolution
Soooo, I kinda found out that I was being severely rate limited by Riot Game's actual Riot Developmental API key and my code was just crashing and I was crashing out so I was kinda googling around and I found Henrik's Unofficial Riot API key and yeah that's what I went with. I don't know how feasonable this is in the long term, but I'm no longer crashing out on the code so it's actually wonderful.

## Rate Limits
Unfortunately, I'm just a broke college student. I'm limited to 30 requests per minute :sob:. But the match ingestion pipeline is designed to queue requests to avoid dozens of unnecessary responses.

## Parsing Observations
Unfortunately, round result timestamps are not directly aligned with kill event ordering and required normalization to sift through unlikely data. So I gotta do a little of this and a litle of that and parse through the JSON's so that humanoid humans like me can actually read English. Honestly even reading English is a little hard I might be an AI honestly.

## Retrievable Data
- KDA
- Headshots, bodyshots, legshots (imma get exposed if i put add this stat in)
- Round timestamps
- Team score per round
- ACS
- ADR
- ECON
- FK/FD

## Missing Data
- everything :sob:

## Notes
Guys, I promise that if I ever work at Riot, I'll advocate for better developer API permissions.
