import { useState } from 'react'
import Graph from './Graph'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import { FaLink, FaChartLine, FaPlus, FaExternalLinkAlt } from 'react-icons/fa'
import ShortenUrlList from './ShortenUrlList'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const DashboardLayout = () => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [shortenPopUp, setShortenPopUp] = useState(false);

    const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)
    
    const {isLoading: loader, data: totalClicks} = useFetchTotalClicks(token)

    function onError() {
      navigate("/error");
    }

    // Calculate stats
    const totalLinks = myShortenUrls?.length || 0;
    const totalClicksCount = totalClicks?.reduce((sum, item) => sum + item.clicks, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {loader ? ( 
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        ): ( 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Manage your shortened links and track their performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-bitly border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Links</p>
                            <p className="text-3xl font-bold text-gray-900">{totalLinks}</p>
                        </div>
                        <div className="p-3 bg-bitly-lightBlue/10 rounded-lg">
                            <FaLink className="h-6 w-6 text-bitly-lightBlue" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-bitly border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                            <p className="text-3xl font-bold text-gray-900">{totalClicksCount}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FaChartLine className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-bitly border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Clicks/Link</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {totalLinks > 0 ? Math.round(totalClicksCount / totalLinks) : 0}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <FaExternalLinkAlt className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Chart */}
            <div className="bg-white rounded-xl shadow-bitly border border-gray-100 mb-8">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">7-Day Analytics Overview</h2>
                    <p className="text-gray-600 text-sm">Track your link performance over the past week</p>
                </div>
                <div className="p-6">
                    <div className="h-80 relative">
                        {(totalClicks && totalClicks.length === 0) && (
                             <div className="absolute flex flex-col justify-center items-center w-full h-full">
                                <div className="text-center">
                                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <FaChartLine className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                      No Data Available
                                    </h3>
                                    <p className="text-gray-600 max-w-sm">
                                      Share your short links to start tracking clicks and engagement data
                                    </p>
                                </div>
                             </div>
                        )}
                        <Graph graphData={totalClicks || []} title="Dashboard" />
                    </div>
                </div>
            </div>

            {/* Create Link Button */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">My Links</h2>
                    <p className="text-gray-600 text-sm">Manage and track all your shortened URLs</p>
                </div>
                <button
                    className='bg-bitly-lightBlue hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center gap-2'
                    onClick={() => setShortenPopUp(true)}>
                    <FaPlus className="h-4 w-4" />
                    Create Short Link
                </button>
            </div>

            {/* Links List */}
            <div className="bg-white rounded-xl shadow-bitly border border-gray-100">
              {!isLoading && myShortenUrls && myShortenUrls.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <FaLink className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No links created yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get started by creating your first short link
                    </p>
                    <button
                        className='bg-bitly-lightBlue hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto'
                        onClick={() => setShortenPopUp(true)}>
                        <FaPlus className="h-4 w-4" />
                        Create Your First Link
                    </button>
                </div>
              ) : (
                  <div className="p-6">
                      <ShortenUrlList data={myShortenUrls || []} />
                  </div>
              )}
            </div>
        </div>
        )}

        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        />
    </div>
  )
}

export default DashboardLayout