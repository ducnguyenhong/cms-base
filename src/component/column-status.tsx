export const Status: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) {
    return <span className="text-red-400 font-medium whitespace-nowrap">• Inactive</span>;
  }
  return <span className="text-green-500 font-medium whitespace-nowrap">• Active</span>;
};
