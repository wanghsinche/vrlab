import { IME } from '@/utils/schema';
export default function(initialState?: { me: IME}) {
    if (!initialState) {
        return {};
    }

    const { me } = initialState;
   
    return {
      forStudent: me.role.name === 'Authenticated',
    };
  }
  