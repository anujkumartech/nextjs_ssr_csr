export interface StockDataPoint {
    date: string;
    price: number;
    volume: number;
    high: number;
    low: number;
  }
  
  export const generateStockData = (): StockDataPoint[] => {
    const data: StockDataPoint[] = [];
    let basePrice = 150; // Starting price
    
    for (let i = 0; i < 100; i++) {
      // Simulate daily price changes with some randomness
      const priceChange = (Math.random() - 0.5) * 5;
      basePrice += priceChange;
      
      // Calculate high and low with some variation around the base price
      const high = basePrice + Math.random() * 3;
      const low = basePrice - Math.random() * 3;
      
      // Generate date for last 100 days
      const date = new Date();
      date.setDate(date.getDate() - (100 - i));
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Number(basePrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000,
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2))
      });
    }
    
    return data;
  };