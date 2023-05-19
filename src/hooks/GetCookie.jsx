import Cookie from 'js-cookie';

const GetCookie = (name)=>{
    return Cookie.get(name);
}

export default GetCookie;