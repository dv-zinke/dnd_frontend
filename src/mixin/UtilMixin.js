export default {
    methods: {
        getUserName(userId, users) {
            if (typeof userId === 'undefined' || users === null) {
                return userId;
            }

            const foundUser = users.find(it => it.id === userId);
            if (typeof foundUser === 'undefined') return userId;
            return `${foundUser.nickname}`;
        },
        getLevelName(level) {
            const text = "자취 Lv. ";
            if(typeof  level === 'undefined' || level === null) return text + "1";

            return text + level;
        },
    }
}
