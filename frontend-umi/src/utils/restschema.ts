import { gql } from './graphql';

export const REST_PROFILE = gql`
query profile($id:ID!){
    user(id: $id)
    @rest(type: "user", path: "/users/{args.id}") {
    realid, realname,class{
      name, id
    }, email, username, role {
      name
    }, id

    }
}
`;

export const REST_AUTHGDIP = gql`
mutation auth($tk:String){
    authuser(tk: $tk)
    @rest(type:"authuser",path: "/auth/gdipCAS/callback?access_token={args.tk}") {
    jwt
    user{
        realid, realname,class{
      name, id
    }, email, username, role {
      name
    }, id
    }

    }
}
`;

export const rest_updateProfile = gql`
mutation updateProfile($realname:String, $realid:String, $email:String, $class:ID, $id: ID!){
  updateUser(input:{
      realname: $realname,
      realid: $realid,
      email: $email,
      class: $class
  },
    id: $id
  )
  @rest(type: "user",path: "/users/{args.id}",method:"PUT")
  {
    user{
      email, username, class{
        name, id
      }, realid, realname
    }
  }
}
`;

export const rest_resetPassword = gql`
mutation resetPassword($password:String!, $id: ID! ){
  updateUser(input:{
    password:$password
  },
  id:$id
  )
  @rest(type: "user",path: "/users/{args.id}",method:"PUT")
  {
    user{
      id
    }
  }
}
`;