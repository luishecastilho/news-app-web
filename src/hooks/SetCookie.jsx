import Cookie from 'js-cookie';

const SetCookie = (name, value)=>{
    Cookie.set(name,value, {
        expires:1,
        secure: true,
        sameSite: 'strict',
        path: '/'
    });
}

export default SetCookie;