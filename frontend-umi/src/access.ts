import { MeQuery } from '@/generated/graphql';
export default function(initialState?: { me: MeQuery['me']}) {
    console.log('initialize access');
    if (!initialState) {
        return {
          forStudent: true,
          forTeacher: false
        };
    }

    const { me } = initialState;
   
    return {
      forStudent: me?.role?.name === 'Authenticated',
      forTeacher: me?.role?.name === 'Teacher',
    };
  }
  