import React, { useState, useEffect } from 'react';
import HistoryTable from '../components/HistoryTable.js';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const take = 10;

  useEffect(() => {
    fetchHistory();
  }, []);



  const fetchHistory = async (reset = false, customSkip = null) => {
    try {
      const currentSkip = customSkip !== null ? customSkip : (reset ? 0 : skip);
      console.log(`Fetching history with skip=${currentSkip} and take=${take}`);
      const response = await fetch(`http://localhost:3000/api/history?skip=${currentSkip}&take=${take}`);
      const data = await response.json();
      if (reset) {
        setHistory(data);
      } else {
        setHistory(prev => [...prev, ...data]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  const loadMore = () => {
    const newSkip = skip + take;
    setSkip(newSkip);
    fetchHistory(false, newSkip);
  };

  return (
    <div>
      <h1>Import History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HistoryTable history={history} loadMore={loadMore} />
      )}
    </div>
  );
}
