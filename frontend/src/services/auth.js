import config from "../../config/config.js";

export class Auth {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';

    static async processUnauthorizedResponse() {
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.host + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })

            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    this.setTokens(result.accessTokenKey, result.refreshToken);
                    return true;
                } else {
                    throw new Error(result.message);
                }
            }
        }
        return false;
    }

    static setTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', this.accessTokenKey);
        localStorage.setItem('refreshToken', this.refreshTokenKey);
    }
    static removeTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', this.accessTokenKey);
        localStorage.setItem('refreshToken', this.refreshTokenKey);
    }
}