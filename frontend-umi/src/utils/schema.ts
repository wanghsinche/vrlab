import { gql } from './graphql';

export const LOGIN = gql`
# Increments a back-end counter and gets its resulting value
mutation login($identifier:String!, $password: String!) {
  login(input: {
      identifier:$identifier, password:$password
  }){
      jwt, user {
          role{name}, id, email, username
      }
  }
}
`;

export const ME = gql`
query me{
    me {
        role{name}, id, email, username
    }
}
`;

export const LIST_COURSES = gql `
query listCourses{
    courses{
        id, 
        name, description, cover{
            url
        }, available
    }
    coursesConnection{
        aggregate{
        count
        }
    }
}
`;

export const COURSE_DETAIL = gql`
    query courseDetail($id: ID! ) {
        course(id:$id){
            content, name, id, description
        }
    }
`;


export const GETSCORE = gql`
query getScore($student:String!, $course:String!){
  scores(where:{student_eq:$student, course_eq:$course}){
    student{realname}
    course{name}
    point,
    detail,
    id
  }
}
`;

export const updateScore = gql`
mutation updateScore($point:Int!, $detail:JSON!, $id:ID!){
  updateScore(input:{
    data: {
      point:$point, detail: $detail
    },
    where:{
      id: $id
    }
  }){
    score{
      point, student{
        realname
      }, course{
        name
      }
    }
  }
}
`;

export const createScore = gql`
mutation createScore($point:Int!, $detail:JSON!, $student:ID!, $course:ID!){
  createScore(input:{
    data:{
      point: $point, detail:$detail,student:$student,course:$course
    }
  }){
    score{
      point,id
    }
  }
}
`;

export const PROFILE = gql`
query profile($id:ID!){
  user(id:$id){
    realid, realname,class{
      name, id
    }, email, username, role {
      name
    }
  }
}
`;

export const CLASSES = gql`
query classroom{
  classes{
    id, name
  }
}
`;

export const updateProfile = gql`
mutation updateProfile($realname:String, $realid:String, $email:String, $class:ID, $id: ID!){
  updateUser(input:{
    data:{
      realname:$realname,realid:$realid, email:$email,class:$class
    },
    where:{
      id: $id
    }
  }){
    user{
      email, username, class{
        name, id
      }, realid, realname
    }
  }
}
`;

export const resetPassword = gql`
mutation resetPassword($password:String!, $id: ID! ){
  updateUser(input:{
    data:{password:$password},where:{id:$id}
  }){
    user{
      id
    }
  }
}
`;