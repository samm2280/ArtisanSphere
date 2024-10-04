
import { firestore } from './firebase';

const getMonthlyUserCount = async () => {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);

  const snapshot = await firestore.collection('visits')
    .where('timestamp', '>', lastMonth.toISOString())
    .get();

  const userIds = new Set();
  snapshot.forEach(doc => {
    const data = doc.data();
    userIds.add(data.userId);
  });

  return userIds.size;
};

// Usage
getMonthlyUserCount().then(count => console.log('Unique users in the past month:', count));
