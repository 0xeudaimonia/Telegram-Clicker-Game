export type Booster = {
  level: number;
  reward: number;
  cost: number;
};

const boosters: Booster[] = [
  { level: 1, reward: 10500, cost: 125000 },
  { level: 2, reward: 10700, cost: 129000 },
  { level: 3, reward: 10900, cost: 133000 },
  { level: 4, reward: 11100, cost: 137000 },
  { level: 5, reward: 11300, cost: 141000 },
  { level: 6, reward: 11500, cost: 145000 },
  { level: 7, reward: 11700, cost: 149000 },
  { level: 8, reward: 11900, cost: 153000 },
  { level: 9, reward: 12100, cost: 157000 },
  { level: 10, reward: 12300, cost: 161000 },
  { level: 11, reward: 12500, cost: 166000 },
  { level: 12, reward: 12800, cost: 171000 },
  { level: 13, reward: 13000, cost: 176000 },
  { level: 14, reward: 13300, cost: 181000 },
  { level: 15, reward: 13600, cost: 186000 },
  { level: 16, reward: 13900, cost: 192000 },
  { level: 17, reward: 14200, cost: 198000 },
  { level: 18, reward: 14500, cost: 204000 },
  { level: 19, reward: 14800, cost: 210000 },
  { level: 20, reward: 15100, cost: 216000 },
];

export const getBoosterReward = (level: number): number => {
  const booster = boosters.find((b) => b.level === level);
  return booster ? booster.reward : 0;
};

export const calculateSpeedIncrease = (baseReward: number, boosterLevel: number): number => {
  return baseReward * (1 + boosterLevel / 100);
};
