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

export const LIST_COURSES = gql`
query listCourses{
    courses{
        id, 
        name, description, cover{
            url
        }, available, isTemplate
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
            content, name, id, description, cover{
              url, id
            }, isTemplate, available, meta, vrlink
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
    }, id
  }
}
`;

export const CLASSES = gql`
query classroom{
  classes{
    id, name, grade, department
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
        name, id, department, grade
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

export const listUsers = gql`
query listUsers($classroom:ID){
  users(where:{class_eq:$classroom}){
    role{
      name
    }, class{
      id, name, department, grade
    },
    realid, realname, email, username, id
  }
}
`;

export const importUsers = gql`
mutation importUsers($data: [ImportUsers]) {
  importUsers(input:{
    data:$data
  }){
		users{
      id
    }
  }
}
`;

export const blockUser = gql`
mutation blockUser($id:ID!){
  updateUser(input:{
    where:{id:$id},
    data:{blocked:true}
  }){
    user{id}
  }
}
`;

export const getTemplateCourses = gql`
query getTemplateCourse{
  courses(where:{
    isTemplate_eq: true
  }){
    id, name, cover{url, id}, description, content, meta, vrlink
  }
}
`;

export const addCourse = gql`
mutation addCourse($name:String!, $isTemplate:Boolean=false, $description:String!, $content: String!, $cover:ID, $meta:JSON!, $vrlink: String!){
  createCourse(input:{
    data:{
      name:$name, isTemplate:$isTemplate,
      description:$description,cover:$cover, content:$content, meta:$meta,
      vrlink: $vrlink
    }
  }){
    course{
      id
    }
  }
}
`;


export const updateCourse = gql`
mutation updateCourse($name:String!, $description: String!, $id:ID!, $available:Boolean!, $content:String!){
  updateCourse(input:{
		data:{
      name:$name, content:$content,
      description:$description,  available:$available
    },
    where:{
      id: $id
    }
  }){
    course{
      id
    }
  }
}
`

export const listClass = gql`
query listClass{
  classes{
    id, name, created_at, grade, department
  }
}
`;

export const updateClass = gql`
mutation updateClass($name:String!, $id:ID!, $grade:String!, $department:String!){
  updateClass(input:{
    data:{name:$name,grade:$grade,department:$department},where:{id:$id}
  }){
    class{
      id
    }
  }
}
`;

export const createClass = gql`
mutation createClass($name:String!, $grade:String!, $department:String!){
  createClass(input:{
    data:{
      name:$name,grade:$grade,department:$department
    }
  }){
    class{
      id
    }
  }
}
`;

export const getHomePage = gql`
query getHomePage{
  homepage{
    seo{
      shareImage{
    		url
      },
      metaTitle,
      metaDescription,
    },
    hero{
      title,
      content
    },
    footer{
      items
    }
  }
}
`;

export const getGlobal = gql`
query getGlobal{
  global{
    siteName,
    
  }
}
`;

export const getSystemInfo = gql`
query getSystemInfo{
  systeminfo{
    config,
    frontend,
    server,
    product,
    request
  }
}
`;

