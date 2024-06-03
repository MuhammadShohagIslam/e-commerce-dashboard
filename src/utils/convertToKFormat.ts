export const convertToKFormat = (num: number)=> {
    if (num >= 1000) {
        return num / 1000 ;
    } else {
        return num;
    }
};
