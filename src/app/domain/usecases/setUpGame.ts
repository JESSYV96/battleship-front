export function useSetUpGame() {
    const getJoinGameLink = (baseUrl: string, uuid: string): string => {
        const url: URL = new URL(`/games/${uuid}/join`, baseUrl)
        return url.href
    }
    return {
        getJoinGameLink
    }
}