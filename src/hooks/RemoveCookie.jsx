import Cookie from 'js-cookie';

const RemoveCookie = (name)=>{
    Cookie.remove(name);
}

export default RemoveCookie;