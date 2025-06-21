import React from 'react';
import RecentRides from "@/components/RecentRides";
interface Ride {
  id: number;
  from: string;
  to: string;
  date: string;
  fare: string;
  status: string;
}
interface HistoryTabProps {
  rides: Ride[];
}
const HistoryTab: React.FC<HistoryTabProps> = ({
  rides
}) => {
  return <div className="space-y-6">
      <h1 className="text-3xl font-bold text-zinc-950">Ride History</h1>
      <RecentRides rides={rides} showHeader={false} />
    </div>;
};
export default HistoryTab;