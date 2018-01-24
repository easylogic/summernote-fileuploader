const KBYTE = 1024;
const MBYTE = 1024 * 1024; 
const GBYTE = 1024 * 1024 * 1024;

export default {
    round (num, fixed) {
        const fixedNumber = Math.pow(10, fixed);
        return Math.floor(num * fixedNumber)/fixedNumber;
    },
    filesize (size, fixed = 0) {

        if (size >= GBYTE) {
            return this.round(size/GBYTE, fixed) + " GB"
        } else if (size >= MBYTE) {
            return this.round(size/MBYTE, fixed) + " MB"
        } else if (size >= KBYTE) {
            return this.round(size/KBYTE, fixed) + " KB"
        } else {
            return size + " B"
        } 
    },
    filetype (type) {
        if (type.includes('image')) {
            return 'I';
        } else if (type.includes('text')) {
            return 'T';
        } else if (type.includes('application')) {
            return 'A';
        } 

        return "E";
    }
}