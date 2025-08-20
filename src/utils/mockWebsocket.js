export function simulateWebSocket(updateFn, interval = 1500) {
    return setInterval(() => {
      const randomId = Math.floor(Math.random() * 5) + 1;
      const changes = {
        price: +(Math.random() * 50000).toFixed(2),
        change1h: +(Math.random() * 10 - 5).toFixed(2),
        change24h: +(Math.random() * 10 - 5).toFixed(2),
        volume24h: `${Math.floor(Math.random() * 30)}B`,
      };
      updateFn(randomId, changes);
    }, interval);
  }
  