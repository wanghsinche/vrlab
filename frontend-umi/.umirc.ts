import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/sign', component: '@/pages/sign',
      // Do not show top bar
      headerRender: false,
      // Do not show footer
      footerRender: false,
      // Do not show the menu
      menuRender: false,
      // Do not show the menu top bar
      menuHeaderRender: false,
    },
    { path: '/course', component: '@/pages/course', name: 'Course', icon: 'ExperimentTwoTone', 
      access: 'forStudent',
    },
    {path: '/course/:id', component: '@/pages/course/detail', access: 'forStudent',}
  ],
  fastRefresh: {},
  layout:{
    //Support anything that does not require dom
    // https://procomponents.ant.design/components/layout#prolayout
    title: 'VR LAB',
    // navTheme: 'light',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEL0lEQVRoge1XXWwUVRT+zsz+lNoWjJEXdyHdFpuaGBK0RUXaxNAusDzwAAW2qVG6mAaCbH3xBY0EX4xKVsuDaKsP2lZqNPzYNBYSaVOIXX6MVdFEWWNmjTH1pS3SzuzOHh+2u126Mzuz2HW3yX7JJHPP+e75zsm5d+5coIgiiljWoFwEFU/fZj2fuqdsSTWFpQyWD+SkAwDQ5PWldeFCX/eS6xU7sBiZ1n8CS7kPln0HigXkG5Z8iGp8oRQA33GMj138tGcwm1iF0gEbgDoS6Mvmfe07s5mY1wJCj3gwsuMNhGo9SRsL1LvF2368ua1jtZkYeS1AqmyEKtoRdjUsGBmlBDoaU6O/Nrf6dhnFyGsBztAIxKgCx62RNB8B5cwYMCoiLwfZM2f9uj4Cvx4D7SagZt4ybYlEq4c++2hSi18om1gBEATgGe7recUO65MApLiLK6JW8bDexIL9lWjytu8GaGB++O2Fvu4NWrxC6UAaLDT3VeKdgWpdnlGgQFC+DOCpNAfzmH9jyeZ7TdAIQ729001eH4D4htbjGXeAOaZlJoLhUvk/YNgB/8aSzYGgnJbskfqSBi1+Yn0XLzQmsewLyNnfaC6WixaWfQcKtoBtra0VZngFW4AaW/H4woim9XiGBZy4qtRr2QNBpe5eEjMLFuillNEtPZ7hJibmgzoSBwE8n3VmAKwD/zzGzB8zUJvUAX4iorZIy33Xm70HjjLzwi2H6LxufpmETo7zA1FSwgBKNNyyYLE5X9xAmr+5ujg7WS7OrbgJwLHYJcQik5uGX71hlWfdKeapCAvVl/rf/1srXMYOqFDaoZ08ANhjqvwcgDdTjVoncCp++fEqpKr4Ie66OQhnaBRSVQNCtR7EBOuDv69zu6t/OJOgMwP79ZIHMuwBZiYm+ABgq/8tHKh/Nvm4O9+eJ1HHa8ymPwQzq5wIu55Ojp2/jUBUZThCo0mb5GrAzConAEwxsOtiX/cXmWLqigeC8nYA6yr+mITjm+/v8q25MoGV0l8A4Lr/mrzVTPJMAn5e3wKmBUnJ1QjVYkO4qvEu3kT9/j+nS1fXGCUPZNgDgXF5EITtT7zbj0c/GUrzT7R5MH54D4gweKTOvsNISDh9u5OAE0a8BJjgj7WUvWMYV8t48sbsWhDcFlnBw+fHNCfWnBuFqETAjG1d47OVGVX67zgJOGYm8QSIcRyf30nb6IuhWUA0IhwCIK69dB32qRnNifapGVR+fQ0AhKggdGQSEUW1CxkuJTooF6NqlxFJ+ytE2AsASlkpVJsVohJJo0TtNsytLIvTGfsAvAwAW/a2e4joFAgPJclnOrPMPYmd8PokInphuPeD9HWsWwDity1p03p8ONZjRkhNvJBA7wEpyf93OJj5FIA1Wk7NJcTx0zdsUkAi4kOpgtnlZwrOHMQsoogiCgH/AgrXUzI3DT6rAAAAAElFTkSuQmCC'
  },
  theme: {
    'layout-header-background': '#24292f',
    'layout-footer-background': '#fff',
  }
});
