import { useQuery } from "react-query"
import api from "../api/api"


export const useFetchMyShortUrls = (token, onError) => {
    return useQuery("my-shortenurls",
         async () => {
            return await api.get(
                "/api/urls/myUrls",
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    },
          {
            select: (data) => {
                const sortedData = data.data.sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                );
                return sortedData;
            },
            onError: (error) => {
                if (onError) onError(error);
            },
            staleTime: 5000,
            retry: 1,
            enabled: !!token,
          }
        );
};

export const useFetchTotalClicks = (token) => {
    return useQuery(
        ["url-totalclick", token], // Include token in query key for better caching
         async () => {
            // Calculate date range for last 7 days
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 7);
            
            // Format dates as required by backend (ISO_LOCAL_DATE format: YYYY-MM-DD)
            const startDateStr = startDate.toISOString().split('T')[0];
            const endDateStr = endDate.toISOString().split('T')[0];
            
            const url = `/api/urls/totalClick?startDate=${startDateStr}&EndDate=${endDateStr}`;
            
            const response = await api.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            return response;
        },
          {
            select: (data) => {
                // Handle different response formats from backend
                if (!data || !data.data) {
                    return [];
                }
                
                let responseData = data.data;
                
                // Backend returns Map<LocalDate,Long> - convert to array format
                if (typeof responseData === 'object' && !Array.isArray(responseData)) {
                    const keys = Object.keys(responseData);
                    
                    const convertToArray = keys.map((dateKey) => ({
                        clickDate: dateKey, // dateKey is already in YYYY-MM-DD format
                        count: responseData[dateKey] || 0,
                    }));
                    return convertToArray;
                }
                
                // If backend returns an array directly
                if (Array.isArray(responseData)) {
                    return responseData;
                }
                
                return [];
            },
            onError: () => {
                // Error handling for total clicks
            },
            staleTime: 30000, // Increase stale time to 30 seconds
            cacheTime: 60000, // Cache for 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Prevent refetch on mount if data exists
            refetchInterval: false // Disable automatic refetch
          }
        );
};