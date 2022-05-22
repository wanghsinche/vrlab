import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import React from 'react';
import token from '@/utils/token';
import { client } from './utils/graphql';
import { getGlobal, ME } from './utils/schema';
import { GetGlobalQuery, MeQuery } from '@/generated/graphql';
import { history } from 'umi';
import { Tag, Space } from 'antd';
import Footer from '@/components/footer';
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings, me?: MeQuery['me'], global?: GetGlobalQuery['global'] };
}): BasicLayoutProps => {
  return {
    title: initialState?.global?.siteName || 'VR Lab',
    onPageChange: () => {
    },
    rightContentRender: ()=>{
      const isTeacher = initialState?.me?.role?.name === 'Teacher';
      return React.createElement(Space, null, [
        React.createElement(Tag, {
          color: isTeacher?'green':'blue'
        }, [isTeacher? '教师版':'学生版']),
        React.createElement('a', {
          onClick: ()=>{
            token.clear();
            location.reload();
          }
        }, ['登出'])
      ]);
    },
    footerRender: ()=>{
      return React.createElement(Footer);
    },
    ...initialState?.settings,
  };
};

// src/app.ts
export async function getInitialState() {
  const { data: globalData} = await client.query<GetGlobalQuery>({query: getGlobal});
  try {
    const {data} = await client.query<MeQuery>({query: ME});
    if (!data.me) {
      throw('No info');
    }
    return {...data, ...globalData};    
  } catch (error) {
    history.push('/sign');
  }
  return {...globalData};

}
