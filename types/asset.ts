export type Timeframed<T = number> = {
  m5: T;
  m30: T;
  h1: T;
  h4: T;
  h8: T;
  h24: T;
};

export interface Asset {
  token_address: string;
  token_symbol: string;
  token_icon: string;
  token_created: number;
  total_supply: number;
  price_usd: number;
  market_cap_usd: number;
  price_change_percent: Timeframed<number>;
  volume_usd: Timeframed<number>;
  liquidity_usd: number;
  whale_buys_count: Timeframed<number>;
  whale_sells_count: Timeframed<number>;
  whale_net_flow_usd: Timeframed<number>;
  whale_net_supply_percent: Timeframed<number>;
  is_new: boolean;
  is_pro: boolean;
  is_pump: boolean;
  is_bonk: boolean;
}
