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
                }
            }
        }
        this.removeTokens();
        location.href = '#/login';
        return false;
    }

    static setTokens(accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
    static removeTokens() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
}