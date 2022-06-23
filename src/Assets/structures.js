import {beautify_name} from './utils.js';

export function User(obj){
    this.uid=obj.user.uid;
    this.name=obj.user.displayName;
    this.email=obj.user.email;
    this.beautifulName=beautify_name(obj.user.displayName);
    this.photoUrl= obj.user.photoURL;
    this.createdAt=(new Date(parseInt(obj.user.reloadUserInfo.createdAt))).toString();
    this.phoneNumber=obj.user.phoneNumber;
}