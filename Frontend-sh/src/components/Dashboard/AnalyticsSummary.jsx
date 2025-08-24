import { MdTrendingUp, MdTrendingDown, MdOutlineAdsClick, MdDateRange } from 'react-icons/md';
import PropTypes from 'prop-types';

const AnalyticsSummary = ({ analyticsData, shortUrl }) => {
  if (!analyticsData || !Array.isArray(analyticsData) || analyticsData.length === 0) {
    return null;
  }

  // Calculate analytics metrics with better error handling
  const totalClicks = analyticsData.reduce((sum, item) => {
    const count = Number(item?.count) || 0;
    return sum + count;
  }, 0);
  
  const averageClicksPerDay = analyticsData.length > 0 ? totalClicks / analyticsData.length : 0;
  const clickCounts = analyticsData.map(item => Number(item?.count) || 0);
  const maxClicks = clickCounts.length > 0 ? Math.max(...clickCounts) : 0;
  
  // Find best performing day
  const bestDay = analyticsData.find(item => item.count === maxClicks);
  
  // Calculate trend (last 7 days vs previous 7 days if enough data)
  let trend = 0;
  if (analyticsData.length >= 14) {
    const recentWeek = analyticsData.slice(-7).reduce((sum, item) => sum + (item.count || 0), 0);
    const previousWeek = analyticsData.slice(-14, -7).reduce((sum, item) => sum + (item.count || 0), 0);
    trend = previousWeek > 0 ? ((recentWeek - previousWeek) / previousWeek) * 100 : 0;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <MdOutlineAdsClick className="text-blue-500" />
        Analytics Summary for: {shortUrl}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Clicks */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Clicks</p>
              <p className="text-xl font-bold text-blue-600">{totalClicks}</p>
            </div>
            <MdOutlineAdsClick className="text-blue-500 text-2xl" />
          </div>
        </div>

        {/* Average per Day */}
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Avg/Day</p>
              <p className="text-xl font-bold text-green-600">{averageClicksPerDay.toFixed(1)}</p>
            </div>
            <MdDateRange className="text-green-500 text-2xl" />
          </div>
        </div>

        {/* Best Day */}
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Best Day</p>
              <p className="text-lg font-bold text-purple-600">{maxClicks}</p>
              {bestDay && (
                <p className="text-xs text-gray-500">
                  {new Date(bestDay.clickDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <MdTrendingUp className="text-purple-500 text-2xl" />
          </div>
        </div>

        {/* Trend */}
        {analyticsData.length >= 14 && (
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">7-Day Trend</p>
                <p className={`text-lg font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
                </p>
              </div>
              {trend >= 0 ? (
                <MdTrendingUp className="text-green-500 text-2xl" />
              ) : (
                <MdTrendingDown className="text-red-500 text-2xl" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AnalyticsSummary.propTypes = {
  analyticsData: PropTypes.array,
  shortUrl: PropTypes.string
};

export default AnalyticsSummary;
