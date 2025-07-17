function shortestWord(str) {
    let strArr = str.split(' ')
    let a = Infinity
    console.log(strArr);

    for(let i = 0; i < strArr.length ; i++) {
            if (strArr[i].length < a){
                a = strArr[i].length
            }        
    }
    return a  
}