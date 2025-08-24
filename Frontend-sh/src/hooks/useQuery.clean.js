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
    return useQuery({
        queryKey: ["total-clicks", token],
        queryFn: async () => {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 6);
            
            const endDateStr = endDate.toISOString().split('T')[0];
            const startDateStr = startDate.toISOString().split('T')[0];
            
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
        select: (data) => {
            try {
                if (!data || !data.data) {
                    return [];
                }

                const responseData = data.data;

                if (Array.isArray(responseData)) {
                    return responseData;
                } else if (typeof responseData === 'object' && responseData !== null) {
                    const keys = Object.keys(responseData);
                    if (keys.length > 0) {
                        const convertToArray = keys.map(key => ({
                            clickDate: key,
                            count: responseData[key] || 0,
                            clicks: responseData[key] || 0
                        }));
                        return convertToArray;
                    }
                }

                return [];
            } catch {
                return [];
            }
        },
        staleTime: 5000,
        retry: 1,
        enabled: !!token,
    });
};
