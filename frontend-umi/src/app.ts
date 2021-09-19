import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import React from 'react';
import token from '@/utils/token';
import { client } from './utils/graphql';
import { ME } from './utils/schema';
import { MeQuery } from '@/generated/graphql';
import { history } from 'umi';
import Footer from '@/components/footer';
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings, me?: MeQuery['me'] };
}): BasicLayoutProps => {
  return {
    onPageChange: () => {
      console.log(initialState?.me);
    },
    rightContentRender: ()=>{
        return React.createElement('a', {
            onClick: ()=>{
              token.clear();
              location.reload();
            }
        }, ['logout']);
    },
    footerRender: ()=>{
      return React.createElement(Footer);
    },
    ...initialState?.settings,
  };
};

// src/app.ts
export async function getInitialState() {
  try {
    const {data} = await client.query({query: ME});
    return data;    
  } catch (error) {
    history.push('/sign');
  }
  return null;

}
