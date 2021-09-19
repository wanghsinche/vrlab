import { MeQuery } from '@/generated/graphql';
export default function(initialState?: { me: MeQuery['me']}) {
    if (!initialState) {
        return {};
    }

    const { me } = initialState;
   
    return {
      forStudent: me?.role?.name === 'Authenticated',
      forTeacher: me?.role?.name === 'Teacher',
    };
  }
  