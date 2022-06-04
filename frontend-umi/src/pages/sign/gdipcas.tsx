import React, { FC, useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { withRouter, IRouteComponentProps } from 'umi';
import { jsonRequest } from '@/utils/request';
import token from '@/utils/token';
import { afterLogin } from './util';
export const GDIPCAS = withRouter<any, any>(({ location }: IRouteComponentProps<{}, { 'raw[ticket]': string }>) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const tk = location.query['raw[ticket]'];
        // const others = new URLSearchParams(location.hash.replace('#', ''));
        // http://zhxygateway.gzzhyc.cn:1337/connect/gdipCAS/callback
        // auth/gdipCAS/callback?access_token=xxx
        console.log(tk);
        jsonRequest(`/auth/gdipCAS/callback?access_token=${tk}`).then(data => {
            console.log(data);
            afterLogin(data?.jwt, data?.user?.email)
        }).finally(() => {
            setLoading(false);
        })

    }, []);

    return <Spin spinning={loading}>
        {loading ? 'GDIP CAS verifying' : token.val ? 'Autheticated' : 'Failed'}
    </Spin>;
})