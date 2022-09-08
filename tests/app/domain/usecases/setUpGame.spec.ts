import { useSetUpGame } from '../../../../src/app/domain/usecases/setUpGame';

it('should be return a link for the opponent player', () => {
    const gameId = 'id-game-123'
    const baseUrl = 'http://localhost:3000'
    const setUpGame = useSetUpGame();
    expect(setUpGame.getJoinGameLink(baseUrl, gameId)).toBe(`http://localhost:3000/games/${gameId}/join`);
});

