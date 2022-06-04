import React, { FC, useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { withRouter, IRouteComponentProps } from 'umi';
import { jsonRequest } from '@/utils/request';
import token from '@/utils/token';
import { afterLogin } from './util';
import { REST_AUTHGDIP } from '@/utils/restschema';
import { useMutation } from '@apollo/client';
export const GDIPCAS = withRouter<any, any>(({ location }: IRouteComponentProps<{}, { 'raw[ticket]': string }>) => {
    const [login, { data, loading, error }] = useMutation(REST_AUTHGDIP);

    
    useEffect(() => {
        const tk = location.query['raw[ticket]'];
        // const others = new URLSearchParams(location.hash.replace('#', ''));
        // http://zhxygateway.gzzhyc.cn:1337/connect/gdipCAS/callback
        // auth/gdipCAS/callback?access_token=xxx
        console.log(tk);
        login({
            variables:{
                tk
            }
        }).then((res)=>{
            const data = res.data;
            console.log(JSON.stringify(data));
            afterLogin(data?.authuser.jwt, data?.authuser.user?.realname ||data?.authuser.user?.email)
        })
    }, []);

    return <Spin spinning={loading}>
        {loading ? 'GDIP CAS verifying' : data ? 'Autheticated' : 'Failed'}
    </Spin>;
})