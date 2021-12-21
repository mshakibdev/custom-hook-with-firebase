import {useState, useCallback} from "react";
function useHttp(requestConfig, applyData) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (taskText) => {
			// !! set state
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(requestConfig.apiUrl, {
					method: requestConfig.method ? requestConfig.method : "GET",
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : {},
					headers: requestConfig.headers ? requestConfig.headers : null,
				});

				if (!response.ok) {
					throw new Error("Request failed!");
				}

				const data = await response.json();

				applyData(data);
			} catch (err) {
				setError(err.message || "Something went wrong!");
			}
			setIsLoading(false);
		},
		[requestConfig, applyData]
	);

	return {
		isLoading: isLoading,
		error: error,
		sendRequest: sendRequest,
	};
}

export default useHttp;
