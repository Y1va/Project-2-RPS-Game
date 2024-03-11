async function recordMatch(userId, gamesPlayed, wins, losses) {
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, gamesPlayed, wins, losses })
      });
  
      if (!response.ok) {
        throw new Error('Failed to record match');
      }
  
      const matchData = await response.json();
      console.log('Match recorded:', matchData);
      
    } catch (error) {
      console.error('Error recording match:', error.message);
    }
  }
  