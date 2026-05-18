# How PROQUEUE'S External Data & Riot API Calls Work
What constraints exist in Riot's Developer API?

## Match Endpoint

## Account Resolution

## Rate Limits
Unfortunately, I'm just a broke college student. Development keys are heavily rate limited. Match ingestion is designed to queue requests to avoid dozens of unnecessary responses.

## Known Limitations

## Parsing Observations
Round result timestamps are not directly aligned with kill event ordering and required normalization to sift through unlikely data.

## Retrievable Data
- Kills (who killed who, weapon, time location)
- Damage Events
- Assists (assist flags)
- Headshots, bodyshots, legshots
- Round start/end
- Team score per round
- Spike plant/defuse
- K/D/A
- ACS
- ADR
- ECON
- FK/FD
- Plant time
- Defuse time
- Planter identity
- Credits
- Weapon per round

## Missing Data
- Whose piece of util was it?