# How I Designed PROQUEUE's Impact Score Model

## Design Philosophy
PROQUEUE prioritizes contextual contribution over raw combat statistics. 

## Role Definition
Each role has their own strengths, and all players shouldn't be grouped in the same category without the context of their contribution towards a win or loss in a game. A duelist main with a higher K/D ratio may be seen as "better" compared to an IGL controller who made round-winning calls.

## Event Weighting
There are several events and statistics in VALORANT and other FPS games that determine how impactful a player is. But how am I going to do measure impact? Easy. Impact Scores (IS). Using Riot Game's VALORANT Developer API Portal, I will fetch player data, specifically timestamps where players got a kill, assist, or death. The time between kills will determine whether a player was traded out by a teammate, and the KAST by the role filtered by normalization tactics will determine their overall IS. 

## Duelist Impact Score
Duelist IS depends on the following components:
- FK/FD Ratio
- TK/FK Ratio
- Trade conversion
- Space Creation (defined by time-to-plant while duelist is alive)
- K/RD Ratio
- ACS
- KAST

## Initiator Impact Score
Initiator IS depends on the following components:
- AST/D Ratio
- AST/UTIL_USED Ratio
- KAST

## Controller Impact Score
Controller IS depends on the following components:
- AST/D Ratio
- AST/UTIL_USED Ratio
- UTIL_USED-PLANT Delta
- DEFUSE-UTIL_USED Delta
- KAST

## Sentinel Impact Score
Sentinel IS depends on the following components:
- AST/UTIL_USED Ratio
- UTIL_USED-PLANT Delta
- START-PLANT Delta
- AST/D Ratio
- KAST

## Normalization

## Limitations

## Future Improvements