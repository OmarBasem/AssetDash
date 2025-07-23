// src/types/asset.ts
export type Timeframe = 'm5' | 'm30' | 'h1' | 'h4' | 'h8' | 'h24';

export type Timeframed<T = number> = {
  m5: T;
  m30: T;
  h1: T;
  h4: T;
  h8: T;
  h24: T;
};

export interface Asset {
  /* ─────────── core ─────────── */
  token_address: string;
  token_symbol: string;
  token_icon: string | null;
  token_created: number;        // ms epoch
  total_supply: number;

  /* ────────── pricing ───────── */
  price_usd: number;
  market_cap_usd: number;
  price_change_percent: Timeframed<number>;
  volume_usd: Timeframed<number>;
  liquidity_usd: number;

  /* ───────── whale data ─────── */
  whale_buys_count: Timeframed<number>;
  whale_sells_count: Timeframed<number>;
  whale_net_flow_usd: Timeframed<number>;
  whale_net_supply_percent: Timeframed<number>;

  /* ───────── badges & flags ─── */
  is_new: boolean;
  is_pro: boolean;
  is_pump: boolean;
  is_bonk: boolean;
}
