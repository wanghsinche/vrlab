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


export interface IME {
    email: string;
    id: string;
    username: string;
    role: {
        name: 'Authenticated'|'Public'
    }
  };

export const LIST_COURSES = gql `
query listCourses{
    courses{
        id, 
        name, description, cover{
            url
        }
    }
    coursesConnection{
        aggregate{
        count
        }
    }
}
`;

export interface ILIST_COURSES {
    courses: {
        id: string;
        name:string;
        description: string;
        cover: {
            url: string;
        }
    }[];
    coursesConnection: {
        aggregate: {
            count: number;
        }
    }
}

export const COURSE_DETAIL = gql`
    query courseDetail($id: ID! ) {
        course(id:$id){
            content, name, id, description
        }
    }
`;

export interface ICOURSE_DETAIL {
    course: {
        id: string;
        content:string;
        name: string;
        description: string;
    }
}