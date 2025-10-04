// Utils
export function addQueryParams(
    endpoint: string,
    params: { [key: string]: string },
): string {
    const url = new URL(endpoint, "http://dummybase");
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    if (!endpoint.startsWith("http")) {
        return url.pathname + url.search;
    }

    return url.toString();
}
