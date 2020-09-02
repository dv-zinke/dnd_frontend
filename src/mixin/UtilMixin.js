export default {
    methods: {
        getUserName(userId, users) {
            if (typeof userId === 'undefined' || users === null) {
                return userId;
            }

            const foundUser = userId.find(it => it.id === userId);
            if (typeof foundUser === 'undefined') return userId;
            return `${foundUser.nickname}`;
        }
    }
}
