export function beautify_name(name){
    // This function get a name and return it like this:
    // -> LAST NAME, FIRST NAME
    if(name){
        return `${name.split(' ').at(-1)}, ${name.split(' ')[0]}`;

    }
}
export function getHoursAndMinutes(date){
    let _date = new Date(date);
    return `${_date?.getHours()}:${_date?.getMinutes()}`;
}
export function capitalize(str){
    return `${str[0]?.toUpperCase()}${str?.slice(1)}`;
}