# How I Designed the Trade Detection Layer

## Problem
The Riot Developer API does not explicitly identify trade kills. Trades must be inferred from event timing and kill relationships.

## Trade Definition

## Detection Algorithm
Let's put this into perspective. Team 1 has players A and B. Team 2 has players C and D. Player A kills player C. Then Player D kills player A. This difference in time between event 1 and event 2 is the time delta. If this time delta is less than 2.00 seconds, then it is considered a trade.

## Window Selection
A two second threshold was selected because it approximates realistic FPS engagement response windows while avoiding unrelated late-round eliminations.

## Edge Cases

## Determinism

## Testing Strategy