import React from 'react'
import axios from '../utils/axios';
import api from '../utils/api';
import { useUser } from '../contexts/user'
import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';

export default function Github({ user }) {
    const { initUser } = useUser();
    const router = useRouter();

    React.useEffect(() => {
        const init = () => {
            const { payload, token, refreshToken } = user;
            initUser(payload, {
                access_token: token,
                refresh_token: refreshToken
              })
              router.push('/');
        }

        init();
    }, [])


    return (
        <div>
            Github 
            <p> lOADING.... </p>
    </div>
    )

}



Github.getInitialProps = async (ctx) => {
    const { access_token } = ctx.query || {};
    const res = await fetch(`${api.auth}/signIn`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: access_token,
        })
    })

    const  data = await res.json();
  
   return {
       user: data,
   }
}