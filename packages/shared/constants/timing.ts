// Trade window: if a kill occurs within this window after a teammate death,
// it is classified as a trade. 3s chosen based on typical FPS reaction time 
export const TRADE_WINDOW_MS = 3000;

export const ROUND_PHASE_THRESHOLDS = {
    BUY_PHASE_DURATION_MS: 30_000,
    POST_PLANT_WINDOW_MS: 45_000,
} as const;