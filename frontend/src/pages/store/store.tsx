import { atom } from "recoil";

export const user_rollnumber = atom({
    key : 'rollNo',
    default : ''
})

export const is_authenticated = atom({
    key : 'is_authenticated',
    default : false
})


export const generate_message = atom({
    key : 'generate_message',
    default : false
})

export const message_status = atom({
    key : 'message_status',
    default : true
})

export const message = atom({
    key : 'message',
    default : ''
})


export const emai_sent = atom({
    key : 'email_sent',
    default : false
})

export const spaces = atom({
    key : 'spaces',
    default : []
})


//signup store


export const signupUsername = atom({
    key : 'signupUsername',
    default : ''
})

export const signupEmail = atom({
    key : 'signupEmail',
    default : ''
})

export const signupPassword = atom({
    key : 'signupPassword',
    default : ''
})
