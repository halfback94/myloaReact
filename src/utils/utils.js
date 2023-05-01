module.exports = {
    regx_AlpNum: /^[a-z|A-Z|0-9]*$/,
    regx_Kor: /^[ㄱ-ㅎ|가-힣]*$/,
    regx_KorNum: /^[ㄱ-ㅎ|가-힣|0-9]*$/,
    regx_KorAlpNum: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,

    isValidKey: (Map, key) => {
        let ret = false;
        const keys = Object.keys(Map);
    
        for(let idx = 0; idx < keys.length; idx++) {
            if(key === keys[idx]) {
                ret = true;
                break;
            }
        }
    
        return ret;
    },

    isEmpty: (obj) => {
        return (typeof obj == "undefined" || obj == null || obj == "" || Object.keys(obj).length === 0);
    },

    isStringEmpty: (str) => {
        return (!str || str.length === 0 || str == 'null');
    },

    moneyFormat: (number) => {
        if(number)
            return new Intl.NumberFormat('ko-KR').format(number);
        
        return 0;
    },

    dateFormat: (date) => {
        return new Date(date).toLocaleString();
    },

    getTodayResetTime: () => {
        const now = new Date();
        if(now.getHours > 6) return new Date( now.getFullYear(), now.getMonth(), now.getDay() , 6 );

        return new Date( now.getFullYear(), now.getMonth(), now.getDay()-1 , 6 );
    },

    getApiServer: () => {
        return 'https://myloa.co.kr:2087';
        //return '';
    },

    readLocalStorage: (keyName) => {
        const value = localStorage.getItem(keyName);
        if( value && value.length > 0) {
            return value;
        }

        return "";
    },

    writeLocalStorage: (keyName, value) => {
        if(keyName && keyName.length > 0 && value)
            localStorage.setItem(keyName, value);
    },
};