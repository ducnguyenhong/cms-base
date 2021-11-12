export enum RoutePath {
  login = '/login',

  notFound = '/404',

  dashboard = '/dashboard',

  profile = '/profile',

  // user
  users = '/users',
  appOwnerUsers = '/app-owner-users',
  editorUsers = '/editor-users',
  hostUsers = '/host-users',
  competitorUsers = '/competitor-users',
  createUser = '/create-user',
  updateUser = '/update-user/:id',
  userDetail = '/user/:id',

  // application
  applications = '/applications',
  createApplication = '/create-application',
  updateApplication = '/update-application/:id',
  applicationDetail = '/application/:id',

  // event
  events = '/events',
  createEvent = '/create-event',
  updateEvent = '/update-event/:id',
  eventDetail = '/event/:id',

  // question
  questions = '/questions',
  createQuestion = '/create-question',
  updateQuestion = '/update-question/:id',
  questionDetail = '/questions/:id',
}
