import dayjs from 'dayjs';
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AnalyticsModal from './AnalyticsModal';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
      );

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const openAnalyticsModal = () => {
        setAnalyticsModalOpen(true);
    };

    const closeAnalyticsModal = () => {
        setAnalyticsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-bitly-lightBlue/30">
                <div className="p-6">
                    {/* Header with URL info */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-2 h-2 bg-bitly-lightBlue rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <h3 className="text-gray-900 font-medium mb-2 break-all">
                                        {originalUrl}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            to={`/s/${shortUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-bitly-lightBlue font-medium hover:text-blue-600 transition-colors flex items-center gap-1"
                                        >
                                            {`${subDomain}/s/${shortUrl}`}
                                            <FaExternalLinkAlt className="text-xs" />
                                        </Link>
                                        <CopyToClipboard 
                                            text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
                                            onCopy={handleCopy}
                                        >
                                            <button className="p-1.5 text-gray-400 hover:text-bitly-lightBlue transition-colors rounded">
                                                {isCopied ? <LiaCheckSolid className="text-green-500" /> : <IoCopy />}
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Stats */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <MdOutlineAdsClick className="text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{clickCount}</div>
                                        <div className="text-xs text-gray-500">{clickCount === 1 ? 'click' : 'clicks'}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <FaRegCalendarAlt className="text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {dayjs(createdDate).format('MMM DD')}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {dayjs(createdDate).format('YYYY')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={openAnalyticsModal}
                                    className="flex items-center gap-2 px-4 py-2 bg-bitly-lightBlue text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                                >
                                    <MdAnalytics />
                                    Analytics
                                </button>

                                <CopyToClipboard 
                                    text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
                                    onCopy={handleCopy}
                                >
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium">
                                        {isCopied ? <LiaCheckSolid /> : <IoCopy />}
                                        {isCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Modal */}
            <AnalyticsModal
                open={analyticsModalOpen}
                onClose={closeAnalyticsModal}
                shortUrl={shortUrl}
                createdDate={createdDate}
            />
        </>
    );
};

export default ShortenItem;