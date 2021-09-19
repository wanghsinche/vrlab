export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<Writer>;
  category?: Maybe<Category>;
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  published_at?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type ArticleAggregator = {
  __typename?: 'ArticleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  aggregate?: Maybe<ArticleAggregator>;
  groupBy?: Maybe<ArticleGroupBy>;
  values?: Maybe<Array<Maybe<Article>>>;
};

export type ArticleConnectionAuthor = {
  __typename?: 'ArticleConnectionAuthor';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ArticleConnectionCategory = {
  __typename?: 'ArticleConnectionCategory';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ArticleConnectionContent = {
  __typename?: 'ArticleConnectionContent';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionCreated_At = {
  __typename?: 'ArticleConnectionCreated_at';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ArticleConnectionDescription = {
  __typename?: 'ArticleConnectionDescription';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionId = {
  __typename?: 'ArticleConnectionId';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ArticleConnectionImage = {
  __typename?: 'ArticleConnectionImage';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ArticleConnectionPublished_At = {
  __typename?: 'ArticleConnectionPublished_at';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ArticleConnectionSlug = {
  __typename?: 'ArticleConnectionSlug';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionTitle = {
  __typename?: 'ArticleConnectionTitle';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionUpdated_At = {
  __typename?: 'ArticleConnectionUpdated_at';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ArticleGroupBy = {
  __typename?: 'ArticleGroupBy';
  author?: Maybe<Array<Maybe<ArticleConnectionAuthor>>>;
  category?: Maybe<Array<Maybe<ArticleConnectionCategory>>>;
  content?: Maybe<Array<Maybe<ArticleConnectionContent>>>;
  created_at?: Maybe<Array<Maybe<ArticleConnectionCreated_At>>>;
  description?: Maybe<Array<Maybe<ArticleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<ArticleConnectionId>>>;
  image?: Maybe<Array<Maybe<ArticleConnectionImage>>>;
  published_at?: Maybe<Array<Maybe<ArticleConnectionPublished_At>>>;
  slug?: Maybe<Array<Maybe<ArticleConnectionSlug>>>;
  title?: Maybe<Array<Maybe<ArticleConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<ArticleConnectionUpdated_At>>>;
};

export type ArticleInput = {
  author?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  content: Scalars['String'];
  created_by?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  image?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  articles?: Maybe<Array<Maybe<Article>>>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updated_at: Scalars['DateTime'];
};


export type CategoryArticlesArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CategoryAggregator = {
  __typename?: 'CategoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  aggregate?: Maybe<CategoryAggregator>;
  groupBy?: Maybe<CategoryGroupBy>;
  values?: Maybe<Array<Maybe<Category>>>;
};

export type CategoryConnectionCreated_At = {
  __typename?: 'CategoryConnectionCreated_at';
  connection?: Maybe<CategoryConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CategoryConnectionId = {
  __typename?: 'CategoryConnectionId';
  connection?: Maybe<CategoryConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type CategoryConnectionName = {
  __typename?: 'CategoryConnectionName';
  connection?: Maybe<CategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CategoryConnectionSlug = {
  __typename?: 'CategoryConnectionSlug';
  connection?: Maybe<CategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CategoryConnectionUpdated_At = {
  __typename?: 'CategoryConnectionUpdated_at';
  connection?: Maybe<CategoryConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CategoryGroupBy = {
  __typename?: 'CategoryGroupBy';
  created_at?: Maybe<Array<Maybe<CategoryConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<CategoryConnectionId>>>;
  name?: Maybe<Array<Maybe<CategoryConnectionName>>>;
  slug?: Maybe<Array<Maybe<CategoryConnectionSlug>>>;
  updated_at?: Maybe<Array<Maybe<CategoryConnectionUpdated_At>>>;
};

export type CategoryInput = {
  articles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type Class = {
  __typename?: 'Class';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  students?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  updated_at: Scalars['DateTime'];
};


export type ClassStudentsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ClassAggregator = {
  __typename?: 'ClassAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ClassConnection = {
  __typename?: 'ClassConnection';
  aggregate?: Maybe<ClassAggregator>;
  groupBy?: Maybe<ClassGroupBy>;
  values?: Maybe<Array<Maybe<Class>>>;
};

export type ClassConnectionCreated_At = {
  __typename?: 'ClassConnectionCreated_at';
  connection?: Maybe<ClassConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ClassConnectionId = {
  __typename?: 'ClassConnectionId';
  connection?: Maybe<ClassConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ClassConnectionName = {
  __typename?: 'ClassConnectionName';
  connection?: Maybe<ClassConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ClassConnectionPublished_At = {
  __typename?: 'ClassConnectionPublished_at';
  connection?: Maybe<ClassConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ClassConnectionUpdated_At = {
  __typename?: 'ClassConnectionUpdated_at';
  connection?: Maybe<ClassConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ClassGroupBy = {
  __typename?: 'ClassGroupBy';
  created_at?: Maybe<Array<Maybe<ClassConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<ClassConnectionId>>>;
  name?: Maybe<Array<Maybe<ClassConnectionName>>>;
  published_at?: Maybe<Array<Maybe<ClassConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<ClassConnectionUpdated_At>>>;
};

export type ClassInput = {
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  students?: Maybe<Array<Maybe<Scalars['ID']>>>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ComponentSectionsHero = {
  __typename?: 'ComponentSectionsHero';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ComponentSectionsHeroInput = {
  title: Scalars['String'];
};

export type ComponentSharedSeo = {
  __typename?: 'ComponentSharedSeo';
  id: Scalars['ID'];
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  shareImage?: Maybe<UploadFile>;
};

export type ComponentSharedSeoInput = {
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  shareImage?: Maybe<Scalars['ID']>;
};

export type Course = {
  __typename?: 'Course';
  content?: Maybe<Scalars['String']>;
  cover?: Maybe<UploadFile>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type CourseAggregator = {
  __typename?: 'CourseAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  aggregate?: Maybe<CourseAggregator>;
  groupBy?: Maybe<CourseGroupBy>;
  values?: Maybe<Array<Maybe<Course>>>;
};

export type CourseConnectionContent = {
  __typename?: 'CourseConnectionContent';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CourseConnectionCover = {
  __typename?: 'CourseConnectionCover';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type CourseConnectionCreated_At = {
  __typename?: 'CourseConnectionCreated_at';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CourseConnectionDescription = {
  __typename?: 'CourseConnectionDescription';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CourseConnectionId = {
  __typename?: 'CourseConnectionId';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type CourseConnectionName = {
  __typename?: 'CourseConnectionName';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['String']>;
};

export type CourseConnectionPublished_At = {
  __typename?: 'CourseConnectionPublished_at';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CourseConnectionUpdated_At = {
  __typename?: 'CourseConnectionUpdated_at';
  connection?: Maybe<CourseConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type CourseGroupBy = {
  __typename?: 'CourseGroupBy';
  content?: Maybe<Array<Maybe<CourseConnectionContent>>>;
  cover?: Maybe<Array<Maybe<CourseConnectionCover>>>;
  created_at?: Maybe<Array<Maybe<CourseConnectionCreated_At>>>;
  description?: Maybe<Array<Maybe<CourseConnectionDescription>>>;
  id?: Maybe<Array<Maybe<CourseConnectionId>>>;
  name?: Maybe<Array<Maybe<CourseConnectionName>>>;
  published_at?: Maybe<Array<Maybe<CourseConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<CourseConnectionUpdated_At>>>;
};

export type CourseInput = {
  content?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FileInfoInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  size: Scalars['Float'];
  updated_by?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Global = {
  __typename?: 'Global';
  created_at: Scalars['DateTime'];
  defaultSeo?: Maybe<ComponentSharedSeo>;
  favicon?: Maybe<UploadFile>;
  id: Scalars['ID'];
  siteName: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type GlobalInput = {
  created_by?: Maybe<Scalars['ID']>;
  defaultSeo: ComponentSharedSeoInput;
  favicon?: Maybe<Scalars['ID']>;
  siteName: Scalars['String'];
  updated_by?: Maybe<Scalars['ID']>;
};

export type Homepage = {
  __typename?: 'Homepage';
  created_at: Scalars['DateTime'];
  hero?: Maybe<ComponentSectionsHero>;
  id: Scalars['ID'];
  seo?: Maybe<ComponentSharedSeo>;
  updated_at: Scalars['DateTime'];
};

export type HomepageInput = {
  created_by?: Maybe<Scalars['ID']>;
  hero: ComponentSectionsHeroInput;
  seo?: Maybe<ComponentSharedSeoInput>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type InputId = {
  id: Scalars['ID'];
};

export type LocaleInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Morph = Article | ArticleAggregator | ArticleConnection | ArticleConnectionAuthor | ArticleConnectionCategory | ArticleConnectionContent | ArticleConnectionCreated_At | ArticleConnectionDescription | ArticleConnectionId | ArticleConnectionImage | ArticleConnectionPublished_At | ArticleConnectionSlug | ArticleConnectionTitle | ArticleConnectionUpdated_At | ArticleGroupBy | Category | CategoryAggregator | CategoryConnection | CategoryConnectionCreated_At | CategoryConnectionId | CategoryConnectionName | CategoryConnectionSlug | CategoryConnectionUpdated_At | CategoryGroupBy | Class | ClassAggregator | ClassConnection | ClassConnectionCreated_At | ClassConnectionId | ClassConnectionName | ClassConnectionPublished_At | ClassConnectionUpdated_At | ClassGroupBy | ComponentSectionsHero | ComponentSharedSeo | Course | CourseAggregator | CourseConnection | CourseConnectionContent | CourseConnectionCover | CourseConnectionCreated_At | CourseConnectionDescription | CourseConnectionId | CourseConnectionName | CourseConnectionPublished_At | CourseConnectionUpdated_At | CourseGroupBy | Global | Homepage | I18NLocale | Score | ScoreAggregator | ScoreAggregatorAvg | ScoreAggregatorMax | ScoreAggregatorMin | ScoreAggregatorSum | ScoreConnection | ScoreConnectionCourse | ScoreConnectionCreated_At | ScoreConnectionDetail | ScoreConnectionId | ScoreConnectionPoint | ScoreConnectionPublished_At | ScoreConnectionStudent | ScoreConnectionUpdated_At | ScoreGroupBy | UploadFile | UploadFileAggregator | UploadFileAggregatorAvg | UploadFileAggregatorMax | UploadFileAggregatorMin | UploadFileAggregatorSum | UploadFileConnection | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionCreated_At | UploadFileConnectionExt | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionHeight | UploadFileConnectionId | UploadFileConnectionMime | UploadFileConnectionName | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | UploadFileConnectionSize | UploadFileConnectionUpdated_At | UploadFileConnectionUrl | UploadFileConnectionWidth | UploadFileGroupBy | UserPermissionsPasswordPayload | UsersPermissionsLoginPayload | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleAggregator | UsersPermissionsRoleConnection | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionType | UsersPermissionsRoleGroupBy | UsersPermissionsUser | UsersPermissionsUserAggregator | UsersPermissionsUserConnection | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionClass | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionRealid | UsersPermissionsUserConnectionRealname | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserGroupBy | Writer | WriterAggregator | WriterConnection | WriterConnectionCreated_At | WriterConnectionEmail | WriterConnectionId | WriterConnectionName | WriterConnectionPicture | WriterConnectionUpdated_At | WriterGroupBy | CreateArticlePayload | CreateCategoryPayload | CreateClassPayload | CreateCoursePayload | CreateRolePayload | CreateScorePayload | CreateUserPayload | CreateWriterPayload | DeleteArticlePayload | DeleteCategoryPayload | DeleteClassPayload | DeleteCoursePayload | DeleteFilePayload | DeleteGlobalPayload | DeleteHomepagePayload | DeleteRolePayload | DeleteScorePayload | DeleteUserPayload | DeleteWriterPayload | UpdateArticlePayload | UpdateCategoryPayload | UpdateClassPayload | UpdateCoursePayload | UpdateGlobalPayload | UpdateHomepagePayload | UpdateRolePayload | UpdateScorePayload | UpdateUserPayload | UpdateWriterPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<CreateArticlePayload>;
  createCategory?: Maybe<CreateCategoryPayload>;
  createClass?: Maybe<CreateClassPayload>;
  createCourse?: Maybe<CreateCoursePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createScore?: Maybe<CreateScorePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  createWriter?: Maybe<CreateWriterPayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  deleteClass?: Maybe<DeleteClassPayload>;
  deleteCourse?: Maybe<DeleteCoursePayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deleteGlobal?: Maybe<DeleteGlobalPayload>;
  deleteHomepage?: Maybe<DeleteHomepagePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteScore?: Maybe<DeleteScorePayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteWriter?: Maybe<DeleteWriterPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  updateClass?: Maybe<UpdateClassPayload>;
  updateCourse?: Maybe<UpdateCoursePayload>;
  updateFileInfo: UploadFile;
  updateGlobal?: Maybe<UpdateGlobalPayload>;
  updateHomepage?: Maybe<UpdateHomepagePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateScore?: Maybe<UpdateScorePayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  updateWriter?: Maybe<UpdateWriterPayload>;
  upload: UploadFile;
};


export type MutationCreateArticleArgs = {
  input?: Maybe<CreateArticleInput>;
};


export type MutationCreateCategoryArgs = {
  input?: Maybe<CreateCategoryInput>;
};


export type MutationCreateClassArgs = {
  input?: Maybe<CreateClassInput>;
};


export type MutationCreateCourseArgs = {
  input?: Maybe<CreateCourseInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationCreateScoreArgs = {
  input?: Maybe<CreateScoreInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationCreateWriterArgs = {
  input?: Maybe<CreateWriterInput>;
};


export type MutationDeleteArticleArgs = {
  input?: Maybe<DeleteArticleInput>;
};


export type MutationDeleteCategoryArgs = {
  input?: Maybe<DeleteCategoryInput>;
};


export type MutationDeleteClassArgs = {
  input?: Maybe<DeleteClassInput>;
};


export type MutationDeleteCourseArgs = {
  input?: Maybe<DeleteCourseInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationDeleteScoreArgs = {
  input?: Maybe<DeleteScoreInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationDeleteWriterArgs = {
  input?: Maybe<DeleteWriterInput>;
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  input?: Maybe<UpdateArticleInput>;
};


export type MutationUpdateCategoryArgs = {
  input?: Maybe<UpdateCategoryInput>;
};


export type MutationUpdateClassArgs = {
  input?: Maybe<UpdateClassInput>;
};


export type MutationUpdateCourseArgs = {
  input?: Maybe<UpdateCourseInput>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationUpdateGlobalArgs = {
  input?: Maybe<UpdateGlobalInput>;
};


export type MutationUpdateHomepageArgs = {
  input?: Maybe<UpdateHomepageInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationUpdateScoreArgs = {
  input?: Maybe<UpdateScoreInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationUpdateWriterArgs = {
  input?: Maybe<UpdateWriterInput>;
};


export type MutationUploadArgs = {
  field?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: Maybe<FileInfoInput>;
  ref?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  articlesConnection?: Maybe<ArticleConnection>;
  categories?: Maybe<Array<Maybe<Category>>>;
  categoriesConnection?: Maybe<CategoryConnection>;
  category?: Maybe<Category>;
  class?: Maybe<Class>;
  classes?: Maybe<Array<Maybe<Class>>>;
  classesConnection?: Maybe<ClassConnection>;
  course?: Maybe<Course>;
  courses?: Maybe<Array<Maybe<Course>>>;
  coursesConnection?: Maybe<CourseConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  global?: Maybe<Global>;
  homepage?: Maybe<Homepage>;
  me?: Maybe<UsersPermissionsMe>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  score?: Maybe<Score>;
  scores?: Maybe<Array<Maybe<Score>>>;
  scoresConnection?: Maybe<ScoreConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  writer?: Maybe<Writer>;
  writers?: Maybe<Array<Maybe<Writer>>>;
  writersConnection?: Maybe<WriterConnection>;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryArticlesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryArticlesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCategoriesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCategoriesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryClassArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryClassesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryClassesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCourseArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCoursesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryCoursesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryGlobalArgs = {
  publicationState?: Maybe<PublicationState>;
};


export type QueryHomepageArgs = {
  publicationState?: Maybe<PublicationState>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRolesConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryScoreArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryScoresArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryScoresConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUsersConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryWriterArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryWritersArgs = {
  limit?: Maybe<Scalars['Int']>;
  publicationState?: Maybe<PublicationState>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryWritersConnectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type RoleInput = {
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Score = {
  __typename?: 'Score';
  course?: Maybe<Course>;
  created_at: Scalars['DateTime'];
  detail?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  point?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['DateTime']>;
  student?: Maybe<UsersPermissionsUser>;
  updated_at: Scalars['DateTime'];
};

export type ScoreAggregator = {
  __typename?: 'ScoreAggregator';
  avg?: Maybe<ScoreAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ScoreAggregatorMax>;
  min?: Maybe<ScoreAggregatorMin>;
  sum?: Maybe<ScoreAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ScoreAggregatorAvg = {
  __typename?: 'ScoreAggregatorAvg';
  point?: Maybe<Scalars['Float']>;
};

export type ScoreAggregatorMax = {
  __typename?: 'ScoreAggregatorMax';
  point?: Maybe<Scalars['Float']>;
};

export type ScoreAggregatorMin = {
  __typename?: 'ScoreAggregatorMin';
  point?: Maybe<Scalars['Float']>;
};

export type ScoreAggregatorSum = {
  __typename?: 'ScoreAggregatorSum';
  point?: Maybe<Scalars['Float']>;
};

export type ScoreConnection = {
  __typename?: 'ScoreConnection';
  aggregate?: Maybe<ScoreAggregator>;
  groupBy?: Maybe<ScoreGroupBy>;
  values?: Maybe<Array<Maybe<Score>>>;
};

export type ScoreConnectionCourse = {
  __typename?: 'ScoreConnectionCourse';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ScoreConnectionCreated_At = {
  __typename?: 'ScoreConnectionCreated_at';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ScoreConnectionDetail = {
  __typename?: 'ScoreConnectionDetail';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type ScoreConnectionId = {
  __typename?: 'ScoreConnectionId';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ScoreConnectionPoint = {
  __typename?: 'ScoreConnectionPoint';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type ScoreConnectionPublished_At = {
  __typename?: 'ScoreConnectionPublished_at';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ScoreConnectionStudent = {
  __typename?: 'ScoreConnectionStudent';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ScoreConnectionUpdated_At = {
  __typename?: 'ScoreConnectionUpdated_at';
  connection?: Maybe<ScoreConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ScoreGroupBy = {
  __typename?: 'ScoreGroupBy';
  course?: Maybe<Array<Maybe<ScoreConnectionCourse>>>;
  created_at?: Maybe<Array<Maybe<ScoreConnectionCreated_At>>>;
  detail?: Maybe<Array<Maybe<ScoreConnectionDetail>>>;
  id?: Maybe<Array<Maybe<ScoreConnectionId>>>;
  point?: Maybe<Array<Maybe<ScoreConnectionPoint>>>;
  published_at?: Maybe<Array<Maybe<ScoreConnectionPublished_At>>>;
  student?: Maybe<Array<Maybe<ScoreConnectionStudent>>>;
  updated_at?: Maybe<Array<Maybe<ScoreConnectionUpdated_At>>>;
};

export type ScoreInput = {
  course?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  detail?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['DateTime']>;
  student?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};


export type UploadFileRelatedArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  class?: Maybe<Scalars['ID']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  realid?: Maybe<Scalars['String']>;
  realname: Scalars['String'];
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  controller: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  class?: Maybe<Class>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
  realid?: Maybe<Scalars['String']>;
  realname: Scalars['String'];
  role?: Maybe<UsersPermissionsRole>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionClass = {
  __typename?: 'UsersPermissionsUserConnectionClass';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRealid = {
  __typename?: 'UsersPermissionsUserConnectionRealid';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRealname = {
  __typename?: 'UsersPermissionsUserConnectionRealname';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  class?: Maybe<Array<Maybe<UsersPermissionsUserConnectionClass>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  realid?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRealid>>>;
  realname?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRealname>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type Writer = {
  __typename?: 'Writer';
  articles?: Maybe<Array<Maybe<Article>>>;
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<UploadFile>;
  updated_at: Scalars['DateTime'];
};


export type WriterArticlesArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type WriterAggregator = {
  __typename?: 'WriterAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type WriterConnection = {
  __typename?: 'WriterConnection';
  aggregate?: Maybe<WriterAggregator>;
  groupBy?: Maybe<WriterGroupBy>;
  values?: Maybe<Array<Maybe<Writer>>>;
};

export type WriterConnectionCreated_At = {
  __typename?: 'WriterConnectionCreated_at';
  connection?: Maybe<WriterConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type WriterConnectionEmail = {
  __typename?: 'WriterConnectionEmail';
  connection?: Maybe<WriterConnection>;
  key?: Maybe<Scalars['String']>;
};

export type WriterConnectionId = {
  __typename?: 'WriterConnectionId';
  connection?: Maybe<WriterConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type WriterConnectionName = {
  __typename?: 'WriterConnectionName';
  connection?: Maybe<WriterConnection>;
  key?: Maybe<Scalars['String']>;
};

export type WriterConnectionPicture = {
  __typename?: 'WriterConnectionPicture';
  connection?: Maybe<WriterConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type WriterConnectionUpdated_At = {
  __typename?: 'WriterConnectionUpdated_at';
  connection?: Maybe<WriterConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type WriterGroupBy = {
  __typename?: 'WriterGroupBy';
  created_at?: Maybe<Array<Maybe<WriterConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<WriterConnectionEmail>>>;
  id?: Maybe<Array<Maybe<WriterConnectionId>>>;
  name?: Maybe<Array<Maybe<WriterConnectionName>>>;
  picture?: Maybe<Array<Maybe<WriterConnectionPicture>>>;
  updated_at?: Maybe<Array<Maybe<WriterConnectionUpdated_At>>>;
};

export type WriterInput = {
  articles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateArticleInput = {
  data?: Maybe<ArticleInput>;
};

export type CreateArticlePayload = {
  __typename?: 'createArticlePayload';
  article?: Maybe<Article>;
};

export type CreateCategoryInput = {
  data?: Maybe<CategoryInput>;
};

export type CreateCategoryPayload = {
  __typename?: 'createCategoryPayload';
  category?: Maybe<Category>;
};

export type CreateClassInput = {
  data?: Maybe<ClassInput>;
};

export type CreateClassPayload = {
  __typename?: 'createClassPayload';
  class?: Maybe<Class>;
};

export type CreateCourseInput = {
  data?: Maybe<CourseInput>;
};

export type CreateCoursePayload = {
  __typename?: 'createCoursePayload';
  course?: Maybe<Course>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateScoreInput = {
  data?: Maybe<ScoreInput>;
};

export type CreateScorePayload = {
  __typename?: 'createScorePayload';
  score?: Maybe<Score>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type CreateWriterInput = {
  data?: Maybe<WriterInput>;
};

export type CreateWriterPayload = {
  __typename?: 'createWriterPayload';
  writer?: Maybe<Writer>;
};

export type DeleteArticleInput = {
  where?: Maybe<InputId>;
};

export type DeleteArticlePayload = {
  __typename?: 'deleteArticlePayload';
  article?: Maybe<Article>;
};

export type DeleteCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteCategoryPayload = {
  __typename?: 'deleteCategoryPayload';
  category?: Maybe<Category>;
};

export type DeleteClassInput = {
  where?: Maybe<InputId>;
};

export type DeleteClassPayload = {
  __typename?: 'deleteClassPayload';
  class?: Maybe<Class>;
};

export type DeleteCourseInput = {
  where?: Maybe<InputId>;
};

export type DeleteCoursePayload = {
  __typename?: 'deleteCoursePayload';
  course?: Maybe<Course>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteGlobalPayload = {
  __typename?: 'deleteGlobalPayload';
  global?: Maybe<Global>;
};

export type DeleteHomepagePayload = {
  __typename?: 'deleteHomepagePayload';
  homepage?: Maybe<Homepage>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteScoreInput = {
  where?: Maybe<InputId>;
};

export type DeleteScorePayload = {
  __typename?: 'deleteScorePayload';
  score?: Maybe<Score>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteWriterInput = {
  where?: Maybe<InputId>;
};

export type DeleteWriterPayload = {
  __typename?: 'deleteWriterPayload';
  writer?: Maybe<Writer>;
};

export type EditArticleInput = {
  author?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCategoryInput = {
  articles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditClassInput = {
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  students?: Maybe<Array<Maybe<Scalars['ID']>>>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentSectionsHeroInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type EditComponentSharedSeoInput = {
  id?: Maybe<Scalars['ID']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  shareImage?: Maybe<Scalars['ID']>;
};

export type EditCourseInput = {
  content?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  size?: Maybe<Scalars['Float']>;
  updated_by?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type EditGlobalInput = {
  created_by?: Maybe<Scalars['ID']>;
  defaultSeo?: Maybe<EditComponentSharedSeoInput>;
  favicon?: Maybe<Scalars['ID']>;
  siteName?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditHomepageInput = {
  created_by?: Maybe<Scalars['ID']>;
  hero?: Maybe<EditComponentSectionsHeroInput>;
  seo?: Maybe<EditComponentSharedSeoInput>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  created_by?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  type?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['ID']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type EditScoreInput = {
  course?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  detail?: Maybe<Scalars['JSON']>;
  point?: Maybe<Scalars['Int']>;
  published_at?: Maybe<Scalars['DateTime']>;
  student?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditUserInput = {
  blocked?: Maybe<Scalars['Boolean']>;
  class?: Maybe<Scalars['ID']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  realid?: Maybe<Scalars['String']>;
  realname?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type EditWriterInput = {
  articles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateArticleInput = {
  data?: Maybe<EditArticleInput>;
  where?: Maybe<InputId>;
};

export type UpdateArticlePayload = {
  __typename?: 'updateArticlePayload';
  article?: Maybe<Article>;
};

export type UpdateCategoryInput = {
  data?: Maybe<EditCategoryInput>;
  where?: Maybe<InputId>;
};

export type UpdateCategoryPayload = {
  __typename?: 'updateCategoryPayload';
  category?: Maybe<Category>;
};

export type UpdateClassInput = {
  data?: Maybe<EditClassInput>;
  where?: Maybe<InputId>;
};

export type UpdateClassPayload = {
  __typename?: 'updateClassPayload';
  class?: Maybe<Class>;
};

export type UpdateCourseInput = {
  data?: Maybe<EditCourseInput>;
  where?: Maybe<InputId>;
};

export type UpdateCoursePayload = {
  __typename?: 'updateCoursePayload';
  course?: Maybe<Course>;
};

export type UpdateGlobalInput = {
  data?: Maybe<EditGlobalInput>;
};

export type UpdateGlobalPayload = {
  __typename?: 'updateGlobalPayload';
  global?: Maybe<Global>;
};

export type UpdateHomepageInput = {
  data?: Maybe<EditHomepageInput>;
};

export type UpdateHomepagePayload = {
  __typename?: 'updateHomepagePayload';
  homepage?: Maybe<Homepage>;
};

export type UpdateRoleInput = {
  data?: Maybe<EditRoleInput>;
  where?: Maybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateScoreInput = {
  data?: Maybe<EditScoreInput>;
  where?: Maybe<InputId>;
};

export type UpdateScorePayload = {
  __typename?: 'updateScorePayload';
  score?: Maybe<Score>;
};

export type UpdateUserInput = {
  data?: Maybe<EditUserInput>;
  where?: Maybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type UpdateWriterInput = {
  data?: Maybe<EditWriterInput>;
  where?: Maybe<InputId>;
};

export type UpdateWriterPayload = {
  __typename?: 'updateWriterPayload';
  writer?: Maybe<Writer>;
};

export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: Maybe<string>, user: { __typename?: 'UsersPermissionsMe', id: string, email: string, username: string, role?: Maybe<{ __typename?: 'UsersPermissionsMeRole', name: string }> } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'UsersPermissionsMe', id: string, email: string, username: string, role?: Maybe<{ __typename?: 'UsersPermissionsMeRole', name: string }> }> };

export type ListCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCoursesQuery = { __typename?: 'Query', courses?: Maybe<Array<Maybe<{ __typename?: 'Course', id: string, name?: Maybe<string>, description?: Maybe<string>, cover?: Maybe<{ __typename?: 'UploadFile', url: string }> }>>>, coursesConnection?: Maybe<{ __typename?: 'CourseConnection', aggregate?: Maybe<{ __typename?: 'CourseAggregator', count?: Maybe<number> }> }> };

export type CourseDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseDetailQuery = { __typename?: 'Query', course?: Maybe<{ __typename?: 'Course', content?: Maybe<string>, name?: Maybe<string>, id: string, description?: Maybe<string> }> };

export type GetScoreQueryVariables = Exact<{
  student: Scalars['String'];
  course: Scalars['String'];
}>;


export type GetScoreQuery = { __typename?: 'Query', scores?: Maybe<Array<Maybe<{ __typename?: 'Score', point?: Maybe<number>, detail?: Maybe<any>, id: string, student?: Maybe<{ __typename?: 'UsersPermissionsUser', realname: string }>, course?: Maybe<{ __typename?: 'Course', name?: Maybe<string> }> }>>> };

export type UpdateScoreMutationVariables = Exact<{
  point: Scalars['Int'];
  detail: Scalars['JSON'];
  id: Scalars['ID'];
}>;


export type UpdateScoreMutation = { __typename?: 'Mutation', updateScore?: Maybe<{ __typename?: 'updateScorePayload', score?: Maybe<{ __typename?: 'Score', point?: Maybe<number>, student?: Maybe<{ __typename?: 'UsersPermissionsUser', realname: string }>, course?: Maybe<{ __typename?: 'Course', name?: Maybe<string> }> }> }> };

export type CreateScoreMutationVariables = Exact<{
  point: Scalars['Int'];
  detail: Scalars['JSON'];
  student: Scalars['ID'];
  course: Scalars['ID'];
}>;


export type CreateScoreMutation = { __typename?: 'Mutation', createScore?: Maybe<{ __typename?: 'createScorePayload', score?: Maybe<{ __typename?: 'Score', point?: Maybe<number>, id: string }> }> };

export type ProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProfileQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'UsersPermissionsUser', realid?: Maybe<string>, realname: string, class?: Maybe<{ __typename?: 'Class', name?: Maybe<string> }> }> };
