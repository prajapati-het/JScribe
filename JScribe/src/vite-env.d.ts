/// <reference types="vite/client" />

//user types
interface userInfoType {
    username: string;
    picture: string;
    email: string;
    savedCodes: Array<string>;
}

interface loginCredentialsType {
    userId: string;
    password: string 
}

interface signupCredentialsType {
    username: string
    email:string
    password?: string
}

interface codeType {
    fullCode?: CompilerSliceStateType["fullCode"];
    title: string;
    _id?: string;
  }