export class Auth {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static setTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', this.accessTokenKey);
        localStorage.setItem('refreshToken', this.refreshTokenKey);
    }
}