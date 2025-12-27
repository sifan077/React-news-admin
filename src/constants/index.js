export const USER_ROLES = {
  SUPER_ADMIN: 1,
  REGION_ADMIN: 2,
  REGION_EDITOR: 3
};

export const AUDIT_STATE = {
  DRAFT: 0,
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3
};

export const PUBLISH_STATE = {
  UNPUBLISHED: 0,
  APPROVED: 1,
  PUBLISHED: 2,
  SUNSET: 3
};

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  NEWS: '/news',
  NEWS_MANAGE_DRAFT: '/news-manage/draft',
  NEWS_MANAGE_PREVIEW: '/news-manage/preview',
  AUDIT_MANAGE_LIST: '/audit-manage/list',
  PUBLISH_MANAGE_UNPUBLISHED: '/publish-manage/unpublished',
  PUBLISH_MANAGE_PUBLISHED: '/publish-manage/published',
  PUBLISH_MANAGE_SUNSET: '/publish-manage/sunset'
};

export const REGION = {
  GLOBAL: '全球'
};
